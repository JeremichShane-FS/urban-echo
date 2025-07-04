import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

export const productSearchService = {
  async searchProducts(query, params = {}) {
    try {
      const { category, limit = 20, page = 1, sort = "relevance" } = params;

      const queryParams = new URLSearchParams({
        query,
        page: page.toString(),
        limit: limit.toString(),
        sort: sort === "relevance" ? "newest" : sort,
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

      return await response.json();
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
