# Claude Code Prompt 22

## Training, Placement, Employers, and Offers

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–21 passed, were reviewed, and were committed  
**Scope:** Training programs and readiness, student career profiles and resumes, employer/contact CRM, placement policies and explainable eligibility, drives and consented applications, screening/interviews, offers and joining outcomes, restricted recruiter access, analytics, and role-specific web/native-mobile interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially training and placement, career profiles, resumes, employer relations, eligibility, drives, assessments, interviews, offers, joining, consent, privacy, analytics, portals, communications, accessibility, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, data-classification/privacy policy, workflow conventions, and repository standards.
3. Inspect Prompt 03 academic structure/program contracts; Prompt 05 student identity/profile/cohort/lifecycle; Prompt 06 registration/credits/degree-audit references; Prompt 08 attendance; Prompt 09 LMS/content/assignment; Prompt 10 assessment content; Prompt 11 financial boundary; Prompt 15/16 approved marks/results/SGPA/CGPA/backlog evidence; Prompt 17 verified documents; Prompt 18 degree-completion/grievance references; Prompt 19 outcomes/evidence; Prompt 20 assessment delivery; Prompt 21 coding/competency/readiness references; and Prompt 02 documents/workflow/audit/outbox foundations.
4. Inspect identity, external-user invitation, authorization/SoD, PostgreSQL RLS, OpenAPI/generated clients, notification/provider ports, object storage/document verification, reporting, jobs/observability, consent/retention mechanisms, accessibility/localization, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, duplicate authoritative student/academic/result/assessment/document data, silently change placement eligibility, infer protected/sensitive traits, fabricate employers/jobs/packages/offers/joining, send student data to employers without explicit valid purpose and consent, allow permanent recruiter access, treat readiness as guaranteed placement, implement Prompt 23 internship/project management, or claim external provider actions succeeded without acknowledgement.

Implement bounded `career-training` and `placement` modules with explicit contracts. Career training owns training programs, batches, sessions, trainer assignments, attendance references, feedback, assessments, interventions, and approved readiness evidence. Placement owns career profiles, employer/contact records, placement policies, explainable eligibility snapshots, drives, candidate registrations/consent, stages, controlled sharing, offers, and joining outcomes. Neither owns authoritative academics, official results, payments/payroll, internships, academic projects, external job boards, or employer HR systems.

## 1. Domain invariants

Enforce:

- every record is tenant/institution scoped and every tenant-owned table has forced PostgreSQL RLS
- official academic/identity/results evidence is referenced by immutable source/version, never copied into editable placement fields
- policies, eligibility rules, packages, drive definitions, sharing schemas, stage decisions, and offers are versioned and auditable
- eligibility is deterministic, reproducible, explainable, and evaluated against a pinned policy plus as-of source snapshot
- no student is included, excluded, prioritized, or ranked by an opaque AI score
- protected/sensitive traits are not eligibility inputs unless a documented lawful reservation/accommodation policy explicitly requires tightly controlled handling
- application/registration, consent, withdrawal, data sharing, offer acceptance, and joining confirmation require authoritative receipts
- consent is purpose-, employer-, drive-, data-category-, and time-bound; withdrawal affects future sharing without falsifying prior lawful disclosures
- recruiters see only consented candidates and approved fields/documents for their assigned drive/stage/time window
- every share/export records recipient, purpose, fields/documents, candidate scope, policy/consent versions, actor, time, expiry, and acknowledgement
- compensation uses exact decimal/currency arithmetic and stores components separately from display totals
- accepted/declined/withdrawn/revoked/expired offers are immutable facts; corrections create superseding versions
- joining is not assumed from offer acceptance and requires authorized evidence/confirmation
- training/readiness analytics are evidence and guidance, not guaranteed employability or placement
- no native-mobile official action is complete until the server returns and the app stores a receipt

Write a glossary covering career profile, verified evidence, readiness, training program, placement policy, eligibility, drive, consent, registration, shortlist, stage, recruiter, package, CTC, fixed/variable/deferred component, offer, acceptance, joining, opt-out, and data share.

## 2. Student career profile

Implement a student-controlled career profile referencing authoritative identity and academics:

- preferred display/contact information with verification status
- program/branch/cohort/graduation year and approved academic summary references
- technical, domain, language, communication, and soft skills
- projects, portfolios, publications, competitions, hackathons, achievements, and leadership
- certifications with issuer, credential ID/URL, issue/expiry, evidence, and verification
- work/internship experience references; Prompt 23 will own internship lifecycle
- training, assessments, coding competency, and readiness references from Prompts 20/21
- career interests, job functions, industries, locations, work mode, higher-study/entrepreneurship/placement preference
- relocation/travel/work-authorization declarations only when purpose/policy allows
- placement opt-in/opt-out and communication preferences
- visibility controls and completeness guidance

Differentiate student-declared, institution-verified, issuer-verified, expired, disputed, and revoked evidence. Never present self-declared data as verified.

Maintain field-level provenance, last-updated time, approver, expiry, and visibility. Prevent students or placement staff from directly editing authoritative CGPA, backlog, degree, certificate, or assessment outcomes.

## 3. Skills and evidence governance

Create a versioned skill taxonomy with tenant-defined aliases mapped to stable canonical skill concepts where practical. Support skill category, proficiency scale, source type, evidence, verification status, expiry, and confidence meaning without opaque inference.

Evidence may reference:

- course/grade/credit evidence from Prompts 16/17
- approved CO/competency evidence from Prompt 19
- assessment results from Prompt 20
- programming-lab competency from Prompt 21
- training completion/assessment from this prompt
- verified certificate/document from Prompt 17/02
- student-declared portfolio/project references

Do not convert a single assessment into a permanent skill claim without an approved transparent rule. Store every derived proficiency with rule version, sources, calculation, date, limitations, and expiry/revalidation policy.

Provide verification queues, duplicate/conflict detection, expiry alerts, and student dispute/correction workflow.

## 4. Resume and portfolio versions

Implement versioned resumes:

- student-selected career-profile fields and ordered sections
- institution-approved templates with accessibility and localization
- role/employer/drive-specific version
- verified/unverified badges represented truthfully
- preview, validation, PDF generation, checksum, version, and expiry
- optional institution review/approval without implying employment endorsement
- private share links that are purpose-bound, time-limited, revocable, non-indexable, and access logged

Prevent hidden tracking, unsafe active content, embedded credentials, external beacons, and cross-tenant template/data leakage. Generated files use safe fonts/content, malware-cleared assets, metadata minimization, and accessible text structure.

Do not provide a public student directory. Portfolio publication requires explicit student opt-in and field-level visibility; Prompt 23 will later govern project/IP showcase approval.

## 5. Employer organization and contact CRM

Implement employer records with:

- legal/display name, organization type, industry, size band, locations, website/domain, registration/tax identifiers where policy permits
- relationship source, status, tier/category, account owner, engagement history, notes, agreements, documents, and risk flags
- verified domains and duplicate/merge workflow
- active, prospect, verification_pending, verified, restricted, blocked, inactive, and archived states
- parent/subsidiary/brand relationships without conflating legal entities

Employer contacts include name, role/title, business contact channels, source, lawful-purpose/consent basis, communication preference, verification, owner, last contact, retention, and restricted notes.

Classify contacts as institutional business data/personal data according to policy. Limit bulk export, record all access/shares, support correction/retention, and avoid scraping or enriching from unapproved sources.

Employer verification and risk review must prevent impersonation, personal-email misuse, suspicious domains, conflicting organizations, and unauthorized data requests. Do not label an employer fraudulent automatically; use human-reviewed risk workflow.

## 6. Employer agreements and institutional relationship

Reference Prompt 02 document/workflow storage for:

- MoU/NDA/service/recruitment agreement
- validity/effective/expiry dates
- permitted candidate-data categories and purposes
- confidentiality, retention, deletion, onward-sharing, breach, and contact terms
- commercial/fee references without implementing procurement/accounting
- signatory/approval/version/status

Block sharing when required agreements are absent, expired, superseded, or incompatible. Never expose agreement content to students/recruiters without authorization.

Track interactions, meetings, calls, visits, invitations, commitments, follow-ups, and outcomes with minimal sensitive notes. Communications use approved providers and retain consent/opt-out evidence.

## 7. Job and role requisition

Implement versioned job/role opportunities with:

- employer/legal entity and recruiter/contact
- title, role family, description, responsibilities, skills, experience, education, branch/program/year eligibility
- work location, remote/hybrid/on-site, travel, shift, bond/service agreement, probation, and joining window
- employment type and headcount/capacity
- application documents/questions and stage plan
- compensation currency and component structure
- benefits summarized separately
- deadlines, validity, source, approvals, and change history
- accessibility/accommodation contact/process

Require placement-office verification and approval before student publication. Store employer-provided claims with provenance; do not certify workplace quality, compensation, visa sponsorship, or job safety without evidence.

Material changes after registrations—eligibility, compensation, location, bond, role, deadline, or process—create a new version, impact notice, renewed acknowledgement/consent where required, and withdrawal opportunity.

## 8. Compensation/package model

Model compensation transparently:

- currency and pay period
- fixed base
- guaranteed allowance
- variable/performance component
- joining/retention bonus
- stock/equity/ESOP display metadata
- deferred component
- employer contributions/benefits
- one-time/non-cash items
- gross annual CTC as employer-declared value
- institution-normalized comparable values under a versioned formula

Use exact decimals and currency-aware rounding. Never add incomparable components silently or represent maximum variable/equity as guaranteed cash. Display raw employer package and normalized comparison separately, with assumptions and exclusions.

Package/dream/super-dream classification uses versioned institutional policy, effective date, currency conversion source/version if applicable, and explainable result. Do not fetch or invent exchange rates without an approved provider.

## 9. Placement policy catalogue

Implement versioned, effective-dated policies scoped by institution, program, cohort, academic year, and placement season:

- participation/opt-in requirements
- minimum CGPA/percentage/credits
- active/history backlog rules
- gap/year-break and graduation-status rules
- attendance/training/readiness/assessment/skill criteria
- branch/program/degree eligibility
- dream/super-dream/package categories
- one-offer, multiple-offer, upgrade, slot/day-zero/day-one rules
- offer acceptance/decline deadlines
- withdrawal/no-show/disciplinary consequences only through approved due process
- exceptions/waivers and approving authority
- employer-specific criteria boundary
- privacy/consent/data-sharing requirements

Use a validated declarative rule model, not arbitrary scripts or opaque formulas. Validate conflicts, gaps, impossible conditions, ambiguous precedence, circular references, missing sources, and discriminatory inputs before activation.

Policies follow draft, review, approved, active, retired, and superseded lifecycle. Activated versions are immutable and prior eligibility/offer decisions remain reproducible.

## 10. Explainable eligibility engine

Evaluate candidate eligibility using pinned:

- student/program/cohort/enrollment status
- approved CGPA/percentage/credits/backlog evidence with as-of version
- completion/graduation status
- approved training/assessment/coding/skill/readiness evidence
- placement participation, prior applications/offers/acceptances, and policy status
- job/employer criteria and drive capacity/window
- documented approved waiver/exception

Produce `ELIGIBLE`, `INELIGIBLE`, `CONDITIONALLY_ELIGIBLE`, `PENDING_DATA`, or `REVIEW_REQUIRED` with:

- every evaluated criterion
- source/version/as-of value
- operator/threshold/result
- missing/stale/conflicting data
- policy/job/engine versions and semantic hash
- human-readable explanation safe for the student
- restricted staff detail and remediation/appeal route

Never treat missing data as failure unless the approved rule explicitly says so. Never infer caste, religion, gender, disability, health, age, ethnicity, or socioeconomic status. Reservation/diversity programs require separate documented lawful policy, data minimization, strict authorization, and human review.

