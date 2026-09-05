# Claude Code Prompt 24

## Faculty HR, Workload, Leave, and Appraisal

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–23 passed, were reviewed, and were committed  
**Scope:** College-focused employee records, recruitment and onboarding, attendance integration, leave/permission/on-duty, academic and institutional workload, qualifications and faculty-role eligibility, goals/appraisal/feedback/improvement, payroll-input and payslip integration boundaries, faculty self-service, and role-specific web/native-mobile interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially faculty/employee records, recruitment, onboarding, attendance, leave, workload, qualifications, compliance, appraisal, feedback, training, payroll boundaries, privacy, accessibility, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, data classification/retention/privacy policy, workflow conventions, and repository standards.
3. Inspect Prompt 01 identity/RBAC/membership; Prompt 02 workflow/documents/audit/outbox; Prompt 03 departments/designations/boards/regulations; Prompt 07 timetable/course/lab/faculty allocation; Prompt 08 academic attendance patterns; Prompt 09 teaching plans/course files; Prompt 12–15 exam roles/duties/evaluation; Prompt 19 student-feedback aggregates; Prompt 22 training references; Prompt 23 guide/mentor/project workload references; Prompt 11 finance integration boundary; and Prompt 17 verified-document patterns.
4. Inspect external identity invitation, authorization/SoD, PostgreSQL RLS, OpenAPI/generated clients, object storage/malware scan, notifications/provider ports, biometric/device integration ports, background jobs/observability, accessibility/localization, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, create a competing user/department/timetable master, fabricate employment/attendance/leave/qualification/payroll/appraisal evidence, expose personal/compensation/appraisal data broadly, reveal individual student-feedback identities, make automatic employment decisions from algorithms or AI, implement statutory payroll/tax remittance, directly control biometric devices without a truthful provider port, or begin Prompt 25 campus operations.

Implement bounded `faculty-hr`, `workforce-time`, `academic-workload`, and `performance-development` modules with explicit contracts. Faculty HR owns employee/personnel records, appointments, service history, recruitment/onboarding, qualifications, compliance, and employment documents. Workforce time owns staff attendance evidence, calendars, leave, permission, on-duty, balances, and approvals. Academic workload owns versioned workload policies, source assignments, calculations, exceptions, and faculty-role eligibility evidence. Performance development owns goals, appraisal cycles, feedback aggregates, achievements, development plans, and approved outcomes. None owns authentication, academic timetable, exam allocations, project allocations, full payroll, banking, statutory filing, or student survey responses.

## 1. Domain invariants

Enforce:

- every employee/recruitment/attendance/leave/workload/appraisal record is tenant/institution scoped with forced PostgreSQL RLS
- identity accounts and HR employee records are linked but not conflated; employment does not grant application permissions automatically
- appointments, designations, department assignments, contracts, qualifications, balances, workload policies, appraisal templates, and decisions are effective-dated/versioned
- approved employment records are immutable; corrections use reasoned superseding versions
- sensitive personal, compensation, health/accommodation, disciplinary, appraisal, and background-verification data uses field/document-level authorization
- attendance provider events are evidence; interpreted attendance is reproducible from pinned rules and source versions
- leave balances use exact units and concurrency-safe ledger transactions; no direct balance overwrites
- timetable/project/exam sources are referenced and never edited through HR/workload APIs
- workload calculations expose every assignment, unit, factor, exclusion, threshold, and rule version
- workload/performance indicators are decision support, never automatic hiring, termination, promotion, pay, discipline, or appraisal decisions
- anonymous student feedback remains aggregate-only and suppressed below configured privacy thresholds
- payroll exports are approved input packages, not evidence that salary, tax, bank transfer, or statutory filing occurred
- consequential native-mobile actions require authoritative server receipts

Write a glossary covering employee, appointment, designation, cadre, service history, FTE, shift, attendance event, attendance day, permission, on-duty, leave year, accrual, balance ledger, teaching load, workload unit, overload, appraisal, goal, competency, calibration, improvement plan, payroll input, and payslip reference.

## 2. Employee master and identity linkage

Implement employee records with:

- stable employee number and linked Prompt 01 person/account/membership references
- legal/preferred name and verified contact/address fields with classification
- employment category: regular, probationary, contractual, visiting, adjunct, part-time, temporary, consultant, or configured type
- joining/confirmation/retirement/separation dates and employment status
- primary institution/campus/department/designation/cadre/grade/cost-center references
- reporting, functional reporting, and approval relationships with effective dates
- work location, shift/calendar, FTE, workload category, and faculty/non-teaching classification
- emergency contact and limited demographic/statutory identifiers only when policy/law requires them
- profile photo/signature use and consent/purpose

Do not duplicate authentication credentials or broad identity data. HR activation does not create privileges until an authorized membership/role workflow completes.

Support draft, verification_pending, active, on_leave, suspended_reference, separated, retired, deceased_reference, archived, and superseded statuses. Sensitive separation/suspension reasons remain in restricted cases, not general profiles.

## 3. Appointment, designation, and service history

Model immutable effective-dated assignments:

- appointment type and contract reference
- designation/cadre/grade/level
- department/campus/unit
- reporting manager and additional academic roles
- FTE/work schedule/workload norm
- probation/confirmation/tenure-like status where institution uses it
- transfer, promotion, deputation, sabbatical, extension, and separation references
- approval authority, order/document, effective dates, and version lineage

Validate overlapping incompatible appointments, impossible date ranges, inactive departments/designations, reporting cycles, and unauthorized retrospective changes.

Generate service-history views from approved events; never replace history with only current values. Appointment/order documents use Prompt 02 secure storage and Prompt 17 verification patterns.

## 4. Personal, banking, statutory, and emergency data boundary

Store only institution-required fields with purpose, classification, verification, retention, and access rules. Examples may include tax/national identifier references, bank-account tokenized/masked details, emergency contact, and benefits nominee metadata.

Encrypt high-risk fields with KMS-backed application-layer encryption where appropriate. Display masked values by default; full access requires explicit permission, purpose, step-up authentication, and audit.

