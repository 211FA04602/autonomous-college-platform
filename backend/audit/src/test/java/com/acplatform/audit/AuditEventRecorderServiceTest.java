package com.acplatform.audit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.acplatform.audit.api.RecordAuditEventCommand;
import com.acplatform.platformcore.id.IdGenerator;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

class AuditEventRecorderServiceTest {

  @Test
  void recordsAnAuditLogEntryBuiltFromTheCommand() {
    AuditLogRepository repository = mock(AuditLogRepository.class);
    IdGenerator idGenerator = mock(IdGenerator.class);
    UUID id = UUID.randomUUID();
    when(idGenerator.newId()).thenReturn(id);
    when(repository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

    AuditEventRecorderService service = new AuditEventRecorderService(repository, idGenerator);
    RecordAuditEventCommand command =
        new RecordAuditEventCommand(
            "user:jane.doe", "RESULT_PUBLISHED", "ExamResult", "result-42", "regular cycle", null);

    UUID returned = service.record(command);

    assertThat(returned).isEqualTo(id);
    ArgumentCaptor<AuditLog> captor = ArgumentCaptor.forClass(AuditLog.class);
    verify(repository).save(captor.capture());
    AuditLog saved = captor.getValue();
    assertThat(saved.getId()).isEqualTo(id);
    assertThat(saved.getActorReference()).isEqualTo("user:jane.doe");
    assertThat(saved.getAction()).isEqualTo("RESULT_PUBLISHED");
    assertThat(saved.getTargetType()).isEqualTo("ExamResult");
    assertThat(saved.getTargetId()).isEqualTo("result-42");
    assertThat(saved.getReason()).isEqualTo("regular cycle");
    assertThat(saved.getOccurredAt()).isNotNull();
  }

  @Test
  void rejectsMissingActor() {
    AuditLogRepository repository = mock(AuditLogRepository.class);
    IdGenerator idGenerator = mock(IdGenerator.class);
    AuditEventRecorderService service = new AuditEventRecorderService(repository, idGenerator);

    assertThatThrownBy(
            () ->
                service.record(new RecordAuditEventCommand(null, "ACTION", null, null, null, null)))
        .isInstanceOf(NullPointerException.class);
  }
}
