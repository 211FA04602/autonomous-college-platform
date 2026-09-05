module.exports = {
  preset: '@react-native/jest-preset',
  // mobile/e2e is an Appium/WebdriverIO skeleton (not run here — see
  // mobile/README.md); it must not be picked up as a Jest unit-test suite.
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-.*|@acplatform)/)',
  ],
  // In this npm-workspaces monorepo, `frontend` and `mobile` request
  // slightly different React patch versions, so npm hoists a different
  // `react` to the repo-root node_modules than the one nested under
  // mobile/node_modules for react-native. A package hoisted to the repo
  // root (e.g. @testing-library/react-native) would otherwise resolve
  // `require('react')` by walking up to the root copy, producing a
  // React/react-test-renderer version mismatch. Pin both to mobile's own
  // copies so every module in this workspace's test run sees one React.
  moduleNameMapper: {
    '^react$': require.resolve('react'),
    '^react/package\\.json$': require.resolve('react/package.json'),
    '^react-test-renderer$': require.resolve('react-test-renderer'),
    '^react-test-renderer/package\\.json$': require.resolve('react-test-renderer/package.json'),
  },
};
