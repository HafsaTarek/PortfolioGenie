import { apiClient } from "./api.client.js";

/**
 * Gemini AI Generation & Sychronization Service
 */
export const AIService = {
  async generatePortfolio(repoIds) {
    return apiClient.post("/api/github/generate-portfolio", { repoIds });
  },
};
