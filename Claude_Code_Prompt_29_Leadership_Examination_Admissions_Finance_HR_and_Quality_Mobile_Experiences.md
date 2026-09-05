# Claude Code Prompt 29

## Leadership, Examination Operations, Admissions, Finance, HR, and Quality Mobile Experiences

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React Native + TypeScript Android/iOS, shared generated OpenAPI clients/contracts/design tokens/localization, Java 21 + Spring Boot 3 APIs, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–28 passed, were reviewed, and were committed  
**Scope:** Production native Android/iOS vertical slices for Leadership/Governance, Examination Operations, Admissions, Finance Administration, HR Administration, and Accreditation/IQAC roles, with safe approvals, segregation of duties, offline exam-day capture, evidence workflows, accessibility, automated tests, and traceable completion

---

## Prompt to Paste into Claude Code

```text
You are the principal mobile engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read the entire `docs/product/PRD.md`, especially the role/persona matrix, Sections 22.3 and 22.5–22.8 or current equivalents, and requirements for governance, analytics, admissions, examinations, finance, HR, OBE, accreditation/IQAC, documents, workflows, audit, privacy, accessibility, localization, low-bandwidth operation, and mobile.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, Prompt 27 mobile architecture/security/offline/device ADRs, Prompt 28 role implementation and lessons, Prompt 26 portal/mobile contracts, the IAM/separation-of-duties model, API compatibility policy, design system, threat model, and repository conventions.
3. Inspect the actual `mobile/` workspace and `docs/mobile/ROLE_FEATURE_MATRIX.md`. Verify Android/iOS build status, generated clients, navigation/entitlement registry, role/tenant/campus switching, authentication/session/step-up, encrypted storage, sync queues, push/deep links, secure camera/document/QR/barcode/file services, accessibility, localization, privacy-safe observability, and tests.
4. Inspect responsive web journeys and authoritative backend APIs from Prompts 02, 04, 10–19, 24, and 26 for workflows/audit/documents/outbox, admissions, question governance, fees/payments, examination lifecycle, OBE/accreditation, and HR. Reuse domain commands, state machines, reason codes, ETags, receipts, and audit semantics.
5. Run Git status and existing backend/web/mobile verification. Preserve valid work and do not re-scaffold the Prompt 27 foundation or duplicate Prompt 28 components. Repair contract drift before adding features.
6. Confirm Prompts 00–28 are passed, reviewed, and committed. If not, report the exact prerequisite failure and stop with `Completion gate: FAILED`.

Do not build WebView role portals, copy business rules into mobile, invent KPIs or success, weaken forced RLS, authorize through navigation alone, bypass segregation of duties, expose confidential question content, place sensitive data in push payloads, cache prohibited records, accept client/provider return as payment truth, allow unrestricted exports, perform bulk allocation/processing/configuration on mobile, implement payroll, publish to app stores, or begin Prompt 30.

Implement complete production vertical slices through real APIs. Every visible action must enforce current tenant/institution/campus/role/assignment scope, current state and version, online/step-up requirements, reason/comment policy, segregation of duties, immutable audit, and authoritative receipt or truthful pending/failure state.

## 1. Cross-role administrative invariants

Enforce all of the following:

- active account, tenant, institution, campus, role, committee/assignment context, environment, and data-as-of time are visible and backend-validated
- cache, queued work, search, navigation, downloads, push state, and recent items are partitioned and purged on context/role changes or revocation
- backend policy is the sole authority for entitlements, approval limits, maker-checker separation, assignment scope, state transitions, and sensitive-field projection
- high-risk actions are online-only, step-up authenticated when configured, version checked, explicitly confirmed, reasoned, audited, and receipted
- a person cannot approve their own initiated transaction where policy requires separation
- mobile never recomputes KPI, eligibility, marks, result, merit, fee, refund, concession, leave, workload, appraisal, or attainment rules
- aggregates show definition/version, filters, source, last refresh, freshness, exclusions, and suppression where applicable
- offline capability is deny-by-default; only named workflows use encrypted short-retention queues with idempotency and reconciliation
- all lists/search/counts/facets/previews/exports/deep links reauthorize at the source endpoint
- sensitive lock-screen notifications contain only generic action wording and opaque identifiers
- module-disabled, read-only, revoked, stale, offline, conflict, partial, empty, loading, error, and support states are implemented for every screen
- no fabricated provider, bank, email/SMS/WhatsApp, biometric, payment, document verification, signature, exam, result, or delivery outcome

Update the role-feature matrix continuously with route, role, API, fields/actions, offline policy, step-up, device capability, sensitive-data class, web-first restriction, tests, and Android/iOS status.

## 2. Shared administrative mobile shell

Extend the Prompt 27/28 shell with:

- safe role/context header and switcher
- governed work inbox grouped by overdue, due today, exception, approval, acknowledgement, and informational items
- role KPI cards with authorized drill-down
- today/upcoming schedule and duty timeline
- saved server-side filters without sensitive values in local analytics
- emergency/contact/support entry points
- offline/stale/sync status and last-confirmed timestamps
- web-first secure handoff that explains why the operation is restricted

Do not preload all dashboard data. Fetch visible cards through bounded, cancellable queries. Reauthorize every drill-down and invalidate data after role, campus, duty, committee, approval-limit, or assignment changes.

## 3. Shared action and approval inbox

Implement a reusable administrative inbox for authorized workflow tasks:

- type, subject-safe summary, initiator role, submitted/due time, status, priority, age, SLA state, and permitted actions
- detail fetch on open; no confidential body in push or generic list cache
- approve, reject, return, request-information, acknowledge, delegate, or abstain only when the server advertises the transition
- required reason/comment/evidence/declaration and conflict-of-interest confirmation
- ETag/version and task-claim handling
- duplicate-tap prevention and idempotency key
- step-up immediately before consequential action
- immutable receipt with decision ID, server time, resulting state, actor/context, and audit reference
- changed/already-acted/reassigned/revoked/expired outcomes without false success

Bulk approval is prohibited unless an existing domain contract explicitly permits a bounded homogeneous batch and returns item-level results. Never convert partial success into one success banner.

## 4. Leadership and governance roles

Support least-privilege mobile experiences for:

- Group Chairman/Management representative
- Principal/Director
- Dean Academics
- HOD
- Program Coordinator
- authorized statutory/academic/finance/examination/disciplinary committee member

One user may hold multiple roles, but every action executes under one explicit active role and scope. Do not union privileges silently.

## 5. Leadership home and governed KPIs

Implement authorized KPI cards and drill-downs for:

- academic calendar and delivery progress
- course/teaching-plan coverage and exceptions
- attendance/shortage/condonation/detention summaries
- admissions funnel and seat status
- fee collection, dues, failed payments, concessions/refunds, and settlement exceptions
- examination cycle readiness, eligibility, logistics, evaluation completion, result readiness, and incidents
- pass/result/attainment trends after authorized publication
- placement/training/internship/project readiness
- faculty workload/leave/compliance gaps
- accreditation evidence/readiness and corrective actions
- campus operations and safety/service incidents where permitted

Every KPI must use server-computed values and denominator definitions. Apply small-cell suppression, privacy thresholds, drill-down scope, and publication status. Never show draft marks/results or individual sensitive data unless the active role and purpose explicitly permit it.

## 6. Leadership academic monitoring

Provide program/department/term/course drill-downs for delivery plan, syllabus coverage, attendance completion, assessment readiness, outcome evidence, faculty allocation, and unresolved exceptions.

Allow leaders to acknowledge, assign follow-up, request correction, record an observation, or open the authoritative web workflow. Do not edit attendance, marks, curriculum, teaching logs, allocations, or attainment from dashboard values.

Show source, freshness, owner, status, due date, evidence, and history. Preserve department/program scoping for HOD and Program Coordinator.

## 7. Leadership approvals and committee decisions

Implement only existing authorized workflow decisions such as sanctioned academic requests, condonation/detention recommendations, examination readiness gates, result approval stages, concessions/refunds within limits, staffing/leave requests, accreditation actions, and committee resolutions.

Require quorum/declaration/recusal/sequence rules from the server. Committee member votes or recommendations must not reveal other votes before policy permits. A mobile decision cannot bypass mandatory preceding reviewers or create policy/configuration.

## 8. Emergency broadcasts and incident oversight

Allow specifically authorized leadership roles to:

- choose a pre-approved emergency category/template
- select only server-authorized audiences/campuses/channels
- preview localized content and channel limitations
- complete step-up, explicit confirmation, and reason
- submit to authoritative communications/outbox workflow
- view accepted/queued/delivered/failed/acknowledged aggregates with source timestamps
- issue an approved correction or all-clear linked to the original

Never claim delivery from provider submission. Free-form mass messaging, unrestricted recipient exports, and bypassing approval remain web-first or prohibited. Test duplicate submission, revoked sender, stale audience, partial provider delivery, and retry safety.

## 9. Leadership mobile restrictions

Keep the following web-first/controlled-device unless a stricter documented policy already exists:

- institution/regulation/workflow/role/security configuration
- formula, grading, eligibility, attainment, fee, payroll, merit, or result-engine rules
- unrestricted individual-level analytics and bulk export
- mass allocation, bulk marks/result processing, accounting exports, bank imports, and payroll
- confidential paper content, answer keys, evaluator identity mappings, and secure result datasets
- destructive master-data changes

Provide a secure handoff route with reason, prerequisites, and reauthentication; do not embed desktop screens in a WebView.

## 10. Controller of Examinations command center

Implement exam-cycle dashboards showing server-authoritative readiness for:

- registrations, applications, eligibility, accommodations, and hall tickets
- question-paper assignment/declaration/status without paper content
- centers, rooms, seating, duties, materials, packet custody, and dispatch/receipt
- candidate attendance and incident reconciliation
- script collection, scanning/allocation, evaluation, moderation, and marks completion
- anomalies, withheld cases, grievances/revaluation/supplementary dependencies
- result calculation/approval/publication gates and certificate readiness

Use traffic-light status only when supplied by the server with definition and reason. Drill down to authorized exception queues, not confidential content. Show blockers, owners, age, SLA, and next allowed action.

## 11. Examination duty roles and schedules

Support Controller staff, Chief Superintendent, Observer, Invigilator, Custodian, room/center staff, practical examiner, external examiner/evaluator, paper setter, and moderator only for active assignments.

Provide:

- duty invitation, conflict/declaration, accept/decline, acknowledgement, instructions, schedule, center/room, check-in window, contact/escalation, completion and receipt
- assignment-specific navigation and automatic expiry
- no candidate or paper access before permitted window
- no post-duty access beyond retention/policy
- safe reassignment/revocation behavior

Location/geofence, biometric, or device attestation may support policy but must never become the sole authorization or silently track users outside the duty window.

## 12. Candidate and hall-ticket validation

Implement authorized candidate search and QR/barcode validation:

- use opaque, signed/expiring tokens; never encode sensitive candidate data directly
- resolve online when required; permitted offline roster/token validation must be pre-provisioned, encrypted, assignment-bound, expiring, and revocable at reconciliation
- display minimal photo/identity/accommodation/status information required for duty
- distinguish valid, wrong room/session/center, expired, cancelled, already processed, unverifiable offline, and revoked
- record verification result, actor, device, assignment, server/monotonic time, and receipt

No manual override without an explicit server-supported exception workflow, reason, evidence, and later reconciliation.

## 13. Exam-room attendance and event timeline

Provide assignment-bound roster and controls for present, absent, permitted late entry, permitted early exit, temporary exit/return, accommodation applied, and authorized correction.

Each event uses idempotency, local monotonic ordering, server timestamps on sync, reason/evidence rules, and immutable history. Do not infer attendance from scanning alone. Corrections create auditable correction commands rather than overwriting original events.

Display reconciled counts and unresolved conflicts before room closure. Closing requires online validation or an explicitly supported signed offline closure that remains pending until server acceptance.

## 14. Exam incidents and malpractice evidence

Implement structured incident capture:

- category/severity, candidate(s), room/session, narrative, witnesses, immediate action, confiscated-item reference, evidence, declaration, escalation, and chain-of-custody handoff
- camera/document capture through encrypted temporary storage with metadata policy, checksum, resumable upload, malware/processing status, and retention
- draft classification and strict visibility; no evidence in photo gallery, logs, push, clipboard, share sheet, backups, or analytics
- acknowledgement and authoritative incident receipt

Offline incident drafts are allowed only during active duty, encrypted and short-lived. Upload/reconciliation failure must remain visible. Never label an allegation as a finding; final disciplinary findings use the governed workflow.

## 15. Script packets, barcodes, custody, and count reconciliation

Support scan/manual fallback for authorized packet/container handoffs:

- expected versus observed packet/script counts
- sealed/unsealed/damaged/missing/extra status
- sender and receiver assignment validation
- dual acknowledgement when required
- scan events, seal/container identifiers, reason, evidence, and custody receipt
- transfer, receive, reconcile, quarantine, and exception states driven by server

Offline scans must be assignment-bound, encrypted, append-only, idempotent, sequence-preserving, time-bounded, and reconciled before local deletion. Detect duplicate, out-of-order, wrong-cycle, wrong-center, already-transferred, revoked, and count mismatch cases. Mobile must never manufacture a custody transition.

## 16. Practical/viva and evaluator marks entry

Where policy explicitly allows mobile entry, support assigned candidate/batch, rubric criteria, marks/grade, comment, evidence reference, absent/malpractice state, validation, draft, review, submit, and receipt.

Requirements:

- assignment and allowed-window enforcement
- server-supplied rubric and limits; no local grading calculation
- encrypted draft with short retention only when policy permits
- online, step-up, ETag/version-checked final submission
- explicit declaration and candidate/count summary
- no editing after lock except a formal correction workflow
- no visibility into other evaluators or moderation unless authorized

High-volume theory evaluation, scanned-script display, confidential annotations, moderation, and bulk marks remain controlled-web/device workflows unless the repository already has an approved mobile threat model.

## 17. Paper setter and moderator companion

Provide assignment/status-only mobile journeys:

- invitation, conflict-of-interest/declaration, accept/decline, deadlines, instructions, secure-channel notification, status, query acknowledgement, and completion receipt
- generic notifications with no subject-specific confidential wording where policy requires
- step-up for declarations and acceptance

Question-paper authoring, upload/download, preview, answer keys, moderation content, printing, and secure paper access remain hardened controlled-device/web workflows. Do not cache or render confidential paper content on mobile.

## 18. Examination offline policy and reconciliation

Create a per-workflow allowlist for roster verification, room events, incidents, and custody scans. Each offline package must have assignment/cycle/session/room/device/user binding, schema/version, issued/expiry time, encrypted records, nonce/idempotency, revocation handling, and retention deadline.

Reconciliation must provide accepted, rejected, duplicate, conflict, expired, revoked, and needs-review item results. Show authoritative server receipt per item or batch. Never discard unresolved events or show them as synchronized. Provide supervisor exception tooling and incident runbook.

## 19. Admissions roles and home

Support Admissions Head, Admissions Officer, Counselor, Document Verifier, and authorized approver with scoped queues for:

- new enquiries and follow-ups
- assigned applicants and aging/SLA
- incomplete/exception documents
- consent/contact preferences
- offer/admission/onboarding status
- authorized approvals and conversion milestones

Protect applicant/minor data. Assignment, campus, program, channel, and purpose restrictions must be enforced server-side.

## 20. Admissions enquiry capture and follow-up

Implement:

- minimal enquiry capture with consent, purpose, source, program interest, contact preference, assigned owner, and duplicate-match warning
- phone/email launch only through permitted device abstractions; record an outcome, not covert call/message content
- follow-up schedule, notes classification, outcome/disposition, next action, do-not-contact and consent withdrawal
- offline draft only when policy allows, with encrypted short retention and duplicate resolution on sync
- authoritative creation/update receipt

Do not scrape contacts, record calls without lawful consent, upload address books, or send messages directly when communications must use the outbox/provider workflow.

## 21. Applicant search and profile

Provide server-authorized search with minimum query length, rate limiting, masked results, assignment scope, purpose logging, and no persistent recent search containing PII.

Applicant profile includes only permitted contact, application/program, consent, document checklist, assessment/interview, offer, payment, admission, and onboarding status. Sensitive identity/category/health/accommodation fields must be purpose- and role-filtered. No full applicant export.

## 22. Admissions documents and verification

Use secure camera/file capture with crop/quality checks, encrypted temporary storage, resumable upload, checksum, classification, malware/OCR/processing status, and authoritative receipt.

Verification must support server-provided checklist, view/download grant, compare permitted extracted values, accept/reject/request replacement, reason/evidence, dual review where configured, ETag, step-up, audit, and receipt. OCR is advisory; a mobile OCR match cannot auto-verify a document.

Mask identity values, prevent uncontrolled share/clipboard/screenshots where policy applies, and delete temporary bytes after confirmed upload or expiry.

## 23. Admissions offers and onboarding

Support offer/admission status, accepted/declined/expired state, missing conditions, fee/payment verification, document completion, student-record conversion status, credentials/ID readiness, orientation, hostel/transport requests, and handoff tasks.

Mobile may execute an existing individual approval/acknowledgement within authority. Merit generation, seat matrix configuration, reservation policy, mass allocation, bulk offer generation, bulk conversion, and rule overrides remain web-first.

## 24. Finance roles and home

Support Finance Head, Accountant, Cashier, Fee Clerk, authorized concession/refund approver, and read-only auditor through explicit scopes.

Home queues include counter session, pending/failed/unidentified payments, receipt delivery exceptions, dues, settlement mismatches, refunds/concessions awaiting action, day totals, and reconciliation status. Values are server authoritative, currency-safe, and tagged by source/as-of time. Hide data outside campus/account/ledger/approval scope.

## 25. Student ledger and payment lookup

Implement authorized student/application/invoice/receipt lookup by opaque QR or minimum search. Show server ledger lines, demand, waiver/concession, payment, adjustment, refund, balance, due date, status, and source references.

Do not calculate balance locally or expose unrelated academic/identity data. Sensitive lookup must be rate-limited, purpose-logged, masked, and excluded from local recents. Disputes create governed requests rather than editing ledger entries.

## 26. QR-assisted counter collection

Implement a safe collection flow:

1. validate cashier, counter/session, tenant/campus, student/application, collectible items, currency, amount limits, and accepted methods online;
2. display the server-created payment intent/reference;
3. launch an approved terminal/provider/deep-link or record permitted non-card tender;
4. treat app/provider return as untrusted;
5. verify authoritative backend webhook/reconciliation status;
6. display pending/failed/succeeded only from backend truth;
7. issue/deliver receipt only after authoritative posting and show receipt ID/checksum.

Never capture/store raw PAN, CVV, PIN, bank credentials, provider secrets, or payment tokens beyond approved SDK abstraction. Prevent double collection with idempotency, status polling/backoff, duplicate callback tests, and clear pending recovery.

Offline payment acceptance is prohibited unless an existing formally approved cash-only contract exists; even then it remains pending with strict limits, dual controls, encrypted queue, and server reconciliation.

## 27. Finance exceptions, receipts, and settlements

Provide:

- pending/failed/duplicate/unidentified payment investigation summary
- settlement batch status and mismatch drill-down without bank credentials/files
- receipt lookup, verified preview, approved delivery request, and reissue history
- dispute/reference capture and assignment
- cash-counter close summary and handoff where policy permits

Bank-file import, matching-rule edits, manual bulk reconciliation, bulk demand, journal/accounting edits, statutory reports, and accounting exports remain web-first. Mobile notes do not alter ledger truth.

## 28. Concession and refund approvals

Implement individual approval tasks with reason, policy/reference, requested and eligible amount returned by server, supporting evidence, approval limit, prior decisions, maker-checker/SoD, step-up, ETag, explicit confirmation, and receipt.

Do not recompute eligibility or allow approvers to change the requested amount unless the domain workflow explicitly supports a counterproposal. Detect self-approval, split requests intended to evade limits, stale balance, already-refunded, duplicate account, changed evidence, and revoked authority.

Bank-account and tax identifiers must be masked and online-only. Approval does not mean disbursement; show payment/refund state separately.

## 29. HR administration roles and home

Extend Prompt 28 employee self-service for HR Head, HR Officer, Recruiter, Document Verifier, Reporting Manager, Appraisal Reviewer, and Training Coordinator.

Provide role-scoped queues for attendance/leave exceptions, approvals, recruitment/interviews, onboarding, document expiry, probation/confirmation, workload/compliance gaps, appraisal tasks, training, and employee requests. Highly sensitive compensation, health, disciplinary, identity, and background-check data must be separately permissioned and minimized.

## 30. Employee search and profile

Implement server-scoped employee search and profile with work contact, department/designation, manager, employment/status dates, qualifications/skills summary, assigned duties/workload summary, document compliance, training, and workflow tasks only as permitted.

Mask personal identifiers and exclude compensation, bank/tax, medical, grievance, disciplinary, appraisal, and background-check details unless the precise HR purpose/role permits them. No offline employee directory export or persistent sensitive recent searches.

## 31. Attendance, leave, permission, and on-duty administration

Provide authorized team/department exceptions, missing punches, shift/roster status, leave/permission/on-duty requests, balances returned by server, conflict/coverage indicators, supporting evidence, and approval history.

Manager/HR actions require advertised server transitions, reason, ETag, SoD, step-up where configured, and receipt. Mobile cannot alter raw biometric logs, calculate balances, override policy, or backdate without a formal correction workflow.

Any location or biometric mobile check-in must follow existing consent, spoofing, fallback, retention, and accessibility policy and cannot be the sole authorization.

## 32. Recruitment and interview panels

Support scoped requisition/candidate/assigned-interview views, schedules, declarations/conflicts, structured rubric feedback, recommendation, evidence reference, submit/lock, and receipt.

Panel members cannot view other feedback before policy allows. Draft feedback is encrypted and assignment-bound. Final submission is online, version checked, and immutable except formal correction. Candidate bulk export, ranking rules, offer templates, compensation approval, background-check detail, and mass communication remain web-first.

## 33. HR onboarding and document compliance

Implement onboarding checklist, assigned owner, due dates, employee-provided document status, secure capture/review, verification reason, expiry/renewal, provisioning handoff, orientation/training, acknowledgement, and completion receipt.

OCR is advisory. Document access uses short-lived grants and classification. Never cache identity/bank/tax/background documents by default. Account provisioning success comes from authoritative identity-system acknowledgement, not a button tap.

## 34. Workload, appraisal, and training

Provide server-calculated workload allocation/compliance summary, overload/under-allocation/conflict exceptions, goals, appraisal stages, assigned reviewer tasks, evidence references, structured ratings/comments, improvement actions, training nominations/attendance/completion, and acknowledgement.

Mobile does not calculate workload or final appraisal scores, reveal confidential peer/student feedback, compare protected groups, or permit bulk calibration. Final rating/approval requires online state/version validation and policy-defined step-up/SoD. Payroll and bulk organization configuration remain web-first.

## 35. Accreditation, IQAC, and auditor roles

Support Accreditation/IQAC Coordinator, Criterion/Metric Owner, Reviewer, Approver, Department Contributor, Internal Auditor, and time-bound External Auditor with role/purpose/assignment isolation.

Do not treat accreditation access as blanket access to student, faculty, finance, HR, exam, or research source records. Evidence is projected through authorized repository references and redaction policy.

## 36. Quality home and readiness KPIs

Implement framework/cycle/criterion/metric readiness using server-defined formulas and versions:

- evidence completeness/approval/freshness
- missing, expiring, rejected, and stale evidence
- owner/reviewer workload and overdue tasks
- observation/nonconformity/corrective-action status
- OBE/CO-PO evidence and attainment publication state
- internal-audit readiness and upcoming deadlines

Show numerator, denominator, exclusions, data period, source, last computation, and confidence/validation status where supplied. Mobile cannot edit framework, weights, formulas, mappings, source data, or final submissions.

## 37. Evidence task queue and secure review

Implement assigned evidence tasks with criterion/metric/year, description, acceptable-evidence guidance, owner, due date, classification, version, source reference, review status, comments, and history.

Support secure camera/file upload, link to an authorized existing record, metadata/classification, checksum, resumable transfer, processing status, submit, return, approve, supersede, and receipt as allowed by workflow. Reviewers see only redacted/minimized projections.

No permanent signed URLs, raw object keys, uncontrolled downloads, cross-framework reuse without authorization, or approval by the evidence submitter where SoD applies.

## 38. Observations, nonconformities, and corrective actions

Implement:

- observation/finding category, severity, criterion, narrative, evidence references, owner, root-cause request, corrective/preventive action, due date, verification, closure, reopen, and history
- distinction between observation, alleged gap, accepted finding, action, verified resolution, and closure
- escalation/reminder through the outbox
- online/step-up/SoD for acceptance and closure when policy requires

Offline drafts may contain only allowlisted minimized text and encrypted evidence during a time-bound on-site audit. Sync conflicts never use silent last-write-wins.

## 39. Restricted auditor experience

External/internal auditors receive time-bound, framework/cycle/criterion/purpose-scoped access with declaration, terms acknowledgement, watermarking where supported, redacted evidence, view receipt, observation workflow, expiry, and immediate revocation.

No unrestricted search, download, sharing, clipboard, source-system navigation, configuration, or hidden data. Audit access expiry must purge local cache/files and invalidate deep links and push state. Test screenshot/share deterrence where platform policy supports it without claiming absolute prevention.

## 40. Search, filtering, and exports

All administrative search is backend-authorized at query, suggestion, facet, count, result, and open. Enforce role-specific minimum query, field allowlists, assignment/campus/program/cycle scope, small-cell suppression, purpose logging, and rate limits.

Mobile exports are deny-by-default. Where an existing policy permits a small redacted report, generation must be asynchronous and server-side with approval, watermark, expiry, checksum, access receipt, device share restrictions, and audit. Never recreate unrestricted CSV/Excel export in mobile.

## 41. Context and role switching

Test users holding multiple leadership, examiner, admissions, finance, HR, and IQAC roles. Switching must:

- cancel requests and claims
- stop and namespace offline queues
- clear/partition cache, search, recent items, downloads, navigation, badges, notifications, and analytics context
- obtain fresh entitlements, approval limits, assignments, and feature flags
- block returning to stale sensitive screens
- reconcile or explicitly abandon pending drafts according to policy

Never merge role privileges. A user must switch into the role under which an action is authorized.

## 42. Backend mobile contracts

Add or refine mobile endpoints/BFF composition only where justified. Requirements:

- versioned OpenAPI and generated TypeScript client; no hand-maintained duplicate DTOs
- bounded projections, cursor pagination, sparse fields, stable reason/status codes, server time, source/as-of time, ETag/version, idempotency, and receipt schema
- no mobile-only bypass around domain services, workflows, audit, outbox, document grants, payment reconciliation, or RLS
- PostgreSQL tenant/institution/campus/role/assignment context set transaction-locally and forced RLS on scoped tables
- denials for cross-tenant, cross-campus, cross-role, cross-department/program, cross-exam assignment, cross-applicant assignment, cross-ledger scope, cross-employee scope, and cross-framework/auditor scope
- uniform expired/revoked/disabled/not-found behavior that does not leak existence
- compatibility tests between backend OpenAPI and committed generated mobile clients

Do not introduce generic super-endpoints returning every dashboard domain or accept client-supplied authorization scope.

## 43. Security and privacy hardening

Update the mobile threat model for:

- stolen/rooted/jailbroken/shared devices
- malicious deep links/QR/barcodes and replay
- confidential exam assignment/content leakage
- offline event tampering, time manipulation, duplicate/reordered custody scans, and revoked duties
- applicant/employee/finance/evidence enumeration
- approval replay, self-approval, limit evasion, stale state, and confused deputy
- payment callback spoofing and duplicate provider events
- camera/gallery/clipboard/share/screenshot/backup/log/crash leakage
- push notification disclosure
- auditor access persistence after expiry

Use secure storage, TLS/pinning strategy per ADR, device integrity as risk input rather than sole control, session binding, step-up freshness, runtime privacy controls, remote revocation, key rotation, encrypted database/file protection, retention cleanup, and dependency/secrets/SAST checks.

## 44. Accessibility, localization, and field usability

Meet WCAG-aligned/native accessibility expectations on Android and iOS:

- semantic labels/roles/states, focus order, switch/keyboard access where supported, screen-reader announcements, touch targets, Dynamic Type/font scaling, contrast, reduce motion, and non-color status
- localized strings, dates, times, numbers, currencies, names/addresses, pluralization, RTL mirroring, and long-text resilience
- scanning with manual accessible fallback; camera is never the only path
- sunlight/high-contrast and one-handed exam/counter/audit field workflows
- low-bandwidth summaries, progressive loading, compressed uploads, retry, and resumable transfer
- destructive/consequential confirmation naming the action, record, scope, and outcome

## 45. Observability, support, and incident response

Instrument privacy-safe metrics/traces for API latency/error, dashboard freshness, task age, approval outcome categories, exam offline queue depth/age/conflicts, scan validation categories, document upload/processing, payment pending time, push/deep-link resolution, cache purge, and crash/ANR.

Never log names, IDs, phone/email, marks, amounts tied to people, applicant/employee details, paper data, evidence contents, notes, tokens, QR/barcodes, bank references, or document URLs.

Add alerts/runbooks for stuck exam reconciliation, lost/revoked duty device, custody mismatch, payment pending spike, failed emergency broadcast, document processing backlog, approval queue SLA breach, evidence leak/revoked auditor, push/deep-link abuse, and cross-context isolation failure.

## 46. Automated tests

Add unit, component, contract, integration, security, accessibility, and end-to-end tests covering at minimum:

Shared/leadership:

- role/context isolation, dashboard source/freshness, suppression, approval SoD/limits/version/step-up, committee recusal/quorum, emergency broadcast idempotency and truthful delivery
- web-first restrictions and no confidential/bulk/config access

Examinations:

- duty lifecycle/revocation/window, candidate QR replay/wrong room/offline expiry, room-event ordering/correction/count closure
- incident evidence encryption/retention, custody duplicate/out-of-order/wrong packet/count mismatch/dual acknowledgement
- practical marks rubric limits/draft/submit/lock/correction and confidential paper content denial
- process death, clock change, offline expiry, queue replay, partial reconciliation, device reassignment, and no false sync

Admissions:

- consent/do-not-contact, duplicate enquiry, assignment-scoped search, PII masking, document OCR-not-authority, verification SoD, offer/onboarding status, and bulk allocation denial

Finance:

- ledger scope/masking, collection idempotency, spoofed/duplicate/delayed provider callback, authoritative reconciliation, receipt timing
- concession/refund self-approval/limit/stale balance/duplicate/step-up and web-first bank/bulk/accounting denial

HR:

- employee field projection, manager/department scope, attendance correction, leave balance server authority, panel feedback isolation, document access/expiry, appraisal confidentiality/SoD, and payroll denial

Quality:

- framework/criterion/auditor scope, readiness formula server authority, evidence redaction/version/SoD, observation lifecycle, expired auditor purge, and source-system/config denial

Platform/security:

- forced RLS and negative isolation across every new endpoint
- deep-link/QR/barcode fuzzing, cache/queue/search/download/push leakage, screenshot/share/clipboard policy, token expiry, device compromise risk path, log redaction, and dependency/secrets scans
- TalkBack/VoiceOver, large text, RTL, contrast, manual scan fallback, low bandwidth, interrupted upload, and all application states

Use deterministic synthetic fixtures only. Never call real providers or use real people, applicants, students, employees, bank data, payments, marks, papers, incidents, or evidence.

## 47. Android and iOS critical journeys

Automate real critical journeys on both platforms for:

1. Principal/Dean/HOD dashboard drill-down, approval with step-up, stale conflict, role switch, and restricted configuration handoff.
2. Authorized emergency broadcast creation through accepted outbox receipt and partial-delivery status without false success.
3. Exam duty acceptance, candidate validation, room attendance/event, incident evidence, packet custody, offline process death, reconnection/reconciliation, conflict, and closure.
4. External examiner practical rubric draft/final submission and paper-setter content denial.
5. Admissions enquiry/consent/follow-up, applicant search, document capture/verification, and onboarding status.
6. Finance ledger lookup, payment intent/provider-return/backend reconciliation/receipt, pending recovery, and concession/refund approval denial/success paths.
7. HR team exception/leave approval, recruitment rubric, onboarding document, appraisal task, and confidential/payroll denial.
8. IQAC evidence upload/review, corrective action, auditor restricted access, expiry/revocation purge, and configuration denial.

Include Android emulator/device evidence and iOS simulator/device evidence from valid environments. If macOS/signing/provider/hardware is unavailable, do not fabricate results: run every available check, document the exact missing evidence, keep affected matrix entries partial/blocked, and set the completion gate according to the stated criteria.

## 48. Performance and reliability budgets

Define and verify measurable budgets for cold/warm start, role-home first useful render, dashboard card latency, work-inbox paging, scan-to-feedback, offline event persistence, reconciliation throughput, document upload/resume, memory, binary growth, crash-free/ANR, battery, and network use.

Use realistic synthetic volumes for institutions, campuses, departments/programs, exam rooms/candidates/events/packets, applicants/documents, ledgers/transactions, employees/tasks, and evidence/actions. Prevent unbounded queries, payloads, subscriptions, polling, and caches. Document measured device/environment and p50/p95/p99 where meaningful.

## 49. Documentation

Update:

- `docs/mobile/ROLE_FEATURE_MATRIX.md` for every Prompt 29 role, route, API, action, restriction, offline policy, device feature, Android/iOS test, and honest status
- navigation/context/role/assignment map
- administrative approval and SoD/step-up patterns
- leadership KPI source/freshness/suppression guide
- emergency broadcast/outbox/delivery guide
- examination duty, offline package, room event, incident, custody, practical marks, and reconciliation runbooks
- admissions consent/search/document/onboarding guide
- finance counter/payment/reconciliation/receipt/concession/refund guide
- HR privacy/recruitment/onboarding/appraisal guide
- IQAC evidence/redaction/auditor/corrective-action guide
- OpenAPI/generated-client compatibility and BFF decisions
- privacy/offline retention matrix, threat model, accessibility/localization checklist, SLO evidence, dashboards, alerts, and support procedures

Record ADRs for every material deviation. Do not mark a feature complete without executable evidence.

## 50. Completion gate

Completion requires all of the following:

1. Group Management, Principal/Director, Dean, HOD, Program Coordinator, and committee roles have scoped KPI, work-inbox, approval, monitoring, and emergency interfaces using real APIs on Android and iOS.
2. Controller/exam staff, Chief Superintendent, Observer, Invigilator, Custodian, practical/external examiner, evaluator, paper setter, and moderator have assignment-appropriate interfaces; confidential content remains restricted.
3. Exam-day offline capture is encrypted, assignment-bound, idempotent, short-lived, process-death safe, conflict-aware, revocable, and authoritatively reconciled.
4. Admissions roles can manage individual enquiries, consent, follow-ups, scoped applicant lookup, documents, offer/admission status, and onboarding without exposing PII or implementing mass allocation.
5. Finance roles can perform authorized ledger lookup, safe counter collection, payment verification, receipt handling, exceptions, settlement status, and individual concession/refund approvals without storing card credentials or treating provider return as truth.
6. HR roles can complete authorized administration, attendance/leave actions, recruitment feedback, onboarding, document compliance, workload/appraisal/training tasks while payroll and sensitive bulk configuration remain web-first.
7. Accreditation/IQAC and restricted auditors can complete evidence, review, observation, corrective-action, readiness, and expiry/revocation journeys without source-data or framework/formula access.
8. Consequential actions enforce server policy, SoD, approval limits, current version, step-up, explicit confirmation, reason, immutable audit, idempotency, and authoritative receipt.
9. Tenant/institution/campus/role/department/program/assignment/applicant/ledger/employee/framework isolation uses forced RLS and passes negative tests.
10. Context switching, revocation, cache/queue/download/search/push purge, safe deep links, scanning, documents, accessibility, localization/RTL, low-bandwidth behavior, and privacy-safe observability pass.
11. All prohibited bulk/configuration/confidential/payroll/accounting operations are absent or explicitly blocked and tested; no WebViews or hidden mobile bypasses exist.
12. Android and iOS critical journeys have real automated evidence from valid environments; unavailable macOS/device/provider evidence is reported honestly.
13. OpenAPI/generated clients, backend/mobile tests, security/accessibility checks, docs, role-feature matrix, threat model, performance evidence, and runbooks are complete.
14. No provider/payment/message/delivery/document/exam/result/approval/audit/receipt or role completion is fabricated.
15. Prompt 30 Placement, Library, Hostel, Transport, Visitor, Operations, Employer, and Platform mobile vertical slices were not implemented or marked complete.

Provide the standard completion report covering implementation summary, changed files, backend/OpenAPI/generated clients, every role/screen/journey, Android/iOS evidence, offline/reconciliation, push/deep links/device services, approvals/SoD/step-up, payment truth, security/privacy/tenancy/RLS/audit/receipts, accessibility/localization/performance, exact test/scan commands/results/exit status, role-matrix changes, docs/runbooks, limitations/unavailable macOS/provider/device evidence, manual verification, and suggested commit message.

End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(mobile): deliver administration exam finance hr quality journeys`

