import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuUser,
  LuLayoutDashboard,
  LuLogOut,
} from "react-icons/lu";

import styles from "./UserMenu.module.css";
import { ChevronDownIcon } from "../icons/icons";
import { useAuth } from "../../context/AuthContext";

import { API_BASE_URL } from "../../config/api";

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const handleMenuClick = (action) => {
    setOpen(false);

    switch (action) {
      case "profile":
        navigate("/profile");
        break;

      case "dashboard":
        navigate("/user-dashboard");
        break;

      case "logout":
        logout();
        navigate("/");
        break;

      default:
        break;
    }
  };
  
  const imageUrl = user?.profileImage
    ? user.profileImage.startsWith("http")
      ? user.profileImage
      : `${API_BASE_URL}${user.profileImage}`
    : null;

  return (
    <div
      className={styles.container}
      ref={containerRef}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* Avatar */}
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={user?.name || "User"}
            className={styles.avatar}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <LuUser size={22} />
          </div>
        )}

        <span className={styles.name}>
          {user?.name || "User"}
        </span>

        <ChevronDownIcon
          size={16}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""
            }`}
        />
      </button>

      {open && (
        <ul className={styles.menu}>
          <li>
            <button
              type="button"
              className={styles.menuItem}
              onClick={() =>
                handleMenuClick("profile")
              }
            >
              <LuUser
                size={18}
                className={styles.menuIcon}
              />
              <span>Profile</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={styles.menuItem}
              onClick={() =>
                handleMenuClick("dashboard")
              }
            >
              <LuLayoutDashboard
                size={18}
                className={styles.menuIcon}
              />
              <span>Dashboard</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`${styles.menuItem} ${styles.logoutItem}`}
              onClick={() =>
                handleMenuClick("logout")
              }
            >
              <LuLogOut
                size={18}
                className={styles.menuIcon}
              />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}