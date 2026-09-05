# Claude Code Prompt 31

## Mobile Quality, Appium/Maestro Regression, Store Release, and Operations

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React Native + TypeScript native Android/iOS, Java 21 + Spring Boot 3 APIs, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–30 passed, were reviewed, and were committed  
**Scope:** Evidence-based mobile coverage audit, native Android/iOS regression, device compatibility, accessibility, performance, security/privacy, signing and release engineering, internal distribution readiness, staged rollout controls, and operational runbooks

---

## Prompt to Paste into Claude Code

```text
You are the principal mobile quality, security, and release engineer continuing the Engineering College and Autonomous Institution Operating Platform.

This prompt hardens the complete native Android/iOS application built in Prompts 27–30. It does not authorize production deployment or public app-store publication.

Before editing:

1. Read the entire `docs/product/PRD.md`, especially all mobile requirements, the complete role-persona matrix, privacy/security/accessibility/localization/offline/NFR sections, and every acceptance criterion relevant to native Android/iOS.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, all mobile ADRs and threat models, API compatibility policy, design system, Prompts 27–30 completion reports, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
3. Inspect all actual mobile code, native Android/iOS projects, generated API clients, test suites, build scripts, CI workflows, dependency locks, signing configuration templates, environment configuration, privacy manifests, data-safety documentation, telemetry, feature flags, minimum-version/maintenance controls, and runbooks.
4. Inspect backend OpenAPI, authentication/session/device registration, push/deep-link, file/document, payment, offline/sync, audit/receipt, RLS, rate-limit, feature/module, maintenance, release-compatibility, and revocation contracts.
5. Run Git status and all existing backend/web/mobile verification. Preserve valid work and user changes. Do not re-scaffold the application or replace proven tooling without a documented ADR and migration.
6. Confirm Prompts 00–30 passed, were reviewed, and were committed. If any prerequisite is missing, report exact evidence and stop with `Completion gate: FAILED`.

Hard rules:

- Test the true React Native Android and iOS applications. Responsive web, browser device emulation, screenshots, mocks alone, or static code review do not satisfy native evidence.
- Use deterministic automation for release gates. AI may help discover or propose tests, but AI-generated judgment cannot autonomously approve, sign, publish, promote, or roll back a release.
- Never fabricate Android/iOS, physical-device, macOS, signing, provider, push, biometric, camera, location, payment, performance, security, store-review, or publication evidence.
- Never place signing keys, certificates, profiles, passwords, API secrets, production tokens, or store credentials in source control, logs, artifacts, screenshots, or test reports.
- Never weaken production security, RLS, TLS, certificate policy, root/jailbreak controls, device binding, step-up, audit, or privacy to make tests pass.
- Do not publish to Google Play or Apple App Store, promote a production rollout, contact reviewers, or execute destructive rollback without authenticated authority and explicit separate deployment permission.
- Do not implement Prompt 32 analytics/search/AI scope.

## 1. Establish the mobile release-quality baseline

Create a machine-readable release-quality configuration defining:

- application identifiers, schemes/flavors, build types, bundle IDs, version/version-code policy, and supported environments
- supported Android/iOS versions and device classes
- required CI jobs and blocking/nonblocking policy
- test shards, retries, quarantine rules, flake thresholds, and evidence retention
- functional, accessibility, security, performance, crash, ANR/hang, compatibility, and privacy gates
- required manual reviews and named approval classes, never hard-coded people
- release channels: local, CI, internal QA, UAT/pilot, Play internal/closed, TestFlight internal/external, staged/phased production
- artifact provenance, checksum, signature, SBOM, source revision, dependency lock, and environment metadata

Configuration changes require review. Fail closed when a required gate or evidence source is missing.

## 2. Audit complete PRD-to-mobile traceability

Audit every PRD role against Prompts 27–30 and the actual repository. Update `docs/mobile/ROLE_FEATURE_MATRIX.md` with:

- role/persona and context
- Android/iOS route and screen
- supported actions and authoritative APIs
- field/action authorization and forced-RLS evidence
- offline/read/cache/mutation policy and retention
- push/deep-link/device capabilities
- sensitive-data controls
- accessibility/localization states
- web-first/controlled-device restriction and secure handoff
- unit/component/contract/E2E/security test IDs
- Android/iOS device evidence and timestamp/source revision
- implementation status: not-started, partial, blocked, tested, release-ready

No role is complete because a dashboard, route, placeholder, screenshot, or web handoff exists. A required mobile-first journey needs working real-API implementation and executable evidence on both platforms.

## 3. Enforce bidirectional requirements traceability

Create stable IDs linking PRD requirements -> role matrix -> source components -> API operations -> test cases -> CI results -> release evidence.

Add checks that fail when:

- a required role/action has no route, API, or test
- a route is absent from the role matrix
- an API used by mobile is absent from generated clients or compatibility tests
- an offline mutation lacks reconciliation/idempotency/conflict tests
- a sensitive screen lacks privacy/security cases
- an allowed web-first exception has no rationale and secure handoff
- evidence refers to a different source revision/build

Generate a human-readable coverage report without exposing sensitive fixture data.

## 4. Testing toolchain decision and architecture

Standardize the existing native E2E tooling. Prefer one primary high-level framework rather than duplicating every journey:

- Maestro for readable cross-platform critical journeys when it reliably covers the application/device features
- Appium 2 with UiAutomator2 and XCUITest for complex native integrations, provider/device labs, advanced gestures, system dialogs, and gaps Maestro cannot cover

Using Maestro plus a bounded Appium layer is acceptable with a documented responsibility split. Pin tool/driver versions, validate compatibility, and provide one command interface for local and CI execution.

Do not replace an already reliable repository standard merely for preference. Record an ADR for tool selection, limitations, locators, synchronization, sharding, artifacts, and provider abstraction.

## 5. Testability contract and stable locators

Add semantic accessibility identifiers/test IDs to interactive and status elements without leaking record values. Define naming conventions and lint/check rules.

Tests must synchronize on observable application state, network-idle/domain receipt, or explicit readiness—not arbitrary sleeps. Provide deterministic clocks, fixture IDs, push inboxes, QR/barcode payloads, biometrics/location/camera adapters, payment-provider simulators, and offline/network controls only in non-production test builds.

Production builds must exclude debug menus, fixture endpoints, bypass flags, mock providers, permissive certificates, and test credentials. Add binary/config checks proving exclusion.

## 6. Layered automated test strategy

Implement and gate:

- TypeScript unit tests for reducers, hooks, state machines, formatting, validation, permission mapping, queue behavior, and privacy-safe telemetry
- React Native component/integration tests for screens, navigation, state variants, accessibility semantics, context switching, and error recovery
- native Android/iOS unit/integration tests where platform code exists
- generated-client/OpenAPI contract tests
- backend integration/security/RLS tests for mobile APIs
- Maestro/Appium native E2E for critical journeys
- visual regression only as a supplement to semantic/functional tests
- accessibility automation plus manual TalkBack/VoiceOver evidence
- performance/startup/memory/network/battery tests
- security/privacy/static/dependency/binary/SBOM/secrets checks

Define ownership, runtime budget, parallelism, artifacts, and blocking policy for each layer.

## 7. Role-based native regression inventory

Create at least one Android and one iOS critical journey for every PRD role, not merely every role group. Where multiple roles share a flow, execute it under each role’s distinct entitlements and verify denied fields/actions.

Include deeper coverage for:

- Student and Parent/Guardian
- Faculty and Mentor/Counselor
- Principal/Dean/HOD/Program Coordinator and Controller of Examinations
- examination branch/invigilator/custody/evaluator roles
- Admissions and Finance
- Transport driver/attendant/rider/guardian
- external Employer/Recruiter, Auditor, and Mentor
- Tenant Administrator and Platform Support/Security

Tests must verify real navigation, real generated-client calls to a deterministic test backend, authoritative state/receipt, audit effects, and negative authorization—not only rendered text.

## 8. Student critical journeys

Cover authentication/context, home, timetable/offline stale state, attendance/shortage, registration conflict, assignment submit, assessment controlled-device restriction, exam/hall ticket/results, document grant/expiry, payment intent/provider-return/backend reconciliation/receipt, placement registration/offer action, project/internship milestone, library, hostel, transport, service request, inbox/deep link, role switch, and revocation.

Verify no mobile recomputation or false success and no cached prohibited exam/payment/document data.

## 9. Guardian critical journeys

Cover verified relationship, dependent switching, adult-student consent/status change, permitted academic/fee/transport/hostel/library data, payment reconciliation, acknowledgement, push/deep link, revocation, and cross-dependent cache/search/navigation/notification denial.

Test forbidden confidential assessment, placement, discipline, mentor note, roommate/rider, and communication data.

## 10. Faculty and mentor critical journeys

Cover faculty timetable, offline attendance, duplicate/conflict/process death/reconciliation, teaching diary, assignment feedback, authorized marks/step-up/lock, exam duty, project review, leave, and role switch.

Cover mentor assignment/advisee scope, explainable risk, appointment, classified notes, intervention/referral/follow-up/closure, revocation, and denial of source-record edits or opaque AI decisions.

## 11. Leadership and governance critical journeys

Cover KPI source/freshness/suppression, authorized drill-down, work inbox, approval SoD/limit/version/step-up/receipt, committee recusal/quorum, emergency broadcast outbox and truthful partial delivery, role switching, and web-first policy/config/export denial.

## 12. Examination critical journeys

Cover duty invitation/window/revocation, candidate QR wrong-room/replay/expiry, room attendance/late/exit/accommodation/correction, offline process death and item-level reconciliation, incident evidence retention, packet custody duplicate/out-of-order/count mismatch/dual handoff, practical rubric limits/final lock, and paper-setter confidential-content denial.

Use synthetic cycles/candidates only. Validate no confidential paper/answer-key content enters mobile artifacts, caches, screenshots, logs, or push payloads.

## 13. Admissions, finance, and HR critical journeys

Admissions: consent/do-not-contact, enquiry duplicate, assignment-scoped applicant search, PII masking, document capture/OCR-not-authority/verification SoD, offer/onboarding status, and mass-allocation denial.

Finance: ledger scope, collection intent, untrusted provider return, delayed/duplicate/spoofed callback, reconciliation, receipt, concession/refund self-approval/limit/stale state/step-up, and bank/bulk/accounting denial.

HR: employee field projection, department/manager scope, attendance correction, leave server balance, recruitment panel isolation, onboarding document expiry, workload/appraisal confidentiality/SoD, and payroll/configuration denial.

## 14. Quality, placement, and external-party journeys

Cover IQAC framework/criterion/auditor scope, evidence version/redaction/SoD, corrective action, expired auditor purge, and formula/source-data denial.

Cover placement eligibility authority, consent, drive attendance sync, panel isolation, stage/offer truth, training, project/IP scope, external mentor expiry, employer minimum candidate projection, document access audit, broad-export denial, and cache/session purge at expiry.

## 15. Campus-operations journeys

Cover:

- Library: borrower QR, concurrent issue/return/renew/reserve, fine payment truth, lost/damaged, stock count duplicates/conflicts, OPAC/license restriction
- Hostel: resident/room scope, check-in/out, out-pass approval versus gate event, roll call, guardian privacy, visitor, incident/evidence, offline gate reconciliation
- Transport: trip lifecycle, driver moving-state restrictions, location permission/visibility/off-trip stop, stale ETA, boarding/alighting duplicate/wrong-trip/missing rider, SOS and trip close
- Visitor: invitation replay/expiry, host approval, identity/OCR-not-authority, watch-list escalation denial, offline expected list, badge, check-out, emergency roll call, evidence retention
- Facilities/assets/stores: work-order version/state, custody dual acknowledgement, stock reconciliation, calibration safety approval, evidence upload, and master-data denial

## 16. Tenant and platform administration journeys

Cover access review/self-certification denial, specific session/device revocation, integration health, maintenance/release read-only status, support-access approval/shorten/revoke/expiry, and secret/permission-architecture denial.

Platform support/security tests must prove no implicit tenant-record access, purpose/scope-limited access only after a valid grant, automatic expiry, cache purge, break-glass audit, emergency-control dual approval, blast-radius confirmation, and denial of shell/SQL/cloud/secrets/deployment controls.

## 17. Native Android matrix

Define supported Android API levels based on current security support, institutional device reality, React Native compatibility, and store policy. Include representative:

- low-tier constrained-memory/storage device
- mid-tier mainstream device
- high-tier current device
- phone and tablet/form factor if the product supports tablets
- manufacturer/API combinations relevant to background work, battery optimization, camera, biometrics, notifications, and location

Run emulators plus physical/device-farm coverage for hardware-sensitive journeys. Record model, OS/API, ABI, locale, font scale, orientation, network, build checksum, source revision, and result.

## 18. Native iOS/iPadOS matrix

Define supported iOS versions and representative older-supported, mainstream, and current iPhone classes; add iPad when supported by declared product requirements.

Run simulator coverage on macOS and physical/device-farm coverage for camera, biometrics, push, background location, keychain, protected data, and lifecycle behavior. Record device, OS, locale, Dynamic Type, orientation, build checksum, revision, and result.

Do not claim iOS build/test/signing evidence from Linux or browser emulation. Missing macOS/device evidence blocks the applicable release gate and must be reported exactly.

## 19. Device-farm provider abstraction

If using Firebase Test Lab, AWS Device Farm, BrowserStack, Sauce Labs, or another provider, create a provider-neutral test runner interface for artifact upload, device selection, sharding, status, logs, videos/screenshots, retention, retries, and cost limits.

Do not hard-code vendor credentials. Apply concurrency, duration, retry, and budget caps. Sanitize artifacts and use synthetic data. A provider outage produces an explicit blocked state, not a pass.

## 20. Test environments and deterministic fixtures

Provision isolated ephemeral or resettable test tenants with synthetic roles, assignments, workflows, payments, exams, trips, visitors, assets, and support grants. Seed through supported APIs/migrations, not direct production-like database mutation unless a test-only harness is documented.

Every run has unique namespace, fixed clock where appropriate, cleanup/TTL, and no external messages/payments/location tracking. Parallel tests cannot share mutable identities or state. Production endpoints and credentials are forbidden.

## 21. Offline, reconnect, and synchronization matrix

Test every allowlisted offline workflow for:

- start offline and lose network mid-action
- duplicate tap/event and replay
- out-of-order events and clock/time-zone change
- ETag/version conflict and server-side state change
- app background, force-stop, process death, reboot, upgrade, and reinstall
- token/session/assignment/consent expiry and remote revocation
- queue cap, low storage, corrupt record, encryption/key rotation, and retention expiry
- partial batch acceptance/rejection and manual resolution
- tenant/role/dependent/trip switch with pending events

The UI must never show queued as server-complete. Unresolved work remains visible without leaking into another context.

## 22. Network and backend-failure testing

Automate offline, airplane mode where supported, DNS failure, TLS failure, captive-portal-like response, latency, jitter, bandwidth constraint, packet loss, timeout, connection reset, 401/403/404/409/412/422/429/5xx, maintenance, degraded dependency, and stale read-model scenarios.

Verify bounded retry with jitter, circuit behavior where applicable, cancellation, pagination recovery, upload resume, no retry storm, truthful state, and support diagnostics without secrets/PII.

## 23. Application lifecycle and storage pressure

Test foreground/background/suspended/terminated/relaunched behavior, OS reclaim, rotation/multitasking, protected-data unavailable state, device lock/unlock, low memory, low storage, cache eviction, database migration, app upgrade/downgrade policy, and corrupted local storage recovery.

Sensitive screens must not appear in app switcher snapshots where policy requires. Temporary files, expired grants, queues, keys, and caches follow retention/purge rules.

## 24. Authentication, session, and device security

Test login/SSO/MFA, biometric enable/disable/failure/fallback, device registration, session renewal, inactivity, absolute expiry, password/account change, remote logout, device revocation, step-up freshness, rooted/jailbroken risk response, and multi-account/context switching.

Verify tokens remain in approved secure storage, never logs/URLs/backups, and are cleared on logout/revocation. Device integrity is a risk input and never the sole authorization.

## 25. Push notification regression

Create a matrix for Android/iOS and application killed/background/foreground states covering permission not-determined/granted/denied/revoked, token rotation, reinstall, multiple devices/accounts, tenant/role/dependent context, notification categories/actions, generic lock-screen content, duplicate/out-of-order push, expired item, revoked access, and notification tap after logout.

Push is a hint, never domain truth. The app resolves opaque references through current backend authorization and refreshes authoritative state.

## 26. Deep-link and universal/app-link regression

Test verified Android App Links and iOS Universal Links plus internal routes for cold/background/foreground states, malformed/oversized/fuzzed URLs, unsupported versions, wrong tenant/role/dependent/assignment, expired/revoked resources, encoded redirect attempts, replay, and unauthenticated login-return.

No open redirect, token in URL, existence leak, or stale sensitive back-stack. Failed links land on a safe explainable screen.

## 27. Camera, documents, QR, barcode, and RFID

Test permission lifecycle, no-camera device, camera-in-use, poor light, blur, rotation, large image, malicious/invalid file, interrupted/resumed upload, metadata removal policy, checksum, malware/processing status, temporary-file cleanup, screenshot/share policy, and manual accessible fallback.

Test QR/barcode/RFID wrong type/context, replay, expiry, duplicate, offline unverifiable, device capability absence, and scan-throttling. Never use real IDs or claim RFID evidence without supported hardware/provider.

## 28. Location and transport safety

Test foreground/background/precise/approximate/denied/revoked permission, GPS unavailable, mocked/spoof-risk signal, stale/low-accuracy location, battery optimization, app kill/restart, trip start/end, assignment revocation, logout, and retention cleanup.

Prove location begins only for an authorized trip/purpose, remains visibly indicated, and stops reliably at every boundary. Test driver moving-state suppression, false/missing speed input, navigation handoff, SOS accessibility, and no typing/nonessential interaction while moving.

## 29. Payment and external-provider simulation

Use deterministic provider simulators/contracts for success, cancel, failure, timeout, delayed/duplicate/out-of-order/spoofed callback, webhook signature failure, reconciliation delay, partial settlement, app killed during return, and receipt retrieval.

Provider return never defines success. Verify no raw card/bank credential capture, correct pending recovery, backend-authoritative receipt, idempotency, and audit. Do not call real providers or move funds.

## 30. Accessibility automation

Add automated checks for semantic roles/names/states, unique labels, focus order, touch targets, contrast where reliably measurable, font scaling/layout, keyboard/switch paths where supported, error association, live-region announcements, non-color state, reduced motion, and accessible scan/manual fallback.

Fail release gates for critical/high accessibility defects. Store evidence linked to screen/role/test IDs.

## 31. Manual TalkBack and VoiceOver protocol

Create repeatable scripts for trained manual testing with Android TalkBack and iOS VoiceOver across authentication, role switch, home/inbox, form validation, approval confirmation, offline/conflict, scanning fallback, payment, exam attendance, transport/SOS, document upload, and logout.

Record device/OS/build, tester role identifier, steps, results, defects, and remediation without recording sensitive synthetic values. Manual evidence supplements but does not replace automation.

## 32. Localization, RTL, time, and regional formats

Test every supported locale plus a pseudo-locale and RTL locale for clipped/untranslated strings, mirrored layout, navigation/icons, names/addresses, Unicode input, pluralization, dates, times, time zones, academic years, numbers, percentages, currencies, file sizes, and sorting/search.

Test device clock skew, DST, time-zone changes during queued events/exams/trips, server-time display, and monotonic event ordering. Mobile must not become the authority for official timestamps.

## 33. Visual and UX regression

Use deterministic screenshot comparison for stable representative states across phone/tablet sizes, light/dark mode if supported, font scales, locales/RTL, loading/empty/error/offline/stale/conflict/revoked/disabled states, keyboard, safe areas, and orientation.

Mask truly dynamic synthetic values through stable fixture design, not broad ignore regions. Require human review for intentional baseline changes. Visual pass cannot substitute for semantic, functional, or accessibility pass.

## 34. Performance budgets

Define measurable budgets by supported device tier for:

- cold/warm start and time to first useful role content
- navigation and interaction response
- list/search/dashboard rendering and paging
- scan-to-feedback and offline write latency
- sync throughput/backlog recovery
- image/document processing and upload resume
- memory/CPU, JavaScript/native thread stalls, dropped frames, ANR/hang
- network requests/payload/cache hit and low-bandwidth behavior
- battery use, especially background sync, push, and active-trip location
- installed/download size and binary growth

Measure p50/p95/p99 where meaningful, define warm-up/sample size, record hardware/OS/build/network, compare to approved baseline, and fail on threshold/regression rather than anecdotes.

## 35. Reliability and crash-quality gates

Set release thresholds for crash-free users/sessions, ANR/hang, fatal native/JS errors, startup failures, sync data-loss incidents, and high-priority workflow completion.

Pre-release evidence uses controlled tests and dogfood/internal channels; production targets are configuration for later monitored rollout, not invented statistics. Symbol/source-map upload must be verified without exposing source or secrets publicly.

## 36. Mobile security review

Perform and document a review aligned to current OWASP MASVS themes and repository threat models:

- architecture, authentication, authorization, session/device binding, step-up, and backend enforcement
- local data, keys, encrypted DB/files, backup, logs, clipboard, keyboard cache, screenshots/app switcher, notifications, and deletion
- network security, TLS configuration, trust store, hostname validation, certificate/pinning strategy and rotation/recovery
- IPC/deep links/WebViews/browser handoffs, file handling, serialization, QR/barcode inputs, and injection
- code quality, native bridges, third-party SDKs, anti-tamper/root/jailbreak risk behavior, debug/test surface exclusion
- privacy consent, permissions, minimization, purpose, retention, external sharing, telemetry, and user controls

Do not claim formal certification unless independently completed. Track finding severity, owner, remediation, retest, accepted risk, and approval.

## 37. Static, dependency, binary, SBOM, and secrets checks

Gate JavaScript/TypeScript and native Android/iOS SAST/lint, dependency vulnerability/license policy, lockfile integrity, malicious package indicators, Gradle/CocoaPods/SPM configuration, binary symbols/entitlements/permissions, embedded URLs/secrets, debug flags, cleartext traffic, exported components, URL schemes, and privacy-impacting SDKs.

Generate CycloneDX or repository-standard SBOMs for mobile artifacts, attest source revision/dependencies, and retain scan reports. Define severity and exception expiry policy. Never suppress findings silently.

## 38. Android security and privacy configuration

Verify manifest permissions/minimization, exported components, intent filters/App Links, network security config, backup/data-extraction rules, FileProvider/content URIs, notification channels, foreground service types, exact-alarm policy if used, package visibility, biometric/key storage, screenshots, deep links, and release debuggability.

Prepare accurate Google Play Data safety, permissions declarations, account-deletion/support URL inputs, content rating, target API, SDK inventory, advertising-ID statement, and privacy-policy mapping based on actual behavior. Do not submit them.

## 39. Apple security and privacy configuration

Verify Info.plist usage descriptions, entitlements, Associated Domains, Keychain access groups, ATS, background modes, protected files, notification categories, URL schemes, universal links, Sign in with Apple applicability, export-compliance inputs, and release debug settings.

Maintain an accurate Apple Privacy Manifest/required-reason API inventory, nutrition-label inputs, account deletion/support/privacy URLs, SDK privacy manifests, tracking declaration, and review notes based on actual behavior. Do not submit them.

## 40. Environment and API compatibility

Provide separate dev/test/staging/production configurations with compile-time/runtime validation. Production builds must reject localhost, mock endpoints, insecure HTTP, test tenant defaults, bypass headers, debug menus, and development keys.

Implement app-version/API-compatibility handshake, minimum-supported version, recommended update, forced update, maintenance mode, degraded module state, and kill switches that cannot grant privileges or bypass server security.

Test backward compatibility with the oldest supported app/API combination and safe behavior with newer unknown response fields. Breaking changes require versioning and rollout sequencing.

## 41. Reproducible Android release pipeline

Create CI that from an immutable revision and locked dependencies:

- validates gates
- builds release APK for controlled testing and AAB for distribution
- injects only approved environment configuration
- signs through protected CI secret/KMS-backed process as supported
- verifies signature, package ID, version code/name, manifest, permissions, debuggability, endpoints, symbols/mapping, SBOM, checksum, provenance, and reproducibility expectations
- stores immutable artifacts with retention/access controls

Do not generate or rotate a production keystore without explicit authority. If signing material is unavailable, produce and verify unsigned/non-production artifacts and an exact secure handoff; mark signed evidence blocked.

## 42. Reproducible iOS release pipeline

Create macOS CI that from an immutable revision and locked dependencies:

- runs native tests and archive build
- uses protected signing certificates/provisioning profiles/App Store Connect authentication only when authorized
- creates/verifies the archive and export candidate
- checks bundle ID, version/build, entitlements, privacy manifest, environment/endpoints, debug flags, dSYMs, SBOM, checksum, and provenance
- stores protected artifacts and symbols

Do not fabricate macOS/archive/signing evidence. If unavailable, provide validated project/configuration plus exact manual/CI handoff and mark the gate blocked.

## 43. Signing key and certificate governance

Document ownership, least-privilege access, separation of duties, generation ceremony, storage, backup/recovery, rotation, expiry monitoring, revocation, compromise response, and audit for Android upload/app signing and Apple certificates/profiles/API keys.

CI logs mask secret material. Pull requests from untrusted forks cannot access signing. Signing and publication require protected environments and human approval. Never print key aliases with sensitive paths/passwords or copy credentials to developer machines unnecessarily.

## 44. Versioning, release notes, and artifact provenance

Automate semantic/product version and monotonic Android/iOS build numbers under repository policy. Link release candidate to Git revision, CI run, API compatibility range, migration/release dependencies, feature flags, SBOM, checksums, test evidence, known issues, and approvals.

Generate localized user-facing release-note drafts and internal technical notes. Do not claim features unsupported by the role matrix or hide security/privacy changes.

## 45. Internal distribution and UAT readiness

Prepare controlled Android internal/closed testing and Apple TestFlight internal/external workflows with tester groups, synthetic/non-production environment policy, invitations, release notes, feedback intake, crash collection, expiry, and offboarding.

Actual upload/invitation requires authenticated accounts and explicit permission. Without it, validate commands/configuration and provide a manual checklist without claiming distribution.

## 46. Store metadata and review package

Prepare, but do not submit:

- app name/subtitle/short and long descriptions
- accurate role/use-case and institution-tenant explanation
- supported locales, categories, age/content rating inputs
- privacy/support/account-deletion URLs and contact-role placeholders
- screenshot/device-size plan using synthetic data and approved branding
- demo-account strategy with least privilege and expiry
- review notes for SSO, role access, background location, camera/QR, notifications, payments, and controlled features
- Android Data safety and Apple privacy disclosure source-of-truth mappings

Do not invent URLs, legal approvals, screenshots, credentials, or reviewer access.

## 47. Staged rollout, monitoring, and rollback/forward-fix

Define internal -> pilot/UAT -> limited production -> staged/phased expansion gates with cohort/tenant/device/OS controls, soak periods, human approvals, abort thresholds, monitoring, communication, and audit.

Mobile binaries are generally not safely rolled back after store distribution. Document server compatibility, feature/module kill switch, minimum/recommended version, staged halt, store release stop, backend forward-fix, emergency disable, and data/schema compatibility. Never use a kill switch to bypass security or strand offline events.

Do not initiate any production stage in this prompt.

## 48. Operational monitoring and runbooks

Create privacy-safe dashboards/alerts and tested runbooks for:

- release validation, promotion, halt, and recovery
- crash/ANR/hang/startup regression
- API incompatibility, forced update, maintenance, and kill switch
- push registration/delivery outage and deep-link failure
- sync backlog, duplicate/conflict, corrupt queue, and data-loss suspicion
- authentication/session/device revocation and lost/stolen device
- certificate/pinning/CA, Android key, Apple certificate/profile, and signing compromise/expiry
- sensitive-data exposure, malicious SDK/dependency, and telemetry leakage
- payment return/reconciliation issue
- transport background-location failure/off-trip collection
- app-review rejection, metadata/privacy discrepancy, and supported-version retirement

Each runbook includes detection, severity, ownership role, safe diagnostics, containment, decision/approval, communication, recovery, verification, audit/evidence, and post-incident actions.

## 49. CI/CD release gates and exact evidence

Create protected CI stages:

1. source/format/lint/type/unit/component/native tests
2. OpenAPI generation/drift/backward compatibility and backend mobile/RLS tests
3. Android/iOS build and smoke tests
4. native E2E shards and role coverage
5. offline/lifecycle/push/deep-link/device integration tests
6. accessibility/localization/visual checks
7. performance/reliability comparison
8. security/privacy/SAST/dependency/secrets/binary/SBOM checks
9. release artifact build/sign/verify/provenance
10. human release review and protected-environment approval

Publish JUnit/results, logs, sanitized screenshots/videos, device metadata, coverage/traceability, performance reports, scans, SBOMs, checksums, and provenance with retention. A retry does not erase initial failure. Quarantined tests cannot cover critical paths and require owner/expiry/reason.

Document exact local and CI commands, tool versions, exit codes, skipped/blocked checks, evidence paths, source revision, and artifact checksums. Missing required evidence fails the gate.

## 50. Completion gate

Completion requires all of the following:

1. Every PRD role has evidence-backed working Android and iOS coverage or an explicit approved web-first/controlled-device restriction; the role matrix has no unexplained gaps.
2. Requirements, source, APIs, tests, CI evidence, and release artifacts are bidirectionally traceable to one source revision.
3. Unit/component/native, backend/RLS, generated-client/API compatibility, and native E2E suites pass under documented deterministic environments.
4. At least one Android and iOS critical journey passes for every role, with deeper student/faculty/exam/finance/transport coverage.
5. Offline/reconnect/conflict/duplicate/process-death/clock/expiry/revocation/low-storage/slow-network behavior passes without data loss, leakage, or false success.
6. Push/deep links, camera/documents, QR/barcode/RFID where supported, biometrics, location, payment simulation, context switching, and lifecycle matrices pass.
7. Automated accessibility and documented TalkBack/VoiceOver checks pass; localization, pseudo-locale, RTL, large text, regional format, time-zone, and visual regression pass.
8. Performance/reliability budgets pass on representative low/mid/high device classes; regressions and unavailable physical-device evidence are reported honestly.
9. Mobile security/privacy review, secret/storage/log/clipboard/screenshot/backup/network/root-jailbreak review, SAST/dependency/binary/SBOM/secrets scans, and remediation gates pass.
10. Android Data safety and Apple privacy-manifest/disclosure inputs accurately match implemented behavior.
11. Dev/test/staging/production separation and API minimum/recommended/forced-update/maintenance/kill-switch compatibility pass without production bypasses.
12. Reproducible Android AAB and iOS archive pipelines, signing governance, artifact verification, checksums, provenance, symbols, and protected approvals are ready; unavailable signing/macOS authority is explicitly blocked rather than fabricated.
13. Internal distribution, store metadata/review package, staged rollout/halt/forward-fix, monitoring, and incident runbooks are complete and validated without unauthorized publication.
14. CI gates are protected, reproducible, privacy-safe, retry/flaky-test honest, and retain exact executable evidence.
15. No production deployment, public store publication, external tester invitation, signing-key mutation, or rollout was performed without explicit authority.
16. No test, device, provider, security, performance, signing, store, distribution, or publication result was fabricated.
17. Prompt 32 Analytics, Reporting, Search, and AI Assistance was not implemented or marked complete.

Provide the standard completion report covering implementation summary, changed files, role coverage/traceability, test architecture/tool choice, exact commands/results/exit status, Android/iOS device matrix and evidence, offline/lifecycle/push/deep-link/device/provider tests, accessibility/manual screen-reader/localization/visual evidence, performance/reliability results, security/privacy/findings/scans/SBOM, environment/API compatibility, release pipelines/signing status/artifact checksums/provenance, internal/store/staged-rollout readiness, CI gates, documentation/runbooks, blocked/unavailable macOS/device/provider/account/signing evidence, manual verification, and suggested commit message.

End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`test(mobile): harden native release quality and operations`

Stop. Do not begin Prompt 32, deploy production, publish to either app store, invite external testers, or claim store availability.
```

