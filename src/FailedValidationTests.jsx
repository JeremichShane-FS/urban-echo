import { useEffect, useState } from "react";

const FailedValidationTests = () => {
  const [testData, setTestData] = useState([]);

  // ❌ SHOULD GET validation-failed (no template)
  // TODO: Add shopping cart functionality
  // This should fail validation - missing [TEMPLATE]
  const noTemplate = null;

  // ❌ SHOULD GET validation-failed (multiple templates)
  // TODO: [SECURITY] [COMPONENT] Fix user authentication flow
  // This should fail - only one template allowed
  const multipleTemplates = null;

  // ❌ SHOULD GET validation-failed (invalid template)
  // TODO: [BACKEND] Create new API endpoints
  // This should fail - BACKEND not in approved template list
  const invalidTemplate = null;

  // ❌ SHOULD GET validation-failed (too short)
  // TODO: [BUG] Fix
  // This should fail - under 10 character minimum
  const tooShort = null;

  // ❌ SHOULD GET validation-failed (special characters)
  // TODO: [BUG] Fix issue with $variable && command
  // This should fail - contains $ and && characters
  const specialChars = null;

  // ❌ SHOULD GET validation-failed (non-English) - THIS ONE DIDN'T WORK
  // TODO: [DOCS] Add documentation for 中文 support
  // This should fail - contains non-ASCII characters
  const nonEnglish = null;

  // ❌ SHOULD GET validation-failed (empty TODO)
  // TODO:
  // This should fail - essentially empty
  const emptyTodo = null;

  // ❌ SHOULD GET validation-failed AND cleanup label (special chars + mentions alert)
  // FIX: [BUG] Remove alert() debugging statements from checkout flow
  // This should fail validation due to special characters () but also mentions alert
  const specialCharsWithAlert = null;

  return (
    <div className="failed-validation-tests">
      <h1>Failed Validation Tests</h1>
      <p>Testing issues that should get validation-failed labels</p>
    </div>
  );
};

export default FailedValidationTests;
