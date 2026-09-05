# Claude Code Prompt 16

## Result Engine, SGPA/CGPA, Approval, and Publication

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–15 passed, were reviewed, and were committed  
**Scope:** Versioned regulation-driven result calculation, grades and credits, SGPA/CGPA, backlog/progression, validation, simulation, approval, controlled publication, withholding/release, correction, and role-specific interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially autonomous result processing, regulations, grading, pass rules, moderation, grace, credits, SGPA/CGPA, progression, backlog/improvement, withholding, approval committees, publication, corrections, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, and repository conventions.
3. Inspect Prompt 03 regulation/curriculum/course/credit/grading-rule contracts, Prompt 05 student/program status, Prompt 06 registration/degree-audit/equivalence contracts, Prompt 12 exam cycle/candidate/attempt contracts, Prompt 15 immutable frozen mark evidence, Prompt 11 finance-hold evidence, and Prompt 02 workflow/audit/document/outbox foundations.
4. Inspect OpenAPI/generated clients, PostgreSQL RLS, permissions/SoD, data dictionary, exact-decimal conventions, notification service, document-generation boundary, background jobs, observability, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, mutate frozen marks, implement grade-card/transcript/certificate document production beyond a clean Prompt 17 port, implement revaluation application/fee/script workflow beyond a future port, or fabricate missing regulation/mark evidence.

This is safety-critical institutional logic. Implement a bounded `academic-results` domain as a pure, versioned calculation core wrapped by controlled orchestration. It owns result-rule snapshots, deterministic calculations, validation, approval, publication state, correction/version history, and result evidence. It does not own raw marks, fees, attendance, registration, official document templates, or OBE attainment.

## 1. Result invariants

Enforce:

- every official result is tenant/institution/student/program/regulation/academic-period/exam-cycle/attempt scoped
- all marks, credits, grade points, percentages, and GPA calculations use exact decimal/rational arithmetic with explicit scale and rounding; never binary floating point
- calculation inputs are immutable versioned evidence; source data is never copied as mutable truth
- the same engine version, rule snapshot, and input snapshot always produce byte-equivalent canonical outputs and trace hashes
- preview/simulation cannot create, modify, approve, or publish official results
- raw/selected/moderated marks from Prompt 15 remain immutable and distinguishable from result-level grace, normalization, or grade outcomes
- a published result is immutable; corrections create a superseding version and preserve all prior publications
- pass/fail, grade, credits earned, SGPA, CGPA, standing, and progression are calculated only on the server
- withheld, malpractice, absent, incomplete, pending, and not-applicable are distinct typed outcomes
- no result becomes visible before authorized publication scope/time and current authorization checks
- every approval/publication/correction has SoD, reason, server timestamp, rule/input/output versions, and audit
- downstream documents consume only approved published non-invalidated versions

Write a formal calculation specification and canonical serialization rules before implementing the engine.

## 2. Versioned result-rule catalogue

Implement immutable effective-dated rules by tenant/institution/regulation/program/cohort/course/category/exam type/academic period:

- component maxima, minima, weights, aggregation, and mandatory component rules
- combined internal/external/lab/theory/project/viva pass conditions
- course pass marks/percentage and exceptional-code behavior
- marks rounding stage/mode/precision
- absolute grade bands, letter/symbol, grade point, description, and credit treatment
- relative grading eligibility, cohort definition, minimum population, exclusions, method, caps/floors, and fallback
- normalization/moderation reference and result-level moderation where regulation permits
- grace marks eligibility, priority, maximum per course/semester/program, distribution, non-compounding, and audit display policy
- credit registered/attempted/earned/GPA-credit inclusion rules
- SGPA/CGPA formula, denominator exclusions, repeated/improved-course treatment, transfer/equivalent-credit treatment, and rounding
- non-credit/mandatory/audit/exempt course completion
- absence, malpractice, withheld, cancelled, incomplete, transfer, exemption, and special codes
- backlog/failure, supplementary, repeat, improvement, grade replacement/retention, and attempt-history rules
- semester/year/program progression, promotion, detention, carry-forward, maximum backlog/credit deficit, and probation rules
- classification/division/distinction/honors/minor eligibility references
- result withholding/release policy

