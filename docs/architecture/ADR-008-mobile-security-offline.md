# ADR-008: Mobile security, secure storage, and offline synchronization boundaries

**Status:** Accepted
**Date:** 2026-09-05
**Upholds constitution rules:** 16, 19, 20

## Context

Mobile devices are lost, stolen, and inspected far more easily than a server. Confidential examination content, hidden test cases, payment credentials, and certain student data categories must never end up in a device's local storage regardless of how the offline-sync feature is later built out.

## Decision

- **Secure storage:** a single native-backed secure storage interface (Android Keystore-backed / iOS Keychain-backed) is the only sanctioned place to persist tokens, refresh credentials, or any secret material on-device. Feature code never uses plain `AsyncStorage`/unencrypted files for anything security-sensitive.
- **Auth flow:** system-browser OIDC/PKCE (not an embedded WebView login), so credentials are never observable to the app's own JS/native code — the app only ever receives the resulting authorization code/tokens via the platform's standard redirect mechanism.
- **Offline cache allowlist:** the offline-sync interface accepts a data-type identifier and refuses to cache anything not on an explicit allowlist. The allowlist, at foundation stage, is empty of any confidential category by design — categories are added only when a specific feature explicitly justifies caching that data type, and confidential question papers, hidden grading tests, raw payment credentials, and any data category the institution flags as non-cacheable are permanently excluded (constitution rule 20).
- **Biometrics:** used only as a local re-authentication gate in front of already-issued tokens (device-level convenience), never as a substitute for server-side authorization.
- **Background sync:** runs only against the allowlisted, already-authorized data set; it cannot widen what is cacheable.

## Consequences

- Every future feature that wants offline support must explicitly extend the allowlist (a reviewed, deliberate change) rather than getting offline caching "for free" by using a generic storage call — this is intentionally more friction than a generic cache API, in exchange for the confidentiality guarantee.
- Native adapters for these interfaces that don't yet have a production-ready implementation are documented as stubs (constitution rule 13) — e.g., biometrics/background-sync native wiring in this foundation prompt provides the TypeScript interface and a compileable stub adapter, not a claimed working integration.