Support preview/simulation labeled non-official, batch calculation with checkpoints/idempotency, source-change invalidation, candidate appeal/correction, and approved exception workflow. Exceptions never rewrite the policy result; they create linked decisions with reason, scope, expiry, approver, and audit.

## 11. Placement drive lifecycle

Implement drive states:

- draft
- employer_confirmation_pending
- internal_review
- approved
- published
- registration_open
- registration_closed
- screening
- in_progress
- selection_received
- offers_pending
- completed
- cancelled
- archived
- superseded

A drive pins employer/job/package/policy/stage/consent/share-schema versions, eligible population cutoff, dates/timezone, capacity, contacts, venue/remote links through safe references, documents, instructions, and notification plan.

Support single employer/multiple roles, pooled campus/multi-institution only when explicitly authorized, on-campus/off-campus/virtual, and rolling/batch processes. Cross-institution data is denied by default and requires a separately approved tenancy model; do not weaken RLS.

Version-impact workflow protects candidates from silent changes. Cancellation/reschedule records reason, affected registrations/stages/offers, notifications, and employer acknowledgement.

## 12. Registration, consent, and withdrawal

Candidate flow:

1. View approved job, package, requirements, process, deadlines, privacy notice, and exact fields/documents proposed for sharing.
2. View eligibility result and explanation.
3. Select an approved resume/profile/document version.
4. Answer employer/application questions with classification and purpose.
5. Provide explicit granular consent/acknowledgement.
6. Submit idempotently and receive authoritative receipt.

Support draft, submitted, eligible_confirmed, consented, withdrawn, disqualified_policy, shortlisted, rejected, selected, offer, and closed states with separate stage history.

Withdrawal must be possible until the documented cutoff and always from future optional sharing where law/policy requires. Explain effects after prior sharing. Never use prechecked consent, bundled unrelated consent, or dark patterns.

Capture student declarations about accuracy and policy without forcing unnecessary sensitive data. Changes to shared profile/resume require a new version and explicit update/share decision.

## 13. Candidate population and shortlisting

Build immutable drive population snapshots:

- policy-eligible candidates
- registered/consented candidates
- pending-data/review candidates
- excluded/withdrawn candidates with safe reason category
- employer shortlist and stage status
- source/version/as-of time

Automated shortlisting may apply only approved deterministic employer/institution criteria. Preserve each rule result. No generative-AI ranking, facial/voice/emotion analysis, personality inference, or opaque fit score.

Manual employer shortlist import requires format validation, candidate matching, duplicate/unknown resolution, source file checksum, actor, acknowledgement, and review. It cannot expose non-consented students or bypass institutional policy.

Provide student notice and correction/appeal routes appropriate to policy, without disclosing other candidates or employer confidential deliberations.

## 14. Controlled employer data sharing

Define approved share schemas by drive/stage/purpose. Each field/document is classified as required, optional, prohibited, masked, or derived. Examples may include consented identity/contact, program, approved academic summary, skills, resume, and application answers.

Before every view/download/export/API share, enforce:

- active recruiter identity and assigned employer/drive/stage
- active agreement and access window
- candidate registration and unwithdrawn applicable consent
- approved share-schema version and purpose
- field/document authorization and current version
- download/view limits and watermark where appropriate
- rate/volume/anomaly controls

Record immutable disclosure receipts with recipient identity, fields/documents, candidate set, purpose, versions, timestamp, expiry, and delivery acknowledgement. Exports are encrypted where appropriate, time-limited, revocable, non-indexable, and never emailed as uncontrolled permanent attachments by default.

Consent withdrawal/recruiter removal/drive completion revokes future access and outstanding links. Record deletion/retention acknowledgement when contract/policy requires it.

## 15. Recruiter identity and restricted portal

Create external recruiter invitation by verified institutional placement staff:

- verified business email/domain and employer/contact linkage
- single-use invitation, expiry, MFA/step-up policy, terms/privacy acknowledgement
- time-bound least-privilege role assigned to explicit drives/stages
- session/device management, rate limits, export controls, and inactivity expiry
- suspension/revocation and access review

Recruiters can manage only authorized requisition confirmations, schedules, candidate views, shortlist/stage outcomes, interview feedback forms, selection lists, and offer documents for consented candidates.

Recruiters cannot browse students, search other drives/institutions, see internal notes/eligibility details beyond approved disclosure, change academic data/policies, invite arbitrary users, or retain access after expiry.

Use role-shaped APIs and server-side authorization. Never rely on hidden navigation or client filtering.

## 16. Drive stages and workflow

Support configurable ordered/parallel stages:

- registration/document screening
- aptitude/domain/communication assessment using Prompt 20
- coding assessment using Prompt 21
- group discussion
- technical interview
- managerial interview
- HR interview
- document verification
- employer-defined approved stage

Each stage has type, owner, panel/recruiter assignments, schedule/window/timezone, venue/link reference, capacity/slots, input population, required consent/share schema, evaluation form/rubric, status vocabulary, advancement rule, communication policy, and deadline.

Candidate states include pending, invited, scheduled, attended, no_show, reschedule_requested, evaluated, advance, hold, waitlist, reject, withdraw, and selected. Preserve actor/time/reason/source and never overwrite earlier decisions.

Bulk transitions require preview, validation, idempotency, partial-failure report, maker-checker where consequential, and notification suppression/confirmation. No stage transition can bypass consent, eligibility, capacity, or required evidence silently.

## 17. Assessments and coding-test integration

Link approved Prompt 20/21 schedules/results by stable reference:

- assessment/problem set version
- eligible drive candidates
- accommodations and authoritative timing handled by source module
- completion/submission/score/released-status reference
- approved threshold/rule for stage advancement
- incident/grievance/regrade status

Placement cannot view source code, responses, hidden tests, integrity telemetry, or unreleased marks unless separately authorized. Recruiters receive only the approved result summary/category under consent.

Source result invalidation or correction marks dependent shortlist/stage decisions stale and triggers governed review; it never silently reverses an offer.

## 18. Group discussion and interview scheduling

Implement:

