# Engineering Constitution

**Applies to:** the entire Autonomous College Platform monorepo (`backend/`, `frontend/`, `mobile/`, `workers/`, `infra/`).
**Status:** binding. A change that violates a rule below is not mergeable, regardless of who wrote it or how small it seems.
**Product relationship:** this is a new, standalone product, independent from Institora. No code, data, credentials, or runtime dependency may be imported, copied, or coupled from Institora. Future interoperability, if ever needed, happens only through explicit, versioned, documented public APIs — never a shared database, shared library fork, or private integration.

Every rule below states *what*, *why it is non-negotiable*, and *how it is enforced* so reviewers and automation can check it mechanically rather than by judgment call.

---

## 1. Every tenant-owned record carries `tenant_id`; institution/campus scope is explicit

**What:** Any table holding data that belongs to a specific institution has a non-null `tenant_id` column (and, where the domain distinguishes campuses within a group, an explicit `institution_id` / `campus_id`). There is no implicit "current tenant" inferred from a session global inside a query.

**Why:** This platform explicitly supports single-institution, multi-campus-group, and SaaS multi-tenant deployment from the same codebase (PRD §4.1). A missing or implicit tenant column is how one institution's students, results, or fees leak into another's queries.

**How enforced:** Flyway migrations that create a tenant-owned table without `tenant_id NOT NULL` fail review. A repository-layer ArchUnit/static check (added once the first tenant-owned module ships) flags entities lacking the column.

## 2. Tenant context comes only from authenticated membership and authorized scope

**What:** The tenant a request operates against is derived from the authenticated principal's verified membership/role assignment, resolved server-side — never from a client-supplied header, query parameter, cookie, or request body field.

**Why:** A client-trusted tenant identifier is a direct cross-tenant authorization bypass; the client is not a trust boundary.

**How enforced:** Security review checklist item; any endpoint that reads a tenant ID from request input instead of the authenticated principal's resolved membership is a blocking finding (see `docs/security/`).

## 3. Row-Level Security is defense in depth — application predicates are still mandatory

**What:** PostgreSQL RLS policies are enabled on tenant-owned tables once identity/tenancy ships. This is an additional layer, not a replacement for explicit `WHERE tenant_id = :tenant` (or equivalent repository-level scoping) in application code.

**Why:** Relying on RLS alone hides authorization bugs until a connection-pooling or role-configuration mistake removes the safety net in production. Relying on the application alone leaves no protection if a query is ever run outside the normal code path (migration, ad hoc ops query, future service).

**How enforced:** Module review checklist requires both layers present before a tenant-owned table is considered done; RLS policies live in versioned Flyway migrations alongside the table.

## 4. No repository method may expose unrestricted tenant-owned data

**What:** Every repository/query method that reads tenant-owned rows takes and applies a tenant-scoping parameter (or is called only through a service layer that has already scoped it). "Find all" methods without a tenant bound are not permitted on tenant-owned entities.

**Why:** An unscoped `findAll()` is the most common accidental cross-tenant leak in multi-tenant systems.

**How enforced:** ArchUnit rule (added with the first tenant-owned module) forbids unscoped finder signatures on repositories annotated/marked as tenant-owned; code review checklist backs this up until the rule ships.

## 5. All public APIs are versioned and contract-tested

**What:** Every public REST API is served under an explicit version segment (`/v1/...`), described in OpenAPI, and has a contract test asserting the documented shape. A breaking change requires a new version, not a silent change to an existing one.

**Why:** Web, native Android, native iOS, and eventually external integrators all depend on the same contract; breaking it silently breaks multiple clients that cannot be redeployed in lockstep.

**How enforced:** CI fails if `docs/api/openapi.yaml` (or generated equivalent) and the actual controller contract diverge, once codegen is wired up; until then, the health endpoint's OpenAPI document is hand-verified in review.

## 6. Database changes use forward-only Flyway migrations; an applied migration is never mutated

**What:** Schema change = a new `V{n}__description.sql` file. Never edit or delete a migration that has already been applied in any shared environment.

**Why:** Mutating an applied migration desyncs Flyway's checksum tracking and produces different schemas across environments depending on when they last migrated — a class of bug that is extremely hard to diagnose in production.

**How enforced:** CI runs `flyway validate`; a modified historical migration fails the build. Roll-forward fixes are a new migration.

## 7. Official academic/examination/result/financial/audit records are corrected, reversed, or versioned — never destructively updated or deleted

**What:** Once a record in these categories is committed (a published result, a posted fee transaction, a ratified examination outcome, an audit log entry), changing it means writing a correction/reversal/new version linked to the original, not an `UPDATE`/`DELETE` that erases the prior state.

