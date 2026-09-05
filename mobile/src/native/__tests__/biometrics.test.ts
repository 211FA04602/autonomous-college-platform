import { NotImplementedError } from '../errors';
import { StubBiometrics } from '../biometrics';

describe('StubBiometrics', () => {
  const bio = new StubBiometrics();

  it('isAvailable throws NotImplementedError rather than claiming a capability it cannot verify', async () => {
    await expect(bio.isAvailable()).rejects.toThrow(NotImplementedError);
  });

  it('authenticate throws NotImplementedError rather than claiming success', async () => {
    await expect(bio.authenticate('Confirm identity')).rejects.toThrow(NotImplementedError);
  });
});
