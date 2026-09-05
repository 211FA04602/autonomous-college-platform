import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "./httpClient";
import { fetchSystemHealth } from "./systemHealth";

const baseConfig = { baseUrl: "https://api.test.local/v1" };

describe("fetchSystemHealth", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("parses a healthy response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({ status: "UP", version: "0.1.0", timestampUtc: "2026-01-01T00:00:00.000Z" }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );

    const result = await fetchSystemHealth(baseConfig);
    expect(result.status).toBe("UP");
  });

  it("throws ApiError on a non-2xx response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ type: "about:blank", title: "Service Unavailable", status: 503 }), {
          status: 503,
        }),
      ),
    );

    await expect(fetchSystemHealth(baseConfig)).rejects.toBeInstanceOf(ApiError);
  });
});
