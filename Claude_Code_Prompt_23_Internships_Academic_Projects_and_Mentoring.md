# Claude Code Prompt 23

## Internships, Academic Projects, and Mentoring

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–22 passed, were reviewed, and were committed  
**Scope:** Internship opportunities, applications, approvals, execution and completion; minor/major/capstone projects; team and guide allocation; proposals, ethics/IP/confidentiality; milestones, reviews, artifacts, demos and reports; external mentors; marks handoff; similarity-review boundary; interventions, analytics, showcases, portfolios, and role-specific web/native-mobile interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially internships, industry engagement, academic projects, capstones, mentoring, teams, guides, reviews, rubrics, project evidence, IP/confidentiality, ethics, assessment, portfolios, accessibility, privacy, communications, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, workflow/document conventions, data-classification/privacy policy, and repository standards.
3. Inspect Prompt 03 program/curriculum/course/CO/Bloom/regulation contracts; Prompt 05 student/cohort/lifecycle; Prompt 06 registration/credits/degree-audit; Prompt 07 faculty/course/timetable/room allocation; Prompt 08 attendance; Prompt 09 LMS/assignments/course files; Prompt 10 rubrics/question definitions; Prompt 15 marks/moderation handoff; Prompt 16 results; Prompt 17 verified documents; Prompt 19 OBE/evidence; Prompt 20 assessment delivery; Prompt 21 programming workspace/similarity boundary; Prompt 22 employer/career/skills/readiness/offer references; and Prompt 02 documents/workflow/audit/outbox foundations.
4. Inspect identity/external-user invitation, authorization/SoD, PostgreSQL RLS, OpenAPI/generated clients, object storage, malware scanning, notifications/provider ports, report generation, jobs/observability, consent/retention/legal hold, accessibility/localization, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, duplicate authoritative academic/student/employer/marks data, expose confidential project or employer IP through search/analytics/AI, fabricate internship offers/completion/attendance/mentor feedback, auto-punish similarity, publish student work without explicit approval and consent, create a general-purpose Git/video/meeting provider without a truthful integration, implement payroll, or begin Prompt 24 faculty HR/leave/appraisal.

Implement bounded `internship-management`, `academic-projects`, and `mentoring` modules with explicit contracts. Internship management owns opportunity/application/institutional-approval/execution/logbook/review/completion records. Academic projects owns project definitions, teams, proposals, guides, milestones, reviews, artifacts, demos, reports, handoff, and showcase permissions. Mentoring owns project/internship mentor assignments, meetings, notes/actions, workload references, and feedback. These modules reference but do not own authoritative academics, placement jobs/offers, employee HR records, official marks/results, source repositories, meeting systems, or external employer systems.

## 1. Domain invariants

Enforce:

- every opportunity, application, internship, project, team, assignment, milestone, review, artifact, grade handoff, and analytic is tenant/institution scoped with forced PostgreSQL RLS
- academic scope, eligibility, students, faculty, employers, course outcomes, marks, and results are consumed through authoritative versioned references
- approved opportunity/project/proposal/rubric/policy versions are immutable; corrections create superseding versions
- team membership and guide assignments have non-overlapping effective periods and preserve history
- confidential/restricted IP is denied by default at API, search, index, facet/count, document, export, notification, analytics, and AI-provider boundaries
- external users receive time-bound, purpose-bound, least-privilege access only to explicitly assigned students/projects/artifacts
- milestone/review/feedback/attendance/logbook entries are attributable, versioned, and cannot be silently rewritten
- official marks are never directly edited here; an approved immutable handoff is consumed by Prompt 15
- similarity signals require human review and never automatically accuse, penalize, reject, or fail a student/team
- completion requires configured evidence and approval; elapsed dates alone never imply completion
- public/internal showcase publication requires IP clearance, institutional approval, every required owner/student consent, and a revocable published version
- analytics show exact population, exclusions, source versions, as-of time, and privacy limitations
- no native-mobile consequential action is complete until an authoritative server receipt is stored and displayed

Write a glossary covering internship, opportunity, host organization, academic supervisor, industry mentor, permission/NOC, logbook, milestone, minor/major/capstone project, proposal, team, guide/co-guide, panel, review, ethics, foreground/background IP, confidential information, embargo, artifact, marks handoff, showcase, and mentoring action.

## 2. Configuration and policy catalogue

Implement versioned effective-dated policy by institution, program, regulation, cohort, academic period, project/internship type, and course:

- internship/project eligibility and prerequisites
- minimum/maximum duration, hours, credits, attendance, milestones, and reviews
- team size and membership rules
- guide/co-guide/panel qualifications and capacity
- internal/external mentor rules
- proposal, ethics, IP, confidentiality, and document requirements
- artifact/repository/report/demo expectations
- rubric, review, moderation, marks-handoff, and completion rules
- remote/on-site/hybrid and location/risk requirements
- stipend disclosure and financial boundary
- similarity-review process
- publication/showcase/portfolio consent
- retention, embargo, confidentiality, and legal hold

Use validated declarative rules, not arbitrary executable expressions. Detect conflicts, missing precedence, impossible team sizes, workload over-allocation, incompatible dates, missing evidence, prohibited classifications, and circular approvals before activation.

Lifecycle: draft, review, approved, active, retired, and superseded. Activated policies are immutable and every decision pins the exact version.

## 3. Internship opportunity catalogue

Model opportunities with:

- host/employer organization and verified contact reference from Prompt 22
- title, domain, description, responsibilities, required skills, capacity, mode, locations, work schedule, duration, dates, and application deadline
- program/branch/cohort/academic prerequisites and approved readiness references
- paid/unpaid and stipend currency/amount/frequency metadata, clearly employer-declared
- expenses/accommodation/transport/insurance/safety declarations as metadata, not guarantees
- required documents/questions and selection stages
- confidentiality/IP/NDA/background-check requirements
- accessibility/accommodation contact/process
- academic-credit applicability and course/outcome mappings
- source/provenance, owner, reviewer, approver, status, and version history

Support institution-sourced, student-sourced, employer-sourced, faculty/research-sourced, and government/program opportunities with truthful provenance.

