# Claude Code Prompt 18

## Revaluation, Grievances, Supplementary Exams, and Degree Completion

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–17 passed, were reviewed, and were committed  
**Scope:** Post-result applications, recounting/photocopy/revaluation/challenge workflows, independent evaluation, versioned result/document revision, withheld-result resolution, supplementary/backlog cycles, attempt history, graduation readiness, and role-specific interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially post-result services, recounting, answer-script photocopy, revaluation, challenge valuation, grievances, supplementary/backlog/improvement examinations, maximum-duration rules, graduation eligibility, degree completion, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, and repository conventions.
3. Inspect Prompt 11 fee/payment/refund contracts, Prompt 12 examination-cycle/application/attempt contracts, Prompt 14 answer-script identity/custody contracts, Prompt 15 evaluator/anonymization/corrected-mark-set contracts, Prompt 16 result/version/backlog/progression contracts, Prompt 17 official-document supersession contracts, Prompt 06 degree-audit contracts, and Prompt 02 workflow/audit/document/outbox services.
4. Inspect OpenAPI/generated clients, PostgreSQL RLS, permissions/SoD, data dictionary, secure document delivery, notification service, offline mobile patterns, background jobs, observability/redaction, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, guarantee that revaluation changes marks, edit published results/documents in place, create a second result engine, implement OBE attainment, or expose evaluator identity or answer-script content outside authorized scope.

Implement a bounded `post-result` domain. It owns post-result applications and case orchestration, secure reassessment requests, source/result/document revision coordination, supplementary-cycle proposals, backlog and graduation-readiness projections. Prompt 15 owns mark evaluation/correction, Prompt 16 owns official result calculation/publication, Prompt 17 owns official documents, Prompt 11 owns money, and Prompt 12 owns examination entry.

## 1. Post-result invariants

Enforce:

- every case is tenant/institution/student/result-version/course/attempt scoped and references immutable source versions
- the original mark, result, grade, GPA, publication, and document always remain preserved
- applications never imply acceptance or a changed outcome
- `NO_CHANGE`, `INCREASE`, `DECREASE` where regulation permits, `REJECTED`, `WITHDRAWN`, `TIME_BARRED`, and `UNABLE_TO_PROCESS` are explicit distinct outcomes
- fees are authoritative only from Prompt 11; screenshots/redirects are not payment evidence
- this module never directly edits marks, results, GPA, standing, or issued PDFs
- independent evaluators cannot see candidate identity or earlier marks when policy requires blind reassessment
- result recalculation is limited to the affected authorized scope but must include all dependent GPA/standing/classification/document impacts
- revised results/documents supersede rather than overwrite history
- supplementary/backlog eligibility derives from authoritative published results and regulations
- all decisions and mobile submissions become official only after server receipts

Define state machines for application, script-copy delivery, re-evaluation, decision, result revision, supplementary-cycle proposal, and graduation-readiness evidence.

## 2. Post-result service catalogue and policy

Implement immutable effective-dated configuration for:

- recounting/re-totaling
- verification/scrutiny
- answer-script photocopy/scanned-copy request
- revaluation/re-evaluation
- challenge valuation
- result grievance/representation
- correction of clerical/data-entry error
- supplementary/backlog/improvement/makeup application references

Configure by institution/regulation/program/cohort/exam type/course/component/result status:

- eligibility and excluded statuses
- application open/close/late windows using server time
- attempt limits and mutual exclusivity/order among services
- whether photocopy is prerequisite to challenge/revaluation
- fee code, refundable conditions, waiver/exemption, and refund outcome policy
- required declaration, evidence, reason, and supporting documents
- SLA, evaluator count, variance/selection rule reference, and review/approval chain
- whether marks may increase only or increase/decrease/remain unchanged
- maximum revision bounds and mandatory escalation thresholds
- student-view/communication and privacy rules
- withdrawal/cancellation policy

Use typed declarative rules, not executable scripts. Validate overlap, gaps, contradictory windows, cycles, and impossible service dependencies before activation.

