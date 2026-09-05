# Claude Code Prompt 03

## Academic Structure, Regulations, Curriculum, and Boards of Studies

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–02 passed, were reviewed, and were committed  
**Scope:** College-native academic master data, autonomous regulations, curriculum governance, outcomes, and Boards of Studies

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md` completely, especially organization, academic structure, curriculum, governance, OBE, examination-rule references, portals, and mobile-role requirements.
2. Read `docs/engineering/CONSTITUTION.md` completely.
3. Read all relevant ADRs and documentation from Prompts 00–02.
4. Read OpenAPI, the current data dictionary, tenant/RLS model, permission catalog, workflow/document/audit/outbox contracts, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Inspect Git status and preserve all legitimate existing changes.
6. Run the current verification suite. If an established gate is broken, document and repair only the regression necessary to restore it before implementing this prompt.

Do not re-scaffold, rewrite established architecture, modify an applied Flyway migration, use destructive Git commands, or begin admissions, student registration, timetable, attendance, examinations, fees, OBE attainment calculation, or LMS delivery. This prompt establishes the governed academic definitions those later modules will consume.

## 1. College-native academic model

Implement a bounded `academic-structure` or appropriately named domain module following the modular-monolith conventions.

### Awards and programs

Support:

- award/degree types such as B.Tech, B.E., M.Tech, M.E., MCA, MBA, diploma, certificate, honors, and minor without hard-coding those as the only values
- program code, title, short title, academic level, owning department, awarding institution, affiliating university where applicable
- autonomous, affiliated, deemed-university, or configurable governance model
- normal duration, maximum completion duration, semester/term pattern, entry modes, exit awards, and status
- approved intake by academic year, admission category metadata reference, and campus availability
- program version/effective dates when structure changes
- program lifecycle: draft, review, approved, active, suspended, discontinued, archived
- no hard delete after use or approval

### Cohort and regulation applicability

Model cohort/batch applicability without creating student records yet:

- admission academic year
- entry mode such as regular, lateral, transfer, or other configured modes
- program and campus
- assigned regulation/scheme version
- effective start and expected completion
- migration policy reference
- uniqueness and overlap rules

Do not create actual student cohorts populated with students; establish the governed academic cohort definition/reference.

### Academic calendar structure

Support:

- academic year
- term type and sequence: semester, trimester, quarter, annual, summer, or configured term
- instructional start/end
- registration, add/drop, withdrawal, internal assessment, end-semester examination, result, supplementary, vacation, and other governed windows
- holidays and non-instructional days as calendar references
- institution and campus time zone
- lifecycle: draft, approved, published, amended, closed
- versioned amendments with reason and audit

Do not implement individual timetable sessions in this prompt.

## 2. Regulations and schemes

Implement regulation/scheme management as a high-governance domain.

A regulation version must include or reference:

- unique regulation code and version
- title and description
- owning institution and applicable programs/campuses/entry modes/admission years
- effective dates
- minimum and maximum program credits
- term credit minimum/maximum rules
- course-category credit requirements
- attendance and condonation policy references
- examination component/pass policy references
- grading scale and GPA precision/rounding policy references
- promotion/progression rules
- backlog/repeat/improvement policy references
- honors/minor eligibility and completion rules
- mandatory non-credit/audit course completion rules
- internship/project requirements
- maximum completion duration
- degree classification and award rules
- transfer/equivalence/migration policy references
- source documents and approval records

Requirements:

- regulation lifecycle: draft, under review, returned, approved, published, superseded, retired
- draft versions can be edited only by authorized roles
- approved/published versions are immutable
- amendments create a new version or governed amendment linked to the original; never silently rewrite history
- prevent overlapping contradictory applicability for the same program/cohort unless an explicit priority/migration decision exists
- every later calculation can identify the exact regulation version
- rules are represented with typed validated data and controlled operators—not arbitrary JavaScript, SQL, SpEL, scripts, or executable expressions
- implement human-readable rule explanation/preview
- provide a simulation/validation boundary using synthetic academic scenarios; do not calculate student results yet

Define schemas/interfaces for future attendance, examination, result, registration, and degree-audit rules while implementing only academic configuration ownership in this prompt. Avoid speculative over-generalization.

## 3. Course catalog

Implement reusable course definitions with:

- tenant/institution owner
- course code and version
- title, short title, description
- owning/servicing department
- academic level
- course category
- credits
- lecture-tutorial-practical/project/contact-hour structure
- total expected learning hours where configured
- course delivery/evaluation modes
- status and effective dates
- repeatability and maximum count where appropriate
- syllabus units/modules with sequence, title, detail, planned hours, and outcome references
- laboratory experiment list where applicable
- textbooks, references, standards, links, and licensed-resource references
- prerequisites, co-requisites, anti-requisites
- equivalence/substitution relationships
- course ownership/licensing metadata
- version history and source/approval documents

Validation:

- credits and L-T-P/contact-hour values use exact decimal/integer types and institution-configured constraints
- no circular prerequisite relationships
- no self-equivalence, self-prerequisite, or contradictory relationship
- relationship graph validation is bounded and deterministic
- course code uniqueness is tenant/institution/effective-version aware
- approved course versions are immutable
- course retirement does not invalidate historical curricula

## 4. Curriculum structure

Implement curriculum versions tied to program and regulation.

Support:

- curriculum code/version, program, regulation, applicable cohort/entry mode, effective status
- terms/semesters and recommended sequence
- course placements and term offerings
- categories: humanities/basic sciences, engineering sciences, professional core, professional elective, open elective, laboratory, project, seminar, internship, audit, mandatory non-credit, honors, minor, value-added, and configurable categories
- required versus elective slots
- elective baskets/groups, choice counts, credit requirements, cross-department eligibility, and constraints
- L-T-P/contact hours and credit totals by term/category/program
- prerequisites/co-requisites inherited from course version and curriculum-specific overrides through governed rules
- honors and minor structures
- bridge courses and lateral-entry requirements
- internship, seminar, mini-project, major/capstone project, and non-credit graduation requirements
- course substitution/equivalence and transition mappings between curriculum/regulation versions
- exit award and completion requirement references

Validation must detect:

- missing required course versions
- duplicate placements
- invalid term sequence
- unmet program/regulation credit totals
- category-credit shortages/excesses
- elective-group contradictions
- prerequisite cycles or sequencing impossibilities
- honors/minor overlap violations
- incompatible effective dates/applicability
- orphaned CO mappings
- ambiguous transition/equivalence mappings

Provide a validation report with stable codes, severity, affected resource, human-readable explanation, and remediation guidance. Publishing is blocked by configured error-severity issues.

## 5. Outcomes and Bloom taxonomy foundation

Implement governed definitions—not attainment calculation—for:

- institutional mission/vision reference where relevant
- Program Educational Objectives (PEOs)
- Program Outcomes (POs)
- Program-Specific Outcomes (PSOs)
- Course Outcomes (COs) tied to a specific course version
- Bloom taxonomy levels using configurable but validated reference data
- optional Sustainable Development Goal or accreditation-tag mappings without making them mandatory
- CO-to-PO/PSO mapping strength and rationale
- outcome lifecycle, version, approval, and effective dates

Requirements:

- no outcome text changes after approval; create a new version
- mapping strengths use controlled values/scale defined by the tenant's approved policy
- require rationale when policy dictates
- validate missing outcomes, duplicate sequence, invalid mapping target/version, and mapping scale
- expose owning course/program/regulation and approval provenance
- create explicit interfaces for later question/rubric mapping and attainment calculation
- do not compute CO/PO attainment in this prompt

## 6. Boards of Studies and academic governance

Implement a Board of Studies/governance workspace using Prompt 02 workflow, document, audit, and outbox services.

Support:

- board/committee definition, scope, term, chair, secretary, internal/external members, invitees, quorum policy, and status
- member affiliation, role, expertise, term, contact reference, conflict-of-interest declaration, confidentiality acknowledgement
- meeting creation, agenda, scheduled time/location/online-link metadata, attendees, quorum status
- agenda items for new/revised program, regulation, course, syllabus, curriculum, outcome, equivalence, transition, or policy
- proposal owner, rationale, current/proposed versions, impact summary, documents, comments, review assignments
- circulation and acknowledgement
- decisions: approved, approved with changes, returned, rejected, deferred
- motions/resolutions, voting or consensus metadata according to configured policy
- minutes draft, review, approval, publication scope, and versioning
- action items, owner, due date, escalation, evidence, closure
- downstream activation/effective-date instruction
- Academic Council or other higher approval handoff through configurable workflow

Security and governance:

- committee membership does not automatically grant unrelated academic administration access
- agenda and documents enforce item/meeting scope
- external members receive time-bound, minimum access
- conflicts can require recusal and must be recorded
- quorum and self-approval rules are enforced
- approved decision and minutes are immutable; corrections are versioned
- all views, downloads, comments, decisions, and approvals are audited according to classification
- mobile push messages never include confidential proposal/document content

## 7. Lifecycle and versioning behavior

For program, regulation, course, curriculum, outcome, calendar, and governance records:

- define explicit state machines
- use optimistic locking
- use Prompt 02 workflow for review/approval
- store version parent/supersedes relationships
- provide effective dating
- create a safe clone/new-version operation
- provide comparison/diff between versions
- prevent changes that would invalidate a published dependent version
- create dependency/impact analysis before retirement or supersession
- never cascade-delete approved historical academic data
- record outbox events for creation, approval, publication, supersession, retirement, and amendment
- append safe audit events with reason and source channel

## 8. Imports and migration staging

Create controlled import capabilities for:

- programs
- course catalog and syllabus units
- regulations and applicability
- curriculum placements/elective groups
- CO/PO/PSO/PEO definitions and mappings
- academic calendar windows
- board/committee members where appropriate

Requirements:

- downloadable template/schema version
- staging area separate from authoritative tables
- file/document reference, checksum, uploader, tenant, import type, schema version, and idempotency key
- structural validation, row validation, cross-row validation, relationship/dependency validation, and tenant-scope validation
- preview summary and detailed error file
- explicit approval before apply
- atomic application or clearly documented safe partial-batch behavior; prefer atomic per governed unit
- restart/retry without duplicate records
- reconciliation counts and checksums
- audit and outbox events
- no direct spreadsheet-to-authoritative-table path
- malicious formula/file handling through the existing document/quarantine boundary

Use synthetic templates and fixtures. Do not copy proprietary curriculum content.

## 9. Exports and generated documents

Provide versioned, asynchronous, authorized exports for:

- program structure
- regulation/scheme book
- curriculum by semester/category
- syllabus book
- course description
- CO/PO/PSO matrix
- prerequisite graph data
- regulation/curriculum version comparison
- Board of Studies agenda/minutes/action register

Use the existing document-generation boundary. If a production PDF renderer has not been selected, generate tested accessible HTML and a PDF-ready template/output contract. Do not claim final PDF fidelity without rendering and visual verification.

Every export must include tenant/institution, version, effective/applicability context, generation time, source snapshot/version, and confidentiality classification. Govern downloads and audit them.

## 10. Backend APIs

Add versioned OpenAPI endpoints for authorized operations.

At minimum:

### Programs and calendar

- create, view, update draft, submit, approve, publish, supersede/retire
- list/search with bounded pagination and scope
- configure academic years, terms, and windows

### Regulations

- create/clone version
- edit draft sections/rules
- validate/simulate
- compare versions
- submit/review/approve/publish/supersede/retire
- retrieve applicability and dependencies

### Course catalog and outcomes

- create/clone/update draft course version
- manage syllabus units, references, relationships, COs and mappings
- validate graph/mappings
- submit/approve/publish/retire
- search/filter by code/title/department/category/version/status

### Curriculum

- create/clone curriculum version
- manage terms, placements, elective groups, requirements, honors/minor/transition mappings
- calculate/preview credit and contact-hour summaries
- validate
- compare versions
- submit/approve/publish/supersede

### Boards of Studies

- manage boards, terms, membership, declarations
- create meetings/agendas/items/proposals
- circulate, review, comment, record attendance/quorum/recusal
- decide, approve minutes, create/track actions
- trigger academic artifact workflow/version activation only after required approvals

### Imports/exports

- template/schema retrieval
- initiate upload/import
- validate/preview
- approve/apply
- status/error/reconciliation
- request export and retrieve status/authorized download

Do not expose JPA entities. Use explicit contracts, stable errors, optimistic versions, idempotency keys for commands/imports, pagination, correlation IDs, and tenant/scoped authorization.

## 11. Permission model

Add stable permissions and scopes for:

- program/calendar view and administration
- regulation draft, review, approve, publish, supersede
- course/syllabus/outcome draft, review, approve, publish
- curriculum draft, validate, review, approve, publish
- Board of Studies administration, membership, proposal, review, decision, minutes, actions
- academic import and apply approval
- governed export
- faculty/student published curriculum view
- leadership mobile approval/status

Enforce separation between author, reviewer, approver, and publisher where configured. Platform administrators do not automatically gain academic-content access. External board members have time-bound agenda-item scope.

## 12. React web interfaces

Implement accessible, responsive, production-quality interfaces for:

- academic structure dashboard
- program and award administration
- academic year/term/calendar configuration
- regulation builder with sections, validation, simulation, version history, workflow, and comparison
- course catalog and syllabus editor
- prerequisite/co-requisite/equivalence graph/list editor with validation
- curriculum matrix by term/category, elective-group editor, credit summaries, validation, and comparison
- CO/PO/PSO/PEO and Bloom mapping matrix
- Board of Studies board/member/meeting/agenda/proposal/decision/minutes/action workspace
- import upload/validation/preview/error/reconciliation
- export request/status/download
- read-only published program/regulation/curriculum/syllabus views for authorized faculty and students

Use large-data patterns appropriately: pagination, virtualization only where accessible, filters, sticky context, autosaved drafts where safe, unsaved-change warning, optimistic conflict handling, and clear workflow state. Do not hide validation errors behind color alone.

## 13. React Native Android/iOS interfaces for every relevant role

Implement real mobile interfaces connected to actual APIs.

### Chairman/Management, Principal, Dean, HOD, Program Coordinator

- academic structure summary
- regulation/curriculum proposal status
- credit/validation exception summary
- Board of Studies meetings, agenda acknowledgements, proposal review, comments, assigned actions
- step-up-authenticated approve/return/reject/publish only when role and workflow permit
- version comparison optimized for mobile summary with secure web handoff for complex detail

### Controller of Examinations

- read-only published regulation grading/exam-rule references and pending governance changes
- approval/action queue where the Controller is a required reviewer
- no exam execution features yet

### Faculty

- published program/curriculum/syllabus/course outcomes
- assigned proposal review/comments if authorized
- Board of Studies agenda, declarations, attendance acknowledgement, and actions
- offline read access only for published non-confidential academic content allowed by policy

### Student and Parent/Guardian

- student: published program structure, regulation summary, curriculum, course syllabus, outcomes, credit requirements and academic calendar
- guardian: only institution-permitted published academic reference information; no student progression data yet
- approved offline access for public/published content

### Accreditation/IQAC

- published outcome mappings, version provenance, governance status, evidence/action queue references
- no attainment calculation yet

### External Board Member/Auditor

- time-bound assigned meetings, proposals, declarations, documents, comments, decisions/acknowledgements according to scope
- secure document access, no unrelated curriculum search

### Tenant/Platform Administrators

- configuration health, import/export job status, workflow/integration failures, and access issues
- no implicit academic authoring/approval access

Complex regulation authoring, curriculum matrix editing, bulk imports, graph editing, and confidential governance administration remain web-first. Mobile must provide secure review, status, comments, acknowledgements, action items, approvals, and published read views where authorized.

Mobile requirements:

- tenant/role context enforcement
- push/deep links into authorized proposal/meeting/version/action
- encrypted cache for allowlisted published content only
- purge on logout/membership loss/tenant switch
- no confidential proposal documents or unpublished regulations cached unless explicit policy allows it
- official approvals require online server confirmation and receipt
- accessible dynamic text, screen-reader labels, and localization-ready content
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` honestly

