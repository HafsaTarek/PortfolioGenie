import express from "express";
import cors from "cors";

import githubRoutes from "./routes/github.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/github", githubRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.get("/health", (req, res) =>
  res.json({ status: "active", engine: "PortfolioGenie Core Engine" }),
);

export default app;