## 3. Eligibility and application intake

Implement server-side eligibility based on:

- current published, non-invalidated Prompt 16 result version
- course/attempt/exam category and application type
- configured time window and prior applications
- malpractice/withheld/cancelled/incomplete status policy
- script availability/custody status from Prompt 14
- maximum attempts/services and prerequisite service completion
- approved exceptional extension or court/regulatory order

Support:

- eligibility preview with exact reason codes and deadline
- student or authorized staff application
- course/component selection, declaration, purpose/reason, evidence, delivery preference, and contact confirmation
- draft, submitted, fee_pending, under_validation, accepted, rejected, withdrawn, time_barred, cancelled, processing, decided, result_revision_pending, completed, and superseded states
- immutable submitted version and durable receipt
- correction before deadline through versioning
- late/exception request with separate approval
- idempotency, duplicate prevention, optimistic concurrency, and safe retry

Never trust client-provided deadline, amount, result, mark, or service eligibility.

## 4. Finance integration

Use Prompt 11 for:

- fee request by service/course/component/application version
- demand/payment/waiver/refund references
- pending, paid, waived, reversed, refunded, disputed, and failed states
- payment-state refresh/requery and idempotent events
- outcome-based refund request where policy permits

Store only minimal finance references/evidence. Processing begins only when configured authoritative financial conditions are satisfied. A no-change outcome does not automatically imply refund unless the pinned policy says so.

## 5. Answer-script source and custody

Request scripts through Prompt 14 contracts:

- opaque script/packet/custody reference
- current location/custodian, integrity/condition, page/count metadata, availability, quarantine/legal hold, and source version
- authorized scanning/digitization work order and secure artifact reference
- check-out/handoff/return acknowledgements
- missing/damaged/illegible/incomplete-page exception

Do not duplicate custody or silently upload an unverified script. Every evaluator/delivery artifact pins the source script hash/version and custody release. If no approved digitization exists, support a truthful controlled physical workflow.

## 6. Recounting and scrutiny

Implement deterministic verification for:

- all required questions/subquestions evaluated
- mark transcription between script/mark sheet/system
- question maxima and totals
- optional-choice handling
- addition/transfer errors
- exceptional-code consistency
- page/continuation-sheet completeness reference

Support assigned verifier, checklist, findings, no-error/error-detected, proposed correction, independent review, approval, and Prompt 15 correction request. The verifier does not directly modify marks.

Persist original evidence reference, finding, arithmetic trace, reviewer, and decision. If no change is found, complete with explicit `NO_CHANGE`.

## 7. Photocopy/scanned-copy delivery

Implement:

- identity, eligibility, fee, script availability, and privacy validation
- approved redaction/masking of evaluator identity, internal codes, other candidates, security marks, and restricted annotations
- scan/page completeness QA and artifact hash
- request, prepare, quality_review, approved, released, downloaded, expired, revoked, and reissued states
- short-lived authenticated streaming/download, `no-store`, watermark with requester/application/reference, and download audit
- accessible delivery alternative where feasible
- correction/reissue for missing/incorrect pages without overwriting prior artifact

Do not expose answer keys, examiner identity, moderation notes, other scripts, or custody details. Mobile offline retention is disabled by default; policy-permitted encrypted download has expiry and remote purge.

## 8. Revaluation and challenge-valuation setup

Create reassessment work through Prompt 15-compatible contracts:

- application/result/course/component/script source version
- pinned question paper/marking scheme/rubric reference
- revaluation policy and permitted mark-change direction
- blinded candidate/evaluation code
- evaluation round and independence requirements
- due date, access window, and decision threshold

Support single revaluation, double reassessment, challenge evaluation, third evaluation/adjudication, or committee review only as configured.

The reassessment evaluator cannot be the original evaluator, prohibited related evaluator, setter/moderator, application approver, or result-revision approver when SoD requires separation.

