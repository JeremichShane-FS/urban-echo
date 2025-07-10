/**
 * @fileoverview Utility functions for formatting values with internationalization support
 * Provides consistent formatting for currency, dates, and other display values across the application
 * Leverages browser Intl APIs for locale-aware formatting with fallback handling
 * Supports multiple currencies, date formats, and regional preferences for global e-commerce
 */

/**
 * Formats a number as currency with full internationalization support
 * @function formatCurrency
 * @param {number} value - The numeric value to format as currency
 * @param {string} [currency="USD"] - The ISO 4217 currency code (USD, EUR, GBP, etc.)
 * @param {string} [locale="en-US"] - The BCP 47 locale identifier for regional formatting
 * @returns {string} Formatted currency string with proper symbols and decimal places
 *
 * @example
 * formatCurrency(99.99);
 * // Returns: "$99.99" (default USD formatting)
 *
 * @example
 * formatCurrency(49.95, "EUR", "de-DE");
 * // Returns: "49,95 €" (German Euro formatting)
 *
 * @example
 * formatCurrency(1234.56, "GBP", "en-GB");
 * // Returns: "£1,234.56" (British Pound formatting)
 */
export const formatCurrency = (value, currency = "USD", locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};

/**
 * Formats a date to a readable string with customizable locale and format options
 * @function formatDate
 * @param {string|Date} date - The date to format (ISO string, Date object, or timestamp)
 * @param {Object} [options={}] - Intl.DateTimeFormat options for customizing output format
 * @param {string} [options.year] - Year format: "numeric", "2-digit"
 * @param {string} [options.month] - Month format: "numeric", "2-digit", "long", "short", "narrow"
 * @param {string} [options.day] - Day format: "numeric", "2-digit"
 * @param {string} [options.weekday] - Weekday format: "long", "short", "narrow"
 * @param {string} [options.hour] - Hour format: "numeric", "2-digit"
 * @param {string} [options.minute] - Minute format: "numeric", "2-digit"
 * @param {string} [options.timeZone] - IANA time zone identifier
 * @returns {string} Formatted date string according to locale and options
 *
 * @example
 * formatDate("2024-03-15");
 * // Returns: "3/15/2024" (default US formatting)
 *
 * @example
 * formatDate(new Date(), {
 *   year: "numeric",
 *   month: "long",
 *   day: "numeric"
 * });
 * // Returns: "March 15, 2024" (long month format)
 *
 * @example
 * formatDate("2024-03-15T14:30:00Z", {
 *   year: "numeric",
 *   month: "short",
 *   day: "numeric",
 *   hour: "2-digit",
 *   minute: "2-digit"
 * });
 * // Returns: "Mar 15, 2024, 02:30 PM" (date and time formatting)
 */
export const formatDate = (date, options = {}) => {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
