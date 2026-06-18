import { useState } from 'react';
import Tabs from '../common/Tabs';
import Sidebar from '../layout/Sidebar';
import AboutMeTab from './AboutMeTab';
import SkillsTab from './SkillsTab';
import ProjectsTab from './ProjectsTab';
import styles from './PortfolioContent.module.css';

const TABS = [
  { id: 'about', label: 'About me' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
];

export default function PortfolioContent({
  aboutMe,
  skills,
  projects,
  contentScore,
  seoScore,
  quickTips,
}) {
  const [activeTab, setActiveTab] = useState('about');

  const handleRegenerate = (section) => {
    // Placeholder hook for wiring up a real "Regenerate with AI" API call.
    // eslint-disable-next-line no-console
    console.log('Regenerate section:', section);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} idPrefix="portfolio" />

        <div
          role="tabpanel"
          id="portfolio-panel-about"
          aria-labelledby="portfolio-about"
          hidden={activeTab !== 'about'}
          className={styles.panel}
        >
          {activeTab === 'about' && (
            <AboutMeTab data={aboutMe} onRegenerate={() => handleRegenerate('about')} />
          )}
        </div>

        <div
          role="tabpanel"
          id="portfolio-panel-skills"
          aria-labelledby="portfolio-skills"
          hidden={activeTab !== 'skills'}
          className={styles.panel}
        >
          {activeTab === 'skills' && (
            <SkillsTab
              skills={skills}
              aiTip={aboutMe.aiTip}
              onRegenerate={() => handleRegenerate('skills')}
            />
          )}
        </div>

        <div
          role="tabpanel"
          id="portfolio-panel-projects"
          aria-labelledby="portfolio-projects"
          hidden={activeTab !== 'projects'}
          className={styles.panel}
        >
          {activeTab === 'projects' && <ProjectsTab projects={projects} />}
        </div>
      </div>

      <Sidebar contentScore={contentScore} seoScore={seoScore} tips={quickTips} />
    </div>
  );
}
