import { useTranslation } from "react-i18next";

import "./states.css";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  /** Omit to render an error with no retry action (e.g. a non-retryable
   * failure). */
  onRetry?: () => void;
}

/** Accessible error state. `role="alert"` so assistive tech announces it
 * immediately, matching its urgency relative to loading/empty states. */
export function ErrorState({ title, message, retryLabel, onRetry }: ErrorStateProps) {
  const { t } = useTranslation("common");

  return (
    <div className="state state-error" role="alert">
      <h2>{title ?? t("state.error.title")}</h2>
      {message ? <p>{message}</p> : null}
      {onRetry ? (
        <button type="button" className="state-retry-button" onClick={onRetry}>
          {retryLabel ?? t("state.error.retry")}
        </button>
      ) : null}
    </div>
  );
}
