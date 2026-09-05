package com.acplatform.audit.api;

import java.util.UUID;

/**
 * The one sanctioned way for any module to record a high-risk action's audit trail entry
 * (constitution rule 9). Every result publication, fee waiver, grade override, examination paper
 * access, etc. elsewhere in the platform must go through this interface rather than writing its own
 * ad hoc log row.
 */
public interface AuditEventRecorder {

  /**
   * Records a new, immutable audit event.
   *
   * @return the generated audit event id (UUIDv7)
   */
  UUID record(RecordAuditEventCommand command);
}
