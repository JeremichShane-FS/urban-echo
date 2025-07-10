/**
 * @fileoverview Centralized barrel export file for core provider modules and utilities
 * Provides unified access to data management providers, query utilities, and error recovery functions
 * Simplifies import statements across components and maintains clean project architecture
 * Exports React Query provider, query key factories, prefetch utilities, and error recovery mechanisms
 *
 * @example - Instead of multiple imports:
 * import { QueryProvider } from '@modules/core/providers/query-provider';
 * import { queryKeys } from '@modules/core/providers/query-provider';
 * import { prefetchUtils } from '@modules/core/providers/query-provider';
 *
 * You can now import from a single location:
 * import { QueryProvider, queryKeys, prefetchUtils } from '@modules/core/providers';
 */

// Core Data Management Providers
export { errorRecovery, prefetchUtils, queryKeys, QueryProvider } from "./query-provider";
