import { NotImplementedError } from '../errors';
import { StubOidcPkceBrowser, type OidcPkceConfig } from '../oidcPkceBrowser';

describe('StubOidcPkceBrowser', () => {
  const browser = new StubOidcPkceBrowser();
  const config: OidcPkceConfig = {
    issuer: 'https://issuer.example',
    clientId: 'mobile-client',
    redirectUrl: 'acplatform://auth-callback',
    scopes: ['openid', 'profile'],
  };

  it('authorize throws NotImplementedError rather than fabricating tokens', async () => {
    await expect(browser.authorize(config)).rejects.toThrow(NotImplementedError);
  });

  it('endSession throws NotImplementedError rather than silently succeeding', async () => {
    await expect(browser.endSession(config)).rejects.toThrow(NotImplementedError);
  });
});
