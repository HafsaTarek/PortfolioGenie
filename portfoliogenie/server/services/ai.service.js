import { GoogleGenAI, Type } from "@google/genai";

class AIService {
  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  // =============================
  // Gemini Generation
  // =============================

  async generatePortfolioContent(profileData, repositories) {
    const safeRepos = repositories || [];
    const safeLanguages = profileData.topLanguages || [];

    const reposSummary = safeRepos.map((repo) => ({
      name: repo.name,
      description: repo.description || "",
      language: repo.language || "",
    }));

    const prompt = `
You are an expert software engineering portfolio writer.

Developer Name:
${profileData.name}

Bio:
${profileData.bio || "Not provided"}

GitHub Languages:
${safeLanguages.join(", ")}

Repositories:
${JSON.stringify(reposSummary)}

Generate JSON only.

{
 "heroTitle":"",
 "aboutMe":"",
 "skillsSummary":[],
 "projectCaseStudies":[]
}
`;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              heroTitle: {
                type: Type.STRING,
              },
              aboutMe: {
                type: Type.STRING,
              },
              skillsSummary: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
              },
              projectCaseStudies: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    repoName: {
                      type: Type.STRING,
                    },
                    aiDescription: {
                      type: Type.STRING,
                    },
                    suggestedTags: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.STRING,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      console.log("✅ Gemini Success");

      return JSON.parse(response.text);
    } catch (error) {
      console.error(error);

      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("Gemini unavailable.");
      console.log("Using Smart Local AI Generator");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      return this.generateFallback(profileData, repositories);
    }
  }

  // ======================================
  // Smart Local Generator (No Gemini Needed)
  // ======================================

  generateFallback(profileData, repositories) {
    const languages = [...new Set(profileData.topLanguages || [])];

    let heroTitle = "Software Developer";

    if (languages.includes("React")) {
      heroTitle = "Frontend React Developer";
    } else if (
      languages.includes("Node.js") ||
      languages.includes("JavaScript")
    ) {
      heroTitle = "Full Stack JavaScript Developer";
    } else if (languages.includes("Python")) {
      heroTitle = "Python Developer";
    } else if (languages.includes("Java")) {
      heroTitle = "Java Developer";
    }

    const aboutMe = `${
      profileData.name
    } is a passionate software developer specializing in ${languages.join(
      ", ",
    )}. The portfolio showcases projects imported directly from GitHub and demonstrates practical experience building real-world software solutions with modern technologies.`;

    const skillsSummary = languages;

    const projectCaseStudies = (repositories || []).map((repo) => {
      let description = "";

      if (repo.description && repo.description.trim() !== "") {
        description = `${repo.description}. This project demonstrates practical experience with ${
          repo.language || "modern software development"
        } while emphasizing clean code, maintainability, and real-world application development.`;
      } else {
        description = `A ${
          repo.language || "software"
        } project focused on implementing reliable features, clean architecture, and maintainable code. Built to strengthen practical development skills and showcase modern programming techniques.`;
      }

      return {
        repoName: repo.name,
        aiDescription: description,
        suggestedTags: [repo.language || "Software", "GitHub", "Portfolio"],
      };
    });

    return {
      heroTitle,
      aboutMe,
      skillsSummary,
      projectCaseStudies,
    };
  }
}

export default new AIService();
