import { useTranslation } from "react-i18next";

import "./states.css";

export interface LoadingStateProps {
  /** Overrides the default translated loading message, e.g. for a
   * feature-specific "Checking system status…" copy. */
  label?: string;
}

/** Accessible loading indicator: `role="status"` + `aria-live="polite"` so
 * assistive tech announces the change without interrupting the user. */
export function LoadingState({ label }: LoadingStateProps) {
  const { t } = useTranslation("common");

  return (
    <div className="state state-loading" role="status" aria-live="polite">
      <span className="state-spinner" aria-hidden="true" />
      <p>{label ?? t("state.loading")}</p>
    </div>
  );
}
