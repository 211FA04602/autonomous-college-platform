# Claude Code Prompt 15

## Evaluation, Marks, Moderation, and Correction

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–14 passed, were reviewed, and were committed  
**Scope:** Evaluator eligibility and assignment, anonymized script allocation, question/component-wise marking, rubric evaluation, double/third valuation, moderation, staged imports, locked-mark correction, completion controls, and role-specific interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially autonomous evaluation, coding/masking, examiner assignment, question-wise marks, practical/lab/viva/project evaluation, double valuation, moderation, corrections, imports, audit, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, and repository conventions.
3. Inspect Prompt 10 approved question/rubric/scoring contracts, Prompt 12 exam cycle/course/component/frozen candidate and status-code contracts, Prompt 13 final paper/answer-key/marking-scheme access boundary, Prompt 14 script packet/barcode/custody/practical-panel handoff, Prompt 09 assignment-rubric patterns, Prompt 01 identity/RBAC, and Prompt 02 workflow/audit/document/outbox foundations.
4. Inspect OpenAPI/generated clients, PostgreSQL RLS, permissions/SoD, data dictionary, secure object viewing/annotation boundaries, offline mobile patterns, notification service, background jobs, observability/redaction, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, expose candidate identity when masking is active, alter question papers, implement the Prompt 16 result engine/SGPA/CGPA/grades/pass-fail publication, issue grade cards, or use fabricated AI grading/OCR/provider outputs.

Implement a bounded `evaluation-marks` domain. It owns evaluator assignment, anonymized script work allocation, raw and moderated mark capture, validation, evaluation rounds, correction history, completion/freeze evidence, and secure downstream mark snapshots. It does not own examination eligibility, paper creation, physical script custody, official result calculation, publication, or attainment.

## 1. Mark and evaluation invariants

Enforce:

- every mark is tenant/institution/exam-cycle/candidate-attempt/course/component and, where applicable, question/rubric-criterion scoped
- every value/code has provenance: source script/attempt, evaluator or import batch, evaluation round, rule/config/question-paper version, server timestamps, and immutable correction lineage
- use exact decimal arithmetic and explicit scale/rounding; never binary floating point
- a value and an exceptional status code are mutually consistent under typed rules
- maximum/minimum bounds, required entries, optional-choice logic, totals, and component relationships are validated server-side
- submitted/locked/frozen marks are immutable; change occurs only through reversal/superseding correction versions
- direct database edits and unrestricted bulk mutation are prohibited
- evaluator identity and candidate identity are separated when anonymization is enabled
- no evaluator can see another independent valuation before submitting when blind double evaluation is configured
- moderation never silently overwrites raw valuations; raw, selected, adjusted, and final-for-result values remain separately traceable
- official mobile actions require authoritative server receipts
- Prompt 16 consumes only frozen/versioned mark evidence and owns pass/fail, grade, credit, SGPA/CGPA, classification, and publication

Document the canonical marks model, state machines, exact arithmetic, and selection/moderation invariants before implementation.

## 2. Evaluation configuration

Implement immutable effective-dated configuration by institution/exam cycle/regulation/course/component/exam type:

- evaluation mode: single, double-blind, double-open where policy permits, sample review, third valuation, panel, practical, viva, project, or automated-result reference boundary
- entry granularity: total, question, sub-question, section, rubric criterion, examiner/panel member
- maximum/minimum marks and permitted decimal scale
- required/optional/choice questions and attempted-question handling
- exceptional codes and whether numeric value is allowed with each code
- valuation rounds, evaluator count, variance formula/threshold, third-evaluation trigger, selection rule, average/nearest/two-of-three/committee rule
- moderation methods and caps represented as typed declarative rules
- chief evaluator sampling/review policy
- submission deadline, lock, reopen, correction, and freeze policy
- anonymization/masking, paper/key access, and script-view policy
- import policy, required approvals, and atomicity

Reject overlaps, contradictory rules, invalid totals, ambiguous rounding, cyclic selections, or rules that cannot produce one deterministic downstream value. Activated versions are immutable; changes create a new version and impact analysis.

## 3. Evaluation work units and source reconciliation

Create evaluation work only from authoritative inputs:

