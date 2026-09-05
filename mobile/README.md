# Autonomous College Platform — Mobile (foundation)

A real React Native (New Architecture, TypeScript) app for Android and iOS —
not a WebView wrapper, not Expo-managed — for the Autonomous College Platform.
See `docs/architecture/ADR-007-react-native-architecture.md` and
`docs/architecture/ADR-008-mobile-security-offline.md` for the architectural
decisions this app follows, and `docs/engineering/CONSTITUTION.md` for the
binding engineering rules (especially rules 13, 15, 16, 19, 20).

**Status: foundation only.** This ships one real vertical slice (the system
health screen), a role-aware navigation shell with per-role placeholders
("`<Role>` — coming soon"), and compileable-but-stubbed native capability
interfaces. No role's feature set is complete — see
`docs/mobile/ROLE_FEATURE_MATRIX.md`.

## Prerequisites

- Node 24.x, npm 10.x (repo root `package.json` pins these under `engines`).
- Run `npm install` from the **repository root** (not `mobile/`) — this is
  an npm workspaces monorepo; `mobile/`'s dependencies and the shared
  `packages/*` are installed together.
- **Android work** (build/run/emulator): Android Studio with an installed
  SDK (compileSdk 37 / targetSdk 36 per `mobile/android/build.gradle`), an
  emulator or device, and `ANDROID_HOME`/`ANDROID_SDK_ROOT` set. **Not
  available in this development sandbox** — see "What has and hasn't been
  verified" below.
- **iOS work** (build/run/simulator): a Mac with Xcode and CocoaPods.
  **Not available in this development sandbox** (no macOS).
- Watchman is recommended on macOS/Linux for Metro file watching; not
  required on Windows.

## Commands

These match the scripts actually defined in `mobile/package.json` (and the
root scripts `mobile:lint` / `mobile:typecheck` / `mobile:test` that shell
out to them via `npm run <script> --workspace mobile`):

```sh
# from the repository root
npm install                       # installs mobile + shared packages together

npm run lint --workspace mobile       # ESLint (@react-native/eslint-config)
npm run typecheck --workspace mobile  # tsc --noEmit, strict mode
npm run test --workspace mobile       # Jest + React Native Testing Library
```

Or via the root convenience scripts: `npm run mobile:lint`,
`npm run mobile:typecheck`, `npm run mobile:test`.

Metro / running the app (requires the native toolchain for the target
platform — see Prerequisites):

```sh
npm start --workspace mobile           # Metro bundler
npm run android --workspace mobile     # requires Android Studio/SDK + emulator or device
npm run ios --workspace mobile         # requires macOS + Xcode + CocoaPods
```

## What has and hasn't been verified in this environment

This foundation was built in a sandbox with **no Android SDK/emulator, no
Docker, and no macOS/Xcode**. Actually run and passing here:

- `npm install` from the repo root (React Native **0.87.1**, resolved via
  the standard community CLI template).
- `npm run lint --workspace mobile` — 0 errors, 0 warnings.
- `npm run typecheck --workspace mobile` — `tsc --noEmit`, strict mode, 0
  errors.
- `npm run test --workspace mobile` — Jest + React Native Testing Library,
  all suites passing.

**Not run, and not claimed as run:**

- `mobile/android`: `cd mobile/android && ./gradlew assembleDebug` (or any
  emulator-based run/smoke test). This is the command a developer **with**
  Android Studio/SDK installed should run to build a debug APK; run it on
  an emulator via `npm run android --workspace mobile` with an emulator
  already booted, or `adb install` the resulting APK onto a device.
  - We *did* attempt `./gradlew help` here (see "Android Gradle attempt"
    below) purely to validate the project structure as far as possible
    without an SDK — it is not a substitute for `assembleDebug`.
- `mobile/ios`: `pod install` (from `mobile/ios/`), then build via Xcode
  (open `AcplatformMobile.xcworkspace`) or `xcodebuild`. Requires a macOS
  runner with Xcode; not run here.
- Any Maestro (`mobile/.maestro/health-flow.yaml`) or Appium 2/WebdriverIO
  (`mobile/e2e/`) end-to-end flow — both require a built app on a real
  device/emulator, which this sandbox cannot provide. Both files are
  documented placeholders (see the comments in each), not executed tests.

### Android Gradle attempt (honest result)

We ran `cd mobile/android && ./gradlew help` (with internet access, no
`--offline`) to see how far project configuration gets without an SDK. Two
real, monorepo-specific problems surfaced and were fixed along the way
before hitting the expected final blocker:

1. **`@react-native/gradle-plugin` not found** —
   `mobile/android/settings.gradle` hardcodes
   `includeBuild("../node_modules/@react-native/gradle-plugin")`, assuming
   that package sits directly under `mobile/node_modules/`. In this npm
   workspaces monorepo, npm hoists it to the repo-root `node_modules/`
   instead (no other workspace depends on it, so nothing blocks the hoist).
2. **`react-native` itself not found** — same root cause: the React Native
   Gradle plugin shells out to
   `node_modules/react-native/ReactAndroid/gradle.properties` relative to
   the Android project, which is also hoisted to the repo root.

Both are fixed by `mobile/scripts/link-hoisted-native-deps.js`, wired as
this package's `postinstall` script (re-runs after every `npm install` from
the repo root). It creates a local directory junction/symlink under
`mobile/node_modules/` pointing at wherever npm actually installed each
package — a build-tooling path fix, not a native integration of any kind.

