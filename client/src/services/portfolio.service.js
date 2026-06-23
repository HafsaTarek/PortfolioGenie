import { apiClient } from "./api.client";

export const PortfolioService = {
  // Get Portfolio Data
  async getPortfolio() {
    return apiClient.get("/api/portfolio");
  },

  // About Me
  async updateAbout(data) {
    return apiClient.put("/api/portfolio/about", data);
  },

  // Skills
  async addSkill(skill) {
    return apiClient.post("/api/portfolio/skills", skill);
  },


  async updateSkill(skillId, data) {
    return apiClient.put(
      `/api/portfolio/skills/${skillId}`,
      data
    );
  },

  async deleteSkill(skillId) {
    return apiClient.delete(
      `/api/portfolio/skills/${skillId}`
    );
  },

  // Projects
  async addProject(project) {
    return apiClient.post(
      "/api/portfolio/projects",
      project
    );
  },

  async updateProject(projectId, data) {
    return apiClient.put(
      `/api/portfolio/projects/${projectId}`,
      data
    );
  },

  async deleteProject(projectId) {
    return apiClient.delete(
      `/api/portfolio/projects/${projectId}`
    );
  },
};