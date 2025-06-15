import { useCallback } from "react";

const useSearchbar = () => {
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    // TODO: Search logic here
  }, []);

  return { handleSubmit };
};

export default useSearchbar;
