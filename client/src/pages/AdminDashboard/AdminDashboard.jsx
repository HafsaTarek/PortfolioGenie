import { AreaChart, Area, BarChart, Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import styles from './AdminDashboard.module.css';

const adminStats = [
  { label: 'Total Users', value: '1,456', icon: '👥', trend: '+12%' },
  { label: 'Portfolios Created', value: '892', icon: '📊', trend: '+8%' },
  { label: 'GitHub Connected', value: '723', icon: '🔗', trend: '+15%' },
  { label: 'Active Users', value: '634', icon: '⚡', trend: '+5%' },
];

const userGrowthData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 215 },
  { month: 'Mar', users: 380 },
  { month: 'Apr', users: 520 },
  { month: 'May', users: 780 },
  { month: 'Jun', users: 1456 },
];

const portfolioCreationData = [
  { week: 'Week 1', created: 45, updated: 28 },
  { week: 'Week 2', created: 62, updated: 35 },
  { week: 'Week 3', created: 58, updated: 41 },
  { week: 'Week 4', created: 89, updated: 54 },
];

const userData = [
  { id: 1, name: 'John Anderson', email: 'john@example.com', status: 'Active', joinDate: '2024-01-15' },
  { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', status: 'Active', joinDate: '2024-01-22' },
  { id: 3, name: 'Michael Chen', email: 'michael@example.com', status: 'Active', joinDate: '2024-02-03' },
  { id: 4, name: 'Emma Johnson', email: 'emma@example.com', status: 'Inactive', joinDate: '2024-02-10' },
  { id: 5, name: 'David Martinez', email: 'david@example.com', status: 'Active', joinDate: '2024-02-18' },
];

const recentActivityData = [
  { id: 1, type: 'user_registered', user: 'Alex Thompson', action: 'New user registered', timestamp: '2 hours ago', icon: '✨' },
  { id: 2, type: 'portfolio_generated', user: 'Emma Davis', action: 'Portfolio generated successfully', timestamp: '4 hours ago', icon: '📈' },
  { id: 3, type: 'github_connected', user: 'Chris Wilson', action: 'GitHub account connected', timestamp: '5 hours ago', icon: '🔗' },
  { id: 4, type: 'portfolio_updated', user: 'Jessica Brown', action: 'Portfolio updated', timestamp: '6 hours ago', icon: '✏️' },
  { id: 5, type: 'user_registered', user: 'Ryan Moore', action: 'New user registered', timestamp: '8 hours ago', icon: '✨' },
];

const systemStatusData = [
  { name: 'Server Status', status: 'Healthy', uptime: '99.9%', icon: '🖥️' },
  { name: 'Database', status: 'Healthy', uptime: '99.95%', icon: '📀' },
  { name: 'API Gateway', status: 'Healthy', uptime: '99.8%', icon: '⚙️' },
];

const getStatusColor = (status) => {
  return status === 'Active' ? styles.statusActive : styles.statusInactive;
};

export default function AdminDashboard() {
  return (
    <div className={`${styles.dashboardPage} bg-light`}>
      <div className={`${styles.pageContainer} container-fluid`}>
        <header className={`${styles.navBar} d-flex align-items-center justify-content-between flex-wrap`}>
          <div className={styles.navBrand}>
            <img src="/portfolio-genie-logo.svg" alt="Portfolio Genie" className={styles.logoImage} />
          </div>

          <div className={styles.navTitle}>
            <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
          </div>

          <div className={`${styles.userBlock} d-flex align-items-center gap-2`}>
            <div className={styles.avatar}>A</div>
            <div>
              <div className={styles.username}>Admin User</div>
              <div className={styles.userRole}>Administrator</div>
            </div>
          </div>
        </header>

        <main className={styles.mainContent}>
          <section className={styles.heroSection}>
            <div>
              <p className={styles.smallTitle}>Welcome Back</p>
              <h2 className={styles.pageTitle}>Admin Dashboard</h2>
              <p className={styles.pageSubtitle}>
                Manage users, monitor system health, and track platform analytics all in one place.
              </p>
            </div>
          </section>

          <section className={styles.statsGrid}>
            {adminStats.map((stat) => (
              <div key={stat.label} className={`${styles.statCard} ${styles.card}`}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                  <span className={styles.statTrend}>{stat.trend} from last month</span>
                </div>
              </div>
            ))}
          </section>

          <section className={styles.chartsGrid}>
            <article className={`${styles.chartCard} ${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>User Growth</h2>
                <span className={styles.cardMeta}>Monthly trend</span>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 16, borderColor: '#e5e7eb' }} />
                    <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className={`${styles.chartCard} ${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Portfolio Creation</h2>
                <span className={styles.cardMeta}>Weekly activity</span>
              </div>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={portfolioCreationData} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: 16, borderColor: '#e5e7eb' }} />
                    <Legend verticalAlign="top" height={32} iconType="square" />
                    <Bar dataKey="created" fill="#2563eb" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="updated" fill="#7c3aed" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>

          <section className={styles.contentSection}>
            <article className={`${styles.tableCard} ${styles.card}`}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>User Management</h2>
                  <p className={styles.cardSubtitle}>Manage platform users</p>
                </div>
              </div>
              <div className={styles.tableWrapper}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Join Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user) => (
                      <tr key={user.id}>
                        <td className={styles.userName}>{user.name}</td>
                        <td className={styles.userEmail}>{user.email}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className={styles.joinDate}>{user.joinDate}</td>
                        <td className={styles.actionButtons}>
                          <button type="button" className={styles.actionBtn}>View</button>
                          <button type="button" className={styles.actionBtn}>Edit</button>
                          <button type="button" className={`${styles.actionBtn} ${styles.deletBtn}`}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className={`${styles.activityCard} ${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Recent Activity</h2>
                <span className={styles.cardMeta}>Latest events</span>
              </div>
              <div className={styles.activityFeed}>
                {recentActivityData.map((activity) => (
                  <div key={activity.id} className={styles.activityItem}>
                    <div className={styles.activityIcon}>{activity.icon}</div>
                    <div className={styles.activityContent}>
                      <h4 className={styles.activityUser}>{activity.user}</h4>
                      <p className={styles.activityAction}>{activity.action}</p>
                      <span className={styles.activityTime}>{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className={styles.systemStatusSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>System Status</h2>
              <p className={styles.sectionSubtitle}>Infrastructure health</p>
            </div>
            <div className={styles.statusGrid}>
              {systemStatusData.map((service) => (
                <div key={service.name} className={`${styles.statusCard} ${styles.card}`}>
                  <div className={styles.statusIconLarge}>{service.icon}</div>
                  <h3 className={styles.statusName}>{service.name}</h3>
                  <div className={styles.statusIndicator}>
                    <span className={styles.statusDot} />
                    <span className={styles.statusText}>{service.status}</span>
                  </div>
                  <p className={styles.statusUptime}>Uptime: {service.uptime}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
