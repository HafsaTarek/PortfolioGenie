import { useState, useEffect } from "react";
import { Card, SectionHeader } from "../common";
import ProjectCard from "./ProjectCard";
import CTAButton from "../shared/button/CTAButton";
import { PlusIcon } from "../icons/icons";
import { PortfolioService } from "../../services/portfolio.service";
import Swal from "sweetalert2";

import styles from "./ProjectsTab.module.css";

export default function ProjectsTab({
  projects: initialProjects,
}) {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const PROJECTS_PER_PAGE = 3;

  const totalPages = Math.ceil(
    projects.length / PROJECTS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * PROJECTS_PER_PAGE;

  const currentProjects = projects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE
  );

  useEffect(() => {
    setProjects(initialProjects || []);
  }, [initialProjects]);


  const handleAdd = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Project",
      html: `
      <input
        id="projectTitle"
        class="swal2-input"
        placeholder="Project Title"
      />

      <textarea
        id="projectDescription"
        class="swal2-textarea"
        placeholder="Project Description"
      ></textarea>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add Project",

      preConfirm: () => ({
        title:
          document.getElementById(
            "projectTitle"
          ).value,

        description:
          document.getElementById(
            "projectDescription"
          ).value,
      }),
    });

    if (!formValues) return;

    try {
      const response =
        await PortfolioService.addProject({
          title: formValues.title,
          description:
            formValues.description,
          technologies: [],
          highlights: [],
        });

      setProjects(response.projects);

      Swal.fire({
        icon: "success",
        title: "Project Added",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed to add project",
      });
    }
  };

  const handleRemove = async (id) => {
    try {
      console.log("Deleting project:", id);

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
          {currentProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={startIndex + index}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <CTAButton
            variant="outline"
            size="small"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            Previous
          </CTAButton>

          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>

          <CTAButton
            variant="outline"
            size="small"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            Next
          </CTAButton>
        </div>
      )}
    </Card>
  );
}