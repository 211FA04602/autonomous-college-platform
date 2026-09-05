package com.acplatform.platformcore.id;

import java.util.UUID;

/**
 * Single sanctioned way to mint entity primary keys across every module.
 *
 * <p>Per ADR-002, all entity primary keys in this platform are UUIDv7 (time-ordered), not random
 * UUIDv4 or an integer sequence. Callers must never invoke a UUID library directly — always go
 * through this interface so the generation strategy stays consistent and swappable in one place.
 */
public interface IdGenerator {

  /** Generates a new, globally unique, time-ordered (UUIDv7) identifier. */
  UUID newId();
}
