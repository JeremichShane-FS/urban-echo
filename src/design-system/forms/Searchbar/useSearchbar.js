import { useCallback } from "react";

const useSearchbar = () => {
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    // TODO: Add Search logic
    // for now its just a placeholder
  }, []);

  return { handleSubmit };
};

export default useSearchbar;
