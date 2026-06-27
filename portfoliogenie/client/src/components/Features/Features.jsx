import React from "react";
import styles from './Features.module.css';
import { FaGithub } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
export default function Features() {
  return (
    <>
      <div className={styles.featuresSection}>
        <div className={styles.container}>

          <div className={styles.headingWrapper}>
            <span className={styles.badge}>
              Features
            </span>

            <h2 className={styles.title}>
              Core Features That
              <span className={styles.gradientText}> Set You Apart</span>
            </h2>

            <p className={styles.subtitle}>
              PortfolioGenie transforms your GitHub activity into a polished,
              recruiter-ready portfolio in minutes.
            </p>
          </div>

          <div className="row g-4">

            {/* Card 1 */}
            <div className="col-12 col-md-6">
              <div className={styles.featureCard}>
                <div className={`${styles.iconWrapper} ${styles.blue}`}>
                  <FaGithub size={28} />
                </div>

                <h3>Connect Your GitHub</h3>

                <p>
                  Import repositories, contributions, languages,
                  and developer activity instantly.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-md-6">
              <div className={styles.featureCard}>
                <div className={`${styles.iconWrapper} ${styles.cyan}`}>
                  <FaBolt size={28} />
                </div>

                <h3>Generate Portfolio Content</h3>

                <p>
                  Create About Me sections, project summaries,
                  and skills automatically.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}