Rules must be typed declarative data, never executable scripts. Detect overlap, gaps, impossible ranges, discontinuities, circular dependencies, unbounded grace, inconsistent credit treatment, and ambiguous precedence before activation.

## 3. Rule precedence and snapshot compilation

Implement a deterministic rule compiler:

- resolve institution/regulation/program/cohort/period/course/component overrides with documented precedence
- pin every source configuration version
- reject missing or conflicting required rules
- produce an immutable normalized rule snapshot with canonical hash
- human-readable rule catalogue and machine-readable calculation form
- compare versions and impact-preview against selected authorized historical/synthetic inputs
- activate only through review/approval and effective dates

An activated rule change cannot retroactively alter an official result. Recalculation requires an explicit correction/reprocessing workflow using a new rule snapshot and preserved prior output.

## 4. Input evidence assembly

Assemble a complete immutable input snapshot from authoritative contracts:

- student/program/cohort/regulation/status from Prompt 05
- course registration, attempt category, credits, curriculum/equivalence/substitution, and degree-audit references from Prompt 03/06
- exam cycle/candidate/application/attempt and exceptional status from Prompt 12
- frozen non-invalidated mark-set evidence from Prompt 15
- approved result-level exception/withhold/release references
- finance/disciplinary/no-dues hold evidence only where regulation lawfully affects publication, not academic calculation
- prior official result/attempt history for backlog/improvement/repeat/CGPA
- transfer/equivalent credits and exemptions from approved sources

Persist evidence IDs, versions, hashes, effective times, freshness, missing/invalid status, and assembly timestamp. Reject unfrozen, stale, superseded, cross-regulation, cross-candidate, or inconsistent inputs.

Do not infer absent marks, credits, or rules. Missing evidence produces a blocking/pending exception according to policy.

## 5. Pure calculation pipeline

Implement the engine as side-effect-free functions with typed inputs/outputs and stages:

1. Validate candidate, registration, attempt, curriculum, rule, and mark evidence.
2. Resolve component values and exceptional codes.
3. Apply authorized component aggregation and result-level normalization/moderation.
4. Evaluate component/combined/course pass conditions.
5. Apply grace rules in explicit order with caps and trace.
6. Assign final course result, grade, grade point, and credits earned.
7. Resolve repeat/improvement/transfer/equivalent-credit history.
8. Calculate period registered/attempted/earned/GPA credits and SGPA.
9. Calculate cumulative credits and CGPA.
10. Determine backlog/failure, progression standing, and configured classification references.
11. Apply withholding/publication eligibility as a separate layer from academic outcome.
12. Produce warnings, blocking errors, full trace, and canonical output hash.

Every stage emits stable reason/rule codes, exact operands, intermediate unrounded values, rounding step, output, and source reference. Sensitive traces are permission-restricted.

## 6. Component aggregation and pass rules

Support:

- weighted and direct-sum components
- internal/external separate minima
- combined minimum plus component minima
- best-of or configured attempt/component selection with deterministic tie handling
- theory/practical/lab/project/viva combinations
- optional/internal-choice marks already resolved by Prompt 15
- cancelled-question/moderated mark evidence from Prompt 15
- absence/malpractice/withheld/incomplete/special status propagation
- component exemptions and substitutions
- maximum caps and valid decimal precision

Never convert a missing component to zero unless the pinned regulation explicitly defines that behavior. Preserve the difference between numeric zero and status absence.

## 7. Absolute grading

Implement:

- non-overlapping grade bands with inclusive/exclusive boundary semantics
- marks or percentage basis
- grade letter/code, point, description, pass/fail category, credit-earned behavior
- special non-numeric grades for satisfactory/unsatisfactory, audit, exempt, transfer, absent, malpractice, withheld, incomplete, and no-result states
- course/category-specific tables where approved
- exact rounding before/after band comparison only as explicitly configured

Validate complete domain coverage and boundary continuity. Add exhaustive boundary tests for every active table.

## 8. Relative grading

Implement only configured, academically approved relative-grading models through typed strategies, such as institution-defined mean/standard-deviation bands or percentile/rank-based bands:

- eligible course/population definition and immutable cohort snapshot
- exclude absent, malpractice, withheld, incomplete, or other configured statuses
- minimum population and fallback to approved absolute table
- exact mean/variance/standard-deviation or percentile calculation with documented precision
- caps/floors, minimum pass rule, maximum grade, and tie handling
- distribution proposal and anomaly warnings
- committee review/approval before official use where required
- deterministic output and complete population/rule trace

Do not choose a statistical model on behalf of the institution. Do not curve results merely to reach a target pass percentage unless an approved transparent rule explicitly requires it.

## 9. Grace marks and result-level moderation

Implement regulation-driven grace separately from Prompt 15 mark moderation:

- eligibility by course/component/status/attempt category
- shortfall calculation
- maximum per course and aggregate period/program cap
- course priority/distribution order and deterministic tie handling
- no use for malpractice/absence or prohibited cases
- no compounding across rule types unless explicitly authorized
- value before grace, grace awarded, rule/reason, value after grace, and unused allowance
- preview and approval requirement where configured

Result-level normalization/moderation uses explicit proposal, population, formula, cap/floor, before/after aggregate, warnings, approval, and trace. Preserve source marks and pre-adjustment academic outcome.

## 10. Course result and credit outcome

For every student/course/attempt produce:

- component values/statuses
- aggregate raw and adjusted/result-level value
- pass-rule outcomes by component and combined rule
- grace/moderation contributions
- final marks/percentage where applicable
- grade/code, grade point, registered/attempted/GPA/earned credits
- pass/fail/backlog/absent/malpractice/withheld/incomplete/exempt/transfer/satisfactory status
- attempt category and whether it replaces/contributes to cumulative history
- rule trace, input/output hashes, engine/rule versions, and warnings

Do not expose internal confidential evaluator identity or question-level details in student-facing results.

## 11. Repeat, backlog, supplementary, and improvement history

Implement deterministic attempt-history resolution:

- original/regular, supplementary/backlog, repeat, improvement, makeup, and special attempts
- attempt sequence and eligibility reference
- best/latest/first-pass/grade-retention/replacement policy
- failed-to-passed, passed-to-improved, improved-lower, absent, malpractice, withheld, and cancelled attempt behavior
- credits counted once
- SGPA recalculation policy for original period versus current attempt period
- CGPA replacement/retention and transcript-display flags
- backlog open/cleared history and effective cleared date
- no destructive removal of prior attempts

Keep academic history and presentation decisions separate. Prompt 17 decides official document layout from versioned result evidence.

## 12. SGPA and CGPA

Implement exact formulas defined by the pinned regulation:

- numerator as sum of eligible `credit × gradePoint`
- denominator as eligible GPA credits
- period/course inclusion and exclusion rules
- zero-denominator behavior
- registered, attempted, earned, and GPA credits displayed separately
- SGPA precision and rounding stage
- CGPA across eligible periods/courses with repeat/improvement/transfer rules
- cumulative credits required/earned and pending non-credit requirements
- historical recalculation only through explicit superseding result version

Store exact intermediate terms and final rounded values. Add property/invariant tests such as denominator consistency, credits counted once, monotonic earned credits absent reversal, and bounded grade points.

## 13. Progression and academic standing

Implement configured standing outcomes:

- promoted
- promoted_with_backlogs/carry-forward
- probation/warning
- detained/not_promoted
- term_repeat/year_repeat
- program_extension
- completed_academic_requirements
- pending/incomplete/withheld

Evaluate credit thresholds, mandatory-course completion, backlog count/credits, maximum attempts, semester/year progression, attendance/detention references where regulation requires, and approved exceptions.

Academic standing is a versioned decision derived from result outputs and rules. Separate automated recommendation from human/committee decision where due process is required. Support appeal/exception references without editing calculated course outcomes.

## 14. Classification and completion references

Calculate only approved academic classification references such as division/class, distinction, honors, minor/specialization completion, and program-completion eligibility when all required source data exists.

Use Prompt 06 degree-audit evidence rather than reimplementing curriculum requirements. Record eligibility/pending/reason/version, but leave final degree award, transcript, and certificate issuance to later modules.

## 15. Validation and anomaly checks

Before approval, detect:

- missing/invalid/stale/superseded marks or rules
- duplicate candidate/course/attempt/component evidence
- inconsistent credits/curriculum/regulation
- impossible marks or statuses
- unhandled grade band or zero denominator
- result delta versus prior preview/version
- unusual pass percentage, grade distribution, all-pass/all-fail, excessive grace, or concentration at boundaries
- relative-grading population/fallback issue
- unresolved withholding/malpractice/correction
- candidate/result count mismatch with frozen population
- calculation nondeterminism or hash mismatch

Anomaly signals require review; they do not automatically change results or accuse misconduct. Store stable codes, scope, severity, explanation, and resolution.

## 16. Simulation and impact analysis

Provide isolated simulation for:

- proposed rule/version changes
- corrected mark evidence
- moderation/grace alternatives explicitly configured
- different publication scopes

Simulations use authorized immutable snapshots, produce labeled non-official outputs, never write official result records, never trigger downstream events/documents, and are excluded from student APIs. Show aggregate and per-case deltas only to authorized roles. Persist simulation metadata/expiry, not unnecessary duplicate sensitive data.

## 17. Batch orchestration and reproducibility

Implement asynchronous result runs by cycle/program/cohort/course/period:

- draft run, input assembly, validation, calculation, anomaly review, reconciliation, approval-ready, approved, publication-ready, published, superseded, failed, and cancelled states
- deterministic partitioning and ordering
- checkpoints, progress, cancellation before approval, safe retry, idempotency, and crash recovery
- same-snapshot rerun comparison and hash verification
- candidate/item errors without partial silent publication
- counts/totals reconciled to frozen candidate and mark sets
- engine artifact/version identity

Use independently scalable workers only if justified by measured load and an ADR. PostgreSQL remains source of truth; caches/projections are rebuildable.

## 18. Approval workflow

Support configurable review/approval by examination cell, chief tabulator, Controller of Examinations, Dean, Principal, Result Committee, Academic Council, or equivalents:

- maker/reviewer/approver assignments and quorum
- rule/input/hash/count/reconciliation/anomaly/delta summary
- course/program-level recommendations and comments
- return for correction, recalculate, recommend, approve, reject, and supersede
- conflict-of-interest declarations and SoD
- step-up authentication for final approval
- committee meeting/reference/minutes attachment through Prompt 02
- immutable approved result batch/version and approval receipt

No approver can edit marks or calculated outputs. Any source correction invalidates approval and requires a new run/version.

## 19. Withholding and later release

Implement withholding as a publication-control layer, not destruction of academic calculation:

- reasons such as malpractice pending, identity/document issue, court/regulatory order, finance/no-dues hold where lawful, unresolved correction, or administrative review
- candidate/course/full-result scope
- source decision/evidence, effective date, expiry/review date, authorized role, and privacy classification
- withheld, partially_withheld, released, expired, reversed, and superseded states
- student-facing generic reason category/action where permitted
- later release after authoritative resolution, approval, and publication version

Finance debt alone must not alter marks or grades. Release events are idempotent and preserve original publication timeline.

## 20. Controlled publication

Implement publication by approved scope:

- full cycle, program/cohort, course/component, candidate category, or authorized staged release
- scheduled release using server time
- publication readiness: approved batch, current inputs, resolved blocking anomalies, withholding decisions, authorization, and notification template
- publish, pause before start, partial failure recovery, revoke/withdraw through exceptional workflow, and supersede
- immutable publication manifest with result versions, scope, time, approvers, template/API version, and hash
- student-facing current official result plus version/superseded status
- privacy-safe aggregate gazette boundary; Prompt 17 owns official document rendering
- notification only after authoritative publication

Never expose results through predictable URLs, cached unauthenticated responses, search engines, push payload details, or pre-publication APIs.

## 21. Result correction and supersession

Implement formal correction for:

- superseding frozen mark evidence from Prompt 15
- rule/configuration error
- registration/curriculum/credit/equivalence error
- identity/candidate mapping error
- committee/court/regulatory direction
- publication/withholding error

Require original result version, proposed source/rule change, reason, evidence, impact preview, affected candidates/courses/GPA/standing/documents, reviewer/approver chain, SoD, and step-up authentication.

Correction runs produce new input/rule snapshots, full recalculation, comparison, approval, superseding publication, downstream Prompt 17 invalidation, and targeted notification. Never patch grade/GPA fields directly.

