import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "coverage",
      "playwright-report",
      "test-results",
      "src/styles/tokens.css",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat["recommended-latest"],
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Feature code must never call fetch directly — only through
      // src/api/client.ts (ADR-005, constitution rule 12).
      "no-restricted-globals": [
        "error",
        { name: "fetch", message: "Use src/api/client.ts instead of calling fetch directly." },
      ],
      // This new (react-hooks v7) rule flags the standard React-docs
      // "fetch on mount" effect pattern (setState called synchronously
      // inside a useEffect body) as an error. useSystemHealth.ts uses
      // exactly that documented pattern deliberately; see
      // https://react.dev/reference/react/useEffect#fetching-data-with-effects.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    // Context modules intentionally co-locate a provider component with
    // its consumer hook and types (a standard React context pattern) —
    // this trades a little Fast Refresh granularity for not having to
    // split a 3-line hook into its own file.
    files: ["src/auth/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    // `declare module "vitest" { interface Assertion<T> extends X {} }` is
    // the required TS syntax for interface-merging module augmentation —
    // an empty body is not optional here (see the file's own doc comment).
    files: ["src/test/jest-dom-matchers.d.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "src/test/**", "e2e/**", "playwright.config.ts", "vitest.config.ts"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  eslintConfigPrettier,
);
