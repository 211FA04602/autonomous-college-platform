# Testing strategy

This describes the testing shape for the foundation prompt and the baseline every future business module follows.

## Backend (`backend/`)

| Layer | Tool | Runs in default `build`/`check`? | Needs Docker? |
|---|---|---|---|
| Unit tests | JUnit 5 + AssertJ | Yes (`./gradlew test`) | No |
| Module-boundary tests | ArchUnit | Yes (`./gradlew test`) | No |
| Integration tests (real Postgres) | Testcontainers + JUnit 5 | No — separate `integrationTest` source set/task | Yes |

Rationale: keeping Docker-dependent tests out of the default task means `./gradlew build`/`test` is runnable anywhere Java is installed (including this repository's own CI and any contributor's machine without Docker), while `integrationTest` is the real, honest verification path once Docker/Postgres is available — never faked, never silently skipped without saying so.

## Web (`frontend/`)

| Layer | Tool |
|---|---|
| Component/unit tests | Vitest + React Testing Library |
| End-to-end tests | Playwright |

Playwright specs must state in a comment what they assume is running (web dev server, backend, or both); a spec that can only assert a valid-but-degraded state (backend absent) rather than the fully healthy state must say so.

## Mobile (`mobile/`)

| Layer | Tool | Runs without Android/iOS SDKs? |
|---|---|---|
| TypeScript/lint | `tsc`, ESLint | Yes |
| Component tests | Jest + React Native Testing Library | Yes |
| Android build/smoke | Gradle (`assembleDebug`, instrumented smoke) | No — needs Android SDK/emulator |
| iOS build/test | Xcode/`xcodebuild` | No — needs a macOS runner |
| Full device/emulator E2E | Appium 2 or Maestro | No — needs a running build on a device/emulator |

**Never report Android or iOS build/E2E execution as passed unless it actually ran on real tooling.** Where the environment lacks the SDK/runner, the exact pending command is documented instead (see `mobile/README.md` and the CI workflow comments).

## Shared packages (`packages/*`)

Each package that has behavior beyond type declarations (`shared-utils`, `api-contracts`) has Vitest unit tests. Pure-data packages (`design-tokens`, `i18n-resources`) are typechecked but don't need behavioral tests until they gain logic.

## What "done" means for a test claim in this repository

A reported "pass" means: the exact command was executed in this environment (or a CI runner) and its exit code was 0 / its test summary showed the reported counts. A reported "unavailable" means the command was not executed because the required environment (Docker, Android SDK, macOS) was absent, and the exact command to run it is documented. Nothing is ever reported as passed based on code review or expectation alone (constitution rule 13).