## 22. Appeals and revaluation boundary

Define contracts for future revaluation/recount/challenge workflows:

- student/result/course/attempt reference
- window and eligibility
- Prompt 11 fee request/payment evidence
- Prompt 14 script reference/custody
- Prompt 15 re-evaluation/corrected mark-set outcome
- status and downstream invalidation

Do not implement script re-evaluation, photocopy delivery, or fee collection here. Result correction begins only after authoritative superseding evidence.

## 23. Student and authorized stakeholder result views

Student-facing view includes only published permitted data:

- exam/academic period, courses, credits, marks display according to policy, grade, grade point, result status
- registered/attempted/earned/GPA credits, SGPA, CGPA, standing, backlog summary, and non-credit completion
- grace/moderation disclosure only as required by policy
- withheld/pending/superseded indicator and permitted next action
- publication/version/as-of timestamp and calculation explanation at an appropriate level
- Prompt 17 document links when available

Guardian access requires an active permitted relationship and policy. Faculty/mentor/HOD access is purpose- and cohort-scoped. No role receives pre-publication data merely because it has broad administrative status.

## 24. Reports, analytics, and exports

Provide authorized reports for:

- result-run readiness/progress/errors/reconciliation
- course/program/cohort pass/fail/grade distribution
- credits earned, SGPA/CGPA distribution, backlogs, progression, and completion
- grace/moderation/relative-grading impact
- withheld/released/pending cases
- anomaly/delta review
- approval/publication status and version history
- correction/supersession/downstream invalidation

Use aggregate/de-identified data where individual identity is unnecessary. Reports state rule/input/engine/publication version and as-of time. Governed exports require scoped purpose, approval, minimization, watermark/classification, encryption, formula-injection protection, short expiry, and audit.

## 25. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- result-rule draft/validate/compile/simulate/review/activate/compare
- input evidence assemble/validate/status/reconcile
- result run/create/status/cancel/retry/compare/rebuild
- candidate/course/component trace with permission-shaped detail
- absolute/relative grading proposal and population trace
- grace/moderation preview/review/approve/apply
- anomaly/list/review/resolve
- standing/classification/degree-audit reference
- approval queue/recommend/return/approve/reject/quorum
- withholding create/review/release/reverse
- publication readiness/schedule/publish/status/revoke/supersede
- student/guardian/faculty/mentor/HOD authorized result views
- correction request/impact/recalculate/review/approve/republish
- revaluation boundary/status reference
- Prompt 17 result-evidence/version/invalidation
- dashboards/reports/governed exports and operational queues

Use explicit role-shaped DTOs, bounded pagination, allowlisted filters/sorts, RFC 7807, optimistic versions, idempotency keys, correlation IDs, server time, cache-control rules, rate limits, authorization, audit, and generated clients.

Define least-privilege permissions for rule maker/checker/activation, simulation, input assembly, calculate, trace, relative-grade/grace/moderation review, anomaly resolution, committee review, final approval, withholding/release, publication, correction/republish, student/guardian/faculty views, report/export, audit, and platform health.

Enforce SoD among mark correction, rule activation, result calculation, anomaly resolution, committee/final approval, publication, withholding release, and result correction. Platform operations see job/event/cache/database health, aggregate counts, error codes, and trace IDs only—not candidate results, marks, grades, GPA, standing, or sensitive reasons.

Use transactional outbox/inbox. Events contain stable references and minimal state, never marks, grades, GPA, pass/fail, candidate lists, or sensitive reasons. Publish idempotent result batch approved/published/superseded/invalidated, candidate result published/withheld/released by opaque reference, standing changed, and downstream-document invalidation events.

## 26. React web interfaces

Implement accessible responsive interfaces for:

- result-rule catalogue/editor/validation/compiler/version comparison
- golden-case runner and simulation impact dashboard
- input evidence/readiness/reconciliation queue
- batch run progress/errors/rerun comparison and deterministic hash status
- authorized candidate calculation trace
- absolute/relative grade proposal, distribution, fallback, and approval
- grace/moderation impact and approval
- anomaly/delta review and resolution
- course/program/cohort result tables with privacy controls
- progression/standing/completion review
- approval committee workbench with quorum/SoD/minutes
- withholding/release workflow
- publication readiness/scheduling/status/recovery
- correction impact/recalculation/reapproval/republish
- reports/governed exports/version/audit/downstream invalidation

