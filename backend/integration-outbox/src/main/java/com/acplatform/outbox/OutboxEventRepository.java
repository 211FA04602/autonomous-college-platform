package com.acplatform.outbox;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Internal repository — not exported from this module. Other modules append events only through
 * {@link com.acplatform.outbox.api.OutboxWriter}, never this repository directly.
 */
public interface OutboxEventRepository extends JpaRepository<OutboxEvent, UUID> {}
