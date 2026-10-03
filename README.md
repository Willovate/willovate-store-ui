# Willovate-One — Store UI

The customer-facing React and TypeScript storefront for **Willovate-One**, an AI-powered multi-store e-commerce platform.

The Store UI provides the customer-facing shopping experience while the Willovate Store API manages businesses, templates, products, customers, orders, inventory, and other store data.

---

# 1. About Willovate-One

Willovate-One is a Shopify-style e-commerce platform designed to allow businesses to create and manage their own online stores.

The platform is intended to support multiple businesses/stores from a single system.

The overall product flow is:

```text
User
  ↓
Create Business / Store
  ↓
Select Business Type
  ↓
Choose Template
  ↓
Customize Store
  ↓
Add Products
  ↓
Configure Store
  ↓
Publish Store
  ↓
Customer Visits Store
  ↓
Browse Products
  ↓
Add to Cart
  ↓
Checkout
  ↓
Order
  ↓
Business Owner Manages Order
```

The Store UI is one part of this larger platform.

---

# 2. Overall Willovate-One Architecture

```text
                         Willovate-One
                              |
          +-------------------+-------------------+
          |                   |                   |
          v                   v                   v
     Storefront             Admin              AI Layer
     Store UI             Dashboard          AI Features
          |                   |                   |
          +-------------------+-------------------+
                              |
                              v
                       Willovate Store API
                              |
       +----------+-----------+-----------+----------+
       |          |           |           |          |
       v          v           v           v          v
   Business   Templates    Products    Orders    Customers
       |          |           |           |          |
       +----------+-----------+-----------+----------+
                              |
                              v
                          PostgreSQL
```

---

# 3. Important Architecture Concept

Willovate-One is **not a collection of independent websites**.

It is one platform capable of creating multiple stores.

The important relationship is:

```text
Business
   +
Template
   +
Business Data
   =
Storefront
```

For example:

```text
Business:
Urban Threads

Business Type:
Clothing

Template:
Fashion Theme

Products:
50

Categories:
Men / Women / Shoes

        ↓

Urban Threads Storefront
```

The template controls the design.

The business owns the actual store data.

---

# 4. Store UI Responsibilities

This repository is responsible primarily for the **customer-facing storefront**.

It includes:

* Store homepage
* Template rendering
* Product catalog
* Product listing
* Product details
* Search
* Category filtering
* Shopping bag/cart
* Responsive layouts
* Store navigation
* Store-specific UI
* API integration

Future responsibilities may include:

* Checkout UI
* Customer accounts
* Order history
* Wishlist
* Store search
* Reviews
* AI-powered customer features

---

# 5. Current Store UI Features

The current Store UI includes:

* React
* TypeScript
* Vite
* API-backed catalog
* Search
* Category filters
* Local persistent shopping bag
* Responsive states
* Production Docker container
* Typed API boundary
* Unit/test support

---

# 6. Prerequisites

* Node.js 22
* Docker
* PostgreSQL
* .NET SDK required by the API repository

If using `nvm`:

```bash
nvm use
```

The sibling:

```text
willovate-store-api
```

should normally run at:

```text
http://localhost:5191
```

---

# 7. Run Locally

```bash
cp .env.example .env

npm install

npm run dev
```

Open:

```text
http://localhost:5173
```

If the catalog displays a connection message, start PostgreSQL and the API from the API repository:

```bash
docker compose up -d postgres

dotnet run --project src/Willovate.Store.Api
```

---

# 8. Environment Configuration

The Store UI uses:

```text
VITE_API_URL
```

This is the public base URL of the Store API.

Example:

```env
VITE_API_URL=http://localhost:5191
```

Vite embeds environment variables into the application during build time.

Therefore production builds must receive the deployed API URL.

---

# 9. Production Docker Build

Build:

```bash
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  -t willovate-store-ui .
```

Run:

```bash
docker run --rm -p 5173:8080 willovate-store-ui
```

---

# 10. Validate a Change

