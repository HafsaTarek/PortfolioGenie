import { useState, useEffect } from "react";
import { Card, SectionHeader } from "../common";
import AITipBox from "../common/AITipBox";
import SkillItem from "./SkillItem";
import CTAButton from "../shared/button/CTAButton";
import { PlusIcon } from "../icons/icons";
import { PortfolioService } from "../../services/portfolio.service";

import styles from "./SkillsTab.module.css";

export default function SkillsTab({ skills: initialSkills, aiTip }) {
  const [skills, setSkills] = useState(initialSkills || []);

  useEffect(() => {
    if (initialSkills) {
      setSkills(initialSkills);
    }
  }, [initialSkills]);

  const handleChangeName = async (id, name) => {
    try {
      setSkills((current) =>
        current.map((s) =>
          s._id === id ? { ...s, name } : s
        )
      );

      await PortfolioService.updateSkill(id, {
        name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await PortfolioService.deleteSkill(id);

      setSkills((current) =>
        current.filter((s) => s._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await PortfolioService.addSkill({
        name: "New Skill",
        proficiency: 70,
      });

      setSkills(response.skills);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <SectionHeader
        title="Skills"
        actions={
          <div className={styles.actionsContainer}>
            <CTAButton
              variant="primary"
              size="small"
              icon={<PlusIcon />}
              onClick={handleAdd}
            >
              Add Skill
            </CTAButton>
          </div>
        }
      />

      <div className={styles.list}>
        {skills.map((skill) => (
          <SkillItem
            key={skill._id}
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