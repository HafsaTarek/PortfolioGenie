import { FaGithub } from "react-icons/fa";
import CTAButton from "./components/shared/button/CTAButton";

export default function Example() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <CTAButton
        variant="primary"
        size="medium"
        icon={<FaGithub />}
      >
        Connect GitHub & Start
      </CTAButton>

      <CTAButton
        variant="secondary"
        size="small"
      >
        Get Started
      </CTAButton>

      <CTAButton
        variant="outline"
        size="medium"
      >
        View Demo Portfolio
      </CTAButton>
    </div>
  );
}

