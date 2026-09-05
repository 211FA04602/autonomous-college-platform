# Claude Code Prompt 06

## Course Offerings, Registration, Electives, and Degree Audit

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–05 passed, were reviewed, and were committed  
**Scope:** Term course offerings, registration planning, electives, add/drop, exceptions, credit progression, and explainable degree audit

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially curriculum, registration, progression, student lifecycle, holds, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md` and all relevant ADRs.
3. Inspect Prompt 03's published program/regulation/course/curriculum contracts and Prompt 05's student, association, lifecycle and hold-evaluation contracts.
4. Read OpenAPI, data dictionary, permission catalog, RLS model, workflow/audit/outbox services, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Inspect Git status and run the existing verification suite. Preserve legitimate work and fix only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, or implement timetable generation, attendance, teaching delivery, examination marks/results, fee collection, or placement. Provide explicit integration ports for those later modules.

Implement a bounded `course-registration` domain that converts published curriculum requirements into actual term offerings and governed student registrations.

## 1. Term and registration configuration

Implement configuration by tenant, institution, campus, academic year, term, program, regulation, cohort, and entry mode:

- registration window, late window, add/drop window, withdrawal deadline, and approval deadlines
- minimum and maximum term credits
- normal, repeat, backlog, improvement, audit, honors, minor, summer and special registration policies
- prerequisite/co-requisite enforcement mode
- maximum concurrent backlogs/repeats where applicable
- elective preference and allocation policy
- section/lab-batch assignment boundary
- registration fee/hold integration references without implementing payment
- adviser/HOD/Dean/Registrar exception workflow
- publication/freeze/reopen policy
- student acknowledgement/declaration templates

Use typed, validated, versioned configuration. Active versions are immutable. No arbitrary scripts, SQL, SpEL, JavaScript or eval.

## 2. Course offerings

Implement:

- offering created from one approved course version and published curriculum context
- academic year, term, institution, campus, servicing/owning department, programs/cohorts and regulation applicability
- offering type: regular, elective, repeat/backlog, improvement, audit, honors, minor, summer, bridge or configured type
- planned capacity, waitlist capacity, reserve capacity and allocation groups
- section(s), lab batch placeholders and delivery mode
- primary/co-faculty/teaching-assistant reference ports; full faculty/HR comes later
- room/lab and schedule placeholders; Prompt 07 will own actual timetable/resource allocation
- registration eligibility and restrictions
- cross-listed/shared offerings with explicit home/servicing ownership and capacity allocation
- lifecycle: draft, review, approved, open, closed, roster frozen, cancelled, completed
- versioned amendment, cancellation, replacement and student-impact analysis

Validation:

- only approved course/curriculum/regulation versions
- applicability to program/cohort/entry mode
- capacity and reserved-pool consistency
- no contradictory offering type/status/window
- cancellation requires affected-registration resolution
- offering changes after registration preserve history and notify affected users

## 3. Student registration plan

Generate a server-authoritative, explainable plan using:

- student's active program, regulation, cohort, entry mode and lifecycle status
- published curriculum and current term
- prior completed/failed/registered course outcomes through a result-history port; before Prompt 16 exists, use a clearly bounded deterministic test/reference adapter, not manually editable shadow student fields
- prerequisites, co-requisites, anti-requisites and equivalencies
- previously earned/recognized credits through the same external contract
- active holds through Prompt 05
- available offerings and capacities
- min/max credits and registration policy
- required courses, repeats/backlogs, elective requirements, honors/minor/audit choices
- maximum-duration and expected-completion references

Each recommendation or block must include:

- rule/config version
- source curriculum/regulation version
- evaluated inputs/references
- decision: required, eligible, ineligible, optional, approval required
- stable reason codes and human-readable explanation
- warnings and missing source data
- calculation time/engine version

Do not trust a client-generated plan. Do not silently assume a course is passed when result data is unavailable.

## 4. Registration lifecycle

Support:

- plan generated
- draft selection
- validation failed
- submitted
- adviser review
- exception review
- approved
- registered
- add/drop pending/approved
- withdrawn
- cancelled
- roster frozen
- completed/closed

Capabilities:

- student selects eligible offerings and preference ranks
- validate prerequisites, co-requisites, anti-requisites, duplication/equivalence, credits, timetable-conflict placeholder, capacity, holds, and policy
- submit with acknowledgement and idempotency
- automatic approval when all configured conditions pass
- adviser/HOD/Dean exception request with reason/evidence
- approved override is narrow, time-bound to the registration action and fully audited
- add/drop creates versioned registration history
- withdrawal preserves attempt/financial/examination integration references
- administrative correction uses workflow and does not overwrite history
- freeze produces immutable roster version/snapshot
- reopen requires high-risk workflow, reason, affected-student report and new snapshot

## 5. Capacity, reservation, waitlist, and concurrency

Implement:

- concurrency-safe capacity reservation/commit/release
- capacity pools by program/category or configured lawful policy
- expiration of abandoned temporary reservations
- waitlist ordered by approved deterministic rules
- movement/offer/acceptance deadlines where policy requires student confirmation
- allocation/reallocation audit and version
- no over-enrollment except an explicit authorized capacity amendment
- cancellation/drop releases capacity and triggers idempotent waitlist processing
- metrics and exception queue for stuck reservations or allocation failure

Use database constraints/locking appropriate to PostgreSQL. Tests must prove no oversubscription during concurrent requests.

## 6. Elective preference and allocation

Support:

- professional/open/program elective baskets
- ranked student preferences
- eligibility and cross-department rules
- min/max choices and credit requirements
- offering and shared-capacity constraints
- deterministic allocation policy with documented priority/tie-breaking
- simulation before publication
- allocation version, input snapshot, seed where relevant, output, unallocated reasons and fairness metrics
- manual adjustment only through reasoned workflow with affected-student audit
- student acceptance where configured
- reallocation after capacity changes, cancellations or failed minimum enrollment
- publish and notify

Do not claim mathematical optimality unless an actual solver/objective is implemented and tested. Ensure repeated runs with the same inputs/configuration produce the same result.

## 7. Honors, minor, audit, improvement, repeat, and summer registration

Implement rules and registration paths for:

- honors/minor application or enrollment status reference
- approved eligibility and credit-load rules
- required and elective structures
- audit/non-credit courses
- repeated failed courses
- grade-improvement registrations
- summer term offerings
- bridge/deficiency courses
- maximum attempts/duration reference
- completion and withdrawal consequences

Do not calculate final grades or replace the result domain. Consume official completion outcomes through contracts.

## 8. Credit progression and degree audit

Implement an explainable, versioned degree-audit engine using:

- exact student program/regulation/curriculum/entry mode
- authoritative completed/recognized/failed/in-progress course and credit data through a result/credit port
- course equivalence/substitution/transition mappings
- category and total-credit requirements
- mandatory non-credit/audit courses
- internship, seminar, project, honors/minor and other completion requirements
- maximum duration
- active/pending registrations
- approved waivers/substitutions with provenance

Output:

- satisfied, in progress, planned, missing, failed, waived/substituted and not applicable requirements
- total/category credits required, earned, in progress and remaining
- prerequisite/dependency blockers
- earliest expected completion projection labeled as an estimate
- regulation/curriculum/rule/engine versions and input snapshot
- warnings for missing/inconsistent authoritative results
- exact reasons preventing completion

Degree audit is advisory until official result/graduation workflows confirm it. Never set a student to graduated here. Expose a future graduation-eligibility evidence contract to Prompt 18/official processes.

## 9. Imports, bulk operations, and reconciliation

Support staged import of:

- course offerings
- legacy registrations
- elective preferences/allocations
- approved substitutions/waivers
- recognized credit/completion references only through a clearly governed migration adapter

Use Prompt 02 documents, staging, validation, preview, approval, idempotency, errors, reconciliation and audit. No direct spreadsheet insertion.

Bulk generation, registration, section placeholder assignment, cancellation or roster freeze must be bounded, previewed, authorized, idempotent, asynchronously observable and audited.

## 10. Events and integration contracts

Publish minimal versioned outbox events for:

- offering approved/opened/changed/cancelled/closed
- registration submitted/approved/registered/changed/withdrawn
- exception requested/decided
- elective preferences submitted/allocation published/changed
- roster frozen/reopened
- degree-audit refreshed/materially changed

Define consuming/producing ports for:

- student/program/regulation/hold data
- authoritative course-completion/results
- future timetable conflict/section/lab allocation
- future fee requirements
- future exam candidate eligibility
- notification and analytics projections

Events contain stable references and minimum data, not full student profiles.

## 11. Backend APIs and authorization

Add versioned OpenAPI endpoints for:

- registration configuration/version/activation
- offering create/validate/approve/open/close/cancel/search
- offering capacity and impact preview
- student registration plan, draft, validate, submit, status and history
- adviser review and exception workflow
- add/drop/withdraw/correction
- capacity reservation/waitlist status
- elective preference, simulation, allocation review, publication and reallocation
- roster version/freeze/reopen/export
- degree audit and requirement drill-down
- imports/bulk jobs/status/errors/reconciliation
- operational dashboards

Use explicit DTOs, RFC 7807 stable errors, bounded pagination, optimistic versions, idempotency keys, correlation IDs, field minimization, tenant/program/cohort/student scope and audit.

Permissions must cover configuration, offering management, registration self-service, adviser review, exception approval, capacity amendment, elective allocation/adjustment/publication, roster freeze/reopen, degree-audit view, imports/exports and dashboards.

Enforce SoD for high-risk exception approval, capacity amendment, manual elective override, roster reopen and migration changes. Platform administrators do not automatically receive academic/student access.

## 12. React web interfaces

Implement accessible responsive interfaces for:

- term registration configuration
- course-offering setup, validation, approval and capacity
- shared/cross-listed offerings
- registration-plan and rule explanation
- student selection, submission, acknowledgement, add/drop and withdrawal
- adviser/HOD/Dean review and exception queue
- capacity/waitlist operations
- elective basket/preference setup, simulation, fairness/exception review, publication and adjustment
- roster view, compare versions, freeze/reopen and governed export
- student/adviser degree audit with requirement drill-down
- imports/bulk jobs and reconciliation
- registration/credit/progression dashboards

Support keyboard accessibility, large rosters, safe filters, no color-only status, localization, optimistic conflict handling and clear rule explanations.

## 13. React Native Android/iOS interfaces

Implement real APIs and role-appropriate mobile journeys.

### Student

- registration window/action card
- explainable recommended plan
- search/view eligible offerings
- select regular/elective/audit/honors/minor/repeat/improvement options
- rank elective preferences
- see credit/capacity/waitlist/hold/prerequisite warnings
- submit and receive server receipt
- request exception with reason/evidence
- track approval/waitlist/allocation
- add/drop/withdraw during valid windows
- view registered courses and degree audit
- offline viewing/draft selection may be allowed, but final validation, capacity reservation, submission and changes require confirmed server success

### Faculty Adviser/Mentor

- advisee registration status, exceptions, credit load and degree-audit risks
- review/comment/recommend with current authoritative data

### HOD/Program Coordinator/Dean/Registrar

- offering and registration KPIs
- pending exceptions and capacity issues
- elective allocation status/unallocated students
- roster readiness/freeze approvals
- step-up-authenticated high-risk decisions
- complex offering/curriculum configuration, bulk imports and allocation adjustment remain web-first

### Faculty

- assigned/offered course summary and roster after publication
- no timetable/attendance features yet

### Student Services/Examination/Finance/Leadership

- authorized read-only registration/credit/hold-effect and roster readiness summaries needed by role
- no marks, fee collection or exam processing yet

### Guardian

- only institution/student-consent-permitted registration status and general progress; no ability to choose/submit courses unless explicit delegate policy permits it

### Tenant/Platform Operations

- job/event/integration health and failures, no implicit student data access

Mobile requirements:

- encrypted allowlisted cache for plan/draft/degree-audit display
- purge on logout/context loss
- push/deep links reauthorize
- final registration/allocation/approvals require online server receipt
- handle stale capacity/rules and conflict refresh clearly
- accessible/localized UI
- update mobile role-feature matrix honestly

## 14. Database and RLS

Add forward-only Flyway migrations for:

- registration configuration/version
- course offering, scope, capacity pool, status/version
- registration plan/snapshot/decision explanation
- student registration/version/status
- registration course selection/history
- exception request/decision/override
- capacity reservation/commit/release
- waitlist and movement history
- elective basket/preference/allocation run/version/result/override
- roster version/snapshot
- waiver/substitution references
- degree-audit run/snapshot/requirement result
- import staging/error/reconciliation and bulk jobs

Every tenant-owned table requires tenant/institution/program/student scope as applicable, application predicates, PostgreSQL RLS, constraints, indexes, optimistic versions and non-destructive history.

## 15. Tests

Test comprehensively:

- regulation/cohort applicability
- prerequisites, co-requisites, anti-requisites, equivalence and duplication
- min/max credits and special registration types
- hold allow/warn/block
- missing result source fails safely
- registration state/idempotency/concurrency
- capacity under high concurrent selection
- reservation expiry/release and waitlist movement
- elective determinism, tie breaks, fairness metrics and manual override
- add/drop/withdraw/freeze/reopen history
- degree-audit golden cases, transition/substitution and missing-data warnings
- RLS cross-tenant/cross-student/role denial
- APIs and stable errors
- web accessibility and Playwright journeys
- Android/iOS student, adviser and governance journeys
- offline draft/stale capacity/server receipt/deep-link/cache purge
- event duplicate consumption and projection rebuild

Run clean Flyway, backend, web, Android and environment-valid iOS builds/tests, OpenAPI drift and security checks. Never mark skipped or unavailable evidence as passed.

## 16. Documentation and completion gate

Update OpenAPI/generated clients, ERD/data dictionary, registration/rule/capacity/elective/degree-audit specifications, lifecycle diagrams, permission/SoD matrix, event schemas, threat model, import and exception runbooks, user/admin guides and mobile role matrix.

The gate passes only when:

1. Authorized staff can create and open valid course offerings from published curriculum.
2. Student plans are reproducible and explain every requirement/block.
3. Registration/add/drop/withdrawal is authorized, idempotent and historical.
4. Concurrent demand never exceeds approved capacity.
5. Waitlist movement and elective allocation are deterministic and auditable.
6. Exceptions and manual adjustments require narrow approved overrides.
7. Frozen roster versions are immutable and controlled reopening creates history.
8. Degree audit correctly classifies satisfied/in-progress/missing/waived requirements and never graduates a student.
9. No GPA/result/attendance/fee shadow data is manually stored.
10. Web has complete administration/self-service.
11. Relevant roles have real Android/iOS interfaces with server-confirmed official actions.
12. Every new table has predicates, RLS and negative tests.
13. Existing platform services are reused and all available checks pass.

Provide the standard completion report covering summary, files, migrations, APIs/events, offering/registration/elective/degree-audit capabilities, web, Android, iOS, security/tenancy/audit/idempotency, tests/results, commands/status, docs/runbooks, limitations, manual verification, commit message and `Completion gate: PASSED` or `FAILED`.

Suggested commit message:

`feat(registration): implement offerings electives registration and degree audit`

Stop. Do not begin Prompt 07 or implement timetable/resource scheduling.
```

---

## Review Checklist Before Prompt 07

- Offerings reference approved curriculum/course versions.
- Registration plans are server-authoritative and explainable.
- Capacity and waitlists are concurrency-safe.
- Elective allocation is deterministic, versioned and auditable.
- Add/drop, withdrawal, exceptions and roster reopening preserve history.
- Degree audit consumes authoritative results and does not graduate students.
- Web and relevant mobile interfaces use real APIs.
- Official mobile actions require server confirmation.
- All new tables have RLS and negative isolation tests.
- No timetable, attendance, result or finance module was prematurely implemented.
- The gate passed and changes were manually reviewed.

Do not continue to Prompt 07 until these conditions pass.

