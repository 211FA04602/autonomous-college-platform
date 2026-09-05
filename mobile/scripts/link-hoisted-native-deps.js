#!/usr/bin/env node
/**
 * In this npm-workspaces monorepo, a few packages the Android Gradle build
 * references via a HARDCODED relative path (rather than Node module
 * resolution) have no version conflict with any other workspace, so npm
 * hoists them to the repo-ROOT `node_modules/` instead of nesting them
 * under `mobile/node_modules/`:
 *
 *   - `@react-native/gradle-plugin` — `mobile/android/settings.gradle`
 *     does `includeBuild("../node_modules/@react-native/gradle-plugin")`.
 *   - `react-native` itself — the React Native Gradle plugin shells out to
 *     `node_modules/react-native/ReactAndroid/gradle.properties` and
 *     related scripts relative to the Android project root.
 *
 * Both hardcoded paths assume the package sits directly under
 * `mobile/node_modules/` (true for a standalone, non-monorepo RN project;
 * false here, where npm's workspace hoisting moved them to the repo root
 * because nothing else in the workspace also depends on them).
 *
 * This script runs as `mobile`'s `postinstall` (so it re-runs after every
 * `npm install` from the repo root) and creates a local directory
 * junction/symlink under `mobile/node_modules/` pointing at wherever npm
 * actually installed each package, so Gradle's hardcoded relative paths
 * resolve. It is a build-tooling path fix only — it does not fabricate or
 * stub any Gradle/Android behavior (constitution rule 13).
 *
 * Safe to run repeatedly; a no-op per package if it is already local, and
 * it does not fail the overall `npm install` if a package cannot be found
 * (e.g. a partial/failed install) — it logs and exits 0 so it never blocks
 * `npm install` itself.
 */
const fs = require('fs');
const path = require('path');

const MOBILE_ROOT = path.join(__dirname, '..');

/** Packages Gradle finds via a hardcoded relative node_modules path. */
const PACKAGES_TO_LINK = ['@react-native/gradle-plugin', 'react-native'];

function linkPackage(packageName) {
  const localTarget = path.join(MOBILE_ROOT, 'node_modules', ...packageName.split('/'));

  if (fs.existsSync(localTarget)) {
    return; // Already local (e.g. a non-monorepo checkout) — nothing to do.
  }

  let resolvedPackageJson;
  try {
    resolvedPackageJson = require.resolve(`${packageName}/package.json`, {
      paths: [MOBILE_ROOT],
    });
  } catch (error) {
    console.warn(
      `[link-hoisted-native-deps] Could not resolve ${packageName}; the Android Gradle build will not find it until this is fixed. (${error.message})`,
    );
    return;
  }

  const resolvedPackageDir = path.dirname(resolvedPackageJson);
  if (resolvedPackageDir === localTarget) {
    return;
  }

  fs.mkdirSync(path.dirname(localTarget), { recursive: true });

  try {
    // 'junction' works on Windows without elevated privileges and is
    // functionally a directory symlink for this purpose; falls back to a
    // plain symlink on POSIX where 'junction' isn't a valid type.
    const symlinkType = process.platform === 'win32' ? 'junction' : 'dir';
    fs.symlinkSync(resolvedPackageDir, localTarget, symlinkType);
    console.log(`[link-hoisted-native-deps] Linked ${localTarget} -> ${resolvedPackageDir}`);
  } catch (error) {
    console.warn(`[link-hoisted-native-deps] Failed to create link for ${packageName}: ${error.message}`);
  }
}

for (const packageName of PACKAGES_TO_LINK) {
  linkPackage(packageName);
}
