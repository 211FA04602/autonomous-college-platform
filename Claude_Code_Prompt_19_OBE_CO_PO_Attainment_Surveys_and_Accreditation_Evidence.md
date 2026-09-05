# Claude Code Prompt 19

## OBE, CO/PO Attainment, Surveys, and Accreditation Evidence

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–18 passed, were reviewed, and were committed  
**Scope:** OBE outcome governance, direct and indirect attainment, CO-to-PO/PSO rollup, surveys, gap analysis and corrective actions, course-file evidence, NBA/NAAC/IQAC evidence governance, readiness dashboards, and role-specific interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially outcome-based education, CO/PO/PSO/PEO, Bloom mapping, direct/indirect attainment, surveys, continuous improvement, course files, NBA, NAAC, IQAC, evidence, audit, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, and repository conventions.
3. Inspect Prompt 03 regulation/curriculum/outcome/Board-of-Studies contracts, Prompt 09 LMS/course-file/assignment evidence, Prompt 10 question/rubric-to-CO/Bloom mappings, Prompt 15 frozen mark evidence, Prompt 16 published result evidence, Prompt 18 degree-readiness references, Prompt 05 student/cohort data, and Prompt 02 workflow/document/audit/outbox foundations.
4. Inspect OpenAPI/generated clients, PostgreSQL RLS, permissions/SoD, data dictionary, document storage/indexing, survey/notification boundaries, jobs/observability, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, modify source marks/results/curriculum, hard-code one institution's attainment formula, silently exclude learners or assessments, claim NBA/NAAC accreditation, or fabricate survey responses/evidence/provider results.

Implement bounded domains/modules for `obe-attainment` and `accreditation-evidence` with explicit APIs between them. OBE owns approved mappings, formula configurations, population/source snapshots, deterministic attainment, gaps, and corrective actions. Accreditation evidence owns framework catalogues, evidence requests/items, reviews, observations, readiness, and governed packages. Neither owns source curriculum, assessments, marks, results, institutional accreditation decisions, or external regulator portals.

## 1. OBE invariants

Enforce:

- every calculation is tenant/institution/program/regulation/cohort/academic-period/course scoped
- PEO/PO/PSO/CO definitions and mappings are effective-dated, versioned, reviewed, approved, and immutable after activation
- every attainment result pins configuration, engine, mapping, source evidence, population, exclusions, thresholds, and target versions
- the exact included and excluded population is visible to authorized reviewers with stable reasons
- exclusions never occur because data is inconvenient, low-performing, or missing unless an approved rule explicitly requires that treatment
- all numeric work uses exact decimal arithmetic and explicit rounding stages
- simulation is labeled non-official and cannot change official attainment/evidence/actions
- approved results are immutable; corrected source data creates a superseding calculation version
- direct and indirect attainment remain separate until an approved combination rule is applied
- evidence items retain origin, ownership, version, checksum, validity period, approval, and access classification
- no mobile action is official until an authoritative server receipt

Write a formal glossary covering PEO, PO, PSO, CO, Bloom level, direct/indirect attainment, target, threshold, level, gap, action, criterion, metric, evidence, observation, and readiness.

## 2. Outcome lifecycle and governance

Implement lifecycle for:

- program educational objectives (PEOs)
- program outcomes (POs)
- program-specific outcomes (PSOs)
- course outcomes (COs)

Support:

- code, statement, rationale, regulation/curriculum/program/course, effective dates, source/approval authority, and status
- draft, review, approved, active, retired, and superseded states
- version comparison and downstream impact preview
- stakeholder validation/reference and Board-of-Studies/Academic-Council approval references from Prompt 03
- outcome statement quality checklist: observable wording, uniqueness, scope, assessability, and curriculum alignment
- change workflow preserving prior cohorts/calculations
- translation/display variants with source alignment

Do not create competing curriculum outcome masters. Extend/reference Prompt 03 contracts and migrate only through approved module APIs.

## 3. Outcome mapping matrices

Implement versioned mappings:

- CO to PO
- CO to PSO
- PEO to PO/PSO or other institution-approved strategic mapping
- course to PO/PSO contribution reference where used
- question/sub-question to CO and Bloom level from Prompt 10
- rubric criterion to CO from Prompt 09/10
- assessment/component to CO contribution