Verify organization/contact, dates, role, capacity, safety/risk checklist, agreements, and material terms before publication. Do not certify legitimacy, safety, employment, stipend payment, or visa status beyond verified evidence.

Material changes create a new version, impact registered/selected students, require notice and renewed acknowledgement/approval where necessary, and preserve withdrawal options.

## 4. Eligibility and application

Evaluate eligibility through pinned Prompt 22 declarative eligibility contracts and academic sources, with internship-specific criteria such as prerequisites, credits, schedule conflicts, prior internship limits, skill evidence, and host requirements.

Produce eligible, ineligible, conditionally_eligible, pending_data, or review_required with criterion-level explanation, source/version/as-of value, missing/stale data, policy/opportunity/engine version, and appeal/correction route. Never use opaque AI ranking or protected-trait inference.

Application workflow:

1. Student views approved opportunity/version, terms, risks, requirements, privacy, and exact employer data sharing.
2. Student selects a career-profile/resume/document version from Prompt 22/17.
3. Student answers purpose-bound questions and provides granular consent.
4. Student submits idempotently and receives a receipt.
5. Institution/employer performs governed screening/selection.
6. Student accepts/declines selection under configured deadline.

Support draft, submitted, under_review, shortlisted, waitlisted, selected, rejected, withdrawn, accepted, declined, expired, and superseded states. Preserve decisions, reasons, actor, time, and versions.

## 5. Student-sourced internship approval

Allow a student to request approval for an externally obtained internship with:

- organization/contact verification request
- offer letter and terms
- role, domain, mode, location, dates, schedule, duration, stipend metadata
- learning objectives, course/CO mapping, proposed academic supervisor
- NDA/IP/confidentiality and safety/risk declarations
- required parent/guardian acknowledgement only where policy/law applies
- conflict with timetable/exams/other internships

Use Prompt 02 secure documents and Prompt 22 employer verification. Approval states: draft, submitted, verification_pending, faculty_review, department_review, changes_requested, approved, rejected, withdrawn, and expired.

Approvers cannot rewrite the student's/host's documents. Changes require a new submission/version. Approval means academic/institutional permission, not a guarantee of host conduct or stipend.

## 6. Institutional approval and pre-start checklist

Before activation verify configured requirements:

- eligible student and accepted opportunity
- verified host/contact and active agreement where required
- offer/permission/NOC/undertaking/NDA/insurance/safety documents
- approved dates, mode, location, work schedule, duration, academic credits
- academic supervisor and industry mentor assignments
- learning objectives, outcomes, milestone/review plan, logbook/attendance policy
- consented data sharing and emergency/escalation contacts
- conflicts with classes/exams/projects
- accommodations and safeguarding requirements handled privately

Generate versioned permission/NOC documents only from approved data/templates with checksum, signatory workflow, verification reference, and revocation/supersession status. Do not fabricate signatures or government/university acceptance.

## 7. Internship agreement and lifecycle

Create an immutable internship agreement snapshot pinning student, host, opportunity/offer, dates, mode/location, schedule, objectives/outcomes, supervisors/mentors, milestone/review/logbook policy, stipend metadata, confidentiality/IP, safety contacts, documents, and approvals.

Lifecycle:

- approved_not_started
- active
- temporarily_paused
- extension_requested
- extension_approved
- change_requested
- transferred
- withdrawn
- terminated_by_host
- terminated_by_institution
- completed_pending_review
- completed
- incomplete
- failed_requirements
- archived
- superseded

Changes to dates, location, mode, role, host, supervisor, mentor, objectives, confidentiality, or credit require impact review, versioned amendment, approvals, and student/host acknowledgement.

Do not delete history after withdrawal/termination. Restrict sensitive reason text and provide student response/appeal where policy requires.

## 8. Attendance, hours, and logbook

Implement internship evidence:

- workday/date, planned/actual hours, mode/location category, task/activity, learning/reflection, skill/outcome mapping, attachment/reference, and status
- daily/weekly entries depending on policy
- student draft/submit, mentor verify/return, supervisor review
- corrections as new versions with reason
- leave/absence/holiday/remote day and makeup categories
- cumulative hours and requirement progress using exact rules

Do not collect continuous GPS/location, background tracking, private messages, or device surveillance. Location evidence, if required, must be minimal, explicit, policy-backed, consented, and have an alternative.

Host attendance imports require schema/version, checksum, matching, dry run, per-row errors, idempotency, and reviewer acknowledgement. Never overwrite student logbook silently.

Attendance/hours are evidence, not proof of learning. Completion combines configured independent evidence.

## 9. Internship milestones, reviews, and feedback

Support configured milestones such as induction, learning-plan approval, periodic report, faculty visit/check-in, midterm review, final deliverable, host evaluation, student feedback, and completion report.

Each milestone has versioned requirement, due date, owner, reviewer, evidence types, rubric/checklist, dependencies, status, reminders, escalation, extension, and approval.

Review sources:

- student self-review/reflection
- industry mentor/supervisor evaluation
- academic supervisor review
- faculty visit/check-in record
- panel/final review
- host/student program feedback through privacy-safe survey contracts

Separate facts, rubric ratings, private mentor notes, student-visible feedback, and restricted risk/safety notes. External mentors cannot see internal marks deliberation or unrelated academic data.

## 10. Internship incidents, welfare, and changes

Provide confidential workflows for unsafe conditions, harassment/discrimination report routing, accident, work mismatch, non-payment report, excessive hours, mentor unavailability, confidentiality concern, data/security issue, attendance dispute, health/accessibility concern, withdrawal, and host termination.

Do not attempt to replace emergency, Title IX/POSH, legal, insurance, or HR case systems. Route to institution-configured authorized contacts and preserve minimal case references with strict access.

Support immediate safety instructions configured by institution, acknowledgement, case owner, SLA, evidence, interim action, student support, host communication, outcome, appeal, and legal-hold/retention.

Never expose sensitive cases in general dashboards, notifications, employer views, analytics, AI, or mentor notes. Platform operations see health only.

## 11. Internship completion and certificate evidence

Completion engine evaluates pinned policy against:

- approved effective dates/duration/hours
- required logbook/attendance evidence
- completed milestones/reports/deliverables
- mentor/host evaluation
- academic supervisor/panel review
- student feedback/reflection
- incident/hold status
- marks-handoff readiness where applicable

