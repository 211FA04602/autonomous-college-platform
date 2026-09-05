import { NotImplementedError } from '../errors';
import { StubQrBarcodeScanner } from '../qrBarcodeScanner';

describe('StubQrBarcodeScanner', () => {
  it('scanOnce throws NotImplementedError rather than fabricating a scan result', async () => {
    const scanner = new StubQrBarcodeScanner();
    await expect(scanner.scanOnce()).rejects.toThrow(NotImplementedError);
  });
});
