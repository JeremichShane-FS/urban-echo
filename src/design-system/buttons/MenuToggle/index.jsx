import MenuToggleView from "./MenuToggleView";
import useMenuToggle from "./useMenuToggle";

const MenuToggle = ({ isOpen, setIsOpen }) => {
  const { handleToggle } = useMenuToggle(isOpen, setIsOpen);

  return <MenuToggleView isOpen={isOpen} onToggle={handleToggle} />;
};

export default MenuToggle;
