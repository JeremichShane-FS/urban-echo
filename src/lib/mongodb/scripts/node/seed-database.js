// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import dbConnect from "../../client.js";

const seedProducts = [
  {
    name: "Urban Casual Jacket",
    slug: "urban-casual-jacket",
    description: "A versatile urban jacket perfect for any casual occasion.",
    price: 300,
    category: "jackets",
    subcategory: "casual",
    brand: "Urban Echo",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Urban Casual Jacket",
        position: 1,
      },
    ],
    variants: [
      { size: "S", color: "black", sku: "UCJ-BLK-S", inventory: 15, price: 300 },
      { size: "M", color: "black", sku: "UCJ-BLK-M", inventory: 20, price: 300 },
      { size: "L", color: "black", sku: "UCJ-BLK-L", inventory: 18, price: 300 },
      { size: "XL", color: "black", sku: "UCJ-BLK-XL", inventory: 12, price: 300 },
      { size: "S", color: "navy", sku: "UCJ-NAV-S", inventory: 10, price: 300 },
      { size: "M", color: "navy", sku: "UCJ-NAV-M", inventory: 15, price: 300 },
      { size: "L", color: "navy", sku: "UCJ-NAV-L", inventory: 14, price: 300 },
      { size: "XL", color: "navy", sku: "UCJ-NAV-XL", inventory: 8, price: 300 },
      { size: "S", color: "charcoal", sku: "UCJ-CHR-S", inventory: 12, price: 300 },
      { size: "M", color: "charcoal", sku: "UCJ-CHR-M", inventory: 18, price: 300 },
      { size: "L", color: "charcoal", sku: "UCJ-CHR-L", inventory: 16, price: 300 },
      { size: "XL", color: "charcoal", sku: "UCJ-CHR-XL", inventory: 10, price: 300 },
    ],
    tags: ["urban", "casual", "jacket", "versatile"],
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    averageRating: 4.5,
    reviewCount: 128,
    seo: {
      title: "Urban Casual Jacket - Versatile Style | Urban Echo",
      description:
        "Shop the Urban Casual Jacket - perfect for any casual occasion. Available in black, navy, and charcoal.",
      keywords: ["urban jacket", "casual wear", "men's jacket", "versatile clothing"],
    },
  },
  {
    name: "Classic Denim Jeans",
    slug: "classic-denim-jeans",
    description: "Timeless denim jeans with the perfect fit.",
    price: 300,
    category: "jeans",
    subcategory: "classic",
    brand: "Urban Echo",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Classic Denim Jeans",
        position: 1,
      },
    ],
    variants: [
      { size: "28", color: "blue", sku: "CDJ-BLU-28", inventory: 25, price: 300 },
      { size: "30", color: "blue", sku: "CDJ-BLU-30", inventory: 30, price: 300 },
      { size: "32", color: "blue", sku: "CDJ-BLU-32", inventory: 35, price: 300 },
      { size: "34", color: "blue", sku: "CDJ-BLU-34", inventory: 28, price: 300 },
      { size: "36", color: "blue", sku: "CDJ-BLU-36", inventory: 20, price: 300 },
      { size: "28", color: "black", sku: "CDJ-BLK-28", inventory: 20, price: 300 },
      { size: "30", color: "black", sku: "CDJ-BLK-30", inventory: 25, price: 300 },
      { size: "32", color: "black", sku: "CDJ-BLK-32", inventory: 30, price: 300 },
      { size: "34", color: "black", sku: "CDJ-BLK-34", inventory: 22, price: 300 },
      { size: "36", color: "black", sku: "CDJ-BLK-36", inventory: 18, price: 300 },
    ],
    tags: ["denim", "jeans", "classic", "timeless"],
    isActive: true,
    isFeatured: true,
    isNewArrival: false,
    averageRating: 4.3,
    reviewCount: 94,
    seo: {
      title: "Classic Denim Jeans - Perfect Fit | Urban Echo",
      description:
        "Discover our Classic Denim Jeans with the perfect fit. Available in blue, black, and light-wash.",
      keywords: ["denim jeans", "classic jeans", "perfect fit", "men's denim"],
    },
  },
  {
    name: "Trendy Graphic Tee",
    slug: "trendy-graphic-tee",
    description:
      "Modern graphic tee with unique urban design that captures the essence of contemporary street fashion. Crafted from premium cotton blend fabric that offers exceptional softness and breathability for all-day comfort.",
    price: 45,
    category: "t-shirts",
    subcategory: "graphic",
    brand: "Urban Echo",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Trendy Graphic Tee",
        position: 1,
      },
    ],
    variants: [
      { size: "S", color: "white", sku: "TGT-WHT-S", inventory: 30, price: 45 },
      { size: "M", color: "white", sku: "TGT-WHT-M", inventory: 35, price: 45 },
      { size: "L", color: "white", sku: "TGT-WHT-L", inventory: 32, price: 45 },
      { size: "XL", color: "white", sku: "TGT-WHT-XL", inventory: 25, price: 45 },
      { size: "S", color: "black", sku: "TGT-BLK-S", inventory: 28, price: 45 },
      { size: "M", color: "black", sku: "TGT-BLK-M", inventory: 30, price: 45 },
      { size: "L", color: "black", sku: "TGT-BLK-L", inventory: 28, price: 45 },
      { size: "XL", color: "black", sku: "TGT-BLK-XL", inventory: 22, price: 45 },
    ],
    tags: ["graphic", "tee", "urban", "streetwear", "trendy"],
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    averageRating: 4.2,
    reviewCount: 23,
    seo: {
      title: "Trendy Graphic Tee - Urban Streetwear | Urban Echo",
      description:
        "Express your style with our Trendy Graphic Tee featuring unique urban designs. Premium cotton blend comfort.",
      keywords: ["graphic tee", "streetwear", "urban fashion", "trendy t-shirt"],
    },
  },
  {
    name: "Modern Blazer",
    slug: "modern-blazer",
    description: "Contemporary blazer for professional occasions.",
    price: 320,
    category: "blazers",
    subcategory: "professional",
    brand: "Urban Echo",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Modern Blazer",
        position: 1,
      },
    ],
    variants: [
      { size: "S", color: "navy", sku: "MB-NAV-S", inventory: 15, price: 320 },
      { size: "M", color: "navy", sku: "MB-NAV-M", inventory: 18, price: 320 },
      { size: "L", color: "navy", sku: "MB-NAV-L", inventory: 20, price: 320 },
      { size: "XL", color: "navy", sku: "MB-NAV-XL", inventory: 12, price: 320 },
      { size: "S", color: "charcoal", sku: "MB-CHR-S", inventory: 12, price: 320 },
      { size: "M", color: "charcoal", sku: "MB-CHR-M", inventory: 16, price: 320 },
      { size: "L", color: "charcoal", sku: "MB-CHR-L", inventory: 18, price: 320 },
      { size: "XL", color: "charcoal", sku: "MB-CHR-XL", inventory: 10, price: 320 },
    ],
    tags: ["blazer", "professional", "modern", "formal"],
    isActive: true,
    isFeatured: false,
    isNewArrival: true,
    averageRating: 4.6,
    reviewCount: 41,
    seo: {
      title: "Modern Blazer - Professional Style | Urban Echo",
      description:
        "Elevate your professional wardrobe with our Modern Blazer. Contemporary design for business occasions.",
      keywords: ["modern blazer", "professional wear", "business attire", "men's blazer"],
    },
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...\n");

    // Connect to MongoDB
    await dbConnect();
    console.log("✅ Connected to MongoDB\n");

    // Import models (Node.js versions)
    console.log("📦 Importing Product model...");
    const Product = (await import("./models/product.js")).default;
    console.log("   Product model name:", Product.modelName);

    console.log("👥 Importing User model...");
    const User = (await import("./models/user.js")).default;
    console.log("   User model name:", User.modelName);

    console.log("📦 Importing Order model...");
    const Order = (await import("./models/order.js")).default;
    console.log("   Order model name:", Order.modelName);

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    console.log("✅ Existing data cleared\n");

    // Seed products
    console.log("📦 Seeding products...");
    const createdProducts = await Product.insertMany(seedProducts);
    console.log(`✅ Created ${createdProducts.length} products\n`);

    // Create sample users
    console.log("👥 Creating sample users...");

    // Debug: Double-check User model
    console.log("   Final User model check:");
    console.log("   Model name:", User.modelName);
    console.log("   Schema paths:", Object.keys(User.schema.paths).slice(0, 10));

    // Verify this is actually a User schema by checking for user-specific fields
    const hasEmailField = User.schema.paths.email ? "YES" : "NO";
    const hasProductFields = User.schema.paths.category ? "YES" : "NO";
    console.log("   Has email field (should be YES):", hasEmailField);
    console.log("   Has category field (should be NO):", hasProductFields);

    if (hasProductFields === "YES") {
      throw new Error("User model is actually importing Product schema! Check model files.");
    }

    const sampleUsers = [
      {
        email: "admin@urbanecho.com",
        firstName: "Admin",
        lastName: "User",
        role: "ADMIN",
        emailVerified: true,
        preferences: {
          theme: "dark",
          currency: "USD",
          language: "en-US",
          newsletters: true,
          notifications: true,
        },
        addresses: [
          {
            type: "shipping",
            street: "123 Admin St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "US",
            isDefault: true,
          },
        ],
      },
      {
        email: "customer@example.com",
        firstName: "John",
        lastName: "Doe",
        role: "USER",
        emailVerified: true,
        preferences: {
          theme: "light",
          currency: "USD",
          language: "en-US",
          newsletters: false,
          notifications: true,
          size: "M",
          favoriteCategories: ["jackets", "jeans"],
        },
        addresses: [
          {
            type: "shipping",
            street: "456 Customer Ave",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90210",
            country: "US",
            isDefault: true,
          },
        ],
        wishlist: [{ productId: createdProducts[0]._id }, { productId: createdProducts[1]._id }],
      },
    ];

    let createdUsers;
    try {
      createdUsers = await User.insertMany(sampleUsers);
      console.log(`✅ Created ${createdUsers.length} users\n`);
    } catch (userError) {
      console.error("❌ User creation failed:", userError.message);
      console.error("Validation errors:", userError.errors);
      throw userError;
    }

    // Summary
    console.log("🎉 Database seeding completed successfully!");
    console.log("📊 Summary:");
    console.log(`   - Products: ${createdProducts.length}`);
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Featured Products: ${createdProducts.filter(p => p.isFeatured).length}`);
    console.log(`   - New Arrivals: ${createdProducts.filter(p => p.isNewArrival).length}`);
    console.log("\n📝 Next steps:");
    console.log("   1. Run: npm run db:test (to verify)");
    console.log("   2. Start dev server: npm run dev");
    console.log("   3. Visit: http://localhost:3000/api/products");
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    console.error("🔧 Check MONGODB_URI in .env.local");
  } finally {
    process.exit(0);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;
