// User service contains business logic for user dashboard APIs.

import userRepository from "../repositories/user.repository.js";
import dashboardStats from "../data/dashboard.js";
import projects from "../data/projects.js";

const getUserProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    githubUsername: user.githubUsername,
    role: user.role,
    bio: user.bio,
    profileImage: user.profileImage,
  };
};

const getUserDashboardStats = async () => {
  return dashboardStats.user;
};

const getUserProjects = async () => {
  return projects;
};

export default {
  getUserProfile,
  getUserDashboardStats,
  getUserProjects,
};
