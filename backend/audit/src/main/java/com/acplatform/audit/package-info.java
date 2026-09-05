/**
 * Audit trail primitives for high-risk actions (constitution rule 9: separation of duties, explicit
 * authorization, reason, and audit). Every high-risk action elsewhere in the platform (result
 * publication, fee waivers, grade overrides, ...) must record an entry here through {@link
 * com.acplatform.audit.api.AuditEventRecorder}.
 *
 * <p>{@code audit_log} rows are append-only: this module never updates or deletes a row once
 * written (constitution rule 7).
 */
package com.acplatform.audit;
