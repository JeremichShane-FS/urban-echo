import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/utils";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
} from "@modules/core/utils/api";

const ERROR_SOURCE = "categories-api";

/**
 * GET /api/products/categories
 * @description Get product categories with optional metadata
 * @param {Object} searchParams - Query parameters
 * @param {boolean} [searchParams.includeProductCount=false] - Include product counts
 * @param {boolean} [searchParams.includeSubCategories=false] - Include subcategories
 * @param {string} [searchParams.status=active] - Filter by status
 * @returns {Object} Categories array with optional metadata
 * @example GET /api/products/categories?includeProductCount=true
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeProductCount = searchParams.get("includeProductCount") === "true";
    const includeSubCategories = searchParams.get("includeSubCategories") === "true";
    const status = searchParams.get("status") || "active";

    await dbConnect();

    const Category = (await import("@lib/mongodb/utils/models/category")).default;
    const query = {};
    if (status === "active") {
      query.isActive = true;
      query.isVisible = true;
    }
    let categoriesQuery = Category.find(query).sort({ navigationOrder: 1, name: 1 });

    if (!includeSubCategories) {
      categoriesQuery = categoriesQuery.where({ level: 0 });
    }

    const categories = await categoriesQuery.lean();

    if (includeProductCount && categories.length > 0) {
      const Product = (await import("@lib/mongodb/utils/models/product")).default;

      for (const category of categories) {
        const productCount = await Product.countDocuments({
          category: category.slug,
          isActive: true,
        });
        category.productCount = productCount;
      }
    }

    if (!categories || categories.length === 0) {
      return createSuccessResponse([], {
        endpoint: `/api/${API_ENDPOINTS.categories}`,
        count: 0,
        message: "No categories found",
        source: "mongodb",
      });
    }

    return createSuccessResponse(categories, {
      endpoint: `/api/${API_ENDPOINTS.categories}`,
      count: categories.length,
      source: "mongodb",
      filters: {
        includeProductCount,
        includeSubCategories,
        status,
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      endpoint: `/api/${API_ENDPOINTS.categories}`,
      method: "GET",
    });

    return createErrorResponse("Failed to fetch categories", error.message, {
      source: "mongodb",
      debug: process.env.NODE_ENV === "development" ? { stack: error.stack } : undefined,
    });
  }
}

/**
 * OPTIONS /api/products/categories
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