## 9. Evaluator eligibility, assignment, and secure access

Validate subject expertise, qualification, conflict/NDA, affiliation, barred status, workload, availability, training, original-evaluation exclusion, and candidate relationship.

Implement nominate, invite, accept, decline, assign, reassign, revoke, submit, and complete states. External access is assignment-specific, time-bound, MFA-protected, and non-enumerable.

Use deterministic assisted allocation with immutable input/seed/algorithm version, hard conflicts, workload score, and unassigned reasons. Manual override requires validation and reason.

Provide live-authorized secure script/key/rubric access under Prompt 13/15 controls. No persistent cache/download by default, no candidate identity, no earlier marks or result outcome before independent submission, and immediate access revocation after submission/reassignment/expiry.

## 10. Reassessment submission and comparison

Reuse Prompt 15 schemas for exact question/component/rubric marking:

- server-validated values/codes and totals
- autosaved draft, explicit validation, locked submission, and receipt
- immutable reassessment version and provenance
- original mark hidden until policy allows comparison
- deterministic difference/percentage/variance calculation
- policy outcome: no change, increase, decrease if permitted, threshold exceeded, third valuation, adjudication, or rejected-invalid
- explainable selection of revised mark according to pinned regulation

Never copy a revised mark directly into results. Produce an approved Prompt 15 correction/revised mark-set request only after required review.

## 11. Decision, approval, and communication

Implement:

- verifier/evaluator findings
- comparison and regulation-rule trace
- proposed mark outcome and affected result projection
- no-change/increase/decrease/rejected/unable-to-process decision
- reviewer/Controller/committee approval with quorum/SoD and conflict declarations
- step-up authentication for final decision
- decision reason and content-minimized student explanation
- appeal/escalation boundary where regulation allows
- fee-refund request trigger according to policy
- immutable decision receipt

Approvers cannot edit evaluator values. Returning or rejecting creates workflow transitions; source changes invalidate the pending decision.

## 12. Result revision orchestration

After an approved mark correction/revised mark set:

- request Prompt 15 to freeze a superseding mark-set version
- request Prompt 16 targeted recalculation using current approved case-specific rule/input snapshots
- include affected course result, credits, SGPA/CGPA, backlog, standing, classification, progression, and completion dependencies
- compare old/new outcomes and validate scope
- route through required Prompt 16 approval and publication
- preserve original result/publication and link superseding version
- handle `NO_CHANGE` without creating a false changed-result version unless policy requires a decision annotation
- publish only after authoritative approvals and current source validation
- notify student after publication, not merely after evaluator submission

This module orchestrates and tracks; it cannot write result tables or bypass Prompt 16.

## 13. Revised document orchestration

After revised result publication:

- identify affected Prompt 17 grade cards, memos, transcripts, certificates, gazettes, and verification tokens
- mark source invalidation and request supersession/reissue
- preserve old artifact with superseded/revoked current-status verification
- apply fee/refund/waiver policy for replacement documents
- track rendering/signature/issuance/release status
- notify holder when the revised current document is authoritative

Never overwrite an existing document or present a locally generated file as official.

## 14. Result grievances beyond revaluation

Support grievances for:

- missing/incorrect course or attempt
- identity/name/registration mapping issue
- marks/result mismatch
- withheld result or delayed publication
- grade/GPA/credit/standing calculation concern
- incorrect document/version
- process/SLA/accessibility grievance

Triage to the owning module, preserve SLA and evidence, prevent duplicate cases, track referral/response/resolution, and provide one student-facing timeline. The grievance team cannot edit authoritative records.

Use complaint, under_review, referred, evidence_requested, resolved_no_change, correction_initiated, rejected, withdrawn, appealed, closed, and reopened states.

## 15. Withheld-result resolution

Consume Prompt 16 withholding records and owning-source evidence:

- malpractice/disciplinary decision
- finance/no-dues resolution where lawful
- identity/document correction
- missing evaluation/result evidence
- court/regulatory/administrative order

