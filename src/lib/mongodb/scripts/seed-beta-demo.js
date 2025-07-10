/**
 * @fileoverview Database seeding script for Urban Echo beta demo with comprehensive test data
 * Provides realistic e-commerce data including products, users, orders, and relationships for development and testing
 * Creates demo data with proper variants, inventory levels, user profiles, and order history for full application testing
 */

/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-relative-import-paths/no-relative-import-paths */
import dbConnect from "../client.js";

/**
 * Demo product data array with comprehensive e-commerce product information
 * @type {Array<Object>} Array of product objects with variants, pricing, and metadata
 */
const demoProducts = [
  {
    name: "Urban Casual Jacket",
    slug: "urban-casual-jacket",
    description:
      "A versatile casual jacket perfect for urban exploration. Features premium materials and modern cut.",
    price: 299.99,
    compareAtPrice: 399.99,
    category: "men",
    subcategory: "jackets",
    categoryPath: "men/jackets",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
        alt: "Urban Casual Jacket - Front View",
        position: 0,
      },
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
        alt: "Urban Casual Jacket - Side View",
        position: 1,
      },
    ],
    variants: [
      { size: "S", color: "Black", sku: "UCJ-BLK-S", inventory: 15, price: 299.99 },
      { size: "M", color: "Black", sku: "UCJ-BLK-M", inventory: 20, price: 299.99 },
      { size: "L", color: "Black", sku: "UCJ-BLK-L", inventory: 18, price: 299.99 },
      { size: "XL", color: "Black", sku: "UCJ-BLK-XL", inventory: 12, price: 299.99 },
      { size: "S", color: "Navy", sku: "UCJ-NAV-S", inventory: 10, price: 299.99 },
      { size: "M", color: "Navy", sku: "UCJ-NAV-M", inventory: 15, price: 299.99 },
      { size: "L", color: "Navy", sku: "UCJ-NAV-L", inventory: 14, price: 299.99 },
      { size: "XL", color: "Navy", sku: "UCJ-NAV-XL", inventory: 8, price: 299.99 },
      { size: "S", color: "Grey", sku: "UCJ-GRY-S", inventory: 12, price: 299.99 },
      { size: "M", color: "Grey", sku: "UCJ-GRY-M", inventory: 16, price: 299.99 },
      { size: "L", color: "Grey", sku: "UCJ-GRY-L", inventory: 11, price: 299.99 },
      { size: "XL", color: "Grey", sku: "UCJ-GRY-XL", inventory: 7, price: 299.99 },
    ],
    tags: ["casual", "urban", "versatile", "premium"],
    collections: ["featured"],
    isFeatured: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.7,
    reviewCount: 127,
    salesCount: 342,
  },

  {
    name: "Premium Leather Jacket",
    slug: "premium-leather-jacket",
    description:
      "Genuine leather jacket with timeless design. Hand-crafted with attention to detail.",
    price: 599.99,
    compareAtPrice: 799.99,
    category: "men",
    subcategory: "jackets",
    categoryPath: "men/jackets",
    images: [
      {
        url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80",
        alt: "Premium Leather Jacket",
        position: 0,
      },
    ],
    variants: [
      { size: "S", color: "Black", sku: "PLJ-BLK-S", inventory: 5, price: 599.99 },
      { size: "M", color: "Black", sku: "PLJ-BLK-M", inventory: 8, price: 599.99 },
      { size: "L", color: "Black", sku: "PLJ-BLK-L", inventory: 6, price: 599.99 },
      { size: "XL", color: "Black", sku: "PLJ-BLK-XL", inventory: 3, price: 599.99 },
      { size: "S", color: "Brown", sku: "PLJ-BRN-S", inventory: 4, price: 599.99 },
      { size: "M", color: "Brown", sku: "PLJ-BRN-M", inventory: 7, price: 599.99 },
      { size: "L", color: "Brown", sku: "PLJ-BRN-L", inventory: 5, price: 599.99 },
      { size: "XL", color: "Brown", sku: "PLJ-BRN-XL", inventory: 2, price: 599.99 },
    ],
    tags: ["leather", "premium", "classic", "luxury"],
    collections: ["featured"],
    isFeatured: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 89,
    salesCount: 156,
  },

  {
    name: "Classic Blue Dress Shirt",
    slug: "classic-blue-dress-shirt",
    description: "Essential blue dress shirt perfect for business or formal occasions.",
    price: 89.99,
    compareAtPrice: 129.99,
    category: "men",
    subcategory: "shirts",
    categoryPath: "men/shirts",
    images: [
      {
        url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
        alt: "Classic Blue Dress Shirt",
        position: 0,
      },
    ],
    variants: [
      { size: "S", color: "Blue", sku: "CWDS-WHT-S", inventory: 25, price: 89.99 },
      { size: "M", color: "Blue", sku: "CWDS-WHT-M", inventory: 30, price: 89.99 },
      { size: "L", color: "Blue", sku: "CWDS-WHT-L", inventory: 28, price: 89.99 },
      { size: "XL", color: "Blue", sku: "CWDS-WHT-XL", inventory: 20, price: 89.99 },
      { size: "XXL", color: "Blue", sku: "CWDS-WHT-XXL", inventory: 15, price: 89.99 },
    ],
    tags: ["dress", "formal", "business", "classic"],
    collections: ["new-arrivals"],
    isFeatured: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.5,
    reviewCount: 203,
    salesCount: 567,
  },

  {
    name: "Casual Polo Shirt",
    slug: "casual-polo-shirt",
    description: "Comfortable polo shirt perfect for casual outings and weekend wear.",
    price: 59.99,
    compareAtPrice: 79.99,
    category: "men",
    subcategory: "shirts",
    categoryPath: "men/shirts",
    images: [
      {
        url: "https://images.unsplash.com/photo-1503341960582-b45751874cf0?auto=format&fit=crop&w=1000&q=80",
        alt: "Casual Polo Shirt",
        position: 0,
      },
    ],
    variants: [
      { size: "S", color: "Navy", sku: "CPS-NAV-S", inventory: 18, price: 59.99 },
      { size: "M", color: "Navy", sku: "CPS-NAV-M", inventory: 22, price: 59.99 },
      { size: "L", color: "Navy", sku: "CPS-NAV-L", inventory: 20, price: 59.99 },
      { size: "XL", color: "Navy", sku: "CPS-NAV-XL", inventory: 16, price: 59.99 },
      { size: "S", color: "White", sku: "CPS-WHT-S", inventory: 15, price: 59.99 },
      { size: "M", color: "White", sku: "CPS-WHT-M", inventory: 19, price: 59.99 },
      { size: "L", color: "White", sku: "CPS-WHT-L", inventory: 17, price: 59.99 },
      { size: "XL", color: "White", sku: "CPS-WHT-XL", inventory: 13, price: 59.99 },
      { size: "S", color: "Black", sku: "CPS-BLK-S", inventory: 20, price: 59.99 },
      { size: "M", color: "Black", sku: "CPS-BLK-M", inventory: 24, price: 59.99 },
      { size: "L", color: "Black", sku: "CPS-BLK-L", inventory: 21, price: 59.99 },
      { size: "XL", color: "Black", sku: "CPS-BLK-XL", inventory: 18, price: 59.99 },
    ],
    tags: ["polo", "casual", "weekend", "comfortable"],
    collections: ["new-arrivals"],
    isFeatured: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.3,
    reviewCount: 145,
    salesCount: 423,
  },

  {
    name: "Slim Fit Chinos",
    slug: "slim-fit-chinos",
    description: "Modern slim-fit chinos perfect for smart casual occasions.",
    price: 119.99,
    compareAtPrice: 159.99,
    category: "men",
    subcategory: "pants",
    categoryPath: "men/pants",
    images: [
      {
        url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80",
        alt: "Slim Fit Chinos",
        position: 0,
      },
    ],
    variants: [
      { size: "28", color: "Khaki", sku: "SFC-KHK-28", inventory: 12, price: 119.99 },
      { size: "30", color: "Khaki", sku: "SFC-KHK-30", inventory: 18, price: 119.99 },
      { size: "32", color: "Khaki", sku: "SFC-KHK-32", inventory: 22, price: 119.99 },
      { size: "34", color: "Khaki", sku: "SFC-KHK-34", inventory: 20, price: 119.99 },
      { size: "36", color: "Khaki", sku: "SFC-KHK-36", inventory: 15, price: 119.99 },
      { size: "28", color: "Navy", sku: "SFC-NAV-28", inventory: 10, price: 119.99 },
      { size: "30", color: "Navy", sku: "SFC-NAV-30", inventory: 16, price: 119.99 },
      { size: "32", color: "Navy", sku: "SFC-NAV-32", inventory: 19, price: 119.99 },
      { size: "34", color: "Navy", sku: "SFC-NAV-34", inventory: 17, price: 119.99 },
      { size: "36", color: "Navy", sku: "SFC-NAV-36", inventory: 12, price: 119.99 },
    ],
    tags: ["chinos", "slim-fit", "smart-casual", "versatile"],
    collections: ["new-arrivals"],
    isFeatured: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.4,
    reviewCount: 167,
    salesCount: 298,
  },

  {
    name: "Premium Jeans",
    slug: "premium-jeans",
    description: "High-quality denim jeans with perfect fit and comfort.",
    price: 149.99,
    compareAtPrice: 199.99,
    category: "men",
    subcategory: "pants",
    categoryPath: "men/pants",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
        alt: "Premium Jeans",
        position: 0,
      },
    ],
    variants: [
      { size: "28", color: "Dark Blue", sku: "PJ-DB-28", inventory: 14, price: 149.99 },
      { size: "30", color: "Dark Blue", sku: "PJ-DB-30", inventory: 20, price: 149.99 },
      { size: "32", color: "Dark Blue", sku: "PJ-DB-32", inventory: 25, price: 149.99 },
      { size: "34", color: "Dark Blue", sku: "PJ-DB-34", inventory: 22, price: 149.99 },
      { size: "36", color: "Dark Blue", sku: "PJ-DB-36", inventory: 18, price: 149.99 },
      { size: "28", color: "Black", sku: "PJ-BLK-28", inventory: 12, price: 149.99 },
      { size: "30", color: "Black", sku: "PJ-BLK-30", inventory: 17, price: 149.99 },
      { size: "32", color: "Black", sku: "PJ-BLK-32", inventory: 21, price: 149.99 },
      { size: "34", color: "Black", sku: "PJ-BLK-34", inventory: 19, price: 149.99 },
      { size: "36", color: "Black", sku: "PJ-BLK-36", inventory: 15, price: 149.99 },
    ],
    tags: ["jeans", "denim", "premium", "comfortable"],
    collections: ["featured"],
    isFeatured: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.6,
    reviewCount: 234,
    salesCount: 445,
  },

  {
    name: "Designer Hoodie",
    slug: "designer-hoodie",
    description: "Premium hoodie with contemporary design and superior comfort.",
    price: 159.99,
    compareAtPrice: 219.99,
    category: "men",
    subcategory: "hoodies",
    categoryPath: "men/hoodies",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80",
        alt: "Designer Hoodie",
        position: 0,
      },
    ],
    variants: [
      { size: "S", color: "Grey", sku: "DH-GRY-S", inventory: 16, price: 159.99 },
      { size: "M", color: "Grey", sku: "DH-GRY-M", inventory: 22, price: 159.99 },
      { size: "L", color: "Grey", sku: "DH-GRY-L", inventory: 20, price: 159.99 },
      { size: "XL", color: "Grey", sku: "DH-GRY-XL", inventory: 18, price: 159.99 },
      { size: "S", color: "Black", sku: "DH-BLK-S", inventory: 14, price: 159.99 },
      { size: "M", color: "Black", sku: "DH-BLK-M", inventory: 19, price: 159.99 },
      { size: "L", color: "Black", sku: "DH-BLK-L", inventory: 17, price: 159.99 },
      { size: "XL", color: "Black", sku: "DH-BLK-XL", inventory: 15, price: 159.99 },
    ],
    tags: ["hoodie", "designer", "premium", "streetwear"],
    collections: ["new-arrivals"],
    isFeatured: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.4,
    reviewCount: 98,
    salesCount: 187,
  },

  {
    name: "Stylish Backpack",
    slug: "stylish-backpack",
    description: "Modern backpack combining style and functionality for daily use.",
    price: 139.99,
    compareAtPrice: 179.99,
    category: "accessories",
    subcategory: "bags",
    categoryPath: "accessories/bags",
    images: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
        alt: "Stylish Backpack",
        position: 0,
      },
    ],
    variants: [
      { size: "One Size", color: "Black", sku: "SB-BLK-OS", inventory: 25, price: 139.99 },
      { size: "One Size", color: "Navy", sku: "SB-NAV-OS", inventory: 20, price: 139.99 },
      { size: "One Size", color: "Grey", sku: "SB-GRY-OS", inventory: 18, price: 139.99 },
      { size: "One Size", color: "Brown", sku: "SB-BRN-OS", inventory: 15, price: 139.99 },
    ],
    tags: ["backpack", "accessories", "functional", "stylish"],
    collections: ["new-arrivals"],
    isFeatured: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.2,
    reviewCount: 76,
    salesCount: 134,
  },

  {
    name: "Classic Watch",
    slug: "classic-watch",
    description: "Timeless watch design with modern precision and style.",
    price: 299.99,
    compareAtPrice: 399.99,
    category: "accessories",
    subcategory: "watches",
    categoryPath: "accessories/watches",
    images: [
      {
        url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80",
        alt: "Classic Watch",
        position: 0,
      },
    ],
    variants: [
      { size: "One Size", color: "Silver", sku: "CW-SLV-OS", inventory: 12, price: 299.99 },
      { size: "One Size", color: "Gold", sku: "CW-GLD-OS", inventory: 8, price: 299.99 },
      { size: "One Size", color: "Black", sku: "CW-BLK-OS", inventory: 10, price: 299.99 },
    ],
    tags: ["watch", "accessories", "classic", "luxury"],
    collections: ["featured"],
    isFeatured: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 156,
    salesCount: 89,
  },

  {
    name: "Casual Sneakers",
    slug: "casual-sneakers",
    description: "Comfortable sneakers perfect for everyday wear and casual activities.",
    price: 129.99,
    compareAtPrice: 169.99,
    category: "men",
    subcategory: "shoes",
    categoryPath: "men/shoes",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
        alt: "Casual Sneakers",
        position: 0,
      },
    ],
    variants: [
      { size: "7", color: "White", sku: "CS-WHT-7", inventory: 8, price: 129.99 },
      { size: "8", color: "White", sku: "CS-WHT-8", inventory: 12, price: 129.99 },
      { size: "9", color: "White", sku: "CS-WHT-9", inventory: 15, price: 129.99 },
      { size: "10", color: "White", sku: "CS-WHT-10", inventory: 14, price: 129.99 },
      { size: "11", color: "White", sku: "CS-WHT-11", inventory: 10, price: 129.99 },
      { size: "12", color: "White", sku: "CS-WHT-12", inventory: 7, price: 129.99 },
      { size: "7", color: "Black", sku: "CS-BLK-7", inventory: 6, price: 129.99 },
      { size: "8", color: "Black", sku: "CS-BLK-8", inventory: 9, price: 129.99 },
      { size: "9", color: "Black", sku: "CS-BLK-9", inventory: 12, price: 129.99 },
      { size: "10", color: "Black", sku: "CS-BLK-10", inventory: 11, price: 129.99 },
      { size: "11", color: "Black", sku: "CS-BLK-11", inventory: 8, price: 129.99 },
      { size: "12", color: "Black", sku: "CS-BLK-12", inventory: 5, price: 129.99 },
    ],
    tags: ["sneakers", "shoes", "casual", "comfortable"],
    collections: ["new-arrivals"],
    isFeatured: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.3,
    reviewCount: 189,
    salesCount: 267,
  },

  {
    name: "Vintage Denim Jacket",
    slug: "vintage-denim-jacket",
    description: "Classic vintage-style denim jacket with modern comfort and fit.",
    price: 179.99,
    compareAtPrice: 229.99,
    category: "men",
    subcategory: "jackets",
    categoryPath: "men/jackets",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80",
        alt: "Vintage Denim Jacket",
        position: 0,
      },
    ],
    variants: [
      { size: "S", color: "Light Blue", sku: "VDJ-LB-S", inventory: 12, price: 179.99 },
      { size: "M", color: "Light Blue", sku: "VDJ-LB-M", inventory: 18, price: 179.99 },
      { size: "L", color: "Light Blue", sku: "VDJ-LB-L", inventory: 15, price: 179.99 },
      { size: "XL", color: "Light Blue", sku: "VDJ-LB-XL", inventory: 10, price: 179.99 },
      { size: "S", color: "Dark Blue", sku: "VDJ-DB-S", inventory: 10, price: 179.99 },
      { size: "M", color: "Dark Blue", sku: "VDJ-DB-M", inventory: 14, price: 179.99 },
      { size: "L", color: "Dark Blue", sku: "VDJ-DB-L", inventory: 12, price: 179.99 },
      { size: "XL", color: "Dark Blue", sku: "VDJ-DB-XL", inventory: 8, price: 179.99 },
    ],
    tags: ["denim", "vintage", "jacket", "casual"],
    collections: ["new-arrivals"],
    isFeatured: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.5,
    reviewCount: 67,
    salesCount: 123,
  },

  {
    name: "Athletic Performance Shorts",
    slug: "athletic-performance-shorts",
    description: "High-performance athletic shorts with moisture-wicking technology.",
    price: 49.99,
    compareAtPrice: 69.99,
    category: "men",
    subcategory: "shorts",
    categoryPath: "men/shorts",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600404909295-aa6fb386f450?q=80",
        alt: "Athletic Performance Shorts",
        position: 0,
      },
    ],
    variants: [
      { size: "S", color: "Black", sku: "APS-BLK-S", inventory: 20, price: 49.99 },
      { size: "M", color: "Black", sku: "APS-BLK-M", inventory: 25, price: 49.99 },
      { size: "L", color: "Black", sku: "APS-BLK-L", inventory: 22, price: 49.99 },
      { size: "XL", color: "Black", sku: "APS-BLK-XL", inventory: 18, price: 49.99 },
      { size: "S", color: "Navy", sku: "APS-NAV-S", inventory: 18, price: 49.99 },
      { size: "M", color: "Navy", sku: "APS-NAV-M", inventory: 23, price: 49.99 },
      { size: "L", color: "Navy", sku: "APS-NAV-L", inventory: 20, price: 49.99 },
      { size: "XL", color: "Navy", sku: "APS-NAV-XL", inventory: 16, price: 49.99 },
      { size: "S", color: "Grey", sku: "APS-GRY-S", inventory: 15, price: 49.99 },
      { size: "M", color: "Grey", sku: "APS-GRY-M", inventory: 19, price: 49.99 },
      { size: "L", color: "Grey", sku: "APS-GRY-L", inventory: 17, price: 49.99 },
      { size: "XL", color: "Grey", sku: "APS-GRY-XL", inventory: 14, price: 49.99 },
    ],
    tags: ["athletic", "performance", "shorts", "activewear"],
    collections: ["new-arrivals"],
    isFeatured: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.4,
    reviewCount: 134,
    salesCount: 289,
  },
];