Produce complete, incomplete, pending_evidence, review_required, or failed_requirements with criterion trace, sources, versions, and explanation. No automatic completion from end date.

Store host certificate/experience letter as a verified/unverified document reference. Institution completion certificate generation requires approved completion, versioned template, checksum, signatory, verification URL/QR through Prompt 17, and no false host endorsement.

## 12. Academic project definitions

Implement minor, mini, major, capstone, interdisciplinary, industry-sponsored, research, community/service-learning, and configurable project types.

Project definition versions include:

- course/program/regulation/academic period/credits
- purpose, scope, expected outcomes, CO/PO/PSO/Bloom mappings
- individual/team mode and min/max team size
- proposal/problem-statement process
- guide/co-guide/external mentor/panel requirements
- milestone/review/demo/report/repository/artifact expectations
- ethics/IP/confidentiality/data classification
- rubric/scoring/moderation/marks-handoff
- publication/showcase rules
- prerequisites, eligibility, dates, workload units, retention, and status

Lifecycle: draft, review, approved, active, completed, archived, cancelled, and superseded. Do not create a competing course/curriculum master.

## 13. Problem statements and project sourcing

Support problem statements sourced by faculty, students, industry, research groups, community organizations, competitions, or institution.

Capture:

- title, abstract, context, objective, expected outcomes/deliverables, domain, skills, prerequisites, constraints, success criteria
- sponsor/owner/contact references
- team capacity and eligible programs
- resources/budget/lab/data/device requirements as references
- background/foreground IP expectations
- confidentiality/embargo/publication classification
- ethics/safety/regulatory/data-protection checklist
- provenance, license, approval, version, and expiry

Do not scrape or publish external problems without rights. Industry problems require verified sponsor authority and agreement. Restricted problem details appear only to authorized eligible users under acknowledgement/NDA policy.

## 14. Team formation and membership

Support institution-assigned, student-proposed, preference-based, or approved rule-assisted team formation. Do not use opaque AI personality/ability ranking.

Enforce:

- min/max members
- one active team per scoped project course unless policy allows otherwise
- eligible enrolled students and compatible scope
- invitation/accept/decline/expiry receipts
- student preferences with privacy
- team lock deadline
- diversity/interdisciplinary rules only when lawful, transparent, approved, and not based on inferred protected traits
- no self-approval of restricted changes

Membership lifecycle: proposed, invited, accepted, declined, active, leave_requested, removal_requested, changed, withdrawn, and completed. Every addition/removal/transfer after lock requires reason, impact on contributions/marks/IP, student responses, faculty/coordinator approval, and effective date.

Never erase former membership or attribute later work automatically. Preserve contribution evidence and dispute route.

## 15. Guide, co-guide, mentor, and panel allocation

Allocate internal guides/co-guides and external/industry mentors using:

- qualification/domain/department eligibility
- active employment/appointment reference
- declared interests/expertise
- current project/internship load and configured maximum
- conflicts of interest
- availability and project type
- student preference where allowed

Prompt 24 will own authoritative faculty HR/workload. This prompt records project/internship workload units and exposes approved assignment references; it must not build employment appraisal or leave management.

Use transparent allocation rules plus human review. Support invitation/accept/decline/reassign, temporary substitute, co-guide, and panel assignment with effective dates. Prevent over-allocation unless approved exception records reason and authority.

External mentor access is verified, MFA/time-bound, project/internship scoped, and automatically expires. External mentors cannot browse students, teams, academics, marks, other organizations, or confidential artifacts outside assignments.

## 16. Proposal lifecycle

Implement proposal with:

- title/abstract/problem/objectives/scope
- literature/context summary and source references
- methodology/architecture/work plan
- deliverables/success criteria
- team roles/contribution plan
- schedule/milestones/resources/budget reference
- data sources, privacy/security, ethics/safety, environmental/social considerations where applicable
- IP ownership, licenses, third-party components, confidentiality, sponsor approval, and publication intent
- guide/mentor declarations and conflicts
- attachments through Prompt 02

Lifecycle: draft, team_review, guide_review, changes_requested, department_review, ethics_or_ip_review, approved, rejected, withdrawn, superseded, and locked.

Comments are anchored/versioned and resolutions recorded. Approved proposals are immutable; scope changes use a change request with impact on milestones, ethics/IP, workload, deliverables, and assessment.

## 17. Ethics, safety, privacy, and regulatory review

Add configurable screening—not a substitute for an Institutional Ethics Committee/IRB—for projects involving:

- human participants, surveys/interviews, minors, health/biometric data
- personal/confidential/regulated datasets
- animals/biological/chemical/electrical/mechanical hazards
- drones/vehicles/IoT/location/surveillance
- cybersecurity testing, malware, vulnerability research, or dual-use work
- external systems/APIs/data terms
- environmental/community impact

Outcomes: not_required, self_check_complete, specialist_review_required, changes_requested, approved_with_conditions, approved, rejected, expired, and suspended.

Record reviewer authority, policy/version, consent/information-sheet references, data minimization/security/retention, conditions, expiry, adverse event/change reporting, and approval document.

Block applicable work/data collection/publication until required approval. Never fabricate ethics approval or infer that software validation equals legal/regulatory approval.

## 18. IP, confidentiality, licensing, and embargo

Classify each problem/project/artifact:

- public
- institution_internal
- team_private
- sponsor_confidential
- restricted_research
- embargoed_until_date
- legally_held

Capture background IP owners/licensing, foreground IP ownership expectations, contributor attribution, third-party/open-source licenses, patent/disclosure reference, NDA/agreement, sponsor review rights, publication constraints, and embargo.

Require explicit IP/confidentiality acknowledgement by team, guide, external mentor, panel, and authorized viewers as configured. Acknowledgement does not transfer rights by itself.

Enforce classification at object storage, previews, search/index, analytics, exports, notifications, mobile cache, provider/AI boundary, and showcase. No confidential content goes to general full-text/vector search or external AI services.

## 19. Project workspace and artifacts

Provide metadata/references for:

