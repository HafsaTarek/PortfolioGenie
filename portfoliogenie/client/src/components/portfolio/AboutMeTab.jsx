import { useState, useEffect } from "react";
import { Card, SectionHeader } from "../common";
import CTAButton from "../shared/button/CTAButton";
import Field from "../common/Field";
import AITipBox from "../common/AITipBox";
import { PortfolioService } from "../../services/portfolio.service";
import styles from "./AboutMeTab.module.css";
import toast from "react-hot-toast";

const BIO_MIN = 250;
const BIO_MAX = 500;

export default function AboutMeTab({ data }) {
  const [headline, setHeadline] = useState(data?.headline || "");
  const [biography, setBiography] = useState(data?.biography || "");
  const [interests, setInterests] = useState(data?.interests || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setHeadline(data.headline || "");
      setBiography(data.biography || "");
      setInterests(data.interests || "");
    }
  }, [data]);

  const handleSave = async () => {
    try {
      setLoading(true);

      await PortfolioService.updateAbout({
        headline,
        biography,
        interests,
      });

      toast.success("About Me updated successfully!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update About Me.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Card>
      <SectionHeader title="About Me" />

      <div className={styles.fields}>
        <Field
          id="about-headline"
          label="Headline"
          value={headline}
          onChange={(event) => setHeadline(event.target.value)}
          placeholder="e.g. Full-Stack Developer | Building Modern Web Experiences"
        />

        <Field
          id="about-biography"
          label="Biography"
          as="textarea"
          value={biography}
          onChange={(event) => setBiography(event.target.value)}
          placeholder="Tell recruiters and visitors a little about yourself…"
          hint={`${biography.length} characters`}
          hintRight={`Recommended: ${BIO_MIN}-${BIO_MAX} characters`}
        />

        <Field
          id="about-interests"
          label="Interests and Passions"
          value={interests}
          onChange={(event) => setInterests(event.target.value)}
          placeholder="e.g. Web Development, Open Source, UI/UX Design"
        />

        {data?.aiTip && <AITipBox>{data.aiTip}</AITipBox>}

        <div style={{ marginTop: "16px" }}>
          <CTAButton
            variant="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </CTAButton>
        </div>
      </div>
    </Card>
  );
}