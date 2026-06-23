// Repository layer for user data access. This isolates persistence from service and controller logic.

import users from "../data/users.js";

const findByEmail = async (email) => {
  return users.find((user) => user.email === email) || null;
};

const findById = async (id) => {
  return users.find((user) => user.id === id) || null;
};

const findByGithubUsername = async (githubUsername) => {
  return users.find((user) => user.githubUsername === githubUsername) || null;
};

const findAll = async () => {
  return [...users];
};

const createUser = async (userData) => {
  const newUser = { ...userData, id: `u${users.length + 1}` };
  users.push(newUser);
  return newUser;
};

const deleteUser = async (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index < 0) return null;
  return users.splice(index, 1)[0];
};

export default {
  findByEmail,
  findById,
  findByGithubUsername,
  findAll,
  createUser,
  deleteUser,
};
