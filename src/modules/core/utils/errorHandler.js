import { ERROR_TYPES } from "@config/constants";

export const errorHandler = {
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
   * Logs error information with proper formatting - completely avoids console
   * @param {Object} errorInfo - Structured error information
   * @returns {void}
   */
  logError: errorInfo => {
    const logLevel = errorHandler.getLogLevel(errorInfo.type);

    // Create a visual log in the DOM instead of console
    const createVisualLog = (level, emoji, data) => {
      if (typeof window === "undefined") return;

      const logElement = document.createElement("div");
      const timestamp = new Date().toLocaleTimeString();

      const safeData = {
        timestamp: data.timestamp,
        type: data.type,
        message: data.message,
        source: data.context?.source,
        endpoint: data.context?.endpoint,
        userId: data.context?.userId,
      };

      const backgroundColor =
        level === "error" ? "#dc3545" : level === "warn" ? "#ffc107" : "#28a745";

      // Create the main container div using createElement (SECURE)
      const container = document.createElement("div");
      container.style.cssText = `
        position: fixed; 
        top: 20px; 
        left: 20px; 
        background: ${backgroundColor}; 
        color: white; 
        padding: 8px 12px; 
        border-radius: 4px; 
        font-family: monospace; 
        font-size: 12px; 
        z-index: 10000;
        max-width: 400px;
        margin-bottom: 5px;
      `;

      // Helper function to add a line with optional label
      const addLine = (label, value, isFirst = false) => {
        if (!isFirst) container.appendChild(document.createElement("br"));

        if (label) {
          const strong = document.createElement("strong");
          strong.textContent = label;
          container.appendChild(strong);
        }

        container.appendChild(document.createTextNode(value));
      };

      // Build content securely
      addLine(null, `${emoji} ${level.toUpperCase()} [${timestamp}]`, true);
      addLine("Type:", ` ${safeData.type}`);
      addLine("Message:", ` ${safeData.message}`);
      addLine("Source:", ` ${safeData.source || "N/A"}`);

      // Add endpoint if it exists
      if (safeData.endpoint) {
        addLine("Endpoint:", ` ${safeData.endpoint}`);
      }

      // Append the container to logElement
      logElement.appendChild(container);
      document.body.appendChild(logElement);

      // Remove after 8 seconds
      setTimeout(() => {
        if (logElement.parentNode) {
          logElement.parentNode.removeChild(logElement);
        }
      }, 8000);

      // Also store in hidden div for programmatic access
      let errorLogContainer = document.getElementById("error-log-container");
      if (!errorLogContainer) {
        errorLogContainer = document.createElement("div");
        errorLogContainer.id = "error-log-container";
        errorLogContainer.style.display = "none";
        document.body.appendChild(errorLogContainer);
      }

      const logEntry = document.createElement("div");
      logEntry.textContent = `${emoji} ${level.toUpperCase()}: ${JSON.stringify(safeData)}`;
      errorLogContainer.appendChild(logEntry);

      // Keep only last 50 entries
      while (errorLogContainer.children.length > 50) {
        errorLogContainer.removeChild(errorLogContainer.firstChild);
      }
    };

    switch (logLevel) {
      case "error":
        createVisualLog("error", "🚨", errorInfo);
        break;
      case "warn":
        createVisualLog("warn", "⚠️", errorInfo);
        break;
      case "info":
        createVisualLog("info", "ℹ️", errorInfo);
        break;
      default:
        createVisualLog("log", "📝", errorInfo);
    }
  },

  /**
   * Determines appropriate log level based on error type
   * @param {string} errorType - Error type from ERROR_TYPES
   * @returns {string} Log level
   */
  getLogLevel: errorType => {
    const criticalErrors = ["SERVER_ERROR", "AUTHENTICATION_ERROR", "AUTHORIZATION_ERROR"];
    const warningErrors = ["NETWORK_ERROR", "TIMEOUT_ERROR", "RATE_LIMIT_ERROR"];

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
      NETWORK_ERROR: "Unable to connect. Please check your internet connection.",
      AUTHENTICATION_ERROR: "Please log in to continue.",
      AUTHORIZATION_ERROR: "You don't have permission to perform this action.",
      NOT_FOUND_ERROR: "The requested item could not be found.",
      VALIDATION_ERROR: "Please check your input and try again.",
      RATE_LIMIT_ERROR: "Too many requests. Please wait a moment and try again.",
      TIMEOUT_ERROR: "Request timed out. Please try again.",
      SERVER_ERROR: "Something went wrong on our end. Please try again later.",
      API_ERROR: "Service temporarily unavailable. Please try again.",
      UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
    };

    const message = userMessages[errorType] || userMessages["UNKNOWN_ERROR"];
    errorHandler.showNotification(message, errorType);
  },

  /**
   * Shows modern user notifications (toast, banner, etc.)
   * @param {string} message - User-friendly message
   * @param {string} errorType - Error type for styling
   * @returns {void}
   */
  showNotification: (message, errorType) => {
    if (typeof window !== "undefined") {
      const notification = document.createElement("div");
      notification.className = `error-notification error-${errorType.toLowerCase()}`;
      notification.textContent = message;

      Object.assign(notification.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 16px",
        borderRadius: "6px",
        color: "white",
        fontWeight: "bold",
        zIndex: "9999",
        maxWidth: "400px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        backgroundColor: errorType.includes("ERROR")
          ? "#dc3545"
          : errorType.includes("WARNING")
            ? "#ffc107"
            : "#17a2b8",
      });

      document.body.appendChild(notification);

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 5000);

      notification.addEventListener("click", () => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      });
    }
  },

  /**
   * Reports errors to API endpoint
   * @param {Object} errorInfo - Structured error information
   * @returns {void}
   */
  reportError: errorInfo => {
    fetch("/api/errors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorInfo),
    }).catch(reportingError => {
      if (typeof window !== "undefined") {
        const errorDiv = document.createElement("div");
        errorDiv.id = "api-error-log";
        errorDiv.style.display = "none";
        errorDiv.textContent = `API Error: ${reportingError.message}`;
        document.body.appendChild(errorDiv);
      }
    });
  },

  /**
   * Creates an error object with proper structure
   * @param {string} message - Error message
   * @param {string} type - Error type
   * @param {number} statusCode - HTTP status code
   * @param {Object} details - Additional error details
   * @returns {Object} Structured error object
   */
  createError: (message, type = "UNKNOWN_ERROR", statusCode = 500, details = {}) => {
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
    let errorType = "API_ERROR";
    let message = "API request failed";

    switch (response.status) {
      case 401:
        errorType = "AUTHENTICATION_ERROR";
        message = "Authentication required";
        break;
      case 403:
        errorType = "AUTHORIZATION_ERROR";
        message = "Access forbidden";
        break;
      case 404:
        errorType = "NOT_FOUND_ERROR";
        message = "Resource not found";
        break;
      case 422:
        errorType = "VALIDATION_ERROR";
        message = "Invalid data provided";
        break;
      case 429:
        errorType = "RATE_LIMIT_ERROR";
        message = "Rate limit exceeded";
        break;
      case 500:
        errorType = "SERVER_ERROR";
        message = "Server error occurred";
        break;
    }

    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
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

export default errorHandler;