Before opening a pull request:

```bash
npm run lint

npm test

npm run build
```

A change should not be considered complete until the relevant validation passes.

---

# 11. Existing Project Map

The existing structure should be preserved.

```text
src/
│
├── App.tsx
│
├── lib/
│   ├── api.ts
│   └── cart.ts
│
├── hooks/
│   └── useCart.ts
│
├── types.ts
│
├── components/
│
├── pages/
│
└── templates/
```

Current responsibilities:

### `src/App.tsx`

Composes the current storefront experience.

### `src/lib/api.ts`

Typed API boundary between the UI and backend.

All server communication should remain behind the API layer.

### `src/lib/cart.ts`

Contains testable shopping cart behavior.

### `src/hooks/useCart.ts`

Persists the cart for the browser session.

### `src/types.ts`

Contains types that mirror the public API contracts used by the UI.

---

# 12. Frontend Development Principle

Keep server data behind:

```text
src/lib/
```

Avoid directly calling backend endpoints from random UI components.

Preferred:

```text
Component
    ↓
Hook / Service
    ↓
src/lib/api.ts
    ↓
Store API
```

Avoid:

```text
Component
    ↓
fetch("...")
```

unless there is a clear architectural reason.

---

# 13. Template Architecture

Templates are a major part of Willovate-One.

A template is a reusable storefront design.

Templates should be organized by business category.

Recommended structure:

```text
src/templates/

├── sports/
│   │
│   ├── velocity/
│   ├── arena/
│   ├── progear/
│   └── sprint/
│
├── clothing/
│   │
│   ├── fashion/
│   ├── streetwear/
│   ├── luxury/
│   └── minimal/
│
├── cosmetics/
│   │
│   ├── beauty/
│   ├── skincare/
│   └── makeup/
│
└── electronics/
```

The exact names can change as the template library grows.

---

# 14. Template Rule

A template should not be treated as a separate ecommerce application.

Instead:

```text
Global Template
       ↓
Business Data
       ↓
Rendered Store
```

For example:

```text
Velocity Template

        +

Sports Store Data

        ↓

Customer Storefront
```

The template should be reusable for multiple businesses.

---

# 15. Template Independence

Every major template should have its own visual identity.

Do not create ten templates that are effectively the same page with different images.

Templates should be meaningfully different in:

* Layout
* Hero design
* Navigation
* Typography
* Product cards
* Product sections
* Promotional sections
* Content hierarchy
* Mobile layout
* Desktop layout

---

# 16. Responsive Requirement

Every storefront template must work on:

```text
Desktop
Tablet
Mobile
```

Mobile is not an optional adaptation.

Each template should have intentional mobile behavior.

Test at minimum:

```text
Desktop
1366px+

Tablet
768px+

Mobile
375px / 390px / 430px
```

---

# 17. Template Selection Flow

The overall template flow is:

```text
Landing Page
      ↓
Choose Business Type
      ↓
Template Listing
      ↓
Template Preview
      ↓
Select Template
      ↓
Business gets Template
      ↓
Storefront loads selected Template
```

Example:

```text
User selects:

Clothing
    ↓
Fashion Theme
    ↓
Template ID:
clothing-fashion-001
```

The backend stores the relationship between the business and template.

---

# 18. Frontend ↔ Backend Flow

The Store UI communicates with the Store API.

```text
React UI
   ↓
API Service
   ↓
HTTP Request
   ↓
Willovate Store API
   ↓
Application Logic
   ↓
Database
   ↓
API Response
   ↓
React UI
```

Example:

```text
Store UI

GET /api/products

        ↓

Willovate Store API

        ↓

PostgreSQL

        ↓

Product Response

        ↓

Product Cards
```

---

# 19. Business / Store Context

Because Willovate-One is a multi-store platform, storefront data must belong to the correct business.

Conceptually:

```text
Business
   |
   +── Template
   |
   +── Products
   |
   +── Categories
   |
   +── Customers
   |
   +── Orders
```

