import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import githubRoutes from "./routes/github.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/github", githubRoutes);

app.get("/health", (req, res) =>
  res.json({ status: "active", engine: "PortfolioGenie Core Engine" }),
);

app.use(errorHandler);

export default app;
