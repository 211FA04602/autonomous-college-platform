import { systemHealthResponseSchema, type SystemHealthResponse } from "@acplatform/validation-schemas";
import { type ApiClientConfig, apiFetch } from "./httpClient";

/**
 * Contract for GET /v1/system/health — mirrors
 * backend/docs/api/openapi.yaml `SystemHealthResponse`. This is the one
 * vertical slice wired up in the foundation prompt; every other endpoint
 * is added alongside its owning backend module.
 */
export async function fetchSystemHealth(config: ApiClientConfig): Promise<SystemHealthResponse> {
  return apiFetch(config, "/system/health", systemHealthResponseSchema, { method: "GET" });
}
