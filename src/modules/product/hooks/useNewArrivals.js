import { useEffect, useState } from "react";

import { data } from "../data/newArrivals.data";
import { productService } from "../services/productService";

export const useNewArrivals = (limit = 8) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newArrivals, setNewArrivals] = useState([]);

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
    const fetchNewArrivals = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // TODO: Replace with API call
        // It's using mock data
        const response = await productService.getNewArrivals({ limit });
        setNewArrivals(response);
      } catch (err) {
        setError("Failed to load new arrivals");
        console.error("Error fetching new arrivals:", err);

        // Fallback to mock data
        setNewArrivals([
          {
            id: 1,
            name: "Trendy Graphic Tee",
            price: 300,
            image: null,
            slug: "trendy-graphic-tee",
            isNew: true,
          },
          {
            id: 2,
            name: "Modern Blazer",
            price: 300,
            image: null,
            slug: "modern-blazer",
            isNew: true,
          },
          {
            id: 3,
            name: "Casual Sneakers",
            price: 300,
            image: null,
            slug: "casual-sneakers",
            isNew: true,
          },
          {
            id: 4,
            name: "Vintage Leather Jacket",
            price: 300,
            image: null,
            slug: "vintage-leather-jacket",
            isNew: true,
          },
          {
            id: 5,
            name: "Slim Fit Chinos",
            price: 300,
            image: null,
            slug: "slim-fit-chinos",
            isNew: true,
          },
          {
            id: 6,
            name: "Designer Hoodie",
            price: 300,
            image: null,
            slug: "designer-hoodie",
            isNew: true,
          },
          {
            id: 7,
            name: "Classic White Shirt",
            price: 300,
            image: null,
            slug: "classic-white-shirt",
            isNew: true,
          },
          {
            id: 8,
            name: "Stylish Backpack",
            price: 300,
            image: null,
            slug: "stylish-backpack",
            isNew: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewArrivals();
  }, [limit]);

  const handleProductClick = (productId, productName) => {
    // Track analytics event for product click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "select_content", {
        content_type: "product",
        content_id: productId,
        item_name: productName,
        source: "new_arrivals",
      });
    }
  };

  const handleViewAllClick = () => {
    // Track analytics event for view all click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "New Arrivals",
        event_label: "View All Products",
      });
    }
  };

  return {
    isLoading,
    error,
    newArrivals,
    onProductClick: handleProductClick,
    onViewAllClick: handleViewAllClick,
  };
};
