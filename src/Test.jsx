// ===== EDGE CASE TESTS =====

// Test multiple templates (should FAIL validation)
// TODO: [COMPONENT] [SECURITY] This should definitely fail with multiple templates
// Should get validation-failed label with clear error message

// Test very long title truncation
// TODO: [FEATURE] This is an extremely long title that should be truncated at exactly eighty characters to test the truncation logic properly and ensure it works as expected
// Should be truncated to 77 chars + "..."

// Test boundary case - exactly 10 characters after template
// TODO: [BUG] Ten chars!
// Should pass validation (exactly 10 characters)

// Test boundary case - 9 characters after template (should FAIL)
// TODO: [TEST] Nine char
// Should fail validation (only 9 characters)

// ===== ADVANCED VALIDATION TESTS =====

// Test special characters in different positions
// TODO: [SECURITY] Fix authentication bypass with $injection attack
// Should fail validation due to $ character

// Test non-English characters mixed with English
// TODO: [I18N] Add français language support for international users
// Should fail validation due to non-English characters

// Test multiple brackets but single template
// TODO: [COMPONENT] Add [bracket] support in component names
// Should pass (only one template at start)

// ===== NEW TEMPLATE TESTS =====

// Test I18N template
// TODO: [I18N] Implement Spanish translation for checkout process
// Should get appropriate labels for internationalization

// TODO: [A11Y] Add screen reader support for dashboard widgets
// Should get accessibility-related labels

// TODO: [RESEARCH] Investigate user behavior patterns in shopping cart
// Should get research-related labels

// TODO: [STATE] Refactor Redux store for better performance
// Should get state management labels

// ===== CONTENT DETECTION IMPROVEMENTS =====

// Test performance keywords without PERF template
// TODO: [COMPONENT] Optimize rendering speed for product grid
// Should get performance label due to "optimize" and "speed"

// Test console.log detection in comment itself
// TODO: [REFACTOR] Remove all console.log debug statements from components
// Should get cleanup label due to console.log mention

// Test tech stack detection
// TODO: [COMPONENT] Migrate component to Next.js 14 app directory
// Should get nextjs label due to Next.js mention

// ===== FIX COMMENT PRIORITY TESTS =====

// FIX + BUG should be high priority
// FIX: [BUG] Critical payment processor returning null responses
// Should get: type: bug, priority: high

// TODO + BUG should be medium priority
// TODO: [BUG] Investigate occasional timeout errors in search
// Should get: type: bug, priority: medium

// FIX + SECURITY should be bug type, high priority
// FIX: [SECURITY] Session tokens vulnerable to replay attacks
// Should get: type: bug, priority: high, area: security

// ===== COMPLEX SCENARIOS =====

// Test with emoji and special formatting
// TODO: [UI/UX] Improve user experience with loading animations
// Standard UI/UX issue with frontend labels

// Test dependency with performance keywords
// TODO: [DEPENDENCY] Update lodash for better performance and security
// Should get both dependency (low priority) and performance labels

// Test refactor with console mention
// TODO: [REFACTOR] Clean up legacy code and remove console.log statements
// Should get tech-debt AND cleanup labels

// ===== VALIDATION EDGE CASES =====

// Test template with spaces (should work)
// TODO: [ COMPONENT ] Add spacing test for template parsing
// Should normalize to [COMPONENT] and work properly

// Test empty content after normalization
// TODO: [TEST]
// Should fail validation (only spaces after template)

// Test case sensitivity in content
// TODO: [component] lowercase template normalization test
// Should normalize to [COMPONENT] and work

export function FreshTestComponent() {
  // TODO: [COMPONENT] Add loading spinner for async operations
  // Should get frontend labels and medium priority

  const handleClick = () => {
    // FIX: [PERF] Debounce rapid click events causing performance issues
    // Should get performance label and medium priority
    console.log("Button clicked");
  };

  return (
    <div>
      {/* TODO: [A11Y] Add proper ARIA labels for accessibility compliance */}
      <button onClick={handleClick}>Test Button</button>

      {/* FIX: [UI/UX] Button hover state not working in Safari browser */}
      <style jsx>{`
        button:hover {
          background: blue;
        }
      `}</style>
    </div>
  );
}
