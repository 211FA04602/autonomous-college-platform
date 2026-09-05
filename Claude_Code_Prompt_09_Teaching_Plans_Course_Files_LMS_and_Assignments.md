# Claude Code Prompt 09

## Teaching Plans, Course Files, LMS, and Assignments

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–08 passed, were reviewed, and were committed  
**Scope:** Outcome-aligned teaching plans, timetable-linked delivery records, governed learning content, assignments, feedback, communication, progress monitoring, and auditable digital course files

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially curriculum, OBE, timetable, attendance, teaching delivery, LMS, assignments, course files, communication, documents, accessibility, mobile, retention, and reporting.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module rules, and repository conventions.
3. Inspect Prompt 03 curriculum/syllabus/course-outcome contracts, Prompt 05 student/faculty/guardian references, Prompt 06 course offering and roster contracts, Prompt 07 timetable/session contracts, Prompt 08 attendance-session boundary, and Prompt 02 document/workflow/audit/outbox foundations.
4. Inspect OpenAPI, generated clients, data dictionary, RLS policies/tests, authorization and SoD matrices, notification service, object-storage abstraction, virus-scanning pipeline, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, duplicate authoritative syllabus/roster/timetable data, implement the Prompt 10 question bank, Prompt 12 examination engine, Prompt 19 attainment engine, Prompt 20 online-assessment delivery, Prompt 21 programming sandbox, or fabricate plagiarism/video/conferencing integrations.

Implement a bounded `learning-delivery` domain. It owns teaching plans, delivery evidence, learning-resource organization/release, coursework assignments and submissions, instructional feedback, course communication, progress views, and course-file assembly. It does not own official curriculum, attendance facts, final examination records, financial entitlements, or final CO/PO attainment.

## 1. Domain invariants

Enforce these invariants:

- all records are tenant/institution/campus/academic-year/term/offering scoped
- the approved Prompt 03 curriculum version is authoritative; LMS mappings reference it rather than copy or alter it
- a course workspace is backed by an active Prompt 06 offering and authorized roster
- timetable-linked delivery references Prompt 07 sessions; attendance references Prompt 08 and is never inferred from content access
- approved teaching-plan versions and submitted student work are immutable; changes create versions or governed transitions
- official timestamps, deadlines, release windows, and receipts are server-authoritative
- learning-resource visibility is deny-by-default and based on roster, role, release conditions, and content classification
- no hidden grade changes, silent deadline extensions, destructive submission replacement, or cross-tenant content reuse
- every displayed progress or completion value states its source, calculation rule, scope, and freshness
- all mobile writes/approvals become official only after an authoritative server receipt

Create a shared glossary and state-transition documentation.

## 2. Course workspace provisioning

Provision one controlled workspace for an offering/section/group from Prompt 06:

- course, regulation, curriculum/syllabus version, term, credits/contact hours, delivery components, CO references, roster, faculty/co-faculty/teaching-assistant roles, and Prompt 07 timetable context
- draft, preparing, active, read-only, completed, archived, and reopened states
- idempotent provisioning and reconciliation when offerings, assignments, roster membership, or timetable versions change
- approved template import from the same tenant with explicit selection and provenance
- merge/split/cross-listed delivery views without duplicating student submissions or leaking rosters
- faculty handover with effective dates, responsibility scopes, acknowledgement, and historical ownership
- configurable student-access dates and read-only retention after completion
- exception queue for missing syllabus, faculty assignment, roster, calendar, or conflicting source data

Course staff permissions derive from effective teaching allocations. A platform operator, former faculty member, or unrelated department administrator has no implicit access.

## 3. Outcome-aligned teaching plans

Implement versioned teaching plans mapped to the approved curriculum:

- syllabus units, topics/subtopics, planned hours/sessions, sequence, prerequisite topic, and target dates
- CO mappings and reference-only PO/PSO mappings where approved by Prompt 03
- Bloom/cognitive level, learning objectives, teaching methods, pedagogy, activity type, delivery mode, and learning-resource references
- lecture/tutorial/laboratory/project/remedial distinctions
- planned assessment checkpoints as instructional milestones, not Prompt 10 examination questions
- accommodations/accessibility considerations without exposing protected student data
- faculty workload/contact-hour summary through a future HR provider port
- reusable tenant-owned plan template and authorized copy with provenance/license checks
- collaborative draft comments, optimistic locking, compare versions, submit/review/approve/publish
- HOD/program coordinator approval rules and SoD where configured
- amendment after publication with reason, affected topics/sessions, reviewer, effective date, and preserved prior version

