# Claude Code Prompt 30

## Placement, Library, Hostel, Transport, Visitor, Operations, Employer, and Platform Mobile Experiences

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React Native + TypeScript Android/iOS, shared generated OpenAPI clients/contracts/design tokens/localization, Java 21 + Spring Boot 3 APIs, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–29 passed, were reviewed, and were committed  
**Scope:** Production native Android/iOS vertical slices for the remaining product roles: Placement/Training/Projects, Library, Hostel, Transport, Visitor/Security, Facilities/IT/Lab/Store/Assets, Employer/Recruiter, Tenant Administration/Institution IT, and Platform Operations/Support/Security

---

## Prompt to Paste into Claude Code

```text
You are the principal mobile engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read the complete `docs/product/PRD.md`, especially the role matrix, Sections 22.5–22.8 or current equivalents, and requirements for placement/training, internships/projects, library, hostel, transport, visitor management, facilities/assets/inventory/service desk, communications, employer access, tenant administration, platform operations, privacy, consent, safety, accessibility, localization, low bandwidth, and mobile quality.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, Prompt 27 mobile foundation ADRs, Prompts 28–29 mobile patterns and role matrix, Prompt 26 API/portal contracts, and domain implementation from Prompts 22, 23, and 25. Read IAM, tenant isolation, audit/workflow/outbox, documents, location, device, offline sync, API compatibility, and support-access policies.
3. Inspect the actual `mobile/` workspace and `docs/mobile/ROLE_FEATURE_MATRIX.md`. Verify Android/iOS builds, generated clients, entitlement/navigation registry, account/tenant/campus/role switching, authentication/session/step-up, encrypted storage, mutation queues, push/deep links, camera/QR/barcode/RFID/location/file services, accessibility, localization, privacy-safe telemetry, and tests.
4. Inspect responsive web journeys and authoritative APIs. Reuse state machines, commands, ETags, idempotency, receipts, consent, retention, assignment scope, and audit semantics. Do not recreate domain rules or shadow data stores.
5. Run Git status and existing backend/web/mobile verification. Preserve valid work. Repair contract drift before implementing new features; do not re-scaffold or replace the Prompt 27–29 foundation.
6. Confirm Prompts 00–29 passed, were reviewed, and were committed. If not, report the exact prerequisite failure and stop with `Completion gate: FAILED`.

Do not create WebView role portals, copy backend policy/calculations into mobile, invent provider/device/payment/location/delivery outcomes, weaken forced RLS, rely on hidden navigation as authorization, collect background location outside an authorized trip/purpose, expose candidate or resident data broadly, permit unrestricted exports, reveal tenant records to platform staff implicitly, put secrets/infrastructure consoles in mobile, publish to app stores, or begin Prompt 31.

Implement production vertical slices using real APIs. Every action must validate current tenant/institution/campus/role/assignment/purpose, current state/version, consent and retention, device/offline policy, and return an authoritative receipt or truthful pending/failure state.

## 1. Cross-role invariants

Enforce:

- visible and backend-validated account, tenant, institution, campus, role, assignment/site/trip/drive context, environment, and data-as-of time
- role/context switches cancel work and purge or namespace caches, queues, search, downloads, navigation, push, and device-service state
- least-privilege field/record/action projection at the backend; navigation is never authorization
- offline deny-by-default; only named field events use encrypted, expiring, idempotent queues with visible reconciliation
- high-risk actions require online validation, current ETag/version, explicit confirmation, reason, step-up when configured, audit, and receipt
- no mobile recomputation of placement eligibility/readiness, fines, dues, occupancy, ETA, route, stock, SLA, or health status
- no false success from payment/provider/device/notification/location return; show accepted, pending, delivered, reconciled, rejected, or failed accurately
- camera/QR/barcode/RFID/location/files/biometrics use secure shared abstractions, just-in-time permission, accessible fallback, and retention cleanup
- lock-screen notifications are generic and carry opaque references resolved through current authorization
- module-disabled, revoked, stale, offline, conflict, partial, empty, loading, error, and support states exist for every screen
- no PII, candidate data, route/location, room/bed, visitor ID, asset secrets, support data, or tokens in logs/analytics/crash reports

Update `docs/mobile/ROLE_FEATURE_MATRIX.md` continuously with each role, route, API, fields/actions, offline policy, step-up, device capability, sensitivity, web-first restriction, tests, and Android/iOS evidence.

## 2. Shared field-operations shell

Extend the existing mobile shell with:

- role/context header and assignment/trip/site/drive selector
- today’s duties, work queue, alerts, exceptions, and acknowledgements
- safe KPI/status cards from server aggregates
- scan-first action launcher with manual accessible fallback
- offline package/queue state, expiry, unresolved conflicts, and last-confirmed time
- secure evidence upload status
- SOS/emergency/support routes appropriate to role
- web-first handoff explaining restriction and required reauthentication

Do not preload all sites/people/assets. Fetch bounded pages and reauthorize every open. Field users see only current assignments and minimum necessary information.

## 3. Shared scanning and custody pattern

Implement one governed abstraction for QR/barcode/RFID/NFC where hardware permits:

- opaque signed/expiring token or backend lookup; never embed sensitive data
- validate token type, tenant, site, assignment, state, expiry, nonce, and replay
- distinguish valid, unknown, wrong context, expired, revoked, already processed, duplicate, and unverifiable offline
- append an idempotent event; never overwrite history
- manual code/search fallback with equivalent authorization and audit
- haptic/audio/visual feedback respecting accessibility and privacy
- authoritative receipt after server acceptance

RFID/NFC support must degrade safely when device capability is absent. Do not claim a scan changed circulation, boarding, custody, stock, or access until the domain service accepts it.

## 4. Placement officer/coordinator roles

Support Placement Head, Placement Officer, Department Placement Coordinator, Training Coordinator, and authorized interview panel member with explicit campus/program/drive assignment.

Provide role home with active/upcoming drives, employer/action status, eligible/registered counts, stage completion, attendance, exceptions, offer/joining status, training readiness, pending approvals, consent/data-sharing expiry, and work queue.

Aggregates are server-calculated, sourced, freshness-labeled, privacy-suppressed, and drill down only to authorized students.

## 5. Employer and drive pipeline

Implement:

- employer/drive summary, roles, location/work mode, compensation display policy, eligibility version, registration window, selection stages, schedule, documents, contacts, and status
- employer verification/data-sharing agreement/consent expiry indicators
- create/update only those individual operational actions already supported by domain APIs
- stage board/list with server-authorized transitions and item-level receipts
- cancellation/reschedule/correction with notification-outbox acknowledgement

Employer master creation, eligibility-rule authoring, bulk candidate imports/exports, mass stage manipulation, compensation policy, and data-sharing configuration remain web-first.

## 6. Eligibility, registration, and candidate handling

Display server-computed eligibility with rule version, inputs/as-of time, explainable reasons, consent, registration, hold, opt-out, accommodation, and dispute status.

Placement staff may review exceptions and submit governed correction/approval requests but cannot modify academic records or recompute eligibility. Candidate lists show minimum fields required for the active stage. Search, filters, counts, and opens enforce assignment and consent.

Do not expose other offers, sensitive demographics, disability/health data, marks beyond authorized criteria, or unrelated student records.

## 7. Drive attendance and stage events

Support QR/manual attendance for pre-placement talk, test, group discussion, interview, and training events:

- assignment-bound roster and event window
- present/absent/late/withdrawn/accommodation/exception events
- encrypted offline queue only when allowlisted
- idempotency, sequence, version, process-death recovery, expiry, and reconciliation
- corrections through append-only auditable commands
- reconciled counts and unresolved exceptions before closure

Stage outcome changes require server validation and receipt. Attendance must not automatically imply selection or eligibility.

## 8. Interview panel feedback

Provide assigned candidate, structured rubric, score/grade/comment, conflict declaration, recommendation, draft, review, final submit, lock, and receipt.

Panel members cannot view other feedback or protected candidate fields before policy permits. Drafts are encrypted, assignment-bound, and short-lived. Final submission is online, ETag/version checked, and step-up protected where configured. Formal correction creates history rather than overwriting.

## 9. Offers, acceptance, and joining

Implement offer status, authorized document reference, issue/expiry, acceptance/decline/withdrawal, joining date/status, verification, multiple-offer policy outcome, and follow-up tasks.

Only the authorized role may record employer-reported stages, with evidence/reference and receipt. Do not manufacture an offer from panel recommendation or provider message. Student acceptance uses Prompt 28 journeys. Bulk offer creation, package normalization rules, and unrestricted offer export remain web-first.

## 10. Trainer and training coordinator

Support batches, schedules, trainer assignments, participant roster, QR/manual attendance, content links, assessments/readiness returned by server, feedback, intervention/referral, completion, and certificate status.

Offline attendance follows the shared event pattern. Trainers see only assigned batches and minimum student data. Mobile cannot edit readiness formulas, test engines, curriculum masters, or mass allocation.

## 11. Internship/project coordinators and mentors

Support Internship Coordinator, Project Coordinator, Internal Guide, External Mentor, and authorized reviewer for assigned opportunities/projects:

- opportunity/proposal/approval status
- team/member/supervisor scope
- consent/NDA/IP classification and expiry
- plans, logs, milestones, deliverables, evidence, meetings, risks, extensions, and escalations
- rubric/review/viva feedback and completion

Do not expose restricted IP, unrelated teams, employer-confidential material, or full repository credentials. External mentor access is time-bound, assignment-bound, and immediately revocable.

## 12. Internship/project evidence and approvals

Use secure capture/upload with encrypted temporary files, classification, metadata stripping policy, checksum, resumable transfer, malware/processing status, version, and receipt.

Approval/review actions require advertised server transitions, ETag, declaration/conflict checks, reason, step-up where configured, and immutable audit. Offline evidence drafts may be allowlisted, but final submission/approval is online. Mass project setup and restricted IP exports remain web-first.

## 13. Library staff roles and home

Support Librarian and Library Assistant with scoped counter/branch/collection assignments:

- borrower lookup and status
- borrower QR validation
- circulation work queue
- holds/reservations and renewals
- overdue/fine/lost/damaged exceptions
- stock-count assignments and discrepancies
- device/RFID service status
- day/counter summary from authoritative server data

Catalog/acquisition/vendor/budget/bulk accession/classification configuration remains web-first.

## 14. Borrower lookup and circulation

Implement minimum-query/opaque-QR borrower lookup with masked identity, photo when permitted, borrower type/status, block reason, current loans, reservations, fines, and limits returned by server.

Support scan/manual issue, return, renew, reserve/hold fulfillment, cancel, and receipt. The server owns eligibility, due date, renewal count, fine, priority, and inventory state. Handle wrong branch, reference-only, reserved-for-other-user, blocked borrower, duplicate scan, already returned, damaged/lost, and concurrent circulation.

Offline circulation is prohibited by default; if an approved contract exists, events remain pending, encrypted, capped, expiring, and reconciled before representing success.

## 15. Library overdue, fines, lost, and damaged

Provide server ledger/status, evidence, reason, assessment, waiver/request workflow, payment handoff, receipt, replacement, recovery, and closure.

Never calculate fines locally or accept provider return as payment truth. Waivers require authority limits, maker-checker where configured, step-up, ETag, reason, and receipt. Photograph damage through secure temporary storage; do not save to gallery.

## 16. Library stock count and inventory custody

Implement assignment-bound shelf/range/session, expected item set or privacy-safe hashes, scan count, found/missing/mis-shelved/damaged/unknown status, pause/resume, device handoff, discrepancy review, submit, and receipt.

Offline scans are encrypted, append-only, idempotent, sequence-aware, expiring, and process-death safe. Reconciliation returns item-level accepted/duplicate/conflict/wrong-session results. Mobile cannot directly write catalog/inventory master state from a count.

## 17. Patron OPAC interface

For students/faculty and other entitled patrons, complete OPAC search, filters, item/edition details, branch availability, reservations/queue position, renewals, current loans, due reminders, digital-resource authorized links, fines, and payment handoff.

Respect publisher/license limits and never cache or share protected digital content outside approved SDK/browser handoff. Availability and queue position are server-authoritative and freshness-labeled.

## 18. Hostel warden/security roles and home

Support Chief Warden, Warden, Assistant Warden, Hostel Security, and authorized resident-services staff with hostel/block/floor assignment.

Home includes occupancy summary, expected arrivals/departures, pending out-pass/leave, roll-call status, missing/unaccounted exceptions, authorized visitors, maintenance, dues status where allowed, incidents, document expiry, and emergency actions.

Do not expose resident room/location broadly; counts and drill-downs follow assignment and privacy policy.

## 19. Resident and room lookup

Provide secure search/QR with minimum necessary identity, photo, hostel/block/room/bed, residency dates/status, emergency contact visibility by purpose, active out-pass/leave, visitor authorization, and safety alerts.

Check-in/check-out/room-change handoff uses existing workflows, inventory/key/custody checklist, condition evidence, signatures/acknowledgements where applicable, ETag, and receipt. Room-layout configuration and mass allocation remain web-first.

## 20. Out-pass, leave, and movement workflows

Implement resident request review, destination/contact minimization, departure/return window, guardian/mentor/warden approvals per policy, QR gate validation, actual exit/return event, late/missing escalation, correction, and receipt.

Approval never equals physical exit; gate events are separate. Adult-student consent and guardian visibility follow institutional policy. Offline gate events are only allowed through an encrypted, short-retention, assignment-bound queue and require reconciliation.

## 21. Hostel roll call, incidents, and emergencies

Support scheduled/emergency roll-call roster, present/absent/authorized-away/unconfirmed, repeated verification, supervisor reconciliation, and closure. Never infer presence solely from phone location.

Incident capture includes category/severity, involved persons, narrative, witnesses, immediate action, secure evidence, escalation, and receipt. Allegation is not a finding. Emergency alert/evacuation/roll-call commands use approved templates/audiences, step-up, outbox acknowledgement, truthful delivery/acknowledgement, and correction/all-clear.

## 22. Hostel resident/guardian interface

Complete resident and policy-permitted guardian mobile journeys for room/allocation status, check-in tasks, out-pass/leave request/status, authorized visitor, maintenance/service request, dues/payment handoff, notices, emergency alerts, and acknowledgements.

Guardian access is relationship-, age/status-, policy-, consent-, and dependent-scoped. Never reveal roommate data, disciplinary details, exact presence, or private communications without explicit authorization.

## 23. Transport administration home

Support Transport Administrator/Manager and authorized dispatcher with live operations:

- active/upcoming trips, routes, vehicles, drivers/attendants, manifests, and assignment readiness
- check-in/start/delay/deviation/breakdown/incident/SOS/end/reconciliation status
- vehicle/driver document, permit, maintenance, and inspection expiry
- rider boarding/alighting/missing exceptions
- location feed freshness/quality and provider health
- communication/acknowledgement queues

Fleet/route master, fare rules, bulk allocation, telematics secrets, and historical unrestricted location export remain web-first.

## 24. Trip lifecycle and dispatcher controls

Implement server-controlled trip prepare, crew/vehicle acknowledgement, pre-trip checklist, start authorization, stop events, delay/deviation/breakdown, substitute request, incident/SOS, completion, rider reconciliation, and close receipt.

Require current assignments, state/version, reason, idempotency, and audit. A dispatcher may request or approve only advertised transitions. Location/provider silence must show unknown/stale, never a false current position.

## 25. Driver distraction-minimized mode

Create a dedicated driver mode with:

- large pre-trip checklist and assignment acknowledgement
- start/end trip only while safely stationary or according to approved vehicle-state policy
- navigation handoff before movement
- voice/haptic/simple acknowledgement where safe and accessible
- one-tap SOS/breakdown and legally safe emergency fallback
- automatic suppression/locking of nonessential interaction while moving where feasible
- visible GPS/trip tracking state and easy post-trip stop verification

Do not display rider-sensitive lists or require typing while moving. Do not bypass OS driving restrictions. Moving state is a safety signal, not authorization. Test false/missing speed signals and accessible emergency use.

## 26. Attendant/helper manifest and rider events

Provide assignment-bound minimal manifest and QR/RFID/manual boarding/alighting:

- expected/present/boarded/alighted/absent/wrong-stop/exception
- authorized pickup/drop-off and minimum contact/escalation data
- duplicate/wrong-trip/already-boarded/unexpected-rider handling
- missing-rider and unaccounted-at-close workflow
- offline encrypted event queue, sequence, replay protection, correction history, and reconciliation

Do not infer boarding from GPS or scan alone without accepted event. Never show one guardian another rider’s information.

## 27. Trip location, ETA, and privacy

Collect location only during an authorized active trip and stated safety/operations purpose:

- explicit visible indicator and OS permission state
- foreground service/background mode only as documented and platform compliant
- server-issued trip/session binding, sampling policy, accuracy/freshness, offline buffering cap, encryption, and retention
- automatic stop at trip end, assignment revocation, logout, expiry, or emergency policy boundary
- user-visible troubleshooting and manual safety fallback

The server/provider computes route/deviation/ETA. Mobile displays freshness/quality and never invents ETA. Prevent off-trip tracking, cross-tenant trip access, historical stalking, and analytics leakage.

## 28. Student/staff/guardian transport view

Provide only entitled route/stop/vehicle/crew-safe details, schedule, current trip status, ETA/live map when enabled, delay/deviation/safety alerts, boarding/alighting notifications, pass/QR status, issue reporting, and acknowledgements.

Use fuzzing/minimization where exact location is unnecessary. Guardian views are dependent-scoped. Do not expose other riders, driver personal numbers, vehicle history, or location outside active service windows.

## 29. Visitor host, reception, and security roles

Support Visitor Host, Receptionist, Gate Security, Security Supervisor, and emergency coordinator through site/gate/shift assignments.

Provide preregistration queue, host approval, expected visitors, arrival/departure, badge status, denied/watch-list decision routing, overstays, emergency roll call, incidents, and equipment/vehicle declarations.

Watch-list administration and retention rules remain web-first and restricted to specifically authorized security roles.

## 30. Visitor preregistration and host approval

Implement purpose, host, site, date/window, visitor count, minimum contact, consent/privacy notice, identity requirements, vehicle/items, accessibility needs, approval, invitation/QR issuance, expiry, cancellation, and receipt.

Hosts see only their visitors. Invitations use opaque signed/expiring tokens. Communication goes through authoritative outbox. Never expose internal watch-list status to ordinary hosts or visitors.

## 31. Visitor identity, badge, and gate events

Implement secure ID/photo capture where lawful and required, document classification, encrypted temporary storage, verification result, host confirmation, badge/QR issue, check-in, access-zone projection, extension, check-out, and receipt.

OCR/face similarity is advisory, never sole authorization. Deny/watch-list matches route to an authorized decision with false-positive handling, reason, step-up, and audit. Offline gate mode must use an expiring encrypted expected-visitor package and later reconciliation; unknown/offline visitors follow a safe manual escalation, not automatic admission.

## 32. Visitor emergency roll call and incidents

Provide current accepted visitor roster by authorized zone/site, safe present/unconfirmed/evacuated/assistance-needed events, reconciliation, and closure. Use server-authoritative entry/exit state plus human verification; never assume safety from badge scan alone.

Visitor/security incidents use structured category/severity, parties, witnesses, action, secure evidence, escalation, and receipt with strict retention and access controls.

## 33. Facilities and service-desk roles

Support Facilities Manager, Technician, IT Support, Lab Technician, Storekeeper, Asset Custodian, and assigned approvers with site/building/lab/store/team scope.

Home includes assigned work orders, SLA/priority, safety warnings, planned maintenance, calibration/inspection due, asset custody, issue/return/transfer, stock tasks, approvals, incidents, and offline queue state.

## 34. Work orders and field service

Implement create/triage/assign/accept/travel/arrive/work/pause/block/resolve/verify/close/reopen transitions only when server advertised. Include category, priority, location, asset, reporter-safe contact, symptoms, safety/permit flags, checklist, parts/time, notes, evidence, signature/acknowledgement where policy permits, SLA, and receipt.

Offline drafts/events/evidence are encrypted, idempotent, assignment-bound, and reconciled. Closing requires required checks and server validation. Mobile does not calculate SLA or change master priority rules.

## 35. Asset custody and lifecycle events

Support QR/barcode/RFID lookup with minimum authorized asset details, status, location, custodian, warranty/AMC summary, calibration/maintenance, and open work orders.

Implement issue, return, transfer, receive, loan, deploy, retire-request, lost/damaged report, inspection, and custody acknowledgement through append-only state transitions, dual confirmation where configured, ETag, evidence, and receipt. Asset master edits, bulk import, depreciation, and disposal approval remain web-first.

## 36. Inventory/store operations

Provide item lookup, bin, on-hand/available/reserved values from server, authorized request/pick/issue/return/transfer/receive/count events, batch/serial/expiry where required, discrepancy, approval, and receipt.

Offline counts/scans are encrypted, assignment-bound, idempotent, capped, process-death safe, and item-level reconciled. Mobile never computes stock balance, silently applies negative stock, or converts count discrepancy directly into inventory truth. Procurement/vendor/budget/bulk adjustments remain web-first.

## 37. Calibration, maintenance, and lab safety

Implement due tasks, procedure/checklist version, measurements where authorized, pass/fail/needs-review, technician declaration, instrument/reference, secure certificate/evidence, next due date returned by server, quarantine/restore request, and receipt.

Safety-critical overrides require online supervisor approval/step-up. Mobile cannot author procedures, tolerances, calibration formulas, or compliance rules. Display hazards and accessible emergency instructions even when other module data is unavailable.

## 38. Employer/recruiter authentication and home

Provide external Employer/Recruiter and authorized hiring-panel access through time-bound tenant/drive-scoped authentication, MFA/step-up, terms/NDA/data-processing acknowledgement, consent-aware projection, session/device controls, and immediate revocation.

Home includes assigned drives, schedules, stage tasks, minimum candidate lists, feedback/shortlist/selection tasks, authorized documents, support, data-access expiry, and download history. Employer identity is never mapped to internal tenant-wide access.

## 39. Employer candidate handling

Expose only server-approved candidate fields for the active drive/stage and valid consent. Support restricted search, candidate view, attendance/status, structured feedback, shortlist/select/reject/hold, reason, interview schedule, offer-status handoff, and receipt.

Prevent background browsing, cross-drive access, cohort search, sensitive demographic/health/disciplinary/finance data, unrelated scores/offers, and broad export. Panel feedback isolation and state transitions follow Prompt 22 policy.

## 40. Employer documents, consent, and expiry

Use short-lived document grants, classification, watermark where supported, checksum, access/download receipt, device/share policy, and revocation. Candidate resume/portfolio access must verify current drive, stage, recruiter assignment, consent purpose, and expiry on every open.

No permanent URLs, object keys, offline bulk packs, address-book export, or retention beyond agreement. At expiry/revocation, purge cached files/data, invalidate deep links/push, cancel sessions, and prove cleanup through tests and audit.

## 41. Tenant administrator and institution IT roles

Support Tenant Administrator/Institution IT with scoped operational views:

- tenant/institution/campus health and module status
- identity/access review tasks and session/device revocation
- integration/job/outbox/import status and failure summaries
- configuration drift/release/maintenance notices
- domain/DNS/certificate/SSO status without secrets
- support access request approval/revocation
- security alerts and audit review entry points

Role design, permission architecture, user bulk provisioning, secrets, keys, raw logs, unrestricted audit exports, database/infrastructure access, and destructive configuration remain secure web/operations-console workflows.

## 42. Access reviews and session revocation

Implement review campaigns/tasks with user/service-account-safe identity, role/scope, last-use summary, risk reason, reviewer assignment, retain/remove/modify-request/defer, evidence/comment, conflict, ETag, step-up, and receipt.

Mobile may revoke a specific session/device or submit an access-removal workflow within authority. It cannot directly grant broader privileges or edit role definitions. Prevent self-certification, cross-tenant review, stale review, and hidden service accounts.

## 43. Integration, maintenance, and release status

Display privacy-safe integration health, last success/failure, queue/backlog, retry status, provider acknowledgement, maintenance window, application/mobile API compatibility, release rollout, and incident link.

Allow only safe predefined actions such as acknowledge, open incident, request retry, approve maintenance/support access, or revoke session where the server exposes them. Secret rotation, connector credentials, arbitrary replay, deployment, rollback, database action, and infrastructure control remain secure consoles.

## 44. Support-access approval

Implement tenant-side approval for time-bound support access:

- purpose/ticket, requested tenant/system/record classes, support identity/team, permissions, start/expiry, masking, recording/audit, prohibited actions, approvers, and emergency/break-glass indicator
- approve/reject/shorten/revoke with step-up, SoD, explicit confirmation, reason, ETag, and receipt
- live active-access indicator and revocation status

Approval grants only the server-defined least privilege. Mobile never conveys credentials or creates a hidden superuser session.

## 45. Platform operations, support, and security roles

Support Platform Operations, Support, Security, Release Observer, and Incident Commander with platform-level but tenant-data-minimized interfaces:

- service/SLO/region/environment health
- incident timeline, severity, ownership, communications status, and runbook links
- queue/job/provider failure aggregates
- release/deployment status as read-only unless a tightly controlled existing action exists
- security alerts, session/access-request status, and emergency controls
- support tickets and authorized time-bound access state

There is no implicit tenant-record access. Selecting a tenant shows metadata/health only until an approved, time-bound, purpose-bound support grant is active.

## 46. Platform incident and emergency controls

Implement acknowledge/claim/escalate/assign/status update/communication request/mitigation checklist/resolve-request/post-incident task only through established incident APIs.

Consequential emergency controls such as disabling an integration, revoking sessions, pausing a queue, or activating maintenance require a pre-approved command, environment banner, blast-radius preview, current state, step-up, dual control where configured, explicit typed confirmation where appropriate, idempotency, audit, and receipt.

Do not expose arbitrary shell, SQL, cloud console, secret, deployment, feature-flag, or tenant-data access. Break-glass must be server-controlled, time-bound, alerted, fully audited, and reviewed.

## 47. Backend mobile contracts and isolation

Add/refine mobile endpoints or BFF aggregation only when justified:

- versioned OpenAPI, generated TypeScript clients, cursor paging, bounded projections, stable reason/status codes, ETag/version, idempotency, server time, source/as-of time, and receipts
- domain services remain authoritative; no mobile bypass around workflow, audit, outbox, payment, documents, consent, retention, location, or access grants
- set tenant/institution/campus/role/assignment/purpose context transaction-locally; force RLS on scoped PostgreSQL tables
- negative tests for cross-tenant, campus, role, department, drive, student, project, borrower, branch, hostel, resident, trip, rider, visitor, site, work order, asset, store, employer, tenant-admin, and support-grant scope
- indistinguishable expired/revoked/disabled/not-found responses where existence is sensitive
- compatibility tests between backend OpenAPI and committed generated clients

Never accept client-supplied authorization filters as proof of scope or create a generic endpoint returning all operational domains.

## 48. Security, privacy, accessibility, and observability

Update threat models for malicious QR/RFID/deep links, scan replay, lost/shared/rooted devices, offline tampering/clock changes, location stalking/off-trip collection, visitor identity leakage, resident/rider tracking, employer scraping, asset/stock fraud, approval replay, support confused-deputy access, and emergency-control abuse.

Implement secure storage, key rotation, session binding, step-up freshness, encrypted files/database, backup/share/clipboard/screenshot policy, remote revocation, short retention, dependency/secrets/SAST checks, and platform integrity risk handling.

Meet native accessibility requirements: TalkBack/VoiceOver semantics, focus order, large text, contrast, non-color state, large touch targets, switch/keyboard access where supported, accessible scan/manual fallback, reduce motion, RTL, localized dates/numbers/currency/names, long text, sunlight/one-handed field use, and distraction-minimized driving.

Instrument privacy-safe latency/error, queue age/conflicts, scan results, upload/reconciliation, location freshness and stop compliance, payment handoff, task SLA, support-access state, deep-link resolution, cache purge, crash/ANR, battery, and network metrics. Never log sensitive payloads, identifiers, coordinates, tokens, or documents.

## 49. Tests, performance, documentation, and release evidence

Add deterministic unit, component, contract, integration, security, accessibility, and end-to-end tests covering:

- placement eligibility authority, consent, attendance offline sync, panel isolation, offer truth, and employer expiry/purge
- project assignment/IP scope, evidence upload, rubric submission, and external mentor revocation
- library circulation concurrency, fine payment truth, stock offline duplicates/conflicts, and OPAC license restrictions
- hostel room/resident scope, exit-versus-approval distinction, roll call, guardian privacy, incident evidence, and gate reconciliation
- transport trip state, driver moving restrictions, location permission/revocation/off-trip stop, ETA staleness, rider duplicate/wrong-trip/missing close, and SOS
- visitor invitation replay, offline expected list expiry, watch-list role denial, badge/check-out, emergency roll call, and evidence retention
- work-order state/version, asset dual custody, stock reconciliation, calibration safety approval, and master-data denial
- tenant admin access review/SoD/session revocation, secret/config denial, support approval/expiry/revocation
- platform no-implicit-tenant-access, granted purpose scope, emergency dual control, break-glass audit, and console/secret denial
- role/context switch leakage, push/deep links, process death, clock change, offline expiry, device revocation, log redaction, and forced RLS across every endpoint

Automate at least one real Android and one real iOS critical journey for every role group:

1. Placement/training/project coordinator and panel/external mentor.
2. Librarian/assistant and patron.
3. Warden/security and resident/guardian.
4. Transport administrator, driver, attendant, and rider/guardian.
5. Visitor host/reception/security.
6. Facilities/IT/lab/store/asset custodian.
7. Employer/recruiter.
8. Tenant administrator/institution IT.
9. Platform operations/support/security.

Include offline scan/event duplicates and conflicts, process death, revocation, context switching, deep links, accessible fallback, RTL/large text, low bandwidth, and web-first denials. If macOS/signing/hardware/provider/RFID/location fixtures are unavailable, do not fabricate evidence; document exact gaps and keep affected matrix entries partial/blocked.

Define and measure budgets for cold/warm start, role-home render, scan-to-feedback, offline persistence/reconciliation, live-trip update freshness, map battery/network usage, upload/resume, list paging, memory, binary growth, crash-free/ANR, and platform health refresh using realistic synthetic volumes.

Update:

- `docs/mobile/ROLE_FEATURE_MATRIX.md` until every PRD role has evidence-backed Android/iOS coverage or an explicit justified web-first restriction
- role/navigation/context/assignment map and offline allowlist/retention/reconciliation table
- scanning/RFID, location/trip, evidence/document, push/deep-link, consent, and external-user patterns
- placement/training/project, library, hostel, transport, visitor, facilities/assets/stores, employer, tenant-admin, support-access, and platform-incident guides/runbooks
- OpenAPI/generated-client/BFF decisions, threat model, accessibility/localization, SLO/performance evidence, telemetry/alerts, incident response, and manual verification

Use only synthetic fixtures. Do not call real employers/providers, track real trips, send real communications, process real payments, or use real people, candidates, residents, visitors, assets, support sessions, credentials, or documents.

## 50. Completion gate

Completion requires all of the following:

1. Placement officers/coordinators, trainers, project/internship coordinators/mentors, and interview panel members have secure, useful, real-API Android/iOS journeys.
2. Librarian/assistant and patron roles have circulation, stock, OPAC, reservation, renewal, fine/payment-handoff, and exception journeys with server-authoritative state.
3. Warden/security and resident/guardian roles have room/residency, check-in/out, out-pass, roll call, visitor, incident, maintenance, dues, alerts, and privacy-safe journeys.
4. Transport administrator, driver, attendant/helper, student/staff/guardian roles have safe trip, manifest, boarding/alighting, location/ETA, delay/breakdown/incident/SOS, and reconciliation journeys.
5. Visitor host/reception/security roles have preregistration, approval, identity/badge, gate, watch-list escalation, check-out, emergency roll-call, incident, consent, and retention controls.
6. Facilities/IT/lab/store/asset roles have work-order, asset custody, inventory, stock count, calibration/maintenance, evidence, SLA, and closure journeys.
7. Employer/recruiter roles have time-bound drive/candidate/stage/feedback/shortlist/selection/document access with consent, minimization, audit, expiry, and no broad export.
8. Tenant admin/institution IT roles have health, integration, access review, session revocation, maintenance/release, security, and support-approval interfaces without secrets or privilege architecture.
9. Platform operations/support/security roles have platform health, incidents, queues, emergency controls, release state, and time-bound support access with no implicit tenant-data access.
10. Offline field operations are explicitly allowlisted, encrypted, assignment-bound, idempotent, expiring, process-death safe, conflict-aware, and authoritatively reconciled.
11. Location is collected only during authorized trip/purpose, visibly indicated, minimized, retained per policy, and reliably stopped on end/revocation/logout/expiry.
12. Consequential actions enforce backend authorization, current version, SoD/limits, step-up, explicit confirmation, audit, idempotency, and receipts; providers/devices never define success.
13. Forced RLS and negative cross-scope tests cover every new endpoint; context switches and revocations cannot leak cache, queue, search, downloads, navigation, push, files, or location.
14. Android/iOS critical journeys, accessibility/localization/RTL, low-bandwidth, security, performance, privacy-safe observability, docs, and runbooks have honest evidence.
15. The role-feature matrix has no unexplained PRD role gaps and no feature is falsely marked complete.
16. Bulk/configuration/confidential/export/payroll/accounting/infrastructure/secret operations remain explicitly web-first or secure-console only and are tested.
17. No external outcome, payment, scan, location, delivery, approval, audit, receipt, support access, or role completion is fabricated.
18. Prompt 31 Mobile Quality, Appium/Maestro Regression, Store Release, and Operations was not implemented or marked complete.

Provide the standard completion report covering implementation summary, changed files, backend/OpenAPI/generated clients, every role/screen/journey, Android/iOS evidence, offline/reconciliation, scanning/location/device services, consent/retention/external access, security/privacy/tenancy/RLS/audit/receipts, accessibility/localization/performance, exact test/scan commands/results/exit status, role-matrix changes, docs/runbooks, limitations/unavailable macOS/provider/device/RFID/location evidence, manual verification, and suggested commit message.

End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(mobile): complete operations employer and platform roles`

