import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import * as jestDomMatchers from "@testing-library/jest-dom/matchers";

// Extends *this* vitest instance's `expect` with jest-dom matchers
// (toBeInTheDocument, etc.). Deliberately NOT using
// `@testing-library/jest-dom/vitest`'s own auto-extend entry point here:
// that module does `require("vitest")` relative to its own location in
// the hoisted root `node_modules` (this monorepo's shared `packages/*`
// pin an older `vitest` there for their own tests), which would extend a
// different physical `vitest` module than the one imported above and
// used by our test files — so the matchers would silently attach to the
// wrong instance. Calling `expect.extend()` ourselves, from a file that
// lives inside `frontend/`, resolves both imports against frontend's own
// nested `vitest`, and matches the module-augmentation in
// `./jest-dom-matchers.d.ts` (see that file for the full explanation).
expect.extend(jestDomMatchers);

// Initializes i18next so components using useTranslation() render real
// copy in tests instead of raw keys.
import "../i18n/i18n";

// vitest.config.ts does not enable `test.globals`, so
// @testing-library/react's automatic afterEach(cleanup) registration
// (which relies on a global `afterEach`) never fires — register it
// explicitly instead, so each test starts from an empty DOM.
afterEach(() => {
  cleanup();
});