## 14. Database and RLS

Add forward-only Flyway migrations for all academic domain tables, including tenant ID and institution/program scope where appropriate.

Model at minimum:

- award/degree type/reference
- program and version/status/applicability
- academic year, term model, calendar/window, versions
- cohort/regulation applicability definition
- regulation and version/section/typed rule/requirement
- course and version/syllabus unit/reference/relationship
- PEO/PO/PSO/CO/Bloom reference and mappings
- curriculum and version/term/course placement/elective group/requirement/transition/equivalence
- board/committee/term/member/declaration
- meeting/agenda/item/proposal/review/decision/resolution/minutes/action
- import batch/staging/error/reconciliation
- export job/source snapshot reference

Requirements:

- correct exact numeric types for credits/hours/mapping strengths
- constraints/indexes for codes, versions, sequences, statuses, relationships, effective dates and common searches
- RLS on every tenant-owned table
- application repository tenant predicates
- no cascading physical delete of approved/published records
- optimistic versions
- workflow/document/audit/outbox references through stable IDs/ports without cross-module table access

## 15. Testing requirements

Backend/domain:

- lifecycle/state transitions and immutable published versions
- effective-date/applicability overlaps
- exact credit/contact-hour calculations
- curriculum/category/elective validation
- prerequisite cycle and impossible-sequence detection
- equivalence/substitution contradictions
- mapping-scale and outcome version validation
- regulation typed-rule validation and safe simulation
- Board quorum, recusal, SoD, decision, minutes, and action rules
- dependency/impact analysis

