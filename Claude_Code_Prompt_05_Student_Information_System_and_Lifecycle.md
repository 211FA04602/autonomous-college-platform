# Claude Code Prompt 05

## Student Information System and Lifecycle

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–04 passed, were reviewed, and were committed  
**Scope:** Authoritative student record, guardian access, lifecycle events, holds, privacy, data quality, timeline, graduation, and alumni transition

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md` completely, especially student record, lifecycle, privacy, identity, academic structure, admissions conversion, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md` completely.
3. Read all relevant ADRs, OpenAPI, data dictionary, permission catalog, RLS design, workflow/document/audit/outbox contracts, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
4. Inspect the Prompt 04 applicant-to-student conversion port and minimal onboarding adapter.
5. Inspect Git status and run existing verification. Preserve legitimate work and repair only actual regressions.

Do not re-scaffold, modify applied migrations, use destructive Git commands, or implement registration, attendance, fees, examinations, placement, hostel, transport, library, or full alumni CRM. This prompt owns the authoritative student identity/lifecycle record and exposes integration contracts for later modules.

## 1. Domain ownership and boundaries

Create or complete a bounded `student-information` module. It owns:

- student identity within the institution
- institutional identifiers and program association history
- guardian/authorized-contact relationships
- controlled demographic and background information
- student status and lifecycle history
- student documents and verification references
- correction requests
- administrative holds and their effects
- mentoring assignment reference
- graduation and alumni transition event
- authorized unified profile/timeline composition

It does not own:

- registration decisions or degree-audit calculation
- attendance calculations
- fees/balances/payments
- marks, GPA, credits, results, backlogs, or exam eligibility
- placement readiness or offers
- hostel, transport, library, discipline, or service transactions

Those values must later be consumed through owning-module APIs/read models/events. Do not add manually editable shadow fields for them.

## 2. Student person and institutional record

Implement:

- immutable student ID using the platform identifier convention
- admission/application source reference and provenance
- enrollment/admission number, university registration number, roll number and configurable institutional identifiers
- identifier type, issuer, effective dates, status, replacement/supersession and audit
- legal/display/preferred names with history and localization support
- date of birth, gender and other demographic attributes through configurable lawful reference data
- contact information and verified/unverified state
- present/permanent address with version history
- nationality, domicile, category/reservation and identity metadata only where institution policy/law requires it
- prior education records and verified references
- bank/scholarship metadata with strict field access; do not store unnecessary full account data
- disability/accommodation references and medical alerts using minimum necessary information and especially restricted access
- photo/signature/document references through Prompt 02
- institution, campus, program, regulation, cohort, current term/semester reference, section reference, entry mode, and mentor assignment history
- academic standing as an administrative status reference only; calculated progression comes later
- created/updated/source/verification metadata and optimistic version

Use field-level classification such as public-directory, institutional, restricted, highly restricted, and emergency-limited. Do not expose full student records through generic serialization.

## 3. Guardian and authorized-contact relationships

Implement:

- parent, guardian, sponsor, emergency contact, authorized representative and configurable relationship types
- relationship verification and supporting document reference where required
- legal authority/consent basis, start/end, student consent status where applicable, and institutional approval
- contact and communication preferences
- financial payer permission separate from academic-information access
- emergency-contact access separate from portal access
- granular portal permissions by data category and action
- student age/status and institution-policy effects
- multiple students linked to one guardian identity without cross-student leakage
- multiple guardians/contacts with priority and restrictions
- invitation, acceptance, suspension, revocation and expiry
- dispute/restriction/confidential-address flags with highly restricted visibility

Never grant guardian access merely because a phone number/email matches. Resolve through verified relationship plus explicit policy and identity membership. Audit every grant/revocation and sensitive profile view as policy requires.

## 4. Student lifecycle state machine

Implement explicit states and transitions appropriate to engineering colleges, including:

- onboarding pending
- enrolled/admitted
- active
- term/semester not registered as a future integration state—not owned calculation
- on approved break in study
- detained or progression restricted as an authorized external decision reference
- suspended
- transferred internally
- transferred out
- program/branch changed
- regulation migrated
- readmitted
- withdrawn
- discontinued
- deceased with especially restricted handling
- completion pending
- graduated
- alumni
- archived

Define allowed transitions, initiator permissions, workflow, required reason/evidence, effective date, approvals, downstream effects, and audit.

Requirements:

- never overwrite history
- future-dated actions activate through idempotent scheduled work
- corrections append a corrected/superseding event
- program/branch change preserves old and new association history
- regulation migration requires an approved academic mapping/reference from Prompt 03
- transfer and readmission preserve attempts and identifiers
- break in study has dates, reason category, conditions, expected return, reminders and return/review workflow
- withdrawal/discontinuation separates request, approval, effective status, document/fee/service clearance references and final outcome
- suspension and sensitive reasons use restricted fields
- deceased-student handling minimizes notifications, access, and display according to policy
- graduation requires an external degree-eligibility confirmation contract; do not calculate eligibility here
- alumni transition preserves record history and changes access/retention by policy

