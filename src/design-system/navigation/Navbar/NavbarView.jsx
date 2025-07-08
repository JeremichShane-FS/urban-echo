import { memo } from "react";
import PropTypes from "prop-types";

const NavbarView = ({
  ActionIcons,
  Container,
  Link,
  MenuToggle,
  MobileMenu,
  NavLinks,
  Searchbar,
  UrbanEchoLogo,
  isMenuOpen,
  isSearchOpen,
  navLink,
  searchbarRef,
  styles,
  toggleMenu,
  toggleSearch,
}) => {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.inner}>
        <Container>
          <div className={styles.content}>
            <div className={styles.brand}>
              <MenuToggle isOpen={isMenuOpen} setIsOpen={toggleMenu} />
              <Link href={navLink.path} className={styles.logo} aria-label={navLink["aria-label"]}>
                <UrbanEchoLogo />
              </Link>
            </div>

            <div className={styles.navigation} role="navigation" aria-label="Main categories">
              <NavLinks />
            </div>

            <div className={styles.actions}>
              <ActionIcons isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} cartCount={2} />
            </div>
          </div>
        </Container>
      </div>

      <MobileMenu isOpen={isMenuOpen} />
      <Searchbar ref={searchbarRef} isOpen={isSearchOpen} />
    </nav>
  );
};

export default memo(NavbarView);

NavbarView.displayName = "NavbarView";
NavbarView.propTypes = {
  ActionIcons: PropTypes.elementType.isRequired,
  Container: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  MenuToggle: PropTypes.elementType.isRequired,
  MobileMenu: PropTypes.elementType.isRequired,
  NavLinks: PropTypes.elementType.isRequired,
  Searchbar: PropTypes.elementType.isRequired,
  UrbanEchoLogo: PropTypes.elementType.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  navLink: PropTypes.shape({
    "aria-label": PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  searchbarRef: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};
