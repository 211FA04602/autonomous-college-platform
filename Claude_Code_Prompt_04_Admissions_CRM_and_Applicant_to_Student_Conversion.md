# Claude Code Prompt 04

## Admissions CRM and Applicant-to-Student Conversion

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–03 passed, were reviewed, and were committed  
**Scope:** Enquiry, application, eligibility, document verification, selection, offer, admission, and atomic student conversion

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md` completely, especially admissions, student lifecycle, finance integration, identity, documents, communication, analytics, portals, and mobile-role requirements.
2. Read `docs/engineering/CONSTITUTION.md` completely.
3. Read all ADRs, OpenAPI, permission catalog, data dictionary, workflow/document/audit/outbox contracts, academic structure, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
4. Inspect Git status and the current implementation.
5. Run the existing verification suite. Repair only genuine regressions before beginning this scope.

Preserve established architecture and legitimate work. Never modify applied Flyway migrations or use destructive Git commands.

Implement a production-grade `admissions` domain. Do not implement the full Student Information System, course registration, timetable, attendance, examinations, or full finance module. Applicant-to-student conversion must publish a stable student-onboarding contract/event for Prompt 05 without inventing Prompt 05's complete student model.

## 1. Admissions configuration

Implement tenant-, institution-, campus-, academic-year-, and program-scoped configuration for:

- admission cycle and lifecycle
- available programs, entry modes, approved intake, admission categories/quotas, and application windows
- application form versions and sections
- required/conditional fields and documents
- eligibility-rule versions
- entrance examination/qualifying score types
- selection stages
- seat matrix and reservation/category dimensions
- application, processing, admission, and initial fee references
- offer validity and acceptance rules
- cancellation, withdrawal, deferral, no-show, and refund policy references
- communication templates and SLA/escalation references
- counselor/team assignments and access scopes

Configuration requirements:

- draft, review, approved, active, closed, archived lifecycle
- active versions are immutable
- changes create a new version/effective period
- typed, validated rules only; no arbitrary code, SQL, JavaScript, SpEL, or eval
- preview/simulation using synthetic applicants
- no overlapping contradictory active cycles for the same scope
- full workflow, audit, document, and outbox integration

## 2. Enquiry CRM

Implement:

- enquiry capture from public website, walk-in, phone, event, campaign, referral, import, and authorized API
- source, campaign, medium, program interest, campus preference, entry mode, academic year
- prospect/applicant contact details, consent, communication preferences, and preferred language
- guardian/contact person where applicable
- counselor/team assignment with scope and workload visibility
- enquiry stages: new, attempted, contacted, qualified, nurturing, application started, applied, not interested, invalid/duplicate, closed
- follow-up tasks, due dates, outcome, notes, reminders, escalation, and next action
- appointment/campus-visit scheduling reference
- communication history from the notification platform
- conversion to application without re-entry
- duplicate-candidate signals using normalized email/phone/identity references
- duplicate detection creates a review case; never automatically merge people
- merge/link operation requires permission, reason, preview, conflict handling, approval where configured, and audit
- unsubscribe/consent withdrawal enforcement

Protect prospect data by purpose, retention, consent, and role scope. Avoid collecting sensitive category/identity data at enquiry stage unless required and legally justified.

## 3. Applicant identity and account

Implement:

- applicant account linked to trusted OIDC identity where applicable
- application-specific contact verification
- applicant may submit to more than one authorized program/campus without duplicate identity records
- applicant and guardian/delegate relationships with explicit permissions
- invitation/recovery flows through the established identity provider—not custom password storage
- draft application ownership and server-side access checks
- assisted application mode for admissions staff, visibly attributed and audited
- applicant consent, privacy notice version, terms acknowledgement, and communication choices

Do not convert an applicant into a normal tenant member with broad access. Use a limited applicant access context with exact application scope.

## 4. Versioned application forms

Implement a safe form-definition model supporting:

- sections, fields, labels, help text, localization keys, order
- types: text, number, date, select, multi-select, radio, checkbox, address, education record, score, declaration, and document reference
- required/optional/conditional visibility and validation
- typed allowed values and reference-data sources
- repeatable prior-education and examination records
- applicant and staff-only fields
- sensitive-field classification and field-level access
- draft autosave, completion status, validation summary, submit and correction/resubmission
- immutable submitted snapshot tied to the exact form/config version

Never permit user-authored executable validation code or unsafe HTML. Sanitize rich text and maintain accessible labels/instructions.

## 5. Application lifecycle

Support explicit states such as:

- draft
- submitted
- payment pending
- under preliminary review
- correction requested
- resubmitted
- document verification
- eligibility review
- eligible/ineligible
- selection pending
- waitlisted
- offered
- offer accepted/declined/expired
- admission verification
- admission fee pending
- admitted
- deferred
- cancelled
- withdrawn
- no-show
- rejected
- conversion pending/converted

Use an explicit state machine and Prompt 02 workflow. State transitions must be authorized, reasoned where required, idempotent, optimistic-lock protected, audited, and emit outbox events.

Submitted application data cannot be silently overwritten. Corrections create versioned submissions/field corrections with applicant and reviewer history.

## 6. Document collection and verification

Use Prompt 02's document service. Implement:

- requirements by cycle/program/category/entry mode and conditional rules
- document types such as photo, signature, identity, address, marks memo, transfer/migration, entrance score, category/reservation, income, disability/accommodation, and configurable types
- applicant upload, camera capture, resubmission, expiry and status
- malware/quarantine status before reviewer access
- verification queue and assignment
- statuses: pending, accepted, rejected, correction required, expired, waived with authority
- rejection/correction reason codes, comments, and notification
- two-person verification for configured sensitive/critical types
- document-number metadata with field encryption/tokenization where justified
- duplicate-document/fraud signals as human review indicators—not automatic rejection
- controlled preview/download and complete access audit
- retention and deletion policy for unsuccessful applicants

Mobile temporary files must be encrypted and deleted after upload/logout/tenant switch. Never expose documents in push notifications or analytics.

## 7. Eligibility engine

Implement typed, versioned, explainable eligibility rules for:

- qualifying program/board/university
- qualifying marks/percentage/CGPA and subject requirements
- entrance examination type, score/rank, and validity
- entry mode
- program/campus/category/quota
- age/date rules only when institution policy requires them
- document completion/verification requirements
- other institution-configured lawful criteria

Requirements:

- server-authoritative calculation
- input snapshot, rule version, result, failed/passed rules, explanation, warnings, evaluator/engine version, and time
- simulation before activation
- manual exception/recommendation through workflow; never overwrite the automated decision
- ineligible decisions require reason and authorized review
- avoid discriminatory proxy features and document rule purpose/owner
- no AI decisioning in admission eligibility

## 8. Seat matrix, merit, and selection

Implement:

- approved seat matrix by program, campus, entry mode, category/quota, and cycle
- versioning and controlled amendment
- available, reserved, offered, accepted, admitted, cancelled, and released counts
- concurrency-safe reservation/allocation
- configurable merit inputs, normalization reference, tie-break ordering, and category rules
- deterministic merit-list generation with rule/input/version snapshot
- preview and anomaly reports before approval
- waitlist and movement rounds
- manual/special allocation only through explicit authorized workflow with reason
- no over-allocation except a separately authorized, visible policy
- selection-list version, approval, publication scope, and audit
- withdrawal/expiry/cancellation releases the seat safely and triggers configured waitlist processing

Do not hard-code a single state's admission policy. Do not allow arbitrary executable formulas.

## 9. Offer and admission

Implement:

- versioned offer templates
- offer program/campus/category/entry mode, conditions, fee request, deadline, documents, and instructions
- secure applicant acceptance/decline
- offer expiry and authorized extension
- waitlist-to-offer conversion
- admission verification checklist
- initial fee request through a finance/payment port
- deterministic local/test payment adapter only if Prompt 11 is not available; clearly isolate it and prevent production activation
- payment status, webhook/idempotency interface, receipt reference, and failure/retry states
- cancellation, withdrawal, deferral, no-show, and refund-request handoff
- admitted status only after configured conditions pass
- admission confirmation document through Prompt 02 document/template boundary

Never store card data. Do not build a shadow fee ledger; maintain an explicit integration contract that Prompt 11 will later replace/implement.

## 10. Atomic applicant-to-student conversion

Implement an idempotent conversion orchestration that:

- validates admitted state and all configured prerequisites
- creates a stable student/person onboarding request through an explicit port owned by the future Student Information System
- for this prompt, implement the smallest real `student-onboarding` receiving adapter/model necessary to prove atomic/idempotent conversion without building the full SIS
- preserves applicant ID, application ID, admission cycle, institution/campus, program, entry mode, regulation/cohort reference, category/quota as authorized, and source provenance
- creates or links the tenant membership appropriate for an admitted student without broad permissions
- allocates enrollment/application identifiers through concurrency-safe configurable sequences
- triggers onboarding checklist, ID-card request, institutional-email provisioning event, and welcome communication events
- links rather than copies governed documents when retention/access policy allows
- records conversion status, result IDs, retries, failures, compensation/recovery, and audit
- cannot create two students from the same admitted application
- can resume safely after process interruption
- does not delete or mutate the original applicant/application snapshot

If true atomicity cannot span modules, use a local transaction plus transactional outbox and idempotent receiving consumer. Document the consistency model. Do not use an unsafe distributed transaction.

## 11. Imports and bulk operations

Support controlled imports for:

- enquiries
- legacy applications
- entrance scores/ranks
- document-verification metadata where legally appropriate
- selection/seat data

Use staging, schema versions, quarantine/document validation, row and cross-row errors, preview, approval, idempotency, reconciliation, and audit. No direct CSV/XLSX load into authoritative tables. Formula cells are data, never executed.

Bulk status or counselor changes require preview, bounded scope, authorization, reason, partial-failure reporting, idempotency, and audit.

## 12. Analytics

Provide authorized operational read models and dashboards for:

- enquiry/application/admission funnel
- source/campaign/counselor conversion
- program/campus demand
- application completion/drop-off
- pending correction/document/eligibility queues and SLA
- eligibility outcomes and reason distribution
- seat fill, offers, acceptances, waitlists, cancellations, and vacancies
- category/quota summaries where authorized
- fee pending/paid integration status
- conversion errors and onboarding status
- communication delivery

Metrics must use governed definitions, role/field authorization, suppression where small counts could expose sensitive categories, and drill-down only to authorized records.

## 13. Backend APIs

Add versioned OpenAPI endpoints for:

- cycle/config/form/document-requirement/rule/seat-matrix administration
- public institution/program/cycle discovery with explicit public fields only
- enquiry create/update/assign/follow-up/close/convert
- applicant identity/context and application draft/autosave/validate/submit
- application correction/resubmission/status/timeline
- document requirement/upload/status/resubmit
- reviewer queues, document verification, eligibility evaluate/review/exception
- merit simulation/generation/approval/publication
- waitlist/round/allocation
- offer issue/view/accept/decline/extend/expire
- admission checklist/payment status/confirm/cancel/withdraw/defer/no-show
- applicant-to-student conversion/status/retry by authorized operator
- imports, bulk actions, dashboards, and exports

Requirements:

- explicit DTOs, no JPA entity exposure
- tenant and applicant-scope authorization
- field-level redaction
- RFC 7807 stable errors
- pagination and bounded filtering
- optimistic versions and idempotency keys
- rate limits for public/enquiry/application/upload/status endpoints
- bot/abuse-control integration boundary without making inaccessible CAPTCHAs mandatory
- correlation IDs, audit, and outbox events

## 14. Permission model

Add stable permissions for:

- admission configuration/form/rules/seat matrix
- enquiry/counselor operations
- application view/review/correction
- sensitive field/document verification
- eligibility evaluate/review/override
- merit generate/review/approve/publish
- seat allocate/release
- offer issue/extend/cancel
- admission approve/cancel/defer
- conversion execute/retry
- imports/bulk operations/exports/analytics
- applicant and guardian self-service

Scope permissions by tenant, institution, campus, program, cycle, counselor team, assigned application, and field/document classification. Enforce SoD for configured high-risk eligibility, merit, allocation, and admission decisions.

## 15. React web interfaces

Implement accessible production interfaces for:

- tenant-branded public program/admission landing and application entry
- applicant account, application wizard, autosave, completion, document upload, payment handoff, submit, correction, status, offer and acceptance
- admissions dashboard and funnel
- enquiry pipeline and counselor work queue
- cycle, application form, document requirement, eligibility-rule, workflow, seat-matrix, and offer configuration
- application 360 review with field-level redaction
- document verification workbench
- eligibility explanation and exception workflow
- merit simulation, validation, approval, list versioning, and publication
- seat/waitlist rounds and allocation
- offer/admission checklist and conversion operations
- import preview/errors/reconciliation
- analytics and governed exports

Meet WCAG 2.2 AA targets, keyboard support, mobile-responsive public application, localization readiness, unsaved-draft recovery, clear errors, and no color-only status.

## 16. React Native Android/iOS interfaces

Implement real role interfaces using actual APIs.

### Applicant

- discover permitted cycles/programs
- verify/sign in
- create and autosave applications
- scan/upload documents with progress and quarantine status
- receive correction requests and resubmit
- view eligibility/status/timeline
- payment-provider handoff and return status
- view/accept/decline offer
- admission checklist, confirmation, onboarding status and notifications
- encrypted drafts and retry-safe uploads

### Guardian/delegate

- only explicitly delegated application assistance, acknowledgement, document, or payment capabilities
- applicant controls relationship where policy permits
- no broad access based only on matching phone number

### Admissions counselor/team

- enquiry capture, search, assignment, follow-up, outcome and appointment
- applicant lookup, completion status, correction/contact tasks, offer/admission status, onboarding checklist
- document camera capture only in assisted mode with attribution/consent
- merit generation, seat-matrix configuration, mass allocation, and bulk exports remain web-first

### Document verifier/eligibility reviewer

- assigned queue, secure preview, accept/reject/correction, reason, checklist, eligibility explanation, exception recommendation
- sensitive actions require online state and step-up where configured

### Admissions leadership/Principal/Management

- funnel, seat fill, pending SLA, offer/admission/conversion KPIs
- approval inbox for configurations, eligibility exceptions, merit versions, allocation exceptions, offers, and admission decisions
- online server-confirmed approvals

### Finance

- application/admission payment status and exception visibility only; full finance mobile comes later

### Tenant/platform support

- cycle health, provider/integration errors, upload/scanner queues, conversion failures, and time-bound support workflow
- no implicit applicant-data access

Mobile security:

- tenant/applicant scope enforcement
- secure token/temp file storage
- purge on logout/context loss
- no sensitive data in notifications/screenshots/logs/analytics
- push/deep links reauthorize at open
- queued offline drafts/follow-ups are allowed where policy permits
- eligibility, verification, offer acceptance, payments, admission approval, and conversion require confirmed server receipts
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` honestly

