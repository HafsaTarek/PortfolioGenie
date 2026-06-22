import axios from "axios";
import { API_BASE_URL } from "../config/api";

/**
 * Core API Request Engine Wrapper using Axios
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("portfolio_genie_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || "API Request failed";
    console.error("🚨 API Error:", errorMessage);

    if (error.response?.status === 401) {
      localStorage.removeItem("portfolio_genie_token");
    }

    return Promise.reject(new Error(errorMessage));
  },
);
