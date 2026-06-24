import styles from "./ReadyToBuild.module.css";
import { FaGithub } from "react-icons/fa";
import CTAButton from "../../components/shared/button/CTAButton";
import { useNavigate } from "react-router-dom";
import { requireAuth } from "../../util/authNavigation";
import { useAuth } from "../../context/AuthContext";

export default function ReadyToBuild() {
  const navigate = useNavigate();
  const { user } = useAuth();

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
              onClick={() =>
                requireAuth(
                  user,
                  navigate,
                  "/connect",
                  "You need to login before connecting your GitHub account."
                )
              }
            >
              <FaGithub className="me-2" />
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