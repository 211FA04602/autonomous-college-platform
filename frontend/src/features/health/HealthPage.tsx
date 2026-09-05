import { useTranslation } from "react-i18next";
import { formatInstantForDisplay } from "@acplatform/shared-utils";

import { ApiError } from "../../api/client";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";
import { useSystemHealth } from "./useSystemHealth";

import "./HealthPage.css";

function statusLabelKey(status: "UP" | "DOWN" | "DEGRADED"): "health.status.up" | "health.status.down" | "health.status.degraded" {
  switch (status) {
    case "UP":
      return "health.status.up";
    case "DOWN":
      return "health.status.down";
    case "DEGRADED":
      return "health.status.degraded";
  }
}

function describeError(error: unknown, message: (key: string) => string): string {
  if (error instanceof ApiError) {
    const problem = error.problem as { detail?: string; title?: string } | undefined;
    return problem?.detail ?? problem?.title ?? message("health.status.unavailable");
  }
  return message("health.status.unavailable");
}

/**
 * The one vertical slice proving the whole chain (backend contract →
 * `@acplatform/api-contracts` → API client boundary → React state → UI)
 * works end to end. Reachable at `/`.
 */
export function HealthPage() {
  const { t: tHealth } = useTranslation("systemHealth");
  const { t: tApp } = useTranslation("app");
  const { state, retry } = useSystemHealth();

  if (state.status === "loading") {
    return <LoadingState label={tHealth("health.status.checking")} />;
  }

  if (state.status === "error") {
    return (
      <ErrorState
        message={describeError(state.error, (key) => tHealth(key))}
        onRetry={retry}
      />
    );
  }

  const { data, checkedAtUtc } = state;

  return (
    <div className="health-card">
      <h1>{tHealth("health.title")}</h1>
      <span className="health-status-badge" data-status={data.status}>
        {tApp(statusLabelKey(data.status))}
      </span>
      <dl className="health-fields">
        <dt>{tApp("health.field.status")}</dt>
        <dd>{data.status}</dd>
        <dt>{tApp("health.field.version")}</dt>
        <dd>{data.version}</dd>
      </dl>
      <p>{tHealth("health.lastChecked", { time: formatInstantForDisplay(checkedAtUtc) })}</p>
    </div>
  );
}
