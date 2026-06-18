import { useState } from 'react';
import Field from '../common/Field';
import Button from '../common/Button';
import { RefreshIcon, TrashIcon, CheckCircleIcon } from '../icons/icons';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, index, onRegenerate, onRemove }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [technologies, setTechnologies] = useState(project.technologies);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>Project {index + 1}</h3>
        <div className={styles.headerActions}>
          <Button
            variant="ghost"
            size="sm"
            icon={<RefreshIcon size={14} />}
            onClick={() => onRegenerate(project.id)}
          >
            Regenerate
          </Button>
          <button
            type="button"
            className={styles.deleteIcon}
            aria-label={`Remove project ${index + 1}`}
            onClick={() => onRemove(project.id)}
          >
            <TrashIcon size={16} />
          </button>
        </div>
      </header>

      <div className={styles.fields}>
        <Field
          id={`${project.id}-title`}
          label="Project Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <Field
          id={`${project.id}-description`}
          label="Description"
          as="textarea"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What does this project do, and why does it matter?"
          className={styles.descriptionField}
        />

        <Field
          id={`${project.id}-technologies`}
          label="Technologies"
          value={technologies}
          onChange={(event) => setTechnologies(event.target.value)}
          placeholder="React, TypeScript, Tailwind CSS"
        />

        <div className={styles.highlights}>
          <span className={styles.highlightsLabel}>Key Highlights</span>
          <ul className={styles.highlightsList}>
            {project.highlights.map((highlight) => (
              <li key={highlight} className={styles.highlightItem}>
                <CheckCircleIcon size={16} className={styles.highlightIcon} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
