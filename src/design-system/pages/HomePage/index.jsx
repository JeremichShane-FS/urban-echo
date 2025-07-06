"use client";

import HomePageView from "./HomePageView";
import { useHomePage } from "./useHomePage";

const HomePage = () => {
  const homePageProps = useHomePage();

  return <HomePageView {...homePageProps} />;
};

export default HomePage;
