-- audit: append-only audit trail (constitution rule 7 & 9).
-- No tenant_id yet: tenancy-organization has not shipped in this foundation prompt.
-- Add tenant_id NOT NULL (constitution rule 1) once it does.
CREATE TABLE audit_log (
    id UUID PRIMARY KEY,
    occurred_at TIMESTAMPTZ NOT NULL,
    -- Free-text reference for now; becomes a real FK to identity-access's
    -- user/membership table once that module ships.
    actor_reference VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    target_type VARCHAR(255),
    target_id VARCHAR(255),
    reason TEXT,
    metadata JSONB
);

CREATE INDEX idx_audit_log_occurred_at ON audit_log (occurred_at);
CREATE INDEX idx_audit_log_target ON audit_log (target_type, target_id);

COMMENT ON TABLE audit_log IS
    'Append-only audit trail (constitution rule 7): rows are never UPDATEd or DELETEd '
    'outside a documented correction workflow. No tenant_id column yet -- see '
    'audit/README.md.';
COMMENT ON COLUMN audit_log.actor_reference IS
    'Free-text actor identifier; becomes a real FK once identity-access ships.';
