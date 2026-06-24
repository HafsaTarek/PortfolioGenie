import { useState, useEffect } from 'react';
import { AdminService } from "../../services/admin.service";
import styles from './AdminDashboard.module.css';

const getStatusColor = (status) => {
  return status === 'Active' ? styles.statusActive : styles.statusInactive;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial dashboard metrics and users list on mount
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);
        
        // Run requests concurrently for efficiency
        const [statsData, usersData] = await Promise.all([
          AdminService.getStats(),
          AdminService.getUsers()
        ]);

        // Map data safely assuming array backend payloads, fallback to structures if empty
        setStats(statsData || []);
        setUsers(usersData || []);
      } catch (err) {
        console.error("Dashboard population failed:", err);
        setError(err.message || "Failed to load management metrics.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Action Handler: Remove individual user records
  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete user ${name}?`)) return;

    try {
      await AdminService.deleteUser(id);
      
      // Optimistic UI updates: strip deleted item immediately from current DOM array
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      
      // Optional: Refresh local metrics in case total calculation dynamically shifted
      const updatedStats = await AdminService.getStats();
      setStats(updatedStats || []);
    } catch (err) {
      alert(`Could not remove user record: ${err.message || "Server Error"}`);
    }
  };

  // Action Handler: Pull up detail inspection summary context
  const handleViewUser = async (id) => {
    try {
      const comprehensiveUserObj = await AdminService.getUser(id);
      alert(`Inspecting detailed record for ${comprehensiveUserObj.name || 'User'}:\nEmail: ${comprehensiveUserObj.email}`);
    } catch (err) {
      alert(`Failed to fetch user profiles details: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading Administrative Systems...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        <div className="text-danger h1 mb-3">⚠️</div>
        <h2 className="h4 text-dark fw-bold mb-2">Administrative Fetch Error</h2>
        <p className="text-muted mb-4">{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry Handshake</button>
      </div>
    );
  }

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

          {/* DYNAMIC CARD GENERATION GRID */}
          <section className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={`${styles.statCard} ${styles.card}`}>
                <div className={styles.statIcon}>{stat.icon || '📊'}</div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                  <span className={styles.statTrend}>{stat.trend} from last month</span>
                </div>
              </div>
            ))}
          </section>

          {/* LIVE USER MANAGEMENT INTERACTION COMPONENT */}
          <section className={styles.tableSection}>
            <article className={`${styles.tableCard} ${styles.card}`}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>User Management</h2>
                  <p className={styles.cardSubtitle}>Manage platform users ({users.length})</p>
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
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">
                          No active user registrations tracked in backend datastores.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
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
                            <button 
                              type="button" 
                              className={styles.actionBtn}
                              onClick={() => handleViewUser(user.id)}
                            >
                              View
                            </button>
                            <button 
                              type="button" 
                              className={`${styles.actionBtn} ${styles.deletBtn}`}
                              onClick={() => handleDeleteUser(user.id, user.name)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
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