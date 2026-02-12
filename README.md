# Mini SaaS Dashboard - Full-Stack Developer Assessment

A robust, responsive Mini SaaS Dashboard built with Next.js 16, TypeScript, Tailwind CSS, and Supabase. This project fulfills the requirements for the Full-Stack Developer Task, providing a project management interface with full CRUD capabilities, authentication, and a modern UI/UX.

## 🌐 Live Demo

**[View Live Application](https://mini-saas-tau.vercel.app/)**

Test the deployed application with full functionality.

## 🚀 Features

- **Project Management Dashboard**: A centralized view of all projects with key performance indicators (KPIs).
- **CRUD Functionality**: Create, Read, Update, and Delete projects with ease.
- **Advanced Filtering & Search**:
  - Real-time search by project name.
  - Filter projects by status (Active, On Hold, Completed).
- **Responsive Table View**: A mobile-friendly table with pagination for efficient data browsing.
- **Modal Forms**: Clean, intuitive modals for adding and editing project details.
- **Authentication**: Secure JWT/Session-based authentication (Sign Up, Login, Logout) powered by Supabase Auth.
- **Statistics Overview**: Real-time stats cards showing total projects, active projects, and budget summaries.
- **Dark Mode Support**: Styled with Tailwind CSS for a premium, adaptive look.
- **SEO Optimized**: Comprehensive meta tags, Open Graph, and Twitter Card integration for better discoverability.
- **Enforced Architecture Boundaries**: ESLint rules enforce clean feature-based architecture with barrel exports.

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query v5
- **Forms**: React Hook Form & Zod
- **Icons**: Lucide React

### Backend & Database

- **API**: Next.js API Routes (RESTful)
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Drizzle ORM
- **Auth**: Supabase Auth

### Tooling

- **Tests**: Vitest (Unit/Integration) & Playwright (E2E)
- **Code Quality**: ESLint, Prettier, Husky, Commitlint
- **Type Safety**: Biome for advanced TypeScript hints and performance
- **Deployment**: Optimized for Vercel/Supabase

## 📂 Project Structure

The project follows a **Feature-Based Architecture** for better scalability and maintainability:

```
src/
├── app/                  # Next.js App Router (Routes & API)
├── components/           # Shared UI components (Shadcn-like)
├── db/                   # Database schema and Drizzle config
├── features/             # Business logic grouped by feature
│   ├── auth/             # Authentication logic, hooks, components
│   ├── projects/         # Project CRUD logic, tables, modals
│   └── stats/            # Dashboard statistics logic
├── lib/                  # Shared utilities and API clients
└── hooks/                # Global React hooks
```

### 🔒 Architecture Boundaries

This project enforces **strict architectural boundaries** using custom ESLint rules:

- ✅ **Barrel Exports Required**: All feature imports must use the feature's `index.ts` barrel file
- ❌ **No Deep Imports**: Direct imports from `features/*/components/*`, `features/*/hooks/*`, etc. are forbidden
- ❌ **No Cross-Feature Direct Access**: Features can only communicate through their public API (barrel exports)
- 🧪 **Test Exception**: Test files can bypass these rules for easier testing

**Example:**

```typescript
// ❌ WRONG - Deep import
import { ProjectTable } from "@/features/projects/components/ProjectTable";

// ✅ CORRECT - Barrel import
import { ProjectTable } from "@/features/projects";
```

This ensures:

- Clean feature boundaries
- Easier refactoring and maintenance
- Clear public APIs for each feature
- Reduced coupling between modules

## ⚙️ Setup & Installation

### Prerequisites

- Node.js 20+
- A Supabase project (URL and Keys)

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd mini-sass
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_public_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_postgresql_connection_string
DIRECT_URL=your_direct_connection_string
NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000
PLAYWRIGHT_TEST_BASE_URL=http://localhost:3000
```

### 4. Database Setup

Push the schema to your Supabase database:

```bash
npm run db:push
```

(Optional) Seed the database with dummy data:

```bash
npm run db:seed
```

### 5. Configure Supabase Authentication

**⚠️ IMPORTANT**: After creating your Supabase database, you must disable email confirmation for seamless authentication:

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Providers** → **Email**
3. **Disable** the "Confirm email" option
4. Save changes

This allows users to sign up and log in immediately without email verification.

### 6. Run the application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

The project includes both unit and end-to-end tests:

- **Run Unit Tests**: `npm run test`
- **Run E2E Tests**: `npm run test:e2e`

## 📊 API Documentation

- `GET /api/projects` - Fetch all projects for the authenticated user.
- `POST /api/projects` - Create a new project.
- `PUT /api/projects?id={id}` - Update an existing project.
- `DELETE /api/projects?id={id}` - Delete a project.
- `GET /api/projects/stats` - Fetch summary statistics for the dashboard.

## ✨ Bonus Points Implemented

- ✅ **Authentication**: Fully implemented Sign-in/Sign-up flow.
- ✅ **Clean Architecture**: Decoupled service, hook, and UI layers with enforced boundaries.
- ✅ **Seeding**: Custom seeding script for quick testing.
- ✅ **E2E Testing**: Playwright integration for critical flows.
- ✅ **Design**: Premium aesthetics with micro-animations and responsive layouts.
- ✅ **SEO**: Complete metadata implementation with Open Graph and Twitter Cards.
- ✅ **Enforced Boundaries**: ESLint rules prevent architectural violations.

---

Created as part of the Full-Stack Developer Assessment.
