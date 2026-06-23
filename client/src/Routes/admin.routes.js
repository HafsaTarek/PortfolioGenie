import express from "express";
import * as adminController from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, adminController.getAdminStats);
router.get("/users", authMiddleware, adminMiddleware, adminController.getAllUsers);
router.get("/users/:id", authMiddleware, adminMiddleware, adminController.getUserById);
router.delete("/users/:id", authMiddleware, adminMiddleware, adminController.deleteUser);

export default router;
