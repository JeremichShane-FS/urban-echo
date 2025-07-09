# JSDoc Implementation Guide
## JavaScript Projects

This guide establishes comprehensive JSDoc patterns for JavaScript projects. JSDoc provides type safety, IDE autocompletion, and excellent developer experience through detailed documentation.

---

## 📋 Quick Reference

### **Function Documentation:**
```javascript
/**
 * Brief description of what the function does
 * @param {Type} param - Parameter description
 * @returns {Type} Return value description
 * @throws {ErrorType} When error occurs
 * @example
 * // Usage example
 * functionName(param);
 */
```

### **Component Documentation:**
```javascript
/**
 * Component description
 * @param {Type} prop - Prop description
 * @param {function} onAction - Callback description
 * @returns {JSX.Element} Component
 * @example
 * <Component prop={value} onAction={handler} />
 */
```

### **API Route Documentation:**
```javascript
/**
 * GET /api/endpoint - Brief description
 * @param {NextApiRequest} req - Request object
 * @param {NextApiResponse} res - Response object
 * @returns {Promise<void>} API response
 * @throws {ValidationError} When validation fails
 * @example
 * // GET /api/products?category=shirts
 * // Returns: { data: [...], meta: {...} }
 */
```

### **Type Definition:**
```javascript
/**
 * @typedef {Object} TypeName
 * @property {string} id - Unique identifier
 * @property {number} value - Numeric value
 */
```

---

## 🎯 Core Principles

1. **Comprehensive type documentation** - Provide complete type information for all functions
2. **Detailed parameter descriptions** - Essential for understanding function contracts
3. **Rich examples for complex functions** - Show real usage patterns
4. **Complete error documentation** - Specify all thrown error types
5. **Thorough type definitions** - Create detailed @typedef for complex objects

---

## 🔧 Function Documentation

### **Utility Functions**
```javascript
/**
 * Calculates cart total including tax, shipping, and discounts
 * @param {Array<CartItem>} items - Array of cart items with price and quantity
 * @param {TaxCalculationOptions} taxOptions - Tax calculation configuration
 * @param {number} taxOptions.rate - Tax rate as decimal (0.08 for 8%)
 * @param {string} taxOptions.state - State code for tax calculation
 * @param {number} shippingCost - Shipping cost in cents
 * @param {DiscountCode|null} [discount=null] - Optional discount code object
 * @returns {CartTotalBreakdown} Complete cart total with itemized breakdown
 * @throws {ValidationError} When cart items array is empty or contains invalid items
 * @throws {TaxCalculationError} When tax calculation fails for the specified state
 * @throws {ShippingError} When shipping cost calculation fails
 * 
 * @example
 * const items = [
 *   { id: 'shirt-1', price: 2999, quantity: 2, name: 'Urban T-Shirt' },
 *   { id: 'jeans-1', price: 5999, quantity: 1, name: 'Slim Jeans' }
 * ];
 * const taxOptions = { rate: 0.08, state: 'CA' };
 * const total = calculateCartTotal(items, taxOptions, 599);
 * console.log(total.grandTotal); // 9837 (in cents)
 * 
 * @example
 * // With discount code
 * const discount = { code: 'SAVE20', type: 'percentage', value: 0.2 };
 * const total = calculateCartTotal(items, taxOptions, 599, discount);
 * console.log(total.discountAmount); // Applied discount in cents
 */
function calculateCartTotal(items, taxOptions, shippingCost, discount = null) {
    // Implementation
}
```

### **API Functions**
```javascript
/**
 * Fetches product data from the e-commerce API with caching and error handling
 * @async
 * @param {string} productId - Unique product identifier (format: 'prod_xxxxxxxxxx')
 * @param {FetchProductOptions} [options={}] - Additional fetch options
 * @param {boolean} [options.includeReviews=false] - Include product reviews in response
 * @param {boolean} [options.includeInventory=true] - Include inventory data in response
 * @param {boolean} [options.useCache=true] - Use cached data if available
 * @param {number} [options.timeout=5000] - Request timeout in milliseconds
 * @returns {Promise<Product|null>} Product object or null if not found
 * @throws {NetworkError} When API request fails due to network issues
 * @throws {ValidationError} When productId format is invalid
 * @throws {AuthenticationError} When API key is invalid or missing
 * @throws {TimeoutError} When request exceeds timeout duration
 * 
 * @example
 * // Basic product fetch
 * const product = await fetchProduct('prod_abc123');
 * if (product) {
 *   console.log(product.name, product.price);
 * }
 * 
 * @example
 * // Fetch with reviews and fresh data
 * const product = await fetchProduct('prod_abc123', {
 *   includeReviews: true,
 *   useCache: false,
 *   timeout: 10000
 * });
 */
async function fetchProduct(productId, options = {}) {
    // Implementation
}
```

