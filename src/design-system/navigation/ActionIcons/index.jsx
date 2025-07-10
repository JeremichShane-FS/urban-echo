/**
 * @fileoverview Action icons component for header navigation with search, account, and cart functionality
 * Provides interactive icon buttons for core e-commerce actions including search toggle and cart display
 * Integrates with Lucide React icons and navigation utilities for consistent header interaction patterns
 */

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import PropTypes from "prop-types";

import { ACCOUNT_NAV_ITEMS } from "@config/constants";
import { getNavItemsByIds } from "@modules/core/utils";

import ActionIconsView from "./ActionIconsView";

import styles from "./ActionIcons.module.scss";

/**
 * Container component for header action icons with search toggle and cart count display
 * @component
 * @param {number} [cartCount=0] - Number of items in shopping cart for badge display
 * @param {boolean} isSearchOpen - Whether the search panel is currently open/visible
 * @param {Function} toggleSearch - Function to toggle search panel visibility
 * @returns {JSX.Element} Rendered action icons group with search, account, and cart buttons
 */
const ActionIcons = ({ cartCount = 0, isSearchOpen, toggleSearch }) => {
  return (
    <ActionIconsView
      isSearchOpen={isSearchOpen}
      toggleSearch={toggleSearch}
      cartCount={cartCount}
      styles={styles}
      SearchIcon={Search}
      ShoppingBagIcon={ShoppingBag}
      UserIcon={User}
      navItems={getNavItemsByIds(["account", "cart"], ACCOUNT_NAV_ITEMS)}
      Link={Link}
    />
  );
};

export default ActionIcons;

ActionIcons.displayName = "ActionIcons";
ActionIcons.View = ActionIconsView;
ActionIcons.propTypes = {
  cartCount: PropTypes.number,
  isSearchOpen: PropTypes.bool,
  toggleSearch: PropTypes.func.isRequired,
};
