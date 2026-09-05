# Claude Code Prompt 17

## Grade Cards, Transcripts, Certificates, and Verification

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–16 passed, were reviewed, and were committed  
**Scope:** Versioned official-document templates, frozen data snapshots, document numbering, rendering, issuance, digital-signature boundary, QR verification, service requests and fees, reissue/correction/revocation, bulk jobs, and role-specific interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially grade cards, marks memos, transcripts, certificates, gazettes, official templates, document numbering, signatures, verification, service requests, fees, retention, privacy, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, and repository conventions.
3. Inspect Prompt 05 authoritative student identity/program history, Prompt 06 degree-audit references, Prompt 12 hall-ticket behavior to reuse rather than duplicate, Prompt 16 approved/published result evidence, Prompt 11 fee/payment evidence, and Prompt 02 workflow/document/audit/outbox services.
4. Inspect OpenAPI/generated clients, PostgreSQL RLS, permissions/SoD, data dictionary, object storage, malware scanning, document generation, KMS/Secrets Manager, notification service, jobs/observability, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, modify source student/result data, claim a digital signature without a configured trusted signer, execute arbitrary template code/HTML, implement revaluation adjudication, or create a new result calculation engine.

Implement a bounded `official-documents` domain. It owns document definitions, safe templates, immutable source snapshots, rendering, numbering, issuance, verification, reissue/correction/revocation, service-request orchestration, and lifecycle evidence. It does not own student master data, marks/results, financial ledgers, degree-award decisions, or revaluation.

## 1. Official-document invariants

Enforce:

- every issued document is tenant/institution/legal-entity/document-type/subject scoped and references authoritative immutable source versions
- templates are versioned, effective-dated, reviewed, approved, immutable after activation, and rendered through a restricted declarative model
- official data is server assembled; clients never submit marks, GPA, credits, identity, classification, or eligibility values for rendering
- preview uses synthetic or clearly watermarked non-official authorized data and can never become an issued document
- document/serial numbers are concurrency-safe, unique in their configured series, never reused, and preserve void reservations
- issued artifacts are immutable; correction/reissue/supersession/revocation creates new lifecycle records and retains history
- public verification uses opaque non-enumerable tokens and returns minimum necessary information
- “digitally signed” is true only after an authoritative configured signer response and signature validation
- every issue/download/print/share/verify/revoke action is authorized and audited without logging document content or verification tokens
- official mobile actions require authoritative server receipts

Document the data-source, template, rendering, numbering, signature, verification, and lifecycle trust boundaries.

## 2. Supported document catalogue

Implement configurable definitions for:

- semester grade card/marks memo
- consolidated marks memorandum
- official transcript
- provisional certificate
- program/course completion certificate
- bonafide certificate
- study certificate
- conduct certificate with governed data/review rather than arbitrary claims
- migration/transfer/medium/instruction certificate reference where institution policy supports it
- rank/merit/achievement certificate only from an authoritative future decision reference
- no-backlog or academic-status certificate where regulation permits
- degree-eligibility list
- result gazette
- configurable institution service certificate built only from approved data fields and rules

Reuse Prompt 12 hall-ticket issuance/verification; do not create a conflicting second implementation. Define versioned aliases/extensions only if a shared document service is deliberately extracted through an ADR.

Each document type declares source contracts, required approvals, intended audience, classification, fee code, SLA, validity/expiry, numbering series, signer requirements, verification response, retention, and reissue/revocation policy.

## 3. Authoritative source snapshot assembly

Build immutable snapshots from:

- Prompt 05 student identity, name history, identifiers, program/admission/completion status, and approved photo only if needed
- Prompt 03/06 institution/program/regulation/curriculum/course/credit/degree-audit references
- Prompt 16 approved published result versions, course outcomes, grades, credits, SGPA/CGPA, standing, classification, withholding/release, and supersession status
- approved conduct/completion/no-dues/award references from owning domains
- Prompt 11 fee/payment/waiver evidence for service requests
- institution/legal-entity/signatory/title/branding configuration versions

Persist source ID/version/hash/effective date and assembly time. Reject missing, unpublished, withheld, superseded, invalidated, cross-student, cross-regulation, or cross-tenant evidence according to type policy.

