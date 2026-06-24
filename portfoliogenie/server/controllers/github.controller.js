// This is the controller used to connect all services with the models

import jwt from "jsonwebtoken";
import githubService from "../services/github.service.js";
import aiService from "../services/ai.service.js";
import User from "../models/User.model.js";
import Repository from "../models/repository.model.js";
import Portfolio from "../models/portfolio.model.js";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Here when The user click on "Connect with GitHub" button, we redirect them to GitHub's OAuth page.
// To enable the user to connect and authorize with github
// The callback URL will be handled in the next function to process the OAuth response and fetch user data.
export const redirectToGithub = (req, res) => {
  const state = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.GITHUB_REDIRECT_URL)}` +
    `&scope=user,repo` +
    `&state=${state}`;

  return res.redirect(githubAuthUrl);
};

// This works when the user click on authorize
export const handleCallback = async (req, res) => {
  const { code, state } = req.query;

  if (!code)
    return res.status(400).json({
      message: "Missing OAuth authorization code parameter.",
    });

  const decoded = jwt.verify(state, process.env.JWT_SECRET);
  const currentUserId = decoded.userId;

  try {
    // Fetch all data needed using the code exchanged with token
    const token = await githubService.getAccessToken(code);
    const ghProfile = await githubService.getUserProfile(token);
    const ghRepos = await githubService.getUserRepositories(
      token,
      ghProfile.login,
    );

    const languagesSet = new Set();
    ghRepos.forEach((repo) => {
      if (repo.language) languagesSet.add(repo.language);
    });
    // We only keep the top 10 unique languages for simplicity and relevance in the portfolio.
    const topLanguages = Array.from(languagesSet).slice(0, 20);

    console.log("STATE:", state);

    console.log("DECODED:", decoded);

    console.log("CURRENT USER:", currentUserId);

    // We either create a new user or update the existing one with the latest GitHub data.
    const user = await User.findById(currentUserId);

    if (!user) {
      throw new Error("User not found");
    }

    const existingGithubUser = await User.findOne({
      githubId: ghProfile.id.toString(),
    });

    if (
      existingGithubUser &&
      existingGithubUser._id.toString() !== currentUserId
    ) {
      return res.redirect(
        `${FRONTEND_URL}/connect?status=github-already-linked`,
      );
    }

    // same user reconnecting → update
    user.githubId = ghProfile.id.toString();

    user.githubUsername = ghProfile.login;

    user.avatarUrl = ghProfile.avatar_url;

    user.followers = ghProfile.followers || 0;

    user.publicReposCount = ghProfile.public_repos || 0;

    user.topLanguages = topLanguages;

    user.accessToken = token;

    await user.save();
    // const user = await User.findById(req.user.id);

    // user.githubId = ghProfile.id.toString();
    // user.githubUsername = ghProfile.login;
    // user.avatarUrl = ghProfile.avatar_url;

    // await user.save();

    await Repository.deleteMany({ userId: user._id });

    for (const repo of ghRepos.slice(0, 15)) {
      const daysAgo = Math.floor(Math.random() * 10) + 1;
      const newRepo = new Repository({
        userId: user._id,
        githubRepoId: repo.id.toString(),
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stargazersCount: repo.stargazers_count,
        updatedAtCustom: repo.updated_at
          ? `${new Date(repo.updated_at).toLocaleDateString()}`
          : `${daysAgo} days ago`,
        htmlUrl: repo.html_url,
      });
      await newRepo.save();
    }

    // JWT is a long encrypted string that identify the user here it's the userID to solve the problem that express is stateless and don't remember the user
    // It's expired in 7 days
    const clientToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Redirect back to the frontend with the JWT token (clientToken) in the query parameters for authentication and session management.
    return res.redirect(
      `${FRONTEND_URL}/connect?status=success&token=${clientToken}`,
    );
  } catch (error) {
    console.error("❌ Callback Routing Failure:", error.message);
    return res.redirect(
      `http://localhost:5173?status=error&message=${encodeURIComponent(error.message)}`,
    );
  }
};

