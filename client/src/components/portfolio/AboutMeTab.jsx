import { useState, useEffect } from 'react';
import { Card, SectionHeader } from '../common';
import CTAButton from '../shared/button/CTAButton';
import Field from '../common/Field';
import AITipBox from '../common/AITipBox';
import styles from './AboutMeTab.module.css';

const BIO_MIN = 250;
const BIO_MAX = 500;


export default function AboutMeTab({ data }) {
  const [headline, setHeadline] = useState(data?.headline || '');
  const [biography, setBiography] = useState(data?.biography || '');
  const [interests, setInterests] = useState(data?.interests || '');

  useEffect(() => {
    if (data) {
      setHeadline(data.headline || '');
      setBiography(data.biography || '');
      setInterests(data.interests || '');
    }
  }, [data]);

  return (
    <Card>
      <SectionHeader
        title="About Me"
        
      />

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
      </div>
    </Card>
  );
}