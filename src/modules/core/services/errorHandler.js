/**
 * @fileoverview Enhanced error handling service for Urban Echo e-commerce platform.
 * Provides comprehensive error management including logging, classification, and user notifications.
 * Integrates with existing error types and constants from the application.
 * @example
 * import { errorHandler } from 'src/modules/core/services/errorHandler';
 * errorHandler.handleError(new Error("Something went wrong"), 'NETWORK_ERROR');
 */

import { ERROR_TYPES, HTTP_STATUS } from "@config/constants/api-constants";

export const errorHandler = {
  /**
   * Handles errors with proper classification and logging
   * @param {Error|string} error - The error to handle
   * @param {string} errorType - Error type from ERROR_TYPES constants
   * @param {Object} context - Additional context for the error
   * @returns {void}
   * @example
   * errorHandler.handleError(new Error("Network failed"), 'NETWORK_ERROR', { userId: '123' });
   */

  handleError: (error, errorType = ERROR_TYPES.UNKNOWN_ERROR, context = {}) => {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      type: errorType,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      context,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "server",
      url: typeof window !== "undefined" ? window.location.href : "server",
    };

    // Log error based on environment
    errorHandler.logError(errorInfo);

    // Show user-friendly notification
    errorHandler.notifyUser(errorType, errorInfo.message);

    // Send to external logging service in production
    if (process.env.NODE_ENV === "production") {
      errorHandler.reportError(errorInfo);
    }
  },

  /**
   * Logs error information with proper formatting
   * @param {Object} errorInfo - Structured error information
   * @returns {void}
   */
  logError: errorInfo => {
    const logLevel = errorHandler.getLogLevel(errorInfo.type);

    switch (logLevel) {
      case "error":
        console.error("🚨 ERROR:", errorInfo);
        break;
      case "warn":
        console.warn("⚠️ WARNING:", errorInfo);
        break;
      case "info":
        console.info("ℹ️ INFO:", errorInfo);
        break;
      default:
        console.log("📝 LOG:", errorInfo);
    }
  },

  /**
   * Determines appropriate log level based on error type
   * @param {string} errorType - Error type from ERROR_TYPES
   * @returns {string} Log level
   */
  getLogLevel: errorType => {
    const criticalErrors = [
      ERROR_TYPES.SERVER_ERROR,
      ERROR_TYPES.AUTHENTICATION_ERROR,
      ERROR_TYPES.AUTHORIZATION_ERROR,
    ];

    const warningErrors = [
      ERROR_TYPES.NETWORK_ERROR,
      ERROR_TYPES.TIMEOUT_ERROR,
      ERROR_TYPES.RATE_LIMIT_ERROR,
    ];

    if (criticalErrors.includes(errorType)) return "error";
    if (warningErrors.includes(errorType)) return "warn";
    return "info";
  },

  /**
   * Shows user-friendly notifications based on error type
   * @param {string} errorType - Error type from ERROR_TYPES
   * @param {string} originalMessage - Original error message
   * @returns {void}
   */
  notifyUser: (errorType, _originalMessage) => {
    const userMessages = {
      [ERROR_TYPES.NETWORK_ERROR]: "Unable to connect. Please check your internet connection.",
      [ERROR_TYPES.AUTHENTICATION_ERROR]: "Please log in to continue.",
      [ERROR_TYPES.AUTHORIZATION_ERROR]: "You don't have permission to perform this action.",
      [ERROR_TYPES.NOT_FOUND_ERROR]: "The requested item could not be found.",
      [ERROR_TYPES.VALIDATION_ERROR]: "Please check your input and try again.",
      [ERROR_TYPES.RATE_LIMIT_ERROR]: "Too many requests. Please wait a moment and try again.",
      [ERROR_TYPES.TIMEOUT_ERROR]: "Request timed out. Please try again.",
      [ERROR_TYPES.SERVER_ERROR]: "Something went wrong on our end. Please try again later.",
      [ERROR_TYPES.API_ERROR]: "Service temporarily unavailable. Please try again.",
      [ERROR_TYPES.UNKNOWN_ERROR]: "An unexpected error occurred. Please try again.",
    };

    const message = userMessages[errorType] || userMessages[ERROR_TYPES.UNKNOWN_ERROR];

    errorHandler.showNotification(message, errorType);
  },

  /**
   * Shows modern user notifications (toast, banner, etc.)
   * Should replace app's notification system
   * @param {string} message - User-friendly message
   * @param {string} errorType - Error type for styling
   * @returns {void}
   */
  showNotification: (message, errorType) => {
    // For development - replaces notification system
    if (typeof window !== "undefined") {
      const notification = document.createElement("div");
      notification.className = `error-notification error-${errorType.toLowerCase()}`;
      notification.textContent = message;

      document.body.appendChild(notification);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 5000);

      // Add click to dismiss
      notification.addEventListener("click", () => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      });
    }
  },

  /**
   * Reports errors to your own API endpoint (no third-party required)
   * @param {Object} errorInfo - Structured error information
   * @returns {void}
   */
  reportError: errorInfo => {
    // Create reporting API endpoint
    fetch("/api/errors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorInfo),
    }).catch(reportingError => {
      console.error("Failed to report error to API:", reportingError);
    });
  },

  /**
   * Creates an error object with proper structure
   * @param {string} message - Error message
   * @param {string} type - Error type from ERROR_TYPES
   * @param {number} statusCode - HTTP status code
   * @param {Object} details - Additional error details
   * @returns {Object} Structured error object
   */
  createError: (message, type = ERROR_TYPES.UNKNOWN_ERROR, statusCode = 500, details = {}) => {
    return {
      message,
      type,
      statusCode,
      details,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Handles API response errors
   * @param {Response} response - Fetch response object
   * @param {string} context - Context where error occurred
   * @returns {Promise<void>}
   */
  handleApiError: async (response, context = "") => {
    let errorType = ERROR_TYPES.API_ERROR;
    let message = "API request failed";

    // Map HTTP status codes to error types
    switch (response.status) {
      case HTTP_STATUS.UNAUTHORIZED:
        errorType = ERROR_TYPES.AUTHENTICATION_ERROR;
        message = "Authentication required";
        break;
      case HTTP_STATUS.FORBIDDEN:
        errorType = ERROR_TYPES.AUTHORIZATION_ERROR;
        message = "Access forbidden";
        break;
      case HTTP_STATUS.NOT_FOUND:
        errorType = ERROR_TYPES.NOT_FOUND_ERROR;
        message = "Resource not found";
        break;
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        errorType = ERROR_TYPES.VALIDATION_ERROR;
        message = "Invalid data provided";
        break;
      case HTTP_STATUS.TOO_MANY_REQUESTS:
        errorType = ERROR_TYPES.RATE_LIMIT_ERROR;
        message = "Rate limit exceeded";
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        errorType = ERROR_TYPES.SERVER_ERROR;
        message = "Server error occurred";
        break;
    }

    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
      // If response is not JSON, use default message
      message = "An unexpected error occurred";
    }

    const error = new Error(message);
    errorHandler.handleError(error, errorType, {
      statusCode: response.status,
      context,
      url: response.url,
    });
  },
};

/**
 * @typedef {Object} ErrorHandler
 * @property {function} handleError - Main error handling method
 * @property {function} logError - Logs error information
 * @property {function} notifyUser - Shows user notifications
 * @property {function} reportError - Reports to external services
 * @property {function} createError - Creates structured error objects
 * @property {function} handleApiError - Handles API response errors
 */

export default errorHandler;
