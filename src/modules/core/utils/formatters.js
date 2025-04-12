/**
 * Utility functions for formatting values
 * */

/**
 * Formats a number as currency
 * @param {number} value - The number to format
 * @param {string} currency - The currency code (default is "USD")
 * @param {string} locale - The locale for formatting (default is "en-US")
 * */
export const formatCurrency = (value, currency = "USD", locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};

/**
 * Formats a date to a readable string
 * @param {string|Date} date - The date to format
 * @param {Object} options - Options for formatting
 * */
export const formatDate = (date, options = {}) => {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
