import axios from "axios";

class GitHubService {
  async getAccessToken(code) {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT_URL,
      },
      {
        headers: { Accept: "application/json" },
      },
    );

    if (response.data.error) {
      throw new Error(
        response.data.error_description || "OAuth token exchange failed",
      );
    }
    return response.data.access_token;
  }

  async getUserProfile(token) {
    const response = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async getUserRepositories(token, username) {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  }
}

export default new GitHubService();