PostgreSQL/Testcontainers:

- clean Flyway migration
- RLS and cross-tenant read/write/delete denial for every new table
- tenant-scoped uniqueness
- approved-version immutability enforcement where appropriate
- concurrent version creation/publishing
- indexes/query plans for key searches where meaningful

Import/export:

- valid and invalid templates
- duplicate/retry/idempotency
- malicious or cross-tenant references
- atomic apply/reconciliation
- large representative curriculum import within documented bounds
- authorized export/download and source snapshot

API/security:

- permission/scope/SoD
- external board member access boundary
- IDOR/cross-tenant attempts
- stale optimistic versions
- workflow approvals
- safe RFC 7807 errors
- bounded pagination

Web:

- unit/component/accessibility tests
- regulation/course/curriculum authoring and validation
- version comparison
- Board of Studies flow
- import preview/apply
- published student/faculty views
- Playwright critical journey from draft proposal through approval and publication

Android/iOS:

- published student/faculty read views and offline allowlist
- leadership/board review and online approval
- external member scoped access
- push/deep-link authorization
- tenant/role switch and cache purge
- inaccessible/unpublished/confidential content denial
- at least one Android and iOS E2E journey for each relevant role group where infrastructure permits

Never mark unavailable iOS/macOS execution or skipped tests as passed.