Do not expose bank/tax/health/demographic data to department heads, timetable planners, students, general admins, analytics, logs, notifications, or AI. Payroll exports use approved field allowlists and recipient contracts.

Support employee correction requests, verification, retention/erasure where lawful, legal hold, and breach-response references. Never collect optional sensitive data merely because a form supports it.

## 5. Qualifications, experience, research, and compliance evidence

Implement versioned records for:

- degrees/diplomas/certifications and specialization
- awarding institution/issuer, year, mode, grade/class, credential reference
- teaching/industry/research/administrative experience periods
- publications/patents/projects/professional memberships as references where relevant
- faculty development/training from Prompt 22 or external verified evidence
- licenses/accreditations/compliance certificates with issue/expiry
- uploaded documents, verification source/status, reviewer, expiry, and dispute

Differentiate self-declared, institution-verified, issuer-verified, expired, rejected, disputed, revoked, and superseded. Never present a declaration as verified.

Detect overlapping experience, duplicate credentials, impossible dates, expired evidence, and missing mandatory qualification. Verification requires checklist, source, actor, and receipt.

## 6. Recruitment requisition and approval

Implement requisitions with:

- institution/campus/department/designation/employment type
- reason: vacancy, replacement, growth, compliance, temporary need, or configured category
- positions/count, FTE, workload need, qualifications/experience/skills
- job description, selection stages/panel, target dates, and owner
- approved compensation band reference with restricted access
- budget/sanction reference without implementing budgeting
- reservation/equal-opportunity policy reference where lawfully configured
- draft, review, approved, open, on_hold, filled, cancelled, expired, and archived lifecycle

Require maker-checker and prevent publication before approval. Do not infer candidate protected traits or create discriminatory criteria.

Publication to external job boards is a provider boundary. Use `NOT_CONFIGURED` when absent and never fabricate posting acknowledgement.

## 7. Candidate and recruitment workflow

Implement applicant records separately from employee records:

- application source and consent/privacy notice
- contact/profile, qualifications, experience, documents, declarations, and accommodations request route
- requisition/stage/status
- duplicate detection with human review
- screening criteria and explainable outcome
- interview/demo/research presentation schedule
- panel conflict-of-interest declarations
- versioned rubric/feedback/recommendation
- reference/background verification port and status

States: draft, submitted, screening, shortlisted, assessment, interview, selected, waitlisted, rejected, withdrawn, offer_pending, offer_released, accepted, declined, expired, onboarding, and closed.

No opaque AI fit score, facial/voice/emotion analysis, or automatic rejection. Deterministic rules must be approved, explainable, and provide correction/accommodation routes.

Restrict panel members to assigned candidates and approved fields. Independent feedback is blind to other panel feedback until finalize when configured.

## 8. Employment offer and pre-onboarding

Model versioned offers with:

- requisition/candidate/position/designation/department
- employment type/FTE/location/reporting/date
- compensation component reference visible only to authorized HR/candidate
- probation, notice, bond/service agreement, conditions, and expiry
- offer/appointment document checksum/signatory/verification
- status and acceptance/decline/withdrawal receipts

Offer corrections create a new version and require renewed acknowledgement for material changes. Do not represent selection as employment before accepted offer and approved onboarding.

Pre-onboarding checklist includes identity/qualification/experience/reference/document verification, policy acknowledgements, conflict declarations, required training, account/access request, and joining confirmation.

Background providers are truthful ports; absence or pending status cannot be fabricated as cleared. Sensitive reports are highly restricted and retained only under approved policy.

## 9. Onboarding, confirmation, transfer, and separation

Implement governed workflows for:

- employee number and HR record creation from accepted candidate
- joining documents/declarations and verification
- appointment/department/designation/reporting/FTE assignment
- orientation/policy/training checklist
- asset/access/facility requests as future Prompt 25 references
- probation goals/reviews and confirmation/extension decision
- transfer/promotion/deputation/sabbatical amendments
- resignation/retirement/end-of-contract/termination reference and approvals
- notice, handover, clearance references, account revocation request, final payroll-input boundary, and experience/service document

Do not expose sensitive separation reasons or allow HR status alone to perform destructive account deletion. Emit authorized identity-access lifecycle requests through Prompt 01 contracts.

Every transition has effective time, actor, authority, evidence, reason category, comments classification, and receipt.

## 10. Work calendars, shifts, and holidays

Implement effective-dated calendars by institution/campus/employee category:

- working days, weekends, public/institution holidays
- shifts, flex windows, grace, half-day, minimum hours, breaks
- academic vacation/non-teaching duty policy
- overnight shift handling and timezone
- special working day/compensatory-off rules
- part-time/FTE patterns and individual approved variations

Validate overlaps, gaps, DST/timezone display, cross-midnight shifts, and retrospective changes. Calendar changes produce impact preview for attendance/leave but never silently recalculate approved payroll inputs.

Academic timetable is not staff attendance. Scheduled teaching contributes workload and may inform discrepancy review, but it does not automatically prove presence/absence.

## 11. Attendance integration and evidence

Define provider-neutral ports for biometric terminals, access control, QR/mobile check-in, manual register import, and approved attendance systems:

- device/location identity and assignment
- event ID, employee reference, provider timestamp/timezone, received time, event type, and signature/checksum
- webhook/file import verification, replay protection, deduplication, and source status
- device health/sync watermark and correction acknowledgement

Never fabricate biometric/device events. Do not store raw biometric templates/images in this module. A biometric provider supplies attendance events only under institutional policy and applicable consent/law.

Manual attendance/correction requires reason, evidence, maker-checker where configured, before/after trace, and employee notification. Prevent supervisors from editing raw provider events.

## 12. Attendance interpretation

Create reproducible attendance-day results from pinned calendar, shift, source events, approved remote/on-duty/leave/permission records, and rule version.

Support present, absent, partial, late, early_departure, missing_punch, holiday_work, weekly_off_work, on_duty, remote_approved, leave, and review_required categories.

