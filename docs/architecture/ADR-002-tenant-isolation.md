# ADR-002: Tenant isolation model and identifier strategy

**Status:** Accepted
**Date:** 2026-09-05
**Upholds constitution rules:** 1, 2, 3, 4

## Context

The platform must support a single institution, a multi-campus group, and SaaS multi-tenant deployment from the same codebase (PRD §4.1). Tenant leakage — one institution seeing another's students, results, or fees — is the single most damaging class of bug this architecture can produce, so isolation is designed in from the schema up, not bolted on.

## Decision

**Tenancy model:** shared schema, shared database, tenant discriminator column. Every tenant-owned table carries a non-null `tenant_id`, and — for multi-campus groups — an explicit `institution_id`/`campus_id` where the domain distinguishes them. A single shared schema (rather than schema-per-tenant or database-per-tenant) is chosen because it keeps migrations, connection pooling, and cross-tenant platform analytics tractable at the scale this product targets (many colleges, not many thousands of micro-tenants); this can be revisited per ADR if a specific tenant ever needs physical isolation for contractual reasons.

**Tenant resolution:** resolved server-side from the authenticated principal's verified membership/role assignment (`identity-access` + `tenancy-organization` modules), never from a client-supplied header, query parameter, or body field (constitution rule 2).

**Defense in depth:** PostgreSQL Row-Level Security policies are applied to tenant-owned tables (enabled when the `tenancy-organization` module ships its first tables), scoped to the resolved tenant for the duration of the request/transaction. This is in addition to, not instead of, explicit `tenant_id` predicates at the application/repository layer (constitution rule 3). Repositories over tenant-owned entities expose no unscoped "find all" method (constitution rule 4).

**Identifier strategy:** **UUIDv7** for all entity primary keys, chosen over UUIDv4 and over ULID:

- Time-ordered like ULID, which keeps B-tree index locality good for insert-heavy tables (unlike UUIDv4's random ordering).
- Native PostgreSQL `uuid` column type and standard `java.util.UUID` — no bespoke string-based ID type to thread through JDBC/Hibernate/JSON serialization, unlike ULID's Crockford Base32 string form.
- Globally unique without coordination, safe to generate client-side (mobile offline-created records) or server-side.

Generation goes through a single shared utility in `platform-core` (backed by a UUIDv7 library) so every module produces IDs the same way.

## Consequences

- Every new tenant-owned table's migration review checks for `tenant_id NOT NULL` and, once available, an RLS policy — both are required, not either/or.
- UUIDv7 primary keys are 16 bytes / 36-char string form — slightly larger than a bigint, accepted in exchange for safe distributed/offline generation and no central sequence.
- RLS policies must be kept in sync with application-level scoping logic; drift between them is treated as a bug in whichever layer is behind, not a reason to drop either layer.
