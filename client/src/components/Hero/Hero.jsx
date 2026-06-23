import React from "react";
import styles from "./Hero.module.css";
import { FaGithub } from "react-icons/fa";

export default function Hero() {
    return (
        <div className="hero my-5">
            <div className="content container w-75 m-auto">
                <p className={`${styles.p_color} rounded-3 p-1 mx-auto my-5`}>
                    AI-Powered Developer Portfolio Builder
                </p>

                <h1 className="fw-bold text-center">
                    Turn Your Github Into a
                    <br />
                    <span className={`${styles.mainColor} fw-bold`}>
                        Stunning Developer Portfolio
                    </span>
                </h1>

                <p className={`${styles.h2_color} text-center`}>
                    PortfolioGenie helps junior developers create professional,
                    high-performance portfolios by analyzing their GitHub activity and
                    generating optimized content that's readable, SEO-friendly, and
                    visually polished.
                </p>

                <div className="buttons mx-auto w-50 d-flex flex-column flex-md-row gap-2 my-5">
                    <button
                        className={`${styles.btn_1} ${styles.step1} text-white p-3 border-0 rounded-2`}
                    >
                        <FaGithub size={20} /> Connect GitHub & Start
                    </button>

                    <button
                        className={`${styles.btn_1} bg-white p-3 border-0 rounded-2`}
                    >
                        View Demo Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
}