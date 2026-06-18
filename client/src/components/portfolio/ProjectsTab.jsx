import { useState } from 'react';
import { Card, SectionHeader, Button } from '../common';
import ProjectCard from './ProjectCard';
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
    // Placeholder hook for wiring up an AI regeneration call per project.
    // eslint-disable-next-line no-console
    console.log('Regenerate project', id);
  };

  return (
    <Card>
      <SectionHeader
        title="Projects"
        actions={
          <Button variant="primary" size="sm" icon={<PlusIcon />} onClick={handleAdd}>
            Add Project
          </Button>
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
