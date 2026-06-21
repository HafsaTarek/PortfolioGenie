import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '../icons/icons';
import styles from './UserMenu.module.css';
import { LuUser, LuLayoutDashboard, LuLogOut } from 'react-react-icons/lu';

const MENU_ITEMS = [
  { id: 'profile', label: 'View Profile', icon: LuUser },
  { id: 'dashboard', label: 'Dashboard', icon: LuLayoutDashboard },
  { id: 'logout', label: 'Logout', icon: LuLogOut },
];

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <img src={user?.avatarUrl || 'https://via.placeholder.com/150'} alt="" className={styles.avatar} />
        <span className={styles.name}>{user?.name || 'Sarah Ahmed'}</span>
        <ChevronDownIcon size={16} className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </button>

      {open && (
        <ul className={styles.menu} role="menu">
          {MENU_ITEMS.map((item) => {
            const IconComponent = item.icon;

            return (
              <li key={item.id} role="none">
                <button
                  type="button"
                  role="menuitem"
                  className={`${styles.menuItem} ${item.id === 'logout' ? styles.logoutItem : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <IconComponent className={styles.menuIcon} size={16} />
                  <span className={styles.menuLabel}>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}