import styles from "./ReadyToBuild.module.css";
import { FaGithub } from "react-icons/fa";
import CTAButton from "../../components/shared/button/CTAButton";
import { useNavigate } from "react-router-dom";

export default function ReadyToBuild() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.ctaBox}>

          <span className={styles.badge}>
            🚀 Get Started Today
          </span>

          <h2>
            Ready to Build Your
            <span className={styles.gradientText}>
              {" "}Dream Portfolio?
            </span>
          </h2>

          <p>
            Join thousands of developers transforming GitHub activity
            into recruiter-ready portfolios with AI.
          </p>

          <div className={styles.buttons}>
            <CTAButton
              variant="secondary"
              size="large"
              onClick={() => navigate("/connect")}
            >
              <FaGithub  className="me-2"/>
              Start Building for Free
            </CTAButton>
          </div>

          <span className={styles.note}>
            No credit card required • 100% Free • Get started in 5 minutes
          </span>
        </div>
      </div>
    </section>
  );
}