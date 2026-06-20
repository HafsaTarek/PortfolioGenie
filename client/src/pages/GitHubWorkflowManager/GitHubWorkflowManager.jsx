import { useState, useEffect } from 'react';
import LeftHeroCard from '../../components/LeftHeroCard/LeftHeroCard';
import CTAButton from '../../components/shared/button/CTAButton';
import RepoCard from '../../components/RepoCard/RepoCard';
import styles from './GitHubWorkflowManager.module.css';

const MOCK_REPOSITORIES = [
  { id: 1, name: 'portfolio-website', description: 'Personal portfolio built with React and Tailwind CSS', language: 'TypeScript', stars: 42, updated: '2 days ago' },
  { id: 2, name: 'task-manager-app', description: 'Full-stack task management application with authentication', language: 'JavaScript', stars: 28, updated: '1 week ago' },
  { id: 3, name: 'weather-dashboard', description: 'Real-time weather dashboard using OpenWeather API', language: 'React', stars: 15, updated: '3 weeks ago' },
  { id: 4, name: 'blog-platform', description: 'Markdown-based blog platform with dark mode support', language: 'TypeScript', stars: 31, updated: '1 month ago' }
];

export default function GitHubWorkflowManager() {
  const [currentStep, setCurrentStep] = useState('step1'); // 'step1' | 'loading' | 'step2'
  const [selectedRepos, setSelectedRepos] = useState([1, 2, 3, 4]);
  const [loadingTicks, setLoadingTicks] = useState({ profile: false, repos: false, patterns: false });

  useEffect(() => {
    if (currentStep === 'loading') {
      const t1 = setTimeout(() => setLoadingTicks(p => ({ ...p, profile: true })), 700);
      const t2 = setTimeout(() => setLoadingTicks(p => ({ ...p, repos: true })), 1400);
      const t3 = setTimeout(() => setLoadingTicks(p => ({ ...p, patterns: true })), 2100);
      const t4 = setTimeout(() => setCurrentStep('step2'), 2800);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    } else {
      setLoadingTicks({ profile: false, repos: false, patterns: false });
    }
  }, [currentStep]);

  const toggleRepoSelection = (id) => {
    setSelectedRepos(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-vh-100 mt-3 d-flex align-items-center justify-content-center bg-light p-3">
      <div className="container bg-white rounded-3 shadow-lg overflow-hidden" style={{ maxWidth: '1140px', minHeight: '640px' }}>

        <div className="row g-0 h-100 min-vh-md-75">

          <div className="col-12 col-lg-5 d-flex">
            <LeftHeroCard />
          </div>

          <div className="col-12 col-lg-7 d-flex flex-column p-4 p-md-5 justify-content-center bg-white">

            {currentStep === 'step1' && (
              <div className="w-100 text-center py-4">
                <div className={`${styles.gitIconContainer} mx-auto mb-4`}>🐙</div>
                <h2 className="h2 mb-3 fw-bold text-dark">Ready to Get Started?</h2>
                <p className="body-text text-muted mb-4 px-md-4">
                  Connect your GitHub account to import your projects and start building your professional portfolio in minutes.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
                  <CTAButton variant="primary" size="medium" onClick={() => setCurrentStep('loading')}>
                    Connect Github account
                  </CTAButton>
                  <CTAButton variant="outline" size="medium" onClick={() => setCurrentStep('step2')}>
                    Skip for now
                  </CTAButton>
                </div>

                <p className="caption-text text-black-50 mt-4">
                  We'll only access your public repositories
                </p>
              </div>
            )}

            {currentStep === 'loading' && (
              <div className="w-100 text-center py-4">
                <div className="spinner-border text-primary mb-4" role="status" style={{ width: '3rem', height: '3rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h2 className="h3 mb-2 text-dark fw-bold">Importing Your Repositories</h2>
                <p className="body-text text-muted mb-4">
                  We're analyzing your GitHub profile and importing your repositories. This will only take a moment...
                </p>

                {/* Vertical Step Indicator Stack */}
                <div className="d-inline-flex flex-column align-items-start gap-3 mt-3 text-start">
                  <div className="d-flex align-items-center gap-3">
                    <span>{loadingTicks.profile ? '✅' : '🔄'}</span>
                    <span className={loadingTicks.profile ? 'text-dark fw-medium' : 'text-muted'}>Fetching profile information</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span>{loadingTicks.repos ? '✅' : '🔄'}</span>
                    <span className={loadingTicks.repos ? 'text-dark fw-medium' : 'text-muted'}>Importing repositories</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'step2' && (
              <div className="w-100 animate-fade-in">
                <div className="alert alert-success d-flex align-items-center gap-2 mb-4 border-0" style={{ backgroundColor: '#ecfdf5', color: 'var(--dark-success)' }}>
                  <span className="fw-bold">✓ GitHub Connected Successfully!</span>
                  <span>We've imported {MOCK_REPOSITORIES.length} repositories from your account.</span>
                </div>

                <h3 className="h5 mb-3 text-dark fw-bold">Connected GitHub Account</h3>

                <div className="border border-light-subtle rounded-3 p-3 mb-4 shadow-sm bg-white">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" className="rounded-circle" style={{ width: '48px', height: '48px', objectFit: 'cover' }} alt="Avatar" />
                      <div>
                        <h4 className="m-0 h6 fw-bold text-dark">Sarah Ahmed</h4>
                        <p className="m-0 text-muted small">@sarahj_dev</p>
                      </div>
                    </div>
                    <span className="badge rounded-pill text-success border border-success-subtle bg-success-subtle px-2 py-1">● Connected</span>
                  </div>

                  <div className="row g-2">
                    <div className="col-4">
                      <div className="bg-light p-2 rounded text-center">
                        <div className="fw-bold text-dark h5 mb-0">247</div>
                        <div className="text-muted small" style={{ fontSize: '11px' }}>Followers</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="bg-light p-2 rounded text-center">
                        <div className="fw-bold text-dark h5 mb-0">18</div>
                        <div className="text-muted small" style={{ fontSize: '11px' }}>Repositories</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="bg-light p-2 rounded text-start h-100 d-flex flex-column justify-content-center">
                        <div className="text-muted mb-1" style={{ fontSize: '10px', fontWeight: '600' }}>LANGUAGES</div>
                        <div className="d-flex flex-wrap gap-1">
                          <span className="badge text-primary bg-primary-subtle font-monospace" style={{ fontSize: '9px' }}>JS</span>
                          <span className="badge text-primary bg-primary-subtle font-monospace" style={{ fontSize: '9px' }}>TS</span>
                          <span className="badge text-primary bg-primary-subtle font-monospace" style={{ fontSize: '9px' }}>React</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="h6 mb-2 fw-bold text-dark">Imported Repositories ({MOCK_REPOSITORIES.length})</h3>

                <div className={`${styles.repoScroller} d-flex flex-column gap-2 mb-4`}>
                  {MOCK_REPOSITORIES.map(repo => (
                    <RepoCard
                      key={repo.id}
                      repo={repo}
                      isSelected={selectedRepos.includes(repo.id)}
                      onToggle={() => toggleRepoSelection(repo.id)}
                    />
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2 border-top border-light-subtle">
                  <CTAButton variant="outline" onClick={() => setCurrentStep('step1')}>Skip</CTAButton>
                  <CTAButton variant="primary" onClick={() => alert(`Generated content layout for repo IDs: ${selectedRepos.join(', ')}`)}>
                    Connect
                  </CTAButton>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