- candidate availability collection where enabled
- panel/interviewer/recruiter availability reference
- room/virtual-link resource reference
- timezone-safe slot generation, capacity, buffers, and conflict checks
- invitation, confirmation, reminder, check-in, no-show, reschedule, and cancellation
- accessibility/accommodation request routed privately to authorized coordinators
- panel conflict-of-interest declaration
- interview packet assembled from approved shared fields only

Do not expose other candidates' contact/profile details. Virtual meeting providers use truthful ports; no fake meeting creation. Links are short-lived or protected and excluded from broad notifications/logs.

## 19. Evaluation, feedback, and selection

Implement versioned stage rubrics/forms with criteria, scale, required comments, recommendation, conflict rules, and approval. Support independent panel feedback, blind-to-other-raters until finalize, variance/consensus review, and employer final outcome.

Separate:

- interviewer observations
- rubric scores
- recommendation
- employer decision
- institutional process status

No automated selection/rejection from generative AI. Deterministic threshold advancement is allowed only under approved visible rules. Free-text feedback is restricted, moderated for inappropriate sensitive content where policy permits, and not automatically shown to students.

Selection/rejection/waitlist imports require verified recruiter source, candidate matching, checksum, acknowledgement, exception report, and placement-officer review. Notify candidates only after authorized release.

## 20. Offer creation and verification

Model offers with:

- employer/legal entity, role/job/drive/candidate
- offer reference and version
- issue/expiry/acceptance deadline
- work location/mode, joining date/window
- detailed compensation package version/currency
- probation, bond/service agreement, background/document conditions
- offer-letter document checksum/source/signatory/verification
- selected, draft_received, verification_pending, verified, released, accepted, declined, withdrawn_by_employer, expired, superseded, joining_pending, joined, and not_joined states

Placement staff verify employer identity, job/package consistency, document integrity, and material deviations before student release. Verification means process/document checks, not a guarantee of employment.

Offer documents use Prompt 02 secure storage, malware scan, access classification, watermark/download expiry where appropriate, and no public links. Corrections create versions; never overwrite the original.

## 21. Offer policy, concurrency, and multiple offers

Evaluate every offer/acceptance against the pinned placement policy:

- current active/accepted offers
- company/role/package category
- upgrade/dream/super-dream rules
- same-day/slot rules
- withdrawal/decline restrictions
- exception decisions

Use database locking/serializable strategy or explicit reservation to prevent concurrent acceptances violating policy. Idempotent acceptance returns the original receipt. A race must yield one deterministic committed outcome and an explainable conflict, never two silent successes.

Student acceptance/decline shows exact offer version, deadline, consequences, declarations, and policy result. Require step-up authentication for acceptance where configured. No placement officer accepts on behalf of a student except a documented accessible/authorized assisted workflow with student acknowledgement and SoD.

Employer withdrawal and institutional invalidation require reason, evidence, authorization, student notice, and immutable history. Never retaliate automatically for a decline/non-joining.

## 22. Joining and post-offer outcomes

Track:

- pre-joining document/status checklist references
- graduation/background-condition status reference
- expected/actual joining date
- joined, deferred, candidate_declined, employer_withdrew, no_response, not_joined, terminated_pre_joining, and unknown states
- candidate declaration, employer confirmation, placement verification, and evidence versions
- reason categories with restricted free text
- follow-up dates and communication

Do not mark joined from offer acceptance, elapsed date, or recruiter silence. Conflicting candidate/employer evidence creates review.

Analytics distinguish offered, accepted, unique selected students, multiple offers, verified joined, and unknown. Never inflate placement rate by counting offers as placed students or excluding opted-in eligible students without transparent denominator policy.

## 23. Training program catalogue

Implement career-training programs for technical, coding, aptitude, reasoning, quantitative, communication, language, soft skills, resume, interview, group discussion, domain, and employer/role-specific preparation.

Program versions include:

- title, objective, skills/topics/outcomes, target audience and prerequisites
- delivery mode, duration, calendar, content references, trainer/vendor, capacity, attendance/completion policy
- assessments/projects/practice references to Prompts 09/20/21
- feedback/evaluation and certification/evidence policy
- cost/budget reference without implementing finance/procurement
- owner, reviewer, approver, status, effective scope, and change history

Lifecycle: draft, review, approved, published, registration_open, active, completed, evaluated, archived, cancelled, and superseded.

Do not fabricate content/provider integrations or present attendance as skill mastery.

## 24. Training batches, sessions, and attendance

Implement batch assignment/registration with eligibility, consent where external trainers receive data, capacity/waitlist, timetable conflict check, and receipt.

Sessions include schedule/timezone, venue/meeting reference, trainer, content/topic, materials, attendance method, makeup, cancellation/reschedule, and notification.

Consume or extend Prompt 08 attendance contracts rather than create an incompatible attendance master. Record trainer/faculty verification, student correction request, and reasoned adjustment. External trainers see only assigned batch/session data and minimum candidate fields.

Support completion based on transparent configured attendance/content/assessment requirements. Generate verified completion evidence only after requirements pass and approval where configured.

## 25. Trainers and training providers

Model internal faculty, external individual trainers, and provider organizations with verification, expertise, assigned programs/sessions, availability, agreement/document references, access scope, feedback, and status.

External trainer accounts are invitation-based, MFA/time-bound, batch/program scoped, and expire automatically. They cannot browse students, view unrelated academics/placement data, or export beyond approved purpose.

Trainer performance analytics use declared methodology, minimum response groups, response rates, and human review. Do not auto-terminate/rank trainers from anonymous feedback or opaque scores.

## 26. Training feedback and assessment

Support privacy-governed feedback using Prompt 19 survey principles and assessment/coding tests using Prompts 20/21:

- pre/post diagnostic
- session/program feedback
- trainer feedback
- self-assessment
- skill/competency outcome
- employer/role-specific mock tests

Pin instruments, populations, responses/aggregates, scoring, and versions. Anonymous feedback must remain non-reidentifiable and small groups suppressed.