Mappings include strength/level, rationale, evidence/reference, effective scope, reviewer, approver, and source version. Support configured scales such as 0–3 or 0–5 without hard-coding.

Validate missing/orphaned outcomes, invalid cross-course/program links, excessive/all-equal mappings, unsupported strength, totals where applicable, circular relationships, retired sources, and insufficient rationale. Provide matrix heatmap plus accessible table/editor.

Approved mapping versions are immutable; later changes apply only to explicit future/recalculated scopes.

## 4. Attainment configuration

Implement immutable typed configuration for:

- direct/indirect source categories
- assessment and component weights
- target/threshold definition: mark threshold, percentage of maximum, grade, rubric level, pass status, or approved declarative criterion
- attainment-level bands and boundary inclusivity
- population eligibility and exclusion rules
- absent, malpractice, withheld, incomplete, exempt, transfer, late-admission, dropped-course, and missing-evidence treatment
- minimum population/source coverage and insufficient-data behavior
- question-to-CO contribution and multi-CO allocation
- assessment-to-CO aggregation
- internal/external/theory/lab/project balance
- course-level direct attainment
- indirect survey scoring and scale normalization
- direct/indirect combination weights
- CO-to-PO/PSO rollup formula and mapping-strength treatment
- target comparison, gap tolerance, rounding stage/mode/scale
- multi-section/faculty/cohort/program aggregation

Use a validated declarative rule schema, never arbitrary code or formula strings evaluated at runtime. Detect overlaps, gaps, invalid weights, zero denominators, circular dependencies, and ambiguous precedence before activation.

## 5. Source evidence contracts and snapshots

Consume immutable authorized evidence:

- question/rubric/CO/Bloom mapping versions from Prompt 10/09
- assessment/coursework component definitions and weights from approved sources
- frozen marks/question-level or rubric-criterion evidence from Prompt 15
- approved published result/course-credit evidence from Prompt 16 where configured
- roster/course-offering/cohort/student-status from Prompt 05/06
- course plan/delivery/course-file references from Prompt 09
- survey response aggregates from this prompt's survey module

Store source ID/version/hash/freeze/publication/freshness, extraction time, inclusion status, and validation result. Reject stale, superseded, cross-course, cross-regulation, cross-cohort, or inconsistent evidence.

Never duplicate mutable marks or results. If required question-level evidence is unavailable, report `INSUFFICIENT_DATA`; do not estimate silently.

## 6. Population construction and exclusion transparency

Build an immutable population snapshot for every run:

- eligible registered learner/attempt population
- included source observations
- excluded learner/assessment/item with reason code, rule version, and effect
- missing/unavailable evidence
- denominator/numerator membership
- section/faculty/cohort grouping
- duplicate/retake/improvement treatment

Provide authorized drill-down from aggregate to population and source reference while protecting student privacy. Every dashboard/export states population size, exclusions, missing data, source watermark, and as-of time.

Require explicit review when exclusion or missing-data rate crosses configured thresholds.

## 7. Direct CO attainment

Implement a pure deterministic pipeline:

1. Resolve approved question/rubric-to-CO mappings.
2. Resolve eligible assessment evidence and population.
3. Calculate per-learner/per-CO evidence according to threshold rule.
4. Aggregate learners meeting target versus eligible denominator or another approved typed strategy.
5. Combine question/assessment/component evidence using pinned weights.
6. Assign attainment level from configured bands.
7. Compare actual attainment to target.
8. Produce gap, warnings, and complete trace.

Persist exact operands, intermediate unrounded values, rounding steps, numerator/denominator, weights, level, target, gap, source/mapping/config/engine versions, canonical input/output hashes, and exclusions.

Support theory, practical, laboratory, project, viva, assignment, internal, external, and other approved direct sources without assuming all institutions use the same combination.

## 8. Indirect attainment and surveys

Implement a governed survey module for:

- course-end survey
- graduate-exit survey
- alumni survey
- employer survey
- internship/industry supervisor survey
- faculty/program review survey
- stakeholder survey configured by institution

