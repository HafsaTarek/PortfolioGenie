import { useRef } from 'react';
import styles from './Tabs.module.css';

/**
 * Accessible tab list following the WAI-ARIA tabs pattern: arrow keys move
 * focus between tabs, Home/End jump to first/last. `tabs` is an array of
 * { id, label }; the active tab is controlled via `activeId`/`onChange`.
 */
export default function Tabs({ tabs, activeId, onChange, idPrefix = 'tab' }) {
  const tabRefs = useRef([]);

  const handleKeyDown = (event, index) => {
    let nextIndex = null;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      onChange(tabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className={styles.tablist} role="tablist" aria-label="Portfolio sections">
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            id={`${idPrefix}-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
