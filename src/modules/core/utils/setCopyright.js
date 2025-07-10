/**
 * @fileoverview Utility function for generating dynamic copyright text with year and title
 * Provides SSR-safe copyright generation with automatic year detection and fallback handling
 * Ensures consistent copyright formatting across footer components and legal pages
 * Handles both client-side and server-side rendering scenarios with graceful fallbacks
 */

/**
 * Set the copyright text with the current year and provided title.
 * @function setCopyright
 * @param {string} title - The title to include in the copyright text (e.g., "Urban Echo", "Company Name")
 * @param {string} [fallbackYear=""] - Fallback year string for server-side rendering or when Date is unavailable
 * @returns {string} Formatted copyright text with copyright symbol, year, and title
 *
 * @description
 * Generates copyright text in the format: "© YYYY Title"
 * - Uses current year from Date object on client-side
 * - Falls back to provided fallbackYear on server-side or when Date is unavailable
 * - Uses Unicode copyright symbol (©) for universal compatibility
 * - Handles SSR scenarios gracefully to prevent hydration mismatches
 *
 * @example
 * setCopyright("Urban Echo");
 * // Returns: "© 2024 Urban Echo" (assuming current year is 2024)
 *
 * @example
 * setCopyright("My Company", "2024");
 * // Returns: "© 2024 My Company" (uses fallback year for SSR)
 *
 * @example
 * // Server-side usage with fallback
 * setCopyright("Urban Echo", "2024");
 * // Ensures consistent output during SSR
 */

export const setCopyright = (title, fallbackYear = "") => {
  const year = typeof window !== "undefined" ? new Date().getFullYear() : fallbackYear;
  return `\u00A9 ${year} ${title}`;
};