const demoUsers = [
  {
    email: "admin@urbanecho.com",
    emailVerified: true,
    firstName: "Admin",
    lastName: "User",
    name: "Admin User",
    role: "ADMIN",
    isActive: true,
    preferences: {
      theme: "dark",
      currency: "USD",
      language: "en",
      newsletters: true,
      notifications: true,
    },
    addresses: [
      {
        type: "both",
        isDefault: true,
        firstName: "Admin",
        lastName: "User",
        street: "123 Business Center Dr",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "US",
        phoneNumber: "+1-555-0100",
      },
    ],
    wishlist: [],
    lastLoginAt: new Date(),
  },
  {
    email: "john.doe@example.com",
    emailVerified: true,
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    role: "CUSTOMER",
    isActive: true,
    preferences: {
      theme: "light",
      currency: "USD",
      language: "en",
      newsletters: true,
      notifications: false,
    },
    addresses: [
      {
        type: "both",
        isDefault: true,
        firstName: "John",
        lastName: "Doe",
        street: "456 Oak Street",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "US",
        phoneNumber: "+1-555-0101",
      },
    ],
    wishlist: [],
    lastLoginAt: new Date(Date.now() - 86400000),
  },
  {
    email: "jane.smith@example.com",
    emailVerified: true,
    firstName: "Jane",
    lastName: "Smith",
    name: "Jane Smith",
    role: "CUSTOMER",
    isActive: true,
    preferences: {
      theme: "light",
      currency: "USD",
      language: "en",
      newsletters: false,
      notifications: true,
    },
    addresses: [
      {
        type: "shipping",
        isDefault: true,
        firstName: "Jane",
        lastName: "Smith",
        street: "789 Pine Avenue",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "US",
        phoneNumber: "+1-555-0102",
      },
      {
        type: "billing",
        isDefault: false,
        firstName: "Jane",
        lastName: "Smith",
        street: "321 Maple Lane",
        city: "Chicago",
        state: "IL",
        zipCode: "60602",
        country: "US",
        phoneNumber: "+1-555-0102",
      },
    ],
    wishlist: [],
    lastLoginAt: new Date(Date.now() - 172800000),
  },
  {
    email: "mike.wilson@example.com",
    emailVerified: false,
    firstName: "Mike",
    lastName: "Wilson",
    name: "Mike Wilson",
    role: "CUSTOMER",
    isActive: true,
    preferences: {
      theme: "dark",
      currency: "USD",
      language: "en",
      newsletters: true,
      notifications: true,
    },
    addresses: [
      {
        type: "both",
        isDefault: true,
        firstName: "Mike",
        lastName: "Wilson",
        street: "654 Cedar Blvd",
        city: "Miami",
        state: "FL",
        zipCode: "33101",
        country: "US",
        phoneNumber: "+1-555-0103",
      },
    ],
    wishlist: [],
    lastLoginAt: new Date(Date.now() - 259200000),
  },
  {
    email: "sarah.johnson@example.com",
    emailVerified: true,
    firstName: "Sarah",
    lastName: "Johnson",
    name: "Sarah Johnson",
    role: "CUSTOMER",
    isActive: true,
    preferences: {
      theme: "light",
      currency: "USD",
      language: "en",
      newsletters: true,
      notifications: false,
    },
    addresses: [
      {
        type: "both",
        isDefault: true,
        firstName: "Sarah",
        lastName: "Johnson",
        street: "987 Elm Street",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "US",
        phoneNumber: "+1-555-0104",
      },
    ],
    wishlist: [],
    lastLoginAt: new Date(Date.now() - 432000000),
  },
];

