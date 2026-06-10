import axios from "axios";

/**
 * Exchanges authorization code for an OAuth Access Token
 */
export const getAccessTokenFromCode = async (code) => {
  const url = "https://github.com/login/oauth/access_token";
  const response = await axios.post(
    url,
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.GITHUB_REDIRECT_URL,
    },
    {
      headers: { Accept: "application/json" },
    },
  );
  return response.data.access_token;
};

/**
 * Fetches authenticated user profile profile info
 */
export const getGitHubProfile = async (accessToken) => {
  const response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

/**
 * Fetches public repositories for the authenticated user
 */
export const getGitHubRepositories = async (accessToken) => {
  // Fetches up to 100 public repositories sorted by recent updates
  const response = await axios.get("https://api.github.com/user/repos", {
    params: {
      visibility: "public",
      affiliation: "owner",
      sort: "updated",
      per_page: 100,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });
  return response.data;
};
