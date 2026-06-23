import express from "express";
import * as userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, userController.getProfile);
router.get("/dashboard/stats", authMiddleware, userController.getDashboardStats);
router.get("/projects", authMiddleware, userController.getProjects);

export default router;
