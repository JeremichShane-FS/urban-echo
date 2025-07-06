/**
 * @fileoverview Barrel export file for product-related custom hooks
 * This file centralizes exports for all product hooks in the project
 * making imports cleaner and more organized across components.
 *
 * @example - Instead of multiple imports:
 * import { useFeaturedProducts } from '@modules/product/hooks/useFeaturedProducts';
 * import { useNewArrivals } from '@modules/product/hooks/useNewArrivals';
 *
 * You can now import from a single location:
 * import { useFeaturedProducts, useNewArrivals } from '@modules/product/hooks';
 */

// Product Data Management Hooks
export { useFeaturedProducts } from "./useFeaturedProducts";
export { useNewArrivals } from "./useNewArrivals";
