// const PortfolioSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },

//   selectedRepositories: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "Repository" },
//   ],

//   aiGeneratedContent: {
//     heroTitle: String,
//     aboutMe: String,
//     skillsSummary: [String],
//     projectCaseStudies: [
//       {
//         repoName: String,
//         aiDescription: String,
//         suggestedTags: [String],
//       },
//     ],
//   },

//   aboutMe: {
//     headline: String,
//     biography: String,
//     interests: [String],
//   },

//   skills: [
//     {
//       name: String,
//       proficiency: String,
//     },
//   ],

//   projects: [
//     {
//       title: String,
//       description: String,
//       technologies: [String],
//       highlights: [String],
//     },
//   ],
// },
// { timestamps: true });
import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selectedRepositories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Repository" },
    ],
    aiGeneratedContent: {
      heroTitle: { type: String },
      aboutMe: { type: String },
      skillsSummary: [{ type: String }],
      projectCaseStudies: [
        {
          repoName: { type: String },
          aiDescription: { type: String },
          suggestedTags: [{ type: String }],
        },
      ],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Portfolio", PortfolioSchema);
