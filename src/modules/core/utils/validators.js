/**
 * Utility functions for validating common data types used throughout the application.
 */

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidEmail = email => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password against the application's password requirements
 * @param {string} password - The password to validate
 * @returns {object} Object containing isValid and errorMessage properties
 */
export const validatePassword = password => {
  if (!password) {
    return { isValid: false, errorMessage: "Password is required" };
  }

  if (password.length < 8) {
    return { isValid: false, errorMessage: "Password must be at least 8 characters long" };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, errorMessage: "Password must contain at least one uppercase letter" };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, errorMessage: "Password must contain at least one lowercase letter" };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, errorMessage: "Password must contain at least one number" };
  }

  return { isValid: true, errorMessage: "" };
};

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidPhone = phone => {
  if (!phone) return false;
  // Basic validation to remove spaces, dashes, parentheses, etc.
  const cleanedPhone = phone.replace(/\D/g, "");
  return cleanedPhone.length >= 10;
};

/**
 * Validates a product SKU format
 * @param {string} sku - The SKU to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidSKU = sku => {
  if (!sku) return false;
  // Format: ABC-12345
  const skuRegex = /^[A-Z]{3}-\d{5}$/;
  return skuRegex.test(sku);
};

/**
 * Validates a US zip code
 * @param {string} zip - The zip code to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidZipCode = zip => {
  if (!zip) return false;
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
};

/**
 * Validates a credit card number using Luhn algorithm
 * @param {string} cardNumber - The credit card number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidCreditCard = cardNumber => {
  if (!cardNumber) return false;

  // Remove all non-digit characters
  const digits = cardNumber.replace(/\D/g, "");

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
 * Validates if a value is empty (null, undefined, empty string, or empty array)
 * @param {*} value - The value to check
 * @returns {boolean} True if empty, false otherwise
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
 * Validates a URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidURL = url => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Validates a price value
 * @param {number|string} price - The price to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidPrice = price => {
  if (price === null || price === undefined) return false;

  const priceValue = typeof price === "string" ? parseFloat(price) : price;

  return !isNaN(priceValue) && priceValue >= 0;
};

/**
 * Validates a date string in YYYY-MM-DD format
 * @param {string} dateString - The date string to validate
 * @returns {boolean} True if valid, false otherwise
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
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  return day > 0 && day <= monthLength[month - 1];
};
