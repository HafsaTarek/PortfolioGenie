// Authentication service handles auth logic and delegates persistence to the repository.

import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository.js";

const register = async ({ name, email, password, githubUsername, bio, profileImage }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  const newUser = await userRepository.createUser({
    name,
    email,
    password,
    githubUsername,
    role: "user",
    bio,
    profileImage,
    repositoriesCount: 0,
    connectionsCount: 0,
    commitsCount: 0,
    portfolioCompletion: 0,
    githubConnected: false,
    isActive: true,
  });
  return newUser;
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user || user.password !== password) {
    throw new Error("Invalid credentials.");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user, token };
};

const getCurrentUser = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }
  return user;
};

const logout = async () => {
  return true;
};

export default {
  register,
  login,
  getCurrentUser,
  logout,
};
