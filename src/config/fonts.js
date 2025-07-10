/**
 * @fileoverview Font configuration for Next.js local fonts with performance optimization and typography hierarchy
 * Configures Montserrat for headings and UI elements, Open Sans for body text and readability
 * Implements font loading strategies, preloading optimization, and Core Web Vitals performance enhancement
 */

import localFont from "next/font/local";

// =================================================================
// HEADING FONT CONFIGURATION
// =================================================================

/**
 * Montserrat font family configuration with multiple weights for headings, navigation, and UI elements
 * @constant {import('next/font/local').LocalFont} montserrat - Montserrat font configuration object
 *
 * @example
 * // Apply Montserrat font in CSS modules or styled-components
 * .heading {
 *   font-family: var(--font-montserrat);
 *   font-weight: 600;
 *   font-size: 2rem;
 * }
 *
 * @example
 * // Use in className for Next.js body element
 * <body className={`${montserrat.variable} ${openSans.variable}`}>
 *
 * @example
 * // Tailwind CSS configuration integration
 * module.exports = {
 *   theme: {
 *     extend: {
 *       fontFamily: {
 *         heading: ['var(--font-montserrat)', 'sans-serif'],
 *         sans: ['var(--font-montserrat)', 'Arial', 'sans-serif'],
 *       }
 *     }
 *   }
 * }
 *
 * @example
 * // Component usage with different Montserrat weights
 *   <h1 className="font-bold text-4xl">Bold Main Heading</h1>
 *   <h2 className="font-semibold text-2xl">Semibold Subheading</h2>
 *   <h3 className="font-medium text-xl">Medium Section Title</h3>
 */
export const montserrat = localFont({
  variable: "--font-montserrat",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/montserrat/montserrat-regular.woff2",
      weight: "400",
      style: "normal",
      preload: true,
    },
    {
      path: "../../public/fonts/montserrat/montserrat-500.woff2",
      weight: "500",
      style: "normal",
      preload: false,
    },
    {
      path: "../../public/fonts/montserrat/montserrat-600.woff2",
      weight: "600",
      style: "normal",
      preload: false,
    },
    {
      path: "../../public/fonts/montserrat/montserrat-700.woff2",
      weight: "700",
      style: "normal",
      preload: false,
    },
  ],
});

// =================================================================
// BODY TEXT FONT CONFIGURATION
// =================================================================

/**
 * Open Sans font family configuration optimized for body text, readability, and accessibility
 * @constant {import('next/font/local').LocalFont} openSans - Open Sans font configuration object
 *
 * @example
 * // Apply Open Sans font for body content and paragraphs
 * .body-text {
 *   font-family: var(--font-open-sans);
 *   font-weight: 400;
 * }
 *
 * @example
 * // Combine both fonts in root layout component
 * <body className={`${montserrat.variable} ${openSans.variable} antialiased`}>
 *
 *
 * @example
 * // Typography system usage with Open Sans weights
 * <div className="font-body text-base">Regular body text</div>
 * <div className="font-body font-medium text-lg">Medium body text</div>
 * <div className="font-body font-semibold text-xl">Semibold body text</div>
 */
export const openSans = localFont({
  variable: "--font-open-sans",
  display: "swap",
  preload: true,
  src: [
    {
      path: "../../public/fonts/open-sans/open-sans-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/open-sans/open-sans-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/open-sans/open-sans-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});
