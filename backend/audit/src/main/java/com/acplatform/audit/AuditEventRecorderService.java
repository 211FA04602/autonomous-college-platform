package com.acplatform.audit;

import com.acplatform.audit.api.AuditEventRecorder;
import com.acplatform.audit.api.RecordAuditEventCommand;
import com.acplatform.platformcore.id.IdGenerator;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Default {@link AuditEventRecorder}. */
@Service
public class AuditEventRecorderService implements AuditEventRecorder {

  private final AuditLogRepository repository;
  private final IdGenerator idGenerator;

  public AuditEventRecorderService(AuditLogRepository repository, IdGenerator idGenerator) {
    this.repository = repository;
    this.idGenerator = idGenerator;
  }

  @Override
  @Transactional
  public UUID record(RecordAuditEventCommand command) {
    Objects.requireNonNull(command, "command must not be null");
    Objects.requireNonNull(command.actorReference(), "actorReference must not be null");
    Objects.requireNonNull(command.action(), "action must not be null");

    UUID id = idGenerator.newId();
    AuditLog entity =
        new AuditLog(
            id,
            Instant.now(),
            command.actorReference(),
            command.action(),
            command.targetType(),
            command.targetId(),
            command.reason(),
            command.metadataJson());
    repository.save(entity);
    return id;
  }
}