Do not copy mutable source tables or recalculate results. A source invalidation marks affected documents for review/supersession; it never silently rewrites an issued artifact.

## 4. Safe template model

Implement a restricted declarative template schema supporting:

- page size/orientation/margins, sections, grids, tables, labels, static text, approved fields, logos/seals, signature blocks, QR position, headers/footers, pagination, watermark, and locale
- controlled iteration over approved bounded collections such as courses/periods
- allowlisted formatting for date, exact decimal, GPA, credits, identifier masking, and localized labels
- conditional visibility using a validated finite expression model limited to approved fields/operators
- typography, Unicode, regional languages, RTL, math/symbol fonts, wrapping, and page-break rules
- accessibility reading order, table headers, document title/language, and alternative descriptions
- print and mobile-view variants derived from the same semantic schema

Disallow arbitrary JavaScript, Java, SQL, SpEL, template-engine reflection, filesystem/network access, macros, remote scripts, unsafe HTML/CSS, unapproved URLs, and unbounded loops.

Version the schema and build migrations/compatibility tests for stored templates.

## 5. Template lifecycle and governance

Implement:

- draft, validation_failed, review, changes_requested, approved, active, suspended, retired, and superseded states
- scope by tenant/institution/legal entity/campus/program/regulation/document type/language/effective date
- editor with approved data dictionary and sample values
- synthetic preview carrying prominent `SAMPLE — NOT OFFICIAL` watermark
- schema, source-field, overflow, pagination, accessibility, logo/seal, numbering, signature, QR, and localization validation
- field-level/version diff, reviewer comments, maker-checker approval, activation, and future-effective scheduling
- conflict detection for overlapping active templates
- amendment by new version only
- emergency suspension with affected-job/document impact

No real student/result data in template fixtures, snapshots, source control, or visual regression baselines.

## 6. Branding, seals, and signatories

Implement effective-dated governed references for:

- institution/legal entity name, address, accreditation/affiliation text, logo, seal, and authorized regulatory identifiers
- signatory office/role, display name/title, signature method, effective dates, delegation, and permitted document types
- wet-signature image only if institution policy permits, encrypted and tightly access-controlled
- digital-signature certificate/provider reference without storing private keys
- multi-signature and countersignature order

Brand/signatory changes never alter already issued documents. Prevent inactive, expired, unauthorized, or conflicted signatories from approving new issuance.

## 7. Concurrency-safe numbering

Implement configurable series by institution/legal entity/document type/fiscal or academic year/campus/program where required:

- prefix/suffix and zero-padded server sequence
- optional non-sensitive checksum
- reserved, issued, void, expired-reservation, and superseded states
- atomic allocation under concurrency
- no reuse after failure/void
- gap policy documented; never “repair” gaps by reuse
- import/reference of approved legacy numbers through controlled workflow
- public verification never exposes sequential lookup

Do not encode DOB, category, gender, marks, or other sensitive data in identifiers.

## 8. Deterministic rendering

Implement asynchronous rendering from immutable source and template snapshots:

- canonical render request and idempotency key
- deterministic page layout to the extent supported, with engine/font/template versions recorded
- PDF/A option where validated and institutionally required
- accessible tagged PDF target or an accompanying accessible HTML/text representation when renderer limitations are documented
- embedded approved fonts, Unicode/regional-language support, vector/raster asset controls, and safe image processing
- metadata minimization, no local filesystem leakage, and fixed creation metadata strategy for reproducibility
- artifact checksum, page count, size, render manifest, quality result, and storage reference
- retry, timeout, cancellation before issuance, dead-letter, and orphan-object reconciliation
- no external conversion SaaS unless explicitly approved for the data classification

Identical canonical inputs must produce equivalent semantic content and stable manifest values; document any non-deterministic PDF fields and normalize them before checksum where safe.

## 9. Quality assurance

Validate before issuance:

- required fields/source versions
- student identity and program/result alignment
- period/course ordering and pagination
- totals/GPA/credits copied exactly from Prompt 16 evidence
- multilingual glyph/font coverage
- clipping, overlap, orphan rows, blank/unexpected pages, and QR/signature placement
- document number and template/signatory validity
- accessibility metadata and alternative format availability
- checksum/integrity and malware-safe output
- withheld/superseded/source-invalidated state

