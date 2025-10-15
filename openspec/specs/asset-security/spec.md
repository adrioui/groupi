# asset-security Specification

## Purpose
TBD - created by archiving change improve-next-quality-guardrails. Update Purpose after archive.
## Requirements
### Requirement: Remote images are limited to a curated HTTPS allow list
The Next.js image configuration SHALL restrict remote patterns to named HTTPS hosts required by the product, and SHALL reject wildcard hostnames or any `http` scheme entries.

#### Scenario: HTTP hosts are rejected
- **WHEN** a developer attempts to add an `http://` host to the remote image configuration
- **THEN** the configuration denies the change because only `https` entries are permitted.

#### Scenario: Wildcard hostnames are disallowed
- **WHEN** the image configuration is inspected
- **THEN** it contains only explicit hostnames and no catch-all values such as `**`.

