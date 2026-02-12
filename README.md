# Mini SaaS Dashboard

A modern, responsive web dashboard for managing projects, built with Next.js, Tailwind CSS, Drizzle ORM, and Supabase.

## 🚀 Features

- **Project Management**: List, search, filter, add, and edit projects.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Real-time Stats**: Dashboard overview with project status and budget metrics.
- **Authentication**: Secure user authentication via Supabase Auth.
- **Type Safety**: End-to-end type safety with TypeScript and Drizzle ORM.
- **Data Validation**: Robust client and server-side validation using Zod.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, TanStack Query.
- **Backend**: Next.js API Routes.
- **Database**: PostgreSQL (via Supabase).
- **ORM**: Drizzle ORM.
- **Validation**: Zod.
- **Icons**: Google Material Icons.

## 📋 Project Fields

Each project includes the following fields:
- **Name**: Project title.
- **Status**: Active, On Hold, or Completed.
- **Deadline**: Project completion date.
- **Assigned To**: Team member assigned to the project.
- **Budget**: Project budget in USD.

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 18+ and pnpm/npm/yarn.
- A Supabase project.

### Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
APP_BASE_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Moemen12/mini-saas.git
   cd mini-saas
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run migrations:
   ```bash
   npx drizzle-kit push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Development

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint for code quality checks.

## 📄 License

This project is licensed under the MIT License.