The Store UI must not mix data between businesses.

Example:

```text
Store A
  ↓
Store A Products

Store B
  ↓
Store B Products
```

Never:

```text
Store A
  ↓
Store A + Store B Products
```

---

# 20. Product Flow

The customer product flow is:

```text
Product Catalog
      ↓
Search / Filter
      ↓
Product Card
      ↓
Product Details
      ↓
Select Variant
      ↓
Add to Cart
      ↓
Cart
      ↓
Checkout
```

---

# 21. Cart Flow

Current cart behavior is maintained in:

```text
src/lib/cart.ts
src/hooks/useCart.ts
```

The cart should remain testable and independent from UI rendering.

Conceptually:

```text
Product
   ↓
Add to Cart
   ↓
Cart State
   ↓
Persistent Browser Storage
   ↓
Cart UI
```

---

# 22. Future Checkout Flow

The planned flow is:

```text
Cart
  ↓
Checkout
  ↓
Customer Information
  ↓
Shipping Address
  ↓
Order Summary
  ↓
Payment
  ↓
Order Created
  ↓
Confirmation
```

Checkout should be implemented as a separate feature rather than tightly coupling it to the current cart implementation.

---

# 23. Future Customer Account Flow

Planned:

```text
Customer
  ↓
Register / Login
  ↓
Account
  ├── Profile
  ├── Addresses
  ├── Orders
  └── Wishlist
```

---

# 24. Future AI Integration

AI is part of the larger Willovate-One platform.

Potential features include:

```text
AI Store Generator
AI Product Description Generator
AI Content Generator
AI Store Assistant
AI Analytics Assistant
AI Automation Agents
```

Example:

```text
User:
"Create a premium sportswear store."

        ↓

AI

        ↓

Business Configuration
        +
Template Recommendation
        +
Store Content
        +
Categories

        ↓

Willovate Store
```

AI functionality should integrate through controlled backend services/APIs.

The frontend should not contain AI business logic that belongs on the backend.

---

# 25. Team Structure

Willovate-One should be developed as a coordinated multi-team project.

```text
Project Owner
      |
      +----------------+
      |                |
      v                v
Frontend Team      Backend Team
      |                |
      v                v
Templates          APIs / DB
      |
      +----------------+
                       |
                       v
                  AI Team

QA and DevOps support all modules.
```

---

# 26. Project Owner Responsibilities

The Project Owner is responsible for:

* Product vision
* Overall architecture direction
* Feature prioritization
* Sprint planning
* Team coordination
* Module ownership
* Dependency management
* Requirement clarification
* Integration planning
* Reviewing completed features
* Documentation
* Release coordination

The Project Owner should make sure developers do not unknowingly build duplicate or conflicting functionality.

---

# 27. Frontend Team Responsibilities

Frontend team owns:

* Store UI
* React components
* Storefront pages
* Template implementation
* Responsive design
* API integration
* Cart UI
* Checkout UI
* Customer-facing experience

Frontend developers should use the API contract provided by the backend team.

---

# 28. Backend Team Responsibilities

Backend team owns:

* Business/Store
* Database
* APIs
* Authentication
* Authorization
* Products
* Categories
* Orders
* Customers
* Inventory
* Store configuration
* Business logic

---

# 29. AI Team Responsibilities

AI team owns:

* LLM integration
* Prompt engineering
* RAG
* AI agents
* AI tools
* Store generation
* Content generation
* Automation
* AI evaluation

AI should interact with business data through defined application APIs/services.

---

# 30. QA Responsibilities

QA should test:

* Functional behavior
* API integration
* Responsive behavior
* Cross-browser behavior
* Cart behavior
* Checkout
* Authentication
* Template rendering
* Multi-business data isolation
* Regression

Important test:

```text
Business A must never access Business B's private data.
```

---

# 31. Development Phases

## Phase 1 — Foundation

```text
Business / Store
Database foundation
API foundation
Authentication foundation
```

