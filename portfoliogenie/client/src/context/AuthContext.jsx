import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../services/api.client";
import { AuthService } from "../services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app load, check if there's a saved token and fetch the current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (AuthService.isAuthenticated()) {
        try {
          const userData = await apiClient.get("/auth/me");
          setUser(userData);
        } catch {
          AuthService.logout();
        }
      }
      setIsLoading(false);
    };
    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    const data = await apiClient.post("/auth/login", { email, password });
    AuthService.setToken(data.token);
    const userData = await apiClient.get("/auth/me");
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password, confirmPassword) => {
    const data = await apiClient.post("/auth/signup", {
      name,
      email,
      password,
      confirmPassword,
    });
    return data;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  // ── Profile functions ──────────────────────────────────────────────────────

  const getUserProfile = async () => {
    const data = await apiClient.get("/user/profile");
    setUser(data);
    return data;
  };

  // formData is a FormData object (supports file upload)
  const updateUserProfile = async (formData) => {
    const data = await apiClient.put("/user/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setUser(data);
    return data;
  };


  const changeUserPassword = async (currentPassword, newPassword) => {
    const data = await apiClient.put("/user/change-password", {
      currentPassword,
      newPassword,
    });
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        getUserProfile,
        updateUserProfile,
        changeUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
