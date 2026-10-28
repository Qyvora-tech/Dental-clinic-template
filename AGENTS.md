# Agent Instructions — City Smiles Dental & Skin Clinic

## Project Overview

Marketing website for City Smiles Dental & Skin Clinic (Sialkot).
Built with TanStack Start (React 19 + Vite), Tailwind CSS v4, and shadcn/ui components.

## Architecture

- `src/routes/`: TanStack Start file-based routing (`__root.tsx`, `index.tsx`). Do not hand-edit `src/routeTree.gen.ts`.
- `src/server.ts`: Custom SSR entry with catastrophic error wrapper.
- `src/lib/clinic.ts`: Central source of truth for clinic copy, doctors, hours, FAQs, and services.
- `src/components/site/`: Site section components.
- `src/components/ui/`: Reusable Radix UI & shadcn/ui primitives.

## Commands

- `npm run dev`: Start local development server
- `npm run build`: Production build with SSR bundle
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint checks
- `npm test`: Run automated Vitest test suite

## Coding Standards

- Maintain strict TypeScript type safety (`npx tsc --noEmit`).
- Keep all clinic contact numbers, addresses, and medical triage messages consistent with `src/lib/clinic.ts`.