// This is used by frontend to get the connected GitHub account data (profile and repositories) using the clientToken we store in the local storage
// for display and portfolio generation after the user has authenticated and connected their GitHub account.
// It fetches the user data from our database and returns it in the response.
export const getConnectedAccountData = async (req, res) => {
  console.log("CONNECTED USER:", req.user.id);
  try {
    const user = await User.findById(req.user.id).select("-accessToken");
    // const user = await GithubUser.findById(req.user.id).select("-accessToken");
    if (!user)
      return res
        .status(404)
        .json({ message: "User metrics profiles not found." });

    const repositories = await Repository.find({ userId: user._id });
    return res.json({ user, repositories });
  } catch (error) {
    return res.status(500).json({
      message: "Failed fetching profile snapshot metrics layers.",
      error: error.message,
    });
  }
};

// This is the core function that takes the selected repositories from the frontend and uses our AI service to generate the portfolio content.
export const generateAIPortfolio = async (req, res) => {
  const { repoIds } = req.body;
  if (!repoIds || !Array.isArray(repoIds) || repoIds.length === 0) {
    return res.status(400).json({
      message: "Please provide at least one valid repository ID target.",
    });
  }

  console.log("GENERATE USER:", req.user.id);

  try {
    const user = await User.findById(req.user.id);
    // const user = await GithubUser.findById(req.user.id);
    const selectedRepos = await Repository.find({
      _id: { $in: repoIds },
      userId: user._id,
    });

    console.log("Before Gemini");
    // Here we call our AI service to generate the portfolio content based on the user's profile and the selected repositories.
    let generatedData;

    try {
      generatedData = await aiService.generatePortfolioContent(
        user,
        selectedRepos,
      );
    } catch (error) {
      console.error("Gemini failed:", error.message);

      console.log("Using fallback portfolio data");

      generatedData = {
        heroTitle: "Frontend Developer",
        aboutMe: "Passionate developer building modern web applications.",

        skillsSummary: ["JavaScript", "React", "HTML", "CSS"],

        projectCaseStudies: selectedRepos.map((repo) => ({
          repoName: repo.name,
          aiDescription: repo.description || "Project imported from GitHub.",

          suggestedTags: [repo.language || "General"],
        })),
      };
    }
    console.log("After Gemini");

    let portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) {
      portfolio = new Portfolio({
        userId: user._id,
        selectedRepositories: repoIds,
        aiGeneratedContent: generatedData,

        aboutMe: {
          headline: generatedData.heroTitle,
          biography: generatedData.aboutMe,
          interests: "",
        },

        skills: generatedData.skillsSummary.map((skill) => ({
          name: skill,
          proficiency: 80,
        })),

        projects: generatedData.projectCaseStudies.map((project) => ({
          title: project.repoName,
          description: project.aiDescription,
          technologies: project.suggestedTags || [],
          highlights: [],
        })),
      });
    } else {
      portfolio.selectedRepositories = repoIds;
      portfolio.aiGeneratedContent = generatedData;

      portfolio.aboutMe = {
        headline: generatedData.heroTitle,
        biography: generatedData.aboutMe,
        interests: "",
      };

      portfolio.skills = generatedData.skillsSummary.map((skill) => ({
        name: skill,
        proficiency: 80,
      }));

      portfolio.projects = generatedData.projectCaseStudies.map((project) => ({
        title: project.repoName,
        description: project.aiDescription,
        technologies: project.suggestedTags || [],
        highlights: [],
      }));
    }

    await portfolio.save();

    return res.json({
      message: "✨ Portfolio content synthesized perfectly!",
      portfolio,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to synthesize profile content structures.",
      error: error.message,
    });
  }
};

// This function gets the portfolio of the user
export const getUserPortfolio = async (req, res) => {
  console.log("GET PORTFOLIO USER:", req.user.id);
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });

    console.log("PORTFOLIO:", portfolio);

    console.log("GET PORTFOLIO USER:", req.user.id);
    if (!portfolio) {
      return res.status(404).json({
        message:
          "No generated portfolio found for this user. Please generate one first.",
      });
    }

    return res.json(portfolio);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user portfolio structure.",
      error: error.message,
    });
  }
};
