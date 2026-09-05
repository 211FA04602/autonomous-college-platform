# Claude Code Prompt 02

## Audit, Workflow, Documents, and Transactional Outbox Platform Services

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00 and 01 passed, were reviewed, and were committed  
**Scope:** Reusable, tenant-safe platform services required by all later business modules

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the greenfield Engineering College and Autonomous Institution Operating Platform.

Before changing code:

1. Read `docs/product/PRD.md` completely.
2. Read `docs/engineering/CONSTITUTION.md` completely.
3. Read every relevant ADR, especially modular monolith, tenant isolation/RLS, identity/RBAC, APIs, outbox, web, mobile, PostgreSQL/Flyway, and AWS direction.
4. Read `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Inspect Git status, current source, Flyway migrations, OpenAPI, tests, CI, and documentation.
6. Verify that Prompt 01's completion gate actually remains green. If it does not, report the regression and fix only what is necessary to restore the established foundation before proceeding.
7. Preserve all legitimate existing work. Never use destructive Git commands or edit applied Flyway migrations.

Implement reusable platform services for:

- append-only audit
- configurable approval/workflow execution
- governed document and file storage
- transactional outbox and reliable asynchronous delivery
- shared work queues and operational status

These capabilities must be production-grade enough for later admissions, academic, examination, finance, OBE, placement, coding-lab, campus-operations, React web, and native Android/iOS modules to reuse. Do not implement those business modules now.

Preserve strict modular-monolith boundaries. A platform service may expose explicit APIs, application ports, and domain events; it must not become a shared database dumping ground.

## 1. Append-only audit service

Implement an audit domain with:

- immutable audit event identifier
- tenant ID and institution/campus/organization scope where applicable
- actor type: user, external user, support user, service account, scheduled job, system
- actor/application user reference when available
- authenticated session/device reference where available
- effective role/access context reference
- action code using a stable naming convention
- resource type and opaque resource identifier
- event time in UTC and institution-local display support
- correlation ID, causation ID, request ID, and trace ID where available
- source channel: web, Android, iOS, API, import, worker, system
- outcome: attempted, succeeded, denied, failed, reversed, superseded
- reason/comment reference where required
- safe before/after summaries using explicit field allowlists
- metadata classification and schema/version
- client IP/device/user-agent metadata only according to privacy policy and legitimate purpose
- retention/legal-hold references
- integrity/tamper-evidence fields

Audit requirements:

- audit events are append-only through application and runtime database roles
- normal APIs cannot update or delete audit events
- corrections append a superseding event; history remains intact
- implement tamper evidence using hash chaining, signed batches, or another defensible documented design
- do not claim legal non-repudiation unless a real signing/key-custody design provides it
- audit writes for critical commands must be transactionally consistent with the business action, either in the same transaction or through a documented fail-closed pattern
- never serialize complete entities indiscriminately
- never record passwords, tokens, authorization codes, secrets, raw payment credentials, confidential question content, hidden test cases, unrestricted documents, or unnecessary sensitive personal data
- support field redaction/pseudonymization while preserving the integrity record according to policy
- authorized audit search must enforce tenant, organization, role, field, and record scope
- audit export must be asynchronous, bounded, watermarked, access-controlled, retained, and itself audited

Create a stable audit-client port for other modules. Make misuse difficult: callers must provide action/resource/outcome and typed safe change metadata rather than arbitrary object dumps.

Demonstrate audit integration using existing Prompt 01 operations such as membership change, role assignment, context switch, support-access approval/revocation, and session revocation. Do not duplicate Prompt 01's domain logic.

## 2. Workflow definition and execution service

Implement a bounded workflow/approval engine—not a general-purpose BPMN platform.

Workflow definition capabilities:

- tenant-owned definition key and display metadata
- business purpose and owning module
- version lifecycle: draft, validation failed, approved, active, retired
- immutable active versions
- effective start/end dates
- states and terminal states
- permitted transitions
- transition authorization using stable permission codes and typed scopes
- serial and parallel approval steps
- quorum/required-count rules
- initiator restrictions and self-approval policy
- separation-of-duties constraints
- assignee resolution by user, role, organization scope, manager/owner reference, or owning-module resolver port
- conditions using a safe, typed, validated expression model; never arbitrary code, SQL, JavaScript, SpEL, or eval
- due time/SLA, reminder, escalation, delegation, and reassignment policies
- required reason, comments, attachments, and step-up authentication metadata
- cancellation, withdrawal, rejection, return-for-correction, expiration, and administrative recovery policies
- notification/outbox event configuration references

Workflow instance capabilities:

- originating tenant/module/resource and definition version snapshot
- current state and optimistic version
- step/task records
- assigned and candidate actors
- decision, reason, comment, evidence/document references, and timestamp
- delegation and escalation history
- SLA timers and breached state
- idempotent transition command keys
- complete transition history
- pause/resume/cancel only when definition permits
- terminal instances cannot silently reopen
- an authorized correction/reopen creates a clearly linked new workflow/revision when policy requires

Runtime requirements:

- re-evaluate current authorization at action time
- do not authorize based only on assignment created earlier
- prevent duplicate approval from retry/double tap
- protect concurrent decisions with optimistic locking and database constraints
- ensure workflow actions and owning-module commands can coordinate through explicit application ports/events without distributed transactions
- define synchronous approval request and asynchronous event patterns
- provide a safe migration policy for active workflow instances when definitions change; default is to retain their original version
- time-based reminders/escalations run through idempotent scheduled jobs and outbox events

Implement one neutral demonstration workflow, such as temporary/support-access approval, by integrating with Prompt 01. Do not invent student/exam/finance workflows yet.

## 3. Work queue and inbox

Implement a shared task/read model for authorized action queues:

- assigned to me
- available to my authorized role/scope
- initiated by me
- due soon
- overdue/escalated
- completed/history
- delegated
- high-risk/step-up required

Requirements:

- tenant/scope isolation
- stable pagination and bounded filters
- no disclosure of inaccessible resource metadata
- owning module controls resource summary and deep link
- web/mobile deep links are validated at navigation and resource load
- counts use the same authorization policy as list data
- updates are event-driven/idempotent where practical
- stale task actions fail safely and refresh state

## 4. Governed document service

Implement document metadata and object-storage orchestration. Binary content must not be stored in PostgreSQL.

Document metadata:

- tenant and institutional scope
- owning module and resource reference
- document type
- display filename and safe storage key
- media type, byte size, checksum, and detected type when scanning exists
- classification: public, internal, restricted, confidential, examination-confidential or configurable governed classes
- version and previous-version link
- status: upload initiated, uploaded, scanning, quarantined, accepted, rejected, expired, superseded, revoked, deleted-by-policy
- uploader/creator and source channel
- created/effective/expiry timestamps
- retention policy, retention-until date, legal hold
- verification status and verifier when applicable
- metadata tags through validated schemas, not uncontrolled sensitive JSON
- encryption/key classification reference

Storage architecture:

- define an S3-compatible storage port
- implement a local development adapter using LocalStack, MinIO only if already approved, or a test/in-memory adapter; choose one and document it
- production target is AWS S3 with versioning, encryption, blocked public access, least-privilege access, lifecycle policy, and separate confidential-exam storage controls later
- use opaque, non-guessable object keys; never trust raw filenames as paths
- validate filename, media type, extension, size, checksum, tenant ownership, document type, and quota before accepting completion
- support multipart upload boundary for future large files
- create short-lived presigned upload/download flows only after backend authorization
- bind upload completion to expected tenant, object key, size/checksum policy, and upload session
- prevent cross-tenant key substitution and confused-deputy attacks
- downloads require real-time authorization and current document status
- support range download where safe
- record download/view events for governed classes

Malware scanning and quarantine:

- implement explicit scanning-provider port and event/state flow
- uploaded content is not available to normal users before required scanning completes
- unscanned or failed-scan content is quarantined/fails closed according to policy
- local/test profiles may use a deterministic test scanner adapter clearly marked as non-production
- production cannot start with required scanning falsely marked successful when no real scanner is configured
- never claim malware detection exists based only on extension/MIME validation

Versioning, retention, and deletion:

- new versions create new objects and immutable metadata versions
- supersession does not destroy prior official records
- legal hold overrides lifecycle deletion
- retention jobs are idempotent, audited, and produce exception reports
- deletion is soft/logical first and asynchronous physical removal only when policy permits
- restore/reinstate behavior is explicit

Mobile requirements:

- camera/document capture abstraction
- preprocess images only with documented quality and privacy controls
- resumable/retry-safe upload session
- visible upload/scanning/quarantine/error state
- encrypted temporary storage and cleanup after upload/logout/tenant switch
- secure preview and explicit download policy
- prevent confidential documents from offline caching unless classification policy explicitly allows it
- no document content in push notifications, logs, analytics, or crash reports

## 5. Transactional outbox and reliable delivery

Implement a transactional outbox platform service using PostgreSQL.

Outbox record requirements:

- event ID
- tenant and organization scope
- aggregate/module/resource type and ID
- event type and schema version
- occurrence time
- correlation and causation IDs
- payload using a versioned, minimal, privacy-reviewed schema
- headers/metadata allowlist
- idempotency/deduplication key where applicable
- status, attempt count, next-attempt time, lease/lock owner and expiry
- published time
- last safe error code/summary
- dead-letter state and reason
- retention/archival metadata

Publisher requirements:

- domain state and outbox event are committed atomically in one PostgreSQL transaction
- use safe multi-worker claiming such as `FOR UPDATE SKIP LOCKED` or an equivalent proven pattern
- leases recover from crashed workers
- exponential backoff with jitter and configurable maximum attempts
- at-least-once delivery is explicit
- event consumers must be idempotent
- do not promise exactly-once delivery
- ordering guarantees are documented by aggregate/key where required; do not imply global ordering
- payloads avoid large documents and sensitive content; use authorized references
- poison events transition to a dead-letter state with operational alert
- replay requires privileged authorization, reason, bounded selection, preview, idempotency controls, and audit
- preserve original event identity/schema and record replay attempts
- metrics for pending age, throughput, failure rate, retries, dead letters, and lag

Adapters:

- local adapter that dispatches to in-process/test consumers without AWS
- define provider port for future AWS SQS/EventBridge publishing
- do not require AWS credentials for local development or PR CI
- do not implement Kafka unless an accepted ADR and measured need justify it

Implement a consumer-inbox/idempotency mechanism for at least one demonstration consumer. Prove duplicate delivery does not repeat the side effect.

## 6. Timers and scheduled work

Provide a tenant-safe scheduling foundation for workflow reminders, expirations, retention, and outbox recovery:

- job type, tenant/scope, due time, payload reference, idempotency key, status, attempts, lease, error summary
- safe claiming and crash recovery
- no unbounded full-table scans
- per-tenant throttling and fairness strategy
- UTC execution with institution-time-zone calculation performed when the job is created
- observable lag and failure

Do not build a generic user-defined code scheduler.

## 7. Backend modules and boundaries

Continue the established modules:

- `audit`
- `workflow`
- `documents`
- `integration-outbox`
- `notifications` only for interfaces/events; full communications come later
- `app` composition root

Requirements:

- explicit domain/application/port/adapter boundaries
- no direct cross-module table access
- owning modules reference audit/workflow/document/outbox through public application APIs/ports and stable identifiers
- no JPA entity exposure in API contracts
- tenant-aware repositories and PostgreSQL RLS
- RFC 7807 errors with stable codes
- optimistic locking
- correlation/tracing propagation
- structured PII-safe logs
- health/readiness indicators that do not reveal sensitive internal details publicly
- ArchUnit boundary tests

## 8. Required APIs

Use the established API versioning convention and update OpenAPI.

Audit APIs:

- authorized paginated search with bounded filters
- retrieve safe event detail
- verify integrity/checkpoint status for authorized auditors
- request asynchronous export
- retrieve export status and authorized short-lived download

Workflow APIs:

- create/update/validate/approve/activate/retire workflow definitions for authorized tenant administrators
- retrieve versions and compare safe definition metadata
- start instance through owning-module/internal application API; expose public start only when explicitly authorized
- retrieve instance/history
- list inbox/work queues
- claim/assign/delegate when policy permits
- execute transition with idempotency key, optimistic version, reason/evidence, and step-up context
- cancel/withdraw/escalate/recover according to policy

Document APIs:

- initiate upload
- complete upload
- retrieve metadata/status
- create new version
- request authorized preview/download URL
- verify/reject/quarantine status through authorized scanner/operator route
- supersede/revoke
- apply/release legal hold with privileged workflow
- list documents by authorized owning resource

Outbox/operations APIs:

- privileged status/metrics summary
- paginated dead-letter search
- inspect safe event metadata without exposing sensitive payload by default
- preview and execute bounded replay with reason and step-up authorization
- no ordinary-user endpoint to publish arbitrary events

All list endpoints require bounded page sizes, stable sorting, authorization-aware counts, and no cross-tenant inference.

## 9. React web interfaces

Implement accessible production interfaces for:

- My Work/Inboxes with assigned, available, due, overdue, completed, delegated, and initiated filters
- workflow instance detail and timeline
- action/approval dialog with reason, comments, document evidence, optimistic version, and duplicate-submit prevention
- workflow-definition editor/validator/version/activation for authorized administrators
- document upload, progress, scanning/quarantine status, version history, authorized preview/download, and error recovery
- audit search/detail/integrity status/export request for authorized roles
- platform operations view for outbox lag/dead letters/replay for tightly privileged users
- explicit tenant/institution context in administration pages
- unauthorized, stale, conflict, expired, and step-up-required states

Requirements:

- keyboard and screen-reader accessible
- safe confirmations for revoke/replay/legal hold/high-risk transitions
- no raw sensitive event payload display by default
- responsive layout
- localization-ready text
- backend remains authoritative

## 10. React Native Android and iOS interfaces

Implement role-aware native mobile interfaces for the reusable services:

- My Work inbox and counts
- workflow task detail/timeline
- approve, reject, return, acknowledge, delegate, or comment only when definition and permission permit
- online requirement and step-up authentication for high-risk actions
- idempotent action submission and server receipt
- stale/conflict handling that refreshes current state before retry
- document camera/file selection, upload progress, retry, scanning/quarantine state, authorized preview, version list, and download policy
- audit-event/timeline visibility only for roles and records permitted by policy
- tenant/platform operations companion showing outbox/workflow/document-processing health and alerts; replay and legal-hold actions remain web-first unless explicitly approved
- push/deep-link routing into an authorized workflow/document/resource
- offline draft of non-sensitive comments and upload preparation only where allowed
- official approvals require confirmed server response; never show success from a queued offline mutation
- encrypted temporary files and cleanup

Update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role that receives workflow inbox, document, approval, audit timeline, or operations capabilities. Do not claim their later business modules are complete.

## 11. Authorization model

Add stable permissions and scopes for:

- audit view/search/export/integrity verification
- workflow definition view/manage/approve/activate
- workflow task view/act/delegate/recover
- document initiate/upload/view/download/version/verify/reject/revoke/legal-hold
- outbox status/dead-letter view/replay
- scheduled-job status/recovery

Enforce separation between:

- workflow author and activator where configured
- document uploader and verifier where required
- outbox operator and replay approver for high-risk events
- audit viewer and audit export privilege
- tenant operators and platform operators

Every API, query, export, web route, mobile route, deep link, presigned URL, and job must enforce current tenant/scope authorization.

## 12. Database and migrations

Add forward-only Flyway migrations for the new domains. Include tenant IDs, scope, constraints, indexes, optimistic versions, statuses, and PostgreSQL RLS on every tenant-owned table.

At minimum cover:

- audit events and integrity checkpoints
- workflow definitions, versions, states/transitions/steps/conditions
- workflow instances, tasks, decisions, history, delegation/escalation
- document metadata, versions, upload sessions, status history, retention/legal holds, access events
- outbox events, attempts/dead-letter/replay records
- consumer inbox/idempotency records
- scheduled jobs/leases/attempts
- asynchronous export jobs and artifact references if owned here

Use partial/composite indexes based on actual query patterns for pending jobs, outbox claims, inbox queues, and audit search. Avoid indexing sensitive free text unnecessarily.

## 13. Testing requirements

Backend/unit:

- audit redaction and immutable behavior
- integrity-chain/checkpoint verification and tamper detection
- workflow definition validation
- transition authorization, quorum, SoD, delegation, escalation and terminal states
- optimistic-concurrency and duplicate-submit protection
- document state machine, versioning, retention and legal hold
- outbox backoff, lease recovery, dead-letter and replay authorization
- scheduled-job idempotency

PostgreSQL/Testcontainers:

- clean Flyway migration
- tenant RLS for every new table
- append-only audit runtime-role enforcement
- concurrent workflow decisions
- concurrent outbox/job claiming
- expired lease recovery
- atomic business state plus outbox event
- consumer duplicate delivery
- document cross-tenant key/reference substitution denial

API/security:

- IDOR and cross-tenant attempts
- unauthorized audit export, workflow action, download, legal hold, and replay
- stale permission/access grant
- presigned URL issuance and expiry authorization behavior
- upload completion mismatch
- malicious filenames and unsupported/oversized files
- scanner unavailable/failure/quarantine
- safe RFC 7807 errors
- bounded pagination and export

Web:

- accessible inbox, workflow timeline/action, document upload/status, audit search, and operations views
- duplicate action and conflict states
- step-up required
- Playwright demonstration workflow from support request through approval and audit

Android/iOS:

- workflow inbox and action
- queued/nonqueued action policy
- duplicate tap/idempotency
- expired/stale task
- document capture/upload/retry/scanning state/temp cleanup
- unauthorized deep link
- tenant switch/cache separation
- at least one Android and one iOS E2E path where valid infrastructure exists

Performance/resilience:

- representative audit ingestion
- outbox backlog processing and recovery
- workflow inbox pagination
- document upload orchestration without loading full binaries into application memory
- service restart during active lease/upload/workflow operation

Never mark skipped tests as passed. Report environmental limitations honestly, especially iOS/macOS and external storage/scanner/provider dependencies.

## 14. Documentation and operations

Update or create:

- OpenAPI and generated client contracts
- audit event schema/action naming/redaction policy
- audit integrity design ADR
- workflow model, typed condition specification, versioning and recovery ADR
- document classification, storage-key, presigned URL, scanning, quarantine, retention and legal-hold design
- outbox/inbox delivery semantics, ordering, retry, dead-letter and replay ADR
- scheduled-job/lease design
- RLS/data dictionary updates
- threat model covering audit tampering, workflow authorization, malicious upload, malware, presigned URL leakage, cross-tenant object access, outbox payload leakage, replay abuse, and mobile temporary-file exposure
- operator runbooks for workflow stuck tasks, document scanner outage/quarantine, outbox lag/dead letters/replay, audit integrity failure, retention/legal hold, and failed exports
- web administrator/user guide
- native Android/iOS workflow/document guidance
- mobile role-feature matrix updates

## 15. Required verification

Run and report actual commands/results for:

- full backend formatting/static checks, compile, unit, architecture and Testcontainers tests
- clean Flyway migration
- complete RLS suite
- audit immutability/integrity tests
- workflow concurrency/idempotency tests
- document authorization and storage-adapter contract tests
- outbox atomicity, duplicate delivery, crash/lease recovery and replay tests
- web lint, typecheck, unit/accessibility, build and Playwright tests
- mobile lint, TypeScript, unit/component, Android build/test, and available mobile E2E
- iOS build/test only on valid macOS infrastructure; otherwise list the exact pending evidence
- OpenAPI validation and generated-client drift
- configured security/secret/dependency scans

Fix failures within scope. Do not hide flakes or disabled tests.

## 16. Completion gate

This prompt passes only when:

1. Critical actions can append privacy-safe audit events atomically and those events cannot be changed by runtime roles.
2. Audit integrity verification detects an intentional test alteration.
3. A versioned workflow can be drafted, validated, approved, activated, instantiated, assigned, acted on, completed, and audited.
4. Duplicate and concurrent workflow actions do not create duplicate decisions.
5. A document can be uploaded through an authorized short-lived flow, quarantined/scanned through a real boundary, accepted, versioned, downloaded by an authorized user, retained/held, and audited.
6. Cross-tenant document substitution and download fail.
7. Domain state and its outbox event commit atomically.
8. Duplicate delivery produces one consumer side effect.
9. Crashed publisher/job leases recover.
10. Dead-letter replay is bounded, privileged, reasoned, idempotent, and audited.
11. Web and native Android/iOS users can use real inbox, workflow action, and document interfaces according to role.
12. Official mobile approvals show success only after confirmed server response.
13. Every new tenant-owned table has application predicates, RLS, and negative isolation tests.
14. OpenAPI, documentation, ADRs, threat model, runbooks, and mobile role matrix match actual behavior.
15. All environment-available checks pass.

At completion, provide this exact report:

1. Summary of what was implemented
2. Files added or changed
3. Database migrations added
4. APIs added or changed
5. Web interfaces implemented
6. Android interfaces and test status
7. iOS interfaces and test status
8. Audit integrity/redaction controls
9. Workflow/version/concurrency controls
10. Document storage/scanning/retention controls
11. Outbox/inbox/retry/dead-letter controls
12. Tenant isolation and authorization controls
13. Tests added and exact results
14. Commands run and exit status
15. ADRs, documentation and runbooks updated
16. Known limitations, environment gaps or deferred items
17. Manual verification steps
18. Suggested commit message
19. Explicit statement: `Completion gate: PASSED` or `Completion gate: FAILED`

Suggested commit message:

`feat(platform): implement audit workflow documents and transactional outbox`

Stop after the report. Do not begin Prompt 03 or implement curriculum, admissions, students, fees, examinations, placements, or other business modules.
```

---

## Review Checklist Before Prompt 03

- Audit events are immutable, redacted, tenant-safe, and tamper-evident.
- Workflow definitions are versioned and active versions are immutable.
- Workflow decisions are authorized at action time and idempotent.
- Documents use object storage, quarantine, authorization, versioning, retention, and legal hold.
- Malware scanning is a real provider boundary and is not falsely represented.
- Outbox events commit atomically with domain state.
- Consumers are idempotent and dead-letter replay is controlled.
- Web, Android, and iOS contain real workflow/document experiences.
- Mobile official approvals require confirmed online server success.
- RLS and cross-tenant negative tests cover every new table.
- No later business modules were prematurely implemented.
- The completion gate passed and all changes were manually reviewed.

Do not continue to Prompt 03 until these conditions pass.