With that fix in place, `./gradlew help` progressed through settings
evaluation, building the React Native Gradle plugin itself, and configuring
the `:app` project, and failed at exactly the expected, honest final step:

```
* What went wrong:
A problem occurred evaluating root project 'AcplatformMobile'.
> Failed to apply plugin 'com.facebook.react.rootproject'.
   > A problem occurred configuring project ':app'.
      > com.android.builder.errors.EvalIssueException: SDK location not found.
        Define a valid SDK location with an ANDROID_HOME environment variable
        or by setting the sdk.dir path in your project's local properties
        file at '...\mobile\android\local.properties'.
```

This is the expected outcome given no Android SDK is installed in this
sandbox — it is reported here rather than omitted (constitution rule 13).
A developer with Android Studio/SDK installed will not hit either of the
two monorepo-specific issues above (already fixed) and should be able to
run `./gradlew assembleDebug` normally.

## Architecture notes for this foundation

- **Shared packages** (`@acplatform/design-tokens`, `@acplatform/i18n-resources`,
  `@acplatform/validation-schemas`, `@acplatform/shared-utils`,
  `@acplatform/api-contracts`) are consumed as npm workspace dependencies at
  version `"*"` — never forked or copied.
- **API base URL**: `mobile/src/api/getApiBaseUrl.ts` picks `10.0.2.2` for
  the Android emulator, `localhost` for the iOS simulator, both in `__DEV__`
  only; any non-development build must supply `apiBaseUrlOverride` (wiring a
  config-loading library such as `react-native-config` to read
  `mobile/.env.example`'s `API_BASE_URL` automatically is a follow-up, not
  done here — see the file's doc comment).
- **Native capability interfaces** (`mobile/src/native/*.ts`): each defines
  a real TypeScript contract plus a compileable stub adapter that throws
  `NotImplementedError` naming the real library to wire up next
  (`react-native-keychain`, `react-native-app-auth`, `@notifee/react-native`,
  `react-native-vision-camera`, `react-native-biometrics`,
  `react-native-background-fetch`, `@react-native-community/geolocation`).
  None of these native libraries are installed yet — see each file's doc
  comment for why (unverifiable native linking risk in this sandbox).
- **Offline cache** (`mobile/src/offline/offlineCache.ts`): an explicit
  allowlist (`CacheableDataType`) gates what may ever be cached on-device.
  Confidential question papers, hidden grading tests, raw payment
  credentials, and secrets are permanently excluded — see the file's doc
  comment, ADR-008, and constitution rule 20.
- **Role-aware navigation** (`mobile/src/navigation/`): every PRD role has a
  typed entry in `roles.ts`; `RoleAwareNavigator.tsx` renders the same
  generic placeholder screen for all of them. This is UX only, never an
  authorization boundary (constitution rule 19) — see
  `docs/mobile/ROLE_FEATURE_MATRIX.md` for the honest per-role status.

## CI note (for whoever wires up the pipeline)

This prompt does not add any CI workflow itself. For a future CI job:

- `lint`, `typecheck`, and `test` (all defined above) need no native SDK and
  can run on any standard Node 24 Linux/Windows/macOS runner.
- An Android build/unit-test job needs a runner with Android SDK
  command-line tools installed (or a `reactnativecommunity/react-native-android`
  -style container) and should run `cd mobile/android && ./gradlew
  assembleDebug` (and `./gradlew testDebugUnitTest` for Android-side unit
  tests) after `npm install` at the repo root — `mobile`'s `postinstall`
  script (`scripts/link-hoisted-native-deps.js`) already fixes the two
  monorepo-hoisting path issues described above, so no extra CI-side
  workaround should be needed for that part.
- An iOS build/test job needs a macOS runner with Xcode and CocoaPods, and
  should run `pod install` from `mobile/ios/` before building.
- Maestro/Appium E2E jobs (`mobile/.maestro/`, `mobile/e2e/`) need a real
  emulator/simulator or device and an already-built app — gate these behind
  the Android/iOS build jobs succeeding first.

## Troubleshooting

- **`npm install` at the repo root doesn't seem to update `mobile/`** — make
  sure you're running it from the repository root, not `mobile/`; npm
  workspaces installs all workspaces (including shared `packages/*`) in one
  pass.
- **Jest fails with a React/react-test-renderer version mismatch** — this
  monorepo hoists slightly different React patch versions for `frontend`
  and `mobile`; `mobile/jest.config.js`'s `moduleNameMapper` pins both
  `react` and `react-test-renderer` to `mobile`'s own resolved copies. If
  you still see a mismatch after changing dependency versions, re-run
  `npm install` from the root first.
- **Gradle can't find `@react-native/gradle-plugin` or `react-native`** —
  re-run `npm install` from the repo root (this re-triggers `mobile`'s
  `postinstall` script, `scripts/link-hoisted-native-deps.js`, which
  recreates the necessary local links); see "Android Gradle attempt" above.
- **Android SDK/emulator not installed** — install Android Studio, an SDK
  platform matching `compileSdkVersion`/`targetSdkVersion` in
  `mobile/android/build.gradle`, and create an AVD, or connect a physical
  device with USB debugging enabled.
- **iOS build needs a Mac** — there is no way around this; CocoaPods and
  Xcode only run on macOS. Use a macOS CI runner or a physical Mac.
