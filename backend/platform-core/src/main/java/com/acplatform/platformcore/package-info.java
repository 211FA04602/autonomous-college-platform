/**
 * Shared kernel for the backend modular monolith.
 *
 * <p>Provides UUIDv7 identifier generation ({@link com.acplatform.platformcore.id}), the
 * correlation-id servlet filter and MDC context ({@link com.acplatform.platformcore.web}), the RFC
 * 7807 Problem Details exception advice ({@link com.acplatform.platformcore.error}), pagination
 * primitives ({@link com.acplatform.platformcore.pagination}), and the transactional-outbox domain
 * event contract ({@link com.acplatform.platformcore.outbox}).
 *
 * <p>Every other backend module may depend on this module in full — it is the one exception to the
 * "only the {@code .api} subpackage is a legal cross-module import target" rule (see
 * docs/architecture/MODULE_BOUNDARIES.md). This module itself must never depend on any other module
 * in this repository.
 */
package com.acplatform.platformcore;
