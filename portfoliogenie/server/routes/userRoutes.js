import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, changePassword, upload } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

// upload.single("profileImage") handles the file field named "profileImage"
router.put("/profile", authMiddleware, upload.single("profileImage"), updateProfile);

router.put("/change-password", authMiddleware, changePassword);

export default router;