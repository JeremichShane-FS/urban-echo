import {
  API_ENDPOINTS,
  API_SORT_OPTIONS,
  API_VALIDATION_LIMITS,
  DEFAULT_PAGINATION,
  ERROR_TYPES,
} from "@config/constants";
import dbConnect from "@lib/mongodb/client.js";
import { errorHandler } from "@modules/core/services/errorHandler";
import {
  buildFieldSelection,
  buildPagination,
  buildProductQuery,
  buildSortOptions,
  createCorsResponse,
  createErrorResponse,
  createPaginatedResponse,
  createProductMeta,
  transformProducts,
  validatePagination,
  validateSort,
} from "@modules/core/utils/api";

const ERROR_SOURCE = "new-arrivals-api";

/**
 * GET /api/products/new-arrivals
 * @description Get new arrival products with pagination and sorting
 * @param {Object} searchParams - Query parameters
 * @param {string} [searchParams.category] - Category filter
 * @param {number} [searchParams.limit=8] - Products per page (max 100)
 * @param {number} [searchParams.page=1] - Page number
 * @param {string} [searchParams.sort=newest] - Sort option (newest, oldest, price-low, price-high, rating)
 * @param {string} [searchParams.order=desc] - Sort order (asc, desc)
 * @returns {Object} Paginated new arrivals with products array
 * @example GET /api/products/new-arrivals?category=clothing&sort=newest&limit=12&page=1
 */
export async function GET(request) {
  try {
    const searchParams = new URL(request.url, "http://localhost:3000").searchParams;
    const category = searchParams.get("category");
    const rawLimit = parseInt(searchParams.get("limit")) || 8;
    const rawPage = parseInt(searchParams.get("page")) || DEFAULT_PAGINATION.page;
    const sort = searchParams.get("sort") || "newest"; // ✅ Changed from "createdAt" to "newest"
    const order = searchParams.get("order") === "asc" ? 1 : -1;
    const paginationValidation = validatePagination({
      limit: rawLimit,
      page: rawPage,
      maxLimit: API_VALIDATION_LIMITS.MAX_NEW_ARRIVALS,
      endpoint: `/api/${API_ENDPOINTS.newArrivals}`,
    });

    if (!paginationValidation.isValid) return paginationValidation.response;

    const sortValidation = validateSort(
      sort,
      API_SORT_OPTIONS.NEW_ARRIVALS,
      `/api/${API_ENDPOINTS.newArrivals}`
    );

    if (!sortValidation.isValid) return sortValidation.response;

    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product.js")).default;
    const pagination = buildPagination({ page: rawPage, limit: rawLimit });
    const query = buildProductQuery({
      category,
      isActive: true,
      isNewArrival: true,
    });
    const sortOptions = buildSortOptions(sort);

    const [products, totalCount] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .select(buildFieldSelection("listing"))
        .lean(),
      Product.countDocuments(query),
    ]);

    const transformedProducts = transformProducts(products);
    const filters = { category, sort, order: order === 1 ? "asc" : "desc" };
    const meta = createProductMeta(`/api/${API_ENDPOINTS.newArrivals}`, filters, "mongodb");

    return createPaginatedResponse(
      transformedProducts,
      { page: pagination.page, limit: pagination.limit, total: totalCount },
      meta
    );
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
      source: ERROR_SOURCE,
      action: "getNewArrivals",
      endpoint: `/api/${API_ENDPOINTS.newArrivals}`,
    });

    return createErrorResponse("Failed to fetch new arrivals", error.message, {
      source: "mongodb",
      debug: { stack: error.stack, name: error.name },
    });
  }
}

/**
 * OPTIONS /api/products/new-arrivals
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
