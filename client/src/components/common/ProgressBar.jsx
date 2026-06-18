import styles from './ProgressBar.module.css';

/**
 * Horizontal metric bar: label on top-left, percentage on top-right,
 * filled bar below. Tone derives the fill color ('success' = green,
 * 'warning' = amber) when not explicitly provided.
 */
export default function ProgressBar({ label, value, tone }) {
  const resolvedTone = tone || (value >= 80 ? 'success' : 'warning');

  return (
    <div className={styles.row}>
      <div className={styles.meta}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}%</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${styles.fill} ${styles[resolvedTone]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