## 16. Documentation and operations

Update or create:

- OpenAPI and generated client contracts
- academic ERD/data dictionary
- academic terminology glossary
- regulation typed-rule specification
- course/curriculum/outcome versioning ADR
- prerequisite/equivalence graph design
- curriculum validation and credit formula specification
- governance/Board of Studies workflow and SoD matrix
- permission catalog
- import templates/schema guide and reconciliation runbook
- publication/amendment/retirement runbook
- threat model covering unauthorized curriculum changes, stale rules, malicious imports, external-member scope, document leakage, and mobile cache
- web administrator/faculty/student guides
- mobile role-feature matrix updates

## 17. Required verification

Run and report actual results for:

- complete backend formatting/static checks, compile, domain/unit, architecture, and Testcontainers suites
- Flyway migration from clean PostgreSQL
- all new RLS isolation tests
- graph, credit, rule, versioning and governance tests
- import/export validation and idempotency
- OpenAPI validation and generated-client drift
- web lint, typecheck, unit/accessibility, production build, and Playwright journeys
- mobile lint, TypeScript, unit/component, Android build/test and available E2E
- iOS build/test only on valid macOS infrastructure; otherwise identify exact missing evidence
- secret/dependency/security scans configured by earlier prompts

Fix failures in scope; do not hide flakes, skips, or environment constraints.

