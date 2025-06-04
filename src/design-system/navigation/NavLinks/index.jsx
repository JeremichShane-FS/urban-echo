import NavLinksView from "./NavLinksView";
import useNavLinks from "./useNavLinks";

const NavLinks = ({ isMobile = false }) => {
  const { navItems } = useNavLinks();

  return <NavLinksView isMobile={isMobile} navItems={navItems} />;
};

export default NavLinks;
