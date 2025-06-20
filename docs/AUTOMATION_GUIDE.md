# GitHub Issue Automation Reference Guide

## Urban Echo E-commerce Platform

_A comprehensive guide to the automated issue creation system for professional project management._

---

## 📚 Table of Contents

- [GitHub Issue Automation Reference Guide](#github-issue-automation-reference-guide)
  - [Urban Echo E-commerce Platform](#urban-echo-e-commerce-platform)
  - [📚 Table of Contents](#-table-of-contents)
  - [🎯 Overview](#-overview)
  - [🏷️ Professional Label System](#️-professional-label-system)
    - [**Type Labels**](#type-labels)
    - [**Priority Labels**](#priority-labels)
    - [**Area Labels**](#area-labels)
    - [**Status Labels**](#status-labels)
    - [**Workflow Labels**](#workflow-labels)
    - [**E-commerce Technology Labels**](#e-commerce-technology-labels)
  - [💬 Comment Standards for Urban Echo](#-comment-standards-for-urban-echo)
    - [**Format:**](#format)
    - [**Keywords:**](#keywords)
    - [**Urban Echo Issue Templates:**](#urban-echo-issue-templates)
    - [**Urban Echo Examples:**](#urban-echo-examples)
      - [**E-commerce Feature Development:**](#e-commerce-feature-development)
      - [**Payment System:**](#payment-system)
      - [**Shopping Cart Features:**](#shopping-cart-features)
      - [**User Authentication:**](#user-authentication)
      - [**Performance Issues:**](#performance-issues)
      - [**Database Operations:**](#database-operations)
      - [**API Development:**](#api-development)
  - [🔄 Conventional Commit Automation](#-conventional-commit-automation)
    - [**Commit Format:**](#commit-format)
    - [**Type → Priority Mapping:**](#type--priority-mapping)
      - [**High Priority:**](#high-priority)
      - [**Medium Priority:**](#medium-priority)
      - [**Low Priority:**](#low-priority)
    - [**Urban Echo Scope → Area Mapping:**](#urban-echo-scope--area-mapping)
    - [**Urban Echo Automated Issue Types:**](#urban-echo-automated-issue-types)
      - [**Security Reviews:**](#security-reviews)
      - [**Performance Reviews:**](#performance-reviews)
      - [**Payment System Reviews:**](#payment-system-reviews)
      - [**Breaking Changes:**](#breaking-changes)
      - [**Documentation Follow-ups:**](#documentation-follow-ups)
  - [🤖 Workflow Triggers](#-workflow-triggers)
    - [**Automation Runs On:**](#automation-runs-on)
    - [**What Gets Detected:**](#what-gets-detected)
      - [**Code Patterns:**](#code-patterns)
      - [**Commit Patterns:**](#commit-patterns)
    - [**Branch Workflow:**](#branch-workflow)
  - [📊 Issue Management](#-issue-management)
    - [**Viewing Auto-Generated Issues:**](#viewing-auto-generated-issues)
    - [**Issue Lifecycle:**](#issue-lifecycle)
    - [**Best Practices for Urban Echo:**](#best-practices-for-urban-echo)
  - [🔧 Maintenance](#-maintenance)
    - [**Weekly Review:**](#weekly-review)
    - [**Monthly Review:**](#monthly-review)
  - [📚 Configuration Files](#-configuration-files)
    - [**Workflow File:**](#workflow-file)
    - [**Label Setup Script:**](#label-setup-script)
    - [**Issue Templates:**](#issue-templates)
  - [🎯 Benefits for Urban Echo](#-benefits-for-urban-echo)
    - [**For E-commerce Development:**](#for-e-commerce-development)
    - [**For Project Management:**](#for-project-management)
    - [**For Portfolio Demonstration:**](#for-portfolio-demonstration)
  - [📝 Quick Reference](#-quick-reference)
    - [**Create TODO Comment:**](#create-todo-comment)
    - [**Payment Security Commit:**](#payment-security-commit)
    - [**Check Automation:**](#check-automation)
    - [**View Payment Issues:**](#view-payment-issues)

---

## 🎯 Overview

Urban Echo uses automated GitHub Actions to create issues from:

- **TODO/FIXME comments** in code
- **Conventional commit patterns** (security, performance, payments)
- **Breaking change detection**
- **Code quality patterns** (debug code, hardcoded values)

All issues are automatically labeled using our professional label system and assigned appropriate priorities.

[↑ Back to Top](#github-issue-automation-reference-guide)

---

## 🏷️ Professional Label System

### **Type Labels**

- `type: bug` - Something isn't working correctly
- `type: enhancement` - New feature or request
- `type: documentation` - Improvements or additions to documentation
- `type: question` - Further information is requested

### **Priority Labels**

- `priority: critical` - Requires immediate attention (production down)
- `priority: high` - Requires immediate attention
- `priority: medium` - Requires semi-immediate attention
- `priority: low` - Does not require immediate attention

### **Area Labels**

- `area: frontend` - Issues related to UI/UX and client-side code
- `area: backend` - Issues related to server-side logic and APIs
- `area: database` - Database-specific issues and queries
- `area: api` - API endpoint and integration issues
- `area: payment` - Payment processing and Stripe integration
- `area: security` - Security-related concerns and vulnerabilities

### **Status Labels**

- `status: needs-triage` - Needs initial assessment and categorization
- `status: in-progress` - Currently being worked on
- `status: needs-review` - Ready for code review or testing
- `status: blocked` - Cannot proceed due to external dependency

### **Workflow Labels**

- `auto-generated` - Issues created by automation
- `tech-debt` - Technical debt that needs addressing
- `performance` - Performance optimization needed
- `cleanup` - Code cleanup (debug statements, etc.)

### **E-commerce Technology Labels**

- `mongodb` - MongoDB database specific issues
- `stripe` - Stripe payment integration issues
- `auth0` - Authentication and user management
- `nextjs` - Next.js framework specific issues

[↑ Back to Top](#github-issue-automation-reference-guide)

---

## 💬 Comment Standards for Urban Echo

Structure TODO comments to match GitHub issue templates for consistency:

### **Format:**

```javascript
// [KEYWORD]: [Template Category] - [Short Description]
// [Detailed explanation]
// [Requirements/Steps/Context]
```

### **Keywords:**

- `TODO` - New features or enhancements
- `FIXME` - Bug fixes needed
- `HACK` - Technical debt or code improvements
- `OPTIMIZE` - Performance improvements
- `SECURITY` - Security concerns
- `REFACTOR` - Code restructuring needed
- `UI` - User interface improvements
- `API` - API-related tasks
- `DB` - Database-related tasks

### **Urban Echo Issue Templates:**

- 📚 Research
- 🎯 Define Data Models
- 🔌 Define Routes
- 🧩 Develop Component
- 🌐 Handle Internationalization
- 🧪 Improve Testing
- 🔄 Propose Refactoring
- 🎨 Provide UI/UX Feedback
- ♿ Report Accessibility Concern
- 🐛 Report Bug
- ⚡ Report Performance Issue
- 🔒 Report Security Vulnerability
- ✨ Request Feature
- 🗂️ State Management
- 📦 Update Dependency
- 📚 Update Documentation

### **Urban Echo Examples:**

#### **E-commerce Feature Development:**

```javascript
// TODO: Develop Component - Product listing page
// Create responsive product grid component for shop page.
// Requirements:
// - Product image lazy loading
// - Filter by category, price, size
// - Sort by price, popularity, newest
// - Add to cart functionality
// - Wishlist integration
```

#### **Payment System:**

```javascript
// SECURITY: Report Security Vulnerability - Stripe webhook validation
// Current webhook handler doesn't verify signatures from Stripe.
// This could allow malicious requests to trigger false payment confirmations.
// Critical for e-commerce security - affects order processing system.
// Need to implement webhook signature verification using Stripe's library.
```

#### **Shopping Cart Features:**

```javascript
// TODO: State Management - Shopping cart persistence
// Implement cart state management with localStorage backup.
// Requirements:
// - Add/remove items from cart
// - Update quantities with validation
// - Persist cart across browser sessions
// - Sync with user account when logged in
// - Clear cart after successful checkout
```

#### **User Authentication:**

```javascript
// FIXME: Report Bug - Auth0 login redirect loop
// Users get stuck in redirect loop when accessing protected checkout pages.
// Happens specifically with Google OAuth login after cart creation.
// Steps to reproduce:
// 1. Add items to cart as guest user
// 2. Proceed to checkout
// 3. Login with Google via Auth0
// 4. Gets redirected in loop instead of back to checkout
```

#### **Performance Issues:**

```javascript
// OPTIMIZE: Report Performance Issue - Product image loading
// Product images on shop page load too slowly (3+ seconds on mobile).
// Target: Reduce to under 1 second load time for better conversion.
// Solutions to implement:
// - Lazy loading for below-the-fold products
// - WebP format with JPEG fallbacks
// - Multiple image sizes for different viewports
// - CDN integration for image delivery
```

#### **Database Operations:**

```javascript
// TODO: Define Data Models - Order management schema
// Create MongoDB schemas for comprehensive order management.
// Models needed:
// - Order (customer info, items, totals, status)
// - OrderItem (product reference, quantity, price snapshot)
// - ShippingAddress (customer address with validation)
// - PaymentRecord (Stripe payment details, refund tracking)
```

#### **API Development:**

```javascript
// TODO: Define Routes - Product catalog endpoints
// Create RESTful API routes for product management.
// Endpoints needed:
// - GET /api/products (list with filtering/pagination)
// - GET /api/products/:id (single product with variants)
// - GET /api/categories (product categories)
// - POST /api/products/:id/reviews (customer reviews)
// - GET /api/products/search (search with autocomplete)
```

[↑ Back to Top](#github-issue-automation-reference-guide)

---

## 🔄 Conventional Commit Automation

Urban Echo's system automatically analyzes conventional commits and creates relevant issues.

### **Commit Format:**

```
type(scope): subject

body

footer
```

### **Type → Priority Mapping:**

#### **High Priority:**

- `fix` - Bug fixes affecting user experience
- `hotfix` - Critical e-commerce functionality fixes
- `security` - Security patches for payment/user data

#### **Medium Priority:**

- `feat` - New e-commerce features
- `perf` - Performance improvements for conversion
- `refactor` - Code restructuring for maintainability

#### **Low Priority:**

- `docs` - Documentation updates
- `style` - UI/CSS formatting changes
- `test` - Test additions and improvements
- `chore` - Build/deployment maintenance

### **Urban Echo Scope → Area Mapping:**

- `frontend`, `ui`, `components` → `area: frontend`
- `backend`, `server`, `api` → `area: backend, area: api`
- `database`, `db`, `mongo` → `area: database, mongodb`
- `auth`, `authentication`, `login` → `area: security, auth0`
- `payment`, `stripe`, `checkout` → `area: payment, stripe`
- `cart`, `shopping` → `area: frontend, area: backend`
- `products`, `catalog` → `area: database, area: api`
- `orders`, `fulfillment` → `area: backend, area: database`

### **Urban Echo Automated Issue Types:**

#### **Security Reviews:**

```bash
security(auth): implement rate limiting for login attempts
```

**→ Creates:** 🔒 Security Review with e-commerce security checklist

#### **Performance Reviews:**

```bash
perf(frontend): optimize product page loading
```

**→ Creates:** 🚀 Performance Review with conversion optimization checklist

#### **Payment System Reviews:**

```bash
feat(payment): integrate Stripe subscription billing
```

**→ Creates:** 💳 Payment System Review with payment integration checklist

#### **Breaking Changes:**

```bash
feat(api)!: update product schema structure

BREAKING CHANGE: Product variants now use separate collection
```

**→ Creates:** ⚠️ Breaking Change Review with migration checklist

#### **Documentation Follow-ups:**

```bash
feat(api): add product search endpoint
```

**→ Creates:** 📚 Documentation Update Needed (for new API features)

[↑ Back to Top](#github-issue-automation-reference-guide)

---

## 🤖 Workflow Triggers

### **Automation Runs On:**

- **Push to:** `main`, `staging`, `dev` branches
- **Commit Analysis:** Every push to monitored branches
- **File Analysis:** Scans changed files for patterns

### **What Gets Detected:**

#### **Code Patterns:**

- `console.log()`, `debugger`, `alert()` → Cleanup issues
- `localhost`, hardcoded URLs → Security issues
- TODO/FIXME comments → Task issues

#### **Commit Patterns:**

- Security keywords → Security review issues
- Performance keywords → Performance review issues
- Payment keywords → Payment review issues
- E-commerce keywords → Business logic review issues
- Breaking change indicators → Critical review issues

### **Branch Workflow:**

```
feature/branch → dev → staging → main
     ❌          ✅      ✅       ✅
  (no automation) (automation triggers)
```

Automation only triggers when code enters shared branches (`dev`, `staging`, `main`), not on feature branches.

[↑ Back to Top](#github-issue-automation-reference-guide)

---

## 📊 Issue Management

### **Viewing Auto-Generated Issues:**

```bash
# List all automated issues
gh issue list --label "auto-generated"

# Filter by e-commerce areas
gh issue list --label "area: payment,auto-generated"
gh issue list --label "stripe,auto-generated"
gh issue list --label "area: security,auto-generated"

# Filter by priority
gh issue list --label "priority: high,auto-generated"

# View specific issue
gh issue view [issue-number]
```

### **Issue Lifecycle:**

1. **Created** - Automatically labeled and categorized
2. **Triage** - Review during daily standups
3. **Work** - Address using provided checklists
4. **Review** - Code review with focus on e-commerce impact
5. **Close** - Mark complete after testing

### **Best Practices for Urban Echo:**

- ✅ Review payment-related issues immediately
- ✅ Test security changes in staging environment
- ✅ Verify performance changes don't affect conversion
- ✅ Document API changes for frontend integration
- ✅ Close issues only after user acceptance testing

[↑ Back to Top](#github-issue-automation-reference-guide)

---

## 🔧 Maintenance

### **Weekly Review:**

- Check for duplicate issues and close them
- Review payment and security related issues first
- Update labels for better categorization
- Assign high-priority e-commerce issues

### **Monthly Review:**

- Analyze patterns in automated issue creation
- Update automation for new e-commerce features
- Review conversion impact of performance issues
- Document process improvements

[↑ Back to Top](#github-issue-automation-reference-guide)

---

## 📚 Configuration Files

### **Workflow File:**

`.github/workflows/auto-issue-creation.yml`

### **Label Setup Script:**

`scripts/setup-labels.sh`

### **Issue Templates:**

`.github/ISSUE_TEMPLATE/`

[↑ Back to Top](#github-issue-automation-reference-guide)

---

## 🎯 Benefits for Urban Echo

### **For E-commerce Development:**

- ✅ **Payment Security** - Automatic security review for payment changes
- ✅ **Performance Monitoring** - Conversion-focused performance alerts
- ✅ **Quality Control** - Automated detection of e-commerce anti-patterns
- ✅ **User Experience** - Early detection of UX-breaking changes

### **For Project Management:**

- ✅ **Business Priority** - Payment and security issues get high priority
- ✅ **Feature Tracking** - New e-commerce features trigger documentation
- ✅ **Quality Assurance** - Automated quality checks for customer-facing code
- ✅ **Risk Management** - Breaking changes get immediate attention

### **For Portfolio Demonstration:**

- ✅ **Industry Standards** - Shows understanding of e-commerce best practices
- ✅ **Security Focus** - Demonstrates attention to payment security
- ✅ **Process Automation** - Exhibits advanced DevOps capabilities
- ✅ **Business Thinking** - Shows consideration for conversion and UX

[↑ Back to Top](#github-issue-automation-reference-guide)

---

## 📝 Quick Reference

### **Create TODO Comment:**

```javascript
// TODO: [Template Category] - [Short Description]
// [E-commerce context and requirements]
```

### **Payment Security Commit:**

```bash
git commit -m "security(payment): implement webhook signature validation

Added Stripe webhook signature verification to prevent unauthorized
payment confirmations. Critical for e-commerce transaction security."
```

### **Check Automation:**

```bash
gh issue list --label "auto-generated"
gh run list --limit 5
```

### **View Payment Issues:**

```bash
gh issue list --label "area: payment" --label "auto-generated"
```

_This automation system ensures Urban Echo maintains high e-commerce standards while demonstrating professional development practices. All issues are automatically categorized with focus on payment security, performance optimization, and user experience._

[↑ Back to Top](#github-issue-automation-reference-guide)