## 18. Completion gate

This prompt passes only when:

1. An authorized institution can define a complete B.Tech program structure without hard-coded institution rules.
2. A regulation can be drafted, validated, reviewed, approved, published, cloned/amended, compared, superseded, and historically reproduced.
3. A course catalog supports versioned syllabus, credits/L-T-P, relationships, outcomes, references, and approval.
4. A complete multi-semester curriculum validates required/elective credits, categories, prerequisites, honors/minor and transition rules.
5. Invalid cycles, contradictory mappings, credit errors, and overlapping applicability block publication with explainable errors.
6. Board of Studies members can review proposals, declare conflicts, meet quorum rules, record decisions/minutes/actions, and trigger governed approvals.
7. Published academic artifacts are immutable and cannot be physically deleted through normal APIs.
8. Imports stage, validate, preview, approve, apply idempotently, and reconcile before authoritative publication.
9. Web provides complete administration and comparison interfaces.
10. Every relevant role has the defined real Android/iOS review, approval, action, or published-read interface.
11. Mobile caches only policy-allowed published data and official approvals require server confirmation.
12. Every tenant-owned table has repository predicates, RLS, and negative isolation tests.
13. Audit, workflow, document, and outbox integrations use Prompt 02 services rather than duplicate implementations.
14. OpenAPI, data dictionary, ADRs, formulas, governance guides, runbooks, and role matrix match actual behavior.
15. All environment-available checks pass.

