"use client";

import FooterView from "./FooterView";
import { useFooter } from "./useFooter";

const Footer = () => {
  const footerProps = useFooter();

  return <FooterView {...footerProps} />;
};

export default Footer;
