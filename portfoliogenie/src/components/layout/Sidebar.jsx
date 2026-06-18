import ScoreCard from '../common/ScoreCard';
import QuickTipsCard from '../common/QuickTipsCard';
import styles from './Sidebar.module.css';

export default function Sidebar({ contentScore, seoScore, tips }) {
  return (
    <aside className={styles.sidebar} aria-label="Content insights">
      <ScoreCard {...contentScore} />
      <ScoreCard {...seoScore} />
      <QuickTipsCard tips={tips} />
    </aside>
  );
}
