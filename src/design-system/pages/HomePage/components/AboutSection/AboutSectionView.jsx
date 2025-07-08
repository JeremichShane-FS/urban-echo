import PropTypes from "prop-types";

const AboutSectionView = ({
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Button,
  Link,
  ROUTES,
  aboutContent,
  error,
  isLoading,
  onLearnMoreClick,
  styles,
}) => {
  if (error) {
    return <div>Error loading about section</div>;
  }

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
  BUTTON_SIZES: PropTypes.objectOf(PropTypes.string).isRequired,
  BUTTON_VARIANTS: PropTypes.objectOf(PropTypes.string).isRequired,
  Button: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  ROUTES: PropTypes.objectOf(PropTypes.string).isRequired,
  aboutContent: PropTypes.shape({
    description: PropTypes.string.isRequired,
    mission: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string),
    vision: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLearnMoreClick: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string).isRequired,
};