- proposal and project charter
- requirements/design/architecture
- source-code repository URL/reference and pinned commit/release metadata
- datasets/models/notebooks/builds
- hardware/CAD/media/demo references
- meeting/minutes/action records
- milestone submissions
- poster/presentation/demo/final report

Do not implement a general Git hosting, CI/CD, large-model registry, or video platform. Integrate through truthful provider-neutral ports and verified webhook/status references; use `NOT_CONFIGURED` when absent.

Artifacts use Prompt 02 secure object/document storage with version, checksum, MIME/size, malware scan, classification, owner, contributor, license, retention, and access. Reject unsafe active content, archive bombs, path traversal, and public object links.

Large uploads are resumable/idempotent with progress, checksum, retry, quarantine, receipt, and mobile-aware handling. Never claim uploaded/verified until server acknowledgement.

## 20. Milestones and change control

Implement configurable dependency-aware milestone plans:

- proposal approval
- requirements/literature review
- design
- prototype
- implementation/data collection
- testing/evaluation
- review presentations
- demo
- report/thesis
- sponsor handoff
- final submission

Each milestone pins requirement/version, owner, contributors, due date, dependencies, artifact checklist, rubric/reviewer/panel, status, extension, comments, and receipt.

States: planned, open, submitted, under_review, changes_requested, approved, rejected, overdue, waived_by_approval, superseded, and cancelled.

Extensions/waivers/scope changes require reason, evidence, affected downstream dates/reviews/marks, student response, guide/coordinator approval, and immutable history. Bulk changes require preview and notification control.

## 21. Mentoring meetings, notes, and actions

Support scheduled/ad hoc guide/mentor meetings with:

- agenda, date/time/timezone, mode/location/meeting reference
- attendees and attendance acknowledgement
- progress summary, decisions, risks/blockers
- action items with owner/due date/status
- next meeting
- attachments/references
- visibility classification: team-visible, guide-only restricted, coordinator case reference

Do not allow secret employment/disciplinary profiling in ordinary mentor notes. Sensitive welfare/conduct issues route to authorized case workflow with minimal reference.

Meeting providers are integration ports; do not fabricate creation/attendance/transcript. Recording/transcription is off by default and outside scope without explicit policy/consent/provider.

Track mentor response time, meeting completion, action aging, and load without turning activity counts into automatic performance appraisal.

## 22. Progress, risks, interventions, and disputes

Provide structured risks for schedule, scope, technical, dependency, data, resource, team, mentor, sponsor, ethics, IP, safety, and quality with likelihood/impact, owner, mitigation, due date, status, and evidence.

Generate transparent flags for overdue milestones, missing evidence, inactivity, repeated return, unresolved actions, workload gaps, ethics/IP expiry, or sponsor dependency. Flags are prompts for human review, not automatic failure or blame.

Interventions include meeting, revised plan, resource support, training, team mediation, guide change, scope adjustment, extension, or specialist referral with reason, student/team response, owner, review, and effectiveness.

Support contribution/team/guide/feedback/mark/ownership disputes with confidential evidence, responses from affected parties, conflict-of-interest controls, decision, appeal, and immutable history. Do not expose private disputes to external mentors or general dashboards.

## 23. Reviews, panels, rubrics, and demos

Implement review events with:

- type, stage, schedule/timezone, room/meeting reference
- assigned panel with eligibility/conflict declarations
- submitted artifact/version cutoff
- pinned rubric and criterion weights
- presentation/demo/Q&A evidence references
- independent panel draft ratings/comments
- blind-to-other-rater policy until finalize
- variance/consensus/moderation/adjudication
- student-visible feedback release policy

Separate panel observation, rubric score, recommendation, and final academic decision. Use exact decimal scoring and explicit rounding.

Demo environments/URLs/credentials are never stored in notifications or public metadata. A demo failure caused by platform/provider incident is distinguished from project failure and uses governed reschedule/remedy.

## 24. Marks calculation and handoff

Implement deterministic calculation from approved milestone/review/rubric/viva/mentor evidence according to pinned course policy:

- criterion and reviewer contributions
- individual versus team components
- contribution/viva distinctions
- internal/external/panel weights
- late/waiver/absence policy references
- moderation/adjudication result
- exact rounding stage/mode/scale

Persist operands, intermediate values, source/rubric/policy versions, exclusions, marks, maximum, warnings, and semantic hash.

Create immutable `marks_handoff` packages to Prompt 15 with student/course/assessment component, value, maximum, source calculation/version, approval, and idempotent acknowledgement. Prompt 15 owns official mark entry/freeze/correction. A rejected/stale handoff is corrected through a new version, never direct database edits.

Team marks are not automatically identical when approved individual criteria exist. Any differentiation must be evidence-based, transparent to authorized reviewers, and appealable.

## 25. Final report, completion, and archival

Project completion evaluates configured evidence:

- approved proposal and changes
- required milestones/reviews/demo
- ethics/IP/confidentiality compliance
- required repository/artifact/report versions
- guide/panel/sponsor approvals
- similarity case resolution where applicable
- marks handoff acceptance
- team contribution/dispute status
- publication/embargo decision

Return complete, incomplete, pending_evidence, review_required, or failed_requirements with criterion trace. End date alone is insufficient.

Generate a versioned project dossier/course-file evidence package by reference, with manifest/checksums/classification/access. Archive preserves retention/legal hold/embargo and source lineage without copying unrestricted confidential data.

## 26. Similarity and originality boundary

Reuse the Prompt 21 provider-neutral similarity contract for source and define equivalent ports for reports/documents where approved. Include engine/version, corpus scope, exclusions, matched regions, score meaning, limitations, receipt, and deletion policy.

Exclude approved templates, common boilerplate, team-owned prior versions, cited sources, and authorized shared components according to transparent policy. Cross-tenant/cross-sponsor comparison is prohibited without explicit lawful/contractual authorization.

Signals create restricted human-review cases with student/team response, guide input, authorized evidence, decision, appeal, and audit. Never automatically reduce marks, fail, accuse, or publish a similarity number. Do not send confidential IP to external providers without explicit approval and compatible terms.

## 27. External mentor and sponsor feedback

External mentors/sponsors can access only assigned internship/project, minimal participant identity, approved artifacts, milestones, evaluation forms, and communications during an active access window.