---

## ⚛️ React Component Documentation

### **Functional Components**
```javascript
/**
 * Product card component for displaying product information in grid layouts
 * Handles product display, quick actions, and navigation to product details
 * @param {Product} product - Product data object
 * @param {string} product.id - Unique product identifier
 * @param {string} product.name - Product display name
 * @param {number} product.price - Product price in cents
 * @param {Array<string>} product.images - Array of product image URLs
 * @param {boolean} [showQuickAdd=false] - Show quick add to cart button
 * @param {boolean} [showWishlist=true] - Show wishlist heart icon
 * @param {ProductCardSize} [size='medium'] - Card size variant ('small'|'medium'|'large')
 * @param {function(Product): void} [onAddToCart] - Callback when item added to cart
 * @param {function(string): void} [onWishlistToggle] - Callback when wishlist toggled
 * @param {string} [className] - Additional CSS classes
 * @returns {JSX.Element} Product card component
 * 
 * @example
 * // Basic product card
 * <ProductCard 
 *   product={product} 
 *   onAddToCart={handleAddToCart}
 * />
 * 
 * @example
 * // Featured product with quick actions
 * <ProductCard 
 *   product={featuredProduct}
 *   size="large"
 *   showQuickAdd={true}
 *   onAddToCart={handleAddToCart}
 *   onWishlistToggle={handleWishlistToggle}
 *   className="featured-card"
 * />
 */
function ProductCard({ 
    product, 
    showQuickAdd = false, 
    showWishlist = true, 
    size = 'medium',
    onAddToCart,
    onWishlistToggle,
    className 
}) {
    // Implementation
}

// PropTypes for runtime validation
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    showQuickAdd: PropTypes.bool,
    showWishlist: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    onAddToCart: PropTypes.func,
    onWishlistToggle: PropTypes.func,
    className: PropTypes.string
};
```

---

## 🪝 React Hooks Documentation

### **Custom Hooks**
```javascript
/**
 * Custom hook for managing shopping cart state with persistence and validation
 * Provides cart operations, calculations, and automatic localStorage synchronization
 * @param {string} [userId] - User ID for cart persistence (guest cart if undefined)
 * @param {CartHookOptions} [options={}] - Hook configuration options
 * @param {number} [options.maxItems=50] - Maximum items allowed in cart
 * @param {boolean} [options.persistToStorage=true] - Save cart to localStorage
 * @param {boolean} [options.validateOnLoad=true] - Validate cart items on load
 * @param {number} [options.debounceMs=300] - Debounce time for storage updates
 * @returns {CartHookReturn} Cart state and management functions
 * 
 * @example
 * // Basic cart usage
 * const { items, addItem, removeItem, total, itemCount } = useCart();
 * 
 * @example
 * // User-specific cart with options
 * const { 
 *   items, 
 *   addItem, 
 *   updateQuantity, 
 *   total, 
 *   loading, 
 *   error 
 * } = useCart('user_123', { 
 *   maxItems: 20,
 *   validateOnLoad: true,
 *   debounceMs: 500
 * });
 * 
 * // Add product to cart
 * addItem({
 *   id: 'prod_abc123',
 *   name: 'Urban T-Shirt',
 *   price: 2999,
 *   size: 'M',
 *   color: 'black'
 * }, 2);
 */
function useCart(userId, options = {}) {
    // Implementation
}
```

---

## 📊 Type Definitions

