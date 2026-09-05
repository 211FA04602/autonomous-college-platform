/**
 * Shared error type for native capability stubs under `mobile/src/native/`.
 *
 * Every stub adapter in this directory throws `NotImplementedError` instead
 * of silently succeeding or faking a result (constitution rule 13: no fake
 * integrations, silent success, or placeholder production logic presented
 * as complete). Feature code that depends on a native capability must
 * handle this error explicitly until the real adapter is wired up.
 */
export class NotImplementedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotImplementedError';
  }
}
