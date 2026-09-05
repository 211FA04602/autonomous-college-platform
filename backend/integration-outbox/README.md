# integration-outbox

Transactional outbox for domain-event publication. Upholds constitution rule 11 and
ADR-004.

## What exists in this foundation prompt

- `outbox_event` table (Flyway migration `V1__create_outbox_event.sql`, location
  `classpath:db/migration/outbox`): `id` (UUIDv7), `aggregate_type`, `aggregate_id`,
  `event_type`, `payload` (jsonb), `created_at`, `published_at` (nullable — null means
  not yet relayed).
- `com.acplatform.outbox.api.OutboxWriter`: the one sanctioned way for any module to
  append a domain event. Its default implementation, `OutboxWriterService`, appends the
  row using `Propagation.MANDATORY` — calling `append(...)` outside an existing
  transaction throws rather than silently opening a new one, mechanically enforcing
  "same transaction as the state change" (ADR-004).
- `com.acplatform.platformcore.outbox.DomainEvent`: the shared-kernel contract every
  event must implement (`aggregateType()`, `aggregateId()`, `eventType()`).

## Explicitly NOT implemented here (deferred)

- **No relay process.** Nothing reads unpublished `outbox_event` rows and forwards them
  to a real message transport. `published_at` will simply stay `NULL` forever until a
  relay is built.
- **No message broker integration.** Transport choice (SNS/SQS/EventBridge, etc.) is
  deferred to when the first real consumer needs it, per ADR-004.
- **No consumer.** `notifications` is currently an empty skeleton module; it will be the
  first real consumer once it ships, and its design must include event-ID
  dedup/idempotency from day one (ADR-004 consequence).

Building any of the above now would be speculative infrastructure ahead of a genuine
consumer need (constitution rule 18) — this module intentionally stops at "a
transaction-safe place to record that something happened."

## Using this module

Any module that writes to a database table and wants to publish a corresponding event
does so in the exact same `@Transactional` method:

```java
outboxWriter.append(myDomainEvent, objectMapper.writeValueAsString(payload));
```

If this is called outside a transaction, it throws
`IllegalTransactionStateException` — that is the intended, mechanical safety net, not a
bug.
