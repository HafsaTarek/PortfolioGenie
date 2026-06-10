import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Repository from "../models/repository.model.js";
import Portfolio from "../models/portfolio.model.js";
import * as githubService from "../services/github.service.js";
import { generatePortfolioContent } from "../services/ai.service.js";

export const connectGitHub = (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${
    process.env.GITHUB_CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    process.env.GITHUB_REDIRECT_URL,
  )}&scope=read:user`;
  return res.status(200).json({ success: true, url });
};

export const githubCallback = async (req, res) => {
  const { code } = req.query;
  if (!code)
    return res.status(400).json({
      success: false,
      message: "OAuth operational exchange authentication code missing.",
    });

  try {
    const token = await githubService.getAccessTokenFromCode(code);
    const profile = await githubService.getGitHubProfile(token);
    const reposData = await githubService.getGitHubRepositories(token);

    const languagesSet = new Set(
      reposData.map((r) => r.language).filter(Boolean),
    );
    const uniqueLanguages = Array.from(languagesSet).slice(0, 4);

    let user = await User.findOne({ githubId: profile.id.toString() });
    const userData = {
      githubId: profile.id.toString(),
      username: profile.login,
      name: profile.name || profile.login,
      avatar: profile.avatar_url,
      followers: profile.followers || 0,
      bio: profile.bio || "",
      languages: uniqueLanguages,
      repoCount: reposData.length,
      githubAccessToken: token,
      isGithubConnected: true,
    };

    if (!user) user = new User(userData);
    else Object.assign(user, userData);
    await user.save();

    const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const upsertPromises = reposData.map((repo) =>
      Repository.findOneAndUpdate(
        {
          userId: user._id,
          githubId: repo.id,
        },
        {
          userId: user._id,
          githubId: repo.id,
          name: repo.name,
          description: repo.description || "",
          stars: repo.stargazers_count || 0,
          language: repo.language || "Unknown",
          updatedAt: new Date(repo.updated_at),
          htmlUrl: repo.html_url,
        },
        {
          upsert: true,
          new: true,
        },
      ),
    );
    await Promise.all(upsertPromises);

    return res.status(200).json({ success: true, token: appToken, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "System processing loop failure at authorization step callback.",
    });
  }
};

export const getRepositories = async (req, res) => {
  try {
    const repos = await Repository.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    return res.status(200).json({ success: true, repositories: repos });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const selectRepositoriesAndGenerate = async (req, res) => {
  const { selected } = req.body; // Expects numeric array elements: { selected: [1122, 3344] }
  if (!Array.isArray(selected) || selected.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide array of repository parameters to select.",
    });
  }

  try {
    const userId = req.user._id;

    await Repository.updateMany({ userId }, { $set: { selected: false } });
    await Repository.updateMany(
      { userId, githubId: { $in: selected } },
      { $set: { selected: true } },
    );

    const chosenRepos = await Repository.find({ userId, selected: true });

    // Call our free Gemini generation service
    const aiOutput = await generatePortfolioContent(req.user, chosenRepos);

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { userId, ...aiOutput },
      { upsert: true, new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Portfolio created with Gemini optimizations.",
      portfolio,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id });
    if (!portfolio)
      return res.status(404).json({
        success: false,
        message: "Portfolio entity context not configured.",
      });
    return res.status(200).json({ success: true, portfolio });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