Validate curriculum coverage, planned-hour totals, duplicate/gap mappings, term dates, timetable feasibility, and CO coverage. Never allow a teaching plan to modify the official syllabus.

## 4. Timetable-linked teaching diary

Implement a daily teaching diary linked to Prompt 07 scheduled occurrences:

- assigned faculty/substitute, scheduled versus actual start/end, delivery mode/location, syllabus topic(s), CO/Bloom mapping, method, materials used, and faculty reflection
- delivered, partially delivered, postponed, cancelled, substituted, makeup required, makeup completed, and not-conducted outcomes
- direct navigation from timetable and to the corresponding Prompt 08 attendance session without copying attendance data
- attachments/evidence through Prompt 02 document services
- draft, submitted, verified, returned, locked, reopened lifecycle
- late/missing diary monitoring, bulk-safe review, and faculty attestation
- correction/amendment preserving original version and reason
- lab diary fields for experiment/activity reference and safety prerequisite acknowledgment, without implementing lab inventory
- student-visible session summary controlled separately from restricted faculty notes

Do not equate a diary entry with proof of attendance or automatically mark a class conducted when the schedule was cancelled.

## 5. Planned-versus-delivered progress

Implement deterministic progress calculations by offering, syllabus unit/topic, activity type, CO, faculty, section, and date:

- planned hours/sessions versus delivered/partially delivered/postponed/makeup values
- syllabus coverage percentage with explicit numerator/denominator and partial-delivery rule
- pace against academic calendar and remaining scheduled capacity
- at-risk projection for incomplete syllabus, clearly labeled as a projection
- missed sessions, unmapped delivery, overdue diary, and pending-verification exceptions
- recovery/remedial plan, owner, target date, approval, status, and follow-up
- version/input watermark so reports remain reproducible

Provide progressive alerts to faculty, course coordinator, HOD/program coordinator, Dean/academic office, and leadership according to policy. Deduplicate, throttle, acknowledge, and audit alerts.

## 6. Learning modules and topic organization

Implement hierarchical course content:

- module/unit/topic/subtopic structure aligned to syllabus but independently arranged for teaching usability
- title, summary, objectives, estimated effort, prerequisites, CO/Bloom tags, order, completion rule, and availability
- draft, review, approved, scheduled, published, withdrawn, retired states
- sequential, date-based, prerequisite-based, or manual release rules
- per-section/group audience and authorized accommodations
- preview-as-student with explicit simulated identity/scope
- version comparison and student-impact preview before changing released content
- completion tracking based on explicit rules such as viewed, acknowledged, activity completed, or instructor marked

Content completion is learning-engagement metadata, not attendance and not proof of mastery.

## 7. Learning resources and content governance

Support governed resources:

- rich text, PDF/document, presentation, image, audio, video reference, external link, embed allowlist, dataset, downloadable template, SCORM/LTI-compatible future adapter metadata, and repository/link reference
- ownership, author/source, copyright holder, license, acquisition basis, permitted audiences, redistribution/download policy, expiry, geographic restriction where applicable, and attribution
- original file/version, checksum, MIME validation, malware scan, size/page/duration metadata, accessible alternative/captions/transcript status, language, classification, and retention
- upload through approved object-storage/document service using short-lived signed access
- processing states that never expose unscanned content
- link validation and safe URL handling
- content versioning; released versions remain historically reproducible
- withdrawal/takedown with reason and impact notification
- tenant-private by default; no global marketplace or cross-tenant sharing unless a future governed feature explicitly adds it

Do not scrape, copy, or redistribute commercial content without authorization. Never proxy arbitrary remote HTML/scripts. Record a content-rights and accessibility ADR.

## 8. Video and live-session boundaries

Support authorized video URLs/uploads and future streaming/conferencing integrations through explicit ports:

- external provider reference, title, duration, captions/transcript, license, release rule, and expiry
- private object playback through expiring authorization where platform-hosted
- provider availability/error state shown truthfully
- optional playback progress only with disclosed policy and no claim that playback proves learning or physical attendance
- live-class link visible only to authorized current roster members during a configured window
- secrets/tokens stored in AWS Secrets Manager/KMS and never exposed to clients

