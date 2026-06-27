/**
 * Authentication & Session Management Service
 */
export const AuthService = {
  getToken() {
    return localStorage.getItem("portfolio_genie_token");
  },

  setToken(token) {
    localStorage.setItem("portfolio_genie_token", token);
  },

  logout() {
    localStorage.removeItem("portfolio_genie_token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