Support versioned feedback forms/rubrics, draft/finalize receipt, return/correction as a new version, and institution review. Distinguish employer/sponsor statement from institution verification.

Prevent mentors from viewing academic records, other reviews, internal marks, disputes, accommodations, sensitive incidents, unrelated teams, or other sponsor data. Downloads are purpose-bound, time-limited, watermarked/classified where appropriate, and audited.

On completion/termination/reassignment, revoke sessions, links, cached/offline access, and pending grants; record deletion/retention acknowledgement where agreements require it.

## 28. Showcase, portfolio, and publication

Implement publication request for approved outputs:

- title, abstract, team/contributor attribution preference
- approved media/artifact/report/demo/repository links
- classification/IP/license/third-party rights
- sponsor/guide/institution/ethics/patent clearance
- embargo and takedown contact
- each required student's granular consent, including name/photo/contact choices
- accessibility metadata/captions/alt text
- publication audience: internal, authenticated community, or public

Publication creates a sanitized immutable public version separate from the confidential working record. Reviewers verify that no secrets, personal data, employer confidential content, unsafe executable, hidden comments/metadata, or restricted datasets remain.

Consent withdrawal, IP dispute, security issue, or sponsor/legal request can unpublish future access while preserving restricted audit. Search engines/cache cannot be guaranteed to erase prior public copies; explain this before consent.

Prompt 22 career portfolios reference only approved publication versions. Never publish by default.

## 29. Analytics and reporting

Provide privacy-safe versioned analytics for:

- opportunity pipeline, applications, selection, approvals, active/completed/incomplete internships
- host/domain/location/mode/duration/stipend metadata with declared definitions
- logbook/hours/milestone/review completion and aging
- project type/domain/team size/guide load/panel load
- milestone delays, risk categories, interventions, dispute aging, and completion
- rubric/CO/PO/PSO/skill evidence and marks-handoff status
- external mentor response/feedback completion
- showcase/publication/consent/embargo status
- student/cohort/program trends with minimum-group privacy thresholds

Every chart has an accessible table, population, exclusions, source/version/as-of time, and no misleading axis. Do not rank faculty/mentors/students automatically, expose confidential titles/content, or reveal small groups.

Accreditation evidence integrates Prompt 19 through governed immutable references. Reports must not claim statutory/accreditation compliance unless tied to an approved framework/template version.

## 30. Search, bulk operations, and exports

Search authorization applies at index, query, facet/count, row, artifact, preview, and download. Confidential/embargoed content is absent from general indexes; use a separate permission-aware metadata index only if justified.

Bulk opportunity/team/guide/milestone/review/import/export operations require schema version, dry run, validation, duplicate/matching controls, idempotency, partial-failure report, maker-checker for consequential changes, and audit.

Exports require purpose, field/artifact allowlist, classification, consent/IP/embargo checks, approval, manifest/checksums, encryption/watermark, expiry/revocation, and access receipt. Never create uncontrolled shared folders or permanent public links.

Spreadsheet exports/imports prevent formula injection. PDF/archive generation strips hidden metadata and blocks path traversal/archive bombs.

## 31. Notifications and communications

Use existing providers for opportunity, application, approval, start, logbook/milestone due, review/demo, mentor action, risk/intervention, changes, completion, handoff, and publication updates.

Messages contain minimal non-sensitive information. Never include confidential problem/project titles/content, student/employer personal data, sensitive incident/dispute details, marks before release, similarity findings, source/artifact links, credentials, object keys, or signed URLs.

Push lock-screen text is generic and deep links reauthenticate/reauthorize. Respect timezone, language, quiet hours, preferences, mandatory basis, deduplication, retry, and provider acknowledgement. Do not fabricate delivery or meeting creation.

## 32. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- policy/configuration/validate/simulate/review/activate/compare
- opportunity/version/review/approve/publish/search
- eligibility/application/consent/withdrawal/selection/receipt
- student-sourced request/verification/approval/NOC/agreement/amendment
- internship/start/status/logbook/hours/attendance/milestone/review/incident/change/completion/certificate
- project definition/problem statement/version/review/approve
- team/proposal/membership/invitation/change/dispute
- guide/co-guide/mentor/panel allocation/workload/COI/reassign
- ethics/IP/classification/license/NDA/embargo review
- workspace/artifact/upload/reference/version/access
- milestone/extension/change/review/rubric/demo/feedback
- marks calculation/handoff/status/retry/supersede
- similarity request/provider receipt/case/response/decision
- mentoring meeting/action/risk/intervention
- showcase/request/consent/clearance/publish/unpublish
- dashboards/reports/search/export/jobs/progress/revoke

Use role-shaped DTOs, strict field/content allowlists, bounded pagination/filter/sort, RFC 7807, optimistic versions, `Idempotency-Key`, correlation IDs, server time, upload limits, privacy thresholds, anti-enumeration, and generated web/mobile clients.

Define least-privilege permissions for student, team lead/member, academic supervisor/guide/co-guide, industry mentor, host contact, internship coordinator, project coordinator, HOD/program coordinator, ethics/IP reviewer, panel/examiner, marks-handoff maker/checker, similarity reviewer, showcase publisher, document verifier, mentor, auditor/data protection, tenant admin, and platform health.

Enforce SoD for opportunity/policy approval, student-sourced internship approval, sensitive change/termination, ethics/IP approval, team change after lock, guide exception, panel finalization, marks handoff, similarity decision, and public publication. Tenant administrators/platform operations have no automatic content access.

Use transactional outbox/inbox. Events contain stable references/minimal state and never student/mentor/contact identity, confidential title/content, source/artifacts, logbook text, feedback/notes, incidents/disputes, marks, similarity data, object keys, signed URLs, or access tokens.

## 33. React web interfaces

Implement accessible responsive interfaces for:

