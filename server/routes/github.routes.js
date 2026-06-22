import express from "express";
const router = express.Router();

// '*' to match all controller's named exported functions
import * as githubController from "../controllers/github.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

// Public end points
// these entry points used to redirect the user to github to authenticate himself
router.get("/connect", githubController.redirectToGithub);
// This is the callback url the github back with it including the code so it goes to handleCallback to exchange the code with the token
router.get("/callback", githubController.handleCallback);

// Protected workspace query hooks (requires headers validation tokens)
// Check if the user is authenticated and he has a clientToken it goes to get connected account data from the db
router.get(
  "/account",
  authMiddleware,
  githubController.getConnectedAccountData,
);

// If the user is authenticated we generate a portfolio to him and save it in the db
router.post(
  "/generate-portfolio",
  authMiddleware,
  githubController.generateAIPortfolio,
);



export default router;
