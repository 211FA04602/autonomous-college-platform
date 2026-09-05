# Claude Code Master Prompt Pack

## Engineering College & Autonomous Institution Platform

**Target stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Delivery model:** Multi-tenant SaaS, modular monolith first, independently scalable workers where justified  
**Source product document:** `Engineering_College_Autonomous_Institution_Platform_PRD.md`  
**Pack version:** 1.1 — September 3, 2026

---

## How to Use This Pack

1. Create a new empty Git repository. This product must not be built inside the Institora repository.
2. Copy the PRD into the repository as `docs/product/PRD.md`.
3. Run Prompt 00 first. It creates the engineering constitution and baseline repository.
4. Run Prompts 01–34 in sequence, one prompt at a time.
5. Do not combine multiple prompts into one Claude Code run.
6. Review Claude's completion report, run the stated verification commands yourself, inspect the changed files, and commit only after the completion gate passes.
7. Start each subsequent prompt from a clean working tree.
8. If a prompt fails or stops partially, rerun the Recovery Prompt at the end before proceeding.
9. Keep secrets out of prompts, source code, fixtures, logs, and commits.
10. Replace bracketed deployment inputs only when a prompt explicitly requests them.

### Recommended repository name

Use a temporary neutral name such as `autonomous-college-platform` until the commercial product name is finalized. Product naming must be configuration, not embedded throughout source code.

### Expected completion report for every prompt

Claude must finish every prompt with:

1. Summary of what was implemented
2. Files added/changed
3. Database migrations added
4. APIs added/changed
5. Security and tenancy controls implemented
6. Tests added and exact results
7. Commands run and exit status
8. Documentation/ADRs/runbooks updated
9. Known limitations or deferred items
10. Manual verification steps
11. Suggested commit message
12. Explicit statement: `Completion gate: PASSED` or `Completion gate: FAILED`

Do not move to the next prompt unless the gate passes.

---

# Prompt 00 — Engineering Constitution and Repository Foundation

```text
You are the principal engineer responsible for establishing a greenfield, production-grade software repository for a standalone Engineering College and Autonomous Institution Operating Platform.

Read `docs/product/PRD.md` completely before making changes. Treat it as the product source of truth. This product is independent from Institora. Do not import, copy, or create runtime coupling to Institora. Optional future interoperability will be through explicit versioned APIs only.

Technology decisions:
- Java 21 and current stable Spring Boot 3.x
- Gradle Kotlin DSL multi-module build
- React 19-compatible architecture, TypeScript, Vite
- PostgreSQL 17-compatible SQL; production target Amazon Aurora PostgreSQL
- Flyway for all schema changes
- AWS-first deployment using containers and infrastructure as code
- Modular monolith for core transactional domains
- Separate worker services only for workloads needing independent scale or isolation
- REST APIs described with OpenAPI
- RFC 7807 Problem Details for API errors
- UUID v7 or ULID identifiers; choose one, document it, and apply consistently
- UTC for stored instants; institution time zone for display and academic scheduling
- Transactional outbox for reliable domain-event publication
- Testcontainers for backend integration tests
- Vitest and React Testing Library for frontend tests
- Playwright for end-to-end tests

First inspect the repository. If it is not empty, report what exists and preserve all legitimate work. Never overwrite unrelated changes. Do not use destructive Git commands.

Create an engineering constitution at `docs/engineering/CONSTITUTION.md`. It must define these non-negotiable rules:
1. Every tenant-owned record contains `tenant_id`; institution/campus scope is explicit where applicable.
2. Tenant context comes only from authenticated membership and authorized scope—not a client-trusted header or request field.
3. PostgreSQL Row-Level Security is defense in depth for tenant-owned tables. Application-level predicates are still mandatory.
4. No repository method may expose unrestricted tenant-owned data.
5. All public APIs are versioned and contract-tested.
6. Database changes use forward-only Flyway migrations. Never mutate an applied migration.
7. Official academic, examination, result, financial, and audit records use correction/reversal/versioning rather than destructive update or delete.
8. Configuration and rule versions are stored with effective dates; historical results are reproducible.
9. High-risk actions require separation of duties, explicit authorization, reason, and audit.
10. Sensitive files use object storage references; binary data is not stored in PostgreSQL.
11. Events are written through the transactional outbox. Consumers are idempotent.
12. APIs use validation, stable error codes, correlation IDs, pagination, and optimistic locking where needed.
13. No fake integrations, silent success, placeholder production logic, or TODO paths presented as complete.
14. AI is assistive; consequential academic decisions require authorized human approval.
15. Accessibility, localization, responsive web, native Android/iOS interfaces for every role, offline-aware mobile behavior, observability, and testability are first-class.
16. Secrets never enter source code, examples, test snapshots, or logs.
17. No institution-specific code forks. Variations are configuration, feature flags, or well-defined extension points.
18. Avoid premature microservices; preserve strict module boundaries.

Create this repository structure:
- `backend/` Gradle multi-module Spring Boot workspace
- `frontend/` React/TypeScript application
- `mobile/` React Native + TypeScript Android/iOS workspace; native applications, not WebView wrappers
- `workers/` placeholders only for later independently deployable workers; no speculative implementation
- `infra/` infrastructure-as-code workspace
- `docs/architecture/`, `docs/api/`, `docs/product/`, `docs/runbooks/`, `docs/security/`, `docs/testing/`
- `.github/workflows/`

Backend modules should initially include:
- `app` executable composition root
- `platform-core` shared primitives with minimal dependencies
- `identity-access`
- `tenancy-organization`
- `audit`
- `workflow`
- `documents`
- `notifications`
- `integration-outbox`

Define boundaries with package rules and ArchUnit. Domain modules must not directly read another module's tables or depend on another module's internal packages. Shared code must remain small; do not create a generic dumping-ground module.

Set up:
- Spring Boot health endpoints with minimal public exposure
- structured JSON logging
- correlation/request IDs
- Micrometer/OpenTelemetry-ready instrumentation
- frontend design-system foundation using accessible primitives
- ESLint, TypeScript strict mode, Prettier, Stylelint only if justified
- backend formatting/static analysis
- `.editorconfig`, `.gitattributes`, `.gitignore`
- Docker Compose for local PostgreSQL only; add other dependencies later when needed
- sanitized `.env.example` files
- Makefile or task runner with documented commands
- dependency locking/version catalog where practical

Create initial ADRs:
- ADR-001 modular monolith
- ADR-002 tenant isolation
- ADR-003 PostgreSQL and Flyway
- ADR-004 event/outbox strategy
- ADR-005 frontend architecture
- ADR-006 AWS deployment direction

Create CI that runs backend compile/tests/static checks, frontend install/lint/typecheck/tests/build, secret scanning, and dependency vulnerability checks. Pin action versions to immutable SHAs where practical. Do not require live AWS credentials for pull-request CI.

Create a local developer guide with exact prerequisites, boot commands, test commands, ports, and troubleshooting.

Add one vertical health/readiness slice and an accessible frontend shell proving the build works. Do not build business modules yet.

Completion gate:
- clean backend build and tests
- frontend lint, typecheck, tests, and production build pass
- local application starts against PostgreSQL
- module boundaries have automated tests
- no hard-coded secrets
- CI files are syntactically valid
- documentation reflects actual commands
- provide the standard completion report and stop
```

---

# Prompt 01 — Tenancy, Institutions, Identity, and RBAC

```text
Read `docs/product/PRD.md`, `docs/engineering/CONSTITUTION.md`, all ADRs, and the current code before editing. Continue the existing architecture; do not re-scaffold or replace established choices.

Implement the foundational multi-tenant identity and authorization vertical slice.

Required domain capabilities:
- tenant provisioning and lifecycle
- education group, institution, campus, department, administrative unit
- user identity, profile, tenant membership, institutional membership
- role, permission, assignment, scoped authorization
- configurable scope: tenant, institution, campus, department, program, cohort, section, course, examination
- one user may belong to several institutions/tenants
- active context selection must be server-validated
- time-bound external and support access
- privileged-role MFA policy representation
- separation-of-duties conflict rules

Authentication:
- provide a standards-based OIDC integration boundary
- for local development, provide a clearly isolated dev identity provider profile or signed local test tokens
- production must not contain a bypass authentication mode
- do not build password storage if an external identity provider is the architectural choice

Authorization:
- define stable permission codes by business action, not by screen
- backend is authoritative; hiding frontend controls is not authorization
- use method/service authorization plus repository tenant predicates
- implement tests proving cross-tenant and out-of-scope access is denied
- reject client-supplied tenant identity that conflicts with authenticated context

Database:
- add Flyway migrations for tenant, organization hierarchy, users, memberships, roles, permissions, scopes, assignments, access grants, SoD policies, and audit references
- enable PostgreSQL RLS on tenant-owned tables with a documented connection/session strategy
- use constraints and indexes for uniqueness and hierarchy integrity
- seed only reference permissions and a safe local-development tenant through a dev-only mechanism

APIs and UI:
- tenant/institution context endpoint
- admin CRUD for organization hierarchy and memberships
- role and scope assignment UI
- context switcher
- access-denied and expired-access experiences
- paginated searchable tables with accessible controls

Audit:
- login/session-relevant events, context changes, membership changes, role changes, external access grants, and support access
- redact token and secret data

Tests:
- unit, repository/Testcontainers, authorization, RLS, API contract, frontend component, and Playwright smoke tests
- include explicit tenant A versus tenant B negative tests

Update OpenAPI, threat model, data dictionary, ADRs, and developer documentation.

Completion gate: a user with multiple authorized memberships can switch context; unauthorized tenant/campus access fails at both service and RLS layers; role changes are audited; all checks pass. Produce the standard completion report and stop.
```

---

# Prompt 02 — Audit, Workflow, Documents, and Outbox Platform Services

