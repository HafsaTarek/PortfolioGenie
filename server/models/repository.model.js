import mongoose from "mongoose";

const RepositorySchema = new mongoose.Schema(
  {
    // The specific user of these repos
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    githubRepoId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    language: { type: String },
    // stargazersCount: { type: Number, default: 0 },
    // Date of last update
    updatedAtCustom: { type: String },
    // Repo Link on github
    htmlUrl: { type: String },
  },
  // This allows the backend to save 2 attributes, createdAt and last updatedAt dates of the db
  { timestamps: true },
);

export default mongoose.model("Repository", RepositorySchema);