Rules cover grace, minimum hours, paired punches, cross-midnight, multiple locations, duplicate events, missed punch, partial day, and approved exceptions. Use exact duration arithmetic and explicit rounding.

Persist inputs, event references, calculated intervals, exclusions, rule paths, outcome, warnings, and semantic hash. Corrections create superseding interpretations; raw evidence remains immutable.

Do not use device/location evidence for unrelated surveillance or employee-performance scoring.

## 13. Leave types and policy

Implement effective-dated leave policy by employee category/FTE/service status:

- leave type/code and paid/unpaid/payroll-input classification
- accrual/frontload/carry-forward/lapse/encashment reference
- minimum/maximum unit and half-day/hour support
- eligibility/waiting period
- annual/monthly/event limits
- prefix/suffix/holiday/weekend rules
- consecutive leave and combination restrictions
- notice/document requirements
- manager/HR/multi-level approval
- negative balance and exception policy
- probation/notice-period/long-leave rules
- gender/family/medical/statutory leave as institution-configured policy

Software configuration is not legal advice. Preserve policy source/version/effective dates and require institutional legal/HR validation.

Detect rule conflict, impossible accrual, ambiguous precedence, and retrospective impact before activation.

## 14. Leave balance ledger and accrual

Use an append-only exact-unit ledger:

- opening/import
- accrual/frontload
- carry-forward/lapse
- approved reservation
- consumption
- cancellation/reversal
- adjustment with reason/approval
- encashment/payroll reference
- expiry

Every entry pins policy version, leave period, source request, effective/posting time, actor/job, idempotency key, and running-balance projection. Never directly overwrite balances.

Use database locking/serializable or equivalent concurrency strategy so overlapping approvals cannot overspend balance. Rebuild projection from ledger and compare with incremental state.

Accrual jobs are idempotent, checkpointed, rerunnable, and produce exception reports. Retrospective policy changes use explicit migration/recalculation versions, never silent history rewrites.

## 15. Leave, permission, remote-work, and on-duty requests

Support:

- full/half-day/hour leave
- short permission/late arrival/early departure
- on-duty for exam, university, conference, training, field visit, project, placement, or configured institutional work
- approved remote-work day where policy permits
- compensatory-off earning/use references
- cancellation, extension, return-to-duty, and correction

Request captures dates/times, timezone, type, reason category, restricted narrative, handover/substitute/affected duties, document reference, contact availability, and declaration.

Validate balance, overlap, calendar, notice, documents, combination, timetable/exam/project duties, substitute requirement, and approval chain. Conflicts produce review rather than silently changing academic schedules.

Lifecycle: draft, submitted, pending_manager, pending_department, pending_hr, changes_requested, approved, rejected, withdrawn, cancelled, partially_approved, expired, and superseded. Every decision has reason and receipt.

## 16. Approval delegation and substitute arrangements

Implement effective-dated approval hierarchy from HR/reporting relationships with authorized delegation:

- delegate identity/scope/date/reason
- no self-approval
- conflict-of-interest and SoD
- escalation on absence/SLA
- HR override only under policy with reason/audit

For teaching/lab/exam/project duties, capture proposed substitute or arrangement and send a request to the authoritative scheduling/duty module. Approval of leave does not directly reassign timetable/exam duties.

Show employee what is pending and why without exposing other employees' leave reasons. Team calendars show only permitted availability/status, not medical/personal details.

## 17. Workload source catalogue

Consume immutable approved assignments from:

- Prompt 07 lectures/tutorials/labs/course coordination and timetable
- Prompt 09 teaching plan/course-file/LMS responsibilities
- Prompt 12–15 examination, invigilation, evaluation, moderation, and committee duties
- Prompt 19 OBE/IQAC/accreditation responsibilities
- Prompt 22 training/placement duties
- Prompt 23 project/internship guide, panel, mentoring, and review workload
- approved research, consultancy, outreach, administration, admissions, accreditation, and additional assignments represented here or through defined ports

Store source ID/version/effective dates/status/workload category/unit basis. Do not duplicate or mutate the source assignment.

Reject cross-tenant, inactive, overlapping, stale, or unapproved sources. Source corrections invalidate affected workload snapshots and trigger governed recalculation.

## 18. Workload policy and calculation

Implement versioned declarative workload configuration for:

- expected workload by designation/cadre/FTE/term
- lecture/tutorial/lab/contact-hour multipliers
- course preparation, coordination, large-class, multi-section, new-course factors
- project/internship/research supervision units and caps
- exam/invigilation/evaluation/moderation units
- mentoring/advising/placement/training/accreditation/administrative units
- approved leave/sabbatical/role relief
- overload/under-allocation thresholds
- rounding stage/mode/scale
- minimum/maximum/caps and precedence

Never use arbitrary runtime scripts. Validate conflicting rules, double counting, zero/negative factors, gaps, caps, and incompatible effective periods.

Calculation persists each source assignment, quantity, factor, cap, adjustment, exact intermediate, category subtotal, expected load, actual load, variance, warnings, policy/engine/source versions, and hash.

Simulation is labeled non-official. Approved workload snapshots are immutable; changes create superseding versions.

## 19. Workload planning and balancing

Provide planning views for department/program/term:

- available faculty and effective FTE/eligibility
- assigned/unassigned course/lab/project/exam/admin duties
- expected versus planned workload
- overload, under-allocation, timetable conflicts, leave conflicts, and capacity gaps
- source assignment and qualification/compliance warnings
- proposed adjustments and impact

Do not automatically assign/reassign faculty or make employment decisions. Recommendations must be transparent and require human approval in authoritative source modules.

Workload exceptions record reason, duration, category, affected calculations, approving authority, and employee acknowledgement where policy requires. Never conceal overload through manual numeric edits.

## 20. Faculty eligibility for academic roles

Implement explainable eligibility for course instructor/coordinator, lab instructor, guide/co-guide, examiner, paper setter, evaluator, moderator, Board/committee member, mentor, and configured roles.

Use pinned criteria such as:

