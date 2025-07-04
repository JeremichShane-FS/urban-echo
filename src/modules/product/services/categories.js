import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

export const categoriesService = {
  async getCategories() {
    try {
      const response = await fetch(`/api/${API_ENDPOINTS.categories}`);

      if (!response.ok) {
        const error = new Error(`Failed to fetch categories: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.categories,
        });
        throw error;
      }

      const data = await response.json();
      return data.categories || data;
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "categoriesService",
        method: "getCategories",
        endpoint: API_ENDPOINTS.categories,
      });
      throw new Error("Failed to fetch categories");
    }
  },
};
