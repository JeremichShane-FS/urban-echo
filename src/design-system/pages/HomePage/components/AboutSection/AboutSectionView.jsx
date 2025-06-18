import Link from "next/link";

import Button from "@/design-system/buttons/Button";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "@/config/constants/ui-constants";

import styles from "./AboutSection.module.scss";

const AboutSectionView = ({ aboutContent, isLoading, onLearnMoreClick }) => {
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.loading}>Loading about content...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{aboutContent.title}</h2>

          {aboutContent.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.description}>
              {paragraph}
            </p>
          ))}

          <div className={styles.cta}>
            <Link href={aboutContent.ctaLink} onClick={onLearnMoreClick} className={styles.link}>
              <Button
                variant={BUTTON_VARIANTS["outline-secondary"]}
                size={BUTTON_SIZES.md}
                as="span">
                {aboutContent.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionView;