Support automated checks plus human quality review where configured. Quality reviewers may approve/return but cannot edit source values.

## 10. Digital signature integration boundary

Define provider-neutral signing:

- signing profile/certificate alias, permitted document types, signatory role, appearance/reference, timestamp requirement, and expiry
- submit exact artifact hash through an approved adapter
- pending, requires_action, signed, failed, rejected, expired, revoked_certificate, and unavailable states
- idempotency, callback signature validation, timestamp/replay protection, retry/requery, and audit
- verify signed artifact/hash/certificate chain/timestamp response before marking signed
- retain unsigned render and signed artifact as distinct immutable versions
- certificate renewal/rotation and affected-document policy

Private keys stay with approved HSM/provider/KMS-compatible boundary and never in application code/database. Provide a deterministic fake signer only for local/test profiles, visibly labeled and impossible to activate in production. Without a provider, show `NOT_CONFIGURED`; never add a signature image and call it digitally signed.

## 11. Issuance workflow

Implement:

- single, request-driven, and approved bulk issuance
- readiness, source snapshot, template, number reservation, render, QA, sign, final approval, issue, release, and notification
- draft_requested, validating, fee_pending, approved, queued, rendering, quality_review, signing, issuance_ready, issued, released, failed, cancelled, superseded, and revoked states
- maker-checker/registrar/controller/signatory approval rules by document type
- step-up authentication for high-risk bulk issuance, legacy number import, manual override, and revocation
- atomic link among issue record, number, source/template/signature versions, artifact hash, and verification token
- durable issuance receipt
- partial bulk-job handling with per-item status and no duplicate numbers/documents

No document is “issued” until all configured mandatory stages are authoritative and complete.

## 12. Student service requests and fees

Implement requests for eligible document types:

- applicant/student/alumni requester identity and authorized guardian/delegate boundary
- document type, purpose, delivery method, copies, language, urgency, declaration, and supporting evidence
- eligibility preview from authoritative source contracts
- request, correction, withdraw, reject, approve, process, issue, deliver, and close lifecycle
- SLA, work queue, status timeline, and communication
- fee code/request to Prompt 11, authoritative pending/paid/waived/refunded/reversed status
- no payment screenshot or return-page acceptance as proof
- reasoned waiver and exceptional manual request under SoD

The request cannot alter student/result data. Source corrections route to owning domains and pause the request.

## 13. Release, delivery, download, and print

Support:

- authenticated student/alumni/staff retrieval according to current status and relationship
- short-lived signed/streamed downloads with `no-store`, authorization at issuance time, and expiry
- in-person pickup acknowledgement, registered-post/courier reference, authorized electronic delivery, and future government locker/provider boundary
- duplicate-copy marking, print count/purpose, and audit
- native secure view/share/download where policy permits
- document classification and privacy-minimized notifications
- delivery failed/returned/unclaimed and re-delivery workflow

Do not email sensitive documents as open attachments by default. Never include a verification token or full academic result in push/SMS/email.

## 14. QR and third-party verification

Implement opaque, high-entropy, non-enumerable, revocable verification tokens:

- QR encodes only approved HTTPS verification URL plus opaque token, or signed minimal payload if explicitly required
- store token hash, issue version, key/version reference, expiry/revocation, and rate-limit metadata
- public response reveals only institution, document type, valid/invalid/revoked/superseded/expired status, masked holder identity, issue date/year, and minimal approved outcome fields
- authenticated verifier path for employers/universities with consent/purpose and richer field comparison where policy permits
- server-side current status check even for signed tokens
- token rotation/reissue and revocation
- rate limits, bot protection, anomaly monitoring, and no count/facet/enumeration leakage
- verification receipt/reference for authorized requester without exposing prior verifier identities to the student unless policy permits

QR verification confirms current record status; it is not complete identity proof and does not make screenshots/copies trustworthy.

## 15. Verification requests and consent

Support formal third-party verification:

- employer/university/government/other organization reference
- requester identity/domain verification boundary, purpose, requested fields, student consent/legal basis, expiry, and status
- student approve/deny/revoke where consent is the basis
- exact field-level comparison to current authoritative issued document/version
- verified, partial_match, mismatch, revoked, expired, unable_to_verify outcomes with minimal explanation
- manual registrar review for discrepancies without exposing unrestricted records
- audit, SLA, optional Prompt 11 fee reference, and signed response boundary