- Prompt 12 cycle/course/component/frozen candidate version
- Prompt 14 collected script/packet/barcode/custody handoff or verified digital-attempt reference
- Prompt 13 final paper/marking-scheme reference where authorized
- Prompt 10 question/rubric versions

Implement:

- expected attempt/script population
- received, missing, extra, duplicate, damaged, quarantined, cancelled, absent/no-script, withheld, malpractice_pending, and special-case states
- reconciliation by candidate attempt, script opaque ID, course/component, packet, and source version
- exception queue before evaluator allocation
- immutable evaluation-work snapshot and source watermark
- idempotent response to late/ corrected custody events before freeze
- no creation of a markable script from a scan/upload alone without authoritative custody/attempt evidence

Do not copy physical custody history; reference Prompt 14 and request authorized handoffs.

## 4. Anonymization, masking, and coding

Implement configurable masking:

- opaque evaluation code distinct from student/roll/hall-ticket number and script barcode where policy requires
- cryptographically random or approved deterministic mapping generated server-side
- separate mapping vault/table with narrower permissions, encryption, and audit
- masking by candidate, course, component, evaluation round, and script
- no identity fields in evaluator APIs, filenames, watermarks, notifications, search, logs, URLs, exports, or error messages
- authorized decode only after configured milestone/purpose with step-up authentication and SoD
- re-code/supersede for compromised mapping while preserving lineage
- mapping reconciliation before result handoff

Evaluators must not infer identity from ordering. Randomize work-list ordering and minimize metadata such as program/section when unnecessary.

## 5. Evaluator eligibility and nomination

Support internal and external evaluators, chief evaluators, moderators, third evaluators, practical/viva/project panel members, and verification staff.

Validate:

- active identity/affiliation and effective authorization
- subject/course expertise, qualification, experience, and role
- conflict-of-interest and candidate relationship declaration
- current teaching relationship restrictions where configured
- barred/suspended status
- workload/capacity, availability, location/mode, and deadline
- NDA/confidentiality and acceptable-use acknowledgement
- training/calibration completion reference where required
- incompatibility with setter/moderator/other rounds under SoD policy

Implement nominate, verify, invite, accept, decline, assign, reassign, suspend, revoke, substitute, and complete states. External access is assignment-specific, time-bound, MFA-protected, and reveals no unrelated candidate/course/paper data.

## 6. Deterministic evaluator and script allocation

Implement assisted allocation from immutable inputs:

- fair workload and configured capacity
- subject expertise and role eligibility
- conflict/SoD rules
- blind independence between evaluation rounds
- same/different evaluator or institution restrictions
- packet/script distribution and deadline
- reserve evaluators and reallocation
- deterministic seed, algorithm/version, input/output hashes, hard conflicts, soft score, and unallocated work reasons

Support authorized manual allocation with full server revalidation and reason. Published allocations are immutable; amendments create versions and revoke superseded access. Do not claim global optimality unless proven.

## 7. Secure script and marking-material access

Define secure access to scanned/digital script artifacts or physical-script metadata:

- just-in-time authorization by assignment, round, window, MFA assurance, device/session risk, and current workflow state
- short-lived signed/streaming access with `no-store` behavior
- separate authorization for question paper, answer key, solution, and marking scheme
- opaque artifact identifiers and watermarks containing evaluator/session reference without candidate identity
- view/download/print policy, with download disabled by default for digital evaluation
- no persistent browser/mobile/service-worker cache
- access/view/page-navigation audit without capturing answer content
- immediate revoke on reassignment, submission, expiry, incident, or role loss

If script digitization/OCR is not implemented by an approved provider, expose a truthful physical-evaluation/reference workflow. Never fabricate script images or OCR text.

## 8. Question-wise and component-wise mark entry

Implement:

- exam/paper section/question/sub-question schema pinned to Prompt 10/13 version
- attempted, not_attempted, optional_not_selected, invalid_choice, cancelled_question, and not_applicable handling according to policy
- numeric marks with exact decimal validation and maximum/minimum bounds
- exceptional attempt-level codes: absent, malpractice_pending, withheld, not_registered, no_script, cancelled, approved_special, and configurable codes
- keyboard-efficient entry, safe autosave draft, explicit validation summary, and submit confirmation
- per-question annotation/comment references with privacy controls
- automatic arithmetic totals as a derived value; never accept a client total as authority
- missing/duplicate/out-of-range/inconsistent entries and wrong-paper/script detection
- server receipt with entry count, total, source/version hash, evaluator, round, and timestamp

