/**
 * Secure, native-backed storage for tokens, refresh credentials, and any
 * other secret material persisted on-device (ADR-008, constitution rule 16).
 *
 * Real adapter to wire up next: `react-native-keychain` (Android Keystore /
 * iOS Keychain backed). Feature code must NEVER use `AsyncStorage` or a
 * plain file for anything covered by this interface.
 */
import { NotImplementedError } from './errors';

export interface SecureStorage {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
}

/**
 * NOT PRODUCTION READY. Compileable/testable stub only — every method
 * throws `NotImplementedError` rather than persisting data insecurely or
 * pretending to succeed (constitution rule 13). Wire up
 * `react-native-keychain` before any feature depends on this.
 */
export class StubSecureStorage implements SecureStorage {
  async setItem(_key: string, _value: string): Promise<void> {
    throw new NotImplementedError(
      'secureStorage.setItem: wire to react-native-keychain in a follow-up prompt',
    );
  }

  async getItem(_key: string): Promise<string | null> {
    throw new NotImplementedError(
      'secureStorage.getItem: wire to react-native-keychain in a follow-up prompt',
    );
  }

  async removeItem(_key: string): Promise<void> {
    throw new NotImplementedError(
      'secureStorage.removeItem: wire to react-native-keychain in a follow-up prompt',
    );
  }
}

export const secureStorage: SecureStorage = new StubSecureStorage();
