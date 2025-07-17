/**
 * @fileoverview Error container component following Hook-Container-View pattern
 * Integrates error state management with view component for consistent error UI
 * Provides configurable error states with retry functionality and analytics tracking
 */

import PropTypes from "prop-types";

import ErrorView from "./ErrorView";
import useError from "./useError";

import styles from "./Error.module.scss";

/**
 * Error container component that manages state and passes props to view
 * @component
 * @param {string} [message="Something went wrong. Please try again."] - Error message
 * @param {string} [title] - Optional section title
 * @param {string} [variant="section"] - Error variant (section, page, inline)
 * @param {Function} [onRetry] - Retry function to execute
 * @param {string} [retryText="Try Again"] - Retry button text
 * @param {boolean} [showRetry=false] - Whether to show retry button
 * @param {number} [maxRetries=3] - Maximum number of retry attempts
 * @param {string} [className] - Additional CSS classes
 * @param {Function} [onError] - Callback when error occurs
 * @returns {JSX.Element} Rendered error component with full structure
 */
const Error = ({
  className,
  maxRetries = 3,
  message = "Something went wrong. Please try again.",
  onError,
  onRetry,
  retryText = "Try Again",
  showRetry = false,
  title,
  variant = "section",
  ...props
}) => {
  const { canRetry, config, handleRetry, isRetrying } = useError({
    message,
    title,
    variant,
    onRetry,
    retryText,
    showRetry,
    maxRetries,
    onError,
  });

  return (
    <ErrorView
      {...config}
      canRetry={canRetry}
      className={className}
      isRetrying={isRetrying}
      styles={styles}
      onRetry={handleRetry}
      {...props}
    />
  );
};

Error.View = ErrorView;
Error.useError = useError;
Error.propTypes = {
  className: PropTypes.string,
  maxRetries: PropTypes.number,
  message: PropTypes.string,
  onError: PropTypes.func,
  onRetry: PropTypes.func,
  retryText: PropTypes.string,
  showRetry: PropTypes.bool,
  title: PropTypes.string,
  variant: PropTypes.oneOf(["section", "page", "inline"]),
};

export default Error;
