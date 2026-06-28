import styles from "./Loading.module.css";
import logo from "../../../assets/Logo.png";

export default function Loading({
  message = "Loading...",
}) {
  return (
    <div className={styles.loader}>
      <div className={styles.blobOne}></div>
      <div className={styles.blobTwo}></div>
      <div className={styles.blobThree}></div>

      <div className={styles.orbit}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.logoContainer}>
        <div className={styles.logoGlow}></div>

        <img
          src={logo}
          alt="PortfolioGenie"
          className={styles.logo}
        />
      </div>

      <h2 className={styles.title}>PortfolioGenie</h2>

      <p className={styles.message}>{message}</p>

      <div className={styles.progress}>
        <div className={styles.progressBar}></div>
      </div>
    </div>
  );
}