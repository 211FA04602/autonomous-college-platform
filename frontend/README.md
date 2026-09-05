# frontend — Autonomous College Platform web client

The web frontend foundation for the Autonomous College Platform: an accessible,
localized, responsive React application shell plus the one vertical slice
(system health) that proves the whole chain — backend contract →
`@acplatform/api-contracts` → typed API client boundary → React state → UI —
works end to end. See `docs/architecture/ADR-005-react-web-architecture.md`
for the architectural decisions this implements, and
`docs/engineering/CONSTITUTION.md` for the non-negotiable rules it upholds
(especially rules 12, 13, 15, 16, 19).

This app is standalone and independent from "Institora" — nothing here
imports, copies, or depends on that product.

## Prerequisites

- Node.js **24.x** and npm **10.x** (see the repo root `package.json`
  `engines` field)
- Run all commands from the **repo root** so npm workspaces resolve the
  shared `@acplatform/*` packages correctly (`npm install` must be run at
  the repo root, not inside `frontend/`)
- Optional, for a fully-passing health check: the backend running locally
  on port 8080 (see `../backend`)

## Setup

```bash
# from the repo root
npm install
cp frontend/.env.example frontend/.env.local   # optional; default already matches
```

## Commands

Run these from the repo root via the workspace flag, or `cd frontend` and
drop `--workspace frontend`:

| Command                                          | What it does                                                                 |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `npm run dev --workspace frontend`                 | Starts the Vite dev server at `http://localhost:5173`                        |
| `npm run build --workspace frontend`               | Type-checks (`tsc -b`) and produces a production build in `frontend/dist`    |
| `npm run lint --workspace frontend`                | ESLint (flat config) over `.ts`/`.tsx` + Stylelint over `.css`                |
| `npm run typecheck --workspace frontend`           | `tsc -b --noEmit` across app, node-config, and scripts tsconfigs             |
| `npm run test --workspace frontend`                | Vitest component tests, once (`vitest run`)                                  |
| `npm run test:e2e --workspace frontend`            | Playwright e2e smoke test (see **End-to-end tests** below)                   |

Root-level convenience aliases already exist and call these same scripts:
`npm run web:dev`, `web:build`, `web:lint`, `web:typecheck`, `web:test`.

Other scripts: `npm run lint:fix`, `format` / `format:check` (Prettier),
`test:watch` (Vitest watch mode), `tokens:generate` (see below),
`preview` (serve the production build locally).

## Environment variables

Copy `.env.example` to `.env.local` (or `.env`) and adjust if needed:

| Variable              | Default                        | Meaning                                                   |
| ---------------------- | ------------------------------- | ---------------------------------------------------------- |
| `VITE_API_BASE_URL`    | `http://localhost:8080/v1`      | Backend base URL, including the `/v1` version segment      |

There are no other environment variables and no secrets — see
`.env.example`'s own comment (constitution rule 16).

## Architecture at a glance

- **`src/api/client.ts`** — the *only* module allowed to configure/call
  `@acplatform/api-contracts`. Feature code never calls `fetch` directly
  (an ESLint rule enforces this for the literal `fetch` global; see
  `eslint.config.js`).
- **`src/auth/AuthContext.tsx`, `src/auth/TenantContext.tsx`** — documented
  context shapes for identity-access and tenant resolution. **Not yet wired
  up, on purpose**: `status` is always `"unauthenticated"` /
  `"unresolved"`, `user`/`tenant` are always `null`, and `login()` /
  `logout()` / `requestTenantSwitch()` log a warning instead of silently
  doing nothing. This is intentional and documented in the files themselves
  per constitution rules 13 & 19 — nothing here fabricates a logged-in user,
  and no client-side check is ever a substitute for server-side
  authorization.
- **`src/components/states/`** — accessible, reusable `LoadingState`
  (`role="status"`), `EmptyState`, `ErrorState` (`role="alert"`, optional
  retry callback), `UnauthorizedState`, `MaintenanceState`, built on CSS
  custom properties generated from `@acplatform/design-tokens`.
