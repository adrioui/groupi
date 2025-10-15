## MODIFIED Requirements
### Requirement: Local build excludes Orchids tooling
The application SHALL run locally without loading Orchids visual-edit instrumentation or external route-messenger scripts.

#### Scenario: Root layout renders without Orchids script
- **WHEN** the root layout is rendered
- **THEN** no Supabase-hosted Orchids route-messenger script is included in the HTML output
- **AND** no `VisualEditsMessenger` bridge is mounted.

#### Scenario: Build succeeds with Vite
- **WHEN** `npm run build` is executed
- **THEN** the build completes successfully using Vite without requiring the custom Orchids Turbopack loader.