Support:

- survey purpose, audience, outcome mappings, question/scale, language, anonymity/confidentiality policy, open/close window, invitation rules, reminders, and minimum response threshold
- single choice, Likert/rating, multiple choice, ranking, and optional text comments
- draft, review, approved, scheduled, open, closed, analyzed, archived, and superseded lifecycle
- anonymous, confidential, or identified modes represented truthfully
- non-reversible anonymous response design; do not retain hidden direct identity links
- response token/invitation deduplication, consent/notice, withdrawal where applicable, and anti-abuse controls
- aggregate scoring, scale normalization, response count/rate, missing response treatment, and minimum-population suppression
- qualitative comment access/moderation/redaction separated from numeric attainment

Survey participation is not attendance. Never fabricate responses or treat nonresponse as a score unless an approved transparent rule says so.

## 9. Survey privacy and distribution

Implement audience resolution for current students, graduates, alumni, employers, internship supervisors, faculty, and other verified stakeholders.

Use minimal invitations, opaque tokens, authenticated links where required, expiry, one-response policy, and delivery tracking. Do not expose respondent lists to unauthorized faculty. For anonymous surveys, separate invitation completion from response storage so responses cannot be re-linked through ordinary application access.

Provide privacy thresholds for aggregate results and prevent small-group, filtered, free-text, timing, export, and cross-tab re-identification. Text comments require moderation and purpose-based access.

## 10. Indirect calculation

Implement exact, versioned calculation for:

- question response to normalized score
- outcome-mapped question weights
- valid response population and excluded responses
- survey/source-level attainment
- multi-survey source combination
- indirect CO/PO/PSO attainment according to configured model
- minimum-response behavior and insufficient-data outcome

Preserve scale, direction, weights, response counts, distribution, aggregate values, thresholds, level, target, gap, and rule/source versions. Do not expose individual anonymous responses in calculation traces.

## 11. Direct and indirect combination

Combine only under approved rules:

- configured direct/indirect weights that validate to the required total
- minimum direct/indirect source coverage
- insufficient-source fallback explicitly defined and reported
- exact rounding after combination at the configured stage
- raw direct, raw indirect, combined value, level, target, and gap retained separately
- no silent weight redistribution when a source is missing

Any fallback or insufficient-data decision appears prominently in approval and evidence outputs.

## 12. CO-to-PO/PSO rollup

Implement deterministic rollup by course, cohort, program, and academic period:

- approved CO-to-PO/PSO mapping strengths
- course contribution and credit/weight treatment where configured
- included/excluded courses/COs with reasons
- mapping-weighted average, threshold-count, minimum, or other approved typed strategy
- multi-section/faculty aggregation
- direct/indirect or combined CO input selection
- program target, attainment level, and gap
- minimum coverage/insufficient-data behavior

Retain every CO contribution, mapping strength, weight, denominator, intermediate, rule version, and trace. Never treat unmapped COs as zero without explicit policy.

## 13. PEO assessment boundary

Support longer-horizon PEO evidence using approved alumni/employer/graduate/stakeholder survey aggregates and other future provider references.

Keep PEO methodology separately configured with cohort/year window, minimum responses, lag period, evidence type, mapping, weight, and target. Do not infer career outcomes from unavailable placement/alumni data. Prompt 22/23 or later modules supply verified career evidence through contracts.

## 14. Calculation runs and reproducibility

Implement asynchronous runs:

- draft, source_assembling, validation_failed, calculating, insufficient_data, review, approved, published_internal, superseded, invalidated, failed, and cancelled
- scope by course/section/cohort/program/year and calculation type
- deterministic partitioning/order, checkpoints, cancellation, retry, and crash recovery
- input/config/mapping/engine hashes and semantic output hash
- preview/simulation isolated from official results
- compare prior/new versions and source/config deltas
- event-driven invalidation when mappings, marks, results, roster, or survey aggregates change
- authorized full rebuild that converges with incremental processing

Approved attainment versions are immutable. Source invalidation marks dependent calculations stale and blocks evidence publication until reviewed/recalculated.

## 15. Review, approval, and publication