Training improvement actions have owner, due date, evidence, and effectiveness review. Never treat nonresponse as a negative score without an approved transparent rule.

## 27. Intervention and readiness plans

Create transparent student/batch interventions from approved evidence:

- identified skill/readiness gap and source/version
- target and success measure
- recommended or assigned training/practice/mentoring reference
- owner, student acknowledgement, milestones, due date, status, and review
- later evidence and effectiveness outcome

Recommendations are explainable rules or human decisions—not opaque AI prescriptions. Students can view why an intervention was suggested, correct source data, and request review.

Do not use interventions as hidden punishment or automatically block placement unless an activated policy explicitly makes a verified criterion mandatory.

## 28. Dashboards, analytics, and statutory reporting boundary

Provide versioned privacy-safe analytics for:

- profile/resume/skill evidence completeness
- training enrollment, attendance, completion, feedback, assessment improvement, and intervention effectiveness
- employer pipeline, activity, conversion, repeat engagement, and access expiry
- drive eligibility/registration/consent/withdrawal/stage funnel and turnaround
- offers by employer/role/program/package component/category
- unique selected/accepted/joined students and multiple offers
- placement rate with explicit numerator/denominator/opt-in/exclusion policy
- median/percentile compensation using declared component method, not only highest CTC
- pending verification, missing outcomes, no-response, and data-quality issues
- cohort/branch/program/year trends with minimum-group privacy thresholds

Every chart has accessible table, source/version/as-of time, population, exclusions, definition, and no misleading axis. Prevent small-group reidentification and unauthorized sensitive-category comparisons.

Regulatory/accreditation reports are configurable governed exports referencing Prompt 19 evidence. Do not claim reports are current statutory formats without verified templates/version. Keep submitted-report acknowledgement outside unless a real provider exists.

## 29. Search, exports, and bulk operations

Search is permission-filtered at query, facet/count, row, document, and download layers. Recruiter search is restricted to consented candidates in assigned drives/stages and approved fields.

Bulk eligibility, invitation, stage transition, shortlist/result import, offer import, and reporting require:

- template/schema version
- dry-run/preview
- per-row validation and candidate/employer matching
- duplicate/conflict handling
- idempotency and resumability
- partial-failure report
- maker-checker for consequential changes
- notification preview/deduplication
- complete audit and source checksum

Exports require purpose, scope, field allowlist, privacy checks, approval where needed, watermark/classification, encryption, expiry, revocation, access log, and manifest. No uncontrolled shared folders or permanent public links.

## 30. Notifications and communication

Use existing notification/provider ports for training/drive publication, eligibility, registration, consent updates, stage invitation/schedule/reminder/result, interview change, offer release/deadline/status, joining follow-up, trainer tasks, and recruiter access.

Messages contain minimal data and generic lock-screen text. Never include student lists, sensitive eligibility reasons, CGPA/backlogs unless necessary and approved, assessment/source code, interview private notes, full packages/offers, access tokens, document links, or allegations.

Deep links reauthenticate and reauthorize. Respect language, timezone, quiet hours, preferences, mandatory-service basis, opt-out, deduplication, retry, and provider acknowledgement. Do not fabricate email/SMS/WhatsApp/meeting delivery.

## 31. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- career profile/skill/evidence/verification/dispute/visibility
- resume/template/version/preview/generate/review/share/revoke
- employer/contact/relationship/agreement/verification/risk/access review
- job/role/package/version/review/approve/publish
- placement policy/rule/validate/simulate/review/activate/compare
- eligibility run/status/trace/appeal/exception/recalculate
- drive/stage/schedule/capacity/audience/version/publish/reschedule/cancel
- registration/consent/withdrawal/receipt
- shortlist/import/review/stage transition/GD/interview/panel/feedback/outcome
- recruiter invite/activate/assignment/session/revoke/view/download/disclosure receipt
- offer/import/verify/release/accept/decline/withdraw/expire/supersede
- joining/follow-up/evidence/verify/dispute
- training program/batch/session/trainer/attendance/content/feedback/assessment/completion
- intervention/readiness/effectiveness
- dashboard/report/export/job/progress/revoke

Use role-shaped DTOs, field-level allowlists, bounded pagination/filter/sort, RFC 7807, optimistic versions, `Idempotency-Key`, correlation IDs, server time, rate/volume limits, anti-enumeration, privacy thresholds, and generated web/mobile clients.

Define least-privilege permissions for student profile/consent/apply/offer, placement coordinator/officer/head, training coordinator/trainer, faculty mentor/advisor, employer relationship owner, recruiter, interviewer/panel, academic evidence viewer, document verifier, policy maker/checker, eligibility/exception reviewer, offer verifier/releaser, joining verifier, report/export approver, auditor, tenant admin, and platform health.

Enforce SoD for policy activation, exceptions, employer/recruiter verification, bulk shortlist/outcome import, data export, offer verification/release, assisted acceptance, and joining confirmation where configured. Platform operations see masked service health only.

Use transactional outbox/inbox. Events contain stable references/minimal state and never resume/profile fields, academic values, consent payload, student identity/contact, recruiter contact, interview feedback, package details before release, offer documents, object keys, signed URLs, or access tokens.

## 32. React web interfaces

Implement accessible responsive interfaces for:

- student career profile, verified evidence, visibility, resume builder/version/share, placement preferences, eligibility explanation, drive registration/consent/withdrawal, stage timeline, interviews, offers, joining, training, readiness, interventions, and receipts
- placement officer employer/contact/agreements CRM, jobs/packages, policy editor/simulator, eligibility workbench, drive/stage board, consent/share monitor, imports, interviews, offers/joining, communications, dashboards, and exports
- training catalogue/program/batch/session/trainer/attendance/assessment/feedback/intervention administration
- recruiter restricted drive/candidate/shortlist/schedule/feedback/selection/offer portal
- interviewer/panel schedule, approved candidate packet, rubric, finalize, and conflict declaration
- leadership/department/program dashboards and decision queues
- privacy/audit disclosure, access-expiry, consent-withdrawal, data-quality, and incident views

