import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI(); // Implicitly references process.env.GEMINI_API_KEY

export const generatePortfolioContent = async (userProfile, selectedRepos) => {
  const repoContext = selectedRepos.map((repo) => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
  }));

  const systemInstruction = `
    You are an expert technical recruiter. Analyze raw code repository parameters to build high-converting professional web portfolio text copy assets.
    You must output your answer strictly as a clean JSON layout matching the structure requested. Do not include markdown or text wrapping wrappers.
  `;

  const userPrompt = `
    Developer Name: ${userProfile.name}
    GitHub Profile Biography: ${userProfile.bio}
    Selected Repositories to Analyze and Feature: ${JSON.stringify(repoContext)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            biography: { type: Type.STRING },
            interests: { type: Type.ARRAY, items: { type: Type.STRING } },
            contentScore: { type: Type.INTEGER },
            seoScore: { type: Type.INTEGER },
            skills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  percentage: { type: Type.INTEGER },
                },
                required: ["name", "percentage"],
              },
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  technologies: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  keyHighlights: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: [
                  "title",
                  "description",
                  "technologies",
                  "keyHighlights",
                ],
              },
            },
          },
          required: [
            "headline",
            "biography",
            "interests",
            "skills",
            "projects",
            "contentScore",
            "seoScore",
          ],
        },
      },
      contents: userPrompt,
    });

    return JSON.parse(response.text);
  } catch (err) {
    console.error("Gemini Optimization Failure:", err);
    throw new Error("AI Content generation layer tracking execution break.");
  }
};
