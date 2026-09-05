# Claude Code Prompt 14

## Examination Logistics, Seating, Duties, and Script Custody

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–13 passed, were reviewed, and were committed  
**Scope:** Examination centers and rooms, deterministic seating, staff-duty allocation, exam packets, exam-day attendance and incidents, answer-booklet/barcode control, practical/viva logistics, and reconciled answer-script custody

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially examination logistics, seating, invigilation, accommodations, attendance, malpractice, practical/lab/viva exams, answer booklets, barcodes, custody, printable registers, audit, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, all relevant ADRs, module boundaries, and repository conventions.
3. Inspect Prompt 07 room/lab/faculty scheduling contracts, Prompt 12 exam cycle/schedule/frozen candidate/hall-ticket/accommodation references, Prompt 13 sealed question-paper package and handoff contracts, Prompt 05 student identity references, Prompt 01 workforce/identity/RBAC, and Prompt 02 workflow/audit/document/outbox services.
4. Inspect OpenAPI/generated clients, PostgreSQL RLS, permissions/SoD, data dictionary, barcode/QR utilities, object storage/document generation, offline mobile command patterns, notification service, jobs/observability, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, expose confidential question-paper content, generate/decrypt papers, evaluate answer scripts, enter marks, publish results, calculate attainment, or invent hardware/provider integrations.

Implement a bounded `examination-logistics` domain. It owns centers, exam-compatible room snapshots, seat and duty plans, operational artifacts, exam-day candidate events, booklet/script identifiers, sealed packet handoffs, incidents/malpractice case initiation, and answer-script custody up to authorized evaluation handoff. It does not own candidate eligibility, question-paper authoring/content, evaluation, marks, or results.

## 1. Operational invariants

Enforce:

- all operations are tenant/institution/exam-cycle/session scoped and reference immutable frozen candidates and published examination schedules from Prompt 12
- only opaque sealed-package references are consumed from Prompt 13; paper content, keys, filenames, and sensitive selection metadata never enter this module
- published/frozen seating and duty plans are immutable; changes create approved versions and impact reports
- every physical count movement reconciles opening quantity, issued, used, unused, spoiled/cancelled, missing, and returned quantities
- one candidate has at most one effective seat per exam session and one valid attendance outcome
- one staff member cannot hold overlapping duties or incompatible roles
- answer-booklet/script identifiers are unique, non-reusable, and never reassigned silently
- every handoff has sender, receiver, server timestamp, location/scope, counts, seal/package condition, acknowledgement, and immutable receipt
- offline mobile commands are queued evidence, not official state, until accepted by the server
- no client supplies authoritative allocations, counts, eligibility, time, or sequence numbers
- tenant and scope isolation apply at API, repository, RLS, object, cache, event, export, and mobile layers

Create explicit state machines and count-reconciliation equations before implementation.

## 2. Examination centers, buildings, and rooms

Implement cycle-specific operational snapshots referencing Prompt 07 facilities:

- examination center, campus, building, floor, room/hall/lab, code, address, time zone, access route, and emergency-contact reference
- room type, safe capacity, desk/seat layout, rows/columns/zones, entrances/exits, accessibility, power/network, CCTV-presence metadata, storage, and permitted exam modes
- lab workstation capacity and equipment capability references
- isolation/scribe/medical/rest-room designation
- unavailable/maintenance/blocked windows and emergency closure
- room priority and ownership/approval
- temporary examination-only capacity/layout adjustment with reason and safety approval
- immutable room/layout snapshot used by each published allocation

Do not duplicate the facilities master. Never exceed safe capacity because a configured target cannot be met.

## 3. Exam sessions and logistics requirements

Derive logistics sessions from Prompt 12 published exam schedules:

- exam date, start/end, reporting time, course/component, mode, candidate category, center/campus, and accommodation implications
- expected frozen candidates and operational count watermark
- room/lab capacity requirement
- staff roles and ratios
- standard/supplementary answer-booklet and material requirements
- confidential paper sealed-package handoff placeholder
- practical/viva/project configuration
- draft, planning, validated, approved, published, frozen, in_progress, completed, reconciled, archived, amended, postponed, and cancelled states

Consume schedule amendments idempotently. After logistics publication/freeze, create an impact exception rather than silently rebuilding.

## 4. Seating policy and constraints

Implement effective-dated policy for:

- seat layout and usable-seat masks
- maximum room capacity and reserved contingency seats
- course/subject/branch/program mixing or separation
- alternate-row/column and adjacency rules
- same-course, same-program, same-section, repeat/backlog, and related-paper separation
- candidate-number ordering/randomization policy
- accessibility, wheelchair, scribe, extra-time, medical, low-vision/hearing, and other approved operational accommodations
- gender/privacy or security zoning only where lawful and institutionally required
- late/special candidates and isolation rooms
- center/room assignment eligibility and travel constraints
- prohibited seats/areas and emergency exits
- algorithm seed governance, manual override policy, and approval thresholds

Rules are declarative, versioned, validated, and explainable. Hard constraints cannot be silently relaxed. Any authorized exceptional relaxation states the exact rule, reason, impact, approver, and affected candidates without exposing protected accommodation reasons.

## 5. Deterministic seating allocation

Implement asynchronous allocation capable of:

- consuming an immutable candidate/session/room-layout/policy snapshot
- deterministic output for the same seed, algorithm version, and inputs
- hard-constraint satisfaction and separately scored soft preferences
- candidate-to-center/building/room/seat assignment
- unallocated candidate list with stable reason codes
- unused capacity and contingency-seat summary
- adjacency validation and conflict graph/explanations
- multiple candidate categories and accommodation placements
- candidate/room/course distribution statistics
- cancel/retry/resume and crash-safe job behavior
- compare candidate plans without claiming global optimality unless proven

Record the algorithm, seed, input hash, output hash, solver/library version, license, score, and unplaced explanations. Adopt a constraint solver only through an ADR and verified license/support.

## 6. Manual adjustment, validation, and publication

Implement:

- authorized drag/drop plus keyboard-accessible list/form alternative
- server-side validation after every move/swap
- draft locks/leases, optimistic concurrency, stale-plan recovery, and change sets
- seat swap, room move, candidate addition/removal from superseding frozen candidate input, accessibility adjustment, and contingency-seat use
- reasoned override only for explicitly overrideable rules
- full plan revalidation, readiness checklist, reviewer comments, and impact preview
- approval, publication, freeze, version comparison, and targeted notification
- emergency amendment with step-up authentication, approver, reason, affected artifacts/candidates/staff, and superseding version

Never mutate a published/frozen plan in place.

## 7. Examination staff roles and eligibility

Support operational roles:

- chief superintendent/center superintendent
- deputy/additional superintendent
- invigilator
- reliever/reserve invigilator
- observer/flying squad
- room superintendent where configured
- scribe/reader/support person
- lab examiner/technical assistant/lab assistant
- practical/viva/project internal examiner
- external examiner
- question-paper custody officer
- answer-script collection/custody/evaluation-dispatch officer
- medical/security/administrative support reference

Use existing workforce/identity references; do not duplicate HR master data. Define future Prompt 24 HR availability/workload ports.

Validate employment/affiliation status, conflict-of-interest, course/department relationship, candidate relationship where declared, qualification, gender/support policy where lawful, training/acknowledgement, availability, campus travel, workload, and barred/suspended status.

## 8. Staff-duty allocation

Implement versioned policy for:

- staff-to-candidate/room ratio
- chief/observer/reliever/support requirements
- internal/external examiner composition
- same-department/course conflict rules
- maximum daily/weekly duties, consecutive sessions, rest/travel buffers, fairness, and prior-duty balance
- reserve pool and substitution chain
- accessibility/scribe/support skill requirements

Provide deterministic assisted allocation with seed/input snapshot, hard conflicts, soft score, unassigned duties, and explanation. Support manual assignment with server validation.

Implement assigned, notified, acknowledged, declined, replacement_requested, substituted, checked_in, completed, absent, cancelled, and superseded states. Decline/substitution requires reason, approval where configured, conflict revalidation, and notifications.

## 9. Duty orders and acknowledgements

Generate versioned accessible duty orders containing only necessary operational data:

- staff, role, center/building/room or reporting point, date/time, reporting time, instructions, contact/escalation reference, and acknowledgement deadline
- no confidential paper title/content, candidate sensitive data, or answer key
- document template/version, issue/reissue/revoke, checksum, classification, and download audit
- in-app/push/email notification with minimal content
- staff acknowledgement, declared conflict, decline/request replacement, and authoritative receipt
- check-in boundary using approved method; QR/location are supporting evidence, not sole proof

## 10. Operational document and packet catalogue

