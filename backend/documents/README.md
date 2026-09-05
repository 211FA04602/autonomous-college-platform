# documents

**Status: not implemented.** This module is an intentionally empty, compiling skeleton
in this foundation prompt — package-info, one placeholder marker class, and this
README. Do not treat anything in this module as a working feature.

## Deferred to a later prompt

An object-storage-reference model per ADR-003/constitution rule 10: this module will
be the *only* place binary references (S3-compatible object key, checksum, content
type, size, retention/legal-hold metadata) are modeled. Documents, photos, question
papers, and scanned certificates will be referenced here — never stored as `bytea` in
PostgreSQL, and never modeled as binary columns in any other module's tables.

## Rules this module will be most responsible for upholding, once built

Constitution rule 10 (object-storage references, not binary blobs in Postgres) and
rule 6 (forward-only Flyway migrations) once its reference table ships.

## Explicitly out of scope right now

No document/object-reference table/entity exists. No object-storage client, bucket
configuration, or upload/download endpoint is wired up.
