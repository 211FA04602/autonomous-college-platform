# Claude Code Prompt 13

## Secure Question-Paper Governance

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–12 passed, were reviewed, and were committed  
**Scope:** Confidential paper requirements, setter onboarding and submission, moderation, translation, multiple sets, controlled selection, two-person release, encrypted storage, secure printing/dispatch custody, incident response, archival, and role-specific interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially autonomous examination question-paper governance, confidentiality, external examiners/setters, moderation, translation, printing, dispatch, custody, retention, audit, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, all relevant ADRs, security policies, module boundaries, and repository conventions.
3. Inspect Prompt 10 approved question-bank/blueprint/version/classification contracts, Prompt 12 examination-cycle/course/component/schedule/frozen-candidate contracts, Prompt 01 identity/MFA/external-access/RBAC, and Prompt 02 workflow/audit/document/outbox foundations.
4. Inspect current AWS KMS/S3/Secrets Manager abstractions, malware scanning, document conversion, OpenAPI/generated clients, PostgreSQL RLS, permissions/SoD, data dictionary, observability/redaction, notification service, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, include real examination questions in source code/tests/fixtures/logs, implement examination seating/invigilation, exam-day paper opening by rooms, student online delivery, answer-script evaluation, marks, results, or OBE attainment.

Implement a distinct bounded `confidential-paper` domain. It owns paper requirements, setter access, confidential drafts/submissions, moderation, translation, set selection, final release packages, print/dispatch register references, chain-of-custody events, exposure incidents, and archive/retention. It does not own the general question bank, candidate eligibility, physical exam logistics, student attempts, marks, or results.

## 1. Non-negotiable security invariants

Enforce:

- all paper content is classified `EXAMINATION_SECRET` by default and deny-by-default at API, database, object, search, cache, notification, and observability layers
- paper bodies, options, keys, solutions, annotations, attachments, filenames, and revealing metadata never appear in application logs, traces, metrics labels, analytics, event payloads, audit before/after values, error messages, test snapshots, crash reports, support tools, or general search indexes
- tenant, institution, examination cycle, course/component, assignment, purpose, access window, MFA assurance, and device/session risk are revalidated for every confidential read/write/download—not only at login
- no single person can set, moderate, approve, select, and finally release the same paper when policy requires separation
- final release requires two distinct authorized humans and server-verified step-up/MFA evidence
- approved/finalized/released paper versions are immutable; changes create a new version and invalidate affected packages through explicit workflow
- short-lived object access is issued only after real-time authorization and is bound as tightly as supported
- object storage paths/keys use opaque identifiers and never course/paper titles or personal names
- mobile devices never retain examination-secret content offline by default
- all official actions require authoritative server receipts
- emergency access/revocation is narrower than normal access, time-limited, justified, approved, and fully audited

Document the confidentiality boundary and data-flow diagram before implementation.

## 2. Paper requirements and lifecycle

Create a paper requirement from approved Prompt 12 examination cycle/course/component and Prompt 10 blueprint references:

- examination cycle/version, course/component, regulation/curriculum, exam type, marks, duration, language(s), number of sets, blueprint version, instructions/template, due dates, and release schedule
- setter model: internal, external, joint, panel, or institution-defined
- moderation model, translation requirements, answer-key/marking-scheme requirements, and approval quorum
- allowed source: approved question bank, new confidential questions, or configured combination
- reuse/exposure constraints and previous-paper exclusion references
- print/digital release mode and downstream logistics boundary
- draft, reviewed, approved, invitations_open, setting, submitted, moderation, correction, translation, final_review, finalized, set_selected, release_authorized, released, archived, suspended, compromised, and superseded states

Validate requirement completeness and contradictions before approval. Activated requirements are immutable; amendments preserve version and impact history.

## 3. Setter nomination and conflict controls

Implement:

