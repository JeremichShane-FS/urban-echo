export const productList = [
  {
    id: 1,
    name: "Urban Casual Jacket",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    slug: "urban-casual-jacket",
    featured: true,
    category: "jackets",
    inStock: true,
    description: "A versatile urban jacket perfect for any casual occasion.",
    colors: ["black", "navy", "charcoal"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: 2,
    name: "Classic Denim Jeans",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    slug: "classic-denim-jeans",
    featured: true,
    category: "jeans",
    inStock: true,
    description: "Timeless denim jeans with the perfect fit.",
    colors: ["blue", "black", "light-wash"],
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.3,
    reviewCount: 94,
  },
  {
    id: 3,
    name: "Vintage Leather Boots",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "vintage-leather-boots",
    featured: true,
    category: "shoes",
    inStock: true,
    description: "Handcrafted leather boots with vintage appeal.",
    colors: ["brown", "black", "tan"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: 4,
    name: "Wool Blend Sweater",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "wool-blend-sweater",
    featured: true,
    category: "sweaters",
    inStock: true,
    description: "Cozy wool blend sweater for cold weather comfort.",
    colors: ["grey", "navy", "cream", "burgundy"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.4,
    reviewCount: 87,
  },
];

export const newArrivals = [
  {
    id: 101,
    name: "Trendy Graphic Tee",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "trendy-graphic-tee",
    isNew: true,
    category: "t-shirts",
    inStock: true,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
<<<<<<< HEAD
    description:
      "Modern graphic tee with unique urban design that captures the essence of contemporary street fashion. Crafted from premium cotton blend fabric that offers exceptional softness and breathability for all-day comfort. Features bold, eye-catching graphics inspired by urban street art and modern design aesthetics. The high-quality print ensures long-lasting vibrancy and won't fade after multiple washes. Perfect for casual outings, weekend adventures, or layering under jackets and hoodies.",
=======
    description: "Modern graphic tee with unique urban design.",
>>>>>>> origin/main
    colors: ["white", "black", "grey"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.2,
    reviewCount: 23,
  },
  {
    id: 102,
    name: "Modern Blazer",
    price: 320,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "modern-blazer",
    isNew: true,
    category: "blazers",
    inStock: true,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    description: "Contemporary blazer for professional occasions.",
    colors: ["navy", "charcoal", "black"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviewCount: 41,
  },
  {
    id: 103,
    name: "Casual Sneakers",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "casual-sneakers",
    isNew: true,
    category: "shoes",
    inStock: true,
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    description: "Comfortable sneakers for everyday wear.",
    colors: ["white", "black", "grey", "navy"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.1,
    reviewCount: 67,
  },
  {
    id: 104,
    name: "Vintage Leather Jacket",
    price: 480,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "vintage-leather-jacket",
    isNew: true,
    category: "jackets",
    inStock: true,
    createdAt: new Date(Date.now() - 345600000), // 4 days ago
    description: "Classic leather jacket with vintage styling.",
    colors: ["black", "brown", "tan"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 92,
  },
  {
    id: 105,
    name: "Slim Fit Chinos",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "slim-fit-chinos",
    isNew: true,
    category: "pants",
    inStock: true,
    createdAt: new Date(Date.now() - 432000000), // 5 days ago
    description: "Versatile chinos with a modern slim fit.",
    colors: ["khaki", "navy", "olive", "grey"],
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.3,
    reviewCount: 54,
  },
  {
    id: 106,
    name: "Designer Hoodie",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "designer-hoodie",
    isNew: true,
    category: "hoodies",
    inStock: true,
    createdAt: new Date(Date.now() - 518400000), // 6 days ago
    description: "Premium hoodie with designer details.",
    colors: ["grey", "black", "navy", "burgundy"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.4,
    reviewCount: 38,
  },
  {
    id: 107,
<<<<<<< HEAD
    name: "Classic Blue Shirt",
=======
    name: "Classic White Shirt",
>>>>>>> origin/main
    price: 95,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "classic-white-shirt",
    isNew: true,
    category: "shirts",
    inStock: true,
    createdAt: new Date(Date.now() - 604800000), // 7 days ago
    description: "Essential white shirt for any wardrobe.",
    colors: ["white", "light-blue", "cream"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 76,
  },
  {
    id: 108,
    name: "Stylish Backpack",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    slug: "stylish-backpack",
    isNew: true,
    category: "accessories",
    inStock: true,
    createdAt: new Date(Date.now() - 691200000), // 8 days ago
    description: "Functional backpack with modern style.",
    colors: ["black", "navy", "grey", "brown"],
    sizes: ["One Size"],
    rating: 4.2,
    reviewCount: 31,
  },
];

export const bestSellers = [
  // Reference existing products by ID for best sellers
  { ...productList[0], bestSeller: true, salesCount: 1247 },
  { ...newArrivals[3], bestSeller: true, salesCount: 892 },
  { ...productList[1], bestSeller: true, salesCount: 743 },
  { ...newArrivals[1], bestSeller: true, salesCount: 634 },
];

export const categories = [
  {
    id: 1,
    name: "Men",
    slug: "men",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Women",
    slug: "women",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Shoes",
    slug: "shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
  },
];
