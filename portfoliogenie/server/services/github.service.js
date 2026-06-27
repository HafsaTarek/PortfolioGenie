import axios from "axios";

// This is the logic we use to communicate with third party APIs

// Here we exchange with github the temporary code back from it when the user accept to authenticate and github gives us the access token for this user
// To allow our backend to access the user github profile data
class GitHubService {
  async getAccessToken(code) {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        // This is the link that github will redirect to after the token is exchanged
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
    // returns the access token for the user to access his github profile data
    return response.data.access_token;
  }

  // Get the user data using his access token we got from the github
  async getUserProfile(token) {
    const response = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Get the user public repos using his access token we got from the github
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
