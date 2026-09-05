# Claude Code Prompt 12

## Examination Setup, Applications, Eligibility, and Hall Tickets

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–11 passed, were reviewed, and were committed  
**Scope:** Autonomous examination cycles and rules, examination applications, course selection, fee integration, explainable eligibility, exceptions, candidate freezing, hall-ticket issuance, verification, and role-specific web/mobile interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially autonomous examinations, regulations, course registration, attendance/condonation, fees/holds, accommodations, academic calendars, hall tickets, privacy, audit, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, all relevant ADRs, module boundaries, and repository conventions.
3. Inspect Prompt 03 regulation/curriculum/calendar/pass-rule reference contracts, Prompt 05 student identity/status/guardian/hold contracts, Prompt 06 registration/backlog/degree-audit contracts, Prompt 07 timetable/resource contracts, Prompt 08 versioned attendance evidence and detention/condonation events, Prompt 10 approved question/blueprint references, Prompt 11 charge/payment/settlement/finance-hold evidence contracts, and Prompt 02 workflow/audit/document/outbox foundations.
4. Inspect OpenAPI/generated clients, PostgreSQL RLS, data dictionary, permission/SoD matrix, notification service, document generation, QR/signature utilities, background jobs, observability, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, generate or distribute question papers, allocate invigilators, assign rooms/seats beyond a clean future port, deliver online assessments, capture/grade marks, publish results, calculate attainment, or fabricate payment/attendance evidence.

Treat examination eligibility as safety-critical institutional logic. Implement a bounded `examination-entry` domain. It owns examination-cycle setup, entry/application, examination-course schedule metadata, eligibility decisions, exception workflow, candidate-list freeze, hall tickets, and privacy-safe verification. It does not own source registration, attendance, finance, question papers, conduct, valuation, marks, or results.

## 1. Examination invariants

Enforce:

- every record is tenant/institution/campus/examination-cycle scoped and references immutable regulation, curriculum, registration, attendance-evidence, finance-evidence, and configuration versions
- the frontend never calculates or supplies authoritative eligibility
- eligibility decisions are deterministic, explainable, reproducible, versioned, and tied to a complete input snapshot
- historical decisions are never recalculated silently using current rules or mutable source state
- candidate freeze is immutable; changes create an approved superseding freeze/version with explicit downstream invalidation
- hall tickets are issued only from an eligible/approved candidate version and never imply identity beyond the authorized holder
- application/payment return screens are not proof of payment; Prompt 11 authoritative state is required
- no student is included, excluded, withheld, released, or excepted without a traceable rule/decision and audit
- examination-secret information is not placed in URLs, QR payloads, notifications, logs, analytics, or public verification
- official mobile actions succeed only after an authoritative server receipt

Create a glossary and explicit state machines for cycle, application, eligibility, exception, candidate freeze, hall ticket, and verification token.

## 2. Examination types and cycle configuration

Implement versioned configuration for:

- internal/sessional, mid-semester, end-semester, theory, laboratory/practical, viva, project/dissertation, comprehensive, supplementary, backlog, arrear, improvement, makeup, special, bridge, and institution-defined exam types
- academic year/term, regulation, program/cohort, offered courses/components, exam month/session, and attempt category
- registration/application, correction, late, withdrawal, exception, and hall-ticket release windows
- marks/maximum-minimum references, component weights, pass-rule references, combined-pass references, absence/malpractice/withheld codes, grace/rounding references, and credit applicability
- regular/backlog/improvement/makeup attempt policy
- maximum courses/credits, attempt count, improvement replacement/retention policy reference, and mutually exclusive choices
- examination fee codes and Prompt 11 finance conditions
- attendance/condonation/internal-requirement/registration/student-status/disciplinary/finance-hold requirements
- accommodation and approved exception policy
- candidate-freeze gates, hall-ticket template/version, instructions, signatures, release/withhold rules, and verification expiry policy

Use declarative validated configuration, not scripts. Detect overlaps, gaps, contradictions, impossible windows, invalid curriculum components, and cyclic dependencies before activation. Activated configuration versions are immutable and effective-dated.

