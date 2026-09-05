/**
 * Background sync task scheduling (ADR-008: runs only against the
 * allowlisted, already-authorized data set in `mobile/src/offline/` — it
 * cannot widen what is cacheable).
 *
 * Real adapter to wire up next: a New-Architecture-compatible background
 * task library such as `react-native-background-fetch` (wraps Android
 * WorkManager / iOS BGTaskScheduler); a headless-JS task registered at app
 * boot is the usual companion piece.
 */
import { NotImplementedError } from './errors';

export interface BackgroundSyncTaskResult {
  /** ISO-8601 UTC instant. */
  ranAt: string;
  success: boolean;
}

export interface BackgroundSync {
  scheduleTask(taskId: string, minimumIntervalMinutes: number): Promise<void>;
  cancelTask(taskId: string): Promise<void>;
  runNow(taskId: string): Promise<BackgroundSyncTaskResult>;
}

/**
 * NOT PRODUCTION READY. Compileable/testable stub only — every method
 * throws `NotImplementedError` rather than claiming a task was scheduled or
 * ran (constitution rule 13). Wire up `react-native-background-fetch`
 * before any feature depends on this.
 */
export class StubBackgroundSync implements BackgroundSync {
  async scheduleTask(_taskId: string, _minimumIntervalMinutes: number): Promise<void> {
    throw new NotImplementedError(
      'backgroundSync.scheduleTask: wire to react-native-background-fetch in a follow-up prompt',
    );
  }

  async cancelTask(_taskId: string): Promise<void> {
    throw new NotImplementedError(
      'backgroundSync.cancelTask: wire to react-native-background-fetch in a follow-up prompt',
    );
  }

  async runNow(_taskId: string): Promise<BackgroundSyncTaskResult> {
    throw new NotImplementedError(
      'backgroundSync.runNow: wire to react-native-background-fetch in a follow-up prompt',
    );
  }
}

export const backgroundSync: BackgroundSync = new StubBackgroundSync();
