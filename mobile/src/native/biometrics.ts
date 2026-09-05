/**
 * Local biometric re-authentication gate in front of already-issued tokens
 * (ADR-008: device-level convenience only, never a substitute for
 * server-side authorization — constitution rule 19).
 *
 * Real adapter to wire up next: `react-native-biometrics`.
 */
import { NotImplementedError } from './errors';

export type BiometryType = 'FaceID' | 'TouchID' | 'Fingerprint' | 'None';

export interface BiometricAvailability {
  available: boolean;
  biometryType: BiometryType;
}

export interface Biometrics {
  isAvailable(): Promise<BiometricAvailability>;
  authenticate(promptMessage: string): Promise<boolean>;
}

/**
 * NOT PRODUCTION READY. Compileable/testable stub only — every method
 * throws `NotImplementedError` rather than claiming biometrics are
 * available/passed (constitution rule 13). Wire up
 * `react-native-biometrics` before any feature depends on this.
 */
export class StubBiometrics implements Biometrics {
  async isAvailable(): Promise<BiometricAvailability> {
    throw new NotImplementedError(
      'biometrics.isAvailable: wire to react-native-biometrics in a follow-up prompt',
    );
  }

  async authenticate(_promptMessage: string): Promise<boolean> {
    throw new NotImplementedError(
      'biometrics.authenticate: wire to react-native-biometrics in a follow-up prompt',
    );
  }
}

export const biometrics: Biometrics = new StubBiometrics();
