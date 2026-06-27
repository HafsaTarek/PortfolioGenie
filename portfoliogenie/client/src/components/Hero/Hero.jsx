import React from "react";
import styles from "./Hero.module.css";
import { FaGithub } from "react-icons/fa";
import CTAButton from "../../components/shared/button/CTAButton";
import { useNavigate } from "react-router-dom";
import { requireAuth } from "../../util/authNavigation";
import { useAuth } from "../../context/AuthContext";



export default function Hero() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <section className={styles.hero}>
            <div className={styles.heroGlow}></div>

            <div className={styles.content}>
                <span className={styles.badge}>
                    ✨ AI-Powered Developer Portfolio Builder
                </span>

                <h1 className={styles.title}>
                    Turn Your GitHub Into a
                    <br />
                    <span className={styles.gradientText}>
                        Stunning Developer Portfolio
                    </span>
                </h1>

                <p className={styles.subtitle}>
                    PortfolioGenie helps junior developers create professional,
                    high-performance portfolios by analyzing GitHub activity and
                    generating recruiter-ready content that's SEO-friendly,
                    readable, and visually polished.
                </p>

                <div className={styles.actions}>
                    <CTAButton
                        variant="primary"
                        size="large"
                        onClick={() =>
                            requireAuth(
                                user,
                                navigate,
                                "/connect",
                                "You need to login before connecting your GitHub account."
                            )
                        }
                    >
                        <FaGithub className="me-2" />
                        Connect GitHub & Start
                    </CTAButton>

                    <CTAButton
                        variant="outline"
                        size="large"
                        onClick={() =>
                            requireAuth(
                                user,
                                navigate,
                                "/portfolio",
                                "You need to login before viewing your portfolio."
                            )
                        }
                    >
                        View Portfolio
                    </CTAButton>
                </div>
            </div>
        </section>
    );
}