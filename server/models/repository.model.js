import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    githubId: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    stars: { type: Number, default: 0 },
    language: { type: String, default: "Unknown" },
    updatedAt: { type: Date, required: true },
    htmlUrl: { type: String, required: true },
    selected: { type: Boolean, default: false },
  },
  { timestamps: true },
);

repositorySchema.index({ userId: 1, githubId: 1 }, { unique: true });
export default mongoose.model("Repository", repositorySchema);
