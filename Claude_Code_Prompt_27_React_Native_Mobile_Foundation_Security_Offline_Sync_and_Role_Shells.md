# Claude Code Prompt 27

## React Native Mobile Foundation, Security, Offline Sync, and Role Shells

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React Native + TypeScript Android/iOS, shared generated OpenAPI clients/contracts/design tokens/localization, Java 21 + Spring Boot 3 APIs, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–26 passed, were reviewed, and were committed  
**Scope:** Native mobile workspace, architecture, authentication and session security, tenant/institution/role context, entitlements, navigation and role shells, encrypted local storage, partial sync and mutation queue, deep links, push registration, camera/document/QR/barcode/file/location/background abstractions, accessibility/localization, privacy-safe observability, CI/testing, and release-readiness foundations

---

## Prompt to Paste into Claude Code

```text
You are the principal mobile architect continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read the entire `docs/product/PRD.md`, especially mobile Sections 22.5–22.8 or their current equivalents, every role/persona, security, offline, notifications, accessibility, localization, low-bandwidth, device capabilities, app distribution, and privacy requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, mobile/API/IAM/notification/document ADRs, threat models, data-classification/retention policy, design system, and repository conventions.
3. Inspect Prompt 01 identity/OIDC/session/device/tenant/role/membership contracts; Prompt 02 audit/document/outbox; all role and domain mobile interfaces from Prompts 03–25; Prompt 26 portal composition, mobile API/BFF, partial-sync, ETag, tombstone, idempotent mutation, inbox/push/deep-link/device contracts; OpenAPI specifications and generated TypeScript clients.
4. Inspect existing monorepo/workspace/package manager, React web/design tokens/localization/validation utilities, current native/Capacitor directories if any, Android/iOS build conventions, CI, secret management, dependency scanning, analytics/crash ports, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and all existing verification. Preserve valid work and user changes. If an existing React Native workspace exists, evolve it rather than re-scaffold. Do not overwrite native signing, bundle identifiers, entitlements, provisioning, or platform configurations without explicit evidence and migration.

Do not build a WebView wrapper, duplicate backend business rules, trust navigation as authorization, store tokens/secrets in AsyncStorage/plain files, claim root/jailbreak detection is perfect, globally pin certificates without rotation/recovery, allow silent cross-tenant cache reuse, cache prohibited records, fabricate push/provider behavior, enable real production analytics/crash uploads without configuration/consent, put secrets in mobile builds, claim iOS validation from Linux, implement Prompt 28–30 production role vertical slices, or publish apps to stores.

Create or harden `mobile/` as a first-class React Native + TypeScript application supporting Android and iOS from the first commit. The foundation must be functional—not static mock screens—but role-domain screens may remain accurately marked partial until later prompts.

## 1. Mobile architecture decision

Evaluate current repository state and select bare React Native or Expo prebuild/development builds through an ADR. Consider:

- system-browser OIDC/PKCE and universal/app links
- Keychain/Keystore and biometric-gated local access
- encrypted database/cache
- APNs/FCM push and notification service extensions where needed
- background sync/platform scheduling limits
- camera/document capture, QR/barcode/NFC where future roles require it
- foreground location and driver-safe modes
- secure file preview/share/download
- screen-capture controls
- managed enterprise/store distribution
- native dependency control, upgrades, patching, debugging, CI, and long-term ownership

Do not choose based only on setup speed. Document tradeoffs, rejected option, migration path, and constraints.

Use the repository's package manager/workspace conventions. A monorepo arrangement is allowed only where it simplifies governed sharing and does not couple web/native release cycles unnecessarily.

## 2. Workspace and project structure

Create/harden a maintainable structure such as:

- application bootstrap and providers
- navigation and deep-link routing
- authentication/session/context
- API/generated clients and transport middleware
- offline database, sync engine, and mutation queue
- feature entitlement and remote configuration
- shared native design system/components
- localization/accessibility
- device services behind interfaces
- observability/privacy
- feature modules/role shells
- test fixtures/mocks only in test/dev boundaries
- Android and iOS native projects/configuration

Use TypeScript strict mode with no broad `any`, unsafe casts, duplicated API interfaces, or unhandled promise rejections. Configure consistent lint/format/typecheck/test commands.

Keep platform-specific files narrow. Native-only dependencies sit behind typed interfaces with Android/iOS/test implementations.

## 3. Governed code sharing

Share only safe platform-neutral artifacts:

- generated OpenAPI types/client
- API problem/error codes
- design tokens and icon names
- validation schemas that describe request shape, not authorization/business decisions
- localization keys/resources
- date/number formatting utilities
- non-sensitive domain display enums/status labels

Do not import web DOM components, browser storage, Node-only packages, server entities, database models, backend policy engines, answer keys, provider secrets, or business-rule implementations.

Define ownership/versioning and contract-drift checks. Generated code is reproducible and not hand-edited.

## 4. Build environments and configuration

Implement typed environment configuration for development, test, staging, and production:

- API/OIDC public endpoints and client IDs
- app/bundle identifiers and URL schemes
- feature/remote-config public bootstrap
- push environment/public identifiers
- observability enabled/provider mode without secrets
- minimum log/privacy settings

Secrets, client secrets, service-account keys, signing keys, APNs private keys, provider tokens, and database credentials must never be compiled into the app or committed.

Validate allowed HTTPS origins/redirect URIs/schemes at build and runtime. Fail safely on missing/invalid production configuration.

Provide `.env.example` with synthetic public values only and document secure CI/store secret injection.

## 5. Application bootstrap and provider ordering

Implement deterministic startup:

1. initialize minimal privacy-safe logger/crash boundary
2. validate public configuration
3. open encrypted local storage/database
4. load device installation identity and app version
5. restore encrypted session metadata without exposing tokens to JS logs
6. resolve network state
7. refresh/validate server session
8. resolve memberships/context/entitlements/remote config
9. initialize sync/push/deep-link handling
10. route to authenticated role shell, login, forced update, maintenance, or recovery state

Use explicit state machine rather than nested booleans. Prevent sensitive screen flash before authorization/context restoration.

Handle cold start, warm start, background return, process death, OS restore, and database migration failure.

## 6. OIDC/OAuth authentication with PKCE

Implement authorization-code flow using the system browser/authentication session and PKCE:

- cryptographically random state, nonce, and code verifier
- S256 code challenge
- exact allowlisted redirect URI/universal/app-link handling
- issuer/audience/signature/time/nonce/state verification by approved library/backend
- cancellation, timeout, browser error, and replay handling
- no embedded WebView credentials or resource-owner password flow

Prefer standards-compliant OIDC provider abstraction compatible with the backend configuration. Do not invent authentication success in production.

Access tokens are short-lived; refresh rotation follows Prompt 01 contracts. Never parse token claims as sole authorization; server remains authoritative.

## 7. Secure token and key storage

Store refresh/session secrets only in iOS Keychain/Android Keystore-backed secure storage with appropriate accessibility/unlocked-device policy. Keep access tokens in memory where practical and minimize persistence.

Generate local database/cache encryption keys using platform secure storage; never hard-code or derive from user PIN alone. Define backup/migration/device-restore behavior so keys and encrypted data cannot be copied insecurely.

Implement atomic token rotation: a crash between receiving and persisting a rotated refresh token must recover safely according to server family semantics. Prevent two concurrent refreshes from invalidating each other through a single-flight lock.

Clear secrets on logout/device revoke/membership loss and ensure background jobs cannot resurrect a cleared session.

## 8. Session lifecycle and refresh rotation

Implement typed session states:

- unauthenticated
- authorizing
- authenticated_validating_context
- active
- refresh_required
- step_up_required
- offline_session_limited
- revoked
- expired
- locked_local
- recovery_required

API middleware attaches current token/context, handles one coordinated refresh, retries only safe/idempotent requests, and routes 401/403/context-revoked separately.

Support server-controlled logout, logout current device, logout all devices, session/device list, revocation events or polling, and credential-change invalidation.

Never queue/retry authentication, payment, approval, or non-idempotent calls blindly.

## 9. Local biometric unlock

Biometrics may unlock locally stored session material only after prior successful server authentication and tenant policy/user opt-in.

Support device credential fallback according to policy, biometric enrollment changes, lockout, unavailable hardware, cancellation, and app background timeout.

Biometric success is not server step-up unless the backend explicitly supports a cryptographic bound flow. Never represent local unlock as reauthentication for high-risk actions.

Do not store biometric templates or infer identity beyond OS result.

## 10. Step-up authentication

Implement server-driven step-up challenges for payments, sensitive documents/results, official marks, approvals, offer acceptance, HR/appraisal/payslips, emergency actions, exports, and other configured risks.

Challenges include purpose, transaction/context binding, allowed method, expiry, attempt limits, and server receipt. Resume the original action only after verifying current authorization and binding.

Handle cancellation, timeout, app background, deep link, offline state, replay, and changed source record. Never cache a generic step-up token for unrelated actions.

## 11. Device installation registration and trust signals

Create a random installation ID stored securely and register it through Prompt 26 contracts with app version, OS/platform, push capability, locale/timezone, and privacy-safe device metadata.

Do not collect IMEI, advertising ID, contacts, installed apps, serial number, Wi-Fi lists, or persistent fingerprinting data.

Model device/session as active, push_disabled, stale, revoked, compromised_suspected, or retired. Users can view/revoke devices where policy permits.

Risk signals—root/jailbreak, debugger, emulator, integrity/attestation response—are fallible. Treat as evidence under tenant policy: allow with warning, restrict selected sensitive/offline functions, require step-up, or block only with documented alternative/support. Never claim perfect detection or automatically punish.

## 12. Tenant, institution, campus, role, and dependent context

Resolve available contexts exclusively from authenticated backend memberships/relationships. Context includes tenant, institution, campus where relevant, role/persona, dependent/assignment scope, entitlements, and version.

Switch flow:

1. request authorized context list
2. display unambiguous institution/role/dependent labels
3. submit server context selection
4. receive scoped context/session confirmation
5. stop/cancel active requests and sync
6. purge or seal previous context caches/queues according to policy
7. load new entitlements/composition/sync cursors
8. route to the new role home

Never accept tenant/role/dependent IDs from an unverified deep link or cached navigation state. Prevent background tasks/notifications from one context appearing in another.

## 13. Dynamic module entitlements and remote configuration

Consume signed/authenticated Prompt 25/26 feature entitlements and remote configuration:

- module enabled/pilot/read_only/suspended/disabled
- role/campus/institution scope
- feature flags and rollout cohort
- minimum/recommended version
- maintenance window
- emergency disable/kill switch
- offline allowlist and cache policy version
- device capability policy

Cache only the last authenticated version with expiry. Offline use cannot grant new permissions or re-enable disabled modules.

Remote config selects from compiled safe behavior/components; it cannot deliver executable code, arbitrary URLs, business rules, or secrets.

## 14. Navigation architecture

Implement typed navigation with:

- unauthenticated/authenticated stacks
- role shell containing home, work queue, inbox, calendar, search, profile/support/settings
- module/feature routes registered from a compiled allowlist
- modal/step-up/document/camera/scan flows
- safe unavailable/expired/unauthorized/offline/forced-update routes

Navigation guards improve UX but never replace backend authorization. Every sensitive screen handles 401/403/404/revoked scope without revealing existence.

State restoration stores no sensitive params or tokens. Purge navigation history on logout/context switch/revocation.

## 15. Role shells for every PRD role

Represent every role from `docs/mobile/ROLE_FEATURE_MATRIX.md`, including:

- student
- parent/guardian
- faculty/course/lab instructor
- mentor/advisor/counselor
- HOD/program/department coordinator
- Dean/Principal/Director/Management/Chairman governance roles
- Controller/exam cell/examiner/evaluator/invigilator/observer
- admissions
- finance
- placement/training/recruiter/interviewer
- internship/project coordinator/guide/external mentor/panel
- HR/manager/attendance/workload/appraisal/payroll custodian
- librarian/hostel/transport/visitor/security/assets/service desk roles
- IQAC/OBE/accreditation/auditor/data-protection
- applicant/external restricted users
- tenant administrator and platform operations

Each shell has real authenticated context, entitlement-aware navigation, Prompt 26 home/work-queue/inbox/calendar/search/profile/support/settings contracts, consistent states, and placeholder-free route registration.

Foundation-only role screens may show an honest `NOT_YET_IMPLEMENTED_IN_MOBILE` status with safe web-first guidance if later prompts own the vertical slice. Do not mark them complete or display fake data/actions.

## 16. Deep-link and universal/app-link router

Implement HTTPS universal links/App Links plus controlled custom scheme only where required:

- allowlisted host/path/route patterns
- signed/opaque resource/action references where applicable
- authentication and current server context resolution
- link expiry/use/purpose validation
- tenant/institution/role/dependent authorization
- source record current state and module entitlement
- safe unavailable result without existence leakage

Queue an incoming link during authentication/step-up/update only in encrypted minimal form and replay once after revalidation. Prevent open redirects, JavaScript/file/content schemes, path traversal, token leakage, and arbitrary web navigation.

Push notifications contain only opaque message/deep-link IDs, not sensitive route parameters.

## 17. API transport layer

Use generated Prompt 26 OpenAPI clients with a narrow typed wrapper for:

- base URL/config validation
- auth/context headers
- correlation/client-operation/device IDs
- server-time capture
- ETag/If-Match/If-None-Match
- idempotency keys
- cancellation/timeouts
- safe retry policy
- RFC 7807 mapping
- rate-limit/retry-after handling
- network and maintenance state

Do not recreate DTOs or domain rules. Never automatically retry non-idempotent operations without an idempotency contract.

Redact requests/responses from logs. Error objects expose safe code/correlation/support reference, not tokens, PII, document URLs, answers, marks, or provider internals.

## 18. Encrypted local database and cache

Select a maintained mobile database/storage abstraction through ADR based on real encryption support, migrations, transactions, query needs, React Native architecture compatibility, background access, performance, backup behavior, and testability.

Implement:

- database encryption with Keychain/Keystore-protected key
- per-account and per-tenant/institution/role/dependent partitions or physically separate encrypted stores
- typed entities with schema/version/source ETag/sync metadata/classification/expiry
- migration journal, integrity check, corruption recovery, and safe reset
- transactional writes and bounded storage quotas
- LRU/expiry/policy purge and low-disk handling

Never place tokens, answer keys, question papers, hidden tests, payment credentials, broad exports, HR/appraisal/payslips, grievances/watch lists, confidential project IP/evidence, or other prohibited records in general cache.

## 19. Offline data allowlist and classification

Create a versioned explicit allowlist by entity/action/role/purpose with:

- classification ceiling
- maximum age/retention
- encryption and biometric-gate requirement
- background-refresh eligibility
- screenshot/clipboard/share policy
- mutation queue eligibility
- attachment/download limits
- purge triggers

Default is online-only/no-cache. Unknown/new entities cannot be cached until reviewed.

Safe examples may include permitted timetable/calendar metadata, approved course-content metadata/files, non-sensitive inbox summaries, drafts, the user's own attendance queue, project/logbook drafts, and receipts. Actual policy comes from Prompt 26/server.

Document why every allowed entity is safe and test prohibited canaries.

## 20. Partial synchronization engine

Implement Prompt 26 sync protocol:

- collection/scope/version negotiation
- opaque cursor/watermark
- bounded page pull
- create/update/tombstone application in one transaction
- ETag/version and server time
- next cursor persistence only after successful commit
- cursor expiry/reset-required full resync
- cancellation on context/session/config change

Support foreground refresh, pull-to-refresh, scheduled background refresh within OS constraints, and source-specific stale labels.

Never mix collections/scopes, infer tenant sequence, or keep unauthorized tombstoned records. Validate payload schema/version and fail safely.

## 21. Offline mutation queue

Implement encrypted durable operations with:

- client operation/idempotency ID
- context/entity/action/payload schema versions
- base ETag/version
- dependency ordering
- created/expiry time and attempt count
- online/foreground/step-up requirements
- states: draft, queued, blocked, syncing, acknowledged, conflict, rejected, expired, cancelled
- authoritative server result/receipt

Only allowlisted operations enter the queue. Payments, offer acceptance, official marks/results, final approvals, high-stakes submissions, sensitive HR actions, emergency broadcast, and other server-online-only actions must refuse offline completion.

Use exponential backoff/jitter, network awareness, Retry-After, bounded concurrency, dependency handling, manual retry/cancel, and dead-letter user recovery. Never infinite retry.

## 22. Conflict detection and user experience

Use server ETag/version and Prompt 26/source policies. Never default to last-write-wins for official records.

Conflict screen shows safe local draft, server current version, changed fields where permitted, source/as-of time, and allowed actions:

- discard local
- save local as new draft
- retry against current version after explicit user review
- merge only for domains with an approved deterministic merge contract
- contact support

Do not expose fields the current role can no longer access. A revoked/deleted record becomes an unavailable/tombstone state; local data is purged according to policy.

## 23. Network awareness and low-bandwidth behavior

Distinguish online, limited, captive/unknown, offline, backend unavailable, and provider-specific degraded states through actual health/API behavior—not connectivity alone.

Implement request cancellation, timeouts, resumable supported uploads/downloads, compression/content negotiation, thumbnail/quality variants, pagination, progressive loading, and user-controlled media download.

Show last confirmed sync/save/receipt time. Never claim current/live/saved/submitted from a local assumption.

Avoid aggressive polling; use push/inbox/foreground refresh and bounded backoff.

## 24. Push registration and handling

Implement platform interfaces for APNs/FCM registration, permission request at contextual value, token refresh, Prompt 26 authenticated registration, context binding, logout/revoke, invalid-token cleanup, and multiple accounts/devices.

Development/test adapter must not send real notifications. Production provider config remains external/backend.

Foreground/background/tapped notifications resolve opaque message IDs through the authorized inbox/deep-link API. Display generic lock-screen content and apply privacy settings.

Handle revoked session, removed role, expired message, disabled module, and deleted source with safe state.

## 25. Camera and document capture abstraction

Create typed service for camera/photo library/document picker with:

- just-in-time permission and purpose text
- capture/import, crop/rotate, quality/size preview
- EXIF/location metadata removal by default
- supported MIME/extension/count/size validation
- optional multi-page document flow
- image/PDF compression with visible quality disclosure
- encrypted temporary storage
- resumable upload/checksum/progress/cancel/retry
- authoritative scan/upload/processing receipt
- secure temporary-file deletion

Do not claim OCR/malware/document verification unless acknowledged by backend providers. Camera denial always has file/manual alternatives where possible.

## 26. QR and barcode scanning abstraction

Support camera-based QR/barcode and future native scanners behind a typed interface:

- allowlisted symbologies and payload size
- opaque token only; no execution/arbitrary URL opening
- tenant/purpose/resource/audience/expiry/nonce verification by server
- duplicate scan/idempotency handling
- torch/focus/accessibility/manual-entry fallback
- scan state and authoritative result receipt

Never trust decoded content or locally mark attendance/boarding/custody/payment/check-in complete. Prevent replay, cross-context use, screenshots-as-proof assumptions, and sensitive scan logging.

## 27. Secure file preview, download, export, and sharing

Implement typed service for purpose-bound authenticated download grants:

- permission check at grant and fetch
- classification, MIME/size/checksum, expiry, watermark/share policy
- encrypted temporary/offline storage if allowlisted
- safe native preview for supported formats
- content-disposition and malicious active-content restrictions
- share sheet disabled by default and enabled only by server policy
- screenshot/clipboard restrictions where justified and supported
- revocation/purge and access receipt

Never expose raw object keys/permanent signed URLs or hand sensitive files to uncontrolled apps. Explain that screen-capture blocking is partial and platform-dependent.

## 28. Foreground location abstraction

Create location service requiring:

- explicit foreground user action/purpose
- server feature/role policy
- just-in-time OS permission
- precision minimized to purpose
- visible active indicator and stop control
- limited retention and no general analytics trail

No continuous/background tracking by default. Prompt 25 vehicle GPS comes from vehicle/provider, not the user's personal phone unless a separately approved future policy exists.

Location denial must not block unrelated features and should offer manual/authorized alternatives. Never collect location for attendance, visitor, hostel, or employee surveillance merely because hardware allows it.

## 29. Background task abstraction

Implement a scheduler interface honoring iOS/Android limits for:

- bounded sync of allowlisted non-sensitive collections
- mutation queue replay when policy permits
- upload continuation where platform supports it
- push token refresh/maintenance
- cache expiry/purge

Background execution is opportunistic, never guaranteed. The server remains authoritative for deadlines, timeouts, reminders, and official actions.

Do not use endless services, wake locks, aggressive polling, covert location, or battery-heavy work. Provide foreground/manual recovery.

## 30. Screen capture, clipboard, and app-switcher privacy

Define screen classification and policy for ordinary, personal, sensitive, highly restricted, and prohibited-mobile content.

Use Android secure-window/iOS supported obscuring/app-switcher snapshot protection for justified screens while documenting limitations. Do not imply iOS or external cameras can be fully blocked.

Disable copy/share selectively for tokens, confidential documents, question content, payslips, grievance/watch-list/appraisal/IP screens according to policy. Avoid globally breaking accessibility/productivity.

Clear sensitive temporary clipboard content where platform permits without relying on it for security.

## 31. Root/jailbreak, emulator, debugger, and attestation boundary

Provide a pluggable risk signal and optional platform attestation interface. Record signal type/version/reliability/server decision—not raw invasive device inventory.

Tenant policies define warn, require online, disable offline cache, require step-up, block selected highly sensitive feature, or support appeal/alternative device.

Never make academic/employment/disciplinary decisions solely from device-risk signals. Development/emulator builds are clearly separated from production.

## 32. Certificate and network security

Require TLS and platform network-security settings that block cleartext production traffic. Validate API/OIDC hosts and prevent user-controlled base URLs in production.

Do not implement unsafe certificate acceptance. Certificate pinning is optional only with multi-pin rotation, remote/config emergency recovery, operational ownership, and documented expiry; otherwise rely on platform trust plus strong TLS/server controls.

Protect against proxy leakage in production logs, redirect downgrade, open redirect, mixed content/WebView injection, and DNS/captive portal assumptions.

## 33. Privacy-safe logging, analytics, and crash reporting

Implement structured local logger with build-time/runtime levels, automatic redaction, bounded ring buffer, and user-controlled support export preview.

Never log tokens, authorization headers, cookies, PII, contact/address, tenant-sensitive IDs, API bodies, answers, marks, payments, documents, URLs with parameters, location, device tokens, or cryptographic material.

Create provider-neutral analytics/crash interfaces disabled or local-only in development until configured. Event catalogue uses allowlisted low-cardinality names/properties and consent/legal basis. No screen recordings/session replay by default.

Crash attachments exclude database, screenshots, network bodies, and sensitive breadcrumbs. User support diagnostics require explicit preview/consent where policy permits.

## 34. Accessibility foundation

Create accessible native primitives for:

- typography with Dynamic Type/font scaling and sensible truncation
- touch targets, focus order/management, labels/hints/roles/states
- screen-reader announcements for loading/offline/sync/conflict/success
- keyboard/switch access where applicable
- high contrast, non-color-only status, reduced motion
- accessible forms/errors, lists/tables/cards, dialogs/sheets, calendars, charts alternatives
- RTL mirroring and bidirectional text safety

Test TalkBack and VoiceOver configurations in valid environments. Do not disable font scaling to preserve layouts.

Every device flow—permission, camera, scan, biometric, document, forced update—has an accessible alternative or truthful restriction.

## 35. Localization and formatting foundation

Implement English resources plus extraction/locale architecture for Telugu, Hindi, and additional tenant-approved locales.

Use stable keys, ICU plural/select, safe interpolation, locale fallback, RTL, localized server messages via codes, and date/time/number/currency formatting. Do not concatenate sentences.

Keep legal/privacy/emergency text versioned from server where appropriate and cache only approved locale versions.

Test long translations, mixed scripts, missing keys, RTL, timezone/DST, Indian numbering formats where configured, and accessible pronunciation/labels.

## 36. Consistent mobile states and recovery

Implement reusable screens/components for:

- loading/skeleton
- empty and filtered-empty
- offline/no cached data
- cached/stale with as-of time
- syncing/queued/blocked/conflict
- partial/incomplete
- unauthorized/forbidden/not found without existence leakage
- context/session/device revoked
- module disabled/read-only
- maintenance/provider degradation
- minimum version/forced update
- storage low/corruption/recovery reset
- fatal error/support reference
- success/authoritative receipt

Recovery actions are safe/idempotent, preserve allowed drafts, and never loop endlessly.

## 37. Minimum version, maintenance, and emergency disable

Consume authenticated remote policy for minimum/recommended versions, platform/store URL allowlist, maintenance, feature kill switches, compromised app/build, and message.

Recommended update is dismissible according to policy. Mandatory update blocks only after configuration verification and preserves/purges queued work safely. Never force update mid-official assessment/action without an approved emergency path.

Emergency disable can block vulnerable features/device services while retaining help/logout/safe receipt/status access. Cache cannot override a newer server disable.

## 38. Performance and resource budgets

Set measurable budgets for cold/warm start, role shell render, navigation, API/sync latency, JS/UI thread responsiveness, memory, encrypted DB size/query, battery, network bytes, image/document handling, and application binary size.

Use lazy feature loading, list virtualization, image variants, cancellation, bounded cache/queue, memoization only where measured, and native performance tooling.

Measure representative low/mid Android hardware and current supported iOS simulator/device environments. Do not claim results not measured.

## 39. Android project and platform requirements

Configure current supported Android SDK/Gradle/Kotlin/Java toolchain consistent with React Native and repository standards. Include:

- application ID/flavors/build types
- network security config
- intent/app links and verified domains
- permissions minimized and contextual
- notification channels
- secure backup/extraction rules
- ProGuard/R8 and native symbols mapping
- signing placeholders through CI secret references, never keys
- edge-to-edge/safe areas, accessibility, deep links, background work
- emulator/device smoke configuration

Release build must not include dev menu, mock server, cleartext, test credentials, verbose logs, or debugging flags.

## 40. iOS project and platform requirements

Configure current supported Xcode/iOS/Swift/CocoaPods or selected dependency path consistent with React Native:

- bundle IDs/configurations/schemes
- Keychain groups and data protection
- Associated Domains/universal links
- permission usage strings tied to actual capabilities
- push/background modes only when required
- ATS security
- privacy manifest/required-reason API review as applicable
- app-switcher privacy and protected files
- signing/provisioning placeholders through secure CI
- simulator/device test configuration

State explicitly: macOS/Xcode is required for an authoritative iOS build/test/archive. Linux CI may typecheck/test shared JS but cannot be reported as iOS build validation.

## 41. Role-feature matrix

Create or comprehensively update `docs/mobile/ROLE_FEATURE_MATRIX.md` with one row per role/capability including:

- role/persona and authoritative backend permissions
- planned/implemented screens and routes
- mobile-first/high-frequency actions
- web-first restrictions and reason
- read-only/no-access states
- offline read/write allowlist and maximum age
- device capabilities/permissions
- sensitive data/cache/screenshot/share policy
- deep links/push events
- required step-up/receipt
- Android/iOS implementation and test status
- owning prompt/feature and remaining work

Every PRD role must appear. Foundation shells must be marked `FOUNDATION_ONLY` or `PARTIAL`, never `COMPLETE`, unless evidence proves the entire role journey.

Add automated validation that every compiled role identifier exists in the matrix and navigation registry and that completion claims link to tests.

## 42. Backend/API changes

Only add backend changes necessary for Prompt 27 foundation and consistent with Prompt 26 contracts:

- mobile bootstrap/config/minimum-version
- memberships/context selection/current entitlements
- device installation/register/revoke/list
- session/logout/logout-all/revocation/status
- step-up challenge/complete/status
- sync collection/delta/reset and mutation receipt/status
- deep-link/message resolution
- privacy-safe support diagnostics receipt

Do not create mobile-only business logic or broad super-endpoints. Use role-shaped DTOs, RLS, ETags, cursors, idempotency, RFC 7807, server time, rate limits, and OpenAPI generation.

Every new table is tenant scoped where applicable, forced RLS, least privilege, indexed for predicates, and tested for cross-tenant/device/user/role denial.

## 43. Mobile threat model

Update threat model for:

- stolen/lost/shared device and local session exposure
- token theft/refresh race/replay and deep-link interception
- insecure local storage/backup/screenshot/clipboard/share/export
- rooted/jailbroken/debugged/repackaged app and false-positive handling
- malicious app links/custom schemes/open redirect
- API MITM/cleartext/unsafe pinning/proxy logs
- device/push token reassignment and notification leakage
- cross-account/tenant/role/dependent cache/queue/navigation leakage
- offline replay, conflict abuse, stale permission, cursor/tombstone attacks
- database key loss/corruption/migration downgrade
- camera/document/QR/barcode/file/location abuse
- WebView/JS injection and supply-chain/native dependency risk
- analytics/crash SDK data exfiltration
- remote-config/forced-update/kill-switch compromise
- reverse engineering and embedded secrets

Apply defense in depth, least privilege, server authority/RLS, secure storage, encryption, scope partition/purge, short tokens/rotation, PKCE, step-up, signed/opaque references, code/dependency scanning, release signing, integrity signals with limitations, remote revoke, rate limits, audit, and incident response.

Document residual risk and do not promise perfect device trust or screen-capture prevention.

## 44. Testing strategy

Add unit, component, contract, integration, native, security, accessibility, and end-to-end foundation tests.

At minimum test:

- strict typecheck/lint and generated-client drift
- bootstrap state machine: cold/warm/background/process death/config/database/network/session states
- OIDC PKCE state/nonce/verifier/redirect/cancel/replay/error
- secure storage, token rotation single-flight/crash recovery, logout/logout-all/revocation/wipe
- biometric opt-in/lockout/enrollment change/fallback and no false server-step-up
- context/tenant/role/dependent switch cancellation, cache/queue/navigation purge, and background isolation
- entitlements/minimum version/maintenance/emergency disable and signed-cache expiry
- navigation/deep links authentication/scope/expiry/replay/open-redirect/unavailable behavior
- API retry/idempotency/ETag/RFC 7807/server-time/redaction
- encrypted DB migration/integrity/corruption/low disk/quota and per-scope isolation
- offline allowlist/prohibited canary/cache expiry/purge
- partial sync pagination/tombstone/cursor expiry/reset/crash transaction/context revoke
- mutation queue ordering/dependencies/backoff/cancel/duplicate/reorder/conflict/expiry and online-only refusal
- push permission/register/token refresh/account switch/logout/revoke/generic payload/deep link
- camera/document permission/EXIF/size/type/temp deletion/upload receipt
- QR/barcode malicious payload/replay/cross-context/server receipt
- secure file grant/preview/share/screenshot policy/revoke/purge
- location foreground purpose/precision/stop/denial/no background tracking
- background scheduling limitations/battery bounds
- logger/analytics/crash canary redaction and disabled provider
- accessibility primitives/Dynamic Type/TalkBack/VoiceOver configuration/RTL/long text
- forced update and queued-work recovery
- Android debug/release emulator smoke and manifest/security assertions
- iOS shared tests and simulator configuration; actual macOS build/test results only if run on macOS
- every role navigation registry/matrix/shell coverage and honest status
- backend device/context/sync/deep-link endpoints, RLS, IDOR, and revocation

Introduce Appium 2 or Maestro-ready cross-platform architecture based on ADR. Keep selectors/accessibility IDs stable and semantic.

Required end-to-end foundation journeys:

1. Fresh Android/iOS user signs in through system-browser PKCE, selects institution/role, reaches authorized shell, and registers device/push status.
2. Same account switches tenant/role/dependent; prior context cache, queue, navigation, notification, and background work cannot leak.
3. App syncs allowlisted data, goes offline, stores an allowed draft/mutation, reconnects, reconciles ETag conflict, and displays server receipt.
4. App refuses an online-only high-risk action offline and preserves no false-success state.
5. Authorized push resolves through inbox/deep link; revoked/expired/cross-context link lands safely.
6. Camera/document and QR/barcode flows request permission at use, remove unsafe metadata, upload/resolve through server receipts, and purge temporary data.
7. Server revokes session/device/membership; app stops work, wipes prohibited context data, and routes safely.
8. Minimum version/maintenance/emergency disable works without losing allowed drafts or bypassing server policy.
9. Every PRD role can authenticate into a real entitlement-aware shell or receives an explicit secure no-access state; none is falsely marked complete.
10. Accessibility/localization/low-bandwidth/error/offline states work across Android and valid iOS environments.

Run repository-standard checks plus exact relevant commands for workspace install/lockfile integrity, TypeScript, lint, unit/component tests, Android Gradle debug/release compile/lint/unit/instrumented/emulator smoke where available, iOS pod/build/test/simulator only on macOS, OpenAPI generation/diff, backend tests/RLS, dependency/license/SBOM/secret/native/container/IaC scans, accessibility, bundle/performance budgets, and E2E fixtures.

Report every command, environment, exit code, skipped/unavailable check, and evidence. Never claim Android/iOS build success unless the corresponding native build actually passed in a valid environment.

## 45. CI/CD foundation

Add CI stages for:

- dependency install with lockfile
- generated API drift
- typecheck/lint/unit/component
- Android build/lint/unit and emulator smoke on supported runner
- iOS build/unit/simulator on macOS runner
- native dependency/license/vulnerability/SBOM/secret scan
- mobile configuration/manifest/entitlement/privacy assertions
- Maestro/Appium foundation smoke
- artifact checksums and retention

Do not configure store publishing in this prompt. Signing/archive/upload credentials remain secure placeholders and future workflow gates.

CI must make unavailable macOS/iOS validation explicit, not silently green. Branch protection requires the appropriate platform jobs before release-bound merges.

## 46. Developer setup and troubleshooting

Document reproducible prerequisites and commands for macOS/Windows/Linux Android development and macOS iOS development:

- Node/package manager and Java/Android SDK
- Xcode/CocoaPods or selected iOS dependency system
- emulator/simulator/device
- environment/public configuration
- OIDC redirect/app/universal link setup
- local API and test identity/provider adapter
- push/camera/scan/file/location testing
- encrypted DB reset/migration
- network proxy debugging with sanitized non-production data
- common Gradle/Metro/native build issues

Never require developers to share production credentials or disable TLS/security globally.

## 47. Seed and test fixtures

Create synthetic, deterministic, production-disabled fixtures for:

- several institutions/roles/dependents and entitlement/module combinations
- active/revoked/expired sessions and devices
- bootstrap/minimum-version/maintenance/emergency-disable states
- inbox/work queue/calendar/search shell data
- sync pages/tombstones/cursor expiry/conflicts/mutation receipts
- push/deep-link/camera/document/QR/barcode/file/location provider test doubles
- each role shell and secure no-access state

Use no real people, tokens, provider credentials, device identifiers, push tokens, documents, locations, or external calls.

## 48. Documentation and completion gate

Update:

- mobile architecture/React Native choice ADR
- mobile security/threat/data-flow model
- generated API/compatibility/deprecation policy
- authentication/session/PKCE/rotation/step-up/device/context specification
- encrypted storage/offline allowlist/sync/mutation/conflict/purge specification
- navigation/deep-link/push specification
- camera/document/QR/barcode/file/location/background service contracts
- design-system/accessibility/localization guide
- privacy-safe logging/analytics/crash guide
- Android/iOS environment, build, signing-placeholder, and CI guide
- performance/resource budgets
- `docs/mobile/ROLE_FEATURE_MATRIX.md` covering every role honestly
- developer setup/troubleshooting and security/session/cache incident runbooks

Completion requires all of the following:

1. A real React Native + TypeScript strict workspace supports Android and iOS and is not a WebView wrapper.
2. System-browser OIDC authorization code with PKCE, secure Keychain/Keystore storage, refresh rotation, logout/all-device revocation, local biometric unlock, and server-bound step-up are functional and tested.
3. Tenant/institution/campus/role/dependent switching is backend-authorized and prevents cache/queue/navigation/push/background leakage.
4. Entitlements, minimum version, maintenance, and emergency-disable configuration are authenticated, versioned, fail-safe, and cannot grant offline permission.
5. Encrypted per-context storage, explicit offline allowlist, partial sync/tombstones, durable idempotent mutation queue, ETag conflicts, purge, and server receipts are implemented and tested.
6. Push, deep links, camera/document, QR/barcode, secure files, foreground location, background tasks, screen privacy, risk signals, and observability exist behind typed native interfaces with honest platform limitations.
7. Accessibility, localization/RTL, application states, low-bandwidth behavior, privacy-safe logs, and performance budgets pass environment-available tests.
8. Every PRD role has a real entitlement-aware shell or explicit secure no-access state and a complete traceable matrix entry; foundation shells are not falsely reported as completed role interfaces.
9. Android native builds/tests/emulator smoke pass in a valid Android environment; iOS build/test status is reported only from a valid macOS/Xcode environment.
10. Backend mobile foundation endpoints use RLS, source authorization, idempotency, ETags/cursors, rate limits, revocation, and negative tenant/user/device/role tests.
11. CI, dependency/security/SBOM/secret scans, documentation, ADRs, runbooks, and all available verification pass.
12. No production credentials/provider sends, app-store publication, fake native validation, or prohibited sensitive offline data was introduced.
13. Prompt 28 Student, Parent/Guardian, Faculty, and Mentor production mobile vertical slices were not implemented or falsely marked complete.

Provide the standard completion report covering implementation summary, changed files, workspace/architecture, Android/iOS status, authentication/session/security, contexts/roles/entitlements, navigation/deep links, API transport, encrypted DB/offline/sync/queue/conflicts, native device services, accessibility/localization/states/performance, every role shell/matrix status, backend contracts/migrations/RLS, CI and all exact test/scan commands/results/exit status, docs/ADRs/runbooks, limitations/unavailable macOS/provider/device evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(mobile): establish secure React Native offline foundation`

Stop. Do not begin Prompt 28 or implement/claim complete Student, Guardian, Faculty, or Mentor domain mobile experiences.
```

---

## Review Checklist Before Prompt 28

- The mobile app is true React Native for Android/iOS, not a WebView wrapper.
- PKCE, token rotation, secure storage, session/device revocation, local biometrics, and bound step-up are tested.
- Tenant/role/dependent switching cannot leak navigation, cache, queue, push, or background state.
- Offline data is explicitly allowlisted, encrypted, bounded, versioned, purgeable, and server-reconciled.
- Online-only consequential actions cannot show false success offline.
- Deep links, push, camera/document, QR/barcode, files, location, and background services have typed secure abstractions.
- Logs/crashes/analytics contain no secrets or sensitive domain data.
- Accessibility, localization, low-bandwidth states, and performance budgets pass available tests.
- Every PRD role appears in the shell registry and traceable role-feature matrix with an honest status.
- Android evidence is real; iOS success is claimed only from macOS/Xcode evidence.
- No Prompt 28 role vertical slice is falsely reported complete.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 28 until these conditions pass.
