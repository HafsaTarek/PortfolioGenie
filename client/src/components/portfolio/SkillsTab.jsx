import { useState } from 'react';
import { Card, SectionHeader, Button } from '../common';
import AITipBox from '../common/AITipBox';
import SkillItem from './SkillItem';
import { RefreshIcon, PlusIcon } from '../icons/icons';
import styles from './SkillsTab.module.css';

let nextSkillId = 1000;

export default function SkillsTab({ skills: initialSkills, aiTip, onRegenerate }) {
  const [skills, setSkills] = useState(initialSkills);

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
          <>
            <Button variant="outline" size="sm" icon={<RefreshIcon />} onClick={onRegenerate}>
              Regenerate with AI
            </Button>
            <Button variant="primary" size="sm" icon={<PlusIcon />} onClick={handleAdd}>
              Add Skill
            </Button>
          </>
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

      <div className={styles.tip}>
        <AITipBox>{aiTip}</AITipBox>
      </div>
    </Card>
  );
}
