import PropTypes from "prop-types";

import { montserrat, openSans } from "@config/fonts";
import { defaultMetadata } from "@config/seo";
import Container from "@design-system/layout/Container";
import Footer from "@design-system/layout/Footer";
import Navbar from "@design-system/navigation/Navbar";
import QueryProvider from "@lib/providers/query-provider";

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
        <QueryProvider>
          <header>
            <Navbar />
          </header>
          <main>
            <Container>{children}</Container>
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
