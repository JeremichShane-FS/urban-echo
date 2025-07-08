/**
 * @fileoverview Barrel export file for product-related providers
 * This file centralizes exports for all product providers in the project
 * making imports cleaner and more organized across components.
 *
 * @example - Instead of multiple imports:
 * import { QueryProvider } from '@modules/product/provides/QueryProvider';
 * import { newProvider } from '@modules/product/providers/newProvider';
 *
 * You can now import from a single location:
 * import { QueryProvider, newProvider } from '@modules/product/providers';
 */

// Product Data Management Providers
export { errorRecovery, prefetchUtils, queryKeys, QueryProvider } from "./query-provider";
