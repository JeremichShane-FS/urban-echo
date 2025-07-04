import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

export const relatedProductsService = {
  async getRelatedProducts(productId, limit = 4) {
    try {
      const response = await fetch(
        `/api/${API_ENDPOINTS.relatedProducts}/${productId}?limit=${limit}`
      );

      if (!response.ok) {
        const error = new Error(`Failed to fetch related products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: `${API_ENDPOINTS.relatedProducts}/${productId}`,
          productId,
          limit,
        });
        throw error;
      }

      const data = await response.json();
      return data.products || [];
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "relatedProductsService",
        method: "getRelatedProducts",
        endpoint: `${API_ENDPOINTS.relatedProducts}/${productId}`,
        productId,
        limit,
      });
      throw new Error("Failed to fetch related products");
    }
  },
};
