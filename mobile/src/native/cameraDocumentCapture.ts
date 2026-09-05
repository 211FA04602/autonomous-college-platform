/**
 * Camera-based document capture (e.g. certificates, ID proofs uploaded via
 * the `documents` module per constitution rule 10 — object storage
 * reference on the backend, never a blob in Postgres).
 *
 * Real adapter to wire up next: `react-native-vision-camera`.
 */
import { NotImplementedError } from './errors';

export interface CapturedDocument {
  uri: string;
  width: number;
  height: number;
  mimeType: string;
}

export interface CameraDocumentCapture {
  captureDocument(): Promise<CapturedDocument>;
}

/**
 * NOT PRODUCTION READY. Compileable/testable stub only — throws
 * `NotImplementedError` rather than returning a fabricated capture
 * (constitution rule 13). Wire up `react-native-vision-camera` before any
 * feature depends on this.
 */
export class StubCameraDocumentCapture implements CameraDocumentCapture {
  async captureDocument(): Promise<CapturedDocument> {
    throw new NotImplementedError(
      'cameraDocumentCapture.captureDocument: wire to react-native-vision-camera in a follow-up prompt',
    );
  }
}

export const cameraDocumentCapture: CameraDocumentCapture = new StubCameraDocumentCapture();
