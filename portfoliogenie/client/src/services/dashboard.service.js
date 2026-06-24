// services/dashboard.service.js

import { apiClient } from "./api.client";

export const DashboardService = {
  async getDashboardData() {
    return apiClient.get("/api/dashboard");
  },
};