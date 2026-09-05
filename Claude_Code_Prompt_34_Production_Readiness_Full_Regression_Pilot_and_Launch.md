# Claude Code Prompt 34

## Production Readiness, Full Regression, Pilot, and Launch

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS infrastructure-as-code  
**Prerequisite:** Prompts 00–33 passed, were reviewed, and were committed  
**Scope:** Final numbered build-stage readiness gate: full PRD traceability, production hardening, complete regression, synthetic golden pilot, migration/recovery rehearsal, UAT/governance, pilot and launch planning, formal GO/NO-GO evidence, and hypercare readiness—without unauthorized production execution

---

## Prompt to Paste into Claude Code

```text
You are the principal release architect, quality leader, security lead, SRE, data-migration lead, and pilot-readiness coordinator completing the Engineering College and Autonomous Institution Operating Platform.

This is the final numbered build-stage prompt. It determines readiness and prepares controlled pilot/launch artifacts. It is not authorization to deploy production, create cloud resources, migrate real data, change DNS, publish mobile apps, contact design partners, onboard real users, send real communications, process real payments, or open the service publicly.

Before editing:

1. Read the complete `docs/product/PRD.md`, every requirement ID and acceptance criterion, launch prerequisites, design-partner discovery requirements, NFRs, role/mobile matrix, privacy/security, regulatory assumptions, and deferred scope.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, every ADR, threat model, API compatibility policy, data dictionary, metric catalog, runbook, and completion report from Prompts 00–33.
3. Inspect the entire repository: backend, web, native Android/iOS, workers, migrations, OpenAPI/generated clients, tests, test data, Terraform, CI/CD, observability, security/privacy, reports/search/AI, documentation, build artifacts, and operational tooling.
4. Run Git status and inspect all changes. Preserve valid user work and do not use destructive Git operations. Do not rewrite architecture merely to make the project appear complete.
5. Inventory available execution environments, service dependencies, macOS/native-device access, AWS/provider credentials, signing authority, and legal/design-partner approvals. Record unavailable evidence honestly.
6. Confirm Prompts 00–33 passed, were reviewed, and were committed. If any prerequisite is absent or its evidence is invalid, record it as a blocker and stop with `Completion gate: FAILED`.

Non-negotiable authorization boundary:

- Do not run Terraform apply, mutate AWS, deploy production, change DNS/certificates/secrets, execute a real cutover, migrate or delete production/legacy data, enable external AI on tenant data, publish to Play/App Store, invite external testers, contact users/partners, or incur cloud cost without separate explicit authorization.
- Do not use real people, applicants, students, employees, marks, payments, bank data, question papers, documents, messages, trips, locations, employers, credentials, or tenant records. Use deterministic synthetic data only.
- Never fabricate deployment, test, scan, pen-test, legal review, UAT, store, backup/restore, DR, load, SLO, cost, provider, migration, sign-off, or GO evidence.
- Critical or high unresolved security/correctness/data-integrity/tenant-isolation defects force NO-GO. Do not waive or relabel them to pass.
- AI may help organize evidence or suggest tests; AI cannot approve release, accept risk, sign UAT, authorize migration, or issue GO.

## 1. Freeze the candidate scope

Create a versioned release-candidate definition containing:

- immutable source revision/tag candidate
- included prompt/module/feature list
- excluded/deferred items and approved rationale reference
- backend/web/mobile/worker/IaC versions
- API/schema/event/index/mobile compatibility ranges
- environment/configuration baseline
- synthetic data version
- artifact checksums/SBOM/provenance
- known issues and risk register version
- required gates, approver roles, and evidence expiry

Do not silently add scope during hardening. New noncritical features move to the roadmap. Critical fixes require targeted regression and candidate re-baselining.

## 2. Create the PRD traceability matrix

Create `docs/product/TRACEABILITY_MATRIX.md` mapping every PRD requirement and NFR to:

- requirement ID and exact short description
- module/owner
- implementation files/components
- API/event/schema/index/report/mobile route
- authorization/RLS/audit controls
- automated/manual test IDs
- evidence path/run/build/revision
- status
- gap/limitation/approved-defer reference
- remediation/owner role/target milestone

Use only these exact statuses:

- `Implemented`
- `Partially Implemented`
- `Deferred by Approved Scope`
- `Blocked`

Never mark a stub, placeholder, TODO, static dashboard, mock-only production path, untested code, unavailable provider, unverified native platform, or undocumented manual behavior as `Implemented`.

## 3. Automate traceability validation

Add checks that fail when:

- a PRD ID is absent or duplicated
- a status is outside the four allowed values
- `Implemented` has no implementation and test evidence
- evidence revision differs from the release candidate
- an API/route/migration/role exists without mapped requirements
- a deferred item has no approved-scope reference
- a blocker lacks owner role and next action
- a required mobile role lacks Android and iOS evidence
- a security/privacy/NFR requirement is mapped only to prose

Generate summary counts by domain/status/severity without hiding blocked requirements.

## 4. Gap analysis and remediation plan

Perform evidence-based gap analysis across functional scope, data model, APIs/events, web/mobile UX, accessibility, localization, security/privacy, tenancy, performance, reliability, operations, migration, reporting, search/AI, documentation, and support.

Classify each gap by severity, likelihood, affected tenants/roles/data, release impact, dependency, remediation, regression scope, owner role, and disposition. Fix in-scope critical/high gaps; do not broaden into optional redesign.

## 5. Defect severity and release policy

Define release-blocking rules:

- Critical: exploitable cross-tenant access, credential/secret exposure, corrupt/lost official records, unsafe exam/payment/result behavior, unavailable recovery, or comparable catastrophic impact
- High: major authorization/privacy/data-integrity failure, critical journey failure, material accessibility blocker, severe performance/capacity breach, or no safe workaround
- Medium/Low: documented impact and workaround subject to product/security/operations review

Critical/high unresolved defects, flaky critical gates, or missing mandatory evidence force `NO-GO`. Risk acceptance requires named human roles, reason, compensating controls, expiry, and audit; it cannot be generated or approved by Claude.

## 6. Repository and build hygiene

Verify reproducible clean checkout/bootstrap, pinned toolchains/dependencies, documented prerequisites, no generated-source drift, no untracked required files, deterministic builds, license notices, artifact naming, and clean separation of source/test/build output.

Detect TODO/FIXME/stubs/placeholder endpoints, disabled tests, `.only`/skip, broad ignore, debug menus, mock flags, sample credentials, localhost/insecure endpoints, and unreachable code in release builds. Classify rather than blindly delete.

## 7. Full backend regression

Run all Java/Spring Boot unit, module architecture, integration, repository, API, security, workflow, event/outbox, job, document, payment, examination, report/search/AI, migration, and end-to-end tests.

Use Testcontainers or repository-standard isolated dependencies. Record commands, tool versions, duration, counts, pass/fail/skip/retry, exit code, logs/reports, revision, and environment. Skips require reason/owner/expiry and cannot cover release-critical paths.

## 8. Full web regression

Run React/TypeScript lint/type/unit/component/accessibility/visual and Playwright critical journeys for every web role/module, including authentication/context switching, role portals, workflows, reports/search/AI, error/offline-adjacent states, responsive layouts, localization, and secure web-first handoffs.

Verify real generated-client/API behavior against deterministic test backend—not only mocked components.

## 9. Full native mobile regression

Execute Prompt 31 gates for true React Native Android and iOS applications:

- unit/component/native/API compatibility
- Appium/Maestro critical journey for every PRD role
- offline/reconnect/conflict/duplicate/process death/upgrade/revocation
- push/deep links and cold/background/foreground states
- camera/document/QR/barcode/RFID where supported, biometrics, location, payments
- TalkBack/VoiceOver, accessibility, RTL/large text, low bandwidth
- low/mid/high-tier supported device classes
- secure local storage/cache/queue/download purge

Browser emulation is not iOS/Android evidence. iOS requires valid macOS simulator or physical/device-farm evidence. Missing required native evidence forces a blocked/failed gate.

## 10. Role and authorization regression

Test every PRD role and meaningful multi-role combination for:

- tenant/institution/campus/department/program/course/student/dependent/assignment/drive/site/trip/framework scope
- field/record/action projection
- navigation, API, search, analytics, reports, exports, documents, push/deep links, mobile caches, offline queues
- role/context switch purge
- revoked/expired/disabled access
- maker-checker/SoD, limits, step-up, consent, publication, retention
- platform/support no-implicit-tenant-access

Negative tests must query/action every new endpoint class. A `404`/generic denial must not leak existence through timing/count/facet/error differences.

## 11. Tenant-isolation certification

Build deterministic at-least-two-tenant fixtures with overlapping natural identifiers. Verify isolation through PostgreSQL forced RLS, application services, background workers, events/queues, object storage grants, Redis keys, OpenSearch indexes, analytics read models, embeddings/AI retrieval, reports/exports, audit, support tooling, and backup/restore procedures.

Attempt cross-tenant direct IDs, guessed keys, replayed links/tokens, batch jobs, retries, cache pollution, context switches, and platform-support paths. Any unexplained cross-tenant exposure is Critical and forces NO-GO.

## 12. Database migration certification

Validate Flyway from:

- empty database to current
- each officially supported prior release snapshot to current
- realistic synthetic volume and data edge cases
- interrupted/restarted migration where safe
- concurrent application/migrator prevention
- checksum/history integrity

Never edit applied migrations. Verify expand-contract compatibility, locks/timeouts, long transactions, disk/WAL, index creation, data backfill checkpoints, failure recovery, rollback/forward-fix, and backup prerequisite.

## 13. PostgreSQL correctness and performance

Verify constraints, foreign keys, unique/partial/check/exclusion rules, tenant keys, cascades/restricts, timestamps/time zones, currency precision, optimistic versions, indexes, partitions, statistics, and RLS on all scoped tables.

Capture `EXPLAIN (ANALYZE, BUFFERS)` only on safe synthetic environments for critical queries. Detect sequential scans, N+1, lock/deadlock risk, connection-pool exhaustion, and unbounded queries. Do not leak plans containing sensitive values.

## 14. API and event compatibility

Verify OpenAPI completeness, generated client drift, RFC 7807/error consistency, pagination, idempotency, ETags, timestamps, money, enums/reason codes, file grants, rate limits, auth responses, and deprecation policy.

Test supported web/mobile clients against the release API; unknown fields and older versions fail safely. Validate event schemas, versions, ordering/idempotency, replay, DLQ, and producer/consumer compatibility.

## 15. Security hardening

Verify authentication, MFA/step-up, session/device binding, RBAC/ABAC/RLS, SoD, secret management, encryption, headers/CSP/CORS/CSRF, SSRF, injection, deserialization, file handling, rate limits, account recovery, support access, break-glass, and audit.

Eliminate exposed secrets, unsafe defaults, verbose errors, debug/actuator endpoints, insecure TLS/HTTP, default accounts, test bypasses, open redirects, and client-side authorization assumptions. Do not weaken controls for test convenience.

## 16. Security scanning

Run pinned/configured:

- SAST for Java/TypeScript/native/IaC
- dependency/SCA and license policy
- secret scanning including history where safe
- container/image and SBOM scans
- Terraform/IaC/policy scans
- DAST against isolated test environment
- mobile binary/config/security checks
- API schema/fuzz/security tests

Record tool/database version, findings, severity, triage, false-positive evidence, remediation, retest, waiver/expiry, and exit code. Do not claim penetration testing unless qualified independent testing occurred.

## 17. Privacy and data lifecycle audit

Verify data inventory/classification, purpose/consent, minimization, field projection, retention/archive/legal hold, deletion/anonymization, exports, research datasets, external providers/models, logs/traces/analytics, nonproduction data, backups, and data-subject/institution workflows.

Confirm legal review remains a production prerequisite under applicable Indian law and institutional policy; do not claim legal compliance from code review alone.

## 18. Audit completeness and tamper evidence

Test audit events for identity/login/MFA/session/device, membership/permissions, support access, admissions, attendance, exams/papers/scripts/marks/results, finance/payments/refunds, documents/downloads/exports, HR, communications, AI, configuration, migrations, and emergency actions.

Verify actor/context/purpose/action/target-safe reference, before/after or reason as policy permits, server time, request/trace/receipt, immutability/tamper evidence, restricted viewing, retention, export, and no sensitive payload leakage. Failed/denied consequential attempts must be represented where policy requires.

## 19. Accessibility audit

Audit WCAG-aligned web and native journeys: semantic structure/roles/names/states, keyboard/focus, skip/navigation, forms/errors, dialogs, tables/charts alternatives, contrast, non-color state, zoom/reflow, large text/Dynamic Type, reduced motion, touch targets, TalkBack/VoiceOver, captions/transcripts where relevant, and scan/manual fallbacks.

Critical user journeys with blocking accessibility defects fail the gate. Record automation plus trained manual evidence.

## 20. Responsive and browser compatibility

Test supported Chromium, Firefox, and WebKit/Safari-equivalent browser versions at desktop/tablet/mobile widths for layout, keyboard, print/report, file upload/download, camera where web-supported, payment return, exam controlled-device restrictions, and role portals.

Responsive web does not replace native-mobile evidence. Define support matrix and graceful unsupported-browser message.

## 21. Localization and time-zone audit

Test supported locales, pseudo-locale, Unicode/Indian names/addresses, RTL, pluralization, long strings, dates/times/time zones, academic/fiscal years, numbers, currencies, percentages, sorting/search/transliteration, PDFs/exports, notifications, and mobile/web consistency.

Test DST and device-clock skew even if initial institutions use IST. Server time remains authoritative for exams, payments, audit, queues, and offline events.

## 22. Functional domain regression

Create/execute suites for:

- tenant/institution/identity/RBAC/workflows/documents/outbox
- academic structure/regulations/curriculum/boards
- admissions/SIS/registration/electives/degree audit/timetable
- attendance/shortage/detention/condonation
- LMS/teaching/assignments/question bank/assessments
- fees/payments/receipts/reconciliation
- examinations from application through certificates/revaluation/backlogs
- OBE/accreditation
- programming lab/secure execution
- placement/training/internships/projects/mentoring
- faculty HR
- library/hostel/transport/visitor/assets/services
- communications/portals/native mobile
- analytics/reporting/search/AI

Each suite includes happy, boundary, invalid, concurrent, duplicate, revoked, retry, audit, and cross-tenant cases.

## 23. Golden pilot dataset

Create a deterministic, resettable, fully synthetic golden dataset for a realistic B.Tech autonomous institution. Include at least:

- two tenants/institutions for isolation
- campuses/departments/programs
- one versioned B.Tech regulation with credits, prerequisites, electives, grading, progression, and OBE mappings
- academic years/terms/calendar/holidays
- complete roles/users/relationships/assignments
- synthetic applicants/students/faculty/staff/employers/assets/visitors
- edge cases: transfer/lateral entry, backlog, shortage, accommodation, fee exception, revaluation, consent/revocation, and multi-role user

Use fictional names and reserved/non-deliverable contact data. Never mimic a real college’s records without authorization.

## 24. Golden journey: tenant and academic setup

Exercise tenant/institution/campus configuration, modules/branding, identity/membership/role, academic structure, regulation/curriculum, boards/approval, course offerings, calendar, rooms/labs, faculty allocation, and timetable.

Verify audit, versioning, effective dates, conflicts, approvals, and cross-tenant denial. Configuration is executed only in synthetic test environment.

## 25. Golden journey: admission to registration

Exercise enquiry/consent/application/documents/verification/selection/offer/admission, applicant-to-student conversion, program/cohort/status, course registration, prerequisites/corequisites, electives, capacity/waitlist, and degree audit.

Reconcile one conversion per applicant, document state, fee handoff, identifiers, and rollback/error behavior without duplicate student creation.

## 26. Golden journey: timetable, teaching, and attendance

Exercise conflict-free timetable, faculty/student views, teaching plan/diary/content/assignment, standard and substituted sessions, offline mobile attendance, reconciliation/conflict/correction, shortage alerts, condonation/detention workflow, and guardian policy.

Verify attendance save target, audit, authoritative counts, no offline false success, and downstream eligibility consistency.

## 27. Golden journey: fees and payments

Exercise fee structure/demand, concession/scholarship, payment intent, untrusted provider return, signed webhook simulation, delayed/duplicate/out-of-order callback, authoritative reconciliation, ledger posting, receipt, failed/unidentified payment, refund, settlement exception, and approval SoD.

Reconcile exact currency totals and prove idempotency. Use simulators only; move no real funds.

## 28. Golden journey: examination lifecycle

Exercise exam setup/application/eligibility/accommodations/hall ticket, secure paper assignment/declaration/status, logistics/seating/duties, candidate validation/attendance/incidents, script custody/count, evaluation/marks/moderation/correction, result calculation/approval/publication, and withheld cases.

Protect confidential content. Verify maker-checker, time windows, step-up, audit, idempotency, and authoritative receipts.

## 29. Golden journey: results and completion

Exercise SGPA/CGPA/credits, grading rules/version, promotion/backlog, grade card/transcript/certificate, verification, revaluation/result change, supplementary exam, degree audit/completion, and document revocation/reissue.

Create hand-calculated approved golden expected outputs in fixtures and compare exactly. Do not derive expected results using the same production code path.

## 30. Golden journey: OBE and accreditation

Exercise CO/PO/PSO mapping, direct/indirect assessment, target/attainment computation, validation, publication, action plan, evidence repository, review, observation/nonconformity, corrective action, and restricted auditor expiry.

Validate formula versions and expected values independently. Ensure source marks remain unchanged and small-cell/privacy rules hold.

## 31. Golden journey: assessment and programming lab

Exercise question authoring/review, assessment scheduling, controlled-device policy, attempt/autosave/reconnect/submission/receipt/evaluation/analytics, and secure coding assignment/exam for C/C++/Java/Python/JavaScript/SQL as supported.

Test sandbox isolation, resource/network/filesystem limits, hidden tests, compile/runtime errors, plagiarism/similarity advisory workflow, queue fairness, timeout, worker failure, and no untrusted code execution in core services.

## 32. Golden journey: placement, projects, and campus services

Exercise training/readiness, placement eligibility/registration/drive stages/panel feedback/offer/joining; internship/project proposal/mentor/log/milestone/rubric/evidence; library circulation/fine/stock; hostel/out-pass/roll-call; transport/trip/boarding/location/SOS; visitor/badge; asset/work-order/stock/calibration; service request/document verification.

Verify consent, external-role expiry, location purpose/stop, custody, offline reconciliation, and server-authoritative outcomes.

## 33. Golden journey: analytics, search, AI, and all mobile roles

Exercise governed metric definitions/quality/freshness/lineage, role dashboards/drill-through, asynchronous report/export, authorized search/rebuild/delete, cited policy Q&A, faculty draft check, performance summary, service-ticket assistance, feature disable, prompt injection, and provider-unavailable state.

Run at least one true Android and iOS critical journey for every PRD role, including secure web-first restriction/handoff. AI output remains assistive and synthetic.

## 34. Data migration discovery and mapping

Prepare source-system discovery templates for design partner:

- source owners, systems, exports, schemas, samples, volumes, encodings, identifiers, duplicates, missing values, reference/master mapping, history, documents, opening balances, results/credits, consent/retention, and cutover windows
- source-to-target mapping, transforms, defaults, rejected/quarantine policy, provenance, and approval
- privacy/security transfer method and deletion obligations

Do not invent source formats or map a real institution without approved samples and stakeholder sign-off.

## 35. Migration rehearsal framework

Build repeatable extract/validate/stage/transform/load/reconcile/report/retry/resume/rollback tools for synthetic fixtures. Require immutable input manifests/checksums, batch IDs, idempotency, row-level errors, quarantine, provenance, audit, and restartability.

Rehearse empty and upgrade target, partial failure, duplicate file, changed mapping, interrupted load, and rerun. Production migration remains separately authorized.

## 36. Migration reconciliation and sign-off

Create reconciliation for record counts, applicants/students/employees, programs/courses/credits, attendance totals, fee demands/payments/receivables/balances, exam registrations/marks/results/backlogs, document counts/checksums, inventory/custody, and referential/orphan checks.

Define tolerances, explain every variance, source/target signed reports, owner roles, approval, and audit. No migration passes on row count alone.

## 37. Performance and capacity certification

Execute safe load/stress/soak/spike tests where environments permit for:

- login/context and role dashboard
- timetable and standard-class attendance save
- online assessment start/autosave/submit
- payment webhook/callback/reconciliation
- exam candidate validation/attendance and result processing/publication
- reports/exports/search/index/AI gateway
- coding queue/execution
- mobile sync/push registration

Model at least 25,000 active students per tenant and documented concurrent peaks without using 25,000 real users. Measure p50/p95/p99, throughput, errors, saturation, DB pools/locks, queue age, memory/CPU, cost assumptions, and recovery. Do not claim AWS scale without AWS evidence.

## 38. NFR performance gates

Verify or honestly block:

- normal interactive API p95 <2 seconds
- standard attendance acknowledgement <2 seconds
- supported-load assessment autosave <1 second
- independent scaling for assessments, code execution, reports, notifications, and file processing
- asynchronous large operations with progress/restart/download
- mobile startup/interaction/sync budgets from Prompt 31

Threshold failures require remediation or NO-GO based on severity; do not tune tests to hide them.

## 39. Resilience and chaos/failure testing

In safe isolated environments test database connection interruption/failover simulation, Redis loss, queue duplicate/out-of-order/DLQ, object-storage timeout/failure, payment callback replay/provider outage, notification outage, worker crash/timeout, report/index/AI provider failure, sandbox exhaustion, network partition, low disk/storage, and app process death.

Verify no corruption of official examination/payment records, idempotency, backpressure, retry bounds, circuit/degraded behavior, recovery, audit, alerting, and runbook accuracy. Never perform destructive chaos in production.

## 40. Backup, restore, and DR readiness

Run approved safe restore rehearsal when infrastructure is available; otherwise validate exact executable runbooks and mark empirical RPO/RTO evidence blocked.

Verify backup inventory, encryption/access, PITR/snapshots/object versions/index rebuild/config/artifacts/KMS dependencies, clean isolated target, application/schema compatibility, forced RLS, golden-data reconciliation, traffic decision, cleanup, and evidence.

Target core RPO ≤15 minutes/RTO ≤4 hours, but record observed—not assumed—values. Document multi-AZ versus regional-disaster limits.

## 41. Observability and operational acceptance

Verify structured PII-safe logs, traces, metrics, correlation, SLO/error-budget definitions, dashboards, alerts, ownership, runbook links, maintenance suppression, escalation, and evidence for API/DB/queues/payments/exams/results/notifications/sandbox/reports/search/AI/mobile/security/backups/cost.

Inject synthetic failures to prove key alerts without contacting real responders. Ensure operators can diagnose using safe IDs without privileged tenant data.

## 42. Design-partner discovery package

Create structured discovery questionnaires/workshops for regulations, grading/progression, examination governance, fee rules/payment providers, mandatory/statutory reports, accreditation, integrations, identity/SSO, data migration, roles/SoD, privacy/retention/legal, accessibility/languages, device/network constraints, SLA/RPO/RTO, dedicated tenancy, support, and pilot success criteria.

Mark all assumptions requiring institutional/legal approval. Release dates and report/regulation certification cannot be committed before discovery and signed samples.

## 43. UAT plan and sign-off templates

Create UAT by named role placeholders—not invented names—for management, principal/dean/HOD, Controller/exam branch/invigilator/evaluator, admissions, finance, faculty/mentor, student/guardian, HR, placement/employer, IQAC/auditor, campus operations, tenant IT, platform support/security.

Each script maps requirements, prerequisites, synthetic/approved migrated data, steps, expected results, evidence, defect, retest, accessibility, and sign-off. Separate product acceptance, data reconciliation, security/privacy, operations, exam readiness, finance, and mobile acceptance.

Do not sign or claim UAT on behalf of stakeholders.

## 44. Pilot plan

Prepare a limited, reversible design-partner pilot plan with:

- approved institution/campus/program/term/module/role cohort placeholders
- entry/exit/success criteria and non-goals
- discovery/config/data/UAT/training prerequisites
- environment, access, privacy/legal, support, monitoring, backup, and capacity
- parallel-run/source-of-truth strategy
- communications and consent
- issue triage/change freeze
- rollback/stop criteria and data correction
- daily/weekly review and evidence

Do not start the pilot or contact a partner. A pilot that includes official exams/payments/results requires extra command-center and rollback approval.

## 45. Examination-period command center

Create plan for readiness freeze, cycle checklist, staffing/on-call, room/device/network/provider checks, paper/logistics/custody safeguards, candidate support, autosave/submission monitoring, marks/result controls, incident severity/escalation, communications, dashboards, war-room cadence, evidence, and closure review.

Define explicit abort/manual-continuity decisions. No person, phone number, or production schedule is invented.

## 46. Support operating model

Define severity/priority, impact/urgency, SLA targets as proposals pending contract, intake channels, triage, tenant versus platform ownership, L1/L2/L3/security/vendor escalation, support-access approval, diagnostics/redaction, communications cadence, closure, knowledge base, problem management, and service review.

Create RACI with role placeholders for Product, Engineering, QA, SRE/CloudOps, Security/Privacy, DBA/Data Migration, Mobile Release, Institution Leadership, Controller, Finance, IT, and Vendor. No implicit tenant access.

## 47. Release and GO/NO-GO checklists

Create detailed checklists for:

- code/review/traceability/defects
- tests/security/privacy/legal/accessibility/performance
- migrations/reconciliation/backups/restore/DR
- infrastructure/config/secrets/DNS/certificates/capacity/cost
- provider/payment/communications/AI readiness
- web/mobile artifacts/signing/store/internal distribution
- UAT/training/support/on-call/command center
- observability/alerts/runbooks
- rollback/data correction/communications
- approvals and evidence expiry

GO requires every mandatory gate, human role sign-off, valid evidence, and explicit production authorization. Claude outputs a recommendation only: `GO`, `CONDITIONAL NO-GO`, or `NO-GO`; it cannot authorize release. Any condition required before release means the current execution remains NO-GO until revalidated.

## 48. Rollback and data-correction procedures

Create safe procedures for application halt/traffic rollback, feature/module kill switch, mobile staged-rollout halt/forward fix, database expand-contract/forward fix, migration batch rollback where supported, queue pause/replay, payment/exam/result correction workflow, document/index/report rebuild, provider disable, and tenant communication.

Never propose destructive blanket rollback of official transactions. Preserve immutable audit and original records. Define authorization, backup, blast radius, reconciliation, post-action validation, and incident review.

## 49. Launch and hypercare plan

Prepare—not execute—phases for internal readiness, design-partner configuration/migration/UAT, pilot, limited production, expansion, and steady-state handoff.

Define change freeze, readiness review, launch window criteria, staffing roles, dashboards, frequent checks, incident bridge, defect prioritization, data reconciliation, performance/cost review, daily stakeholder report template, exit criteria, backlog handoff, lessons learned, and 30/60/90-day review.

Maintain `docs/product/KNOWN_LIMITATIONS_AND_DEFERRED_ROADMAP.md` with impact, workaround, owner role, dependency, proposed milestone, and approved-scope reference. Do not promise dates without discovery/approval.

## 50. Final completion gate and report

The final numbered build-stage gate passes only when all of the following are true:

1. Every PRD requirement/NFR is present once in the traceability matrix with one of the four exact statuses and honest evidence linked to the release revision.
2. No open Critical or High security, correctness, tenant-isolation, privacy, data-integrity, payment, examination, result, migration, recovery, accessibility, or critical-journey defect remains.
3. All backend, web, Playwright, Android, iOS, Appium/Maestro, contract, migration, RLS, security, accessibility, localization, and domain regression gates pass with exact evidence.
4. Every PRD role has tested web and required native Android/iOS coverage; valid macOS/simulator/physical evidence exists for iOS.
5. Forced RLS and cross-tenant tests pass across database, APIs, workers, events, caches, storage, search, analytics, AI, exports, mobile, and support access.
6. Golden independently calculated result/credit/SGPA/CGPA/attainment cases pass exactly.
7. Payment intent/webhook/replay/idempotency/ledger/reconciliation/receipt/refund cases pass without real funds or false success.
8. Flyway clean and supported-upgrade paths, PostgreSQL constraints/index/query plans, API/event compatibility, and migration rehearsal/reconciliation pass.
9. Security/privacy/audit/scans pass agreed gates; no exposed secrets, unsafe debug path, insecure default, restricted-content leakage, or ungoverned AI action remains.
10. Accessibility, localization/RTL/time-zone, supported browser/device, low-bandwidth, and responsive/native UX thresholds pass.
11. Performance/load/soak/failure tests meet documented thresholds or honestly block release; no AWS-scale claim is made without evidence.
12. Backup/restore/recovery procedure is validated at the required evidence level, with observed or explicitly blocked RPO/RTO and regional limitations.
13. Observability/SLOs/dashboards/alerts, security/incident/exam/support/migration/rollback/data-correction runbooks, and ownership/RACI are operationally reviewable.
14. Synthetic golden pilot, design-partner discovery, UAT/sign-off, migration, command-center, pilot, GO/NO-GO, launch, hypercare, limitations, and deferred-roadmap packages are complete.
15. All blocked/partial/deferred work, unavailable cloud/macOS/provider/legal/UAT evidence, and assumptions are visible; nothing is rationalized or fabricated.
16. No production/cloud/DNS/certificate/secret/database/registry/store/provider/partner/user/payment/message/data mutation occurred without explicit authorization.
17. The final recommendation is evidence-based and human approval remains mandatory for every pilot, migration, signing, deployment, cutover, store, and launch action.

Provide the standard completion report covering:

- executive readiness summary and recommendation: `GO`, `CONDITIONAL NO-GO`, or `NO-GO`
- immutable candidate revision/artifacts/checksums/SBOM/provenance
- traceability counts and gaps by status/domain/severity
- changed files and in-scope hardening fixes
- exact backend/web/mobile/integration/security/accessibility/performance/migration/recovery commands, results, durations, counts, skips/retries, exit codes, and evidence paths
- tenant/RLS, golden results, payments, exams, migrations, OpenAPI/events, search/AI, audit, privacy, and role-coverage evidence
- Android/iOS/macOS/device matrix evidence
- load/resilience/backup/restore/RPO/RTO/SLO results and limitations
- scan findings, remediations, waivers/expiry, and independent review still required
- design-partner/UAT/migration/pilot/command-center/support/RACI/rollback/launch/hypercare artifacts
- known limitations/deferred roadmap
- deployment authorization status and all actions explicitly not performed
- manual reviews/sign-offs still required
- suggested commit message

End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`chore(release): certify full platform readiness`

Stop. This is the final numbered build-stage prompt. Do not deploy, migrate production data, change AWS/DNS/secrets, publish mobile apps, contact a design partner, begin a pilot, issue GO authorization, or launch. Any execution of those actions requires a separate explicitly authorized cutover/pilot prompt based on the approved evidence package.
```