Support faculty/course coordinator, OBE coordinator, HOD/program coordinator, IQAC/quality cell, Dean, Principal, Board/committee, or configured equivalents:

- calculation/population/exclusion/source/weight/target/gap summary
- drill-down with privacy and source authorization
- validation/anomaly/insufficient-data findings
- comments, return, recommend, approve, reject, and supersede
- reviewer conflict/SoD and committee quorum where configured
- step-up authentication for final approval
- internal publication to permitted dashboards and evidence packages

Approvers cannot directly edit calculated values. Configuration/source correction requires a new run.

## 16. Gap identification

Create gap records when:

- CO/PO/PSO/PEO target is not met
- data/source/population coverage is insufficient
- mappings or assessment coverage are incomplete
- survey response threshold is missed
- a negative trend or repeated miss crosses configured rule

Record exact attainment/target/delta, source calculation version, category, severity, affected scope, trend, root-cause-analysis status, owner, review body, and due date. A gap is evidence, not an automatic faculty-performance verdict.

## 17. Corrective and preventive actions

Implement CAPA/continuous-improvement workflow:

- gap linkage and root-cause analysis using structured categories plus narrative
- proposed action, expected outcome, owner, collaborators, resources/budget reference, target cohort/period, milestone, due date, and success measure
- draft, review, approved, in_progress, blocked, completed, effectiveness_review, effective, ineffective, reopened, and closed states
- evidence attachments through Prompt 02 and Prompt 09 course-file linkage
- progress updates, reminders, escalation, overdue status, and change history
- effectiveness evaluation using a later attainment version without cherry-picking population
- carry-forward/revise/close decision and committee review

Examples may include pedagogy, curriculum, laboratory, assessment, bridge/remedial, training, or resource actions, but the system must not prescribe an unapproved intervention automatically.

## 18. Course report and digital course-file integration

Add OBE evidence to Prompt 09 course files by reference:

- approved outcome/mapping/configuration versions
- assessment-source coverage
- direct/indirect/combined CO attainment
- population/exclusion summary
- CO-to-PO/PSO contribution
- identified gaps, actions, status, and effectiveness evidence
- faculty/course coordinator/HOD review

Do not duplicate source marks, submissions, survey responses, or documents. Course-file generation pins immutable evidence versions and shows stale/superseded status.

## 19. Accreditation framework catalogue

Implement configurable versioned frameworks for:

- NBA
- NAAC
- IQAC/internal quality
- AICTE/university/state or institution-defined frameworks where required

Model framework/version, cycle/year, criterion, key indicator, metric/submetric, qualitative/quantitative type, definition, guidance, required evidence types, period, owner role, reviewer role, scoring/self-assessment boundary, dependencies, and status.

Framework catalogues are configurable data and may be updated only from authoritative institutional/regulatory sources. Do not claim built-in templates are legally current or guarantee accreditation. Preserve the exact framework version used for every cycle.

## 20. Accreditation cycle and readiness plan

Implement:

- accreditation/quality cycle, framework version, assessment period, institution/program scope, target submission dates, coordinators, committees, and milestones
- criterion/metric ownership and reviewer assignments
- required evidence checklist and source-system mapping
- planned, active, evidence_collection, review, remediation, approved, submitted_reference, observation_response, completed, archived, and superseded states
- dependency/critical-path view, reminders, escalation, and workload
- readiness percentage based only on explicit completeness rules, never an opaque AI score

External submission is a provider/export boundary; do not claim regulator portal submission without authoritative acknowledgement.

## 21. Governed evidence repository

Implement evidence items with:

- framework/cycle/criterion/metric/year/program/department/owner
- title/description, evidence type, authoritative source module/reference/version, or uploaded file through Prompt 02
- period covered, issue/effective/expiry dates, classification, retention, confidentiality, and legal hold
- original checksum, file/format/MIME/size/page metadata, malware/processing/accessibility status
- draft, requested, submitted, under_review, accepted, changes_requested, rejected, expired, superseded, withdrawn, and archived states
- version lineage, duplicate detection, and source invalidation
- owner declaration, reviewer comments, approval, observations, and use in one or more permitted metrics
- no cross-tenant reuse by default

