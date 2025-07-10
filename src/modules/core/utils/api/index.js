/**
 * @fileoverview Centralized barrel export file for comprehensive API utility functions and helpers
 * Provides unified access to product transformers, query builders, validation helpers, response builders, and CMS integration
 * Simplifies import statements across API routes and maintains clean project architecture
 * Exports specialized functions for MongoDB operations, Strapi CMS integration, and production-ready API development
 *
 * @example - Instead of multiple imports:
 * import { transformProduct } from '@modules/core/utils/api/productTransformers';
 * import { buildProductQuery } from '@modules/core/utils/api/queryBuilders';
 * import { createSuccessResponse } from '@modules/core/utils/api/responseBuilders';
 * import { validatePagination } from '@modules/core/utils/api/validation';
 *
 * You can now import from a single location:
 * import {
 *   transformProduct,
 *   buildProductQuery,
 *   createSuccessResponse,
 *   validatePagination
 * } from '@modules/core/utils/api';
 */

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