Implement case owner, required actions, evidence, review date, decision, release/continue-withhold/reverse, approval, expiry, and audit. Request Prompt 16 release/publication through its contract. Never change academic marks because a non-academic hold is cleared.

## 16. Supplementary/backlog cycle proposal

Generate a proposal, not an unreviewed live cycle, from authoritative Prompt 16 outcomes:

- students/courses with open backlog/failure/absent or eligible improvement status
- regulation/program/cohort/maximum-duration and attempt rules
- course equivalence/substitution and curriculum transition
- excluded malpractice/withheld/ineligible cases
- expected candidate/course counts, conflicts, and evidence gaps
- proposed cycle/type/session/window/fee codes
- idempotent source/result-version watermark

Support validate, review, approve, and create through Prompt 12 cycle/configuration contracts. Prompt 12 owns the examination cycle and applications. A later corrected result must invalidate/remove eligibility through versioned reconciliation, never destructive deletion.

## 17. Backlog and attempt history

Maintain a read projection derived from Prompt 16 official result history:

- course/equivalence group
- failed/absent/withheld/incomplete/cleared status
- original and later attempts
- best/latest/retained outcome reference
- first-failed and cleared dates
- attempt count and remaining permitted attempts
- maximum-duration deadline
- registered upcoming supplementary cycle/application status from Prompt 12
- credits pending and impact on progression/completion

The projection is rebuildable and not a second academic truth. Show source version/as-of time and unresolved contradictions.

## 18. Maximum-duration and attempt-limit rules

Implement deterministic checks from pinned regulation:

- maximum program completion years/semesters from approved start/readmission/break periods
- excluded/paused periods where formally approved
- course/program attempt limits
- improvement restrictions after pass/completion
- last eligible exam session/date
- exceptional extension by authorized academic/regulatory decision
- time-barred and extension-pending outcomes

Use exact dates and effective-dated decisions. Never infer an extension or delete historical attempts.

## 19. Graduation and degree-completion readiness

Combine versioned evidence without reimplementing owning logic:

- Prompt 06 degree audit: curriculum, credits, mandatory/non-credit, electives, equivalence/substitution
- Prompt 16 published current results, SGPA/CGPA, standing, classification, and backlog status
- maximum duration and attempt history
- required internship/project/training/community/service evidence through future provider ports
- finance/library/hostel/disciplinary/no-dues only where lawful and configured
- identity/document completeness

Produce `ELIGIBLE`, `NOT_ELIGIBLE`, `PENDING`, `CONDITIONALLY_ELIGIBLE`, or `EXCEPTION_REQUIRED` with exact evidence versions and reasons. This is degree-completion eligibility evidence, not the legal/academic degree-award decision.

Support student/program/cohort views, projected completion risk, authorized exception workflow, approval-ready eligibility list for Prompt 17, and invalidation when any source changes.

## 20. Graduation-risk and corrective action

Provide transparent risk categories:

- open backlog/required credits
- mandatory/non-credit course incomplete
- project/internship/training requirement pending
- maximum-duration/attempt deadline approaching
- withheld or unresolved grievance/revaluation
- missing authoritative evidence

Show the exact reason and source; no opaque predictive score. Support assigned advisor, student action plan, target term/cycle, follow-up, referral, and completion. Risk tracking never changes academic eligibility.

## 21. Notifications, dashboards, reports, and exports

Provide privacy-minimized notifications for application receipt, fee status, script-copy release, evidence request, decision, revised result/document availability, supplementary-cycle action, deadline, withheld resolution, and graduation risk. No marks, grades, script content, or sensitive reason in push/SMS/email.

Dashboards include:

- applications by type/status/SLA
- fee pending and refund reference status
- script availability/copy preparation
- evaluator assignment/progress/variance
- decision/no-change/increase/decrease aggregates
- result/document revision status
- grievances/referrals/aging
- withheld cases
- backlog by course/program/cohort and upcoming eligibility
- maximum-duration/attempt risks
- graduation readiness/evidence gaps

