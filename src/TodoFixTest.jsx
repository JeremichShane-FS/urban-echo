// src/components/TodoFixTest.jsx
import { useEffect, useState } from "react";

const TodoFixTest = () => {
  const [testData, setTestData] = useState([]);

  // ✅ VALID: Regular templates
  // TODO: [COMPONENT] Create reusable button component with hover effects
  // Need to extract button logic into separate component
  // Should support primary, secondary, and danger variants
  const Button = ({ children, onClick }) => {
    return <button onClick={onClick}>{children}</button>;
  };

  // TODO: [SECURITY] Implement input sanitization for user-generated content
  // Current implementation vulnerable to XSS attacks
  // Need to add DOMPurify or similar library
  const sanitizeInput = input => {
    return input; // Unsafe implementation
  };

  // FIX: [BUG] Shopping cart total calculation excludes shipping costs
  // Users seeing incorrect final price at checkout
  // Need to add shipping calculation based on location
  const calculateTotal = (items, shipping = 0) => {
    return items.reduce((sum, item) => sum + item.price, 0);
  };

  // TODO: [DOCS] Add JSDoc comments for all exported functions
  // Missing documentation makes onboarding difficult
  // Should include parameter types and return values

  // FIX: [SECURITY] API keys exposed in client-side code
  // Move sensitive credentials to environment variables
  // Implement proper server-side API proxy
  const API_KEY = "sk_live_1234567890"; // This is bad!

  // TODO: [PERF] Optimize image loading with lazy loading and WebP format
  // Large images causing slow initial page load
  // Implement intersection observer for viewport detection

  // TODO: [TEST] Add unit tests for cart calculation logic
  // Currently no test coverage for critical business logic
  // Should test edge cases like negative quantities

  // ✅ VALID: Workflow-specific templates (should get ci/cd label)
  // TODO: [CI] Add automated testing to pull request checks
  // Need to run test suite before allowing merges
  // Configure GitHub Actions to run on PR events

  // TODO: [CD] Configure automatic deployment to staging environment
  // Manual deployments are error-prone and slow
  // Set up GitHub Actions workflow for auto-deploy on main branch

  // TODO: [BUILD] Optimize build process to reduce bundle size
  // Current build is 2MB+ causing slow load times
  // Implement code splitting and tree shaking

  // ✅ VALID: Should trigger cleanup label
  // FIX: [REFACTOR] Remove console.log statements from production code
  // Debug statements exposing sensitive user data
  // Need to configure build process to strip console statements
  console.log("User data:", { id: 123, email: "test@example.com" });

  // ✅ VALID: Should trigger tech-debt label
  // TODO: [REFACTOR] Refactor code to remove technical debt from legacy system
  // Old jQuery code mixed with React causing conflicts
  // Migrate all legacy code to modern React patterns

  // ✅ VALID: Different priority levels
  // FIX: [BUG] Critical payment processing error blocking all transactions
  // Stripe integration failing with 500 errors
  // HIGH PRIORITY - affecting revenue

  // TODO: [FEATURE] Add dark mode support across entire application
  // Users requesting theme customization options
  // Medium priority enhancement

  // TODO: [DEPENDENCY] Update React to version 18 for better performance
  // Currently on React 16 missing new features
  // Low priority but needed for future features

  // ✅ VALID: Technology detection (should add nextjs label)
  // TODO: [COMPONENT] Migrate this component to Next.js app directory structure
  // Need to update for Next.js 13+ app router
  // Follow new server component patterns

  // ✅ VALID: Long title (should be truncated to 80 chars)
  // TODO: [FEATURE] Implement comprehensive user authentication system with multi-factor authentication, social login providers, passwordless options, and enterprise SSO integration support
  // This extremely long title should be truncated with ... at the end

  // ✅ VALID: Case normalization test
  // TODO: [component] Navigation menu with dropdown support
  // Should normalize to [COMPONENT] in the issue title

  // TODO: [Security] Add rate limiting to prevent API abuse
  // Should normalize to [SECURITY] in the issue title

  // ❌ INVALID: These should fail validation

  // TODO: Add user profile page without any template
  // This should fail - missing [TEMPLATE] prefix

  // TODO: [INVALID-TEMPLATE] This template doesn't exist in the approved list
  // Should fail validation with helpful error message

  // TODO: [COMPONENT] [SECURITY] Multiple templates not allowed in single comment
  // Should fail - only one template allowed

  // TODO: [BUG]
  // Too short - less than 10 characters after template

  // FIX: Memory leak in useEffect cleanup function needs attention
  // Missing required template for FIX comments

  return (
    <div className="test-component">
      <h1>TODO/FIX Test Component</h1>
      <p>This component tests various TODO/FIX scenarios</p>
      <Button onClick={() => console.log("clicked")}>Test Button</Button>
    </div>
  );
};

export default TodoFixTest;
