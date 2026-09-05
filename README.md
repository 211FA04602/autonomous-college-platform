# Autonomous College Platform

A standalone, cloud-first operating platform for engineering colleges, autonomous institutions, and multi-campus higher-education groups in India. **Independent from Institora** — no code, data, or runtime dependency is shared; any future interoperability happens only through explicit, versioned public APIs.

Product source of truth: [`docs/product/PRD.md`](docs/product/PRD.md).
Binding engineering rules: [`docs/engineering/CONSTITUTION.md`](docs/engineering/CONSTITUTION.md).
Architecture decisions: [`docs/architecture/`](docs/architecture/) (ADR-001 through ADR-008).

## Repository layout

```
backend/     Gradle Kotlin DSL, multi-module Spring Boot 3.5.16 / Java 21 modular monolith
frontend/    React 19 + TypeScript + Vite web app
mobile/      React Native + TypeScript — native Android and iOS apps
workers/     Placeholder — independently deployable workers, added only when justified (ADR-001)
infra/       Infrastructure as code (AWS-first) — local/ (dev Postgres notes) and aws/ (Terraform, placeholder)
packages/    Shared TypeScript packages (npm workspaces): design-tokens, i18n-resources,
             validation-schemas, shared-utils, api-contracts — consumed by frontend and mobile
docs/        architecture, api, product, mobile, runbooks, security, testing, engineering
.github/     CI workflows
```

## Status

This is the **foundation prompt**: repository structure, engineering constitution, ADRs, module boundaries, CI, and one end-to-end health/readiness vertical slice (consumed by web, Android, and iOS) proving the toolchain and API contract work. **No business modules (identity, tenancy, academics, examinations, fees, etc.) are implemented yet** — see each module's own README for what's deferred and why.

## Quick start

Prerequisites: JDK 21, Node.js 24.x, npm 10+, Docker (for local PostgreSQL), Android Studio + SDK (for Android work), Xcode on macOS (for iOS work). Full details: [`docs/runbooks/LOCAL_DEV.md`](docs/runbooks/LOCAL_DEV.md).

```bash
# 1. Local Postgres
make db-up

# 2. Backend (from repo root)
make backend-test     # compile + unit + ArchUnit tests
make backend-run      # boots the Spring Boot app on :8080 (management on :8090)

# 3. Web + mobile + shared packages (npm workspaces, from repo root)
npm install
make web-dev           # Vite dev server on :5173
make mobile-lint
make mobile-typecheck
make mobile-test
```

See `make help` for the full command list, and `backend/README.md` / `frontend/README.md` / `mobile/README.md` for module-specific detail, ports, and troubleshooting.

## Identifiers, time, and tenancy conventions

- Primary keys: **UUIDv7** everywhere (ADR-002).
- Stored instants: **UTC**, displayed in the institution/browser time zone (constitution rule 8).
- Tenant scope: resolved server-side from authenticated membership only, never from client input (constitution rules 1–4, ADR-002).

## Contributing to this repository

Every module's `README.md` states what it does and does not implement yet. Before adding a business module, read `docs/engineering/CONSTITUTION.md` in full — it is binding, not advisory.
