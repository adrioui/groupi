# dev-tooling Specification

## Purpose
TBD - created by archiving change remove-orchids-integration. Update Purpose after archive.
## Requirements
### Requirement: Local build excludes Orchids tooling
The application SHALL run locally without loading Orchids visual-edit instrumentation or external route-messenger scripts.

#### Scenario: Root layout renders without Orchids script
- **WHEN** the root layout is rendered
- **THEN** no Supabase-hosted Orchids route-messenger script is included in the HTML output
- **AND** no `VisualEditsMessenger` bridge is mounted.

#### Scenario: Build succeeds with Vite
- **WHEN** `npm run build` is executed
- **THEN** the build completes successfully using Vite without requiring the custom Orchids Turbopack loader.

### Requirement: Build enforces lint and type safety guardrails
The build pipeline SHALL fail when TypeScript or ESLint violations are present by leaving `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` disabled.

#### Scenario: TypeScript errors block builds
- **WHEN** `next build` runs while a TypeScript error exists
- **THEN** the build fails and reports the type error instead of completing successfully.

#### Scenario: ESLint errors block builds
- **WHEN** `next build` runs while an ESLint rule violation exists
- **THEN** the build fails and reports the lint error instead of completing successfully.

### Requirement: ESLint adopts recommended Next.js presets
The lint configuration SHALL extend `next/core-web-vitals` and `next/typescript` defaults and SHALL keep critical Next.js rules such as `react-hooks/exhaustive-deps` and `@next/next/no-img-element` enabled.

#### Scenario: ESLint config loads Next core presets
- **GIVEN** `eslint.config.mjs`
- **WHEN** linting is executed
- **THEN** the configuration extends `next/core-web-vitals` and `next/typescript` and the critical rules remain enabled.

