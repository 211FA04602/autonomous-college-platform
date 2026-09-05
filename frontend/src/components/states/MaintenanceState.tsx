import { useTranslation } from "react-i18next";

import "./states.css";

/** Accessible scheduled-maintenance state. */
export function MaintenanceState() {
  const { t } = useTranslation("common");

  return (
    <div className="state state-maintenance" role="status">
      <h2>{t("state.maintenance.title")}</h2>
      <p>{t("state.maintenance.body")}</p>
    </div>
  );
}