- active appointment/designation/department
- qualification/specialization/experience
- verified credential/compliance validity
- conflict of interest
- workload/capacity
- required training/certification
- regulation/university/institution policy
- prior assignment and cooling-period rules

Return eligible, ineligible, conditionally_eligible, pending_data, or review_required with criterion/source/version/explanation. No opaque AI suitability score.

Approved exception/waiver is linked and time/scope-bound; it does not rewrite eligibility. Source modules consume the decision reference and retain assignment authority.

## 21. Qualification and compliance alerts

Create alerts for expiring/missing credentials, required experience, appointment documents, mandatory training, background/reference status, workload evidence, or role-specific compliance.

Alerts contain safe category, due date, owner, evidence reference, severity from transparent policy, and resolution. Notifications never disclose sensitive credential/personal details on lock screens or to unauthorized managers.

An alert is not an automatic employment action. Restricted compliance cases use separate authorization, employee response, correction, and appeal.

## 22. Goals and appraisal-cycle configuration

Implement appraisal cycles scoped by institution/employee category/period with:

- purpose and policy source
- eligibility population and exclusions
- templates/sections/criteria/weights/scales
- goal-setting, self-review, manager review, peer/multi-rater input, evidence, calibration, final review, acknowledgement, and appeal stages
- reviewer hierarchy/delegation/conflict rules
- timeline, reminders, minimum evidence, privacy, retention, and release policy
- approved aggregate student-feedback input

Templates and activated cycles are versioned/immutable. Validate weights, scale direction, conflicting roles, missing reviewers, small feedback groups, and prohibited data sources.

Do not create an opaque overall AI score. If an overall rating exists, use exact transparent approved formula with visible inputs, weights, rounding, and limitations.

## 23. Goals, self-review, achievements, and evidence

Support goals with category, statement, measure, baseline, target, weight, dates, dependencies, resources, status, and evidence. Goal changes after approval require manager/employee acknowledgement and preserve prior version.

Faculty self-review includes achievements, teaching, research, projects, mentoring, service, training, challenges, support needs, and development interests, with source references where available.

Differentiate self-declared from verified achievement. Prevent unrelated private documents, student information, confidential project IP, or health details from being attached to appraisal evidence.

Evidence access is purpose-bound; appraisal documents are excluded from general search and analytics drill-down.

## 24. Manager, peer, and committee review

Implement assigned-review workflows with:

- criteria/rubric and pinned evidence
- draft autosave and explicit finalize receipt
- comments classified as employee-visible or restricted HR/committee notes
- rating/justification
- conflict declaration, recusal, reassignment, and delegation
- independent peer/multi-rater input where configured
- calibration/committee review preserving original ratings
- return/change request and immutable finalization versions

Reviewers see only assigned employees and permitted sections. They cannot see other reviewers before the configured stage or edit employee self-review/source evidence.

Prohibit generative AI from generating final ratings, disciplinary conclusions, or employment decisions. Any future assistive summarization requires a separate approved privacy/provider policy and human ownership; it is outside this prompt.

## 25. Student feedback aggregate boundary

Consume only approved Prompt 19 privacy-safe aggregate feedback with:

- instrument/version/course/period reference
- response count/rate and minimum threshold
- aggregate dimensions/scores and declared formula
- suppression status and limitations
- moderation/approval/publication status

Never expose respondent identity, individual response, free-text attribution, small-group filter, timestamps, or reidentification clues to faculty/appraisers.

Student feedback is one contextual input, never the sole automatic appraisal/employment determinant. Show response rate, population, limitations, and appeal/correction route for source issues.

## 26. Calibration, outcome, acknowledgement, and appeal

Support calibrated outcome with original and adjusted rating, criterion-level rationale, authorized committee, quorum/COI, policy/version, and full before/after trace.

Outcomes may include completed rating, development focus, recognition recommendation, training recommendation, improvement plan, or administrative referral. Promotion, compensation, discipline, and termination remain separate authorized HR decisions and cannot occur automatically.

Employee receives permitted outcome/evidence/comments, acknowledges without being forced to agree, adds response, and may appeal within configured window. Appeal uses independent reviewer/committee where policy requires and preserves all versions.

Never silently change a finalized appraisal. Correction/supersession requires reason, authority, notice, and audit.

## 27. Development and improvement plans

Implement plans with:

- evidence-based gap/development interest
- objective and success measure
- actions/training/mentoring/resources
- owner/supporter, milestones, due dates, check-ins
- employee response and accommodations route
- progress evidence and effectiveness review
- completed, effective, revised, extended, closed, or escalated status

Distinguish voluntary development plans from formal performance-improvement plans with separate permissions, notices, and policy. Do not use hidden plans or automated punishment.

Training links reference Prompt 22 programs; completion/assessment evidence remains authoritative there.

## 28. Payroll-input integration boundary

Do not implement gross-to-net payroll, statutory tax/social-security/provident-fund calculations, bank files, remittance, accounting, or legal filing.

Produce versioned approved payroll-input packages for an external/enterprise payroll system, such as:

- employee/appointment/pay-group reference
- payable/unpaid attendance/leave units
- approved overtime/overload/additional-duty/arrear/deduction reference when policy permits
- effective period and source versions
- one-time input category/amount/currency where entered by authorized HR
- masked bank/payroll identifier reference
- package checksum, maker/checker approval, export receipt, and provider acknowledgement

Use exact decimals/currencies and declarative mappings. Inputs are proposals until acknowledged by the configured payroll provider. Use `NOT_CONFIGURED`, `PENDING`, `ACCEPTED`, `PARTIALLY_ACCEPTED`, or `REJECTED`; never fabricate processing/payment.

Corrections create a new package/version and reversal/adjustment reference. Do not overwrite exported inputs.

## 29. Payslip integration boundary

Support secure import/reference of externally generated payslips:

- provider/payroll-run/employee/pay-period reference
- document checksum/version/source/received time
- gross/net/currency display metadata only when authorized
- import validation/matching/duplicates/exceptions
- employee release status and access receipt
- supersession/revocation/correction reference

