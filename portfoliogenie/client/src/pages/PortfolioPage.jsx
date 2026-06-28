import { useEffect, useState } from "react";
import PageHeader from "../components/portfolio/PageHeader";
import PortfolioContent from "../components/portfolio/PortfolioContent";
import { PortfolioService } from "../services/portfolio.service";
import Loading from "../components/shared/loading/Loading";
import PortfolioPreview from "../components/portfolio/portfolioPreview/PortfolioPreview";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await PortfolioService.getPortfolio();

        console.log("PORTFOLIO DATA:", data);

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
      <Loading message="Loading your portfolio" />
    );
  }

  if (!portfolio) {
    return (
      <div className="container py-5">
        <h3>No portfolio generated yet.</h3>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      <PageHeader
        title="Portfolio Content"
        subtitle="Edit your AI-generated content"
        onPreview={() => setShowPreview(true)}
      />

      <PortfolioPreview
        show={showPreview}
        onHide={() => setShowPreview(false)}
        portfolio={portfolio}
      />

      <PortfolioContent
        skills={portfolio.skills}
        projects={portfolio.projects}
        aboutMe={portfolio.aboutMe}
      />
    </div>
  );
}