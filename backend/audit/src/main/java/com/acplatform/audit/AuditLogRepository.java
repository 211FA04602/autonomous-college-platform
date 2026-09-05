package com.acplatform.audit;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Internal repository — not exported from this module. Other modules record audit events only
 * through {@link com.acplatform.audit.api.AuditEventRecorder}, never this repository directly.
 */
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {}
