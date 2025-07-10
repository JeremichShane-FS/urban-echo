/**
 * @fileoverview Custom hook for managing state synchronized with localStorage with SSR safety
 * Provides persistent state management across browser sessions with automatic serialization
 * Includes error handling, SSR compatibility, and support for complex data types
 */

import { useState } from "react";

/**
 * Custom hook to manage state synchronized with localStorage
 * @param {string} key - The localStorage key to store the value under
 * @param {any} initialValue - The initial value to use if no stored value exists
 * @returns {Array} Array containing the stored value and setter function
 * @returns {any} returns[0] - Current stored value (parsed from localStorage or initial value)
 * @returns {Function} returns[1] - Setter function to update both state and localStorage
 *
 * @description
 * This hook synchronizes React state with localStorage, providing persistent state across
 * browser sessions. It handles JSON serialization/deserialization automatically and includes
 * error handling for invalid JSON or localStorage access issues. The hook is SSR-safe and
 * will fallback to initial values during server-side rendering.
 *
 * @example
 * const [username, setUsername] = useLocalStorage('username', '');
 * // Reads from localStorage on mount, updates localStorage on change
 *
 * @example
 * // Shopping cart persistence
 * const [cartItems, setCartItems] = useLocalStorage('cart', []);
 * const addToCart = (item) => {
 *   setCartItems(prev => [...prev, item]);
 * };
 *
 * @example
 * // User preferences
 * const [preferences, setPreferences] = useLocalStorage('userPrefs', {
 *   theme: 'light',
 *   currency: 'USD',
 *   notifications: true
 * });
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