- **`src/styles/tokens.css`** — **generated**, do not hand-edit. Run
  `npm run tokens:generate` to regenerate from
  `@acplatform/design-tokens` (also runs automatically before `dev` and
  `build` via `predev`/`prebuild`). See `scripts/generate-design-tokens.ts`.
- **`src/features/health/`** — `useSystemHealth()` (loading → success →
  error, with retry) and `HealthPage`, reachable at `/`. This is the
  foundation's one real vertical slice, not a stand-in for business
  functionality.
- **`src/i18n/`** — initializes `react-i18next` with
  `@acplatform/i18n-resources`' `common`/`systemHealth` namespaces plus a
  frontend-local `app` namespace for shell/navigation strings not yet
  promoted into the shared package. Every UI string goes through
  `useTranslation()` — nothing is hardcoded.
- **`src/app/AppShell.tsx`** — accessible shell: skip-to-content link,
  `<header>`/`<nav>`/`<main>` landmarks, visible focus states, responsive
  flex/grid layout (mobile/tablet/desktop, no fixed desktop-only widths).
- Routing (`react-router` v7): `/` → `HealthPage`; catch-all → `NotFoundPage`
  (built on `EmptyState`).

## Testing

- **Unit/component (Vitest + Testing Library)**: `npm run test --workspace frontend`.
  Covers `HealthPage` (loading/success/error+retry, mocking the API client
  boundary) and `ErrorState` (role, retry callback).
- **End-to-end (Playwright)**: `npm run test:e2e --workspace frontend`.
  `playwright.config.ts` starts the Vite dev server automatically. The
  smoke test in `e2e/health.spec.ts` asserts the shell landmarks render and
  the page resolves to *either* a healthy card or an `ErrorState` — it does
  **not** require the backend to be running to pass, by design (see the
  comment at the top of that file for exactly what it does and doesn't
  prove). Running it against a *live* backend (both dev servers up) is the
  complete check, and was not exercised while building this foundation —
  see **Known limitations**.

## Known limitations (constitution rule 13 — stated explicitly, not hidden)

- **Auth/tenant are placeholders.** No identity-access or tenant-resolution
  backend exists yet; the contexts always report "not authenticated" /
  "not resolved" (see above). This is intentional scaffolding, not a bug.
- **Playwright browser install / live e2e run**: whether this was actually
  executed (vs. only configured) for this delivery depends on whether the
  Playwright Chromium download completed in this environment — check the
  accompanying report for the exact outcome. If it did not complete, treat
  `test:e2e` as configured-but-unverified until someone runs
  `npx playwright install` (from `frontend/`) once with a working internet
  connection.
- **Only one backend endpoint exists** (`GET /system/health`); this is
  intentional per ADR-005 — the foundation ships the one real vertical
  slice, not speculative business screens.
- **No generated OpenAPI client yet** — `@acplatform/api-contracts` is
  hand-written to mirror the backend's OpenAPI document until codegen is
  wired up (tracked in that package's own description).

## Troubleshooting

- **`npm install` fails at the repo root with an ERESOLVE peer-dependency
  error mentioning `mobile`/`react-i18next`/`typescript@^5`**: this is a
  pre-existing peer-dependency conflict in `mobile/package.json`
  (`typescript@^6.0.3` vs. `react-i18next@^15.4.0`'s peer `typescript@^5`),
  unrelated to `frontend/` and out of this workspace's scope to fix. Until
  it's resolved upstream, install with
  `npm install --legacy-peer-deps` from the repo root.
- **Port 5173 already in use**: another Vite dev server is probably
  running; stop it, or pass `--port` to `npm run dev --workspace frontend -- --port 5174`.
- **`HealthPage` always shows `ErrorState`**: check the backend is running
  on `http://localhost:8080` and `VITE_API_BASE_URL` matches its actual
  address; open the browser devtools Network tab and check the
  `X-Correlation-Id` request header / response body for the RFC 7807
  Problem Details payload.
- **`tokens.css` looks stale after changing `packages/design-tokens`**: run
  `npm run tokens:generate --workspace frontend` (or just `npm run dev` /
  `build`, which do it automatically via `predev`/`prebuild`).
