import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import PropTypes from "prop-types";

import { ACCOUNT_NAV_ITEMS } from "@config/constants";
import { getNavItemsByIds } from "@modules/core/utils";

import ActionIconsView from "./ActionIconsView";

import styles from "./ActionIcons.module.scss";

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
