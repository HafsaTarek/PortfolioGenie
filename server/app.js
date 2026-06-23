import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import githubRoutes from "./routes/github.routes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (/^http:\/\/localhost:\d+$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json());

// Serve uploaded profile images as static files
// __dirname = server/ → uploads folder is server/uploads/
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/github", githubRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get("/health", (req, res) =>
  res.json({ status: "active", engine: "PortfolioGenie Core Engine" }),
);

export default app;


