## Why
The current setup suppresses TypeScript and ESLint errors during builds, allows unrestricted remote images, and misuses the App Router params contract for the space detail page. Together these gaps hide regressions, weaken security defaults, and can break routing at runtime. We need to re-align the project with Next.js best practices so that quality gates and runtime behavior are trustworthy.

## What Changes
- Reinstate TypeScript and ESLint build enforcement while adopting the recommended Next.js lint presets.
- Correct the `/space/[id]` route to consume `params` synchronously and guard against invalid IDs.
- Replace the wildcard remote image configuration with a curated HTTPS allow list that blocks insecure hosts.

## Impact
- Affected specs: `dev-tooling`, `routing`, `asset-security`
- Affected code: `next.config.ts`, `eslint.config.mjs`, `src/app/space/[id]/page.tsx`
