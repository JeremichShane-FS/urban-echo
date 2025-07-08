import PropTypes from "prop-types";

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
        type="button"
        className={`${styles.button} ${styles["button--search"]}`}
        aria-expanded={isSearchOpen}
        aria-controls="search-panel"
        aria-label="Search"
        onClick={toggleSearch}>
        <SearchIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      <Link href={navItems[0].path} className={styles.button} aria-label={navItems[0].ariaLabel}>
        <UserIcon className="h-6 w-6" aria-hidden="true" />
      </Link>

      <Link
        href={navItems[1].path}
        className={`${styles.button} ${styles["button--cart"]}`}
        aria-label={navItems[1].getAriaLabel(cartCount)}>
        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
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
