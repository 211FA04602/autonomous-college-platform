package com.acplatform.outbox;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * A row awaiting (or already) relayed to the eventual message transport. Internal to this module —
 * other modules never read/write this table directly, only through {@link
 * com.acplatform.outbox.api.OutboxWriter}.
 */
@Entity
@Table(name = "outbox_event")
public class OutboxEvent {

  @Id private UUID id;

  @Column(name = "aggregate_type")
  private String aggregateType;

  @Column(name = "aggregate_id")
  private String aggregateId;

  @Column(name = "event_type")
  private String eventType;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(columnDefinition = "jsonb")
  private String payload;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @Column(name = "published_at")
  private Instant publishedAt;

  protected OutboxEvent() {
    // JPA
  }

  public OutboxEvent(
      UUID id,
      String aggregateType,
      String aggregateId,
      String eventType,
      String payload,
      Instant createdAt) {
    this.id = id;
    this.aggregateType = aggregateType;
    this.aggregateId = aggregateId;
    this.eventType = eventType;
    this.payload = payload;
    this.createdAt = createdAt;
  }

  public UUID getId() {
    return id;
  }

  public String getAggregateType() {
    return aggregateType;
  }

  public String getAggregateId() {
    return aggregateId;
  }

  public String getEventType() {
    return eventType;
  }

  public String getPayload() {
    return payload;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public Instant getPublishedAt() {
    return publishedAt;
  }
}