- nomination by authorized HOD/Controller/exam cell using existing internal identity or privacy-minimal external invitee profile
- subject/course expertise, affiliation, effective dates, workload, eligibility, and prior assignment references
- conflict-of-interest declaration covering current teaching relationship, close relationship, coaching/private tuition, financial interest, authorship conflict, recent institutional association, and configurable categories
- confidentiality/NDA and acceptable-use declaration with policy/version, timestamp, and evidence
- nominee accept/decline, reason category, substitution, cancellation, and reappointment
- independent verification/approval before access grant
- restriction preventing setters from moderating/approving/selecting their own paper where policy prohibits it
- assignment expiry, immediate revoke, and downstream access/cache invalidation

Store only necessary external-person data with retention and identity verification. Never email or message actual paper content.

## 4. Time-bound external access

Provide a secure external-setter portal using the same React application boundary with isolated routes/scopes:

- single-use invitation acceptance with verified identity and institution-approved authentication
- mandatory MFA/step-up assurance for confidential access
- narrow assignment-specific entitlement, start/end window, allowed actions, download/print policy, and device/session policy
- no visibility of candidate lists, unrelated courses, other setters, other paper sets, or internal operations
- terms/NDA acknowledgement before first access and after policy changes
- session timeout, reauthentication, concurrent-session policy, revocation, and suspicious-access handling
- privacy-safe support/recovery requiring identity re-verification and no content disclosure to support staff

Invitation tokens are hashed at rest, short-lived, single-use, non-enumerable, and never logged. Account recovery cannot bypass the assignment approval chain.

## 5. Confidential authoring and submission

Support two controlled modes based on policy:

1. Secure in-platform authoring using a sanitized structured editor.
2. Secure encrypted file-package upload where institution-approved formats are required.

Implement:

- paper sections, instructions, questions/parts, marks, choices, pagination hints, diagrams/attachments, answer key, worked solution, and marking scheme
- references to immutable approved Prompt 10 question versions where authorized without copying them into general APIs
- new paper-local confidential questions stored only in this domain and never automatically promoted to the question bank
- draft autosave with optimistic concurrency, encrypted storage, and explicit server receipt
- client-side draft memory minimization and no persistent browser/mobile cache for secret content
- uploads through short-lived authorized endpoints, MIME/signature validation, malware scanning in an isolated encrypted pipeline, checksum, and quarantine
- safe document conversion/preview without sending content to an unapproved third party
- validation for section/marks/choice/blueprint totals, numbering, missing assets, key completeness, accessibility/print issues, and prohibited metadata
- formal submission that freezes a version and captures declaration, hash, timestamp, and manifest
- multiple independently submitted sets without cross-setter visibility

Do not allow arbitrary HTML/scripts/macros. Strip document metadata and hidden content according to policy while preserving a forensic original in restricted storage where required.

## 6. Blueprint compliance and quality validation

Validate each submitted set against the pinned Prompt 10 blueprint:

- total/section marks and duration
- unit/topic, CO, Bloom, difficulty, type, and marks distribution
- mandatory/optional/internal-choice structure
- language and translation requirements
- reuse/exposure/family constraints
- answer-key/rubric/marking-scheme completeness
- accessibility and print-readiness
- duplicate option/numbering/reference errors
- exact duplicate/fingerprint signals within authorized confidential scope

Persist a versioned compliance result with stable codes, expected/actual values, source version, and explanation. Do not put stems or keys in validation logs. Only policy-approved roles may see detailed confidential findings.

Warnings cannot silently pass if the requirement marks them blocking.

## 7. Moderator assignment and review

Implement:

- moderator nomination, eligibility, conflict declaration, NDA, acceptance, approval, and time-bound access
- blind review where setter identity should be hidden
- access to only assigned submitted set(s)
- structured checklist for correctness, ambiguity, syllabus/blueprint coverage, difficulty, time feasibility, marks, choices, language, bias/fairness, accessibility, originality, answer key, solution, and marking reliability
- confidential anchored comments that avoid copying full content into general workflow/audit stores
- accept, request correction, conditionally accept, reject, or recommend replacement
- setter correction loop producing a new immutable submission version
- independent moderator correction mode only where policy permits, with tracked diff and setter/authority acknowledgement
- multiple moderators/quorum and disagreement resolution
- SLA/aging reminders that contain no revealing content

No moderator can approve the final release unless the configured SoD explicitly permits that distinct role.