```text
Read the PRD, constitution, ADRs, and current implementation. Implement reusable platform services needed by every later module. Preserve module boundaries and tenant isolation.

Audit service:
- append-only audit event model
- actor, tenant, institutional scope, action, resource type/ID, time, correlation ID, reason, source, before/after summaries, and metadata classification
- tamper-evidence strategy using hash chaining or an equivalent documented approach
- searchable authorized audit UI and governed export
- PII redaction and field allowlists; never dump arbitrary entities or secrets

Workflow engine:
- definitions, versions, states, transitions, conditions, assignments, serial/parallel approvals, quorum, delegation, escalation, SLA, comments, attachments, and history
- effective dates and immutable activated versions
- workflow instance API and inbox
- authorization for transitions
- idempotent commands and optimistic locking
- do not build a general-purpose BPMN engine; implement the bounded capabilities required by the PRD

Document service:
- metadata, document type, owner/scope, version, classification, checksum, retention, legal hold, and verification status
- S3-compatible storage port with LocalStack or an in-memory/test adapter for local tests
- presigned upload/download flow
- malware-scan state and quarantine boundary; never claim scanning is complete without an actual scanner
- authorization before URL issuance
- immutable/versioned document capability for exam and official records

Transactional outbox:
- outbox table, writer, poller, retry/backoff, idempotency keys, dead-letter state, operational metrics, and replay administration with strict permissions
- local adapter that does not require AWS
- document how SQS/EventBridge integration will be added

Frontend:
- workflow inbox, action timeline, document upload/status, audit search, and accessible error states

Testing:
- concurrency and optimistic-lock tests
- tenant isolation and authorization tests
- document access negative tests
- outbox transaction atomicity and duplicate-delivery tests
- audit immutability tests

Update OpenAPI, data model, ADRs, threat model, observability, and runbooks.

Completion gate: a sample approval workflow can be versioned, activated, executed, audited, and linked to an authorized document; an event is atomically recorded and idempotently delivered in local tests. Produce the standard completion report and stop.
```

---

# Prompt 03 — Academic Structure, Regulations, Curriculum, and Boards of Studies

```text
Read the PRD sections on organization, curriculum, governance, OBE, and the constitution. Inspect existing modules and reuse platform services.

Implement college-native academic master data:
- programs, degree/award, departments, duration, entry types, intakes
- regulation/scheme versions by cohort and effective date
- academic years, terms/semesters, instructional and exam windows
- course catalog with code, title, credits, L-T-P, contact hours, category, syllabus units, references
- curriculum structures: core, professional elective, open elective, lab, project, internship, audit, mandatory non-credit, honors, minor
- prerequisites, co-requisites, anti-requisites, equivalence/substitution
- credit and completion rules
- configurable grading, attendance, promotion, and maximum-duration rule definitions as governed data—not executable user-provided code
- CO, PO, PSO, PEO and Bloom-level master definitions and mappings

Governance:
- regulation lifecycle: draft, review, approved, published, retired
- published versions cannot be edited in place
- Board of Studies proposal, agenda, members, conflicts, minutes, decisions, attachments, approvals, and effective date
- curriculum diff between versions
- workflow-based approval and complete audit

Provide backend APIs and administration UI for creating and reviewing the above. Add read-only curriculum/syllabus views for faculty and students.

Add import templates with staging, validation, preview, error reporting, idempotent batch keys, and approval. Do not directly load unvalidated spreadsheets into authoritative tables.

Generate curriculum structure and syllabus-book exports using a template boundary; a basic HTML/PDF-ready representation is sufficient if actual PDF tooling is not yet selected.

Tests must cover version immutability, cross-tenant isolation, invalid prerequisite cycles, credit validation, overlapping effective dates, approval authorization, imports, and API contracts.

Update OpenAPI, ERD/data dictionary, ADRs, sample configuration guide, and operating documentation.

Completion gate: administrators can configure, approve, publish, and compare a full B.Tech regulation/curriculum without hard-coded institution rules. Produce the standard completion report and stop.
```

---

# Prompt 04 — Admissions CRM and Applicant-to-Student Conversion

```text
Read the PRD admissions and student-lifecycle sections plus current architecture. Implement an end-to-end admissions vertical slice.

Capabilities:
- enquiry sources, campaigns, counselor assignment, follow-ups, notes, consent and conversion stages
- configurable application forms by program, entry type, admission category/quota, and academic year
- applicant account and application draft/submission
- document requirements, uploads, verification, rejection reason, resubmission
- eligibility rules expressed through validated configuration
- entrance scores, ranks, merit lists, reservation/category fields, seat matrix, offers, waitlists
- application/admission payment request through the finance integration boundary; do not duplicate payment logic
- admission review and approval workflow
- accepted, declined, cancelled, deferred, no-show, withdrawn, and refund-pending states
- atomic applicant-to-student conversion without duplicate data entry
- enrollment/roll number allocation using configurable, concurrency-safe sequences
- onboarding checklist, ID-card request, institutional email provisioning event

Privacy:
- field-level access for sensitive identity/category/medical/bank data
- document classification and retention
- duplicate applicant detection as a review signal, not an automatic merge

UX:
- public application shell with tenant branding
- applicant portal
- counselor pipeline
- verifier work queue
- admissions leadership dashboard
- accessible status and correction experiences

Analytics:
- enquiry-to-application-to-admission funnel
- source/campaign/counselor conversion
- program demand, seat fill, category distribution, pending work, and projected revenue

Tests:
- workflow and status transition tests
- seat capacity concurrency
- idempotent conversion
- cross-tenant denial
- document authorization
- validation and API contracts
- core Playwright journeys

Update OpenAPI, data dictionary, threat model, runbooks, and user guide.

Completion gate: a configured applicant can apply, upload and correct documents, receive an approved offer, pay through a test adapter, and be converted exactly once into an enrolled student with a complete audit history. Produce the standard completion report and stop.
```

---

# Prompt 05 — Student Information System and Lifecycle

```text
Read the PRD student-record and progression requirements. Implement the authoritative Student Information System module.

Model and workflows:
- student, guardian/authorized contact, addresses, prior education, identity and category data, institutional identifiers, bank/scholarship data, medical alerts with strict privacy
- program, regulation, cohort, semester, section, mentor, academic standing, and lifecycle status
- lateral entry, program/branch change, regulation migration, transfer, break in study, readmission, detention, withdrawal, discontinuation, graduation, and alumni transition
- versioned documents and verification
- student data correction request with evidence and approval
- configurable holds with reason, scope, start/end, releasing authority, and effects on registration, exams, documents, and services
- unified student timeline based on authorized domain events, with redaction by role
- bulk operations through staged jobs—not direct unrestricted updates

APIs/UI:
- student search with governed fields and pagination
- 360-degree student profile with role-aware tabs
- lifecycle action workflows
- guardian relationship and access-consent controls
- data-quality dashboard
- student self-service profile/correction flow

Do not store computed GPA, fee balance, attendance, or placement status as manually editable student fields. Consume authoritative read models/events from their owning modules when available.

Tests must cover lifecycle invariants, duplicate IDs, field privacy, hold enforcement integration points, role scopes, audit, cross-tenant access, import validation, and optimistic concurrency.

Update OpenAPI, ERD/data dictionary, lifecycle state diagrams, access matrix, and operations guide.

Completion gate: authorized staff can manage the complete student lifecycle with immutable history and role-appropriate self-service, with no duplicated authoritative calculations. Produce the standard completion report and stop.
```

---

# Prompt 06 — Course Offerings, Registration, Electives, and Degree Audit

```text
Read the PRD course-registration requirements and existing academic/student models. Implement course offerings and student registration.

Capabilities:
- create offerings from curriculum by term, campus, department, program, section, capacity, room/lab, and faculty placeholders
- generate eligible student registration plans from regulation, cohort, completed credits, failures, prerequisites, holds, and offering availability
- regular, elective, audit, add/drop, withdrawal, repeat, improvement, honors, minor, and summer registrations
- maximum/minimum credit rules
- prerequisite/co-requisite and timetable-conflict checks
- configurable elective preference collection and deterministic allocation with capacity/fairness rules
- exceptional registration approval through workflows
- freeze/publish roster snapshot
- credit accumulation, progression standing, expected graduation, and degree-audit rules

Design a rule-evaluation boundary using typed, versioned rule configuration. Do not use arbitrary scripts or eval. Every decision must expose rule version, inputs, result, and human-readable reasons.

UX:
- administrator offering setup
- student registration plan and add/drop
- adviser/HOD exception queue
- elective allocation simulation and publish
- degree audit for student and adviser

Tests:
- deterministic eligibility and allocation
- concurrent capacity protection
- regulation version correctness
- hold enforcement
- prerequisite graph cases
- audit and cross-tenant isolation
- end-to-end registration journey

Update OpenAPI, data dictionary, rule specification, ADRs, and operating guide.

Completion gate: a cohort can register for a configured semester, electives can be allocated reproducibly, exceptions are approved, rosters are frozen, and degree audit explains remaining requirements. Produce the standard completion report and stop.
```

---

# Prompt 07 — Timetable, Rooms, Laboratories, and Faculty Allocation

```text
Read the PRD academic-calendar and teaching-operation requirements. Implement timetable and resource allocation integrated with course offerings.

Capabilities:
- periods, working days, shifts, calendar exceptions, holidays
- rooms/labs with capacity, type, equipment/features, accessibility
- faculty and teaching-assistant allocation
- section/batch splits and lab batches
- recurring lecture, tutorial, lab, project, and special sessions
- conflict detection for faculty, student group, room/lab, and travel buffer where configured
- manual scheduling with real-time validation
- deterministic assisted-generation interface; do not claim an optimal solver unless implemented and tested
- substitution, cancellation, makeup/compensatory classes, and room changes
- publish/version timetable and send change events
- student, faculty, room, lab, department, and calendar views
- export/print and calendar subscription boundary

UX must support keyboard-accessible scheduling, conflict explanations, filters, and mobile read views.

Tests:
- overlap and capacity constraints
- calendar/time-zone boundaries
- published version immutability
- substitution authorization
- tenant and department scoping
- API and Playwright journeys

Update OpenAPI, timetable rule guide, data dictionary, and runbook.

Completion gate: an administrator can build, validate, publish, revise, and communicate a semester timetable without resource conflicts; all published changes are versioned and audited. Produce the standard completion report and stop.
```

---

