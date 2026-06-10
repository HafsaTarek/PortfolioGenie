import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    githubId: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    name: { type: String, default: "" },
    avatar: { type: String, default: "" },
    followers: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    languages: [{ type: String }],
    repoCount: { type: Number, default: 0 },
    githubAccessToken: {
      type: String,
      required: true,
      select: false,
    },
    isGithubConnected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
