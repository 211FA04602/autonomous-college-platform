# Claude Code Prompt 20

## Online Assessment Delivery and Analytics

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–19 passed, were reviewed, and were committed  
**Scope:** Non-coding online assessment assembly, scheduling, eligibility, accommodations, secure attempt delivery, autosave/resume, submission, objective and rubric grading, controlled result release, integrity telemetry, item analysis, cohort analytics, and role-specific web/native-mobile interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially online assessments, question banks, LMS, examinations, accommodations, grading, OBE, analytics, privacy, accessibility, notifications, portals, and native mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, repository conventions, threat models, and data-classification policy.
3. Inspect Prompt 10 approved question-bank, blueprint, rubric, pool, version, answer-key, and render/scoring contracts; Prompt 09 LMS/assignment/course-offering contracts; Prompt 07 timetable; Prompt 05/06 student, enrollment, course-registration, and cohort contracts; Prompt 08 attendance accommodations references; Prompt 12 examination eligibility/accommodation/application contracts; Prompt 14 invigilation/logistics references; Prompt 15 evaluation/moderation contracts; Prompt 16 result/release contracts; Prompt 19 CO/Bloom/outcome evidence contracts; and Prompt 02 workflow/document/audit/outbox foundations.
4. Inspect authentication/session/device controls, authorization/SoD, PostgreSQL RLS, OpenAPI/generated clients, notification/provider ports, object storage, background jobs, observability, load-test tooling, accessibility/localization conventions, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, duplicate authoritative questions/rosters/eligibility/marks/results, expose answer keys before authorized release, invent proctoring outcomes, use invasive device capabilities without explicit policy and consent, claim cheating prevention is infallible, or implement Prompt 21 code/SQL execution.

Implement a bounded `online-assessment` domain with an independently scalable runtime boundary. It owns delivery snapshots, schedules, eligible-candidate snapshots, attempts, responses, autosave acknowledgements, submissions, integrity event references, grading work, release views, and item/cohort analytics. It references but does not own the authoritative question bank, curriculum, enrollment, examination results, OBE outcomes, or programming execution plane.

## 1. Domain invariants

Enforce:

- every assessment, schedule, eligibility snapshot, attempt, response, grade, release, and analytic result is tenant/institution scoped and protected by PostgreSQL RLS
- only an approved immutable assessment delivery version may be scheduled or started
- a delivery snapshot pins blueprint, question/rubric versions, section rules, scoring rules, answer-key version, accommodations policy, randomization seed strategy, and renderer/runtime versions
- server time is authoritative for windows, attempt duration, pauses, expiry, and submission
- client clocks and client-computed scores are never authoritative
- attempt creation, autosave, resume, and submission are idempotent and have server receipts
- acknowledged answers survive an application restart, reconnect, retry, or duplicate request
- final submission is immutable; authorized post-submission correction creates a versioned, reasoned workflow and never rewrites history
- questions and answers are disclosed only according to release policy and authorization
- accommodations alter only approved attempt policy and are never inferred from disability/medical data
- randomization is deterministic and reproducible for authorized audit without allowing candidates to derive another candidate's paper
- integrity telemetry is evidence for human review, not automatic proof of misconduct
- privacy notices, consent where required, retention, minimization, and access controls apply to device/network/proctoring data
- analytics pin the exact assessment version, question version, population, exclusions, scoring version, and as-of time
- no native-mobile official action is complete until an authoritative server receipt is stored and displayed

Write a glossary covering assessment, delivery snapshot, schedule, window, section, pool, form, attempt, response revision, autosave receipt, resume, submission receipt, accommodation, integrity event, grading task, release policy, item difficulty, discrimination, distractor analysis, percentile, rank, normalization, and cohort.

## 2. Assessment delivery lifecycle

Implement lifecycle:

- `draft`
- `validating`
- `validation_failed`
- `ready_for_review`
- `approved`
- `scheduled`
- `open`
- `closed`
- `grading`
- `review_complete`
- `released`
- `archived`
- `cancelled`
- `superseded`

Support practice, scheduled, open-window, take-home, formative quiz, internal test, mock/competitive-exam, survey-like ungraded quiz, and proctoring-ready modes. High-stakes autonomous examination use must explicitly integrate Prompt 12–16 approval and publication contracts rather than bypass them.

Transitions require permissions, optimistic version checks, reasons where consequential, audit, and outbox events. Approved/scheduled delivery content is immutable; changes create a new version and require impact analysis for schedules and existing attempts.

## 3. Delivery snapshot and validation

Assemble from approved Prompt 10 content:

- title, purpose, instructions, language, course/exam/cohort/outcome references
- assessment mode and stakes classification
- sections, section order, instructions, marks, duration, and navigation policy
- fixed questions and pool-selection rules
- optional-question groups such as answer any N of M
- question/sub-question structure and supported non-code response types
- negative, partial, all-or-nothing, weighted, rubric, and manual marking rules
- attempt limits, cooldown, practice feedback, and solution visibility
- calculator/reference/attachment policy
- candidate declaration and privacy notice
- start window, attempt duration, grace/late rules, and hard close
- randomization, form generation, and answer-option shuffle policy
- result/answer/explanation release policy

Validate before approval:

- all referenced content is approved, active, compatible, and from the permitted tenant/scope
- blueprint/pool constraints are satisfiable under deterministic selection
- no question duplication unless explicitly allowed
- optional-group minima/maxima are consistent
- total marks, section marks, weights, and duration are coherent
- scoring schemas and answer keys exist for auto-scored types
- subjective items have rubric/manual-grading policy
- every renderer is supported on web, Android, and iOS or is explicitly restricted before scheduling
- media/files are malware-cleared, accessible, authorized, and available for the full window
- no hidden answer/explanation leaks through DTOs, logs, HTML, mobile bundles, caches, filenames, object metadata, or analytics
- accommodation and navigation rules do not conflict
- release policy does not precede final close or required approval

Generate an immutable canonical delivery manifest and hash. Persist validation findings and require revalidation when a referenced version changes.

## 4. Sections, navigation, and response types

Support sections with configurable:

- fixed, sequential, free-navigation, one-way, and review-before-submit behavior
- section timers or one overall timer
- optional entry/exit acknowledgement
- question palette and answered/unanswered/marked-for-review states
- required-response warning without forcing an answer
- optional question groups and best-N scoring where approved
- section-level calculator/reference assets
- break/pause behavior and whether timer continues

Support non-coding response types defined by Prompt 10, including single choice, multiple choice, true/false, assertion-reason, matching, ordering, numeric with tolerance/unit policy, short text, long text, fill-in, hotspot/diagram reference where an accessible equivalent exists, file upload where approved, and rubric-scored response.

Do not execute code, SQL, macros, embedded scripts, or uploaded executables. Prompt 21 exclusively owns programming workspaces and sandboxed execution.

## 5. Pools, forms, and deterministic randomization

Implement server-side form generation using cryptographically strong, non-predictable seed material protected from candidate access. Pin:

- delivery version
- candidate/attempt scope through a non-exported derivation reference
- algorithm/version
- selected question and option order
- constraint-resolution trace
- generated form hash

Satisfy blueprint constraints for topic, difficulty, Bloom level, CO, marks, type, and exclusions. Reject generation if constraints cannot be met; never silently relax an approved blueprint.

Ensure retrying attempt start returns the same form. Authorized audit can reproduce the form using protected services, while ordinary APIs/logs/events never expose seed material, answer keys, unused pool contents, or another candidate's selections.

## 6. Scheduling and audience

Implement schedules scoped to course offering, section, cohort, program, exam registration, candidate list, or authorized ad hoc audience. Include:

- registration/start/end/grace windows
- timezone and displayed local time
- attempt duration and maximum finish time
- attempt count and retake policy
- eligible/blocked/waitlisted states and reason categories
- venue/network/device restrictions only when policy supports them
- invigilator/reviewer assignment references
- capacity/concurrency planning fields
- reminder and notification policy
- cancellation/reschedule/version-impact workflow

Consume authoritative eligibility from Prompt 06/08/12. Snapshot the eligible population at the defined cutoff with source version and explicit inclusions/exclusions. Late eligibility changes require a governed delta workflow.

Never reveal sensitive eligibility, disability, disciplinary, fee, malpractice, or academic details in notifications or candidate lists beyond the recipient's need.

## 7. Accommodations and accessibility

Consume only approved accommodation grants with effective scope, never diagnoses. Support:

- additional percentage or fixed time
- scheduled rest breaks or pause allowance
- alternate start/window where approved
- screen-reader and keyboard requirements
- increased text/contrast preferences
- reduced-distraction/venue reference
- approved assistant/invigilator reference
- permitted format or input adaptation

Calculate candidate-specific deadlines using exact documented precedence. Show the candidate their effective duration/window before start without exposing accommodation details to peers or unauthorized staff.

Meet WCAG 2.2 AA intent: keyboard-only completion, semantic question/group labels, focus management, accessible timer announcements without distraction, non-color-only status, zoom/reflow, reduced motion, screen-reader compatible math/media alternatives, localized/RTL layout, and accessible error recovery.

Test accommodations on web, Android, and iOS. A feature that cannot be delivered accessibly must block incompatible scheduling or route the candidate through an approved alternative—not degrade silently.

## 8. Attempt admission and secure start

Implement start flow:

1. Authenticate and resolve tenant/role/candidate.
2. Verify schedule, eligibility, attempt limit, hold/cancellation, supported client/runtime, and optional venue/device policy.
3. Display instructions, privacy notice, declaration, effective timing, allowed resources, and support path.
4. Record required acknowledgement/consent without coercive dark patterns.
5. Atomically create or return the idempotent attempt and deterministic form.
6. Return server time, authoritative deadline, heartbeat/autosave configuration, scoped attempt token, and signed start receipt.

Use short-lived, audience-bound attempt credentials separate from ordinary session tokens. Prevent horizontal access, replay across attempts/devices, enumeration, and cross-tenant use. Step-up authentication may be configured for high-stakes starts.

Concurrent-session policy must be explicit: deny, transfer through a governed handoff, or permit read-only status. Never let two writers silently overwrite one attempt.

## 9. Authoritative timing

Maintain server-authoritative:

- scheduled window
- attempt started/last-active/paused/resumed/submitted timestamps
- effective allowed duration
- accumulated pause/break allowance
- deadline and hard-close precedence
- grace/late status

Clients display a monotonic countdown synchronized from server time and periodically correct drift without moving backwards confusingly. Client clock manipulation cannot extend time.

Define behavior for clock skew, daylight-saving/timezone changes, server failover, delayed packets, offline intervals, app backgrounding, device sleep, and network reconnect. Provide warning thresholds and accessible announcements.

