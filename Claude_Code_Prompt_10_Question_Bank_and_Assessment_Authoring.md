# Claude Code Prompt 10

## Question Bank and Assessment Authoring

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–09 passed, were reviewed, and were committed  
**Scope:** Secure question authoring, taxonomy, review and approval, immutable versions, rubrics and solutions, assessment blueprints, controlled reuse/import, similarity-review boundaries, and confidential content governance

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially autonomous examinations, internal assessment, question banks, OBE, curriculum, LMS, online assessment, programming labs, accessibility, multilingual content, security, mobile, retention, and audit.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, all relevant ADRs, module rules, and repository conventions.
3. Inspect Prompt 03 course/curriculum/syllabus/CO/PO/PSO/Bloom contracts and versioning, Prompt 06 offering/registration references, Prompt 09 course workspace/resource/rubric/document contracts, Prompt 02 workflow/audit/document/outbox foundations, and Prompt 01 identity/RBAC/tenant context.
4. Inspect OpenAPI/generated clients, PostgreSQL RLS, data dictionary, permission/SoD matrix, object storage and malware-scanning services, notification services, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, generate a live examination paper, schedule or deliver an assessment, start student attempts, execute code/SQL, perform proctoring, award official marks, publish results, or fabricate AI/similarity/provider responses.

Implement a bounded `assessment-authoring` domain. It owns governed question content, metadata, solutions/keys, scoring definitions, review/approval/version lifecycle, reusable rubrics, assessment blueprints, controlled imports and authorized authoring analytics. It does not own assessment delivery, exam operations, student attempts, grading outcomes, result publication, or attainment calculations.

## 1. Domain invariants and classification

Enforce:

- every question and blueprint is tenant/institution scoped and explicitly classified for practice, coursework, internal assessment, autonomous examination, placement preparation, or another configured purpose
- curriculum mappings reference immutable Prompt 03 versions; they never rewrite official curriculum
- approved versions are immutable; changes produce a new draft version with lineage
- content, answer keys, solutions, rubrics, and reviewer material can have different confidentiality levels and permissions
- examination-confidential content is deny-by-default and never returned through general LMS/search/report APIs
- authors cannot approve their own questions where SoD is configured
- every state transition, view of highly confidential content, export, copy, print request, and bulk operation is audited
- no question becomes eligible for high-stakes use without required validation, independent review, approval, and active policy compliance
- all client-side success is provisional until an authoritative server receipt
- cross-tenant sharing is prohibited by default

Define classification levels such as public practice, roster-restricted learning, staff-restricted, assessment-confidential, and examination-secret using configurable policy—not scattered booleans.

## 2. Question taxonomy and metadata

Implement validated metadata for:

- institution, department, program, regulation, curriculum version, course, unit/module, topic/subtopic
- course outcome and approved PO/PSO references where appropriate
- Bloom/cognitive level, knowledge dimension, difficulty, complexity, estimated response time, marks, and negative/partial scoring capability
- question type, language, translation relationship, subject/domain tags, keywords, and search facets
- purpose and permitted assessment modes
- author, co-author, reviewer, approver, source, provenance, copyright holder, license, acquisition basis, attribution, usage restriction, and expiry
- confidentiality/classification, export/print/copy restrictions, watermark policy, and retention schedule
- accessibility requirements, alternative text, reading direction, notation, and accommodation compatibility
- quality status, validation flags, last-used reference boundary, exposure-risk flag, and retirement reason

Use controlled vocabularies with institution-level governance and versioning. Free-text tags may supplement but cannot replace required taxonomy.

## 3. Supported question types

Implement authoring and canonical validation for:

- single-choice
- multiple-select
- true/false or assertion/reason as configurable structured variants
- numeric response with exact value, range, absolute/relative tolerance, units, significant figures, and locale-safe input
- fill-in-the-blank with multiple blanks and normalized accepted answers
- matching
- ordering/sequencing
- short answer
- essay/long answer
- file-upload response definition
- oral/viva prompt definition
- case study/comprehension/stimulus with one or more child questions
- image/diagram/map-based question
- code question definition and test-contract reference boundary
- SQL question definition and dataset/schema-contract reference boundary

