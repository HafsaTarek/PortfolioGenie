import styles from './SectionHeader.module.css';

export default function SectionHeader({ title, actions }) {
  return (
    <div className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
