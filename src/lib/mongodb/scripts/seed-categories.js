/* eslint-disable no-relative-import-paths/no-relative-import-paths */
import dbConnect from "../client.js";

const demoCategories = [
  {
    id: "men",
    name: "Men",
    slug: "men",
    level: 0,
    path: "/men",
    description:
      "Discover the latest in men's fashion with our curated collection of premium clothing and accessories.",
    shortDescription: "Premium men's fashion and accessories",
    image: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
      alt: "Men's Fashion Collection",
      position: 0,
    },
    bannerImage: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      alt: "Men's Fashion Banner",
    },
    isMainNavigation: true,
    navigationOrder: 1,
    seo: {
      title: "Men's Clothing & Fashion | Urban Echo",
      metaDescription:
        "Shop the latest men's clothing, shoes, and accessories. Premium quality fashion for the modern man.",
      keywords: ["men's clothing", "men's fashion", "men's apparel", "urban style"],
    },
    collections: ["new-arrivals", "best-sellers"],
    tags: ["men", "fashion", "clothing"],
    isActive: true,
    isVisible: true,
  },
  {
    id: "women",
    name: "Women",
    slug: "women",
    level: 0,
    path: "/women",
    description:
      "Explore our sophisticated women's collection featuring contemporary styles and timeless elegance.",
    shortDescription: "Contemporary women's fashion",
    image: {
      url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80",
      alt: "Women's Fashion Collection",
      position: 0,
    },
    bannerImage: {
      url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
      alt: "Women's Fashion Banner",
    },
    isMainNavigation: true,
    navigationOrder: 2,
    seo: {
      title: "Women's Clothing & Fashion | Urban Echo",
      metaDescription:
        "Discover stylish women's clothing, dresses, shoes, and accessories. Contemporary fashion for every occasion.",
      keywords: ["women's clothing", "women's fashion", "dresses", "contemporary style"],
    },
    collections: ["new-arrivals", "trending"],
    tags: ["women", "fashion", "clothing"],
    isActive: true,
    isVisible: true,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    level: 0,
    path: "/accessories",
    description:
      "Complete your look with our curated selection of premium accessories, bags, and jewelry.",
    shortDescription: "Premium accessories and jewelry",
    image: {
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
      alt: "Accessories Collection",
      position: 0,
    },
    bannerImage: {
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
      alt: "Accessories Banner",
    },
    isMainNavigation: true,
    navigationOrder: 3,
    seo: {
      title: "Fashion Accessories | Urban Echo",
      metaDescription:
        "Shop premium bags, jewelry, watches, and accessories to complete your perfect look.",
      keywords: ["accessories", "bags", "jewelry", "watches", "fashion accessories"],
    },
    collections: ["trending", "limited-edition"],
    tags: ["accessories", "bags", "jewelry"],
    isActive: true,
    isVisible: true,
  },
  {
    id: "sale",
    name: "Sale",
    slug: "sale",
    level: 0,
    path: "/sale",
    description: "Don't miss out on incredible deals and discounts on your favorite items.",
    shortDescription: "Special offers and discounts",
    image: {
      url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=500&q=80",
      alt: "Sale Collection",
      position: 0,
    },
    bannerImage: {
      url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
      alt: "Sale Banner",
    },
    isMainNavigation: true,
    isHighlighted: true,
    navigationOrder: 4,
    seo: {
      title: "Sale & Discounts | Urban Echo",
      metaDescription:
        "Shop amazing deals and discounts on premium fashion items. Limited time offers!",
      keywords: ["sale", "discounts", "deals", "fashion sale", "clothing deals"],
    },
    collections: ["sale"],
    tags: ["sale", "discount", "deals"],
    isActive: true,
    isVisible: true,
  },
  {
    id: "men-shirts",
    name: "Shirts",
    slug: "shirts",
    parentCategory: "men",
    level: 1,
    path: "/men/shirts",
    description: "Premium men's shirts for business, casual, and formal occasions.",
    shortDescription: "Men's shirts collection",
    navigationOrder: 1,
    seo: {
      title: "Men's Shirts | Urban Echo",
      metaDescription: "Shop premium men's dress shirts, casual shirts, and more.",
      keywords: ["men's shirts", "dress shirts", "casual shirts"],
    },
    isActive: true,
    isVisible: true,
  },
  {
    id: "men-pants",
    name: "Pants",
    slug: "pants",
    parentCategory: "men",
    level: 1,
    path: "/men/pants",
    description: "Men's pants including chinos, trousers, and casual wear.",
    shortDescription: "Men's pants collection",
    navigationOrder: 2,
    seo: {
      title: "Men's Pants | Urban Echo",
      metaDescription: "Shop men's chinos, dress pants, and casual trousers.",
      keywords: ["men's pants", "chinos", "trousers"],
    },
    isActive: true,
    isVisible: true,
  },
  {
    id: "men-jackets",
    name: "Jackets & Coats",
    slug: "jackets",
    parentCategory: "men",
    level: 1,
    path: "/men/jackets",
    description: "Men's jackets and outerwear for every season and occasion.",
    shortDescription: "Men's jackets and outerwear",
    navigationOrder: 3,
    seo: {
      title: "Men's Jackets & Coats | Urban Echo",
      metaDescription: "Shop men's jackets, coats, and outerwear for style and comfort.",
      keywords: ["men's jackets", "outerwear", "coats"],
    },
    isActive: true,
    isVisible: true,
  },
  {
    id: "men-hoodies",
    name: "Hoodies & Sweatshirts",
    slug: "hoodies",
    parentCategory: "men",
    level: 1,
    path: "/men/hoodies",
    description: "Comfortable men's hoodies and sweatshirts for casual style.",
    shortDescription: "Men's hoodies and sweatshirts",
    navigationOrder: 4,
    seo: {
      title: "Men's Hoodies & Sweatshirts | Urban Echo",
      metaDescription: "Shop comfortable men's hoodies and sweatshirts.",
      keywords: ["men's hoodies", "sweatshirts", "casual wear"],
    },
    isActive: true,
    isVisible: true,
  },
  {
    id: "accessories-bags",
    name: "Bags",
    slug: "bags",
    parentCategory: "accessories",
    level: 1,
    path: "/accessories/bags",
    description: "Premium bags including backpacks, handbags, and travel bags.",
    shortDescription: "Bags and backpacks",
    navigationOrder: 1,
    seo: {
      title: "Bags & Backpacks | Urban Echo",
      metaDescription: "Shop premium bags, backpacks, and handbags.",
      keywords: ["bags", "backpacks", "handbags"],
    },
    isActive: true,
    isVisible: true,
  },
  {
    id: "accessories-watches",
    name: "Watches",
    slug: "watches",
    parentCategory: "accessories",
    level: 1,
    path: "/accessories/watches",
    description: "Premium watches and timepieces for men and women.",
    shortDescription: "Watches and timepieces",
    navigationOrder: 2,
    seo: {
      title: "Watches | Urban Echo",
      metaDescription: "Shop premium watches and luxury timepieces.",
      keywords: ["watches", "timepieces", "luxury watches"],
    },
    isActive: true,
    isVisible: true,
  },
];

