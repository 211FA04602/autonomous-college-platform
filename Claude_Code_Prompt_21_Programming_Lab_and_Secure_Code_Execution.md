# Claude Code Prompt 21

## Programming Lab and Secure Code Execution

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3 control plane, isolated language runners, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–20 passed, were reviewed, and were committed  
**Scope:** Programming-lab courses and batches, problem authoring, student workspaces, practice/assignment/contest/exam delivery, compile/run/test/submit, isolated execution for C/C++/Java/Python/JavaScript/TypeScript/SQL, grading, lab records and viva, similarity-review boundary, competency analytics, and role-specific web/native-mobile interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially programming labs, assignments, online examinations, placement readiness, academic projects, lab records, viva, outcomes, accessibility, privacy, mobile, and AWS requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, secure-coding standards, threat models, data-classification policy, and repository conventions.
3. Inspect Prompt 03 course/curriculum/CO contracts; Prompt 05/06 student/enrollment/course-offering contracts; Prompt 07 lab timetable/room/faculty allocation; Prompt 08 attendance; Prompt 09 LMS/assignment/course-file contracts; Prompt 10 question/problem/rubric/hidden-secret authoring contracts; Prompt 12–16 examination, eligibility, grading, moderation, and result contracts; Prompt 19 outcome evidence; Prompt 20 attempt/timing/autosave/submission/integrity/analytics contracts; and Prompt 02 workflow/document/audit/outbox foundations.
4. Inspect identity/session/device controls, authorization/SoD, PostgreSQL RLS, OpenAPI/generated clients, object storage, notification/provider ports, jobs/observability, local container tooling, CI/container scanning, infrastructure conventions, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, run untrusted code inside the Spring Boot process/control-plane container/host, mount the Docker socket into a runner, expose cloud metadata/host paths/credentials/hidden tests, allow network by default, log student source code, claim a container alone is an absolute security boundary, auto-punish similarity, deploy the production execution plane in this prompt, or begin Prompt 22 placement/training functionality.

Implement bounded `programming-lab` control-plane and `code-execution` plane contracts. The control plane owns courses/batches, problems, workspace metadata, snapshots, attempt/submission references, lab records, grading, similarity-review cases, and analytics. The execution plane owns short-lived execution jobs and disposable sandboxes only. It must not own academic enrollment, authoritative marks/results, or long-lived student identity data.

## 1. Domain and security invariants

Enforce:

- every lab, workspace, problem, attempt, submission, grade, record, and analytic is tenant/institution scoped and protected by PostgreSQL RLS
- only approved immutable problem/test/toolchain versions can be used in official assignments, contests, or exams
- all execution is untrusted and occurs outside the control-plane process in a disposable sandbox
- every job pins source snapshot, problem/test bundle, toolchain image digest, limits, policy, runner protocol, and scoring-engine version
- default sandbox access is deny: no network, host mounts, container runtime socket, cloud metadata, control-plane database, secrets, or other jobs
- runners receive opaque scoped job identities, not general platform/user credentials
- hidden tests, reference solutions, expected outputs, and secret scoring data never enter candidate APIs, clients, logs, events, or downloadable artifacts
- submitted exam source is immutable; corrections/overrides create versioned, reasoned workflow records
- execution results are reproducible within declared toolchain/platform limitations and retain exact provenance
- time, memory, process, file, output, and job limits are enforced outside candidate code
- cancellation/timeout/worker loss always leads to bounded cleanup and a truthful terminal/recoverable state
- SQL environments are isolated and reset from a pinned baseline between runs/attempts
- similarity signals create human-review cases and never automatically accuse, fail, or discipline a student
- mobile official actions require authoritative server receipts; mobile devices never execute untrusted submissions locally for official scoring

Write a glossary covering workspace, snapshot, problem, starter bundle, public/hidden test, run, submission, execution job, sandbox, toolchain, image digest, verdict, checker, rubric, similarity signal, lab record, viva, competency, and readiness.

## 2. Programming laboratory structure

Model programming lab offerings by reference to Prompt 03/06/07:

- course offering, academic period, program/branch, regulation, year/semester, section/batch
- lab room/timetable/faculty/instructor/assistant references
- supported languages/toolchains and approved versions
- experiment sequence, planned dates, prerequisites, CO/Bloom/topic mappings
- attendance linkage and late/makeup policy
- submission/evaluation/record/viva policy
- practice, assignment, graded lab, contest, mock interview, and exam usage
- capacity/concurrency and runner-pool policy

Do not create competing student, course, enrollment, timetable, attendance, or outcome masters. Consume authoritative references and source versions.

Implement draft, review, approved, active, completed, archived, cancelled, and superseded lifecycle with maker-checker approval where configured. Activated policies are versioned and changes identify affected future/in-progress work.

## 3. Language and toolchain catalogue

Support the first release languages:

- C
- C++
- Java
- Python
- JavaScript
- TypeScript
- SQL with isolated/resettable PostgreSQL schemas or databases

Define versioned toolchain profiles with:

- stable language/profile ID and display name
- compiler/interpreter/runtime and exact version
- container image repository and immutable digest
- compile/run commands expressed through a validated template/argument model, never shell-concatenated candidate input
- source extensions, entrypoint rules, encoding, and maximum file count/size
- permitted standard libraries/dependencies
- compilation/execution/test time, memory, CPU, process, file, and output limits
- environment variables allowlist containing no secrets
- sandbox policy and network state
- determinism/timezone/locale settings
- image SBOM, vulnerability/license scan, signature/attestation, approval, effective dates, and retirement

Do not support arbitrary user-supplied images, package installation, build scripts, compiler flags, environment variables, or commands in the first release. Additional dependencies require an approved prebuilt profile.

Pin production images by digest, sign/verify them, scan before approval and continuously thereafter, and block critical-risk profiles according to policy. Existing attempts remain auditable when a toolchain is retired.

## 4. Problem and exercise authoring

Extend/reference Prompt 10 rather than create a competing question bank. Implement programming-problem versions with:

