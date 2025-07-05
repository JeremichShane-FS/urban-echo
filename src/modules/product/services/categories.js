import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

export const categoriesService = {
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
};