## 8. Translation governance

Support required paper languages through:

- source-language version pinned to translation assignment
- qualified translator nomination, conflict/NDA, acceptance, and restricted access
- side-by-side secure translation editor or encrypted package upload
- math/scientific notation, diagrams, units, terminology, RTL, font, and pagination handling
- question/part/option/key/marking-scheme alignment checks
- translator submission, language reviewer verification, correction, approval, and certification
- source changed/stale translation detection
- bilingual/multilingual final preview and layout validation

Machine translation may create a draft only if an approved provider/data-processing agreement exists; record provider/model/version and require human review. If absent, show `NOT_CONFIGURED`. Never send secret paper content to a consumer AI or unapproved external API.

## 9. Finalization and immutable paper sets

Implement finalization only after all required moderation, correction, translation, compliance, accessibility, and print checks pass:

- final paper content/version, answer key, solution/marking scheme, language variants, asset manifest, checksums, requirement/blueprint versions, approvals, and classification
- finalized, held, suspended, compromised, superseded, and archived statuses
- cryptographic content/package hash and KMS-backed envelope-encryption metadata
- separate access policies for paper versus answer key/marking scheme
- final preview through controlled server-rendered output
- no further edits; correction creates a new candidate version and repeats required approvals
- downstream invalidation event for superseded/revoked versions without content

Keep answer keys unavailable to printing/logistics roles unless explicitly required and separately authorized.

## 10. Controlled set selection

Support policy-driven selection among finalized sets:

- manual sealed selection by authorized committee
- deterministic cryptographic random selection executed at an authorized time from eligible set IDs
- optional primary/reserve/emergency set designation
- selection constraints preventing setter/moderator self-selection where configured
- two-person witnessed authorization, step-up/MFA evidence, reason, timestamp, and receipt
- selection commitment/hash and audit without revealing unselected content broadly
- no preview of candidate set content by selector unless separately authorized
- no re-selection after commitment except emergency workflow with incident/reason, invalidation, approval quorum, and preserved history

Record algorithm/version and unbiased selection method in an ADR. Do not claim randomness guarantees beyond the implementation/evidence.

## 11. Release windows and two-person control

Implement release packages with:

- selected final paper version, language/layout variants, print quantity instruction reference, schedule/session destination reference, opening/release time, expiry, and purpose
- prepared, first_approved, second_approved, sealed, released, retrieved, acknowledged, revoked, expired, and archived states
- two distinct authorized approvers; second approval uses fresh current-state validation and step-up/MFA
- release only within the configured time window and only if cycle/schedule/paper/set/access/key states are valid
- no release based on client clock or pre-signed long-lived URL
- just-in-time short-lived retrieval and acknowledgement receipt
- emergency early/late release requiring configured higher approval and incident reference
- revocation that immediately blocks new access and invalidates outstanding grants as far as technically possible

The application must never log or emit the object key, decrypted content, signed URL, or key material.

## 12. Confidential storage and key management

Use a dedicated confidential-storage abstraction:

- separate S3 bucket or rigorously isolated dedicated prefix/access point decided by ADR and threat model
- S3 Block Public Access, restrictive bucket/access-point policy, TLS-only, object versioning, encryption with customer-managed KMS key, and access logging that does not reveal content
- tenant/institution/purpose-aware encryption context using opaque IDs
- envelope encryption and key-reference/version metadata
- distinct KMS grants/roles for authoring, moderation, rendering, release, print retrieval, archive, and break-glass workflows
- no wildcard object access for application roles
- short-lived signed access created only after live authorization; prefer proxy/streaming or constrained credentials where safer
- checksum/integrity verification on upload, render, package, retrieval, and archive
- lifecycle transitions, retention/legal hold/Object Lock evaluation, and secure deletion policy
- backup/restore that preserves encryption and authorization boundaries

Secrets and key material stay in KMS/Secrets Manager. Local/test uses clearly labeled development keys/storage with synthetic content and cannot weaken production configuration.

## 13. Secure rendering, packaging, and watermarking

Create isolated asynchronous rendering/package jobs:

