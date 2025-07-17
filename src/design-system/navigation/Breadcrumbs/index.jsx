/**
 * @fileoverview Reusable breadcrumb navigation component following hook-view-container pattern
 * Provides accessible breadcrumb trail with customizable separators and dynamic path generation
 * Integrates with Next.js routing for optimal performance and SEO benefits
 */

import Link from "next/link";
import PropTypes from "prop-types";

import BreadcrumbsView from "./BreadcrumbsView";
import useBreadcrumbs from "./useBreadcrumbs";

import styles from "./Breadcrumbs.module.scss";

/**
 * Container component for breadcrumb navigation with flexible path generation and accessibility features
 * @component
 * @param {Array<Object>} items - Breadcrumb items array with path and label properties
 * @param {string} [separator="›"] - Custom separator character between breadcrumb items
 * @param {string} [className=""] - Additional CSS classes for custom styling
 * @param {boolean} [showHome=true] - Whether to include home link as first breadcrumb
 * @param {boolean} [trackClicks=false] - Whether to track breadcrumb clicks for analytics
 * @param {Function} [onBreadcrumbClick] - Custom click handler for breadcrumb items
 * @returns {JSX.Element} Rendered breadcrumb navigation with accessible markup
 */
const Breadcrumbs = ({
  className = "",
  items = [],
  onBreadcrumbClick,
  separator = "›",
  showHome = true,
  trackClicks = false,
}) => {
  const {
    breadcrumbItems,
    handleBreadcrumbClick,
    separator: processedSeparator,
    shouldRender,
  } = useBreadcrumbs(items, {
    separator,
    showHome,
    trackClicks,
    onBreadcrumbClick,
  });

  return (
    <BreadcrumbsView
      Link={Link}
      breadcrumbItems={breadcrumbItems}
      className={className}
      handleBreadcrumbClick={handleBreadcrumbClick}
      separator={processedSeparator}
      shouldRender={shouldRender}
      styles={styles}
    />
  );
};

export default Breadcrumbs;

Breadcrumbs.displayName = "Breadcrumbs";
Breadcrumbs.View = BreadcrumbsView;
Breadcrumbs.useBreadcrumbs = useBreadcrumbs;
Breadcrumbs.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      ariaLabel: PropTypes.string,
      isHome: PropTypes.bool,
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
    })
  ),
  onBreadcrumbClick: PropTypes.func,
  separator: PropTypes.string,
  showHome: PropTypes.bool,
  trackClicks: PropTypes.bool,
};
