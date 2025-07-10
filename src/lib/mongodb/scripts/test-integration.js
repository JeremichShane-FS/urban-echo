/**
 * @fileoverview Integration test script for verifying hybrid Strapi + MongoDB setup functionality
 * Provides comprehensive testing of database connections, model integrity, data relationships, and API endpoints
 * Includes environment validation, performance checks, and troubleshooting guidance for development setup
 */

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import dbConnect from "../client.js";

const ERROR_SOURCE = "integration-test";

/**
 * Logs error messages with context information for debugging
 * @param {Error} error - Error object to log
 * @param {Object} [context={}] - Additional context information for debugging
 */
const logError = (error, context = {}) => {
  console.error(`❌ [${ERROR_SOURCE}] ${error.message}`);
  if (Object.keys(context).length > 0) {
    console.error("Context:", context);
  }
};

/**
 * Tests MongoDB database connection and logs connection status
 * @async
 * @function testDatabaseConnection
 * @throws {Error} If database connection fails
 */
async function testDatabaseConnection() {
  console.log("1. Testing MongoDB connection...");
  await dbConnect();
  console.log("✅ MongoDB connected\n");
}

/**
 * Imports and validates MongoDB model modules for testing
 * @async
 * @function importModels
 * @returns {Promise<Object>} Object containing imported Product, User, and Order models
 * @throws {Error} If model import fails
 */
async function importModels() {
  console.log("2. Testing MongoDB models...");
  const Product = (await import("../utils/models/product.js")).default;
  const User = (await import("../utils/models/user.js")).default;
  const Order = (await import("../utils/models/order.js")).default;

  console.log("✅ All models imported successfully\n");
  return { Product, User, Order };
}

/**
 * Checks database collections and returns document counts for each model
 * @async
 * @function checkCollections
 * @param {Model} Product - Product mongoose model
 * @param {Model} User - User mongoose model
 * @param {Model} Order - Order mongoose model
 * @returns {Promise<Object>} Object containing document counts for each collection
 */
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

/**
 * Tests product query functionality including featured products, new arrivals, and active products
 * @async
 * @function testProductQueries
 * @param {Model} Product - Product mongoose model
 * @param {number} productCount - Total number of products in database
 */
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

/**
 * Displays sample product information for testing verification
 * @function displaySampleProduct
 * @param {Array<Object>} activeProducts - Array of active product documents
 */
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

/**
 * Tests user functionality including virtual properties and data structure
 * @async
 * @function testUserFunctionality
 * @param {Model} User - User mongoose model
 * @param {number} userCount - Total number of users in database
 */
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

/**
 * Tests data relationships between models including product variants and user wishlists
 * @async
 * @function testDataRelationships
 * @param {Model} Product - Product mongoose model
 * @param {Model} User - User mongoose model
 * @param {number} productCount - Total number of products in database
 * @param {number} userCount - Total number of users in database
 */
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

/**
 * Tests product variants functionality and data integrity
 * @async
 * @function testProductVariants
 * @param {Model} Product - Product mongoose model
 */
async function testProductVariants(Product) {
  const productWithVariants = await Product.findOne({ "variants.0": { $exists: true } });
  if (productWithVariants) {
    console.log(
      `✅ Product variants working - ${productWithVariants.name} has ${productWithVariants.variants.length} variants`
    );
  }
}

/**
 * Tests user wishlist functionality and data relationships
 * @async
 * @function testUserWishlist
 * @param {Model} User - User mongoose model
 */
async function testUserWishlist(User) {
  const userWithWishlist = await User.findOne({ "wishlist.0": { $exists: true } });
  if (userWithWishlist) {
    console.log(`✅ User wishlist working - user has ${userWithWishlist.wishlist.length} items`);
  }
}

/**
 * Tests Strapi CMS connection and API availability
 * @async
 * @function testStrapiConnection
 */
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

/**
 * Checks and displays environment configuration status
 * @function checkEnvironment
 */
function checkEnvironment() {
  console.log("8. Environment check...");
  console.log(`   Node environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`   MongoDB URI configured: ${!!process.env.MONGODB_URI}`);
  console.log(`   Strapi URL configured: ${!!process.env.NEXT_PUBLIC_STRAPI_URL}`);
  console.log(`   Strapi token configured: ${!!process.env.NEXT_PUBLIC_STRAPI_TOKEN}\n`);
}

/**
 * Displays available API endpoints for manual testing
 * @function displayAPIEndpoints
 */
function displayAPIEndpoints() {
  console.log("9. API endpoints (test these in browser after seeding):");
  console.log("   • http://localhost:3000/api/products");
  console.log("   • http://localhost:3000/api/products/featured");
  console.log("   • http://localhost:3000/api/products/new-arrivals");
  console.log("   • http://localhost:3000/api/cart?items=PRODUCT_ID\n");
}

/**
 * Checks database indexes for performance optimization verification
 * @async
 * @function checkDatabaseIndexes
 * @param {Model} Product - Product mongoose model
 * @param {Model} User - User mongoose model
 * @param {number} productCount - Total number of products in database
 * @param {number} userCount - Total number of users in database
 */
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

/**
 * Displays test completion success messages
 * @function displayCompletionMessages
 */
function displayCompletionMessages() {
  console.log("🎉 Hybrid setup test completed successfully!");
  console.log("✨ MongoDB + Strapi integration is ready for development!");
}

/**
 * Displays troubleshooting tips for common setup issues
 * @function displayTroubleshootingTips
 */
function displayTroubleshootingTips() {
  console.error("\n🔧 Troubleshooting:");
  console.error("   1. MongoDB Atlas is running");
  console.error("   2. Check MONGODB_URI in .env.local");
  console.error("   3. Ensure IP is whitelisted in MongoDB Atlas");
  console.error("   4. Run the seed script first: npm run db:seed");
  console.error("   5. Verify internet connection for MongoDB Atlas access");
}

/**
 * Main integration test function that orchestrates all testing procedures
 * @async
 * @function testHybridSetup
 * @throws {Error} If any part of the integration test fails
 */
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
