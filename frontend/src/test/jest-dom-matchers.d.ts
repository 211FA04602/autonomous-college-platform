/**
 * Local copy of `@testing-library/jest-dom`'s `vitest` module-augmentation
 * (its own `types/vitest.d.ts`), relocated into `frontend/src` on purpose.
 *
 * Why: this monorepo hoists `@testing-library/jest-dom` (a devDependency
 * used only by `frontend`) to the ROOT `node_modules`, while `frontend`
 * has its own nested `node_modules/vitest` (a different major version
 * than the `vitest` hoisted to root for the shared `packages/*`
 * devDependencies). TypeScript resolves the bare specifier `"vitest"`
 * inside `declare module "vitest"` relative to the augmenting *file's*
 * location — from jest-dom's location at the repo root, that resolves to
 * the ROOT vitest, not `frontend`'s nested one, so the augmentation
 * silently fails to merge with the `Assertion` interface our tests
 * actually use. Declaring the same augmentation from a file inside
 * `frontend/src` makes it resolve `frontend/node_modules/vitest` instead,
 * matching what `HealthPage.test.tsx` etc. import.
 */
import "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  interface Assertion<T = unknown> extends TestingLibraryMatchers<unknown, T> {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<unknown, unknown> {}
}
