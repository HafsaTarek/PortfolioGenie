import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import githubRoutes from "./routes/github.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (/^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use("/api/github", githubRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "active",
    engine: "PortfolioGenie Core Engine",
  });
});

export default app;
