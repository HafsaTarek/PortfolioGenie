import CTAButton from '../shared/button/CTAButton.jsx';
import RepoCard from './RepoCard/RepoCard.jsx';

export default function Step2RepoSelector({
  styles,
  userData,
  repositories,
  selectedRepos,
  isGenerating,
  onToggle,
  onDisconnect,
  onGenerate
}) {
  return (
    <div className="w-100 animate-fade-in">
      <div className="alert alert-success d-flex align-items-center justify-content-between mb-4 border-0" style={{ backgroundColor: '#ecfdf5', color: '#065f46' }}>
        <div>
          <span className="fw-bold">✓ GitHub Connected Successfully! </span>
          <span>We've synchronized {repositories.length} public repositories.</span>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="h5 m-0 text-dark fw-bold">Connected GitHub Account</h3>
        <button onClick={onDisconnect} className="btn btn-sm btn-link text-danger p-0 text-decoration-none">
          Disconnect
        </button>
      </div>

      {/* Profile Summary Details Card */}
      <div className="border border-light-subtle rounded-3 p-3 mb-4 shadow-sm bg-white">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-3">
            <img src={userData.avatarUrl} className="rounded-circle" style={{ width: '48px', height: '48px', objectFit: 'cover' }} alt="Avatar" />
            <div>
              <h4 className="m-0 h6 fw-bold text-dark">{userData.name || userData.username}</h4>
              <p className="m-0 text-muted small">@{userData.username}</p>
            </div>
          </div>
          <span className="badge rounded-pill text-success border border-success-subtle bg-success-subtle px-2 py-1">● Connected</span>
        </div>

        <div className="row g-2">
          <div className="col-4">
            <div className="bg-light p-2 rounded text-center">
              <div className="fw-bold text-dark h5 mb-0">{userData.followers}</div>
              <div className="text-muted small" style={{ fontSize: '11px' }}>Followers</div>
            </div>
          </div>

          <div className="col-4">
            <div className="bg-light p-2 rounded text-center">
              <div className="fw-bold text-dark h5 mb-0">{userData.publicReposCount || repositories.length}</div>
              <div className="text-muted small" style={{ fontSize: '11px' }}>Repositories</div>
            </div>
          </div>

          <div className="col-4">
            <div className="bg-light p-2 rounded text-start h-100 d-flex flex-column justify-content-center">
              <div className="text-muted mb-1" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.5px' }}>LANGUAGES</div>
              <div className="d-flex flex-wrap gap-1">
                {userData.topLanguages?.map((lang, index) => (
                  <span key={index} className="badge text-primary bg-primary-subtle font-monospace" style={{ fontSize: '9px' }}>{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="h6 mb-2 fw-bold text-dark">
        Select Repositories for AI Analysis ({repositories.length})
      </h3>

      {/* Scrollable Repo Panel */}
      <div className={`${styles.repoScroller} d-flex flex-column gap-2 mb-4`} style={{ maxHeight: '240px', overflowY: 'auto' }}>
        {repositories.map((repo) => (
          <RepoCard
            key={repo._id}
            repo={{
              name: repo.name,
              description: repo.description || 'No description provided.',
              language: repo.language || 'Documentation',
              updated: repo.updatedAtCustom || 'Recent'
            }}
            isSelected={selectedRepos.includes(repo._id)}
            onToggle={() => onToggle(repo._id)}
          />
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center pt-2 border-top border-light-subtle">
        <CTAButton variant="outline" onClick={onDisconnect}>Cancel</CTAButton>
        <CTAButton variant="primary" onClick={onGenerate} disabled={selectedRepos.length === 0 || isGenerating}>
          {isGenerating ? 'Analyzing with Gemini...' : 'Connect & Generate'}
        </CTAButton>
      </div>
    </div>
  );
}