Provide a disabled/reference adapter when no provider is configured. Do not fabricate meeting creation, recording, caption, or viewing data.

## 9. Assignments and coursework

Implement individual and group assignments:

- title, instructions, syllabus topic, CO/Bloom mapping, assignment category, marks/points or ungraded mode, rubric, attachments, release/open/due/close dates, time zone, estimated effort, and audience
- draft, review, scheduled, published, closed, grading, returned, completed, cancelled, and archived states
- prerequisite/release conditions and section/group/accommodation-specific variations
- late, grace, extension, resubmission, attempt, withdrawal, and academic-integrity policies
- group definition from authorized course roster, team formation mode, member changes, leader/contact, and contribution statement
- effective-dated individual extension/accommodation without exposing reasons to peers
- assignment duplication/template reuse with provenance and no copied submissions/grades
- change-after-release impact preview, learner notification, and preserved version

Do not use this module for confidential examination papers or high-stakes proctored exams.

## 10. Submission lifecycle and receipts

Support text, file, multiple-file, link, media-reference, and code/archive attachment submissions. The Prompt 21 programming engine will later own executable code workspaces and sandboxed evaluation.

Implement:

- server-authoritative attempt creation and deadline evaluation
- autosaved text draft where policy allows
- direct/resumable upload using approved storage flow, checksum, malware scan, file-type/size/count limits, and quarantine
- submitted, processing, accepted, late, rejected, withdrawn, returned-for-resubmission, superseded, and finalized states
- immutable submitted version, timestamp, policy evaluation, file hashes, roster/group snapshot, and durable receipt
- explicit replace/resubmit that preserves every prior attempt
- group submission visibility and authorization; member changes never rewrite the submitted group snapshot
- duplicate-click/network-retry idempotency and optimistic concurrency
- offline-prepared mobile draft/upload queue, but final submission only after server validation and receipt
- faculty-visible exception queues for failed processing, inaccessible files, and disputed timestamps

Never report “submitted” from local state or an object upload alone.

## 11. Rubrics, grading, and feedback

Implement versioned analytic/holistic rubrics:

- criteria, performance levels, descriptors, points/weights, CO mapping, and total validation
- accessible student preview before submission when policy permits
- criterion-level score/comment, overall feedback, annotation-reference boundary, private marker note, and learner-visible feedback
- manual grading, return, revision, moderation, regrade request, and finalization
- blind/double-marking configuration boundary without exposing identity prematurely
- grading allocation for faculty/co-faculty/teaching assistants with restricted authority
- optimistic concurrency, draft autosave, conflict recovery, and batch-return safeguards
- grade history, reasoned changes, moderator action, release schedule, and student acknowledgement
- export/integration port to the future official marks/assessment module; LMS coursework grades are not automatically official examination marks

Use exact decimal arithmetic and deterministic rubric totals. A grader cannot approve their own restricted moderation/regrade when SoD is configured.

## 12. Plagiarism and similarity integration

Define a vendor-neutral plagiarism/similarity port:

- submit eligible artifact/reference with minimum required identity data
- consent/legal-basis and repository-retention controls
- job state, provider reference, submitted artifact hash, retry/idempotency, and callback signature validation
- similarity result, matched-source metadata, report authorization, provider/version, error, and timestamp
- resubmission/version mapping and exclusion settings
- manual academic-integrity review workflow; a similarity score is evidence, not an automatic misconduct verdict

If no provider is configured, show `NOT_CONFIGURED`/`UNAVAILABLE`; never generate a fake percentage. Keep provider credentials in Secrets Manager/KMS and document deletion/retention obligations.

## 13. Announcements, discussions, doubts, and polls

Implement course-scoped communication:

- targeted announcements with schedule/expiry, priority, attachments, acknowledgement, and notification delivery status
- moderated topic discussions with threads, replies, mentions, pin/lock/archive, edit history, reporting, and moderation reasons
- student doubt/question posts supporting public-to-course, group, or private-to-authorized-staff scope
- faculty answer, accepted/resolved state, FAQ promotion with consent and de-identification
- simple instructional polls with audience, open/close window, anonymous/identified policy, single/multiple choice, and aggregate results
- anti-spam/rate limits, blocked unsafe embeds, content reporting, retention, audit, and notification preferences

Do not expose a private doubt, poll response, hidden identity, or roster through notifications or search.

