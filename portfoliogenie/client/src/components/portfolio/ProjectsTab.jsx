import { useState, useEffect } from "react";
import { Card, SectionHeader } from "../common";
import ProjectCard from "./ProjectCard";
import CTAButton from "../shared/button/CTAButton";
import { PlusIcon } from "../icons/icons";
import { PortfolioService } from "../../services/portfolio.service";
import ProjectModal from "./projectModal/ProjectModal";
import toast from "react-hot-toast";

import styles from "./ProjectsTab.module.css";

export default function ProjectsTab({
  projects: initialProjects,
}) {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState(null);

  const PROJECTS_PER_PAGE = 3;

  useEffect(() => {
    setProjects(initialProjects || []);
  }, [initialProjects]);

  const totalPages = Math.ceil(
    projects.length / PROJECTS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * PROJECTS_PER_PAGE;

  const currentProjects = projects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE
  );

  // =============================
  // Add / Update Project
  // =============================

  const handleSaveProject = async (
    projectData
  ) => {
    const loadingToast = toast.loading(
      selectedProject
        ? "Updating project..."
        : "Adding project..."
    );

    try {
      let response;

      if (selectedProject) {
        response =
          await PortfolioService.updateProject(
            selectedProject._id,
            projectData
          );

      } else {
        response =
          await PortfolioService.addProject(
            projectData
          );
      }

      setProjects(response.projects);

      toast.success(
        selectedProject
          ? "Project updated successfully!"
          : "Project added successfully!",
        {
          id: loadingToast,
        }
      );

      setShowModal(false);
      setSelectedProject(null);
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong.",
        {
          id: loadingToast,
        }
      );
    }
  };

  // =============================
  // Delete Project
  // =============================

  const handleRemove = async (id) => {
    const loadingToast = toast.loading(
      "Deleting project..."
    );

    try {
      await PortfolioService.deleteProject(id);

      setProjects((prev) =>
        prev.filter(
          (project) => project._id !== id
        )
      );


      toast.success(
        "Project deleted successfully!",
        {
          id: loadingToast,
        }
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Couldn't delete project.",
        {
          id: loadingToast,
        }
      );
    }
  };

  // =============================
  // Edit Project
  // =============================

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  return (
    <>
      <Card>
        <SectionHeader
          title="Projects"
          actions={
            <CTAButton
              variant="primary"
              size="small"
              icon={<PlusIcon />}
              onClick={() => {
                setSelectedProject(null);
                setShowModal(true);
              }}
            >
              Add Project
            </CTAButton>
          }
        />

        {projects.length === 0 ? (
          <p className={styles.empty}>
            No projects yet. Add your first
            project to start building your
            portfolio.
          </p>
        ) : (
          <div className={styles.list}>
            {currentProjects.map(
              (project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={
                    startIndex + index
                  }
                  onEdit={() =>
                    handleEdit(project)
                  }
                  onRemove={handleRemove}
                />
              )
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div
            className={styles.pagination}
          >
            <CTAButton
              variant="outline"
              size="small"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (prev) => prev - 1
                )
              }
            >
              Previous
            </CTAButton>

            <span
              className={
                styles.pageInfo
              }
            >
              Page {currentPage} of{" "}
              {totalPages}
            </span>

            <CTAButton
              variant="outline"
              size="small"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (prev) => prev + 1
                )
              }
            >
              Next
            </CTAButton>
          </div>
        )}
      </Card>

      <ProjectModal
        show={showModal}
        project={selectedProject}
        onClose={() => {
          setShowModal(false);
          setSelectedProject(null);
        }}
        onSave={handleSaveProject}
      />
    </>
  );
}