# Prompt 08 — Attendance, Shortage, Detention, and Condonation

```text
Read the PRD attendance requirements. Implement period/session attendance using published timetable sessions as the primary source.

Capabilities:
- attendance for lecture, tutorial, lab, project, internship, and approved events
- statuses: present, absent, late, duty leave, medical, exempt, pending correction; make institution-specific labels configurable
- faculty entry and safe bulk entry
- device integration ports for biometric, RFID, and QR; implement a test adapter only unless a provider is configured
- correction request, reason, evidence, deadline, approval, and audit
- attendance freeze/reopen by period and authorized role
- course-wise calculations using versioned rules and clear numerator/denominator explanation
- progressive shortage thresholds and notifications
- detention recommendation and decision
- condonation eligibility, approval, fee request, payment confirmation, and final exam-eligibility contribution
- mentor/HOD/Dean dashboards and student self-service
- parent notification only when institutional policy and consent allow it

Do not overwrite raw attendance when applying duty leave, medical approval, or condonation. Preserve the original session record and model adjustments/decisions separately.

Handle late timetable changes, cancelled classes, substitutions, duplicate device events, clock skew, and offline-sync idempotency.

Tests:
- exhaustive attendance formula cases
- versioned rule reproduction
- freeze and correction controls
- device-event deduplication
- condonation/payment integration
- cross-tenant and out-of-course faculty denial
- core end-to-end journeys

Update OpenAPI, formulas/rules documentation, data dictionary, integration contract, and operating guide.

Completion gate: attendance leads reproducibly from session capture through alerts, correction, shortage, condonation, and final eligibility with complete provenance. Produce the standard completion report and stop.
```

---

# Prompt 09 — Teaching Plans, Course Files, LMS, and Assignments

```text
Read the PRD teaching, LMS, content, and course-file requirements. Implement the teaching-delivery and learning-management vertical slice.

Capabilities:
- faculty course plan mapped to syllabus units, COs, Bloom levels, dates, hours, and teaching methods
- daily teaching diary linked to timetable sessions
- planned versus delivered progress and risk alerts
- notes, links, files, authorized video references, release scheduling, and completion tracking
- modules/topics and accessible student course view
- individual/group assignments, rubrics, due dates, late rules, resubmission, file/code/link/text submission
- manual grading and feedback
- plagiarism-provider integration port; no fabricated score if provider is absent
- announcements, moderated discussions, doubts, and polls
- course-end feedback boundary
- automatically assembled digital course file using authoritative data and indexed evidence

Content governance:
- ownership, source, license, sharing scope, version, approval, accessibility metadata
- no cross-tenant sharing by default
- no unauthorized copying of commercial content

UX:
- faculty course workspace
- student learning view
- assignment and rubric views
- syllabus progress dashboard
- course-file completeness dashboard

Tests include content authorization, scheduled release, group submissions, grading concurrency, course-file evidence correctness, tenant isolation, and accessible end-to-end journeys.

Update OpenAPI, content policy, data dictionary, copyright/licensing guidance, and faculty/student documentation.

Completion gate: a faculty member can plan, deliver, assign, assess, and assemble a complete auditable course file while students receive an accessible course experience. Produce the standard completion report and stop.
```

---

# Prompt 10 — Question Bank and Assessment Authoring

```text
Read the PRD question-bank, online assessment, OBE, and examination requirements. Implement governed question authoring.

Capabilities:
- question taxonomy by course, regulation, unit, topic, CO, PO/PSO link where appropriate, Bloom level, type, difficulty, language, source, and license
- types: single-choice, multiple-select, numeric, fill, matching, ordering, short answer, essay, file upload, code, SQL
- question content, options, answer key, solution/explanation, marks, negative/partial marking model, tolerances, rubrics, attachments
- draft, review, revision, approved, retired lifecycle
- author-reviewer-approver separation
- immutable approved versions and controlled reuse
- duplicate/similarity review boundary
- blueprint definitions by outcome/unit/type/difficulty/marks
- import through staged validation
- authorized preview and audit

Security:
- treat approved examination questions as confidential by policy
- restrict export, watermark governed exports, audit access
- prevent authors from self-approving when SoD policy applies

Do not implement generative AI yet; create a clean future assistance interface only if required by current architecture.

Tests:
- scoring schema validation
- version immutability
- lifecycle and SoD
- confidential access
- blueprint totals/coverage
- import validation
- cross-tenant denial
- frontend author/reviewer flows

Update OpenAPI, question schema, authoring guide, threat model, and data dictionary.

Completion gate: governed, versioned questions can be authored, reviewed, approved, searched, assembled through a valid blueprint, and securely audited. Produce the standard completion report and stop.
```

---

# Prompt 11 — Fees, Payments, Receipts, and Reconciliation

```text
Read the PRD finance requirements and current workflows/outbox. Implement the financial subledger for student charges and collections. It is not a replacement for the institution's general ledger.

Capabilities:
- fee heads, plans, cohorts/programs/categories/quotas, due schedules, installments, late penalties, waivers, concessions, scholarships, sponsorships, and government reimbursement
- immutable fee demand source/rule references
- individual/bulk demand generation with preview and approval
- student ledger using double-entry-inspired balanced postings or another auditable subledger design; document the invariant
- online payment intent and provider abstraction
- UPI, card, net banking, bank transfer, and QR/counter collection representations
- webhook verification, idempotency, pending/success/failure/reversal/refund/dispute/chargeback
- numbered receipts and credit/reversal documents
- settlement import, automatic matching, exception queue, and manual reconciliation with approval
- due reminders through notification events
- holds and automatic release after authoritative settlement
- application, tuition, examination, condonation, revaluation, certificate, hostel, transport, library, training, and commerce charge support
- accounting export boundary

Implement a deterministic fake payment provider only for local/test profiles, clearly labeled and impossible to activate in production. Never store raw card data.

UX:
- student dues/payment/receipt view
- cashier workflow
- concession/scholarship approval
- finance dashboard and reconciliation queue
- refund workflow

Tests:
- monetary precision and currency
- duplicate webhooks/payment retries
- concurrent payments
- partial and excess payment policy
- refund/reversal audit
- settlement reconciliation
- tenant isolation and finance permissions
- end-to-end test-provider flow

Update OpenAPI, payment threat model, PCI-scope statement, reconciliation runbook, ledger invariants, and data dictionary.

Completion gate: a demand can be approved, paid idempotently, receipted, settled, reconciled, refunded/reversed when authorized, and audited without balance corruption. Produce the standard completion report and stop.
```

---

# Prompt 12 — Examination Setup, Applications, Eligibility, and Hall Tickets

```text
Read the complete autonomous-examination PRD section plus constitution. Treat examination correctness as safety-critical institutional logic.

Implement:
- examination cycle/type and component configuration by regulation/cohort
- internal, mid, end-semester, lab, practical, project, viva, supplementary, backlog, improvement, makeup, and special exam types
- marks, weights, pass rules, combined pass, absence/malpractice codes, grace/rounding configuration references
- application windows, late windows, fees, exemptions, and correction windows
- scheduled course exams with conflict detection
- eligibility engine using registration, attendance/condonation, applicable fees/holds, internal requirements, and approved exceptions
- explainable eligibility decision storing rule version and input snapshot
- online examination application and backlog-course selection
- finance-module fee request and payment confirmation
- candidate-list freeze
- hall tickets with signed/opaque verification token, QR representation, authorized validation endpoint, and configurable instructions
- withheld/released hall-ticket decisions with reason and workflow

Never trust calculated eligibility sent by the frontend. Do not recalculate historical eligibility using today's changed rules.

UX:
- Controller/exam branch cycle setup
- eligibility preview and exception queue
- student application/payment/status
- hall-ticket download and privacy-safe verification
- dashboards for pending, ineligible, exceptional, and frozen candidates

Tests must include a regulation-driven matrix for regular, attendance shortage, condoned, fee hold, backlog, improvement, exception, and frozen cases; concurrency; QR privacy; authorization; tenant isolation; and end-to-end journeys.

Update OpenAPI, rule catalogue, exam security model, data dictionary, and operator runbook.

Completion gate: an exam cycle moves from setup to frozen candidates and verifiable hall tickets with reproducible eligibility and complete audit. Produce the standard completion report and stop.
```

---

# Prompt 13 — Secure Question-Paper Governance

```text
Read the PRD question-paper governance requirements, question-bank implementation, document security, IAM, workflows, and threat model.

Implement a distinct confidential examination-paper domain:
- paper requirement and blueprint
- internal/external setter invitation with time-bound scoped access
- conflict-of-interest and confidentiality declarations
- secure submission of multiple sets
- moderator assignment, review, correction, approval, translation status, and finalization
- two-person control for final release
- controlled random/set selection
- opening/release windows
- watermarking metadata, download/view audit, device/IP/correlation data
- secure print/dispatch register and custody events
- post-exam archive, retention, and legal hold metadata

Security requirements:
- confidential objects use a dedicated storage prefix/bucket and KMS-key abstraction
- presigned URLs are short-lived and issued only after real-time authorization
- list/search responses must not leak paper titles/metadata outside assigned scope
- no paper contents in logs, analytics, search indexes, notifications, test snapshots, or audit before/after values
- privileged operations require MFA assurance representation and reason
- no setter can moderate/approve the same paper when policy prohibits it
- support emergency revoke and incident hold

Use safe generated fixtures only. Never include real examination questions in the repository.

Tests:
- SoD and scoped external access
- expired access and URL behavior
- release-window boundaries
- metadata leakage checks
- two-person approval
- audit without content exposure
- tenant isolation
- storage adapter contract

Update the threat model, incident runbook, key/access design ADR, OpenAPI, data dictionary, and operational checklist.

Completion gate: a paper can be securely set, moderated, approved, selected, released, tracked, and archived without content leakage or single-person final release. Produce the standard completion report and stop.
```

---

# Prompt 14 — Examination Logistics, Seating, Duties, and Script Custody

