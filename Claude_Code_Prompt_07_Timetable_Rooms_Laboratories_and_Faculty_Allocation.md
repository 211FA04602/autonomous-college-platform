# Claude Code Prompt 07

## Timetable, Rooms, Laboratories, and Faculty Allocation

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–06 passed, were reviewed, and were committed  
**Scope:** Conflict-aware academic scheduling, resource allocation, substitutions, timetable publication, and role-specific interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, particularly academic calendar, course offerings, timetables, rooms/laboratories, teaching operations, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md` and relevant ADRs.
3. Inspect Prompt 03 academic-calendar/program/course contracts and Prompt 06 offering, roster, section/lab-batch placeholder and registration contracts.
4. Read OpenAPI, data dictionary, permissions, RLS, workflow/audit/outbox services, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Inspect Git status and run the existing verification suite. Preserve valid work and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, or implement attendance capture, teaching diary/LMS, examinations, or HR payroll. Define clean ports for the future faculty HR/workload module.

Implement a bounded `academic-scheduling` domain.

## 1. Scheduling configuration

Implement versioned configuration by tenant/institution/campus/academic year/term:

- working days and week patterns
- shifts and period grids
- period start/end, breaks and transition time
- holidays and calendar exceptions from Prompt 03
- maximum consecutive sessions
- daily/weekly faculty and student-group limits
- lecture, tutorial, practical, laboratory, project, seminar, training and special-session rules
- lab-session contiguity and duration
- room/lab suitability and capacity rules
- faculty availability/preferences and hard restrictions through a provider port
- student-group, cross-listed offering and elective conflict rules
- travel buffer between campuses/buildings where configured
- timetable approval, publication, amendment and freeze policy

Configuration must use typed validated data, not executable scripts. Active versions are immutable and effective-dated.

## 2. Facilities and teaching resources

Implement academic scheduling resources:

- campus, building, floor and room/lab references
- room code, name, type, capacity, accessibility, status and effective dates
- laboratory category and supported course/activity types
- equipment/feature tags and minimum requirements
- virtual/online room metadata without storing meeting secrets
- blackout/maintenance/unavailability windows
- shared ownership and booking priority
- temporary capacity/status amendment with reason and workflow
- safe integration port to the future asset/facilities module

Room and lab history must remain reproducible for published schedules.

## 3. Student groups and teaching allocations

Implement:

- class section and subsection references based on Prompt 06 rosters
- laboratory/tutorial/project batches
- shared/cross-program groups
- effective membership snapshot used by each published timetable version
- primary faculty, co-faculty, teaching assistant and lab-assistant allocation references
- allocation percentage/contact hours/responsibility type
- faculty eligibility and availability provider port
- vacancy/unassigned status and escalation
- allocation lifecycle and amendment history

Do not create duplicate employee/faculty master data. Use Prompt 01 identities and a bounded faculty-reference adapter until Prompt 24 provides full HR records.

## 4. Timetable model

Support:

- timetable plan/version by term and scope
- scheduling requirement for each offering and activity type
- recurring meetings and one-time sessions
- day/date, period/time, room/lab, student group and faculty assignments
- fortnightly/alternating-week and configurable recurrence
- combined/split sessions
- online/hybrid mode
- source requirement and manual/generated origin
- draft, validating, review, approved, published, amended, frozen, retired states
- version comparison and affected-user/resource impact

Approved/published versions are immutable. Changes create amendments/new versions and preserve prior assignments.

## 5. Conflict and constraint engine

Implement deterministic validation for hard constraints:

- faculty double booking
- student group overlap
- room/lab double booking
- capacity shortfall
- room/lab type/equipment mismatch
- campus travel impossibility
- unavailable/blackout resource
- activity duration/contiguity violation
- offering outside academic calendar
- invalid faculty/roster/offering status
- cross-listed/elective conflicts
- maximum configured teaching/student load
- prohibited consecutive sessions

Support soft constraints/preferences separately with weights and explanations, such as preferred periods, distribution across week, avoiding excessive gaps and balanced loads.

Every conflict must provide stable code, severity, affected resources, exact sessions, source rule/config version and remediation guidance. Never suppress a hard conflict merely to produce a schedule.

## 6. Assisted timetable generation

Provide a solver/generation boundary capable of:

- selecting an approved set of requirements/resources/configuration
- deterministic seed and input snapshot
- generation job with progress, cancel, timeout and retry
- hard-constraint satisfaction
- soft-constraint score and breakdown
- unplaced-session list and reasons
- comparison of candidate plans
- manual adjustment followed by full revalidation

Choose a maintainable algorithm/constraint-solver library only after recording an ADR and checking license/support. Do not claim global optimality unless mathematically established. A valid schedule with transparent score is preferable to a fabricated “optimal” result.

Generation should run asynchronously through the existing job/outbox foundation and be independently extractable later if load requires it.

## 7. Manual scheduling and adjustment

Implement:

- drag/drop or form-based placement in web with keyboard-accessible alternative
- immediate server-side conflict validation
- hold/lock selected assignments during authorized planning collaboration
- reasoned override only for explicitly overrideable soft constraints
- hard constraints cannot be overridden unless configuration defines an exceptional workflow and impact warning
- change set, undo within draft, version diff and reviewer comments
- optimistic concurrency and stale-plan recovery

## 8. Review, publication, and amendments

Implement:

- validation summary and readiness checklist
- department/program/Dean review workflow
- publication with immutable version and roster/resource snapshots
- role/audience-targeted notifications
- timetable views by student, faculty, room, lab, section, department, program and campus
- amendment request for room/faculty/time/group/change/cancellation
- affected-registration, faculty and resource impact analysis
- approval based on risk and timing
- new published version/effective date
- push/outbox change notifications
- emergency same-day change with reason, expiry and audit
- freeze/close term behavior

## 9. Substitution, cancellation, and makeup classes

Implement:

- faculty unavailable event/request reference
- eligible substitute search through provider port
- substitute proposal, acceptance and approval
- room change, session reschedule, cancellation and makeup/compensatory class
- student/faculty/resource conflict revalidation
- attendance-session creation event for Prompt 08 only after final schedule status
- notification acknowledgement where configured
- no rewriting of past published sessions
- emergency workflow and complete audit

## 10. Calendar and export interfaces

Provide:

- role/scope calendar views
- week/day/month/agenda modes
- print/PDF-ready schedules
- governed CSV/XLSX export where authorized
- iCalendar subscription/feed using opaque revocable token or authenticated access
- version/effective date/time zone on every output
- data minimization for public/shared room schedules
- calendar refresh and token revocation

Do not expose student rosters or confidential details through calendar feeds.

## 11. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- scheduling configuration/version/activation
- room/lab/resource administration and availability
- student-group/lab-batch definition and snapshot
- faculty teaching allocation references
- timetable requirement and plan/version
- validate/conflict detail
- generate/status/cancel/candidate comparison
- manual assignment/change set
- review/approve/publish/amend/freeze
- substitution/cancel/reschedule/makeup
- student/faculty/room/section/department calendar queries
- export/calendar subscription/revoke
- operational conflict/unassigned/resource-utilization dashboards

Use explicit DTOs, bounded pagination, RFC 7807, optimistic versions, idempotency, correlation IDs, tenant/scope authorization and audit.

Permissions include configuration, facility scheduling admin, group/batch manage, faculty allocation, draft/edit, validate/generate, review/approve/publish, amend/emergency change, substitute, calendar view by scope and export.

Enforce SoD for configured timetable approval/publication and high-impact emergency amendments. Platform administrators have no implicit academic schedule access.

Publish minimal events for plan generated, timetable published/amended/frozen, session scheduled/changed/cancelled, room changed, substitution assigned and makeup created. Events carry stable references, not full rosters.

## 12. React web interfaces

Implement accessible responsive interfaces for:

- schedule configuration and period grid
- room/lab/resource administration and availability
- sections, groups, laboratory batches and faculty allocations
- scheduling requirements and completeness
- generation job/progress/candidate comparison/unplaced sessions
- timetable planner with grid plus keyboard-accessible list/form alternative
- conflict panel with explanation and navigation
- validation/readiness, review and publication
- version comparison and impact analysis
- substitution/cancellation/reschedule/makeup workflows
- student, faculty, room, lab, section, department and campus calendars
- utilization, unassigned and conflict dashboards

Use virtualization only if accessible, no color-only conflicts, time-zone clarity, localization and optimistic-conflict recovery.

## 13. React Native Android/iOS interfaces

Implement real role interfaces using actual APIs.

### Student

- personal timetable in day/week/agenda views
- term/calendar and room/lab details
- change/cancellation/makeup notifications and acknowledgement
- offline encrypted current/near-term schedule with version/staleness indicator
- push/deep links reauthorize and refresh

### Faculty/Teaching Assistant/Lab Assistant

- teaching schedule, room/lab, groups and responsibility
- substitution request/offer/acceptance where permitted
- cancellation/reschedule/makeup request and status
- availability/preference submission if policy enables it
- notifications and acknowledgement
- offline schedule, but changes/acceptances require server confirmation

### HOD/Program Coordinator/Dean/Registrar

- completeness, conflicts, unassigned faculty, room/lab capacity and utilization
- generation/review/publication/amendment work queue
- mobile review, comments and step-up approval
- complex grid construction and bulk generation remain web-first

### Room/Lab/Facilities Staff

- room/lab schedule, blackout/maintenance request, conflict alerts and approved emergency changes
- no broader academic roster access

### Examination, Admissions, Placement, Transport, Hostel and Leadership roles

- authorized read-only academic calendar/timetable summaries needed for their operations
- no unrelated student detail

### Guardian

- only policy-permitted student's published schedule and change alerts

### Tenant/Platform Operations

- generation job, event and integration health without implicit schedule/roster access

Mobile requirements:

- encrypted allowlisted schedule cache partitioned by user/tenant
- purge on logout/context loss
- staleness/version display and safe refresh
- official substitutions/changes/approvals require confirmed server receipt
- accessible and localized date/time/navigation
- update mobile role-feature matrix honestly

## 14. Database and RLS

Add forward-only Flyway migrations for:

- schedule configuration/version/day/period/rule
- room/lab/resource/features/availability history
- student group/batch/membership snapshot
- teaching allocation/reference/history
- timetable plan/version/requirement/session/recurrence
- constraint result/soft score/generation job/candidate/unplaced item
- draft lock/change set/reviewer comment
- publication/audience/version snapshot
- amendment/substitution/cancellation/makeup workflow references
- calendar subscription/revocation
- utilization/read projection checkpoints

Every tenant-owned table requires appropriate tenant/institution/campus/term/offering/group/resource scope, repository predicates, RLS, constraints, indexes, optimistic versions and historical preservation.

## 15. Tests

Test:

- every hard conflict and representative soft preference
- recurrence/calendar/time-zone/DST behavior
- room capacity/type/equipment and blackout
- cross-listed/elective/student-group overlap
- faculty/student/resource maximum load
- deterministic generation with same seed/input
- unplaced-session explanations and cancellation
- concurrent planners/locks/optimistic conflicts
- immutable published versions and amendments
- substitution/reschedule/makeup revalidation
- calendar token authorization/revocation
- RLS cross-tenant/resource/role denial
- web planner accessibility and Playwright journeys
- Android/iOS student/faculty/governance/facilities journeys
- offline schedule staleness, push/deep link and cache purge
- event idempotency and job crash recovery

Run full backend, clean Flyway, RLS, OpenAPI, web, Android and environment-valid iOS suites. Report unavailable evidence honestly.

## 16. Documentation and completion gate

Update OpenAPI/generated clients, ERD/data dictionary, scheduling configuration/constraint specification, solver ADR/license decision, lifecycle diagrams, permission/SoD matrix, event schemas, calendar-feed security design, threat model, generation/recovery/publication/emergency-change runbooks, user/admin guides and mobile role matrix.

The gate passes only when:

1. Valid course offerings can produce complete scheduling requirements.
2. Rooms/labs/groups/faculty allocations are historically versioned.
3. All hard conflicts are detected and explained.
4. Generation is deterministic, asynchronous, cancelable and honest about unplaced sessions/optimality.
5. Manual planning revalidates server-side and handles concurrency.
6. Published schedules are immutable; amendments create new history and notify affected users.
7. Substitution, cancellation, reschedule and makeup workflows preserve audit and conflict checks.
8. Calendar feeds are revocable and do not leak rosters.
9. Web provides complete planning/administration.
10. Relevant roles have real Android/iOS schedule, alert, request, review and approval interfaces.
11. Mobile official changes require server confirmation and offline views show staleness.
12. Every new table has predicates, RLS and negative tests.
13. Existing platform services are reused and all available checks pass.

Provide the standard completion report covering implementation, files, migrations, APIs/events, scheduling/resources/conflict/generation/publication, web, Android, iOS, security/tenancy/audit/idempotency, tests/results, commands, docs/runbooks, limitations, manual verification, commit message and `Completion gate: PASSED` or `FAILED`.

Suggested commit message:

`feat(timetable): implement conflict-aware scheduling and resource allocation`

Stop. Do not begin Prompt 08 or implement attendance.
```

---

## Review Checklist Before Prompt 08

- Scheduling uses published offerings and governed calendars.
- Rooms, labs, groups and faculty allocations are versioned.
- Hard conflicts cannot be silently overridden.
- Assisted generation reports constraints, score and unplaced sessions honestly.
- Published timetables are immutable and amendments preserve history.
- Substitutions and emergency changes are authorized and audited.
- Web and relevant mobile interfaces use real APIs.
- Offline mobile schedules show version/staleness; official changes require server confirmation.
- All new tables have RLS and cross-tenant tests.
- No attendance or later module was prematurely implemented.
- The gate passed and changes were reviewed.

Do not continue to Prompt 08 until these conditions pass.

