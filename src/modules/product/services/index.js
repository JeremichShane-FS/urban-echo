/**
 * @fileoverview Barrel export file for core service modules
 * This file centralizes exports for all service modules in the project
 * making imports cleaner and more organized across components and hooks.
 *
 * @example
 * Instead of multiple imports:
 * import { bestSellersService } from './best-sellers';
 * import { featuredProductsService } from './featured-products';
 * import { newArrivalsService } from './new-arrivals';
 *
 * You can now import from a single location:
 * import { bestSellersService, featuredProductsService, newArrivalsService } from './services';
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
