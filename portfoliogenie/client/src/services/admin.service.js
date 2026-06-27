import { apiClient } from "./api.client";

export class AdminService {
  static async getStats() {
    return apiClient.get("/api/admin/stats");
  }

  static async getUsers() {
    return apiClient.get("/api/admin/users");
  }

  static async getUser(id) {
    const response = await apiClient.get(`api/admin/users/${id}`);
    return response.data;
  }

  static async deleteUser(id) {
    const response = await apiClient.delete(`api/admin/users/${id}`);
    return response.data;
  }
}
