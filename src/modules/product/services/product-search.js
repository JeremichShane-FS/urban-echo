import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@utils/errorHandler";

export const productSearchService = {
  async searchProducts(query, params = {}) {
    try {
      const { category, limit = 20, page = 1, sortBy = "relevance" } = params;

      const queryParams = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString(),
        sortBy: sortBy === "relevance" ? "newest" : sortBy,
      });

      if (category) queryParams.append("category", category);

      const response = await fetch(`/api/${API_ENDPOINTS.productSearch}?${queryParams}`);

      if (!response.ok) {
        const error = new Error(`Failed to search products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.productSearch,
          query,
          params,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to search products");
      }

      return {
        products: result.data || [],
        pagination: result.pagination || {},
        meta: result.meta || {},
      };
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "productSearchService",
        method: "searchProducts",
        endpoint: API_ENDPOINTS.productSearch,
        query,
        params,
      });
      throw new Error("Failed to search products");
    }
  },
};