Do not show pass/fail or predicted grades to evaluators unless explicitly required and approved; such information can bias evaluation.

## 9. Rubric evaluation for practical, lab, viva, project, and subjective work

Support immutable rubric versions from Prompt 10/approved local component setup:

- criterion, level, descriptor, weight/marks, CO mapping reference, required evidence, and comment policy
- individual examiner or panel-member scoring
- panel consensus, chair decision, average/median/weighted combination, or configured deterministic rule
- attendance/completion and exceptional status reference from Prompt 14
- practical record, demonstration, viva, project milestone/report/presentation/repository evidence references without duplicating content
- independent panel-member submission where configured
- criterion totals, required comments for extremes, and conflict/variance validation
- panel minutes/attestation and server receipt

Do not implement project repository execution, plagiarism judgments, or attainment calculations here.

## 10. Draft, submit, lock, and reopen lifecycle

Implement work-item states:

- allocated
- accepted
- in_progress
- validation_failed
- ready_to_submit
- submitted
- locked
- returned_for_completion
- reopened
- superseded
- cancelled
- completed

Evaluator submission locks that round/version. Reopen before final freeze requires authorized request, reason, scope, approver, deadline, step-up where configured, and audit. Reopen never edits the locked version; it creates a superseding entry version and invalidates affected moderation downstream.

Provide deadline/SLA monitoring, reminders, workload progress, abandoned-session recovery, and reassignment without revealing candidate identity.

## 11. Chief evaluator review and sampling

Implement:

- configured random/risk/percentage sample selection with deterministic seed and selection reason
- completeness, marking-scheme adherence, arithmetic, distribution, skipped-question, extreme-score, and comment checks
- review without candidate identity when masking is active
- accept, return specific work, request clarification, recommend calibration, suspend allocation, or escalate
- calibration notes and common-error guidance distributed without script/candidate content
- sample expansion under policy when issues exceed threshold
- review history, reviewer SoD, and immutable decisions

Chief review does not silently edit evaluator marks.

## 12. Double evaluation and variance

Implement independent valuation rounds:

- round-two evaluator cannot see round one marks/comments/identity before their own locked submission
- exact configurable variance calculation on total and optionally question/rubric levels
- absolute/percentage/normalized threshold with explicit zero-denominator handling
- within-threshold deterministic selection/combination rule
- exceeded-threshold trigger for third evaluation or review committee
- question-level discrepancy report visible only to authorized roles after independence is preserved
- missing/invalid round blocks selection
- round replacement after evaluator disqualification preserves all prior versions and re-runs selection

Persist raw round values, variance inputs/result, rule version, selected/combined value, and trace. Never overwrite valuations with the chosen value.

## 13. Third evaluation and adjudication

Implement:

- deterministic third-evaluator assignment under eligibility/SoD rules
- blind access independent of prior scores where configured
- third-round submission and lock
- configured selection: closest two, middle value, average of nearest, third replaces, committee selection, or other validated declarative rule
- tie and edge-case handling
- adjudication committee workflow where no deterministic rule resolves the case
- reasoned decision, quorum, conflict declarations, and approval

Store all alternatives and the exact selection trace. Committee decisions create a versioned selected mark; they do not mutate raw values.

## 14. Moderation and normalization within marks domain

Implement only pre-result mark moderation explicitly authorized by regulation:

- question cancellation and configured redistribution/full-credit rule
- question-wise common error correction
- bounded addition/deduction/scale rule
- examiner calibration correction when approved
- practical/panel moderation
- sample-to-population application only when policy permits and scope is explicit
- per-candidate/per-question/per-component caps and floors

Every moderation run has proposal, impacted population preview, before/after aggregates, rule/config version, exact formula, warnings, maker-checker/committee approval, run hash, and reversible version.

Preserve raw selected marks and moderated marks separately. Do not implement grade normalization, relative grading, grace marks, pass/fail, or result publication; Prompt 16 owns those.

