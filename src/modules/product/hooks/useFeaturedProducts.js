import { useEffect, useState } from "react";

import { productService } from "../services/productService";

export const useFeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // In your layout.js or a component
  useEffect(() => {
    const handleError = event => {
      if (event.message?.includes("hydration")) {
        console.error("Hydration error detected:", event);
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // TODO: Replace with actual API call when backend is ready
        const response = await productService.getFeaturedProducts();
        if (!response || response.length === 0) {
          throw new Error("No featured products found");
        }
        setFeaturedProducts(response);
      } catch (err) {
        setError("Failed to load featured products");
        console.error("Error fetching featured products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleProductClick = (productId, productName) => {
    // Track analytics event for product click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "select_content", {
        content_type: "product",
        content_id: productId,
        item_name: productName,
        source: "featured_products",
      });
    }
  };

  return {
    isLoading,
    error,
    featuredProducts,
    onProductClick: handleProductClick,
  };
};