- internship opportunity catalogue/detail, eligibility, application/consent, student-sourced approval, document/NOC, active internship, logbook, hours, milestones, reviews, change/incident/support, completion, and certificates
- coordinator opportunity/approval/host/mentor/workload/active/completion dashboards
- project definition/problem bank, team formation, proposal editor/review, guide/panel allocation, ethics/IP/classification, milestones, workspace/artifacts, reviews/demo, marks handoff, completion/archive
- guide/mentor meeting/actions/risks/interventions and workload
- external mentor restricted internship/project/logbook/milestone/artifact/feedback portal
- panel rubric/review/moderation and coordinator decision queues
- similarity restricted cases and student/team response
- showcase clearance/consent/sanitization/publication/takedown
- privacy-safe analytics, governed evidence, reports, exports, access logs, and audit

Meet WCAG 2.2 AA intent with keyboard operation, semantic forms/tables/boards, accessible drag alternatives, visible focus, zoom/reflow, non-color-only states, screen-reader announcements, accessible document/media requirements, localized/RTL layouts, and clear consent/classification/receipt language.

## 34. React Native Android/iOS interfaces for every role

Implement true React Native interfaces using shared generated contracts/design tokens, not WebViews. Update `docs/mobile/ROLE_FEATURE_MATRIX.md` with supported, web-first, read-only, and denied capabilities.

### Student/Team Member

- discover/view approved internships, eligibility, application, exact data sharing, consent, withdrawal, selection acceptance, and receipts
- submit student-sourced internship request, scan/upload approved documents, view NOC/approval, log work/hours/reflections, submit milestones, request changes/extensions, report confidential concern, view reviews/completion
- project team invitation/acceptance, proposal, tasks/actions, milestones, artifact upload/reference, meeting, risk, review/demo, feedback, marks-handoff status, dispute/appeal, and completion
- showcase preview, per-field/media consent, publish status, and withdrawal/takedown request
- encrypted bounded offline drafts for logbook/proposal/action/source-neutral metadata; official submit/share/publish requires server receipt

### Academic Guide/Co-guide/Faculty Supervisor

- assigned internships/projects, student/team progress, logbook/milestone review, proposal/comments, meetings/actions, risks/interventions, artifacts, rubric/reviews, lab/course evidence, completion recommendation
- accept/decline/reassign request, approve/return/verify where authorized with reason and receipt
- no unrelated employer confidential work, private incidents, or marks editing

### Industry Mentor/Host Supervisor/Sponsor

- time-bound assigned participants/projects, approved objectives, schedule, logbook verification, milestones/artifacts permitted by classification, meetings, feedback/rubric, change/completion confirmation
- no academic history, other teams/hosts, internal marks, confidential disputes/incidents, or unrestricted downloads
- offline storage of confidential artifacts/feedback denied by default; access expires/revokes remotely

### Internship Coordinator/Placement Liaison

- opportunity/host verification status, applications, approvals, NOCs, active internships, mentors, milestones, incidents/escalations, amendments, completion, certificates, and aggregate reports
- review/approve/return/change/terminate/complete with SoD, step-up, reason, and receipt
- bulk imports/exports, policy authoring, agreements, and sensitive cases remain web-first

### Project Coordinator/HOD/Program Coordinator

- definitions/problems, team/guide/panel allocation, proposals, ethics/IP status, milestones/reviews, workload, risks/interventions, marks handoff, completion, showcase, and analytics
- authorized approval/exception/change/moderation/handoff/publication actions with step-up and receipt
- confidential artifacts only when separately authorized

### Panel Member/Examiner/Viva Reviewer

- assigned schedule, COI declaration, permitted proposal/artifact/version, rubric, independent draft, finalize, variance/moderation, feedback, and receipt
- no other-panel ratings until policy permits, unrelated teams, or restricted source data

### Ethics/IP/Data Protection/Similarity Reviewer

- assigned checklist/case, policy/source versions, necessary classified evidence, conditions/comments, student/team response, approve/return/reject/expire/suspend/decision, and audit
- no general portfolio browsing; content never cached offline and access is purpose/time-bound

### Faculty Mentor/Advisor

- assigned advisee milestones, risks, actions, intervention, completion, and approved readiness/career references
- cannot view confidential sponsor IP, private review notes, or change project/marks without role authority

### Dean/Principal/Academic Council/Leadership

- institution/program opportunity, active/completion, guide/panel load, risk, ethics/IP, marks-handoff, outcome, showcase, and governed decision summaries
- no student private logbooks, confidential IP, mentor notes, incidents, or similarity content by default

### OBE/IQAC/Accreditation Role

- approved aggregate CO/PO/skill, internship/project completion, industry-feedback, and Prompt 19 evidence references with population/exclusions/version
- no confidential project content, source, individual feedback, incidents, or unpublished marks

### Guardian

- only institution-permitted schedule/safety-contact/released completion summary for a verified relationship and adult-student consent where required
- no application/consent, logbook, project artifacts, team communications, mentor feedback, marks, incidents, IP, or publication decision

### Tenant Administrator/Auditor/Platform Operations

- tenant admin: module configuration/access/retention/provider status and masked adoption; no automatic content access
- auditor/data protection: purpose-scoped read-only audit, consent/disclosure/access/retention evidence with logging and break-glass where needed
- platform operations: service/queue/storage/provider health, latency/errors, deployment, and masked correlations only; no identities, content, IP, marks, notes, cases, or artifacts

For all roles: encrypted platform-backed token storage; biometric re-entry only after server auth; generic push text; deep links reauthorize; remote revoke/logout; bounded encrypted caches with classification-aware offline denial/expiry/purge; camera/files permission at use; no secret links; localization/RTL; Dynamic Type/font scaling; screen reader; keyboard/switch support where applicable; visible focus; non-color-only states; and authoritative receipts.

## 35. Data model and PostgreSQL RLS

Add normalized tables, names adapted to repository conventions, for:

- internship/project policy/rule/version/approval
- opportunity/version/host/contact/capacity/publication
- eligibility/application/consent/selection/receipt
- student-sourced request/verification/approval/document/NOC
- internship agreement/amendment/status/supervisor/mentor
- logbook/hour/attendance/import/review
- internship milestone/review/feedback/incident/change/completion/certificate
- project definition/problem statement/version
- team/membership/invitation/change/contribution/dispute
- proposal/version/comment/approval/change request
- guide/co-guide/external mentor/panel assignment/workload/COI
- ethics/IP/classification/license/NDA/embargo/approval
- project milestone/artifact/repository reference/meeting/action/risk/intervention
- review/rubric/rating/moderation/demo
- marks calculation/handoff/receipt
- similarity request/result/case/decision
- showcase/publication/consent/clearance/takedown
- analytic run/population/result

