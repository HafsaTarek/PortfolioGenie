import React from "react";
import styles from './Features.module.css';
import { FaGithub } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { BsGrid } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
export default function Features() {
  return (
    <>
    <div className="features bg-white py-5">
        <div className="content w-75 mx-auto">
            <h1 className="fw-bold text-center">
Core Features That 
<span className= {`${styles.mainColor} fw-bold ms-2`}>
    Set You Apart
</span>
            </h1>
            <p className={`${styles.h2_color} text-center`}>
PortfolioGenie transforms your GitHub activity into a polished, recruiter-ready portfolio in minutes.
            </p>
            <div className="container mx-auto">
  <div className="row g-4">

    <div className="col-12 col-md-5 border rounded-4 ">
      <div className="box m-3">
        <div className={`${styles.iconColor1} p-3 rounded-3 text-white mt-1`}>
            <FaGithub size={30} />
        </div>
        <h3 className="mt-3">
            Connect Your GitHub
        </h3>
        <p className={`${styles.h2_color}`}>
            Import repositories, contributions, languages, and developer activity instantly.
        </p>
      </div>
    </div>

    <div className="col-12 col-md-5 border rounded-4">
      <div className="box m-3">
        <div className={`${styles.iconColor2} p-3 rounded-3 text-white mt-1`}>
            <FaBolt size={30} />
        </div>
        <h3 className="mt-3">
            Generate Portfolio Content
        </h3>
        <p className={`${styles.h2_color}`}>
            Create About Me sections, project summaries, and skills automatically.
        </p>
      </div>
    </div>

   <div className="col-12 col-md-5 border rounded-4 ">
      <div className="box m-3">
        <div className={`${styles.iconColor2} p-3 rounded-3 text-white mt-1`}>
            <BsGrid size={30} />
        </div>
        <h3 className="mt-3">
            Choose a Portfolio Template
        </h3>
        <p className={`${styles.h2_color}`}>
            Pick from modern portfolio layouts designed for developers.
        </p>
      </div>
    </div>

    <div className="col-12 col-md-5 border rounded-4">
      <div className="box m-3">
        <div className={`${styles.iconColor1} p-3 rounded-3 text-white mt-1`}>
            <FiSearch size={30} />
        </div>
        <h3 className="mt-3">
            Improve Visibility
        </h3>
        <p className={`${styles.h2_color}`}>
            Get SEO-friendly content to help recruiters find your portfolio.
        </p>
      </div>
    </div>

  </div>
</div>
        </div>
    </div>
    
    </>
  );
}