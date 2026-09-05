# ADR-007: React Native Android/iOS architecture

**Status:** Accepted
**Date:** 2026-09-05
**Upholds constitution rules:** 15, 19

## Context

Every PRD role needs an authorized native mobile interface (PRD principle 5), and routine tasks should not require an office visit. This must be a native app experience, not a WebView wrapper, while still sharing non-UI logic with the web client where safe.

## Decision

- **Framework:** React Native + TypeScript, initialized as **real Android and iOS native projects** (via the standard community CLI template, New Architecture default), not Expo-managed and not a WebView shell. Native modules (secure storage, OIDC/PKCE browser, push, camera/document capture, QR/barcode scanning, biometrics, background sync, authorized location) are accessed through TypeScript interfaces backed by real native adapters where a stable community/first-party module exists, or a documented stub interface where it does not yet — never a fabricated "connected" implementation (constitution rule 13).
- **Sharing with web:** design tokens, generated/typed API contracts, i18n resources, validation schemas, and non-UI utilities are shared via npm workspace packages under `packages/`. Business rules are never duplicated into the mobile app — the mobile client calls the backend for anything beyond client-side validation/formatting (constitution rule 19: mobile and web enforce identical backend security rules; the mobile app itself holds no independent authorization logic).
- **Navigation:** a single role-aware navigation architecture capable of representing every PRD role's surface, with role-to-screen mapping tracked in `docs/mobile/ROLE_FEATURE_MATRIX.md`. Navigation visibility is explicitly documented as UX convenience, not an authorization boundary (constitution rule 19).
- **Offline behavior:** an encrypted local-cache/offline-sync interface with an explicit per-data-type allowlist (see ADR-008) — nothing is cached by default; a data type must be explicitly allowlisted to be cached at all.
- **Testing:** React Native Testing Library + Jest for unit/component tests; Android build/unit/smoke validation in CI; an Appium 2 / Maestro-ready end-to-end structure for both platforms, with iOS execution gated on a macOS runner (see CI workflows) and never claimed as validated when it has not actually run.

## Consequences

- Two native toolchains (Android/Gradle, iOS/Xcode) must both be kept buildable; iOS build/test execution is only possible on macOS hardware/runners, which this development environment does not have — this is reported as unavailable evidence, not silently skipped or falsely claimed.
- Sharing packages via npm workspaces means the mobile app's dependency graph is coupled to the same Node/npm toolchain as the web app; both must be kept mutually compatible.