- deterministic template/version, fonts, page size, margins, numbering, headers/footers, instructions, barcodes/opaque package IDs, and language layout
- print-ready PDF and separately protected answer-key/marking package
- visible watermark configurable by institution, purpose, recipient/role, copy number, timestamp, and non-PII session reference
- optional forensic watermark metadata with documented limitations
- metadata stripping, embedded-object/macro removal, font embedding, and page-count validation
- output checksum, source-manifest hash, render-engine version, and quality-control result
- no third-party conversion unless explicitly approved for secret data
- generated artifacts remain encrypted and never enter general CDN/cache/search/index pipelines

Watermarking deters leakage; it does not guarantee prevention. Do not claim screenshot/photography protection.

## 14. Secure print and dispatch register

Implement governance for institution print room or approved external secure printer:

- print job request, authorized site/vendor, operator assignment, paper/package version, quantity, spoilage allowance, copy numbering policy, scheduled window, and destination reference
- printer/operator NDA/authorization and time-bound retrieval
- two-person retrieval/open/print/close where policy requires
- downloaded/retrieved, print_started, printed, quality_checked, counted, sealed, handed_over, dispatched, received, returned, destroyed, cancelled, and discrepancy states
- printed count, spoiled count, destroyed count, sealed packet count, package/seal identifiers, timestamps, and witnesses
- no answer key in paper print package
- encrypted delivery package and out-of-band secret exchange only through approved mechanism
- dispatch/handover/receipt records with signatures or acknowledgements, not full paper content
- mismatch, lost packet, damaged seal, late receipt, unauthorized access, and emergency replacement escalation

Prompt 14 owns examination-room packets and exam-day paper custody. Expose a minimal sealed-package handoff contract without implementing seating, invigilation, or opening at the room.

## 15. Digital delivery boundary

For future online assessment delivery, expose only:

- immutable release-package reference
- assessment/exam/session reference
- authorized open/close window
- encrypted content/key-envelope reference through a dedicated trusted service boundary
- revoked/superseded/compromised state
- minimal acknowledgement/invalidation events

Do not deliver questions to students or implement decryption in browsers/mobile clients in this prompt.

## 16. Access, view, download, and custody audit

Maintain content-free security audit records for:

- assignment/invitation/access grant/revoke
- confidential view/render/download/retrieval with actor, delegated role, tenant/institution, paper opaque ID, purpose, time, MFA assurance, session/device/IP risk metadata, correlation, outcome, and reason
- submission/moderation/translation/finalization/selection/approval/release
- print counts, custody handovers, discrepancy, archive, destruction, and legal hold

Audit data must not contain paper titles if those reveal sensitive course/exam metadata outside the permitted security boundary. Hash/minimize IP/device data according to policy and privacy requirements. Audit viewers cannot retrieve content merely because they can view audit.

## 17. Exposure and incident response

Implement suspected/confirmed exposure workflow:

- report, severity, affected opaque paper/set/package/version, discovery time/source, suspected scope, and evidence references
- immediate suspend/revoke/quarantine without deleting evidence
- invalidate release grants and notify only authorized incident roles using content-free messages
- select reserve/emergency set through governed workflow
- regenerate/repackage/redistribute with new versions/keys/tokens where required
- preserve forensic access/object/KMS/audit evidence under legal hold
- investigation, containment, decision, regulatory/institutional notification references, remediation, closure, and post-incident review
- downstream invalidation events to Prompt 14/future delivery without exposing content

Break-glass access requires a declared incident, minimum scope/duration, strong step-up, independent approval or post-event review as policy permits, and prominent audit/alerts. It never bypasses tenant isolation.

## 18. Archive, retention, and destruction

Implement post-examination archival:

- archive trigger after authorized cycle/session milestone
- content package, answer key, manifest, approvals, selection/release/print/custody evidence, incident references, retention class, and legal hold
- access reduced to archival roles with step-up and purpose
- retrieval request/review/approval/expiry/audit
- immutable retention/versioning where policy requires
- scheduled destruction eligibility, approval, KMS/object deletion workflow, verification, and certificate/reference
- legal hold prevents destruction and records release from hold

