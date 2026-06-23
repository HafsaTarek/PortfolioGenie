import React from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "../../components/shared/button/CTAButton";
import styles from "../Login/Login.module.css";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <img
          src="/portfolio-genie-logo.svg"
          alt="Portfolio Genie"
          className={styles.logo}
        />

        <h1 className={styles.title}>Create Your Account</h1>

        <p className={styles.subtitle}>
          Start building your professional portfolio today
        </p>

        <div className={styles.divider}>
          <span>Or continue with email</span>
        </div>

        <form>
          <div className="mb-3">
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              className={`form-control ${styles.input}`}
              placeholder="John Doe"
            />
          </div>

          <div className="mb-3">
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              className={`form-control ${styles.input}`}
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-3">
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={`form-control ${styles.input}`}
            />
          </div>

          <div className="mb-3">
            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              className={`form-control ${styles.input}`}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
            />
            <label
              htmlFor="terms"
              className="form-check-label small"
            >
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <div className="w-100">
            <CTAButton
              variant="primary"
              size="medium"
              fullWidth
            >
              Create Account
            </CTAButton>
          </div>
        </form>

        <div className={styles.footer}>
          <span>Already have an account?</span>

          <button
            type="button"
            className={styles.signupBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}