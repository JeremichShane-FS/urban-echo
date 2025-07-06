/**
 * @fileoverview Categories service for product categories
 * Handles category listing and product filtering by category
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@utils/errorHandler";

export const categoriesService = {
  /**
   * Get all categories with optional metadata
   * @param {Object} params - Query parameters
   * @param {boolean} [params.includeProductCount=false] - Include product counts
   * @param {boolean} [params.includeSubCategories=false] - Include subcategories
   * @param {string} [params.status='active'] - Filter by status
   * @returns {Promise<Array>} Categories data
   */
  async getCategories(params = {}) {
    try {
      const {
        includeProductCount = false,
        includeSubCategories = false,
        status = "active",
      } = params;

      const queryParams = new URLSearchParams();
      if (includeProductCount) queryParams.append("includeProductCount", "true");
      if (includeSubCategories) queryParams.append("includeSubCategories", "true");
      if (status !== "active") queryParams.append("status", status);

      const url = `/api/${API_ENDPOINTS.categories}${queryParams.toString() ? `?${queryParams}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        const error = new Error(`Failed to fetch categories: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.categories,
          params,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch categories");
      }

      return result.data || [];
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "categoriesService",
        method: "getCategories",
        endpoint: API_ENDPOINTS.categories,
        params,
      });
      throw new Error("Failed to fetch categories");
    }
  },

  /**
   * Get products by category
   * @param {string} categorySlug - Category slug
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Category products data
   */
  async getCategoryProducts(categorySlug, params = {}) {
    try {
      const queryParams = new URLSearchParams(params);
      const url = `/api/${API_ENDPOINTS.categories}/${categorySlug}/products${queryParams.toString() ? `?${queryParams}` : ""}`;

      const response = await fetch(url);

      if (!response.ok) {
        const error = new Error(`Failed to fetch category products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: `${API_ENDPOINTS.categories}/${categorySlug}/products`,
          categorySlug,
          params,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch category products");
      }

      return result.data || [];
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "categoriesService",
        method: "getCategoryProducts",
        endpoint: `${API_ENDPOINTS.categories}/${categorySlug}/products`,
        categorySlug,
        params,
      });
      throw new Error("Failed to fetch category products");
    }
  },
};
