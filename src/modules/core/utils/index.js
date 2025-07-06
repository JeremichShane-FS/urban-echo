/**
 * @fileoverview Barrel export file for utility functions
 * This file centralizes exports for all utility functions in the project
 * making imports cleaner and more organized across components.
 *
 * @example - Instead of multiple imports:
 * import { trackEvent } from './analytics';
 * import { formatCurrency } from './formatters';
 * import { isValidEmail } from './validators';
 *
 * You can now import from a single location:
 * import { trackEvent, formatCurrency, isValidEmail } from './utils';
 */

// Analytics Utilities
export { trackClick, trackEvent, trackPageView } from "./analytics";

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
