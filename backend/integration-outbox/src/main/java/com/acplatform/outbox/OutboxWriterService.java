package com.acplatform.outbox;

import com.acplatform.outbox.api.OutboxWriter;
import com.acplatform.platformcore.id.IdGenerator;
import com.acplatform.platformcore.outbox.DomainEvent;
import java.time.Instant;
import java.util.Objects;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Default {@link OutboxWriter}. {@code Propagation.MANDATORY} is a deliberate, mechanical
 * enforcement of ADR-004's "same transaction as the state change" rule: if a caller invokes {@link
 * #append} outside an existing transaction, Spring throws {@link
 * org.springframework.transaction.IllegalTransactionStateException} rather than silently opening a
 * new one and risking commit/publish divergence.
 */
@Service
public class OutboxWriterService implements OutboxWriter {

  private final OutboxEventRepository repository;
  private final IdGenerator idGenerator;

  public OutboxWriterService(OutboxEventRepository repository, IdGenerator idGenerator) {
    this.repository = repository;
    this.idGenerator = idGenerator;
  }

  @Override
  @Transactional(propagation = Propagation.MANDATORY)
  public void append(DomainEvent event, String payloadJson) {
    Objects.requireNonNull(event, "event must not be null");

    OutboxEvent row =
        new OutboxEvent(
            idGenerator.newId(),
            event.aggregateType(),
            event.aggregateId(),
            event.eventType(),
            payloadJson,
            Instant.now());
    repository.save(row);
  }
}