## 3. Examination cycle lifecycle

Implement:

- draft, configuring, validation_failed, review, approved, announced, applications_open, applications_closed, eligibility_processing, exception_review, candidates_frozen, hall_tickets_released, in_progress, completed, archived, and superseded states
- maker-checker review/approval with configured Controller/Dean/academic authority
- readiness checklist and blocking exceptions
- version comparison and impact preview
- announcement with target audience and minimal notification
- controlled amendment before freeze
- emergency amendment after freeze only through superseding version, impact analysis, step-up approval, affected-candidate notification, and downstream invalidation
- archive/retention without destroying authoritative evidence

Cycle state transitions are server controlled, optimistic-concurrency protected, idempotent, and audited.

## 4. Examination course/component setup

Build course-exam entries from authoritative curriculum and eligible offerings:

- course, regulation, curriculum version, component/type, credits, max/min marks references, duration, mode, and candidate category
- regular, backlog, supplementary, improvement, makeup, and special eligibility scope
- external/internal/practical/viva/project component relationships
- shared/cross-listed/equivalent/substituted course mapping with approved regulation references
- no-exam/audit-only/exempt course handling
- active/suspended/cancelled/rescheduled states
- source and amendment history

Validate component totals and pass-rule references but do not calculate marks or results. Do not copy question content from Prompt 10.

## 5. Examination schedule and conflict boundary

Implement the minimum governed examination schedule required for applications and hall tickets:

- exam course/component, date, start/end, duration, time zone, mode, campus/venue placeholder, reporting time, and instructions reference
- draft, review, published, amended, postponed, cancelled, and superseded states
- student-course conflict detection across registered/selected papers
- common-course/equivalent-course collision checks
- insufficient gap or same-time conflict using configurable hard rules
- accommodation-related extra-time/end-time derivation without exposing accommodation reason
- amendment impact on applications, candidate lists, hall tickets, and notifications

Room inventory, seating plan, invigilator allocation, packet logistics, and exam-day control belong to later examination-conduct prompts. Define stable ports for them. Published schedule versions are immutable.

## 6. Candidate source and attempt eligibility

Resolve potential candidates from Prompt 05/06 using:

- active student and program/cohort/regulation status
- current registrations for regular attempts
- historical failed/absent/withheld/not-completed course-result references through a future marks/results provider port
- approved backlog/supplementary/improvement/makeup eligibility references
- course equivalence/substitution and curriculum transition rules
- maximum attempts, credit completion, prerequisite/co-requisite, and program-duration policy
- readmission, transfer, break-in-study, detention, suspension, discontinuation, and graduation status

Until official result history exists, use a contract-tested provider that returns truthful `NOT_AVAILABLE`; do not invent backlog eligibility. Regular registrations may proceed using authoritative Prompt 06 data where policy allows.

Generate a potential-candidate preview with inclusion/exclusion reason codes and source versions before opening applications.

## 7. Student examination applications

Implement application workflows for institution-auto-enrollment and student-submitted models:

- regular registered courses prefilled from Prompt 06
- eligible backlog/supplementary/improvement/makeup choices from authoritative provider contracts
- course/component selection, attempt category, declaration, exam-center preference boundary where applicable, accommodation request reference, and contact confirmation
- application fee preview requested from Prompt 11 by immutable fee codes/source reference
- draft, submitted, fee_pending, under_validation, correction_requested, accepted, partially_accepted, rejected, withdrawn, expired, and superseded states
- correction window with versioned before/after diff
- late application with configured late fee and approval
- durable submitted receipt with selected courses, configuration version, server timestamp, and application number
- idempotent submission, duplicate prevention, optimistic concurrency, and safe retry

No client-calculated amount, eligibility, deadline, or selected-course permission is trusted. Submitted applications are immutable; corrections create versions.

## 8. Finance integration

Use Prompt 11 versioned contracts for:

- fee request by application/course/attempt/late/other configured charge
- demand/payment reference and authoritative pending/paid/waived/reversed/refunded/disputed status
- finance hold/evidence version and effective timestamp
- payment status refresh/requery request without accessing provider secrets
- cancellation/refund request boundary when application policy permits

Store only finance references and minimal evidence snapshot, never duplicate ledger/payment data. A browser/mobile return or screenshot is not proof. Eligibility reacts idempotently to verified finance events and invalidations.

Support zero-fee/waived/exempt scenarios only with explicit policy/authorized evidence.

## 9. Attendance and condonation integration

Consume Prompt 08 versioned evidence:

- course/component raw and adjusted attendance values where required
- threshold, attendance eligibility outcome, freeze/evidence version, and freshness
- pending correction/appeal/condonation flags
- detention and condonation decision references/status
- superseded/invalidated event

Do not recalculate attendance or reinterpret raw observations. Reject missing, stale, unfinalized, or invalidated evidence according to examination policy. Condoned does not mean present; retain the exact policy outcome and source version.

## 10. Other eligibility inputs

Define authoritative provider contracts for:

- internal/coursework requirement completion without owning marks
- laboratory/project/viva prerequisites
- no-dues/asset/library/hostel conditions where lawful and configured
- disciplinary/suspension/debarment decision
- identity/profile/document completeness
- accommodation approval
- academic exception or court/regulatory direction

Each input includes stable subject/course/cycle reference, status, effective date, version, source, freshness, and invalidation semantics. Missing providers return `NOT_AVAILABLE`, never an assumed pass/fail. Eligibility policy explicitly decides whether each missing input blocks or routes to exception review.

## 11. Deterministic eligibility engine

Implement versioned eligibility rules with explicit precedence for:

- candidate/student/program/regulation/status validity
- valid course registration or approved attempt basis
- attendance/condonation/detention
- application state and selected courses
- fee/payment/waiver/finance hold
- attempt limits and category rules
- prerequisite/internal/lab/project conditions
- schedule conflicts
- disciplinary/no-dues/document conditions where configured
- approved exceptions and their effective scope/expiry

For each candidate/course/component decision persist:

- eligible, ineligible, pending, conditionally_eligible, withheld, or exception_required outcome
- stable reason codes and human-readable localized explanation
- policy/rule/engine version
- complete input evidence references/versions/statuses/watermarks
- calculation time and deterministic trace/hash
- superseded decision link and invalidation state
- actions needed and deadline where applicable

Use pure deterministic evaluation and exact temporal semantics. Support preview, per-candidate evaluation, asynchronous batch evaluation, event-driven incremental reevaluation before freeze, and full rebuild; all must converge for the same snapshot.

Never hide a failed rule behind a generic result. Restrict sensitive reason detail by role.

## 12. Eligibility review and exception workflow

Implement exception handling for:

- data quality/missing evidence
- pending attendance correction or condonation
- payment/hold dispute
- registration/equivalence/attempt ambiguity
- schedule conflict
- approved medical/accommodation/special case
- administrative/court/regulatory direction
- other configured lawful exception

Support raised, assigned, evidence_requested, under_review, recommended, approved, rejected, expired, implemented, appealed, reversed, and superseded states.

Require typed reason, requested scope, evidence through Prompt 02, rule/input trace, reviewer/approver chain, effective period, expiry, conditions, comments, and SoD. An exception overrides only named rules for named candidates/courses; it cannot globally bypass eligibility or mutate source evidence.

Provide impact preview and require step-up authentication for high-risk approval. Preserve all original engine decisions and show the exception as a separate decision layer.

## 13. Candidate list validation and freeze

Implement:

- readiness checks for cycle/configuration, applications, payment, evidence freshness, pending exceptions, duplicate identities, course conflicts, missing photos/signatures, and calculation lag
- candidate counts and reconciliation by program/course/category/outcome
- exception and unresolved-data queues separated from eligible candidates
- Controller/exam-cell attestation and configured multi-stage approval
- immutable freeze version with candidate/course/component snapshot, eligibility decision versions, schedule version, hall-ticket template version, hash, timestamp, and approvers
- freeze diff versus prior preview/version
- post-freeze correction only through controlled reopen/superseding freeze with impact, approval, audit, notifications, and invalidation events
- downstream contract for question-paper quantities, seating/conduct, valuation, and results without revealing unnecessary personal data

