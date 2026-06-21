import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    name: { type: String },
    avatarUrl: { type: String },
    followers: { type: Number, default: 0 },
    publicReposCount: { type: Number, default: 0 },
    topLanguages: [{ type: String }],
    accessToken: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
