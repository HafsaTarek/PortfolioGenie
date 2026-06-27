import express from "express";
const router = express.Router();

import * as portfolioController from "../controllers/portfolio.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.get("/", authMiddleware, portfolioController.getPortfolioContent);

router.put("/about", authMiddleware, portfolioController.updateAboutSection);

router.post("/skills", authMiddleware, portfolioController.addSkill);

router.put(
  "/skills/:skillId",
  authMiddleware,
  portfolioController.updateSkill,
);

router.delete(
  "/skills/:skillId",
  authMiddleware,
  portfolioController.deleteSkill,
);

router.post("/projects", authMiddleware, portfolioController.addProject);

router.put(
  "/projects/:projectId",
  authMiddleware,
  portfolioController.updateProject,
);

router.delete(
  "/projects/:projectId",
  authMiddleware,
  portfolioController.deleteProject,
);

export default router;