Do not calculate or alter payslip amounts. Payslips are highly confidential, excluded from general search, manager views, notifications, analytics, and tenant-admin access.

Employee downloads use step-up authentication, short-lived purpose-bound URL, safe content disposition, generic notifications, watermark where policy requires, and audit.

## 30. Faculty self-service

Provide faculty access to:

- personal/employment/appointment/service summary and correction requests
- qualification/experience/document submission and verification status
- attendance calendar, raw-event-safe view, interpreted status, missing-punch/correction requests
- leave balance ledger, calendar, request/cancel/return-to-duty, approval status, and receipts
- workload sources/calculation/variance/explanation and dispute/exception request
- role-eligibility explanation and expiring compliance
- goals, self-review, evidence, outcome, acknowledgement, appeal, and development plan
- payroll-input status and payslip documents when configured
- privacy/access history and support

Show classification and source/version/as-of time. Self-service cannot edit approved records directly or expose colleague data.

## 31. Reports and privacy-safe analytics

Provide authorized versioned analytics for:

- employee headcount/FTE by approved non-sensitive dimensions
- recruitment pipeline/time-to-fill/offer acceptance
- qualification/compliance completeness/expiry
- attendance/leave balances/utilization and pending approvals
- teaching/lab/project/exam/admin workload, overload/under-allocation, and capacity
- faculty-role eligibility gaps
- appraisal cycle completion/distribution with minimum-group thresholds
- development/training actions and effectiveness
- payroll-input package/rejection status without unnecessary compensation detail

Every chart has accessible table, population, exclusions, source/version/as-of time, and definition. Prevent small-group reidentification and do not rank employees publicly.

Aggregate metrics are decision support. Do not infer productivity from presence hours, email/activity tracking, student feedback, or a single workload number.

Accreditation evidence integrates Prompt 19 through governed references without exposing personal/appraisal/compensation data.

## 32. Bulk imports, exports, and search

Bulk employee/qualification/experience/attendance/leave-opening/workload/additional-duty/payroll-input/payslip imports require schema version, dry run, validation, matching, duplicates, checksum, idempotency, partial-failure report, approval, and audit.

Search authorization applies at index/query/facet/count/row/document/download. Personal, compensation, banking, appraisal, feedback, health, background, and payslip data must not enter general search indexes.

Exports require purpose, approved field allowlist, scope, classification, maker-checker, encryption/watermark, expiry/revocation, manifest, recipient, and disclosure receipt. Prevent spreadsheet formula injection and hidden metadata.

Never create uncontrolled shared folders, permanent links, or unrestricted HR data dumps.

## 33. Notifications and communications

Use existing providers for recruitment, onboarding, document/qualification expiry, attendance exceptions, leave decisions, delegation, workload review, appraisal tasks/outcomes, development actions, payroll-input exceptions, and payslip availability.

Messages contain minimal information and generic lock-screen text. Never include sensitive reasons, health data, compensation, bank/tax identifiers, appraisal rating/comments, background findings, student feedback, payslip content, document/object URLs, tokens, or credentials.

Deep links reauthenticate/reauthorize. Respect timezone, language, quiet hours, preferences, mandatory-employment basis, opt-out where applicable, deduplication, retry, and provider acknowledgement. Do not fabricate delivery.

## 34. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- employee/profile/appointment/service/assignment/correction/version
- qualification/experience/document/verification/dispute/expiry
- requisition/candidate/application/stage/panel/rubric/offer/onboarding
- transfer/promotion/confirmation/separation/checklist
- calendar/shift/holiday/provider/device/event/import/attendance interpretation/correction
- leave policy/accrual/ledger/balance/request/approval/delegation/cancel/return
- on-duty/permission/remote/comp-off/substitute request
- workload policy/source/run/trace/approve/compare/exception/dispute/dashboard
- faculty-role eligibility/run/trace/exception/consume
- appraisal template/cycle/population/goal/self-review/reviewer/calibration/outcome/acknowledgement/appeal
- development/improvement plan/milestone/effectiveness
- payroll-input mapping/package/approve/export/status/correct
- payslip import/validate/release/access/supersede
- reports/exports/jobs/progress/audit/access review

Use role-shaped DTOs and field allowlists, bounded pagination/filter/sort, RFC 7807, optimistic versions, `Idempotency-Key`, correlation IDs, server time, exact units/currencies, privacy thresholds, rate limits, anti-enumeration, and generated web/mobile clients.

Define least-privilege permissions for employee self-service, recruiter, interview panel, verifier, HR executive/manager/head, reporting manager, department/HOD/dean/principal, attendance officer, leave approver, workload planner/reviewer, role-eligibility checker, appraisal employee/reviewer/calibrator/appeal committee, payroll-input maker/checker/exporter, payslip custodian, auditor/data protection, tenant admin, and platform health.

Enforce SoD for recruitment selection/offer, verification, appointment changes, attendance correction, leave override/adjustment, workload exception, eligibility waiver, appraisal calibration/finalization/appeal, payroll export, and payslip release. Tenant admin does not automatically see HR content.

Use transactional outbox/inbox. Events carry stable references/minimal states and never personal/contact/address, bank/tax, health, compensation, leave reason, appraisal/feedback, payslip, document content, biometric data, tokens, object keys, or signed URLs.

## 35. React web interfaces

Implement accessible responsive interfaces for:

- HR employee directory with permission-shaped fields, employee profile/service/appointment/qualification/documents/compliance/correction
- recruitment requisitions, candidates, screening, panel/interview/rubric, offer, onboarding, confirmation, transfer, and separation workflow
- calendars/shifts/provider health/imports, attendance reconciliation/corrections, leave policies/ledger/requests/approvals/delegation/team availability
- workload policy/editor/validation/simulation, source drill-down, planning/balancing, approval, exceptions, disputes, and eligibility
- appraisal template/cycle/population/goals/self-review/review/calibration/outcome/appeal/development plan
- payroll-input mapping/package/exception/export/status and payslip import/release
- faculty self-service and role-shaped leadership/privacy/audit/operations dashboards