- title, statement, input/output format, constraints, examples, notes, language/localization, difficulty, topic, skill, CO, Bloom level, and source/license/provenance
- allowed languages/toolchains
- starter files and read-only support assets
- function/class/full-program/SQL-query mode
- public examples/tests and hidden test bundle references
- time/memory/process/output/file limits, per-language overrides, and maximum attempts where applicable
- exact/output-token/special/custom-checker strategy from an allowlisted signed checker catalogue
- test groups, weights, dependencies, subtasks, partial scoring, stop/continue policy, and feedback visibility
- rubric/manual review criteria and style/static-analysis policy
- plagiarism/similarity policy reference
- author, reviewer, approver, status, version lineage, and change rationale

Lifecycle: draft, validating, validation_failed, review, approved, active, retired, superseded, and quarantined.

Validate statement completeness, examples, constraints, starter compilation, test determinism, solution feasibility, checker safety, limits, scoring totals, language parity, hidden/public separation, accessibility, and license/provenance. Approved versions are immutable.

## 5. Test bundles and confidentiality

Model immutable test bundles with:

- public/sample tests visible according to policy
- hidden tests encrypted at rest and accessible only to the execution preparation service
- input, expected output/property, group, weight, timeout override, visibility, and provenance
- canonical checksum and bundle manifest hash
- version, author/checker approval, validation run, and retirement

Store hidden tests/reference solutions/checker secrets in separately authorized encrypted object storage. Use KMS envelope encryption and least-privilege roles. Do not place them in Git history, database text, general object buckets, client bundles, API examples, logs, traces, events, exports, support tools, or job status payloads.

Runner materialization uses short-lived job-scoped grants or a brokered fetch with no list permission. Candidate code cannot read test files outside the controlled harness. Sanitize result messages so hidden input/expected output/path/order/count are not leaked.

Create canary tests that scan built clients, API payloads, logs, traces, events, artifacts, caches, and runner output for seeded hidden-test markers.

## 6. Student workspace model

Provide one authorized workspace per student/lab context with configurable practice and assigned areas:

- folders/files within strict path/name/count/size limits
- language-aware starter bundle
- current working tree metadata
- autosave operations with idempotency keys and optimistic revisions
- immutable named/automatic snapshots
- version history, diff, restore-as-new-version, and archive
- source import/export only when policy permits
- per-problem branch/snapshot reference without implementing a general Git hosting service

Reject absolute paths, traversal, symlink/hardlink/device tricks, reserved names, ambiguous Unicode paths, archive bombs, executable uploads outside policy, and cross-workspace references. Normalize and validate paths consistently.

Store source encrypted at rest with tenant/student/problem authorization. Do not index source into general search or expose it to tenant administrators/platform operations. Retention and deletion respect academic record, grievance, legal-hold, and student-work policies.

Autosave receipts distinguish local, queued, durable, conflict, and failed state. Mobile caches are encrypted, bounded, scoped, expire, purge on logout/remote revoke, and never contain hidden tests.

## 7. Browser editor and development experience

Integrate an accessible code editor with:

- file tree, tabs, create/rename/delete confirmation, split view where appropriate
- syntax highlighting, indentation, search/replace, line/column, bracket matching, and configurable theme/font
- keyboard commands with discoverable alternatives
- diagnostics from trusted language tooling only when safely isolated
- input/stdin editor and run configuration bounded by the problem policy
- compile/run/test/submit controls
- output panel separating compiler, runtime, public tests, hidden summary, system, and grading messages
- save/execution/submission state and receipts
- snapshot/history/diff/restore
- problem statement, examples, constraints, allowed toolchain, limits, and accessibility view

Meet WCAG 2.2 AA intent. Provide non-editor accessible source editing/navigation options, screen-reader labels/status announcements, keyboard-only workflows, visible focus, high contrast, zoom/reflow, non-color-only diagnostics/verdicts, reduced motion, localized/RTL surrounding UI, and copyable text alternatives for visual output.

Do not load editor plugins, language servers, or arbitrary scripts from untrusted CDNs at runtime. Pin dependencies and enforce CSP.

## 8. Autosave, snapshots, and offline-aware editing

Use the Prompt 20 durable operation/receipt pattern for source changes:

- client operation ID and base revision
- bounded file patch or complete content with checksum
- server-side validation and canonical hash
- durable workspace revision and receipt
- deterministic duplicate/out-of-order/conflict behavior

Coalesce/debounce frequent edits and protect PostgreSQL/object storage from write storms. Never acknowledge data held only in process memory. Snapshot at meaningful boundaries such as run, submit, exam start, restore, and periodic policy interval without creating uncontrolled storage growth.

Allow offline-aware source editing only when the activity policy permits. Queue encrypted changes, display last durable revision, and reconcile explicitly. The device cannot run official hidden tests or assign official scores offline.

In exam mode, server-authoritative time continues under Prompt 20 policy. At deadline, only durably accepted source/snapshot operations are eligible under the documented reconciliation policy. Never claim an offline submission succeeded without a server receipt.

## 9. Activity types and assignment lifecycle

Support:

- open practice
- guided experiment
- LMS assignment
- timed lab exercise
- challenge/contest
- mock coding interview
- internal/practical examination
- makeup/remedial activity

Each activity pins lab/course/batch, problem versions, toolchains, starter bundle, window, duration, attempt/run/submission limits, navigation/feedback policy, scoring/rubric, collaboration/reference policy, attendance linkage, accommodations, release policy, and eligibility population.

Lifecycle: draft, validating, review, approved, scheduled, open, closed, grading, review_complete, released, archived, cancelled, and superseded. Official exam activities integrate Prompt 12–16 and Prompt 20 timing/attempt/submission controls.

Version impact rules must protect active attempts. Never replace an in-progress candidate's problem/toolchain/test version silently.

## 10. Attempt, run, and submission lifecycle

Distinguish:

- workspace save: durable editing state
- run: compile/execute against candidate input or approved public examples
- test: execute approved visible/hidden tests according to activity policy
- submission: immutable source snapshot selected for evaluation

Attempt states include eligible, ready, active, paused_authorized, disconnected, submitted, timed_out, grading, completed, voided, and superseded. Execution job states include accepted, queued, preparing, compiling, running, checking, completed, compile_error, runtime_error, wrong_answer, partial, accepted_result, timed_out, memory_limit, output_limit, process_limit, security_violation, cancelled, infrastructure_failed, and expired.

Use stable machine codes plus safe localized display messages. Infrastructure failure never masquerades as a wrong answer. Retrying an idempotent job returns the existing job/result; an authorized new run has a new identity.

Submission atomically pins workspace revision/source snapshot, problem/test/toolchain/policy versions, candidate/attempt, server time, and semantic hash. Official exam submissions are immutable and receive a signed/verifiable non-sensitive receipt.

## 11. Execution job protocol

Define a versioned control-plane-to-runner protocol containing only:

- opaque job/tenant partition reference and signed short-lived job identity
- operation type: compile, run, public_test, hidden_test, SQL_test, or approved static analysis
- source/starter/test artifact references through brokered job-scoped grants
- pinned toolchain image digest and sandbox policy version
- entrypoint and validated command arguments
- exact resource/time/output/process/file/network limits
- checker/test/scoring bundle references
- deadline, cancellation token/version, trace correlation, and idempotency key
- result callback/queue contract and signed receipt

Do not send student names, email, course rosters, general auth tokens, database credentials, object-store list credentials, answer explanations, or unrelated academic data.

Canonicalize and sign job manifests. Verify signature, audience, expiry, nonce/idempotency, image digest, policy, and limits before materializing artifacts. Reject unknown protocol/policy versions fail-closed.

Results contain safe verdicts, timings, peak memory, exit/signal category, compiler/runtime output within limits, test-group summary permitted by policy, artifact checksums, runner/image/protocol versions, timestamps, and cleanup evidence. Sign and validate results before acceptance.

## 12. Sandbox isolation baseline

Each job executes in a fresh ephemeral sandbox with:

- non-root unprivileged UID/GID and no privilege escalation
- read-only root filesystem and minimal immutable base image
- isolated bounded writable tmp/work directories destroyed after the job
- no host PID/IPC/network namespace sharing
- no host/container-runtime sockets or host filesystem mounts
- dropped Linux capabilities
- seccomp and AppArmor/SELinux-compatible profiles where supported
- cgroup CPU/memory/PID/IO quotas plus wall-clock timeout enforced externally
- process/fork limit, file-descriptor limit, disk/file/inode limit, and output/log cap
- no network by default, including DNS and link-local/cloud metadata
- no ambient cloud/workload identity available to candidate processes
- controlled signals, kill of the full process tree/cgroup, and verified cleanup
- immutable digest-pinned scanned language image

Use a defense-in-depth isolation technology selected by ADR after threat/cost/performance analysis. A plain privileged Docker container is unacceptable. Evaluate ECS/Fargate task-per-job versus EKS with hardened sandbox runtime such as gVisor/Kata-compatible isolation, acknowledging actual platform constraints. Do not invent controls unsupported by the chosen runtime.

Local development may use a constrained rootless Docker runner only with prominent non-production warnings, no sensitive credentials/data, loopback/network disabled, explicit resource limits, and no Docker socket exposure to untrusted code. It is not evidence that production isolation is sufficient.

## 13. Language execution behavior

Implement allowlisted harnesses for each pinned profile:

- C: compile with approved compiler/standard/flags and execute only produced artifact
- C++: approved compiler/standard/flags, bounded compile resources, no arbitrary linker/plugin flags
- Java: approved JDK, fixed compilation/run harness, bounded heap/process/time, no agent/native-library escape
- Python: approved interpreter, isolated mode where practical, no package install/site customization/network
- JavaScript: approved Node runtime, no package install, inspector, preload, experimental escape flags, or external network
- TypeScript: approved pinned compiler/transpilation then bounded Node execution
- SQL: execute approved statements against a disposable tenant/job-specific PostgreSQL environment restored from a pinned dataset

Never build commands by concatenating filenames, arguments, source, or candidate input into a shell string. Use structured process invocation and fixed executable paths.

Normalize exit categories without leaking host paths/environment. Bound compiler errors and scrub internal paths/test names. Preserve full restricted diagnostics only for authorized platform security investigation under retention policy.

## 14. SQL execution isolation

For SQL problems:

- create a disposable database or strongly isolated schema/database instance per job/attempt according to ADR
- restore from a versioned checksum-pinned seed dataset
- use a job-specific least-privilege role with statement/lock/idle/session timeout
- prohibit superuser, role/database/extension creation, filesystem/server-program access, unsafe functions/extensions, replication, cross-database access, and network-capable features
- restrict allowed statement classes by problem policy
- cap rows, result bytes, notices, temp space, transactions, locks, and runtime
- compare results using a versioned checker with order/null/type/precision policy
- terminate sessions, revoke role, drop/reset resources, and verify cleanup

Never reuse mutated state across candidates or attempts. Add canary records proving no cross-job visibility. SQL timeout/cancellation must not leave blocking sessions or leaked schemas.

## 15. Public, hidden, custom, and property tests

Support test groups for sample/public, hidden correctness, edge, performance, and instructor-review categories. Test execution must:

- materialize only the current group's required data
- run candidate code separately where isolation requires it
- use deterministic locale/timezone/random seed unless randomness is the tested behavior
- enforce group and total limits
- distinguish candidate failure from checker/runner/infrastructure failure
- apply exact configured scoring/partial-credit rules
- conceal hidden inputs, expected output, names, ordering, weights, and counts according to policy

Custom checkers are platform-authored, reviewed, signed, digest-pinned artifacts executed in a separate trusted-but-contained checker boundary. Candidate code cannot invoke or inspect them. Arbitrary faculty-uploaded executables are forbidden in the first release.

