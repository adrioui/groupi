# Project Context

## Purpose
Groupy is a collaborative workspace application built with TanStack Start. Teams create shared spaces that combine chat, notes, learning resources, and member management in one interface. This demonstration project showcases modern React development patterns and collaborative workspace concepts.

## Tech Stack
- **Framework**: TanStack Start v1.131.50
- **Build Tool**: Vite v6.0.0
- **Runtime**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with Radix UI primitives
- **Routing**: TanStack Router with file-based routing
- **Icons**: Lucide React and Tabler Icons
- **State Management**: React hooks (built-in state)
- **Database**: Drizzle ORM with LibSQL (prepared for future integration)
- **Authentication**: Better Auth (prepared for future integration)
- **Linting**: ESLint with TypeScript support
- **Type Checking**: Strict TypeScript configuration
- **Path Aliases**: @/ for clean imports

## Project Conventions

### Code Style
- TypeScript-first React components with strict mode enabled
- Tailwind CSS for styling using the `cn` utility function from `clsx` and `tailwind-merge`
- ESLint configuration must pass with zero warnings allowed
- Module imports use `@/` path alias for clean paths
- Component naming follows PascalCase convention
- File naming uses kebab-case for routes and PascalCase for components
- Use conventional commit messages (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`)

### Architecture Patterns
- **File-based routing**: TanStack Router with routes defined in `src/routes/` directory
- **Component organization**: Feature components in `src/components/`, reusable UI components in `src/components/ui/`
- **Shared utilities**: Common code in `src/lib/` with utilities and configurations
- **Custom hooks**: React hooks in `src/hooks/` directory
- **UI primitives**: Radix UI components wrapped in `src/components/ui/` following shadcn/ui patterns
- **Path aliases**: `@/*` maps to `./src/*` for clean imports

### Testing Strategy
Testing framework not yet implemented. Prepared for future integration with testing tools.

### Git Workflow
- Use conventional commit messages for all commits
- Branch naming: `feature/`, `fix/`, `docs/`, etc.
- All commits must pass `npm run lint` with zero warnings
- Pre-commit checklist: linting and build verification

## Domain Context
Groupy serves as a collaborative workspace platform where teams can:
- Create shared spaces for organized collaboration
- Communicate via real-time chat with rich text support
- Maintain shared notes with block-based content (text, todos, links)
- Access structured learning modules with video content
- Manage team members and roles
- Work across desktop and mobile devices with responsive design

## Important Constraints
- Currently uses client-side mock data for demonstration purposes
- Database and authentication integrations are prepared but not yet active
- Build configuration relaxes some TypeScript/ESLint enforcement for development
- External script integration allowed for visual editing workflow
- Remote image access permitted (review before production deployment)

## External Dependencies
- **Database**: LibSQL (prepared for future integration)
- **Authentication**: Better Auth (prepared for future integration)
- **Payment Processing**: Stripe (integrated for future monetization features)
