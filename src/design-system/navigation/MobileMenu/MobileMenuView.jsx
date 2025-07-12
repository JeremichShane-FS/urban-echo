/**
 * @fileoverview Presentational component for mobile menu layout with slide animation and accessibility
 * Handles menu visibility states with proper ARIA attributes for screen reader accessibility
 * Provides responsive menu container with navigation links optimized for mobile touch interaction
 */

import PropTypes from "prop-types";

/**
 * View component for rendering mobile menu with visibility controls and navigation integration
 * @component
 * @param {React.ComponentType} NavLinks - Navigation links component for rendering menu items
 * @param {boolean} isOpen - Whether the mobile menu is currently visible/expanded
 * @param {Object} styles - CSS module styles object for component styling and animations
 * @returns {JSX.Element} Rendered mobile menu container with navigation links and accessibility attributes
 */
const MobileMenuView = ({ NavLinks, isOpen, styles }) => {
  return (
    <div
      aria-hidden={!isOpen}
      className={isOpen ? styles.menu : `${styles.menu} ${styles["menu--hidden"]}`}
      id="mobile-menu">
      <div className={styles.inner}>
        <NavLinks isMobile />
      </div>
    </div>
  );
};

export default MobileMenuView;

MobileMenuView.displayName = "MobileMenuView";
MobileMenuView.propTypes = {
  NavLinks: PropTypes.elementType.isRequired,
  isOpen: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired,
};
