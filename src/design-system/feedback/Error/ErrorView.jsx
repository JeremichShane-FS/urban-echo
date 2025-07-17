/**
 * @fileoverview Error view component for consistent error UI across the application
 * Provides responsive error layouts with retry functionality and proper accessibility
 * Handles different variants (section, page, inline) with semantic HTML structure
 */

import PropTypes from "prop-types";

import { Button } from "@design-system/buttons";

/**
 * View component for rendering error states with proper structure and accessibility
 * @component
 * @param {string} message - Error message to display
 * @param {string} [title] - Optional section title
 * @param {string} variant - Error variant (section, page, inline)
 * @param {boolean} showRetry - Whether to show retry button
 * @param {string} retryText - Retry button text
 * @param {boolean} isRetrying - Whether retry is in progress
 * @param {boolean} canRetry - Whether retry is available
 * @param {Function} onRetry - Retry function
 * @param {string} [className] - Additional CSS classes
 * @param {Object} styles - CSS module styles object
 * @returns {JSX.Element} Rendered error component with appropriate structure
 */
const ErrorView = ({
  canRetry,
  className = "",
  isRetrying,
  message,
  onRetry,
  retryText,
  showRetry,
  styles,
  title,
  variant = "section",
}) => {
  // Page-level error (full page)
  if (variant === "page") {
    return (
      <main className={`${styles.page} ${className}`}>
        <div className={styles.error}>
          <div className={styles.content}>
            {title && <h1 className={styles.title}>{title}</h1>}
            <div aria-hidden="true" className={styles["error-icon"]}>
              ⚠️
            </div>
            <p className={styles.message}>{message}</p>
            {showRetry && onRetry && canRetry && (
              <Button
                aria-busy={isRetrying}
                aria-label="Retry loading content"
                className={styles["retry-button"]}
                disabled={isRetrying}
                type="button"
                onClick={onRetry}>
                {isRetrying ? "Retrying..." : retryText}
              </Button>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Inline error (minimal structure)
  if (variant === "inline") {
    return (
      <div className={`${styles["inline-error"]} ${className}`}>
        <span aria-hidden="true" className={styles["error-icon"]}>
          ⚠️
        </span>
        <span className={styles.message}>{message}</span>
        {showRetry && onRetry && canRetry && (
          <Button
            aria-busy={isRetrying}
            aria-label="Retry"
            className={styles["inline-retry-button"]}
            disabled={isRetrying}
            type="button"
            onClick={onRetry}>
            {isRetrying ? "..." : retryText}
          </Button>
        )}
      </div>
    );
  }

  // Section-level error (default)
  return (
    <section className={`${styles.section} ${className}`}>
      <div className={styles.container}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.error}>
          <div aria-hidden="true" className={styles["error-icon"]}>
            ⚠️
          </div>
          <p className={styles.message}>{message}</p>
          {showRetry && onRetry && canRetry && (
            <Button
              aria-busy={isRetrying}
              aria-label="Retry loading content"
              className={styles["retry-button"]}
              disabled={isRetrying}
              type="button"
              onClick={onRetry}>
              {isRetrying ? "Retrying..." : retryText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

ErrorView.propTypes = {
  canRetry: PropTypes.bool.isRequired,
  className: PropTypes.string,
  isRetrying: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
  retryText: PropTypes.string.isRequired,
  showRetry: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired,
  title: PropTypes.string,
  variant: PropTypes.oneOf(["section", "page", "inline"]).isRequired,
};

export default ErrorView;
