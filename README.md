# HypeShelf | Professional Recommendation Platform

HypeShelf is a high-performance, security-focused web application for sharing and managing media recommendations. Built with a modern serverless stack, it prioritizes visual excellence, reactive data, and robust role-based access control.

## 🏗️ Technical Architecture

HypeShelf is built on a "Reactive Serverless" architecture, leveraging best-in-class tools for authentication, data persistence, and UI rendering.

- **Frontend**: Next.js 16 (App Router) with React Server Components.
- **Backend / Database**: [Convex](https://convex.dev) - A reactive database that syncs state to the client in real-time via WebSockets.
- **Authentication**: [Clerk](https://clerk.com) - Integrated with Convex for verified JWT-based identity.
- **Styling**: Tailwind CSS with a premium dark aesthetic.

## 🔐 Security-Minded Thinking

Security is baked into the core of HypeShelf, following the principle of **Never Trust the Client**.

### Identity & Authentication
- **Verified JWTs**: Every backend request is verified against Clerk's public keys. We never trust a `userId` sent from the client; it is always extracted from the verified identity in the backend `ctx.auth`.
- **Syncing User State**: User records are synced automatically upon login to ensure consistent metadata and role management.

### Role-Based Access Control (RBAC)
- **Admin vs. User**: The system differentiates between standard users and administrators.
- **Server-Side Verification**: Permissions (e.g., deleting any post, marking "Staff Picks") are enforced at the database level. We re-verify roles in the backend even if the client-side UI has already checked them.
- **Automatic Admin Elevation**: For ease of testing in new environments, the first user to register in the database is automatically granted the `admin` role.

### Data Integrity
- **Schema Validation**: Every table in Convex is protected by a strict schema (`convex/schema.ts`), preventing malformed data from ever entering the system.
- **Input Sanitization**: All user-generated content (titles, blurbs) is trimmed and length-validated on the server before insertion.

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages, Layouts)
├── components/           # Reusable UI components
│   ├── dashboard/        # Feature-specific dashboard components
│   ├── layout/           # Shared layout components (Navbar, Container)
│   ├── recommendations/  # Recommendation-specific UI
│   └── ui/               # Lower-level primitive components (Radix/shadcn)
├── convex/               # Backend logic and Database configuration
│   ├── _generated/       # Type-safe generated Convex code
│   ├── recommendations.ts# Core recommendation logic (Queries/Mutations)
│   ├── users.ts          # User management and RBAC logic
│   └── schema.ts         # Strictly typed database schema
├── lib/                  # Shared utilities and type definitions
└── public/               # Static assets
```

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd hype_shelf
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.local.example` to `.env.local` and populate your Clerk and Convex keys.

4. **Launch Development Environment**:
   ```bash
   # Terminal 1: Next.js dev server
   npm run dev

   # Terminal 2: Convex backend sync
   npx convex dev
   ```

---

*HypeShelf — Built for Experts, Powered by Hype.*
