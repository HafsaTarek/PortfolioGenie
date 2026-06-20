import CTAButton from '../shared/button/CTAButton';
import styles from './PageHeader.module.css';

export default function PageHeader({ title, subtitle, onPreview }) {
  return (
    <div className={`${styles.row} py-4 border-bottom mb-4`}>
      <div className={styles.text}> 
        <h1 className={`${styles.title} fw-bold m-0`}>{title}</h1>
        <p className={`${styles.subtitle} m-0 mt-1`}>{subtitle}</p>
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