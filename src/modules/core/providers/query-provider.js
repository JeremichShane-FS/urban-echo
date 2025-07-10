/**
 * @fileoverview React Query provider setup for comprehensive data fetching and state management
 * Handles API caching, background updates, error management, and query invalidation strategies
 * Provides centralized configuration for retry logic, cache duration, and error handling integration
 * Includes query key factories, prefetch utilities, and error recovery mechanisms for production use
 */

"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PropTypes from "prop-types";

import { API_TIMEOUT, CACHE_DURATION, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Creates a configured QueryClient instance with optimized default options
 * @function createQueryClient
 * @returns {QueryClient} Configured QueryClient with retry logic, caching, and error handling
 */
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: CACHE_DURATION.short, // 5 minutes
        gcTime: CACHE_DURATION.medium, // 30 minutes (updated from cacheTime)
        // Retry failed requests 3 times
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors
          if (
            error?.status >= HTTP_STATUS.BAD_REQUEST &&
            error?.status < HTTP_STATUS.INTERNAL_SERVER_ERROR
          ) {
            return false;
          }
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, API_TIMEOUT / 2),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        networkMode: "online",
        onError: error => {
          const errorType = getErrorType(error);
          errorHandler.handleError(error, errorType, {
            source: "react-query",
            action: "query",
          });
        },
      },
      mutations: {
        // Retry failed mutations once
        retry: 1,
        retryDelay: 1000,
        onError: (error, variables, context) => {
          const errorType = getErrorType(error);
          errorHandler.handleError(error, errorType, {
            source: "react-query",
            action: "mutation",
            variables,
            context,
          });
        },
        onSuccess: (data, variables, context) => {
          console.log("Mutation successful:", { data, variables, context });
        },
      },
    },
  });

/**
 * Determines error type based on HTTP status code and error characteristics
 * @function getErrorType
 * @param {Error|Object} error - Error object with status code or response
 * @returns {string} Categorized error type from ERROR_TYPES constants
 */
const getErrorType = error => {
  if (!error) return ERROR_TYPES.UNKNOWN_ERROR;

  const status = error?.status || error?.response?.status;

  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
      return ERROR_TYPES.VALIDATION_ERROR;
    case HTTP_STATUS.UNAUTHORIZED:
      return ERROR_TYPES.AUTHENTICATION_ERROR;
    case HTTP_STATUS.FORBIDDEN:
      return ERROR_TYPES.AUTHORIZATION_ERROR;
    case HTTP_STATUS.NOT_FOUND:
      return ERROR_TYPES.NOT_FOUND_ERROR;
    case HTTP_STATUS.TOO_MANY_REQUESTS:
      return ERROR_TYPES.RATE_LIMIT_ERROR;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      return ERROR_TYPES.SERVER_ERROR;
    default:
      if (error?.name === "AbortError" || error?.message?.includes("timeout")) {
        return ERROR_TYPES.TIMEOUT_ERROR;
      }
      if (error?.message?.includes("network") || error?.message?.includes("fetch")) {
        return ERROR_TYPES.NETWORK_ERROR;
      }
      return ERROR_TYPES.API_ERROR;
  }
};

/**
 * React Query provider component that wraps the application with data fetching capabilities
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with query client
 * @returns {JSX.Element} QueryClientProvider with optional development tools
 */
