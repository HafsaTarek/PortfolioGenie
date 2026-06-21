import { BoltIcon, DotIcon } from '../icons/icons';
import styles from './QuickTipsCard.module.css';

export default function QuickTipsCard({ tips }) {
  if (!tips || tips.length === 0) return null;

  return (
    <section className={styles.card} aria-label="Quick Tips">
      <header className={styles.header}>
        <BoltIcon size={18} />
        <h3 className={styles.title}>Quick Tips</h3>
      </header>
      <ul className={styles.list}>
        {tips.map((tip, index) => (
          <li key={index} className={styles.item}>
            <DotIcon size={6} className={styles.dot} />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}