```text
Read the PRD examination logistics requirements and current timetable/identity models.

Implement:
- examination centers, buildings, rooms, capacity, accessibility, and permitted configurations
- candidate allocation and seating plan with deterministic seed/version
- configurable adjacency constraints and conflict explanations
- invigilator, reliever, chief superintendent, observer, lab assistant, and support-duty allocation
- conflict/workload/availability checks
- room packets, attendance sheets, nominal rolls, seating charts, invigilation orders, dispatch registers
- exam-day candidate attendance, late entry, early exit, booklet/barcode, accommodations, incidents
- malpractice case creation with confidential workflow
- answer-script packet, barcode, count, collection, handover, custody, receipt, mismatch, and escalation
- practical/lab/viva schedules, batches, panels, external examiner assignments

Use versioned generated artifacts and audit every regeneration after publication. Ensure reports minimize exposed personal data.

UX:
- operations planning dashboard
- allocation simulation, manual adjustment, validation and freeze
- invigilator mobile-friendly duty view and acknowledgement
- room attendance/custody capture
- mismatch and incident queue

Tests:
- capacity and adjacency
- deterministic allocation
- concurrent barcode/custody events
- permission scopes
- published-plan amendments
- cross-tenant isolation
- end-to-end exam-day scenario

Update OpenAPI, logistics algorithm ADR, data dictionary, exam-day runbook, and printable artifact catalogue.

Completion gate: a frozen candidate list can be allocated to rooms and staff, exam-day attendance captured, and answer scripts tracked through custody with reconciled counts. Produce the standard completion report and stop.
```

---

# Prompt 15 — Evaluation, Marks, Moderation, and Correction

```text
Read the PRD evaluation requirements and existing exam configuration, question-paper, logistics, and IAM modules.

Implement:
- evaluator eligibility and assignment
- anonymized candidate/script identifiers where configured
- component and question-wise marks entry
- rubric support for practical/project/viva/subjective components
- absent, withheld, malpractice, not-registered and approved special codes
- validation of maximums, minimum required entries, totals, component rules, missing marks, and duplicate scripts
- evaluator submit/lock
- chief evaluator review
- double evaluation, variance threshold, third evaluation, and moderation rules
- controlled marks import via staged template with preview, schema validation, row errors, reconciliation, approval, and idempotency
- formal correction workflow after submission with original value, proposed value, reason, evidence, approvers, and immutable history
- marks completion and anomaly dashboards

Every mark must preserve provenance: tenant, exam, candidate, course, component/question, evaluator or import batch, value/code, rule/config version, timestamps, corrections, and approvals.

Do not expose student identity to evaluators when anonymization is enabled. Never permit direct database or bulk UI edits to locked marks.

Testing:
- boundary values and codes
- double/third evaluation selection
- correction and concurrency
- staged import atomicity and reconciliation
- anonymization
- SoD and tenant isolation
- full evaluation workflow

Update OpenAPI, data dictionary, mark invariants, evaluator guide, correction runbook, and threat model.

Completion gate: evaluators can enter and submit validated marks, moderation rules execute reproducibly, locked marks change only through approved correction, and provenance is complete. Produce the standard completion report and stop.
```

---

# Prompt 16 — Result Engine, SGPA/CGPA, Approval, and Publication

```text
Read the PRD result-processing requirements, all regulation models, and marks implementation. This prompt implements the highest-risk calculation engine. Favor clarity, determinism, and exhaustive tests over cleverness.

Implement a pure, versioned result-calculation domain supporting:
- component totals and pass criteria
- combined internal/external pass rules
- absence, malpractice, withheld, exemption, transfer/equivalent credits
- absolute grading and configured relative grading
- rounding, moderation, normalization, grace rules through typed approved configuration
- grade, grade point, credits registered/earned
- SGPA, CGPA and classification
- course failure/backlog and progression standing
- improvement/repeat policy
- non-credit/mandatory course completion
- result withholding and later release

Requirements:
- every calculation stores input snapshot hash, rule/config version, engine version, output, warnings, and time
- preview/simulation never modifies official records
- validation detects missing/invalid marks, rule conflicts, unusual distributions, pass-percentage anomalies, and result deltas
- approval workflow is configurable for Controller, Dean, Principal, Result Committee, Academic Council, or equivalents
- approved result batch becomes immutable and signed/versioned
- publication can be by full cycle, program, or course according to policy
- generate student result view, grade card, result gazette, and privacy-safe verification data
- result correction creates a new version and never replaces history

Testing:
- create a golden-master regulation test suite with table-driven cases for pass, fail, absent, malpractice, grace, rounding, relative grading, transfer, improvement, backlog, withheld, and correction
- property tests for invariants where practical
- verify deterministic reruns
- tenant and authorization tests
- performance test representative cohort batches
- end-to-end approval/publication journey

Do not use floating-point arithmetic for marks/credits/GPA. Document precision and rounding.

Update OpenAPI, formal calculation specification, ADR, data dictionary, validation runbook, approval checklist, and operator guide.

Completion gate: signed reference cases calculate exactly, simulation and approval are separated, approved results are immutable, publication is authorized, and historical reruns reproduce outputs. Produce the standard completion report and stop.
```

---

# Prompt 17 — Grade Cards, Transcripts, Certificates, and Verification

```text
Read the PRD official-document requirements, result engine, document service, and security model.

Implement a governed document-generation platform for:
- hall tickets where not already completed
- grade cards/semester memos
- consolidated marks memo
- official transcript
- provisional certificate
- course completion/bonafide/study/conduct and configurable service certificates
- degree eligibility list and result gazette

Capabilities:
- versioned templates by tenant, institution, program, regulation, document type, and effective date
- approved template lifecycle and preview with synthetic data
- deterministic rendering from frozen authoritative snapshots
- serial/document numbers using concurrency-safe schemes
- QR verification using opaque, revocable tokens; public response reveals minimum necessary data
- digital signature integration boundary; never claim a document is digitally signed without a configured signer
- issue, reissue, correction, revocation, supersession, watermark, and reason
- bulk generation as asynchronous jobs with progress/retry
- student service request and fee integration
- download audit and retention

Do not permit free-form templates to execute arbitrary code or unsafe HTML. Sanitize content and restrict template functions.

Tests:
- deterministic output metadata/checksum
- template version correctness
- numbering concurrency
- verification privacy
- revoked/superseded status
- authorization/tenant isolation
- job idempotency

Update OpenAPI, template guide, verification threat model, data dictionary, and issuance/revocation runbooks.

Completion gate: authorized staff can generate and issue versioned official documents from frozen data, students can retrieve them, and third parties can verify authenticity without unnecessary data exposure. Produce the standard completion report and stop.
```

---

# Prompt 18 — Revaluation, Grievances, Supplementary Exams, and Degree Completion

```text
Read the PRD post-result requirements and existing exam/result/finance/workflow modules.

Implement:
- recounting, photocopy, revaluation, challenge valuation, and result-grievance application types
- configurable eligibility, windows, fees, documents, SLA, and status
- payment integration
- confidential assignment to eligible evaluators with SoD/conflict checks
- decision, revised mark recommendation, approval, and communication
- targeted result recalculation creating a new official result version
- revised document issuance and supersession
- supplementary/backlog exam cycle generation from eligible failed courses
- attempt history, maximum-duration rules, repeat/improvement policies
- current backlog, credit completion, graduation eligibility, and degree audit integration
- withheld case resolution
- dashboards for applications, aging, evaluator progress, result changes, backlogs, and graduation risk

Ensure the original result and document remain preserved. A revaluation application must not guarantee a changed mark. Clearly model no-change, increase, decrease where regulation permits, rejected, withdrawn, and time-barred outcomes.

Tests:
- application eligibility/window/fee
- evaluator conflict and anonymization
- recalculation scope
- original and revised result preservation
- supplementary cycle creation
- maximum-duration/degree eligibility cases
- tenant isolation and authorization
- end-to-end revaluation journey

Update OpenAPI, process diagrams, regulation guide, data dictionary, student guide, and operations runbook.

Completion gate: a paid revaluation can be securely processed into a preserved result revision and revised document; eligible backlogs feed supplementary registration and degree audit correctly. Produce the standard completion report and stop.
```

---

# Prompt 19 — OBE, CO/PO Attainment, Surveys, and Accreditation Evidence

```text
Read the PRD OBE/accreditation requirements and existing curriculum, question, assessment, marks, result, LMS, and document modules.

Implement:
- PEO/PO/PSO/CO lifecycle and approved mappings
- question/rubric criterion to CO and Bloom mapping
- direct attainment using configurable thresholds, targets, weights, population rules, and exclusions
- indirect attainment from course-end, graduate-exit, alumni, employer, and stakeholder surveys
- CO-to-PO/PSO rollup with mapping strengths and approved formulas
- calculation snapshots with source references, configuration/engine version, exclusions, and reproducibility
- course, cohort, program, and multi-year views
- gap identification and corrective-action workflow with owner, due date, evidence, review, and closure
- digital course-file integration
- NBA, NAAC, and IQAC evidence repository organized by framework/criterion/metric/year/owner/status
- evidence requests, completeness, review, approval, observations, expiry, and action tracking
- governed evidence index/export

Never silently exclude students or assessments. Show the exact population and reasons. Do not hard-code a single institution's attainment formula.

UX:
- mapping matrix editor
- attainment setup and simulation
- source drill-down
- action dashboard
- evidence repository and accreditation readiness dashboard

Tests:
- golden calculation cases
- formula versioning
- exclusion transparency
- source authorization
- mapping validation
- tenant isolation
- full attainment and corrective-action journey

Update OpenAPI, formal formula specification, data dictionary, OBE guide, accreditation evidence guide, and ADRs.

Completion gate: approved assessment data produces reproducible CO/PO/PSO attainment with drill-down, gaps create trackable actions, and accreditation evidence is governed rather than copied into uncontrolled folders. Produce the standard completion report and stop.
```

---

# Prompt 20 — Online Assessment Delivery and Analytics

