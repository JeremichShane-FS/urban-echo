import { CACHE_DURATION } from "@config/constants/api-constants";
import { useQuery } from "@tanstack/react-query";

const strapiRequest = async endpoint => {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi API Error: ${response.status}`);
  }

  return response.json();
};

const getHeroContent = async () => {
  try {
    const data = await strapiRequest("hero-contents?populate=*");
    const content = data.data?.[0];

    if (!content) {
      throw new Error("No content found");
    }

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

    return {
      title: content.title?.trim() || "Discover Your Style",
      subtitle: content.subtitle?.trim() || "Premium fashion for the modern lifestyle",
      description: content.description?.trim() || "Explore our curated collection",
      ctaText: content.ctaText?.trim() || "Shop Now",
      ctaLink: content.ctaLink?.trim() || "/shop",
      variant: content.variant || "default",
      isActive: content.isActive ?? true,
      backgroundImage: content.backgroundImage?.url
        ? `${STRAPI_URL}${content.backgroundImage.url}`
        : null,
    };
  } catch (error) {
    console.warn("Failed to fetch hero content from Strapi, using fallback", error);
    return {
      title: "Discover Your Style",
      subtitle: "Premium fashion for the modern lifestyle",
      description:
        "Explore our curated collection of contemporary clothing designed for comfort, style, and confidence.",
      ctaText: "Shop Now",
      ctaLink: "/shop",
      variant: "default",
      isActive: true,
      backgroundImage: null,
    };
  }
};

const getAboutContent = async () => {
  try {
    const data = await strapiRequest("about-contents?populate=*");
    const content = data.data?.[0];

    if (!content) {
      throw new Error("No content found");
    }

    return {
      title: content.title || "About Urban Echo",
      description: content.description || "Contemporary style and conscious living",
      mission: content.mission || "Provide high-quality, sustainable fashion",
      vision: content.vision || "A world where fashion is both beautiful and responsible",
      values: content.values || ["Quality", "Sustainability", "Style"],
      isActive: content.isActive ?? true,
    };
  } catch (error) {
    console.warn("Failed to fetch about content from Strapi, using fallback", error);
    return {
      title: "About Urban Echo",
      subtitle: "Fashion with Purpose",
      description:
        "Urban Echo represents the intersection of contemporary style and conscious living.",
      mission:
        "To provide high-quality, sustainable fashion that empowers individuals to express their unique style.",
      vision: "A world where fashion is both beautiful and responsible.",
      values: [
        "Quality craftsmanship",
        "Sustainable practices",
        "Inclusive design",
        "Customer satisfaction",
      ],
      isActive: true,
    };
  }
};

const getPageConfig = async (pageName = "homepage") => {
  try {
    const data = await strapiRequest(`page-configs?filters[pageName][$eq]=${pageName}&populate=*`);
    const config = data.data?.[0];

    if (!config) {
      throw new Error("No config found");
    }

    return {
      pageName: config.pageName || "homepage",
      seoTitle: config.seoTitle || "Urban Echo | Modern Fashion",
      seoDescription: config.seoDescription || "Discover trendy, high-quality clothing",
      showFeaturedProducts: config.showFeaturedProducts ?? true,
      showNewArrivals: config.showNewArrivals ?? true,
      showNewsletter: config.showNewsletter ?? true,
      showAboutSection: config.showAboutSection ?? true,
    };
  } catch (error) {
    console.warn("Failed to fetch page config from Strapi, using fallback", error);
    return {
      pageName: "homepage",
      seoTitle: "Urban Echo | Modern Fashion E-Commerce",
      seoDescription:
        "Discover trendy, high-quality clothing at Urban Echo. Shop our curated collection of contemporary fashion.",
      showFeaturedProducts: true,
      showNewArrivals: true,
      showNewsletter: true,
      showAboutSection: true,
    };
  }
};

export const useHeroContent = () => {
  return useQuery({
    queryKey: ["hero-content"],
    queryFn: getHeroContent,
    staleTime: CACHE_DURATION.long,
    gcTime: CACHE_DURATION.veryLong,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useAboutContent = () => {
  return useQuery({
    queryKey: ["about-content"],
    queryFn: getAboutContent,
    staleTime: CACHE_DURATION.long,
    gcTime: CACHE_DURATION.veryLong,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const usePageConfig = (pageName = "homepage") => {
  return useQuery({
    queryKey: ["page-config", pageName],
    queryFn: () => getPageConfig(pageName),
    staleTime: CACHE_DURATION.medium,
    gcTime: CACHE_DURATION.long,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
