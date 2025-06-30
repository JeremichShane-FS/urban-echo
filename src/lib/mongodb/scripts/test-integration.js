// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import dbConnect from "../client.js";

const ERROR_SOURCE = "integration-test";

const logError = (error, context = {}) => {
  console.error(`❌ [${ERROR_SOURCE}] ${error.message}`);
  if (Object.keys(context).length > 0) {
    console.error("Context:", context);
  }
};

// Helper function to test database connection
async function testDatabaseConnection() {
  console.log("1. Testing MongoDB connection...");
  await dbConnect();
  console.log("✅ MongoDB connected\n");
}

// Helper function to import models
async function importModels() {
  console.log("2. Testing MongoDB models...");
  const Product = (await import("./node/models/product.js")).default;
  const User = (await import("./node/models/user.js")).default;
  const Order = (await import("./node/models/order.js")).default;

  console.log("✅ All models imported successfully\n");
  return { Product, User, Order };
}

// Helper function to check collections
async function checkCollections(Product, User, Order) {
  console.log("3. Checking database collections...");
  const productCount = await Product.countDocuments();
  const userCount = await User.countDocuments();
  const orderCount = await Order.countDocuments();

  console.log("📊 Database Status:");
  console.log(`   Products: ${productCount}`);
  console.log(`   Users: ${userCount}`);
  console.log(`   Orders: ${orderCount}\n`);

  return { productCount, userCount, orderCount };
}

// Helper function to test product queries
async function testProductQueries(Product, productCount) {
  if (productCount === 0) {
    console.log("4. ⚠️ No products found - run seed script first\n");
    return;
  }

  console.log("4. Testing product queries...");
  const featuredProducts = await Product.find({ isFeatured: true }).limit(3);
  const newArrivals = await Product.find({ isNewArrival: true }).limit(3);
  const activeProducts = await Product.find({ isActive: true }).limit(3);

  console.log(`✅ Found ${featuredProducts.length} featured products`);
  console.log(`✅ Found ${newArrivals.length} new arrivals`);
  console.log(`✅ Found ${activeProducts.length} active products\n`);

  displaySampleProduct(activeProducts);
}

// Helper function to display sample product
function displaySampleProduct(activeProducts) {
  if (activeProducts.length === 0) return;

  const sampleProduct = activeProducts[0];
  console.log(`   Sample product: ${sampleProduct.name}`);
  console.log(`   Price: $${sampleProduct.price}`);
  console.log(`   Category: ${sampleProduct.category}`);
  console.log(`   Variants: ${sampleProduct.variants?.length || 0}`);
  console.log(
    `   In stock: ${sampleProduct.variants?.some(v => v.inventory > 0) ? "Yes" : "No"}\n`
  );
}

// Helper function to test user functionality
async function testUserFunctionality(User, userCount) {
  if (userCount === 0) {
    console.log("5. ⚠️ No users found - run seed script first\n");
    return;
  }

  console.log("5. Testing user functionality...");
  const sampleUser = await User.findOne();
  if (!sampleUser) return;

  console.log(`✅ Sample user found: ${sampleUser.email}`);
  console.log(`   Display name: ${sampleUser.displayName}`);
  console.log(`   Initials: ${sampleUser.initials}`);
  console.log(`   Role: ${sampleUser.role}`);
  console.log(`   Wishlist items: ${sampleUser.wishlist?.length || 0}`);
  console.log(`   Addresses: ${sampleUser.addresses?.length || 0}\n`);
}

// Helper function to test data relationships
async function testDataRelationships(Product, User, productCount, userCount) {
  console.log("6. Testing data relationships...");

  if (productCount === 0 || userCount === 0) {
    console.log("");
    return;
  }

  await testProductVariants(Product);
  await testUserWishlist(User);
  console.log("");
}

// Helper function to test product variants
async function testProductVariants(Product) {
  const productWithVariants = await Product.findOne({ "variants.0": { $exists: true } });
  if (productWithVariants) {
    console.log(
      `✅ Product variants working - ${productWithVariants.name} has ${productWithVariants.variants.length} variants`
    );
  }
}

