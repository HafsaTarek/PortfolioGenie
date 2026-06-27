import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Connect GitHub",
      description:
        "Securely connect your GitHub account. We'll scan your repositories, commits, and contributions to understand your work.",
    },
    {
      id: 2,
      title: "AI Analyzes & Generates",
      description:
        "Our AI analyzes your code patterns, identifies key projects, and generates professional content optimized for recruiters.",
    },
    {
      id: 3,
      title: "Customize & Publish",
      description:
        "Review, customize with beautiful themes, and publish your portfolio with one click to your custom domain.",
    },
  ];

  return (
    <section className={`${styles.howItWorks} py-5`}>
      <div className="container">
         <h1 className="fw-bold text-center">How It Works</h1>
         <p className="text-center">From GitHub to portfolio in three simple steps</p>
        <div className={styles.stepsContainer}>
           
          <div className={styles.stepsLine}></div>

          {steps.map((step) => (
            <div className={styles.stepItem} key={step.id}>
              <div
                className={`${styles.stepNumber} ${
                  step.id === 1
                    ? styles.step1
                    : step.id === 2
                    ? styles.step2
                    : styles.step3
                }`}
              >
                {step.id}
              </div>

              <div className={styles.stepCard}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}