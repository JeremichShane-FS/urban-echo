import Link from "next/link";
import PropTypes from "prop-types";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "@config/constants/ui-constants";
import Button from "@design-system/buttons/Button";

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
            <Link href={aboutContent.ctaLink} className={styles.link} onClick={onLearnMoreClick}>
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

AboutSectionView.displayName = "AboutSectionView";
AboutSectionView.propTypes = {
  aboutContent: PropTypes.shape({
    title: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
    ctaText: PropTypes.string.isRequired,
    ctaLink: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLearnMoreClick: PropTypes.func.isRequired,
};
