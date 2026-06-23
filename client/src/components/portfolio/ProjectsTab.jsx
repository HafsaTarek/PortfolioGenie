import { useState, useEffect } from "react";
import { Card, SectionHeader } from "../common";
import ProjectCard from "./ProjectCard";
import CTAButton from "../shared/button/CTAButton";
import { PlusIcon } from "../icons/icons";
import { PortfolioService } from "../../services/portfolio.service";

import styles from "./ProjectsTab.module.css";

export default function ProjectsTab({
  projects: initialProjects,
}) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(initialProjects || []);
  }, [initialProjects]);

  const handleAdd = async () => {
    try {
      const response =
        await PortfolioService.addProject({
          title: "New Project",
          description: "",
          technologies: [],
          highlights: [],
        });

      setProjects(response.projects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await PortfolioService.deleteProject(id);

      setProjects((current) =>
        current.filter(
          (project) => project._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <SectionHeader
        title="Projects"
        actions={
          <CTAButton
            variant="primary"
            size="small"
            icon={<PlusIcon />}
            onClick={handleAdd}
          >
            Add Project
          </CTAButton>
        }
      />

      {projects.length === 0 ? (
        <p className={styles.empty}>
          No projects yet. Add your first project to
          start building your portfolio.
        </p>
      ) : (
        <div className={styles.list}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </Card>
  );
}