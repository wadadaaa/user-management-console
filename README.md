# User Management Console

A React dashboard for displaying, searching, and sorting users fetched from JSONPlaceholder API.

## Features

- Fetch and display users from API
- Search users by name, email, or username (debounced)
- Sort by name, email, or username (ascending/descending)
- Loading, error, and empty states
- Reusable components
- TypeScript with runtime validation (Zod)
- Unit tests

## Tech Stack

- React 19 + TypeScript
- TanStack Query (React Query) for data fetching
- Zod for API response validation
- Tailwind CSS for styling
- Vitest for testing

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── features/users/
│   ├── api/      # Data fetching hooks
│   ├── lib/      # Business logic (filtering, sorting)
│   ├── model/    # TypeScript types & Zod schemas
│   └── ui/       # UI components
├── shared/       # Reusable hooks and utilities
└── App.tsx       # Main application component
```