Reports state source versions/as-of time. Governed exports require purpose, scope, approval, minimization, masking, watermark/classification, encryption, formula-injection prevention, short expiry, and audit.

## 22. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- service policy/version/validate/simulate/review/activate
- eligibility preview and application draft/submit/receipt/correct/withdraw/status
- finance request/evidence/refund-status refresh
- script availability/custody/digitization request and copy QA/release/download/revoke
- recount/scrutiny assignment/checklist/findings/decision
- reassessment work/evaluator eligibility/invite/assign/access/submit/receipt/compare
- review/quorum/approve/reject/appeal
- Prompt 15 correction and frozen-mark status
- Prompt 16 recalculation/approval/publication status and diff
- Prompt 17 affected-document/supersession/reissue status
- grievance triage/refer/evidence/respond/resolve/reopen
- withheld case/evidence/review/release request
- supplementary proposal/validate/reconcile/approve/create-cycle status
- backlog/attempt/maximum-duration projections
- graduation-readiness/evidence/exception/list
- dashboards/reports/governed exports and operational queues

Use role-shaped DTOs, bounded pagination, allowlisted filters/sorts, RFC 7807, optimistic versions, idempotency keys, correlation IDs, server time, strict cache controls, rate limits, authorization, audit, and generated clients.

Define least-privilege permissions for policy maker/checker, student application, fee status, script copy prepare/QA/release, recount, evaluator nomination/assignment, reassessment, decision review/approve, result revision orchestration, document supersession, grievance triage, withheld resolution, supplementary proposal/approval, backlog view, degree-readiness review/exception, reports/exports, audit, and platform health.

Enforce SoD among original evaluator, reassessment evaluator, verifier, decision approver, mark-correction approver, result approver, document issuer, supplementary-cycle approver, and degree-eligibility exception approver. Platform operations see job/integration/storage/event health and masked references only—not student results, scripts, marks, decisions, grievances, or eligibility reasons.

Use transactional outbox/inbox. Events carry opaque references and minimal state, never script content, marks, result details, evaluator identity, grievance text, documents, or sensitive reasons. Consumers tolerate retries/out-of-order delivery.

## 23. React web interfaces

Implement accessible responsive interfaces for:

- policy/service/window/fee/SLA configuration and simulation
- student application/eligibility/receipt/status
- application validation and exception queue
- script custody/digitization/copy-redaction/QA/release
- recount/scrutiny checklist and findings
- evaluator eligibility/allocation/secure work status
- reassessment comparison/variance/decision/quorum/approval
- result recalculation/diff/reapproval/publication tracking
- affected-document/supersession/reissue tracking
- grievance intake/triage/referral/SLA/resolution
- withheld-result evidence and release
- supplementary proposal/population/conflicts/reconciliation/Prompt 12 creation
- backlog/attempt/maximum-duration dashboards
- degree-completion readiness/evidence/exception/eligibility list
- reports/governed exports/audit/operational health

Meet WCAG 2.2 AA intent with keyboard operation, screen-reader semantics, visible focus, non-color-only status, high zoom, regional-language support, accessible script-copy alternative where feasible, and clear warnings that revaluation may cause no change or a decrease when regulation permits.

## 24. React Native Android/iOS interfaces for every role

Build genuine native role interfaces using real APIs, not WebViews or placeholders.

### Student/Alumni

- service eligibility, deadline, fee, declaration, application, payment deep link, receipt, and status timeline
- secure script-copy view/download where policy permits
- evidence request/response, decision with no-change/increase/decrease warning, revised result/document links
- grievance submission/status, withheld-result actions, supplementary eligibility/application deep link, backlog and graduation-readiness view
- encrypted minimal offline status/cache; all submissions/payments/decisions refresh require server confirmation

### Guardian/Authorized Delegate

- only policy-permitted linked learner deadlines, payment/action status, and notifications
- no adult/alumni access without explicit delegation; no script, marks, grievance text, or evaluator identity by default

