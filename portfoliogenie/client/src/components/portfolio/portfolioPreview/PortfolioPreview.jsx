import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Download, Briefcase, Code2, User, X } from "lucide-react";
import CTAButton from "../../shared/button/CTAButton";
import { useAuth } from "../../../context/AuthContext";
import { API_BASE_URL } from "../../../config/api";
import styles from "./PortfolioPreview.module.css";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PortfolioPreview({
  show,
  onHide,
  portfolio,
}) {
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const portfolioRef = useRef(null);

  const imageUrl = user?.profileImage
    ? user.profileImage.startsWith("http")
      ? user.profileImage
      : `${API_BASE_URL}${user.profileImage}`
    : null;

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleExport = async () => {
    const element = portfolioRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = 297;

    const imgWidth = pdfWidth;
    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pdfHeight;
    }

    pdf.save(`${user.name}-Portfolio.pdf`);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      dialogClassName={styles.dialog}
      contentClassName={styles.content}
    >
      <Modal.Body className={styles.body}>
        <div className={styles.topbar}>
          <button
            className={styles.closeButton}
            onClick={onHide}
          >
            <X size={18} />
            Close
          </button>

          <CTAButton
            onClick={handleExport}
          >
            <Download size={18} />
            Export PDF
          </CTAButton>

        </div>

        {/* Portfolio */}

        <main
          ref={portfolioRef}
          className={styles.portfolio}
        >

          {/* HERO */}

          <section className={styles.hero}>

            <div className={styles.avatarContainer}>

              {imageUrl && !imageError ? (
                <img
                  src={imageUrl}
                  alt={user?.name}
                  className={styles.avatar}
                  crossOrigin="anonymous"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {initials}
                </div>
              )}

            </div>

            <div className={styles.heroContent}>

              <h1>{user?.name}</h1>

              <h2>
                {portfolio?.aboutMe?.headline}
              </h2>

            </div>

          </section>

          {/* ABOUT */}

          <section className={styles.section}>

            <div className={styles.sectionHeader}>
              <User size={20} />
              <h3>About Me</h3>
            </div>

            <p className={styles.about}>
              {portfolio.aboutMe.biography}
            </p>

            {portfolio.aboutMe.interests && (
              <p className={styles.interests}>
                <strong>Interests:</strong> {portfolio.aboutMe.interests}
              </p>
            )}

          </section>

          {/* SKILLS */}

          <section className={styles.section}>

            <div className={styles.sectionHeader}>
              <Code2 size={20} />
              <h3>Skills</h3>
            </div>

            <div className={styles.skills}>

              {portfolio?.skills?.map((skill) => (

                <span
                  key={skill.name}
                  className={styles.skill}
                >
                  {skill.name}
                </span>

              ))}

            </div>

          </section>

          {/* PROJECTS */}

          <section className={styles.section}>

            <div className={styles.sectionHeader}>
              <Briefcase size={20} />
              <h3>Projects</h3>
            </div>

            <div className={styles.projects}>

              {portfolio?.projects?.map((project, index) => (

                <article
                  key={index}
                  className={styles.projectCard}
                >

                  <h4>{project.title}</h4>

                  <p>
                    {project.description}
                  </p>

                  <div className={styles.tags}>

                    {project.technologies?.map((tech) => (

                      <span key={tech}>
                        {tech}
                      </span>

                    ))}

                  </div>

                </article>

              ))}

            </div>

          </section>

          {/* FOOTER */}

          <footer className={styles.footer}>

            <p>
              Built with PortfolioGenie AI.
            </p>

          </footer>

        </main>
      </Modal.Body>
    </Modal>
  );
}