Meet WCAG 2.2 AA intent: keyboard operation, screen-reader semantics, visible focus, high zoom, non-color-only statuses/charts, accessible data-table alternatives, localized exact numbers, and clear distinction among preview, approved, published, withheld, superseded, and corrected data.

## 27. React Native Android/iOS interfaces for every role

Build genuine native role interfaces backed by real APIs, not WebViews or placeholder menus.

### Student

- published semester/exam result with course, permitted marks, grades, credits, SGPA/CGPA, standing, backlog, and version/as-of status
- withheld/pending/superseded/corrected explanations and permitted next action
- result notification/deep link and Prompt 17 document link when available
- correction/revaluation request-status boundary without performing evaluation
- encrypted limited offline cache of published results with clear version/staleness and remote invalidation/purge

### Guardian

- only policy-permitted linked learner published summary, standing/backlog alerts, and document links
- no pre-publication results, detailed traces, withheld-sensitive reason, or unrelated periods

### Faculty/Mentor/Advisor

- authorized advisee/cohort published result and backlog/progression follow-up
- course aggregate after publication and minimum-population privacy threshold
- no pre-publication individual result unless assigned a formal review role

### HOD/Program Coordinator

- program/course readiness, anomalies, distributions, backlogs, progression, withholding, and publication status
- assigned review/comments/recommendation and step-up approval where configured
- rule construction and high-volume analysis remain web-first

### Examination Cell/Result Processing Staff

- input/readiness/run/error/reconciliation/anomaly/withholding/publication/correction work queues
- mobile monitoring and urgent governed actions; batch runs, large tables, simulation, and export remain web-first
- no direct field editing of calculated results

### Controller of Examinations/Dean/Principal/Result Committee/Academic Council

- rule/input/hash/count/delta/anomaly/distribution/grace/moderation/standing/withholding summaries
- conflict declaration, quorum, comments, step-up recommend/approve/reject/publish/release with authoritative server receipt
- no client-side calculation or direct mark/result mutation

### Finance/No-Dues/Disciplinary Staff

- own-source hold/reference status and release action within source-module authority
- no marks, grade calculation trace, or result editing

### OBE/Quality/Accreditation Staff

- authorized published/frozen result evidence and aggregate outcome references for future Prompt 19
- no attainment calculation in this prompt and no pre-publication access unless separately assigned

### Auditor/Internal Quality/University Observer

- time-bound read-only rule versions, hashes, source evidence, approvals, publication manifests, corrections, and content-minimized reports
- no operational mutation

### Tenant Administrator/Leadership

- policy/configuration visibility and authorized aggregate published dashboards
- no implicit pre-publication candidate access, approval, withholding release, or correction authority

### Platform Operations

- result-job/event/database/cache/notification health, masked tenant/run IDs, error codes, and trace IDs
- no marks, grades, GPA, candidate identity, standing, distributions below privacy threshold, or reason details

Mobile-wide requirements:

- secure OS keystore, app lock/step-up for sensitive approvals, device risk policy, and tenant/role context enforcement
- encrypted tenant/user-partitioned allowlisted cache only for published permitted data; purge on logout, relationship/role/membership loss, tenant switch, remote revocation, result invalidation, or retention expiry
- push payloads contain no marks, grades, GPA, pass/fail, backlog count, or sensitive withholding reason
- deep links reauthenticate, reauthorize, fetch current publication/version, and refuse stale invalidated data
- explicit calculating/pending/approved/published/withheld/superseded/corrected/stale states
- approvals, publication, release, correction, and acknowledgements are official only after server receipt
- accessibility, dynamic type, localization, exact decimal/currency-independent number formatting, low-connectivity recovery, and safe retry
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role and intentional web-first/no-access state

## 28. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized tables such as:

- result rule set/version/scope/component rule/pass rule/grade table/band
- relative-grade strategy/grace rule/progression rule/classification rule
- compiled rule snapshot/source/hash
- result input snapshot/evidence item/validation issue
- result run/partition/job/checkpoint/reconciliation
- course result/version/component outcome/rule trace/grace item
- attempt-history selection/credit outcome/period GPA/cumulative GPA
- academic standing/classification/completion reference
- relative-grade population/statistic/proposal
- result anomaly/review/resolution
- approval workflow/reviewer/quorum/decision/minutes reference
- withholding/hold evidence/release
- publication/version/manifest/scope/item/status
- correction request/impact/run/approval/supersession/invalidation
- student result projection/report/export checkpoint

Use repository-consistent names. Every tenant-owned table carries tenant/institution/program/regulation/period/cycle and applicable student/course/attempt scope; foreign keys cannot cross tenants; repositories require explicit predicates; enable and force RLS where constitutionally required.

Use exact numeric types, canonical hashes, unique/idempotency, immutable-version, non-overlapping-grade-band, rule-precedence, credit-once, state/temporal, optimistic-lock, approval/quorum/SoD, publication, and supersession constraints with appropriate indexes and retention fields.

Test student, guardian, faculty/mentor, HOD, result staff, committee/approver, source-hold staff, OBE/quality, auditor, worker, reporting, migration, and operations database roles independently. Technical roles never receive general result RLS bypass.

## 29. Security, privacy, audit, and resilience

Threat-model:

- client or insider manipulation of marks, rules, grade bands, grace, GPA, standing, or publication
- stale/cross-student/cross-regulation evidence
- simulation output mistaken for official result
- pre-publication leakage through APIs, caches, search, notifications, logs, exports, analytics, or mobile
- approval/quorum/SoD bypass
- targeted withholding/release abuse
- correction without full recalculation
- relative-grading population manipulation
- predictable public result lookup and bulk enumeration
- stale grade card/transcript after supersession

Apply purpose/context authorization, RLS plus predicates, field-level shaping, step-up authentication, SoD/quorum, immutable versions, canonical hashes, exact arithmetic, rate limits, encryption, cache segregation/invalidation, minimal notifications, audit, and anomaly alerts. Never log candidate marks/grades/GPA, full result traces, sensitive withholding reasons, or export content.

Define retention/legal hold, backup/restore, deterministic replay, rule rollback by new version, evidence refresh, failed batch recovery, publication partial-failure reconciliation, cache/projection rebuild, downstream-document invalidation, RPO/RTO, SLIs/SLOs, alerts, and incident runbooks. Fail closed on missing/stale evidence or hash mismatch; never guess results.

## 30. Test strategy and golden masters

Build a regulation-owned golden-master suite using synthetic cases reviewed against written expected outcomes. Cover:

- component/combined pass boundaries
- exact rounding at every configured stage
- absolute grade-band edges
- relative grading population, exclusions, minimum-size fallback, ties, caps, and zero variance
- absent, malpractice, withheld, incomplete, exempt, transfer, cancelled, and special statuses
- grace eligibility, allocation priority, per-course/aggregate caps, ties, prohibitions, and non-compounding
- moderation/normalization caps and raw-value preservation
- credits registered/attempted/earned/GPA inclusion
- SGPA/CGPA zero denominator, repeats, improvements, transfer credits, exclusions, and precision
- regular/backlog/supplementary/improvement/makeup attempt history
- non-credit/mandatory courses
- promotion, carry-forward, probation, detention, completion, and approved exceptions
- withholding/release separate from academic outcome
- correction/supersession and historical reproducibility

Also implement:

- property-based tests for grade-point bounds, balanced GPA numerator terms, credits counted once, deterministic canonical hashes, and invariant preservation
- metamorphic tests proving input order/worker partition/retry does not change outputs
- rule conflict/gap/overlap/cycle rejection
- invalid/missing/stale/cross-tenant source evidence rejection
- simulation isolation from official records/events
- batch idempotency/concurrency/crash recovery/reconciliation
- approval/quorum/SoD/source-change invalidation
- publication scope/schedule/server-time/cache/privacy/partial-failure recovery
- correction full-impact/downstream invalidation
- RLS negative tests across tenant, institution, program, regulation, period, cycle, candidate, course, role, and technical workers
- web accessibility and Playwright journeys for every role
- Android/iOS journeys, result-cache invalidation/purge, pre-publication denial, deep-link reauthorization, step-up approval, low-connectivity/stale state, and server receipts
- representative cohort performance tests with documented target and exact evidence

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim regulation sign-off, device, penetration, load, or iOS evidence not actually executed.

