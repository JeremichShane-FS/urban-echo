"use client";
import { useToggle } from "@modules/core/hooks";

import NavbarView from "./NavbarView";

const Navbar = () => {
  const { handleMenuToggle, handleSearchToggle, isMenuOpen, isSearchOpen } = useToggle(false);

  return (
    <NavbarView
      isMenuOpen={isMenuOpen}
      isSearchOpen={isSearchOpen}
      toggleMenu={handleMenuToggle}
      toggleSearch={handleSearchToggle}
    />
  );
};

export default Navbar;

Navbar.displayName = "Navbar";
Navbar.View = NavbarView;
Navbar.useNavbar = useToggle;
