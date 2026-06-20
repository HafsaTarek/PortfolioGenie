import { useState, useEffect } from 'react';
import { Card, SectionHeader } from '../common';
import AITipBox from '../common/AITipBox';
import SkillItem from './SkillItem';
import CTAButton from '../shared/button/CTAButton';
import { PlusIcon } from '../icons/icons'; 
import styles from './SkillsTab.module.css';

let nextSkillId = 1000;

export default function SkillsTab({ skills: initialSkills, aiTip }) {
  const [skills, setSkills] = useState(initialSkills || []);

  useEffect(() => {
    if (initialSkills) {
      setSkills(initialSkills);
    }
  }, [initialSkills]);

  const handleChangeName = (id, name) => {
    setSkills((current) => current.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  const handleRemove = (id) => {
    setSkills((current) => current.filter((s) => s.id !== id));
  };

  const handleAdd = () => {
    setSkills((current) => [
      ...current,
      { id: `skill-new-${nextSkillId++}`, name: 'New skill', level: 70 },
    ]);
  };

  return (
    <Card>
      <SectionHeader
        title="Skills"
        actions={
          <div className={styles.actionsContainer}>
            <CTAButton variant="primary" size="small" icon={<PlusIcon />} onClick={handleAdd}>
              Add Skill
            </CTAButton>
          </div>
        }
      />

      <div className={styles.list}>
        {skills.map((skill) => (
          <SkillItem
            key={skill.id}
            skill={skill}
            onChangeName={handleChangeName}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {aiTip && (
        <div className={styles.tip}>
          <AITipBox>{aiTip}</AITipBox>
        </div>
      )}
    </Card>
  );
}