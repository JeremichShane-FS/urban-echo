import Link from "next/link";
import PropTypes from "prop-types";

import { BUTTON_SIZES, BUTTON_VARIANTS, ROUTES } from "@config/constants";
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
          <div className={styles.description}>
            {aboutContent.description.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
          <div className={styles.cta}>
            <Link href={ROUTES.ABOUT} className={styles.link} onClick={onLearnMoreClick}>
              <Button
                variant={BUTTON_VARIANTS["outline-secondary"]}
                size={BUTTON_SIZES.md}
                as="span">
                Learn More About Us
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
    description: PropTypes.string.isRequired,
    mission: PropTypes.string.isRequired,
    vision: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLearnMoreClick: PropTypes.func.isRequired,
};