No background reevaluation silently modifies a frozen candidate set.

## 14. Hall-ticket generation and lifecycle

Generate hall tickets only from a frozen approved candidate version:

- institution branding, exam cycle/session, opaque candidate/exam number, permitted identity fields/photo, program/term, selected exams, dates/times, reporting time, venue placeholder when assigned, instructions, accommodations display limited to operational need, and issue metadata
- template/version, locale, accessible PDF, print layout, and native wallet/download boundary where supported
- generated, quality_check, issued, released, withheld, downloaded, superseded, revoked, reissued, and expired states
- batch generation as resumable idempotent job with per-item errors and checksum
- immutable issued artifact and manifest/source hash
- reissue/supersede with reason; never silently replace downloaded artifacts
- student access only after configured release conditions
- withholding/release workflow with reason, reviewer, expiry, and appeal

Do not put full student IDs, DOB, phone, email, fee/attendance details, or predictable database IDs in QR codes or public links.

## 15. Hall-ticket verification

Implement privacy-safe verification:

- cryptographically random opaque token or signed token containing only minimal non-PII claims and key/version identifiers
- short/appropriate validity, rotation, revocation, replay/rate monitoring, and key management through AWS KMS/Secrets Manager
- authenticated verification for exam staff with richer operational result
- optional public/minimal verification returning only valid/invalid/revoked/expired, institution/cycle label, masked candidate reference, and permitted exam date/status
- server-side current-status check so revoked/superseded tickets cannot appear valid solely from old signatures
- online-first verifier; if offline verification is later required, document stale/revocation limitations and use signed allowlisted snapshots
- scan audit with purpose/device/actor where authenticated, without storing unnecessary location

QR is a lookup/verification mechanism, not identity proof by itself. Exam staff must follow configured identity-check procedures.

## 16. Candidate and exam identifiers

Implement governed number allocation where required:

- application number, candidate/exam number, and hall-ticket number series by institution/cycle/program or configured scope
- non-reuse, concurrency safety, reserved/issued/void states, checksum/format validation, and audit
- avoid encoding sensitive demographics or predictable internal database IDs
- correction/reissue rules preserving historical identifiers and aliases

Do not alter the authoritative institutional student/roll number owned by Prompt 05.

## 17. Notifications and communications

Provide localized, audience-scoped notifications for:

- cycle announcement and windows
- application saved/submitted/returned/accepted/rejected
- fee pending/confirmed/failed status reference
- evidence missing, eligibility outcome/required action, exception decision, and appeal deadline
- candidate freeze, hall-ticket release/withhold/reissue/revocation
- schedule amendment/postponement/cancellation

Use transactional outbox, deduplication, quiet-hour/priority policy, delivery tracking, retry/dead-letter, acknowledgement where required, and minimal push/SMS/email content. Notifications must deep-link to authenticated current state and never include sensitive eligibility reasons, payment details, or hall-ticket tokens.

## 18. Reports, dashboards, and governed exports

Implement authorized views for:

- cycle/configuration/readiness
- potential candidates and application completion
- fee pending/confirmed by aggregate and authorized detail
- eligible/ineligible/pending/conditional/withheld outcomes with reason categories
- attendance/finance/internal/evidence freshness exceptions
- backlog/improvement/makeup selection counts
- schedule conflicts
- exception workload/aging/outcomes
- frozen candidate reconciliation and version comparison
- hall-ticket generation/release/download/withhold/reissue/revocation
- integration/event/job health

Reports state cycle/configuration/freeze/as-of version and exclusions. Exports require purpose, scoped permission, approval where configured, classification/watermark, field minimization, formula-injection protection, encryption, short expiry, download audit, and async generation for large output.

