import { Platform } from 'react-native';

/**
 * Resolves the backend API base URL (including the `/v1` version segment)
 * for the current runtime.
 *
 * - Android emulator's loopback address to the host machine is `10.0.2.2`,
 *   NOT `localhost` — the emulator runs in its own network namespace.
 * - iOS simulator shares the host's network namespace, so `localhost`
 *   reaches a locally running backend directly.
 * - A real device (or any non-`__DEV__` build) has no usable "host machine
 *   loopback" at all — it MUST be given an explicit, reachable base URL.
 *
 * `apiBaseUrlOverride` is the seam for that explicit configuration. This
 * foundation prompt does not wire up a config-loading library (e.g.
 * `react-native-config`) to read `mobile/.env.example`'s `API_BASE_URL`
 * automatically — that is a follow-up. Wiring it is intentionally left
 * honest rather than faked: passing no override in a non-development build
 * throws instead of silently defaulting to a localhost URL that could
 * never work on a real device (constitution rule 13).
 */
export interface ApiBaseUrlConfig {
  apiBaseUrlOverride?: string;
}

const DEV_PORT = 8080;
const API_VERSION_SEGMENT = '/v1';

export function getApiBaseUrl(config: ApiBaseUrlConfig = {}): string {
  if (config.apiBaseUrlOverride) {
    return config.apiBaseUrlOverride;
  }

  if (__DEV__) {
    const devHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
    return `http://${devHost}:${DEV_PORT}${API_VERSION_SEGMENT}`;
  }

  throw new Error(
    'getApiBaseUrl: no API base URL is configured for a non-development build. ' +
      'Provide apiBaseUrlOverride sourced from an env/config layer (see mobile/.env.example) ' +
      'before shipping a release build — this is deliberately not defaulted.',
  );
}