## 17. Database and RLS

Add forward-only Flyway migrations for:

- admission cycles/config versions
- application forms/sections/fields/options/rules
- document requirements
- enquiry/source/campaign/assignment/follow-up/consent
- applicant identity/contact/delegation
- application and immutable submission/correction versions
- education/score records
- document verification records
- eligibility rule/version/evaluation/exceptions
- seat matrix/version/reservations/allocations/releases
- merit run/version/entries/tie-break evidence
- waitlist/round/movement
- offer/version/acceptance/expiry
- admission checklist/status
- payment request/reference state
- conversion orchestration/idempotency/result
- import staging/errors/reconciliation

Every tenant-owned table requires tenant ID, appropriate institution/campus/program/cycle scope, repository predicates, PostgreSQL RLS, constraints, indexes, optimistic version, and lifecycle history. Applicant self-service policies must restrict rows to the authenticated applicant's authorized applications.

## 18. Testing requirements

Domain/unit:

- configuration and application state machines
- form conditional validation and immutable submission
- eligibility matrix and explanation
- merit/tie-break determinism
- seat-capacity concurrency and release
- offer expiry/acceptance races
- conversion idempotency/recovery
- consent/delegation and duplicate-review behavior

PostgreSQL/Testcontainers:

- clean migration
- RLS for staff tenant/program/cycle scopes and applicant-owned rows
- cross-tenant/applicant IDOR denial
- concurrent seat/offer/conversion cases
- uniqueness/index/invariant checks

