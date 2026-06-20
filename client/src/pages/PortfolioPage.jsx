import PageHeader from '../components/layout/PageHeader';
import PortfolioContent from '../components/portfolio/PortfolioContent';

export default function PortfolioPage({
  aboutMe,
  skills,
  projects,
  contentScore,
  seoScore,
  quickTips,
  onPreview,
}) {
  return (
    <>
      <PageHeader
        title="Portfolio Content"
        subtitle="Edit your AI-generated content or regenerate sections to match your style"
        onPreview={onPreview}
      />

      <PortfolioContent
        aboutMe={aboutMe}
        skills={skills}
        projects={projects}
        contentScore={contentScore}
        seoScore={seoScore}
        quickTips={quickTips}
      />
    </>
  );
}