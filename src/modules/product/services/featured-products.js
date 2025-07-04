import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

export const featuredProductsService = {
  async getFeaturedProducts(limit = 4) {
    try {
      const response = await fetch(`/api/${API_ENDPOINTS.featuredProducts}?limit=${limit}`);

      if (!response.ok) {
        const error = new Error(`Failed to fetch featured products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.featuredProducts,
          limit,
        });
        throw error;
      }

      const data = await response.json();
      return data.products || [];
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "featuredProductsService",
        method: "getFeaturedProducts",
        endpoint: API_ENDPOINTS.featuredProducts,
        limit,
      });
      throw new Error("Failed to fetch featured products");
    }
  },
};
