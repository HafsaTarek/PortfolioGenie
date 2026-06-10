import styles from './RepoCard.module.css';

export default function RepoCard({ repo, isSelected, onToggle }) {
  const getLangColor = (lang) => {
    switch (lang) {
      case 'TypeScript': return '#3178c6';
      case 'JavaScript': return '#f1e05a';
      case 'React': return '#61dafb';
      // default: return var(--gray - 4);
    }
  };

  return (
    <div
      className={`${styles.repoCard} ${isSelected ? styles.repoCardActive : ''}`}
      onClick={onToggle}
    >
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => { }}
          className={styles.checkbox}
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.titleLine}>
          <span className={styles.repoName}>{repo.name}</span>
        </div>
        <p className={styles.repoDesc}>{repo.description}</p>
        <div className={styles.metaRow}>
          <div className={styles.langBadge}>
            <span className={styles.dot} style={{ backgroundColor: getLangColor(repo.language) }} />
            <span>{repo.language}</span>
          </div>
          <span>⭐ {repo.stars}</span>
          <span>Updated {repo.updated}</span>
        </div>
      </div>
    </div>
  );
}