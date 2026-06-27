import mongoose from "mongoose";
const PortfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    selectedRepositories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repository",
      },
    ],

    aiGeneratedContent: {
      heroTitle: String,
      aboutMe: String,

      skillsSummary: [String],

      projectCaseStudies: [
        {
          repoName: String,
          aiDescription: String,
          suggestedTags: [String],
        },
      ],
    },

    aboutMe: {
      headline: {
        type: String,
        default: "",
      },

      biography: {
        type: String,
        default: "",
      },

      interests: {
        type: String,
        default: "",
      },
    },

    skills: [
      {
        name: String,
        proficiency: {
          type: Number,
          default: 80,
        },
      },
    ],

    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
        highlights: [String],
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Portfolio", PortfolioSchema);
