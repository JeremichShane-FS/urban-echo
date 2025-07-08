import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@utils/errorHandler";

export const relatedProductsService = {
  async getRelatedProducts(productId, options = {}) {
    try {
      const { category, excludeOutOfStock = false, limit = 4 } = options;
      const queryParams = new URLSearchParams({
        productId,
        limit: limit.toString(),
      });

      if (category) queryParams.append("category", category);
      if (excludeOutOfStock) queryParams.append("excludeOutOfStock", "true");

      const response = await fetch(`/api/${API_ENDPOINTS.relatedProducts}?${queryParams}`);

      if (!response.ok) {
        const error = new Error(`Failed to fetch related products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.relatedProducts,
          productId,
          options,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch related products");
      }

      return result.data || [];
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "relatedProductsService",
        method: "getRelatedProducts",
        endpoint: API_ENDPOINTS.relatedProducts,
        productId,
        options,
      });
      throw new Error("Failed to fetch related products");
    }
  },
};
