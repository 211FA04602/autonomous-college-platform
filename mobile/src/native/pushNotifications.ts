/**
 * Push notification registration/receipt (PRD mobile-first goal;
 * constitution rule 15).
 *
 * Real adapter to wire up next: `@notifee/react-native` (or
 * `react-native-push-notification` if a simpler local-notification-only
 * path is preferred) for permission requests, device-token retrieval, and
 * foreground/background notification handling.
 */
import { NotImplementedError } from './errors';

export interface PushPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
}

export interface PushNotificationPayload {
  title?: string;
  body?: string;
  data?: Record<string, string>;
}

export interface PushNotifications {
  requestPermission(): Promise<PushPermissionStatus>;
  getDeviceToken(): Promise<string | null>;
  /** Returns an unsubscribe function. */
  onNotificationReceived(handler: (notification: PushNotificationPayload) => void): () => void;
}

/**
 * NOT PRODUCTION READY. Compileable/testable stub only — every method
 * throws `NotImplementedError` rather than claiming a permission was
 * granted or a token was issued (constitution rule 13). Wire up
 * `@notifee/react-native` before any feature depends on this.
 */
export class StubPushNotifications implements PushNotifications {
  async requestPermission(): Promise<PushPermissionStatus> {
    throw new NotImplementedError(
      'pushNotifications.requestPermission: wire to @notifee/react-native in a follow-up prompt',
    );
  }

  async getDeviceToken(): Promise<string | null> {
    throw new NotImplementedError(
      'pushNotifications.getDeviceToken: wire to @notifee/react-native in a follow-up prompt',
    );
  }

  onNotificationReceived(_handler: (notification: PushNotificationPayload) => void): () => void {
    throw new NotImplementedError(
      'pushNotifications.onNotificationReceived: wire to @notifee/react-native in a follow-up prompt',
    );
  }
}

export const pushNotifications: PushNotifications = new StubPushNotifications();