Prompt 21 will own executable code/SQL workspaces, sandboxing, test execution, and automated evaluation. This prompt stores only safe, versioned authoring contracts and preview fixtures that do not execute untrusted input.

Each type must have a typed schema, server-side validator, accessible preview renderer, deterministic serialization, compatibility version, and migration strategy. Avoid arbitrary executable scripts, HTML, JavaScript, SQL, or code in scoring configuration.

## 4. Rich question content and attachments

Support structured rich content with:

- sanitized text, headings, lists, tables, quotations, inline/code blocks displayed as text, formulas/LaTeX, superscript/subscript, symbols, and language spans
- images/diagrams with alternative text, caption, source/license, and zoom-safe accessible presentation
- audio/video references only through governed Prompt 09 resource contracts
- downloadable/reference attachments through Prompt 02/09 document services
- separate stem, instructions, stimulus, options/parts, hints, answer key, solution/explanation, marking notes, and reviewer notes
- reusable stimulus linked to child questions with version pinning
- option shuffling metadata without changing semantic identity
- preview for web/mobile, print, student-safe, reviewer, and answer-key modes

Sanitize on write and render safely on every client. Disallow remote scripts, tracking pixels, unsafe SVG, arbitrary iframe/embed, inline event handlers, and unapproved external resources.

## 5. Answer keys, solutions, scoring, and rubrics

Implement per-type scoring definitions:

- correct/incorrect, all-or-nothing, partial credit, negative marks, penalty floors, unattempted treatment, and maximum/minimum score
- multiple-select scoring with explicitly configured policy; no ambiguous defaults
- numeric tolerance/unit/equivalence rules
- normalized fill-answer matching with case/whitespace/Unicode policy and optional reviewer-only regex under a safe non-backtracking engine
- matching/ordering partial-scoring formulas represented as validated declarative configuration
- short/essay/file/oral response rubric references
- model answer, worked solution, explanation, common misconception, and marking scheme
- criterion-level rubric with levels/descriptors/points/weights and CO mapping
- total-score validation using exact decimals

Answer keys, solutions, and marking notes require distinct permissions from stem preview. Never expose them through learner APIs, notifications, client logs, analytics payloads, search snippets, or cached public resources.

## 6. Authoring workspace and lifecycle

Implement lifecycle:

- draft
- validation_failed
- ready_for_review
- in_review
- changes_requested
- reviewed
- approval_pending
- approved
- active
- suspended
- retired
- superseded

Implement:

- author autosave with optimistic concurrency and conflict recovery
- explicit draft version and compare/diff
- server-side metadata/content/scoring/accessibility/license validation
- submit for review with checklist and author declaration
- reviewer assignment based on department/course/expertise/conflict-of-interest rules
- structured reviewer comments anchored to field/content section
- request changes, resubmit, recommend approval/rejection
- independent approval, activation, suspension, retirement, and emergency withdrawal
- configurable multi-review/quorum for examination-secret content
- delegation with effective dates and full audit
- SLA/aging queues, reminders, reassignment, and escalation
- no approval by author or conflicted reviewer when policy prohibits it

Approved versions are immutable. Editing creates a child draft; existing usages remain pinned to the approved source version unless the owning future assessment workflow explicitly adopts another version.

## 7. Quality validation and review checklists

Provide deterministic validation for:

- required metadata and curriculum/version validity
- type-schema correctness
- marks/scoring consistency and rubric totals
- correct-answer completeness and option uniqueness
- duplicate option labels/identifiers
- invalid or ambiguous numeric tolerances
- stimulus/child consistency
- broken or unauthorized attachments/references
- missing alt text/captions/transcript metadata
- language/translation incompleteness
- prohibited content/unsafe markup
- source/license/attribution gaps
- classification/export conflicts
- estimated-time and marks outliers against configurable ranges
- retired/superseded dependencies

Support reviewer checklists for clarity, correctness, syllabus relevance, CO/Bloom/difficulty accuracy, bias/fairness, accessibility, cultural sensitivity, originality/source rights, key/solution correctness, distractor quality, and marking reliability.

Validation warnings cannot silently become passes. Policies decide which warnings block approval.

## 8. Duplicate and similarity-review boundary

