"use client";
import useToggle from "@modules/core/hooks/useToggle";

import NavbarView from "./NavbarView";

const Navbar = () => {
  const [isMenuOpen, toggleMenu, , closeMenu] = useToggle(false);
  const [isSearchOpen, toggleSearch, , closeSearch] = useToggle(false);

  const handleMenuToggle = () => {
    toggleMenu();
    if (!isMenuOpen && isSearchOpen) {
      closeSearch();
    }
  };

  const handleSearchToggle = () => {
    toggleSearch();
    if (!isSearchOpen && isMenuOpen) {
      closeMenu();
    }
  };

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
