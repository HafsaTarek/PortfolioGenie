import styles from "./ReadyToBuild.module.css";
import { FaGithub } from "react-icons/fa";
export default function ReadyToBuild() {
  return (
    <section className="py-5 bg-white">
      <div className="container ">
        <div className={styles.ctaBox}>
          <h2>Ready to Build Your Dream Portfolio?</h2>

          <p>
            Join over 10,000 junior developers who've transformed their careers
            with AI-powered portfolios
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryBtn}>
              <FaGithub size={20} />               Start Building for Free
            </button>

            <button className={styles.secondaryBtn}>
              View Example Portfolios
            </button>
          </div>

          <span className={styles.note}>
            No credit card required • 100% Free • Get started in 5 minutes
          </span>
        </div>
      </div>
    </section>
  );
}