### Recount/Verification Staff

- assigned masked script/checklist, arithmetic/transcription findings, evidence reference, and submit receipt
- no direct mark editing, result approval, or candidate identity when masking applies

### Revaluation/Challenge Evaluator

- conflict/NDA, assignment, secure live-authorized script/key/rubric access where device policy permits, exact mark entry, validation, and locked receipt
- no original evaluator identity, candidate identity, earlier marks, or persistent offline script cache
- complex full-script evaluation remains tablet/hardened-web first where phone UX is unsafe

### Examination Cell/Post-Result Coordinator

- application/script/evaluator/decision/result-revision/document/grievance/withheld/supplementary queues
- urgent mobile actions; bulk allocation, reconciliation, and exports remain web-first

### Controller/Dean/Registrar/Committee Approver

- policy, eligibility, fee, source, evaluator conflict, comparison, result/document impact, quorum, and SoD summary
- step-up approve/reject/return/release with authoritative receipt
- no direct marks/result/document editing

### HOD/Program Coordinator/Faculty Mentor

- program/advisee application status, backlog, deadline, graduation risk, and authorized grievance referral
- no protected script, evaluator, fee detail, or decision override unless formally assigned

### Finance Staff/Cashier

- Prompt 11 fee/payment/waiver/refund reference status and finance actions only
- no script/reassessment/result mutation

### Script Custody/Digitization/Records Staff

- opaque script request, handoff, scan/page QA, redaction status, artifact release, return, and discrepancy
- no evaluator marks or result approval

### Degree Audit/Academic Office

- authoritative requirement/evidence gaps, backlog/credits/maximum-duration, exception queue, and eligibility-list review
- no result field editing or degree award in this prompt

### Auditor/Internal Quality/University Observer

- time-bound read-only applications, assignments, SoD, decisions, source/revision chains, supplementary proposals, and eligibility evidence
- script/result details only if explicitly purpose-authorized

### Tenant Administrator/Leadership

- configuration visibility and authorized aggregate dashboards
- no implicit script, evaluator, grievance, result-correction, or student eligibility access

### Platform Operations

- job/storage/integration/event/notification health, masked tenant/case IDs, errors, and trace IDs
- no student, script, mark, result, grievance, evaluator, document, or degree-readiness data

Mobile-wide requirements:

- secure OS keystore, app lock/fresh step-up, device/role/tenant checks, and rooted/jailbroken-device policy
- encrypted tenant/user/case-partitioned allowlisted cache; no script/mark offline cache by default; purge on logout, role/assignment/relationship loss, tenant switch, expiry, remote revoke, or source invalidation
- protected viewer, app-switcher/backup/share controls where supported, with screenshot limitations documented
- push payloads contain no marks, grades, script content, evaluator identity, grievance text, or sensitive eligibility reason
- deep links use opaque references, reauthenticate, reauthorize, and fetch current state
- explicit draft/submitted/fee-pending/processing/decided/no-change/revised/superseded/stale states
- official applications, evaluator submissions, approvals, releases, and acknowledgements require server receipts
- accessibility, dynamic type, localization, low-connectivity recovery, safe idempotent retry, and tablet evaluation layouts
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role and intentional web-first/no-access state

## 25. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized tables such as:

- post-result policy/version/service/window/rule
- application/version/course selection/declaration/evidence/receipt/fee reference
- script request/custody reference/digitization artifact/copy QA/release
- recount assignment/checklist/finding/decision
- reassessment work/masking reference/evaluator assignment/access/submission/comparison
- review/quorum/decision/appeal/refund reference
- mark-correction/result-revision/document-supersession orchestration
- grievance/category/referral/response/SLA/resolution
- withheld case/evidence/review/release
- supplementary proposal/source snapshot/candidate course/exception/approval/cycle reference
- backlog/attempt/maximum-duration projection
- degree-readiness snapshot/evidence/result/exception/eligibility list
- report/export/job/projection checkpoint