Property-based problems require bounded generators, deterministic seed provenance protected from candidates, shrinking policy, and safe feedback. Do not leak a reusable hidden counterexample before release.

## 16. Resource limits, cancellation, and cleanup

Apply independently configurable hard maxima controlled by platform policy and lower problem/activity limits for:

- queue wait and job expiry
- compile CPU/wall time and memory
- run/test CPU/wall time and memory
- process/thread/PID count
- open files, file count/size/inodes, and writable bytes
- stdin/stdout/stderr/result/artifact bytes
- test count and total execution budget
- SQL statement/session/result limits

Faculty cannot exceed platform maxima. Limits and effective precedence are visible before approval and pinned per job.

Cancellation is authenticated, idempotent, and propagates to queued/preparing/running/checking work. Timeout/cancel kills the full sandbox, revokes grants, deletes materialized source/tests/secrets, releases compute/storage/DB resources, emits a minimal result, and verifies cleanup. A reaper reconciles orphaned workers/jobs after crash or partition.

## 17. Scheduling, queues, fairness, and backpressure

Use separate queues/resource pools for interactive practice, assignments, contests, and high-stakes exams. Implement:

- tenant/course/user concurrency quotas
- per-attempt outstanding-job limits
- fair scheduling preventing one tenant/student/problem from starvation or monopolization
- priority reservations for scheduled exams without permanently starving practice
- admission control, bounded queues, expiry, cancellation, and retry jitter
- autoscaling signals based on queue age, job class, resource profile, and active capacity
- circuit breakers for vulnerable/retired images and provider/infrastructure outages

Do not acknowledge a run as started until assigned to durable job state. Show truthful queue position/range where practical, estimated wait as non-guaranteed, and infrastructure status.

Protect the control-plane database from heartbeat/status storms through coalescing, append/projection design, bounded updates, and low-cardinality telemetry. Do not add Kafka without measured need and an ADR; the established PostgreSQL queue/outbox remains the default control-plane mechanism.

## 18. Secure artifacts, results, and retention

Encrypt source snapshots, compiler artifacts where retained, reports, and test evidence with tenant/job authorization. Prefer not to retain binaries; when needed for audit, define purpose, checksum, encryption, access, retention, quarantine, and secure deletion.

Never expose raw object keys or broadly scoped signed URLs. Issue short-lived purpose-bound downloads, force safe content disposition, verify authorization at issuance/fetch, and audit access.

Store result provenance:

- source/problem/test/toolchain/policy/checker/scoring versions and hashes
- job/runner/protocol version
- queued/start/end/server timestamps
- effective limits
- safe compile/run/test verdicts and bounded outputs
- per-group marks visible by policy
- infrastructure/security incident reference
- cleanup verification and artifact retention status

Approved grades and official submissions follow academic retention/legal hold. Practice source deletion/export follows institutional and student policy without deleting required audit records.

## 19. Deterministic scoring and grading

Implement exact versioned scoring for:

- compile success where explicitly awarded
- test/test-group pass and weights
- partial/subtask/dependency scoring
- performance thresholds when deterministic enough
- SQL result correctness
- rubric/manual criteria such as approach, readability, documentation, efficiency, lab process, and explanation
- late/attempt policy references

Use exact decimal arithmetic and explicit rounding. Persist operands, groups, outcomes, weights, caps, intermediate values, rule paths, awarded/max marks, warnings, and hashes.

Automatic execution score and human rubric score remain separate until an approved combination rule applies. A rerun/regrade creates a new version. Faculty override requires reason, evidence, affected criteria, maker-checker/Prompt 15 workflow where official, and complete before/after trace. Never direct-edit marks.

## 20. Exam and contest mode

Integrate Prompt 20 for server-authoritative timing, eligibility, accommodations, deterministic problem forms, attempt sessions, autosave/reconciliation, submission, receipts, integrity privacy, incident remedies, and release.

Exam mode additionally pins:

- workspace/starter baseline
- allowed languages/toolchains
- problem form and hidden-test bundle
- run/test/submission limits
- feedback suppression until release
- import/export/clipboard/reference/collaboration policy
- execution-pool reservation and failure policy

Network loss may allow policy-approved encrypted local editing, but official compilation/testing runs only on the server. At deadline, atomically submit the last eligible durably acknowledged workspace revision under the documented rule and issue a receipt. Infrastructure outage remediation uses governed Prompt 20 incident workflow.

Contest mode supports scoreboard/rank only when enabled, with frozen scoring rules, tie-break definition, penalty/time source, clarification workflow, freeze/unfreeze, and privacy. Scoreboards never expose source or hidden-test details.

## 21. Lab records, observations, and viva

Implement digital lab records by reference to immutable work:

- experiment/problem, objective, date, attendance reference, source snapshot, selected runs/submission, output evidence, result, student observation/conclusion, and faculty verification
- record status: draft, submitted, changes_requested, verified, rejected, superseded, and archived
- faculty comments/annotations and reasoned return
- late/makeup linkage
- CO/skill evidence reference for Prompt 19

Support viva/question-and-observation records with scheduled/actual time, examiner, rubric/criteria, marks, comments, and approval. Do not record audio/video by default; any future recording requires explicit policy/consent and is outside this prompt.

Generated lab-record PDF/export pins source versions and manifests. It must not reveal hidden tests, reference solutions, security data, or other students' work.

## 22. Similarity-analysis provider boundary

Define a provider-neutral, optional similarity port:

- capability and language discovery
- consent/policy/retention compatibility
- source submission by minimal scoped artifact reference
- signed/idempotent request and verified webhook/result
- pair/group similarity signal, matched regions, model/engine/version, corpus scope, confidence/limitations, and provider evidence reference
- deletion/export acknowledgement and provider outage state

Use `NOT_CONFIGURED`, `UNAVAILABLE`, or `PENDING_PROVIDER`; never fabricate a percentage. Local test doubles are labeled and cannot create production-valid evidence.

