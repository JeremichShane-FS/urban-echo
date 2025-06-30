export const DATA_SOURCES = {
  // Strapi-managed content
  STRAPI: [
    "hero-content",
    "about-content",
    "page-configs",
    "blog-posts",
    "categories-content",
    "site-settings",
  ],

  // MongoDB-managed data
  MONGODB: [
    "users",
    "products",
    "carts",
    "orders",
    "reviews",
    "newsletter-subscriptions",
    "inventory",
  ],
};

export const getDataSource = dataType => {
  if (DATA_SOURCES.STRAPI.includes(dataType)) return "strapi";
  if (DATA_SOURCES.MONGODB.includes(dataType)) return "mongodb";
  throw new Error(`Unknown data type: ${dataType}`);
};