Generate versioned artifacts from immutable plan snapshots:

- center and room nominal rolls
- candidate attendance sheets
- seating charts and door/desk labels
- invigilator/reliever/observer duty orders
- room instructions and incident forms
- scribe/accommodation operational sheet with minimum necessary detail
- booklet/material issue and return registers
- confidential sealed-paper dispatch/receipt register using Prompt 13 opaque package IDs only
- answer-script packet cover, count sheet, handover and discrepancy forms
- practical/lab/viva batch schedule and panel orders

Every artifact includes version, generated time, source snapshot/hash, classification, page/count metadata, and superseded watermark where applicable. Regeneration after publication requires reason and audit. Use accessible PDF plus governed CSV/XLSX only where appropriate.

## 11. Consumables, answer booklets, and barcode identifiers

Implement operational control for:

- answer booklet types, supplementary sheets, graph sheets, drawing sheets, OMR/reference boundary, rough sheets, and other configured materials
- stock-lot/vendor/reference metadata without implementing procurement
- secure serial/barcode/QR range registration, validation, reservation, issue, use, spoil, cancel, return, quarantine, destroy, and archive states
- center/room/session allocation and counts
- candidate-to-booklet binding at exam time
- additional-booklet linking and sequence
- duplicate/unrecognized/out-of-range/wrong-session/wrong-center scans
- damaged/spoiled booklet replacement preserving both identifiers and reason
- concurrency-safe uniqueness and anti-replay/idempotency

Barcode/QR contains only opaque identifier/check data, not student or course PII. Support manual entry with check digit and second-person verification when scanning fails.

## 12. Pre-exam center and room readiness

Implement checklists for:

- room/layout/seat labels and accessibility
- clock, lighting, ventilation, power/network/lab equipment
- candidate lists, attendance forms, stationery, booklet ranges, seals/packets, and emergency supplies
- staff assignment/acknowledgement/reserve coverage
- paper-package expected reference and custody officers
- security/medical/fire/emergency arrangements
- prohibited device/material notices
- unresolved capacity, candidate, accommodation, staff, artifact, or material exceptions

Each checklist item has owner, evidence reference, status, comment, due time, verification, and escalation. Readiness does not reveal paper content.

## 13. Exam-day staff check-in and room opening

Implement:

- staff check-in with server time, assigned site/session/role, approved QR/device/location evidence where policy permits, and manual verified fallback
- absent/late staff alert and reserve substitution
- room-open checklist and authorized staff presence
- sealed question-paper package receipt reference from Prompt 13, seal/identifier/condition check, received/opened timestamps, witnesses, and discrepancy escalation
- opening only within authorized window; this module records custody/open event but does not decrypt/view/generate paper content
- materials/booklet-range receipt and count
- room ready/start/delayed/paused/evacuated/resumed/closed states

Do not claim GPS/QR proves presence. All evidence is policy-scoped and reviewable.

## 14. Candidate verification and exam attendance

Using the frozen Prompt 12 candidate and hall-ticket versions, implement:

- room roster and seat verification
- hall-ticket QR/opaque reference validation using Prompt 12 service
- identity verification outcome according to policy, with minimal data
- present, absent, late_admitted, denied_entry, provisional_entry, transferred_room, evacuated, completed, early_exit, and removed states
- entry time, late reason/approval, seat change, booklet binding, signature/acknowledgement reference, and invigilator receipt
- offline-capable mobile roster only for assigned rooms under a signed authorization window
- conflict-safe sync and final server reconciliation
- no biometric/face-recognition implementation without separate lawful governance and ADR

Exam attendance is separate from Prompt 08 instructional attendance. Never rewrite the frozen candidate list or hall-ticket decision.

## 15. Time, accommodations, and candidate events

Use server-authoritative exam timing:

- scheduled start/end, actual start, approved delay, general extension, candidate-specific extra time, late-entry cutoff, early-exit restriction, and warning announcements
- pause/evacuation/resume with calculated end-time impact and approval
- accommodation operational instructions visible only to staff who need them
- scribe/reader/support person assignment, declaration, check-in, and candidate linkage
- alternate room/assistive technology/rest break/additional time handling
- no protected diagnosis in room lists or general artifacts

Persist a deterministic timing ledger so later evaluation/results can distinguish absence, partial attendance, interrupted exam, and approved special cases.

## 16. Exam-day incidents and malpractice initiation

Implement incident categories:

- candidate illness/emergency
- late entry/early exit/removal
- identity/hall-ticket discrepancy
- prohibited material/device
- communication/collusion/suspected impersonation
- disturbance/misconduct
- question-paper/printing/error report without copying paper content
- booklet/barcode/count mismatch
- power/network/lab equipment failure
- room/security/fire/weather disruption
- staff absence/misconduct
- suspected paper/package compromise linked to Prompt 13 incident port

Support draft, reported, acknowledged, contained, escalated, under_review, referred, closed, and reopened. Capture typed facts, time, location, participants, witnesses, actions, evidence through Prompt 02, and custody references.

Malpractice is a confidential governed case initiation, not an automatic guilt finding. Preserve presumption, role-restricted evidence, candidate notification/representation boundary, review-panel handoff, and audit. Do not implement final disciplinary adjudication unless explicitly owned by an existing workflow contract.

## 17. Room close and reconciliation

Require room-level reconciliation:

- frozen candidates versus present/absent/late/provisional/removed totals
- answer booklets reserved/received/issued/used/unused/spoiled/missing/returned
- supplementary-material counts
- scripts expected versus collected
- candidate-booklet mappings complete
- incident/discrepancy references
- paper/material packet return or destruction reference
- invigilator and room superintendent attestations
- unresolved mismatch blocks normal close and enters escalation workflow

Support closed_pending_exception, reconciled, reopened, and superseded states. Reopening requires reason, step-up authorization, impact report, and re-attestation.

## 18. Answer-script packet formation

Implement:

- collected script verification by opaque booklet/barcode ID
- expected script set derived from authoritative candidate attendance, excluding documented no-script outcomes
- anonymization/masking code generation boundary where policy requires
- packet/bundle creation by exam/course/component/room or configured rule
- packet ID, script count, serial/barcode range/reference, seal ID, weight/reference if used, source room, destination, and custody class
- duplicate/missing/extra/unrecognized/wrong-course/wrong-session/damaged/unbound script exceptions
- sealed, quality_checked, handed_over, in_transit, received, quarantined, opened_for_authorized_processing, returned, archived, and superseded states
- two-person count/verification where configured

Do not store answer-script images or evaluate content in this prompt. Define a future digitization/evaluation handoff port using opaque script/package IDs.

## 19. Chain of custody

Implement append-only custody events for:

- question-paper sealed package reference from secure store to center/room and return/destruction
- unused/spoiled booklet ranges
- completed answer-script packets from room to center control, secure storage, transport, evaluation center, and authorized future scanning/evaluation handoff

Each handoff records previous/next custodian, role, organization/site, opaque package, expected/actual count, seal/condition, departure/receipt times, transport/reference, witness, discrepancy, evidence, device/event ID, and both acknowledgements where possible.

Use server-assigned monotonic package sequence plus idempotent device event ID. Reject impossible transitions, duplicate receipt, broken chain, wrong destination, stale version, or count mismatch. Offline custody capture must preserve signed authorization window, sequence, device identity, and conflict review; queued events never appear final until server receipt.

## 20. Practical, laboratory, viva, and project logistics

Implement:

- candidate batch and time-slot assignment
- lab/room/workstation/equipment capability snapshot
- internal/external examiner and support-panel allocation
- faculty/candidate/room conflict checks
- question/task sealed-reference boundary without content
- attendance, start/end, workstation/experiment reference, accommodation, incident, and completion status
- batch nominal roll, panel order, attendance sheet, materials checklist, and script/record/evaluation-envelope custody
- external examiner invitation/acceptance/conflict/NDA/travel-reference boundary
- substitution/reallocation and versioned publication

Do not implement marks entry or examiner remuneration. Expose clean ports to Prompt 15 evaluation and future HR/expense modules.

## 21. Notifications and operational communications

Provide minimal targeted notifications for:

- candidate room/seat/schedule change through authenticated current state
- staff duty assignment, acknowledgement, reminder, replacement, and check-in issue
- center/room readiness exception
- packet dispatch/receipt mismatch
- incident escalation
- script count/custody exception

Use transactional outbox, deduplication, delivery tracking, retry/dead-letter, quiet/priority rules, and acknowledgement. Never place candidate lists, accommodation reasons, paper/package sensitive details, script IDs, or malpractice allegations in push/SMS/email payloads.

## 22. Dashboards, reports, and governed exports

Provide authorized dashboards for:

- capacity and unallocated candidates
- seating validation and version status
- duty coverage/conflicts/acknowledgements/substitutions
- readiness by center/room/session
- exam-day candidate attendance and timing
- booklet/material allocation and reconciliation
- incidents/malpractice referrals
- room close and unresolved discrepancies
- script expected/collected/missing/extra/quarantined
- custody aging, broken seals, overdue handoffs, and chain integrity
- practical/viva/lab batches and panels

Reports state cycle/session/plan/version/as-of time and data-quality exceptions. Exports/print artifacts require scoped permission, purpose, classification/watermark, minimized PII, formula-injection protection, short expiry, download/print audit, and regeneration history.

## 23. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- center/building/room/layout snapshot and availability
- logistics session/requirements/readiness
- seating policy/validate/generate/job/candidate plans/conflicts/manual changes/review/publish/freeze/amend
- staff role/policy/eligibility/availability provider/duty generate/assign/publish/acknowledge/decline/substitute/check-in/complete
- operational artifact generate/status/download/supersede
- booklet/material catalogue/range/reserve/issue/bind/spoil/return/reconcile
- pre-exam and room-open checklists
- candidate verification/attendance/timing/seat transfer/room close
- accommodation operational assignment
- incident/malpractice initiation/evidence/escalation/referral
- script collect/verify/packet/seal/quarantine/reconcile
- custody dispatch/handover/receive/discrepancy/history
- practical/lab/viva/project batch/panel/schedule/attendance/handoff
- dashboards/reports/governed exports and operational queues

Use explicit role-shaped DTOs, bounded pagination, allowlisted filters/sorts, RFC 7807, optimistic versions, idempotency keys, correlation IDs, server time, rate limits, authorization, audit, and generated clients.

Define least-privilege permissions for facility snapshot, seating generate/edit/review/approve/freeze, duty allocate/acknowledge/substitute, artifact generate/print, booklet range/admin/issue/bind/reconcile, center/room readiness, candidate verification/attendance, accommodation operations, incident report/review, malpractice referral, script packet/count, custody send/receive, practical/viva logistics, report/export, audit, and platform health.

Enforce SoD for published-plan amendments, high-impact manual allocation overrides, booklet-range correction, room reconciliation reopen, malpractice referral review, custody discrepancy resolution, and script-count adjustment. Platform operations see health, counts, error codes, and trace IDs only—not rosters, seats, accommodations, incidents, scripts, or packet routes by default.

Publish minimal idempotent events for seating/duty plan published or superseded, duty acknowledged/substituted, room started/closed/reconciled, candidate attendance finalized, incident referred, script packet sealed/quarantined/reconciled, custody handed over/received/discrepant, and practical batch completed. Never include paper content, candidate list, protected accommodation reason, allegation details, or full script identifiers.

## 24. React web interfaces

Implement accessible responsive interfaces for:

- center/room/layout snapshot and exam capability
- logistics requirement/readiness dashboard
- seating policy, generation progress, plan comparison, grid plus accessible list/form, conflicts, unallocated candidates, review/freeze/amendment
- staff eligibility, duty generation, coverage, conflicts, substitutions, publication, and acknowledgement monitoring
- operational artifact catalogue/preview/generation/versioning
- booklet/range/material administration, allocation, issue, return, reconciliation
- center/room exam-day control, attendance, timing, accommodations, incidents, and close
- malpractice confidential intake/referral queue
- script verification, packet formation, seal/count, discrepancy, and custody chain
- practical/lab/viva batches, panels, rooms, schedules, attendance, and handoff
- reports, governed exports, audit, job/integration health

Meet WCAG 2.2 AA intent: keyboard-accessible allocation alternatives, screen-reader semantics, visible focus, high zoom, non-color-only conflicts, localized date/time/number formats, printable artifact accessibility, and minimal exposure of protected data.

## 25. React Native Android/iOS interfaces for every role

Build genuine native role interfaces using real APIs, not WebViews or placeholders.

### Student

- assigned center/building/room/seat, reporting time, permitted instructions, schedule amendments, and hall-ticket deep link
- privacy-safe wayfinding and accessibility contact reference
- authenticated current status with encrypted short-lived offline schedule cache and version/staleness
- no other candidate seating, staff duty, paper, incident, booklet, or custody data

### Guardian

- only policy-permitted linked learner exam schedule/center/reporting reminders and major schedule change
- no seat map, candidate list, incidents, accommodations, scripts, or staff details

