# ADR-004: Transactional outbox for domain-event publication

**Status:** Accepted
**Date:** 2026-09-05
**Upholds constitution rules:** 11, 18

## Context

Cross-module and cross-service communication (e.g., "result published" notifying the `notifications` module, or a future worker) must not silently desynchronize from the transaction that produced it. Publishing directly to a message broker inside a request transaction risks "commit succeeded, publish failed" or the reverse.

## Decision

Domain events are written to an **outbox table** in the same database transaction as the state change they describe, owned by the `integration-outbox` module. A separate relay process reads unpublished outbox rows and publishes them to the eventual message transport (transport choice — e.g., SNS/SQS/EventBridge on AWS — is deferred to when the first real consumer needs it; the outbox contract does not depend on that choice). Publication is at-least-once: **every consumer must be idempotent**, deduplicating on the event's stable ID.

No module is permitted to publish a domain event by any other path (constitution rule 11); this keeps the "did the write commit and did the event get published" question answerable from one table.

## Consequences

- Slight latency between commit and downstream delivery (relay poll interval), acceptable for this product's workflows (none require sub-second cross-module propagation in the foundation scope).
- Every consumer's design must include a dedup/idempotency key check from day one — added later is a migration exercise across all existing consumers, so it is a checklist item at consumer-creation time, not an afterthought.
- Keeps modules loosely coupled (event contracts, not shared tables/internal calls) in support of ADR-001's module-boundary discipline.
