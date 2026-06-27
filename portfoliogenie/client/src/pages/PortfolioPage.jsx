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
      <div className="container py-5">
        <h3>Loading...</h3>
      </div>
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
      />

      <PortfolioContent
        skills={portfolio.skills}
        projects={portfolio.projects}
        aboutMe={portfolio.aboutMe}
      />
    </div>
  );
}