### **Essential Types for E-commerce**
```javascript
/**
 * @typedef {Object} Product
 * @property {string} id - Unique product identifier
 * @property {string} name - Product display name
 * @property {string} description - Detailed product description
 * @property {number} price - Product price in cents
 * @property {ProductCategory} category - Product category information
 * @property {Array<ProductImage>} images - Product image URLs and metadata
 * @property {ProductInventory} inventory - Stock and variant information
 * @property {ProductSEO} seo - SEO metadata for product pages
 * @property {Date} createdAt - Product creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 * @property {boolean} isActive - Whether product is active/published
 */

/**
 * @typedef {Object} ProductInventory
 * @property {number} totalQuantity - Total available quantity across all variants
 * @property {boolean} trackQuantity - Whether to track inventory levels
 * @property {Array<ProductVariant>} variants - Size/color variants with individual stock
 * @property {boolean} allowBackorder - Allow orders when out of stock
 * @property {number} lowStockThreshold - Quantity threshold for low stock warnings
 * @property {string} warehouseLocation - Primary warehouse location code
 */

/**
 * @typedef {Object} ProductVariant
 * @property {string} sku - Stock keeping unit identifier
 * @property {string} size - Size option (XS, S, M, L, XL, XXL)
 * @property {string} color - Color name for display
 * @property {string} colorHex - Hex color code for color swatches
 * @property {number} quantity - Available quantity for this specific variant
 * @property {number} [priceAdjustment] - Price adjustment in cents (optional)
 * @property {Array<string>} [images] - Variant-specific image URLs (optional)
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id - Product ID reference
 * @property {string} name - Product name for display
 * @property {number} price - Unit price in cents at time of addition
 * @property {number} quantity - Quantity of this item in cart
 * @property {string} [size] - Selected size variant
 * @property {string} [color] - Selected color variant
 * @property {string} image - Primary product image URL
 * @property {Date} addedAt - Timestamp when item was added to cart
 * @property {string} [notes] - Special instructions or customizations
 */

/**
 * @typedef {Object} CartTotalBreakdown
 * @property {number} subtotal - Subtotal before tax and shipping (cents)
 * @property {number} tax - Calculated tax amount (cents)
 * @property {number} shipping - Shipping cost (cents)
 * @property {number} discount - Total discount applied (cents, negative value)
 * @property {number} grandTotal - Final total amount (cents)
 * @property {string} currency - Currency code (e.g., 'USD')
 * @property {Array<AppliedDiscount>} appliedDiscounts - Details of applied discounts
 */

/**
 * @typedef {Object} CartHookReturn
 * @property {Array<CartItem>} items - Current cart items
 * @property {function(Product, number): void} addItem - Add item to cart
 * @property {function(string): void} removeItem - Remove item from cart by ID
 * @property {function(string, number): void} updateQuantity - Update item quantity
 * @property {function(): void} clearCart - Remove all items from cart
 * @property {CartTotalBreakdown} total - Cart total calculations
 * @property {number} itemCount - Total number of individual items
 * @property {boolean} loading - Loading state for cart operations
 * @property {string|null} error - Error message if any operation fails
 * @property {boolean} isEmpty - Whether cart has no items
 */
```

---

## 🔧 Module Exports Documentation

### **Object Collections**

**Use `@namespace` only when exporting an object with multiple related methods:**

```javascript
/**
 * @namespace Validators
 * @description E-commerce form validation utilities
 */
export const Validators = {
    email: validateEmail,
    phone: validatePhone,
    address: validateAddress,
    creditCard: validateCreditCard
};

/**
 * @namespace CartOperations
 * @description Shopping cart management operations
 */
export const CartOperations = {
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    updateQuantity: updateItemQuantity,
    calculateTotal: calculateCartTotal
};
```

**Skip `@namespace` for individual function exports:**
```javascript
// Just document each function individually
export function validateEmail(email) { }
export function formatPrice(cents) { }
export function generateSlug(title) { }
```

---

## 🌐 API Route Documentation

