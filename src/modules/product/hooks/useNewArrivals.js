import { useCallback, useEffect, useState } from "react";

import { API_ENDPOINTS, DEFAULT_PAGINATION, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";
import { newArrivalsService as data } from "@modules/product/services";

/**
 * Custom hook for managing new arrivals products data and state
 * @description Fetches and manages new arrivals products from the API with support for
 * pagination, category filtering, and comprehensive error handling. Integrates with the
 * application's centralized error handling system and uses established constants and
 * validation patterns. Automatically refetches data when dependencies change.
 * @param {Object} [options={}] - Configuration options for the hook
 * @param {string} [options.category] - Filter products by category
 * @param {number} [options.limit=8] - Number of products to fetch per page
 * @param {number} [options.page=1] - Page number for pagination
 * @param {string} [options.sortBy] - Sort field for products
 * @param {string} [options.sortOrder="desc"] - Sort order (asc/desc)
 * @returns {Object} Hook state and methods
 * @returns {Array} returns.products - Array of new arrivals product objects
 * @returns {Object} returns.pagination - Pagination information including page, limit, total, hasMore
 * @returns {Object} returns.filters - Applied filters including category, sortBy, sortOrder
 * @returns {boolean} returns.loading - Loading state indicator
 * @returns {string|null} returns.error - Error message if request fails, null otherwise
 * @returns {Function} returns.refetch - Function to manually refetch new arrivals data
 * @returns {Function} returns.clearError - Function to clear error state
 * @example
 * Basic usage
 * const { products, loading, error } = useNewArrivals();
 *
 * With options
 * const { products, pagination, refetch } = useNewArrivals({
 *   category: 'clothing',
 *   limit: 12,
 *   page: 2,
 *   sortBy: 'price',
 *   sortOrder: 'asc'
 * });
 *
 * Manual refetch with error handling
 * const { refetch, clearError } = useNewArrivals();
 * const handleRefresh = async () => {
 *   clearError();
 *   await refetch();
 * };
 */
export const useNewArrivals = (options = {}) => {
  const {
    category,
    limit = DEFAULT_PAGINATION.limit,
    page = DEFAULT_PAGINATION.page,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options;

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    ...DEFAULT_PAGINATION,
    limit,
    page,
  });
  const [filters, setFilters] = useState({
    category,
    sortBy,
    sortOrder,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Validates hook options and parameters
   * @description Ensures all provided options are valid before making API calls
   * @param {Object} options - The options to validate
   * @returns {Object} Validation result with isValid flag and errors
   */
  const validateOptions = useCallback(options => {
    const errors = [];

    if (options.limit && (options.limit < 1 || options.limit > 100)) {
      errors.push("Limit must be between 1 and 100");
    }

    if (options.page && options.page < 1) {
      errors.push("Page must be greater than 0");
    }

    const validSortFields = ["createdAt", "price", "name", "rating"];
    if (options.sortBy && !validSortFields.includes(options.sortBy)) {
      errors.push(`Sort field must be one of: ${validSortFields.join(", ")}`);
    }

    const validSortOrders = ["asc", "desc"];
    if (options.sortOrder && !validSortOrders.includes(options.sortOrder)) {
      errors.push(`Sort order must be one of: ${validSortOrders.join(", ")}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, []);

  /**
   * Fetches new arrivals data from the API
   * @description Calls newArrivalsService to retrieve products with current options.
   * Handles loading states, error management, and data transformation. Resets error
   * state on successful requests and clears data on error to prevent stale state.
   * Uses MongoDB-based API endpoints with full support for:
   * - Pagination with count information
   * - Product variants, pricing, and inventory status
   * - Category, size, and price range filtering
   * - Sort options and advanced filtering
   * @async
   * @function
   * @returns {Promise<void>} Promise that resolves when fetch is complete
   * @throws {Error} When API request fails or service throws an error
   */
  const fetchNewArrivals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const validation = validateOptions({ limit, page, sortBy, sortOrder });
      if (!validation.isValid) {
        const validationError = errorHandler.createError(
          `Invalid options: ${validation.errors.join(", ")}`,
          ERROR_TYPES.VALIDATION_ERROR,
          400,
          {
            options: { limit, page, category, sortBy, sortOrder },
            validationErrors: validation.errors,
          }
        );

        errorHandler.handleError(validationError, ERROR_TYPES.VALIDATION_ERROR, {
          source: "useNewArrivals",
          action: "fetchNewArrivals",
          options: { limit, page, category, sortBy, sortOrder },
          validationErrors: validation.errors,
        });
        throw new Error(validationError.message);
      }

      const response = await data.getNewArrivals({
        limit,
        page,
        category,
        sortBy,
        sortOrder,
      });

      if (!response || typeof response !== "object") {
        const invalidResponseError = errorHandler.createError(
          "Invalid response format from API",
          ERROR_TYPES.API_ERROR,
          500,
          {
            endpoint: `/api/${API_ENDPOINTS.newArrivals}`,
            response: response,
          }
        );

        errorHandler.handleError(invalidResponseError, ERROR_TYPES.API_ERROR, {
          source: "useNewArrivals",
          action: "fetchNewArrivals",
          endpoint: `/api/${API_ENDPOINTS.newArrivals}`,
          response: response,
        });
        throw new Error(invalidResponseError.message);
      }

      setProducts(response.products || []);
      setPagination(
        response.pagination || {
          ...DEFAULT_PAGINATION,
          limit,
          page,
        }
      );
      setFilters(
        response.filters || {
          category,
          sortBy,
          sortOrder,
        }
      );
    } catch (error) {
      const errorMessage = "Failed to load new arrivals";
      setError(errorMessage);
      setProducts([]);
      setPagination({ ...DEFAULT_PAGINATION, limit, page });

      const structuredError = errorHandler.createError(errorMessage, ERROR_TYPES.API_ERROR, 500, {
        originalError: error.message,
        endpoint: `/api/${API_ENDPOINTS.newArrivals}`,
        options: { limit, page, category, sortBy, sortOrder },
      });

      errorHandler.handleError(structuredError, ERROR_TYPES.API_ERROR, {
        source: "useNewArrivals",
        action: "fetchNewArrivals",
        endpoint: `/api/${API_ENDPOINTS.newArrivals}`,
        options: { limit, page, category, sortBy, sortOrder },
        originalMessage: error.message,
      });

      console.error("Error fetching new arrivals:", error.message);
    } finally {
      setLoading(false);
    }
  }, [limit, page, category, sortBy, sortOrder, validateOptions]);

  /**
   * Clears the current error state
   * @description Useful for manual error clearing before retry operations
   * @returns {void}
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Retries the fetch operation with error clearing
   * @description Convenience method that clears errors and refetches data
   * @returns {Promise<void>} Promise that resolves when refetch is complete
   */
  const retryFetch = useCallback(async () => {
    clearError();
    await fetchNewArrivals();
  }, [clearError, fetchNewArrivals]);

  useEffect(() => {
    fetchNewArrivals();
  }, [fetchNewArrivals]);

  return {
    products,
    pagination,
    filters,
    loading,
    error,
    refetch: fetchNewArrivals,
    clearError,
    retry: retryFetch,
  };
};
