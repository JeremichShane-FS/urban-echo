import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import PropTypes from "prop-types";

import { ACCOUNT_NAV_ITEMS } from "@config/constants";
import { getNavItemsByIds } from "@modules/core/utils/getNavItems";

import styles from "./ActionIcons.module.scss";

const ActionIconsView = ({ cartCount = 0, isSearchOpen, toggleSearch }) => {
  const navItems = getNavItemsByIds(["account", "cart"], ACCOUNT_NAV_ITEMS);

  return (
    <>
      <button
        type="button"
        className={`${styles.button} ${styles["button--search"]}`}
        aria-expanded={isSearchOpen}
        aria-controls="search-panel"
        aria-label="Search"
        onClick={toggleSearch}>
        <Search className="h-6 w-6" aria-hidden="true" />
      </button>

      <Link href={navItems[0].path} className={styles.button} aria-label={navItems[0].ariaLabel}>
        <User className="h-6 w-6" aria-hidden="true" />
      </Link>

      <Link
        href={navItems[1].path}
        className={`${styles.button} ${styles["button--cart"]}`}
        aria-label={navItems[1].getAriaLabel(cartCount)}>
        <ShoppingBag className="h-6 w-6" aria-hidden="true" />
        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
      </Link>
    </>
  );
};

export default ActionIconsView;

ActionIconsView.displayName = "ActionIconsView";
ActionIconsView.propTypes = {
  cartCount: PropTypes.number,
  isSearchOpen: PropTypes.bool.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};
