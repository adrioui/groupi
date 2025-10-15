## ADDED Requirements

### Requirement: Space detail route consumes params synchronously
The `/space/[id]` page SHALL accept the App Router `params` object directly and SHALL validate that `params.id` is a non-empty string before rendering.

#### Scenario: Valid space id renders view
- **GIVEN** a request to `/space/alpha`
- **WHEN** the route loads
- **THEN** it reads `params.id` without awaiting a promise and renders `SpaceView` with `spaceId="alpha"`.

#### Scenario: Invalid params trigger not-found
- **GIVEN** a request where `params.id` is missing or empty
- **WHEN** the route loads
- **THEN** it invokes `notFound()` so the user receives the 404 boundary instead of rendering with bad data.