Meet WCAG 2.2 AA intent: keyboard operation, semantic forms/tables/boards, accessible drag alternatives, visible focus, reflow/zoom, non-color-only states, error summaries, localized/RTL layouts, accessible documents, clear consent, and transparent eligibility/package/placement-rate definitions.

## 33. React Native Android/iOS interfaces for every role

Implement true React Native interfaces with shared generated contracts/design tokens, not a WebView wrapper. Update `docs/mobile/ROLE_FEATURE_MATRIX.md` with supported, web-first, read-only, and denied capabilities.

### Student

- career profile, skills/evidence status, visibility, resume version/preview, preferences, opt-in/out, eligibility explanation/appeal, and readiness
- browse approved drives/jobs/packages, select resume/documents, granular consent, register/withdraw, receive receipt, and track stages
- interview/GD/test schedules, check-in references, reminders, offer view/download, step-up accept/decline, joining follow-up, and dispute/support
- training discovery/registration/waitlist, schedule, attendance correction, content, assessments, feedback, completion, and interventions
- encrypted bounded offline access to non-secret profile/schedule/receipts; no offline consent/offer acceptance success without server receipt

### Placement Officer/Coordinator/Head

- employer/job/drive/policy/eligibility status, registrations/consents, stage board, interviews, offer/joining verification, exceptions, queues, communications, and analytics
- approve/return/publish/reschedule/cancel/import review/offer release/exception with reason, SoD, step-up, and receipt
- complex policy authoring, large imports/exports, agreement management, share-schema configuration, and bulk operations remain web-first

### Training Coordinator

- program/batch/session/trainer/capacity, registrations, attendance/completion, assessment/feedback, interventions, incidents, and analytics
- review/approve/reschedule/cancel and notification actions with receipts
- bulk content/import/rule configuration may be web-first

### Trainer/Internal Faculty

- assigned programs/batches/sessions, minimal roster, attendance, content references, learner progress, feedback tasks, assessments, completion recommendation, and interventions
- external trainers see only explicitly assigned minimal data; no placement/academic browsing

### Faculty Mentor/Advisor/HOD/Program Coordinator

- advisee/program career-profile completeness, explainable readiness/eligibility summaries, training gaps, interventions, drive participation/stage/offer/joining summaries permitted by policy
- cannot alter academic sources, policy results, consent, recruiter decisions, or accept offers

### Recruiter/Employer Contact

- time-bound assigned drives/jobs, consented approved candidate list/packet, shortlist, schedules, stage feedback, selection/waitlist/rejection, offer upload/status, and deletion acknowledgement
- no global student search, unapproved fields, other employers/drives, internal notes, source assessments, or post-expiry access
- downloads remain purpose-bound, short-lived, logged, and remotely revocable

### Interviewer/Panel Member

- assigned schedule, conflict declaration, approved minimal candidate packet, rubric/feedback, finalize receipt, and permitted outcome status
- no other panel ratings until policy permits, no bulk export, no unrelated candidates

### Dean/Principal/Controller/Academic Council/Leadership

- placement season, training, employer pipeline, policy/exceptions, unique selected/accepted/joined, transparent placement/package analytics, risks, and approval queues
- no candidate private details/recruiter notes merely for dashboard access

### Document/Offer/Joining Verifier

- assigned evidence, checksum/source/version, verification checklist, discrepancy, approve/return/reject, and receipt
- access only to required documents and candidate scope; no unrelated profile browsing

### OBE/IQAC/Accreditation Role

- governed aggregate training/skill/placement/joining evidence with definitions, populations, exclusions, versions, and Prompt 19 linkage
- no resumes, contact details, recruiter notes, interview feedback, individual offers, or non-consented data by default

### Guardian

- only institution-permitted released dependent reminders/status summaries for a verified active relationship and adult-student consent where required
- no registration/consent/withdrawal, recruiter sharing, interview feedback, offer decision, resume/profile editing, or private training data

### Tenant Administrator/Data Protection/Auditor

- configuration/access/retention/provider status, disclosure/consent/access logs, recruiter expiry, policy versions, audit cases, and masked adoption/health according to distinct permissions
- tenant admin alone cannot view student career data, resumes, interview feedback, offers, or recruiter exports
- data-protection/auditor access is purpose-scoped, read-only, logged, and may require break-glass approval

### Platform Operations

- service availability, latency, errors, queue/outbox/provider health, storage/report jobs, deployment version, and masked tenant/job correlations
- no student/employer/recruiter identity, profiles, academics, consent, interview feedback, packages, offers, documents, or export contents

For all roles: encrypted platform-backed token storage; biometric re-entry only after server authentication; remote revoke/logout; generic push text; deep links reauthorize; bounded encrypted cache with expiry/purge; camera/files permission only at use; no secrets or uncontrolled downloads; localization/RTL; Dynamic Type/font scaling; screen reader; keyboard/switch support where applicable; visible focus; non-color-only states; and authoritative receipts for consequential actions.

## 34. Data model and PostgreSQL RLS

Add normalized tables, names adapted to repository conventions, for:

- career profile/field visibility/skill/evidence/verification/dispute
- resume/template/version/share/access receipt
- employer/organization relationship/contact/verification/risk/agreement/interaction
- job/role/location/package/component/version
- placement policy/rule/version/approval
- eligibility run/snapshot/criterion/result/appeal/exception
- drive/version/stage/schedule/capacity/population
- registration/consent/withdrawal/declaration/receipt
- disclosure schema/share/export/access/deletion receipt
- recruiter invitation/account assignment/access review
- shortlist/stage candidate/interview/panel/feedback/outcome
- offer/version/document/verification/decision/acceptance receipt
- joining/follow-up/evidence/verification
- training program/batch/session/trainer/registration/attendance/completion
- feedback/assessment/intervention/readiness/analytic run

Every tenant table has non-null tenant/institution scope, scope-consistent foreign keys where practical, RLS enabled and forced, least-privilege policies, and indexes supporting predicates. Add negative cross-tenant/student/employer/recruiter/drive/role tests.

