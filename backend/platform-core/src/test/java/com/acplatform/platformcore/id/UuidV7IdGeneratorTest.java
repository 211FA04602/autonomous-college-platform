package com.acplatform.platformcore.id;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class UuidV7IdGeneratorTest {

  private final UuidV7IdGenerator generator = new UuidV7IdGenerator();

  @Test
  void generatesVersion7Uuids() {
    UUID id = generator.newId();

    assertThat(id.version()).isEqualTo(7);
  }

  @Test
  void generatesUniqueIds() {
    Set<UUID> ids = new HashSet<>();
    for (int i = 0; i < 10_000; i++) {
      ids.add(generator.newId());
    }

    assertThat(ids).hasSize(10_000);
  }

  @Test
  void generatesTimeOrderedIds() {
    UUID first = generator.newId();
    UUID second = generator.newId();

    // UUIDv7 layout: the top 48 bits of the MSB long are a millisecond Unix
    // timestamp, so successively generated values never have a decreasing
    // timestamp component (constitution/ADR-002: time-ordered for B-tree locality).
    assertThat(timestampComponent(first)).isLessThanOrEqualTo(timestampComponent(second));
  }

  private static long timestampComponent(UUID id) {
    return id.getMostSignificantBits() >>> 16;
  }
}
