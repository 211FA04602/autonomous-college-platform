import { NotImplementedError } from '../errors';
import { StubSecureStorage } from '../secureStorage';

describe('StubSecureStorage', () => {
  const storage = new StubSecureStorage();

  it('setItem throws NotImplementedError rather than silently succeeding', async () => {
    await expect(storage.setItem('k', 'v')).rejects.toThrow(NotImplementedError);
  });

  it('getItem throws NotImplementedError rather than returning a fake value', async () => {
    await expect(storage.getItem('k')).rejects.toThrow(NotImplementedError);
  });

  it('removeItem throws NotImplementedError rather than silently succeeding', async () => {
    await expect(storage.removeItem('k')).rejects.toThrow(NotImplementedError);
  });
});
