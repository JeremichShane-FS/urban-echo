import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CACHE_DURATION } from "@config/constants";
import { queryKeys } from "@modules/core/providers/query-provider";
import { categoriesService } from "@modules/product/services/categories";
import { productSearchService } from "@modules/product/services/product-search";
import { productsService } from "@modules/product/services/products";
import { useQuery } from "@tanstack/react-query";

export function useCategoryPage(params) {
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
      categoriesService.getCategories({
        includeProductCount: true,
        status: "active",
      }),
    staleTime: CACHE_DURATION.long, // 24 hours
    gcTime: CACHE_DURATION.veryLong, // 1 week
    retry: 3,
  });

  // Fetch products based on current filters
  const {
    data: productsData = { products: [], total: 0 },
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
        sort: sortBy,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(filters.onSale && { onSale: true }),
        ...(filters.newArrivals && { isNew: true }),
        ...(filters.freeShipping && { freeShipping: true }),
      };

      if (searchTerm) return productSearchService.searchProducts(queryParams);
      if (selectedCategory === "all") return productsService.getProducts(queryParams);

      return productsService.getProductsByCategory(selectedCategory, queryParams);
    },
    staleTime: CACHE_DURATION.short, // 5 minutes
    gcTime: CACHE_DURATION.medium, // 30 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Refetch when filters change
    enabled: true,
  });

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
}