Implement local deterministic duplicate signals:

- exact normalized-content hash within authorized scope
- structural fingerprint by type
- same attachment/stimulus hash
- configurable metadata-assisted candidate search

Define a provider-neutral semantic-similarity port for future approved services:

- minimal authorized input, provider/model/version, request hash, idempotency, job state, result candidates, score, explanation metadata, and error state
- scope restrictions that never compare across tenants unless explicit future legal/product governance permits it
- human review and disposition: duplicate, related, acceptable variant, false positive, or requires rewrite
- result expiry/recalculation and audit

If no provider is configured, return `NOT_CONFIGURED` or `UNAVAILABLE`; never fabricate a similarity score. Similarity is a review signal, not an automatic plagiarism or rejection verdict.

## 9. Multilingual questions and translation governance

Support:

- source language and one or more linked translations pinned to the same conceptual-question family
- independent content versions while preserving source-version relationship
- translation workflow, translator/reviewer/approver, comments, and certification status
- locale-specific notation, directionality, fonts, units, decimal separators, and accessibility
- option/key alignment validation across languages
- “not synchronized with source” warning after source revision
- authorized bilingual preview and print-layout boundary

Do not use automatic translation as approved examination content without explicit human review. AI or machine translation integrations must be optional, disclose provider/version, retain provenance, and produce drafts only.

## 10. Question families, variants, and parameterization

Implement controlled question families:

- parent concept and independent approved variants
- shared stimulus with version-pinned children
- alternate/equivalent-form relationship with reviewer justification
- variation dimensions and exposure grouping
- manual parameters represented as validated values and pre-generated approved instances

Do not implement runtime arbitrary code/template execution. Any future generated/parameterized question engine needs a sandboxed deterministic design, security ADR, validation corpus, and separate approval.

## 11. Assessment blueprints

Implement versioned blueprints that specify an assessment design without creating a paper or student attempt:

- purpose, course/curriculum version, assessment category, total marks, intended duration, section structure, instructions reference, and policy version
- quotas/ranges by unit/topic, CO, Bloom level, difficulty, question type, marks, and language
- mandatory/optional sections, choice pattern, internal-choice equivalence, and section totals
- negative/partial marking constraints
- reuse/exposure limits, recency constraints, author diversity, variant-family constraint, and prohibited combinations
- accessibility/accommodation compatibility requirements
- draft, validate, review, approve, active, retired, superseded lifecycle
- deterministic feasibility analysis using only metadata and authorized aggregate counts
- coverage matrix, deficit/excess explanation, and suggested remediation categories
- version comparison and downstream usage pinning

Do not select actual questions into an exam paper in this prompt. Feasibility results must not reveal confidential stems or answers to unauthorized users.

## 12. Controlled reuse, cloning, and sharing

Implement within-tenant reuse:

- reference an approved immutable version where policy permits
- create a new draft derived from an approved version with lineage, license check, author attribution, and explicit reapproval
- reuse restrictions by purpose/classification/course/department/date/exposure
- bulk selection based on permission and classification
- withdrawal/suspension impact report for known downstream references

Cross-tenant copy/share is denied by default. Define only a future marketplace/content-library port requiring rights, owner consent, tenant acceptance, provenance, malware scanning, and local review/approval.

## 13. Import and export

Implement staged import for authorized legacy question banks:

- versioned CSV/XLSX/document-package template and machine-readable schema
- upload, malware scan, parse, stage, validate, preview, map taxonomy, detect duplicates, approve, commit, and reconcile
- row/item errors with safe downloadable report
- attachment manifest/checksum and missing-file detection
- idempotency by source hash plus import key
- partial import policy explicit; default all-or-nothing for examination-secret content
- imported questions begin as drafts unless policy explicitly requires another reviewed state
- compensating rollback/suspension preserving audit and references

Implement governed export only for explicitly permitted classifications:

- separate stem-only, reviewer, key/solution, and archival packages with independent permissions
- reason/purpose, approval, watermark, recipient/reference, encryption, short expiry, download limit, audit, and revocation where technically possible
- CSV/XLSX formula-injection prevention and safe archive paths
- asynchronous bounded jobs and no search-index dump

