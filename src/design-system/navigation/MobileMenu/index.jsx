/**
 * @fileoverview Mobile menu component for responsive navigation on smaller screens
 * Provides collapsible navigation menu with slide-in animation and overlay functionality
 * Integrates with NavLinks component for consistent navigation structure across mobile and desktop
 */

import PropTypes from "prop-types";

import NavLinks from "@design-system/navigation/NavLinks";

import MobileMenuView from "./MobileMenuView";

import styles from "./MobileMenu.module.scss";

/**
 * Container component for mobile navigation menu with visibility state management
 * @component
 * @param {boolean} isOpen - Whether the mobile menu is currently visible/expanded
 * @returns {JSX.Element} Rendered mobile menu with navigation links and responsive styling
 */
const MobileMenu = ({ isOpen }) => {
  return <MobileMenuView NavLinks={NavLinks} isOpen={isOpen} styles={styles} />;
};

export default MobileMenu;

MobileMenu.displayName = "MobileMenu";
MobileMenu.View = MobileMenuView;
MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