### Invigilator/Room Superintendent

- assigned duty, instructions, acknowledgement/decline/conflict, check-in, room readiness
- assigned room roster/seat view, hall-ticket verification, candidate attendance, late/early events, booklet scan/bind, accommodation operations, incident report, material/script count, room reconciliation, and handoff receipt
- signed encrypted offline session roster and command queue only for assigned room/window; authoritative sync receipt required

### Chief/Center Superintendent

- center readiness, staff check-in/absence/reserve substitution, room start/status, packet receipt/open witnesses, incidents, room close, count mismatches, and center reconciliation
- step-up approval for emergency room/seat/staff/count actions

### Reliever/Observer/Flying Squad

- assigned duties/routes, check-in, room visit, checklist, observation/incident report, and acknowledgement
- only scoped room/candidate detail necessary at the time

### Scribe/Reader/Support Person

- assignment, declaration, check-in, operational instructions, timing, and completion acknowledgement
- no diagnosis, unrelated candidate information, paper archive, or marks

### Lab Assistant/Technical Support

- assigned lab/session/batch/workstation readiness, candidate operational status, equipment incident, and handoff
- no evaluation marks or broader roster access

### Internal/External Practical/Viva/Project Examiner

- assignment, conflict/NDA, schedule/batch, attendance/completion, incident, and evaluation-envelope handoff
- Prompt 15 will own marks/evaluation; no marks entry here

### Question-Paper Custody/Dispatch Officer

- opaque sealed-package scan, seal/condition/count/reference, send/receive/open-window evidence, witness, discrepancy, return/destruction handoff
- never displays paper content, key, filename, or set-selection details

### Answer-Script Collection/Custody Officer

- room packet intake, expected/actual counts, barcode verification, packet/seal creation, dispatch/receive, discrepancy/quarantine, and chain timeline
- offline queue permitted only under signed scope/window with final server reconciliation

### Examination Cell/Logistics Coordinator

- plan/duty/readiness/artifact/booklet/attendance/incident/script/custody dashboards and exception queues
- mobile review/actions for urgent operations; generation, bulk edits, and large exports remain web-first

### Controller of Examinations/Dean/Registrar/Approver

- plan/readiness/amendment/count/incident/custody impact and SoD summaries
- step-up approve/reject/reopen/resolve within authority with server receipt

### Security/Medical/Emergency Staff

- assigned alert/location/category and minimum necessary candidate/room information
- containment/response/status handoff; no paper, answer script, diagnosis beyond need, or broad roster access

### Auditor/University Observer

- time-bound read-only plan/version/count/custody/approval/audit views and governed reports
- no paper content, answer content, or unnecessary PII

### Tenant Administrator/Leadership

- policy/configuration visibility and authorized aggregate operational dashboards
- no implicit candidate, incident, accommodation, script, or confidential package access

### Platform Operations

- job/event/document/barcode/sync health, masked tenant/session references, error codes, and trace IDs
- no rosters, seats, duties, incidents, accommodations, packet IDs/routes, or script mappings

Mobile-wide requirements:

- secure OS keystore, app lock/step-up, device registration/risk policy, and rooted/jailbroken-device response
- encrypted tenant/user/session-partitioned allowlisted cache with signed scope/window and purge on logout, role/membership/duty loss, tenant switch, remote revoke, session close, or expiry
- no question-paper content or answer-script image caching
- push payloads minimize candidate/staff/package data; deep links reauthenticate, reauthorize, and fetch current state
- QR/barcode camera frames are not retained; scans include event UUID and replay protection
- explicit offline/queued/synced/rejected/stale/reconciled states; queued attendance/count/custody never appears final
- conflict resolution handles changed plan/roster/range/package state without silent last-write-wins
- accessibility, dynamic type, localization, low-connectivity behavior, haptics/audio alternatives, safe retry, and battery-aware scanning
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role and intentional no-access/web-first state

## 26. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized tables such as:

- exam center/snapshot/building/room/layout/seat/capability/unavailability
- logistics session/requirement/state/readiness
- seating policy/version/rule/allocation job/candidate plan/assignment/conflict/change set/freeze
- staff role/policy/eligibility snapshot/duty plan/assignment/acknowledgement/substitution/check-in
- artifact template/job/version/manifest
- material type/stock lot/range/identifier/reservation/issue/binding/spoil/return/reconciliation
- room checklist/room event/candidate exam attendance/timing/seat transfer
- operational accommodation/support assignment
- incident/participant/witness/evidence/action/malpractice referral
- room reconciliation/attestation/exception/reopen
- script identifier/collection/packet/packet item/seal/count/reconciliation/quarantine
- custody event/handoff/receipt/discrepancy/offline command/server receipt
- practical/viva/lab batch/panel/assignment/schedule/attendance/handoff
- report/export/job/projection checkpoint

