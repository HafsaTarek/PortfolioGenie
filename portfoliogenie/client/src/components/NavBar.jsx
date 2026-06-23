import { useState, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import CTAButton from "../components/shared/button/CTAButton";
import UserMenu from "./userDropdown/UserMenu";
import { useAuth } from "../context/AuthContext";
import { GitHubService } from "../services/github.service";
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [githubConnected, setGithubConnected] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive
      ? "var(--primary-blue)"
      : "var(--text-color)",
    fontWeight: isActive ? "600" : "500",
    transition: "all 0.2s ease",
  });

  useEffect(() => {
    const checkGithubConnection = async () => {
      if (!user) {
        setGithubConnected(false);
        return;
      }

      try {
        await GitHubService.getConnectedAccount();
        setGithubConnected(true);
      } catch {
        setGithubConnected(false);
      }
    };

    checkGithubConnection();
  }, [user]);

  const showLoginRequired = () => {
    Swal.fire({
      icon: "warning",
      title: "Authentication Required",
      text: "You should login first.",
      confirmButtonText: "Go to Login",
    }).then(() => {
      navigate("/login");
    });
  };

  const showGithubRequired = () => {
    Swal.fire({
      icon: "info",
      title: "GitHub Connection Required",
      text: "You should connect your GitHub account first.",
      confirmButtonText: "Connect GitHub",
    }).then(() => {
      navigate("/connect");
    });
  };

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
                className="nav-link text-decoration-none"
                style={navLinkStyle}
                to="/user-dashboard"
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    showLoginRequired();
                  }
                }}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-decoration-none"
                style={navLinkStyle}
                to="/portfolio"
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    showLoginRequired();
                    return;
                  }

                  if (!githubConnected) {
                    e.preventDefault();
                    showGithubRequired();
                  }
                }}
              >
                Portfolio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-decoration-none"
                style={navLinkStyle}
                to="/connect"
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    showLoginRequired();
                  }
                }}
              >
                Connect to GitHub
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <CTAButton
                  variant="outline"
                  size="small"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </CTAButton>

                <CTAButton
                  variant="primary"
                  size="small"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </CTAButton>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}