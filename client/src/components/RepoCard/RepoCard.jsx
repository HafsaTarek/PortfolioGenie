import styles from './RepoCard.module.css';

export default function RepoCard({ repo, isSelected, onToggle }) {

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
            {/* (Code Icon) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="text-muted"
              viewBox="0 0 16 16"
              style={{ opacity: 0.7 }}
            >
              <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
            </svg>

            <span>{repo.language}</span>
          </div>

          <span>Updated {repo.updated}</span>
        </div>
      </div>
    </div>
  );
}