### **Complete API Documentation**
```javascript
/**
 * @fileoverview Products API endpoints for e-commerce platform
 * Handles product CRUD operations, search, filtering, and pagination
 */

/**
 * Products API handler - supports GET (list products) and POST (create product)
 * 
 * GET /api/products - List products with filtering and pagination
 * @param {NextApiRequest} req - Next.js API request object
 * @param {NextApiResponse} res - Next.js API response object
 * @returns {Promise<void>} JSON response with products or error
 * 
 * @throws {ValidationError} When request validation fails
 * @throws {AuthenticationError} When authentication is required for POST
 * @throws {DatabaseError} When database operation fails
 * 
 * Query Parameters (GET):
 * - req.query.category {string} - Filter by category ID
 * - req.query.search {string} - Search term for product names/descriptions
 * - req.query.page {string} - Page number (converts to number, default: 1)
 * - req.query.limit {string} - Page size (converts to number, default: 20)
 * - req.query.sort {string} - Sort field (name, price, createdAt)
 * - req.query.order {string} - Sort order (asc, desc)
 * 
 * Request Body (POST):
 * - req.body.name {string} - Product name (required)
 * - req.body.price {number} - Price in cents (required)
 * - req.body.description {string} - Product description
 * - req.body.category {string} - Category ID (required)
 * - req.body.images {Array<string>} - Image URLs
 * - req.body.inventory {Object} - Inventory configuration
 * 
 * @example
 * // GET /api/products?category=shirts&page=1&limit=10
 * // Returns: { 
 * //   data: { products: [...], pagination: {...} },
 * //   success: true 
 * // }
 * 
 * @example
 * // POST /api/products
 * // Body: { name: "Urban Hoodie", price: 4999, category: "hoodies" }
 * // Returns: { data: { product: {...} }, success: true }
 */
export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                return await handleGetProducts(req, res);
            case 'POST':
                return await handleCreateProduct(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                return res.status(405).json({ 
                    error: `Method ${req.method} not allowed`,
                    success: false 
                });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            success: false 
        });
    }
}

/**
 * Handles GET requests for product listing with filtering and pagination
 * @param {NextApiRequest} req - Request object with query parameters
 * @param {NextApiResponse} res - Response object
 * @returns {Promise<void>} JSON response with products and pagination metadata
 */
async function handleGetProducts(req, res) {
    // Implementation
}

/**
 * Handles POST requests for product creation with validation
 * @param {NextApiRequest} req - Request object with product data in body
 * @param {NextApiResponse} res - Response object  
 * @returns {Promise<void>} JSON response with created product
 */
async function handleCreateProduct(req, res) {
    // Implementation
}
```

---

## 🧹 Documentation Efficiency for Large Files

### **Streamlining Strategy for Constants and Configuration Files**

Large configuration files require balanced documentation to avoid documentation fatigue while maintaining IDE benefits.

#### **Full Documentation (Detailed JSDoc)**
Document thoroughly when constants contain:
- **Complex business logic** - Cache strategies, rate limiting rules
- **Domain-specific configurations** - Webhook events, CORS policies  
- **Non-obvious relationships** - API endpoint groupings with examples
- **Performance implications** - Timeout values, cache durations with reasoning

```javascript
// =================================================================
// ENVIRONMENT URLS
// =================================================================

/** @constant {string} Base URL for API requests */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/** @constant {string} Current API version */
export const API_VERSION = "v1";

// =================================================================
// PERFORMANCE CONFIGURATION
// =================================================================

/**
 * Cache strategies for different endpoint types based on data volatility
 * @constant {Object} CACHE_STRATEGIES
 * @property {number} products - Product data cache duration (medium-term)
 * @property {number} categories - Category data cache duration (long-term)
 * @property {number} cart - Cart data cache duration (no cache for user data)
 * 
 * @example
 * // Apply cache strategy based on data type
 * const getCacheStrategy = (dataType) => CACHE_STRATEGIES[dataType] || 0;
 */
export const CACHE_STRATEGIES = {
  products: CACHE_DURATION.medium,
  categories: CACHE_DURATION.long,
  cart: 0, // No cache for user-specific data
};
```

#### **Minimal Documentation (Streamlined JSDoc)**
Use concise documentation for:
- **Web standards** - HTTP status codes, content types, standard headers
- **Self-explanatory constants** - API versions, obvious environment variables
- **Simple configuration objects** - Default pagination, basic settings

```javascript
// =================================================================
// WEB STANDARDS
// =================================================================

/** @constant {Object} Standard HTTP status codes */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

/** @constant {Object} Standard HTTP headers */
export const REQUEST_HEADERS = {
  contentType: "Content-Type",
  authorization: "Authorization",
  accept: "Accept",
};
```

---

## 🛠️ Documentation Generation Tools

Transform JSDoc comments into professional documentation using these tools.

### **apiDoc - JSDoc to HTML Documentation**

**Installation & Usage:**
```bash
# Install globally
npm install -g apidoc

# Generate docs from API files
apidoc -i pages/api/ -o docs/api/

# Serve the docs locally
npx http-server docs/api/
```