**Why:** These are the records an institution is legally and academically accountable for. Autonomous examination governance and accreditation evidence (PRD §12, §14, §35) require a reconstructable history, not just a current value.

**How enforced:** Table design for these domains includes an immutable event/version table from the start; destructive `UPDATE`/`DELETE` on these tables outside a documented correction workflow is a blocking review finding.

## 8. Configuration and rule versions carry effective dates; historical results must be reproducible

**What:** Grading schemes, regulation rules, fee structures, and similar configurable rules are stored with an effective-date range. Recomputing a past result must use the rule version that was effective when the original computation happened, not today's rule.

**Why:** Regulations and grading rules change across academic years; autonomous institutions must be able to show *why* a 2023 result came out the way it did under 2023's rules, even after the rules change (PRD §8 config-over-customization, §35 compliance).

**How enforced:** Schema review requires an effective-date column set on any table storing a configurable rule before it is considered complete.

## 9. High-risk actions require separation of duties, explicit authorization, reason, and audit

**What:** Actions such as result publication, fee waivers, grade overrides, or examination paper access require: (a) a distinct actor from the one who prepared the action where the domain calls for separation of duties (question setter ≠ moderator ≠ evaluator ≠ publisher, PRD principle 4), (b) an explicit authorization step, (c) a recorded reason, and (d) an audit trail entry.

**Why:** This is the mechanism that makes autonomous examination governance trustworthy to accreditation bodies and to the institution's own leadership.

**How enforced:** The `audit` and `workflow` modules provide the primitives (approval chain, reason capture, audit event) that every high-risk action must be built on; a high-risk action implemented without going through them is a blocking review finding.

## 10. Sensitive files use object-storage references; binary data is not stored in PostgreSQL

**What:** Documents, photos, question papers, scanned certificates, and similar binary content are stored in object storage (S3-compatible); the database holds a reference (key, checksum, metadata), never a `bytea` blob of file content.

**Why:** Storing binaries in Postgres bloats backups, slows replication, and complicates the encryption-at-rest and access-control model object storage handles natively.

**How enforced:** The `documents` module is the only place binary references are modeled; schema review rejects new `bytea`/large-object columns outside an explicitly justified exception.

## 11. Events are written through the transactional outbox; consumers are idempotent

**What:** A domain event is written to the outbox table in the same transaction as the state change it describes, then relayed asynchronously. Every consumer handles at-least-once delivery — reprocessing the same event must be a no-op, not a double effect.

**Why:** Without an outbox, "commit the change" and "publish the event" can diverge (commit succeeds, publish fails, or vice versa), producing silent data/event inconsistency that is extremely hard to detect after the fact.

**How enforced:** The `integration-outbox` module is the only sanctioned path to publish a domain event; direct message-broker publication from a request-handling transaction is a blocking review finding. Idempotency (via event ID dedup) is required in every consumer's design.

## 12. APIs use validation, stable error codes, correlation IDs, pagination, and optimistic locking where needed

**What:** Every public endpoint validates input, returns RFC 7807 Problem Details with a stable `type`/error code on failure, propagates/generates a correlation ID, paginates list endpoints, and uses optimistic locking (a version column + `If-Match`/version check) on updatable resources that can be concurrently edited.

**Why:** These are the baseline guarantees every client (web, Android, iOS, future integrators) is written against; skipping one turns into an inconsistent, hard-to-debug API surface as modules multiply.

**How enforced:** The `platform-core` module provides the shared Problem Details / correlation-id / pagination building blocks; new endpoints are reviewed against this list before merge.

## 13. No fake integrations, silent success, placeholder production logic, or TODO paths presented as complete

**What:** Code that is not yet implemented says so — explicitly (a documented "not yet implemented" status, a clearly labeled stub interface, a failing/pending test) — and is never presented, described, or reported as done. A stub is acceptable as *scaffolding*; a stub disguised as a working feature is not acceptable at any stage.

**Why:** This governs every status report this platform's engineering produces, including automation-generated ones. A false "done" is worse than an honest "not built yet" because it hides risk instead of surfacing it.

**How enforced:** Every foundation/stub interface in this codebase is annotated as such in its own doc comment and in the relevant status document (e.g. `docs/mobile/ROLE_FEATURE_MATRIX.md`); PR/report templates require an explicit "known limitations" section.

## 14. AI is assistive; consequential academic decisions require authorized human approval

**What:** AI may draft content, flag risk, summarize, or suggest — it may not autonomously finalize a grade, result, disciplinary action, or other consequential academic decision. A human with the authority to make that decision must explicitly approve it.

**Why:** PRD principle 8 ("human-approved AI") and out-of-scope item on AI-only evaluation of high-stakes subjective exams (PRD §4.3) both require this as a product boundary, not just a UX preference.

