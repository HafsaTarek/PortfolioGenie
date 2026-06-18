import { useState } from 'react';
import { SparkleIcon, MenuIcon, CloseIcon } from '../icons/icons';
import UserMenu from './UserMenu';
import styles from './Header.module.css';

export default function Header({ navLinks, activeNavId, user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#home" className={styles.brand} aria-label="PortfolioGenie home">
          <SparkleIcon size={20} className={styles.brandIcon} />
          <span className={styles.brandName}>PortfolioGenie</span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`${styles.navLink} ${
                link.id === activeNavId ? styles.navLinkActive : ''
              }`}
              aria-current={link.id === activeNavId ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <UserMenu user={user} />

          <button
            type="button"
            className={styles.menuToggle}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`}
        aria-label="Primary mobile"
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={`${styles.mobileNavLink} ${
              link.id === activeNavId ? styles.navLinkActive : ''
            }`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <div className={styles.mobileUser}>
          <img src={user.avatarUrl} alt="" className={styles.avatar} />
          <span className={styles.userName}>{user.name}</span>
        </div>
      </nav>
    </header>
  );
}
