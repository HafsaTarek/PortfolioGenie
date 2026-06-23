// Admin service contains data aggregation and user management logic for admin APIs.

import userRepository from "../repositories/user.repository.js";
import dashboardStats from "../data/dashboard.js";

const getAdminStats = async () => {
  return dashboardStats.admin;
};

const getAllUsers = async () => {
  return userRepository.findAll();
};

const getUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error("User not found.");
  }
  return user;
};

const deleteUserById = async (id) => {
  const deletedUser = await userRepository.deleteUser(id);
  if (!deletedUser) {
    throw new Error("User not found.");
  }
  return deletedUser;
};

export default {
  getAdminStats,
  getAllUsers,
  getUserById,
  deleteUserById,
};