```text
Read the PRD online-assessment requirements and existing question bank, identity, timetable, accommodations, and LMS. Implement the non-coding online assessment engine.

Capabilities:
- practice, scheduled, open-window, take-home, and proctoring-ready modes
- sections, instructions, optional questions, pools, deterministic randomization, navigation rules, attempt limits, negative/partial marking
- eligibility and accommodations, including extra time
- secure attempt start with server-authoritative time
- frequent idempotent autosave and resume policy
- safe final submission, timeout submission, late policy, and submission receipt
- objective/numeric automatic scoring; subjective queue and rubric grading
- question-level response history appropriate for audit without exposing answers prematurely
- browser/device/network event collection with clear privacy policy
- proctoring-provider port; no fake proctoring status
- result release controls
- item analysis: difficulty, discrimination, distractors, speed, accuracy, topic/outcome performance
- rank, percentile, normalization, and cohort comparison when enabled

Architecture:
- design assessment runtime so it can scale independently later
- protect the transactional database from high-frequency write storms using a documented strategy
- test network interruption, duplicate save, clock skew, concurrent sessions, and forced submission

Security must reduce cheating opportunities without claiming impossibility. Do not use invasive device capabilities without explicit policy/consent.

Update OpenAPI, runtime ADR, threat model, privacy guide, load-test plan, and student/faculty guides.

Completion gate: a scheduled assessment can be authored from approved questions, delivered reliably with autosave/resume, scored/reviewed, released, and analyzed under representative concurrency tests. Produce the standard completion report and stop.
```

---

# Prompt 21 — Programming Lab and Secure Code Execution

```text
Read the PRD programming-lab requirements and current assessment architecture. Implement the programming lab as an independently scalable and strongly isolated execution plane.

Languages for first release:
- C
- C++
- Java
- Python
- JavaScript/TypeScript
- SQL using isolated/resettable PostgreSQL schemas or databases

Control plane capabilities:
- per-student workspace metadata, folders/files, autosave, snapshots, version history, restore
- course exercises, starter code, assignments, lab records, contests, and exams
- problem definition with public/hidden tests, constraints, scoring, time/memory limits, allowed languages, and rubric
- submission lifecycle and immutable exam submissions
- result, compiler/runtime output, time, memory, and test summaries
- faculty override through reasoned approval
- similarity-analysis provider boundary and human-review case; never auto-punish
- competency/readiness analytics

Execution plane:
- define a separate worker service and job protocol
- ephemeral sandbox per run/submission
- non-root execution, read-only base image, limited writable temp space, CPU/memory/process/time quotas
- no network by default, no host mounts, no cloud metadata access, seccomp/AppArmor-compatible controls, output-size limits
- language images pinned by digest and scanned
- signed job identity, idempotency, cancellation, timeout, and cleanup
- store source/artifacts securely; do not log student source or secrets
- SQL isolation and reset between attempts

Local development can use a constrained Docker runner with explicit warnings. Production design should target ECS/Fargate or EKS isolation based on a documented threat/cost analysis; do not deploy yet.

UX:
- accessible browser editor integration
- run/test/submit experience
- exam mode and network-loss handling
- faculty problem authoring and grading/review

Tests:
- sandbox escape defense tests feasible in CI
- infinite loop, fork bomb, memory/output/time limits
- forbidden network/file access
- hidden-test confidentiality
- tenant/student workspace isolation
- idempotent jobs
- representative concurrent load test

Update OpenAPI, job protocol, sandbox threat model, ADR, image lifecycle runbook, incident runbook, and user guides.

Completion gate: students can safely practice and submit all target languages, tests execute in isolated disposable sandboxes, hostile-resource cases are contained, and exam submissions remain auditable. Produce the standard completion report and stop.
```

---

# Prompt 22 — Training, Placement, Employers, and Offers

```text
Read the PRD placement/training requirements and integrate with student, academic, assessment, coding, documents, and communications modules.

Implement:
- student career profile: skills, projects, certifications, achievements, internship, preferences, resume versions, verified evidence
- employer and contact CRM with data classification
- job/role, package components, locations, job description, agreements, and history
- placement policies: eligibility, dream/super-dream categories, multiple-offer restrictions, opt-out and consent
- explainable eligibility using program, cohort, CGPA, active backlogs, gaps, skills, assessments, and prior offers
- drive creation, stages, deadlines, capacity, documents, communications
- eligible-student notification, consent, registration, withdrawal
- shortlisting and controlled employer data sharing
- screening, aptitude/coding test linkage, GD, technical/HR interviews, selection/rejection/waitlist
- offer letter, verified package, acceptance, joining, non-joining, and multiple offers
- restricted recruiter portal with time-bound access

Training:
- training programs, sessions, trainers, batches, attendance, content, feedback, assessments
- department/employer/role-specific tests
- skill/readiness dashboards and intervention plans

Privacy:
- employers receive only approved fields for consented candidates
- log every data share/export
- expire recruiter access and download links

Tests:
- eligibility matrices and rule versions
- offer-policy concurrency
- consent and data sharing
- scoped recruiter access
- drive-stage workflows
- tenant isolation
- end-to-end drive journey

Update OpenAPI, policy/rule guide, privacy threat model, data dictionary, placement officer guide, and recruiter guide.

Completion gate: a placement officer can create a drive, identify students with explainable eligibility, obtain registrations/consent, manage stages and offers, and report joining outcomes securely. Produce the standard completion report and stop.
```

---

# Prompt 23 — Internships, Academic Projects, and Mentoring

```text
Read the PRD internship/project requirements and existing placement, LMS, student, faculty, and document modules.

Implement:
- internship opportunities, eligibility, applications, selection, institutional approval, employer/mentor contacts
- offer/permission documents, dates, mode/location, stipend metadata, attendance/logbook, milestones, reviews, feedback, completion
- minor/major/capstone project definitions
- student team formation, guide/co-guide allocation, proposals, problem statements, ethics/IP/confidentiality classification
- milestone calendar, reviews, rubrics, panel assignment, marks integration boundary, artifacts, demo, final report, and repository/link metadata
- plagiarism/similarity integration boundary
- industry mentor and employer feedback
- faculty and external mentor workload
- student risk, overdue milestone, intervention, and completion analytics
- authorized showcase/portfolio publication requiring explicit approval and consent

Do not expose confidential employer or student project IP through search, analytics, or AI. Apply retention and access policies.

Tests cover team membership constraints, guide workload, milestone state transitions, confidential artifacts, external mentor access, marks handoff, tenant isolation, and end-to-end project/internship journeys.

Update OpenAPI, data dictionary, IP/privacy policy guide, project coordinator guide, and student guide.

Completion gate: internships and projects can be governed from opportunity/proposal through reviews and completion with evidence, marks handoff, and privacy controls. Produce the standard completion report and stop.
```

---

# Prompt 24 — Faculty HR, Workload, Leave, and Appraisal

```text
Read the PRD faculty/HR requirements. Implement college-focused HR functions without attempting to replace a full statutory payroll system.

Capabilities:
- employee records, appointments, service history, qualifications, experience, documents, designations, departments, roles
- recruitment requisition, candidates, interviews, offers, onboarding and verification
- shifts, biometric/manual attendance integration, leave types/balances, leave and permission requests, on-duty, holiday calendars
- workload calculation across teaching, labs, mentoring, projects, research, exam duties, administration, and additional assignments
- overload/under-allocation, timetable conflict, qualification and compliance alerts
- goals, appraisal cycles, self-review, manager/peer review, approved student feedback aggregates, achievements, training, and improvement plans
- faculty eligibility for course/exam roles
- payroll-input and payslip integration boundaries
- faculty self-service

Privacy and fairness:
- compensation, personal, appraisal, and feedback data require fine-grained access
- never expose individual student feedback identities to faculty
- algorithmic workload/performance indicators are decision support, not automatic employment decisions

Tests cover leave balance concurrency, workload calculations, role eligibility, appraisal confidentiality, feedback anonymity thresholds, tenant isolation, and end-to-end faculty self-service.

Update OpenAPI, data dictionary, privacy model, HR guide, and integration specification.

Completion gate: HR and academic leaders can manage faculty records, leave, workload, eligibility, and appraisal with privacy, explainability, and audit. Produce the standard completion report and stop.
```

---

# Prompt 25 — Library, Hostel, Transport, Visitor, Assets, and Service Desk

```text
Read the PRD campus-operations sections. Implement these as separately enabled modules sharing identity, finance, documents, workflow, notifications, and audit.

Library:
- catalog, copies/accessions, barcode/RFID identity, location/status
- member policies, issue/return/renew/reserve, overdue, fine, lost/damaged/write-off
- OPAC and self-service
- acquisition/vendor boundary and reports

Hostel:
- hostel/block/floor/room/bed, categories and capacity
- application, allocation, check-in/out, room change, vacating
- visitor permission, leave/out-pass, incidents
- fees/deposit/damage/mess charge integration

Transport:
- vehicle/document/driver/attendant/route/stop/capacity/schedule
- student/staff allocation
- GPS and RFID/QR integration ports
- boarding/check-in/out, delay/deviation/breakdown/incident events
- maintenance/document-expiry and fee integration

Visitor:
- preregistration/walk-in, host, purpose, identity/photo/vehicle/items/consent
- approval, badge/pass, check-in/out, overstay, deny/watch list with restricted access
- emergency roll-call view and retention

Assets/inventory:
- stores, items/assets, serial, custodian/location, issue/return/transfer, stock count, minimum levels
- lab equipment calibration, warranty, AMC, maintenance, downtime, disposal

Service desk:
- catalog for certificate, IT, facility, hostel, transport, library, finance, academic and other services
- dynamic forms, documents, fees, workflow, SLA, escalation, communication, delivery
- confidential grievance/anti-ragging/disciplinary route with strict need-to-know access

Avoid a single giant campus module. Enforce boundaries and enablement by tenant plan/feature configuration.

Add unit, integration, tenant isolation, permission, payment-link, device-event idempotency, and core end-to-end tests. Update OpenAPI, data dictionary, runbooks, and user guides.

Completion gate: each operations module supports its primary end-to-end journey and can be disabled without breaking the platform. Produce the standard completion report and stop.
```

---

# Prompt 26 — Communications, Mobile-Ready APIs, and Role Portals

