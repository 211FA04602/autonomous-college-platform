# Local developer runbook

This consolidates `backend/README.md`, `frontend/README.md`, and `mobile/README.md` into one place. Where they differ in detail, those module READMEs are authoritative.

## Prerequisites

| Tool | Version | Needed for |
|---|---|---|
| JDK | 21 (Temurin recommended) | backend |
| Node.js | 24.x | frontend, mobile, packages/* |
| npm | 10.x+ | all JS/TS workspaces (root `npm install`) |
| Docker | any recent version | local PostgreSQL, backend `integrationTest` |
| Android Studio + SDK | compileSdk 37 / targetSdk 36 | mobile Android build/run |
| Xcode + CocoaPods | current, **macOS only** | mobile iOS build/run |
| Watchman | recommended on macOS/Linux | Metro (mobile) file watching — not required on Windows |

No local Gradle install is needed (the backend ships a real wrapper pinned to Gradle 9.7.1).

## 1. Start local PostgreSQL

```sh
make db-up      # docker compose up -d postgres (repo-root docker-compose.yml)
# ...
make db-down    # when done
```

Connection details (also in the repo-root `.env.example`): `localhost:5432`, db `acplatform`, user `acplatform`, password `acplatform_local_only` — local dev only, never used anywhere else.

## 2. Backend

```sh
cd backend
./gradlew --version        # confirms the wrapper resolves Gradle 9.7.1
./gradlew build -x test    # compile all 9 modules + spotlessCheck
./gradlew test             # unit tests + ArchUnit module-boundary tests
./gradlew spotlessCheck    # formatting check alone
./gradlew :app:bootRun     # boots the app — requires step 1 (Postgres) first
```

- Public API: `http://localhost:8080` (e.g. `GET /v1/system/health`).
- Actuator management (health/info only): `http://localhost:8090/actuator/health`.
- Swagger UI: `http://localhost:8080/swagger-ui.html`. Contract of record: `docs/api/openapi.yaml`.
- `./gradlew integrationTest` runs Testcontainers-backed tests against a real, ephemeral PostgreSQL — requires Docker, is **not** part of `build`/`test`/`check` by design.
- Env vars: see `backend/.env.example` (`SPRING_DATASOURCE_URL`/`USERNAME`/`PASSWORD`, `SPRING_PROFILES_ACTIVE=local` for permissive dev CORS).

## 3. Web

```sh
npm install                 # from repo root — installs frontend + mobile + packages/* together
make web-dev                # Vite dev server, http://localhost:5173
make web-lint
make web-typecheck
make web-test               # Vitest
make web-build               # production build
```

- API base URL: `frontend/.env.example` → `VITE_API_BASE_URL` (default `http://localhost:8080/v1`).
- Playwright e2e: `npm run test:e2e --workspace frontend` (needs `npx playwright install chromium` once; without the backend running it can only assert the app reaches a deterministic error/shell state, not the healthy path).

## 4. Mobile

```sh
npm install                       # from repo root (same install as web — do this once)
npm run mobile:lint
npm run mobile:typecheck
npm run mobile:test               # Jest + React Native Testing Library

npm start --workspace mobile           # Metro bundler
npm run android --workspace mobile     # needs Android Studio/SDK + emulator/device
npm run ios --workspace mobile         # needs macOS + Xcode + CocoaPods
```

- Android emulator reaches the backend at `10.0.2.2:8080`; iOS simulator at `localhost:8080` — handled automatically by `mobile/src/api/getApiBaseUrl.ts` in `__DEV__`.
- Android build (with SDK installed): `cd mobile/android && ./gradlew assembleDebug`.
- iOS build (macOS only): `cd mobile/ios && pod install`, then build via Xcode (`AcplatformMobile.xcworkspace`) or `xcodebuild`.
- Maestro flow: `mobile/.maestro/health-flow.yaml`; Appium/WebdriverIO skeleton: `mobile/e2e/` — both require a built app running on a device/emulator.

## Ports summary

| Service | Port |
|---|---|
| Backend app (public API) | 8080 |
| Backend Actuator management | 8090 |
| Postgres | 5432 |
| Web dev server (Vite) | 5173 |
| Metro bundler (mobile) | 8081 (default) |

## Troubleshooting

- **`npm install` at root fails / behaves oddly** — always run it from the repository root, never from `frontend/` or `mobile/` directly; this is an npm workspaces monorepo and the shared `packages/*` must install alongside both apps.
- **Backend `bootRun` fails to connect to Postgres** — confirm `make db-up` succeeded and `docker ps` shows the `postgres` container healthy before starting the app.
- **Mobile Gradle can't find `@react-native/gradle-plugin` or `react-native`** — re-run `npm install` from the repo root; this re-triggers `mobile`'s `postinstall` script (`mobile/scripts/link-hoisted-native-deps.js`), which fixes an npm-hoisting path issue specific to this monorepo layout. See `mobile/README.md` → "Android Gradle attempt" for the full explanation.
- **Android SDK/emulator not installed** — install Android Studio, an SDK platform matching `mobile/android/build.gradle`'s `compileSdkVersion`/`targetSdkVersion`, and create an AVD (or use a physical device with USB debugging).
- **iOS build needs a Mac** — no way around this; use a macOS machine or CI runner.
- **`npm audit` reports vulnerabilities** — as of this writing they all trace to transitive dev-tooling (`@react-navigation`'s `query-string`/`decode-uri-component`, `vite`/`vitest`'s bundled `esbuild`, and React Native's `metro`/`image-size` chain), each without a fix that isn't a breaking upgrade to a pinned major version. Re-run `npm audit` periodically and re-evaluate; do not force-upgrade blindly.

## What is genuinely unavailable in some environments (not silently skipped)

- Backend `integrationTest` / `bootRun` against a live database — needs Docker.
- Mobile Android build/smoke — needs Android Studio + SDK (CI runs this for real on a GitHub-hosted `ubuntu-latest` runner via `.github/workflows/mobile-ci.yml`).
- Mobile iOS build/test — needs a macOS machine (CI runs this for real on `macos-latest` via the same workflow).

Where any of the above was not run in a given environment, say so explicitly and give the exact command to run it — never report it as passed.