Stop. Do not begin Prompt 31 or claim mobile release/store readiness.
```

---

## Review Checklist Before Prompt 31

- Every remaining PRD role has a real native Android/iOS interface or explicit justified web-first boundary.
- Placement eligibility, readiness, offers, and stage outcomes remain server-authoritative and consent-scoped.
- Library circulation, fines, inventory, and stock counts reconcile without false success.
- Hostel access is assignment- and relationship-scoped; approvals and physical gate events remain distinct.
- Driver mode minimizes distraction; trip location is visible, purpose-bound, and stops reliably.
- Visitor identity, badges, watch-list escalation, gate events, emergency roll call, and retention are protected.
- Work orders, custody, stock, calibration, and maintenance are append-only, conflict-aware, and receipted.
- Employer data is minimized, time-bound, audited, consent-aware, and purged at expiry.
- Tenant/platform roles expose no secrets, raw infrastructure controls, or implicit tenant data.
- Support access and emergency controls require purpose, least privilege, time limits, step-up, SoD, audit, and revocation.
- Forced RLS and negative isolation tests cover every new scope.
- Offline, process-death, device revocation, accessibility, RTL, low bandwidth, Android/iOS, and performance evidence are honest.
- No Prompt 31 release-hardening scope was implemented or falsely marked complete.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 31 until these conditions pass.
