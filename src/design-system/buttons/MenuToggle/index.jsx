/**
 * @fileoverview Menu toggle button component for mobile navigation and sidebar controls
 * Provides hamburger menu functionality with animated state transitions and accessibility support
 * Integrates with custom hook for state management and supports icon customization
 */

import { Menu, X } from "lucide-react";
import PropTypes from "prop-types";

import MenuToggleView from "./MenuToggleView";
import useMenuToggle from "./useMenuToggle";

import styles from "./MenuToggle.module.scss";

/**
 * Interactive menu toggle button with hamburger/close icon animation
 * @component
 * @param {boolean} isOpen - Current open state of the menu
 * @param {Function} setIsOpen - State setter function for menu open state
 * @returns {JSX.Element} Rendered menu toggle component
 */
const MenuToggle = ({ isOpen, setIsOpen }) => {
  const { handleToggle } = useMenuToggle(isOpen, setIsOpen);

  return (
    <MenuToggleView
      isOpen={isOpen}
      styles={styles}
      MenuIcon={Menu}
      CloseIcon={X}
      onToggle={handleToggle}
    />
  );
};

export default MenuToggle;

MenuToggle.displayName = "MenuToggle";
MenuToggle.View = MenuToggleView;
MenuToggle.useMenuToggle = useMenuToggle;
MenuToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
