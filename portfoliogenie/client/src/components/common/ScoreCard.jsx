import ProgressBar from './ProgressBar';
import { ShieldIcon, SearchIcon } from '../icons/icons';
import styles from './ScoreCard.module.css';

const ICONS = {
  success: ShieldIcon,
  warning: SearchIcon,
};

/**
 * Card showing a headline score ("87 / 100") plus a breakdown of the
 * metrics that make it up. Reused for both Content Score and SEO Score —
 * only the data and `tone` (success/warning) differ.
 */
export default function ScoreCard({ label, score, max, tone, metrics }) {
  const Icon = ICONS[tone] || ShieldIcon;

  return (
    <section className={styles.card} aria-label={label}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={`${styles.iconBadge} ${styles[tone]}`}>
            <Icon size={16} />
          </span>
          <h3 className={styles.title}>{label}</h3>
        </div>
        <p className={`${styles.score} ${styles[tone]}`}>
          {score}
          <span className={styles.max}>/{max}</span>
        </p>
      </header>

      <div className={styles.metrics}>
        {metrics.map((metric) => (
          <ProgressBar key={metric.label} label={metric.label} value={metric.value} />
        ))}
      </div>
    </section>
  );
}
