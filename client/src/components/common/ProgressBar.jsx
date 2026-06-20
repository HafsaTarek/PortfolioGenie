import styles from './ProgressBar.module.css';

export default function ProgressBar({ label, value, tone }) {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);
  const resolvedTone = tone || (safeValue >= 80 ? 'success' : 'warning');

  return (
    <div className={styles.row}>
      <div className={styles.meta}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{safeValue}%</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={label}
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${styles.fill} ${styles[resolvedTone]}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}