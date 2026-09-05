import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.js";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setupTests.ts"],
      css: true,
      // Playwright's own e2e specs live under e2e/ and are run by
      // `npm run test:e2e`, not Vitest.
      exclude: ["e2e/**", "node_modules/**", "dist/**"],
    },
  }),
);
