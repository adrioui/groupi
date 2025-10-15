## ADDED Requirements
### Requirement: File-based routing
The application SHALL use TanStack Router for client-side and server-side routing with file-based route definitions.

#### Scenario: Home route loads
- **WHEN** user navigates to /
- **THEN** the home page component is rendered

#### Scenario: Dynamic routes work
- **WHEN** user navigates to /space/[id]
- **THEN** the space page loads with the correct id parameter

#### Scenario: Nested routes supported
- **WHEN** routes are nested in directories
- **THEN** TanStack Router handles the hierarchy correctly