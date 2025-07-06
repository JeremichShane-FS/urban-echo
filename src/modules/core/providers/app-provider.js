/**
 * @fileoverview Centralized provider wrapper for the entire application
 * This component combines all necessary providers in the correct order to ensure
 * proper context flow throughout the application. Providers are arranged with
 * data providers at the top level and UI providers nested within.
 *
 * @component AppProviders
 * @description Wraps the entire application with all necessary React context providers.
 * Currently includes QueryProvider for data fetching and caching. Future providers
 * like Auth, Theme, Toast, and I18n will be added here as the application grows.
 *
 * @example
 * Usage in layout
 * import AppProviders from '@/modules/core/providers/app-providers';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <AppProviders>
 *           {children}
 *         </AppProviders>
 *       </body>
 *     </html>
 *   );
 * }
 */

"use client";

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
