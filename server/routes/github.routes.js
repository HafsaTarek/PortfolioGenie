import express from "express";
const router = express.Router();

// '*' to match the controller's named exports
import * as githubController from "../controllers/github.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

// Public Entry Auth points
router.get("/connect", githubController.redirectToGithub);
router.get("/callback", githubController.handleCallback);

// Protected workspace query hooks (requires headers validation tokens)
router.get(
  "/account",
  authMiddleware,
  githubController.getConnectedAccountData,
);

router.post(
  "/generate-portfolio",
  authMiddleware,
  githubController.generateAIPortfolio,
);

export default router;
