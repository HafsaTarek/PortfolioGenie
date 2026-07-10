/**
  -PortfolioGenie API Endpoint Configuration Switchboard
  -Automatically detects environment states to prevent hardcoded URL bugs.
 */

const PRODUCTION_URL = "https://api.portfoliogenie.com";
const DEVELOPMENT_URL = "http://localhost:5000";

export const API_BASE_URL =
  import.meta.env.MODE === "production" ? PRODUCTION_URL : DEVELOPMENT_URL;
