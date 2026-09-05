package com.acplatform.platformcore.outbox;

/**
 * Contract every domain event published through the transactional outbox must satisfy (ADR-004,
 * constitution rule 11). This is a shared-kernel contract only — the outbox table, writer, and
 * (future) relay live in the {@code integration-outbox} module. No module may publish a domain
 * event by any other path.
 */
public interface DomainEvent {

  /** Type of the aggregate this event describes, e.g. {@code "AuditLog"}. */
  String aggregateType();

  /** Identifier of the specific aggregate instance the event describes. */
  String aggregateId();

  /** Event type/name, e.g. {@code "AuditLog.Recorded"}. */
  String eventType();
}
