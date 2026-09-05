import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { EmptyState } from "../components/states/EmptyState";

/** Catch-all route target, built on the shared EmptyState primitive. */
export function NotFoundPage() {
  const { t } = useTranslation("app");

  return (
    <EmptyState title={t("notFound.title")} body={t("notFound.body")}>
      <Link to="/">{t("notFound.homeLink")}</Link>
    </EmptyState>
  );
}
