import { NavLink, Outlet } from "react-router";
import { useTranslation } from "react-i18next";

import "./AppShell.css";

/**
 * Accessible application shell: skip-to-content link + header/nav/main
 * landmarks. Responsive via flex/grid (no fixed desktop-only widths) so it
 * works at mobile/tablet/desktop breakpoints (constitution rule 15,
 * ADR-005).
 */
export function AppShell() {
  const { t } = useTranslation("app");

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        {t("shell.skipToContent")}
      </a>
      <header className="app-header">
        <span className="app-title">{t("shell.appName")}</span>
        <nav className="app-nav" aria-label={t("shell.nav.ariaLabel")}>
          <ul>
            <li>
              <NavLink to="/" end>
                {t("shell.nav.home")}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main id="main-content" className="app-main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
}
