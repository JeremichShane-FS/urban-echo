import localFont from "next/font/local";

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
