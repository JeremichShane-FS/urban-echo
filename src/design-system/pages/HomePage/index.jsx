"use client";

import HomePageView from "./HomePageView";
import { useHomePage } from "./useHomePage";

const HomePage = () => {
  const { error, isLoading, onSectionView, pageData, refetch } = useHomePage();

  return (
    <HomePageView
      isLoading={isLoading}
      pageData={pageData}
      error={error}
      refetch={refetch}
      onSectionView={onSectionView}
    />
  );
};

export default HomePage;

HomePage.displayName = "HomePage";
HomePage.View = HomePageView;
HomePage.useHomePage = useHomePage;