Do not create a searchable public student directory.

## 16. Correction, reissue, supersession, and revocation

Implement distinct workflows:

- duplicate/reprint with same underlying source where policy allows
- reissue due to loss/damage/name-format or template/signatory change according to policy
- correction after authoritative source correction
- supersession after Prompt 16 result correction or student-record correction
- revocation for fraud/error/legal order/compromise

Require original document/version, reason, source evidence, impact, fee/refund reference, review/approval, step-up/SoD, new number policy, artifact/version linkage, token invalidation, downstream notification, and audit.

Never edit an issued PDF or overwrite its object. Public verification must immediately show revoked/superseded status and, where safe, direct to the current version without leaking data.

## 17. Bulk generation and gazettes

Implement durable jobs for authorized cohort/program/cycle/period scope:

- immutable candidate/source population and exclusions
- preview counts and blocking issues
- template/source/series/signature/verification configuration
- chunking/checkpointing, progress, retry, cancellation before issue, idempotency, and crash recovery
- per-item quality/sign/issue/release status
- aggregate control totals and completion reconciliation
- no archive of all student documents downloadable through one unrestricted link

Result gazettes and degree-eligibility lists require field minimization, approval, classification, watermark, controlled audience, and versioned source manifest. Do not interpret the list as degree award unless an authoritative decision says so.

## 18. Archive, retention, legal hold, and destruction

Implement:

- immutable issue metadata, source/template/signature manifests, artifact/checksum, verification status, lifecycle history, and delivery evidence
- retention class by document type/jurisdiction/institution
- legal hold and release-from-hold
- archive retrieval with purpose, approval, step-up, expiry, and audit
- destruction eligibility, approval, object/version/backup/KMS implications, result, and certificate/reference
- preservation of essential revocation/verification tombstone where lawful and required

Do not claim cryptographic erasure without verifying storage versioning, replication, backups, and keys.

## 19. Search, dashboards, reports, and exports

Provide authorized views for:

- template/version/approval/readiness
- request volume/SLA/fee status
- generation/render/quality/sign/issue/release/delivery failures
- numbering reservations/gaps/voids without reusable gaps
- document issue/reissue/correction/supersession/revocation
- signature provider/certificate status
- verification volume/anomalies and formal verification requests
- source invalidation and affected-document queue
- archive/retention/legal hold/destruction

General search uses only authorized metadata, never extracted document contents by default. Exports require purpose, scope, minimization, watermark/classification, encryption, formula-injection prevention, short expiry, download audit, and large-job controls.

## 20. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- document-type/source-field/series/signatory/signing-profile configuration
- template draft/validate/preview/review/approve/activate/compare/suspend/retire
- source snapshot/validate/impact/status
- render/create/status/quality/retry/cancel
- issuance request/preview/approve/job/status/issue/release/receipt
- service request/eligibility/fee/status/correct/withdraw
- authenticated download/print/delivery/acknowledgement
- public-minimal QR verify and authenticated formal verification
- verifier request/consent/review/response/revoke
- duplicate/reissue/correction/supersede/revoke
- bulk job/gazette/degree-eligibility list
- archive/retrieve/legal hold/destruction
- dashboards/reports/governed exports/operational queues

Use explicit role-shaped DTOs, bounded pagination, allowlisted filters/sorts, RFC 7807 with non-revealing errors, optimistic versions, idempotency keys, correlation IDs, server time, strict cache headers, rate limits, authorization, audit, and generated clients.

Define least-privilege permissions for document configuration, template author/review/approve, source snapshot, render/QA, number administration, signatory/signing operation, issue maker/checker, release/delivery, student/alumni request, fee status, duplicate/reissue/correct/revoke, public/authenticated verify, consent, gazette/bulk, archive/legal hold/destruction, report/export, audit, and platform health.

Enforce SoD for template activation, legacy number import, source override, final issuance, bulk release, correction/revocation, formal verification response, and destruction. Platform operations see service/job/storage/signer health, masked tenant/job references, errors, and trace IDs only—not document content, student identity/results, serials, tokens, or signatures.

