# Claude Code Prompt 08

## Attendance, Shortage, Detention, and Condonation

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–07 passed, were reviewed, and were committed  
**Scope:** Timetable-derived attendance sessions, governed capture and correction, rule-versioned calculations, shortage alerts, detention/condonation workflows, and examination-eligibility evidence

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially attendance, academic regulations, student lifecycle, timetable, notifications, fees, examinations, reporting, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md` and all relevant ADRs.
3. Inspect Prompt 03 academic-calendar/regulation contracts, Prompt 05 student/guardian/hold contracts, Prompt 06 registration/roster/degree-audit contracts, Prompt 07 published timetable/session/substitution/cancellation/makeup events, and Prompt 02 workflow/audit/document/outbox services.
4. Inspect OpenAPI, generated clients, data dictionary, RLS policies/tests, permission and segregation-of-duties matrices, notification preferences, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite user changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, or implement teaching-content/LMS, final examination eligibility, hall tickets, marks/results, fee collection, payroll, or a real hardware vendor without credentials and an approved adapter contract.

Implement a bounded `attendance` domain. Attendance owns scheduled-session attendance facts, capture provenance, governed adjustments, calculations, shortage/detention/condonation decisions, and signed/versioned attendance evidence. It does not own course registration, timetable truth, payments, or the final examination-eligibility decision.

## 1. Domain invariants and terminology

Establish these invariants:

- every record is tenant/institution/campus/term scoped and references a valid offering, roster member, timetable session, and attendance policy version
- one canonical attendance fact exists per learner/session, with immutable raw observation history
- corrections, duty leave, medical relief, exemption, and condonation are adjustments or decisions; they never overwrite the original observation
- published/frozen statements are immutable and reproducible from an input snapshot, policy version, engine version, and calculation timestamp
- missing capture is not automatically absence until an explicit policy-controlled finalization rule applies
- absence, not-marked, excused, excluded, pending, and no-class are distinct
- timetable cancellation cannot create an absence; a makeup session is independently attended
- server time and server authorization determine official acceptance
- percentage displays always expose denominator, numerator, included/excluded sessions, rounding rule, effective date, and whether the value is raw or adjusted
- no workflow can silently convert attendance, approve its own restricted request, or bypass tenant/scope authorization

Create a glossary and encode statuses as versioned reference/configuration data where institutional variation is legitimate.

## 2. Attendance policy and rule versions

Implement effective-dated, immutable policy versions at institution/regulation/program/term/course/activity scope with deterministic precedence.

Support configuration for:

- lecture, tutorial, practical, laboratory, project, seminar, internship/training, remedial, makeup, and approved institutional-event attendance
- minimum attendance thresholds and warning bands
- combined overall and activity-component thresholds, including separate theory/lab requirements
- numerator and denominator treatment for each status
- present, absent, late, left-early, partial, on-duty/duty-leave, medical, exempt, pending, and not-marked behavior
- minutes/period/contact-hour/session-based calculation
- late-arrival and early-departure tolerance or fractional credit where explicitly permitted
- cancelled, invalid, duplicate, rescheduled, optional, audit-only, and excluded-session behavior
- registration add/drop, late admission, withdrawal, suspension, course exemption, and effective roster dates
- minimum conducted classes before warnings or decisions
- rounding precision/mode and whether rounding occurs only for display or for eligibility
- shortage threshold, detention threshold, condonation band/cap, maximum condonable courses/credits, and repeat limits
- approved duty/medical documentation windows and retrospective limits
- correction deadlines, approver chain, freeze dates, reopening authority, and reason requirements
- guardian/mentor escalation rules and privacy controls

Reject ambiguous or contradictory policies before activation. Activation must be authorized, audited, versioned, and cannot retroactively change finalized evidence without an explicit recomputation/reopening workflow that preserves both results.

Implement a policy simulation endpoint/UI using synthetic or explicitly selected authorized records, showing exact rule traces before activation.

## 3. Timetable-derived attendance sessions

Consume only approved Prompt 07 events/contracts to create attendance sessions from final scheduled occurrences.

Implement:

- idempotent creation from timetable publication and effective amendments
- session identity stable across event retries
- offering/activity/group/batch, scheduled start/end, room/lab, assigned faculty, delivery mode, and source timetable-version snapshot
- planned, open, in-progress, capture-closed, submitted, verified, finalized, cancelled, superseded, frozen, and reopened states with valid transitions
- substitute faculty and co-faculty authorization from the final scheduling assignment
- cancellation before/after capture with governed reconciliation
- reschedule and makeup as traceable occurrences, never mutation of historical attendance
- one-time authorized extra/remedial session only when backed by a valid Prompt 07 schedule reference
- roster snapshot at opening plus auditable late add/drop/reassignment reconciliation
- time-zone aware opening/closing windows and controlled manual opening
- automatic exception queue for missing, duplicated, orphaned, or conflicting timetable events

Do not let the attendance module create arbitrary academic sessions that evade timetable governance.

## 4. Roster and learner eligibility

Resolve rosters from Prompt 06 and student status from Prompt 05.

Support:

- registered, waitlisted, dropped, withdrawn, transferred, suspended, and audit-only distinctions
- effective membership at the session instant
- cross-listed offerings and shared groups without duplicate attendance
- lab/tutorial/project batches and authorized batch transfers
- late registration/admission with configured denominator start rule
- backdated registration changes through a reconciliation workflow
- identity mismatch/duplicate learner exceptions
- roster snapshot diff and impact preview before recalculation

Never copy student master data into attendance beyond minimal historical display snapshots required for reproducibility.

## 5. Faculty and authorized staff capture

Implement responsive web and native mobile capture using real APIs:

- open an eligible scheduled session
- roster list with photo only when policy and consent permit
- search/filter and accessibility-friendly present/absent/late/partial marking
- safe bulk “mark present” requiring deliberate confirmation and clear exception review
- per-student note using non-sensitive controlled reason codes plus restricted comment where allowed
- draft autosave, final review, submit, server receipt, and captured counts
- co-faculty/lab-assistant capture only within assigned permissions
- substitute faculty capture based on effective approved substitution
- correction request after submission rather than silent editing
- session summary and unresolved/missing marks
- no biometric/photo-surveillance inference by default

The server must validate assignment, session window, roster version, policy version, request idempotency, and optimistic version for every write.

## 6. Mobile offline attendance capture

Make faculty attendance capture first-class on React Native Android/iOS.

Implement:

- prefetch of only assigned near-term sessions and minimum roster data
- encrypted, tenant/user-partitioned device storage and purge on logout, membership loss, remote revocation, or tenant switch
- offline session opening only under explicit policy and within a signed server-issued authorization window
- immutable local command queue with device ID, local sequence, roster version, event UUID, capture time, monotonic metadata where available, and integrity protection
- visible offline/stale state; never display queued data as officially submitted
- reconnect sync with idempotency, replay protection, server validation, per-command acceptance/rejection, and conflict resolution
- final server receipt and authoritative counts before showing “submitted”
- recovery from app termination, duplicate taps, partial sync, token expiry, clock skew, and roster/timetable changes
- blocked local editing after authoritative freeze unless a correction workflow is opened
- no background upload of data for another tenant/session/user

Document offline threat assumptions. Device possession alone must never authorize attendance capture.

## 7. Device and external capture adapters

Define pluggable adapters for institution-approved biometric devices, RFID/NFC, barcode/QR, turnstiles, and other future sources without making them mandatory.

Implement the platform-side contract for:

- registered device/integration identity, campus/location binding, credential rotation, enable/disable, health, and last-seen status
- signed/batched observations with vendor event ID, learner reference token, device time, received time, source, and quality flags
- mTLS or signed requests where the adapter supports it; secrets in AWS Secrets Manager/KMS, never source/database plaintext
- deduplication, idempotency, anti-replay nonce/window, clock-skew detection, quarantining, retry/dead-letter processing, and reconciliation
- mapping unresolved external identifiers without exposing student PII to unauthorized operators
- device observations as evidence requiring policy-based reconciliation to a scheduled session, not automatic truth
- adapters for sandbox/reference simulation clearly labeled non-production

QR-based self check-in, if enabled, requires short-lived signed session challenge, authenticated learner, proximity/network/device-risk controls where lawful, single-use/replay prevention, and faculty review. State clearly that QR/proximity lowers friction but does not prove physical presence.

Do not implement face recognition or covert location tracking. Record a privacy/security ADR before any future biometric template integration.

## 8. Observation, reconciliation, and provenance

Model immutable observations separately from the canonical learner/session fact.

Support sources:

- faculty web/mobile
- authorized lab/teaching assistant
- device adapter
- learner QR check-in
- authorized import
- correction/administrative decision

For each fact retain selected observation(s), raw status, effective status, source, actor/device, timestamps, reason, confidence/exception flags, request/event IDs, and complete lineage.

Implement deterministic reconciliation with:

- duplicate and conflicting observation queue
- configurable source precedence requiring human review for unsafe conflicts
- no silent last-write-wins
- batch finalization validation
- four-eyes approval for privileged bulk administrative changes where configured
- before/after diff and affected calculation preview
- reprocessing idempotency and reproducible outcome

## 9. Attendance calculation engine

Implement a deterministic, versioned calculation engine.

For every learner/offering/component/term result persist or reproducibly derive:

- eligible session/contact-minute set and excluded set
- raw attended numerator, conducted denominator, raw percentage
- approved adjustment components and adjusted numerator/denominator
- adjusted percentage without destroying raw percentage
- shortage amount and sessions/hours required to reach threshold where mathematically possible
- threshold/band/decision state
- policy version, engine version, roster snapshot, timetable/session watermark, adjustment watermark, calculation time, trace/hash, and superseded-result link

Provide explainable traces by session and rule. Use exact decimal arithmetic and explicit rounding. Do not use floating-point equality for eligibility.

Support event-driven incremental recalculation plus authorized full rebuild. Both must converge to the same result. Handle out-of-order events, retries, correction approval, timetable cancellation/amendment, roster change, policy activation, and freeze/reopen.

## 10. Student visibility and correction workflow

Provide students with:

- course/component summary, raw and adjusted percentages, threshold, warning band, and last-calculated timestamp
- session-level calendar/list with status, source category, adjustment state, and cancellation/makeup links
- transparent numerator/denominator explanation and “what is needed” projection labeled as an estimate
- correction request within the configured window
- typed reason, statement, supporting document through Prompt 02 document service, and declaration
- status, reviewer messages, decision, and resulting recalculation reference
- notification/deep-link support with reauthorization

Correction workflow must include submitted, faculty review, escalated, approved, partially approved, rejected, withdrawn, expired, implemented, and reopened where policy requires. Enforce deadlines, SoD, scope, comments/reasons, evidence permissions, optimistic concurrency, and audit. The original raw mark remains visible to authorized users.

## 11. Duty leave, medical relief, and exemptions

Implement separate governed adjustment cases for:

- official duty/college representation
- approved curricular/co-curricular event
- medical relief
- disability/reasonable accommodation where institution policy allows and access is tightly restricted
- session/course exemption
- other institution-configured lawful category

Each case needs effective period/session mapping, supporting evidence, verification, reviewer chain, expiry, revocation, overlap detection, and calculation impact preview. Store only necessary medical classification/status in the attendance domain; sensitive documents remain in Prompt 02 with purpose-based authorization and retention.

Approval must add a versioned adjustment according to the active policy. Never rewrite present/absent observations or imply a student was physically present.

## 12. Shortage detection and progressive alerts

Implement rule-driven shortage monitoring:

- configurable caution, warning, critical, condonation-range, and detention-risk bands
- projected risk based on remaining scheduled sessions, clearly distinguished from official current percentage
- alert suppression/deduplication, cooldown, escalation, acknowledgement, and delivery status
- recipients by policy: student, faculty, mentor/advisor, guardian, HOD/program coordinator, Dean/academic office
- privacy-aware notification templates with minimal data on lock screens/email/SMS
- in-app inbox and outbox-driven push/email/SMS adapter ports
- undelivered/escalation queue and operational metrics

Guardian visibility requires an active permitted relationship and institution policy; it must not be inferred from emergency-contact data.

## 13. Freeze, shortage list, detention, and reopening

Implement controlled attendance closure by term/offering/component:

- readiness checks for missing captures, pending corrections/adjustments, orphaned observations, inconsistent rosters, and calculation lag
- faculty submission/attestation
- HOD/program/academic-office verification as configured
- freeze with immutable input snapshot and signed/versioned result set
- shortage candidate list with explanation and data-quality exceptions separated
- learner notice, acknowledgement, representation/appeal window, and review
- detention recommendation and final authorized academic decision
- decision reason, approver, effective scope, appeal, revocation/reversal, and superseding record
- restricted emergency reopening with reason, scope, approval, impact report, re-freeze, and downstream invalidation event

“Shortage” is a calculated state; “detention” is a governed academic decision. Do not automatically detain solely because a numeric threshold was crossed without the configured due process.

## 14. Condonation workflow and fee port

Implement policy-driven condonation:

- eligibility evaluation against shortage band/cap, program/regulation, course/component, prior usage, maximum courses/credits, excluded categories, and application dates
- system recommendation with exact rule trace; authorized human decision remains explicit
- learner application or institution initiation according to policy
- declaration, justification, supporting evidence, reviewer comments, and appeal
- HOD/Dean/academic-office approval chain and SoD
- calculated/configured fee request through a future Prompt 11 finance port
- pending-payment, paid, waived, failed, refunded/reversed, and not-applicable references received from the owning finance module
- no local ledger or fabricated payment success
- final approved condonation adjustment/decision only when all configured non-financial and financial conditions are confirmed
- revocation/reversal and downstream invalidation

Condonation never changes an absence to presence. Preserve the raw percentage, the policy-adjusted/condoned eligibility outcome, fee reference, approvers, and rule version separately.

Until Prompt 11 exists, provide a contract-tested disabled/manual-reference adapter that exposes truthful pending/unavailable states and cannot report payment confirmation.

## 15. Examination-eligibility evidence port

Expose a read-only, versioned contract for Prompt 12 examinations containing only necessary evidence:

- learner, registration, offering, term, and component stable references
- attendance result/evidence version and freeze status
- raw and adjusted values as required by policy
- threshold and attendance eligibility outcome
- pending correction/appeal/condonation flags
- detention/condonation decision references and effective status
- generated/invalidated timestamps and superseding version

Publish minimal idempotent events for attendance evidence finalized, superseded, invalidated, detention decided/reversed, and condonation decided/reversed. Prompt 12 owns composite examination eligibility and must reject stale/invalidated evidence.

Do not issue hall tickets or final exam permissions here.

## 16. Imports, reports, and analytics

Implement governed imports for legacy or exceptional attendance using a staged validate-preview-approve-commit flow:

- downloadable template/version
- strict identity/session/status validation
- row-level errors and duplicate detection
- dry-run impact summary
- authorized approval, idempotent commit, rollback by compensating version, and source-file hash
- no direct database import

Provide authorized reports/dashboards for:

- faculty capture completion and late submissions
- course/component/student-group attendance distribution
- shortage and projected-risk bands
- correction/adjustment aging
- duty/medical case status without unnecessary sensitive detail
- detention/condonation pipeline and finance-reference state
- device ingestion/reconciliation health
- freeze readiness and downstream evidence freshness

Use aggregate/de-identified analytics where individual identity is unnecessary. Exports require scoped permission, watermark/classification, audit, bounded size, asynchronous generation for large output, expiry, and formula-injection protection.

## 17. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- attendance policy draft/validate/simulate/activate/version compare
- timetable-derived session query/open/cancel/reconcile/submit/verify/finalize/reopen
- assigned roster and individual/batch attendance commands
- offline authorization/sync/receipt/conflict
- device registration/rotation/status/ingestion/quarantine/reconciliation
- observation conflict and administrative reconciliation
- learner/course/component calculation, trace, rebuild, and watermark status
- student attendance detail and correction request
- duty/medical/exemption cases and decisions
- shortage alerts/acknowledgement/escalation
- freeze readiness/attestation/freeze/reopen
- shortage list/representation/detention decision/appeal/reversal
- condonation eligibility/application/review/fee-reference/status/decision/reversal
- examination-evidence lookup/version/invalidation
- imports, dashboards, governed export, and operational queues

Use explicit DTOs, bounded pagination, filter allowlists, RFC 7807, optimistic versions, idempotency keys, correlation IDs, rate limits for capture/QR/device endpoints, audit, and generated clients.

Define least-privilege permissions for policy administration/activation, assigned-session capture, correction review, adjustment evidence access, shortage monitoring, freeze, reopen, detention recommendation/decision, condonation review/decision, finance-reference view, examination-evidence view, device administration, import, report/export, and platform operations.

Enforce SoD for policy activation, privileged bulk corrections, reopening, final detention, condonation approval, and applicable fee waiver confirmation. Platform operators receive health/queue metadata only, not implicit student attendance access.

Use the transactional outbox. Events contain stable references and minimal metadata, not rosters, medical details, or device credentials. Consumers are idempotent and tolerate out-of-order delivery.

## 18. React web interfaces

Implement accessible, responsive interfaces for:

- policy builder, validation, simulation, activation, and version comparison
- faculty assigned sessions, roster capture, review, submission, corrections, and attestation
- bulk capture/import with deliberate confirmation and error preview
- observation conflict/device reconciliation queues
- student summary, session history, calculation explanation, correction/adjustment applications, and appeal status
- mentor/advisor cohort risk dashboard and follow-up
- guardian policy-permitted dependent summary and alerts
- HOD/program coordinator capture completeness, shortage risk, corrections, freeze readiness, and review queues
- Dean/academic office detention/condonation/reopening decisions and impact review
- examination staff read-only evidence verification
- finance staff condonation fee-request/reference status only
- device/integration administration without unnecessary student access
- dashboards, governed reports, exports, and operational health

Use non-color-only status, keyboard navigation, screen-reader labels, localized dates/numbers, exact timestamps/time zones, virtualized roster accessibility, safe unsaved-change handling, concurrency recovery, and no misleading success states.

## 19. React Native Android/iOS interfaces for every role

Build genuine native role interfaces backed by production APIs, not WebViews or placeholder screens.

### Student

- attendance summary and course/component drill-down
- raw versus adjusted values and transparent calculation explanation
- session status, cancellation/makeup, shortage projection, and alerts
- correction, duty/medical/condonation application with camera/file evidence through secure document APIs
- representations/appeals, acknowledgement, and decision/payment-reference status
- encrypted offline read cache with version/staleness; submissions require server receipt

### Faculty/Teaching Assistant/Lab Assistant

- assigned session list and timetable context
- online/offline accessible roster capture, exception marking, review, submit, and receipt
- missing-capture queue, student correction review, and faculty attestation where authorized
- substitute assignment awareness and makeup-session linkage
- local queued actions clearly distinct from official server state

### Mentor/Advisor

- assigned advisee/cohort warning list, trend and unresolved alerts
- authorized drill-down, acknowledgement/contact note, and escalation
- no attendance editing unless separately assigned as teaching faculty

### Guardian

- only policy-permitted linked learner summary, shortage alerts, notices, and acknowledgement
- no raw evidence, peer data, medical documents, or correction authority

### HOD/Program Coordinator

- department completeness, missing submissions, risk bands, pending corrections/adjustments
- mobile review/comments/step-up approval for configured workflows
- freeze readiness and exception review; high-volume policy/bulk administration remains web-first

### Dean/Academic Office/Registrar

- shortage/detention/condonation/reopening work queues
- evidence/rule trace summary, conflict/SoD warnings, comments, step-up approve/reject
- immutable server receipt and refreshed downstream status after decisions

### Examination Staff

- read-only attendance-evidence status/version/freshness and pending/invalidation flags
- no capture, correction, or final exam eligibility in this module

### Finance Staff

- condonation fee-request reference, owning-finance status, waiver/reversal reference where permitted
- no attendance editing or local payment confirmation

### Device/Integration Administrator

- device health, clock skew, credential-expiry, quarantine/dead-letter counts, disable/rotate request with step-up authentication
- masked identifiers and no broad roster/student access

### Tenant Administrator/Leadership

- configured aggregate dashboards, policy/version visibility, workflow aging, and reports
- no implicit access to restricted medical evidence or arbitrary record editing

### Platform Operations

- tenant-isolated service/job/event/device-adapter health and trace IDs
- no academic record contents or institution-role impersonation by default

Mobile-wide requirements:

- biometric/PIN app lock where supported, secure OS keystore, screenshot/backup controls for sensitive screens where feasible
- encrypted allowlisted cache separated by tenant/user; purge on logout, role/membership change, device revocation, or tenant switch
- push payload minimization; deep links reauthenticate, reauthorize, and fetch current server state
- remote-config/feature gates fail closed for sensitive operations
- offline/stale/queued/synced/rejected states are explicit
- approvals, attendance submission, corrections, applications, and acknowledgements are successful only after an authoritative server receipt
- WCAG-aligned accessibility, dynamic type, localization, low-connectivity behavior, and safe retry
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role above; label web-first operations and their secure mobile review/approval companion honestly

## 20. Database and PostgreSQL RLS

Add forward-only Flyway migrations for appropriately normalized tables such as:

- attendance policy/version/scope/rule/status-treatment/threshold
- attendance session/session-source/session-roster-snapshot/session-state-history
- attendance observation/observation-batch/canonical-fact/fact-history
- offline authorization/device command/server receipt/sync conflict
- capture device/integration credential-reference/device event/quarantine/reconciliation
- calculation run/result/component/session-contribution/rule-trace/watermark
- correction request/item/review/decision
- adjustment case/evidence-reference/session mapping/decision/version
- shortage alert/delivery/acknowledgement/escalation
- freeze/attestation/result-set/reopen/impact
- shortage candidate/representation/detention decision/appeal
- condonation eligibility/application/review/fee-reference/decision
- examination evidence/version/invalidation
- import job/staged row/validation/commit
- export job and read-projection checkpoint

Use exact names consistent with repository conventions. Every tenant-owned table must carry necessary tenant/institution/campus/term/offering/student/session scope; foreign keys cannot cross tenants; repositories require scope predicates; RLS must be enabled and forced where constitutionally required. Add unique/idempotency/check/exclusion constraints, partial indexes, optimistic versions, retention fields, and partitioning only with evidence and an ADR.

Test database roles used by web, mobile, workers, migrations, and operations separately. A platform administrator or integration worker must not bypass academic RLS merely because it is technical infrastructure.

## 21. Security, privacy, audit, and resilience

Threat-model:

- faculty or student attendance fraud
- replayed QR/device/offline events
- stolen faculty device or token
- clock tampering and forged timestamps
- roster scraping and cross-tenant/cross-class access
- bulk “present” mistakes or privileged manipulation
- sensitive medical-document exposure
- notification/lock-screen leakage
- stale evidence used for exam eligibility
- outbox/event duplication and reordering
- insider policy/reopening/condonation abuse

Require step-up authentication for high-risk decisions and credential/device administration. Audit before/after references, actor/delegation, policy/rule version, reason, correlation/request ID, device/source, and approval chain. Never log tokens, secrets, medical contents, QR challenges, full rosters, or unnecessary PII.

Define retention/legal-hold/deletion behavior, backup/restore implications, observability SLIs, alerting, retry/dead-letter runbooks, degraded modes, and reconciliation after outages. Availability failures must create a visible pending/error state, never guessed attendance or payment success.

## 22. Tests

Implement and run:

- policy precedence, activation immutability, contradiction validation, simulation, and historical recomputation
- formula matrix for every status, numerator/denominator mode, component threshold, fractional credit, decimal precision, and rounding boundary
- cancelled/rescheduled/makeup, substitution, optional/excluded session, and missing-capture behavior
- roster add/drop/transfer/late admission/cross-list/batch changes at boundary timestamps
- session lifecycle and unauthorized/early/late/frozen capture denial
- duplicate taps, retry storms, optimistic concurrency, conflicting faculty/device observations, and bulk-change safeguards
- offline authorization expiry, encrypted queue lifecycle, clock skew, replay, partial sync, stale roster, app termination, logout/tenant-switch purge, and authoritative receipt
- QR expiry/single use/wrong learner/wrong session/replay and honest fraud limitations
- device signatures/credential rotation/location binding/dedup/out-of-order/quarantine/dead-letter/reconciliation
- raw-observation immutability and adjustment separation
- correction, duty, medical, exemption, detention, appeal, condonation, reversal, freeze, and reopening state/SoD/deadline matrices
- condonation fee port unavailable/pending/confirmed/waived/reversed without fabricated success
- incremental versus full calculation convergence and deterministic trace/hash
- downstream evidence version/freshness/invalidation/idempotent events
- progressive alert deduplication, permissions, guardian relationship, payload minimization, and delivery failure
- import validation/idempotency/formula-injection prevention and export authorization/expiry
- RLS negative tests across tenant, institution, campus, department, offering, group, student, faculty assignment, guardian relationship, device, and technical roles
- web accessibility and Playwright journeys for faculty, student, mentor, guardian, HOD, Dean/academic office, examinations, finance, device admin, tenant admin, and operations
- Android and iOS role journeys, offline/staleness, secure cache, push/deep link, reauthorization, step-up approval, and purge
- outbox crash recovery, reordered events, worker restart, calculation rebuild, and performance at documented target roster/session volumes

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim iOS/device/hardware evidence that the environment did not run.

## 23. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- attendance glossary, lifecycle/state diagrams, policy schema and calculation specification with worked examples
- API/event/evidence/finance/device-adapter contracts
- permission/scope/SoD matrix
- mobile role-feature matrix
- threat model/privacy assessment and document-access rules
- offline sync, device onboarding/rotation/quarantine, replay response, missed-capture, reconciliation, freeze/reopen, recomputation, stale-evidence, and disaster-recovery runbooks
- faculty/student/guardian/mentor/HOD/academic-office/examination/finance/device-admin user guides
- ADRs for calculation/versioning, external capture boundary, QR/privacy controls, offline command protocol, and any scaling choice

The completion gate passes only when:

1. Attendance sessions are created idempotently from approved timetable occurrences and correctly handle cancellation, amendment, substitution, and makeup.
2. Rosters respect effective registrations and batch/cross-list history without duplicates.
3. Raw observations are immutable; every correction/adjustment has provenance and never falsely converts absence to presence.
4. The calculation engine is deterministic, versioned, exactly rounded, explainable, reproducible, and converges for incremental/full rebuilds.
5. Faculty web and native mobile capture work with real APIs; offline capture is encrypted, replay-safe, conflict-aware, and official only after server receipt.
6. External device/QR ingestion is authenticated, deduplicated, quarantinable, privacy-aware, and never treated as unquestionable truth.
7. Students can understand calculations and submit governed corrections/adjustments; mentors and guardians see only permitted scope.
8. Shortage alerts are progressive, deduplicated, privacy-safe, and operationally observable.
9. Freeze, shortage, representation, detention, appeal, reopening, and reversal preserve due process, SoD, version history, and audit.
10. Condonation uses explicit policy/rule traces and a truthful future-finance port; it never rewrites attendance or fabricates payment.
11. Prompt 12 receives minimal, versioned, freshness-aware attendance evidence while final examination eligibility remains outside this module.
12. Every listed role has a meaningful Android/iOS interface; sensitive bulk configuration stays web-first with secure mobile review/approval where applicable.
13. Every tenant table has repository predicates, forced RLS as required, and cross-tenant/cross-scope negative tests.
14. OpenAPI, events, generated clients, migrations, docs, runbooks, accessibility checks, and all available tests pass.
15. No teaching-content/LMS, final examination processing, fee ledger/payment ownership, payroll, or fake production hardware integration was implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, domain invariants/calculation rules, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency, tests with exact results and commands/exit status, docs/ADRs/runbooks, limitations/unavailable evidence, manual verification, suggested commit message, and exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(attendance): implement governed attendance and shortage workflows`

Stop. Do not begin Prompt 09 or implement teaching plans/LMS.
```

---

## Review Checklist Before Prompt 09

- Sessions originate only from governed timetable occurrences.
- Raw observations and approved adjustments remain separate and historically reproducible.
- Policies, calculations, thresholds, rounding, and evidence are versioned and explainable.
- Offline mobile capture requires valid authorization, prevents replay, handles conflict, and reports success only after server receipt.
- External devices and QR are adapters with reconciliation, privacy, and fraud limitations.
- Corrections, duty/medical relief, shortage, detention, appeals, condonation, reversal, freeze, and reopening enforce workflow and SoD.
- Condonation never changes absence to presence and does not own or fabricate payments.
- Prompt 12 receives minimal, freshness-aware evidence but owns final exam eligibility.
- Every role has a meaningful web/mobile interface within permitted scope.
- Every tenant table has RLS and negative tenant/scope tests.
- Existing platform foundations were reused and all available suites passed.
- The completion gate passed and the changes were reviewed and committed.

Do not continue to Prompt 09 until these conditions pass.