Use repository-consistent names. Every tenant-owned table carries tenant/institution/campus/cycle/session and applicable room/candidate/staff/package scope; foreign keys cannot cross tenants; repositories require explicit predicates; enable and force RLS where constitutionally required. Add exclusion constraints for overlapping seat/duty assignments where practical, unique/idempotency/barcode/sequence/count/state/temporal/checksum/optimistic-lock constraints, appropriate indexes, and retention fields.

Test student, guardian, invigilator, superintendent, observer, support, lab, examiner, paper custody, script custody, exam cell, approver, emergency, auditor, worker, reporting, migration, and operations database roles separately. Technical roles never receive general exam-logistics RLS bypass.

## 27. Security, privacy, audit, and resilience

Threat-model:

- candidate/seat manipulation and roster leakage
- predictable barcodes, counterfeit/duplicate booklets, wrong-candidate binding, and scan replay
- staff duty conflict/fraud and unauthorized substitution
- accommodation/medical or malpractice disclosure
- question-package metadata leakage
- script substitution, removal, duplicate receipt, count adjustment, broken seal, or custody-gap manipulation
- offline device loss, clock tampering, queued-event replay, and cross-session sync
- artifact/export/notification leakage
- insider reopen/override/discrepancy resolution abuse

Apply purpose/context authorization, field-level shaping, SoD, step-up authentication, non-enumerable identifiers, signed authorization windows, encryption, malware scanning, secure documents, minimal push payloads, device/session binding, rate limits, replay protection, immutable audit, and anomaly alerts. Never log candidate lists, protected accommodation data, allegations/evidence, paper metadata, full booklet/script mappings, or custody secrets.

Define retention/legal hold, backup/restore, barcode/range recovery, offline sync replay, artifact regeneration, plan rebuild, count-reconciliation recovery, lost/damaged packet, broken seal, device compromise, mass evacuation, provider/service outage, RPO/RTO, SLIs/SLOs, alerts, and incident runbooks. Physical controls and procedures must be documented; software cannot claim to guarantee physical custody.

## 28. Tests

Implement and run:

- room snapshot/layout/capacity/unavailability/accessibility and no over-capacity
- every seating hard constraint, representative soft preference, deterministic same-seed/input output, unallocated explanations, solver cancellation/retry, and manual override validation
- adjacency/mixing/contingency/accommodation allocation and protected-reason non-disclosure
- published/frozen plan immutability, amendment impact, concurrent editors/locks, and artifact supersession
- staff eligibility/conflict/availability/workload/travel/ratio/SoD, deterministic allocation, acknowledgement/decline/substitution/check-in
- artifact source-version/hash, accessible PDF, minimized PII, regeneration audit, and expired download
- barcode/range uniqueness/concurrency/check-digit/wrong scope/duplicate scan/spoil/replacement/manual fallback
- staff/room opening windows, paper-package opaque handoff, seal/witness discrepancy, and zero content leakage
- candidate verification, hall-ticket status, attendance states, seat transfer, late/early/extra-time/pause/resume and no Prompt 08 mutation
- offline assigned-room authorization, expiry, encryption, replay, clock skew, partial sync, stale plan/roster, app termination, device revoke, purge, and authoritative receipt
- incident privacy/evidence/participant scope/malpractice referral/presumption/SoD
- room count equation, mismatch blocking, attestation, reopen, and re-reconciliation
- script expected versus collected, duplicate/missing/extra/wrong-session/unbound/damaged, packet sealing/quarantine, and two-person count
- custody valid/invalid transitions, monotonic sequence, duplicate handoff/receipt, wrong destination, count/seal mismatch, offline conflict, and complete chain
- practical/lab/viva batch/panel/room/conflict/attendance/handoff with no marks entry
- event idempotency/reordering and minimal payloads
- RLS negative tests across tenant, campus, cycle, session, room, candidate, staff assignment, package, incident, custody, and technical roles
- web accessibility and Playwright journeys for all operational roles
- Android/iOS role journeys, intentional denials, secure session cache, barcode/QR, offline queue/sync, push/deep-link authorization, step-up, purge, and server receipts
- worker crash recovery, storage/document/notification/service outage, backup restore, allocation rebuild, artifact reconciliation, and documented target-volume/performance tests

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim physical custody, scanner/hardware, GPS, native-device, load, or iOS evidence that was not actually executed.