## 14. Student engagement and instructor insights

Provide privacy-conscious operational insights:

- content released/viewed/acknowledged/completed according to explicit definitions
- submission/on-time/late/missing/resubmission counts
- feedback released/acknowledged
- unresolved doubts and discussion moderation workload
- progress and workload calendar
- cohort aggregates and authorized learner drill-down

Do not create opaque “engagement scores,” behavioral surveillance, or attendance inference. Any future predictive model requires a separate governed ADR, validation, explainability, and opt-out/legal review.

## 15. Course feedback boundary

Provide an integration boundary to a future survey/feedback module:

- course/offering/faculty/audience references
- configured open/close dates and anonymity threshold
- invitation/delivery state and aggregate completion status
- no raw anonymous response access inside `learning-delivery`

Until that module exists, display truthful `NOT_CONFIGURED` status; do not collect supposedly anonymous feedback with reversible identity links.

## 16. Digital course file

Automatically assemble an auditable, versioned course file from authoritative evidence:

- offering/faculty/roster and approved syllabus references
- approved teaching plan and amendments
- timetable and teaching-diary summaries
- planned-versus-delivered coverage and recovery actions
- learning-resource index with version/license/accessibility metadata
- assignments, rubrics, release details, aggregate submission/grading data, and representative evidence only where policy permits
- Prompt 08 attendance aggregate/reference, never duplicated raw attendance
- announcements/activities and course feedback aggregate reference when available
- review/verification notes, exceptions, missing-evidence checklist, and sign-offs
- generated manifest containing source IDs/versions/hashes, generation engine version, timestamp, scope, and completeness rules

Implement draft generation, validation, faculty attestation, HOD/program review, return, approval, freeze, supersede, archive, and controlled reopen. Frozen course files are immutable. A regenerated version preserves the prior manifest and explains every change.

Generate accessible PDF and structured archive/export asynchronously through the existing document/job foundation. Include classification/watermark, authorization, short-lived download, audit, retention, and checksum. Never include unnecessary student PII, private discussions, medical/accommodation details, or restricted plagiarism reports.

## 17. Search, reports, and exports

Implement tenant-scoped authorized search over course/module/topic/resource/assignment metadata and accessible extracted text only after malware/content processing. Enforce release and roster authorization at query and result-fetch time.

Provide reports for:

- teaching-plan approval and curriculum coverage
- diary completeness and verification aging
- planned-versus-delivered risk and recovery
- resource copyright/accessibility/completeness exceptions
- assignment release/submission/grading turnaround
- pending moderation/regrade/integrity review
- student workload calendar and due-date congestion
- course-file completeness, review, freeze, and archival status

Exports require permission, scope, purpose, bounded fields, formula-injection protection, classification/watermark, asynchronous generation for large jobs, expiry, and audit.

## 18. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- workspace provision/reconcile/state/handover
- teaching-plan draft/validate/compare/submit/review/approve/publish/amend
- diary query/draft/submit/verify/return/reopen and progress/recovery plans
- module/topic/resource upload/process/version/release/withdraw/complete
- assignment/rubric create/version/review/publish/change/cancel
- group formation and authorized membership changes
- submission draft/upload/submit/receipt/withdraw/resubmit/status
- grading/moderation/regrade/release/acknowledge
- plagiarism job/callback/status/report authorization/review
- announcement/discussion/doubt/poll/moderation
- student calendar/course view and instructor/mentor/coordinator dashboards
- course-file generate/validate/attest/review/freeze/supersede/export
- search, governed reports/exports, and operational exception queues

Use explicit DTOs, bounded pagination, allowlisted filters/sorts, RFC 7807, optimistic versions, idempotency keys, correlation IDs, rate limits, audit, and generated clients.

Define least-privilege permissions for workspace administration, plan author/review/approve, diary author/verify/reopen, resource manage/approve/release/download, assignment author/publish, submit, grade, moderate, regrade, feedback release, communication/moderation, plagiarism review, course-file attest/review/freeze/reopen/export, dashboard/report, and operations health.

Enforce contextual authorization using current offering assignment/roster and effective dates. Configure SoD for plan approval, course-file approval/reopening, sensitive bulk grading changes, and integrity decisions. Platform operations may see job/event health and trace IDs but no course content, rosters, submissions, grades, or messages by default.

