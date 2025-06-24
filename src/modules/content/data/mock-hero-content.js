import { CONTENT_CATEGORIES, CONTENT_STATUS } from "@config/constants/content-constants";
import ROUTES from "@config/routes";

export const heroContent = {
  title: "Discover Your Urban Style",
  subtitle: "Trendy, high-quality clothing for the modern, fashion-conscious consumer",
  ctaText: "Shop Now",
  ctaLink: ROUTES.SHOP,
  backgroundImage:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  lastUpdated: new Date().toISOString(),
  publishedBy: "Urban Echo Team",
  version: "1.0",
  status: CONTENT_STATUS.PUBLISHED,
  category: CONTENT_CATEGORIES.BANNER,

  // A/B testing variants for future use
  variants: [
    {
      id: "default",
      title: "Discover Your Urban Style",
      subtitle: "Trendy, high-quality clothing for the modern, fashion-conscious consumer",
    },
    {
      id: "seasonal",
      title: "Fall into Fashion",
      subtitle: "Embrace the season with our latest collection of autumn essentials",
    },
    {
      id: "sale",
      title: "Urban Style, Unbeatable Prices",
      subtitle: "Save up to 50% on selected items. Limited time offer.",
    },
  ],

  // Seasonal campaign support
  campaign: {
    active: false,
    name: null,
    startDate: null,
    endDate: null,
  },
};
