// Controller for admin dashboard routes.

import adminService from "../services/admin.service.js";
import { successResponse, errorResponse } from "../utils/response.util.js";

export const getAdminStats = async (req, res) => {
  try {
    const stats = await adminService.getAdminStats();
    return successResponse(res, { stats }, "Admin stats fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    return successResponse(res, { users }, "Users fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await adminService.getUserById(req.params.id);
    return successResponse(res, { user }, "User fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message, 404);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await adminService.deleteUserById(req.params.id);
    return successResponse(res, { user }, "User deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message, 404);
  }
};