Use transactional outbox/inbox. Events carry opaque document/source references and minimal state; never include academic data, document content, full names/IDs, QR tokens, object keys, signed URLs, or signature material. Consumers tolerate retries and out-of-order invalidations.

## 21. React web interfaces

Implement accessible responsive interfaces for:

- document catalogue/source fields/policies/series/signatories/signing profiles
- safe template designer plus raw schema view, synthetic preview, validation, accessibility and version diff
- service-request intake/work queue/SLA/fee status
- source validation and affected-document queue
- single/bulk issuance preview/progress/quality/signature/reconciliation
- document lifecycle, download/delivery, duplicate/reissue/correction/revocation
- public minimal verifier and authenticated formal-verification workbench
- student consent management
- gazette/eligibility-list generation and controlled release
- archive/legal hold/retrieval/destruction
- dashboards/reports/governed exports/audit/operations

Meet WCAG 2.2 AA intent: keyboard template alternatives, screen-reader semantics, visible focus, high zoom, correct reading order, tagged/alternative formats, localized/RTL content, non-color-only status, and document preview that never sacrifices accessibility for visual fidelity.

## 22. React Native Android/iOS interfaces for every role

Build genuine native interfaces using real APIs, not WebViews or placeholder menus.

### Student/Alumni

- issued document wallet/list with status/version
- secure view/download/share where policy permits
- request certificate/transcript/duplicate/correction, upload evidence, pay through Prompt 11, track SLA/status, and acknowledge delivery
- approve/deny/revoke consent-based verification requests
- see revoked/superseded warning and current replacement
- encrypted allowlisted offline documents only when policy permits, with expiry/version/staleness and remote purge

### Guardian/Authorized Delegate

- request/status/retrieval only for explicitly permitted linked student/document types
- no automatic access from emergency-contact status and no adult-alumni access without delegation

### Faculty/Mentor/HOD/Program Coordinator

- initiate or recommend permitted bonafide/study/conduct/completion requests, verify academic source readiness, and review assigned cases
- no ability to alter source data, results, numbers, or issued artifacts

### Examination Cell/Controller of Examinations

- grade-card/memo/gazette source readiness, bulk job status, QA exceptions, issue/release/supersession queues
- step-up approvals within scope; template editing and large bulk work remain web-first

### Registrar/Academic Office/Authorized Signatory

- transcript/certificate request queue, source/fee/quality/signature summary, approve/reject/sign/release/revoke with step-up and authoritative receipt
- no client-side signature claim or source editing

### Certificate/Records/Front-Office Staff

- request intake, identity/purpose verification, case status, pickup/courier acknowledgement, and re-delivery
- only assigned records and minimized academic data

### Finance Staff/Cashier

- Prompt 11 charge/payment/waiver/refund status for document requests
- no document-content, result-edit, issuance, or verification authority

### Quality/Accreditation Staff

- authorized template/completeness/gazette/eligibility evidence references and aggregate status
- no student document content unless separately purpose-authorized

### Third-Party Verifier

- public QR scan with minimal valid/revoked/superseded result
- authenticated consent/purpose-scoped verification request and response
- no directory/search/bulk lookup

### Auditor/Internal Quality

- time-bound read-only template/source/number/approval/signature/issuance/revocation/verification/audit evidence
- content only when explicitly purpose-authorized

### Tenant Administrator/Leadership

- configuration visibility and authorized aggregate dashboards
- no implicit student-document, signer, revocation, or verification-detail access

### Platform Operations

- render/storage/signer/job/event/notification health, masked tenant/job references, errors, and trace IDs
- no document content, identity/result data, serials, QR tokens, signatures, or verification details

Mobile-wide requirements:

- secure OS keystore, app lock/step-up for sensitive approvals, device/role/tenant checks, rooted/jailbroken-device policy
- encrypted tenant/user-partitioned allowlisted cache; purge on logout, role/relationship loss, tenant switch, remote revoke, source invalidation, document supersession/revocation, or expiry
- prevent backups/app-switcher previews/unintended share where supported; document screenshot limitations
- push payloads contain no academic values, serials, document files, QR tokens, or verification details
- deep links use opaque references, reauthenticate, reauthorize, and fetch current status
- explicit requested/pending/rendering/signing/issued/released/revoked/superseded/stale states
- requests, approvals, signatures, issuance, releases, consents, and delivery acknowledgements require server receipts
- accessibility, dynamic type, localization, RTL, offline/stale clarity, safe retries, and protected document viewer
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role and intentional web-first/no-access state

