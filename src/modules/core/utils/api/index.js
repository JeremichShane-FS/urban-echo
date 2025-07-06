/**
 * @fileoverview Barrel export file for core utility api functions
 * This file centralizes exports for all core utility api functions in the project
 * making imports cleaner and more organized across components.
 *
 * @example - Instead of multiple imports:
 * import { trackEvent } from '@modules/core/utils/api/analytics';
 * import { formatCurrency } from '@modules/core/utils/api/formatters';
 * import { isValidEmail } from '@modules/core/utils/api/validators';
 *
 * You can now import from a single location:
 * import {
 *   trackEvent,
 *   formatCurrency,
 *   isValidEmail
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
