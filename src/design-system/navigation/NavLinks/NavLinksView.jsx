/**
 * @fileoverview Presentational component for navigation links layout with conditional button rendering
 * Handles navigation item display with special treatment for highlighted promotional items
 * Provides consistent link styling and integrates button components for call-to-action navigation items
 */

import PropTypes from "prop-types";

/**
 * View component for rendering navigation links with conditional highlighting and button integration
 * @component
 * @param {Object} BUTTON_SIZES - Button size constants for consistent button styling
 * @param {Object} BUTTON_VARIANTS - Button variant constants for consistent button styling
 * @param {React.ComponentType} Button - Button component for highlighted navigation items
 * @param {React.ComponentType} Link - Next.js Link component for client-side navigation
 * @param {string} baseClass - CSS class for navigation item styling (mobile or desktop variant)
 * @param {Array<Object>} navItems - Navigation items data array with labels, paths, and highlight flags
 * @param {Object} styles - CSS module styles object for component styling
 * @returns {JSX.Element} Rendered navigation links with conditional button styling for highlighted items
 */
const NavLinksView = ({
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Button,
  Link,
  baseClass,
  navItems,
  styles,
}) => {
  return (
    <>
      {navItems.slice(1).map(navItem => {
        const { highlight, id, label, path } = navItem;

        if (highlight) {
          return (
            <Link key={id} href={path}>
              <Button
                variant={BUTTON_VARIANTS.accent}
                size={BUTTON_SIZES.sm}
                className={styles.button}>
                {label}
              </Button>
            </Link>
          );
        }

        return (
          <Link key={id} href={path} className={baseClass}>
            {label}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinksView;

NavLinksView.displayName = "NavLinksView";
NavLinksView.propTypes = {
  BUTTON_SIZES: PropTypes.object.isRequired,
  BUTTON_VARIANTS: PropTypes.object.isRequired,
  Button: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  baseClass: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  styles: PropTypes.object.isRequired,
};
