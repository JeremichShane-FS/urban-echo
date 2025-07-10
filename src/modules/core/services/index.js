/**
 * @fileoverview Centralized barrel export for core service modules
 * Provides clean, organized access to all service objects
 * Maintains separation of concerns while enabling convenient imports
 *
 * @example - Instead of multiple imports:
 * import authService, { login, register } from './auth-service';
 * import productService, { getProducts, getProduct } from './product-service';
 *
 * You can now import from a single location:
 * import { authService, login, productService, getProducts } from '@modules/core/services';
 */

// Authentication Services
export {
  default as authService,
  getUserProfile,
  login,
  register,
  updateUserProfile,
} from "./auth-service";

// Content Management Services
export {
  default as contentService,
  getAboutContent,
  getHeroContent,
  getPageConfig,
} from "./content-service";

// HTTP Client Services
export { del, get, post, put } from "./http-client";

// Newsletter Services
export {
  default as newsletterService,
  subscribeNewsletter,
  unsubscribeNewsletter,
} from "./newsletter-service";

// Product Services
export {
  getFeaturedProducts,
  getNewArrivals,
  getProduct,
  getProducts,
  getRelatedProducts,
  default as productService,
  searchProducts,
} from "./product-service";