```text
Read the PRD communications and portal requirements. Consolidate the product into coherent role experiences; do not duplicate business logic in frontend code.

Notifications:
- templates, versions, localization, channel preference, consent/legal basis, quiet hours, approval, scheduling
- in-app, push, email, SMS and approved messaging-provider ports
- transactional triggers from attendance, exams, fees, placement, services, hostel, transport and emergencies
- audience resolution by authorized institutional scope
- per-recipient personalization without cross-recipient data leakage
- outbox-based delivery, retries, provider callbacks, delivery status, deduplication, cost metadata
- emergency broadcast, acknowledgement and escalation
- local/test adapters only unless real providers are configured

Portals:
- complete student dashboard and mobile-responsive navigation
- faculty dashboard/work queues
- HOD/Dean/Controller/Principal/management dashboards
- finance, admissions, placement, HR, library, hostel and operations workspaces
- parent/guardian experience controlled by institution policy, consent, and student age/status
- external evaluator/recruiter/auditor restricted portals

API/mobile readiness:
- stable mobile-oriented endpoints or backend-for-frontend where justified
- pagination, partial sync, ETags/versioning, offline-safe idempotent mutations
- push-device registration and revocation
- no desktop-only workflow for high-frequency student/faculty tasks

Frontend quality:
- responsive design, accessible navigation and forms
- consistent loading/empty/error/offline states
- route-level permission guards plus server authority
- localization extraction, not embedded string concatenation
- performance budgets and code splitting

Tests:
- audience isolation and consent
- duplicate delivery/retry
- deep links and revoked sessions
- responsive/accessibility tests
- representative student/faculty/admin Playwright journeys

Update OpenAPI, design-system documentation, notification runbook, mobile API guide, and accessibility checklist.

Completion gate: primary personas can complete their core tasks from coherent responsive portals, and event-driven communications are consent-aware, idempotent, observable, and tenant-safe. Produce the standard completion report and stop.
```

---

# Prompt 27 — React Native Mobile Foundation, Security, Offline Sync, and Role Shells

```text
Read the entire PRD, especially Sections 22.5–22.8, the constitution, IAM/API/notification/document ADRs, the current responsive web implementation, and all existing backend contracts. Implement a first-class React Native + TypeScript mobile workspace for Android and iOS. This must be a native application, not a WebView wrapper.

Architecture:
- create `mobile/` using a current supported React Native release and TypeScript strict mode
- use a monorepo/workspace arrangement only where it simplifies governed sharing
- share generated API types/client, design tokens, validation schemas, localization resources, and non-UI utilities where safe
- do not copy backend business rules into mobile
- keep native-only dependencies behind interfaces
- document whether bare React Native or Expo prebuild is selected; choose based on secure storage, notifications, background sync, camera/scan, location, app distribution, and long-term control
- support both Android and iOS from the first commit

Security:
- OIDC/OAuth authorization-code flow using system browser and PKCE
- secure token storage in Keychain/Keystore
- access-token refresh with rotation/failure handling
- server-controlled logout, logout-all-devices, and session revocation
- step-up authentication for sensitive approvals, finance, result, and high-risk operations
- biometric unlock only after server authentication
- root/jailbreak risk-signal interface with tenant-configurable response; do not claim perfect detection
- certificate/network security configuration without unsafe global pinning unless an operational rotation strategy exists
- prevent secrets, tokens, PII, assessment answers, and documents in logs, crash reports, screenshots where policy restricts them, clipboard, or unencrypted storage
- configurable screen-capture restrictions only for justified sensitive screens

Context and role shell:
- backend-validated tenant, institution, campus, and role switching
- dynamic feature/module entitlements
- role-based home, work queue, notifications, authorized search, calendar, profile, support, and settings
- support all PRD roles even if later prompts fill their domain screens
- navigation is not authorization; handle server 401/403 and revoked scope cleanly
- deep-link router with authentication, scope, expiry, and revoked-resource validation

Offline/sync platform:
- encrypted local database/cache abstraction
- per-user/per-tenant data partition and wipe on logout, membership loss, device revocation, or tenant switch as appropriate
- network-state awareness
- draft storage, idempotent mutation queue, backoff, retry, cancellation, visible sync state, and error recovery
- ETag/version-aware reads and optimistic-conflict UX
- server-authoritative reconciliation
- explicit allowlist of offline-capable entity types; confidential question papers, hidden tests, broad exports, raw payment credentials, secrets, and prohibited records cannot be cached
- remote minimum-version and emergency feature-disable configuration

Device services:
- push-device registration/revocation abstraction
- camera/document capture abstraction
- QR/barcode scan abstraction
- secure file preview/download abstraction
- location abstraction requiring foreground purpose and permission; no continuous tracking by default
- background task abstraction with platform limitations documented

Quality:
- accessible base components, dynamic type, screen-reader labels, focus management, contrast and touch targets
- English localization plus extraction/locale architecture for Telugu, Hindi, and others
- loading, empty, offline, stale, sync, conflict, unauthorized, maintenance, and forced-update states
- privacy-safe analytics/crash interface disabled or local in development until a provider is configured

Testing/CI:
- unit and component tests
- API contract generation drift check
- offline queue, retry, conflict, logout wipe, revoked session, deep-link, and role-switch tests
- Android emulator smoke test
- establish iOS simulator test configuration; explicitly state that macOS runners are required and never claim Linux CI validated iOS
- introduce Appium or Maestro architecture for cross-platform end-to-end tests

Create `docs/mobile/ROLE_FEATURE_MATRIX.md` containing every PRD role, planned screens, mobile-first actions, web-first restrictions, offline policy, device capabilities, sensitive-data policy, and implementation status. Initially, foundation screens can be marked partial; do not mark role completion prematurely.

Update mobile architecture ADR, threat model, API/mobile compatibility policy, developer setup, CI, and troubleshooting.

Completion gate: Android and iOS projects build in their valid environments, authentication/context/role shell is functional, encrypted offline infrastructure and device abstractions are tested, every role is represented in the traceable feature matrix, and no static shell is misreported as a completed role interface. Produce the standard completion report and stop.
```

---

# Prompt 28 — Student, Parent, Faculty, and Mentor Mobile Experiences

```text
Read the PRD role-mobile matrix, existing mobile foundation, backend APIs, responsive web journeys, and domain modules. Implement production vertical slices for Student, Parent/Guardian, Faculty, and Mentor/Counselor in the React Native Android/iOS application.

Student mobile:
- home with timetable, attendance, dues, exam, learning, placement, transport/hostel and action summaries based on enabled modules
- profile, documents, correction requests, registrations, electives and degree audit
- timetable/calendar and approved offline view
- attendance detail, shortage, correction request and condonation status
- course content, downloads allowed by policy, assignments, submissions and feedback
- assessment schedule, attempt handoff, receipt and results; prohibit mobile attempt when policy mandates a controlled desktop/device
- exam application, fee, hall-ticket QR, schedule, results, grade cards, revaluation/supplementary status
- fees, payment provider handoff, UPI/deep link where supported, receipts, refunds and service purchases
- coding workspace companion for problem viewing, submission status and analytics; full editor only if mobile usability/security criteria pass
- placement profile, drives, consent, registration, training, internship, project milestones, offers
- library, hostel, transport/live trip, visitor approvals, service requests and communications

Parent/Guardian mobile:
- policy-, relationship-, student-status-, age-, and consent-controlled student switch
- permitted attendance, fees, academic progress, transport, hostel, emergency and communication views
- authorized payments, acknowledgements, requests and designated staff contact
- never expose confidential assessments, placement, discipline, mentor notes or student communication without explicit policy

Faculty mobile:
- schedule/course dashboard and substitutions
- roster and offline attendance with idempotent synchronization, conflict handling and final server receipt
- teaching diary drafts, syllabus progress, notes/evidence capture
- content/assignment management appropriate for mobile, grading and feedback
- marks entry for explicitly enabled workflows with validation and step-up where required
- exam/invigilation/evaluation duties, acknowledgements and alerts
- leave, attendance, workload, feedback and appraisal tasks

Mentor/Counselor mobile:
- advisee roster and explainable risk alerts
- attendance, academic, fee-hold, placement-readiness and engagement summaries within permission
- interventions, appointments, follow-up tasks, communication and privacy-classified notes
- escalation and closure workflow

Cross-role requirements:
- one account can switch roles and institutions
- push deep links land on an authorized current record or a safe unavailable state
- offline allowlist: timetable, approved content metadata/files, drafts and attendance queue; payments, approvals and official marks/results require confirmed online server response unless a domain policy explicitly permits safe queuing
- camera/document scan and QR presentation/scan
- accessible and localized UI
- low-bandwidth image/file handling
- analytics and crash data must be privacy-safe

Update `docs/mobile/ROLE_FEATURE_MATRIX.md` with implemented screens, tests and remaining web-first restrictions.

Testing:
- unit/component/API contract
- Android and iOS critical journeys for each of the four role groups
- offline attendance, draft sync, tenant/role switch, guardian permission, revoked access, duplicate payment-return callback, deep link and accessibility
- backend tenant/scope denial tests for every new mobile API

Completion gate: Student, Guardian, Faculty and Mentor can complete their defined high-frequency journeys on Android and iOS using real APIs, with secure offline behavior, backend authorization, audit and automated evidence. Produce the standard completion report and stop.
```

---

# Prompt 29 — Leadership, Examination, Admissions, Finance, HR, and Quality Mobile Experiences

