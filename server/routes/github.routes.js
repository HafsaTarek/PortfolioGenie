import express from "express";
import {
  connectGitHub,
  githubCallback,
  getRepositories,
  selectRepositoriesAndGenerate,
  getPortfolio,
} from "../controllers/github.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/connect", connectGitHub);
router.get("/callback", githubCallback);
router.get("/repos", protect, getRepositories);
router.post("/select", protect, selectRepositoriesAndGenerate);
router.get("/portfolio", protect, getPortfolio);

export default router;
