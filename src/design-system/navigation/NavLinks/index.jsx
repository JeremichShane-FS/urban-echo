import PropTypes from "prop-types";

import NavLinksView from "./NavLinksView";
import useNavLinks from "./useNavLinks";

const NavLinks = ({ isMobile = false }) => {
  const { navItems } = useNavLinks();

  return <NavLinksView isMobile={isMobile} navItems={navItems} />;
};

export default NavLinks;

NavLinks.displayName = "NavLinks";
NavLinks.View = NavLinksView;
NavLinks.useNavLinks = useNavLinks;
NavLinks.propTypes = {
  isMobile: PropTypes.bool,
};
