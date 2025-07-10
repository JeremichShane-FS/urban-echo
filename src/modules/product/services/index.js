/**
 * @fileoverview Barrel export file for product service modules and API integration
 * Provides unified access to product data services across the Urban Echo application
 * Simplifies import statements across services with centralized exports
 * Includes services for product listings, details, search, filtering, and recommendations
 *
 * @example - Instead of multiple imports:
 * import { bestSellersService } from '@modules/product/services/best-sellers';
 * import { featuredProductsService } from '@modules/product/services/featured-products';
 * import { newArrivalsService } from '@modules/product/services/new-arrivals';
 *
 * You can now import from a single location:
 * import {
 *   bestSellersService,
 *   featuredProductsService,
 *   newArrivalsService
 * } from '@modules/product/services';
 */

// Product Services
export { bestSellersService } from "./best-sellers";
export { categoriesService } from "./categories";
export { featuredProductsService } from "./featured-products";
export { newArrivalsService } from "./new-arrivals";
export { productDetailsService } from "./product-details";
export { productSearchService } from "./product-search";
export { productsService } from "./products";
export { relatedProductsService } from "./related-products";
