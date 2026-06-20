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
    transition: "color var(--transition-fast)"
  });

  return (
    <>
      <nav
        className="navbar navbar-expand-lg border-bottom py-3"
        style={{ backgroundColor: "var(--white)", borderBottomColor: "var(--gray-2)" }}
      >
        <div className="container">
          <Link
            className="navbar-brand fw-bold h4 m-0 d-flex align-items-center text-decoration-none"
            to="/"
            style={{ color: "var(--primary-blue)", letterSpacing: "-0.5px" }}
          >
            <span className="me-2" style={{ color: "var(--accent-cyan)" }}>✨</span>
            PortfolioGenie
          </Link>

          <button
            className={`navbar-toggler border-0 ${isOpen ? "" : "collapsed"}`}
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4">
              <li className="nav-item">
                <NavLink
                  className="nav-link body-text fw-semibold"
                  style={navLinkStyle}
                  to="/user-dashboard"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link body-text fw-semibold"
                  style={navLinkStyle}
                  to="/portfolio"
                  onClick={() => setIsOpen(false)}
                >
                  Portfolio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link body-text fw-semibold"
                  style={navLinkStyle}
                  to="/connect"
                  onClick={() => setIsOpen(false)}
                >
                  Connect to GitHub
                </NavLink>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-link body-text text-decoration-none fw-medium px-3 py-2"
                style={{ color: "var(--gray-5)" }}
                onClick={() => { navigate('/login'); setIsOpen(false); }}
              >
                Sign In
              </button>

              <CTAButton
                variant="primary"
                size="small"
                onClick={() => { navigate('/connect'); setIsOpen(false); }}
              >
                Get Started
              </CTAButton>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}