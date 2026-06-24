import User from "../models/User.model.js";
import Portfolio from "../models/portfolio.model.js";
import Repository from "../models/repository.model.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const portfoliosCreated = await Portfolio.countDocuments();

    const githubConnected = await User.countDocuments({
      githubId: {
        $exists: true,
        $ne: "",
      },
    });

    const totalRepositories = await Repository.countDocuments();

    return res.status(200).json({
      totalUsers,
      portfoliosCreated,
      githubConnected,
      totalRepositories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -accessToken")
      .sort({ createdAt: -1 });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -accessToken",
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const portfolio = await Portfolio.findOne({
      userId: user._id,
    });

    const repositories = await Repository.find({
      userId: user._id,
    });

    return res.status(200).json({
      user,
      portfolio,
      repositories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await Portfolio.deleteMany({
      userId,
    });

    await Repository.deleteMany({
      userId,
    });

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
