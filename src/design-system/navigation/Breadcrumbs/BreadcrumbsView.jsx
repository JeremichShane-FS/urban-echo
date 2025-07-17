/**
 * @fileoverview Presentational component for breadcrumb navigation display
 * Handles responsive breadcrumb layout with customizable separators and accessibility features
 * Provides clean separation between logic and presentation following the view pattern
 */

import { memo } from "react";
import PropTypes from "prop-types";

/**
 * View component for rendering breadcrumb navigation with accessible markup and responsive design
 * @component
 * @param {React.ComponentType} Link - Next.js Link component for client-side navigation
 * @param {Array<Object>} breadcrumbItems - Processed breadcrumb items with navigation data
 * @param {string} className - Additional CSS classes for custom styling
 * @param {Function} handleBreadcrumbClick - Click handler for breadcrumb navigation
 * @param {string} separator - Separator character between breadcrumb items
 * @param {boolean} shouldRender - Whether breadcrumbs should be displayed
 * @param {Object} styles - CSS module styles object for component styling
 * @returns {JSX.Element|null} Rendered breadcrumb navigation or null if shouldn't render
 */
const BreadcrumbsView = ({
  Link,
  breadcrumbItems,
  className,
  handleBreadcrumbClick,
  separator,
  shouldRender,
  styles,
}) => {
  if (!shouldRender) return null;

  return (
    <nav aria-label="Breadcrumb" className={`${styles.breadcrumbs} ${className}`}>
      <ol className={styles["breadcrumb-list"]}>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isHome = item.isHome;

          return (
            <li key={item.id || item.path || index} className={styles["breadcrumb-item"]}>
              {!isLast ? (
                <>
                  <Link
                    aria-label={item.ariaLabel}
                    className={`${styles["breadcrumb-link"]} ${isHome ? styles["breadcrumb-home"] : ""}`}
                    href={item.path}
                    onClick={event => handleBreadcrumbClick(item, event)}>
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className={styles["breadcrumb-separator"]}>
                    {separator}
                  </span>
                </>
              ) : (
                <span aria-current="page" className={styles["breadcrumb-current"]}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default memo(BreadcrumbsView);

BreadcrumbsView.displayName = "BreadcrumbsView";
BreadcrumbsView.propTypes = {
  Link: PropTypes.elementType.isRequired,
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      ariaLabel: PropTypes.string,
      id: PropTypes.string,
      isHome: PropTypes.bool,
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
  handleBreadcrumbClick: PropTypes.func.isRequired,
  separator: PropTypes.string.isRequired,
  shouldRender: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired,
};
