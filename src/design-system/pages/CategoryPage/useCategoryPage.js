/**
 * @fileoverview Custom hook for managing category page state including filtering, sorting, and pagination
 * Provides comprehensive e-commerce browsing functionality with React Query integration for data fetching
 * Handles URL synchronization, filter state management, and optimized caching for enhanced user experience
 */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { CACHE_DURATION } from "@config/constants";
import { queryKeys } from "@modules/core/providers";
import { getCategories, getProducts, searchProducts } from "@modules/products/services";

/**
 * Hook for managing category page state including products, filters, pagination, and URL synchronization
 * @hook
 * @param {Object} params - URL parameters object containing category information
 * @param {string} [params.category] - Category slug from URL for filtering products
 * @returns {Object} Category page state management and interaction handlers
 * @returns {Array<Object>} returns.products - Filtered product data array for display
 * @returns {Array<Object>} returns.categories - Available categories with product counts
 * @returns {number} returns.totalProducts - Total count of products matching current filters
 * @returns {number} returns.totalPages - Total number of pagination pages
 * @returns {number} returns.currentPage - Current pagination page number
 * @returns {string} returns.selectedCategory - Currently selected category identifier
 * @returns {string} returns.sortBy - Current sort option selection
 * @returns {Array<number>} returns.priceRange - Current price range filter values
 * @returns {string} returns.searchTerm - Current search query string
 * @returns {Object} returns.filters - Active filter states (onSale, newArrivals, freeShipping)
 * @returns {string} returns.category - Original category parameter from URL
 * @returns {boolean} returns.isLoading - Loading state indicator for product fetching
 * @returns {Object|null} returns.error - Error object if data fetching fails
 * @returns {Function} returns.handleCategoryChange - Handler for category selection changes with URL updates
 * @returns {Function} returns.handleFilterChange - Handler for filter state changes with pagination reset
 * @returns {Function} returns.handleSearch - Handler for search input changes with pagination reset
 * @returns {Function} returns.handleSortChange - Handler for sort option changes with pagination reset
 * @returns {Function} returns.handlePriceRangeChange - Handler for price range filter changes with pagination reset
 * @returns {Function} returns.handlePageChange - Handler for pagination navigation with scroll behavior
 */

const useCategoryPage = params => {
  const router = useRouter();
  const category = params?.category || "all";

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(category === "all" ? "all" : category);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    onSale: false,
    newArrivals: false,
    freeShipping: false,
  });

  // Fetch categories for sidebar
  const { data: categories = [] } = useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () =>
      getCategories({
        includeProductCount: true,
        status: "active",
      }),
    staleTime: CACHE_DURATION.long,
    gcTime: CACHE_DURATION.veryLong,
    retry: 3,
  });

  // Fetch products based on current filters - FIXED: Use existing API endpoints
  const {
    data: productsResponse,
    error,
    isLoading,
  } = useQuery({
    queryKey: queryKeys.products.list({
      category: selectedCategory,
      sort: sortBy,
      priceRange,
      searchTerm,
      page: currentPage,
      filters,
    }),
    queryFn: async () => {
      const queryParams = {
        page: currentPage,
        limit: 12,
        sortBy: sortBy, // Note: changed from 'sort' to 'sortBy' to match your API
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        ...(searchTerm && { search: searchTerm }),
        // FIXED: Always include category filter, use 'all' for all products
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(filters.onSale && { onSale: true }),
        ...(filters.newArrivals && { isNew: true }),
        ...(filters.freeShipping && { freeShipping: true }),
      };

      if (process.env.NODE_ENV === "development") {
        console.log("🔧 Final query params:", queryParams);
      }

      // FIXED: Use only existing API endpoints
      if (searchTerm) {
        return searchProducts(queryParams);
      } else {
        // Use the main products API for both "all" and specific categories
        return getProducts(queryParams);
      }
    },
    staleTime: CACHE_DURATION.short,
    gcTime: CACHE_DURATION.medium,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: true,
  });

  // Process API response to handle different data structures
  const productsData = useMemo(() => {
    console.log("🔧 Raw API Response:", productsResponse);

    if (!productsResponse) {
      return { products: [], total: 0 };
    }

    // Handle different possible response structures from your existing API
    if (Array.isArray(productsResponse)) {
      // If API returns just an array of products
      return { products: productsResponse, total: productsResponse.length };
    }

    if (productsResponse.products && Array.isArray(productsResponse.products)) {
      // If API returns {products: [...], total: number}
      return {
        products: productsResponse.products,
        total: productsResponse.total || productsResponse.products.length,
      };
    }

    if (productsResponse.data && Array.isArray(productsResponse.data)) {
      // If API returns {data: [...], pagination: {...}}
      const total =
        productsResponse.pagination?.total ||
        productsResponse.meta?.total ||
        productsResponse.data.length;
      return {
        products: productsResponse.data,
        total: total,
      };
    }

    // FIXED: Handle the actual structure from your API
    if (productsResponse.products && typeof productsResponse.products === "object") {
      console.log("🔧 Products object structure:", productsResponse.products);

      // Check if products object has array properties
      if (Array.isArray(productsResponse.products.data)) {
        const total =
          productsResponse.pagination?.total ||
          productsResponse.meta?.total ||
          productsResponse.products.data.length;
        return {
          products: productsResponse.products.data,
          total: total,
        };
      }

      // Check if products is nested differently
      const productKeys = Object.keys(productsResponse.products);
      console.log("🔧 Product object keys:", productKeys);

      // Look for array properties in the products object
      for (const key of productKeys) {
        if (Array.isArray(productsResponse.products[key])) {
          console.log(`🔧 Found array at products.${key}:`, productsResponse.products[key]);
          const total =
            productsResponse.pagination?.total ||
            productsResponse.meta?.total ||
            productsResponse.products[key].length;
          return {
            products: productsResponse.products[key],
            total: total,
          };
        }
      }
    }

    // Fallback for unexpected response structure
    console.warn("🔧 Unexpected API response structure:", productsResponse);
    console.warn("🔧 Available keys:", Object.keys(productsResponse));
    console.warn("🔧 Products type:", typeof productsResponse.products);
    return { products: [], total: 0 };
  }, [productsResponse]);

  console.log("🔧 Processed productsData:", productsData);

  // Enhanced categories with product counts
  const enhancedCategories = useMemo(() => {
    const baseCategories = [{ id: "all", label: "All Products", count: productsData.total || 0 }];

    return [
      ...baseCategories,
      ...categories.map(cat => ({
        id: cat.slug || cat._id,
        label: cat.name,
        count: cat.productCount || 0,
      })),
    ];
  }, [categories, productsData.total]);

  // Pagination
  const totalPages = Math.ceil((productsData.total || 0) / 12);

  const handleCategoryChange = newCategory => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);

    // Update URL
    if (newCategory === "all") {
      router.push("/shop/all");
    } else {
      router.push(`/shop/${newCategory}`);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const handleSearch = term => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSortChange = newSort => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = newRange => {
    setPriceRange(newRange);
    setCurrentPage(1);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return {
    products: productsData.products || [],
    categories: enhancedCategories,
    totalProducts: productsData.total || 0,
    totalPages,
    currentPage,

    selectedCategory,
    sortBy,
    priceRange,
    searchTerm,
    filters,
    category,

    isLoading,
    error,

    handleCategoryChange,
    handleFilterChange,
    handleSearch,
    handleSortChange,
    handlePriceRangeChange,
    handlePageChange,
  };
};

export default useCategoryPage;
