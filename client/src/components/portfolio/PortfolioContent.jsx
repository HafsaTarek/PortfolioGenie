import CTAButton from '../shared/button/CTAButton'; 
import styles from './PageHeader.module.css';

export default function PageHeader({ title, subtitle, onPreview }) {
  return (
    <div className={`${styles.row} py-2 border-bottom mb-2`}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <CTAButton
        variant="outline"
        size="small"
        onClick={onPreview} 
      >
        Preview Portfolio
      </CTAButton>
    </div>
  );
}