const createDemoOrders = (users, products) => {
  const orders = [];
  const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

  const customers = users.filter(user => user.role === "CUSTOMER");

  customers.forEach((customer, _customerIndex) => {
    const orderCount = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < orderCount; i++) {
      const orderDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const itemCount = Math.floor(Math.random() * 3) + 1;
      const orderItems = [];
      let orderTotal = 0;

      for (let j = 0; j < itemCount; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const variant = product.variants[Math.floor(Math.random() * product.variants.length)];
        const quantity = Math.floor(Math.random() * 2) + 1;
        const itemPrice = variant.price;
        const itemTotal = itemPrice * quantity;

        orderItems.push({
          product: product._id,
          productName: product.name,
          variant: {
            size: variant.size,
            color: variant.color,
            sku: variant.sku,
          },
          quantity: quantity,
          price: itemPrice,
          total: itemTotal,
        });

        orderTotal += itemTotal;
      }

      const shipping = orderTotal > 100 ? 0 : 9.99;
      const tax = orderTotal * 0.08;
      const finalTotal = orderTotal + shipping + tax;

      orders.push({
        orderNumber: `UE-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        user: customer._id,
        items: orderItems,
        status: status,
        subtotal: orderTotal,
        shipping: shipping,
        tax: tax,
        total: finalTotal,
        shippingAddress: customer.addresses[0],
        billingAddress: customer.addresses[customer.addresses.length - 1],
        createdAt: orderDate,
        updatedAt: orderDate,
      });
    }
  });

  return orders;
};

/**
 * Main seeding function that orchestrates the complete database setup
 * Connects to MongoDB, clears existing data, and seeds with demo data
 * @async
 * @function seedBetaDemo
 * @returns {Promise<void>} Resolves when seeding is complete
 */
async function seedBetaDemo() {
  console.log("🌱 Starting Urban Echo Beta Demo Seeding...\n");

  try {
    await dbConnect();
    console.log("📊 MongoDB connected successfully\n");

    const Product = (await import("../utils/models/product.js")).default;
    const User = (await import("../utils/models/user.js")).default;
    const Order = (await import("../utils/models/order.js")).default;

    console.log("🧹 Clearing existing data...");
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    console.log("✅ Existing data cleared\n");

    console.log("🛍️ Seeding products...");
    const createdProducts = await Product.insertMany(demoProducts);
    console.log(`✅ Created ${createdProducts.length} products\n`);

    demoUsers[1].wishlist = [
      { productId: createdProducts[0]._id, addedAt: new Date() },
      { productId: createdProducts[6]._id, addedAt: new Date() },
    ];
    demoUsers[2].wishlist = [
      { productId: createdProducts[1]._id, addedAt: new Date() },
      { productId: createdProducts[9]._id, addedAt: new Date() },
      { productId: createdProducts[10]._id, addedAt: new Date() },
    ];
    demoUsers[3].wishlist = [{ productId: createdProducts[7]._id, addedAt: new Date() }];

    console.log("👥 Seeding users...");
    const createdUsers = await User.insertMany(demoUsers);
    console.log(`✅ Created ${createdUsers.length} users\n`);

    console.log("📦 Creating demo orders...");
    const demoOrders = createDemoOrders(createdUsers, createdProducts);
    const createdOrders = await Order.insertMany(demoOrders);
    console.log(`✅ Created ${createdOrders.length} orders\n`);

    console.log("📊 Database Summary:");
    console.log(`   📦 Products: ${createdProducts.length}`);
    console.log(`   👥 Users: ${createdUsers.length}`);
    console.log(`   🛒 Orders: ${createdOrders.length}`);

    const featuredCount = createdProducts.filter(p => p.isFeatured).length;
    const newArrivalsCount = createdProducts.filter(p => p.isNewArrival).length;
    const totalVariants = createdProducts.reduce((sum, p) => sum + p.variants.length, 0);
    const totalInventory = createdProducts.reduce(
      (sum, p) => sum + p.variants.reduce((varSum, v) => varSum + v.inventory, 0),
      0
    );

    console.log(`   ⭐ Featured Products: ${featuredCount}`);
    console.log(`   🆕 New Arrivals: ${newArrivalsCount}`);
    console.log(`   📋 Product Variants: ${totalVariants}`);
    console.log(`   📦 Total Inventory: ${totalInventory} items`);

    const customerCount = createdUsers.filter(u => u.role === "CUSTOMER").length;
    const adminCount = createdUsers.filter(u => u.role === "ADMIN").length;
    const totalWishlistItems = createdUsers.reduce((sum, u) => sum + u.wishlist.length, 0);

    console.log(`   👤 Customers: ${customerCount}`);
    console.log(`   🔧 Admins: ${adminCount}`);
    console.log(`   ❤️ Wishlist Items: ${totalWishlistItems}`);

    const ordersByStatus = createdOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    console.log(`   📋 Orders by Status:`);
    Object.entries(ordersByStatus).forEach(([status, count]) => {
      console.log(`      ${status}: ${count}`);
    });

    const totalRevenue = createdOrders.reduce((sum, order) => sum + order.total, 0);
    console.log(`   💰 Total Revenue: ${totalRevenue.toFixed(2)}`);

    console.log("\n🎉 Beta Demo Database Seeding Completed Successfully!");

    console.log("\n🌐 Test APIs:");
    console.log("   • http://localhost:3000/api/products");
    console.log("   • http://localhost:3000/api/products/featured");
    console.log("   • http://localhost:3000/api/products/new-arrivals");
    console.log("   • http://localhost:3000/api/users");
    console.log("   • http://localhost:3000/api/orders");
  } catch (error) {
    console.error("❌ Demo seeding failed:", error.message);
    console.error("Stack trace:", error.stack);
  } finally {
    process.exit(0);
  }
}

seedBetaDemo();
