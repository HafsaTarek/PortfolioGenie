import { API_BASE_URL } from "../config/api.js";

/**
 * Core API Request Engine Wrapper
 */
export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem("portfolio_genie_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Request failed at ${endpoint}`);
  }

  return response.json();
};