**How enforced:** Any AI-assisted feature in the `workflow`/academic domains must route its output through an explicit human-approval step modeled in the `workflow` module before it takes effect.

## 15. Responsive web + native Android/iOS + accessibility + localization + offline-aware mobile + observability + testability are first-class

**What:** These are design constraints from the first commit of a feature, not a later pass. A feature is not "done" if it only works on desktop web, ignores screen readers, hardcodes English strings, assumes constant connectivity on mobile, can't be traced in logs, or has no test.

**Why:** PRD principles 1–5 and the mobile-first self-service goal mean these are core product requirements for every role, not a hardening phase.

**How enforced:** Feature review checklist includes each dimension explicitly; a feature missing one is incomplete, not "done with follow-ups."

## 16. Secrets never enter source code, examples, test snapshots, or logs

**What:** No credential, API key, connection string with a password, or signing key is committed — including in `.env.example` files (which contain only placeholder values), fixtures, test snapshots, or log output (structured logs must redact known-sensitive fields).

**Why:** A secret committed once is compromised forever, even if removed in a later commit — git history retains it and it must be rotated, not just deleted.

**How enforced:** CI runs secret scanning on every push/PR (see `.github/workflows/`); a hit blocks merge.

## 17. No institution-specific code forks

**What:** Institution-to-institution variation is expressed through configuration, feature flags, or well-defined extension points — never a copied-and-modified module or a `if (institutionId == X)` branch in core logic.

**Why:** PRD principle 2 ("configuration over customization") and business goal of reducing implementation time depend on one codebase serving every customer; forks make every future fix and audit N times more expensive.

**How enforced:** Code review rejects institution-identifier conditionals in domain logic; the `workflow` module's configuration/rule-versioning primitives are the sanctioned mechanism for variation.

## 18. Avoid premature microservices; preserve strict module boundaries

**What:** Core transactional domains live in one deployable modular monolith (`backend/app` composing the domain modules). A separate deployable service is introduced only for a workload that genuinely needs independent scaling or isolation (see `workers/`) — not by default, and not speculatively.

**Why:** Splitting services before there's a genuine scaling/isolation need multiplies operational cost (deployment, versioning, network failure modes) without a corresponding benefit, and makes transactional consistency across the split much harder.

**How enforced:** ArchUnit enforces that domain modules do not depend on each other's internal packages or read each other's tables directly, so a future extraction — if ever needed — is a deployment change, not a rewrite. See `docs/architecture/MODULE_BOUNDARIES.md`.

## 19. Mobile navigation visibility is not authorization; mobile and web use the same backend security rules

**What:** Hiding a screen or button in the mobile nav is a UX convenience, never the enforcement mechanism. Every backend authorization rule applies identically regardless of which client (web, Android, iOS) calls the API.

**Why:** A native app can be decompiled/inspected far more easily than a web app's network calls can be hidden; "the button isn't shown" is not a security control.

**How enforced:** Authorization is implemented once, server-side, in the domain modules; client-side role-based navigation is documented as UX-only in `docs/mobile/ROLE_FEATURE_MATRIX.md`.

## 20. Confidential question papers, hidden tests, raw payment credentials, secrets, and prohibited student data are never stored in mobile offline caches

**What:** The mobile offline-sync/local-cache layer has an explicit allowlist of what may be cached (e.g., a student's own published timetable). Confidential exam content, hidden grading test cases, raw card/bank details, tokens/secrets beyond what secure storage protects, and any data category the institution has flagged as non-cacheable are excluded by policy, not by omission.

**Why:** A lost/stolen device with an unencrypted or over-broad offline cache is a direct confidentiality breach for exactly the content categories examination integrity depends on.

**How enforced:** The mobile offline-sync interface (see ADR-008) takes an explicit allowlist parameter per data type; anything not on the allowlist is refused by the interface itself, not left to caller discipline.

---

## How this document is used

- Every ADR in `docs/architecture/` must state which rule(s) above it upholds.
- Every module's `README.md` links back to the rules it is most responsible for enforcing.
- A pull request that knowingly violates a rule must say so explicitly and get an explicit exception recorded here (as a dated addendum) — silent violation is never acceptable, an *undocumented* exception is treated the same as a violation.

## Known, documented deviation

This constitution requires "current stable Spring Boot 3.x" per product direction. As of this writing, Spring Boot's 3.x line is out of open-source community support (final OSS patch: 3.5.16) and Spring Boot 4.x is the actively supported major version. This is a deliberate, explicit product-owner choice (see ADR-001 addendum), not an oversight — it is recorded here so it is never silently mistaken for "current" in the general sense. Upgrading to Spring Boot 4.x is out of scope for this foundation prompt and should be revisited before production go-live.
