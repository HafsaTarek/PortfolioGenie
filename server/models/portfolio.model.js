const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  selectedRepositories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Repository" },
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
    headline: String,
    biography: String,
    interests: [String],
  },

  skills: [
    {
      name: String,
      proficiency: String,
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
{ timestamps: true });