/**
 * @fileoverview Custom hook for managing menu toggle state and interactions
 * Provides optimized toggle functionality with memoized handlers for performance
 * Encapsulates menu state logic for reusable menu toggle behavior across components
 */

import { useCallback } from "react";

/**
 * Hook for handling menu toggle functionality with memoized toggle handler
 * @hook
 * @param {boolean} isOpen - Current open state of the menu
 * @param {Function} setIsOpen - State setter function for menu open state
 * @returns {Object} Object containing toggle handler function
 *
 * @example
 * // Basic usage in component
 * const [isMenuOpen, setIsMenuOpen] = useState(false);
 * const { handleToggle } = useMenuToggle(isMenuOpen, setIsMenuOpen);
 *
 * <button onClick={handleToggle}>
 *   {isMenuOpen ? 'Close' : 'Open'} Menu
 * </button>
 *
 * @example
 * // With keyboard event handling
 * const MenuComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const { handleToggle } = useMenuToggle(isOpen, setIsOpen);
 *
 *   const handleKeyDown = (e) => {
 *     if (e.key === 'Escape' && isOpen) {
 *       handleToggle();
 *     }
 *   };
 *
 *   useEffect(() => {
 *     document.addEventListener('keydown', handleKeyDown);
 *     return () => document.removeEventListener('keydown', handleKeyDown);
 *   }, [isOpen]);
 * };
 *
 * @example
 * // Custom toggle logic extension
 * const useAdvancedMenuToggle = (isOpen, setIsOpen) => {
 *   const { handleToggle } = useMenuToggle(isOpen, setIsOpen);
 *
 *   const handleToggleWithAnalytics = useCallback(() => {
 *     // Track menu interaction
 *     analytics.track('menu_toggled', { isOpen: !isOpen });
 *     handleToggle();
 *   }, [handleToggle, isOpen]);
 *
 *   return { handleToggle: handleToggleWithAnalytics };
 * };
 */
const useMenuToggle = (isOpen, setIsOpen) => {
  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return { handleToggle };
};

export default useMenuToggle;
