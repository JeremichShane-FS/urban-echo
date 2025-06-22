import { useState } from "react";

const FailedValidationTests = () => {
  const [testData, setTestData] = useState([]);

  // Test line number display in GitHub issue
  // TODO: [COMPONENT] Create responsive header navigation component (v3)
  // Build a mobile-first navigation bar with hamburger menu functionality
  // Include accessibility features like ARIA labels and keyboard navigation
  // Integrate with authentication system to show user profile menu
  const HeaderNavigation = () => {
    return (
      <nav className="header-navigation">
        <div className="nav-brand">
          <h1>Urban Echo</h1>
        </div>
        <div className="nav-menu">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>
    );
  };

  return (
    <div className="line-number-tests">
      <h1>Line Number Testing</h1>
      <p>This component tests line number display in GitHub issues</p>
      <HeaderNavigation />
    </div>
  );
};

export default FailedValidationTests;
