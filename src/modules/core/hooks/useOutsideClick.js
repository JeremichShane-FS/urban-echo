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
import PropTypes from "prop-types";

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

useOutsideClick.propTypes = {
  ref: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  callback: PropTypes.func.isRequired,
};
