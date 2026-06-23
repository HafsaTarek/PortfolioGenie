// Loads variables from .env automatically
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `🚀 PortfolioGenie Server running smoothly on http://localhost:${PORT}`,
    );
  });
});