```text
Read the PRD mobile matrix, security/separation-of-duties rules, mobile foundation, and existing domain APIs. Implement role-appropriate React Native interfaces for institutional leadership, academic governance, examinations, admissions, finance, HR, and accreditation/IQAC.

Leadership/governance roles:
- Group Chairman/Management, Principal/Director, Dean Academics, HOD, Program Coordinator and committee members
- governed KPI cards, drill-down, action/approval inbox, academic delivery, attendance, admissions, finance, exam readiness/results, placement, accreditation and incident alerts
- emergency broadcast and acknowledgement
- step-up authentication and explicit confirmation for consequential approvals
- no unrestricted exports or rule/config editing on mobile

Examination roles:
- Controller dashboard with cycle readiness, eligibility, paper/logistics status without confidential content, marks completion, anomalies, result approval status and incidents
- exam staff candidate lookup, hall-ticket QR validation, room attendance, late/early event, accommodations, malpractice/incident evidence, script packet barcode/custody and count reconciliation
- invigilator/chief superintendent/observer duties, instructions, acknowledgement and room workflows
- external examiner/evaluator restricted assignment, practical/viva rubric and secure marks entry where policy permits
- paper setter/moderator assignment/declaration/status and approval notifications; confidential paper authoring/content remains hardened web/controlled-device unless explicitly authorized
- offline exam-day capture only through allowlisted, encrypted, short-retention queues with idempotency and reconciliation

Admissions:
- enquiry capture, follow-up, applicant search, consent, document capture/verification, offer/admission status and onboarding checklist
- merit generation, seat matrix and mass allocation remain web-first

Finance:
- authorized ledger lookup, QR-assisted counter collection, payment verification, receipt delivery, due/failed-payment exceptions, settlement status, concession/refund approval
- never capture/store raw card credentials
- bank-file import, reconciliation editing, bulk demand and accounting export remain web-first

HR:
- employee self-service, attendance, leave/permission/on-duty, manager approvals, workload, recruitment interview feedback, onboarding, appraisal tasks, training and document expiry
- payroll and bulk employee configuration remain web-first

Accreditation/IQAC:
- evidence task queue, authorized file review, observations, corrective actions, due dates, readiness KPIs and auditor-restricted review
- framework/formula configuration remains web-first

For every role, implement only authorized fields/actions, appropriate data minimization, audit, session/step-up checks, safe deep links and clear web-first handoff.

Update the role-feature matrix and add Android/iOS critical journeys for every role group. Include negative authorization and confidential-data cache tests.

Completion gate: all leadership, governance, exam, admissions, finance, HR and quality roles have real role-appropriate Android/iOS interfaces, while prohibited bulk/configuration/confidential operations are explicitly restricted and tested. Produce the standard completion report and stop.
```

---

# Prompt 30 — Placement, Library, Hostel, Transport, Visitor, Operations, Employer, and Platform Mobile Experiences

```text
Read the PRD role-mobile matrix, mobile foundation, campus-operation modules, and current APIs. Implement the remaining role interfaces so every product role has an Android/iOS experience.

Placement/training/project roles:
- placement officer/coordinator drive pipeline, eligible/registered counts, stages, attendance, feedback, offers and joining
- trainer batches, schedule, attendance, assessment/readiness and interventions
- internship/project coordinators and internal/external mentors: approvals, logs, milestones, rubrics, reviews and evidence
- interview panel member restricted feedback

Library roles:
- librarian/assistant borrower lookup, borrower QR, barcode/RFID circulation, renew/reserve, overdue/fine, lost/damaged and stock-count tasks
- student/faculty OPAC, availability, reservations, renewals, digital links and fine payment handoff

Hostel roles:
- warden/assistant/security resident and room lookup, check-in/out, out-pass/leave approvals, roll call, authorized visitors, incidents, maintenance, emergency alerts and occupancy summary
- resident/guardian permitted requests, status, dues and alerts

Transport roles:
- transport administrator live operations, vehicles/drivers, trip/route/manifest, delays, deviation, breakdown, incidents and document expiry
- driver distraction-minimized mode with trip start/end, navigation handoff, required acknowledgements and SOS; disable nonessential interaction while moving where feasible
- attendant/helper manifest, QR/RFID boarding/alighting, missing-rider and incident flow
- student/staff/guardian route, vehicle, ETA/live trip and alerts when enabled
- location collection only during authorized trip/purpose with visible state and retention policy

Visitor/security/facilities/IT/lab/store roles:
- preregistration, host approval, ID/photo, badge QR, check-in/out, watch-list/deny decision by authorized users, emergency roll call
- work orders, asset barcode/QR, issue/return/transfer, stock count, calibration/maintenance evidence, SLA and closure

Employer/recruiter roles:
- time-bound authentication, drive details, minimum authorized candidate fields, stage/feedback/shortlist/selection and secure documents
- consent, expiry, download audit and no background broad export

Tenant/platform administration:
- institution IT/tenant admin health, integrations, access reviews, session revocation, maintenance, release status and support-access approval
- platform operations/support/security health, incidents, queues, emergency controls and time-bound access request status
- no implicit tenant-data access; provisioning, secrets, permissions architecture and infrastructure remain secure web/operations-console functions

Cross-cutting:
- each workflow uses actual APIs, backend authorization and audit
- offline event queues only for allowlisted field operations such as scans, trip events, stock/custody counts and work-order evidence
- resolve duplicates/conflicts visibly
- camera/QR/barcode/location permission UX and accessibility
- update role matrix to show complete coverage and web-first boundaries

Testing:
- at least one Android and iOS critical journey for every role group
- offline scan/event synchronization and duplicates
- driver moving-state restrictions
- location permission/revocation
- employer data minimization/expiry
- platform support tenant-access denial
- role/tenant switches and deep links

Completion gate: every remaining PRD role has a tested, secure, useful Android/iOS interface and the role-feature matrix has no unexplained role gaps. Produce the standard completion report and stop.
```

---

# Prompt 31 — Mobile Quality, Appium/Maestro Regression, Store Release, and Operations

```text
Read the full PRD mobile requirements, role-feature matrix, mobile architecture, threat models, API compatibility policy, and all implemented mobile code. This prompt hardens and releases the Android/iOS product; do not substitute responsive-web tests.

Coverage and traceability:
- audit every PRD role against implemented Android/iOS screens, actions, backend APIs, authorization, audit, offline policy and tests
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` with only evidence-backed status
- no role may be marked complete based on a static dashboard or placeholder

Automated tests:
- unit and component tests
- generated API contract drift and backward-compatibility checks
- Appium 2 or Maestro end-to-end suite for Android and iOS
- at least one critical journey per role plus deeper coverage for student, faculty, examination, finance and transport
- accessibility automation plus manual screen-reader checklist for TalkBack and VoiceOver
- offline/reconnect, duplicate queue, conflicts, app background/termination, low storage, slow network, expired token, revoked session, forced update and maintenance mode
- push/deep-link matrix for cold, background and foreground states
- camera, document, QR/barcode, biometrics and location permission states
- tenant/role switching and data-cache purge
- device clock/time-zone and localization tests

Device matrix:
- define supported Android and iOS versions
- representative low-, mid- and high-tier Android devices and supported iPhones/iPads where relevant
- Firebase Test Lab/BrowserStack/device-farm provider abstraction if selected
- iOS simulator and signing jobs run only on macOS; report unavailable evidence honestly

Performance/reliability:
- startup, screen response, memory, battery, network payload, offline DB and sync queue budgets
- crash-free session target and ANR/hang monitoring
- image/file optimization and low-bandwidth validation

Security/privacy:
- mobile application security review aligned to OWASP MASVS themes
- secret/token/storage/log/clipboard/screenshot/backup inspection
- certificate/network configuration review
- root/jailbreak behavior
- SAST, dependency, native binary, SBOM and secret scans
- accurate Android data-safety and Apple privacy-manifest/disclosure inputs

Release engineering:
- protected Android keystore and iOS signing/certificates/profiles using CI secret storage
- reproducible signed AAB and iOS archive pipelines
- separate dev/staging/production configurations with no production bypass
- internal testing/TestFlight, staged rollout, phased release, minimum version, kill switch and rollback/forward-fix process
- release notes, build/version numbering and API compatibility checks
- crash/performance monitoring and alerting

Operational runbooks:
- mobile release and rollback
- signing-key/certificate rotation and loss
- forced upgrade and emergency disable
- push outage
- sync backlog/conflict
- data exposure/lost device
- app-review rejection
- supported-version retirement

Do not publish to Play Store or App Store unless authenticated accounts, signing authority and explicit deployment permission are available. Otherwise produce validated release artifacts/configuration and an exact manual handoff checklist without claiming publication.

Completion gate: every role has evidence-backed Android/iOS coverage; cross-platform regression, security, accessibility, offline, compatibility and release checks pass; signed release pipelines and operations are ready; actual store status is reported truthfully. Produce the standard completion report and stop.
```

---

# Prompt 32 — Analytics, Reporting, Search, and AI Assistance

```text
Read the PRD analytics and AI requirements. Implement governed analytics and search first, then limited assistive AI behind feature flags.

Analytics/reporting:
- role dashboards for management, principal, dean, Controller, HOD, faculty, mentor, admissions, finance, HR, placement, accreditation, and operations
- governed metric definitions, owner, formula/version, refresh time, data-quality status
- filters and drill-down preserving row-level authorization
- operational read models that do not run unbounded analytical queries against critical transaction paths
- scheduled reports, subscriptions, governed exports, watermark and export audit
- asynchronous large reports with progress, cancellation, retention, and download authorization
- institution-defined dashboard configuration from approved metrics, not arbitrary SQL

Search:
- authorized cross-module search through a search abstraction
- OpenSearch production adapter and local/test alternative
- tenant/scope filters applied before results are returned
- deletion/update propagation, replay/rebuild, and index-version strategy
- exclude confidential question papers, hidden tests, restricted grievances, and secrets

Assistive AI:
- centralized AI gateway abstraction with model/provider configuration, timeouts, cost/usage controls, prompt versions, source references, audit, and feature flags
- initial use cases: authorized policy/document Q&A with citations; draft question quality checks; performance-summary drafts; service-ticket classification/draft response
- retrieval must enforce source permissions before content reaches the model
- outputs labeled as AI-assisted and require human review where consequential
- do not train external models on tenant data by default
- redact or block sensitive data according to use-case policy
- institution can disable AI globally or by role/module/use case

If no external model credentials are configured, provide a deterministic test adapter and clear unavailable state—never fake AI output in production.

Tests:
- metric correctness and authorization
- export leakage prevention
- search tenant isolation and restricted-content exclusion
- prompt injection/source authorization tests
- AI feature disable and review requirements
- cost/timeout/failure behavior

