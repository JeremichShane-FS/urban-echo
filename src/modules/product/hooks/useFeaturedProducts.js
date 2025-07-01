import { useEffect, useState } from "react";

import { productService } from "@modules/product/services/product-service";

export const useFeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // TODO: [ROUTES] Featured products API w/ admin controls
        // Replace productService mock with backend API integration.
        // Required API endpoints:
        // - GET /api/products/featured (fetch current featured products)
        // - POST /api/admin/products/:id/feature (admin: mark product as featured)
        // - DELETE /api/admin/products/:id/feature (admin: remove product)

        const response = await productService.getFeaturedProducts();
        if (!response || response.length === 0) {
          throw new Error("No featured products found");
        }
        setFeaturedProducts(response);
<<<<<<< HEAD
      } catch (error) {
        setError("Failed to load featured products");
        console.error("Error fetching featured products:", error.message);
=======
      } catch (error_) {
        setError("Failed to load featured products");
        console.error("Error fetching featured products:", error_);
>>>>>>> origin/main
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