## 15. Controlled marks import

Implement staged import for permitted offline/practical/external-evaluator workflows:

- versioned template tied to exam/course/component/question/rubric schema and masked candidate/script IDs
- upload through secure document service, MIME/signature/malware validation, file hash, duplicate protection, and safe parsing
- stage rows, validate identity/scope/version, exceptional codes, decimals, bounds, required entries, totals, duplicates, missing/extra candidates, and evaluator authority
- row-level errors and reconciliation against expected work
- dry-run impact summary and explicit all-or-nothing/default atomicity policy
- maker-checker approval for bulk/high-risk import
- idempotent commit producing the same immutable provenance as manual entry
- compensating reversal/superseding import, never destructive rollback

Prevent CSV/XLSX formula injection, hidden-sheet/row ambiguity, macros, external links, and unsafe archive paths. Never permit a generic spreadsheet to bypass question-level validation.

## 16. Mark correction after submission

Implement formal correction:

- request by evaluator/chief/exam cell/auditor/system validation according to policy
- exact original version/value/code and proposed value/code
- candidate/script/course/component/question scope
- typed reason, explanation, supporting evidence, source incident, and impact preview
- review/approval chain, SoD, threshold-based additional approval, and step-up authentication
- submitted, under_review, evidence_requested, approved, rejected, implemented, appealed, reversed, and superseded states
- implementation as immutable superseding mark version
- invalidation/recalculation of variance, selection, moderation, completion/freeze, and downstream Prompt 16 evidence
- notification only to authorized roles with no sensitive mark content in push/email/SMS

No bulk UI edit, SQL script, or administrator privilege may bypass correction workflow for locked marks.

## 17. Anomaly and completeness validation

Provide explainable, rules-based signals:

- missing or duplicate scripts/marks
- constant/repeated patterns
- all-zero/all-maximum or excessive extreme values
- unusual question omission
- arithmetic mismatch
- high evaluator variance/disagreement
- evaluation speed outside configurable review bounds
- distribution difference between evaluators/sections
- excessive corrections/reopens/import overrides
- unrecognized codes or stale configuration

Signals create review tasks; they never automatically accuse misconduct or change marks. Use aggregate/minimized data and disclose the deterministic rule/version. Any future ML anomaly model requires separate governance and validation.

## 18. Evaluation completion and mark freeze

Implement readiness by exam/course/component:

- expected versus received/evaluated/locked scripts
- absent/no-script/withheld/malpractice/special codes resolved as required
- double/third valuations complete
- chief review/sample complete
- moderation approved/applied
- import reconciled
- correction/reopen queues closed
- masking mapping consistent
- no invalid totals, missing questions, duplicates, stale sources, or invariant failures

Support evaluator attestation, chief evaluator verification, exam-cell reconciliation, Controller/authorized approval, and immutable mark-set freeze. Freeze stores source/version watermarks, raw/selected/moderated values, codes, rule/engine versions, hash, counts, timestamp, and approvers.

Post-freeze change requires controlled reopen, impact analysis, step-up/SoD approval, superseding freeze, Prompt 16 invalidation event, and re-attestation. Never mutate a frozen set.

## 19. Downstream result-engine evidence

Expose Prompt 16 a minimal read-only versioned contract:

- candidate attempt, course/component, mark-set freeze version
- raw selected value, approved moderated value, exceptional code, maximum marks, and applicable precision
- question/rubric detail only if explicitly required by calculation/audit purpose
- configuration/rule/source references
- withheld/malpractice/pending/correction flags
- validity, frozen timestamp, invalidation, and superseding version

Prompt 16 must reject unfrozen/stale/invalidated evidence. Publish content-free events for mark set frozen/superseded/invalidated and code/status changed. Do not publish marks in events.

## 20. Notifications, dashboards, reports, and exports

Provide authorized operational views for:

- expected/received/evaluated/pending scripts
- evaluator assignment/acceptance/progress/SLA/reassignment
- chief review/sample/calibration
- double-evaluation variance and third-valuation queue
- moderation proposal/impact/approval
- import validation/reconciliation
- correction/reopen aging and audit
- missing/duplicate/anomaly exceptions
- course/component completion and freeze readiness
- downstream evidence freshness

