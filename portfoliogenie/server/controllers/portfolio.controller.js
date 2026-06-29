import Portfolio from "../models/portfolio.model.js";

// Get Portfolio Content
export const getPortfolioContent = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      userId: req.user.id,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio content not found.",
      });
    }

    return res.json(portfolio);
  } catch (error) {
    return res.status(500).json({
      message: "Failed fetching portfolio content.",
      error: error.message,
    });
  }
};

// Update About Section
export const updateAboutSection = async (req, res) => {
  const { headline, biography, interests } = req.body;

  try {
    const portfolio = await Portfolio.findOne({
      userId: req.user.id,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio content not found.",
      });
    }

    portfolio.aboutMe = {
      headline,
      biography,
      interests,
    };

    await portfolio.save();

    return res.json({
      message: "About section updated successfully",
      aboutMe: portfolio.aboutMe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed updating about section.",
      error: error.message,
    });
  }
};

// Add Skill
export const addSkill = async (req, res) => {
  const { name, level } = req.body;

  try {
    const portfolio = await Portfolio.findOne({
      userId: req.user.id,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio content not found.",
      });
    }

    portfolio.skills.push({
      name,
      level,
    });

    await portfolio.save();

    return res.json({
      message: "Skill added successfully",
      skills: portfolio.skills,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed adding skill.",
      error: error.message,
    });
  }
};

// Update Skill
export const updateSkill = async (req, res) => {
  const { skillId } = req.params;
  const { name, level } = req.body;

  try {
    const portfolio = await Portfolio.findOne({
      userId: req.user.id,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio content not found.",
      });
    }

    const skill = portfolio.skills.id(skillId);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found.",
      });
    }

    skill.name = name ?? skill.name;
    skill.level = level ?? skill.level;

    await portfolio.save();

    return res.json({
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed updating skill.",
      error: error.message,
    });
  }
};

// Delete Skill
export const deleteSkill = async (req, res) => {
  const { skillId } = req.params;

  try {
    const portfolio = await Portfolio.findOne({
      userId: req.user.id,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio content not found.",
      });
    }

    portfolio.skills = portfolio.skills.filter(
      (skill) => skill._id.toString() !== skillId,
    );

    await portfolio.save();

    return res.json({
      message: "Skill removed successfully",
      skills: portfolio.skills,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed removing skill.",
      error: error.message,
    });
  }
};

// Add Project
export const addProject = async (req, res) => {
  const { title, description, technologies, highlights } = req.body;

  try {
    const portfolio = await Portfolio.findOne({
      userId: req.user.id,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio content not found.",
      });
    }

    portfolio.projects.push({
      title,
      description,
      technologies,
      highlights,
    });

    await portfolio.save();

    return res.json({
      message: "Project added successfully",
      projects: portfolio.projects,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed adding project.",
      error: error.message,
    });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, technologies, highlights } = req.body;

  try {
    const portfolio = await Portfolio.findOne({
      userId: req.user.id,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio content not found.",
      });
    }

    const project = portfolio.projects.id(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    project.title = title ?? project.title;
    project.description = description ?? project.description;
    project.technologies = technologies ?? project.technologies;
    project.highlights = highlights ?? project.highlights;

    await portfolio.save();

    return res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed updating project.",
      error: error.message,
    });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const portfolio = await Portfolio.findOne({
      userId: req.user.id,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio content not found.",
      });
    }

    portfolio.projects = portfolio.projects.filter(
      (project) => project._id.toString() !== projectId,
    );

    await portfolio.save();

    return res.json({
      message: "Project removed successfully",
      projects: portfolio.projects,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed removing project.",
      error: error.message,
    });
  }
};