Documents/import/payments:

- quarantined document unavailable
- upload substitution/oversize/type failure
- verification/resubmission/version history
- import retry/reconciliation
- duplicate webhook/payment return interface
- test adapter cannot activate in production

Web/mobile:

- accessible application wizard
- document correction/resubmission
- counselor pipeline
- eligibility/merit/allocation/offer/admission/conversion journeys
- Android/iOS applicant, counselor, verifier, leadership critical paths
- offline draft/upload recovery
- deep-link authorization
- guardian/delegate restrictions
- tenant switch/cache purge

Security/performance:

- public endpoint rate limits/abuse cases
- identity enumeration resistance
- field/document redaction
- large application/search/queue pagination
- representative concurrent applicants and seat allocation

Never report skipped tests or unavailable iOS/macOS evidence as passed.

## 19. Documentation and runbooks

Update or create:

- OpenAPI/generated clients
- admissions ERD/data dictionary/glossary
- lifecycle state diagrams
- form/rule/seat/merit versioning specifications
- applicant access and delegation threat model
- consent/retention/field-classification matrix
- payment integration contract
- applicant-to-student conversion and consistency ADR
- admission configuration guide
- counselor/verifier/admissions-admin/applicant guides
- import/reconciliation, seat allocation, offer expiry, conversion recovery, scanner outage, and payment callback runbooks
- mobile role-feature matrix