Publish minimal transactional-outbox events for workspace activated/archived, plan published/amended, resource released/withdrawn, diary submitted/verified, syllabus risk changed, assignment published/changed, submission accepted, grading finalized/released, course-file frozen/superseded, and relevant invalidations. Consumers must be idempotent and tolerate out-of-order delivery.

## 19. React web interfaces

Implement accessible responsive interfaces for:

- faculty course workspace and setup/readiness
- visual and form/list teaching-plan editor, curriculum coverage, validation, comparison, and approval
- timetable-linked teaching diary and bulk-safe status review
- progress/risk/recovery dashboard
- module/topic organizer and resource authoring/upload/version/release
- assignment/rubric authoring, audience/deadline policy, learner preview, submission inbox, grading, moderation, regrade, and feedback release
- announcements, discussions, doubts, polls, and moderation
- student course home, content reader/player boundary, workload calendar, assignment submission/receipt, feedback, and progress
- mentor/advisor authorized workload/missing-work view without grading authority
- HOD/program/Dean review queues and dashboards
- course-file completeness, source manifest, attestation, review, freeze, version comparison, and export
- content/accessibility/license, processing, integration, and operational exception administration

Meet WCAG 2.2 AA intent: full keyboard operation, screen-reader semantics, visible focus, captions/transcripts metadata, reduced motion, non-color-only status, accessible drag/drop alternatives, localized dates/numbers, and responsive low-bandwidth behavior.

## 20. React Native Android/iOS interfaces for every role

Build genuine native role interfaces using the real versioned APIs, not WebViews or placeholders.

### Student

- course home, modules/topics, released resources, downloads where allowed, and explicit completion
- learning/workload calendar, assignment detail, rubric, drafts, camera/file/link/text submission, upload progress, final receipt, resubmission, grade/feedback, and regrade request
- announcements, acknowledgements, discussions, doubts, polls, and notifications
- encrypted allowlisted offline resources/drafts with version, expiry, and staleness; final submission requires server receipt

### Faculty/Co-faculty/Teaching Assistant/Lab Assistant

- assigned course workspaces, teaching plan and coverage overview
- timetable-linked diary capture, resource release, announcements, discussion/doubt moderation
- assignment/submission queue, rubric grading, feedback, and missing-work alerts within delegated authority
- offline diary/resource-draft/grading draft where policy permits; official submission/release requires server confirmation
- complex plan construction, high-volume grading, template administration, and course-file generation remain web-first with secure mobile review/action companions

### Mentor/Advisor

- authorized advisee workload, missing/late coursework, feedback status, and due-date congestion
- follow-up note/escalation and deep links
- no submission content or grades beyond granted educational-interest scope; no grading authority

### Guardian

- only policy-permitted linked learner assignment calendar, missing/due status, announcements, and acknowledgements
- no submission content, grades, discussions, private doubts, or staff notes unless institution policy explicitly grants them

### HOD/Program Coordinator

- plan/diary/resource/assignment/course-file completeness and risk dashboards
- review queue, comments, return/approve, recovery tracking, and step-up approval
- large plan/resource/bulk operations remain web-first

### Dean/Academic Office/Registrar

- cross-program delivery-risk, pending approvals, exception aging, and course-file readiness
- authorized mobile review/approval/reopen with rule/source summary, SoD warning, step-up authentication, and server receipt

### Quality/OBE/Accreditation Staff

- read-only approved syllabus mappings, teaching coverage, course-file completeness, and authorized evidence manifest
- review/comment where delegated; no silent editing of faculty evidence or future attainment results

### Examination Staff

- authorized read-only coursework/plan references needed for future assessment preparation
- no confidential question bank, official marks, or examination operations in this prompt

### Content/Library Administrator

- content-processing, license, accessibility, takedown, expiry, and broken-link queues
- masked/minimized learner information and no grading authority

### Tenant Administrator/Leadership

- configured aggregate delivery, content, assignment, and course-file dashboards
- policy/configuration visibility without implicit access to private submissions or messages

### Platform Operations

- service/job/storage/scan/search/integration/event health, tenant-safe metrics, and trace IDs
- no academic content, submissions, grades, discussions, or roster access by default

Mobile-wide requirements:

- secure OS keystore, encrypted user/tenant-partitioned cache, purge on logout/membership/role loss/device revocation/tenant switch
- short-lived signed downloads, protected-file handling, and no sensitive content in push payloads or logs
- deep links reauthenticate, reauthorize, and fetch current server state
- explicit offline, stale, queued, processing, accepted, rejected, released, and failed states
- background upload/sync is resumable and idempotent; it cannot cross user/tenant contexts
- submissions, approvals, grade release, diary submission, content release, and acknowledgements succeed only after authoritative server receipt
- accessibility, dynamic type, localization, low-connectivity recovery, camera/file permission minimization, and safe retry
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role above and label web-first versus mobile approval capabilities honestly

## 21. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized tables such as:

- course workspace/state/history/staff assignment/source snapshot
- teaching plan/version/unit/topic mapping/review/amendment
- teaching diary/version/topic mapping/evidence reference/verification
- delivery progress snapshot/risk/recovery plan
- learning module/topic/prerequisite/audience/release rule/completion
- resource/resource version/file reference/license/accessibility/processing/release/takedown
- assignment/version/audience/policy/extension/group/group snapshot
- rubric/version/criterion/level/mapping
- submission/attempt/artifact/receipt/processing state
- grading allocation/grade version/criterion score/feedback/moderation/regrade
- plagiarism job/result/reference/review
- announcement/acknowledgement/discussion/post/edit/moderation/doubt/poll/response
- course-file/version/manifest/source/review/sign-off/export
- report/export/search projection and processing checkpoints

Use exact repository naming conventions. Every tenant-owned table carries required tenant/institution/campus/term/offering/user scope; foreign keys cannot cross tenants; repositories include scope predicates; enable and force RLS where constitutionally required. Add unique/idempotency/check/exclusion constraints, optimistic versions, retention fields, and appropriate indexes. Do not partition without measured need and an ADR.

Test application, background worker, migration, reporting, and operations database roles separately. Technical roles do not receive a general RLS bypass.

## 22. Security, privacy, integrity, and resilience

Threat-model:

- cross-tenant/cross-course content and roster leakage
- former faculty or dropped student retaining access
- malicious files, unsafe embeds, signed-URL sharing, and content scraping
- copyright/license violations and unauthorized cross-tenant copying
- assignment deadline or receipt disputes
- submission replacement, grade manipulation, rubric changes after release, and insider bulk edits
- plagiarism callback forgery or report leakage
- private doubt/discussion/poll identity exposure
- mobile cache/notification leakage and offline replay
- stale course-file evidence or unauthorized reopening

Use purpose-based authorization, step-up authentication for high-risk approvals/reopening/bulk actions, malware scanning, safe rendering, CSP/embed allowlists, encryption, secret rotation, rate limiting, and complete audit. Never log secrets, signed URLs, submission content, grades, private messages, full rosters, plagiarism reports, or unnecessary PII.

Define retention/legal hold, student export/portability, takedown, archive/purge, backup/restore, processing replay, search-index rebuild, object reconciliation, dead-letter recovery, RPO/RTO, SLIs/SLOs, alerts, and degraded behavior. Failures must stay visible and retryable; never silently release unscanned content or lose an accepted submission.

## 23. Tests

Implement and run:

- workspace provisioning/reconciliation, staff handover, roster add/drop, and source-version changes
- teaching-plan curriculum mapping, hour/coverage validation, approval/SoD, amendment, and immutability
- diary/timetable/substitution/cancellation/makeup links and no attendance inference
- planned-versus-delivered calculations, partial rules, projections, alerts, and rebuild convergence
- resource version/release/withdrawal, scheduled/time-zone release, authorization, malware quarantine, license/accessibility metadata, expired signed access, and unsafe embed/link denial
- assignment audience, release/due/close/grace/late/extension/accommodation/resubmission boundaries using server time
- group formation/member-change/submission snapshot and cross-group denial
- text/file/link/mobile upload, checksum, processing, retry, duplicate tap, partial failure, immutable attempt, and authoritative receipt
- rubric arithmetic, versioning, grading concurrency, delegated grader scope, moderation/regrade SoD, feedback scheduling, and history
- plagiarism unavailable/failure/callback signature/idempotency/retention and no fabricated result
- announcement targeting, acknowledgement, private doubt, anonymous poll threshold, edit/moderation history, rate limit, and notification minimization
- course-file source correctness, completeness rules, manifest hashes/versions, excluded sensitive data, freeze/supersede/reopen, PDF/archive authorization, and reproducibility
- search authorization at index/query/fetch time and projection rebuild
- RLS negative tests across tenant, institution, campus, department, offering, roster, faculty assignment, group, guardian relation, content classification, and technical roles
- web accessibility and Playwright journeys for student, faculty, assistant, mentor, guardian, HOD, Dean/academic office, quality/OBE, examination, content admin, tenant admin, and operations
- Android/iOS journeys for all roles, offline cache/draft/upload, stale versions, secure purge, push/deep-link reauthorization, step-up approval, and server receipts
- outbox retry/reordering, job crash recovery, storage/scan/search/provider outages, backup restore/reconciliation, and documented target-volume performance

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim iOS, device, provider, or native integration evidence that was not executed.