Similarity signals create restricted human-review cases. Reviewers see authorized source diffs, permitted collaboration/starter/template exclusions, common-code context, student response, and audit. No automatic grade reduction, accusation, discipline, or model-generated guilt conclusion. Formal malpractice outcomes remain governed by existing examination/disciplinary workflow.

Never compare across tenants or reuse student source in an external corpus without explicit contractual/legal/policy basis and required consent.

## 23. Competency and readiness analytics

Provide versioned analytics for:

- attempts, submissions, completion, and time-to-solve
- compile/runtime/wrong-answer patterns
- public versus hidden test performance without hidden leakage
- language/topic/problem/difficulty/CO/Bloom/skill mastery
- code-quality/rubric criteria
- progression across experiments and cohorts
- contest/mock-interview performance
- lab-record/viva completion
- run-to-submit behavior and help/intervention indicators
- item/problem quality and test effectiveness

Every analytic pins population, exclusions, activity/problem/toolchain/scoring versions, as-of time, and method. Use minimum-group thresholds and authorized drill-down. Do not infer employability, intelligence, dishonesty, protected traits, or placement eligibility from opaque scoring.

Readiness rules, if configured, are transparent weighted criteria with version, target, evidence, gaps, and limitations. They provide guidance, not guaranteed placement. Prompt 22 will consume approved skill/readiness references and owns placement/training decisions.

## 24. Notifications and communications

Use the existing notification port for assignment/schedule/reminder/deadline, submission receipt, grade/release, returned lab record, grading task, runner incident, and support updates.

Messages contain minimal non-sensitive references. Never include source code, test content, hidden verdict detail, answer/reference solutions, tokens, object URLs, similarity matches, misconduct allegations, accommodations, or marks before authorized release.

Push lock-screen text is generic and deep links reauthenticate/re-authorize. Respect tenant templates, language, quiet hours, delivery preferences, urgency policy, deduplication, and provider acknowledgement.

## 25. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- lab offering/batch/policy/toolchain catalogue and approval
- problem version/starter/test-manifest author/validate/review/approve/compare/retire
- activity/assignment/contest/exam schedule/audience/eligibility
- workspace/file operation/autosave/snapshot/history/diff/restore/export
- attempt/start/status/resume
- run/public-test/hidden-test/submit/cancel/status/result/receipt
- lab record/observation/viva submit/review/verify
- grading/rubric/regrade/override/moderation/release
- similarity request/webhook/case/review/response/decision reference
- competency/readiness/problem-quality dashboards and governed exports
- runner image/policy/queue/job/incident/health operations

Use role-shaped DTOs, bounded pagination/filter/sort, strict source/file/payload limits, RFC 7807, optimistic versions, `Idempotency-Key`, correlation IDs, server time, rate limits, anti-enumeration, and generated web/mobile clients.

Define least-privilege permissions for lab coordinator, problem author/reviewer/approver, hidden-test custodian, toolchain/image/security approver, student workspace/run/test/submit, faculty view/grade/verify, examiner/moderator, contest admin, similarity request/review, analytics view/export, support, audit, runner operator, and platform health.

Enforce SoD for problem/test approval, toolchain/image activation, official activity publication, grade override, similarity/malpractice decision, result release, and break-glass access. Tenant administrators do not automatically gain source/hidden-test/result access. Platform operations see masked jobs/health only.

Events carry stable references/minimal state and never source, test data, expected output, reference solution, compiler full output, marks before release, student identity, similarity content, object keys, URLs, credentials, or image secrets.

## 26. React web interfaces

Implement accessible responsive interfaces for:

- lab/course/batch/experiment/activity planning
- toolchain/profile catalogue and approval status
- programming problem/starter/test/scoring/rubric authoring, validation, comparison, review, and approval
- student workspace/editor, problem, run/test/submit, results, history, lab record, viva, and released analytics
- faculty roster/progress, live lab status, grading, record verification, viva rubric, regrade/override workflow, and interventions
- contest/exam operations integrated with Prompt 20
- restricted similarity-review case and student response
- competency/readiness/problem-quality/cohort dashboards
- runner/image/queue/job/incident dashboards with masked academic data

Secret test/reference-solution authoring uses a separately authorized surface with step-up authentication, aggressive no-cache, no browser persistence, watermark/audit where appropriate, and no mobile exposure by default.

## 27. React Native Android/iOS interfaces for every role

Implement native React Native interfaces using shared generated contracts/design tokens, not a WebView wrapper. Update `docs/mobile/ROLE_FEATURE_MATRIX.md` with supported, web-first, read-only, and denied capabilities.

### Student

- lab schedule, experiments, assignments, practice, contests/exams, instructions, limits, eligibility, and reminders
- native code editor suitable for practical edits with accessible text alternative, file navigation, autosave receipt, encrypted offline-aware source queue, snapshots, and history
- submit compile/run/test jobs to the server, view bounded safe outputs/verdicts, cancel, retry infrastructure failure, and receive authoritative receipts
- exam-mode timing/reconciliation, immutable submission receipt, lab-record observation/conclusion, viva schedule, released grades/feedback, competency view, and support
- no local official execution, hidden tests, reference solutions, image secrets, or cross-workspace access

### Faculty/Lab Instructor/Course Coordinator

- lab/batch/experiment schedule, roster/progress, live run/submission health, student support flags, grading queue, rubric, lab-record verification, viva evaluation, released competency/problem analytics
- mobile problem/activity draft metadata, preview, review/approval, return/comments, and incident action where authorized
- full multi-file problem/test/checker authoring, hidden-test custody, toolchain configuration, bulk operations, and image management remain web-first

### Problem Author/Reviewer/Hidden-Test Custodian

- review statement/starter/public examples/constraints/scoring/validation and approve/return with step-up authentication
- hidden-test mobile access is denied by default; only status, manifest hash/version, validation outcome, and approval action are shown when policy permits
- no secret download, clipboard, offline cache, notification content, or screenshot-visible hidden data

### Examiner/Moderator/Viva Evaluator

