/**
 * @fileoverview Presentational component for hero section layout with optimized image rendering
 * Handles responsive image display with blur placeholder and accessibility features
 * Provides semantic HTML structure with proper heading hierarchy and call-to-action integration
 */

import PropTypes from "prop-types";

/**
 * View component for rendering hero section with background image, content, and call-to-action
 * @component
 * @param {Object} BUTTON_SIZES - Button size constants for consistent styling
 * @param {Object} BUTTON_VARIANTS - Button variant constants for consistent styling
 * @param {React.ComponentType} Button - Button component for call-to-action elements
 * @param {React.ComponentType} Image - Next.js Image component for optimized image rendering
 * @param {React.ComponentType} Link - Next.js Link component for navigation
 * @param {Object} heroData - Hero content data with title, subtitle, CTA text, and background image
 * @param {boolean} isLoading - Loading state indicator for content fetching
 * @param {Function} onCtaClick - Analytics handler for call-to-action button clicks
 * @param {Object} styles - CSS module styles object for component styling
 * @returns {JSX.Element} Rendered hero section with responsive layout and interactive elements
 */
const HeroSectionView = ({
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Button,
  Image,
  Link,
  heroData,
  isLoading,
  onCtaClick,
  styles,
}) => {
  if (isLoading || !heroData) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          {heroData.backgroundImage && (
            <div className={styles.image}>
              <Image
                fill
                priority
                src={heroData.backgroundImage}
                alt="Urban Echo Fashion"
                className={styles.img}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          )}
          <div className={styles.text}>
            <h1 className={styles.title}>{heroData.title}</h1>
            <p className={styles.subtitle}>{heroData.subtitle}</p>

            <Link href={heroData.ctaLink} className={styles.cta} onClick={onCtaClick}>
              <Button variant={BUTTON_VARIANTS.accent} size={BUTTON_SIZES.lg} as="span">
                {heroData.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionView;

HeroSectionView.displayName = "HeroSectionView";
HeroSectionView.propTypes = {
  BUTTON_SIZES: PropTypes.objectOf(PropTypes.string).isRequired,
  BUTTON_VARIANTS: PropTypes.objectOf(PropTypes.string).isRequired,
  Button: PropTypes.elementType.isRequired,
  Image: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  heroData: PropTypes.shape({
    backgroundImage: PropTypes.string,
    ctaLink: PropTypes.string.isRequired,
    ctaText: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
  onCtaClick: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string).isRequired,
};
