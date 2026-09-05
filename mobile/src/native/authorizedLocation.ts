/**
 * Authorized (permission-gated) location capture — e.g. campus attendance
 * geofencing, transport tracking consented to by the user. Never collected
 * without an explicit OS permission grant.
 *
 * Real adapter to wire up next: `@react-native-community/geolocation`.
 */
import { NotImplementedError } from './errors';

export interface AuthorizedLocationPosition {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  /** ISO-8601 UTC instant. */
  capturedAtUtc: string;
}

export interface AuthorizedLocation {
  requestPermission(): Promise<{ granted: boolean }>;
  getCurrentPosition(): Promise<AuthorizedLocationPosition>;
}

/**
 * NOT PRODUCTION READY. Compileable/testable stub only — every method
 * throws `NotImplementedError` rather than fabricating a position or a
 * granted permission (constitution rule 13). Wire up
 * `@react-native-community/geolocation` before any feature depends on
 * this.
 */
export class StubAuthorizedLocation implements AuthorizedLocation {
  async requestPermission(): Promise<{ granted: boolean }> {
    throw new NotImplementedError(
      'authorizedLocation.requestPermission: wire to @react-native-community/geolocation in a follow-up prompt',
    );
  }

  async getCurrentPosition(): Promise<AuthorizedLocationPosition> {
    throw new NotImplementedError(
      'authorizedLocation.getCurrentPosition: wire to @react-native-community/geolocation in a follow-up prompt',
    );
  }
}

export const authorizedLocation: AuthorizedLocation = new StubAuthorizedLocation();
