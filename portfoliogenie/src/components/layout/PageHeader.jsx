import Button from '../common/Button';
import styles from './PageHeader.module.css';

export default function PageHeader({ title, subtitle, onPreview }) {
  return (
    <div className={styles.row}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <Button variant="primary" size="md" onClick={onPreview} className={styles.previewButton}>
        Preview
      </Button>
    </div>
  );
}
