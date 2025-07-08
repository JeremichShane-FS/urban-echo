/**
 * @fileoverview Custom hook for detecting clicks outside a specified element.
 * This hook triggers a callback when a click occurs outside the referenced element.
 * @param {Object} ref - The ref of the element to monitor for outside clicks.
 * @param {Function} callback - The function to call when an outside click is detected.
 * @example
 * const ref = useRef();
 * useOutsideClick(ref, () => {
 *   console.log("Clicked outside!");
 * });
 * This will log "Clicked outside!" whenever a click occurs outside the element referenced by `ref
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
