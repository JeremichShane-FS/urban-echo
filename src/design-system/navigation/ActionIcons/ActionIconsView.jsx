import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

import { getNavItemsByIds } from "@modules/core/utils/getNavItems";

import { ACCOUNT_NAV_ITEMS } from "@config/constants";

import styles from "./ActionIcons.module.scss";

const ActionIconsView = ({ cartCount = 0, isSearchOpen, toggleSearch }) => {
  const navItems = getNavItemsByIds(["account", "cart"], ACCOUNT_NAV_ITEMS);

  return (
    <>
      <button
        type="button"
        className={`${styles["action-icons__button"]} ${styles["action-icons__button--search"]}`}
        onClick={toggleSearch}
        aria-expanded={isSearchOpen}
        aria-controls="search-panel"
        aria-label="Search">
        <Search className="h-6 w-6" aria-hidden="true" />
      </button>

      <Link
        href={navItems[0].path}
        className={styles["action-icons__button"]}
        aria-label={navItems[0].ariaLabel}>
        <User className="h-6 w-6" aria-hidden="true" />
      </Link>

      <Link
        href={navItems[1].path}
        className={`${styles["action-icons__button"]} ${styles["action-icons__button--cart"]}`}
        aria-label={navItems[1].getAriaLabel(cartCount)}>
        <ShoppingBag className="h-6 w-6" aria-hidden="true" />
        {cartCount > 0 && <span className={styles["action-icons__cart-count"]}>{cartCount}</span>}
      </Link>
    </>
  );
};

export default ActionIconsView;
