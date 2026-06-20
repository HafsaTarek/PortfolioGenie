import { PencilIcon, TrashIcon } from '../icons/icons';
import CTAButton from '../shared/button/CTAButton';
import styles from './SkillItem.module.css';

export default function SkillItem({ skill, onChangeName, onRemove }) {
  return (
    <div className={styles.row}>
      <PencilIcon size={16} className={styles.pencil} />
      <input
        type="text"
        className={styles.input}
        value={skill?.name || ''}
        aria-label="Skill name"
        onChange={(event) => onChangeName(skill.id, event.target.value)}
      />
      <span className={styles.level}>{skill?.level || 0}%</span>
      
      <CTAButton
        variant="ghost"
        size="small"
        onClick={() => onRemove(skill.id)}
        aria-label={`Remove ${skill?.name || 'skill'}`}
      >
        <TrashIcon size={16} />
      </CTAButton>
    </div>
  );
}