Every tenant-owned table carries tenant/institution/student/result/course/cycle and applicable case/attempt scope; foreign keys cannot cross tenants; repositories require explicit predicates; enable and force RLS where constitutionally required. Add immutable-version, unique/idempotency, window/state/temporal, evaluator/SoD, source-hash, decision, supersession, optimistic-lock, and retention constraints with appropriate indexes.

Test student/alumni, guardian/delegate, verifier, evaluator, post-result staff, Controller/committee, HOD/mentor, finance, custody/digitization, degree-audit, auditor, worker, reporting, migration, and operations database roles independently. Technical roles never receive general post-result RLS bypass.

## 26. Security, privacy, integrity, and resilience

Threat-model:

- application/result/fee/deadline tampering
- candidate/evaluator identity leakage
- unauthorized script-copy delivery or persistent cache
- reassessment collusion and prior-mark bias
- forged evaluator submission or provider/callback event
- direct mark/result/document edit
- duplicate refund or application
- grievance evidence/message leakage
- supplementary population manipulation
- stale result used for backlog or graduation readiness
- insider exception/maximum-duration/withheld-release abuse

Apply purpose/context authorization, masking, response shaping, step-up, MFA, SoD/quorum, exact server rules, encryption, short-lived access, safe documents, rate limits, device/session controls, immutable versions, audit, and anomaly alerts. Never log scripts, answers, marks, grades, GPA, grievance contents, evaluator identity, or sensitive reasons.

Define retention/legal hold, backup/restore, application/payment event replay, script loss/damage, evaluator reassignment, result/document orchestration recovery, supplemental-proposal rebuild, degree-readiness projection rebuild, source invalidation, RPO/RTO, SLIs/SLOs, alerts, and incident runbooks. Never infer a favorable decision or changed mark when dependencies fail.

## 27. Tests

Implement and run:

- policy precedence/windows/time zones/prerequisites/exclusions/attempt limits/increase-decrease rules
- eligibility, duplicate applications, correction/withdrawal/late exception, idempotency/concurrency, and receipts
- Prompt 11 pending/paid/waived/reversed/refunded/disputed behavior and refund idempotency
- Prompt 14 script availability/custody/version/missing/damaged/quarantine and no unverified upload
- recount arithmetic/question/choice/code/transcription checks and no direct edit
- script-copy redaction/page QA/hash/authorization/expiry/revoke/reissue/canary non-disclosure
- evaluator eligibility/original-evaluator exclusion/conflict/NDA/MFA/window/assignment/revoke/blind access
- reassessment exact marks/totals/lock/receipt, hidden prior marks, variance/third/adjudication, and no-change/increase/decrease matrices
- decision quorum/SoD/step-up/source invalidation and no guaranteed change
- Prompt 15 superseding mark set, Prompt 16 targeted full dependency recalculation/approval/publication, and Prompt 17 document supersession preservation
- grievance triage/referral/SLA/deduplication/role isolation
- withheld release without academic-value mutation
- supplementary proposal population, exclusions, equivalence, corrected-result invalidation, idempotency, and Prompt 12 handoff
- backlog/attempt/maximum-duration edge cases, breaks/extensions, and projection rebuild
- degree readiness for credits, mandatory courses, backlogs, projects/internships provider unavailable, no-dues, time limit, exception, source invalidation, and no degree-award claim
- event minimization/idempotency/out-of-order recovery
- RLS negative tests across tenant, student, result, course, case, evaluator assignment, grievance, supplementary population, and technical roles
- web accessibility and Playwright journeys for every role
- Android/iOS journeys, secure copy viewer, no script offline cache, remote purge, deep-link reauthorization, step-up, status transitions, and server receipts
- worker crash recovery, finance/custody/evaluation/result/document/notification outage, backup restore, orchestration reconciliation, and target-volume performance

