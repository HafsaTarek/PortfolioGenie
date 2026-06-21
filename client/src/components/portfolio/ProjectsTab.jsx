import { useState } from 'react';
import { Card, SectionHeader } from '../common';
import ProjectCard from './ProjectCard';
import CTAButton from '../shared/button/CTAButton';
import { PlusIcon } from '../icons/icons';
import styles from './ProjectsTab.module.css';

let nextProjectId = 1000;

export default function ProjectsTab({ projects: initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);

  const handleAdd = () => {
    setProjects((current) => [
      ...current,
      {
        id: `project-new-${nextProjectId++}`,
        title: '',
        description: '',
        technologies: '',
        highlights: [],
      },
    ]);
  };

  const handleRemove = (id) => {
    setProjects((current) => current.filter((project) => project.id !== id));
  };

  const handleRegenerate = (id) => {
    console.log('Regenerate project', id);
  };

  return (
    <Card>
      <SectionHeader
        title="Projects"
        actions={
          <CTAButton variant="primary" size="small" icon={<PlusIcon />} onClick={handleAdd}>
            Add Project
          </CTAButton>
        }
      />

      {projects.length === 0 ? (
        <p className={styles.empty}>
          No projects yet. Add your first project to start building your portfolio.
        </p>
      ) : (
        <div className={styles.list}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onRegenerate={handleRegenerate}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </Card>
  );
}