import Link from "next/link";

import styles from "./NavLinks.module.scss";

const NavLinksView = ({ isMobile = false, navItems }) => {
  const baseClass = isMobile ? styles["nav-links__mobile-menu-item"] : styles["nav-links__item"];
  const saleClass = isMobile
    ? styles["nav-links__mobile-menu-sale-item"]
    : styles["nav-links__sale-item"];

  return (
    <>
      {navItems.slice(1).map(navItem => {
        const { highlight, id, label, path } = navItem;
        const className = highlight ? saleClass : baseClass;

        return (
          <Link key={id} href={path} className={className}>
            {label}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinksView;
