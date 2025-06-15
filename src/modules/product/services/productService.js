export const productService = {
  // ... existing product service methods

  /**
   * Fetch featured products for homepage
   * @returns {Promise<Array>} Featured products
   */
  async getFeaturedProducts() {
    try {
      // TODO: Replace with actual API call
      // const response = await apiClient.get('/api/products/featured');
      // return response.data;

      // Mock implementation for now
      await new Promise(resolve => setTimeout(resolve, 500));

      return [
        {
          id: 1,
          name: "Urban Casual Jacket",
          price: 300,
          image: null,
          slug: "urban-casual-jacket",
          featured: true,
          category: "jackets",
          inStock: true,
        },
        {
          id: 2,
          name: "Classic Denim Jeans",
          price: 300,
          image: null,
          slug: "classic-denim-jeans",
          featured: true,
          category: "jeans",
          inStock: true,
        },
      ];
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw new Error("Failed to fetch featured products");
    }
  },

  /**
   * Fetch new arrivals for homepage
   * @param {Object} options - Query options
   * @param {number} options.limit - Number of products to fetch
   * @returns {Promise<Array>} New arrival products
   */
  async getNewArrivals({ limit = 8 } = {}) {
    try {
      // TODO: Replace with actual API call
      // const response = await apiClient.get(`/api/products/new-arrivals?limit=${limit}`);
      // return response.data;

      // Mock implementation for now
      await new Promise(resolve => setTimeout(resolve, 500));

      return [
        {
          id: 1,
          name: "Trendy Graphic Tee",
          price: 300,
          image: null,
          slug: "trendy-graphic-tee",
          isNew: true,
          category: "t-shirts",
          inStock: true,
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
        },
        {
          id: 2,
          name: "Modern Blazer",
          price: 300,
          image: null,
          slug: "modern-blazer",
          isNew: true,
          category: "blazers",
          inStock: true,
          createdAt: new Date(Date.now() - 172800000), // 2 days ago
        },
        {
          id: 3,
          name: "Casual Sneakers",
          price: 300,
          image: null,
          slug: "casual-sneakers",
          isNew: true,
          category: "shoes",
          inStock: true,
          createdAt: new Date(Date.now() - 259200000), // 3 days ago
        },
        {
          id: 4,
          name: "Vintage Leather Jacket",
          price: 300,
          image: null,
          slug: "vintage-leather-jacket",
          isNew: true,
          category: "jackets",
          inStock: true,
          createdAt: new Date(Date.now() - 345600000), // 4 days ago
        },
        {
          id: 5,
          name: "Slim Fit Chinos",
          price: 300,
          image: null,
          slug: "slim-fit-chinos",
          isNew: true,
          category: "pants",
          inStock: true,
          createdAt: new Date(Date.now() - 432000000), // 5 days ago
        },
        {
          id: 6,
          name: "Designer Hoodie",
          price: 300,
          image: null,
          slug: "designer-hoodie",
          isNew: true,
          category: "hoodies",
          inStock: true,
          createdAt: new Date(Date.now() - 518400000), // 6 days ago
        },
        {
          id: 7,
          name: "Classic White Shirt",
          price: 300,
          image: null,
          slug: "classic-white-shirt",
          isNew: true,
          category: "shirts",
          inStock: true,
          createdAt: new Date(Date.now() - 604800000), // 7 days ago
        },
        {
          id: 8,
          name: "Stylish Backpack",
          price: 300,
          image: null,
          slug: "stylish-backpack",
          isNew: true,
          category: "accessories",
          inStock: true,
          createdAt: new Date(Date.now() - 691200000), // 8 days ago
        },
      ].slice(0, limit);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
      throw new Error("Failed to fetch new arrivals");
    }
  },
};
