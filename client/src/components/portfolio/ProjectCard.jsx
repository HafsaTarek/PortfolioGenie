import { useState, useEffect } from 'react';
import Field from '../common/Field';
import CTAButton from '../shared/button/CTAButton'; 
import { TrashIcon, CheckCircleIcon } from '../icons/icons'; 
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, index, onRemove }) { 
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [technologies, setTechnologies] = useState(project?.technologies || '');

  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setDescription(project.description || '');
      setTechnologies(project.technologies || '');
    }
  }, [project]);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>Project {index + 1}</h3>
        <div className={styles.headerActions}>
          {}
          
          <CTAButton
            variant="ghost"
            size="small"
            onClick={() => onRemove(project.id)}
            aria-label={`Remove project ${index + 1}`}
          >
            <TrashIcon size={16} className={styles.deleteIconText} />
          </CTAButton>
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

        {project?.highlights && project.highlights.length > 0 && (
          <div className={styles.highlights}>
            <span className={styles.highlightsLabel}>Key Highlights</span>
            <ul className={styles.highlightsList}>
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className={styles.highlightItem}>
                  <CheckCircleIcon size={16} className={styles.highlightIcon} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}