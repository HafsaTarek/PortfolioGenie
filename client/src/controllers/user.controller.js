// Controller for user dashboard routes.

import userService from "../services/user.service.js";
import { successResponse, errorResponse } from "../utils/response.util.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await userService.getUserProfile(req.user.id);
    return successResponse(res, { profile }, "User profile fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 404);
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await userService.getUserDashboardStats();
    return successResponse(res, { stats }, "Dashboard stats fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await userService.getUserProjects();
    return successResponse(res, { projects }, "Projects fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
