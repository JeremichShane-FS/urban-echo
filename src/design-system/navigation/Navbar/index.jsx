/**
 * @fileoverview Main navigation component providing responsive header with menu toggle and search functionality
 * Integrates multiple navigation elements including logo, main navigation, mobile menu, and search interface
 * Provides cohesive header experience with state management for mobile and desktop navigation patterns
 */

"use client";
import Link from "next/link";

import UrbanEchoLogo from "@assets/images/logo/UrbanEchoLogo";
import { MAIN_NAV_ITEMS } from "@config/constants";
import { MenuToggle } from "@design-system/buttons";
import Searchbar from "@design-system/forms/Searchbar";
import Container from "@design-system/layout/Container";
import ActionIcons from "@design-system/navigation/ActionIcons";
import MobileMenu from "@design-system/navigation/MobileMenu";
import NavLinks from "@design-system/navigation/NavLinks";
import { getNavItemById } from "@modules/core/utils";

import NavbarView from "./NavbarView";
import useNavbar from "./useNavbar";

import styles from "./Navbar.module.scss";

/**
 * Container component for main navigation bar with responsive behavior and state management
 * @component
 * @returns {JSX.Element} Rendered navigation header with responsive menu toggles and search functionality
 */
const Navbar = () => {
  const { handleMenuToggle, handleSearchToggle, isMenuOpen, isSearchOpen, searchbarRef } =
    useNavbar();

  return (
    <NavbarView
      ActionIcons={ActionIcons}
      Container={Container}
      Link={Link}
      MenuToggle={MenuToggle}
      MobileMenu={MobileMenu}
      NavLinks={NavLinks}
      Searchbar={Searchbar}
      UrbanEchoLogo={UrbanEchoLogo}
      isMenuOpen={isMenuOpen}
      isSearchOpen={isSearchOpen}
      navLink={getNavItemById("home", MAIN_NAV_ITEMS)}
      searchbarRef={searchbarRef}
      styles={styles}
      toggleMenu={handleMenuToggle}
      toggleSearch={handleSearchToggle}
    />
  );
};

export default Navbar;

Navbar.displayName = "Navbar";
Navbar.View = NavbarView;
Navbar.useNavbar = useNavbar;
