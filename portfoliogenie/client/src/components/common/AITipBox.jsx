import { SparkleIcon } from '../icons/icons';
import styles from './AITipBox.module.css';

export default function AITipBox({ children }) {
  if (!children) return null;

  return (
    <div className={styles.box} role="note">
      <SparkleIcon size={18} className={styles.icon} />
      <div className={styles.body}>
        <h4 className={styles.title}>AI Tip</h4>
        <p className={styles.text}>{children}</p>
      </div>
    </div>
  );
}