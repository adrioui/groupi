# Groupy

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/groupy)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

A collaborative workspace application built with TanStack Start. Teams create shared spaces that combine chat, notes, learning resources, and member management in one interface.

![Demo](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Group+Collaboration+Hub+Demo)

This demonstration project showcases modern React development patterns and collaborative workspace concepts.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

## Features

### Collaboration Tools
- **Spaces**: Create collaborative workspaces for your team
- **Chat**: Real-time messaging with rich text support
- **Notes**: Shared block-based notes with text, todos, and links
- **Lessons**: Structured learning modules with video content
- **Member Management**: User administration and role management
- **Responsive Design**: Mobile-first design with dark mode support

### Technical Features
- **Modern Stack**: Built with TanStack Start, React 19, and TypeScript
- **UI Components**: Tailwind CSS v4 with Radix UI primitives
- **Type Safety**: Full TypeScript coverage with strict mode
- **Developer Experience**: Hot reload, linting, and modern tooling

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) v1.131.50
- **Build Tool**: [Vite](https://vitejs.dev/) v6.0.0
- **Runtime**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with Radix UI primitives
- **Routing**: TanStack Router with file-based routing
- **Icons**: Lucide React and Tabler Icons
- **State Management**: React hooks (built-in state)
- **Database**: Drizzle ORM with LibSQL (prepared for future integration)
- **Authentication**: Better Auth (prepared for future integration)

### Development Tools
- **Linting**: ESLint with TypeScript support
- **Code Quality**: Prettier integration
- **Type Checking**: Strict TypeScript configuration
- **Path Aliases**: `@/` for clean imports

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- Package manager: npm, yarn, pnpm, or bun (this project uses bun as default)
- Git for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd groupy
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   bun dev
   # or
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Setup

This project does not require additional environment variables for basic development. You can set up:

```bash
# Optional: Create a .env.local file for development
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env.local
```

### Troubleshooting

<details>
<summary>Click to expand common issues</summary>

**Port already in use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Then restart with a different port
PORT=3001 npm run dev
```

**Dependencies not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Run type checking
npm run type-check
```

</details>

## Project Structure

```
groupy/
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── components/         # Feature components
│   │   ├── ui/            # Reusable UI components (Radix-based)
│   │   ├── HomePage.tsx   # Landing page with space listing
│   │   ├── SpaceView.tsx  # Main space interface with tabs
│   │   ├── ChatInterface.tsx
│   │   ├── NotesInterface.tsx
│   │   ├── LessonsInterface.tsx
│   │   ├── MemberManagement.tsx
│   │   └── UserProfile.tsx
│   ├── routes/            # TanStack Router file-based routes
│   │   ├── __root.tsx     # Root layout
│   │   ├── index.tsx      # Home page
│   │   ├── profile.tsx    # User profile
│   │   └── space/         # Space-related routes
│   ├── lib/               # Utilities and shared code
│   ├── hooks/             # Custom React hooks
│   ├── app/               # App-specific components (legacy structure)
│   ├── client.tsx         # Client-side app entry
│   ├── server.tsx         # Server-side app entry
│   └── router.tsx         # TanStack Router configuration
├── openspec/              # Project specifications and documentation
├── AGENTS.md              # AI agent guidelines
├── README.md              # This file
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── eslint.config.mjs      # ESLint rules
```

### Key Directories Explained

- **`src/components/`**: Main application components organized by feature
- **`src/components/ui/`**: Reusable UI primitives built on Radix UI
- **`src/routes/`**: File-based routing with TanStack Router
- **`src/lib/`**: Shared utilities, helpers, and configurations
- **`openspec/`**: Design specs, architecture decisions, and project planning

## Development

### Available Scripts

```bash
# Development
bun dev          # Start development server with hot reload
npm run dev      # Alternative: start dev server with npm

# Building
bun build        # Build for production
npm run build    # Alternative: build with npm

# Production
bun start        # Start production server  
npm run start    # Alternative: start with npm

# Quality Assurance
npm run lint     # Run ESLint (mandatory before commits)
bun preview      # Preview production build locally
```

### Development Workflow

1. **Code Style Guidelines**
   - TypeScript-first React components
   - Tailwind CSS for styling with `cn` utility function
   - ESLint configuration must pass (zero warnings allowed)
   - Module imports use `@/` path alias for clean paths
   - Use conventional commit messages (`feat:`, `fix:`, `docs:`, etc.)

2. **Pre-commit Checklist**
   ```bash
   # Run before every commit
   npm run lint    # Must pass
   npm run build   # Should not fail
   ```

3. **Component Development**
   - Create feature components in `src/components/`
   - Use `src/components/ui/` for reusable Radix-based components
   - Follow existing naming patterns and structure

### Architecture Overview

<details>
<summary>Click to expand technical details</summary>

**Current Implementation**
- Uses client-side mock data for demonstration
- Prepared for database integration with Drizzle ORM + LibSQL
- Authentication setup ready with Better Auth
- Visual editing instrumentation included for development tools

**Technical Constraints**
- Build configuration relaxes TypeScript/ESLint enforcement  
- External script integration for visual editing workflow
- Remote image access allowed (review before production)

**Future Integration Points**
- Real-time collaboration with WebSocket connections
- Persistent data storage with database migration
- Authentication and authorization system
- File upload and media management

</details>

## Contributing

We welcome contributions. Here's how to get started:

### Setting Up for Development

1. **Fork and clone**
   ```bash
   git clone https://github.com/your-username/groupy.git
   cd groupy
   ```

2. **Install and run**
   ```bash
   bun install
   bun dev
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Contribution Guidelines

- **Code Quality**: All contributions must pass `npm run lint` with zero warnings
- **TypeScript**: Maintain type safety and strict mode compliance  
- **Testing**: Add tests for new functionality (when test suite is added)
- **Documentation**: Update relevant documentation for API/interface changes
- **Commits**: Use conventional commit messages:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation updates
  - `style:` for formatting changes
  - `refactor:` for code refactoring
  - `test:` for adding tests

### Pull Request Process

1. Update documentation as needed
2. Ensure all checks pass (lint, build, type check)
3. Open a PR with clear description of changes
4. Request review from maintainers
5. Address feedback promptly

## FAQ

<details>
<summary>Common questions about the project</summary>

**Q: Can I use this in production?**
A: This demonstration project showcases development patterns. While production-ready in terms of code quality, it uses mock data and expects further integration work.

**Q: How do I add new UI components?**
A: Check `src/components/ui/` for existing Radix-based components. Follow the same pattern for new components.

**Q: What's the difference between `bun dev` and `npm run dev`?**
A: Both commands start the development server. Bun is used for faster installation and development, but npm is fully supported.

**Q: How do I add a new route?**
A: Add a new file in `src/routes/` following TanStack Router conventions. The file name becomes the route path.

**Q: Can I use a different styling approach?**
A: While Tailwind CSS is the primary styling system, you can add CSS-in-JS libraries if needed. Maintain consistency with existing patterns.

</details>

## License

This project demonstrates modern web development practices. Use it as a learning resource or starting point for your own projects.

---

**Acknowledgments**

- Built with [TanStack Start](https://tanstack.com/start)
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide React](https://lucide.dev/) and [Tabler Icons](https://tabler-icons.io/)

---

<div align="center">

Made with ❤️ for demonstrating modern collaborative workspace concepts

[Back to top ⬆️](#groupy)

</div>
