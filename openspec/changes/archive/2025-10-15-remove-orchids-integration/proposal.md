## Why
The dev shell currently injects Orchids visual editing tooling (a remote route-messenger script, error relay, and component tagging loader). These dependencies complicate local setup, trigger external network calls, and add iframe assumptions that are unnecessary for ordinary development.

## What Changes
- Remove the Supabase-hosted route-messenger script tag and VisualEditsMessenger bootstrap from the root layout.
- Strip or guard the Orchids-specific postMessage logic in `ErrorReporter` so it can operate without iframe assumptions.
- Delete the custom Turbopack loader and bundled `src/visual-edits` assets when the tooling is disabled.

## Impact
- Specs touched: none (no behavioral requirements change).
- Code touched: `src/app/layout.tsx`, `src/components/ErrorReporter.tsx`, `next.config.ts`, and `src/visual-edits/*`.
- Tooling: requires a full lint/test pass to ensure the app builds without the removed instrumentation.
