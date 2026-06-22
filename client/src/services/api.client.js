import axios from "axios";
import { API_BASE_URL } from "../config/api";

/**
 * Core API Request Engine Wrapper using Axios with specific properties to use directly
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors intercept and monitor any request and do the following

// Request interceptor that get the token from local storage to put in headers for authentication check
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

// Response Interceptor that intercept the response coming from the backend and takes only the data & neglect any unecessary data like header and status
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || "API Request failed";
    console.error("🚨 API Error:", errorMessage);

    // 401 Status means that the user token is expired (7 days) so we remove it from the local storage
    // 401 status code means: request failed because it lacks valid authentication credentials.
    if (error.response?.status === 401) {
      localStorage.removeItem("portfolio_genie_token");
    }

    // End this promise and throw the error
    return Promise.reject(new Error(errorMessage));
  },
);
