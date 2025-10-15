# Project Context

## Purpose
Group Collaboration Hub provides a collaborative workspace where teams create shared "spaces" that bundle chat, notes, learning resources, and member management in a single interface. The goal is to demonstrate the end-to-end surface of a modern collaboration product that can later be wired to real services.

## Tech Stack
- Next.js 15 App Router with React 19 and TypeScript for the application shell
- Tailwind CSS v4 (with CSS variables and `tw-animate-css`) for styling
- Radix UI primitives via local `components/ui` design system plus Lucide icons
- Visual editing instrumentation through `VisualEditsMessenger` and a custom Turbopack loader

## Project Conventions

### Code Style
Use TypeScript-first React components, keeping `"use client"` directives only where hooks or browser APIs are required. Prefer Tailwind utility classes with the `cn` helper for styling concerns, and organize shared UI patterns under `src/components/ui`. Module imports should go through the `@/` path alias, and lint rules from `eslint.config.mjs` (Next.js flat config plus `eslint-plugin-import`) must remain satisfied.

### Architecture Patterns
Routes live in the App Router (`src/app`) and delegate UI to feature-focused components under `src/components` (e.g., `HomePage`, `SpaceView`, `UserProfile`). The `components/ui` directory holds shadcn-style wrappers around Radix primitives to keep presentation consistent. Shared utilities live in `src/lib`, while `src/visual-edits` contains the Orchids visual editing bridge loaded through Turbopack.

### Testing Strategy
`npm run lint` (Next.js lint + ESLint flat config) is the primary automated gate today; TypeScript and ESLint build errors are ignored at compile time, so contributors must lint locally before committing. No automated unit or integration tests exist yet—add focused tests alongside new behavior when functionality moves beyond mocked data.

### Git Workflow
The default branch is `main`. Create feature branches per change, open PRs back to `main`, and use Conventional Commit prefixes (`feat:`, `fix:`, etc.) to match the existing history.

## Domain Context
Each "space" aggregates collaboration tools: a chat timeline with lightweight messaging, shared block-based notes (text, to-dos, and links), structured learning modules with lesson videos, and membership administration. The current implementation uses client-side mock data with React state, so persistence, authentication, and real-time syncing are future integration points.

## Important Constraints
- `next.config.ts` relaxes TypeScript/ESLint build enforcement—treat lint output as authoritative despite the lenient build settings.
- The app injects an external route-messenger script and posts messages to the parent window to support Orchids visual editing, so keep iframe compatibility intact.
- Remote images are allowed from any host; review usage before shipping to production to avoid unintended hotlinking or policy issues.

## External Dependencies
- Supabase storage-hosted script (`https://slelguoygbfzlpylpxfs.supabase.co/.../route-messenger.js`) powers runtime messaging for the visual editing workflow.
- Drizzle ORM and `@libsql/client` are installed for future data persistence, though no database connection is wired up yet.
