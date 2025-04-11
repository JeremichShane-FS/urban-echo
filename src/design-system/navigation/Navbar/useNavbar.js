import { useCallback } from "react";
import useToggle from "@modules/core/hooks/useToggle";

const useNavbar = () => {
  const [isMenuOpen, toggleMenu, , closeMenu] = useToggle(false);
  const [isSearchOpen, toggleSearch, , closeSearch] = useToggle(false);

  const handleMenuToggle = useCallback(() => {
    toggleMenu();
    if (!isMenuOpen && isSearchOpen) {
      closeSearch();
    }
  }, [isMenuOpen, isSearchOpen, toggleMenu, closeSearch]);

  const handleSearchToggle = useCallback(() => {
    toggleSearch();
    if (!isSearchOpen && isMenuOpen) {
      closeMenu();
    }
  }, [isSearchOpen, isMenuOpen, toggleSearch, closeMenu]);

  return {
    isMenuOpen,
    isSearchOpen,
    handleMenuToggle,
    handleSearchToggle,
  };
};

export default useNavbar;
