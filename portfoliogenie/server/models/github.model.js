import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
  const GithubUserSchema = new mongoose.Schema(
  {
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    name: { type: String },
    avatarUrl: { type: String },
    followers: { type: Number, default: 0 },
    publicReposCount: { type: Number, default: 0 },
    topLanguages: [{ type: String }],

    // This is used to communicate with GitHub API.
    // This is the token our backend takes from the user when he connected to our platform by his github account
    // To access his github public repos., and their codes
    // Our backend takes all the data accessed by this github access token and give it as a prompt to Gemini to analyse it
    accessToken: { type: String, required: true },
  },
  { timestamps: true },
);

// export default mongoose.model("User", UserSchema);
export default mongoose.model("GithubUser", GithubUserSchema);