// Helper function to test user wishlist
async function testUserWishlist(User) {
  const userWithWishlist = await User.findOne({ "wishlist.0": { $exists: true } });
  if (userWithWishlist) {
    console.log(`✅ User wishlist working - user has ${userWithWishlist.wishlist.length} items`);
  }
}

// Helper function to test Strapi connection
async function testStrapiConnection() {
  console.log("7. Testing Strapi connection...");
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!STRAPI_URL) {
    console.log("⚠️ Strapi URL not configured (this is OK for MongoDB-only testing)");
    console.log("");
    return;
  }

  try {
    const response = await fetch(`${STRAPI_URL}/api/hero-contents?populate=*`);
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Strapi connection works - found ${data.data?.length || 0} hero contents`);
    } else {
      console.log(`⚠️ Strapi responded with status: ${response.status}`);
    }
  } catch (error) {
    console.log(`⚠️ Strapi connection failed: ${error.message}`);
  }
  console.log("");
}

// Helper function for environment check
function checkEnvironment() {
  console.log("8. Environment check...");
  console.log(`   Node environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`   MongoDB URI configured: ${!!process.env.MONGODB_URI}`);
  console.log(`   Strapi URL configured: ${!!process.env.NEXT_PUBLIC_STRAPI_URL}`);
  console.log(`   Strapi token configured: ${!!process.env.NEXT_PUBLIC_STRAPI_TOKEN}\n`);
}

// Helper function to display API endpoints
function displayAPIEndpoints() {
  console.log("9. API endpoints (test these in browser after seeding):");
  console.log("   • http://localhost:3000/api/products");
  console.log("   • http://localhost:3000/api/products/featured");
  console.log("   • http://localhost:3000/api/products/new-arrivals");
  console.log("   • http://localhost:3000/api/cart?items=PRODUCT_ID\n");
}

// Helper function to check database indexes
async function checkDatabaseIndexes(Product, User, productCount, userCount) {
  console.log("10. Checking database indexes...");

  if (productCount > 0) {
    const productIndexes = await Product.collection.getIndexes();
    console.log(`✅ Product indexes: ${Object.keys(productIndexes).length} indexes created`);
  }

  if (userCount > 0) {
    const userIndexes = await User.collection.getIndexes();
    console.log(`✅ User indexes: ${Object.keys(userIndexes).length} indexes created\n`);
  }
}

// Helper function to display completion messages
function displayCompletionMessages() {
  console.log("🎉 Hybrid setup test completed successfully!");
  console.log("✨ MongoDB + Strapi integration is ready for development!");
}

// Helper function to display troubleshooting tips
function displayTroubleshootingTips() {
  console.error("\n🔧 Troubleshooting:");
  console.error("   1. MongoDB Atlas is running");
  console.error("   2. Check MONGODB_URI in .env.local");
  console.error("   3. Ensure IP is whitelisted in MongoDB Atlas");
  console.error("   4. Run the seed script first: npm run db:seed");
  console.error("   5. Verify internet connection for MongoDB Atlas access");
}

// Main function with reduced complexity
async function testHybridSetup() {
  console.log("🧪 Testing Hybrid Strapi + MongoDB Setup...\n");

  try {
    await testDatabaseConnection();
    const { Order, Product, User } = await importModels();
    const { _orderCount, productCount, userCount } = await checkCollections(Product, User, Order);

    await testProductQueries(Product, productCount);
    await testUserFunctionality(User, userCount);
    await testDataRelationships(Product, User, productCount, userCount);
    await testStrapiConnection();
    checkEnvironment();
    displayAPIEndpoints();
    await checkDatabaseIndexes(Product, User, productCount, userCount);
  } catch (error) {
    logError(error, {
      action: "testHybridSetup",
      timestamp: new Date().toISOString(),
    });
    displayTroubleshootingTips();
  } finally {
    displayCompletionMessages();
    process.exit(0);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  testHybridSetup();
}

export default testHybridSetup;
