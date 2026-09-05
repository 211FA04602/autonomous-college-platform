import { useTranslation } from "react-i18next";

import "./states.css";

/** Accessible "you don't have access" state. This is a UX presentation
 * only — it must never be the thing that decides access; the backend is
 * the sole authorization boundary (constitution rule 19). */
export function UnauthorizedState() {
  const { t } = useTranslation("common");

  return (
    <div className="state state-unauthorized" role="alert">
      <h2>{t("state.unauthorized.title")}</h2>
      <p>{t("state.unauthorized.body")}</p>
    </div>
  );
}