Exports require purpose, scoped permission, approval where configured, identity masking, classification/watermark, field minimization, encryption, formula-injection protection, short expiry, and download audit. Evaluator exports cannot contain candidate identity. Never send mark details through notification payloads.

## 21. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- evaluation configuration/version/validate/simulate/review/activate
- work-source reconcile/exception/expected population
- masking-code generate/map-authorized/decode-authorized/revoke/reconcile
- evaluator nominate/verify/invite/declaration/accept/decline/assign/reassign/revoke
- allocation generate/job/validate/compare/publish/amend
- script/material authorized-access session/revoke/audit
- mark draft/autosave/validate/submit/receipt/query by assignment
- rubric/panel member score/consensus/attestation
- chief review/sample/return/calibration
- variance/calculate/trace/third-round/adjudication
- moderation propose/simulate/review/approve/apply/reverse
- import template/upload/stage/validate/preview/approve/commit/reconcile
- correction request/evidence/review/approve/implement/appeal/reverse
- anomaly/completeness/readiness/attest/freeze/reopen/supersede
- result-engine evidence/status/invalidation
- dashboards/reports/governed exports and operational queues

Use explicit role-shaped DTOs, bounded pagination, allowlisted filters/sorts, RFC 7807 with non-revealing errors, optimistic versions, idempotency keys, correlation IDs, server time, `no-store` controls, rate limits, audit, and generated clients.

Define least-privilege permissions for configuration, work reconciliation, masking administration/decode, evaluator nomination/assignment, script/key view, draft/submit marks, chief review, variance/third valuation, moderation maker/checker, import maker/checker, correction request/review/approve, completeness verification, freeze/reopen, evidence view, reports/exports, audit, and platform health.

Enforce SoD among setter, evaluator rounds, chief reviewer, moderator, importer, corrector, freeze approver, and masking decoder according to policy. Platform operators see service/job/storage/event health, masked references, and trace IDs only—not scripts, identities, questions, keys, marks, codes, comments, or distributions.

Use transactional outbox/inbox. Events contain stable opaque references and minimal state, never candidate identity, paper/script content, question metadata, marks, codes, comments, or signed URLs. Consumers are idempotent and tolerate retries/out-of-order delivery.

## 22. React web interfaces

Implement accessible responsive interfaces for:

- evaluation configuration and version comparison
- expected-work/script reconciliation and exception queues
- masking administration with strictly separated decode workflow
- evaluator eligibility/invitation/assignment and deterministic allocation
- evaluator secure workbench with script viewer boundary, question navigation, keyboard mark entry, rubric, autosave, validation, submission, and receipt
- chief evaluator sampling/review/calibration
- blind double/third valuation and variance/adjudication
- moderation simulation/impact/review/application
- staged import template/mapping/errors/reconciliation/approval
- mark correction and reopen workflow with diff/impact
- anomaly/completeness dashboards, attestation, freeze, and downstream evidence status
- reports/governed exports and content-free operational audit

Meet WCAG 2.2 AA intent: full keyboard entry/navigation, screen-reader semantics, visible focus, high zoom, accessible script/image alternatives where available, non-color-only validation, localized exact decimals, safe session timeout, and no identity leakage through accessibility labels.

## 23. React Native Android/iOS interfaces for every role

Build genuine native role interfaces using real APIs, not WebViews or placeholder menus. Phone/tablet capabilities may differ honestly; confidential offline access is deny-by-default.

### Internal/External Evaluator

- invitation, conflict/NDA, assignment, deadlines, workload/progress, secure messages, and acceptance/decline
- question/component/rubric marking on approved mobile/tablet form where policy allows, with draft autosave and server validation
- script content access only on compliant live-authorized devices; no offline cache/download by default
- validate, submit, and receive immutable server receipt
- no candidate identity or other evaluator's score

### Chief Evaluator

- progress/SLA, sample queue, masked review, checklist, return/accept, calibration guidance, and escalation
- secure step-up for sample expansion/reopen recommendation
- high-volume comparative analysis remains web-first

### Second/Third Evaluator and Adjudicator

- independent blind assignment and submission
- variance/adjudication detail only after own submission and when authorized
- committee decision/attestation with conflict declaration, quorum, step-up, and server receipt

