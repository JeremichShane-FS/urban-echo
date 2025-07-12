/**
 * @fileoverview Custom hook for debouncing values to optimize performance and reduce API calls
 * Delays updating the debounced value until after a specified delay period without changes
 * Essential for search inputs, form validation, and preventing excessive API requests
 */

import { useEffect, useState } from "react";

/**
 * Hook for debouncing a value to prevent excessive updates or API calls
 * @param {any} value - The value to debounce (string, number, object, etc.)
 * @param {number} delay - The delay in milliseconds before updating the debounced value
 * @returns {any} The debounced value that updates only after the delay period
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * // This will update debouncedSearchTerm only after 500ms of no changes to searchTerm
 *
 * @example
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebounce(query, 300);
 *
 * useEffect(() => {
 *   if (debouncedQuery) {
 *     searchProducts(debouncedQuery);
 *   }
 * }, [debouncedQuery]);
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
