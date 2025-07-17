/**
 * @fileoverview Loading view component for consistent loading UI across the application
 * Provides responsive loading layouts with spinner, messages, and proper accessibility
 * Handles different variants (section, page, inline) with semantic HTML structure
 */

import PropTypes from "prop-types";

/**
 * View component for rendering loading states with proper structure and accessibility
 * @component
 * @param {string} message - Loading message to display
 * @param {string} [title] - Optional section title
 * @param {string} variant - Loading variant (section, page, inline)
 * @param {boolean} showSpinner - Whether to show loading spinner
 * @param {string} [className] - Additional CSS classes
 * @param {Object} styles - CSS module styles object
 * @returns {JSX.Element} Rendered loading component with appropriate structure
 */
const LoadingView = ({
  className = "",
  message,
  showSpinner,
  styles,
  title,
  variant = "section",
}) => {
  // Page-level loading (full page)
  if (variant === "page") {
    return (
      <main className={`${styles.page} ${className}`}>
        <div className={styles.loading}>
          <div className={styles.content}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {showSpinner && (
              <div aria-hidden="true" className={styles.spinner}>
                <div className={styles["spinner-circle"]}></div>
              </div>
            )}
            <p className={styles.message}>{message}</p>
          </div>
        </div>
      </main>
    );
  }

  // Inline loading (minimal structure)
  if (variant === "inline") {
    return (
      <div className={`${styles["inline-loading"]} ${className}`}>
        {showSpinner && (
          <div aria-hidden="true" className={styles.spinner}>
            <div className={styles["spinner-circle"]}></div>
          </div>
        )}
        <span className={styles.message}>{message}</span>
      </div>
    );
  }

  // Section-level loading (default)
  return (
    <section className={`${styles.section} ${className}`}>
      <div className={styles.container}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.loading}>
          {showSpinner && (
            <div aria-hidden="true" className={styles.spinner}>
              <div className={styles["spinner-circle"]}></div>
            </div>
          )}
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </section>
  );
};

LoadingView.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired,
  title: PropTypes.string,
  variant: PropTypes.oneOf(["section", "page", "inline"]).isRequired,
};

export default LoadingView;
