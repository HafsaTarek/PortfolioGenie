import { PencilIcon, TrashIcon } from '../icons/icons';
import styles from './SkillItem.module.css';

export default function SkillItem({ skill, onChangeName, onRemove }) {
  return (
    <div className={styles.row}>
      <PencilIcon size={16} className={styles.pencil} />
      <input
        type="text"
        className={styles.input}
        value={skill.name}
        aria-label="Skill name"
        onChange={(event) => onChangeName(skill.id, event.target.value)}
      />
      <span className={styles.level}>{skill.level}%</span>
      <button
        type="button"
        className={styles.delete}
        aria-label={`Remove ${skill.name}`}
        onClick={() => onRemove(skill.id)}
      >
        <TrashIcon size={16} />
      </button>
    </div>
  );
}
