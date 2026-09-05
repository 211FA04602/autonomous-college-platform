# Claude Code Prompt 00

## Engineering Constitution and Repository Foundation

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Run this prompt:** First, in a new empty Git repository  
**Prerequisite:** Copy the approved PRD into the repository as `docs/product/PRD.md`

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer responsible for establishing a greenfield, production-grade software repository for a standalone Engineering College and Autonomous Institution Operating Platform.

Read `docs/product/PRD.md` completely before making changes. Treat it as the product source of truth. This product is independent from Institora. Do not import, copy, or create runtime coupling to Institora. Optional future interoperability will be through explicit versioned APIs only.

Technology decisions:
- Java 21 and current stable Spring Boot 3.x
- Gradle Kotlin DSL multi-module build
- React 19-compatible architecture, TypeScript, and Vite for web
- React Native + TypeScript for first-class Android and iOS applications
- native mobile applications, not WebView wrappers
- PostgreSQL 17-compatible SQL; production target Amazon Aurora PostgreSQL
- Flyway for all schema changes
- AWS-first deployment using containers and infrastructure as code
- modular monolith for core transactional domains
- separate worker services only for workloads needing independent scale or isolation
- REST APIs described with OpenAPI
- RFC 7807 Problem Details for API errors
- UUID v7 or ULID identifiers; choose one, document it, and apply it consistently
- UTC for stored instants; institution time zone for display and academic scheduling
- transactional outbox for reliable domain-event publication
- Testcontainers for backend integration tests
- Vitest and React Testing Library for web tests
- Playwright for web end-to-end tests
- React Native Testing Library plus Appium 2 or Maestro-ready Android/iOS end-to-end architecture

First inspect the repository. If it is not empty, report what exists and preserve all legitimate work. Never overwrite unrelated changes. Do not use destructive Git commands.

Create an engineering constitution at `docs/engineering/CONSTITUTION.md`. It must define these non-negotiable rules:

1. Every tenant-owned record contains `tenant_id`; institution and campus scope are explicit where applicable.
2. Tenant context comes only from authenticated membership and authorized scope—not a client-trusted header or request field.
3. PostgreSQL Row-Level Security is defense in depth for tenant-owned tables. Application-level predicates are still mandatory.
4. No repository method may expose unrestricted tenant-owned data.
5. All public APIs are versioned and contract-tested.
6. Database changes use forward-only Flyway migrations. Never mutate an applied migration.
7. Official academic, examination, result, financial, and audit records use correction, reversal, or versioning rather than destructive update or deletion.
8. Configuration and rule versions are stored with effective dates; historical results must be reproducible.
9. High-risk actions require separation of duties, explicit authorization, reason, and audit.
10. Sensitive files use object-storage references; binary data is not stored in PostgreSQL.
11. Events are written through the transactional outbox. Consumers are idempotent.
12. APIs use validation, stable error codes, correlation IDs, pagination, and optimistic locking where needed.
13. No fake integrations, silent success, placeholder production logic, or TODO paths may be presented as complete.
14. AI is assistive; consequential academic decisions require authorized human approval.
15. Responsive web, native Android/iOS interfaces for every role, accessibility, localization, offline-aware mobile behavior, observability, and testability are first-class.
16. Secrets never enter source code, examples, test snapshots, or logs.
17. No institution-specific code forks. Variations use configuration, feature flags, or well-defined extension points.
18. Avoid premature microservices; preserve strict module boundaries.
19. Mobile navigation visibility is not authorization. Mobile and web use the same backend security rules.
20. Confidential question papers, hidden tests, raw payment credentials, secrets, and prohibited student data are never stored in mobile offline caches.

Create this repository structure:

- `backend/` — Gradle multi-module Spring Boot workspace
- `frontend/` — React + TypeScript web application
- `mobile/` — React Native + TypeScript Android/iOS workspace
- `workers/` — placeholders only for later independently deployable workers; no speculative implementation
- `infra/` — infrastructure-as-code workspace
- `docs/architecture/`
- `docs/api/`
- `docs/product/`
- `docs/mobile/`
- `docs/runbooks/`
- `docs/security/`
- `docs/testing/`
- `.github/workflows/`

Backend modules should initially include:

- `app` executable composition root
- `platform-core` shared primitives with minimal dependencies
- `identity-access`
- `tenancy-organization`
- `audit`
- `workflow`
- `documents`
- `notifications`
- `integration-outbox`

Define backend module boundaries with package rules and ArchUnit. Domain modules must not directly read another module's tables or depend on another module's internal packages. Shared code must remain small; do not create a generic dumping-ground module.

Web foundation requirements:

- React + TypeScript strict mode
- Vite production build
- accessible application shell and routing
- design-system foundation using accessible primitives
- typed API client boundary
- authentication and tenant/role context placeholders connected only to documented interfaces—not fake production logic
- consistent loading, empty, error, unauthorized, and maintenance states
- localization extraction architecture
- responsive layouts for desktop, tablet, and mobile browsers

Mobile foundation requirements:

- initialize real Android and iOS React Native projects in `mobile/`
- share design tokens, generated API types/client, localization resources, validation schemas, and non-UI utilities where safe
- do not duplicate backend business rules in mobile
- establish native interfaces for secure storage, system-browser OIDC/PKCE, push notifications, camera/document capture, QR/barcode scanning, biometrics, background synchronization, and authorized location
- implement only compileable/testable foundation adapters at this stage; do not fabricate connected providers
- create role-aware navigation architecture capable of supporting every PRD role
- create encrypted local-cache/offline-sync interfaces with an explicit allowlist policy
- establish Android unit/build/smoke testing
- establish iOS project/build/test configuration and document that valid iOS builds require macOS runners
- add React Native Testing Library and Appium/Maestro-ready test structure
- create `docs/mobile/ROLE_FEATURE_MATRIX.md` listing every PRD role, planned mobile surface, mobile-first actions, web-first restrictions, offline policy, sensitive-data rules, and current implementation status
- do not mark role interfaces complete in this foundation prompt

Platform foundation requirements:

- Spring Boot health and readiness endpoints with minimal public exposure
- structured JSON logging
- correlation/request IDs
- Micrometer/OpenTelemetry-ready instrumentation
- ESLint, TypeScript strict mode, Prettier, and Stylelint only if justified
- backend formatting and static analysis
- `.editorconfig`, `.gitattributes`, and `.gitignore`
- Docker Compose for local PostgreSQL only; add other dependencies later when needed
- sanitized `.env.example` files
- Makefile or task runner with documented commands
- dependency locking or version catalog where practical
- no production authentication bypass

Create initial ADRs:

- ADR-001 modular monolith
- ADR-002 tenant isolation
- ADR-003 PostgreSQL and Flyway
- ADR-004 transactional outbox and event strategy
- ADR-005 React web architecture
- ADR-006 AWS deployment direction
- ADR-007 React Native Android/iOS architecture
- ADR-008 mobile security, secure storage, and offline synchronization boundaries

Create CI that runs:

- backend compile, tests, formatting, and static checks
- web install, lint, typecheck, tests, and production build
- mobile TypeScript, lint, unit/component tests, and Android build/smoke validation
- iOS build/test jobs on macOS runners, or a correctly configured documented workflow if macOS execution is unavailable in the current environment
- secret scanning
- dependency vulnerability scanning
- basic SAST
- generated API-client drift checks when generation becomes available

Pin CI action versions to immutable SHAs where practical. Do not require live AWS credentials for pull-request CI. Never claim iOS was validated if no macOS runner executed it.

Create local developer documentation with exact prerequisites, JDK/Node/package-manager versions, PostgreSQL startup, backend boot, web boot, Android boot, iOS boot, tests, ports, environment variables, and troubleshooting.

Add one health/readiness vertical slice consumed by:

- the React web application
- the React Native Android application
- the React Native iOS application

Each client must show explicit loading, healthy, unavailable, and retry states. This slice proves the builds and API client work; it is not a substitute for business functionality.

Do not build business modules in this prompt.

Required verification:

- clean backend build and tests
- web lint, typecheck, tests, and production build
- mobile lint, TypeScript, and unit/component tests
- Android build and smoke validation
- iOS build/test on a valid macOS environment when available; otherwise provide exact pending command and mark iOS execution evidence unavailable, not passed
- local Spring Boot application starts against PostgreSQL
- web and mobile health clients communicate with the backend
- ArchUnit/module-boundary tests pass
- no hard-coded secrets
- CI files are syntactically valid
- documentation commands match actual repository commands
- working tree changes are limited to this prompt's scope

At completion, provide this exact report structure:

1. Summary of what was implemented
2. Files added or changed
3. Database migrations added
4. APIs added or changed
5. Web implementation status
6. Android implementation and test status
7. iOS implementation and test status
8. Security and tenancy controls established
9. Tests added and exact results
10. Commands run and exit status
11. ADRs, documentation, and runbooks created
12. Known limitations, unavailable environment evidence, or deferred items
13. Manual verification steps
14. Suggested commit message
15. Explicit statement: `Completion gate: PASSED` or `Completion gate: FAILED`

Mark the completion gate PASSED only when all environment-available checks succeed, missing iOS/macOS execution is explicitly reported as unavailable rather than falsely passed, and the repository is ready for Prompt 01. Stop after the report. Do not begin identity, tenancy, or business-module implementation.
```

---

## Completion Gate Before Prompt 01

Review Claude Code's report and verify:

- The PRD was read and retained as the source of truth.
- The repository is separate from Institora.
- Backend, web, Android, iOS, infrastructure, and documentation workspaces exist.
- Android and iOS are genuine React Native projects, not WebView wrappers.
- Every PRD role appears in `docs/mobile/ROLE_FEATURE_MATRIX.md`.
- Claude did not report static role shells as completed mobile applications.
- Backend, web, and environment-available mobile checks pass.
- Any unavailable macOS/iOS evidence is clearly stated.
- No business module was prematurely implemented.
- No secrets or unsafe authentication bypasses were added.
- The working tree is reviewed before committing.

Suggested commit message after your review:

```text
chore(platform): establish engineering constitution and repository foundation
```

Do not run Prompt 01 until this completion gate passes.