### Practical/Lab/Viva/Project Examiner or Panel Member

- assigned batch/candidate opaque reference, attendance/completion status, rubric criteria, evidence references, comments, individual submission, and panel attestation
- no unrelated candidate records or result/pass-fail view

### Examination Cell/Evaluation Coordinator

- source reconciliation, evaluator allocation/progress, missing work, variance, import, correction, anomaly, and freeze-readiness queues
- mobile review/actions for urgent exceptions; bulk allocation/import and large reconciliation remain web-first

### Controller of Examinations/Dean/Registrar/Approver

- configuration/moderation/import/correction/freeze/reopen impact, SoD, count, and risk summaries
- step-up approve/reject/return with authoritative receipt
- no direct editing of marks

### Masking/Coding Officer

- code-generation/reconciliation status, mismatch queue, authorized scan/verification, and controlled decode request
- cannot mark/evaluate/approve results; no broad identity-to-mark view

### Script Custody/Digitization Staff

- Prompt 14 packet/script handoff, scan/digitization job/reference, quality/missing-page exception, and evaluation-release status
- no mark entry or candidate decode; no fabricated OCR

### Data Entry/Import Operator

- assigned template/version, staged upload, validation errors, reconciliation status, and maker submission
- cannot approve/commit their own restricted import or edit locked marks

### Auditor/Internal Quality/University Observer

- time-bound read-only provenance, assignment, approvals, correction history, freeze evidence, and content-minimized reports
- candidate identity/script content/marks only if explicitly purpose-authorized

### Student

- evaluation/result-processing status only when policy exposes it, such as “evaluation in progress” or “results pending”
- no raw marks, script, evaluator identity, variance, moderation, or correction detail before Prompt 16 publication

### Guardian

- no evaluation workbench, raw marks, scripts, evaluator details, variance, moderation, correction, or masking access
- only future published result notifications through the owning module

### Tenant Administrator/Leadership

- policy/configuration visibility and aggregate completion dashboards if authorized
- no implicit script, identity mapping, raw mark, correction, or evaluator-detail access

### Platform Operations

- service/job/storage/sync/event health, masked tenant/work references, error codes, and trace IDs
- no script, candidate, evaluator, question/key, mark/code/comment, variance, or distribution data

Mobile-wide requirements:

- secure OS keystore, app lock/fresh step-up, device registration/compliance/risk policy, and rooted/jailbroken-device fail-closed behavior for confidential access
- encrypted tenant/user/assignment-partitioned minimal metadata cache; no script/key/mark offline cache by default; purge on logout, assignment/role loss, submission, expiry, tenant switch, or remote revoke
- suppress sensitive app-switcher previews/backups/share/open-in and screenshots where OS supports it, documenting limitations
- push payloads contain no candidate, script, mark, code, variance, correction, or key data
- deep links use opaque references, reauthenticate, reauthorize, and fetch fresh server state
- explicit draft/queued/synced/rejected/submitted/locked/stale states; official submissions/approvals/freezes require server receipts
- camera/scanner frames are not retained by default; uploads use secure scanning/processing
- accessibility, dynamic type, localization, exact decimal input, low-connectivity recovery, safe idempotent retry, and tablet layouts
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role and intentional web-first/no-access state

## 24. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized tables such as:

- evaluation policy/version/mode/rule/status-code
- evaluation work snapshot/work item/source reference/reconciliation exception
- masking scheme/code/mapping/access request/decode audit
- evaluator profile reference/declaration/eligibility/assignment/allocation plan
- artifact access grant/session/audit reference
- mark entry/version/question value/exception code/submission receipt
- rubric score/panel member score/panel decision
- chief review/sample/calibration action
- valuation round/variance result/third valuation/adjudication
- moderation proposal/run/impact/item/approval/reversal
- import job/template/staged row/error/reconciliation/approval/commit
- correction request/item/evidence/review/decision/implementation
- anomaly signal/completeness snapshot/attestation
- mark freeze/version/item/hash/invalidation/supersession
- result evidence/projection/export/job checkpoint

Keep script images/content in the approved secure document/storage boundary, not mark tables. Every tenant-owned table carries tenant/institution/cycle/course/component and applicable masked-candidate/evaluator scope; foreign keys cannot cross tenants; repositories require explicit predicates; enable and force RLS where constitutionally required.

