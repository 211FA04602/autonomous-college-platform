-- integration-outbox: transactional outbox table (ADR-004).
-- No tenant_id yet: entries reference aggregates owned by modules that are not
-- themselves tenant-scoped in this foundation prompt. Add tenant_id NOT NULL
-- (constitution rule 1) once tenancy-organization ships and outbox-writing
-- modules become tenant-owned.
CREATE TABLE outbox_event (
    id UUID PRIMARY KEY,
    aggregate_type VARCHAR(255) NOT NULL,
    aggregate_id VARCHAR(255) NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    payload JSONB,
    created_at TIMESTAMPTZ NOT NULL,
    published_at TIMESTAMPTZ NULL
);

CREATE INDEX idx_outbox_event_unpublished
    ON outbox_event (created_at)
    WHERE published_at IS NULL;

COMMENT ON TABLE outbox_event IS
    'Transactional outbox (ADR-004). Rows are written in the same transaction as the '
    'state change they describe. No relay/consumer is implemented yet -- publication '
    'to a real message transport is deferred until the first real consumer needs it. '
    'See integration-outbox/README.md.';
