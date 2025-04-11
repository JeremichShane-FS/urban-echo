import { montserrat, openSans } from "@config/fonts";
import Container from "@design-system/layout/Container";
import Footer from "@design-system/layout/Footer";
import Navbar from "@design-system/navigation/Navbar";

import "@assets/styles/main.scss";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#333333",
};

export const metadata = {
  title: "Urban Echo | Modern Fashion E-Commerce",
  description:
    "Discover trendy, high-quality clothing at Urban Echo. Shop our curated collection of contemporary fashion for the modern, fashion-conscious consumer. Secure checkout, fast shipping, and exceptional customer service.",
  keywords: "fashion, clothing, urban style, modern apparel, online shopping, e-commerce",
  authors: [{ name: "Shane Jeremich", url: "https://shanejeremich.com" }],
  creator: "Shane Jeremich",
  publisher: "Urban Echo",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico" }, //TODO: add my favicon.ico with correct path
      { url: "/icon.svg", type: "image/svg+xml" }, //TODO: Create and add this SVG to your public folder
    ],
    apple: [
      { url: "/apple-icon.png" }, //TODO: Create and add this image to your public folder
    ],
  },
  openGraph: {
    type: "website",
    url: "https://shopurbanecho.com",
    title: "Urban Echo | Modern Fashion E-Commerce",
    description:
      "Discover trendy, high-quality clothing at Urban Echo. Shop our curated collection of contemporary fashion.",
    siteName: "Urban Echo",
    images: [
      {
        url: "https://shopurbanecho.com/og-image.jpg", //TODO: Create and host this social sharing image
        width: 1200,
        height: 630,
        alt: "Urban Echo - Modern Fashion E-Commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopurbanecho",
    creator: "@shanejeremich",
    title: "Urban Echo | Modern Fashion E-Commerce",
    description: "Discover trendy, high-quality clothing at Urban Echo.",
    images: ["https://shopurbanecho.com/twitter-image.jpg"], //TODO: Create and host this Twitter card image
  },
  alternates: {
    canonical: "https://shopurbanecho.com",
    languages: {
      "en-US": "https://shopurbanecho.com",
    },
  },
  // verification: {
  //   google: "google-site-verification-code", //TODO: Add Google verification code
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
        <header>
          <Navbar />
        </header>
        <main>
          <Container>{children}</Container>
        </main>
        <footer>
          <Container>
            <Footer />
          </Container>
        </footer>
      </body>
    </html>
  );
}
