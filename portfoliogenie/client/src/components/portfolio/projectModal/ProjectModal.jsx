import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import CTAButton from "../../shared/button/CTAButton";
import styles from "./ProjectModal.module.css";

export default function ProjectModal({
  show,
  onClose,
  onSave,
  project = null,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = "hidden";

    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setTechnologies(
        Array.isArray(project.technologies)
          ? project.technologies.join(", ")
          : ""
      );
      setGithubUrl(project.githubUrl || "");
      setLiveUrl(project.liveUrl || "");
    } else {
      setTitle("");
      setDescription("");
      setTechnologies("");
      setGithubUrl("");
      setLiveUrl("");
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [show, project, onClose]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      title,
      description,
      githubUrl,
      liveUrl,
      technologies: technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      highlights: [],
    });
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <h2>Add New Project</h2>

            <p className={styles.subtitle}>
              Showcase your best work with detailed
              information and technologies used.
            </p>
          </div>

          <button
            className={styles.close}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.formGroup}>
            <label>Project Title</label>

            <input
              className={styles.input}
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="PortfolioGenie"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>

            <textarea
              rows="5"
              className={styles.textarea}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe your project..."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Technologies</label>

            <input
              className={styles.input}
              value={technologies}
              onChange={(e) =>
                setTechnologies(e.target.value)
              }
              placeholder="React, Node.js, MongoDB"
            />

            <small className={styles.helper}>
              Separate technologies with commas.
            </small>
          </div>

          <div className={styles.formGroup}>
            <label>GitHub Repository</label>

            <input
              className={styles.input}
              value={githubUrl}
              onChange={(e) =>
                setGithubUrl(e.target.value)
              }
              placeholder="https://github.com/..."
            />
          </div>

          <div className={styles.footer}>
            <CTAButton
              variant="outline"
              size="small"
              type="button"
              onClick={onClose}
            >
              Cancel
            </CTAButton>

            <CTAButton
              variant="primary"
              size="small"
              type="submit"
            >
              {project ? "Save Changes" : "Add Project"}
            </CTAButton>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}