Examination-secret export should require step-up authentication and configured multi-party approval. Mobile bulk export/print remains disabled unless policy explicitly permits a narrow secure workflow.

## 14. Confidentiality and exposure management

Implement:

- field-level response shaping so unauthorized callers never receive keys/solutions/reviewer notes
- classification-aware search indexes and separate projections where needed
- just-in-time access for secret content with purpose, expiry, step-up authentication, and optional dual authorization
- watermark/view-session metadata without claiming screenshot prevention is absolute
- download/copy/print restrictions as deterrence and policy enforcement, not false guarantees
- view/access audit for examination-secret content
- exposure incident, suspected compromise, quarantine, suspension, impact analysis, and notification workflow
- credential/session revocation and cache invalidation
- no confidential stems/keys in push/email/SMS notifications

Search result counts, facets, autocomplete, error messages, and timing must not reveal existence of secret questions outside authorized scope.

## 15. Search and authoring analytics

Provide permission-filtered search by allowed metadata, lifecycle, ownership, and quality fields. Search content only within authorized classification and never expose key/solution snippets without specific permission.

Provide operational analytics:

- question counts by course/unit/CO/Bloom/difficulty/type/language/status
- blueprint coverage and gaps
- review/approval aging and workload
- accessibility, license, translation, broken-reference, and validation exceptions
- duplicate-review queue
- suspended/retired/exposure-risk items
- aggregate usage-reference counts received from future assessment modules

Do not implement psychometric item analysis, student-performance statistics, or attainment in this prompt. Define future input ports using versioned question IDs only.

## 16. Integration contracts

Publish read-only, versioned contracts for future modules:

- Prompt 11 autonomous examination setup: approved blueprint/question references and restricted metadata
- Prompt 12 exam paper generation/secure operations: eligible question-version query and secure retrieval boundary
- Prompt 19 OBE: question-to-CO/Bloom mappings and version references
- Prompt 20 online assessment delivery: render/scoring schema snapshots without authoring permissions
- Prompt 21 programming lab: code/SQL question and test-contract references without executable secrets in general APIs
- Prompt 22 placement: purpose-scoped approved practice/placement question references

The exact prompt numbering/names in the repository/master plan remain authoritative if they differ. Integrations must pin immutable question/blueprint versions, validate classification/purpose, and preserve revocation/suspension status. Do not couple through database tables across modules.

## 17. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- taxonomy/vocabulary administration and version activation
- question create/read/update draft/validate/preview/compare/submit/review/approve/activate/suspend/retire/new-version
- per-type content, answer-key, scoring, rubric, attachment, translation, family, and variant management
- reviewer assignment/comment/checklist/decision and conflict declaration
- exact duplicate/similarity job/review/disposition
- blueprint create/validate/feasibility/review/approve/activate/compare/retire
- controlled reuse/derive/impact analysis
- staged import/upload/map/validate/preview/approve/commit/status
- governed export request/approve/status/download/revoke
- confidential access request/session/revoke and exposure incident workflow
- authorized search, dashboards, exception queues, and future-module reference lookup

Use explicit DTOs and response views, bounded pagination, allowlisted filters/sorts, RFC 7807, optimistic versions, idempotency keys, correlation IDs, rate limits, server-side authorization, audit, and generated clients.

Define least-privilege permissions for taxonomy administration, question authoring by scope, stem view, key/solution view, reviewer note view, review, approval, activation/retirement, translation, rubric management, blueprint author/review/approve, similarity review, import, export, secret-content access, exposure response, dashboard/report, and platform health.

Enforce SoD for author-reviewer-approver, secret export, emergency access, exposure resolution, and high-risk bulk operations according to policy. Platform operators see service/job/index health and trace IDs only, not question content.

Publish minimal transactional-outbox events for question submitted/reviewed/approved/activated/suspended/retired/superseded, blueprint approved/retired, import committed, export created/revoked, and content exposure status changed. Do not put stems, options, keys, solutions, reviewer notes, signed URLs, or sensitive taxonomy combinations in events.

## 18. React web interfaces

Implement accessible responsive interfaces for:

- question author dashboard and work queue
- type-aware rich authoring editor with safe preview
- taxonomy, curriculum/CO/Bloom/difficulty mapping
- option/key/scoring/rubric/solution authoring with validation
- stimulus and child-question composition
- attachment/license/accessibility/classification controls
- multilingual translation alignment workspace
- version history and semantic field-level diff
- reviewer assignment, anchored comments, checklist, conflict declaration, and decision
- approver queue with SoD/classification warnings
- duplicate/similarity candidate comparison and disposition
- question family/variant management
- blueprint editor, coverage matrix, feasibility and gaps
- staged import mapping/errors/preview/approval
- controlled export and secret-access workflows
- governed search, dashboards, exceptions, and exposure-response console

Meet WCAG 2.2 AA intent. Provide keyboard-accessible alternatives to drag/drop, screen-reader semantics, visible focus, non-color-only status, zoom-safe math/media, correct language/direction attributes, and accessible preview for each question type.

## 19. React Native Android/iOS interfaces for every role

Build genuine native interfaces using real APIs, not WebViews or placeholder menus.

### Question Author/Faculty

- personal drafts and review-return queue
- create/edit metadata and simpler question types; save draft with conflict recovery
- attach camera/file media through secure scanning flow
- preview web/mobile/student-safe presentation
- respond to comments and submit for review
- complex stimulus, advanced math layout, bulk import, and large blueprint work remain web-first

### Reviewer/Subject Expert

- assigned review queue, classification, version diff, content/key/solution views according to permission
- structured checklist, anchored comments, conflict declaration, request changes, and recommendation
- secure offline access to confidential content is disabled by default; any enabled cache requires explicit policy, encryption, expiry, device compliance, and remote purge

### Approver/HOD/Program Coordinator/Dean/Academic Office

- approval queue, validation/quality/SoD summary, reviewer decisions, version diff, and blueprint coverage
- step-up approve/reject/suspend/retire with reason and authoritative receipt
- no approval when conflicted or when required reviewers/checks are incomplete

### Examination Cell/Controller/Confidential Staff

- purpose-scoped confidential question/blueprint readiness, approval, suspension, exposure-risk, and exception views
- just-in-time step-up access where authorized; no bulk download or general offline cache
- secure mobile review/action companion while high-volume paper-related operations remain outside this prompt and web-first in later modules

### OBE/Quality/Accreditation Staff

- mapping completeness and authorized metadata/blueprint coverage dashboards
- comment/request-correction workflow without key/solution access unless separately granted
- no attainment calculations in this prompt

### Content/Library/Translation/Accessibility Staff

- assigned license, source, translation, alt-text/caption, broken-reference, and compliance queues
- access only to fields needed for the task; answer keys/solutions hidden by default

### Teaching Assistant/Lab Assistant

- delegated draft/review tasks within assigned course scope
- no approval, secret export, or confidential examination access unless independently authorized

### Student

- no question-bank browsing
- only explicitly released public/practice previews supplied through Prompt 09 or future assessment delivery, with keys/solutions controlled by release policy
- report accessibility/content issue against an opaque released reference

### Guardian

- no question-bank, key, blueprint, review, or analytics access
- only future learner-facing assessment notifications outside this authoring module

### Tenant Administrator

- taxonomy/policy/workflow configuration and aggregate operational dashboards as separately permitted
- no automatic right to examination-secret stems, keys, solutions, or exports

### Platform Operations

- job/storage/scan/search/event health, masked tenant identifiers, and trace IDs
- no question, key, blueprint, attachment, or reviewer content

Mobile-wide requirements:

- secure OS keystore, app lock/step-up for sensitive actions, device registration/risk checks where available
- encrypted tenant/user-partitioned allowlisted cache; confidential content not cached unless explicit policy; purge on logout, role/membership loss, expiry, tenant switch, or remote revocation
- push payloads contain no stems, answer keys, decisions, reviewer comments, or confidential taxonomy
- deep links reauthenticate, reauthorize, and fetch fresh server data
- explicit offline/stale/queued/synced/rejected states; confidential approvals and lifecycle changes require live server confirmation
- screenshot/recording deterrence where platform-supported, with no false security guarantee
- accessibility, dynamic type, localization, RTL, math/media preview, low-connectivity recovery, and safe retry
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role, including intentional no-access states

