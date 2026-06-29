// GoogleGenAI is a library enable us to communicate with gemini
import { GoogleGenAI, Type } from "@google/genai";

class AIService {
  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  // Gemini Generation
  async generatePortfolioContent(profileData, repositories) {
    const safeRepos = repositories || [];
    const safeLanguages = profileData.topLanguages || [];

    const reposSummary = safeRepos.map((repo) => ({
      name: repo.name,
      description: repo.description || "",
      language: repo.language || "",
      htmlUrl: repo.htmlUrl || "",
      updatedAt: repo.updatedAtCustom || "",
    }));

    const prompt = `
You are a Senior Software Engineer, Technical Recruiter, Portfolio Reviewer, and Professional Technical Writer.

Your task is to analyze a developer's GitHub profile and repositories and generate professional portfolio content that helps them impress recruiters and hiring managers.

The output should sound natural, modern, confident, and realistic.

Never mention that you are an AI.

Never mention that the content was generated automatically.

Never mention GitHub analysis unless it naturally fits the sentence.

Never invent work experience, companies, degrees, certifications, or achievements.

Only infer skills and specialization from the available repositories and profile information.

--------------------------------------------------
Developer Information
--------------------------------------------------

Name:
${profileData.name}

GitHub Bio:
${profileData.bio || "Not provided"}

GitHub Username:
${profileData.githubUsername || ""}

Top Languages:
${safeLanguages.join(", ")}

Repositories:
${JSON.stringify(reposSummary, null, 2)}

--------------------------------------------------
Analysis Instructions
--------------------------------------------------

First, carefully analyze all repositories.

Determine:

• Primary programming languages
• Frameworks and libraries
• Types of applications
• Project complexity
• Architecture quality
• Consistency between projects
• Developer specialization
• Technical strengths
• Software engineering maturity
• Technologies that appear most frequently

If the GitHub bio is empty, missing, too generic, or shorter than 15 characters, ignore it completely.

Instead, infer a professional biography from repository analysis.

Do NOT mention that the biography was inferred.

Do NOT expose your reasoning.

--------------------------------------------------
Hero Title
--------------------------------------------------

Generate ONE concise professional headline.

Requirements:

• Maximum 8 words
• No emojis
• No name
• No punctuation at the end
• Sound like a LinkedIn title

Good examples:

Frontend React Developer

Full Stack JavaScript Developer

Software Engineer

Backend Node.js Developer

Mobile Application Developer

UI Engineer

Do NOT generate titles like

Passionate Developer

Coding Enthusiast

Programming Lover

Hardworking Engineer

--------------------------------------------------
About Me
--------------------------------------------------

Generate a professional portfolio biography.

Length:
120–180 words.

Requirements:

• Introduce the developer naturally.

• Mention strongest technologies.

• Mention project types.

• Mention software engineering practices when visible.

Examples:

Responsive UI

REST APIs

Authentication

Database Design

State Management

Clean Architecture

Reusable Components

Performance Optimization

Version Control

Problem Solving

• Mention practical development experience.

• Mention continuous learning only if supported.

• Sound professional.

• Avoid buzzwords.

Do NOT say:

"I am passionate..."

"I love coding..."

"My journey..."

"I have always..."

Instead write as an experienced portfolio writer would.

--------------------------------------------------
Skills Summary
--------------------------------------------------

Generate an array of ONLY technical skills.

Rules:

• Remove duplicates.

• Include programming languages.

• Include frameworks.

• Include libraries.

• Include databases.

• Include developer tools.

• Include platforms.

Maximum 15 skills.

Order them by importance.

Example

[
"JavaScript",
"React",
"Node.js",
"Express",
"MongoDB",
"HTML",
"CSS",
"Git",
"REST APIs"
]

--------------------------------------------------
Project Analysis
--------------------------------------------------

Analyze every repository.

For each project generate:

repoName

aiDescription

suggestedTags

Description Rules

Write 2-3 professional sentences.

Sentence 1

Explain what the project is.

Sentence 2

Explain the technologies used.

Sentence 3

Mention software engineering practices or what the project demonstrates.

Do NOT simply rewrite the GitHub description.

Improve it.

If the repository has no description, intelligently infer its purpose from its name and language.

Examples:

A responsive web application developed with React and modern CSS techniques. The project demonstrates reusable component architecture, responsive layouts, and clean front-end development practices.

A backend REST API built with Node.js and Express that focuses on scalable routing, authentication, and maintainable server-side architecture.

--------------------------------------------------
Suggested Tags
--------------------------------------------------

Generate 3–5 tags.

Examples

React

Node.js

MongoDB

REST API

Portfolio

Authentication

JavaScript

Tailwind CSS

Responsive Design

--------------------------------------------------
Writing Style
--------------------------------------------------

Use active voice.

Professional tone.

Natural English.

Recruiter-friendly.

Avoid repetition.

Avoid clichés.

Avoid exaggerated claims.

Avoid generic motivational language.

Everything should sound like a real portfolio written by an experienced technical writer.

--------------------------------------------------
Output
--------------------------------------------------

Return ONLY valid JSON.

Do not wrap in markdown.

Do not explain anything.

Return exactly this schema.

{
  "heroTitle": "",
  "aboutMe": "",
  "skillsSummary": [],
  "projectCaseStudies": [
    {
      "repoName": "",
      "aiDescription": "",
      "suggestedTags": []
    }
  ]
}
`;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        // model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          // How the response of gemini will look like:
          responseSchema: {
            type: Type.OBJECT,

            required: [
              "heroTitle",
              "aboutMe",
              "skillsSummary",
              "projectCaseStudies",
            ],

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

                  required: ["repoName", "aiDescription", "suggestedTags"],

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
      console.log("Gemini AI DATA:", response.text);

      // Convert JSON to Object
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

  // Smart Local Generator (No Gemini Needed if gemini failed)

  generateFallback(profileData, repositories) {
    const safeRepos = repositories || [];
    const role = this.detectDeveloperRole(profileData, safeRepos);

    const rankedRepos = this.rankRepositories(safeRepos);

    return {
      heroTitle: this.buildHeroTitle(role),
      aboutMe: this.buildAboutMe(profileData, rankedRepos, role),
      skillsSummary: this.extractSkills(profileData, rankedRepos),
      projectCaseStudies: rankedRepos.map((repo) =>
        this.analyzeRepository(repo),
      ),
    };
  }
}

export default new AIService();
