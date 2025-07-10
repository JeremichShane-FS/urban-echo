/**
 * @fileoverview Custom hook for managing navbar state including menu and search toggle functionality
 * Provides coordinated state management ensuring only one overlay (menu or search) is open at a time
 * Integrates with outside click detection for automatic overlay closing and optimal user experience
 */

import { useCallback, useRef } from "react";

import { useToggle } from "@modules/core/hooks";
import { useOutsideClick } from "@modules/core/hooks/useOutsideClick";

/**
 * Hook for managing navbar state with coordinated menu and search overlay controls
 * @hook
 * @returns {Object} Navbar state management and interaction handlers
 * @returns {boolean} returns.isMenuOpen - Whether the mobile menu is currently visible
 * @returns {boolean} returns.isSearchOpen - Whether the search panel is currently visible
 * @returns {Function} returns.handleMenuToggle - Memoized function to toggle mobile menu visibility
 * @returns {Function} returns.handleSearchToggle - Memoized function to toggle search panel visibility
 * @returns {React.RefObject} returns.searchbarRef - Ref object for search component outside click detection
 */
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
