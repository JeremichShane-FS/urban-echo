/**
 * @fileoverview Barrel export file for core service modules
 * This file centralizes exports for all service modules in the project
 * making imports cleaner and more organized across components and hooks.
 *
 * @example
 * Instead of multiple imports:
 * import authService from '@module/core/services/auth-service';
 * import productService from '@module/core/services/product-service';
 * import contentService from '@module/core/services/content-service';
 *
 * You can now import from a single location:
 * import { authService, productService, contentService } from '@module/core/services';
 */

// Authentication Services
export { default as authService } from "./auth-service";
export { getUserProfile, login, register, updateUserProfile } from "./auth-service";

// Content Management Services
export { default as contentService } from "./content-service";
export { getAboutContent, getHeroContent, getPageConfig } from "./content-service";

// HTTP Client Services
export { del, delete, get, post, put } from "./http-client";

// Newsletter Services
export { default as newsletterService } from "./newsletter-service";
export { subscribeNewsletter, unsubscribeNewsletter } from "./newsletter-service";

// Product Services
export { default as productService } from "./product-service";
export {
  getFeaturedProducts,
  getNewArrivals,
  getProduct,
  getProducts,
  getRelatedProducts,
  searchProducts,
} from "./product-service";