Meet WCAG 2.2 AA intent with keyboard operation, semantic forms/tables/calendars, accessible drag alternatives, visible focus, zoom/reflow, non-color-only statuses, error summaries, localized/RTL layouts, accessible documents, clear ledger/calculation explanations, and privacy-safe masking.

## 36. React Native Android/iOS interfaces for every role

Implement true React Native interfaces with shared generated contracts/design tokens, not WebViews. Update `docs/mobile/ROLE_FEATURE_MATRIX.md` with supported, web-first, read-only, and denied capabilities.

### Faculty/Employee

- profile/appointment/service/qualification/compliance view and correction/document submission
- attendance calendar, check-in provider status where approved, missing-punch/correction, leave ledger/request/cancel/return, permission/on-duty/remote/comp-off, delegation status, and receipts
- workload assignments/trace/variance, eligibility explanation, exception/dispute request
- goals/self-review/evidence, appraisal tasks/outcome/acknowledgement/appeal, development plan, payroll-input status, and secure payslip access
- encrypted bounded offline access only to approved summaries/drafts; official submissions/approvals/download grants require server receipt

### Candidate/Applicant

- approved vacancy, application, documents, accommodation request route, stage/interview schedule, offer version, accept/decline receipt, onboarding checklist, and support
- no employee directory, other candidates, panel feedback, background reports, or internal compensation bands

### Reporting Manager/Leave Approver

- team availability without sensitive reasons, pending leave/permission/on-duty, workload conflict summary, handover/substitute status, decision/comment, delegation, and receipt
- no health document, detailed personal reason, compensation, appraisal sections, or colleague data beyond explicit permission

### HOD/Department/Program Coordinator

- department staffing/qualification/eligibility/workload/capacity, teaching/exam/project conflict, leave availability, compliance alerts, appraisal-task status, and decision queues
- approve/return workload/leave/eligibility exceptions where authorized with reason, SoD, step-up, and receipt
- no bank/tax/payslip/background/appraisal private notes by default

### HR Executive/HR Manager/HR Head

- employee/recruitment/onboarding/service/verification/compliance, attendance/leave exceptions, policy status, appraisal cycles, payroll-input/payslip workflow, access review, cases, and analytics
- consequential approval/release/override actions require step-up, reason, SoD, and receipt
- complex policy/template authoring, bulk imports/exports, encryption-key/provider configuration remain web-first

### Recruiter/Interview Panel/Verifier

- recruiter: assigned requisitions/candidates/stages/schedules/tasks only
- panel: assigned candidate packet, COI, rubric, independent feedback, finalize receipt
- verifier: assigned document/credential checklist, source/status, discrepancy, approve/return receipt
- no unrelated employee/candidate records, other reviewers before policy allows, or background/compensation content beyond purpose

### Attendance Officer/Shift Administrator

- provider/device health, safe event exceptions, missing/duplicate/unmatched queue, interpreted day, employee correction request, and authorized reasoned correction
- no raw biometric template, health/leave reason, appraisal, compensation, or general HR access

### Workload Planner/Reviewer/Academic Leadership

- policy/version status, source assignments, expected/actual/variance, overload/under-allocation, conflicts, qualification/role eligibility, simulations, approvals, and exceptions
- cannot edit timetable/project/exam sources or make automatic employment decisions

### Appraisal Reviewer/Calibrator/Appeal Committee

- assigned cycle/employee/criteria/evidence, independent review, permitted feedback aggregates, calibration trace, outcome, employee response, and appeal
- strict separation between reviewer/calibrator/appeal roles; no respondent identities, small-group feedback, compensation/bank data, or unrelated employees
- content is not cached offline by default

### Payroll Input/Payslip Custodian

- approved period/input package/exceptions/provider acknowledgement, correction/version, payslip import/match/release/status
- no statutory calculation/payment claim; sensitive values masked by default and no broad mobile exports

### Dean/Principal/Governing Leadership

- authorized aggregate staffing, recruitment, qualifications, leave/capacity, workload, eligibility, appraisal completion, development, and payroll-interface status
- no individual sensitive records merely through dashboard role; governed decision queues only

### Auditor/Data Protection/Employee Grievance Role

- purpose-scoped read-only versions, decisions, consent/notices, access/disclosure, retention, correction, appeal, and break-glass evidence
- access is time-bound/logged and content minimized

### Student

- no HR profile/attendance/leave/workload/appraisal/payroll access
- only public faculty directory fields and existing academic interactions authorized by prior prompts; student feedback remains through Prompt 19 anonymous/privacy-safe workflows

### Tenant Administrator/Platform Operations

- tenant admin: module configuration, roles, provider status, retention/access review, masked adoption; no automatic HR content access
- platform operations: service/queue/provider/storage health, latency/errors/deployment and masked correlations only; no identities, HR fields, attendance, leave, workload detail, appraisal, compensation, payslips, or documents

For all roles: encrypted platform-backed token storage; biometric re-entry only after server authentication; generic push; deep links reauthorize; remote logout/revoke; classification-aware bounded encrypted caches with expiry/purge; camera/files permission at use; screenshot/clipboard restrictions for payslips/appraisal only where OS/policy supports and without claiming completeness; localization/RTL; Dynamic Type/font scaling; screen reader; keyboard/switch support where applicable; visible focus; non-color-only states; and authoritative receipts.

## 37. Data model and PostgreSQL RLS

Add normalized tables, names adapted to repository conventions, for:

- employee/profile/sensitive field/appointment/assignment/service event/reporting relationship
- qualification/experience/certification/document/verification/compliance alert
- requisition/candidate/application/stage/panel/feedback/offer/onboarding/checklist
- calendar/shift/holiday/provider/device/event/import/attendance-day/interval/correction
- leave policy/type/rule/period/ledger/accrual job/request/decision/delegation
- permission/on-duty/remote/comp-off/substitute reference
- workload policy/rule/source/run/item/trace/approval/exception/dispute
- faculty-role eligibility policy/run/criterion/result/waiver
- appraisal template/cycle/population/goal/self-review/reviewer/rating/calibration/outcome/acknowledgement/appeal
- development/improvement plan/action/effectiveness
- payroll mapping/input package/item/export/provider receipt/correction
- payslip import/document/release/access receipt

