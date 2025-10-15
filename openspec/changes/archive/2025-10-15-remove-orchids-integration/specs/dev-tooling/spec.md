## ADDED Requirements
### Requirement: Local build excludes Orchids tooling
The application SHALL run locally without loading Orchids visual-edit instrumentation or external route-messenger scripts.

#### Scenario: Root layout renders without Orchids script
- **GIVEN** a developer runs `npm run dev`
- **WHEN** the root layout is rendered
- **THEN** no Supabase-hosted Orchids route-messenger script is included in the HTML output
- **AND** no `VisualEditsMessenger` bridge is mounted.

#### Scenario: Build succeeds without Turbopack loader
- **WHEN** `npm run build` is executed
- **THEN** the build completes successfully without requiring the custom Orchids Turbopack loader.
