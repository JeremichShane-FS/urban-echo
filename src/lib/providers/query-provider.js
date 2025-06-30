/**
 * @fileoverview React Query provider setup for data fetching
 * Handles API caching, background updates, and error management using existing error handler
 */

"use client";

import { useState } from "react";
import PropTypes from "prop-types";

import { API_TIMEOUT, CACHE_DURATION, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

export function QueryProvider({ children }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NEXT_PUBLIC_SHOW_DEVTOOLS === "true" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

QueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Updated query keys to match your current structure
export const queryKeys = {
  // Content queries (using your api-service)
  content: {
    all: ["content"],
    hero: () => [...queryKeys.content.all, "hero"],
    about: () => [...queryKeys.content.all, "about"],
    pageConfig: pageName => [...queryKeys.content.all, "page-config", pageName],
  },

  // Product queries (for future implementation)
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

  // Categories
  categories: {
    all: ["categories"],
    list: () => [...queryKeys.categories.all, "list"],
    detail: slug => [...queryKeys.categories.all, "detail", slug],
  },

  // Collections
  collections: {
    all: ["collections"],
    list: () => [...queryKeys.collections.all, "list"],
    detail: slug => [...queryKeys.collections.all, "detail", slug],
  },

  // User data (for future auth implementation)
  user: {
    all: ["user"],
    profile: () => [...queryKeys.user.all, "profile"],
    orders: () => [...queryKeys.user.all, "orders"],
    order: id => [...queryKeys.user.all, "orders", id],
    addresses: () => [...queryKeys.user.all, "addresses"],
    preferences: () => [...queryKeys.user.all, "preferences"],
  },

  // Cart (though you're using Zustand for this)
  cart: {
    all: ["cart"],
    items: () => [...queryKeys.cart.all, "items"],
    shipping: () => [...queryKeys.cart.all, "shipping"],
    tax: () => [...queryKeys.cart.all, "tax"],
    promo: () => [...queryKeys.cart.all, "promo"],
  },

  // Reviews (for future implementation)
  reviews: {
    all: ["reviews"],
    product: productId => [...queryKeys.reviews.all, "product", productId],
    user: userId => [...queryKeys.reviews.all, "user", userId],
  },

  // Newsletter
  newsletter: {
    all: ["newsletter"],
    subscription: () => [...queryKeys.newsletter.all, "subscription"],
  },
};

// Prefetch Utilities (updated to use your api-service)
export const prefetchUtils = {
  /**
   * Prefetch content data
   * @param {QueryClient} queryClient - React Query client
   * @param {string} contentType - Content type to prefetch
   */
  prefetchContent: (queryClient, contentType) => {
    return queryClient.prefetchQuery({
      queryKey: queryKeys.content[contentType](),
      queryFn: () => {
        // This will use your api-service automatically
        const apiService = require("@lib/services/api-service").default;
        switch (contentType) {
          case "hero":
            return apiService.getHeroContent();
          case "about":
            return apiService.getAboutContent();
          default:
            throw new Error(`Unknown content type: ${contentType}`);
        }
      },
      staleTime: CACHE_DURATION.medium,
    });
  },

  /**
   * Prefetch page config
   * @param {QueryClient} queryClient - React Query client
   * @param {string} pageName - Page name to prefetch
   */
  prefetchPageConfig: (queryClient, pageName) => {
    return queryClient.prefetchQuery({
      queryKey: queryKeys.content.pageConfig(pageName),
      queryFn: () => {
        const apiService = require("@lib/services/api-service").default;
        return apiService.getPageConfig(pageName);
      },
      staleTime: CACHE_DURATION.long,
    });
  },
};

// Error Recovery Utilities
export const errorRecovery = {
  /**
   * Clear all queries and refetch
   * @param {QueryClient} queryClient - React Query client
   */
  clearAndRefetch: queryClient => {
    queryClient.clear();
    queryClient.refetchQueries();
  },

  /**
   * Invalidate specific query patterns
   * @param {QueryClient} queryClient - React Query client
   * @param {Array} queryKey - Query key pattern to invalidate
   */
  invalidatePattern: (queryClient, queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  },

  /**
   * Invalidate content queries (useful after CMS updates)
   * @param {QueryClient} queryClient - React Query client
   */
  invalidateContent: queryClient => {
    queryClient.invalidateQueries({ queryKey: queryKeys.content.all });
  },
};

export default QueryProvider;
