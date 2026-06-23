import React from "react";
// import GithubLogin from "../../components/GithubLogin";
// import {  FaStar} from "react-icons/fa";
//import styles from './Login.module.css';
import styles from '../Login/Login.module.css'
import { useNavigate } from "react-router-dom";
import CTAButton from "../../components/shared/button/CTAButton";
export default function Login() {
  let navigate = useNavigate();
  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <img
            src="/portfolio-genie-logo.svg"
            alt="Portfolio Genie"
            className={styles.logo}
          />

          <h1 className={styles.title}>Welcome Back</h1>

          <p className={styles.subtitle}>
            Login to continue building your portfolio
          </p>

          <div className={styles.divider}>
            <span>Or continue with email</span>
          </div>

          <form>
            <div className="mb-4">
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                className={`form-control ${styles.input}`}
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-4">
              <label className={styles.label}>Password</label>
              <input
                type="password"
                className={`form-control ${styles.input}`}
              />
            </div>

            <div className="mb-4 form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">
                Remember me
              </label>
            </div>

            <CTAButton
              variant="primary"
              size="medium"
              fullWidth
            >
              Continue with GitHub
            </CTAButton>
          </form>

          <div className={styles.footer}>
            <span>Don't have an account?</span>

            <button
              className={styles.signupBtn}
              onClick={() => navigate("/register")}
            >
              Sign up for free
            </button>
          </div>
        </div>
      </div>
    </>
  );
}