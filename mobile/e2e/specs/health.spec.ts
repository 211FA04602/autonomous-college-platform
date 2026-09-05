/**
 * Placeholder Appium 2 spec — HEALTH VERTICAL SLICE ONLY.
 *
 * NOT RUN in this foundation prompt (no Appium server, no
 * emulator/simulator, no built app binary in this sandbox — see
 * mobile/README.md and mobile/e2e/wdio.conf.ts). This file is excluded
 * from `tsc`/ESLint (see mobile/tsconfig.json, mobile/.eslintrc.js)
 * because it depends on WebdriverIO/Mocha globals this project does not
 * install a devDependency for yet. Kept here purely to document the
 * intended spec shape for a follow-up with real device/build access.
 *
 * Illustrative only:
 *
 * describe('system health screen', () => {
 *   it('shows the health screen title after launch', async () => {
 *     const title = await driver.$('~health-screen');
 *     await title.waitForDisplayed({ timeout: 10000 });
 *   });
 * });
 */
export {};