Stop. Do not begin Prompt 30 or implement/claim complete Placement, Library, Hostel, Transport, Visitor, Operations, Employer, or Platform administration mobile experiences.
```

---

## Review Checklist Before Prompt 30

- All Prompt 29 roles have least-privilege native Android/iOS interfaces backed by real APIs.
- Administrative decisions enforce maker-checker separation, limits, step-up, ETags, reasons, audit, idempotency, and receipts.
- Leadership KPIs are server-computed, sourced, fresh, privacy-suppressed, and safely drilled down.
- Exam-day offline records are encrypted, assignment-bound, expiring, append-only, reconciled, and never falsely shown as synchronized.
- Question-paper content and other confidential exam operations remain controlled-device/web workflows.
- Admissions consent, PII, document verification, and assignment boundaries are tested.
- Payments use backend reconciliation as truth; raw card/bank credentials never enter the application.
- HR sensitive fields, panel feedback, appraisal data, and payroll restrictions are enforced.
- IQAC evidence is redacted and scoped; auditor access expires and purges cleanly.
- Bulk/configuration/export restrictions and secure web-first handoffs are explicit and tested.
- Forced RLS and negative cross-scope tests cover every new endpoint.
- Android/iOS evidence, accessibility, RTL, low-bandwidth, process-death, revocation, and performance evidence are honest.
- No Prompt 30 scope was implemented or falsely marked complete.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 30 until these conditions pass.
