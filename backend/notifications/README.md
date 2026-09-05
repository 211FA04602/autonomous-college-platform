# notifications

**Status: not implemented.** This module is an intentionally empty, compiling skeleton
in this foundation prompt — package-info, one placeholder marker class, and this
README. Do not treat anything in this module as a working feature.

## Why it already depends on integration-outbox

Per docs/architecture/MODULE_BOUNDARIES.md, `notifications` is the one module (besides
`app`) allowed to depend on `integration-outbox` directly, because it will be the first
real outbox consumer once it ships. The Gradle dependency edge is declared now so the
module graph is complete and testable (ArchUnit's no-cycles rule), even though no code
here reads an outbox row yet.

## Deferred to a later prompt

Notification templates, delivery channels (app/push/email/SMS/approved messaging
providers), consent/opt-out, quiet hours, delivery receipts, and — critically — the
outbox relay/consumer itself, which does not exist anywhere in this repository yet
(see `../integration-outbox/README.md`). When it is built, it must be idempotent from
day one: reprocessing the same outbox event must be a no-op (ADR-004 consequence).

## Rules this module will be most responsible for upholding, once built

Constitution rule 11 (idempotent outbox consumption).

## Explicitly out of scope right now

No notification template/delivery table/entity exists. No message-broker client, push
provider, or email/SMS integration is wired up.
