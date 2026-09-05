package com.acplatform.platformcore.id;

import com.github.f4b6a3.uuid.UuidCreator;
import java.util.UUID;
import org.springframework.stereotype.Component;

/**
 * Default {@link IdGenerator}, backed by the {@code uuid-creator} library's time-ordered-epoch
 * generator (RFC 9562 UUIDv7): time-ordered like ULID, keeping B-tree index locality good for
 * insert-heavy tables, while remaining a native PostgreSQL {@code uuid} / {@code java.util.UUID}
 * value (ADR-002).
 */
@Component
public class UuidV7IdGenerator implements IdGenerator {

  @Override
  public UUID newId() {
    return UuidCreator.getTimeOrderedEpoch();
  }
}
