import Link from "next/link";

import styles from "./AboutSection.module.scss";

const AboutSectionView = ({ aboutContent, isLoading, onLearnMoreClick }) => {
  if (isLoading) {
    return (
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.loading}>Loading about content...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{aboutContent.title}</h2>

          {aboutContent.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.description}>
              {paragraph}
            </p>
          ))}

          <div className={styles.ctaSection}>
            <Link
              href={aboutContent.ctaLink}
              className={styles.learnMoreButton}
              onClick={onLearnMoreClick}>
              {aboutContent.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionView;
