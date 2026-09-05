package com.acplatform.outbox.api;

import com.acplatform.platformcore.outbox.DomainEvent;

/**
 * The one sanctioned way for any module to publish a domain event (ADR-004, constitution rule 11).
 * Implementations must append the event row in the caller's existing transaction — never open a new
 * one and never publish to a message broker directly.
 */
public interface OutboxWriter {

  /**
   * Appends {@code event} to the outbox in the current transaction.
   *
   * @param event the domain event metadata (aggregate type/id, event type)
   * @param payloadJson the event payload, already serialized as JSON text
   * @throws IllegalStateException if called outside an active transaction
   */
  void append(DomainEvent event, String payloadJson);
}
