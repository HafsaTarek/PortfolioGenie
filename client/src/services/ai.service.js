import { apiClient } from "./api.client.js";

/**
 * Gemini AI Generation & Sychronization Service
 */
export const AIService = {
  /**
   * Triggers the portfolio copywriting generation pipeline
   * @param {Array<string>} repoIds - Selected MongoDB tracking IDs
   */
  async generatePortfolio(repoIds) {
    return apiClient("/generate-portfolio", {
      method: "POST",
      body: JSON.stringify({ repoIds }),
    });
  },
};
