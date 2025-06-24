import { CONTENT_CATEGORIES, CONTENT_STATUS } from "@config/constants/content-constants";
import ROUTES from "@config/routes";

export const aboutContent = {
  title: "About Urban Echo",
  paragraphs: [
    "Urban Echo is your destination for contemporary fashion that speaks to the modern lifestyle. We curate high-quality clothing that combines style, comfort, and sustainability. Our mission is to help you express your unique personality through carefully selected pieces that echo your urban spirit and contemporary taste.",
    "From trendy streetwear to sophisticated business attire, we offer a diverse collection that caters to every aspect of your life. Discover fashion that not only looks good but feels good and does good for the world.",
  ],
  ctaText: "Learn More About Us",
  ctaLink: ROUTES.ABOUT,
  lastUpdated: new Date().toISOString(),
  publishedBy: "Urban Echo Team",
  version: "1.0",
  status: CONTENT_STATUS.PUBLISHED,
  category: CONTENT_CATEGORIES.PAGE,
};

export const aboutPageContent = {
  hero: {
    title: "Our Story",
    subtitle: "Where Urban Style Meets Timeless Quality",
    backgroundImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  },
  sections: [
    {
      id: "mission",
      title: "Our Mission",
      content:
        "To create fashion that speaks to the modern urban lifestyle while maintaining a commitment to sustainability and ethical production practices.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "values",
      title: "Our Values",
      content:
        "Quality craftsmanship, sustainable practices, and inclusive design are at the heart of everything we do. We believe in creating clothing that empowers individuals to express their unique style.",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "community",
      title: "Our Community",
      content:
        "Urban Echo is more than a brand—it's a community of style enthusiasts who appreciate quality, sustainability, and authentic design. Join us in redefining what urban fashion means.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    },
  ],
  stats: [
    { label: "Years in Business", value: "5+" },
    { label: "Happy Customers", value: "10K+" },
    { label: "Sustainable Partners", value: "25+" },
    { label: "Countries Served", value: "15+" },
  ],
};
