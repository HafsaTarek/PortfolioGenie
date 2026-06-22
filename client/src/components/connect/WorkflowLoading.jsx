export default function WorkflowLoading({ styles, loadingTicks }) {
  return (
    <div className={`${styles.innerContent} text-center py-4 animate-fade-in`}>
      <div className={styles.loaderIconContainer}>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

      <h2 className="h3 mb-2 text-dark fw-bold">Importing Your Repositories</h2>
      <p className="body-text text-muted mb-4 px-md-4">
        We're analyzing your GitHub profile and importing your repositories. This will only take a moment...
      </p>

      <div className={`d-inline-flex flex-column align-items-start p-4 bg-light rounded-4 border border-light-subtle ${styles.checkListGroup}`}>
        <div className={styles.checkRow}>
          <span style={{ fontSize: '1.1rem' }}>{loadingTicks.profile ? '✅' : '🔄'}</span>
          <span className={loadingTicks.profile ? 'text-dark fw-semibold' : 'text-muted'}>Fetching profile information</span>
        </div>
        <div className={styles.checkRow}>
          <span style={{ fontSize: '1.1rem' }}>{loadingTicks.repos ? '✅' : '🔄'}</span>
          <span className={loadingTicks.repos ? 'text-dark fw-semibold' : 'text-muted'}>Importing repositories</span>
        </div>
      </div>
    </div>
  );
}