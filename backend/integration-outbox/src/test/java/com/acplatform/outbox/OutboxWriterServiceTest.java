package com.acplatform.outbox;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.acplatform.platformcore.id.IdGenerator;
import com.acplatform.platformcore.outbox.DomainEvent;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

class OutboxWriterServiceTest {

  private record TestEvent(String aggregateType, String aggregateId, String eventType)
      implements DomainEvent {}

  @Test
  void appendsAnOutboxRowBuiltFromTheDomainEvent() {
    OutboxEventRepository repository = mock(OutboxEventRepository.class);
    IdGenerator idGenerator = mock(IdGenerator.class);
    UUID id = UUID.randomUUID();
    when(idGenerator.newId()).thenReturn(id);
    when(repository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

    OutboxWriterService service = new OutboxWriterService(repository, idGenerator);
    DomainEvent event = new TestEvent("AuditLog", "agg-1", "AuditLog.Recorded");

    service.append(event, "{\"key\":\"value\"}");

    ArgumentCaptor<OutboxEvent> captor = ArgumentCaptor.forClass(OutboxEvent.class);
    verify(repository).save(captor.capture());
    OutboxEvent saved = captor.getValue();
    assertThat(saved.getId()).isEqualTo(id);
    assertThat(saved.getAggregateType()).isEqualTo("AuditLog");
    assertThat(saved.getAggregateId()).isEqualTo("agg-1");
    assertThat(saved.getEventType()).isEqualTo("AuditLog.Recorded");
    assertThat(saved.getPayload()).isEqualTo("{\"key\":\"value\"}");
    assertThat(saved.getCreatedAt()).isNotNull();
    assertThat(saved.getPublishedAt()).isNull();
  }

  @Test
  void rejectsNullEvent() {
    OutboxEventRepository repository = mock(OutboxEventRepository.class);
    IdGenerator idGenerator = mock(IdGenerator.class);
    OutboxWriterService service = new OutboxWriterService(repository, idGenerator);

    org.assertj.core.api.Assertions.assertThatThrownBy(() -> service.append(null, "{}"))
        .isInstanceOf(NullPointerException.class);
  }
}
