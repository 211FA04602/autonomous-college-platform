# ADR-003: PostgreSQL + Flyway for schema management

**Status:** Accepted
**Date:** 2026-09-05
**Upholds constitution rules:** 6, 7, 8, 10

## Context

The product needs an ACID-transactional store for academic, examination, financial, and audit data with strong consistency guarantees, mature JSON support (for flexible configuration/rule payloads), and a clear path to a managed, highly-available AWS-native service.

## Decision

- **Database:** PostgreSQL 17-compatible SQL, targeting **Amazon Aurora PostgreSQL** in production; local development and CI use vanilla PostgreSQL 17 (via Docker Compose / Testcontainers) so SQL stays portable and doesn't accidentally depend on Aurora-specific extensions.
- **Migrations:** Flyway, forward-only. Every schema change is a new `V{n}__description.sql`; an applied migration is never edited (constitution rule 6). `flyway validate` runs in CI.
- **No destructive mutation of official records:** academic, examination, result, financial, and audit tables are modeled with correction/reversal/versioning from their first migration (constitution rule 7) — an `UPDATE`/`DELETE` that erases prior state on these tables is a review-blocking finding, not a style preference.
- **Configuration/rule versioning:** tables storing configurable rules (grading schemes, regulation parameters, fee structures) include an effective-date range from their first migration (constitution rule 8), so historical computations can be reproduced against the rule version that was actually effective at the time.
- **No binary data in PostgreSQL:** documents, question papers, and other files are referenced by object-storage key/checksum (`documents` module), never stored as `bytea` (constitution rule 10).
- **Driver/tooling:** standard `org.postgresql:postgresql` JDBC driver; Flyway's community edition (`flyway-core` + `flyway-database-postgresql`) — versions pinned in `backend/gradle/libs.versions.toml` and bumped deliberately, not silently, since Flyway's PostgreSQL 17/18 compatibility matrix has shifted across its major versions.

## Consequences

- Local/CI Postgres and production Aurora Postgres can diverge in operational characteristics (replication lag behavior, some extension availability); this is accepted because it keeps schema/SQL fully portable and testable without AWS credentials in CI.
- Every module that introduces a table in the categories covered by rules 7–8 must design its version/correction model *before* the first migration ships for that table, not retrofit it later — retrofitting immutability onto a live mutable table is materially harder than starting with it.
