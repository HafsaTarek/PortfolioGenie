import { SparkleIcon } from '../icons/icons';
import styles from './AITipBox.module.css';

export default function AITipBox({ children }) {
  return (
    <div className={styles.box} role="note">
      <SparkleIcon size={18} className={styles.icon} />
      <div className={styles.body}>
        <p className={styles.title}>AI Tip</p>
        <p className={styles.text}>{children}</p>
      </div>
    </div>
  );
}
