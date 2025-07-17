/**
 * @fileoverview Loading container component following Hook-Container-View pattern
 * Integrates loading state management with view component for consistent loading UI
 * Provides configurable loading states with spinner, messages, and responsive layouts
 */

import PropTypes from "prop-types";

import LoadingView from "./LoadingView";
import useLoading from "./useLoading";

import styles from "./Loading.module.scss";

/**
 * Loading container component that manages state and passes props to view
 * @component
 * @param {string} [message="Loading..."] - Loading message to display
 * @param {string} [title] - Optional section title
 * @param {string} [variant="section"] - Loading variant (section, page, inline)
 * @param {boolean} [showSpinner=true] - Whether to show loading spinner
 * @param {string} [className] - Additional CSS classes
 * @param {Function} [onLoadingStart] - Callback when loading starts
 * @param {Function} [onLoadingEnd] - Callback when loading ends
 * @returns {JSX.Element} Rendered loading component with full structure
 */
const Loading = ({
  className,
  message = "Loading...",
  onLoadingEnd,
  onLoadingStart,
  showSpinner = true,
  title,
  variant = "section",
  ...props
}) => {
  const { config } = useLoading({
    message,
    title,
    variant,
    showSpinner,
    onLoadingStart,
    onLoadingEnd,
  });

  return <LoadingView {...config} className={className} styles={styles} {...props} />;
};

Loading.View = LoadingView;
Loading.useLoading = useLoading;
Loading.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onLoadingEnd: PropTypes.func,
  onLoadingStart: PropTypes.func,
  showSpinner: PropTypes.bool,
  title: PropTypes.string,
  variant: PropTypes.oneOf(["section", "page", "inline"]),
};

export default Loading;