## 5. Applicant conversion integration

Replace or evolve Prompt 04's minimal student-onboarding adapter with the authoritative implementation.

Requirements:

- consume admitted-applicant conversion idempotently
- exactly one student for one admitted application unless an explicit corrected/reopened conversion policy applies
- link source applicant/application/admission/cycle/program/regulation/cohort and provenance
- link approved documents rather than duplicating binaries where policy permits
- create correct student membership/role through Prompt 01 without broad privilege
- allocate institutional identifiers using concurrency-safe, versioned configurable formats
- initialize onboarding checklist and status
- emit student-created/onboarding events through transactional outbox
- recover safely after failure/retry
- reconcile Prompt 04 conversion status
- preserve the original application snapshot

Document transaction/event consistency and compensation. Do not use distributed transactions.

## 6. Student corrections and verification

Implement student/staff correction workflows for classified fields:

- student proposes current value, requested value, reason and evidence
- system determines required verifier/approver by field classification
- compare and preview downstream impact
- low-risk contact corrections may follow verified self-service policy
- identity, name, DOB, category, program/regulation and institutional identifiers require stricter workflow
- accepted correction creates a new value version and preserves the prior value/history
- rejected/returned/withdrawn states
- no direct edit of governed fields after initial verification
- downstream correction events include only minimum necessary data
- corrected official documents are handled by later document-issuance workflows

## 7. Holds and restrictions

Implement configurable holds:

- hold type and owning module/authority
- student, tenant/institution/campus scope
- reason category and restricted notes
- start, end/expiry, status and priority
- effects: block/warn for future registration, hall ticket, result release, document/certificate, graduation, hostel/transport/library/service, or configurable action
- financial, academic, disciplinary, document, library, hostel, transport and administrative owner types as future integrations
- manual or event-driven placement/release
- evidence/document references
- release conditions and approval
- appeal/review workflow where configured
- temporary override with scope, expiry, reason and SoD approval
- history and audit

The student module owns the hold registry and effect-evaluation interface, but each owning module remains authoritative for creating/releasing its holds. Do not let ordinary staff create arbitrary holds outside permission/scope.

Every later protected action can query a stable hold-decision API returning allow, warn or block with safe reason and source reference. Do not disclose confidential hold details to the student when policy prohibits them; still provide an appropriate contact/action message.

## 8. Mentoring assignment foundation

Implement mentor/adviser assignment references:

- primary and secondary mentor
- effective dates
- assignment scope: student, group/cohort/section where provided later
- reason/source and workload reference
- reassignment history
- student visibility and contact policy
- no private mentor case notes yet; later modules will own interventions

Ensure faculty identity is referenced through a provider port because full HR/faculty records come later.

## 9. Unified student timeline and 360 profile

Implement an authorized composition/read-model layer that shows:

- student lifecycle events
- identifier/program/regulation/section/mentor history
- corrections and verification milestones
- holds and safe effects
- onboarding and document status
- future domain-event summary extension points

Requirements:

- source module and event/reference
- no copying of complete external domain records
- role- and field-level redaction
- chronological pagination
- tenant and student scope
- sensitive-event visibility policy
- eventual-consistency timestamp/status where sourced asynchronously
- rebuild/replay procedure
- no confidential data in search indexes or generic analytics

## 10. Data quality and duplicate review

Implement:

- required-field completeness by student status/program/cycle
- invalid/stale/unverified document/contact/identifier checks
- duplicate-person/student indicators using approved normalized fields
- inconsistent program/regulation/cohort references
- orphan/missing identity membership
- expired guardian authority/consent
- conflicting active identifiers or program associations
- unresolved onboarding/conversion issues
- dashboard, assigned remediation tasks and resolution history

Duplicate detection creates a case for authorized review. Never automatically merge student records. Merge/link/correction requires preview, field/source conflicts, downstream dependency checks, approval, irreversible-risk warning, audit and a documented safe strategy. Prefer link/supersession over destructive merge.

## 11. Imports and bulk actions

Support staged imports for legacy students, identifiers, guardians, prior education, program associations, documents metadata and lifecycle history.

Use Prompt 02 document/quarantine, staging, schema version, mapping, validation, preview, errors, approval, idempotency, reconciliation and audit. Do not insert directly into authoritative tables.

Bulk operations such as section placeholder assignment, mentor assignment, status review, contact verification request and data-quality remediation require bounded selection, preview, reason, permission, idempotency, partial-failure reporting and audit. Program/regulation lifecycle changes remain individual governed actions unless a safe approved batch workflow exists.

