import { expect, test } from "@playwright/test";

/**
 * Smoke test for the one vertical slice this foundation ships.
 *
 * IMPORTANT — what this test does and doesn't prove:
 *   - It requires the web dev server (`npm run dev`, port 5173) to be
 *     running; Playwright's `webServer` config starts it automatically.
 *   - It does NOT require the backend (port 8080) to pass. If the
 *     backend is absent or returns an error, `useSystemHealth` reaches a
 *     deterministic `ErrorState` (role="alert"); if the backend is up,
 *     it reaches the healthy card. Either is an acceptable, valid
 *     end-state for this test — the point is that the page renders the
 *     app shell and resolves out of the loading state, not that the
 *     backend happens to be reachable in whatever environment runs it.
 *   - Running this fully against a live backend (both processes up) is
 *     the complete check; that combination was NOT exercised as part of
 *     building this foundation slice (see frontend/README.md "Known
 *     limitations").
 */
test("renders the app shell and resolves to a healthy or error state", async ({ page }) => {
  await page.goto("/");

  // The shell landmarks are always present regardless of backend state.
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();

  // Wait for the loading state to resolve to one of the two deterministic
  // end states, whichever the environment produces.
  const healthy = page.getByRole("heading", { name: /system status/i });
  const error = page.getByRole("alert");

  await expect(healthy.or(error)).toBeVisible({ timeout: 15_000 });
});

test("shows a not-found state for an unknown route", async ({ page }) => {
  await page.goto("/this-route-does-not-exist");

  await expect(page.getByRole("heading", { name: /page not found/i })).toBeVisible();
});