## 19. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- examination type/policy/template/instruction/series configuration and activation
- cycle draft/validate/review/approve/announce/open/close/amend/archive
- course/component derive/validate/amend and exam schedule/conflict/publish/amend
- potential-candidate preview and source exceptions
- application draft/submit/receipt/correct/withdraw/status
- finance fee request/evidence refresh and attendance/other-evidence refresh
- eligibility preview/evaluate/batch status/decision trace/rebuild/invalidate
- exception request/evidence/review/approve/reject/appeal/reverse
- candidate readiness/reconcile/attest/freeze/reopen/supersede
- hall-ticket generate/job status/quality check/release/withhold/download/reissue/revoke
- authenticated and public-minimal verification
- notifications/acknowledgements, dashboards, reports, governed exports, and operational queues

Use explicit DTOs and role-shaped responses, bounded pagination, allowlisted filters/sorts, RFC 7807, optimistic versions, idempotency keys, correlation IDs, server time, rate limits, audit, and generated clients.

Define least-privilege permissions for exam configuration, cycle maker/checker, course/schedule setup, candidate preview, student application, finance/attendance evidence view, eligibility execute/trace, exception review/approve, freeze/reopen, hall-ticket generate/quality/release/withhold/reissue/revoke, verification, report/export, audit, and platform health.

Enforce SoD for configuration activation, exception approval, candidate freeze/reopen, ticket release/withhold/reissue, and high-risk exports. Platform operations see job/event/provider health and trace IDs only—not applications, eligibility reasons, attendance/payment evidence, candidate lists, photos, or tickets.

Publish minimal idempotent events for cycle announced/windows changed, application submitted/accepted, eligibility decided/invalidated, exception decided/reversed, candidates frozen/superseded, schedule changed, and hall ticket released/withheld/reissued/revoked. Do not include sensitive evidence, full candidate identity, tokens, photos, or documents.

## 20. React web interfaces

Implement accessible responsive interfaces for:

- examination type/rule/window/template/series setup and version comparison
- cycle readiness, review, approval, announcement, and state control
- course/component setup and exam-schedule conflict management
- potential-candidate preview and source-data exceptions
- student application/correction/receipt/status
- eligibility policy trace, preview, batch progress, result dashboard, and freshness queue
- exception/evidence/recommendation/approval/appeal/reversal workbench
- candidate reconciliation, attestation, freeze, version diff, controlled reopen, and supersede
- hall-ticket template preview, generation, quality errors, release/withhold/reissue/revoke
- privacy-safe verifier and scan history
- reports, governed exports, audit, notifications, and operational health

Meet WCAG 2.2 AA intent with keyboard operation, screen-reader semantics, visible focus, non-color-only states, accessible tables/PDFs, high zoom, localized date/time/number formats, and clear distinction between pending, eligible, frozen, released, withheld, revoked, and expired states.

## 21. React Native Android/iOS interfaces for every role

Build genuine native role interfaces using real APIs, not WebViews or placeholders.

### Student

- exam-cycle timeline, eligible application categories, course selection, fee preview/status, declaration, submission, and durable receipt
- application correction/withdrawal where allowed
- explainable eligibility by course with permitted reason/action/deadline
- exception/accommodation request and evidence upload through secure document APIs
- schedule, hall-ticket release/withhold status, secure download/view/share where policy permits, and current-version warning
- notifications/deep links and privacy-safe support
- encrypted limited offline cache for schedule/ticket; applications/payments/exceptions/ticket refresh require server confirmation

### Guardian/Authorized Payer

- policy-permitted linked learner exam dates, application/fee action status, and notifications
- initiate Prompt 11 payment only within authorized payer scope
- no detailed attendance, disciplinary, exception, or eligibility evidence unless explicitly permitted

### Faculty/Mentor/Advisor

- authorized advisee/application completion and actionable pending-items view
- no confidential finance amounts or protected exception details
- mentor follow-up/acknowledgement; no eligibility override

### HOD/Program Coordinator

- candidate/application/course conflict and evidence-readiness dashboards
- assigned source-data/registration/equivalence exception review
- recommendation/comment and step-up action within configured scope
- bulk configuration and candidate reconciliation remain web-first

