import { useCallback, useState } from "react";

/**
 * Custom hook to manage a boolean toggle state
 * @param {boolean} initialState - The initial state of the toggle
 * @return {[boolean, Function, Function, Function]} - Returns the current state, toggle function, setTrue function, and setFalse function
 */
const useToggle = (initialState = false) => {
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

export default useToggle;
