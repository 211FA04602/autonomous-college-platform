# audit

Audit trail primitives for high-risk actions. Upholds constitution rules 7 and 9.

## What exists in this foundation prompt

- `audit_log` table (Flyway migration `V1__create_audit_log.sql`, location
  `classpath:db/migration/audit`): `id` (UUIDv7), `occurred_at`, `actor_reference`,
  `action`, `target_type`, `target_id`, `reason`, `metadata` (jsonb). Append-only —
  nothing in this module ever `UPDATE`s or `DELETE`s a row.
- `com.acplatform.audit.api.AuditEventRecorder`: the one sanctioned way for any module
  to record a high-risk action's audit trail entry (result publication, fee waiver,
  grade override, examination paper access, ...).

## Known, deliberate gaps (deferred, not oversights)

- **No `tenant_id` column.** `tenancy-organization` has not shipped in this foundation
  prompt, so there is no tenant to scope this table by yet. Constitution rule 1 requires
  `tenant_id NOT NULL` on every tenant-owned table — `audit_log` will get one, with a
  backfill migration, the moment `tenancy-organization` ships its first table. Until
  then this table is effectively single-tenant/global, which is acceptable only because
  no other tenant-owned data exists yet either.
- **`actor_reference` is free text, not a foreign key.** `identity-access` has not
  shipped, so there is no user/membership table to reference. This becomes a real FK
  once that module exists.
- **No Row-Level Security policy yet.** RLS is meaningless without a `tenant_id` column
  to scope by (ADR-002); it is added alongside the `tenant_id` migration above.

## Not built here

Approval-chain/workflow primitives (serial/parallel/quorum approvals) that would sit
*on top of* an audited high-risk action belong to the `workflow` module, which is an
empty skeleton in this foundation prompt — see `../workflow/README.md`.
