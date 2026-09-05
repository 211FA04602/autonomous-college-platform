/**
 * Generates a client-side correlation ID to send as the `X-Correlation-Id`
 * request header. The backend echoes it (or assigns one if absent) so a
 * single request can be traced end to end across client, API, and logs.
 * Uses the Web Crypto API available in browsers, React Native (via
 * polyfill installed at app entry), and Node 24+.
 */
export function generateCorrelationId(): string {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj && typeof cryptoObj.randomUUID === "function") {
    return cryptoObj.randomUUID();
  }
  // Fallback: RFC 4122-ish v4 without crypto — only reachable in
  // environments where Web Crypto is unavailable.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