Do not promise cryptographic erasure without verifying KMS key/object/version/backup lifecycle behavior.

## 19. Notifications and operational dashboards

Notifications may include only opaque assignment/reference, action type, deadline, and secure authenticated deep link. Never include course title, paper title, content, marks distribution, setter identity to peers, keys, comments, filenames, URLs, or selection outcome beyond recipient need.

Provide authorized dashboards for:

- requirement readiness
- invitation acceptance/decline/expiry
- setter submission and SLA aging
- moderation/correction/translation/quality status
- finalization/selection/two-person release readiness
- print/dispatch/custody counts and discrepancies
- exposure incidents/revocation status
- archive/retention/legal hold
- storage/render/job/event/key/access health with no secret content

Apply field/row minimization and purpose-specific views.

## 20. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- paper requirement derive/create/validate/review/approve/amend/state
- setter/moderator/translator nominate/invite/accept/decline/declaration/assign/revoke
- confidential draft/upload/preview/validate/submit/version compare within permitted scope
- moderation/checklist/comment/correction/recommendation/quorum
- translation/align/review/certify/stale status
- finalization/quality check/hold/suspend/supersede
- eligible-set query/select/commit/emergency reselect
- release package/first approval/second approval/seal/retrieve/acknowledge/revoke
- secure render/package/status/quality
- print job/retrieve/count/spoil/destroy/seal/handover/dispatch/receive/discrepancy
- custody event and Prompt 14 handoff
- exposure report/contain/revoke/reserve-set/recover/investigate/close
- archive/retrieve/legal hold/destruction approval/status
- content-free dashboards/audit/operational queues

Use confidential-content DTOs distinct from metadata DTOs, bounded pagination, non-enumerable identifiers, RFC 7807 with non-revealing errors, optimistic versions, idempotency keys, correlation IDs, server time, strict cache headers, rate limits, real-time authorization, and generated clients.

Define least-privilege permissions for requirement maker/checker, nominee management, setter authoring/submission, moderator review, translation, final quality, set selection, first/second release approval, confidential retrieval, render, print retrieval/operation/witness, dispatch/custody, incident response, archive/legal hold/destruction, content-free audit, and platform health.

Enforce contextual ABAC plus RBAC and SoD. Platform operators have no content-decrypt/read entitlement. Database administrator or S3 console access must not alone provide usable plaintext; document residual privileged-access risks and controls.

Use transactional outbox with content-free events containing opaque references and minimum state. Consumers are idempotent and tolerate retries/out-of-order events. Never emit content, revealing filenames/titles, object keys, signed URLs, hashes usable for guessing content, comments, or identities beyond necessity.

## 21. React web interfaces

Implement hardened accessible responsive interfaces for:

- exam-cell paper-requirement setup/readiness/amendment
- nominee/conflict/NDA/invitation/access administration
- isolated setter authoring/upload/validation/submission workspace
- moderator secure review/checklist/comments/correction/version diff
- translation/alignment/review/certification workspace
- compliance/print/accessibility quality checks and finalization
- blind eligible-set status and witnessed selection
- two-person release queue with current-state/MFA/SoD evidence
- secure rendering/quality and print/dispatch/custody registers
- exposure incident containment/recovery
- archive/legal-hold/retrieval/destruction
- content-free operational dashboards and security audit

Use `Cache-Control: no-store`, prevent content in browser persistence/service workers, clear in-memory views on timeout/context loss, reauthorize every sensitive route/action, minimize clipboard/print/download, show watermark/session classification, and provide safe inactivity handling. Browser controls are defense-in-depth, not absolute exfiltration prevention.

Meet WCAG 2.2 AA intent without weakening confidentiality: keyboard navigation, screen-reader semantics, visible focus, zoom, correct language/RTL, accessible math/diagrams, non-color-only status, and an approved accommodation process for authorized personnel.

## 22. React Native Android/iOS interfaces for every role

Build genuine native interfaces using real APIs, not WebViews or placeholders. Secret-content mobile access is restricted by policy and risk, not assumed merely because a role exists.

### Internal/External Setter

