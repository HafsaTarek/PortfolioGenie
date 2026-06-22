import express from "express";
// This is used to enable our platform to communicate (send requests and recieve rescponses) with our server/backend
import cors from "cors";
import githubRoutes from "./routes/github.routes.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/github", githubRoutes);

app.get("/health", (req, res) =>
  res.json({ status: "active", engine: "PortfolioGenie Core Engine" }),
);

export default app;
