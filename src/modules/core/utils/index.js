/**
 * @fileoverview Centralized barrel export file for comprehensive utility functions and development tools
 * Provides unified access to analytics tracking, validation, formatting, image handling, and UI utilities
 * Simplifies import statements across components and maintains clean project architecture
 * Exports specialized functions for e-commerce operations, user experience enhancements, and data management
 *
 * @example - Instead of multiple imports:
 * import { trackEvent } from '@modules/core/utils/analytics';
 * import { formatCurrency } from '@modules/core/utils/formatters';
 * import { isValidEmail } from '@modules/core/utils/validators';
 *
 * You can now import from a single location:
 * import { trackEvent, formatCurrency, isValidEmail } from '@modules/core/utils';
 */

// Analytics Utilities
export { trackClick, trackEvent, trackPageView } from "./analytics";

// Breadcrumb Utilities
export {
  formatCategoryName,
  generateAccountBreadcrumbs,
  generateCategoryBreadcrumbs,
  generateCheckoutBreadcrumbs,
  generateProductBreadcrumbs,
  generateSearchBreadcrumbs,
  truncateBreadcrumbLabel,
} from "./breadcrumbs";

// CSS/Styling Utilities
export { classNames, cn } from "./classNames";

// Error Handling
export { errorHandler } from "./errorHandler";

// Formatting Utilities
export { formatCurrency, formatDate } from "./formatters";

// Navigation Utilities
export { getNavItemById, getNavItemsByIds } from "./getNavItems";

// Image Utilities
export {
  getBrandedPlaceholder,
  getHeroImageUrl,
  getImageUrl,
  getPlaceholderUrl,
  getProductImageUrl,
  PLACEHOLDER_CONFIGS,
} from "./imageUtils";

// Copyright Utility
export { setCopyright } from "./setCopyright";

// Validation Utilities
export {
  isEmpty,
  isValidCreditCard,
  isValidDate,
  isValidEmail,
  isValidPhone,
  isValidPrice,
  isValidSKU,
  isValidURL,
  isValidZipCode,
  validatePassword,
} from "./validators";

// Star Ratings
export { renderStars } from "./renderStars";
