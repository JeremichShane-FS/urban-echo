/**
 * @fileoverview Centralized application provider wrapper that combines all core providers
 * Provides a single entry point for wrapping the entire application with necessary context providers
 * Currently includes React Query provider with plans for future provider additions (auth, theme, etc.)
 * Maintains clean provider composition and enables easy addition of new application-wide providers
 */

import PropTypes from "prop-types";

import { QueryProvider } from "@modules/core/providers";

/**
 * Central application provider component that wraps all necessary providers
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Application components to wrap with providers
 * @returns {JSX.Element} Composed provider wrapper with all application-wide context providers
 */
const AppProviders = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

AppProviders.displayName = "AppProviders";

export default AppProviders;
