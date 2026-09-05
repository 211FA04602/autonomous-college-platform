# ADR-005: React web architecture

**Status:** Accepted
**Date:** 2026-09-05
**Upholds constitution rules:** 5, 12, 15, 19

## Context

The web client serves every role in PRD §5 with a responsive, accessible, localized experience, sharing contracts (types, validation, design tokens, i18n resources) with the mobile client without duplicating backend business rules.

## Decision

- **Framework/build:** React 19 + TypeScript (strict mode) + Vite, scaffolded from the official `react-ts` template and extended rather than hand-rolled, so the toolchain (React/Vite/TS version combination, build config) is one the framework maintainers actually test together.
- **Routing:** a single accessible application shell with client-side routing; route-level code splitting as the app grows past the foundation slice.
- **Design system foundation:** accessible primitives (button, text field, status banner, etc.) built on the shared `@acplatform/design-tokens` package — not a full component library at this stage, just enough primitives to render the health slice and the standard loading/empty/error/unauthorized/maintenance states consistently.
- **API boundary:** all backend calls go through `@acplatform/api-contracts` (shared with mobile) — no ad hoc `fetch` in feature code, so correlation IDs, error shape (RFC 7807), and auth-token attachment stay consistent (constitution rule 12).
- **Auth/tenant context:** a documented React context interface (`AuthContext`, `TenantContext`) with a placeholder provider — wired to real identity-access endpoints in a later prompt. The placeholder never fabricates a logged-in user or bypasses a check; it explicitly renders the "not yet authenticated" state (constitution rule 13, rule 19: web enforces the same rules as mobile, both ultimately deferring to the backend).
- **Localization:** `@acplatform/i18n-resources` + a standard extraction-friendly `t("namespace.key")` pattern from the first component, not retrofitted later.
- **Responsive layout:** CSS designed mobile/tablet/desktop from the shell outward; this is a native mobile app product (React Native), so "mobile" for the web client means *responsive browser layout*, not a substitute for the native apps.

## Consequences

- Sharing `api-contracts`/`validation-schemas`/`design-tokens`/`i18n-resources` with mobile via npm workspaces means a change to a shared package must be typechecked against both consumers in CI.
- A full design-system library and generated OpenAPI client are explicitly deferred; the foundation ships hand-written types mirroring the one real endpoint (system health) plus the scaffolding both will plug into.
