/**
 * @fileoverview Urban Echo - E-commerce Clothing Platform
 * @copyright Copyright (c) 2025 Shane Jeremich / Urban Echo. All rights reserved.
 * @license Portfolio Display Only
 *
 * This file is part of the Urban Echo portfolio demonstration project.
 *
 * Permitted Use:
 * - View for educational and learning purposes
 * - Review for employment evaluation
 * - Study architecture and implementation patterns
 *
 * Prohibited Use:
 * - Commercial use or deployment
 * - Distribution or redistribution
 * - Incorporation into other projects
 * - Modification for redistribution
 *
 * Urban Echo demonstrates professional full-stack development capabilities
 * including modern React/Next.js architecture, e-commerce implementation,
 * and integration with enterprise services (Auth0, Stripe, MongoDB).
 *
 * For licensing inquiries: hello@shanejeremich.com
 * Portfolio: shanejeremich.com
 */

import PropTypes from "prop-types";

import { montserrat, openSans } from "@config/fonts";
import { defaultMetadata } from "@config/seo";
import Container from "@design-system/layout/Container";
import Footer from "@design-system/layout/Footer";
import Navbar from "@design-system/navigation/Navbar";
import { QueryProvider } from "@modules/core/providers";
import AppProviders from "@modules/core/providers/app-provider";

import "@styles/globals.css";
import "@styles/main.scss";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#333333",
};

export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="min-h-screen grid grid-rows-[auto_1fr_auto]" suppressHydrationWarning={true}>
        <AppProviders>
          <header>
            <Navbar />
          </header>
          <main>
            <Container>{children}</Container>
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
