# workflow

**Status: not implemented.** This module is an intentionally empty, compiling skeleton
in this foundation prompt — package-info, one placeholder marker class, and this
README. Do not treat anything in this module as a working feature.

## Deferred to a later prompt

Approval-chain primitives (serial, parallel, quorum, delegation, escalation, digital
acknowledgement — FR-IAM-009), configuration/rule-versioning with effective-date
history (FR-WFL-002 through FR-WFL-007), form builder for institution-specific fields,
and the routing that high-risk actions elsewhere in the platform (result publication,
fee waivers, grade overrides) will use to satisfy separation-of-duties requirements.

This is deliberately *not* built ahead of a real business need per constitution rule 17
(no institution-specific forks — configuration/rule-versioning is the sanctioned
mechanism for variation, but it must be designed against real regulation/approval-chain
requirements, not speculatively).

## Rules this module will be most responsible for upholding, once built

Constitution rules 8 (effective-dated configuration), 9 (separation of duties,
authorization, reason, audit), 14 (human-approved AI), 17 (no institution-specific
forks).

## Explicitly out of scope right now

No approval-chain, workflow-instance, or rule-version table/entity exists. `audit`
(this repo's real, minimal module) provides the underlying audit-event primitive that
workflow will build on top of — see `../audit/README.md`.
