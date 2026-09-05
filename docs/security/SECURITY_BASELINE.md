# Security baseline

This is the foundation-prompt security posture. It will grow as `identity-access` and `tenancy-organization` ship; this document is updated in the same PR as any change that affects it.

## Current scope (foundation prompt)

- No authentication is implemented yet. The public API surface is intentionally limited to `GET /v1/system/health`, which returns no sensitive data (status/version/timestamp only).
- Actuator management endpoints (`/actuator/health`, `/actuator/info`) are served on a **separate management port (8090)**, distinct from the public API port (8080), and only `health`/`info` are exposed — no env, metrics, or beans endpoints are exposed by default.
- CORS is permissive only under the `local`/`dev` Spring profile, for the Vite dev server on its loopback forms (`http://localhost:5173`, `http://127.0.0.1:5173`, `http://[::1]:5173`) and local mobile-emulator origins. It must never be permissive in any deployed environment.
- No secrets exist in this repository. `.env.example` files (root, `backend/`, `frontend/`, `mobile/`) contain placeholder values only; real values are supplied via environment variables / a secrets manager, never committed.

## Standing rules (apply from the first line of identity/tenancy code, not retrofitted)

- Tenant context is resolved server-side from authenticated membership only (constitution rule 2) — never trusted from client input.
- Row-Level Security is defense in depth; application-level tenant predicates are mandatory regardless (constitution rule 3).
- High-risk actions (result publication, fee waivers, grade overrides, exam-paper access) require separation of duties, explicit authorization, a recorded reason, and an audit trail entry (constitution rule 9) — the `audit` module's `AuditEventRecorder` is the sanctioned mechanism.
- Mobile navigation visibility is never the authorization boundary; the backend enforces identical rules regardless of client (constitution rule 19).
- The mobile offline cache only ever stores an explicitly allowlisted set of data types; confidential question papers, hidden grading tests, raw payment credentials, and secrets are permanently excluded from that allowlist (constitution rule 20, ADR-008).
- Secure storage (Keystore/Keychain-backed) is the only sanctioned place for tokens/secrets on a mobile device; authentication uses system-browser OIDC/PKCE, never an embedded WebView login.

## CI-enforced checks

- **Secret scanning** on every push/PR (see `.github/workflows/`).
- **Dependency vulnerability scanning** (backend: OWASP/Gradle dependency check or equivalent; web/mobile: `npm audit` at a documented severity threshold).
- **Basic SAST** (CodeQL or equivalent, backend + web/mobile source).

## Deferred (tracked, not silently dropped)

- Actual authentication/authorization implementation (`identity-access`).
- Row-Level Security policies (depend on `tenancy-organization` existing).
- Real native adapters for mobile secure storage/OIDC-PKCE/biometrics (currently documented stubs — see `mobile/src/native/`).
- A production secrets-manager integration (AWS Secrets Manager / Parameter Store) — direction set in ADR-006, not implemented in this prompt.