## 29. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- logistics glossary and state/lifecycle diagrams
- seating and duty constraint catalogue, deterministic algorithm/seed/solver ADR, license, and worked examples
- room/layout/capacity/accessibility specification
- artifact catalogue/templates/classification/regeneration policy
- booklet/barcode/range/count/reconciliation specification
- exam-day attendance/timing/accommodation/incident/malpractice-referral procedures
- script packet/count/anonymization boundary and chain-of-custody specification
- Prompt 13 sealed-paper handoff and Prompt 15 evaluation handoff contracts
- permission/scope/SoD matrix and mobile role-feature matrix
- threat model/privacy assessment and physical-control limitations
- runbooks for room/staff shortage, plan amendment, missing candidate, booklet mismatch, scanner/offline failure, staff absence, delayed/evacuated exam, incident/malpractice, count mismatch, missing script, broken seal, lost packet, custody gap, device compromise, restore, and disaster recovery
- role guides for students, guardians, invigilators, superintendents, observers, scribes/support staff, lab staff, practical/viva examiners, paper/script custody officers, exam cell, approvers, emergency staff, auditors, tenant administrators, and operations

The completion gate passes only when:

1. Frozen candidates and published schedules produce versioned logistics requirements without duplicating source truth.
2. Safe room layouts and policy versions produce deterministic, explainable seating with no silent hard-constraint override or capacity breach.
3. Staff duties are conflict-aware, fair/configurable, published, acknowledged, substitutable, and scope-authorized.
4. All operational artifacts are reproducible, versioned, minimized, accessible, and superseded visibly after amendments.
5. Booklet/material identifiers are unique, opaque, range-controlled, candidate-bound, and fully reconciled.
6. Exam-day identity/attendance/timing/accommodation/incident workflows are auditable, privacy-aware, and distinct from instructional attendance.
7. Room close cannot reconcile while candidate, material, booklet, or script counts disagree without an approved exception.
8. Answer scripts form sealed, count-verified packets and every custody transition is append-only, idempotent, acknowledged, and discrepancy-aware.
9. Offline mobile capture is encrypted, duty/session-scoped, replay-safe, conflict-aware, purgeable, and official only after server receipt.
10. Practical/lab/viva/project logistics cover batches, panels, rooms, attendance, incidents, and handoff without implementing marks.
11. Question-paper content remains outside this module and Prompt 13 integration uses only opaque sealed-package references.
12. Every relevant role has a meaningful React web and native Android/iOS workflow or an explicit secure no-access state.
13. Every tenant table has explicit predicates, forced RLS as required, constraints, and cross-tenant/cross-role negative tests.
14. OpenAPI/events/generated clients, migrations, security/privacy/accessibility/observability, docs, ADRs, runbooks, and all environment-available tests pass.
15. No evaluation, marks, result processing, OBE attainment, real paper content, or fabricated hardware/provider behavior was implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, rooms/seating/duties/artifacts/booklets/exam-day/incidents/scripts/custody/practicals, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency/offline sync, tests with exact commands/results/exit status, docs/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(exams): implement logistics seating duties and script custody`

Stop. Do not begin Prompt 15 or implement evaluation, marks, moderation, or correction.
```

---

## Review Checklist Before Prompt 15

- Frozen candidates and published exam schedules are the authoritative allocation inputs.
- Seating and duty allocation are deterministic, constraint-aware, explainable, versioned, and safely amendable.
- Room, staff, candidate, booklet, script, and custody counts reconcile before closure.
- Exam-day attendance is separate from teaching attendance.
- Accommodation and malpractice information is minimized and purpose-restricted.
- Booklet/script identifiers and custody events are unique, append-only, replay-safe, and auditable.
- Question-paper integration contains only opaque sealed-package references.
- Practical/lab/viva logistics stop before marks entry.
- All relevant roles have web/native-mobile workflows or explicit secure denial.
- Every tenant table has RLS and negative isolation tests.
- No Prompt 15 evaluation or marks logic was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 15 until these conditions pass.
