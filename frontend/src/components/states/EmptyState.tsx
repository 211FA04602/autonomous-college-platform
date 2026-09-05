import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import "./states.css";

export interface EmptyStateProps {
  title?: string;
  body?: string;
  children?: ReactNode;
}

/** Accessible "nothing to show" state. Not an error, so `role="status"`
 * rather than `role="alert"`. */
export function EmptyState({ title, body, children }: EmptyStateProps) {
  const { t } = useTranslation("common");

  return (
    <div className="state state-empty" role="status">
      {title ? <h2>{title}</h2> : null}
      <p>{body ?? t("state.empty")}</p>
      {children}
    </div>
  );
}