### Examination Cell Staff

- cycle/course/schedule/application/eligibility/exception/candidate/hall-ticket work queues
- mobile exception handling, status correction request, ticket quality/release operations within permission
- QR scan and authenticated current-status verification
- high-volume generation/freeze/export remains web-first with secure mobile review companion

### Controller of Examinations/Dean/Registrar/Approver

- readiness, rule/evidence/impact/SoD summaries
- step-up approval for configuration, exceptions, freeze/reopen, release/withhold/reissue/revoke
- authoritative server receipt and refreshed version after every decision

### Finance Staff/Cashier

- examination fee-request reference, Prompt 11 demand/payment/waiver/refund status, and finance exceptions within finance authority
- no eligibility override, attendance detail, or hall-ticket issuance

### Attendance/Academic Office Staff

- read-only requested evidence version/freshness and source correction links within their own module authority
- no finance mutation or final examination decision

### Invigilator/Exam-Day Verifier

- assigned cycle/session verification scanner, minimal candidate/ticket status, photo only where authorized, and verification outcome
- offline verification disabled unless an approved signed-snapshot design exists; visible staleness and later audit sync if enabled
- no full candidate list export or underlying eligibility evidence

### Accommodation/Student Welfare Staff

- assigned requests, operational accommodation status, evidence workflow, and recommendation
- protected reason/document access only where purpose-authorized; hall ticket exposes only necessary operational adjustment

### Auditor/Internal Quality

- read-only, time-bound cycle/configuration/decision/freeze/ticket/audit evidence and governed reports
- no operational mutation or unrestricted sensitive documents

### Tenant Administrator/Leadership

- configuration visibility and authorized aggregate dashboards
- no implicit exception approval, confidential evidence, candidate export, or ticket release

### Platform Operations

- job/event/document/QR/key/integration health, masked identifiers, and trace IDs
- no student application, evidence, candidate list, hall-ticket content, or decision detail

Mobile-wide requirements:

- secure OS keystore, app lock/step-up for sensitive actions, device registration/risk policy, and rooted/jailbroken-device response where configured
- encrypted tenant/user-partitioned allowlisted cache; purge on logout, role/membership/relationship loss, tenant switch, device revocation, ticket revocation, or retention expiry
- push payloads contain no hall-ticket token, full candidate ID, payment/attendance detail, photo, or sensitive reason
- deep links reauthenticate, reauthorize, validate state/nonce, and fetch current server state
- QR scanning requests minimum camera permission and does not retain frames by default
- explicit draft/submitted/pending/eligible/ineligible/frozen/released/withheld/revoked/stale states
- applications, exceptions, approvals, freezes, releases, scans, and acknowledgements are official only after server receipt
- accessibility, dynamic type, localization, low-connectivity recovery, safe retry, and downloadable-document protection
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role and intentional no-access/web-first case

## 22. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized tables such as:

- exam type/policy/configuration/version/window/rule reference
- exam cycle/version/state history/approval/readiness
- exam course/component/source mapping/schedule/version/conflict
- potential candidate/source snapshot/exception
- application/version/course selection/declaration/receipt/correction
- fee request/evidence reference and attendance/other evidence reference
- eligibility run/input snapshot/decision/rule trace/invalidation
- eligibility exception/evidence/review/decision/appeal/reversal
- candidate freeze/version/item/attestation/reconciliation
- number series/reservation/issuance/void
- hall-ticket/template/version/artifact manifest/state history/reissue/revocation
- verification token/key reference/scan audit
- notification/acknowledgement/export/report/job/projection checkpoint

Use repository-consistent names. Every tenant-owned table carries tenant/institution/campus/cycle and applicable student/program/course scope; foreign keys cannot cross tenants; repositories require explicit scope predicates; enable and force RLS where constitutionally required. Add immutable-version, unique/idempotency, number-series, state, temporal, checksum/hash, optimistic-lock, and consistency constraints plus appropriate indexes/retention fields.