## 23. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized tables such as:

- document type/policy/source schema/version
- template/version/scope/field mapping/asset/review/activation
- brand/seal/signatory/delegation/signing profile
- number series/reservation/issue/void
- source snapshot/source item/hash/validation/invalidation impact
- service request/version/evidence reference/fee reference/SLA
- render job/manifest/quality result/artifact
- signature request/provider event/signed artifact/verification result
- document issue/version/lifecycle/receipt/release/delivery/download/print
- verification token/scan/formal request/consent/response
- reissue/correction/supersession/revocation
- bulk job/population/item/reconciliation/gazette
- archive/retention/legal hold/retrieval/destruction
- report/export/projection checkpoint

Every tenant-owned table carries tenant/institution/legal-entity/document-type and applicable student/program/result/request scope; foreign keys cannot cross tenants; repositories require explicit predicates; enable and force RLS where constitutionally required. Add unique/idempotency/series, immutable-version, source-hash, state/temporal, optimistic-lock, signature/artifact hash, token hash, SoD, retention, and supersession constraints plus appropriate indexes.

Test student/alumni, guardian/delegate, faculty/HOD, exam cell, registrar/signatory, records staff, finance, verifier, quality, auditor, worker, reporting, migration, and operations database roles separately. Technical roles never receive general document RLS bypass.

## 24. Security, privacy, integrity, and resilience

Threat-model:

- template injection or unauthorized fields
- client/source/result tampering
- duplicate/reused serial numbers
- fake signature or signer callback
- forged/enumerated QR verification
- pre-signed URL/document/cache leakage
- unauthorized guardian/alumni/third-party access
- altered PDF, stale superseded document, or verification race
- bulk generation/export exfiltration
- insider issue/revoke/correct/destruct abuse
- sensitive document contents entering logs/events/search/notifications

Apply safe template sandboxing, source allowlists, exact hashes, KMS encryption, short-lived access, signature verification, opaque tokens, rate limits/bot controls, step-up, SoD, field shaping, malware-safe rendering, cache invalidation, immutable audit, and anomaly alerts. Never log document content, academic values, serials, tokens, signed URLs, signatures, or sensitive verifier data.

Define retention/legal hold, backup/restore, number reservation recovery, render/sign/provider outage, orphan-object reconciliation, partial bulk recovery, verification-key rotation, source invalidation, mobile purge, revocation propagation, RPO/RTO, SLIs/SLOs, alerts, and incident runbooks. Fail truthfully; never call an unsigned, unissued, or stale document official/current.

## 25. Tests

Implement and run:

- template schema/sandbox attacks, field allowlists, bounded loops, localization/RTL/fonts, pagination/overflow, accessibility, and overlapping activation
- synthetic preview watermark/non-issuability and absence of real data in snapshots/fixtures
- source assembly/version/hash/withheld/superseded/cross-student/cross-regulation rejection
- numbering concurrency/non-reuse/void/gap/checksum/legacy import SoD
- deterministic semantic rendering, manifest/checksum, metadata minimization, malformed asset, timeout/retry/orphan reconciliation
- QA for totals copied exactly, pages/glyphs/clipping/QR/signature placement/accessibility
- signer unavailable/pending/success/failure/replay/forged callback/idempotency/requery/certificate rotation and production fake-signer guard
- single/bulk issuance idempotency, partial failure, no duplicate numbers, approval/SoD, receipt, release scheduling
- request eligibility/window/fee status/withdrawal/SLA/source-correction pause
- authenticated download/print/delivery expiry/current authorization
- token entropy/hash/signature/rotation/revocation/rate/enumeration resistance and privacy-minimal verification
- formal verifier identity/purpose/consent/expiry/revoke/field comparison
- duplicate/reissue/correction/supersession/revocation preserving old artifact and immediate current-status verification
- archive/hold/retrieval/destruction and backup/version implications
- event/notification/log/search/cache payload non-disclosure using synthetic canary markers
- RLS negative tests across tenant, institution, document type, student, relationship, result, requester, signatory, verifier, auditor, and technical roles
- web accessibility and Playwright journeys for all roles
- Android/iOS journeys, secure document cache/share/purge, QR scan, deep-link reauthorization, consent, step-up approvals, staleness/revocation, and server receipts
- worker crash recovery, storage/renderer/signer/notification outage, backup restore, and documented target-volume performance

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim legal validity, digital-signature certification, PDF accessibility conformance, device, load, or iOS evidence not actually verified.

