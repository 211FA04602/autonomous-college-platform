import { NotImplementedError } from '../errors';
import { StubCameraDocumentCapture } from '../cameraDocumentCapture';

describe('StubCameraDocumentCapture', () => {
  it('captureDocument throws NotImplementedError rather than fabricating a capture', async () => {
    const capture = new StubCameraDocumentCapture();
    await expect(capture.captureDocument()).rejects.toThrow(NotImplementedError);
  });
});
