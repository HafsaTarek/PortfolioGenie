import { apiClient } from "./api.client";

export class AdminService {
  static async getStats() {
    const response = await apiClient.get("/admin/stats");
    return response.data;
  }

  static async getUsers() {
    const response = await apiClient.get("/admin/users");
    return response.data;
  }

  static async getUser(id) {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
  }

  static async deleteUser(id) {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  }
}