- assigned submissions, authorized source/result/rubric, grading, comments, viva criteria, variance/moderation, regrade/override approval, and receipt
- identity/blind-marking and prior-marker restrictions follow policy
- large diff/annotation or bulk grading may be web-first, but mobile supports meaningful review/action

### HOD/Program/Lab Coordinator/Exam Cell

- lab/activity readiness, toolchain compatibility, capacity/reservation, roster/completion, grading/release blockers, incidents, interventions, and aggregate competency
- review/approve/reschedule/cancel/remedy/release with SoD, reason, step-up, and receipt
- cannot access hidden tests or arbitrary student source merely by role

### Dean/Principal/Controller/Academic Council

- program/institution lab delivery, completion, incident, grading, outcome, competency, and capacity summaries
- governed decision queues and audit summaries; no hidden tests/source by default

### OBE/IQAC/Accreditation Role

- approved aggregate CO/Bloom/skill attainment references, experiment coverage, lab-record completion, and governed Prompt 19 evidence links
- no student source, hidden tests, similarity matches, unreleased grades, or execution-security evidence by default

### Similarity Reviewer/Authorized Committee

- assigned cases, policy/engine/corpus/limitations, authorized source comparison, template/collaboration exclusions, student response, human decision, and audit
- no automatic guilt/fail; sensitive source is never cached offline

### Technical Support/Lab Assistant

- masked workspace/job/runner/connectivity/compiler-profile incidents, receipts, safe diagnostics, SLA, approved remediation, and escalation
- cannot see hidden tests/reference solutions/similarity evidence or change grade; source access requires explicit case authorization and audit

### Guardian

- institution-permitted schedule/reminder and released dependent summary only
- no workspace, source, runs, submissions, tests, grades before release, similarity, incident, or viva-private access

### Tenant Administrator

- module enablement, roles, quotas within platform maxima, retention/policy/provider status, adoption, and masked service health
- no automatic source, hidden-test, reference-solution, submission, similarity, grade, or execution-artifact access
- secrets/toolchain commands/image approval and high-risk policy remain web-first and separately authorized

### Platform Operations/Runner Security

- service/queue/pool/image/policy version, capacity, latency, saturation, failure/security-event category, cleanup, deployment, and masked job correlation
- no student identity/source/test content/expected output/marks/similarity/lab-record content
- security investigators use time-bound break-glass case access with approval and audit, not ordinary operations UI

For all roles: encrypted platform-backed token storage; biometric re-entry only after server authentication; push with generic text; deep links reauthorize; remote logout/revoke; bounded encrypted caches; no hidden-secret caching; offline expiry/purge; camera/files permissions only at use; localization/RTL; Dynamic Type/font scaling; screen reader; keyboard/switch support where applicable; visible focus; non-color-only states; and authoritative receipts for consequential actions.

## 28. Data model and PostgreSQL RLS

Add normalized tables, names adapted to repository conventions, for:

- lab offering/batch/policy/experiment/activity/version
- language/toolchain/image/profile/approval
- programming problem/starter asset/test manifest/test-group/checker/scoring/rubric version metadata
- workspace/file/current revision/operation receipt/snapshot/export
- attempt/run/test/submission/submission receipt
- execution job/manifest/result/group result/cancellation/cleanup/incident reference
- SQL baseline/environment lifecycle reference
- grading/rubric mark/regrade/override/moderation/release
- lab record/observation/viva/verification
- similarity request/provider receipt/signal/review case/decision reference
- analytic run/population/competency/problem statistic/readiness version

Every tenant-owned table has non-null tenant/institution scope, scope-consistent foreign keys where practical, RLS enabled and forced, least-privilege policies, and indexes supporting policy predicates. Add negative tenant/student/course/role tests. Execution-plane storage uses opaque partition IDs and must not permit cross-job discovery.

Use exact constraints for status/types, logical uniqueness, immutable receipts/hashes, source/problem/test/toolchain version pinning, idempotency, optimistic versions, and lineage. Large source/binary/test content belongs in authorized encrypted object storage, not oversized database rows.

Partition high-volume job/result/operation tables only with documented retention, RLS, indexes, maintenance, backfill, and rollback. Flyway changes are forward-only, rolling-compatible, restart-safe where applicable, and never edit applied migrations.

## 29. AWS execution-plane design without production deployment

Produce a decision-quality ADR comparing at least:

- ECS/Fargate task-per-job or hardened job/task model
- EKS with hardened nodes plus gVisor/Kata-compatible sandbox/runtime where available
- any AWS service limitation affecting seccomp, capabilities, ephemeral storage, task startup, isolation, networking, quotas, logs, and cost

Evaluate security boundary, multi-tenancy risk, cold start, throughput, toolchain-image cache, operational burden, quotas, exam burst, observability, cleanup, patching, DR, and cost per compile/test.

Design VPC/subnet/security groups/endpoints/NACL/egress deny, IAM job broker and least-privilege roles, ECR digest/signature/scanning, KMS, S3 scoped artifacts, SQS or established queue boundary only if approved, ECS/EKS autoscaling, CloudWatch/OpenTelemetry, WAF/API throttling, and multi-AZ control-plane behavior.

Do not deploy production runner infrastructure in this prompt. Terraform may define reviewed disabled/non-production scaffolding or documented modules only if consistent with repository practice and cannot accidentally expose/run untrusted public workloads. Record prerequisites, security sign-off, cost guardrails, quota requests, penetration testing, and launch checklist.

## 30. Security threat model

Update a dedicated sandbox threat model covering:

- container/sandbox/kernel/runtime escape
- fork/process/thread bombs and infinite loops
- memory/disk/inode/file-descriptor/output exhaustion
- CPU/crypto/mining abuse and algorithmic denial of service
- network/DNS/covert egress and cloud metadata theft
- host mount/socket/device/proc/sys/cgroup access
- syscall/capability/namespace abuse
- compiler/interpreter/JIT/package-manager/plugin/agent escape paths
- malicious archives, filenames, encodings, source, binary, checker, and output
- side channels, residual storage, cross-job/tenant cache leakage
- hidden-test/reference-solution exfiltration and oracle attacks
- SQL privilege escape, locks, persistence, cross-attempt residue, and unsafe functions
- forged/replayed jobs/results/webhooks and confused deputy
- poisoned images/dependencies/SBOM/signing supply chain
- privileged insider/break-glass abuse
- mobile/browser source leakage, XSS, insecure cache, backup, clipboard, and deep-link hijack
- similarity provider data misuse

Document controls, assumptions, residual risk, owners, validation evidence, and launch blockers. Apply fail-closed validation, defense in depth, least privilege, encryption, signing/attestation, patch SLAs, image retirement, canaries, rate/quota controls, anomaly alerts, security incident isolation, and forensic evidence handling.

Do not promise perfect isolation or cheating prevention. Production launch requires independent security review and approved residual risk.

## 31. Reliability, observability, and operations

Define SLOs for workspace save, snapshot, interactive queue wait, compile/run/test duration by profile, submission receipt, result durability, exam capacity, cleanup, and availability.

Instrument low-cardinality metrics/traces for:

- queued/running/completed jobs by class/profile/verdict category
- queue age, cold start, compile/run/check duration
- CPU/memory/disk/output/process limit terminations
- cancellations/timeouts/retries/orphans/cleanup failures
- worker capacity/image pull/cache/health
- artifact grant/materialization/deletion failures
- SQL environment create/reset/drop/leak canary
- result signature/idempotency conflicts
- workspace autosave/conflict/storage growth
- exam submission/receipt and infrastructure incidents

Never log source, stdin, test data, expected output, reference solutions, compiler full output, student identity, marks, tokens, signed URLs, object keys, environment, or similarity matches. Use safe bounded diagnostic codes and masked job references.

Add dashboards, alerts, synthetic harmless jobs, image lifecycle/patching runbook, runner compromise/containment runbook, cleanup/orphan runbook, queue saturation/exam burst runbook, hidden-test exposure runbook, SQL leak/lock runbook, provider outage runbook, backup/restore, DR, and cost/cardinality controls.

## 32. Tests

Add unit, property, contract, integration, RLS, end-to-end, mobile, security, chaos, and representative concurrency tests.

At minimum test:

- problem/toolchain/test/scoring version validation, approval, immutability, and impact
- path normalization/traversal/symlink/hardlink/device/archive/file-count/size defenses
- workspace autosave duplicate/out-of-order/conflict/offline replay/snapshot/diff/restore and receipts
- start/run/test/submit/cancel idempotency and immutable official submission
- command/argument injection for filenames, source, stdin, compiler flags, and entrypoints
- infinite loop, fork/process/thread bomb, memory/disk/inode/fd/output/time exhaustion
- forbidden network/DNS/link-local/metadata/host/proc/sys/device/mount/socket access
- non-root, dropped capabilities, read-only root, seccomp/profile, external timeout, process-tree kill, and cleanup verification
- malicious compiler/runtime errors and output sanitization
- hidden-test/reference-solution canary leakage across APIs, logs, traces, events, artifacts, clients, support, and feedback
- cross-job/tenant/student/workspace/test/artifact isolation
- signed job/result identity, expiry, audience, replay, tamper, unknown protocol/policy, worker loss, retry, and orphan reaping
- language golden programs for C/C++/Java/Python/JavaScript/TypeScript with compile/runtime/wrong/accepted/limit verdicts
- SQL role/statement/timeout/lock/result/reset/cleanup/cross-attempt canary behavior
- exact test-group/partial/dependency/rubric/combined scoring and rounding
- exam network loss, last durable snapshot, deadline, infrastructure failure, accommodation, and receipt behavior
- lab record/viva workflow and hidden-content exclusion
- similarity not-configured/outage/webhook/replay/privacy/human-review/no-auto-punishment
- analytics population/exclusion/version/privacy and readiness transparency
- every web/mobile role permission and intentional denial
- Android/iOS encrypted cache, offline bounds/purge, generic push, deep-link auth, accessibility, and no local official execution
- container/image/SBOM/signature/IaC/dependency/security scan gates

CI sandbox defense tests must be safe for the CI host and run only inside a dedicated constrained test environment. Never run real escape exploits, destructive host payloads, uncontrolled fork bombs, or resource exhaustion on shared infrastructure. Use bounded adversarial fixtures and verify the outer watchdog/limits.

Run representative concurrency/load tests for interactive practice and scheduled exam bursts: workspace autosaves, queue admission, compile/test mixes by language/resource class, synchronized submission, worker loss, cancellation, result callbacks, and cleanup. Report dataset, candidate count, job mix, infrastructure, quotas, p50/p95/p99 queue/execution/end-to-end latency, throughput, failure/retry rate, resource usage, DB connections/locks, queue lag, cleanup evidence, cost estimate, bottlenecks, and thresholds. Do not claim production scale from a trivial local Docker run.

Required end-to-end journeys:

1. Faculty authors and validates a multi-language problem with public/hidden weighted tests; reviewer approves immutable versions.
2. Student edits a workspace, autosaves, snapshots, runs public tests, reconnects, submits, and receives a receipt.
3. C, C++, Java, Python, JavaScript, TypeScript, and SQL golden solutions execute using pinned isolated profiles.
4. Infinite-loop, fork/process, memory, output, network, metadata, filesystem, and SQL abuse cases are contained and cleaned.
5. Two tenants/students/jobs cannot access each other's source, tests, artifacts, SQL state, results, or counts.
6. Official lab exam uses Prompt 20 timing/accommodation/network-loss/submission governance and immutable source.
7. Automatic tests and human rubric/viva grading combine reproducibly; reasoned override follows approval.
8. Similarity signal enters human review, includes student response, and causes no automatic punishment.
9. Faculty verifies a lab record and views privacy-safe competency/problem analytics.
10. Web, Android, and iOS provide appropriate complete role journeys or explicit secure restrictions.

