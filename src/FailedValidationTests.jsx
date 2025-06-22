import { useEffect, useState } from "react";

const FailedValidationTests = () => {
  const [testData, setTestData] = useState([]);

  // ❌ SHOULD GET validation-failed (no template) - NEW VERSION
  // TODO: Implement user registration form
  // This should fail validation - missing [TEMPLATE]
  const noTemplateV2 = null;

  // ❌ SHOULD GET validation-failed (multiple templates) - NEW VERSION
  // FIX: [BUG] [PERF] Optimize slow database queries
  // This should fail - only one template allowed
  const multipleTemplatesV2 = null;

  // ❌ SHOULD GET validation-failed (invalid template) - NEW VERSION
  // TODO: [DATABASE] Design new schema for users
  // This should fail - DATABASE not in approved template list
  const invalidTemplateV2 = null;

  // ❌ SHOULD GET validation-failed (too short) - NEW VERSION
  // FIX: [UI/UX] Bad
  // This should fail - under 10 character minimum
  const tooShortV2 = null;

  // ❌ SHOULD GET validation-failed (special characters) - NEW VERSION
  // TODO: [SECURITY] Fix XSS with <script> tags & injection
  // This should fail - contains < > & characters
  const specialCharsV2 = null;

  // ❌ SHOULD GET validation-failed (non-English) - TEST THE FIX
  // FIX: [COMPONENT] Add support for français and español languages
  // This should fail - contains non-ASCII characters
  const nonEnglishV2 = null;

  // ❌ SHOULD GET validation-failed (essentially empty) - NEW VERSION
  // TODO: [DOCS]
  // This should fail - essentially empty after template
  const emptyTodoV2 = null;

  // ❌ SHOULD GET validation-failed AND cleanup (special chars + debug keywords)
  // TODO: [REFACTOR] Remove console.log() && debugger statements
  // This should fail validation due to && but also mentions console.log
  const specialCharsWithDebugV2 = null;

  // ❌ SHOULD GET validation-failed (parentheses in title)
  // FIX: [BUG] Fix API response (status 500) error handling
  // This should fail - contains parentheses which break CLI
  const parenthesesIssue = null;

  // ❌ SHOULD GET validation-failed (backticks in title)
  // TODO: [DOCS] Document `npm install` command usage
  // This should fail - contains backticks which break CLI
  const backticksIssue = null;

  return (
    <div className="new-failed-validation-tests">
      <h1>New Failed Validation Tests</h1>
      <p>Testing unique validation failures with different content</p>
    </div>
  );
};

export default FailedValidationTests;
