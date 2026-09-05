/**
 * Appium 2 / WebdriverIO E2E config skeleton — HEALTH VERTICAL SLICE ONLY.
 *
 * NOT RUN as part of this foundation prompt or any CI job it feeds: Appium
 * needs a real Appium 2 server, a connected Android emulator/device or iOS
 * simulator, and an already-built app binary, none of which exist in this
 * sandbox. This file documents the intended shape (capabilities, spec
 * glob, service) so a follow-up with real device/build access can run it
 * — it is not evidence of an executed E2E test (constitution rule 13).
 *
 * To run once a real environment/build is available (illustrative):
 *   1. Build a debug APK: cd mobile/android && ./gradlew assembleDebug
 *   2. Start Appium 2:    appium
 *   3. npx wdio mobile/e2e/wdio.conf.ts
 */
export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./specs/**/*.spec.ts'],
  maxInstances: 1,
  // 'appium' service + capabilities below assume @wdio/appium-service and
  // appium-uiautomator2-driver are installed — deliberately NOT added as
  // dependencies in this foundation prompt (would add unverifiable native
  // toolchain risk with no way to test it here; see mobile/README.md).
  services: [
    [
      'appium',
      {
        // args: { address: 'localhost', port: 4723 },
      },
    ],
  ],
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Android Emulator',
      'appium:app': 'mobile/android/app/build/outputs/apk/debug/app-debug.apk',
    },
  ],
  logLevel: 'info',
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
