# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Employee Directory — a React SPA for managing employee records, built with Vite, React 19, and TypeScript in strict mode.

## Commands

- `npm run dev` — Vite dev server (http://localhost:5173)
- `npm run mock` — JSON Server mock API on port 3001 (`db.json`)
- `npm run build` — TypeScript type-check + Vite production build
- `npm run lint` — ESLint (flat config, TS + React rules)
- `npm run preview` — Preview production build locally

Dev workflow: run `npm run mock` and `npm run dev` concurrently.

## Architecture

**Stack:** Vite 7 + React 19 + TypeScript 5.9 strict, Tailwind CSS v4 (Vite plugin, no config file), Redux Toolkit + RTK Query, React Hook Form + Zod 4, TanStack Table v8.

**Structure:**

- `src/store/store.ts` — Redux store with typed `RootState` and `AppDispatch` exports
- `src/features/` — Feature-based modules (slices, components, hooks per feature)
- `src/shared/components/` — Reusable cross-feature components
- `db.json` — Mock data: 10 employees, 6 departments. JSON Server provides full REST CRUD at `/employees` and `/departments`

**Key patterns:**

- Tailwind v4 uses `@import "tailwindcss"` in `index.css` — no `tailwind.config.js`
- Redux Provider wraps App in `main.tsx`; add RTK Query API middleware and slice reducers to `store.ts`
- TypeScript is configured with `verbatimModuleSyntax` — use `import type` for type-only imports
- ESLint uses flat config format (eslint.config.js)
- Build target is ES2022; module resolution is `bundler`

## apsys Architecture Rules

- All features go inside `src/features/<feature-name>/`
- Each feature must have the following structure:
  - `data/` — RTK Query API slice
  - `domain/` — TypeScript interfaces and types
  - `presentation/` — React components and pages
- Never mix feature concerns — keep each feature self-contained
- Use RTK Query for ALL server state (no useEffect + fetch)
- Use React Hook Form + Zod for ALL forms
- Shared components go in `src/shared/components/`

## Code Style

- Use comments sparingly. Only comment complex code.
- When creating a new RTK Query endpoint, always add proper TypeScript types for the response.

## Mock API

- JSON Server running on `http://localhost:3001`
- Endpoints: `/employees`, `/departments`
- Use this base URL in all RTK Query API slices during development