## 31. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- formal result-calculation specification, canonical serialization/hash, precision, rounding, and stage ordering
- complete rule catalogue/precedence/compiler schema
- golden-master case catalogue with expected hand calculations
- absolute/relative grading, grace, moderation, credits, SGPA/CGPA, attempt history, progression, and classification specifications
- input evidence/freshness/invalidation and Prompt 15/17 integration contracts
- simulation/batch/reconciliation/approval/quorum/publication/correction state diagrams
- permissions/scope/SoD matrix and mobile role-feature matrix
- threat model/privacy assessment
- runbooks for missing marks, rule conflict, hash mismatch, failed calculation, unusual distribution, grace anomaly, committee return, stuck approval, partial publication, withholding release, result correction, stale document, cache rebuild, rollback by superseding version, restore, and disaster recovery
- role guides for students, guardians, faculty/mentors, HOD/program, result staff, Controllers/committees, source-hold staff, OBE/quality, auditors, tenant administrators, and operations

The completion gate passes only when:

1. Rule versions compile deterministically, reject ambiguity, and remain immutable after activation.
2. Input snapshots accept only authoritative frozen/current evidence and preserve every ID/version/hash/freshness decision.
3. The pure engine reproduces every course outcome, grade, credit, SGPA, CGPA, backlog, progression, and classification reference with exact arithmetic and complete traces.
4. Absolute and relative grading, grace, moderation, exceptional codes, transfer/exemption, and repeat/improvement rules pass reviewed golden-master boundary cases.
5. Preview/simulation cannot mutate official data, events, approvals, publications, or student views.
6. Batch runs are idempotent, crash-recoverable, partition/order independent, reconciled, and hash reproducible.
7. Anomalies are explainable review signals and never silently alter results.
8. Final approval enforces quorum/SoD/step-up and becomes invalid if source evidence changes.
9. Publication is scope/time/authorization controlled, privacy-safe, immutable, recoverable, and clearly separates withheld data.
10. Corrections perform complete versioned recalculation, reapproval, superseding publication, and downstream document invalidation—never field patching.
11. Prompt 17 receives minimal approved published result evidence and this prompt does not generate final grade cards/transcripts/certificates.
12. Every relevant role has a meaningful React web and native Android/iOS interface or an explicit secure no-access state.
13. Mobile shows only current authorized published data, purges invalidated caches, and requires server receipts for official actions.
14. Every tenant table has explicit predicates, forced RLS as required, constraints, and cross-tenant/cross-role negative tests.
15. OpenAPI/events/generated clients, migrations, golden/property/metamorphic/security/accessibility/observability checks, docs, ADRs, runbooks, and all environment-available tests pass.
16. No marks mutation, official-document generation, revaluation execution, OBE attainment, or fabricated evidence/rules were implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, rule compiler/input snapshots/calculation/grading/grace/credits/GPA/attempt history/progression/approval/publication/correction, web, Android, iOS, security/privacy/tenancy/RLS/SoD/quorum/audit/idempotency, golden/property/metamorphic tests and all exact commands/results/exit status, docs/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(results): implement deterministic result engine and publication`

Stop. Do not begin Prompt 17 or implement grade cards, transcripts, certificates, or verification documents.
```

---

## Review Checklist Before Prompt 17

- Calculation rules are typed, compiled, immutable, conflict-free, and version-pinned.
- Input snapshots use only authoritative frozen evidence with freshness and invalidation checks.
- Exact deterministic traces cover marks, pass rules, grades, credits, SGPA/CGPA, attempts, standing, and classification.
- Golden-master, property, and metamorphic tests cover boundaries and reproducibility.
- Simulation is isolated from official records and publication.
- Approvals enforce quorum, SoD, step-up, and source-change invalidation.
- Published results are privacy-safe, immutable, correctly withheld/released, and superseded only through full correction.
- Every relevant role has an appropriate web/native-mobile view or intentional denial.
- Every tenant table has RLS and negative isolation tests.
- Prompt 17 receives versioned result evidence; no official documents were generated early.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 17 until these conditions pass.
