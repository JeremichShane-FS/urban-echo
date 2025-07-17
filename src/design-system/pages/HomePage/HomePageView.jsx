/**
 * @fileoverview Presentational component for homepage layout with conditional section rendering
 * Handles section visibility based on page configuration and provides intersection observer integration
 * Manages loading states and error handling for optimal user experience during page initialization
 */

import PropTypes from "prop-types";

import Error from "@design-system/feedback/Error";
import Loading from "@design-system/feedback/Loading";

/**
 * View component for rendering homepage sections with conditional visibility and analytics tracking
 * @component
 * @param {React.ComponentType} AboutSection - About section component for company information
 * @param {React.ComponentType} FeaturedProducts - Featured products showcase component
 * @param {React.ComponentType} HeroSection - Hero banner component for main page header
 * @param {React.ComponentType} NewArrivals - New arrivals product display component
 * @param {React.ComponentType} Newsletter - Newsletter subscription component
 * @param {boolean} error - Error state indicator for page loading failures
 * @param {boolean} isLoading - Loading state indicator for page initialization
 * @param {Object} pageData - Page configuration data controlling section visibility
 * @param {Object} refs - Intersection observer refs for section tracking
 * @param {Object} styles - CSS module styles object for component styling
 * @returns {JSX.Element} Rendered homepage with conditional sections and analytics integration
 */
const HomePageView = ({
  AboutSection,
  FeaturedProducts,
  HeroSection,
  NewArrivals,
  Newsletter,
  error,
  isLoading,
  pageData,
  refs,
  styles,
}) => {
  if (isLoading)
    return <Loading message="Preparing your fashion experience" title="Loading Urban Echo..." />;
  if (error) return <Error message={error} title="Home Page" variant="page" />;

  return (
    <main className={styles.page}>
      <div ref={refs.heroRef} data-section="hero">
        <HeroSection />
      </div>

      {pageData.showFeaturedProducts && (
        <div ref={refs.featuredRef} data-section="featured-products">
          <FeaturedProducts />
        </div>
      )}

      {pageData.showNewsletter && (
        <div ref={refs.newsletterRef} data-section="newsletter">
          <Newsletter />
        </div>
      )}

      {pageData.showNewArrivals && (
        <div ref={refs.newArrivalsRef} data-section="new-arrivals">
          <NewArrivals />
        </div>
      )}

      {pageData.showAboutSection && (
        <div ref={refs.aboutRef} data-section="about">
          <AboutSection />
        </div>
      )}
    </main>
  );
};

export default HomePageView;

HomePageView.displayName = "HomePageView";
HomePageView.propTypes = {
  AboutSection: PropTypes.elementType.isRequired,
  FeaturedProducts: PropTypes.elementType.isRequired,
  HeroSection: PropTypes.elementType.isRequired,
  NewArrivals: PropTypes.elementType.isRequired,
  Newsletter: PropTypes.elementType.isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageData: PropTypes.shape({
    showAboutSection: PropTypes.bool,
    showFeaturedProducts: PropTypes.bool,
    showNewArrivals: PropTypes.bool,
    showNewsletter: PropTypes.bool,
  }).isRequired,
  refs: PropTypes.shape({
    aboutRef: PropTypes.object,
    featuredRef: PropTypes.object,
    heroRef: PropTypes.object,
    newArrivalsRef: PropTypes.object,
    newsletterRef: PropTypes.object,
  }).isRequired,
  styles: PropTypes.object.isRequired,
};