export const QueryProvider = ({ children }) => {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NEXT_PUBLIC_SHOW_DEVTOOLS === "true" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

QueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hierarchical query key factory for consistent cache management and invalidation
 * @namespace queryKeys
 * @description
 * Provides structured query keys for different data domains (content, products, user, etc.)
 * Each domain has specific key generators that create hierarchical cache keys
 * for efficient invalidation and cache management strategies
 */
export const queryKeys = {
  content: {
    all: ["content"],
    hero: () => [...queryKeys.content.all, "hero"],
    about: () => [...queryKeys.content.all, "about"],
    pageConfig: pageName => [...queryKeys.content.all, "page-config", pageName],
  },

  products: {
    all: ["products"],
    lists: () => [...queryKeys.products.all, "list"],
    list: filters => [...queryKeys.products.lists(), { filters }],
    details: () => [...queryKeys.products.all, "detail"],
    detail: id => [...queryKeys.products.details(), id],
    featured: () => [...queryKeys.products.all, "featured"],
    newArrivals: () => [...queryKeys.products.all, "new-arrivals"],
    bestSellers: () => [...queryKeys.products.all, "best-sellers"],
    related: id => [...queryKeys.products.all, "related", id],
    search: query => [...queryKeys.products.all, "search", query],
    category: category => [...queryKeys.products.all, "category", category],
  },

  categories: {
    all: ["categories"],
    list: () => [...queryKeys.categories.all, "list"],
    detail: slug => [...queryKeys.categories.all, "detail", slug],
  },

  collections: {
    all: ["collections"],
    list: () => [...queryKeys.collections.all, "list"],
    detail: slug => [...queryKeys.collections.all, "detail", slug],
  },

  user: {
    all: ["user"],
    profile: () => [...queryKeys.user.all, "profile"],
    orders: () => [...queryKeys.user.all, "orders"],
    order: id => [...queryKeys.user.all, "orders", id],
    addresses: () => [...queryKeys.user.all, "addresses"],
    preferences: () => [...queryKeys.user.all, "preferences"],
  },

  cart: {
    all: ["cart"],
    items: () => [...queryKeys.cart.all, "items"],
    shipping: () => [...queryKeys.cart.all, "shipping"],
    tax: () => [...queryKeys.cart.all, "tax"],
    promo: () => [...queryKeys.cart.all, "promo"],
  },

  // for future implementation
  reviews: {
    all: ["reviews"],
    product: productId => [...queryKeys.reviews.all, "product", productId],
    user: userId => [...queryKeys.reviews.all, "user", userId],
  },

  newsletter: {
    all: ["newsletter"],
    subscription: () => [...queryKeys.newsletter.all, "subscription"],
  },
};

/**
 * Utility functions for prefetching data to improve perceived performance
 * @namespace prefetchUtils
 */
export const prefetchUtils = {
  /**
   * Prefetch content data for improved page load performance
   * @function prefetchContent
   * @param {QueryClient} queryClient - React Query client instance
   * @param {string} contentType - Content type to prefetch (hero, about, etc.)
   * @returns {Promise} Promise that resolves when prefetch completes
   */
  prefetchContent: (queryClient, contentType) => {
    return queryClient.prefetchQuery({
      queryKey: queryKeys.content[contentType](),
      queryFn: () => {
        const { contentService } = require("@modules/core/services").default;
        switch (contentType) {
          case "hero":
            return contentService.getHeroContent();
          case "about":
            return contentService.getAboutContent();
          default:
            throw new Error(`Unknown content type: ${contentType}`);
        }
      },
      staleTime: CACHE_DURATION.medium,
    });
  },

  /**
   * Prefetch page configuration data
   * @function prefetchPageConfig
   * @param {QueryClient} queryClient - React Query client instance
   * @param {string} pageName - Page name to prefetch configuration for
   * @returns {Promise} Promise that resolves when prefetch completes
   */
  prefetchPageConfig: (queryClient, pageName) => {
    return queryClient.prefetchQuery({
      queryKey: queryKeys.content.pageConfig(pageName),
      queryFn: () => {
        const { contentService } = require("@modules/core/services").default;
        return contentService.getPageConfig(pageName);
      },
      staleTime: CACHE_DURATION.long,
    });
  },
};

/**
 * Error recovery utilities for handling failed queries and cache invalidation
 * @namespace errorRecovery
 */
export const errorRecovery = {
  /**
   * Clear all cached queries and trigger refetch for fresh data
   * @function clearAndRefetch
   * @param {QueryClient} queryClient - React Query client instance
   */
  clearAndRefetch: queryClient => {
    queryClient.clear();
    queryClient.refetchQueries();
  },

  /**
   * Invalidate specific query patterns to force refetch of related data
   * @function invalidatePattern
   * @param {QueryClient} queryClient - React Query client instance
   * @param {Array} queryKey - Query key pattern to invalidate
   */
  invalidatePattern: (queryClient, queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  },

  /**
   * Invalidate all content queries (useful after CMS updates)
   * @function invalidateContent
   * @param {QueryClient} queryClient - React Query client instance
   */
  invalidateContent: queryClient => {
    queryClient.invalidateQueries({ queryKey: queryKeys.content.all });
  },
};
