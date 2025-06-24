import PropTypes from "prop-types";

import MobileMenuView from "./MobileMenuView";

const MobileMenu = ({ isOpen }) => {
  return <MobileMenuView isOpen={isOpen} />;
};

export default MobileMenu;

MobileMenu.displayName = "MobileMenu";
MobileMenu.View = MobileMenuView;
MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
