import { useCallback, useRef } from "react";

import { useToggle } from "@modules/core/hooks";
import { useOutsideClick } from "@modules/core/hooks/useOutsideClick";

const useNavbar = () => {
  const [isMenuOpen, toggleMenu, , closeMenu] = useToggle(false);
  const [isSearchOpen, toggleSearch, , closeSearch] = useToggle(false);

  const searchbarRef = useRef(null);

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

  useOutsideClick(
    searchbarRef,
    useCallback(() => {
      if (isSearchOpen) {
        closeSearch();
      }
    }, [isSearchOpen, closeSearch])
  );

  return {
    isMenuOpen,
    isSearchOpen,
    handleMenuToggle,
    handleSearchToggle,
    searchbarRef,
  };
};

export default useNavbar;