Prefer authoritative live references/snapshots over uncontrolled file copies. Uploaded evidence requires provenance and cannot overwrite prior versions.

## 22. Evidence requests and observations

Implement:

- request by cycle/metric/owner with requirement, period, format, due date, classification, and acceptance checklist
- owner submit/revise/respond
- reviewer accept/request changes/reject with anchored comments
- missing/late/expired/stale evidence alerts
- observation/nonconformity/clarification with severity, source, response owner, due date, action, evidence, review, and closure
- audit of all status and ownership changes

Do not put confidential evidence content into notifications. A reviewer cannot modify the submitted evidence.

## 23. Evidence index, packages, and exports

Build authorized searchable metadata index and governed packages:

- hierarchy by framework/cycle/criterion/metric/year/program/department
- completeness/accepted/stale/expired/missing state
- source/version/checksum manifest
- package selection, preview, duplicate/minimum-evidence validation, approval, generation, encryption, watermark/classification, and download expiry
- human-readable index plus machine-readable manifest
- async job progress/retry/idempotency and per-item failures
- versioned package supersession and revocation

Never expose evidence through public search or a shared uncontrolled folder. Search authorization applies at index, query, facet/count, and artifact fetch.

## 24. Analytics and trends

Provide course/cohort/program/multi-year views for:

- CO/PO/PSO/PEO attainment and targets
- direct versus indirect contribution
- population, exclusions, source coverage, and response rate
- mapping and assessment coverage
- gaps, actions, overdue items, and effectiveness
- evidence completeness, freshness, observations, and readiness

Every visualization has an accessible table, version/as-of label, exact filter/population, and no misleading truncated axis. Prevent small-cohort/student re-identification through thresholds and permission.

## 25. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- outcome/mapping draft/validate/review/approve/activate/compare
- attainment config draft/validate/simulate/compile/review/activate
- source/population assemble/validate/exclusion detail
- direct/indirect/combined/rollup run/status/cancel/rebuild/compare/trace
- survey template/question/mapping/audience/schedule/respond/close/aggregate
- calculation review/recommend/approve/publish/invalidate
- gap/root cause/action/milestone/evidence/effectiveness/reopen/close
- course-file OBE evidence reference
- framework/catalogue/cycle/criterion/metric/owner/readiness
- evidence request/item/upload/reference/version/review/observation/expiry/archive
- evidence search/package/manifest/export/revoke
- dashboards/reports/operational queues

Use role-shaped DTOs, bounded pagination, allowlisted filters/sorts, RFC 7807, optimistic versions, idempotency keys, correlation IDs, server time, privacy thresholds, authorization, audit, and generated clients.

Define least-privilege permissions for outcome/mapping/config maker/checker, source/population view, calculate/simulate/trace, survey author/approve/distribute/respond/analyze, attainment review/approve, gap/action owner/reviewer, framework/cycle admin, evidence request/submit/review/view/package/export, observation response/close, reports, audit, and platform health.

Enforce SoD for mapping/config activation, survey approval, final attainment approval, action effectiveness closure, framework changes, evidence acceptance, package approval, and observation closure where configured. Platform operations see job/event/storage/index health and masked identifiers only—not student marks, survey responses/comments, attainment drill-down, or evidence content.

Use transactional outbox/inbox. Events carry stable references and minimal state, never marks, individual survey responses, free-text comments, student identities, evidence contents, object keys, or signed URLs.

## 26. React web interfaces

Implement accessible responsive interfaces for:

- PEO/PO/PSO/CO lifecycle and mapping matrices
- question/rubric/assessment mapping coverage
- attainment configuration, validation, simulation, and version comparison
- source/population/exclusion drill-down
- direct/indirect/combined/rollup run progress, traces, comparison, and approval
- survey design, audience, schedule, response monitoring, privacy-safe analysis
- course/cohort/program/multi-year attainment dashboards
- gap/root-cause/action/effectiveness workbench
- course-file OBE integration status
- framework catalogue, cycle plan, criterion/metric owners and readiness
- evidence requests, upload/reference, review/comments, observations, expiry, search, package, and governed export

