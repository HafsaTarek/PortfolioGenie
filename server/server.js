import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`PortfolioGenie Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Logged Application Failure: ${err.message}`);
  server.close(() => process.exit(1));
});