## 24. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- learning-delivery glossary and lifecycle diagrams
- teaching-plan/diary/progress calculation specification with worked examples
- content ownership/license/accessibility/upload/release/takedown policy
- assignment/submission/receipt, rubric/grading/moderation/regrade specifications
- plagiarism, video, conferencing, future HR/marks/feedback/programming-lab integration contracts
- course-file evidence schema, completeness rules, manifest format, and sample redacted output
- permission/scope/SoD matrix and mobile role-feature matrix
- threat model/privacy assessment
- runbooks for missed diary, deadline dispute, failed upload, malware, provider outage, broken link, content takedown, grade correction, search rebuild, course-file freeze/reopen, object reconciliation, and disaster recovery
- role guides for faculty, assistants, students, mentors, guardians, HOD/program, academic office, quality/OBE, examination, content admin, tenant admin, and operations

The completion gate passes only when:

1. An offering provisions an authorized course workspace from authoritative syllabus, roster, faculty, and timetable contracts.
2. Faculty can create, validate, approve, publish, amend, and trace outcome-aligned teaching plans without modifying the official curriculum.
3. Timetable-linked teaching diaries preserve history and never infer attendance.
4. Planned-versus-delivered progress is deterministic, explainable, reproducible, and drives governed recovery alerts.
5. Governed, versioned, licensed, accessible, malware-scanned learning resources release only to authorized audiences.
6. Assignments support individual/group rules, deadlines, accommodations, immutable attempts, resumable uploads, and authoritative receipts.
7. Rubrics, grading, feedback, moderation, and regrade workflows preserve arithmetic, concurrency safety, history, scope, and SoD.
8. Plagiarism/video/conferencing ports report unavailable states honestly and never fabricate results.
9. Communications protect private/anonymous scopes and provide moderation, notification, and audit controls.
10. Frozen course files are complete, reproducible, minimally disclose student data, and retain source IDs/versions/hashes.
11. All relevant roles have meaningful React web and native Android/iOS interfaces; sensitive/high-volume work remains web-first with secure mobile review/action companions.
12. Mobile offline data is encrypted, isolated, purgeable, visibly stale/queued, and official actions require server receipts.
13. Every tenant table has scoped predicates, RLS, constraints, and cross-tenant/cross-scope negative tests.
14. APIs/events/generated clients, migrations, accessibility, observability, docs, ADRs, runbooks, and every environment-available test pass.
15. Prompt 10 question-bank, high-stakes exams, attainment, online assessment delivery, executable coding sandbox, financial functions, and fake integrations were not implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency, tests with exact commands/results/exit status, documentation/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(learning): implement teaching delivery LMS and course files`

Stop. Do not begin Prompt 10 or implement the question bank.
```

---

## Review Checklist Before Prompt 10

- Course workspaces derive authorization and source data from approved offerings, curriculum, rosters, faculty allocations, and timetables.
- Teaching plans and diaries are versioned, outcome-aligned, reviewable, and historically reproducible.
- Delivery progress is explainable and does not infer attendance or mastery.
- Content is malware-scanned, license/accessibility classified, versioned, and deny-by-default.
- Assignments, submissions, receipts, rubrics, grades, feedback, moderation, and regrades preserve history and SoD.
- Provider integrations report unavailable states honestly.
- Course communication protects private and anonymous scopes.
- Digital course files contain verifiable authoritative evidence with minimal student disclosure.
- Every relevant role has a meaningful web and native mobile interface.
- Offline mobile work is encrypted, scoped, visibly pending, and official only after server receipt.
- Every new tenant table has RLS and negative isolation tests.
- No Prompt 10+ domain was prematurely implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 10 until these conditions pass.
