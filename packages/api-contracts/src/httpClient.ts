import { generateCorrelationId } from "@acplatform/shared-utils";

export interface ApiClientConfig {
  /** e.g. https://api.dev.acplatform.example/v1 — includes the version segment. */
  baseUrl: string;
  /** Optional bearer token supplier; absent until identity-access ships (Prompt 01+). */
  getAccessToken?: () => Promise<string | null>;
  timeoutMs?: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly correlationId: string | undefined,
    public readonly problem: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Minimal typed fetch wrapper shared by web and mobile. This is the ONLY
 * place either client is allowed to call `fetch` directly — feature code
 * must go through a generated/typed function built on top of this (see
 * `systemHealth.ts`), never call `fetch` ad hoc (rule 12: consistent
 * validation, error codes, correlation IDs).
 */
export async function apiFetch<T>(
  config: ApiClientConfig,
  path: string,
  schema: { parse: (input: unknown) => T },
  init?: RequestInit,
): Promise<T> {
  const correlationId = generateCorrelationId();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs ?? 8000);

  try {
    const token = (await config.getAccessToken?.()) ?? null;
    const response = await fetch(`${config.baseUrl}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "X-Correlation-Id": correlationId,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
    });

    const body = await response.json().catch(() => undefined);

    if (!response.ok) {
      throw new ApiError(
        `Request to ${path} failed with status ${response.status}`,
        response.status,
        response.headers.get("X-Correlation-Id") ?? correlationId,
        body,
      );
    }

    return schema.parse(body);
  } finally {
    clearTimeout(timeout);
  }
}