## 20. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized tables such as:

- assessment taxonomy/vocabulary/version/value
- question/concept family/question version/type payload/content fragment
- curriculum/outcome/Bloom/tag mapping
- option/part/blank/match/order/numeric rule
- answer key/scoring policy/solution/marking note
- rubric/version/criterion/level/mapping
- attachment/resource reference/license/accessibility metadata
- translation relationship/version/alignment status
- workflow transition/reviewer assignment/comment/checklist/decision/conflict declaration
- duplicate fingerprint/similarity job/candidate/disposition
- blueprint/version/section/quota/constraint/feasibility snapshot
- reuse/derivation/reference/exposure group
- import job/staged item/error/commit
- export request/approval/artifact/download audit/revocation
- confidential access grant/session/access audit
- exposure incident/affected reference/action
- search projection and processing checkpoint

Use names consistent with repository conventions. Every tenant-owned table carries required tenant/institution/department/course/classification scope; foreign keys cannot cross tenants; repositories require explicit scope predicates; enable and force RLS where constitutionally required. Add immutable-version constraints, unique hashes/keys, idempotency constraints, optimistic versions, check constraints, retention fields, and appropriate indexes.

Test web/mobile application, worker, reporting, migration, and operations database roles independently. Technical roles never receive general confidential-content bypass.

## 21. Security, privacy, integrity, and resilience

Threat-model:

- cross-tenant or unauthorized question/key leakage
- enumeration through IDs, search counts, errors, exports, logs, caches, events, or timing
- author self-approval and reviewer conflicts
- malicious uploads, rich-text injection, unsafe SVG/formulas/archives
- stolen mobile device or signed URL
- mass scraping, printing, screenshots, and bulk export abuse
- question version/key manipulation after approval
- forged provider callback or fake similarity result
- import poisoning and spreadsheet formula injection
- compromised question/exposure incident and stale downstream use
- insider emergency-access abuse

Require field-level response shaping, purpose/context authorization, step-up authentication, rate limiting, anomaly/audit signals, encryption, malware scanning, secret rotation, signed-access expiry, CSP/safe rendering, and SoD. Never log question bodies, options, keys, solutions, reviewer notes, access tokens, signed URLs, or confidential attachments.

Define retention/legal hold, backup/restore, archive/purge, search-index rebuild, object reconciliation, import/export recovery, provider retry/dead-letter handling, access revocation, exposure response, RPO/RTO, SLIs/SLOs, and operational alerts. Fail closed for confidential access; never substitute cached unauthorized data.

## 22. Tests

Implement and run:

- every question-type schema, valid/invalid payload, deterministic serialization, accessible preview, and backwards compatibility
- scoring matrix for partial/negative marks, numeric tolerances/units/significant figures, multi-select, fill normalization, matching/ordering, rubric totals, and exact decimal boundaries
- curriculum/taxonomy/version mapping and invalid/superseded references
- content sanitization, unsafe HTML/SVG/embed/link/archive denial, malware quarantine, and expired signed access
- lifecycle transitions, immutable approval, child draft/version diff, suspension/retirement, delegation expiry, reviewer quorum, conflict, and SoD
- key/solution/reviewer-note field-level authorization across every endpoint/projection/cache/export
- duplicate hashes, similarity unavailable/failure/callback/idempotency, and human disposition
- translations, RTL/locale/math/unit behavior, key alignment, and stale-source warning
- family/variant/stimulus version pinning and prohibition of runtime executable templates
- blueprint totals, quotas, internal choices, constraint conflicts, feasibility/gap trace, versioning, and no content leakage
- reuse/derive lineage, license restriction, cross-tenant denial, and withdrawal impact
- import parsing/validation/duplicates/idempotency/rollback/formula-injection/path traversal and secret all-or-nothing behavior
- export approval/step-up/watermark/encryption/expiry/download limit/revocation and permission separation
- search authorization, count/facet/autocomplete/error non-disclosure, projection rebuild, and emergency revocation
- exposure incident quarantine, downstream invalidation event, cache purge, and complete audit
- RLS negative tests across tenant, institution, department, course, classification, author/reviewer/approver, and technical roles
- web accessibility and Playwright journeys for author, reviewer, approver, examination cell, OBE/quality, content/translation/accessibility staff, tenant admin, and operations
- Android/iOS role journeys, intentional student/guardian denial, step-up, deep-link reauthorization, secure cache rules, remote purge, and authoritative receipts
- outbox retry/reordering, worker crash recovery, storage/scan/search/provider outage, backup/restore/reconciliation, and documented target-volume performance

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Report exact commands and exit statuses. Never claim native-device, provider, security control, or iOS evidence not actually executed.

