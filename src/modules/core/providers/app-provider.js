/**
 * @fileoverview Centralized provider wrapper for the entire application
 */

import PropTypes from "prop-types";

import { QueryProvider } from "@modules/core/providers";

const AppProviders = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

AppProviders.displayName = "AppProviders";

export default AppProviders;