Meet WCAG 2.2 AA intent with keyboard-accessible matrix editing, screen-reader semantics, visible focus, high zoom, non-color-only heatmaps/status, accessible table equivalents, localized/RTL surveys, and transparent numerator/denominator/exclusion descriptions.

## 27. React Native Android/iOS interfaces for every role

Build genuine native role interfaces using real APIs, not WebViews or placeholder menus.

### Student

- assigned course-end/exit surveys, privacy/anonymity notice, accessible response, save/submit, receipt, and withdrawal where policy permits
- no individual attainment score derived from peer results unless explicitly published as part of learning feedback
- action/remedial notification only through appropriate academic modules

### Alumni/Employer/Industry Supervisor/Stakeholder

- verified invitation, privacy notice, scoped multilingual survey, save/submit, and receipt
- no student roster, marks, attainment drill-down, or unrelated surveys

### Faculty/Course Coordinator

- outcome/mapping/source coverage, course attainment, exact population/exclusions, gaps, and assigned actions
- survey response-rate aggregate after privacy threshold
- submit mapping/action/evidence and course-file references
- large matrix/configuration work remains web-first

### HOD/Program Coordinator/OBE Coordinator

- program mapping/coverage, calculation readiness, attainment/trends, gaps/actions, and evidence queues
- review/comment/recommend/approve within scope with step-up where configured

### Dean/Principal/Academic Council/Board Reviewer

- cross-program version/source/population/target/gap/action/effectiveness summaries
- conflict/quorum/SoD-aware step-up approval and server receipt
- no direct editing of calculated attainment

### IQAC/Quality/Accreditation Coordinator

- framework/cycle/readiness, metric owners, evidence requests, reviews, observations, overdue/stale items, and package approval
- mobile urgent review/action companion; framework setup and package assembly remain web-first

### Evidence Owner/Department Coordinator

- assigned request checklist, authoritative source selection, secure upload, metadata/provenance, response to comments, expiry renewal, and submission receipt

### Evidence Reviewer/Auditor/External Assessor

- purpose/time-bound assigned evidence, manifest, review checklist, comments, observations, accept/reject recommendation, and content-minimized audit
- no broader repository access; external assessor access requires explicit invitation/MFA/expiry

### Mentor/Advisor

- authorized advisee/cohort corrective-action support and learning-gap follow-up
- no raw marks, anonymous responses, or accreditation-confidential evidence

### Guardian

- no OBE calculation, student-level marks, survey response, or accreditation repository access
- only separately published institution/program quality information if policy provides it

### Tenant Administrator/Leadership

- configuration visibility and authorized aggregate readiness dashboards
- no implicit raw evidence, student source, anonymous survey, or approval access

### Platform Operations

- job/event/storage/search/notification health, masked tenant/run IDs, errors, and trace IDs
- no marks, population, responses, comments, attainment, gaps, or evidence contents

Mobile-wide requirements:

- secure OS keystore, app lock/step-up for approvals, tenant/role/purpose enforcement, and device risk policy
- encrypted tenant/user/assignment-partitioned allowlisted cache; confidential evidence and survey responses not cached beyond explicit policy; purge on logout, role/assignment loss, tenant switch, revoke, or expiry
- anonymous responses stored without reversible identity link; offline anonymous survey mode only if cryptographically/privacy reviewed, otherwise require online submission
- push payloads contain no marks, attainment values, survey answers/comments, gap-sensitive detail, or evidence content
- deep links use opaque references, reauthenticate, reauthorize, and fetch current state
- explicit draft/queued/submitted/approved/stale/superseded states; official submissions/approvals require server receipts
- accessibility, dynamic type, localization, RTL, low-connectivity recovery, safe idempotent retry, and camera/file permission minimization
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role and intentional web-first/no-access state

## 28. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized tables such as:

- outcome/version/type/scope/approval
- outcome mapping/version/strength/rationale
- attainment config/version/source rule/threshold/level/weight/population rule
- source snapshot/item/validation/population/member/exclusion
- attainment run/result/contribution/intermediate/trace/hash/invalidation
- survey/template/version/question/option/outcome mapping/audience/invitation/response/aggregate/privacy threshold
- gap/root cause/action/milestone/update/evidence reference/effectiveness review
- course-file OBE reference
- accreditation framework/version/criterion/metric/requirement
- accreditation cycle/owner/milestone/readiness snapshot
- evidence request/item/version/source reference/review/comment/observation/expiry/legal hold
- evidence index/package/manifest/export/job/projection checkpoint

