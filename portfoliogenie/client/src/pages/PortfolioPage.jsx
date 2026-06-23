import { useEffect, useState } from "react";
import PageHeader from "../components/portfolio/PageHeader";
import PortfolioContent from "../components/portfolio/PortfolioContent";
import { PortfolioService } from "../services/portfolio.service";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data =
          await PortfolioService.getPortfolio();

        setPortfolio(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        Loading...
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="container py-5">
        No portfolio found.
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      <PageHeader
        title="Portfolio Content"
        subtitle="Edit your AI-generated content"
      />

      <PortfolioContent
        aboutMe={{
          headline:
            portfolio.aiGeneratedContent?.heroTitle ||
            "",

          biography:
            portfolio.aiGeneratedContent?.aboutMe ||
            "",

          interests: "",
        }}
        skills={
          portfolio.skills?.length
            ? portfolio.skills
            : portfolio.aiGeneratedContent
              ?.skillsSummary || []
        }
        projects={
          portfolio.projects?.length
            ? portfolio.projects
            : portfolio.aiGeneratedContent
              ?.projectCaseStudies || []
        }
      />
    </div>
  );
}