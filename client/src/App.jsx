import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import GitHubWorkflowManager from './pages/GitHubWorkflowManager/GitHubWorkflowManager';

// import Header from './components/layout/Header';
// import PageHeader from './components/layout/PageHeader';
// import PortfolioContent from './components/portfolio/PortfolioContent';
// import {
//   user,
//   navLinks,
//   aboutMeInitial,
//   skillsInitial,
//   projectsInitial,
//   contentScore,
//   seoScore,
//   quickTips,
// } from './data/mockData';
// import styles from './App.module.css';


export default function App() {
  //   const handlePreview = () => {
  //     // Placeholder hook for wiring up a real preview action (e.g. open a
  //     // modal or navigate to a published preview route).
  //     // eslint-disable-next-line no-console
  //     console.log('Open portfolio preview');
  //   };

  return (
    <BrowserRouter>
      {/* <div className={styles.app}>
        <Header navLinks={navLinks} activeNavId="portfolio" user={user} />

        <main className={styles.main}>
          <PageHeader
            title="Portfolio Content"
            subtitle="Edit your AI-generated content or regenerate sections to match your style"
            onPreview={handlePreview}
          />

          <PortfolioContent
            aboutMe={aboutMeInitial}
            skills={skillsInitial}
            projects={projectsInitial}
            contentScore={contentScore}
            seoScore={seoScore}
            quickTips={quickTips}
          />
        </main>
      </div> */}
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/github-connect" element={<GitHubWorkflowManager />} />
      </Routes>
    </BrowserRouter>
  );
}