Every tenant-owned table carries tenant/institution/program/regulation/cohort/period/course and applicable survey/framework/cycle/evidence scope; foreign keys cannot cross tenants; repositories require explicit predicates; enable and force RLS where constitutionally required.

Add exact numeric, weight-total, non-overlapping-level, immutable-version, unique/idempotency, source-hash, population/exclusion, anonymity separation, privacy-threshold, state/temporal, optimistic-lock, approval/SoD, expiry, and supersession constraints with appropriate indexes/retention fields.

Test student/respondent, alumni/employer, faculty, HOD/OBE, academic approver, IQAC, evidence owner/reviewer/external assessor, mentor, guardian denial, tenant admin, worker, reporting, migration, and operations database roles separately. Technical roles never receive general OBE/evidence RLS bypass.

## 29. Security, privacy, integrity, and resilience

Threat-model:

- source/population/exclusion manipulation to inflate attainment
- formula/mapping/threshold changes after calculation
- floating-point/rounding nondeterminism
- anonymous survey re-identification or duplicate responses
- small-group result disclosure and free-text leakage
- fabricated/copied/stale evidence and unauthorized cross-metric reuse
- cross-tenant evidence/search leakage
- approval/observation/action closure abuse
- accreditation package exfiltration
- stale attainment in course files/reports

Apply exact arithmetic, immutable versions/hashes, source validation, purpose/context authorization, RLS plus predicates, privacy thresholds, anonymous-response separation, encryption, malware scanning, safe files, short-lived access, step-up/SoD, audit, and anomaly alerts. Never log marks, individual responses/comments, population identities, or evidence contents.

Define retention/legal hold, survey deletion/anonymity, backup/restore, calculation replay, source invalidation, projection/index rebuild, evidence-object reconciliation, package revocation, respondent/support incidents, RPO/RTO, SLIs/SLOs, alerts, and runbooks. Fail with `INSUFFICIENT_DATA` rather than inventing attainment.

## 30. Tests

Implement and run:

- outcome/mapping lifecycle, scale validation, cross-scope denial, versioning, and approval SoD
- formula weights/threshold/level boundaries, exact decimals/rounding, zero denominators, precedence, and invalid configuration rejection
- population inclusion/exclusion matrices for status/attempt/absence/malpractice/withheld/drop/transfer/missing evidence with transparent reasons
- golden direct-attainment cases across question/rubric/assessment/component/course sources
- indirect survey scale/normalization/weights/minimum-response/nonresponse/insufficient-data cases
- direct-indirect combination without silent weight redistribution
- CO-to-PO/PSO rollup mapping strengths, unmapped COs, multi-section/course/cohort, and exact trace
- deterministic reruns, canonical hashes, incremental/full rebuild convergence, source invalidation, and simulation isolation
- survey invitation/token/deduplication/expiry/withdrawal/anonymous unlinkability/privacy-threshold/filter/cross-tab/text access
- approval/quorum/SoD and source change invalidation
- gap/action/milestone/overdue/effectiveness/reopen with source-version comparison
- course-file reference freshness and no source duplication
- framework version/cycle/criterion/metric/ownership/readiness correctness without accreditation claim
- evidence malware/provenance/version/checksum/expiry/source invalidation/review/observation/legal hold
- evidence search authorization at index/query/count/facet/fetch and package manifest/idempotency/encryption/revocation
- RLS negative tests across tenant, program, course, cohort, survey/respondent, calculation population, framework, evidence, external assessor, and technical roles
- web accessibility and Playwright journeys for all roles
- Android/iOS journeys, surveys, secure evidence upload/review, privacy cache/purge, deep-link authorization, step-up, and server receipts
- worker crash recovery, source/survey/storage/search/notification outage, backup restore, replay/rebuild, and documented target-volume performance

