import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

export const productDetailsService = {
  async getProduct(slug) {
    try {
      const response = await fetch(`/api/${API_ENDPOINTS.products}/${slug}`);

      if (!response.ok) {
        const error = new Error(`Failed to fetch product: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: `${API_ENDPOINTS.products}/${slug}`,
          slug,
        });
        throw error;
      }

      const data = await response.json();
      return data.product || data;
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "productDetailsService",
        method: "getProduct",
        endpoint: `${API_ENDPOINTS.products}/${slug}`,
        slug,
      });
      throw error;
    }
  },
};