Run repository-standard checks plus exact relevant commands for Java compile/test/static analysis, web typecheck/lint/unit/E2E/accessibility, Android/iOS tests, OpenAPI/job-protocol generation/diff, Flyway validation, RLS/canary leakage, runner/sandbox/security tests, image/SBOM/signature/vulnerability/license scans, dependency/container/IaC scans, and load tests. Report commands, exit codes, skipped checks, environment limitations, and evidence. Never claim a check passed if it was not run successfully.

## 33. Seed/demo data

Add safe deterministic non-production fixtures:

- one lab offering with two batches and approved policies
- one approved toolchain profile for each target language using non-secret local test digests/configuration
- representative problems for standard input/output, function, partial groups, timeout, and SQL query modes
- synthetic starter/public/hidden canary bundles containing no copyrighted/vendor content or real secrets
- practice, assignment, contest, and exam activities
- synthetic students/faculty, workspaces, runs, submissions, grading, lab records, viva, and analytics
- bounded hostile fixtures for limits/network/filesystem/SQL tests
- similarity provider `NOT_CONFIGURED` and labeled test-double cases

Fixtures must be idempotent, tenant-isolated, obviously synthetic, removable, disabled in production, and contain no real student data, production credentials, unsafe host actions, or deployable hidden secrets.

## 34. Documentation and completion gate

Update:

- OpenAPI and generated clients
- execution job/result protocol and compatibility specification
- data dictionary, statuses, permissions, limits, and retention catalogue
- programming-lab control/execution architecture ADR
- ECS/Fargate versus EKS isolation/threat/cost ADR and production launch checklist
- toolchain/image build, SBOM, signing, scanning, approval, patching, retirement, and rollback guide
- sandbox/SQL/similarity threat models and privacy guide
- workspace/autosave/snapshot/submission/receipt specification
- problem/test/checker/scoring/rubric authoring guide
- student, faculty, examiner, lab assistant, coordinator, support, tenant-admin, and platform-operations guides
- web/native-mobile role-feature matrix and accessibility guide
- capacity/load/cost plan and results
- SLOs/dashboards/alerts plus image, compromise, orphan, queue, exam, hidden-test, SQL, provider, backup/restore, and DR runbooks
- local constrained-runner setup with explicit non-production warning and no real secrets

Completion requires all of the following:

1. Approved versioned programming problems, starter files, tests, scoring, rubrics, toolchains, and limits can be authored and validated without hidden-test leakage.
2. Students can create/save/snapshot/restore workspaces and practice/submit C, C++, Java, Python, JavaScript, TypeScript, and isolated PostgreSQL SQL work.
3. Compile/run/test jobs use signed idempotent protocols and pinned image/problem/test/policy versions.
4. Every untrusted job runs outside the control plane in a fresh non-root, read-only, resource-limited, network-denied, credential-free disposable sandbox and cleanup is verified.
5. Infinite loops, process bombs, memory/disk/output abuse, forbidden network/metadata/filesystem access, malicious output, worker loss, cancellation, and timeout are contained by bounded tests.
6. SQL jobs start from pinned baselines, use least privilege, enforce limits, expose no cross-attempt state, and are fully reset/removed.
7. Hidden tests/reference solutions are encrypted, job-scoped, never exposed to candidates/ordinary staff/clients/logs/events, and canary leakage tests pass.
8. Official exam source and submissions integrate Prompt 20 timing/autosave/network-loss/accommodation/receipt behavior and remain immutable/auditable.
9. Automatic scoring, human rubric/viva grading, regrading, and overrides are exact, versioned, explainable, and governed.
10. Similarity is a truthful optional provider boundary with restricted human review, student response, and no automatic punishment.
11. Lab records and privacy-safe competency/readiness analytics retain source versions, population, exclusions, and limitations.
12. Every relevant role has a meaningful React web and native Android/iOS workflow or explicit justified web-first/read-only/denied capability.
13. Every tenant table has forced RLS and negative tenant/student/job isolation tests; security/SoD/audit/retention controls pass.
14. Representative concurrent practice/exam loads meet documented thresholds, or the completion gate fails honestly.
15. Documentation, ADRs, protocols, migrations, generated clients, observability, runbooks, and every environment-available test/scan pass.
16. Production execution infrastructure was designed and reviewed but not deployed, and Prompt 22 placement/training functionality was not implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/job protocol, lab/toolchain/problem/test/workspace/activity/attempt/execution/SQL/submission/scoring/grading/record/viva/similarity/analytics, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency/isolation/cleanup, representative load and all exact test/scan commands/results/exit status, docs/ADRs/runbooks, limitations/residual risk/unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(programming-lab): add isolated multi-language execution`

Stop. Do not begin Prompt 22 or implement training, placement, employer, drive, interview, or offer functionality.
```

---

## Review Checklist Before Prompt 22

- The Spring Boot/control-plane process never executes untrusted code.
- Every job pins signed versions/hashes and runs in a fresh, non-root, read-only, resource-limited, network-denied, credential-free sandbox.
- C, C++, Java, Python, JavaScript, TypeScript, and resettable PostgreSQL SQL pass golden and hostile-resource tests.
- Hidden tests/reference solutions cannot leak through clients, APIs, logs, events, caches, artifacts, or feedback.
- Workspace autosave, snapshots, offline reconciliation, exam deadlines, submissions, and receipts are durable and deterministic.
- SQL state is isolated, bounded, terminated, and reset between jobs.
- Scoring, rubric/viva grading, regrades, and overrides preserve exact immutable traces.
- Similarity creates human-review evidence only and never automatic punishment.
- Every relevant role has a suitable web/native-mobile workflow or explicit secure restriction.
- Every tenant table has forced RLS and negative tenant/student/job isolation tests.
- Representative load, cleanup, image/security scans, threat review, and runbooks pass.
- Production execution infrastructure was not deployed and no Prompt 22 placement/training functionality was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 22 until these conditions pass.