Every tenant-owned table has non-null tenant/institution scope, scope-consistent foreign keys where practical, RLS enabled and forced, least-privilege policies, and indexes supporting predicates. Add negative cross-tenant/student/team/host/mentor/project/role tests.

Use immutable receipts/checksums, effective-dated membership/assignments, exclusion constraints where supported, exact decimal marks/hours/stipends, version lineage, optimistic locking, status constraints, idempotency, and classification. Large content belongs in encrypted authorized object storage.

Flyway migrations are forward-only, rolling-compatible, restart-safe where applicable, and include backfill/validation. Never edit an applied migration.

## 36. Security, privacy, and threat model

Update the threat model for:

- cross-tenant/team/host/mentor IDOR and enumeration
- confidential IP leakage through search/facets/counts/analytics/AI/logs/events/notifications/mobile caches
- external mentor invitation takeover, stale access, and bulk download
- malicious documents/archives/repositories/links, XSS, formula injection, and metadata leakage
- falsified offers, logbooks, hours, mentor feedback, completion, certificates, and marks handoffs
- team membership/guide/workload/marks manipulation
- ethics/IP/embargo bypass and unauthorized publication
- provider/webhook/repository/meeting/similarity spoofing or replay
- insider/admin/break-glass abuse
- public showcase scraping, consent withdrawal, takedown, and cached-copy limitations
- sensitive incident/dispute/welfare leakage
- small-group analytics reidentification

Apply least privilege, RLS, field/artifact/classification authorization, short-lived external roles/links, MFA/step-up, rate/volume/anomaly controls, CSP/validation/encoding, malware/archive scanning, safe preview/download, KMS/Secrets Manager, webhook verification, disclosure/access receipts, audit, break-glass, retention/erasure/legal hold, and incident response.

Document data flows, consent/lawful-purpose assumptions, IP/licensing/embargo responsibilities, external-provider restrictions, residual risk, and launch blockers. Do not claim legal/IP/ethics compliance solely from software controls.

## 37. Reliability, observability, and operations

Define SLOs for application/approval receipts, logbook/milestone save, artifact upload, review/finalize, marks handoff, external mentor access, report generation, and availability.

Instrument low-cardinality metrics/traces for approvals, applications, logbook/hour updates, milestone aging, artifact upload/scan, mentor invitations/access expiry, review queues, handoff delivery/acknowledgement, provider webhooks, publication/takedown, export, and RLS denial.

Never log identities, contact data, confidential titles/content, proposal/logbook/feedback/notes, marks, incidents/disputes, similarity, artifact/object references, tokens, or signed URLs. Use masked correlations and safe reason codes.

Add dashboards, alerts, synthetic fixtures, host/mentor compromise/revocation, confidential-IP exposure, malicious-upload, approval/handoff recovery, provider outage, incident privacy, consent/publication takedown, retention/embargo, import recovery, backup/restore, DR, and cost/cardinality runbooks.

## 38. Tests

Add unit, property, contract, integration, RLS, end-to-end, web/mobile, security, accessibility, and representative-load tests.

At minimum test:

- policy validation/version/activation and declarative eligibility golden matrices
- opportunity verification/version/material-change/application/consent/withdrawal/selection
- student-sourced offer/host/document/NOC approval and truthful verification
- internship agreement/amendment/status/date/conflict/extension/termination
- logbook/hour exact totals, duplicate/import/correction, mentor verification, and no surveillance
- milestone dependencies/extensions/returns/approval/completion traces
- confidential incident routing and restricted access
- project definition/problem/proposal/version/comments/change control
- team min/max, enrollment, invitation races, one-active-team, locked membership changes, contribution lineage, and disputes
- guide/co-guide/mentor/panel qualification, COI, workload limit, exception, effective dates, and reassignment
- ethics screening/conditions/expiry/change/suspension blocks
- classification/IP/license/NDA/embargo enforcement at API/search/count/artifact/export/mobile/provider/AI boundaries
- resumable upload/checksum/malware/archive/path/metadata and access receipts
- review rubric exact scoring, independent panel, variance/moderation, demo incident
- marks calculation/version/rounding/handoff idempotency/rejection/retry/supersession
- completion engine evidence/missing/stale/hold behavior
- similarity exclusions/provider states/human review/student response/no auto-punishment
- showcase unanimous-required consent/clearance/sanitization/embargo/publish/unpublish/takedown
- external mentor invitation/MFA/scope/expiry/revoke/no cross-project access
- every web/mobile role permission and intentional denial
- Android/iOS encrypted cache/classification/offline denial/purge/generic push/deep-link auth/receipt/accessibility
- cross-tenant/student/team/host/mentor/project/role RLS and IDOR
- canary leakage for confidential IP/notes/marks/similarity/tokens/URLs in logs/events/traces/DTOs/search/analytics/notifications
- migrations, OpenAPI/generated clients, outbox/inbox, provider webhook, observability, backup/restore, and rolling compatibility

Required end-to-end journeys:

1. Coordinator verifies/publishes an opportunity; eligible student consents/applies, is selected, and receives institutional approval/NOC.
2. Student completes internship logbook/hours/milestones; mentor and faculty review; an amendment preserves history; completion is evidence-based.
3. Students form a valid team, secure guide/co-guide, submit proposal, pass ethics/IP review, and lock scope.
4. Team submits dependency-aware milestones/artifacts, conducts reviews/demo, resolves changes/risks, and finalizes report.
5. Panel scoring and individual/team criteria produce a deterministic marks handoff accepted by Prompt 15.
6. Similarity signal receives human review and student response without automatic punishment.
7. Confidential sponsor project remains absent from unauthorized search/counts/analytics/mobile caches and external users.
8. Approved sanitized showcase publishes only after all required clearances/consents and can be taken down.
9. External mentor sees only assigned minimal data and loses all access at expiry/revocation.
10. Leadership/OBE sees privacy-safe aggregate evidence with definitions and versions.
11. Cross-tenant/team/host/role leakage attempts fail at API and RLS layers.
12. Appropriate role journeys work on web, Android, and iOS with accessibility checks.

