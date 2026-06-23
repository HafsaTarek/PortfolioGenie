import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "../../components/shared/button/CTAButton";
import styles from "../Login/Login.module.css";
import { useAuth } from "../../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(values) {
    try {
      setIsLoading(true);
      setApiError(null);

      await register(
        values.name,
        values.email,
        values.password,
        values.confirmPassword
      );

      navigate("/login");
    } catch (err) {
      setApiError(
        err.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Full name is required")
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters"),

    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf(
        [Yup.ref("password")],
        "Passwords do not match"
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <img
          src="/portfolio-genie-logo.svg"
          alt="Portfolio Genie"
          className={styles.logo}
        />

        <h1 className={styles.title}>
          Create Your Account
        </h1>

        <p className={styles.subtitle}>
          Start building your professional portfolio today
        </p>

        <div className={styles.divider}>
          <span>Or continue with email</span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {apiError && (
            <div
              className="alert alert-danger mb-3"
              role="alert"
            >
              {apiError}
            </div>
          )}

          {/* Full Name */}
          <div className="mb-3">
            <label className={styles.label}>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${styles.input} ${
                formik.errors.name &&
                formik.touched.name
                  ? "is-invalid"
                  : ""
              }`}
            />

            {formik.errors.name &&
              formik.touched.name && (
                <div className="invalid-feedback">
                  {formik.errors.name}
                </div>
              )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className={styles.label}>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${styles.input} ${
                formik.errors.email &&
                formik.touched.email
                  ? "is-invalid"
                  : ""
              }`}
            />

            {formik.errors.email &&
              formik.touched.email && (
                <div className="invalid-feedback">
                  {formik.errors.email}
                </div>
              )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className={styles.label}>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${styles.input} ${
                formik.errors.password &&
                formik.touched.password
                  ? "is-invalid"
                  : ""
              }`}
            />

            {formik.errors.password &&
              formik.touched.password && (
                <div className="invalid-feedback">
                  {formik.errors.password}
                </div>
              )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className={styles.label}>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${styles.input} ${
                formik.errors.confirmPassword &&
                formik.touched.confirmPassword
                  ? "is-invalid"
                  : ""
              }`}
            />

            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <div className="invalid-feedback">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          {/* Terms */}
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
              I agree to the Terms of Service and
              Privacy Policy
            </label>
          </div>

          <div className="w-100">
            <CTAButton
              type="submit"
              variant="primary"
              size="medium"
              fullWidth
              disabled={isLoading}
            >
              {isLoading
                ? "Creating Account..."
                : "Create Account"}
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