Add synthetic canary tests proving marks, respondent identity/answers/comments, and evidence content do not enter logs, traces, metrics labels, events, notifications, analytics, general search, crash reports, or snapshots.

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim formula approval, accreditation readiness/certification, respondent anonymity guarantees beyond tested design, device, load, or iOS evidence not actually verified.

## 31. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- OBE glossary and outcome/mapping lifecycle
- formal direct/indirect/combined/rollup formulas, exact arithmetic, population, exclusion, and worked golden cases
- configuration schema/precedence/compiler and simulation guide
- survey methodology, anonymity/privacy, aggregation, threshold, and respondent guides
- gap/CAPA/effectiveness and course-file integration procedures
- framework catalogue/cycle/readiness/evidence governance guide with no-guarantee disclaimer
- evidence request/review/observation/index/package/retention specifications
- permission/scope/SoD and mobile role-feature matrices
- threat model/privacy assessment
- runbooks for mapping/config error, missing/stale source, unexpected exclusion, insufficient data, survey privacy incident, calculation mismatch, source invalidation, overdue action, stale/fraudulent evidence, package leak/revoke, index rebuild, restore, and disaster recovery
- role guides for students/respondents, alumni/employers, faculty/course coordinators, HOD/OBE, academic approvers, IQAC/accreditation teams, evidence owners/reviewers/external assessors, mentors, tenant administrators, and operations

The completion gate passes only when:

1. Outcomes and mappings are approved, versioned, immutable, scoped, validated, and traceable to authoritative curriculum.
2. Configurations represent institution-specific formulas without executable scripts or hard-coded assumptions.
3. Every direct, indirect, combined, and CO-to-PO/PSO result reproduces from exact source/population/exclusion/mapping/config/engine snapshots and hashes.
4. No learner, assessment, course, or response is silently excluded; all exclusions and missing data are visible with reasons.
5. Surveys truthfully implement identified/confidential/anonymous modes, privacy thresholds, deduplication, and no fabricated responses.
6. Simulations cannot affect official calculations, actions, evidence, or publications.
7. Gaps generate owned, due-dated, evidence-backed actions whose effectiveness is evaluated against later versioned results.
8. Course files reference current approved OBE evidence without duplicating marks/responses/documents.
9. Framework cycles, evidence requests, reviews, observations, readiness, search, and packages are governed, versioned, secure, and make no accreditation guarantee.
10. Every relevant role has a meaningful React web and native Android/iOS interface or an explicit secure no-access state.
11. Mobile caches are encrypted/scoped/purgeable, anonymous survey behavior is privacy-reviewed, and official actions require server receipts.
12. Every tenant table has explicit predicates, forced RLS as required, constraints, and cross-tenant/cross-role negative tests.
13. OpenAPI/events/generated clients, migrations, golden/canary/security/accessibility/observability tests, docs, ADRs, runbooks, and all environment-available checks pass.
14. No source academic data was mutated, no opaque AI attainment score or accreditation claim was made, and no Prompt 20 online assessment was implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, outcomes/mappings/configuration/sources/populations/direct-indirect-rollup calculations/surveys/gaps/actions/frameworks/evidence, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency, golden/canary and all exact test commands/results/exit status, docs/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(obe): implement attainment surveys and accreditation evidence`

Stop. Do not begin Prompt 20 or implement online assessment delivery and analytics.
```

---

## Review Checklist Before Prompt 20

- OBE formulas are configuration-driven, exact, deterministic, and versioned.
- Source populations and every exclusion are transparent and reproducible.
- Direct, indirect, combined, and PO/PSO rollups retain full traces.
- Surveys preserve their declared identity/privacy model and minimum thresholds.
- Gaps, actions, and effectiveness close the improvement loop with evidence.
- NBA/NAAC/IQAC evidence is governed by framework version, metric, owner, review, validity, and access—not uncontrolled folders.
- Accreditation readiness is evidence-based and never presented as guaranteed accreditation.
- Every relevant role has a suitable web/native-mobile workflow or intentional denial.
- Every tenant table has RLS and negative isolation tests.
- No Prompt 20 online assessment functionality was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 20 until these conditions pass.
