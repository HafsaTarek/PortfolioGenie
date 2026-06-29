// controllers/dashboard.controller.js

import User from "../models/User.model.js";
import Repository from "../models/repository.model.js";
import Portfolio from "../models/portfolio.model.js";

export const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-accessToken");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const repositories = await Repository.find({
      userId: user._id,
    }).sort({ createdAt: -1 });

    const portfolio = await Portfolio.findOne({
      userId: user._id,
    });

    // const completionItems = [
    //   !!user.githubUsername,
    //   !!user.bio,
    //   !!portfolio?.aboutMe?.biography,
    //   portfolio?.skills?.length >= 5,
    //   portfolio?.projects?.length >= 3,
    // ];

    // const completion = Math.round(
    //   (completionItems.filter(Boolean).length / completionItems.length) * 100,
    // );

    let score = 0;

    if (user.githubUsername) score += 20;

    if (user.bio?.trim()) score += 20;

    if (portfolio?.aboutMe?.biography?.trim()) score += 20;

    score += Math.min((portfolio?.skills?.length || 0) * 2, 20);

    score += Math.min((portfolio?.projects?.length || 0) * 4, 20);

    const completion = score;

    return res.json({
      user,

      stats: {
        repositories: user.publicReposCount,
        followers: user.followers,
        languages: user.topLanguages.length,
      },

      completion,

      topLanguages: user.topLanguages,

      recentRepositories: repositories.slice(0, 6),

      portfolio: portfolio || null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed loading dashboard",
      error: error.message,
    });
  }
};
