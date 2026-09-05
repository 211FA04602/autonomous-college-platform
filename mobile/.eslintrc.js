module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: [
    // Appium/WebdriverIO E2E skeleton (see mobile/e2e/wdio.conf.ts) is not
    // wired into this project's toolchain/globals — it is a documented,
    // not-run placeholder (constitution rule 13), not lintable app code.
    'e2e/**',
  ],
};