---

## Review Checklist Before Prompt 32

- Every PRD role has real evidence on native Android and iOS, not responsive-web or static-screen evidence.
- Requirements, APIs, code, tests, builds, and evidence are linked to one immutable revision.
- Maestro/Appium responsibilities are clear, versions are pinned, and E2E tests avoid arbitrary sleeps.
- Offline, lifecycle, network, push, deep-link, device-service, payment, role-switch, expiry, and revocation matrices pass.
- TalkBack/VoiceOver, accessibility automation, localization, RTL, large text, visual states, and regional formats are verified.
- Low/mid/high-tier device performance, memory, battery, network, crash, and ANR budgets have measured evidence.
- OWASP MASVS-aligned review, SAST, dependencies, binary, secrets, SBOM, privacy manifests, and store disclosures match reality.
- Production builds exclude mocks, debug menus, bypasses, insecure endpoints, test credentials, and permissive configuration.
- AAB/iOS archive pipelines, signing governance, checksums, provenance, symbols, and protected approvals are ready or honestly blocked.
- Store metadata, internal distribution, staged rollout, forward-fix, monitoring, and runbooks are ready without unauthorized publication.
- Human approval remains mandatory for signing, external distribution, production rollout, rollback, and store submission.
- No Prompt 32 analytics/search/AI work was implemented or falsely marked complete.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 32 until these conditions pass.