## 12. Search, APIs and events

Add versioned OpenAPI endpoints for:

- governed paginated student search
- authorized student 360 summary and timeline
- student profile sections with field-level redaction
- identifier and association history
- guardian/contact relationship request, invitation, acceptance, permissions, suspension/revocation
- correction request, evidence, review and decision
- lifecycle action request, approval, activation and history
- break/readmission/transfer/program-change/regulation-migration/withdrawal/discontinuation/graduation/alumni actions
- holds list, safe student view, create/release/override/evaluate by authorized owner
- mentor assignment/history
- onboarding/conversion status and recovery
- data-quality issues, assignment and resolution
- imports, bulk jobs and governed exports
- current student self-service profile

Use explicit DTOs, stable RFC 7807 errors, optimistic versions, idempotency keys, correlation IDs, bounded pagination, field masks/classification, and tenant/scope authorization. No JPA entities in APIs.

Publish minimal versioned outbox events for student created, association changed, lifecycle changed, guardian access changed, correction approved, hold placed/released/overridden, mentor changed, graduated and alumni transitioned. Do not put full PII in events.

## 13. Permission model

Add stable permissions for:

- student directory/profile view by field class
- create/onboard
- identifier manage
- guardian/contact manage and approve
- correction request/review/approve
- lifecycle request/review/approve/activate
- program/regulation migration
- transfer/readmission/withdrawal/discontinuation
- sensitive status view
- hold create/release/override/view-confidential/evaluate
- mentor assign
- data-quality review/resolve
- import/bulk/export
- student self-service
- guardian authorized self-service

Scope by tenant, institution, campus, department/program/cohort/section when available, assigned student/mentor, and field classification. Enforce SoD for sensitive lifecycle, hold override, record merge/link and identity correction.

## 14. React web interfaces

Implement accessible responsive interfaces for:

- student directory with safe filters and governed exports
- role-aware 360 profile and chronological timeline
- demographic/contact/education/identifier/program/document sections
- field-level verification and history
- guardian/contact relationship and granular access management
- correction request/review/approval
- lifecycle action workspace and history
- transfer, break, readmission, branch/program change, regulation migration, withdrawal, discontinuation, graduation and alumni flows
- hold registry, safe effect preview, release/override workflow
- mentor assignment
- onboarding/conversion exception queue
- data-quality dashboard, duplicate-review case and remediation
- staged import preview/errors/reconciliation
- student self-service profile and correction experience

Use accessible forms/tables/dialogs, sensitive-field masking, reasoned confirmations, optimistic conflict UX, localization and no color-only status.

## 15. React Native Android/iOS interfaces

Implement real mobile interfaces using actual APIs.

### Student

- home/profile summary and institutional identifiers
- personal/contact/prior-education/program/regulation/cohort/mentor information according to policy
- secure document status/preview where allowed
- request contact/profile correction, upload evidence, track status
- view lifecycle status and safe history
- request break/withdrawal or other institution-enabled actions and track workflow
- view safe hold effects and next action/contact
- manage sessions and guardian invitations/permissions where policy permits
- onboarding checklist and missing-data tasks

### Parent/Guardian/Authorized Contact

- invitation acceptance and identity verification
- select linked student without cross-student leakage
- view only explicitly authorized profile/status categories
- manage contact/preferences and relationship verification tasks
- no access based solely on shared phone/email

### Faculty/Mentor/Counselor

- assigned student roster
- authorized student summary, contact and safe timeline
- onboarding/data-quality tasks
- mentor assignment acknowledgement and student contact
- no broad sensitive medical/category/disciplinary/bank access

### Admissions/Student Services/Department/HOD/Dean/Principal

- student search and role-redacted 360 view
- correction/lifecycle/guardian/hold/mentor work queues
- review, return, approve/reject where authorized
- step-up and confirmed server receipt for high-risk actions
- bulk imports/exports and complex merge remain web-first

### Medical/Emergency authorized role

- minimum necessary emergency alert/contact information only, with reason/context and access audit
- no general academic/financial access from this permission

### Tenant/Platform support

- conversion/data-quality/integration health and time-bound support workflow
- no implicit student-record access

Mobile security/offline:

- encrypted cache allowlist for student's own non-highly-restricted profile, identifiers, mentor/contact and onboarding status
- guardian cache partitioned by linked student and permission
- highly restricted medical/bank/category/hold notes are online-only unless explicit emergency policy provides a protected minimum dataset
- purge on logout, membership/relationship loss, tenant switch or device revocation
- push/deep links reauthorize at open
- lifecycle approvals, hold actions, guardian grants and identity corrections require online confirmed server success
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` honestly

## 16. Database and RLS

Add forward-only Flyway migrations for:

- student/person institutional record
- names/contact/address/prior education versions
- institutional identifiers/history
- program/regulation/cohort/section association history
- guardian/contact relationships, permissions, consent/authority, invitation/status
- classified attributes/medical alert references using a defensible normalized/encrypted design
- student document links/verification references
- correction requests/field changes/evidence/decisions
- lifecycle events and scheduled activations
- holds/effects/overrides/history
- mentor assignments
- onboarding/conversion reconciliation
- timeline read model/projection checkpoint
- data-quality and duplicate-review cases
- import staging/error/reconciliation jobs

Every tenant-owned table must have tenant ID, applicable institutional/student scope, repository predicates, PostgreSQL RLS, constraints, indexes, optimistic versions and non-destructive history. Applicant/student/guardian self-service policies must restrict exact authorized records and fields.

## 17. Testing requirements

Domain:

- every lifecycle transition/invariant
- future activation and correction history
- program/regulation migration references
- identifier uniqueness/versioning
- guardian relationship/permission/expiry
- field privacy and correction workflow
- hold allow/warn/block, override and expiry
- onboarding exactly-once/recovery
- graduation/alumni external eligibility contract
- duplicate case without automatic merge

PostgreSQL/Testcontainers:

- clean migration
- RLS for tenant, student self-service, guardian, mentor, department and restricted roles
- cross-tenant/cross-student IDOR denial
- concurrent identifiers, guardian invitations, conversions, lifecycle actions and holds
- no cascading deletion of history

API/security:

- field-level redaction and export controls
- forged guardian relationship
- stale/revoked relationship or membership
- unauthorized sensitive-field/emergency access
- role/scope/SoD and step-up
- stable errors/pagination/idempotency

Web/mobile:

- accessible 360 profile, correction, lifecycle, guardian and hold flows
- student and guardian self-service
- mentor/staff review
- Android/iOS critical paths for each role group
- offline cache allowlist/purge
- unauthorized deep links
- sensitive data absent from logs/crash/notifications

Performance:

- paginated directory/timeline and representative concurrent self-service
- projection rebuild and outbox duplicate handling

Do not mark skipped tests or unavailable iOS/macOS execution as passed.

## 18. Documentation and completion gate

Update OpenAPI/generated clients, ERD/data dictionary, lifecycle diagrams, field-classification/access matrix, guardian-consent model, hold contract, onboarding consistency ADR, event schemas, privacy/threat model, import/migration guide, merge/link safety procedure, operations runbooks, web/mobile user guides and mobile role matrix.

Run and report the full backend, Flyway, RLS, API, web, Android and environment-valid iOS suites plus security/contract checks.

The gate passes only when:

1. Prompt 04 conversion creates exactly one authoritative student and reconciles safely.
2. Student identifiers, associations and classified profile data are versioned and governed.
3. Every lifecycle action preserves history and enforces workflow/authorization.
4. Guardian access requires verified relationship and granular permission.
5. Corrections preserve original values and require appropriate review.
6. Holds return explainable allow/warn/block decisions and controlled overrides.
7. The 360 timeline is role-redacted and tenant safe.
8. No manually editable shadow GPA, attendance, balance, exam or placement values exist.
9. Web has full administration and self-service.
10. Every relevant role has real Android/iOS interfaces with safe offline policy.
11. Every new table has application predicates, RLS and negative tests.
12. Prompt 02 services are reused and all available checks pass.

Provide this report:

1. Summary
2. Files changed
3. Migrations
4. APIs/events
5. Student/profile/lifecycle/guardian/hold capabilities
6. Admissions conversion integration
7. Web interfaces
8. Android interfaces/test status
9. iOS interfaces/test status
10. Privacy, security, tenancy, audit and idempotency
11. Tests and exact results
12. Commands and exit status
13. Documentation/ADRs/runbooks
14. Limitations/environment gaps/deferred items
15. Manual verification
16. Suggested commit message
17. `Completion gate: PASSED` or `Completion gate: FAILED`

Suggested commit message:

`feat(student): implement authoritative student information and lifecycle`

Stop. Do not begin Prompt 06 or implement course registration and degree audit.
```

---

## Review Checklist Before Prompt 06

- Applicant conversion creates one authoritative student idempotently.
- Student data, identifiers and academic associations preserve history.
- Lifecycle transitions are explicit, approved and audited.
- Guardian access is verified and granular.
- Sensitive fields have strict access and safe mobile caching.
- Holds expose governed effects without duplicating owning-domain data.
- No GPA, attendance, fee, examination or placement shadow fields exist.
- Web and relevant mobile-role interfaces use real APIs.
- All new tables have RLS and cross-tenant/cross-student tests.
- Existing platform services are reused.
- The completion gate passed and changes were reviewed.

Do not continue to Prompt 06 until these conditions pass.

