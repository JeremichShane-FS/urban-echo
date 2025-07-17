/**
 * @fileoverview Presentational component for about section layout with content formatting and navigation
 * Handles paragraph splitting for multi-line content display and loading state management
 * Provides accessible section structure with proper semantic HTML and call-to-action integration
 */

import PropTypes from "prop-types";

import Error from "@design-system/feedback/Error";
import Loading from "@design-system/feedback/Loading";

/**
 * View component for rendering about section with formatted content and navigation link
 * @component
 * @param {Object} BUTTON_SIZES - Button size constants for consistent styling
 * @param {Object} BUTTON_VARIANTS - Button variant constants for consistent styling
 * @param {React.ComponentType} Button - Button component for call-to-action elements
 * @param {React.ComponentType} Link - Next.js Link component for navigation
 * @param {Object} ROUTES - Route constants for navigation paths
 * @param {Object} aboutContent - About content data with title, description, and company information
 * @param {boolean|Object} error - Error state or error object if content loading fails
 * @param {boolean} isLoading - Loading state indicator for content fetching
 * @param {Function} onLearnMoreClick - Analytics handler for learn more button clicks
 * @param {Object} styles - CSS module styles object for component styling
 * @returns {JSX.Element} Rendered about section with formatted content and call-to-action
 */
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
  if (isLoading) return <Loading message="Loading about content..." title="About Us" />;
  if (error)
    return <Error message="Error loading about section" title="About Us" variant="section" />;

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
            <Link className={styles.link} href={ROUTES.ABOUT} onClick={onLearnMoreClick}>
              <Button
                as="span"
                size={BUTTON_SIZES.md}
                variant={BUTTON_VARIANTS["outline-secondary"]}>
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