**Configuration (apidoc.json):**
```json
{
  "name": "Project API",
  "version": "1.0.0",
  "description": "API documentation for the project",
  "url": "https://project.com/api",
  "sampleUrl": "https://project.com/api"
}
```

### **JSDoc CLI (Official)**

**Installation & Usage:**
```bash
# Install JSDoc
npm install -g jsdoc

# Generate documentation
jsdoc src/ -d docs/ -c jsdoc.json
```

**Configuration (jsdoc.json):**
```json
{
  "source": {
    "include": ["./src/"],
    "includePattern": "\\.(js|jsx)$",
    "exclude": ["node_modules/"]
  },
  "opts": {
    "destination": "./docs/"
  },
  "plugins": ["plugins/markdown"],
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false
  }
}
```

### **Project Setup Scripts**

Add these scripts to **package.json**:

```json
{
  "scripts": {
    "docs:api": "apidoc -i pages/api/ -o docs/api/",
    "docs:code": "jsdoc src/ -d docs/code/ -c jsdoc.json",
    "docs:serve": "npx http-server docs/",
    "docs:build": "npm run docs:api && npm run docs:code",
    "docs:watch": "nodemon --watch pages/api/ --ext js --exec 'npm run docs:api'"
  }
}
```

---

## ⚠️ Common Mistakes to Avoid

**Type Specificity:**
- ❌ `@param {Object} data` → ✅ `@param {CartItem} data`
- ❌ `@param {Array} items` → ✅ `@param {Array<Product>} items`
- ❌ `@param {Function} callback` → ✅ `@param {function(string): void} callback`

**Documentation Quality:**
- ❌ Missing examples for complex functions
- ❌ Using generic descriptions: "This function does X"
- ❌ Documenting obvious parameters: `@param {string} name - The name`
- ❌ Forgetting to document error conditions
- ❌ Using `any` or `Object` without specificity

**Parameter Documentation:**
- ❌ `@param {Object} props.product` → ✅ `@param {Product} product` (with destructuring)
- ❌ Missing optional parameter notation: `[param]`
- ❌ Missing default value notation: `[param=defaultValue]`

---

## ✅ Implementation Checklist

### **Before Starting:**
- [ ] **jsconfig.json configured** with proper path aliases
- [ ] **VS Code settings updated** for enhanced autocompletion
- [ ] **ESLint configured** to work with JSDoc patterns
- [ ] **Project structure** organized with clear file naming

### **Documentation Priority:**
- [ ] **API routes** - High portfolio value and team collaboration
- [ ] **Utility functions** - Core business logic and calculations
- [ ] **Custom hooks** - Reusable logic across components
- [ ] **React components** - UI layer and component interfaces
- [ ] **Type definitions** - Shared types used in multiple files
- [ ] **Configuration files** - Settings and constants

### **Quality Checkpoints:**
- [ ] **Every function documented** with parameters and return types
- [ ] **Complex functions have examples** showing real usage
- [ ] **Error conditions documented** with `@throws`
- [ ] **Types are specific** (not generic Object/Array)
- [ ] **PropTypes maintained** for React components
- [ ] **API documentation complete** for external doc generation

---

## 🚀 Best Practices Summary

### **✅ DO:**
- Document every function's parameters and return types
- Use specific types (`CartItem[]` not `Array`)
- Include realistic examples for complex functions
- Document error conditions with `@throws`
- Use `@typedef` for types used in multiple places
- Keep PropTypes for React components (runtime validation)

### **❌ DON'T:**
- Use generic descriptions without business context
- Document obvious parameters without adding value
- Use `any` or `Object` without specificity
- Add `@namespace` to individual function exports
- Skip examples for complex functions
- Forget to update documentation when code changes

### **🎯 Priority Order:**
1. **Parameters and return types** - Core autocompletion benefits
2. **Examples for complex functions** - Shows usage patterns
3. **Error conditions** - Helps with debugging and error handling
4. **Type definitions** - For reused types across multiple files

---

## 🔧 IDE Setup

### **VS Code Settings**
Add to `.vscode/settings.json`:
```json
{
    "typescript.suggest.completeFunctionCalls": true,
    "javascript.suggest.completeFunctionCalls": true
}
```

---

This comprehensive approach provides maximum IDE benefits and type safety for JavaScript projects through detailed JSDoc documentation. Focus on business logic, provide rich examples, and maintain consistent patterns across the entire codebase.