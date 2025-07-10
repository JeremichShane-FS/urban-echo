/**
 * @fileoverview Presentational component for action icons layout with accessibility and interactive states
 * Handles search button with ARIA expanded state, account link, and cart link with item count badge
 * Provides keyboard navigation support and proper ARIA labels for screen reader accessibility
 */

import PropTypes from "prop-types";

/**
 * View component for rendering header action icons with proper accessibility attributes
 * @component
 * @param {React.ComponentType} Link - Next.js Link component for client-side navigation
 * @param {React.ComponentType} SearchIcon - Lucide React search icon component
 * @param {React.ComponentType} ShoppingBagIcon - Lucide React shopping bag icon component
 * @param {React.ComponentType} UserIcon - Lucide React user icon component
 * @param {number} [cartCount=0] - Number of items in shopping cart for badge display
 * @param {boolean} isSearchOpen - Whether the search panel is currently expanded
 * @param {Array<Object>} navItems - Navigation items data for account and cart links
 * @param {Object} styles - CSS module styles object for component styling
 * @param {Function} toggleSearch - Function to toggle search panel visibility
 * @returns {JSX.Element} Rendered action icons with interactive buttons and navigation links
 */
const ActionIconsView = ({
  Link,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  cartCount = 0,
  isSearchOpen,
  navItems,
  styles,
  toggleSearch,
}) => {
  return (
    <>
      <button
        aria-controls="search-panel"
        aria-expanded={isSearchOpen}
        aria-label="Search"
        className={`${styles.button} ${styles["button--search"]}`}
        type="button"
        onClick={toggleSearch}>
        <SearchIcon aria-hidden="true" className="h-6 w-6" />
      </button>

      <Link aria-label={navItems[0].ariaLabel} className={styles.button} href={navItems[0].path}>
        <UserIcon aria-hidden="true" className="h-6 w-6" />
      </Link>

      <Link
        aria-label={navItems[1].getAriaLabel(cartCount)}
        className={`${styles.button} ${styles["button--cart"]}`}
        href={navItems[1].path}>
        <ShoppingBagIcon aria-hidden="true" className="h-6 w-6" />
        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
      </Link>
    </>
  );
};

export default ActionIconsView;

ActionIconsView.displayName = "ActionIconsView";
ActionIconsView.propTypes = {
  Link: PropTypes.elementType.isRequired,
  SearchIcon: PropTypes.elementType.isRequired,
  ShoppingBagIcon: PropTypes.elementType.isRequired,
  UserIcon: PropTypes.elementType.isRequired,
  cartCount: PropTypes.number,
  isSearchOpen: PropTypes.bool.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      ariaLabel: PropTypes.string.isRequired,
      getAriaLabel: PropTypes.func.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  styles: PropTypes.object.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};
