// Controller for authentication routes. It validates requests and returns consistent JSON responses.

import authService from "../services/auth.service.js";
import { successResponse, errorResponse } from "../utils/response.util.js";

import { sanitizeUser } from "../utils/user.util.js";

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return successResponse(res, { user: sanitizeUser(user) }, "User registered successfully", 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);
    return successResponse(res, { user: sanitizeUser(user), token }, "Login successful");
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    return successResponse(res, { user }, "Current user fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 404);
  }
};

export const logout = async (req, res) => {
  try {
    await authService.logout();
    return successResponse(res, null, "Logout successful");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