## 26. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- official-document catalogue/source-contract matrix
- safe-template schema, field/function allowlist, localization/accessibility, and migration guide
- numbering/series invariants and concurrency design
- deterministic render/manifest/checksum/storage design
- digital-signature provider/trust/verification/certificate-rotation boundary and honest status rules
- QR/public/authenticated verification privacy and threat model
- service request/fee/SLA, issuance/release/delivery, and correction/revocation specifications
- Prompt 16 result evidence and Prompt 18 revaluation/supersession integration contracts
- permissions/scope/SoD and mobile role-feature matrices
- runbooks for bad template, missing source, numbering failure, render/sign outage, partial bulk job, wrong issue, lost document, forged QR, signer compromise, source correction, mass supersession, verification abuse, mobile leak, restore, and disaster recovery
- role guides for students/alumni, guardians/delegates, faculty/HOD, exam cell, registrar/signatories, records/front office, finance, verifiers, quality, auditors, tenant administrators, and operations

The completion gate passes only when:

1. Official document types use explicit authoritative source contracts and immutable versioned policies.
2. Safe templates cannot execute code/access arbitrary data and pass layout, language, accessibility, source-field, QR, and signature validation.
3. Rendering is idempotent, reproducible at the semantic/manifest level, integrity-hashed, and isolated from unapproved external services.
4. Document numbers are atomic, unique, never reused, and retain void/gap history.
5. A document cannot become issued without valid source/template/number/QA/approval and required authoritative signature status.
6. The system never claims digital signature when no configured validated signer succeeded; test signer cannot run in production.
7. Students/alumni can request, pay for, track, retrieve, and manage current issued documents under correct authorization.
8. Public QR verification is opaque, non-enumerable, revocation-aware, rate-limited, and reveals minimum necessary data.
9. Reissue/correction/supersession/revocation preserve every prior artifact and immediately update current verification state.
10. Bulk jobs reconcile population and item status without duplicate numbers or partial silent success.
11. Every relevant role has a meaningful React web and native Android/iOS interface or an explicit secure no-access state.
12. Mobile documents are encrypted/scoped/purgeable, deep links reauthorize, stale/revoked status is visible, and official actions require server receipts.
13. Every tenant table has explicit predicates, forced RLS as required, constraints, and cross-tenant/cross-role negative tests.
14. OpenAPI/events/generated clients, migrations, canary/security/accessibility/observability checks, docs, ADRs, runbooks, and all environment-available tests pass.
15. No source-data mutation, new result calculation, revaluation adjudication, certificate legal claim without policy, or fabricated signer/provider behavior was implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, catalogue/sources/templates/numbering/rendering/signing/issuance/requests/verification/supersession/archive, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency, canary and all exact test commands/results/exit status, docs/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(documents): implement official academic documents and verification`

Stop. Do not begin Prompt 18 or implement revaluation, grievances, supplementary-cycle creation, or degree completion workflows.
```

---

## Review Checklist Before Prompt 18

- Source snapshots use current approved published evidence and reject withheld/superseded inputs.
- Templates are safe, versioned, accessible, localized, and incapable of arbitrary code or data access.
- Rendering and numbering are reproducible, immutable, concurrency-safe, and auditable.
- Digital-signature status is truthful and test signing cannot activate in production.
- QR verification is opaque, minimal, revocation-aware, and non-enumerable.
- Reissue, correction, supersession, and revocation preserve all history and invalidate stale verification.
- Service requests use authoritative Prompt 11 payment evidence.
- Every role has a suitable web/native-mobile workflow or intentional no-access state.
- Every tenant table has RLS and negative isolation tests.
- No Prompt 18 revaluation or supplementary workflow was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 18 until these conditions pass.
