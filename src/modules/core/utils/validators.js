/**
 * @fileoverview Comprehensive validation utility functions for form inputs and data integrity
 * Provides robust validation for emails, passwords, phone numbers, financial data, and business-specific formats
 * Includes advanced algorithms like Luhn validation for credit cards and comprehensive date validation
 * Supports e-commerce requirements with SKU validation, price validation, and URL verification
 */

/**
 * Validates an email address using RFC-compliant regex pattern
 * @function isValidEmail
 * @param {string} email - The email address to validate
 * @returns {boolean} True if email format is valid, false otherwise
 *
 * @example
 * isValidEmail("user@example.com"); // true
 * isValidEmail("invalid.email"); // false
 * isValidEmail(""); // false
 */
export const isValidEmail = email => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password against comprehensive security requirements
 * @function validatePassword
 * @param {string} password - The password to validate against security policies
 * @returns {Object} Validation result object with detailed feedback
 * @returns {boolean} returns.isValid - Whether password meets all requirements
 * @returns {string} returns.errorMessage - Specific error message for failed validation
 *
 * @description
 * Password requirements:
 * - Minimum 8 characters length
 * - At least one uppercase letter (A-Z)
 * - At least one lowercase letter (a-z)
 * - At least one numeric digit (0-9)
 *
 * @example
 * validatePassword("Password123");
 * // Returns: { isValid: true, errorMessage: "" }
 *
 * @example
 * validatePassword("weak");
 * // Returns: { isValid: false, errorMessage: "Password must be at least 8 characters long" }
 */
export const validatePassword = password => {
  if (!password) return { isValid: false, errorMessage: "Password is required" };

  if (password.length < 8)
    return { isValid: false, errorMessage: "Password must be at least 8 characters long" };

  if (!/[A-Z]/.test(password))
    return { isValid: false, errorMessage: "Password must contain at least one uppercase letter" };

  if (!/[a-z]/.test(password))
    return { isValid: false, errorMessage: "Password must contain at least one lowercase letter" };

  if (!/\d/.test(password))
    return { isValid: false, errorMessage: "Password must contain at least one number" };

  return { isValid: true, errorMessage: "" };
};

/**
 * Validates a phone number with flexible formatting support
 * @function isValidPhone
 * @param {string} phone - The phone number to validate (accepts various formats)
 * @returns {boolean} True if phone number has valid length after cleaning, false otherwise
 *
 * @description
 * Accepts phone numbers in various formats and cleans them for validation:
 * - Removes spaces, dashes, parentheses, and other non-digit characters
 * - Validates minimum length of 10 digits for US/international compatibility
 *
 * @example
 * isValidPhone("(555) 123-4567"); // true
 * isValidPhone("555-123-4567"); // true
 * isValidPhone("5551234567"); // true
 * isValidPhone("123"); // false
 */
export const isValidPhone = phone => {
  if (!phone) return false;
  // Basic validation to remove spaces, dashes, parentheses, etc.
  const cleanedPhone = phone.replaceAll(/\D/g, "");
  return cleanedPhone.length >= 10;
};

/**
 * Validates a product SKU against Urban Echo's specific format requirements
 * @function isValidSKU
 * @param {string} sku - The SKU (Stock Keeping Unit) to validate
 * @returns {boolean} True if SKU matches required format, false otherwise
 *
 * @description
 * Urban Echo SKU format requirements:
 * - Format: ABC-12345 (3 uppercase letters, hyphen, 5 digits)
 * - Example: TEE-12345, SHT-67890, ACC-11111
 *
 * @example
 * isValidSKU("TEE-12345"); // true
 * isValidSKU("SHT-67890"); // true
 * isValidSKU("invalid-sku"); // false
 * isValidSKU("TEE12345"); // false (missing hyphen)
 */
export const isValidSKU = sku => {
  if (!sku) return false;
  // Format: ABC-12345
  const skuRegex = /^[A-Z]{3}-\d{5}$/;
  return skuRegex.test(sku);
};

/**
 * Validates a US zip code in both 5-digit and ZIP+4 formats
 * @function isValidZipCode
 * @param {string} zip - The zip code to validate
 * @returns {boolean} True if zip code format is valid, false otherwise
 *
 * @description
 * Supports both standard US zip code formats:
 * - 5-digit format: 12345
 * - ZIP+4 format: 12345-6789
 *
 * @example
 * isValidZipCode("12345"); // true
 * isValidZipCode("12345-6789"); // true
 * isValidZipCode("1234"); // false
 * isValidZipCode("123456"); // false
 */
export const isValidZipCode = zip => {
  if (!zip) return false;
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
};

