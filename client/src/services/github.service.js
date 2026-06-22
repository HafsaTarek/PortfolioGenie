import { apiClient } from "./api.client.js";

/**
 * GitHub Data & Repository Synchronization Service
 */
export const GitHubService = {
  /**
   * Fetches the user profile and imported repository nodes
   */
  async getConnectedAccount() {
    return apiClient("/api/github/account", { method: "GET" });
  },
};
