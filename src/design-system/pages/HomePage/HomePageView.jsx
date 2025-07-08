import PropTypes from "prop-types";

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
  if (error) {
    return <div>Error loading about section</div>;
  }

  if (isLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>
          <div className={styles.content}>
            <h1>Loading Urban Echo...</h1>
            <p>Preparing your fashion experience</p>
          </div>
        </div>
      </main>
    );
  }

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
