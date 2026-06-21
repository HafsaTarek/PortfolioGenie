import PageHeader from '../components/portfolio/PageHeader';
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
    <div className="container py-4 py-md-5">
      <PageHeader
        title="Portfolio Content"
        subtitle="Edit your AI-generated content or regenerate sections to match your style"
        onPreview={onPreview}
      />

      <div className="mt-4">
        <PortfolioContent
          aboutMe={aboutMe}
          skills={skills}
          projects={projects}
          contentScore={contentScore}
          seoScore={seoScore}
          quickTips={quickTips}
        />
      </div>
    </div>
  );
}