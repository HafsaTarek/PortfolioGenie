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
import { useLocation } from "react-router-dom";
import styles from "./UserDashboard.module.css";
import { DashboardService } from "../../services/dashboard.service";
import Loading from './../../components/shared/loading/Loading';

export default function UserDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    loadDashboard();
  }, [location]);


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
      <Loading
        message="Loading your dashboard..."
      />
    );
  }

  const user = dashboardData?.user || {};
  const portfolio = dashboardData?.portfolio || null;
  const projects =
    portfolio?.projects || [];

  const githubStats = [
    {
      key: "repositories",
      label: "Repositories",
      value: user.publicReposCount || 0,
    },
    {
      key: "followers",
      label: "Followers",
      value: user.followers || 0,
    },
    {
      key: "skills",
      label: "Portfolio Skills",
      value: portfolio?.skills?.length || 0,
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
    !!portfolio?.aboutMe?.headline?.trim(),
    !!portfolio?.aboutMe?.biography?.trim(),
    !!portfolio?.aboutMe?.interests?.trim(),
    portfolio?.skills?.length >= 5,
    portfolio?.projects?.length >= 3,
  ];

  const completionPercent = Math.round(
    (progressChecks.filter(Boolean).length /
      progressChecks.length) *
    100
  );

  const progressChecklist = [
    portfolio?.aboutMe?.headline && "Headline Added",
    portfolio?.aboutMe?.biography && "Biography Added",
    portfolio?.aboutMe?.interests && "Interests Added",
    portfolio?.skills?.length >= 5 && "Skills Added",
    portfolio?.projects?.length >= 3 && "Projects Added",
  ].filter(Boolean);


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
                <h2 className={styles.sectionTitle}>
                  Skills
                </h2>

                <p className={styles.sectionSubtitle}>
                  Skills included in your portfolio
                </p>
              </div>

              <div className="d-flex flex-wrap gap-2">
                {portfolio?.skills?.map((skill) => (
                  <span
                    key={skill._id}
                    className={`${styles.statusBadge} ${styles.badgeDraft}`}
                  >
                    {skill.name}
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

            {projects.length === 0 ? (
              <div className={styles.emptyState}>
                No repositories found
              </div>
            ) : (
              <div className={styles.repoList}>
                {projects.slice(0, 6).map((project) => (
                  <div
                    key={project._id}
                    className={styles.repoCard}
                  >
                    <div className={styles.repoTop}>
                      <h3>{project.title}</h3>
                    </div>

                    <p>{project.description}</p>

                    <div className={styles.tags}>
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className={styles.languageBadge}
                        >
                          {tech}
                        </span>
                      ))}
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