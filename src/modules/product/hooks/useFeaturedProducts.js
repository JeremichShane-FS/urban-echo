import { useEffect, useState } from "react";

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";
import { featuredProductsService as data } from "@modules/product/services";

/**
 * Custom hook for managing featured products data and state
 * @description Fetches and manages featured products from the API with comprehensive
 * error handling, analytics tracking, and integration with the application's error
 * handling system. Uses centralized constants and follows established patterns.
 * @returns {Object} Hook state and methods
 * @returns {Array} returns.featuredProducts - Array of featured product objects
 * @returns {boolean} returns.isLoading - Loading state indicator
 * @returns {string|null} returns.error - Error message if request fails, null otherwise
 * @returns {Function} returns.onProductClick - Analytics tracking function for product clicks
 * @returns {Function} returns.refetch - Function to manually refetch featured products
 * @example
 * const { featuredProducts, isLoading, error, onProductClick } = useFeaturedProducts();
 */
export const useFeaturedProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  /**
   * Fetches featured products from the API
   * @description Retrieves featured products using the centralized service layer
   * with comprehensive error handling and logging. Integrates with the application's
   * error handling system for consistent error management and user notifications.
   * @async
   * @function
   * @returns {Promise<void>} Promise that resolves when fetch is complete
   */
  const fetchFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: [ROUTES] Featured products API w/ admin controls
      // Replace productService mock with backend API integration.
      // Required API endpoints:
      // - GET /api/${API_ENDPOINTS.featuredProducts} (fetch current featured products)
      // - POST /api/admin/products/:id/feature (admin: mark product as featured)
      // - DELETE /api/admin/products/:id/feature (admin: remove product)

      const response = await data.getFeaturedProducts();

      if (!response || response.length === 0) {
        const noDataError = errorHandler.createError(
          "No featured products found",
          ERROR_TYPES.NOT_FOUND_ERROR,
          404,
          { endpoint: `/api/${API_ENDPOINTS.featuredProducts}` }
        );
        errorHandler.handleError(noDataError, ERROR_TYPES.NOT_FOUND_ERROR, {
          source: "useFeaturedProducts",
          action: "fetchFeaturedProducts",
          endpoint: `/api/${API_ENDPOINTS.featuredProducts}`,
        });
        throw new Error(noDataError.message);
      }

      setFeaturedProducts(response);
    } catch (error) {
      const errorMessage = "Failed to load featured products";
      setError(errorMessage);

      const structuredError = errorHandler.createError(errorMessage, ERROR_TYPES.API_ERROR, 500, {
        originalError: error.message,
        endpoint: `/api/${API_ENDPOINTS.featuredProducts}`,
      });

      errorHandler.handleError(structuredError, ERROR_TYPES.API_ERROR, {
        source: "useFeaturedProducts",
        action: "fetchFeaturedProducts",
        endpoint: `/api/${API_ENDPOINTS.featuredProducts}`,
        originalMessage: error.message,
      });

      console.error("Error fetching featured products:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  /**
   * Handles product click events with analytics tracking
   * @description Tracks user interactions with featured products for analytics
   * and conversion optimization. Integrates with Google Analytics if available.
   * @param {string} productId - The ID of the clicked product
   * @param {string} productName - The name of the clicked product
   * @param {Object} [additionalData={}] - Additional tracking data
   * @returns {void}
   */
  const handleProductClick = (productId, productName, additionalData = {}) => {
    if (!productId || !productName) {
      const validationError = errorHandler.createError(
        "Missing required parameters for product click tracking",
        ERROR_TYPES.VALIDATION_ERROR,
        400,
        { productId, productName }
      );

      errorHandler.handleError(validationError, ERROR_TYPES.VALIDATION_ERROR, {
        source: "useFeaturedProducts",
        action: "handleProductClick",
        productId,
        productName,
      });
      return;
    }

    // Track analytics event for product click
    try {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "select_content", {
          content_type: "product",
          content_id: productId,
          item_name: productName,
          source: "featured_products",
          ...additionalData,
        });
      }
    } catch (analyticsError) {
      // Don't throw for analytics errors, just log them with proper structure
      const analyticsErrorStructured = errorHandler.createError(
        "Analytics tracking failed",
        ERROR_TYPES.API_ERROR,
        500,
        {
          originalError: analyticsError.message,
          productId,
          productName,
          additionalData,
        }
      );

      errorHandler.handleError(analyticsErrorStructured, ERROR_TYPES.API_ERROR, {
        source: "useFeaturedProducts",
        action: "handleProductClick",
        productId,
        productName,
        type: "analytics_error",
      });
    }
  };

  return {
    isLoading,
    error,
    featuredProducts,
    onProductClick: handleProductClick,
    refetch: fetchFeaturedProducts,
  };
};
