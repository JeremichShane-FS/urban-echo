import PropTypes from "prop-types";

const NavLinksView = ({
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Button,
  Link,
  baseClass,
  navItems,
  styles,
}) => {
  return (
    <>
      {navItems.slice(1).map(navItem => {
        const { highlight, id, label, path } = navItem;

        if (highlight) {
          return (
            <Link key={id} href={path}>
              <Button
                variant={BUTTON_VARIANTS.accent}
                size={BUTTON_SIZES.sm}
                className={styles.button}>
                {label}
              </Button>
            </Link>
          );
        }

        return (
          <Link key={id} href={path} className={baseClass}>
            {label}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinksView;

NavLinksView.displayName = "NavLinksView";
NavLinksView.propTypes = {
  BUTTON_SIZES: PropTypes.object.isRequired,
  BUTTON_VARIANTS: PropTypes.object.isRequired,
  Button: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  baseClass: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  styles: PropTypes.object.isRequired,
};
