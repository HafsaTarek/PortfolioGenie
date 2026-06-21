import { Area, AreaChart, CartesianGrid, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './UserDashboard.module.css';
import CTAButton from '../../components/shared/button/CTAButton';

const stats = [
  { label: 'Repositories', value: '34' },
  { label: 'Stars', value: '1k' },
  { label: 'Commits', value: '980' },
];

const radarData = [
  { skill: 'UI', score: 88 },
  { skill: 'Backend', score: 76 },
  { skill: 'DevOps', score: 72 },
  { skill: 'Testing', score: 66 },
  { skill: 'Docs', score: 84 },
  { skill: 'CI/CD', score: 78 },
];

const activityData = [
  { day: 'Mon', commits: 58, reviews: 28 },
  { day: 'Tue', commits: 72, reviews: 34 },
  { day: 'Wed', commits: 64, reviews: 42 },
  { day: 'Thu', commits: 82, reviews: 48 },
  { day: 'Fri', commits: 96, reviews: 60 },
  { day: 'Sat', commits: 74, reviews: 38 },
  { day: 'Sun', commits: 54, reviews: 24 },
];

const progressChecklist = [
  'Bio Added',
  'Skills Added',
  'Recent Projects Synced',
];

const recentProjects = [
  { title: 'AI Portfolio Builder', date: 'Updated 2 days ago', status: 'Live' },
  { title: 'Contributions Tracker', date: 'Updated 5 days ago', status: 'Draft' },
  { title: 'Dev Resume API', date: 'Updated 1 week ago', status: 'Review' },
  { title: 'Landing Page Redesign', date: 'Updated 6 days ago', status: 'Live' },
  { title: 'GitHub Insights', date: 'Updated 3 days ago', status: 'Draft' },
  { title: 'Project Showcase', date: 'Updated 8 days ago', status: 'Live' },
  { title: 'Component Library', date: 'Updated 4 days ago', status: 'Review' },
  { title: 'Portfolio CMS', date: 'Updated 10 days ago', status: 'Draft' },
];

const statusClass = (status) => {
  if (status === 'Live') return styles.badgeLive;
  if (status === 'Review') return styles.badgeReview;
  return styles.badgeDraft;
};

export default function UserDashboard() {
  return (
    <div className={`${styles.dashboardPage} bg-light`}>
      <div className={`${styles.pageContainer} container-fluid`}>
        {/* <header className={`${styles.navBar} d-flex align-items-center justify-content-between flex-wrap`}>
          <div className={styles.navBrand}>
            <img src="/portfolio-genie-logo.svg" alt="Portfolio Genie" />
          </div>

          <nav className={`${styles.navLinks} d-none d-md-flex align-items-center`}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#how-it-works" className={styles.navLink}>How It Works</a>
            <a href="#connect" className={styles.navLink}>Connect to GitHub</a>
            <a href="#portfolio" className={styles.navLink}>Portfolio</a>
          </nav>

          <div className={`${styles.userBlock} d-flex align-items-center gap-2`}>
            <div className={styles.avatar}>S</div>
            <div>
              <div className={styles.username}>Sarah Williams</div>
              <div className={styles.userRole}>Product Designer</div>
            </div>
          </div>
        </header> */}

        <main className={styles.mainContent}>
          <section className={styles.heroSection}>
            <div>
              <p className={styles.smallTitle}>Dashboard</p>
              <h1 className={styles.pageTitle}>Welcome, Sarah!</h1>
              <p className={styles.pageSubtitle}>
                Your GitHub portfolio is looking great. Track progress, analytics, and project updates all in one place.
              </p>
            </div>
          </section>

          <section className={styles.gridSection}>
            <article className={`${styles.statsCard} ${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>GitHub Stats</h2>
                <span className={styles.cardMeta}>Live overview</span>
              </div>
              <div className={styles.statGrid}>
                {stats.map((item) => (
                  <div key={item.label} className={styles.statItem}>
                    <span className={styles.statValue}>{item.value}</span>
                    <span className={styles.statLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className={`${styles.chartCard} ${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Skills Analytics</h2>
                <span className={styles.cardMeta}>Radar view</span>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={320}>
                  <RadarChart data={radarData} outerRadius="80%">
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar
                      name="Skill Score"
                      dataKey="score"
                      stroke="#7c3aed"
                      fill="#7c3aed"
                      fillOpacity={0.25}
                    />
                    <Tooltip contentStyle={{ borderRadius: 16, borderColor: '#e5e7eb' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className={`${styles.analyticsCard} ${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Activity Analytics</h2>
                <span className={styles.cardMeta}>Daily commits & activity</span>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={activityData} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 16, borderColor: '#e5e7eb' }} />
                    <Legend verticalAlign="top" height={32} iconType="circle" />
                    <Area type="monotone" dataKey="commits" stroke="#2563eb" fill="url(#blueGradient)" strokeWidth={3} />
                    <Area type="monotone" dataKey="reviews" stroke="#7c3aed" fill="url(#purpleGradient)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className={`${styles.progressCard} ${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Portfolio Progress</h2>
                <span className={styles.cardMeta}>Profile completion</span>
              </div>
              <div className={styles.progressBody}>
                <div className={styles.progressCircle}>
                  <div className={styles.progressValue}>89%</div>
                </div>
                <ul className={styles.checklist}>
                  {progressChecklist.map((item) => (
                    <li key={item} className={styles.checkItem}>
                      <span className={styles.checkMark}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </section>

          <section className={styles.projectsSection}>
            <div className={`${styles.sectionHeader} d-flex align-items-center justify-content-between flex-wrap`}>
              <div>
                <h2 className={styles.sectionTitle}>Recent Projects</h2>
                <p className={styles.sectionSubtitle}>All project summaries synced from GitHub and ready to publish.</p>
              </div>
              <CTAButton variant="primary" size="small">
                view all projects
              </CTAButton>
            </div>

            <div className={styles.projectsGrid}>
              {recentProjects.map((project) => (
                <article key={project.title} className={styles.projectCard}>
                  <div className={styles.projectThumb} />
                  <div className={styles.projectBody}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDate}>{project.date}</p>
                    <span className={`${styles.statusBadge} ${statusClass(project.status)}`}>{project.status}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
