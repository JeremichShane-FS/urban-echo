// import { API_ENDPOINTS } from "@config/constants/api-constants";
import { bestSellers, categories, newArrivals, productList } from "@modules/product/data/mock-data";

export const productService = {
  async getFeaturedProducts(limit = 4) {
    try {
      // TODO: [DATA] Replace mock data with API call when ready (featured products)
      // const response = await fetch(`/api/${API_ENDPOINTS.featuredProducts}?limit=${limit}`);
      await new Promise(resolve => setTimeout(resolve, 500));

      const featuredProducts = productList.filter(product => product.featured);
      return featuredProducts.slice(0, limit);
    } catch (error) {
      console.error("Error fetching featured products:", error.message);
      throw new Error("Failed to fetch featured products");
    }
  },

  async getNewArrivals(params = {}) {
    try {
      const { category = null, limit = 8, page = 1 } = params;

      // TODO: [DATA] Replace mock data with API call when ready (new arrivals)
      // const response = await fetch(`/api/${API_ENDPOINTS.newArrivals}?limit=${limit}&page=${page}&category=${category}`);
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredProducts = [...newArrivals];

      if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category);
      }

      filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      return {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total: filteredProducts.length,
          hasMore: endIndex < filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / limit),
        },
        filters: {
          category: category || "all",
        },
      };
    } catch (error) {
      console.error("Error fetching new arrivals:", error.message);
      throw new Error("Failed to fetch new arrivals");
    }
  },

  async getBestSellers(limit = 8) {
    try {
      // TODO: [DATA] Replace mock data with API call when ready (best-sellers)
      // const response = await fetch(`/api/${API_ENDPOINTS.bestSellers}?limit=${limit}`);
      await new Promise(resolve => setTimeout(resolve, 400));

      return bestSellers.sort((a, b) => b.salesCount - a.salesCount).slice(0, limit);
    } catch (error) {
      console.error("Error fetching best sellers:", error.message);
      throw new Error("Failed to fetch best sellers");
    }
  },

  async getProducts(params = {}) {
    try {
      const {
        category,
        limit = 20,
        maxPrice,
        minPrice,
        page = 1,
        search,
        sort = "newest",
      } = params;

      // TODO: [DATA] Replace mock data with API call when ready (products)
      // const searchParams = new URLSearchParams({ page, limit, category, sort, search, minPrice, maxPrice });
      // const response = await fetch(`/api/${API_ENDPOINTS.products}?${searchParams}`);
      await new Promise(resolve => setTimeout(resolve, 600));

      const allProducts = [...productList, ...newArrivals];

      const uniqueProducts = allProducts.filter(
        (product, index, self) => index === self.findIndex(p => p.id === product.id)
      );

      let filteredProducts = uniqueProducts;

      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(
          p =>
            p.name.toLowerCase().includes(searchLower) ||
            p.description?.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower)
        );
      }

      if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
      }

      if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
      }

      switch (sort) {
        case "price-low":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "newest":
        default:
          filteredProducts.sort(
            (a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now())
          );
          break;
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      return {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total: filteredProducts.length,
          hasMore: endIndex < filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / limit),
        },
        filters: { category, sort, search, minPrice, maxPrice },
      };
    } catch (error) {
      console.error("Error fetching products:", error.message);
      throw new Error("Failed to fetch products");
    }
  },

  async getProduct(slug) {
    try {
      // TODO: [DATA] Replace mock data with API call when ready (product-details)
      // const response = await fetch(`/api/${API_ENDPOINTS.products}/${slug}`);
      await new Promise(resolve => setTimeout(resolve, 300));

      const allProducts = [...productList, ...newArrivals];
      const product = allProducts.find(p => p.slug === slug);

      if (!product) {
        throw new Error(`Product with slug "${slug}" not found`);
      }

      return product;
    } catch (error) {
      console.error(`Error fetching product ${slug}:`, error);
      throw error;
    }
  },

  async searchProducts(query, params = {}) {
    try {
      const { category, limit = 20, page = 1, sort = "relevance" } = params;

      // TODO: [DATA] Replace mock data with API call when ready (search)
      // const searchParams = new URLSearchParams({ query, page, limit, category, sort });
      // const response = await fetch(`/api/${API_ENDPOINTS.productSearch}?${searchParams}`);
      await new Promise(resolve => setTimeout(resolve, 400));

      return this.getProducts({
        search: query,
        page,
        limit,
        category,
        sort: sort === "relevance" ? "newest" : sort,
      });
    } catch (error) {
      console.error(`Error searching products for "${query}":`, error);
      throw new Error("Failed to search products");
    }
  },

  async getCategories() {
    try {
      // TODO: [DATA] Replace mock data with API call when ready (categories)
      // const response = await fetch(`/api/${API_ENDPOINTS.categories}`);
      await new Promise(resolve => setTimeout(resolve, 200));

      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      throw new Error("Failed to fetch categories");
    }
  },

  async getRelatedProducts(productId, limit = 4) {
    try {
      // TODO: [DATA] Replace mock data with API call when ready (related products)
      // const response = await fetch(`/api/${API_ENDPOINTS.relatedProducts}/${productId}?limit=${limit}`);
      await new Promise(resolve => setTimeout(resolve, 350));

      const allProducts = [...productList, ...newArrivals];
      const currentProduct = allProducts.find(p => p.id === productId);

      if (!currentProduct) {
        return [];
      }

      return allProducts
        .filter(p => p.category === currentProduct.category && p.id !== productId)
        .slice(0, limit);
    } catch (error) {
      console.error(`Error fetching related products for ${productId}:`, error);
      throw new Error("Failed to fetch related products");
    }
  },
};
