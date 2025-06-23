// ===== VALID TODO COMMENTS (Should create properly labeled issues) =====

// TODO: [COMPONENT] Create responsive navigation menu with mobile support (v2)
// Implement hamburger menu for mobile devices with smooth animations
// Include accessibility features and keyboard navigation support

// TODO: [SECURITY] Implement rate limiting for API endpoints (v2)
// Add express-rate-limit middleware to prevent API abuse
// Configure different limits for different endpoint types

// TODO: [PERF] Optimize image loading with lazy loading and WebP format (v2)
// Use intersection observer for viewport-based loading
// Convert all images to WebP format for better compression

// TODO: [DOCS] Create comprehensive API documentation for authentication (v2)
// Document OAuth2 flow, error responses, and rate limiting
// Include code examples for common integration patterns

// TODO: [TEST] Add unit tests for shopping cart calculation logic (v2)
// Test discount calculations, tax computation, and shipping costs
// Include edge cases for empty cart and invalid items

// TODO: [REFACTOR] Remove console.log statements from production code (v2)
// Clean up all debug console statements before deployment
// Replace with proper logging system using winston

// TODO: [BUG] Fix memory leak in useEffect cleanup function (v2)
// Component not properly cleaning up event listeners on unmount
// Add proper cleanup function to prevent memory leaks

// TODO: [FEATURE] Add dark mode support across entire application (v2)
// Implement theme context provider with localStorage persistence
// Create toggle component and update all UI components

// TODO: [CI] Add automated testing to pull request checks (v2)
// Set up Jest and Cypress tests to run on every PR
// Configure test coverage reporting and quality gates

// TODO: [ROUTES] Create user management API endpoints (v2)
// Implement CRUD operations for user profiles
// Add proper authentication and authorization middleware

// ===== VALID FIX COMMENTS (Should create bug-type issues) =====

// FIX: [SECURITY] API keys exposed in client-side code (v2)
// Move sensitive keys to environment variables immediately
// Audit all client code for hardcoded secrets

// FIX: [BUG] Shopping cart total calculation excludes shipping costs (v2)
// Cart component not adding shipping to final total
// Update calculation logic in checkout process

// FIX: [PERF] Database queries causing performance bottleneck (v2)
// N+1 query problem in product listing page
// Implement proper joins and query optimization

// ===== INVALID COMMENTS (Should get validation-failed labels) =====

// TODO: Add user profile page without any template (v2)
// This should fail validation - missing template prefix

// TODO: [INVALID-TEMPLATE] This template doesn't exist in the approved list (v2)
// Should fail validation due to invalid template name

// TODO: [COMPONENT] [SECURITY] Multiple templates not allowed in single comment (v2)
// Should fail validation due to multiple templates

// TODO: [BUG] Fix (v2)
// Should fail validation - too short (only 3 characters after template)

// TODO: [COMPONENT] Add 中文 support for international users (v2)
// Should fail validation - contains non-English characters

// TODO: [SECURITY] Fix $variable & command execution vulnerability (v2)
// Should fail validation - contains special characters $ and &

// ===== EDGE CASES TO TEST =====

// TODO: [component] lowercase template should be normalized to uppercase (v2)
// This should work and template should become [COMPONENT]

// TODO: [DEPENDENCY] Update React to version 18 for better performance and new features (v2)
// Long description to test title truncation at 80 character limit - this should be truncated

// TODO: [AUTOMATION] Improve GitHub Actions workflow for better CI/CD pipeline (v2)
// Test automation-related template labeling

// TODO: [BUILD] Optimize webpack configuration for faster build times (v2)
// Test build-related template with high priority labeling

export default function TestComponent() {
  // TODO: [UI/UX] Improve button hover effects and animations (v2)
  // Add smooth transitions and better visual feedback
  // Consider micro-interactions for better user experience

  return (
    <div>
      {/* FIX: [COMPONENT] Remove hardcoded styles and use CSS classes (v2) */}
      <h1 style={{ color: "red" }}>Test Component</h1>

      {/* TODO: [A11Y] Add proper ARIA labels for screen readers (v2) */}