Every tenant-owned table has non-null tenant/institution scope, scope-consistent foreign keys where practical, RLS enabled and forced, least-privilege policies, and indexes supporting predicates. Add negative cross-tenant/employee/manager/department/candidate/reviewer/payroll-role tests.

Use effective-date non-overlap constraints where practical, append-only ledgers, exact decimal/time/currency units, immutable receipts/checksums, optimistic versions, idempotency, lineage, and classification. Large/sensitive documents belong in encrypted object storage.

Flyway migrations are forward-only, rolling-compatible, restart-safe where applicable, and include backfill/validation. Never edit an applied migration.

## 38. Security, privacy, fairness, and threat model

Update the threat model for:

- cross-tenant/employee/manager/reviewer/payroll IDOR and enumeration
- personal/bank/tax/health/compensation/appraisal/payslip leakage
- biometric/provider spoofing, replay, device compromise, and mass surveillance misuse
- leave ledger race, balance manipulation, and approval bypass
- workload source/rule/exception tampering and double counting
- qualification/experience/document forgery
- recruitment bias, opaque ranking, panel conflict, and background-report misuse
- student-feedback reidentification
- payroll export/payslip import forgery, interception, and recipient error
- malicious documents/spreadsheets/XSS/formula injection
- insider/admin/break-glass/export abuse
- mobile cache/notification/deep-link/backup/screenshot leakage
- small-group analytics reidentification

Apply least privilege, forced RLS, field/document authorization, KMS-backed encryption, masking, step-up/MFA, short-lived links, rate/volume/anomaly controls, CSP/validation/encoding, malware scan, webhook signatures/replay protection, safe exports, immutable ledgers/receipts, SoD, access reviews, break-glass, retention/erasure/legal hold, and incident response.

Document fairness constraints and require human accountability. No algorithm/AI may infer protected traits or automatically decide hiring, promotion, discipline, compensation, appraisal, workload punishment, or termination.

## 39. Reliability, observability, and operations

Define SLOs for self-service, attendance ingestion/interpretation, leave balance/request/approval, workload calculation, eligibility, appraisal finalize, payroll package, payslip availability, and reports.

Instrument low-cardinality metrics/traces for provider ingestion/watermark, unmatched/duplicate events, attendance recalculation, ledger/accrual/approval conflicts, workload jobs/staleness, appraisal queues, payroll export/provider acknowledgement, payslip import/release, notifications, RLS denials, and access anomalies.

Never log identity/contact/address, bank/tax/health, leave reasons, raw device identifiers, compensation, appraisal/feedback, background reports, payslip content, documents, object keys, signed URLs, or tokens. Use masked correlations and safe codes.

Add dashboards, alerts, synthetic fixtures, attendance-provider outage/replay, leave-ledger reconciliation, workload source invalidation, appraisal confidentiality, payroll export correction/recipient error, payslip breach/revoke, access review, malicious import, backup/restore, DR, and cost/cardinality runbooks.

## 40. Tests

Add unit, property, contract, integration, RLS, end-to-end, web/mobile, security, accessibility, and representative-load tests.

At minimum test:

- employee identity linkage, appointment/effective-date/history/status and sensitive-field authorization
- qualification/experience verification/expiry/dispute and document protections
- requisition/candidate/stage/panel COI/blind review/offer/onboarding and no opaque decision
- calendar/shift/holiday/cross-midnight/timezone/DST rules
- attendance provider signature/replay/dedup/order/outage/import and raw-event immutability
- attendance interpretation golden cases, correction versioning, and no surveillance reuse
- leave policy precedence, accrual/carry/lapse/combination/half-day/hour/exact units
- concurrent/overlapping leave approvals, reservation/reversal/idempotency, projection rebuild
- delegation/self-approval/SoD/escalation and substitute-source boundary
- workload golden calculations across teaching/lab/project/research/exam/admin/leave/FTE, caps, rounding, double-count protection, source invalidation, and simulation separation
- faculty-role eligibility/waiver/qualification/conflict/workload source traces
- appraisal template weights/scales/population/goals/reviewer restrictions/calibration/outcome/acknowledgement/appeal
- anonymous student-feedback thresholds and reidentification denial
- development versus formal improvement-plan separation
- payroll input exact package/version/approval/export/provider partial rejection/correction and no payment claim
- payslip import/match/duplicate/release/supersede/step-up/access denial
- bulk import/export formula injection/malware/masking/expiry/disclosure receipts
- every web/mobile role permission and intentional denial
- Android/iOS encrypted cache/expiry/purge/generic push/deep-link auth/step-up/receipt/accessibility
- cross-tenant/employee/manager/department/candidate/reviewer/payroll-role RLS and IDOR
- canary leakage for sensitive fields/feedback/payroll/payslip/tokens/URLs in logs/events/traces/DTOs/search/analytics/notifications
- migrations, OpenAPI/generated clients, outbox/inbox, observability, backup/restore, and rolling compatibility

Required end-to-end journeys:

1. HR creates an approved requisition; candidate applies, panel finalizes independent review, offer is accepted, and onboarding creates versioned employment without automatic permissions.
2. Attendance events arrive through a verified provider and produce reproducible attendance; employee correction creates a superseding result.
3. Concurrent leave requests cannot overspend balance; approval reserves/consumes ledger units and returns receipts.
4. Leave conflict triggers a substitute request to the authoritative timetable/duty module without HR editing its data.
5. Workload aggregates teaching, labs, projects, examinations, mentoring, research, and administration with exact trace, exception, and approval.
6. Faculty-role eligibility explains qualification, experience, compliance, conflict, and capacity criteria.
7. Faculty completes goals/self-review; manager/peer/committee review and calibration preserve privacy/history; employee acknowledges/appeals.
8. Approved anonymous student-feedback aggregate is used without revealing respondents or small groups.
9. Payroll-input package receives external acknowledgement without claiming payment; externally generated payslip is securely released.
10. Cross-tenant, colleague, tenant-admin, student, and platform-operations leakage attempts fail.
11. Appropriate self-service/reviewer/HR/leadership workflows work on web, Android, and iOS with accessibility checks.

