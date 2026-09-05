/**
 * System-browser OIDC/PKCE authentication (ADR-008). Login must happen in
 * the platform's system browser/AppAuth flow, never an embedded WebView, so
 * credentials are never observable to this app's own JS/native code — the
 * app only ever receives the resulting authorization code/tokens via the
 * platform's standard redirect mechanism.
 *
 * Real adapter to wire up next: `react-native-app-auth` (AppAuth-based
 * system-browser OIDC/PKCE client for Android + iOS).
 */
import { NotImplementedError } from './errors';

export interface OidcPkceConfig {
  issuer: string;
  clientId: string;
  redirectUrl: string;
  scopes: string[];
}

export interface OidcAuthorizationResult {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  /** ISO-8601 UTC instant. */
  expiresAtUtc: string;
}

export interface OidcPkceBrowser {
  authorize(config: OidcPkceConfig): Promise<OidcAuthorizationResult>;
  endSession(config: OidcPkceConfig): Promise<void>;
}

/**
 * NOT PRODUCTION READY. Compileable/testable stub only — every method
 * throws `NotImplementedError`; it never fabricates a token (constitution
 * rule 13, rule 16 — no secret material may ever be invented client-side).
 * Wire up `react-native-app-auth` before any feature depends on this.
 */
export class StubOidcPkceBrowser implements OidcPkceBrowser {
  async authorize(_config: OidcPkceConfig): Promise<OidcAuthorizationResult> {
    throw new NotImplementedError(
      'oidcPkceBrowser.authorize: wire to react-native-app-auth in a follow-up prompt',
    );
  }

  async endSession(_config: OidcPkceConfig): Promise<void> {
    throw new NotImplementedError(
      'oidcPkceBrowser.endSession: wire to react-native-app-auth in a follow-up prompt',
    );
  }
}

export const oidcPkceBrowser: OidcPkceBrowser = new StubOidcPkceBrowser();
