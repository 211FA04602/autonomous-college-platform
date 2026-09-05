/**
 * The ONLY module allowed to configure/call `@acplatform/api-contracts`.
 * Feature code must never call `fetch` directly or import
 * `@acplatform/api-contracts` on its own (ADR-005, constitution rule 12) —
 * everything goes through the typed functions exported from this file so
 * correlation IDs, RFC 7807 error shape, and (later) auth-token attachment
 * stay consistent across the whole app.
 */
import { ApiError, fetchSystemHealth, type ApiClientConfig } from "@acplatform/api-contracts";
import type { SystemHealthResponse } from "@acplatform/validation-schemas";

const DEFAULT_BASE_URL = "http://localhost:8080/v1";

function resolveBaseUrl(): string {
  const configured = import.meta.env.VITE_API_BASE_URL;
  return configured && configured.length > 0 ? configured : DEFAULT_BASE_URL;
}

/**
 * Shared client config. `getAccessToken` is intentionally omitted until
 * identity-access ships — no Authorization header is sent yet (see
 * `src/auth/AuthContext.tsx`, which is honest about being unwired).
 */
const apiClientConfig: ApiClientConfig = {
  baseUrl: resolveBaseUrl(),
};

export async function getSystemHealth(): Promise<SystemHealthResponse> {
  return fetchSystemHealth(apiClientConfig);
}

export { ApiError };