Run repository-standard checks plus exact relevant commands for Java compile/test/static analysis, React typecheck/lint/unit/E2E/accessibility, Android/iOS tests, OpenAPI generation/diff, Flyway validation, RLS/security/canary leakage, dependency/container/IaC scans, and representative batch/concurrency tests. Report commands, exit codes, skipped checks, environment limitations, and evidence. Never claim a check passed if it was not run successfully.

Load tests cover attendance ingest/recalculation, payroll-period leave accrual, synchronized leave requests/approvals, term workload rebuild, appraisal launch/finalization, payroll-input generation, payslip release, and reports. Report scale, request/job mix, infrastructure, p50/p95/p99, throughput, errors/conflicts, DB locks/connections, queue lag, cost, bottlenecks, and thresholds.

## 41. Seed/demo data

Add deterministic, obviously synthetic, production-disabled fixtures:

- employee categories, appointments, departments, designations, reporting lines, qualifications, experience, and compliance expiries
- requisitions/candidates/panels/offers/onboarding
- calendars/shifts/provider events/attendance interpretations/corrections
- leave policies/ledger/accrual/requests/delegation/concurrency edges
- workload policies/sources/runs/overload/under-allocation/exceptions and role eligibility
- appraisal templates/cycles/goals/reviews/feedback aggregates/calibration/appeal/development plans
- payroll-input accepted/partially rejected/corrected packages and synthetic payslip references

Use no real employee/candidate/student data, biometric data, bank/tax/health identifiers, compensation, credentials, background reports, payslips, provider calls, or legal documents. Seeders are idempotent and tenant-isolated.

## 42. Documentation and completion gate

Update:

- OpenAPI and generated clients
- data dictionary, statuses, permissions, classifications, retention, leave-ledger, workload, and appraisal catalogues
- HR/time/workload/performance bounded-context ADRs and integration contracts
- attendance-provider, interpretation, correction, and privacy specification
- leave policy/ledger/accrual/concurrency formal specification with golden cases
- workload/role-eligibility formula and source specification with golden cases
- appraisal/fairness/anonymity/calibration/appeal specification
- payroll-input/payslip provider contract and explicit statutory-payroll boundary
- employee, manager, HR, recruiter/panel, attendance, workload, appraiser, payroll, leadership, auditor, and support guides
- web/native-mobile role-feature matrix and accessibility guide
- privacy/fairness threat model and data-flow diagrams
- SLOs/load results/dashboards/alerts plus provider/ledger/confidentiality/payroll/payslip/import/backup/DR runbooks
- local/AWS configuration without real secrets

Completion requires all of the following:

1. HR can govern employee profiles, appointments, service history, qualifications, compliance, recruitment, offers, onboarding, changes, and separation through versioned workflows.
2. Attendance sources are verified/immutable and interpreted reproducibly without storing raw biometrics or enabling unrelated surveillance.
3. Leave policies and append-only balance ledgers support exact accrual/reservation/consumption/reversal and concurrency-safe approvals.
4. Workload calculations combine authoritative teaching/lab/project/research/exam/administrative sources with exact transparent traces, exceptions, and source invalidation.
5. Faculty-role eligibility is deterministic, explainable, source-pinned, exception-governed, and free of opaque inference.
6. Appraisal supports goals, self/manager/peer review, privacy-safe feedback aggregates, calibration, outcomes, acknowledgement, appeals, and development without automatic employment decisions.
7. Payroll integration exports approved versioned inputs and imports/releases external payslips without implementing or claiming statutory calculation/payment.
8. Sensitive personal, compensation, health, background, appraisal, feedback, banking, and payslip data is field/document authorized, encrypted/masked, excluded from general search/events/logs, and audited.
9. Every relevant role has meaningful React web and native Android/iOS workflows or explicit justified web-first/read-only/denied capabilities.
10. Every tenant table has forced RLS and cross-tenant/employee/manager/reviewer/payroll-role negative tests; SoD/privacy/fairness/audit/retention controls pass.
11. Concurrency, provider failure/replay, batch/load, accessibility, security, and canary leakage tests pass.
12. OpenAPI/generated clients, migrations, docs, ADRs, formulas, guides, dashboards, and runbooks pass every environment-available check.
13. No employment, attendance, qualification, payroll, payslip, provider acknowledgement, appraisal evidence, or student-feedback response was fabricated.
14. Prompt 25 library, hostel, transport, visitor, asset/inventory, and service-desk functionality was not implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, employees/recruitment/onboarding/appointments/qualifications/attendance/calendars/leave ledger/requests/workload/eligibility/appraisal/feedback/development/payroll boundary/payslips/analytics, web, Android, iOS, security/privacy/fairness/tenancy/RLS/SoD/audit/idempotency/retention, representative load and all exact test/scan commands/results/exit status, docs/ADRs/runbooks, limitations/unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(faculty-hr): add workforce leave workload and appraisal`

Stop. Do not begin Prompt 25 or implement library, hostel, transport, visitor, asset/inventory, or service-desk modules.
```

---

## Review Checklist Before Prompt 25

- Employee appointments, service, qualifications, and recruitment/onboarding preserve immutable versions and sensitive-field controls.
- Attendance is derived reproducibly from verified events without raw biometric storage or surveillance reuse.
- Leave uses an exact append-only ledger and concurrency-safe approvals.
- Workload and faculty-role eligibility retain every source, factor, exception, and rule version.
- Appraisal protects feedback anonymity and never automates employment decisions.
- Payroll integration stops at approved inputs and externally produced payslips; it never claims calculation or payment.
- Every relevant role has a suitable web/native-mobile workflow or intentional restriction.
- Every tenant table has forced RLS and negative isolation tests.
- No Prompt 25 campus-operations functionality was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 25 until these conditions pass.
