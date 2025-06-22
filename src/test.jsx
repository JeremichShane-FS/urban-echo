// src/components/WorkflowTest.jsx
import { useEffect, useState } from "react";

const WorkflowTest = () => {
  const [testData, setTestData] = useState([]);

  // ✅ VALID: Component with proper template
  // TODO: [COMPONENT] Add loading spinner while data fetches
  // Need to show a spinner component during API calls
  // Should integrate with existing UI design system
  const LoadingSpinner = () => {
    return <div className="spinner">Loading...</div>;
  };

  // ✅ VALID: Security FIX (should get type: bug + high priority)
  // FIX: [SECURITY] Sanitize user input to prevent XSS attacks
  // Current implementation allows script injection through comments
  // Need to implement DOMPurify or similar sanitization library
  const sanitizeInput = input => {
    return input; // Vulnerable implementation
  };

  // ✅ VALID: Bug template (should remove enhancement, add bug)
  // TODO: [BUG] Fix calculation error in shopping cart total
  // Cart total doesn't include tax in final calculation
  // Results in incorrect checkout amounts for customers
  const calculateTotal = items => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  // ✅ VALID: Docs with low priority
  // TODO: [DOCS] Create API documentation for new endpoints
  // Document REST API endpoints for user authentication
  // Include request/response examples and error codes
  const apiDocs = null;

  // ✅ VALID: Performance optimization
  // TODO: [PERF] Optimize image loading with lazy loading
  // Large images cause slow initial page load
  // Implement intersection observer for viewport detection
  const ImageComponent = ({ src }) => {
    return <img src={src} alt="Product" />;
  };

  // ❌ INVALID: No template prefix
  // TODO: Add user profile page
  // This should fail validation - missing [TEMPLATE]
  const userProfile = null;

  // ❌ INVALID: Multiple templates
  // TODO: [SECURITY] [COMPONENT] Fix authentication flow
  // This should fail - only one template allowed
  const authFlow = null;

  // ❌ INVALID: Invalid template name
  // TODO: [BACKEND] Implement new API endpoints
  // This should fail - BACKEND not in approved list
  const apiEndpoints = null;

  // ❌ INVALID: Empty TODO
  // TODO:
  // This should fail - too short
  const emptyTodo = null;

  // ❌ INVALID: Non-English characters
  // TODO: [COMPONENT] Add support for 中文 and español
  // This should fail - non-ASCII characters
  const i18nSupport = null;

  // ❌ INVALID: Special characters that break CLI
  // TODO: [BUG] Fix issue with $PATH && echo "test"
  // This should fail - contains $ && characters
  const cliBreaker = null;

  // ❌ INVALID: Wrong case (should be normalized to uppercase)
  // TODO: [component] Add navigation menu
  // This should work but normalize to [COMPONENT]
  const navigation = null;

  // ✅ VALID: Should get cleanup label (console.log)
  // FIX: [BUG] Remove debug console.log statements in production
  // Found console log statements that expose sensitive data
  // Need to remove all debugging code before deployment
  const debugCode = () => {
    console.log("Debug info");
  };

  // ✅ VALID: Should get cleanup label (console space)
  // TODO: [REFACTOR] Remove all console error statements
  // Clean up debugging artifacts from development
  const cleanupCode = null;

  // ✅ VALID: Very long title (should be truncated)
  // TODO: [FEATURE] Implement comprehensive user authentication system with OAuth2 integration supporting Google, Facebook, GitHub, and Microsoft Azure Active Directory
  // This title should be truncated to 80 characters with ...
  const longFeature = null;

  // ✅ VALID: Different area labels
  // TODO: [ROUTES] Create RESTful API routes for products
  // Should get area: api and area: backend labels
  const apiRoutes = null;

  // TODO: [DATA] Implement MongoDB schema for user profiles
  // Should get area: api and area: backend labels
  const dataSchema = null;

  // TODO: [UI/UX] Redesign checkout flow for mobile users
  // Should get area: frontend label
  const uiRedesign = null;

  // ✅ VALID: FIX without template (should fail now)
  // FIX: Memory leak in useEffect cleanup
  // This should fail - FIX requires template
  const memoryLeak = null;

  // ✅ VALID: Technology detection
  // TODO: [COMPONENT] Migrate component to Next.js App Router
  // Should add nextjs label based on content
  const nextjsComponent = null;

  // ✅ VALID: Case sensitivity test
  // TODO: [Security] Implement rate limiting for API
  // Should normalize to [SECURITY] and work properly
  const rateLimiting = null;

  return (
    <div className="workflow-test">
      <h1>Workflow Test Component</h1>
      <p>This component contains test TODO/FIX comments</p>
    </div>
  );
};

export default WorkflowTest;
