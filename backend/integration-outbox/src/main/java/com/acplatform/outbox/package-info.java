/**
 * Transactional outbox: the one sanctioned path for publishing a domain event (ADR-004,
 * constitution rule 11). Writing an {@link com.acplatform.outbox.OutboxEvent} row is required to
 * happen in the same database transaction as the state change it describes — {@link
 * com.acplatform.outbox.api.OutboxWriter#append} enforces this mechanically via {@code
 * Propagation.MANDATORY}.
 *
 * <p>Deferred (not built here): a relay process that reads unpublished rows and publishes them to a
 * real message transport, and any consumer. See README.md.
 */
package com.acplatform.outbox;
