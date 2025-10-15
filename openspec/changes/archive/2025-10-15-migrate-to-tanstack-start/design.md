## Context
The project currently uses Next.js 15 App Router with React 19, TypeScript, Tailwind CSS. TanStack Start offers a more modular approach with Vite for building, TanStack Router for routing, and built-in server functions.

## Goals / Non-Goals
- Goals: Migrate to TanStack Start for improved performance and flexibility
- Non-Goals: Change UI components, keep Tailwind CSS, maintain existing features

## Decisions
- Use TanStack Router for routing instead of Next.js App Router
- Use Vite as build tool instead of Next.js build system
- Keep existing component structure where possible

## Risks / Trade-offs
- Risk: Migration complexity, potential breaking changes
- Mitigation: Follow official migration guide, test thoroughly

## Migration Plan
1. Update dependencies
2. Migrate configuration
3. Migrate routing
4. Update components
5. Test and validate