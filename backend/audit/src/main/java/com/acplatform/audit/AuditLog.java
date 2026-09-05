package com.acplatform.audit;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * A single immutable audit event. Internal to this module — other modules never read or write this
 * entity directly, only through {@link com.acplatform.audit.api.AuditEventRecorder}.
 *
 * <p>{@code actorReference} is a free-text identifier (not a foreign key) because {@code
 * identity-access} has not shipped yet in this foundation prompt; it becomes a real foreign key to
 * that module's user/membership table once it exists. There is deliberately no {@code tenant_id}
 * column yet either, for the same reason (tenancy-organization has not shipped) — see the module
 * README.
 */
@Entity
@Table(name = "audit_log")
public class AuditLog {

  @Id private UUID id;

  @Column(name = "occurred_at", nullable = false)
  private Instant occurredAt;

  @Column(name = "actor_reference", nullable = false)
  private String actorReference;

  @Column(nullable = false)
  private String action;

  @Column(name = "target_type")
  private String targetType;

  @Column(name = "target_id")
  private String targetId;

  @Column(columnDefinition = "text")
  private String reason;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(columnDefinition = "jsonb")
  private String metadata;

  protected AuditLog() {
    // JPA
  }

  public AuditLog(
      UUID id,
      Instant occurredAt,
      String actorReference,
      String action,
      String targetType,
      String targetId,
      String reason,
      String metadata) {
    this.id = id;
    this.occurredAt = occurredAt;
    this.actorReference = actorReference;
    this.action = action;
    this.targetType = targetType;
    this.targetId = targetId;
    this.reason = reason;
    this.metadata = metadata;
  }

  public UUID getId() {
    return id;
  }

  public Instant getOccurredAt() {
    return occurredAt;
  }

  public String getActorReference() {
    return actorReference;
  }

  public String getAction() {
    return action;
  }

  public String getTargetType() {
    return targetType;
  }

  public String getTargetId() {
    return targetId;
  }

  public String getReason() {
    return reason;
  }

  public String getMetadata() {
    return metadata;
  }
}
