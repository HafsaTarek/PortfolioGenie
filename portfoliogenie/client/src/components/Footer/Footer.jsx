import styles from "./Footer.module.css";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.brand}>
          <img
            src="/portfolio-genie-logo.svg"
            alt="PortfolioGenie"
            className={styles.logo}
          />

          <p>
            Transform your GitHub activity into a professional,
            recruiter-ready portfolio in minutes.
          </p>
        </div>

        <div className={styles.links}>
          <a href="/user-dashboard">Dahboard</a>
          <a href="/user-dashboard">Portfolio</a>
          <a href="/connect">Connect GitHub</a>
        </div>

        <div className={styles.bottom}>
          <p>©2026 PortfolioGenie. All rights reserved.</p>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className={styles.github}
          >
            <FaGithub />
          </a>
        </div>

      </div>
    </footer>
  );
}