Use exact decimal/currency fields, timezones, immutable receipt IDs, version lineage, optimistic versions, logical uniqueness, constraints for statuses and consent validity, and idempotency. Sensitive free text/documents use classification and restricted storage/search.

Flyway migrations are forward-only, rolling-compatible, restart-safe where applicable, and include backfill/validation strategy. Never edit an applied migration.

## 35. Security, privacy, and threat model

Update the threat model for:

- recruiter impersonation, invitation takeover, stale access, and employer cross-access
- IDOR/cross-tenant/cross-student/drive leakage
- resume/profile/document enumeration and public-link leakage
- consent bypass, purpose creep, withdrawn-consent access, and excessive exports
- eligibility/policy tampering or opaque discrimination
- shortlist/offer/import forgery and package manipulation
- concurrent offer acceptance and policy bypass
- interview/private-note and student-contact leakage
- spreadsheet/formula injection, malicious documents, stored XSS, and unsafe links
- provider/webhook spoofing and replay
- insider/admin/export abuse
- mobile cache, screenshots, backups, clipboard, notification, and deep-link leakage
- small-group analytics reidentification

Apply least privilege, RLS, field/document authorization, MFA/step-up, short-lived external roles/links, rate/volume/anomaly controls, CSP/encoding/validation, malware scanning, safe CSV/PDF generation, encryption/KMS/Secrets Manager, webhook verification, audit, immutable disclosure receipts, break-glass, access reviews, retention/erasure/legal hold, and incident notification.

Document lawful purpose/consent assumptions, data-subject correction/access/withdrawal routes, retention by record type, employer deletion obligations, residual risk, and launch blockers. Do not promise compliance solely because controls exist; require institutional legal/policy review.

## 36. Reliability, observability, and operations

Define SLOs for eligibility evaluation, drive publication, registration/consent receipt, recruiter access, stage transition, offer decision receipt, notification, report, and availability.

Instrument low-cardinality metrics/traces for policy compile/evaluation, batch progress/failure, registrations/withdrawals, recruiter auth/access/expiry, disclosures/exports, stage imports/transitions, offer concurrency conflicts, training attendance/completion, report jobs, notifications, and RLS denials.

Never log student/profile/resume fields, academic values, contact information, consent payloads, interviewer notes, package/offer content, document/object references, tokens, or URLs. Use masked stable correlations and safe reason codes.

Add dashboards, alerts, synthetic fixtures, policy/eligibility runbook, recruiter-compromise/revocation runbook, consent-withdrawal/data-deletion runbook, accidental-disclosure/export runbook, offer-concurrency/correction runbook, import recovery, provider outage, access review, backup/restore, DR, and cost/cardinality controls.

## 37. Tests

Add unit, property, contract, integration, RLS, end-to-end, web/mobile, security, accessibility, and representative-load tests.

At minimum test:

- career-profile provenance/visibility/verification/expiry/dispute and authoritative-source protection
- resume version/checksum/access/expiry/revocation and safe generation
- employer/contact verification, duplicate/merge, restriction, agreement expiry, recruiter invitation/MFA/expiry/revoke
- compensation component/currency/normalization/classification exactness
- policy validation/version/activation/precedence and no prohibited inputs
- eligibility golden matrices for programs, CGPA, backlogs, gaps, credits, skills, assessments, prior offers, missing/stale data, waiver, and source invalidation
- explainability/hash/reproducibility and simulation separation
- drive/version/registration/consent/withdrawal/stage/cancellation workflows
- share-schema field allowlists, withdrawn consent, recipient/purpose/expiry, download limits, disclosure receipts, and deletion acknowledgement
- recruiter cross-drive/employer/tenant/candidate denial at API and RLS layers
- shortlist/result/offer bulk import duplicate/unknown/partial failure/idempotency
- assessment/coding-result authorization and stale correction
- interview slot/timezone/capacity/conflict/reschedule/panel-blindness
- stage rubric/variance/finalization and no opaque automated rejection
- offer verification/version/release/accept/decline/withdraw/expire/joining
- concurrent offer acceptances and multiple-offer/dream-upgrade policy races
- joining evidence/conflict/unknown and accurate unique-student denominators
- training program/batch/session/capacity/attendance/correction/completion/feedback/privacy/intervention
- every web/mobile role permission and explicit denial
- Android/iOS encrypted cache, expiry/purge, generic push, deep-link reauthorization, step-up/receipt, accessibility, and offline restrictions
- CSV/spreadsheet/formula injection, malicious file/link, XSS, IDOR, rate limit, export abuse, and notification leakage
- canary searches proving sensitive fields/documents/tokens/links do not enter logs/events/traces/unauthorized DTOs
- migration, OpenAPI/generated-client, outbox/idempotency, observability, backup/restore, and rolling compatibility

Required end-to-end journeys:

1. Student creates a verified career profile and role-specific resume with controlled visibility.
2. Placement officer verifies an employer/job/package, activates policy, and creates/publishes a drive.
3. Eligibility is reproducible for eligible, ineligible, pending-data, and approved-exception candidates.
4. Student reviews exact sharing, consents/registers, receives a receipt, and later withdraws future access correctly.
5. Time-bound recruiter sees only consented approved fields, shortlists candidates, submits stage outcomes, and loses access at expiry.
6. Prompt 20 assessment and Prompt 21 coding results feed a governed stage without leaking responses/source/hidden tests.
7. Panels schedule and finalize GD/interview rubrics; authorized selection is released.
8. Verified offer is accepted under concurrent multiple-offer policy with one deterministic receipt, then joining is independently confirmed.
9. Training program runs from registration through attendance, assessment, feedback, intervention, and completion evidence.
10. Leadership views accurate unique selected/accepted/joined and package analytics with definitions/populations/exclusions.
11. Cross-tenant, recruiter-cross-drive, guardian, tenant-admin, and platform-ops leakage attempts fail.
12. Equivalent appropriate workflows work on web, Android, and iOS with accessibility checks.