## 10. Response revisions and autosave

Model an answer as ordered immutable revisions or an equivalent append-safe/versioned design. Each save includes:

- attempt and question instance
- client operation ID
- based-on server revision/ETag
- response payload validated against the pinned schema
- client-captured time as diagnostic only
- local sequence and optional encrypted offline-queue reference

Each acknowledgement returns authoritative revision, server time, durable status, semantic payload hash, and receipt. Duplicate operation IDs return the original result. Out-of-order/conflicting writes cannot silently lose a newer response.

Use debounced and periodic autosave plus explicit save on navigation, backgrounding, and submit preparation. Show per-answer and overall save state: saved, saving, offline queued, conflict, or failed. Do not claim saved until acknowledged.

Protect PostgreSQL/Aurora from high-frequency write storms. Document and implement a bounded strategy such as:

- client coalescing/debounce
- idempotent batched save endpoint
- short-lived runtime buffer/cache only when durability semantics are explicit
- partitioned append/revision storage
- write-behind only after a durable acknowledgement boundary
- backpressure, bounded queues, retry jitter, and admission control
- attempt-level compaction/materialized latest-answer projection

Never acknowledge data that exists only in an unreplicated process memory buffer. Define RPO/RTO and failure semantics.

## 11. Offline interruption and resume

Online assessment is network-resilient, not silently offline-authoritative. Support:

- encrypted local cache of the currently rendered form subset and acknowledged responses
- bounded encrypted queue for unsent response operations
- reconnect with token refresh and server reconciliation
- deterministic replay using operation IDs
- conflict presentation/resolution according to server revisions
- resume on same or authorized replacement device
- explicit connectivity, last-acknowledged-save, deadline, and queue state

The server clock continues unless an approved pause policy says otherwise. A client cannot grant itself more time. At hard close, reconcile only operations accepted under documented server receipt/arrival rules.

Define behavior when a candidate remains disconnected at deadline. Never display “submitted” until the server returns a submission receipt. Preserve recoverable local evidence long enough for a support case under retention policy, then securely erase it.

## 12. Final, timeout, and forced submission

Implement:

- candidate review summary without answer-key leakage
- warnings for unanswered, marked, invalid, uploading, unsaved, or conflicted responses
- explicit declaration/confirmation appropriate to stakes
- idempotent final submission using expected attempt version and all pending operation IDs
- atomic closure against further candidate edits
- immutable response snapshot and semantic hash
- authoritative submission time/status
- signed/verifiable submission receipt with non-sensitive reference
- timeout submission initiated server-side
- invigilator/authorized forced submission with reason and SoD where configured
- administrative recovery for platform failure through governed workflow, never direct row edits

Resolve races among autosave, manual submit, timeout, cancellation, and forced submit deterministically. A repeated submit returns the same receipt. Late/grace policy must be configured and visible; never silently accept or discard work.

## 13. File/media response handling

When uploads are allowed:

- issue attempt/question-scoped upload grants
- restrict MIME/type/count/size and reject misleading extensions
- use multipart/resumable upload where justified
- checksum, malware scan, content-disposition, object encryption, quarantine, and retention
- record pending/uploaded/scanning/accepted/rejected status
- require explicit submission policy for incomplete scans at deadline
- prevent object-key, bucket, signed-URL, EXIF, filename, or metadata leakage

Uploaded content is evidence, not executable input. Render only through safe preview/download controls. Mobile supports camera/document selection only with explicit permission, preview, compression disclosure, retry, and authoritative upload receipt.

## 14. Integrity telemetry and privacy

Create a transparent, configurable integrity-event boundary for:

- session start/end/transfer
- connectivity loss/recovery
- app/browser background/foreground or focus changes where reliably available
- full-screen exit only when policy requires it
- copy/paste/context-menu attempts only when technically/policy appropriate
- navigation/answer timing
- repeated authentication/device-session changes
- invigilator annotations
- proctoring-provider references

Classify reliability and client trust for every event. Client signals are tamperable and cannot alone establish misconduct. Do not implement covert surveillance, continuous location, contact access, unrelated device scanning, hidden microphone/camera recording, biometric inference, emotion detection, gaze-based guilt scoring, or invasive lockdown behavior.

Before any optional camera/microphone/screen/proctoring use, require institution policy, explicit notice/consent or other documented lawful basis, accessible alternative/accommodation path, device permission at point of use, retention, reviewer authorization, and provider agreement. Collect the minimum necessary.

Implement privacy-safe retention/erasure/legal-hold rules, access logging, candidate access/appeal process, and small-population protection. Do not place raw telemetry, IP addresses, device fingerprints, media, free text, or candidate identity in outbox events or general logs.

## 15. Proctoring provider port

Define a provider-neutral port for optional future/real integrations:

- capability discovery and policy compatibility
- session create/token exchange
- candidate launch/status
- webhook verification, replay protection, and idempotency
- media/evidence reference and retention metadata
- provider incident/outage status
- human-review flag/reference
- deletion/export request acknowledgement

Use an explicit `NOT_CONFIGURED`, `UNAVAILABLE`, or `PENDING_PROVIDER` state. Never fabricate “proctored,” “verified,” “no cheating,” or risk results. Local development uses a clearly labeled contract stub that cannot produce production-valid evidence.

Provider risk/flags enter a human review queue and never automatically fail, punish, or accuse a candidate.

