// Product transformers
export {
  transformProduct,
  transformProductForDetail,
  transformProductForListing,
  transformProducts,
} from "./productTransformers";

// Query builders
export {
  buildFieldSelection,
  buildPagination,
  buildProductQuery,
  buildSortOptions,
} from "./queryBuilders";

// Validation helpers
export {
  isValidObjectId,
  validatePagination,
  validatePriceRange,
  validateRequiredFields,
  validateSort,
} from "./validation";

// Response builders
export {
  buildPaginationMeta,
  createCorsResponse,
  createErrorResponse,
  createNotFoundResponse,
  createPaginatedResponse,
  createProductMeta,
  createSuccessResponse,
  createValidationErrorResponse,
} from "./responseBuilders";

// Content helpers (for CMS integration)
export {
  createFallbackResponse,
  fetchFromStrapi,
  handleStrapiNotFound,
  processImageUrl,
  transformContentWithFallbacks,
} from "./contentHelpers";
