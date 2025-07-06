import PropTypes from "prop-types";

import MenuToggleView from "./MenuToggleView";
import useMenuToggle from "./useMenuToggle";

const MenuToggle = ({ isOpen, setIsOpen }) => {
  const { handleToggle } = useMenuToggle(isOpen, setIsOpen);

  return <MenuToggleView isOpen={isOpen} onToggle={handleToggle} />;
};

export default MenuToggle;

MenuToggle.displayName = "MenuToggle";
MenuToggle.View = MenuToggleView;
MenuToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
