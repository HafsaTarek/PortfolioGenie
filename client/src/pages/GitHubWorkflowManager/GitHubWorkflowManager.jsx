import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftHeroCard from '../../components/LeftHeroCard/LeftHeroCard';
import CTAButton from '../../components/shared/button/CTAButton';
import RepoCard from '../../components/RepoCard/RepoCard';
import styles from './GitHubWorkflowManager.module.css';
import { API_BASE_URL } from '../../config/api.js';

// Import domain-specific services
import { AuthService } from '../../services/auth.service.js';
import { GitHubService } from '../../services/github.service.js';
import { AIService } from '../../services/ai.service.js';


export default function GitHubWorkflowManager() {
  const [currentStep, setCurrentStep] = useState('step1'); // 'step1' | 'loading' | 'step2'
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Individual loading checks for the multi-step splash screen
  const [loadingTicks, setLoadingTicks] = useState({ profile: false, repos: false, patterns: false });

  // Lifecycle Hook: Checks URL params for an authorized session bounce from backend
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const status = urlParams.get('status');

    if (status === 'success' && tokenFromUrl) {
      AuthService.setToken(tokenFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
      triggerLoadingPipeline();
    } else if (AuthService.isAuthenticated()) {
      triggerLoadingPipeline();
    }
  }, []);

  const triggerLoadingPipeline = async () => {
    setErrorMessage('');
    setCurrentStep('loading');
    setLoadingTicks({ profile: false, repos: false, patterns: false });

    try {
      // 1. Fetch real backend data immediately in the background
      const dataPromise = GitHubService.getConnectedAccount();

      // 2. Animate Stage 1: Fetching Profile
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadingTicks((p) => ({ ...p, profile: true }));

      // 3. Animate Stage 2: Syncing Repositories
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadingTicks((p) => ({ ...p, repos: true }));

      // 4. Await data resolution if the network request is still taking time
      const data = await dataPromise;

      // 5. Animate Stage 3: Code Pattern Evaluation
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadingTicks((p) => ({ ...p, patterns: true }));

      // Final short pause for UI smoothness before mounting step 2
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Hydrate state with genuine backend data payloads
      setUserData(data.user);
      setRepositories(data.repositories);
      setSelectedRepos(data.repositories.map((repo) => repo._id));
      setCurrentStep('step2');
    } catch (error) {
      console.error('Data hydration failure:', error.message);
      setErrorMessage('Failed to import account data. Please reconnect.');
      handleDisconnect();
    }
  };

  /**
   * Kicks off the backend OAuth cycle redirection route
   */
  const handleConnectGithub = () => {
    window.location.href = `${API_BASE_URL}/api/github/connect`;
  };

  /**
   * Submits selected repo IDs to the Gemini portfolio generation pipeline
   */
  const handleGeneratePortfolio = async () => {
    if (selectedRepos.length === 0) return;

    setIsGenerating(true);
    setErrorMessage('');
    try {
      const result = await AIService.generatePortfolio(selectedRepos);

      alert('✨ Portfolio content generated successfully!');
      console.log('Gemini Content:', result.portfolio.aiGeneratedContent);

      navigate('/portfolio', {
        state: {
          aiContent: result.portfolio.aiGeneratedContent,
          userRepos: selectedRepos
        }
      });

    } catch (error) {
      console.error('AI Processing Hook Error:', error.message);
      setErrorMessage(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleRepoSelection = (id) => {
    setSelectedRepos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDisconnect = () => {
    AuthService.logout();
    setUserData(null);
    setRepositories([]);
    setSelectedRepos([]);
    setCurrentStep('step1');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <div className="container bg-white rounded-3 shadow-lg overflow-hidden" style={{ maxWidth: '1140px', minHeight: '640px' }}>
        <div className="row g-0 h-100 min-vh-md-75">

          <div className="col-12 col-lg-5 d-flex">
            <LeftHeroCard />
          </div>

          <div className="col-12 col-lg-7 d-flex flex-column p-4 p-md-5 justify-content-center bg-white">

            {/* Global Error Banner */}
            {errorMessage && (
              <div className="alert alert-danger mb-4 border-0 small py-2 animate-fade-in" role="alert">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* STEP 1: INITIAL CONNECT SCREEN */}
            {currentStep === 'step1' && (
              <div className="w-100 animate-fade-in">
                <div className="text-start mb-4">
                  <h1 className="display-6 fw-bold text-dark mb-2" style={{ letterSpacing: '-0.5px' }}>
                    Connect Your GitHub
                  </h1>
                  <p className="body-text text-muted" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                    Import your repositories, skills, and developer activity to generate your portfolio automatically.
                  </p>
                </div>

                <div className="border border-light-subtle rounded-4 p-4 p-md-5 text-center bg-white shadow-sm mx-auto" style={{ maxWidth: '520px' }}>
                  <div className="d-flex align-items-center justify-content-center bg-light rounded-3 mb-4 mx-auto" style={{ width: '64px', height: '64px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="text-secondary" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                    </svg>
                  </div>

                  <h2 className="h4 mb-2 fw-bold text-dark">Ready to Get Started?</h2>
                  <p className="small text-muted mb-4 px-lg-3">
                    Connect your GitHub account to import your projects and start building your professional portfolio in minutes.
                  </p>

                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
                    <CTAButton variant="primary" size="medium" onClick={handleConnectGithub}>
                      Connect Github account
                    </CTAButton>
                    <CTAButton variant="outline" size="medium" onClick={() => setCurrentStep('step2')}>
                      Skip for now
                    </CTAButton>
                  </div>

                  <p className="m-0 text-black-50" style={{ fontSize: '12px', fontWeight: '500' }}>
                    We'll only access your public repositories
                  </p>
                </div>
              </div>
            )}

            {/* STEP 1 LOADING: THE ANIMATED SPLASH INTERFACE */}
            {currentStep === 'loading' && (
              <div className="w-100 text-center py-4 animate-fade-in">
                <div className="spinner-border text-primary mb-4" role="status" style={{ width: '3rem', height: '3rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h2 className="h3 mb-2 text-dark fw-bold">Importing Your Repositories</h2>
                <p className="body-text text-muted mb-4 px-md-4">
                  We're analyzing your GitHub profile and importing your repositories. This will only take a moment...
                </p>

                {/* Vertical Step Indicator Stack */}
                <div className="d-inline-flex flex-column align-items-start gap-3 mt-2 text-start p-4 bg-light rounded-4 border border-light-subtle" style={{ minWidth: '290px' }}>
                  <div className="d-flex align-items-center gap-3">
                    <span style={{ fontSize: '1.1rem' }}>{loadingTicks.profile ? '✅' : '🔄'}</span>
                    <span className={loadingTicks.profile ? 'text-dark fw-semibold' : 'text-muted'}>Fetching profile information</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span style={{ fontSize: '1.1rem' }}>{loadingTicks.repos ? '✅' : '🔄'}</span>
                    <span className={loadingTicks.repos ? 'text-dark fw-semibold' : 'text-muted'}>Importing repositories</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LIVE ACCOUNT & REPOSITORIES METRICS INTERFACE */}
            {currentStep === 'step2' && userData && (
              <div className="w-100 animate-fade-in">
                <div className="alert alert-success d-flex align-items-center justify-content-between mb-4 border-0" style={{ backgroundColor: '#ecfdf5', color: 'var(--dark-success)' }}>
                  <div>
                    <span className="fw-bold">✓ GitHub Connected Successfully! </span>
                    <span>We've synchronized {repositories.length} public repositories.</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="h5 m-0 text-dark fw-bold">Connected GitHub Account</h3>
                  <button onClick={handleDisconnect} className="btn btn-sm btn-link text-danger p-0 text-decoration-none">Disconnect</button>
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
                        <div className="text-muted mb-1" style={{ fontSize: '10px', fontWeight: '600' }}>LANGUAGES</div>
                        <div className="d-flex flex-wrap gap-1">
                          {userData.topLanguages?.map((lang, index) => (
                            <span key={index} className="badge text-primary bg-primary-subtle font-monospace" style={{ fontSize: '9px' }}>{lang}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="h6 mb-2 fw-bold text-dark">Select Repositories for AI Analysis ({repositories.length})</h3>

                {/* Scrollable Repo Panel */}
                <div className={`${styles.repoScroller} d-flex flex-column gap-2 mb-4`} style={{ maxHeight: '240px', overflowY: 'auto' }}>
                  {repositories.map(repo => (
                    <RepoCard
                      key={repo._id}
                      repo={{
                        name: repo.name,
                        description: repo.description || 'No description provided.',
                        language: repo.language || 'Documentation',
                        updated: repo.updatedAtCustom || 'Recent'
                      }}
                      isSelected={selectedRepos.includes(repo._id)}
                      onToggle={() => toggleRepoSelection(repo._id)}
                    />
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2 border-top border-light-subtle">
                  <CTAButton variant="outline" onClick={handleDisconnect}>Cancel</CTAButton>
                  <CTAButton variant="primary" onClick={handleGeneratePortfolio} disabled={selectedRepos.length === 0 || isGenerating}>
                    {isGenerating ? 'Analyzing with Gemini...' : 'Connect & Generate'}
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