Test student, guardian, faculty/mentor, academic, exam-cell, controller, finance, verifier, worker, reporting, audit, migration, and operations database roles separately. Technical roles never receive general examination RLS bypass.

## 23. Security, privacy, audit, and resilience

Threat-model:

- eligibility rule/input/client tampering
- stale, forged, or cross-student attendance/payment evidence
- unauthorized exception/override, freeze/reopen, or hall-ticket release
- candidate-list leakage and enumeration
- predictable ticket/application numbers and forged/replayed QR tokens
- stolen mobile device, screenshots, cached revoked ticket, and malicious deep links
- public verifier disclosing PII or enabling bulk enumeration
- photo/document leakage and overbroad invigilator access
- out-of-order invalidation events and stale downstream use
- insider export, approval, or emergency-access abuse

Apply purpose/context authorization, field-level response shaping, step-up authentication, SoD, rate limiting, non-enumerable identifiers, KMS-backed key rotation, short-lived signed access, encryption, document scanning, audit, anomaly alerts, and cache revocation. Never log tokens, QR payloads, photos, documents, full candidate lists, detailed evidence, or sensitive reasons.

Define retention/legal hold, ticket/document expiry, privacy/export, backup/restore, key rotation, event replay, evidence refresh, eligibility rebuild, candidate-freeze recovery, document-generation reconciliation, QR incident response, RPO/RTO, SLIs/SLOs, alerts, and degraded modes. Fail closed for missing/stale evidence and verification uncertainty; never guess eligibility.

## 24. Tests

Implement and run:

- configuration precedence, overlap/contradiction/window validation, immutable activation, amendments, and cycle state transitions
- all exam types and regular/backlog/supplementary/improvement/makeup/special policy matrices
- course/component derivation, equivalence/substitution, no-exam courses, and schedule conflict/time-zone/extra-time cases
- application window/late/correction/withdrawal/idempotency/concurrency/receipt and server-authoritative selections
- Prompt 11 fee request, pending/paid/waived/reversed/refunded/disputed/hold evidence; browser return never authoritative
- Prompt 08 eligible/shortage/condoned/detained/pending/invalidated/stale evidence without recalculation
- missing internal/result/no-dues provider states and explicit policy routing
- deterministic eligibility matrix for regular, attendance shortage, condoned, detained, fee hold, backlog, improvement, prerequisite, conflict, exception, and frozen cases
- incremental versus full rebuild convergence, out-of-order events, stable trace/hash, version pinning, and invalidation
- exception scope/expiry/SoD/step-up/appeal/reversal and preservation of original decision
- readiness, reconciliation totals, duplicate candidate, freeze concurrency, immutability, reopen/supersede, and downstream invalidation
- hall-ticket batch idempotency, template/source hash, quality failure, release/withhold/reissue/revoke, accessible PDF, and stale artifact warning
- number-series concurrency/non-reuse/void/checksum
- QR/token signature/rotation/revocation/replay/rate limit/enumeration resistance and privacy-minimal public/authenticated verification
- notification/deep-link privacy, authorization, deduplication, and current-state refresh
- report/export authorization, minimization, formula injection, encryption, expiry, and audit
- RLS negative tests across tenant, institution, campus, cycle, program, student, guardian, faculty/mentor, exam staff, verifier, finance, auditor, and technical roles
- web accessibility and Playwright journeys for student, guardian, mentor, HOD, exam staff, Controller, finance, academic/attendance, accommodation staff, verifier, auditor, admin, and operations
- Android/iOS role journeys, secure ticket cache/revocation/purge, payment app return, QR scan, deep-link reauthorization, step-up approval, offline/stale behavior, and authoritative receipts
- outbox/inbox retries/reordering, worker crash recovery, finance/attendance/document/notification outage, backup restore, eligibility rebuild, artifact reconciliation, and documented target-volume performance

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim payment provider, QR hardware, native-device, cryptographic assurance, or iOS evidence that was not executed.