Add exact numeric/check constraints, mutually exclusive value/code constraints, maximum/question-total enforcement, immutable/unique/idempotency, evaluation-round/SoD/temporal, optimistic-lock, freeze/hash, and correction-lineage constraints plus appropriate indexes/retention fields.

Test evaluator, chief, panel, exam-cell, approver, masking, custody/digitization, importer, auditor, student/guardian denial, worker, reporting, migration, and operations database roles independently. No technical role receives general mark/identity/script RLS bypass.

## 25. Security, privacy, integrity, and resilience

Threat-model:

- candidate identity leakage through ordering, metadata, URLs, exports, accessibility labels, or errors
- mark tampering, out-of-range values, client-total manipulation, direct database edit, and locked-mark overwrite
- evaluator collusion, second-round score leakage, assignment conflict, and self-approval
- script/key leakage through cache, screenshots, signed URLs, logs, support, or mobile backups
- forged import, hidden spreadsheet content, duplicate batch, and reconciliation bypass
- moderation/correction/reopen abuse
- mapping-vault compromise and unauthorized decode
- stale/invalidated mark set used for results
- offline draft replay, device theft, or cross-assignment sync

Apply purpose/context authorization, response shaping, masking separation, MFA/step-up, SoD, exact server validation, immutable versions, encryption, short-lived access, secure rendering, rate limits, anomaly alerts, device risk controls, malware scanning, safe imports, audit, and content redaction. Never log scripts, answers, question keys, identities, marks, codes, comments, variance values, signed URLs, or mapping secrets.

Define retention/legal hold, backup/restore, mark/freeze rebuild, mapping recovery, evaluator reassignment, import replay, correction invalidation, storage/viewer outage, offline sync recovery, downstream result invalidation, RPO/RTO, SLIs/SLOs, alerts, and incident runbooks. Never infer or invent a mark when source data is missing.

## 26. Tests

Implement and run:

- exact decimal scale/rounding, min/max/boundary values, optional choices, required entries, totals, and value/code compatibility
- every configured exceptional code and invalid combination
- source reconciliation for missing/extra/duplicate/damaged/quarantined/absent scripts
- masking uniqueness/non-enumeration/order randomization, evaluator API/URL/log/export non-disclosure, authorized decode SoD, re-code, and mapping reconciliation
- evaluator eligibility/conflict/NDA/MFA/window/workload/assignment/revoke/reassign and setter/evaluator/round SoD
- deterministic allocation, hard conflicts, independent rounds, unallocated explanations, publication/amendment
- secure artifact/key access, expiry/revoke/no-store/no persistent cache and truthful missing digitization/OCR
- manual/question/rubric/panel entry, autosave/concurrency, submit/lock/receipt, reopen/supersede
- chief sample determinism/expansion/return and no direct mark edit
- double/third valuation matrix: threshold boundaries, zero handling, ties, closest-two/middle/average/committee, evaluator replacement, and blind isolation
- moderation preview/caps/floors/question cancellation/population scope/approval/reversal with raw-value preservation
- import MIME/malware/macro/external-link/hidden-row/formula/path attack, version/identity/bounds/totals/duplicates, atomicity/idempotency/reconciliation/SoD
- correction original/proposed/evidence/threshold/SoD/approval/implementation/reversal/concurrency and downstream invalidation
- anomaly signals as non-mutating review tasks
- completeness counts, attestation, freeze immutability/hash, reopen/supersede, and Prompt 16 stale-evidence rejection
- event payload minimization and out-of-order/idempotent consumers
- RLS negative tests across tenant, cycle, course, component, masked candidate, evaluator assignment, round, approver, importer, auditor, and technical roles
- web accessibility and Playwright journeys for all roles
- Android/iOS journeys, intentional student/guardian denial, compliant-device checks, no secret offline cache, remote purge, deep-link authorization, exact decimal input, step-up, and server receipts
- worker crash recovery, storage/viewer/scanner/notification outage, backup restore, freeze rebuild, mapping reconciliation, and documented target-volume/performance tests

