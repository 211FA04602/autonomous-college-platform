/**
 * React Native's TypeScript config (`@react-native/typescript-config`) does
 * not include the DOM lib, so `globalThis.crypto` (used by
 * `@acplatform/shared-utils`' `generateCorrelationId`, a shared package we
 * do not modify) has no ambient type. This mobile-local declaration adds
 * just enough typing for that access to type-check, without pulling in the
 * unrelated DOM/browser globals a full `"dom"` lib entry would add.
 *
 * This is a TYPE-ONLY declaration — it does not provide a runtime
 * `crypto.randomUUID` polyfill. `generateCorrelationId` already has a
 * manual fallback for when `crypto.randomUUID` is unavailable, which is the
 * expected path on-device until a polyfill (e.g.
 * `react-native-get-random-values`) is wired up.
 */
export {};

declare global {
  var crypto: { randomUUID?: () => string } | undefined;
}
