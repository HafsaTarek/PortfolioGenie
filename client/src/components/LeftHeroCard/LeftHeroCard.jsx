import styles from './LeftHeroCard.module.css';

export default function LeftHeroCard() {
  return (
    <div className={styles.heroCard}>
      <div className={styles.titleArea}>
        <h2 className="h3">PortfolioGenie</h2>
        <h1 className="h1">Turn Your Code<br />Into Your Story</h1>
        <p className="body-text" style={{ marginTop: 'var(--spacing-md)', opacity: 0.9 }}>
          Connect your GitHub account and let AI transform your repositories into compelling portfolio content that recruiters love.
        </p>
      </div>

      <div className={styles.featureList}>
        <div className={styles.featureItem}>
          <div className={styles.checkIcon}>✓</div>
          <div className={styles.featureText}>
            <h4>Secure & Private</h4>
            <p>We only read public repositories. Your private code stays private.</p>
          </div>
        </div>

        <div className={styles.featureItem}>
          <div className={styles.checkIcon}>✓</div>
          <div className={styles.featureText}>
            <h4>AI-Powered Analysis</h4>
            <p>Our AI analyzes your code to highlight your best work.</p>
          </div>
        </div>

        <div className={styles.featureItem}>
          <div className={styles.checkIcon}>✓</div>
          <div className={styles.featureText}>
            <h4>One-Click Import</h4>
            <p>Import all your repositories in seconds, no manual work required.</p>
          </div>
        </div>
      </div>
    </div>
  );
}