Add synthetic canary-marker tests that fail if candidate identity, answer content, keys, or mark values enter logs, traces, metrics labels, events, notifications, crash reports, analytics, general search, or snapshots.

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim external examiner, OCR, device, penetration, load, or iOS evidence that was not actually executed.

## 27. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- evaluation/marks glossary, state diagrams, and provenance model
- exact mark/rubric/exception-code/total invariants with worked examples
- evaluator eligibility/allocation/anonymization/SoD design
- double/third valuation and variance/selection formal specification with edge-case tables
- moderation specification separating raw, selected, moderated, and final-for-result values
- staged import schema, reconciliation, security, and atomicity guide
- correction/reopen/freeze/supersession/downstream invalidation procedure
- Prompt 14 script handoff, Prompt 13 marking-scheme access, and Prompt 16 result-evidence contracts
- permission/scope/SoD matrix and mobile role-feature matrix
- threat model/privacy assessment
- runbooks for missing script, evaluator decline/absence, access revoke, identity leak, stuck valuation, high variance, import failure, incorrect marks, correction dispute, freeze reopen, mapping mismatch, downstream invalidation, restore, and disaster recovery
- role guides for evaluators, chief evaluators, panels, exam cell, Controller/approvers, masking/coding staff, custody/digitization staff, import operators, auditors, students, tenant administrators, and operations

The completion gate passes only when:

1. Evaluation work reconciles exactly to authoritative candidate/script/attempt sources before allocation.
2. Masking prevents evaluator identity exposure and decode access is separately controlled, step-up protected, and audited.
3. Eligible evaluators receive conflict-free, time-bound, deterministic assignments with independent blind rounds where configured.
4. Question/component/rubric marks and exceptional codes are server-validated with exact arithmetic, complete provenance, immutable submission, and receipts.
5. Chief review never silently edits marks and deterministic sampling/calibration workflows are auditable.
6. Double/third valuation, variance, selection, adjudication, and moderation reproduce exactly from pinned rules and preserve every raw value.
7. Staged imports cannot bypass validation, reconciliation, authorization, SoD, atomicity, or immutable provenance.
8. Locked/frozen marks change only through approved correction/reopen and create superseding versions with downstream invalidation.
9. Completion/freeze reconciles all expected scripts, rounds, reviews, moderation, imports, codes, and corrections into an immutable hashed mark set.
10. Prompt 16 receives minimal frozen versioned evidence and rejects stale/invalidated data; this module does not calculate or publish results.
11. Every relevant role has a meaningful React web and native Android/iOS workflow or an explicit secure no-access state; confidential mobile data remains live-authorized and offline-disabled by default.
12. Every tenant table has explicit predicates, forced RLS as required, constraints, and cross-tenant/cross-role negative tests.
13. OpenAPI/events/generated clients, migrations, canary leak/security/accessibility/observability checks, docs, ADRs, runbooks, and all environment-available tests pass.
14. No real scripts/answers, result engine, grades, SGPA/CGPA, pass/fail, publication, grade cards, attainment, or fabricated AI/OCR/provider output was implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, reconciliation/masking/evaluators/marks/rubrics/double-third valuation/moderation/import/correction/freeze, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency, canary leak tests and all exact commands/results/exit status, docs/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(evaluation): implement marks moderation and correction`

Stop. Do not begin Prompt 16 or implement result calculation, grades, SGPA/CGPA, approval, or publication.
```

---

## Review Checklist Before Prompt 16

- Expected scripts/attempts reconcile before evaluator allocation.
- Evaluators cannot see candidate identity or independent valuation scores when masking/blinding is active.
- Every mark/code has exact validation, provenance, immutable versions, and a server receipt.
- Double/third valuation and moderation retain raw values and reproduce from pinned rules.
- Imports, corrections, reopens, and freezes enforce SoD, impact analysis, and downstream invalidation.
- Frozen mark sets are complete, hashed, immutable, and exposed through minimal versioned evidence.
- Native mobile workflows are role-complete while confidential content is live-authorized and offline-denied by default.
- Every tenant table has RLS and negative isolation tests.
- Synthetic canaries verify no identity, answer, key, or mark leakage.
- No Prompt 16 result/grade/GPA/publication logic was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 16 until these conditions pass.
