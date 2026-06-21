import mongoose from "mongoose";

const RepositorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    githubRepoId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    language: { type: String },
    stargazersCount: { type: Number, default: 0 },
    updatedAtCustom: { type: String },
    htmlUrl: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Repository", RepositorySchema);
