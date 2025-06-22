# GitHub Issue Automation Reference Guide

## Urban Echo E-commerce Platform

_A comprehensive guide to the automated issue creation system with strict validation for professional project management._

---

## 📚 Table of Contents

- [🎯 Overview](#-overview)
- [🛡️ Validation System](#️-validation-system)
- [🏷️ Label System](#️-label-system)
- [💬 Comment Standards](#-comment-standards)
- [📊 Issue Management](#-issue-management)
- [🔧 Maintenance](#-maintenance)
- [📝 Quick Reference](#-quick-reference)

---

## 🎯 Overview

Urban Echo uses a **strict automated GitHub Actions system** to create and label issues from TODO/FIX comments in code. The system enforces high-quality standards through comprehensive validation and professional labeling.

### **Key Features:**

- **Strict validation** - All TODO/FIX comments must meet quality standards
- **Template enforcement** - Required template prefixes for categorization
- **Auto-assignment** - Issues assigned to code author automatically
- **Professional labeling** - Consistent labeling based on content and templates
- **Defense in depth** - Works with pre-commit hooks for bulletproof quality

### **Supported Comment Types:**

- `TODO:` - New features, enhancements, and planned work
- `FIX:` - Bug fixes, security vulnerabilities, and corrections

---

## 🛡️ Validation System

### **Strict Requirements (All Must Pass):**

1. **Template Required** - Must include approved template like `[COMPONENT]`, `[SECURITY]`, etc.
2. **Single Template** - Only one template allowed per comment
3. **Valid Template** - Template must be from approved list
4. **Minimum Length** - Content after template must be ≥10 characters
5. **Maximum Length** - Titles truncated at 80 characters for readability
6. **English Only** - No non-ASCII characters allowed
7. **Safe Characters** - No CLI-breaking special characters (`$`, `&`, `|`, etc.)
8. **Case Normalization** - Templates automatically converted to uppercase

### **Approved Templates:**

```
[COMPONENT]  [UI/UX]      [ROUTES]     [DATA]       [SECURITY]
[BUG]        [PERF]       [REFACTOR]   [TEST]       [DOCS]
[DEPENDENCY] [ONBOARDING] [I18N]       [A11Y]       [FEATURE]
[RESEARCH]   [STATE]
```

### **Validation Failures:**

- Issues that fail validation get `validation-failed` label
- Detailed error comments explain what needs fixing
- No other labels applied until validation passes
- Processing stops - no normal workflow continues

### **Example Validations:**

✅ **VALID:**

```javascript
// TODO: [COMPONENT] Add user profile management interface
// Create comprehensive profile editing form with validation
```

❌ **INVALID:**

```javascript
// TODO: Add profile form              // Missing template
// TODO: [COMPONENT] Fix               // Too short (3 chars after template)
// TODO: [BACKEND] Add API             // Invalid template (BACKEND not approved)
// TODO: [BUG] [PERF] Fix slow query   // Multiple templates
// TODO: [COMPONENT] Add 中文 support   // Non-English characters
```

---

## 🏷️ Label System

### **Base Labels (Always Applied):**

- `auto-generated` - Issues created by automation
- `type: enhancement` - Default type (overridden by specific templates)

### **Type Labels:**

- `type: bug` - Applied to `[BUG]` template and FIX+`[SECURITY]`
- `type: enhancement` - Default for most templates
- `type: documentation` - Applied to `[DOCS]` template

### **Priority Labels:**

- `priority: high` - `[SECURITY]`, `[BUG]` (when FIX comment)
- `priority: medium` - `[COMPONENT]`, `[ROUTES]`, `[PERF]`, `[REFACTOR]`, `[TEST]`
- `priority: low` - `[DOCS]`, `[DEPENDENCY]`

### **Area Labels:**

- `area: frontend` - `[COMPONENT]`, `[UI/UX]`
- `area: api` + `area: backend` - `[ROUTES]`, `[DATA]`
- `area: security` - `[SECURITY]`

### **Workflow Labels:**

- `tech-debt` - `[REFACTOR]` template
- `performance` - `[PERF]` template or performance keywords in comments
- `cleanup` - When comments mention debug code (`console.log`, `debugger`, `alert`)

### **Technology Labels:**

- `nextjs` - When Next.js mentioned in comment
- `mongodb` - Database-related content
- `stripe` - Payment-related content
- `auth0` - Authentication-related content

### **Smart Type Detection:**

- **FIX + [SECURITY]** → `type: bug` (security vulnerability)
- **TODO + [SECURITY]** → `type: enhancement` (new security feature)
- **FIX + [BUG]** → `priority: high` (actual bug)
- **TODO + [BUG]** → `priority: medium` (planned investigation)

---

## 💬 Comment Standards

### **Required Format:**

```javascript
// TODO: [TEMPLATE] Brief description (≥10 chars after template)
// Detailed explanation of what needs to be done
// Additional context, requirements, or steps
```

### **Template Usage Guidelines:**

**Frontend Work:**

```javascript
// TODO: [COMPONENT] Create responsive navigation menu
// Implement mobile-first navigation with hamburger menu
// Include accessibility features and keyboard navigation
```

**Security Issues:**

```javascript
// FIX: [SECURITY] Implement input sanitization for user comments
// Current form allows script injection through comment field
// Use DOMPurify library to sanitize all user-generated content
```

**Performance Optimization:**

```javascript
// TODO: [PERF] Optimize product image loading with lazy loading
// Large product images cause slow initial page load
// Implement intersection observer for viewport-based loading
```

**Bug Fixes:**

```javascript
// FIX: [BUG] Shopping cart total calculation incorrect for discounts
// Cart shows wrong total when percentage discount applied
// Fix calculation logic in checkout component
```

**Documentation:**

```javascript
// TODO: [DOCS] Create API documentation for authentication endpoints
// Document OAuth2 flow, error responses, and rate limiting
// Include code examples for common integration patterns
```

### **Content Detection:**

The system analyzes comment content for additional labeling:

- **Cleanup Detection:** Mentions of `console.log`, `debugger`, `alert` → `cleanup` label
- **Performance Detection:** Keywords like "optimize", "performance" → `performance` label
- **Tech Detection:** Framework mentions → relevant technology labels

---

## 📊 Issue Management

### **Viewing Issues:**

```bash
# All automated issues
gh issue list --label "auto-generated"

# Validation failures (need fixing)
gh issue list --label "validation-failed"

# By priority
gh issue list --label "priority: high,auto-generated"

# By area
gh issue list --label "area: frontend,auto-generated"
gh issue list --label "area: security,auto-generated"

# Cleanup tasks
gh issue list --label "cleanup,auto-generated"
```

### **Issue Workflow:**

1. **Code Push** - Developer pushes TODO/FIX comments
2. **Validation** - System validates comment quality
3. **Issue Creation** - Valid comments become issues
4. **Auto-Assignment** - Issues assigned to code author
5. **Labeling** - Professional labels applied based on content
6. **Triage** - Team reviews during standups
7. **Development** - Work tracked through issue lifecycle
8. **Closure** - Issues closed when work completed

### **Best Practices:**

- **Review validation failures first** - Fix comment quality issues
- **Prioritize security/payment issues** - High business impact
- **Group similar issues** - Batch related work for efficiency
- **Update templates as needed** - Evolve standards with project needs

---

## 🔧 Maintenance

### **Weekly Review:**

- Check for `validation-failed` issues and fix comment quality
- Review high-priority security and payment issues
- Close completed issues
- Update project documentation as needed

### **Monthly Review:**

- Analyze labeling accuracy and adjust templates if needed
- Review automation effectiveness metrics
- Update approved template list for new project areas
- Document lessons learned and process improvements

### **Quality Metrics:**

- **Validation Pass Rate** - Target: >95% of comments pass validation
- **Label Accuracy** - Manual review of auto-generated labels
- **Issue Resolution Time** - Track from creation to closure
- **Template Usage** - Monitor which templates are most/least used

---

## 📝 Quick Reference

### **Create Valid TODO Comment:**

```javascript
// TODO: [TEMPLATE] Description with at least 10 characters
// Additional details explaining the work needed
// Context about why this is important
```

### **Common Validation Fixes:**

```bash
# Add template prefix
- TODO: Fix login bug
+ TODO: [BUG] Fix login validation error

# Make content longer
- TODO: [COMPONENT] Add form
+ TODO: [COMPONENT] Add user registration form with validation

# Use approved template
- TODO: [BACKEND] Add API
+ TODO: [ROUTES] Add user management API endpoints

# Remove special characters
- TODO: [BUG] Fix $ variable & command
+ TODO: [BUG] Fix variable expansion and command execution

# Use English only
- TODO: [DOCS] Add 中文 support
+ TODO: [DOCS] Add Chinese language support documentation
```

### **Check Workflow Status:**

```bash
# View recent workflow runs
gh run list --limit 5

# Check for validation failures
gh issue list --label "validation-failed" --limit 10

# View all auto-generated issues
gh issue list --label "auto-generated" --state open
```

### **Emergency Procedures:**

```bash
# If workflow fails, check logs
gh run view [run-id] --log

# If validation-failed label missing, create it
gh label create "validation-failed" --description "Issues that failed validation checks" --color "d73a4a"

# Manually fix issue labels if needed
gh issue edit [issue-number] --add-label "validation-failed"
```

---

## 🎯 Benefits

### **Quality Assurance:**

- ✅ **Consistent Standards** - All TODO/FIX comments meet quality requirements
- ✅ **Professional Labeling** - Proper categorization and prioritization
- ✅ **Automated Validation** - Catch quality issues before they become technical debt
- ✅ **Clear Ownership** - Auto-assignment ensures accountability

### **Development Efficiency:**

- ✅ **Reduced Triage Time** - Issues pre-labeled and categorized
- ✅ **Better Prioritization** - Security and payment issues elevated appropriately
- ✅ **Improved Tracking** - All TODO items become trackable issues
- ✅ **Team Coordination** - Clear visibility into planned work

### **Portfolio Demonstration:**

- ✅ **Industry Standards** - Shows understanding of professional development practices
- ✅ **Quality Focus** - Demonstrates attention to code quality and documentation
- ✅ **Process Automation** - Exhibits advanced DevOps and workflow automation skills
- ✅ **Scalable Systems** - Shows ability to build systems that enforce standards

---

_This automation system ensures Urban Echo maintains enterprise-grade development standards while demonstrating professional software engineering practices. The strict validation system prevents technical debt accumulation and ensures all planned work is properly tracked and prioritized._