At completion, provide this exact report:

1. Summary of what was implemented
2. Files added or changed
3. Database migrations added
4. APIs added or changed
5. Program/regulation/course/curriculum/outcome capabilities
6. Board of Studies and governance capabilities
7. Import/export implementation
8. Web interfaces implemented
9. Android interfaces and test status
10. iOS interfaces and test status
11. Versioning, workflow, audit, document and outbox controls
12. Tenant isolation and authorization controls
13. Tests added and exact results
14. Commands run and exit status
15. ADRs, documentation and runbooks updated
16. Known limitations, environment gaps or deferred items
17. Manual verification steps
18. Suggested commit message
19. Explicit statement: `Completion gate: PASSED` or `Completion gate: FAILED`

Suggested commit message:

`feat(academic): implement regulations curriculum outcomes and boards governance`

Stop after the report. Do not begin Prompt 04 or implement admissions, student records, registration, timetable, attendance, examination processing, finance, OBE attainment, or later modules.
```

---

## Review Checklist Before Prompt 04

- Programs, regulations, courses, curricula, outcomes, and calendars are versioned and tenant-scoped.
- Published versions are immutable and amendments preserve history.
- Curriculum validation catches credit, elective, prerequisite, mapping, and applicability problems.
- Rules use typed governed data rather than executable user scripts.
- Board of Studies workflows enforce membership, quorum, conflict, approvals, and audit.
- Imports use staging, validation, preview, approval, idempotency, and reconciliation.
- Web provides full authoring and administration.
- Relevant leadership, faculty, student, guardian, auditor, and administrator roles have real native mobile interfaces.
- Mobile caches only allowed published data, and approvals require online confirmation.
- PostgreSQL RLS and application predicates cover every new tenant-owned table.
- Prompt 02 platform services are reused without duplication.
- No later business module was prematurely implemented.
- The completion gate passed and changes were manually reviewed.

Do not continue to Prompt 04 until these conditions pass.