Update OpenAPI, metric catalog, search ADR, AI governance/threat model, data dictionary, and operations runbooks.

Completion gate: users receive correct authorized analytics/search, and the limited AI features are grounded, cited, governed, optional, observable, and never silently authoritative. Produce the standard completion report and stop.
```

---

# Prompt 33 — AWS Infrastructure, CI/CD, Observability, Security, and DR

```text
Read the PRD NFRs, constitution, ADRs, threat models, and current local dependencies. Implement production-grade AWS infrastructure as code. Do not deploy or incur cloud cost unless valid AWS credentials and explicit deployment authorization are present. The expected default for this prompt is validated infrastructure code and deployment documentation, not an actual production deployment.

Target architecture:
- Route 53 and ACM boundaries for DNS/TLS
- CloudFront and AWS WAF for public web delivery where appropriate
- private VPC design across multiple Availability Zones
- public subnets only for required ingress; application/data services private
- ALB for APIs
- ECS Fargate for core backend and scalable workers unless an ADR justifies EKS
- Aurora PostgreSQL with encryption, backups, PITR, secret rotation boundary, and protected deletion
- ElastiCache/Redis where current application requires it
- S3 buckets segmented for public frontend artifacts, private documents, confidential examination artifacts, logs, and backups as needed
- KMS keys and least-privilege policies
- SQS/EventBridge for outbox delivery and asynchronous work
- OpenSearch only if implemented and sized appropriately
- SES/SNS/provider integration boundaries
- Cognito or external OIDC decision captured in ADR
- Secrets Manager/Parameter Store
- CloudWatch logs/metrics/alarms, OpenTelemetry traces, dashboards
- ECR with image scanning

Infrastructure requirements:
- use Terraform with reusable environment modules for dev, staging, production
- remote state design with locking and encryption
- no secrets in state inputs where avoidable; mark sensitive outputs
- resource tags for product, environment, owner, tenant model, cost center, data class
- budget and cost anomaly alerts
- autoscaling for API, jobs, assessment, report and coding workers based on suitable metrics
- security groups and IAM least privilege
- VPC endpoints where beneficial
- CloudTrail, GuardDuty/Security Hub integration direction, Config and audit retention as justified
- backup and restore plans meeting PRD RPO/RTO targets
- blue/green or rolling deployment with health gates and rollback

CI/CD:
- pull-request validation
- reproducible backend/frontend/container builds
- reproducible React Native Android builds and macOS-hosted iOS builds/tests
- protected mobile signing, internal-distribution/TestFlight handoff, staged store-release gates, and mobile environment/API compatibility validation
- SBOM, SAST, dependency/container/IaC/secret scans
- signed provenance/artifacts where practical
- database migration preflight and controlled application
- staging deploy and smoke tests
- production approval gate
- no long-lived AWS keys; use GitHub OIDC

Observability:
- service-level indicators and objectives
- dashboards and alerts for availability, latency, errors, saturation, DB, queues, payments, exams, results, notifications, and sandbox jobs
- PII-safe logs and trace sampling

DR:
- restore runbooks, scheduled test procedure, evidence capture, regional-disaster decision and limitations

Validate Terraform formatting, lint, security scans, plan with safe mock/example variables where possible, Docker builds, and CI syntax. Do not invent successful cloud deployment results.

Update architecture diagrams, ADRs, cost assumptions, environment matrix, deployment, rollback, backup, restore, incident and access runbooks.

Completion gate: infrastructure and pipelines are reviewable, least-privilege-oriented, reproducible, scan clean at agreed severity, and capable of deploying the tested application with documented recovery. Produce the standard completion report and stop.
```

---

# Prompt 34 — Production Readiness, Full Regression, Pilot, and Launch

```text
Read the full PRD, constitution, ADRs, runbooks, threat models, OpenAPI, and entire repository. This is a release-readiness prompt, not permission to rewrite architecture.

Perform a structured gap analysis against every PRD requirement. Create `docs/product/TRACEABILITY_MATRIX.md` mapping requirement IDs to implementation, API/UI, tests, status, and evidence. Use only these statuses: Implemented, Partially Implemented, Deferred by Approved Scope, Blocked. Never mark a stub, mock-only production path, placeholder, or untested code as Implemented.

Complete production-hardening work within the agreed release scope:
- resolve broken boundaries and inconsistent tenant authorization
- verify all Flyway migrations from an empty database and supported upgrade path
- validate PostgreSQL constraints, indexes, query plans for critical journeys, and RLS
- verify OpenAPI compatibility and error consistency
- eliminate exposed secrets, sensitive logging, debug endpoints, and insecure defaults
- dependency, SAST, DAST, container, IaC, license, and secret scans
- accessibility audit of primary journeys
- responsive/mobile browser audit
- native Android/iOS role-feature audit covering every PRD role
- Appium/Maestro critical journeys, offline synchronization, deep links, push, device permissions, accessibility, supported-device matrix, and secure local-storage audit
- localization and time-zone audit
- backup/restore rehearsal in a safe environment or a precise executable runbook when infrastructure is unavailable
- load tests for login/context, attendance, assessment autosave, fee payment callbacks, result processing/publication, reports, and coding queue
- chaos/failure tests for database interruption, queue duplication, object-storage failure, payment callback replay, notification outage, and worker timeout where safe
- audit completeness checks for identity, permissions, exams, results, finance, documents, exports, and support access

Create a golden end-to-end pilot dataset using synthetic people and one realistic B.Tech regulation. Cover:
1. tenant/institution setup
2. curriculum and academic calendar
3. admission/student conversion
4. registration/elective allocation
5. timetable and attendance
6. fee demand/payment/reconciliation
7. exam application/eligibility/hall ticket
8. paper governance/logistics/evaluation
9. result/grade card
10. revaluation/supplementary/backlog
11. OBE attainment/action
12. assignment/online assessment/coding exam
13. placement drive/offer
14. service request/document verification
15. every-role native-mobile interface coverage, including web-first restriction and secure handoff cases

Create:
- release checklist
- go/no-go checklist with named role placeholders
- design-partner UAT plan and signoff templates
- data migration rehearsal plan and reconciliation signoff
- examination-period command-center plan
- support severity/SLA/escalation model
- rollback and data-correction procedures
- known limitations and deferred roadmap
- operational ownership/RACI
- launch and hypercare plan

Run the complete automated suite and provide exact evidence. Fix defects within scope. For unresolved critical/high defects, mark the gate failed; do not rationalize them away.

Completion gate:
- no open critical security/correctness defects
- all tenant-isolation tests pass
- golden result cases pass
- payment idempotency/reconciliation passes
- critical Playwright journeys pass
- critical Android and iOS journeys pass for every role; iOS evidence comes from valid macOS/simulator or physical-device infrastructure
- accessibility and performance meet documented release thresholds
- migrations and recovery procedure validated
- traceability is honest and complete
- standard completion report ends with `Completion gate: PASSED` only when all conditions are truly met
```

---

# Recovery Prompt — Resume a Partial or Failed Claude Code Run

```text
The previous Claude Code task stopped, failed, or may have left partial changes. Do not assume completion and do not start new feature work.

Read:
- `docs/product/PRD.md`
- `docs/engineering/CONSTITUTION.md`
- the exact prompt that was being executed
- current Git status and diff
- relevant ADRs, OpenAPI, migrations, tests, and logs

Perform recovery in this order:
1. Identify the intended scope and completion gate of the interrupted prompt.
2. Inventory every changed/untracked file and classify it as valid partial work, unrelated pre-existing work, generated output, or suspicious/incomplete work.
3. Preserve all unrelated user changes. Do not run destructive Git commands.
4. Compile and run the smallest relevant tests to determine actual repository state.
5. Inspect database migrations for partial numbering, edits to applied migrations, checksum hazards, unsafe SQL, and rollback assumptions.
6. Inspect APIs/contracts and frontend/backend compatibility.
7. Inspect tenancy, authorization, audit, idempotency, and data-integrity implications.
8. Create a short recovery plan based on evidence.
9. Complete only the interrupted prompt's scope, fixing partial or inconsistent work.
10. Run its full completion gate and standard verification suite.

Do not delete partial work merely because it is incomplete. Do not claim success based only on compilation. Do not proceed to the next numbered prompt.

Finish with the standard completion report plus:
- root cause of interruption if known
- partial-state findings
- recovery actions
- whether any manual review remains
- `Completion gate: PASSED` or `Completion gate: FAILED`
```

---

# Claude Code Session Bootstrap Prompt

Use this short prompt at the beginning of a new Claude Code conversation after Prompt 00 has completed:

```text
Before doing any work, read `docs/product/PRD.md`, `docs/engineering/CONSTITUTION.md`, all ADRs relevant to the requested module, current Git status, and the existing implementation. Preserve all valid work and established architecture. Enforce tenant isolation, scoped authorization, audit, versioned Flyway migrations, OpenAPI/RFC 7807 contracts, test evidence, accessibility, observability, and no fake production behavior. Do not broaden the requested scope. At completion, provide the standard completion report required by the constitution and stop.
```

---

## Suggested Commit Sequence

Use one reviewed commit per completed prompt. Suggested prefixes:

- `chore(platform):` foundation and tooling
- `feat(identity):` identity and access
- `feat(academic):` academic structure, registration, timetable
- `feat(student):` admissions and student lifecycle
- `feat(attendance):` attendance and condonation
- `feat(learning):` LMS and question bank
- `feat(finance):` fees and payments
- `feat(exams):` autonomous examination features
- `feat(obe):` OBE and accreditation
- `feat(assessment):` online assessments
- `feat(coding):` programming lab
- `feat(placement):` training and placement
- `feat(hr):` faculty HR
- `feat(operations):` campus operations
- `feat(communications):` notifications and portals
- `feat(mobile):` React Native foundation and role interfaces
- `test(mobile):` Android/iOS regression and release gates
- `feat(analytics):` reports, search and AI
- `feat(infra):` AWS and CI/CD
- `chore(release):` production readiness

Do not ask Claude Code to commit automatically unless you have reviewed the changes and intentionally want it to commit. A clean commit boundary is a checkpoint, not proof of correctness.
