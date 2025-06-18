import FeaturedProducts from "@/design-system/data-display/FeaturedProducts";
import NewArrivals from "@/design-system/data-display/NewArrivals";
import Newsletter from "@/design-system/feedback/Newsletter";

import AboutSection from "./components/AboutSection";
import HeroSection from "./components/HeroSection";

import styles from "./HomePage.module.scss";

const HomePageView = ({ _onSectionView, isLoading, pageData }) => {
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
