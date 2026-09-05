package com.acplatform.audit.api;

/**
 * Input to {@link AuditEventRecorder#record}. {@code metadataJson}, if provided, must already be
 * serialized JSON text.
 */
public record RecordAuditEventCommand(
    String actorReference,
    String action,
    String targetType,
    String targetId,
    String reason,
    String metadataJson) {}