async function seedCategories() {
  console.log("🏷️ Starting Categories Seeding...\n");

  try {
    await dbConnect();
    console.log("📊 MongoDB connected successfully\n");

    const Category = (await import("./node/models/category.js")).default;

    console.log("🧹 Clearing existing categories...");
    await Category.deleteMany({});
    console.log("✅ Existing categories cleared\n");

    console.log("🏷️ Seeding categories...");
    const createdCategories = await Category.insertMany(demoCategories);
    console.log(`✅ Created ${createdCategories.length} categories\n`);

    console.log("📊 Updating product counts...");
    const Product = (await import("./node/models/product.js")).default;

    for (const category of createdCategories) {
      if (category.level === 0) {
        const productCount = await Product.countDocuments({
          category: category.id,
          isActive: true,
        });

        category.productCount = productCount;
        await category.save();

        console.log(`   ${category.name}: ${productCount} products`);
      }
    }

    console.log("\n📊 Categories Summary:");
    console.log(`   📁 Main Categories: ${createdCategories.filter(c => c.level === 0).length}`);
    console.log(`   📂 Subcategories: ${createdCategories.filter(c => c.level === 1).length}`);

    const mainCategories = createdCategories.filter(c => c.level === 0 && c.isMainNavigation);
    console.log("\n🧭 Main Navigation Categories:");
    mainCategories.forEach(cat => {
      console.log(`   ${cat.navigationOrder}. ${cat.name} (${cat.id})`);
    });

    console.log("\n🎉 Categories Seeding Completed Successfully!");
  } catch (error) {
    console.error("❌ Categories seeding failed:", error.message);
  } finally {
    process.exit(0);
  }
}

seedCategories();
