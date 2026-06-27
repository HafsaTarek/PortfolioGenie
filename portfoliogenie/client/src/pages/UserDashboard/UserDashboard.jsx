import { useEffect, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import styles from "./UserDashboard.module.css";
import CTAButton from "../../components/shared/button/CTAButton";
import { DashboardService } from "../../services/dashboard.service";

export default function UserDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await DashboardService.getDashboardData();

      console.log("DASHBOARD DATA", data);
      console.log("REPOSITORIES", data.repositories);

      setDashboardData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className={styles.dashboardPage}>
        <div className={styles.pageContainer}>
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  const user = dashboardData?.user || {};
  const repositories =
    dashboardData?.recentRepositories || [];
  const portfolio = dashboardData?.portfolio || null;

  const githubStats = [
    {
      key: "repositories",
      label: "Repositories",
      value: user.publicReposCount || repositories.length || 0,
    },
    {
      key: "followers",
      label: "Followers",
      value: user.followers || 0,
    },
    {
      key: "languages",
      label: "Languages",
      value: user.topLanguages?.length || 0,
    },
  ];

  const radarData =
    portfolio?.skills?.map((skill) => ({
      skill: skill.name,
      score: skill.proficiency || 80,
    })) ||
    user.topLanguages?.map((lang, index) => ({
      skill: lang,
      score: 90 - index * 5,
    })) ||
    [];

  const progressChecks = [
    !!user.githubUsername,
    !!user.bio,
    repositories.length > 0,
    !!portfolio,
    portfolio?.skills?.length > 0,
  ];

  const completionPercent = Math.round(
    (progressChecks.filter(Boolean).length /
      progressChecks.length) *
    100
  );

  const progressChecklist = [
    user.githubUsername && "GitHub Connected",
    user.bio && "Bio Added",
    repositories.length > 0 &&
    "Repositories Imported",
    portfolio && "Portfolio Generated",
    portfolio?.skills?.length > 0 &&
    "Skills Extracted",
  ].filter(Boolean);

  const recentProjects = repositories.slice(0, 3);

  return (
    <div className={`${styles.dashboardPage} bg-light`}>
      <div
        className={`${styles.pageContainer} container-fluid`}
      >
        <main className={styles.mainContent}>
          <section className={styles.heroSection}>
            <div>
              <p className={styles.smallTitle}>
                Dashboard
              </p>

              <h1 className={styles.pageTitle}>
                Welcome, {user.name || "Developer"}!
              </h1>

              <p className={styles.pageSubtitle}>
                {portfolio?.aboutMe?.headline ||
                  "Connect GitHub and generate your portfolio to unlock insights and project analytics."}
              </p>
            </div>
          </section>

          <section className={styles.gridSection}>
            <article
              className={`${styles.statsCard} ${styles.card}`}
            >
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  GitHub Stats
                </h2>

                <span className={styles.cardMeta}>
                  Live overview
                </span>
              </div>

              <div className={styles.statGrid}>
                {githubStats.map((item) => (
                  <div
                    key={item.key}
                    className={styles.statItem}
                  >
                    <span className={styles.statValue}>
                      {item.value}
                    </span>

                    <span className={styles.statLabel}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article
              className={`${styles.chartCard} ${styles.card}`}
            >
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  Skills Analytics
                </h2>

                <span className={styles.cardMeta}>
                  Portfolio skills
                </span>
              </div>

              <div
                className={`${styles.chartContainer} ${styles.radarContainer}`}
              >
                <ResponsiveContainer
                  width="100%"
                  height={420}
                >
                  <RadarChart
                    data={radarData}
                    outerRadius="85%"
                  >
                    <PolarGrid stroke="#e5e7eb" />

                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{
                        fill: "#6b7280",
                        fontSize: 13,
                      }}
                    />

                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={false}
                    />

                    <Radar
                      name="Skills"
                      dataKey="score"
                      stroke="#7c3aed"
                      fill="#7c3aed"
                      fillOpacity={0.25}
                    />

                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article
              className={`${styles.progressCard} ${styles.card}`}
            >
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  Portfolio Progress
                </h2>

                <span className={styles.cardMeta}>
                  Completion
                </span>
              </div>

              <div className={styles.progressBody}>
                <div className={styles.progressCircle}>
                  <div className={styles.progressValue}>
                    {completionPercent}%
                  </div>
                </div>

                <ul className={styles.checklist}>
                  {progressChecklist.map((item) => (
                    <li
                      key={item}
                      className={styles.checkItem}
                    >
                      <span
                        className={styles.checkMark}
                      >
                        ✓
                      </span>

                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article
              className={`${styles.analyticsCard} ${styles.card} ${styles.fullWidth}`}
            >
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  Top Technologies
                </h2>

                <span className={styles.cardMeta}>
                  From GitHub profile
                </span>
              </div>

              <div className="d-flex flex-wrap gap-2">
                {user.topLanguages?.map((lang) => (
                  <span
                    key={lang}
                    className={`${styles.statusBadge} ${styles.badgeDraft}`}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </article>
          </section>

          <section className={styles.projectsSection}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>
                  Recent Repositories
                </h2>

                <p className={styles.sectionSubtitle}>
                  Imported directly from GitHub
                </p>
              </div>
            </div>

            {repositories.length === 0 ? (
              <div className={styles.emptyState}>
                No repositories found
              </div>
            ) : (
              <div className={styles.repoList}>
                {repositories.map((repo) => (
                  <div
                    key={repo._id}
                    className={styles.repoCard}
                  >
                    <div className={styles.repoTop}>
                      <h3>{repo.name}</h3>

                      <span className={styles.languageBadge}>
                        {repo.language || "General"}
                      </span>
                    </div>

                    <p>
                      {repo.description ||
                        "No description available"}
                    </p>

                    <div className={styles.repoBottom}>
                      <span>
                        {repo.updatedAtCustom}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}