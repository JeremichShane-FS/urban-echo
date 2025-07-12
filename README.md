# 🛍️ Urban Echo E-commerce Store

**Copyright © 2025 Shane Jeremich / Urban Echo. All rights reserved.**

> **⚠️ LEGAL NOTICE**: This is a proprietary portfolio project. See [LICENSE](LICENSE) and [DISCLAIMER.md](docs/05-legal/DISCLAIMER.md) for usage terms.

A modern, full-stack e-commerce platform for clothing retail built with Next.js 15, designed to provide a seamless shopping experience for fashion-conscious consumers.

![Urban Echo Store](/public/images/screenshot.png)

## 📑 Table of Contents

- [Urban Echo E-commerce Store](#️-urban-echo-e-commerce-store)
  - [📑 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠️ Technologies](#️-technologies)
    - Core
    - Data Management & API
    - Authentication & Payments
    - UI Components & Styling
    - Development & Tooling
    - Package Versions
  - [🚀 Getting Started](#-getting-started)
  - [⚙️ Environment Variables](#️-environment-variables)
    - Variable Descriptions:
    - Database Options
  - [🔌 API Endpoints](#-api-endpoints)
    - Products
      - Base URL
      - Endpoints
        - Products
        - Categories
    - Authentication
      - Auth0 Endpoints
    - Payments
      - Stripe Integration
    - Rate Limits
    - Error Responses
    - Authentication Requirements
  - [📂 Project Structure](#-project-structure)
  - [🔍 Key Components](#-key-components)
  - [🎨 Styling Approach](#-styling-approach)
  - [🔐 Authentication Flow](#-authentication-flow)
  - [🏪 E-commerce Features](#-e-commerce-features)
    - Shopping Experience
    - User Management
    - Payment Processing
    - Admin Features
  - [📊 Business Case](#-business-case)
  - [📝 License](#-license)
    - Copyright Protection
  - [🎓 Educational Value](#-educational-value)
    - Learning Outcomes
    - Code Review Guidelines

## ✨ Features

- Complete e-commerce functionality with product browsing and filtering
- Shopping cart with real-time updates and persistent storage
- Secure payment processing via Stripe integration
- User authentication and account management via Auth0
- Fully responsive design with mobile-first approach
- Fast loading with Next.js server-side rendering and optimization
- Modern UI/UX with SASS and TailwindCSS
- Newsletter subscription and customer engagement
- Order tracking and purchase history
- Advanced product search and filtering capabilities

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 🛠️ Technologies

### Core

- ![Next.js 15](https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js&logoColor=white)
- ![React 19](https://img.shields.io/badge/React%2019-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### Data Management & API

- ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
- ![Zustand](https://img.shields.io/badge/Zustand-2D3748?style=for-the-badge&logo=react&logoColor=white)

### 🔐 Authentication & Payments

- ![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0&logoColor=white)
- ![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

### UI Components & Styling

- ![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Lucide React](https://img.shields.io/badge/Lucide%20React-000000?style=for-the-badge&logo=lucide&logoColor=white)

### Development & Tooling

- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
- ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
- ![Husky](https://img.shields.io/badge/Husky-1e1e1e?style=for-the-badge&logo=husky&logoColor=white)

### Package Versions

```json
{
  "next": "^15.2.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "@tanstack/react-query": "^5.81.4",
  "mongodb": "^6.14.0",
  "mongoose": "^8.16.1",
  "tailwindcss": "^4.1.8",
  "sass": "^1.85.1",
  "zustand": "^5.0.6",
  "lucide-react": "^0.477.0"
}
```

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JeremichShane-FS/urban-echo.git
   cd urban-echo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file with necessary variables (see Environment Variables section)

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

[↑ Back to top](#️-urban-echo-e-commerce-store)

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Auth0 Configuration
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-stripe-webhook-secret

# Database Configuration
# MongoDB Example:
DATABASE_URL="mongodb://localhost:27017/urban-echo?replicaSet=rs0&authSource=admin&directConnection=true"

# PostgreSQL Example (alternative):
# DATABASE_URL="postgresql://user:password@localhost:5432/urban-echo"

# Application Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### Variable Descriptions:

- `AUTH0_SECRET`: A secret string used to encrypt session data (generate using `openssl rand -hex 32`)
- `AUTH0_BASE_URL`: The base URL of your application
- `AUTH0_ISSUER_BASE_URL`: Your Auth0 domain URL
- `AUTH0_CLIENT_ID`: Your Auth0 application client ID
- `AUTH0_CLIENT_SECRET`: Your Auth0 application client secret
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key for frontend
- `STRIPE_SECRET_KEY`: Your Stripe secret key for backend processing
- `DATABASE_URL`: Connection string for your MongoDB database

### Database Options

This project uses MongoDB as the primary database with Mongoose ODM, but also supports:

- MongoDB Atlas (recommended for production)
- Local MongoDB instance

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 🔌 API Endpoints

### 🛒 Products

#### Base URL

```
/api
```

#### Endpoints

##### Products

- **GET** `/api/products`
  - Get all products with optional filtering
  - **Query Parameters:**
    - `category`: Filter by category
    - `size`: Filter by size
    - `color`: Filter by color
    - `priceMin`: Minimum price filter
    - `priceMax`: Maximum price filter
    - `limit`: Number of products to return
  - **Response:**
    ```json
    {
      "products": [
        {
          "id": "string",
          "name": "string",
          "description": "string",
          "price": number,
          "originalPrice": number,
          "category": "string",
          "sizes": ["string"],
          "colors": ["string"],
          "images": ["string"],
          "featured": boolean,
          "newArrival": boolean,
          "inStock": boolean
        }
      ],
      "total": number,
      "page": number,
      "limit": number
    }
    ```

- **GET** `/api/products/[id]`
  - Get individual product details
  - **Response:** Single product object

- **GET** `/api/products/featured`
  - Get featured products for homepage
  - **Response:** Array of featured product objects

- **GET** `/api/products/new-arrivals`
  - Get new arrival products
  - **Response:** Array of new arrival product objects

##### Categories

- **GET** `/api/categories`
  - Get all product categories
  - **Response:**
    ```json
    {
      "categories": [
        {
          "id": "string",
          "name": "string",
          "slug": "string",
          "image": "string",
          "productCount": number
        }
      ]
    }
    ```

### Authentication

#### Auth0 Endpoints

```
/api/auth/[...auth0]
```

- **GET/POST** `/api/auth/login`
  - Initiates Auth0 authentication flow
  - Redirects to Auth0 login

- **GET/POST** `/api/auth/logout`
  - Signs out the user
  - Clears session

- **GET** `/api/auth/me`
  - Retrieves current user profile
  - **Response:**
    ```json
    {
      "user": {
        "sub": "string",
        "name": "string",
        "email": "string",
        "picture": "string",
        "email_verified": boolean
      }
    }
    ```

### 💳 Payments

#### Stripe Integration

- **POST** `/api/checkout/session`
  - Create Stripe checkout session
  - **Body:**
    ```json
    {
      "items": [
        {
          "id": "string",
          "quantity": number
        }
      ]
    }
    ```

- **POST** `/api/webhooks/stripe`
  - Handle Stripe webhook events
  - Processes payment confirmations and order updates

### Rate Limits

- API endpoints: 100 requests per minute per IP
- Authentication endpoints: 10 requests per minute per IP
- Payment endpoints: 20 requests per minute per user

### Error Responses

```json
{
  "error": "string",
  "status": number,
  "message": "string",
  "details": "string"
}
```

Common status codes:

- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

### Authentication Requirements

- Protected endpoints require valid Auth0 session
- Admin endpoints require elevated permissions
- Payment endpoints require user authentication

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 📂 Project Structure

```
src/
├── app/                   # App router pages
│   ├── page.js           # Home page
│   ├── layout.js         # Root layout
│   ├── shop/             # Shop pages
│   │   ├── page.js       # Shop listing
│   │   ├── [category]/   # Category pages
│   │   └── product/[id]/ # Product detail pages
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout process
│   └── account/          # User account pages
├── components/
│   ├── home/             # Homepage components
│   │   ├── HeroSection.jsx
│   │   ├── FeaturedCategories.jsx
│   │   ├── NewArrivals.jsx
│   │   └── Newsletter.jsx
│   ├── layout/
│   │   ├── navbar/       # Navigation components
│   │   └── footer/       # Footer components
│   ├── product/          # Product-related components
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   └── ProductFilter.jsx
│   ├── cart/             # Shopping cart components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Library configurations
│   ├── auth0.js         # Auth0 configuration
│   ├── stripe.js        # Stripe configuration
│   └── mongodb.js       # Database connection
├── sass/                 # Global styles
│   ├── main.scss        # Main SASS entry
│   ├── base/            # Base styles
│   ├── utilities/       # Utility classes
│   └── components/      # Component styles
├── services/            # API services
└── utils/               # Utility functions
```

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 🔍 Key Components

- **HeroSection**: Main banner with featured content and CTAs
- **ProductCard**: Reusable product display component with add-to-cart functionality
- **Navbar**: Responsive navigation with search, cart, and user menu
- **FeaturedCategories**: Homepage category showcase
- **NewArrivals**: Latest product displays
- **Newsletter**: Email subscription component
- **Footer**: Site footer with links and company information

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 🎨 Styling Approach

- **SASS Architecture**: BEM methodology with modular component styles
- **TailwindCSS Integration**: Utility-first approach for rapid development
- **Design System**: Consistent spacing, typography, and color variables
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Brand Colors**:
  - Primary: `#333333` (Dark Gray)
  - Accent: `#E67E22` (Orange)
  - Secondary: `#4A90A7` (Blue)
  - Text: `#F7F7F7` (Off-White)

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 🔐 Authentication Flow

1. User clicks login/register
2. Redirected to Auth0 universal login
3. Auth0 handles authentication
4. User redirected back with session
5. Session managed by Auth0 SDK
6. Protected routes check authentication status

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 🏪 E-commerce Features

### Shopping Experience

- Advanced product filtering and search
- Persistent shopping cart across sessions
- Guest checkout and registered user checkout
- Real-time inventory checking
- Product recommendations
- Wishlist functionality

### User Management

- User registration and login via Auth0
- Profile management and order history
- Address book management
- Newsletter subscription preferences

### Payment Processing

- Secure payment via Stripe
- Multiple payment methods support
- Order confirmation and tracking
- Automated receipt generation

### Admin Features

- Product management (planned)
- Order management (planned)
- Customer service tools (planned)

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 📊 Business Case

**Target Market**: Fashion-conscious consumers aged 18-45 with middle-class income ($40,000-$100,000) who value convenience and online shopping.

**User Persona**: Rachel Jeremich - 28-year-old RN Nurse with $70,000/year income, shops online 2-3 times monthly, values easy navigation and secure payments.

**Market Opportunity**: Fashion e-commerce sector expected to reach $1.2 trillion by 2025 (Statista).

**Key Value Propositions**:

- Time-saving online shopping experience
- Secure payment processing
- Mobile-optimized interface
- Detailed product information and reviews

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 📝 License

Urban Echo is **proprietary software** created for portfolio demonstration.

**Permitted**: Code review for employment evaluation and educational study
**Prohibited**: Commercial use, redistribution, or incorporation into other projects

See [LICENSE](LICENSE) for complete terms and [DISCLAIMER.md](docs/DISCLAIMER.md) for usage restrictions.

### 🛡️ Copyright Protection

All code, documentation, and assets are protected by copyright law. Unauthorized use will be prosecuted to the full extent of the law.

[↑ Back to top](#️-urban-echo-e-commerce-store)

## 🎓 Educational Value

### 📚 Learning Outcomes

Students and developers can study this codebase to understand:

- Modern React/Next.js development patterns
- E-commerce platform architecture and implementation
- Integration with third-party services (Auth0, Stripe, MongoDB)
- Professional code organization and documentation standards
- Security best practices for web applications

### 🔍 Code Review Guidelines

When reviewing the Urban Echo codebase for educational purposes:

- Focus on architecture patterns and implementation approaches
- Understand the reasoning behind technology choices
- Study the integration patterns with external services
- Learn from the project structure and organization methods

[↑ Back to top](#️-urban-echo-e-commerce-store)

---

**© 2025 Shane Jeremich / Urban Echo - All Rights Reserved | Portfolio Project | Not for Commercial Use**

_This README serves as both project documentation and professional portfolio presentation for Urban Echo. For licensing inquiries or employment discussions, please use the contact information provided above._
