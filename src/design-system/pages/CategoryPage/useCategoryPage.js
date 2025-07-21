/**
 * @fileoverview Custom hook for managing category page state including filtering, sorting, pagination, and breadcrumbs
 * Provides comprehensive e-commerce browsing functionality with React Query integration for data fetching
 * Handles URL synchronization, filter state management, breadcrumb generation, and optimized caching for enhanced user experience
 * Fixed parameter mapping to match API expectations
 */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { CACHE_DURATION } from "@config/constants";
import { queryKeys } from "@modules/core/providers";
import { generateCategoryBreadcrumbs } from "@modules/core/utils";
import { getCategories, getProducts, searchProducts } from "@modules/products/services";

/**
 * Hook for managing category page state including products, filters, pagination, breadcrumbs, and URL synchronization
 * @hook
 * @param {Object} params - URL parameters object containing category information
 * @param {string} [params.category] - Category slug from URL for filtering products
 * @returns {Object} Category page state management and interaction handlers
 * @returns {Array<Object>} returns.products - Filtered product data array for display
 * @returns {Array<Object>} returns.categories - Available categories with product counts
 * @returns {Array<Object>} returns.breadcrumbItems - Breadcrumb navigation items for page hierarchy
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

  // Generate breadcrumb items based on current category
  const breadcrumbItems = useMemo(() => {
    return generateCategoryBreadcrumbs(category);
  }, [category]);

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

  // Build query parameters with correct mapping
  const queryParams = useMemo(() => {
    return {
      // Basic parameters
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      search: searchTerm.trim() || undefined,
      sortBy: sortBy,

      // Pagination
      page: currentPage,
      limit: 12,

      // Price range - only include if not default values
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 500 ? priceRange[1] : undefined,

      // Boolean filters - only include if true
      onSale: filters.onSale || undefined,
      newArrivals: filters.newArrivals || undefined,
      freeShipping: filters.freeShipping || undefined,
    };
  }, [selectedCategory, searchTerm, sortBy, currentPage, priceRange, filters]);

  // Fetch products based on current filters
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
      // Clean up undefined values from queryParams
      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== undefined)
      );

      // Use search if we have a search term, otherwise use regular getProducts
      if (searchTerm.trim()) {
        return searchProducts(cleanParams);
      } else {
        return getProducts(cleanParams);
      }
    },
    staleTime: CACHE_DURATION.short,
    gcTime: CACHE_DURATION.medium,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: true,
  });

  const productsData = useMemo(() => {
    if (!productsResponse) {
      return { products: [], total: 0 };
    }

    // Handle direct array response
    if (Array.isArray(productsResponse)) {
      return { products: productsResponse, total: productsResponse.length };
    }

    // Handle response with products array
    if (productsResponse.products && Array.isArray(productsResponse.products)) {
      return {
        products: productsResponse.products,
        total: productsResponse.total || productsResponse.products.length,
      };
    }

    // Handle response with data array
    if (productsResponse.data && Array.isArray(productsResponse.data)) {
      const total =
        productsResponse.pagination?.total ||
        productsResponse.meta?.total ||
        productsResponse.data.length;
      return {
        products: productsResponse.data,
        total: total,
      };
    }

    // Handle nested response structures
    if (productsResponse.products && typeof productsResponse.products === "object") {
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

      // Check for any array property in products object
      const productKeys = Object.keys(productsResponse.products);
      for (const key of productKeys) {
        if (Array.isArray(productsResponse.products[key])) {
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

    return { products: [], total: 0 };
  }, [productsResponse]);

  const enhancedCategories = useMemo(() => {
    return categories.map(cat => ({
      id: cat.slug || cat._id,
      label: cat.name,
      count: cat.productCount || 0,
    }));
  }, [categories]);

  const totalPages = Math.ceil((productsData.total || 0) / 12);

  const handleCategoryChange = newCategory => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
    setSearchTerm("");

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
    // Data
    products: productsData.products || [],
    categories: enhancedCategories,
    totalProducts: productsData.total || 0,
    totalPages,
    currentPage,
    breadcrumbItems,

    // State
    selectedCategory,
    sortBy,
    priceRange,
    searchTerm,
    filters,
    category,

    // Status
    isLoading,
    error,

    // Handlers
    handleCategoryChange,
    handleFilterChange,
    handleSearch,
    handleSortChange,
    handlePriceRangeChange,
    handlePageChange,
  };
};

export default useCategoryPage;