## 23. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- assessment-authoring glossary and lifecycle diagrams
- question-type JSON schemas and renderer/scoring compatibility specification
- taxonomy, curriculum/OBE mapping, rubric, blueprint, feasibility, and versioning specifications
- confidentiality/classification matrix and field-level response contract
- content sanitization, attachment, license, accessibility, multilingual, import/export, and retention policies
- similarity/AI/provider contracts and truthful unavailable behavior
- future exam paper, delivery, programming-lab, marks, OBE, and placement integration contracts
- permission/scope/SoD matrix and mobile role-feature matrix
- threat model/privacy assessment and exposure-response plan
- runbooks for review backlog, broken resource, malware, provider outage, index rebuild, leaked question, emergency suspension, export revocation, object reconciliation, restore, and disaster recovery
- role guides for author, reviewer, approver, examination cell, OBE/quality, content/translation/accessibility staff, tenant admin, and operations

The completion gate passes only when:

1. All supported question types have validated canonical schemas, safe accessible previews, and deterministic scoring definitions where applicable.
2. Questions map to authoritative curriculum/CO/Bloom versions and preserve provenance, license, accessibility, language, and classification metadata.
3. Draft/review/approval/activation/suspension/retirement enforce immutable versions, reviewer conflict controls, and configured SoD.
4. Answer keys, solutions, marking notes, reviewer notes, and secret content are independently authorized and never leak through general APIs, search, events, notifications, logs, caches, or exports.
5. Duplicate/similarity workflows are explainable, human-reviewed, tenant-isolated, and honest when providers are unavailable.
6. Multilingual translations and question variants preserve alignment, version lineage, review, and accessibility.
7. Blueprints validate totals/coverage/constraints and assess feasibility without selecting a paper or revealing unauthorized questions.
8. Reuse/import/export preserve provenance, rights, approvals, audit, classification, and cross-tenant denial.
9. Exposure incidents can suspend content, revoke access, invalidate downstream references, purge caches, and preserve investigation evidence.
10. Every relevant role has a meaningful native Android/iOS interface or an explicit secure no-access state; sensitive/high-volume work remains web-first with mobile review/action companions.
11. Every tenant table has explicit scope predicates, forced RLS as required, constraints, and cross-tenant/cross-scope negative tests.
12. OpenAPI/events/generated clients, migrations, accessibility, security, observability, docs, ADRs, runbooks, and every environment-available test pass.
13. No exam-paper generation, assessment delivery, student attempt, proctoring, executable code/SQL, official marks/results, attainment, or fake provider integration was implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, question types/scoring/blueprints, web, Android, iOS, security/confidentiality/tenancy/RLS/SoD/audit/idempotency, tests with exact commands/results/exit status, documentation/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(question-bank): implement governed assessment authoring`

Stop. Do not begin Prompt 11 or implement assessment delivery or examination operations.
```

---

## Review Checklist Before Prompt 11

- Every question type uses a validated, versioned schema and safe accessible renderer.
- Curriculum, CO, Bloom, difficulty, purpose, source, license, accessibility, language, and classification are governed.
- Approved questions and blueprints are immutable and all changes preserve lineage.
- Author-reviewer-approver SoD and conflicts are enforced.
- Keys, solutions, notes, and confidential content are field-level protected.
- Similarity providers never produce fabricated scores.
- Blueprints validate coverage and feasibility without generating papers.
- Import, reuse, export, and exposure response preserve rights, security, audit, and isolation.
- All relevant roles have native mobile workflows or explicit secure denial.
- Every tenant table has RLS and negative isolation tests.
- No later assessment, examination, programming, marks, result, or attainment domain was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 11 until these conditions pass.
