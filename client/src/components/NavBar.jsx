import { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import CTAButton from "../components/shared/button/CTAButton";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "var(--primary-blue)" : "var(--gray-5)",
    transition: "color var(--transition-fast)",
  });

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom py-2 py-lg-3 sticky-top"
      style={{ backgroundColor: "var(--white)", borderBottomColor: "var(--gray-2)" }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold h4 m-0 d-flex align-items-center text-decoration-none"
          to="/"
          style={{ color: "var(--primary-blue)", letterSpacing: "-0.5px" }}
        >
          <img
            src="/portfolio-genie-logo.svg"
            alt="Portfolio Genie"
            style={{ height: "24px", width: "auto", marginRight: "8px" }}
          />
        </Link>

        <button
          className={`navbar-toggler border-0 p-2 ${isOpen ? "" : "collapsed"}`}
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          style={{ boxShadow: "none" }}
        >
          <span className="navbar-toggler-icon" style={{ width: "1.25rem", height: "1.25rem" }} />
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">

          <ul className="navbar-nav mx-auto mb-3 mb-lg-0 gap-2 gap-lg-4 pt-3 pt-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link body-text fw-semibold py-2 px-1"
                style={navLinkStyle}
                to="/user-dashboard"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link body-text fw-semibold py-2 px-1"
                style={navLinkStyle}
                to="/portfolio"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link body-text fw-semibold py-2 px-1"
                style={navLinkStyle}
                to="/connect"
                onClick={() => setIsOpen(false)}
              >
                Connect to GitHub
              </NavLink>
            </li>
          </ul>

          <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-lg-center gap-2 gap-lg-3 border-top border-light pt-3 pt-lg-0">
            <button
              className="btn btn-link body-text text-decoration-none fw-medium text-center py-2 px-3"
              style={{ color: "var(--gray-5)" }}
              onClick={() => { navigate('/login'); setIsOpen(false); }}
            >
              Sign In
            </button>

            <CTAButton
              variant="primary"
              size="small"
              onClick={() => { navigate('/register'); setIsOpen(false); }}
            >
              Get Started
            </CTAButton>
          </div>

        </div>
      </div>
    </nav>
  );
}