---

## Final Review Checklist

- Every PRD requirement and NFR is honestly mapped using only the four approved statuses.
- No stub, placeholder, mock-only path, unavailable provider, or untested behavior is called implemented.
- Critical/high unresolved defects force NO-GO.
- Backend, web, Playwright, Android/iOS, Appium/Maestro, migration, security, accessibility, and full-domain regression have exact evidence.
- Tenant isolation covers RLS, APIs, workers, queues, files, caches, search, analytics, AI, exports, mobile, and support.
- Golden regulation, grades, SGPA/CGPA, credits, OBE, payments, examinations, and campus-service outcomes reconcile independently.
- Native iOS evidence comes from valid macOS/simulator or physical/device infrastructure.
- Performance/capacity, resilience, backup/restore/DR/RPO/RTO, SLO, and alert evidence is measured or honestly blocked.
- Design-partner discovery, UAT, migration rehearsal, pilot, examination command center, support, RACI, rollback, launch, and hypercare packages are complete.
- Legal, privacy, statutory-report, provider, cloud, signing, UAT, and human approval dependencies remain explicit.
- No production deployment, AWS/DNS/secret/database mutation, real-data migration, store publication, partner contact, pilot, or launch occurred.
- Claude recommends readiness but never grants GO or accepts risk.
- The completion gate and GO/NO-GO recommendation reflect actual evidence.
- Changes were reviewed and committed at a clean boundary.

After Prompt 34, use the separate Recovery Prompt for interrupted work or prepare a separately authorized pilot/cutover execution prompt only after formal human approval.