Run repository-standard checks plus exact relevant commands for Java compile/test/static analysis, React typecheck/lint/unit/E2E/accessibility, Android/iOS tests, OpenAPI generation/diff, Flyway validation, RLS/security/canary leakage, dependency/container/IaC scans, and representative batch/concurrency tests. Report commands, exit codes, skipped checks, environment limitations, and evidence. Never claim a check passed if it was not run successfully.

Load tests cover opportunity/application bursts, team invitation/lock races, artifact uploads, logbook/milestone saves, review finalization, marks handoff, mentor access, dashboard/report/export jobs, and publication. Report scale, request/job mix, infrastructure, p50/p95/p99, throughput, errors/conflicts, DB/storage/queue behavior, costs, bottlenecks, and thresholds.

## 39. Seed/demo data

Add deterministic, obviously synthetic, production-disabled fixtures:

- internship policies, hosts, contacts, opportunities, eligible/pending/ineligible students, applications, selections, NOC, active/completed internships, logbooks, milestones, feedback, and amendments
- minor/major/capstone definitions, public/internal/confidential problems, teams, guides/co-guides, external mentors, proposals, ethics/IP outcomes, milestones, artifacts, reviews, marks handoffs, and completion
- team and workload edge cases, expired mentor, embargo, restricted incident, similarity test-double case, and showcase consent/takedown

Use no real student/faculty/employer/contact data, credentials, employer IP, copyrighted content, live provider calls, or real sensitive cases. Seeders are idempotent and tenant-isolated.

## 40. Documentation and completion gate

Update:

- OpenAPI and generated clients
- data dictionary, statuses, permissions, classifications, consent, retention, and workload catalogues
- internship/project/mentoring bounded-context ADRs and integration contracts
- policy/eligibility/completion/marks-handoff formal specifications with golden cases
- ethics/IP/confidentiality/licensing/embargo/privacy guide and threat/data-flow models
- opportunity/host/mentor verification and external-access guide
- student, guide, project/internship coordinator, external mentor, panel, reviewer, leadership, support, and auditor guides
- web/native-mobile role-feature matrix and accessibility guide
- artifact/repository/provider/similarity integration specifications
- showcase consent/clearance/sanitization/takedown guide
- analytic definitions and accreditation evidence mapping
- SLOs/load results/dashboards/alerts plus security/privacy/provider/import/handoff/publication/backup/DR runbooks
- local/AWS configuration without real secrets

Completion requires all of the following:

1. Internship opportunities and student-sourced requests support explainable eligibility, consent, selection, host/document verification, institutional approval, and immutable agreement versions.
2. Active internships support private logbooks/hours, attendance evidence, milestones, reviews, mentors, amendments, incidents, and evidence-based completion.
3. Minor/major/capstone definitions, problem statements, teams, guide/co-guide/panel allocation, proposals, ethics/IP/confidentiality, milestones, artifacts, reviews, demos, reports, and completion are governed end to end.
4. Team membership, guide workload/eligibility, conflicts, changes, contributions, and disputes preserve exact effective-dated history and approval.
5. Confidential/embargoed IP is denied at API, RLS, search/count, artifact, export, notification, analytics, mobile cache, external mentor, provider, and AI boundaries.
6. External mentors/hosts have verified time-bound access only to assigned minimal data, and revocation/expiry is tested.
7. Review/rubric/viva evidence produces exact versioned marks handoffs acknowledged by Prompt 15 without direct mark edits.
8. Similarity is a truthful optional provider boundary with restricted human review, student response, and no automatic punishment.
9. Showcases/portfolios publish sanitized versions only after all required IP/ethics/sponsor/institution/student clearances and consent, with takedown.
10. Analytics expose population, exclusions, definitions, source versions, privacy thresholds, and no misleading faculty/student ranking.
11. Every relevant role has meaningful React web and native Android/iOS workflows or explicit justified web-first/read-only/denied capabilities.
12. Every tenant table has forced RLS and negative tenant/student/team/host/mentor/project/role tests; security/privacy/SoD/audit/retention controls pass.
13. Representative concurrency, upload, provider failure, accessibility, security, and canary leakage tests pass.
14. OpenAPI/generated clients, migrations, docs, ADRs, specifications, guides, dashboards, and runbooks pass every environment-available check.
15. No internship, host, completion, ethics approval, IP clearance, mentor feedback, marks acknowledgement, provider result, or publication consent was fabricated.
16. Prompt 24 employee HR, recruitment, attendance/leave, employment workload, appraisal, compensation, payroll-input, and payslip functionality was not implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, policies/opportunities/applications/approvals/internships/logbooks/hours/milestones/reviews/completion/projects/problems/teams/guides/mentors/proposals/ethics/IP/artifacts/meetings/risks/panels/marks handoff/similarity/showcase/analytics, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency/retention, representative load and all exact test/scan commands/results/exit status, docs/ADRs/runbooks, limitations/unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(projects): govern internships capstones and mentoring`

Stop. Do not begin Prompt 24 or implement employee HR, recruitment, attendance/leave, employment workload, appraisal, compensation, payroll input, or payslips.
```

---

## Review Checklist Before Prompt 24

- Internship approvals, agreements, logbooks, milestones, changes, and completion are evidence-based and versioned.
- Project teams, membership changes, guide/panel allocation, workload, proposals, and reviews preserve history.
- Ethics, IP, confidentiality, licensing, and embargo controls block unauthorized work or disclosure.
- Confidential content cannot leak through search, counts, analytics, AI, exports, notifications, providers, or mobile caches.
- External mentors/hosts have verified, minimal, time-bound, revocable access.
- Marks handoff is exact, immutable, idempotent, and acknowledged by Prompt 15.
- Similarity is human-reviewed and never automatic punishment.
- Showcase publication requires sanitized versions plus all required clearance and consent.
- Every relevant role has a suitable web/native-mobile workflow or intentional restriction.
- Every tenant table has forced RLS and negative isolation tests.
- No Prompt 24 faculty HR/leave/appraisal/payroll-boundary functionality was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 24 until these conditions pass.
