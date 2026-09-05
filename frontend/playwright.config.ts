import { defineConfig, devices } from "@playwright/test";

/**
 * Minimal Playwright config for the health-slice e2e smoke test.
 *
 * `npm run test:e2e` expects the Vite dev server on http://localhost:5173
 * (started automatically via `webServer` below). For a *complete* pass —
 * a healthy card, not just a deterministic non-crashing state — the
 * backend also needs to be running on http://localhost:8080. See
 * `e2e/health.spec.ts` for what is and isn't asserted without the backend.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
