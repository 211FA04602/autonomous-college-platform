# tenancy-organization

**Status: not implemented.** This module is an intentionally empty, compiling skeleton
in this foundation prompt — package-info, one placeholder marker class, and this
README. Do not treat anything in this module as a working feature.

## Why it exists now

The module graph and its ArchUnit boundary tests need every module present to be
complete and testable, even before its real domain model ships
(docs/architecture/MODULE_BOUNDARIES.md).

## Deferred to a later prompt

Education group / institution / campus / school-faculty / department / center /
administrative-unit hierarchy; institution codes, regulatory affiliations, addresses,
branding, domains; academic terminology configuration; statutory/accreditation
identifiers (PRD §6.1, FR-ORG-001 through FR-ORG-005). This is also where the
`tenant_id` discriminator and Row-Level Security policies described in ADR-002 will be
introduced for every existing and future tenant-owned table.

## Rules this module will be most responsible for upholding, once built

Constitution rules 1, 2, 3 (tenant isolation, resolution, and RLS defense-in-depth).

## Explicitly out of scope right now

No tenant, institution, or campus table/entity exists. Do not add one without a
dedicated prompt/ADR for the tenancy-organization domain model — and do not add
`tenant_id` columns to other modules' tables until this module actually ships them.