## 16. Objective and numeric scoring

Implement deterministic, versioned server-side scoring for approved types:

- exact match and approved normalization
- single/multiple select
- negative and partial marking
- numeric tolerance with absolute/relative bounds and unit policy
- ordering/matching
- optional best-N/section rules
- unattempted/invalid/withdrawn treatment

Use exact decimal arithmetic and explicit rounding stage/mode/scale. Pin answer key, scoring schema, delivery form, engine version, and response snapshot.

Persist operands, intermediate values, rule paths, awarded marks, maximum marks, reason codes, warnings, and semantic hashes. Regrading creates a new scoring run linked to the old one and never mutates the prior audit record.

Do not auto-score subjective responses with generative AI. AI suggestions, if ever introduced later, require a separate approved provider/policy and human responsibility; they are outside this prompt.

## 17. Subjective and rubric grading

Create grading tasks for short/long text, file responses, and other manual items. Support:

- assignment by section/question/candidate bundle
- anonymized candidate display where configured
- pinned Prompt 10 rubric and criterion definitions
- criterion-level marks, comments, annotations/reference, and overall feedback
- autosaved draft grading and explicit finalize receipt
- marker workload, progress, reassignment, absence, and conflict handling
- first/second marker, blind double marking, variance threshold, adjudication, and moderation when configured
- return-for-review without changing candidate submission
- authorized mark override only through Prompt 15 reasoned workflow

Prevent graders from seeing answer keys, identity, other graders' marks, cohort distributions, or prior attempts unless policy/phase permits them. Finalized grading is immutable; changes create a governed correction version.

## 18. Review, moderation, and grievance boundary

Provide assessment owner/examiner/reviewer views for:

- completion and submission status
- auto-score validation warnings
- subjective grading completeness
- marker variance and moderation queue
- integrity-event cases requiring human review
- technical incident/affected-attempt queue
- proposed regrade and question invalidation impact simulation
- approval readiness and release blockers

Question invalidation, bonus marks, scaling, moderation, correction, malpractice decisions, and official mark freeze must use Prompt 15 governance when the assessment contributes official results. Prompt 18 owns formal post-publication grievances/revaluation. This prompt supplies immutable evidence and references; it does not bypass those domains.

## 19. Result release controls

Implement versioned release policy for:

- score only
- section/topic/CO summary
- per-question awarded marks
- candidate response
- correct answer
- explanation/solution
- rubric/marker feedback
- rank/percentile/cohort statistics
- release start/end and delayed release until all attempts close
- practice immediate feedback where explicitly approved

Release requires scoring/grading completion, moderation status, authorized approval, population/privacy checks, and no blocking incident. Use Prompt 16 for official result publication references.

Candidates see only their permitted results. Faculty access follows course/exam authorization. Guardian access is policy-controlled and normally limited to released summaries for eligible dependent relationships; guardians never see secure questions, answer keys, raw integrity telemetry, or private marker notes.

Revocation/supersession must show a truthful status and link to the replacement; never silently disappear a previously released result.

## 20. Item analysis

Create versioned analytics after the configured close/release threshold:

- response count and attempt rate
- facility/difficulty index
- discrimination using a documented configurable method
- point-biserial/correlation where statistically appropriate
- distractor selection frequency/effectiveness
- unanswered/invalid frequency
- average/median response time and distribution
- speed versus accuracy
- marks distribution and score bands
- topic, Bloom level, CO, and outcome performance
- section and form comparability
- reliability statistic only when method assumptions and minimum sample are met
- question exposure/usage history without leaking secure content

Pin assessment/question/scoring/population versions. Show formulas, sample sizes, exclusions, confidence/limitations, and `INSUFFICIENT_DATA` rather than misleading numbers. Avoid ranking individual faculty or students from item statistics.

Flag potentially ambiguous, too easy/hard, non-discriminating, negative-discrimination, weak-distractor, slow, or anomalous items for human review. A flag never edits, retires, or penalizes automatically; feed approved findings back to Prompt 10 through a versioned review reference.

## 21. Rank, percentile, normalization, and cohort comparison

When institution policy enables them, implement exact and documented:

- dense/competition/ordinal rank selection
- tie handling
- percentile/percentile-rank definition
- cohort eligibility and exclusion rules
- section/form comparison
- raw versus normalized score
- configured normalization/equating strategy only when validated
- category/branch/section comparison only with authorization and minimum-group thresholds

Never invent normalization to make distributions look desirable. No silent curve, weight change, score cap, or rank population change. Official transformations must integrate Prompt 15/16 approval.

Every view/export states population, method, ties, exclusions, assessment/scoring version, and as-of time. Protect small groups and sensitive category attributes.

## 22. Dashboards and operational analytics

Provide role-shaped, accessible views for:

- upcoming/open/closing schedules
- eligible, started, active, disconnected, submitted, timed-out, and support-required counts
- autosave latency/error/backlog and submission receipt health
- grading/moderation progress and aging
- technical incidents and affected attempts
- score/question/topic/CO/Bloom distributions
- item quality flags and review decisions
- attempt rate, completion, time use, and cohort trends
- released-result access and support/grievance references

Near-real-time operations must not expose candidate answers or answer keys. Metrics use bounded cardinality and masked identifiers. Every academic chart has an accessible table, numerator/denominator, filters, source/version, as-of time, and honest incomplete/late-data labels.

## 23. Technical incident and candidate support workflow