- invitation, identity/MFA setup, conflict/NDA declaration, assignment status, deadlines, secure messages, validation summary, and submission receipt
- metadata/draft status and controlled upload of an encrypted prepared package where policy permits
- full secret authoring/viewing offline is disabled by default; complex authoring remains hardened web-first

### Moderator/Language Reviewer

- assigned queue, deadline, version/validation summary, conflict declaration, checklist, recommendation, and correction-request status
- content review on mobile only when explicit policy/device compliance/live authorization permits; no offline cache, screenshot guarantee claims, or bulk download

### Translator

- assignment/declaration/status, source-version freshness, secure submission receipt, correction queue
- full translation work remains web-first unless approved secure mobile controls exist

### Examination Cell/Confidential Section Staff

- requirement/invitation/submission/moderation/translation/finalization/readiness queues
- content-free operational actions and secure approvals within delegated scope
- print/dispatch/custody/discrepancy updates using opaque package/seal identifiers
- high-volume content access/rendering remains hardened web-first

### Controller of Examinations/Dean/Authorized Approver

- current-state readiness, validation, quorum, SoD, risk, version, and impact summaries
- step-up first/second approval, selection witness, release/revoke, emergency-set, and incident decisions
- authoritative server receipt; no secret content in push notifications or offline cache

### Secure Print Operator/Print Supervisor

- assigned time-bound job, step-up retrieval authorization, quantities/copy ranges, start/complete/count/spoil/destroy/seal actions, witness capture, and handoff receipt
- only the exact paper package needed; answer key hidden; no persistent cache/gallery/share target
- offline printing workflow is prohibited unless separately engineered and approved

### Dispatch/Custody Officer

- sealed opaque package list, barcode/QR scan, handover/receive, seal/count check, discrepancy, location/site reference, and receipt
- never displays paper content or answer key

### Security/Incident Response

- content-free alert, affected opaque references, active access/release state, containment checklist, revoke/quarantine, evidence references, and recovery approvals
- break-glass action requires step-up, reason, scope, expiry, and server receipt

### Internal Auditor/University Observer

- purpose/time-limited read-only workflow, approval, custody, SoD, and content-free access audit
- no paper content or key unless separately granted through exceptional policy

### HOD/Program Coordinator/Faculty Not Assigned as Setter

- only nomination/readiness status specifically delegated; no paper/setter identity/content access by default

### Student/Guardian/Invigilator/General Faculty/Finance/Admissions/Placement

- no question-paper, set, key, setter, moderator, selection, print, or release access
- future exam-day instructions/status remain in their owning modules

### Tenant Administrator

- workflow/policy configuration only where separately authorized; no automatic examination-secret access

### Platform Operations

- storage/KMS/render/job/event/notification service health, masked tenant identifiers, error codes, and trace IDs
- no content, filenames, titles, object keys, signed URLs, assignments, identities, or selection details

Mobile-wide requirements:

- secure OS keystore, app lock and fresh step-up for sensitive actions, device registration/compliance/risk evaluation, rooted/jailbroken-device fail-closed policy for secret access
- no examination-secret offline cache by default; encrypted tenant/user-partitioned minimal metadata cache with short expiry and remote purge
- disable backups, content in app switcher previews, unintended share/open-in, and screenshot/screen-recording where OS supports it, while documenting limitations
- camera/scanner stores no frames by default; clipboard is minimized/cleared where feasible
- deep links contain opaque references, reauthenticate, reauthorize, validate state/nonce, and fetch current state
- explicit pending/approved/released/revoked/expired/stale states; official actions require server receipts
- accessibility, localization, RTL, dynamic type, low-connectivity recovery for metadata/custody events, and safe idempotent retry
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role, including explicit no-access and web-first controls

## 23. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized metadata/workflow tables such as:

- paper requirement/version/source/blueprint reference/state history
- confidential person profile/invitation/declaration/assignment/access grant/revocation
- paper/set/version/language version/asset manifest/submission
- compliance run/result and confidential comment reference
- moderation assignment/checklist/decision/correction round/quorum
- translation assignment/version/alignment/review/certification
- finalization/quality check/package/hash/key reference
- set eligibility/selection commitment/witness/emergency reselection
- release package/window/approval/retrieval/acknowledgement/revocation
- render job/artifact manifest/quality result/watermark metadata
- print job/operator/witness/count/spoil/destruction/seal
- dispatch/handover/receipt/custody event/discrepancy
- exposure incident/affected artifact/containment/action/evidence/legal hold
- archive/retrieval request/retention/destruction record
- content-free access audit and processing checkpoint

Keep actual encrypted objects in the dedicated confidential storage abstraction, not general document tables or database large objects. Database fields containing limited confidential draft structures, if unavoidable, require application-level envelope encryption and blind indexing only after ADR; prefer encrypted object storage.

Every tenant-owned row carries tenant/institution/cycle/course and applicable assignment/classification scope; foreign keys cannot cross tenants; repositories require explicit predicates; enable and force RLS where constitutionally required. Add immutable-version, unique/idempotency, assignment, SoD, temporal, quorum, hash, state, optimistic-lock, and custody-sequence constraints plus appropriate indexes/retention fields.

Test setter, moderator, translator, exam-cell, approver, print, custody, incident, auditor, worker, migration, operations, and unprivileged database roles independently. No technical database role receives general plaintext/content access.

## 24. Security validation and tests

Implement and run:

- requirement lifecycle, blueprint/version validity, number-of-set/language/quorum/release-window validation, and immutable amendments
- internal/external invitation token hash/single-use/expiry/revoke/recovery and assignment-only access
- conflict/NDA/MFA/session/device/window controls and author-moderator-approver-selector-release SoD matrices
- confidential authoring autosave/concurrency/submission/versioning and no browser/mobile persistence
- upload MIME/signature/malware/quarantine/metadata stripping/macro/unsafe archive and checksum behavior
- blueprint totals/coverage/choice/key/accessibility validation without content logging
- moderator correction/quorum/disagreement/identity blinding and translation alignment/stale-source cases
- finalization immutability, separate key permissions, supersede/invalidate, and integrity verification
- selection eligibility/randomness procedure/reselection controls/witnesses and no content visibility to selectors
- two-person release with distinct humans, fresh step-up, server clock, boundary times, revoke/expiry, duplicate requests, and retrieval acknowledgement
- S3/KMS policy tests: public denial, tenant/context mismatch, role/grant separation, short-lived access, object version/checksum, local/test production guard
- rendering determinism, metadata stripping, watermark, output segregation, no general CDN/cache/index access
- print count/spoil/destroy/seal/handover/discrepancy and answer-key denial
- custody event concurrency/order/idempotency and Prompt 14 minimal handoff contract
- exposure quarantine/revoke/reserve-set/repackage/legal hold/break-glass and downstream invalidation
- archive retrieval approval/expiry/hold/destruction and backup/restore authorization
- metadata non-disclosure through list/search/count/facet/autocomplete/errors/timing/logs/traces/metrics/events/audit/notifications/support/crash reports/test snapshots
- RLS negative tests across tenant, institution, cycle, course, assignment, setter, moderator, translator, approver, printer, custody, auditor, technical roles, students, and general faculty
- web accessibility plus Playwright confidential journeys and browser storage/cache/timeout/context-loss tests
- Android/iOS journeys for all roles, intentional denial roles, device compliance, no secret offline cache, app-switcher/backup/share controls, remote purge, step-up, deep-link authorization, QR custody scan, and server receipts
- outbox retry/reordering, worker crash recovery, KMS/S3/scanner/renderer/notification outage, key rotation, backup restore, reconciliation, and documented target-volume performance

Add automated redaction/canary tests using synthetic unique markers and fail if markers appear in logs, traces, metrics, events, audit payloads, error responses, search indexes, notifications, snapshots, or non-confidential storage.

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim penetration, device, KMS policy, printer, external-setter, or iOS evidence not actually executed.

## 25. Documentation and completion gate

Update:

- OpenAPI and generated clients
- metadata-only ERD/data dictionary
- confidential-paper glossary, data-flow/trust-boundary, and lifecycle diagrams
- classification/field-response/access/MFA/device/SoD matrix
- external setter/moderator/translator identity, invitation, NDA, conflict, and support procedures
- confidential storage/KMS/encryption-context/key/grant/access/rotation/backup/retention design ADR
- authoring/upload/scanning/rendering/watermarking/metadata-stripping design
- blueprint validation, moderation, translation, finalization, selection, and two-person release specifications
- secure print/dispatch/custody register and Prompt 14 handoff contract
- exposure/break-glass/legal-hold/archive/destruction threat model and runbooks
- mobile role-feature matrix with web-first/no-access states
- runbooks for invitation compromise, lost device, unauthorized view, leaked paper, wrong set, failed render, KMS/S3 outage, print mismatch, broken seal, release failure, emergency reserve set, key rotation, audit investigation, restore, and disaster recovery
- role guides for setter, moderator, translator, examination cell, Controller/approver, print operator, custody officer, incident responder, auditor, tenant administrator, and platform operations

The completion gate passes only when:

1. Paper requirements derive from immutable exam-cycle and blueprint versions and enforce complete lifecycle/history.
2. Internal/external setters, moderators, and translators receive only assignment-scoped, time-bound, MFA-protected access after declarations and approvals.
3. Confidential content is encrypted, isolated, malware-scanned, safely rendered, and absent from logs, events, audit values, notifications, search, analytics, snapshots, and general storage/cache.
4. Multiple paper sets can be authored/submitted, blueprint-validated, moderated, corrected, translated, quality-checked, and finalized as immutable versions.
5. Author/reviewer/approver/selector/release conflicts and configured SoD cannot be bypassed.
6. Set selection is witnessed, versioned, explainable, and cannot be silently rerun.
7. Final release requires two distinct authorized people, fresh step-up, valid server-side window/state, short-lived retrieval, receipt, and revocation.
8. Rendering, watermarking, print counts, spoilage/destruction, sealing, dispatch, and custody maintain integrity without exposing answer keys.
9. Exposure response can revoke/quarantine, preserve evidence, activate a reserve set, repackage, invalidate downstream use, and enforce legal hold.
10. Archive/retrieval/retention/destruction preserve authorization, integrity, approvals, and verifiable lifecycle limitations.
11. Every relevant role has a meaningful native Android/iOS workflow or explicit secure no-access state; secret content remains web-first/no-offline by default.
12. Every tenant table has explicit predicates, forced RLS as required, constraints, and cross-tenant/cross-role negative tests.
13. OpenAPI/events/generated clients, migrations, security/redaction/accessibility/observability checks, docs, ADRs, runbooks, and all environment-available tests pass.
14. No real examination questions, exam-day logistics, student delivery, answer evaluation, marks, results, attainment, or fake production integration was implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, paper lifecycle/setter/moderation/translation/selection/release/storage/rendering/print/custody/incidents/archive, web, Android, iOS, security/confidentiality/tenancy/RLS/SoD/MFA/audit/idempotency, marker-leak tests and all exact commands/results/exit status, docs/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(exams): implement secure question paper governance`

Stop. Do not begin Prompt 14 or implement examination logistics, seating, invigilation, or answer-script custody.
```

---

## Review Checklist Before Prompt 14

- Paper requirements pin approved exam-cycle and blueprint versions.
- Setter, moderator, translator, approver, selector, release, print, and custody roles have time-bound least privilege and enforced SoD.
- Confidential content never enters general logs, events, audit values, search, notifications, caches, analytics, or fixtures.
- Paper sets are immutable, blueprint-validated, moderated, translated, finalized, and integrity-hashed.
- Selection is witnessed and final release requires two distinct step-up-authenticated approvers.
- Storage, KMS, rendering, watermarking, print, dispatch, incident, archive, and destruction controls are documented and tested.
- Native mobile roles are useful while secret content remains web-first and offline-disabled by default.
- Every tenant table has RLS and negative isolation tests.
- Only synthetic paper fixtures exist in the repository.
- No Prompt 14+ logistics, exam-day, evaluation, marks, result, or attainment workflow was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 14 until these conditions pass.
