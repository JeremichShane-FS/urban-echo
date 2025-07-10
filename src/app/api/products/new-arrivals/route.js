/**
 * @fileoverview New arrivals products API endpoint for showcasing recently added inventory
 * Retrieves recently added products with advanced pagination, sorting options, and category filtering
 * Supports time-based filtering, stock status options, and configurable date ranges for marketing displays
 */

import {
  API_ENDPOINTS,
  API_SORT_OPTIONS,
  API_VALIDATION_LIMITS,
  DEFAULT_PAGINATION,
  ERROR_TYPES,
} from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/utils";
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
 * GET /api/products/new-arrivals - Get new arrival products with pagination and sorting
 * @param {Request} request - Next.js API request object with URL search parameters
 * @returns {Promise<Response>} JSON response with paginated new arrivals and metadata
 * @throws {ValidationError} When pagination parameters exceed limits or sort option is invalid
 * @throws {DatabaseError} When MongoDB connection or query fails
 * @throws {ServerError} When product transformation or processing fails
 *
 * @typedef {Object} NewArrivalsParams
 * @property {string} [category] - Filter by category slug (clothing, shoes, accessories)
 * @property {number} [limit=8] - Products per page (max 100)
 * @property {number} [page=1] - Page number for pagination
 * @property {string} [sort=newest] - Sort option (newest, oldest, price-low, price-high, rating)
 * @property {string} [order=desc] - Sort order (asc, desc)
 * @property {number} [days] - Filter products added within X days
 * @property {boolean} [includeOutOfStock=false] - Include out-of-stock items
 *
 * @typedef {Object} NewArrivalProduct
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {string} slug - URL-friendly identifier
 * @property {string} description - Product description
 * @property {number} price - Current price
 * @property {number} [salePrice] - Sale price if on sale
 * @property {string[]} images - Product images array
 * @property {Object} category - Category details
 * @property {string} category.name - Category display name
 * @property {string} category.slug - Category identifier
 * @property {boolean} inStock - Stock availability
 * @property {number} stockQuantity - Available quantity
 * @property {number} averageRating - Average customer rating (1-5)
 * @property {number} reviewCount - Number of customer reviews
 * @property {boolean} isNewArrival - New arrival flag (always true)
 * @property {boolean} isOnSale - Sale status
 * @property {string} createdAt - Product creation date
 * @property {string} arrivedAt - Date when marked as new arrival
 *
 * @typedef {Object} NewArrivalsPagination
 * @property {number} page - Current page number
 * @property {number} limit - Items per page
 * @property {number} total - Total number of new arrivals
 * @property {number} pages - Total number of pages
 * @property {boolean} hasNext - Whether there's a next page
 * @property {boolean} hasPrev - Whether there's a previous page
 *
 * @typedef {Object} NewArrivalsResponse
 * @property {NewArrivalProduct[]} data - Array of new arrival products
 * @property {NewArrivalsPagination} pagination - Pagination information
 * @property {Object} meta - Response metadata
 * @property {string} meta.endpoint - API endpoint used
 * @property {Object} meta.filters - Applied filters
 * @property {string} meta.source - Data source identifier
 * @property {string} meta.lastUpdated - ISO timestamp
 *
 * @example
 * // Get first page of new arrivals with default settings
 * GET /api/products/new-arrivals
 * // Returns 8 newest arrival products
 *
 * @example
 * // Get new arrivals in clothing category with pagination
 * GET /api/products/new-arrivals?category=clothing&sort=newest&limit=12&page=1
 * // Returns 12 newest clothing items on first page
 *
 * @example
 * // Get new arrivals from last 7 days sorted by rating
 * GET /api/products/new-arrivals?days=7&sort=rating
 * // Returns products added in last week, sorted by customer rating
 *
 * @example
 * // Get new arrivals with price sorting and custom pagination
 * GET /api/products/new-arrivals?sort=price-low&order=asc&limit=20&page=2
 * // Returns page 2 of new arrivals sorted by lowest price first
 *
 * @example
 * // Successful response structure
 * {
 *   "data": [
 *     {
 *       "id": "507f1f77bcf86cd799439011",
 *       "name": "Spring Collection Dress",
 *       "slug": "spring-collection-dress",
 *       "description": "Elegant floral dress perfect for spring occasions...",
 *       "price": 89.99,
 *       "salePrice": 69.99,
 *       "images": ["https://example.com/spring-dress.jpg"],
 *       "category": {
 *         "name": "Dresses",
 *         "slug": "dresses"
 *       },
 *       "inStock": true,
 *       "stockQuantity": 15,
 *       "averageRating": 4.6,
 *       "reviewCount": 12,
 *       "isNewArrival": true,
 *       "isOnSale": true,
 *       "createdAt": "2024-01-10T08:00:00Z",
 *       "arrivedAt": "2024-01-10T08:00:00Z"
 *     }
 *   ],
 *   "pagination": {
 *     "page": 1,
 *     "limit": 8,
 *     "total": 24,
 *     "pages": 3,
 *     "hasNext": true,
 *     "hasPrev": false
 *   },
 *   "meta": {
 *     "endpoint": "/api/products/new-arrivals",
 *     "filters": {
 *       "category": "clothing",
 *       "sort": "newest",
 *       "order": "desc"
 *     },
 *     "source": "mongodb",
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   }
 * }
 */
export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get("category");
    const rawLimit = parseInt(searchParams.get("limit")) || 8;
    const rawPage = parseInt(searchParams.get("page")) || DEFAULT_PAGINATION.page;
    const sort = searchParams.get("sort") || "newest";
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
 * OPTIONS /api/products/new-arrivals - CORS preflight handler for new arrivals endpoint
 * @returns {Response} CORS headers configured for read-only operations
 *
 * @example
 * // Preflight request for new arrivals
 * OPTIONS /api/products/new-arrivals
 * // Returns appropriate CORS headers for GET operations
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
