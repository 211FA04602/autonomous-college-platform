package com.acplatform.app.system;

/**
 * Success-shape response body for {@code GET /v1/system/health}. Field names and shape mirror
 * {@code packages/validation-schemas/src/index.ts} ({@code systemHealthResponseSchema}) and {@code
 * packages/api-contracts/src/systemHealth.ts} exactly — do not rename a field here without updating
 * both.
 */
public record SystemHealthResponse(String status, String version, String timestampUtc) {}
