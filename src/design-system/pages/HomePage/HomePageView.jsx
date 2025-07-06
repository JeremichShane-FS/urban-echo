import PropTypes from "prop-types";

import FeaturedProducts from "@design-system/data-display/FeaturedProducts";
import NewArrivals from "@design-system/data-display/NewArrivals";
import Newsletter from "@design-system/feedback/Newsletter";

import AboutSection from "./components/AboutSection";
import HeroSection from "./components/HeroSection";

import styles from "./HomePage.module.scss";

const HomePageView = ({ error, isLoading, pageData }) => {
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
      <HeroSection />
      {pageData.showFeaturedProducts && <FeaturedProducts />}
      {pageData.showNewsletter && <Newsletter />}
      {pageData.showNewArrivals && <NewArrivals />}
      {pageData.showAboutSection && <AboutSection />}
    </main>
  );
};

export default HomePageView;

HomePageView.displayName = "HomePageView";
HomePageView.propTypes = {
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageData: PropTypes.shape({
    showFeaturedProducts: PropTypes.bool,
    showNewsletter: PropTypes.bool,
    showNewArrivals: PropTypes.bool,
    showAboutSection: PropTypes.bool,
  }).isRequired,
};
