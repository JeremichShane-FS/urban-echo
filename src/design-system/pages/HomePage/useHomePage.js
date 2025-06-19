import { useEffect, useState } from "react";

export const useHomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState({});

  // TODO: fetch page configuration
  // This should be replaced with an API call to fetch the page configuration
  useEffect(() => {
    const fetchPageConfig = async () => {
      try {
        setIsLoading(true);

        // TODO: fetch page configuration
        // For now, using static data
        // This should be replaced with an API call to fetch the page configuration
        setPageData({
          seoTitle: "Urban Echo | Modern Fashion E-Commerce",
          seoDescription:
            "Discover trendy, high-quality clothing at Urban Echo. Shop our curated collection of contemporary fashion.",
          showFeaturedProducts: true,
          showNewsletter: true,
          showNewArrivals: true,
          showAboutSection: true,
        });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (err) {
        console.error("Error fetching homepage config:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageConfig();
  }, []);

  // Track page view analytics
  useEffect(() => {
    // Track homepage view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "GA_TRACKING_ID", {
        page_title: pageData.seoTitle,
        page_location: window.location.href,
      });
    }
  }, [pageData.seoTitle]);

  const handleSectionView = sectionName => {
    // Track section visibility
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "section_view", {
        event_category: "Homepage",
        event_label: sectionName,
      });
    }
  };

  return {
    isLoading,
    pageData,
    onSectionView: handleSectionView,
  };
};