## 20. Required verification and completion gate

Run the full backend, Flyway, RLS, web, mobile, API contract, security, and environment-available Android/iOS suites. Report exact commands and results. Fix failures in scope.

The gate passes only when:

1. A tenant can configure and approve an admission cycle, versioned form, eligibility rules, documents, seat matrix, and offer policy.
2. An enquiry can convert to an application without re-entry or duplicate identity.
3. An applicant can draft, upload, pay through the safe integration, submit, correct, and track an application.
4. Submitted snapshots and verified document histories are immutable.
5. Eligibility is reproducible and explainable using the exact rule/input version.
6. Merit and tie breaks are deterministic, reviewed, versioned, and audited.
7. Concurrent seat offers/acceptances cannot exceed capacity.
8. Offer, waitlist, cancellation, withdrawal, deferral, no-show, and seat release behave correctly.
9. Applicant-to-student conversion is idempotent, recoverable, and creates exactly one onboarding result.
10. Web provides complete admissions administration.
11. Applicant, guardian/delegate, counselor, verifier, leadership, finance-status, and support roles have appropriate Android/iOS interfaces.
12. Sensitive mobile actions require confirmed server success.
13. Every new table has RLS and negative cross-tenant/applicant tests.
14. Prompt 02 audit/workflow/document/outbox services are reused.
15. Documentation matches implementation and all available checks pass.

