import { useCallback, useEffect, useState } from "react";
import { nowUtcIso } from "@acplatform/shared-utils";
import type { SystemHealthResponse } from "@acplatform/validation-schemas";

import { getSystemHealth } from "../../api/client";

export type SystemHealthState =
  | { status: "loading" }
  | { status: "success"; data: SystemHealthResponse; checkedAtUtc: string }
  | { status: "error"; error: unknown };

export interface UseSystemHealthResult {
  state: SystemHealthState;
  /** Re-runs the health check. Safe to call from a retry button. */
  retry: () => void;
}

/**
 * Loading → success → error state machine over the API client boundary's
 * `getSystemHealth()`, with a manual retry — the one vertical slice
 * proving the whole chain (API contract → client boundary → UI state)
 * works end to end (ADR-005).
 */
export function useSystemHealth(): UseSystemHealthResult {
  const [state, setState] = useState<SystemHealthState>({ status: "loading" });

  const check = useCallback(() => {
    setState({ status: "loading" });
    getSystemHealth()
      .then((data) => {
        setState({ status: "success", data, checkedAtUtc: nowUtcIso() });
      })
      .catch((error: unknown) => {
        setState({ status: "error", error });
      });
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return { state, retry: check };
}
