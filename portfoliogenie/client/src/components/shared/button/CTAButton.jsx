import styles from "./CTAButton.module.css";

export default function CTAButton({
  children,
  variant = "primary",
  size = "medium",
  icon,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${fullWidth ? styles.fullWidth : ""}
      `}
      {...props}
    >
      {icon && (
        <span className={styles.icon}>
          {icon}
        </span>
      )}

      <span>{children}</span>
    </button>
  );
}