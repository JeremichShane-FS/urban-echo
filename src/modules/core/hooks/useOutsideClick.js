/**
 * @fileoverview Custom hook for detecting clicks outside a specified element with event cleanup
 * Provides essential functionality for dropdowns, modals, tooltips, and other overlay components
 * Automatically handles event listener cleanup to prevent memory leaks and performance issues
 */

/**
 * Custom hook for detecting clicks outside a specified element
 * @param {React.RefObject} ref - The ref object of the element to monitor for outside clicks
 * @param {Function} handler - The callback function to execute when an outside click is detected
 *
 * @description
 * This hook attaches a mousedown event listener to the document and checks if the click target
 * is outside the referenced element. When an outside click is detected, it calls the handler function.
 * The event listener is automatically cleaned up when the component unmounts or dependencies change.
 *
 * @example
 * const dropdownRef = useRef();
 * const [isOpen, setIsOpen] = useState(false);
 *
 * useOutsideClick(dropdownRef, () => {
 *   setIsOpen(false);
 * });
 *
 * return (
 *   <div ref={dropdownRef}>
 *     <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
 *     {isOpen && <DropdownMenu />}
 *   </div>
 * );
 *
 * @example
 * // Modal close on outside click
 * const modalRef = useRef();
 * useOutsideClick(modalRef, () => {
 *   closeModal();
 * });
 */
import { useEffect } from "react";

export const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};