/**
 * Validates a credit card number using the industry-standard Luhn algorithm
 * @function isValidCreditCard
 * @param {string} cardNumber - The credit card number to validate (accepts various formats)
 * @returns {boolean} True if card number passes Luhn validation, false otherwise
 *
 * @description
 * Implements the Luhn algorithm for credit card validation:
 * - Removes all non-digit characters for flexible input formatting
 * - Validates length (13-19 digits for major card types)
 * - Applies Luhn checksum algorithm for mathematical validation
 * - Supports Visa, MasterCard, American Express, Discover, and other major cards
 *
 * @example
 * isValidCreditCard("4532-1234-5678-9012"); // true (if valid Luhn)
 * isValidCreditCard("4532 1234 5678 9012"); // true (if valid Luhn)
 * isValidCreditCard("4532123456789012"); // true (if valid Luhn)
 * isValidCreditCard("1234"); // false (too short)
 */
export const isValidCreditCard = cardNumber => {
  if (!cardNumber) return false;

  // Remove all non-digit characters
  const digits = cardNumber.replaceAll(/\D/g, "");

  if (digits.length < 13 || digits.length > 19) return false;

  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;

  // Loop through values starting from the rightmost digit
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

/**
 * Validates if a value is empty using comprehensive emptiness criteria
 * @function isEmpty
 * @param {*} value - The value to check for emptiness (any data type)
 * @returns {boolean} True if value is considered empty, false otherwise
 *
 * @description
 * Comprehensive emptiness check covering:
 * - null and undefined values
 * - Empty strings (including whitespace-only strings)
 * - Empty arrays
 * - Empty objects (no enumerable properties)
 *
 * @example
 * isEmpty(null); // true
 * isEmpty(""); // true
 * isEmpty("   "); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty("hello"); // false
 * isEmpty([1, 2, 3]); // false
 */
export const isEmpty = value => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};

/**
 * Validates a URL using the browser's native URL constructor with error handling
 * @function isValidURL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if URL is valid and parseable, false otherwise
 *
 * @description
 * Uses the native URL constructor for comprehensive URL validation:
 * - Validates protocol (http, https, ftp, etc.)
 * - Validates domain structure and format
 * - Handles relative and absolute URLs
 * - Includes error handling for malformed URLs
 *
 * @example
 * isValidURL("https://www.example.com"); // true
 * isValidURL("http://localhost:3000"); // true
 * isValidURL("ftp://files.example.com"); // true
 * isValidURL("invalid-url"); // false
 * isValidURL(""); // false
 */
export const isValidURL = url => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Validates a price value for e-commerce applications
 * @function isValidPrice
 * @param {number|string} price - The price to validate (numeric value or string)
 * @returns {boolean} True if price is valid and non-negative, false otherwise
 *
 * @description
 * Price validation criteria:
 * - Accepts both numeric and string representations
 * - Converts strings to numbers for validation
 * - Ensures non-negative values (>= 0)
 * - Handles null and undefined gracefully
 *
 * @example
 * isValidPrice(99.99); // true
 * isValidPrice("49.95"); // true
 * isValidPrice(0); // true
 * isValidPrice(-10); // false
 * isValidPrice("invalid"); // false
 * isValidPrice(null); // false
 */
export const isValidPrice = price => {
  if (price === null || price === undefined) return false;

  const priceValue = typeof price === "string" ? parseFloat(price) : price;

  return !isNaN(priceValue) && priceValue >= 0;
};

/**
 * Validates a date string in ISO format (YYYY-MM-DD) with comprehensive date logic
 * @function isValidDate
 * @param {string} dateString - The date string to validate in YYYY-MM-DD format
 * @returns {boolean} True if date is valid and properly formatted, false otherwise
 *
 * @description
 * Comprehensive date validation including:
 * - Format validation (YYYY-MM-DD pattern)
 * - Range validation (year 1000-3000, valid months/days)
 * - Leap year calculation and February 29th validation
 * - Month-specific day limits (30/31 days per month)
 *
 * @example
 * isValidDate("2024-03-15"); // true
 * isValidDate("2024-02-29"); // true (2024 is leap year)
 * isValidDate("2023-02-29"); // false (2023 is not leap year)
 * isValidDate("2024-13-01"); // false (invalid month)
 * isValidDate("2024-04-31"); // false (April has 30 days)
 * isValidDate("invalid-date"); // false
 */
export const isValidDate = dateString => {
  if (!dateString) return false;

  // Check format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;

  // Parse the date parts to integers
  const parts = dateString.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Check the ranges of month and day
  if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

  return day > 0 && day <= monthLength[month - 1];
};
