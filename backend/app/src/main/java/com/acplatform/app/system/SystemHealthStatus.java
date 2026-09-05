package com.acplatform.app.system;

/**
 * Tri-state system health, matching the {@code healthStatusSchema} enum in {@code
 * packages/validation-schemas/src/index.ts}.
 *
 * <p>{@code UP} and {@code DEGRADED} are both success-shape responses (HTTP 200, {@link
 * SystemHealthResponse} body) — {@code DEGRADED} means the system is usable but a non-critical
 * dependency is impaired. Only {@code DOWN} is a failure response (HTTP 503, RFC 7807 Problem
 * Details body). This mapping is a deliberate interpretation of the foundation prompt's "on
 * failure/degraded, return Problem Details (503 for DOWN)" instruction, chosen because {@code
 * DEGRADED} is defined as a member of the *success*-shape schema on the frontend, not the Problem
 * Details schema.
 */
public enum SystemHealthStatus {
  UP,
  DEGRADED,
  DOWN
}