## Phase 2 — Templates

```text
Template model
Template API
Template listing
Template preview
Template assignment
Template frontend architecture
```

## Phase 3 — Store Customization

```text
Logo
Brand
Colors
Fonts
Homepage sections
Navigation
Footer
```

## Phase 4 — Products

```text
Products
Categories
Variants
Images
Pricing
Inventory
```

## Phase 5 — Customer Storefront

```text
Homepage
Collections
Search
Product details
Cart
Checkout
```

## Phase 6 — Orders & Customers

```text
Customers
Orders
Order status
Order history
```

## Phase 7 — Admin Dashboard

```text
Dashboard
Products
Orders
Customers
Inventory
Analytics
Settings
```

## Phase 8 — Payments & External Services

```text
Payment
Email
Notifications
Shipping
```

## Phase 9 — AI

```text
AI Store Generator
AI Product Description
AI Content Generator
AI Assistant
AI Agents
Automation
```

## Phase 10 — Production

```text
Security
Performance
Monitoring
CI/CD
Deployment
Backups
Production QA
```

---

# 32. Git Workflow

Do not directly develop unfinished features on `main`.

Recommended:

```text
main
  |
  └── develop
        |
        +── feature/business-foundation
        +── feature/template-system
        +── feature/product-management
        +── feature/checkout
        +── feature/admin-dashboard
        +── feature/ai-store-generator
```

A developer should:

```text
Pull latest code
      ↓
Create/update feature branch
      ↓
Implement feature
      ↓
Test
      ↓
Commit
      ↓
Push
      ↓
Pull Request
      ↓
Code Review
      ↓
QA
      ↓
Merge
```

---

# 33. Commit Convention

Use meaningful commit messages.

Good:

```text
feat: add clothing template routing
feat: add product search
fix: resolve mobile navigation issue
fix: correct cart quantity update
refactor: separate template components
docs: update store ui readme
```

Avoid:

```text
update
changes
final
done
new
test
```

---

# 34. Pull Request Requirements

Every PR should include:

```text
What changed?

Why was it changed?

Which module was affected?

How was it tested?

Are there breaking changes?
```

Example:

```text
Title:
feat: add sports template selection

Changes:
- Added template selection state
- Added template routing
- Added API integration
- Added responsive template preview

Testing:
- npm run lint
- npm test
- npm run build
```

---

# 35. Definition of Done

A feature is complete only when:

```text
Implementation
      ↓
Local Testing
      ↓
Lint
      ↓
Unit / Functional Tests
      ↓
Build
      ↓
API Integration
      ↓
Responsive Testing
      ↓
Code Review
      ↓
QA
      ↓
Merged
```

---

# 36. Project Map

At a high level:

```text
Willovate-One
│
├── willovate-store-ui
│   │
│   ├── Customer Storefront
│   ├── Templates
│   ├── Cart
│   └── API Integration
│
├── willovate-store-api
│   │
│   ├── Business
│   ├── Templates
│   ├── Products
│   ├── Customers
│   ├── Orders
│   ├── Inventory
│   └── Database
│
├── AI Services
│
└── Documentation
```

---

# 37. Important Development Rules

### Rule 1 — Do not rebuild existing functionality

Before changing an existing module:

```text
Understand existing code
        ↓
Check dependencies
        ↓
Extend existing architecture
        ↓
Test
```

Do not remove working features without discussion.

### Rule 2 — Keep modules separated

Template code should not contain order-management logic.

### Rule 3 — Use APIs

Frontend should communicate with backend through documented API contracts.

### Rule 4 — Avoid unnecessary duplication

Create reusable components where appropriate.

### Rule 5 — Responsive by default

Every customer-facing feature must support desktop and mobile.

### Rule 6 — Protect business data

Business-specific data must remain isolated.

### Rule 7 — Document architectural changes

Major architecture changes should be documented before implementation.

---

# 38. Current Development Focus

The current Willovate-One development focus is:

```text
1. Business / Store Foundation
        ↓
2. Template System
        ↓
3. Storefront Templates
        ↓
4. Store Customization
        ↓
5. Products
        ↓
6. Cart / Checkout
        ↓
7. Orders / Customers
        ↓
8. Admin
        ↓
9. AI
```

The Store UI team can continue template development while the backend team builds the required platform foundation.

Both teams should coordinate through API contracts.

---

# 39. Current Store UI Goal

The immediate Store UI goal is to build a professional and scalable template ecosystem.

Templates should support categories such as:

```text
Sports
Clothing
Cosmetics
Electronics
Food
Fitness
Jewellery
Furniture
```

Each category can contain multiple unique templates.

Example:

```text
Sports
├── Velocity
├── Arena
├── ProGear
└── Sprint

Clothing
├── Fashion
├── Streetwear
├── Luxury
└── Minimal

Cosmetics
├── Beauty
├── Skincare
└── Makeup
```

---

# 40. Long-Term Store Experience

The final customer experience should look like:

```text
                    Willovate-One
                          |
                    Store Published
                          |
                          v
                     Storefront
                          |
             +------------+------------+
             |            |            |
             v            v            v
            Home       Products      Search
                          |
                          v
                    Product Details
                          |
                          v
                        Cart
                          |
                          v
                      Checkout
                          |
                          v
                       Payment
                          |
                          v
                        Order
```

---

# 41. Final Product Vision

Willovate-One should eventually allow a business owner to go from:

```text
"I want an online store"
```

to:

```text
Business Created
      ↓
Template Selected
      ↓
Store Generated
      ↓
Products Added
      ↓
Store Customized
      ↓
Store Published
      ↓
Customers Purchase
      ↓
Orders Managed
      ↓
AI Helps Operate the Business
```

The ultimate goal is to make Willovate-One a scalable platform for creating, customizing, publishing, and operating multiple online stores.

---

# 42. Quick Reference

### Frontend

```text
React
TypeScript
Vite
CSS
Vitest
```

### Backend

```text
.NET
ASP.NET Core
PostgreSQL
REST API
```

### AI

```text
LLM
RAG
AI Agents
Automation
```

### Infrastructure

```text
Docker
CI/CD
Cloud Deployment
Monitoring
```

---

# 43. Existing Technical README Commands

These commands remain the standard local development commands for the Store UI.

```bash
cp .env.example .env

npm install

npm run dev
```

Backend:

```bash
docker compose up -d postgres

dotnet run --project src/Willovate.Store.Api
```

Validation:

```bash
npm run lint

npm test

npm run build
```

Production:

```bash
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  -t willovate-store-ui .

docker run --rm -p 5173:8080 willovate-store-ui
```

---

# 44. Contribution

Before opening a pull request:

1. Read `CONTRIBUTING.md`
2. Understand the module you are changing
3. Check whether another developer is working on the same area
4. Keep changes focused
5. Run lint
6. Run tests
7. Run production build
8. Create a clear pull request
9. Address code review comments
10. Ensure the change does not break existing functionality

---

# 45. Project Owner Principle

The project should always be developed with this principle:

> **Willovate-One is one platform, not a collection of disconnected features.**

Every feature must eventually fit into the larger flow:

```text
Business
   ↓
Template
   ↓
Store
   ↓
Products
   ↓
Customers
   ↓
Cart
   ↓
Checkout
   ↓
Orders
   ↓
Business Management
   ↓
AI & Automation
```

All teams should understand how their module connects to this flow before implementing major features.

---

## Repository Status

This repository is the **customer-facing Store UI** of Willovate-One.

The existing Store UI architecture and development commands should be preserved while the project is gradually extended with:

* Multiple storefront templates
* Business-aware storefronts
* Store customization
* Product details
* Checkout
* Customer accounts
* Order history
* AI-powered storefront capabilities

Existing working functionality must not be removed unnecessarily. New features should extend the current architecture.