Add synthetic canary tests ensuring script, mark, evaluator, grievance, and decision content never enters logs, traces, metrics labels, events, notifications, analytics, general search, crash reports, or snapshots.

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim legal/regulatory approval, external evaluator, device, load, or iOS evidence not actually executed.

## 28. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- post-result glossary and state diagrams
- service eligibility/window/fee/refund/increase-decrease rule catalogue
- recount, photocopy/redaction, revaluation/challenge, evaluator independence, and decision specifications
- Prompt 14/15/16/17 orchestration and supersession contracts
- grievance and withheld-resolution procedures
- supplementary proposal/backlog/attempt/maximum-duration specification
- graduation-readiness evidence model and degree-award boundary
- permission/scope/SoD and mobile role-feature matrices
- threat model/privacy assessment
- runbooks for missed window, duplicate payment, unavailable script, missing pages, evaluator decline, source invalidation, no-change dispute, changed result, failed recalculation, stale document, withheld release, supplementary mismatch, maximum-duration exception, eligibility projection rebuild, restore, and disaster recovery
- role guides for students/alumni, guardians/delegates, verifiers, evaluators, post-result staff, committees, HOD/mentors, finance, custody/digitization, degree-audit staff, auditors, tenant administrators, and operations

The completion gate passes only when:

1. Versioned policy deterministically controls eligibility, windows, prerequisites, fees, outcomes, SLAs, and appeals.
2. Applications are immutable, idempotent, server-validated, receipted, and never promise a changed mark.
3. Script custody and copy delivery are verified, redacted, short-lived, privacy-safe, and fully audited.
4. Recount/reassessment uses eligible independent masked staff, exact validation, immutable submission, and pinned source/rule versions.
5. No-change/increase/decrease/rejected outcomes follow explicit rules and preserve all original values.
6. Approved changes flow through Prompt 15 mark freeze, Prompt 16 full dependent recalculation/approval/publication, and Prompt 17 supersession without direct table/artifact edits.
7. Grievances and withheld cases route to owning evidence and cannot bypass source authority.
8. Supplementary proposals derive reproducibly from current official results and create cycles only through Prompt 12.
9. Backlog, attempt, maximum-duration, and graduation-readiness projections are rebuildable, versioned, explainable, and do not constitute degree award.
10. Every relevant role has a meaningful React web and native Android/iOS interface or explicit secure no-access state.
11. Mobile caches are encrypted/scoped/purgeable, confidential scripts remain offline-denied by default, and official actions require server receipts.
12. Every tenant table has explicit predicates, forced RLS as required, constraints, and cross-tenant/cross-role negative tests.
13. OpenAPI/events/generated clients, migrations, canary/security/accessibility/observability checks, docs, ADRs, runbooks, and all environment-available tests pass.
14. No original result/document was overwritten, no change was guaranteed, and no OBE attainment or degree-award decision was implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, policies/applications/fees/scripts/recount/revaluation/decisions/result and document revisions/grievances/withheld/supplementary/backlogs/degree readiness, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency, canary and all exact test commands/results/exit status, docs/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(post-result): implement revaluation supplementary and completion workflows`

Stop. Do not begin Prompt 19 or implement OBE attainment, surveys, or accreditation evidence.
```

---

## Review Checklist Before Prompt 19

- Revaluation never guarantees change and supports no-change/increase/decrease exactly as regulation allows.
- Original marks, results, publications, and documents remain preserved through superseding versions.
- Evaluators are independent, masked, conflict-checked, time-bound, and cannot see prior marks when policy prohibits it.
- Finance, custody, evaluation, result, and document modules remain authoritative for their own records.
- Supplementary cycles derive from official backlogs and are created only through Prompt 12.
- Backlog/attempt/maximum-duration/graduation-readiness evidence is reproducible and not a degree-award decision.
- Every relevant role has a suitable web/native-mobile workflow or intentional denial.
- Every tenant table has RLS and negative isolation tests.
- No Prompt 19 OBE/attainment/accreditation functionality was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 19 until these conditions pass.