Run repository-standard checks plus exact relevant commands for Java compile/test/static analysis, React typecheck/lint/unit/E2E/accessibility, Android/iOS tests, OpenAPI generation/diff, Flyway validation, RLS/security/canary leakage, dependency/container/IaC scans, and representative batch/concurrency tests. Report commands, exit codes, skipped checks, environment limitations, and evidence. Never claim a check passed if it was not run successfully.

Load tests must cover a season eligibility batch, synchronized drive publication/registration, notification fan-out, recruiter candidate views, bulk stage updates, concurrent offer decisions, training attendance, and dashboard/report generation. Report dataset, tenant/candidate/employer/drive scale, request/job mix, infrastructure, p50/p95/p99, throughput, errors/conflicts, DB connections/locks, queue lag, storage/report cost, bottlenecks, and pass/fail thresholds.

## 38. Seed/demo data

Add deterministic, obviously synthetic, production-disabled fixtures:

- programs/cohorts and students with varied academic/readiness evidence
- verified/prospect/restricted employers and contacts
- jobs with transparent package components and policy categories
- placement policy versions covering eligibility and multiple-offer upgrades
- eligible/ineligible/pending/exception outcomes
- drives with registration, assessment, coding, GD, technical, HR, selection, offer, and joining stages
- consented/withdrawn candidates and disclosure receipts
- recruiter invitations/assignments including expired/revoked cases
- verified/superseded/declined offers and joined/unknown outcomes
- training programs/batches/sessions/trainers/attendance/feedback/interventions

Use no real student/employer/contact data, credentials, offer letters, phone/email beyond reserved synthetic domains, copyrighted vendor content, or live provider calls. Seeders are idempotent and tenant-isolated.

## 39. Documentation and completion gate

Update:

- OpenAPI and generated clients
- data dictionary, statuses, permissions, classifications, consent and retention catalogues
- placement/training bounded-context ADR and integration contracts
- declarative policy/eligibility/package-normalization formal specification with golden cases
- privacy/consent/employer-sharing/recruiter threat model and data-flow diagrams
- employer/recruiter verification, invitation, access-review, expiry, and deletion guide
- career-profile/resume, student, placement officer, training coordinator/trainer, recruiter, interviewer, verifier, leadership, admin, privacy, and support guides
- web/native-mobile role-feature matrix and accessibility guide
- disclosure/export manifest and receipt specification
- placement-rate/offer/package/joining analytic definitions
- SLOs, load results, dashboards, alerts, and operational/security/privacy runbooks
- local/AWS configuration and provider setup without real secrets

Completion requires all of the following:

1. Students can maintain provenance-aware career profiles, verified evidence, visibility, and immutable resume versions.
2. Placement staff can govern verified employers/contacts/agreements, jobs, transparent packages, policies, and drives.
3. Eligibility is deterministic, explainable, versioned, reproducible, source-pinned, appealable, and contains no opaque/prohibited inference.
4. Candidates can review exact data sharing, consent, register/withdraw, and receive authoritative receipts without dark patterns.
5. Recruiters have verified, time-bound, drive/stage-scoped access only to consented approved fields/documents; every disclosure is logged and revocable.
6. Screening, Prompt 20/21 tests, GD, interviews, shortlisting, selection, and waitlist/rejection preserve versioned evidence and human accountability.
7. Offers preserve exact package/document/version, pass verification, obey concurrency-safe multiple-offer policy, and support student-controlled acceptance/decline receipts.
8. Joining is independently verified and analytics distinguish offers, unique students, acceptances, joined, and unknown outcomes truthfully.
9. Training programs support batches, sessions, trainers, attendance, content, feedback, assessments, completion, readiness gaps, and effectiveness.
10. Every relevant role has meaningful React web and native Android/iOS workflows or explicit justified web-first/read-only/denied capabilities.
11. Every tenant table has forced RLS and cross-tenant/student/employer/recruiter/drive/role negative tests; consent/privacy/SoD/audit/retention controls pass.
12. Bulk jobs, stage/offer concurrency, provider failure, notification, report, representative load, accessibility, security, and canary leakage tests pass.
13. OpenAPI/generated clients, migrations, docs, specifications, ADRs, dashboards, guides, and runbooks pass every environment-available check.
14. No employer data, job, offer, joining, provider result, or communication acknowledgement was fabricated.
15. Prompt 23 internship, academic project, team, guide, milestone, project-IP, and mentoring workflows were not implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, career profiles/skills/evidence/resumes/employers/contacts/agreements/jobs/packages/policies/eligibility/drives/consent/sharing/recruiters/stages/interviews/offers/joining/training/readiness/analytics, web, Android, iOS, security/privacy/tenancy/RLS/SoD/audit/idempotency/retention, representative load and all exact test/scan commands/results/exit status, docs/ADRs/runbooks, limitations/unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(placement): implement training drives recruiters and offers`

Stop. Do not begin Prompt 23 or implement internships, academic projects, teams, guides, milestones, project-IP, or mentoring workflows.
```

---

## Review Checklist Before Prompt 23

- Career profiles and resumes distinguish declared, verified, expired, disputed, and revoked evidence.
- Employer/job/package/policy versions are approved and material changes trigger impact/renewed acknowledgement.
- Eligibility is transparent, deterministic, source-pinned, reproducible, and free of opaque/prohibited inference.
- Consent is granular and recruiters see only approved fields for consented candidates during assigned windows.
- Every employer view/export has a disclosure receipt and future access is revocable.
- Stage decisions preserve human accountability and assessment/code details remain protected.
- Concurrent offer decisions cannot violate multiple-offer policy silently.
- Joining is independently confirmed; dashboards do not count offers as joined students.
- Training completion and readiness use transparent evidence and do not guarantee placement.
- Every relevant role has a suitable web/native-mobile workflow or intentional restriction.
- Every tenant table has forced RLS and negative isolation tests.
- No Prompt 23 internship/project/mentoring functionality was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 23 until these conditions pass.
