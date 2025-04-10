import { useCallback } from "react";

const useSearchbar = () => {
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    // Search logic here
  }, []);

  return { handleSubmit };
};

export default useSearchbar;
