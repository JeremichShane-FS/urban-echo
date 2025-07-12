/**
 * @fileoverview Custom hook for managing boolean toggle state with multiple control functions
 * Provides optimized toggle functionality for UI components like modals, dropdowns, and visibility controls
 * Uses useCallback for performance optimization to prevent unnecessary re-renders in child components
 */

import { useCallback, useState } from "react";

/**
 * Custom hook to manage a boolean toggle state with multiple control functions
 * @hook
 * @param {boolean} [initialState=false] - The initial state of the toggle
 * @returns {Array} Array containing current state and control functions
 * @returns {boolean} returns[0] - Current boolean state
 * @returns {Function} returns[1] - Toggle function that flips the current state
 * @returns {Function} returns[2] - SetTrue function that explicitly sets state to true
 * @returns {Function} returns[3] - SetFalse function that explicitly sets state to false
 *
 * @example
 * const [isOpen, toggle, setTrue, setFalse] = useToggle(false);
 * // isOpen: false
 * // toggle(): toggles between true/false
 * // setTrue(): explicitly sets to true
 * // setFalse(): explicitly sets to false
 *
 * @example
 * // Modal visibility control
 * const [isModalOpen, toggleModal, openModal, closeModal] = useToggle();
 * return (
 *   <>
 *     <button onClick={openModal}>Open Modal</button>
 *     <Modal isOpen={isModalOpen} onClose={closeModal} />
 *   </>
 * );
 */
export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  return [state, toggle, setTrue, setFalse];
};
