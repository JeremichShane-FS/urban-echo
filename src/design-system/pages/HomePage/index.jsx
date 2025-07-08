"use client";
import FeaturedProducts from "@design-system/data-display/FeaturedProducts";
import NewArrivals from "@design-system/data-display/NewArrivals";
import Newsletter from "@design-system/feedback/Newsletter";

import AboutSection from "./components/AboutSection";
import HeroSection from "./components/HeroSection";
import HomePageView from "./HomePageView";
import { useHomePage } from "./useHomePage";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const { error, isLoading, onSectionView, pageData, refetch, refs } = useHomePage();

  return (
    <HomePageView
      isLoading={isLoading}
      pageData={pageData}
      error={error}
      refetch={refetch}
      styles={styles}
      AboutSection={AboutSection}
      HeroSection={HeroSection}
      FeaturedProducts={FeaturedProducts}
      NewArrivals={NewArrivals}
      Newsletter={Newsletter}
      refs={refs}
      onSectionView={onSectionView}
    />
  );
};

export default HomePage;

HomePage.displayName = "HomePage";
HomePage.View = HomePageView;
HomePage.useHomePage = useHomePage;
