import styles from './AdminDashboard.module.css';

const adminStats = [
  { label: 'Total Users', value: '1,456', icon: '👥', trend: '+12%' },
  { label: 'Portfolios Created', value: '892', icon: '📊', trend: '+8%' },
  { label: 'GitHub Connected', value: '723', icon: '🔗', trend: '+15%' },
];

const userData = [
  { id: 1, name: 'John Anderson', email: 'john@example.com', status: 'Active', joinDate: '2024-01-15' },
  { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', status: 'Active', joinDate: '2024-01-22' },
  { id: 3, name: 'Michael Chen', email: 'michael@example.com', status: 'Active', joinDate: '2024-02-03' },
  { id: 4, name: 'Emma Johnson', email: 'emma@example.com', status: 'Inactive', joinDate: '2024-02-10' },
  { id: 5, name: 'David Martinez', email: 'david@example.com', status: 'Active', joinDate: '2024-02-18' },
];

const getStatusColor = (status) => {
  return status === 'Active' ? styles.statusActive : styles.statusInactive;
};

export default function AdminDashboard() {
  return (
    <div className={`${styles.dashboardPage} bg-light`}>
      <div className={styles.pageContainer}>
        <header className={`${styles.navBar} d-flex align-items-center justify-content-between`}>
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
                Manage users and review platform activity with a simple dashboard built for easy backend integration.
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

          <section className={styles.tableSection}>
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
                      <th>Name</th>
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
                          <button type="button" className={`${styles.actionBtn} ${styles.deletBtn}`}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
