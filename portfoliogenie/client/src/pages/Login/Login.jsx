import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import CTAButton from "../../components/shared/button/CTAButton";
import { useAuth } from "../../context/AuthContext";

import styles from "../Login/Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        setApiError(null);
        setIsLoading(true);

        const user = await login(values.email, values.password);

        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } catch (err) {
        setApiError(
          err.message || "Login failed. Please check your credentials."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
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



        <form onSubmit={formik.handleSubmit}>
          {apiError && (
            <div className="alert alert-danger mb-3">
              {apiError}
            </div>
          )}

          <div className="mb-4">
            <label className={styles.label}>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${styles.input} ${formik.errors.email && formik.touched.email
                ? "is-invalid"
                : ""
                }`}
            />

            {formik.errors.email && formik.touched.email && (
              <div className="invalid-feedback">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className={styles.label}>Password</label>

            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${styles.input} ${formik.errors.password && formik.touched.password
                ? "is-invalid"
                : ""
                }`}
            />

            {formik.errors.password && formik.touched.password && (
              <div className="invalid-feedback">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mb-4 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />

            <label
              className="form-check-label"
              htmlFor="rememberMe"
            >
              Remember me
            </label>
          </div>

          <CTAButton
            type="submit"
            variant="primary"
            size="medium"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </CTAButton>
        </form>

        <div className={styles.footer}>
          <span>Don't have an account?</span>

          <button
            type="button"
            className={styles.signupBtn}
            onClick={() => navigate("/register")}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
}