Implement support cases for authentication failure, unsupported client, lost connectivity, autosave conflict, upload problem, device loss, timer dispute, accidental submission, platform outage, and accessibility issue.

Record candidate-visible case reference, attempt/schedule reference, category, reported/observed times, non-sensitive diagnostics, affected operations/receipts, evidence access classification, owner, SLA, decisions, and status. Support staff cannot view answers/keys by default or extend/reopen attempts directly.

Authorized remedies—resume grant, replacement-device handoff, controlled extra time, reopen, reschedule, void attempt, or accept late operation—require policy, reason, evidence, maker-checker/SoD where configured, exact before/after timing, audit, and candidate notification. Preserve the original attempt and decision lineage.

## 24. Independently scalable runtime architecture

Keep core control-plane ownership in the modular monolith while creating explicit extraction-ready boundaries for high-variance delivery traffic:

- control API for authoring references, approval, schedules, policy, grading, release, and analytics
- runtime API/worker boundary for start, form delivery, saves, heartbeat, resume, and submit
- background workers for timeout, scoring, grading task creation, analytics, receipts, and notifications
- transactional outbox/inbox and idempotent consumers
- separate autoscaling/resource policy and failure isolation

Do not introduce Kafka merely for fashion. Use PostgreSQL queue/outbox and AWS-managed primitives already approved by the architecture; add another broker only through an ADR with measured need.

For AWS, document Aurora/PostgreSQL connection protection, RDS Proxy if selected, ECS task autoscaling, ALB/API limits, ElastiCache only if durability semantics are safe, S3 for permitted media/evidence, KMS, WAF/rate limits, CloudWatch/OpenTelemetry, multi-AZ behavior, backup/restore, and cost/cardinality controls.

Define SLOs for start, save acknowledgement, question navigation payload, resume, submit, scoring queue, availability, durability, and recovery. Include graceful degradation and admission control without disadvantaging already-active candidates.

## 25. Database design and PostgreSQL RLS

Add normalized tables, names adapted to repository conventions, for:

- assessment delivery version/manifest/validation
- section and pinned question instance/form
- schedule and eligible-candidate snapshot/delta
- accommodation application snapshot
- attempt/session/handoff/pause/deadline
- response current projection and immutable revision/operation receipt
- file-response reference and scan state
- heartbeat/connectivity summary
- submission and receipt
- integrity event/reference/review case
- technical incident/remedy
- scoring run/question score/trace
- grading task/rubric criterion/marker version/adjudication
- release policy/release record/access
- analytic run/population/item statistic/distractor/cohort statistic
- provider connection/webhook receipt reference

Every tenant-owned table has non-null tenant/institution scope, foreign-key-consistent scope where practical, RLS enabled and forced, least-privilege policies, indexes for policy predicates, and negative isolation tests. Avoid globally unique lookup paths that bypass tenant predicates.

Use constraints for status/type enums or validated lookup tables, exact numeric precision, logical uniqueness, immutable receipt IDs, version lineage, and idempotency. Partition high-volume response revisions/integrity events only after documenting retention, RLS, indexes, migration/rollback, and operational maintenance.

Flyway migrations are forward-only, restart-safe where appropriate, compatible with rolling deployment, and include backfill/validation strategy. Never edit an applied migration.

## 26. APIs, contracts, permissions, and events

Add versioned OpenAPI endpoints for:

- delivery assemble/validate/review/approve/version/compare
- schedule create/review/publish/reschedule/cancel/audience/eligibility
- candidate preflight/instructions/start/status/form
- response batch-save/reconcile/history-authorized
- heartbeat/resume/device-handoff/pause
- upload grant/status/attach
- review-summary/submit/receipt
- timeout/forced-submit/support incident/remedy
- integrity event intake/review/decision reference
- scoring run/regrade/trace
- grading queue/claim/draft/finalize/reassign/second-mark/adjudicate
- release preview/approve/publish/revoke/candidate-view
- item/cohort analytic run/status/result/export/review disposition
- proctoring-provider session/webhook/status/deletion reference
- operational dashboards/health

Use role-shaped DTOs. Candidate delivery DTOs must be constructed from safe allowlists and never serialize answer keys, rubrics hidden until release, pool metadata, scoring internals, seed material, other candidates, staff notes, or provider secrets.

Use bounded pagination, payload/file limits, RFC 7807, correlation IDs, optimistic versions, `Idempotency-Key`, server-time headers/fields, rate limits, anti-enumeration responses, and generated web/mobile clients.

Define least-privilege permissions for assessment maker/checker/approver, schedule manager, eligibility viewer, accommodation apply-only, candidate attempt, invigilator monitor/annotate, support case, remedy approve, integrity review, scorer, first/second marker, adjudicator/moderator, result release, analytics view/export, audit, provider administration, and platform health.

Enforce SoD for approval, sensitive remedy, forced submit, misconduct decision reference, regrade, adjudication, and release where configured. Platform operations see health/latency/queues and masked attempt references only—not questions, answers, marks, accommodations, identity, telemetry content, or provider media.

Events carry stable references and minimal state. Never include question/answer text, answer keys, marks before release, seed material, accommodation details, raw telemetry, IP/device data, uploaded content, object keys, signed URLs, or provider secrets.

## 27. React web interfaces

Implement accessible responsive web interfaces for:

- delivery assembly, sections, pool/form rules, instructions, scoring/release policies, validation, version comparison, review, and approval
- schedule/audience/eligibility/accommodation application and concurrency readiness
- candidate preflight, attempt workspace, palette, timer, autosave state, offline/reconnect state, upload, review, submit, and receipt
- invigilator operations with counts/status and authorized annotations, without default answer access
- grading queue, anonymous response, rubric, draft/finalize, second marking, variance, and adjudication
- incident/support/remedy workbench
- integrity-event human-review queue with reliability/privacy context
- release preview/approval and candidate released-result view
- item analysis, distractors, timing, topic/Bloom/CO, cohort, rank/percentile/normalization, and accessible exports
- runtime health and assessment operations with masked identifiers

The attempt UI must minimize accidental data loss, clearly distinguish local/queued/acknowledged state, preserve focus during saves, avoid surprise navigation, and work at high zoom and low bandwidth. Use no dark patterns for submission, consent, or answer changes.

## 28. React Native Android/iOS interfaces for every role

Implement true React Native interfaces using shared generated contracts and design tokens, not a WebView wrapper. Update `docs/mobile/ROLE_FEATURE_MATRIX.md` with exact supported, web-first, read-only, and denied capabilities.

### Student/Candidate

- upcoming/open assessments, eligibility status, instructions, privacy notice, supported-device preflight, effective time/accommodations, and reminders
- secure start, native accessible question rendering, palette/navigation, timer, mark-for-review, media/reference view, response entry, upload/camera/document attachment where approved
- debounced autosave, encrypted local acknowledged-state cache, bounded offline queue, connectivity/reconciliation/conflict state, resume/device handoff, and background/foreground handling
- review, warnings, explicit submit, timeout status, immutable receipt, released score/feedback/analytics permitted by policy, and support/grievance links
- prevent screenshots only where OS capability and explicit institutional policy justify it; never claim prevention is complete

### Faculty/Assessment Author/Course Coordinator

- draft/preview non-sensitive delivery structure, validation findings, schedule and readiness summary
- question/pool/blueprint references from Prompt 10 without exposing answer keys outside authorization
- attempt/completion summary, grading queue, rubric grading, comments, finalize receipt, item/topic/CO analytics, and item-review disposition
- complex pool editing, secret-key management, provider setup, and final high-stakes configuration remain web-first; mobile supports review/approval only with step-up authentication where authorized

### Examiner/First Marker/Second Marker/Adjudicator/Moderator

- assigned grading queue, permitted anonymized response/media, pinned rubric, criterion marks/comments, autosaved draft, finalize, variance, second-mark, and adjudication workflow
- no unauthorized identity, other-marker result, cohort distribution, answer key, or secure content disclosure
- large document precision annotation may be web-first, but mobile must support status, rubric grading, comments, approval/return, and receipt

### Invigilator

- assigned schedule/room/remote-session roster, authorized candidate check-in reference, started/active/disconnected/submitted/timed-out counts, support alerts, annotations, and escalation
- authorized pause/resume/request-force-submit workflow with reason and receipt; no direct timer/database edits
- no default view of candidate answers, marks, accommodations, or provider media beyond explicit duty

### HOD/Program Coordinator/Exam Cell/Assessment Coordinator

- schedule, eligibility, accommodation-application status without diagnoses, readiness/concurrency, live operations, incidents, grading/moderation progress, release blockers, and analytics
- review/approve/reschedule/cancel/remedy/release actions with step-up authentication, SoD, reason, and receipt where authorized
- detailed form/pool construction, bulk imports, and sensitive rule configuration may be web-first

### Dean/Principal/Controller of Examinations/Academic Council

- institution/program readiness, live risk/incident summary, completion/grading/release status, cohort/item/outcome analytics, and decision queues
- approval, controlled remedy, moderation/release governance, and audit summary with step-up authentication
- no operational answer access unless separately authorized for a documented case

### OBE/IQAC/Quality/Accreditation Role

- released aggregate topic/Bloom/CO/item-quality and participation evidence according to Prompt 19 privacy thresholds
- version/population/exclusion/as-of details and governed evidence references
- no candidate response, secure question, answer key, raw telemetry, or unpublished mark access by default

### Technical Support/Help Desk

- candidate-reported preflight/connectivity/save/upload/submission cases, masked diagnostics, receipts, SLA, approved scripts, escalation, and candidate communications
- cannot see answers/keys/marks or grant time/reopen attempts; remedies require authorized workflow

### Integrity Reviewer/Authorized Malpractice Committee

- assigned cases, event reliability/source, policy/notice version, candidate response/appeal, invigilator annotations, provider references, decision workflow, and audit
- media access only through explicit authorization; no automated guilt/fail action

### Guardian

- only institution-permitted upcoming reminders and released dependent summary for a verified active relationship
- no attempt access, answer submission, secure questions, answer keys, raw marks before release, rank population detail, integrity data, accommodations, or staff notes

### Tenant Administrator

- enablement/policy status, roles/permissions, safe defaults, retention, provider-configuration state, notification template status, and aggregate adoption/health
- cannot view secure questions, answer keys, candidate responses, marks, accommodations, telemetry, or provider media merely by being administrator
- sensitive secrets, retention/legal policy authoring, and bulk configuration remain web-first; mobile supports status and authorized approval

### Platform Operations

- tenant-agnostic service availability, latency, saturation, autosave/submission error rates, queue/backlog, provider/outbox/webhook health, deployment version, and masked incident correlation
- no academic content, identity, attempt answers, marks, accommodation, integrity details, or provider evidence