Provide this completion report:

1. Summary
2. Files changed
3. Migrations
4. APIs
5. Admissions configuration and CRM
6. Application/document/eligibility/selection capabilities
7. Offer/admission/conversion capabilities
8. Web interfaces
9. Android interfaces/test status
10. iOS interfaces/test status
11. Security, privacy, tenancy, audit, workflow and idempotency
12. Tests and exact results
13. Commands and exit status
14. Documentation/ADRs/runbooks
15. Limitations/environment gaps/deferred items
16. Manual verification
17. Suggested commit message
18. `Completion gate: PASSED` or `Completion gate: FAILED`

Suggested commit message:

`feat(admissions): implement CRM applications selection and student conversion`

Stop. Do not begin Prompt 05 or expand the minimal onboarding adapter into the full Student Information System.
```

---

## Review Checklist Before Prompt 05

- Admission configuration and rules are versioned, typed, approved, and tenant-scoped.
- Submitted applications and document histories cannot be silently overwritten.
- Eligibility and merit decisions are reproducible and explainable.
- Seat capacity is concurrency-safe.
- Applicant-to-student conversion is exactly-once from a business perspective.
- Payment integration is real at the boundary and does not store card data.
- Applicant and staff field/document permissions are separated.
- Applicant, guardian, counselor, verifier, leadership, and support mobile interfaces are implemented appropriately.
- All new tables have application predicates, RLS, and negative tests.
- Existing audit, workflow, document, notification, and outbox services are reused.
- No full SIS or later module was prematurely implemented.
- The gate passed and changes were manually reviewed.

Do not continue to Prompt 05 until these conditions pass.

