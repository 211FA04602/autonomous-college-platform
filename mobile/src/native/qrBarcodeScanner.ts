/**
 * QR/barcode scanning (e.g. attendance check-in, library asset lookup,
 * hostel/transport passes).
 *
 * Real adapter to wire up next: `react-native-vision-camera`'s built-in
 * code-scanner frame processor, or `react-native-camera-kit` as a
 * simpler dedicated-scanner alternative.
 */
import { NotImplementedError } from './errors';

export interface ScannedCode {
  value: string;
  format: string;
}

export interface QrBarcodeScanner {
  scanOnce(): Promise<ScannedCode>;
}

/**
 * NOT PRODUCTION READY. Compileable/testable stub only — throws
 * `NotImplementedError` rather than returning a fabricated scan result
 * (constitution rule 13). Wire up `react-native-vision-camera` (or
 * `react-native-camera-kit`) before any feature depends on this.
 */
export class StubQrBarcodeScanner implements QrBarcodeScanner {
  async scanOnce(): Promise<ScannedCode> {
    throw new NotImplementedError(
      'qrBarcodeScanner.scanOnce: wire to react-native-vision-camera (code-scanner) or react-native-camera-kit in a follow-up prompt',
    );
  }
}

export const qrBarcodeScanner: QrBarcodeScanner = new StubQrBarcodeScanner();