For all roles implement biometric re-entry only as a local convenience after server authentication; encrypted platform-backed token storage; no secret/answer-key persistence; offline queue bounds/expiry; push notifications with generic lock-screen text; deep links that reauthorize; remote logout; rooted/jailbroken-device risk policy without automatic discrimination; permission-at-point-of-use for camera/microphone/files; localization/RTL; Dynamic Type/font scaling; screen reader; keyboard/switch support where applicable; visible focus; non-color-only states; and authoritative server receipts for consequential actions.

## 29. Security and threat model

Update the threat model for:

- answer-key or unused-pool leakage
- IDOR/cross-tenant/cross-candidate access
- form/seed prediction and replay
- token theft/session sharing/concurrent writers
- client tampering and forged clocks/events/scores
- save/submit races, duplicate/reordered requests, and data loss
- malicious uploads and stored XSS/content injection
- scraping/question harvesting and abusive automation
- logs/traces/analytics/cache/notification leakage
- insider/privileged misuse
- provider webhook spoofing and supply-chain compromise
- denial of service/write storm near start/deadline
- mobile reverse engineering, insecure storage, screenshots, backups, and deep-link hijack
- small-cohort analytics re-identification

Apply least privilege, RLS, object authorization, short-lived scoped tokens, step-up authentication, encryption, KMS/Secrets Manager, secure headers/CSP, validation/encoding, rate limiting, WAF/bot controls where justified, webhook signatures, dependency/image scanning, audit, anomaly alerts, and break-glass controls.

Do not rely on disabled right-click, obscurity, browser JavaScript, client encryption keys, or fullscreen alone as security. Document residual risk honestly.

## 30. Reliability, observability, and operations

Instrument OpenTelemetry traces and low-cardinality metrics for:

- preflight/start/form-generation latency and failures
- save batch size/latency/conflicts/duplicates/durability failures
- active attempts and reconnect/resume
- deadline/timeout drift and worker lag
- submit latency/races/receipt generation
- upload/scan status
- scoring/grading/analytics queues and failures
- DB connections/locks/partition/index health
- provider webhook/backlog/outage
- mobile crash-free attempts and client-version compatibility

Never log question/answer content, keys, marks before permitted release, tokens, seed material, accommodation details, raw device/IP data, uploads, or signed URLs. Add dashboards, alerts, runbooks, synthetic checks with non-production questions, capacity model, incident communication, backup/restore test, disaster-recovery exercise, and assessment-window change/freeze procedure.

Use feature flags and compatibility gates for runtime releases. An active assessment must not be broken by a rolling deployment. Define minimum supported web/mobile versions and safe forced-upgrade behavior before an attempt starts, never during an active attempt unless security requires a governed emergency response.

## 31. Tests

Add unit, property, contract, integration, RLS, end-to-end, mobile, chaos, and representative load tests.

At minimum test:

- delivery snapshot pinning and answer-key exclusion from every candidate DTO/cache/log/event
- lifecycle, approval immutability, reschedule/cancel/version impact
- satisfiable/unsatisfiable pools and deterministic retry form generation
- section/navigation/optional-question/scoring rule combinations
- exact negative/partial/numeric-tolerance/best-N scoring and rounding boundaries
- eligibility cutoff/delta and accommodation precedence/extra-time deadlines
- server clock, client skew, timezone/DST, failover, pause, grace, and hard close
- start idempotency, attempt limits, token scope, replay, concurrent sessions, and handoff
- autosave debounce/batch, duplicate operation, out-of-order revision, conflict, crash, retry, backpressure, and durable acknowledgement
- network interruption, app kill/restart, device sleep/background, offline queue replay, replacement device, and deadline while offline
- save-versus-submit, submit-versus-timeout, forced-submit, cancel, and late-operation races
- upload resume/checksum/type/size/malware/quarantine/deadline behavior
- objective scoring trace, regrade immutability, rubric grading, double marking, variance, and adjudication
- release authorization, blocker, supersession, answer/explanation timing, and guardian restrictions
- integrity-event reliability, consent/policy, retention, reviewer authorization, appeal, and no auto-punishment
- provider not-configured/outage/webhook signature/replay/idempotency/deletion acknowledgement
- item difficulty/discrimination/distractor/timing formulas with golden datasets and insufficient sample
- rank/tie/percentile/normalization/cohort/exclusion golden cases
- every web/mobile role permission and intentional denial
- Android/iOS encrypted storage, generic push, deep-link reauthorization, permissions, accessibility, offline bounds, and receipt behavior
- cross-tenant/cross-candidate/cross-course/cross-role IDOR and RLS on every tenant table
- canary leakage searches proving no keys/answers/seeds/tokens/marks/private telemetry in DTOs, logs, traces, events, notifications, exports, or client bundles
- rolling deployment compatibility and worker retry/recovery

Build a representative concurrency/load profile covering staggered login, synchronized start, navigation, sustained autosaves, reconnect storm, media upload, synchronized deadline, scoring, and analytics. State assumptions, dataset, candidate count, request mix, infrastructure, p50/p95/p99, error/conflict rate, DB connections/CPU/IO/locks, queue lag, durability evidence, cost estimate, bottlenecks, and pass/fail thresholds. Do not claim production scale from a trivial local run.

Required end-to-end journeys include:

1. Faculty assembles an approved non-coding assessment from Prompt 10 content, validates it, and checker approves it.
2. Coordinator schedules it for an eligible cohort and applies an approved extra-time accommodation without exposing diagnosis.
3. Two candidates receive deterministic distinct forms, autosave through interruption, resume, submit, and receive authoritative receipts.
4. One candidate times out while disconnected and receives truthful reconciliation/support status.
5. Objective items score deterministically; subjective items complete first/second marking and adjudication.
6. Authorized reviewers resolve a technical/integrity case without automated punishment or hidden evidence.
7. Release approval publishes only configured results/feedback.
8. Faculty reviews versioned item/topic/Bloom/CO and cohort analytics with population and limitations.
9. Cross-tenant and cross-candidate attempts fail at API and RLS layers.
10. Web, Android, and iOS candidates complete equivalent supported journeys with accessibility checks.

Run all repository-standard checks plus exact relevant commands for backend compile/test/static analysis, frontend typecheck/lint/unit/E2E/accessibility, Android/iOS tests, OpenAPI generation/diff, Flyway validation, RLS/canary leakage, dependency/container/IaC scans, and load tests. Report commands, exit codes, skipped checks, environment limitations, and evidence. Never state a check passed if it was not run successfully.

## 32. Documentation and completion gate

Update:

- OpenAPI and generated clients
- data dictionary and status/permission catalogues
- runtime architecture and extraction ADR
- durability/autosave/receipt semantic specification
- authoritative timing and race-resolution specification
- scoring/rank/percentile/normalization/item-analysis formula specification
- online-assessment threat model
- privacy, consent, telemetry, proctoring, retention, and candidate appeal guide
- accessibility/accommodation guide
- assessment author/coordinator/invigilator/grader/moderator/student/support/admin guides
- web and native-mobile role-feature matrix
- load/capacity/cost plan and results
- SLOs, dashboards, alerts, incident, provider outage, assessment-window, backup/restore, and DR runbooks
- local/AWS configuration and secret setup without real secrets
- ADRs for runtime scaling, write-storm protection, response revisions, deterministic form generation, and optional provider boundary

Completion requires all of the following:

1. An approved non-coding assessment can be assembled from pinned Prompt 10 content, validated, approved, scheduled, and versioned without answer-key leakage.
2. Eligibility, attempt limits, accommodations, windows, authoritative timing, deterministic forms, and navigation rules behave exactly as configured.
3. Web, Android, and iOS candidates can start, answer, autosave, survive representative interruption, resume, review, submit, and obtain an authoritative receipt.
4. Duplicate/out-of-order saves and save/submit/timeout/concurrent-session races are deterministic, idempotent, durable, and tested.
5. Objective/numeric scoring is exact and reproducible; subjective/rubric grading, double marking, variance, adjudication, and corrections preserve immutable history.
6. Integrity telemetry is minimal, transparent, privacy-governed, reliability-labeled, human-reviewed, and never an automatic misconduct decision.
7. Proctoring is a truthful provider boundary with no fake status or invasive capability enabled without policy/notice/consent and an accessibility path.
8. Release controls prevent premature question/key/mark/feedback disclosure and integrate official outcomes with Prompt 15/16 governance.
9. Item, topic, Bloom, CO, timing, rank, percentile, normalization, and cohort analytics pin formulas, versions, populations, exclusions, limitations, and privacy thresholds.
10. All relevant roles have complete web/native-mobile workflows or an explicit justified web-first/read-only/denied entry in the role matrix.
11. Every tenant table has forced RLS and negative tenant/candidate/role isolation tests; security and canary leakage tests pass.
12. Representative concurrency tests cover synchronized start, autosave/reconnect storms, deadline submissions, scoring, and analytics with documented thresholds and results.
13. OpenAPI/generated clients, migrations, tests, accessibility, observability, docs, ADRs, guides, and runbooks pass every environment-available check.
14. Prompt 21 executable programming/SQL workspaces, sandboxing, compilers, runners, hidden code tests, and similarity processing were not implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, delivery/scheduling/eligibility/accommodations/forms/timing/autosave/resume/submission/scoring/grading/release/integrity/provider/item/cohort analytics, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency/durability, representative load and all exact test commands/results/exit status, docs/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(assessment): implement reliable online delivery and analytics`

Stop. Do not begin Prompt 21 or implement programming workspaces and secure code execution.
```

---

## Review Checklist Before Prompt 21

- Approved delivery snapshots pin every question, rule, key, renderer, and runtime version.
- Candidate DTOs, logs, events, caches, exports, and client bundles contain no premature answers, keys, pool secrets, or seed material.
- Server time, deterministic forms, accommodations, autosave durability, resume, races, and receipts are tested.
- Interruption and deadline behavior is truthful on web, Android, and iOS.
- Objective and subjective grading preserve exact traces and immutable versions.
- Integrity/proctoring data is minimal, consent/policy governed, human reviewed, and never automatic punishment.
- Release and official-mark changes respect Prompt 15/16 governance.
- Analytics expose formulas, populations, exclusions, versions, limitations, and privacy thresholds.
- Every relevant role has a native-mobile workflow or explicit intentional restriction.
- Every tenant table has forced RLS and negative isolation tests.
- Representative concurrency results meet documented thresholds or the completion gate fails.
- No Prompt 21 executable programming or SQL sandbox functionality was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 21 until these conditions pass.