## 25. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- examination-entry glossary and state diagrams
- exam-type/configuration/rule catalogue and precedence specification
- application, attempt-category, correction, fee, and source-evidence contracts
- deterministic eligibility engine specification with worked rule matrices, snapshots, traces, freshness, and invalidation
- exception/appeal/SoD policy
- candidate readiness/reconciliation/freeze/reopen/supersede specification
- hall-ticket template/artifact/number-series/QR verification/key-rotation/privacy design
- future question-paper, seating/conduct, online assessment, marks/results, and OBE integration ports
- permission/scope/SoD matrix and mobile role-feature matrix
- threat model/privacy assessment
- runbooks for window correction, stuck application/payment, stale attendance evidence, batch eligibility failure, exception backlog, freeze error/reopen, ticket generation failure, QR/key compromise, schedule postponement, downstream invalidation, backup restore, and disaster recovery
- role guides for students, guardians, mentors, HOD/program, exam cell, Controller/Dean/Registrar, finance, attendance/academic, accommodation staff, invigilators/verifiers, auditors, tenant administrators, and operations

The completion gate passes only when:

1. Versioned examination cycles/types/rules/windows/course components validate, approve, activate, amend, and retain complete history.
2. Students can submit/correct/withdraw allowed exam applications with server-authoritative course choices, fees, timestamps, and durable receipts.
3. Registration, attendance/condonation, finance, status, prerequisite, and exception evidence is consumed through versioned contracts without copying or fabricating source truth.
4. Eligibility is deterministic, explainable, reproducible, freshness-aware, version-pinned, rebuild-convergent, and never trusted from clients.
5. Exceptions are narrowly scoped, time-bounded, evidence-backed, separately layered, step-up protected, and SoD controlled.
6. Candidate readiness and freeze reconcile all candidates, preserve immutable snapshots, and require controlled superseding versions after freeze.
7. Hall tickets are generated idempotently from frozen candidates, versioned, accessible, releasable/withholdable/revocable, and never silently replaced.
8. QR verification is non-enumerable, revocation-aware, privacy-minimal, rate-limited, auditable, and explicitly not standalone identity proof.
9. Notifications, reports, and exports minimize sensitive data and always use current authorization.
10. Every relevant role has a meaningful React web and native Android/iOS interface or an intentional secure no-access state; complex bulk operations remain web-first with mobile review/action companions.
11. Mobile caches are encrypted/scoped/purgeable, deep links reauthorize, stale/revoked tickets are visible, and official actions require server receipts.
12. Every tenant table has explicit predicates, forced RLS as required, constraints, and cross-tenant/cross-role negative tests.
13. OpenAPI/events/generated clients, migrations, security, accessibility, observability, docs, ADRs, runbooks, and all environment-available tests pass.
14. No question-paper generation, seating/invigilation, online delivery, marks/valuation/results, attainment, or fabricated evidence/provider behavior was implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, cycle/application/fees/evidence/eligibility/exceptions/freeze/hall-tickets/verification, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency, tests with exact commands/results/exit status, docs/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(exams): implement applications eligibility and hall tickets`

Stop. Do not begin Prompt 13 or implement secure question-paper governance.
```

---

## Review Checklist Before Prompt 13

- Examination rules, cycles, windows, courses, and schedules are versioned and immutable after activation/publication.
- Applications trust only server-side course, deadline, fee, and eligibility logic.
- Attendance and finance evidence is versioned, freshness-aware, and never duplicated or fabricated.
- Eligibility decisions are deterministic, explainable, snapshot-based, rebuildable, and invalidatable.
- Exceptions preserve the original decision and enforce narrow scope, expiry, evidence, SoD, and step-up approval.
- Candidate freezes are reconciled and immutable; later changes create a superseding version.
- Hall tickets are accessible, revocable, privacy-safe, and generated only from frozen candidates.
- QR verification resists enumeration and never substitutes for full identity checking.
- Every relevant role has a meaningful web/mobile workflow or intentional no-access state.
- Every tenant table has RLS and negative isolation tests.
- No Prompt 13+ question-paper, conduct, marks, results, or attainment workflow was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 13 until these conditions pass.
