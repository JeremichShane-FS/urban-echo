import { useCallback } from "react";

const useMenuToggle = (isOpen, setIsOpen) => {
  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return { handleToggle };
};

export default useMenuToggle;
