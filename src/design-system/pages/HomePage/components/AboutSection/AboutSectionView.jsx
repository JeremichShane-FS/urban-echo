import Link from "next/link";
import PropTypes from "prop-types";

<<<<<<< HEAD
import { BUTTON_SIZES, BUTTON_VARIANTS, ROUTES } from "@config/constants";
=======
import { BUTTON_SIZES, BUTTON_VARIANTS } from "@config/constants/ui-constants";
>>>>>>> origin/main
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
<<<<<<< HEAD
            <Link href={ROUTES.ABOUT} className={styles.link} onClick={onLearnMoreClick}>
=======
            <Link href={aboutContent.ctaLink} className={styles.link} onClick={onLearnMoreClick}>
>>>>>>> origin/main
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
<<<<<<< HEAD
    description: PropTypes.string.isRequired,
    mission: PropTypes.string.isRequired,
    vision: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string),
=======
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
    ctaText: PropTypes.string.isRequired,
    ctaLink: PropTypes.string.isRequired,
>>>>>>> origin/main
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLearnMoreClick: PropTypes.func.isRequired,
};
