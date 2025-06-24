/**
 * @fileoverview Custom hook for debouncing a value.
 * This hook delays updating the debounced value until after a specified delay.
 * @param {any} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds before updating the debounced value.
 * @returns {any} - The debounced value.
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * This will update debouncedSearchTerm only after 500ms of no changes to search
 */

import { useEffect, useState } from "react";

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
