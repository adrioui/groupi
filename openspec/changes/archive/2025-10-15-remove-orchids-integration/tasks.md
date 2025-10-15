## 1. Implementation
- [x] 1.1 Remove Orchids script injection and VisualEditsMessenger from `src/app/layout.tsx` (or hide behind env flag).
- [x] 1.2 Update `ErrorReporter` to operate without Orchids iframe messaging when the tooling is disabled.
- [x] 1.3 Delete the custom Turbopack loader configuration and prune `src/visual-edits` assets.
- [x] 1.4 Run `npm run lint` and `npm run dev` to confirm clean startup locally.
