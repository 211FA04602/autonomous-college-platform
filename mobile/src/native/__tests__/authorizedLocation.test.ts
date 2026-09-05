import { NotImplementedError } from '../errors';
import { StubAuthorizedLocation } from '../authorizedLocation';

describe('StubAuthorizedLocation', () => {
  const location = new StubAuthorizedLocation();

  it('requestPermission throws NotImplementedError rather than claiming a grant', async () => {
    await expect(location.requestPermission()).rejects.toThrow(NotImplementedError);
  });

  it('getCurrentPosition throws NotImplementedError rather than fabricating a position', async () => {
    await expect(location.getCurrentPosition()).rejects.toThrow(NotImplementedError);
  });
});
