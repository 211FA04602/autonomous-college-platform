# Product Requirements Document

## Standalone Engineering College & Autonomous Institution Operating Platform

**Document version:** 1.1  
**Date:** September 3, 2026  
**Status:** Product definition / implementation-ready baseline  
**Product relationship:** New standalone product; independent from Institora, with optional future integration through APIs

---

## 1. Executive Summary

This product is a cloud-first operating platform designed specifically for engineering colleges, autonomous institutions, university-affiliated colleges, and multi-campus higher-education groups in India. It combines academic administration, autonomous examination governance, outcome-based education, student lifecycle management, fees and finance, faculty operations, placement and training, programming laboratories, accreditation evidence, communications, and institutional analytics in one configurable system.

The product will not be a school ERP modified for colleges. Its data model and workflows will natively understand programs, regulations, academic batches, semesters, credits, course registrations, electives, internal and external assessments, examination branches, Boards of Studies, result ratification, supplementary examinations, backlogs, CGPA, autonomy regulations, NBA/NAAC evidence, placement eligibility, and department-level administration.

The initial target is Indian engineering colleges and autonomous institutions, with configurable regulations to support university-affiliated colleges. The platform must support a single institution, multi-campus group, and SaaS multi-tenant deployment from the same codebase.

---

## 2. Product Vision

Create the institutional operating system for an engineering college—from admission to graduation and placement—with auditable academic governance, reliable examination processing, measurable learning outcomes, and a modern digital experience for students, faculty, parents, administrators, and employers.

### 2.1 Value proposition

- Replace disconnected ERP, examination, LMS, fee, placement, accreditation, coding-test, and communication tools.
- Give autonomous institutions complete control over regulations, curricula, assessment schemes, credits, grading, result processing, and governance approvals.
- Reduce manual examination work and eliminate spreadsheet-based result processing.
- Connect curriculum, teaching, assessment, outcomes, skill development, and placement readiness.
- Provide leadership with real-time, drill-down institutional intelligence.
- Deliver configurable workflows without institution-specific code forks.
- Give students a single mobile and web experience for their full college lifecycle.

### 2.2 Product principles

1. **College-native:** Programs, semesters, regulations, credits, electives, backlogs, and autonomy are first-class concepts.
2. **Configuration over customization:** Rules, approval chains, templates, and terminology are configurable.
3. **Auditability by default:** Every academic, financial, and examination change is traceable.
4. **Separation of duties:** Question setters, moderators, evaluators, exam administrators, approvers, and publishers have distinct permissions.
5. **Native mobile and mobile-first self-service:** Every product role receives an authorized Android/iOS interface appropriate to that role. Routine tasks should not require visits to an office counter.
6. **Open integration:** APIs and events connect biometric devices, payment gateways, university systems, LMS tools, and finance platforms.
7. **Progressive implementation:** Institutions can enable modules in phases without data duplication.
8. **Human-approved AI:** AI assists content, analysis, and operations; authorized humans approve consequential academic decisions.

---

## 3. Goals and Success Metrics

### 3.1 Business goals

- Win engineering colleges and autonomous institutions that have outgrown generic school ERPs.
- Create recurring SaaS revenue through per-student, per-module, or enterprise licensing.
- Reduce implementation time through templates for common autonomous-college regulations.
- Establish examination processing, outcome-based education, and employability as key differentiators.

### 3.2 Product goals

- Digitize the complete student lifecycle from enquiry through alumni status.
- Process regular, supplementary, improvement, and backlog examinations without offline spreadsheets.
- Provide traceability from course outcomes to questions, assessments, student attainment, and program outcomes.
- Support programming practice, assignments, coding exams, and placement assessments.
- Provide role-specific dashboards and self-service experiences.

### 3.3 Target success metrics

| Metric | Target after institutional rollout |
|---|---:|
| Student master-data completeness | ≥ 98% |
| Attendance entered by deadline | ≥ 95% of sessions |
| Examination processes completed without external spreadsheets | ≥ 95% |
| Published-result calculation errors attributable to software | 0 critical errors |
| Online fee reconciliation | ≥ 99.5% automatically reconciled |
| Student self-service adoption | ≥ 85% monthly active students |
| Faculty weekly active usage | ≥ 90% |
| Placement profile completeness for eligible students | ≥ 95% |
| Reduction in examination processing time | ≥ 50% |
| Reduction in repetitive certificate/service requests | ≥ 60% |
| Critical API availability | ≥ 99.9% monthly |

---

## 4. Scope

### 4.1 Target institutions

- Autonomous engineering colleges
- University-affiliated engineering colleges
- Deemed-to-be university schools of engineering
- Engineering-college groups with multiple campuses
- Polytechnic and technology institutions through configurable terminology
- Institutions offering B.Tech/B.E., M.Tech/M.E., MCA, MBA, diploma, and related programs

### 4.2 Product pillars

1. Institution, program, curriculum, and academic operations
2. Autonomous examination and result governance
3. Outcome-Based Education and accreditation
4. Student information, admissions, and lifecycle
5. Faculty, workload, attendance, and performance
6. Fees, payments, scholarships, and institutional commerce
7. Learning content, assignments, and assessments
8. Programming lab and coding examinations
9. Training, placements, internships, and employability
10. Library, hostel, transport, visitor, inventory, and service operations
11. Communication and mobile self-service
12. Analytics, automation, integrations, security, and audit

### 4.3 Explicitly out of scope for the first release

- Full general ledger and statutory accounting replacement
- Full payroll compliance engine for every Indian state
- Research grant accounting and patent lifecycle management
- Hospital/medical-college clinical records
- Native video conferencing infrastructure
- AI-only evaluation of high-stakes subjective examinations without human approval
- Hardware manufacture for biometric, RFID, GPS, or access-control devices

---

## 5. Stakeholders and Personas

| Persona | Primary needs |
|---|---|
| Group Chairman/Management | Cross-campus KPIs, finance, risk, admissions, results, placements |
| Principal/Director | Institution performance, approvals, compliance, academic progress |
| Dean Academics | Calendar, curriculum, registrations, delivery, outcomes |
| Controller of Examinations | Secure and auditable end-to-end examination processing |
| Examination Branch Staff | Applications, eligibility, hall tickets, logistics, marks, results |
| Head of Department | Faculty workload, attendance, academic delivery, results, outcomes |
| Program Coordinator | Curriculum execution, course files, attainment, student progression |
| Faculty | Timetable, attendance, content, assignments, marks, advising |
| Mentor/Counselor | Student risk, attendance, academics, interventions, communication |
| Student | Registration, schedule, learning, exams, fees, services, placements |
| Parent/Guardian | Authorized visibility into attendance, fees, performance, alerts |
| Admissions Team | Enquiries, applications, documents, selection, onboarding |
| Finance Team | Fees, scholarships, receipts, reconciliation, dues, refunds |
| HR Team | Employee records, attendance, leave, workload, appraisal |
| Placement Officer | Employers, drives, eligibility, training, offers, analytics |
| Trainer | Batches, content, assessments, readiness, interventions |
| Librarian | Catalog, circulation, inventory, fines, digital resources |
| Hostel/Transport/Admin Staff | Allocation, movement, fees, incidents, services |
| Accreditation/IQAC Coordinator | NBA/NAAC evidence, outcomes, audits, action tracking |
| Employer/Recruiter | Drives, eligible candidates, tests, interview outcomes |
| External Examiner/Evaluator | Restricted assignment, evaluation, moderation, submission |
| Platform Super Administrator | Tenant provisioning, plans, support, health, controlled access |

---

## 6. Organization and Academic Master Data

### 6.1 Institutional hierarchy

**FR-ORG-001:** Configure an education group, institutions, campuses, schools/faculties, departments, centers, and administrative units.  
**FR-ORG-002:** Support separate codes, regulatory affiliations, addresses, bank accounts, branding, domains, and document templates per institution/campus.  
**FR-ORG-003:** Permit authorized group users to switch institutions and view consolidated analytics without merging tenant data.  
**FR-ORG-004:** Configure academic terminology such as program/branch, course/subject, batch/cohort, section, semester/term, and regulation/scheme.  
**FR-ORG-005:** Maintain statutory and accreditation identifiers including AISHE, AICTE, university affiliation, NAAC, NBA, and institution codes.

### 6.2 Programs, regulations, and curriculum

**FR-CUR-001:** Define programs, degrees, departments, duration, entry type, intake, academic level, and award requirements.  
**FR-CUR-002:** Version regulations by admission batch and academic year. Published regulations become immutable; amendments create controlled versions.  
**FR-CUR-003:** Define semester structures, minimum/maximum credits, promotion rules, attendance rules, grading scales, pass criteria, and degree-completion rules.  
**FR-CUR-004:** Build curriculum structures with core, professional elective, open elective, laboratory, project, internship, audit, mandatory non-credit, honors, and minor courses.  
**FR-CUR-005:** Define prerequisites, co-requisites, equivalencies, substitutions, anti-requisites, and course-offering frequency.  
**FR-CUR-006:** Maintain course codes, titles, credits, L-T-P structure, contact hours, syllabus, units, textbooks, references, and learning resources.  
**FR-CUR-007:** Map Course Outcomes (COs) to Program Outcomes (POs), Program-Specific Outcomes (PSOs), Bloom's levels, and Sustainable Development Goals where required.  
**FR-CUR-008:** Support curriculum migration and credit equivalence when students move between regulations or programs.  
**FR-CUR-009:** Record Board of Studies proposals, reviewers, meeting decisions, approvals, effective dates, and supporting documents.  
**FR-CUR-010:** Generate curriculum books, scheme documents, syllabus books, course structures, and revision comparisons.

### 6.3 Academic calendar and offerings

**FR-ACA-001:** Create academic years, semesters, instructional periods, holidays, examination windows, registration dates, and result deadlines.  
**FR-ACA-002:** Create course offerings by campus, department, program, semester, section, and faculty.  
**FR-ACA-003:** Allocate rooms, laboratories, capacity, faculty, and teaching assistants.  
**FR-ACA-004:** Generate and manually adjust conflict-aware timetables.  
**FR-ACA-005:** Publish separate student, faculty, room, laboratory, department, and examination calendars.  
**FR-ACA-006:** Track planned versus delivered hours and syllabus coverage.

---

## 7. Identity, Access, and Governance

**FR-IAM-001:** Support users with one or more institutional memberships and roles.  
**FR-IAM-002:** Provide configurable RBAC with scope by institution, campus, department, program, batch, section, course, and examination.  
**FR-IAM-003:** Support separation-of-duties rules for high-risk examination and finance operations.  
**FR-IAM-004:** Support password, OTP, passkey-ready authentication, and optional institutional SSO using SAML/OIDC.  
**FR-IAM-005:** Require MFA for privileged roles and sensitive exam actions.  
**FR-IAM-006:** Provide time-bound guest accounts for external examiners, recruiters, auditors, and evaluators.  
**FR-IAM-007:** Record login history, failed attempts, sessions, devices, impersonation, and privileged access.  
**FR-IAM-008:** Platform support access must require tenant approval, be time-bound, prominently disclosed, and fully audited.  
**FR-IAM-009:** Provide approval workflows with serial, parallel, quorum, delegation, escalation, and digital acknowledgement options.  
**FR-IAM-010:** Prevent deletion of published academic and financial records; use reversal, correction, or versioned amendment workflows.

---

## 8. Admissions and Student Lifecycle

### 8.1 CRM and admissions

**FR-ADM-001:** Capture enquiries from website, walk-in, phone, campaign, referral, and bulk imports.  
**FR-ADM-002:** Track source, counselor, follow-ups, communication, interests, eligibility, and conversion stages.  
**FR-ADM-003:** Provide configurable online applications by program, admission category, quota, and entry type.  
**FR-ADM-004:** Collect documents with type, validity, verification status, comments, and resubmission.  
**FR-ADM-005:** Support entrance scores, rankings, merit lists, reservations/categories, seat matrices, offers, waitlists, and admission approvals.  
**FR-ADM-006:** Collect application, admission, and initial tuition fees online.  
**FR-ADM-007:** Convert an accepted applicant into a student without re-entering data.  
**FR-ADM-008:** Generate enrollment numbers, roll numbers, institutional email requests, ID cards, and onboarding checklists.  
**FR-ADM-009:** Track admitted, cancelled, withdrawn, refunded, no-show, and deferred applicants.  
**FR-ADM-010:** Provide funnel, counselor, campaign, program-demand, seat-fill, and revenue analytics.

### 8.2 Student record

**FR-STU-001:** Maintain demographic, contact, guardian, academic, category, identity, medical-alert, bank, scholarship, transport, hostel, and prior-education information with field-level privacy.  
**FR-STU-002:** Store versioned documents and verification history.  
**FR-STU-003:** Track program, regulation, cohort, semester, section, status, mentor, credits, GPA, backlogs, and progression.  
**FR-STU-004:** Support lateral entry, transfer, break-in-study, readmission, program change, regulation migration, detention, withdrawal, and discontinuation.  
**FR-STU-005:** Maintain a unified timeline of academic, fee, attendance, disciplinary, service, placement, and communication events.  
**FR-STU-006:** Provide configurable holds that can restrict registration, hall tickets, certificates, or graduation based on authorized rules.  
**FR-STU-007:** Support student data correction requests with evidence and approval.  
**FR-STU-008:** Graduate eligible students and transition them to alumni while preserving access rules and records.

---

## 9. Course Registration and Academic Progression

**FR-REG-001:** Generate a student's eligible registration plan using program, regulation, completed prerequisites, failures, credits, and holds.  
**FR-REG-002:** Support regular, elective, audit, add/drop, withdrawal, repeat, improvement, honors, minor, and summer registrations.  
**FR-REG-003:** Enforce capacity, timetable conflict, prerequisite, maximum-credit, backlog, and program rules.  
**FR-REG-004:** Support student preference ranking and configurable elective-allocation algorithms.  
**FR-REG-005:** Route exceptional registrations through adviser/HOD/Dean approval.  
**FR-REG-006:** Lock and publish registration rosters with an audit snapshot.  
**FR-REG-007:** Track credit accumulation, promotion eligibility, year/semester standing, and expected graduation.  
**FR-REG-008:** Run degree-audit rules and show missing requirements to students and advisers.

---

## 10. Attendance, Timetable, and Teaching Operations

**FR-ATT-001:** Record period-wise, session-wise, laboratory, tutorial, project, internship, and event attendance.  
**FR-ATT-002:** Support faculty entry, bulk entry, biometric devices, QR, RFID, and approved API integrations.  
**FR-ATT-003:** Detect timetable substitutions and ensure only authorized faculty record attendance.  
**FR-ATT-004:** Allow correction requests with reason, evidence, approval, deadline, and audit trail.  
**FR-ATT-005:** Calculate course-wise attendance under configurable rules for conducted, attended, duty leave, medical leave, condoned, and exempted sessions.  
**FR-ATT-006:** Generate progressive shortage alerts to students, mentors, parents, HODs, and administrators.  
**FR-ATT-007:** Support detention recommendations, condonation eligibility, approval, fee collection, and final examination eligibility.  
**FR-ATT-008:** Provide faculty punctuality, missed-session, replacement, and workload reports.  
**FR-ATT-009:** Permit attendance freeze and controlled reopening by period.  
**FR-ATT-010:** Store the rule and source values used for each eligibility decision.

### Teaching delivery

**FR-TEA-001:** Faculty shall create course plans mapped to syllabus units, COs, Bloom's level, planned dates, and teaching methods.  
**FR-TEA-002:** Record daily topics, actual hours, notes, resources, assignments, and delivery status.  
**FR-TEA-003:** Track syllabus progress against plan and flag at-risk courses.  
**FR-TEA-004:** Manage faculty substitution and compensatory classes.  
**FR-TEA-005:** Maintain a digital course file containing plan, attendance, materials, assessments, samples, results, CO attainment, feedback, and corrective action.

---

## 11. Learning Management and Content

**FR-LMS-001:** Create courses with modules, topics, files, links, video references, SCORM-ready packages, and release schedules.  
**FR-LMS-002:** Create individual/group assignments with rubrics, deadlines, resubmissions, plagiarism integration, and grading.  
**FR-LMS-003:** Support announcements, moderated discussions, doubts, polls, and academic Q&A.  
**FR-LMS-004:** Provide question banks organized by institution, department, course, regulation, unit, topic, outcome, Bloom's level, type, and difficulty.  
**FR-LMS-005:** Support MCQ, multiple-select, numerical, fill-in, matching, ordering, short answer, essay, file upload, code, and SQL question types.  
**FR-LMS-006:** Enforce author-reviewer-approver workflows and maintain question versions.  
**FR-LMS-007:** Track content ownership, source, license, usage permission, expiry, and sharing scope.  
**FR-LMS-008:** Allow cross-course reuse only through explicit permissions and copies/version links.  
**FR-LMS-009:** Provide learning-progress, engagement, completion, and weak-topic analytics.  
**FR-LMS-010:** Support accessibility metadata, captions, alternate formats, and keyboard-compatible delivery.

---

## 12. Autonomous Examination Management

### 12.1 Examination configuration

**FR-EXM-001:** Configure examination types including internal, mid, semester-end, laboratory, practical, project, viva, supplementary, backlog, improvement, makeup, and special examinations.  
**FR-EXM-002:** Define component weights, maximum/minimum marks, internal/external rules, combined-pass rules, grace marks, rounding, absent/malpractice codes, and moderation.  
**FR-EXM-003:** Version examination rules by regulation and cohort.  
**FR-EXM-004:** Configure examination application dates, fees, late fees, eligibility, exemptions, and approvals.  
**FR-EXM-005:** Build exam calendars and course schedules with conflict detection.

### 12.2 Eligibility and applications

**FR-EXM-010:** Automatically determine eligibility from registration, attendance, fees, disciplinary holds, internal marks, and regulation rules.  
**FR-EXM-011:** Allow authorized exception recommendations and multi-level approvals.  
**FR-EXM-012:** Support online examination applications, backlog selection, fee calculation, payment, receipt, and correction windows.  
**FR-EXM-013:** Freeze eligible candidate lists and preserve decision snapshots.  
**FR-EXM-014:** Generate hall tickets with secure QR/barcode and configurable instructions.

### 12.3 Question-paper governance

**FR-EXM-020:** Create confidential paper-setting assignments for internal/external setters without exposing unnecessary candidate data.  
**FR-EXM-021:** Support blueprinting by unit, marks, question type, CO, Bloom's level, and difficulty.  
**FR-EXM-022:** Accept multiple paper sets and encrypted uploads with controlled opening windows.  
**FR-EXM-023:** Support moderation, correction, approval, translation, finalization, and random/set selection.  
**FR-EXM-024:** Watermark downloads and record viewer, device, IP, timestamp, and action.  
**FR-EXM-025:** Enforce two-person control for final paper release.  
**FR-EXM-026:** Support secure printing/dispatch logs and post-exam archival policies.  
**FR-EXM-027:** Maintain conflict-of-interest declarations for setters, moderators, and evaluators.

### 12.4 Logistics and conduct

**FR-EXM-030:** Allocate centers, buildings, rooms, seats, invigilators, relievers, and chief superintendents.  
**FR-EXM-031:** Generate seating charts, room packets, attendance sheets, nominal rolls, invigilator orders, and dispatch registers.  
**FR-EXM-032:** Avoid prohibited seating adjacency using configurable constraints.  
**FR-EXM-033:** Record attendance, late entry, early exit, booklet/barcode numbers, incidents, and malpractice cases.  
**FR-EXM-034:** Track answer-script collection, bundling, handover, custody, and receipt using barcodes where enabled.  
**FR-EXM-035:** Support practical/lab schedules, batches, external examiners, viva panels, and marks submission.

### 12.5 Evaluation and marks

**FR-EXM-040:** Assign anonymized answer scripts or candidate groups to evaluators.  
**FR-EXM-041:** Support on-screen evaluation as an optional module, including page images, annotations, question-wise marks, rubrics, and review.  
**FR-EXM-042:** Support double evaluation, chief evaluation, variance thresholds, third evaluation, and moderation.  
**FR-EXM-043:** Validate totals, component maximums, missing questions, absences, malpractice, and pass rules before submission.  
**FR-EXM-044:** Lock submitted marks; changes require a formal correction workflow.  
**FR-EXM-045:** Import marks from controlled templates or APIs with schema and reconciliation validation.  
**FR-EXM-046:** Record full provenance for every mark: source, evaluator/import, rule version, corrections, approvers, and timestamps.

### 12.6 Result processing

**FR-EXM-050:** Calculate totals, grades, grade points, credits earned, SGPA, CGPA, classification, and progression using versioned regulations.  
**FR-EXM-051:** Support relative or absolute grading, moderation, normalization, grace marks, and special cases.  
**FR-EXM-052:** Execute result processing in preview/simulation mode before approval.  
**FR-EXM-053:** Produce validation reports for missing marks, abnormal distributions, pass percentages, rule conflicts, and changed results.  
**FR-EXM-054:** Route results through Controller, Dean, Principal, result committee, Academic Council, or configurable approval chains.  
**FR-EXM-055:** Freeze a signed result version before publication.  
**FR-EXM-056:** Publish results simultaneously or by program/course with student notifications.  
**FR-EXM-057:** Generate grade cards, consolidated marks memos, provisional certificates, transcripts, degree eligibility lists, and result gazettes using versioned templates.  
**FR-EXM-058:** Provide QR-verifiable documents with privacy-safe validation.  
**FR-EXM-059:** Support withholding and later release with authorized reasons.

### 12.7 Post-result services

**FR-EXM-060:** Accept online recounting, revaluation, challenge valuation, photocopy, and grievance applications.  
**FR-EXM-061:** Calculate fees, assign evaluators, track SLA, record decisions, and issue revised results.  
**FR-EXM-062:** Preserve original and revised results and show legal/audit history.  
**FR-EXM-063:** Create supplementary/backlog cycles from eligible failures.  
**FR-EXM-064:** Track active backlogs, attempts, maximum-duration rules, credit completion, and degree eligibility.  
**FR-EXM-065:** Provide examination dashboards for pass percentage, grade distribution, course performance, evaluator progress, malpractice, grievances, and turnaround time.

---

## 13. Online Assessment Engine

**FR-OAE-001:** Create timed, scheduled, open-window, practice, proctored, and take-home assessments.  
**FR-OAE-002:** Support sections, optional questions, navigation rules, randomization, pools, negative marks, partial marks, and per-question time guidance.  
**FR-OAE-003:** Autosave responses and tolerate transient network interruptions without losing submitted answers.  
**FR-OAE-004:** Support configurable attempt limits, resume policy, late submission, accommodations, and extra time.  
**FR-OAE-005:** Auto-evaluate objective, numeric, code, and SQL responses; route subjective responses to faculty.  
**FR-OAE-006:** Provide browser-event logs, device/IP signals, question-copy controls, and integration hooks for approved proctoring tools.  
**FR-OAE-007:** Provide question quality, distractor, difficulty, discrimination, speed, accuracy, topic, and outcome analytics.  
**FR-OAE-008:** Support ranks, percentiles, normalization, cohort comparisons, and readiness reports where assessment policy requires them.  
**FR-OAE-009:** Keep competitive/placement assessments logically separate from official semester result records while permitting authorized analytics links.

---

## 14. Outcome-Based Education and Accreditation

**FR-OBE-001:** Maintain mission, vision, PEOs, POs, PSOs, COs, mappings, rationales, and approval history.  
**FR-OBE-002:** Map individual assessment questions and rubric criteria to COs and Bloom's levels.  
**FR-OBE-003:** Calculate direct attainment using configurable targets, thresholds, weights, and population rules.  
**FR-OBE-004:** Calculate indirect attainment from surveys and feedback with configurable weighting.  
**FR-OBE-005:** Roll CO attainment into PO/PSO attainment using approved mapping strengths and formulas.  
**FR-OBE-006:** Support exclusion rules transparently and preserve calculation snapshots.  
**FR-OBE-007:** Identify attainment gaps and require corrective action, owner, deadline, evidence, review, and closure.  
**FR-OBE-008:** Generate course, program, department, and institution attainment reports.  
**FR-OBE-009:** Maintain NBA/NAAC/IQAC evidence repositories organized by criteria, metric, year, owner, and approval.  
**FR-OBE-010:** Track accreditation tasks, data requests, reviews, observations, actions, and evidence expiry.  
**FR-OBE-011:** Generate faculty course files and evidence indexes without duplicating authoritative records.  
**FR-OBE-012:** Support graduate-exit, alumni, employer, course-end, and stakeholder surveys.

---

## 15. Programming Lab and Coding Assessment

### 15.1 Learning workspace

**FR-COD-001:** Provide browser-based editors for C, C++, Java, Python, JavaScript/TypeScript, and SQL.  
**FR-COD-002:** Provide isolated per-student workspaces, folders, files, autosave, version history, and restore.  
**FR-COD-003:** Support course-linked exercises, faculty demonstrations, templates, starter code, and reference material.  
**FR-COD-004:** Execute code in isolated, resource-limited sandboxes with no unauthorized network or host access.  
**FR-COD-005:** Capture compiler output, runtime output, execution time, memory, test results, and submission history.  
**FR-COD-006:** Provide SQL schemas and resettable databases isolated by student/attempt.

### 15.2 Assignments and examinations

**FR-COD-010:** Faculty can author programming problems with public/hidden tests, constraints, scoring, time/memory limits, languages, and rubrics.  
**FR-COD-011:** Support assignments, practice contests, laboratory records, internal exams, hackathons, and placement tests.  
**FR-COD-012:** Auto-grade correctness, performance, and configurable style checks; permit faculty override with reason.  
**FR-COD-013:** Detect suspicious similarity using pluggable analysis and provide evidence for human review rather than automatic punishment.  
**FR-COD-014:** Freeze exam workspaces, randomize problem sets, restrict copy/paste where policy permits, and maintain attempt event logs.  
**FR-COD-015:** Generate student, course, topic, language, and cohort skill analytics.  
**FR-COD-016:** Create competency profiles linking coding performance to placement readiness.  
**FR-COD-017:** Scale sandbox execution independently from the transactional platform.

---

## 16. Training, Placement, Internship, and Employability

### 16.1 Student career profile

**FR-PLC-001:** Maintain education, skills, certifications, projects, internships, achievements, preferences, resume versions, and verified evidence.  
**FR-PLC-002:** Calculate eligibility using employer rules such as program, graduation year, CGPA, active backlogs, gap years, skills, and prior offers.  
**FR-PLC-003:** Allow institutions to configure placement policies including dream/super-dream categories and multiple-offer restrictions.

### 16.2 Employers and drives

**FR-PLC-010:** Maintain employer, contacts, roles, packages, locations, job descriptions, agreements, and history.  
**FR-PLC-011:** Create campus drives with stages, deadlines, eligibility, capacity, documents, and communications.  
**FR-PLC-012:** Notify eligible students and accept registrations/consent.  
**FR-PLC-013:** Share approved candidate data with employers using consent and minimum-data principles.  
**FR-PLC-014:** Track screening, tests, group discussions, technical interviews, HR interviews, offers, acceptance, joining, and rejection reasons.  
**FR-PLC-015:** Store offer letters, verify packages, and track multiple offers and joining status.  
**FR-PLC-016:** Provide employer/recruiter portals with restricted access.

### 16.3 Training and readiness

**FR-PLC-020:** Plan aptitude, communication, technical, coding, interview, and domain training.  
**FR-PLC-021:** Manage trainers, batches, attendance, content, assessments, feedback, and outcomes.  
**FR-PLC-022:** Conduct department-, employer-, and role-specific tests using the online assessment and coding engines.  
**FR-PLC-023:** Provide readiness dashboards showing skill gaps, interventions, mock performance, and eligibility risk.  
**FR-PLC-024:** Recommend learning activities with adviser/trainer oversight.

### 16.4 Internships and projects

**FR-PLC-030:** Manage internship opportunities, applications, approvals, mentors, documents, attendance, reviews, and completion.  
**FR-PLC-031:** Manage major/minor projects, teams, guides, proposals, milestones, reviews, rubrics, plagiarism checks, demos, and final artifacts.  
**FR-PLC-032:** Track industry mentors and employer feedback.  
**FR-PLC-033:** Generate placement, internship, higher-study, entrepreneurship, and outcome analytics.

---

## 17. Fees, Payments, Scholarships, and Commerce

**FR-FIN-001:** Configure fee heads, programs, cohorts, categories, quotas, semesters, due dates, installments, penalties, concessions, and taxes where applicable.  
**FR-FIN-002:** Generate individual and bulk fee demands with immutable source rules.  
**FR-FIN-003:** Support online payment gateways, UPI intent, net banking, cards, approved wallets, bank transfers, and counter collections.  
**FR-FIN-004:** Support QR-assisted counter payments while retaining cashier, mode, time, and reconciliation details.  
**FR-FIN-005:** Issue numbered receipts via app, web, email, and configured messaging channels.  
**FR-FIN-006:** Handle pending, failed, duplicate, reversed, refunded, disputed, and chargeback transactions idempotently.  
**FR-FIN-007:** Import bank/gateway settlement files and automatically reconcile transactions, fees, and settlements.  
**FR-FIN-008:** Support scholarships, government reimbursement, sponsorship, waivers, concessions, and approval workflows.  
**FR-FIN-009:** Manage exam, condonation, revaluation, transcript, certificate, hostel, transport, library, event, course, and placement-training fees.  
**FR-FIN-010:** Apply configurable holds and release them automatically after qualifying payment/reconciliation.  
**FR-FIN-011:** Provide aging, collection, receivable, concession, refund, settlement, and audit reports.  
**FR-FIN-012:** Export journals or transactions to accounting systems through secure integrations.

### Institutional commerce

**FR-COM-001:** Create catalogs for applications, certificates, courses, events, books, stationery, uniforms, and other approved services/products.  
**FR-COM-002:** Support eligibility, inventory, variants, price lists, order windows, pickup/delivery, refunds, and invoices.  
**FR-COM-003:** Keep institutional commerce optional and separately configurable from mandatory fees.  
**FR-COM-004:** Provide product/service revenue, inventory, fulfillment, and settlement analytics.

---

## 18. Faculty and Human Resources

**FR-HR-001:** Maintain employee records, qualifications, experience, documents, appointments, service history, departments, and roles.  
**FR-HR-002:** Support recruitment requisitions, applicants, interviews, offers, onboarding, and document verification.  
**FR-HR-003:** Track biometric/manual attendance, shifts, leave, permissions, on-duty requests, holidays, and approval balances.  
**FR-HR-004:** Calculate teaching, laboratory, mentoring, research, examination, administrative, and additional workloads.  
**FR-HR-005:** Detect overload, under-allocation, timetable conflict, and compliance gaps.  
**FR-HR-006:** Support goal setting, appraisal, student feedback, peer/manager review, achievements, training, and improvement plans.  
**FR-HR-007:** Manage faculty eligibility and assignment for course, paper-setting, moderation, invigilation, and evaluation duties.  
**FR-HR-008:** Maintain payroll inputs and export them; full statutory payroll may remain an integration/module.  
**FR-HR-009:** Provide faculty self-service for profile, attendance, leave, workload, timetable, payslip integration, and assigned actions.

---

## 19. Library and Digital Resources

**FR-LIB-001:** Maintain books, journals, media, copies, accession numbers, barcodes/RFID, locations, vendors, and status.  
**FR-LIB-002:** Configure member categories, limits, issue periods, renewals, reservations, holds, and fines.  
**FR-LIB-003:** Perform issue, return, renew, reserve, lost, damaged, repair, and write-off workflows.  
**FR-LIB-004:** Provide OPAC search and student/faculty self-service.  
**FR-LIB-005:** Integrate fines and replacement charges with payments.  
**FR-LIB-006:** Manage digital-resource links, entitlements, licenses, and usage metadata without unlawfully redistributing content.  
**FR-LIB-007:** Provide circulation, inventory, overdue, demand, acquisition, and utilization reports.

---

## 20. Hostel, Transport, Visitor, Inventory, and Services

### Hostel

**FR-HOS-001:** Configure hostels, blocks, floors, rooms, beds, capacities, categories, and fees.  
**FR-HOS-002:** Manage applications, allocation, check-in/out, room change, vacating, visitor permissions, leave/out-pass, and incidents.  
**FR-HOS-003:** Integrate hostel fees, mess charges, deposits, damages, and refunds.  
**FR-HOS-004:** Track occupancy, vacancies, dues, incidents, and maintenance.

### Transport

**FR-TRN-001:** Manage vehicles, documents, drivers, attendants, routes, stops, capacity, schedules, and student/staff allocation.  
**FR-TRN-002:** Integrate GPS, RFID/QR boarding, check-in/out, and parent/student notifications.  
**FR-TRN-003:** Track route deviations, delays, breakdowns, incidents, maintenance, fuel, and document expiry.  
**FR-TRN-004:** Integrate transport fee eligibility and collection.

### Visitor and access

**FR-VIS-001:** Pre-register or register visitors with host, purpose, identification, photo, vehicle, items, and consent.  
**FR-VIS-002:** Support approval, badge/pass, check-in/out, overstays, deny/watch lists, and emergency roll calls.  
**FR-VIS-003:** Maintain privacy-controlled visitor logs and retention rules.

### Inventory, assets, and service desk

**FR-AST-001:** Maintain stores, items, assets, serials, categories, vendors, purchase references, locations, custodians, and lifecycle status.  
**FR-AST-002:** Support requests, issue/return, transfers, stock counts, minimum levels, consumables, disposal, and audit.  
**FR-AST-003:** Track laboratories, equipment, calibration, warranty, AMC, maintenance, downtime, and usage.  
**FR-SVC-001:** Provide a service-request portal for certificates, IT, facilities, hostel, transport, library, finance, and academic services.  
**FR-SVC-002:** Configure forms, documents, fees, routing, SLA, escalation, status, communication, and delivery.  
**FR-SVC-003:** Provide complaint, grievance, anti-ragging, discipline, and confidential escalation workflows with strict access controls.

---

## 21. Communication and Engagement

**FR-CMN-001:** Send targeted app, push, email, SMS, and approved messaging-channel communications by role, campus, department, program, cohort, section, course, hostel, route, or custom audience.  
**FR-CMN-002:** Provide templates, multilingual content, personalization, scheduling, approval, quiet hours, retries, delivery receipts, and opt-out rules.  
**FR-CMN-003:** Trigger transactional messages from attendance, examinations, fees, placements, services, and emergencies.  
**FR-CMN-004:** Maintain announcements, circulars, acknowledgement, attachments, and expiry.  
**FR-CMN-005:** Support student–faculty–mentor conversations with institutional retention and moderation policies.  
**FR-CMN-006:** Provide emergency broadcasts with escalation and acknowledgement.  
**FR-CMN-007:** Provide communication cost, delivery, failure, engagement, and consent analytics.  
**FR-CMN-008:** Parent access must be configurable by institution and student age/consent policy.

---

## 22. Portals and Mobile Experiences

### 22.1 Student app/web

- Profile and documents
- Registration and degree audit
- Timetable, attendance, syllabus, content, and assignments
- Examination applications, hall tickets, schedules, results, and grievances
- Fees, receipts, dues, refunds, and service purchases
- Coding workspace and assessments
- Placement profile, training, drives, internships, and offers
- Library, hostel, transport, visitor approvals, and service requests
- Notifications, calendar, acknowledgements, and support
- Downloadable, QR-verifiable institutional documents

### 22.2 Faculty app/web

- Timetable and course dashboard
- Attendance and teaching diary
- Content, assignments, assessments, and marks
- Mentoring, advisee risks, and interventions
- OBE mappings, attainment, course file, and actions
- Examination duties and secure submissions
- Workload, attendance, leave, feedback, and appraisal
- Notifications and approvals

### 22.3 Leadership and administration

- Role-specific operational work queues
- Drill-down dashboards from group to student/course level
- Exception, delay, risk, compliance, and approval alerts
- Report builder with governed access and export controls
- Configurations and master-data quality dashboards

### 22.4 Employer/external portals

- Time-bound, purpose-specific access
- Employer drive and candidate workflows
- External paper setter/evaluator workflows
- Auditor/accreditation evidence access
- No visibility outside assigned records

### 22.5 Native mobile product architecture

The product shall provide a React + TypeScript responsive web application and first-class React Native + TypeScript applications for Android and iOS, all backed by the same versioned Spring Boot APIs. Android and iOS shall share a governed React Native codebase with platform-specific native implementations where security, accessibility, device capability, or user experience requires them. The native applications shall not be WebView wrappers.

Every role in this PRD must be able to authenticate and access a role-appropriate mobile interface. Users with multiple roles or institutional memberships can switch role, tenant, institution, and campus context without installing separate applications. Information-dense setup and bulk administration may remain web-first, but the mobile application must provide status, exceptions, approvals, incidents, and time-sensitive actions for the responsible roles.

#### Universal mobile requirements

**FR-MOB-001:** Use OIDC/OAuth system-browser authentication with PKCE, secure token storage, server session control, remote revocation, and step-up authentication for sensitive actions.  
**FR-MOB-002:** Validate every tenant, institution, campus, role, and scope switch at the backend.  
**FR-MOB-003:** Provide role-based home, inbox, notifications, authorized search, calendar, profile, help, and settings.  
**FR-MOB-004:** Support push notifications, deep links, acknowledgement, preferences, quiet hours, expiry, and revoked-link handling.  
**FR-MOB-005:** Support camera capture, document scanning/upload, QR/barcode scanning, secure file preview, controlled sharing, and download policy.  
**FR-MOB-006:** Support encrypted local caching, draft persistence, queued idempotent mutations, visible synchronization status, retry, conflict handling, and server-authoritative reconciliation for approved offline workflows.  
**FR-MOB-007:** Never persist confidential question papers, hidden test cases, unrestricted student exports, raw payment credentials, secrets, or institution-prohibited data in offline caches.  
**FR-MOB-008:** Support device registration, device/session inventory, logout-all-devices, minimum-version enforcement, remote session revocation, and configurable root/jailbreak risk response.  
**FR-MOB-009:** Biometric unlock is only a convenience after server authentication and never replaces authorization or step-up authentication.  
**FR-MOB-010:** Support screen readers, dynamic type/font scaling, focus order, contrast, reduced motion, keyboard/external input where applicable, and accessible touch targets.  
**FR-MOB-011:** Support localization for English initially and architecture for Telugu, Hindi, and additional languages, including locale-aware dates, numbers, names, and institution time zone.  
**FR-MOB-012:** Capture privacy-safe crash, performance, and usage telemetry without academic answers, documents, secrets, or sensitive identifiers.  
**FR-MOB-013:** Provide release notes, maintenance state, update guidance, support diagnostics, and privacy-safe diagnostic submission.  
**FR-MOB-014:** Enforce the same backend tenant, role, field, and record authorization as web; hidden navigation is never treated as authorization.  
**FR-MOB-015:** Apply institution branding and module enablement through runtime configuration without producing separate app binaries for every institution.

### 22.6 Role-specific native mobile interfaces

| Role | Required mobile interface and mobile-first actions | Web-first or specially controlled actions |
|---|---|---|
| Group Chairman/Management | Executive KPIs, cross-campus alerts, approvals, risk, incidents, admissions, finance, results, placement | Metric design, unrestricted exports, bulk configuration |
| Principal/Director | Leadership work queue, academic/exam readiness, approvals, emergency broadcasts, compliance actions | Regulation and policy configuration |
| Dean Academics | Academic calendar, delivery risk, attendance, course and progression exceptions, approvals | Curriculum and bulk timetable setup |
| Controller of Examinations | Exam command center, progress, exceptions, approval, result-readiness, incidents | Result-engine rules, bulk processing, confidential paper content by default |
| Examination Branch Staff | Candidate verification, hall-ticket QR, room attendance, custody barcode scan, incident capture | Bulk setup/import and result runs |
| External Examiner/Evaluator | Restricted assignment, schedule, secure rubric/marks where permitted, submit/acknowledge | Unrelated student records and bulk confidential data |
| Paper Setter/Moderator | Assignment status, declarations, alerts, approval tasks | Confidential paper authoring remains hardened web/controlled device unless explicitly approved |
| Invigilator/Chief Superintendent/Observer | Duty acknowledgement, room instructions, candidate attendance, incidents, script counts/custody | Exam configuration and unrelated rooms |
| HOD/Program Coordinator | Department KPIs, workload, syllabus, attendance, results, OBE actions, approvals | Bulk offering/curriculum configuration |
| Faculty | Timetable, offline attendance, teaching diary, content, assignments, feedback, marks, duties, leave | Complex question authoring and bulk marks |
| Mentor/Counselor | Advisee alerts, attendance, performance, interventions, appointments, privacy-controlled notes | Cohort-wide sensitive exports |
| Student | Complete self-service: schedule, learning, attendance, registration, exams, fees, coding, placement, library, hostel, transport, services | High-stakes exams when institutional policy mandates desktop/controlled device |
| Parent/Guardian | Policy-permitted attendance, fees, performance, transport/hostel alerts, payments, acknowledgements | Confidential assessment, placement, discipline, or communication data unless explicitly authorized |
| Admissions Team/Counselor | Enquiries, follow-ups, applicant search, document capture/verification, offers, onboarding | Seat matrix, merit generation, mass allocation |
| Finance Team/Cashier | Ledger lookup, QR collection, payment verification, receipts, exceptions, concession/refund approvals | Bank imports, bulk demands, accounting exports |
| HR Team/Employee/Manager | Attendance, leave, permissions, workload, recruitment feedback, appraisal tasks, documents | Payroll and bulk organization configuration |
| Placement Officer/Trainer | Drive pipeline, eligibility review, registrations, stages, training attendance, feedback, offers, readiness | Policy and bulk employer configuration |
| Internship/Project Coordinator or Mentor | Opportunities, approvals, logs, milestones, rubrics, reviews, evidence | Mass setup and restricted IP exports |
| Librarian/Library Assistant | OPAC, borrower QR, barcode/RFID circulation, renewals, reservations, stock tasks, fines | Catalog/acquisition bulk management |
| Hostel Warden/Security | Allocation lookup, check-in/out, out-pass, roll call, visitors, incidents, maintenance | Room-layout and mass allocation setup |
| Transport Administrator | Trips, routes, manifests, delays, incidents, driver/vehicle status, live operations | Fleet and route bulk configuration |
| Driver/Attendant | Distraction-minimized trip start/end, rider manifest, QR/RFID boarding, GPS during trip, delay/breakdown/SOS | Administration; interactions disabled while moving where feasible |
| Visitor Host/Reception/Security | Preregistration, approval, ID/photo, badge QR, check-in/out, watch-list authorization, emergency roll call | Retention and watch-list administration |
| Facilities/IT/Lab/Store/Asset Custodian | Work orders, asset/inventory scans, issue/return/transfer, stock count, calibration/maintenance evidence | Master and bulk configuration |
| Accreditation/IQAC Coordinator/Auditor | Evidence review, completeness, observations, corrective actions, readiness | Framework configuration and unauthorized source data |
| Employer/Recruiter | Time-bound drive view, authorized candidates, stage status, feedback, shortlist/selection | Candidate export only with explicit authorization and consent |
| Tenant Administrator/Institution IT | Tenant health, integration failures, access reviews, session revocation, maintenance and support approvals | Role design, secrets, provisioning, high-risk bulk administration |
| Platform Super Administrator/Support/Security | Platform health, incidents, queue failures, release state, emergency controls, time-bound access requests | No implicit tenant-data access; infrastructure/secrets use secure operations consoles |

### 22.7 Domain-specific mobile workflows

- **Student and guardian:** QR identity/hall ticket, document scan, online payment/receipt, attendance/result alerts, offline timetable/content, transport/hostel status, placement alerts, service tracking.
- **Faculty and mentor:** offline attendance with conflict-safe synchronization, substitution, teaching-diary draft, evidence capture, grading, adviser interventions, invigilation, work queues.
- **Examinations:** command-center alerts, hall-ticket validation, candidate attendance, malpractice/incident evidence, answer-script packet custody, evaluator progress, step-up approvals.
- **Admissions and finance:** enquiry/follow-up, document verification, payment status, QR counter collection, receipt, settlement exception, refund/concession approvals.
- **Placement and projects:** drive stages, test attendance, interview feedback, offers, training, internship logs, project milestones, review rubrics.
- **Campus operations:** circulation, room/bed/out-pass, trip/boarding/GPS/SOS, visitor access, asset/stock/maintenance, service request closure.

### 22.8 Mobile release and quality requirements

**FR-MOB-020:** Maintain a role-feature inventory proving a mobile interface exists for every role.  
**FR-MOB-021:** Each role shall have at least one automated Android and iOS critical-journey test, with additional tests proportional to risk.  
**FR-MOB-022:** Mobile release gates include unit/component tests, API contracts, accessibility, offline/sync, deep links, security, device compatibility, and Appium or Maestro-style end-to-end tests.  
**FR-MOB-023:** Publish a supported Android/iOS/device matrix and test representative low-, mid-, and high-tier devices.  
**FR-MOB-024:** Play Store and App Store releases use protected signing credentials, automated signed CI/CD, staged rollout, crash/performance monitoring, rollback/kill-switch procedures, release notes, and accurate privacy disclosures.  
**FR-MOB-025:** Backend compatibility policy supports staged mobile upgrades and server-enforced minimum versions when required for security.  
**FR-MOB-026:** Static screens do not count as completed mobile features; real APIs, authorization, audit, error handling, offline behavior where required, telemetry, and automated tests must exist.  
**FR-MOB-027:** iOS builds and simulator tests require macOS runners; Android/Linux-only CI shall not be represented as complete iOS validation.  
**FR-MOB-028:** Mobile actions that create official records must show a server receipt/status and prevent duplicate submission during retry or reconnect.

---

## 23. Analytics and Reporting

**FR-ANL-001:** Provide dashboards for management, principal, dean, controller, HOD, faculty, mentor, admissions, finance, HR, placement, accreditation, and operations.  
**FR-ANL-002:** Support filters by institution, campus, department, program, regulation, batch, semester, category, gender, course, and time.  
**FR-ANL-003:** Provide row-level security consistent with transactional permissions.  
**FR-ANL-004:** Support scheduled reports, subscriptions, governed exports, watermarking, and export audit.  
**FR-ANL-005:** Permit drill-through from KPI to authorized source records.  
**FR-ANL-006:** Maintain metric definitions, calculation versions, refresh time, and data-quality indicators.  
**FR-ANL-007:** Provide retention, admissions, attendance, academic-risk, result, attainment, fee, placement, faculty-workload, and service-SLA analytics.  
**FR-ANL-008:** Support institution-defined dashboards without direct production-database access.  
**FR-ANL-009:** Generate statutory and institutional reports from governed templates.  
**FR-ANL-010:** Provide de-identified datasets for approved institutional research.

---

## 24. AI and Intelligent Automation

AI features must be assistive, explainable, permission-aware, and human-approved when affecting students or official records.

**FR-AI-001:** Assist faculty in generating draft questions, rubrics, outcomes, lesson plans, summaries, and alternate versions from authorized content.  
**FR-AI-002:** Check draft questions for duplication, ambiguity, incomplete options, possible answer conflicts, Bloom's alignment, and difficulty consistency.  
**FR-AI-003:** Generate plain-language performance summaries grounded in approved institutional data.  
**FR-AI-004:** Detect students at risk using explainable factors such as attendance, assessment trends, backlogs, engagement, and fee/service holds; never make irreversible decisions automatically.  
**FR-AI-005:** Recommend interventions, practice, training, and mentoring actions for staff approval.  
**FR-AI-006:** Provide policy/document search with citations limited to documents the user can access.  
**FR-AI-007:** Assist service-desk classification, routing, response drafting, and SLA-risk detection.  
**FR-AI-008:** Detect anomalous marks, attendance, payments, and result distributions for review.  
**FR-AI-009:** Record prompt, source references, model/version, output, reviewer, and approval for governed AI actions.  
**FR-AI-010:** Institutions can disable AI globally or by module, role, data category, and use case.

---

## 25. Workflow and Configuration Engine

**FR-WFL-001:** Provide a form builder for institution-specific fields and service requests.  
**FR-WFL-002:** Configure states, transitions, roles, conditions, SLAs, escalations, reminders, and approvals.  
**FR-WFL-003:** Version configurations and require approval before production activation.  
**FR-WFL-004:** Provide simulation and validation before changing academic, examination, or fee rules.  
**FR-WFL-005:** Apply configurations by tenant, institution, campus, program, regulation, or cohort.  
**FR-WFL-006:** Maintain an effective-date history; changes must not silently rewrite historical results.  
**FR-WFL-007:** Provide template packs for autonomous and affiliated-college operating models.

---

## 26. Integrations and APIs

### 26.1 Required integrations

- Payment gateways, banks, UPI, and settlement files
- SMS, email, push, and approved messaging providers
- Biometric, RFID, QR, access-control, GPS, and transport devices
- Institutional identity/SSO and directory services
- Accounting/payroll systems
- University or regulatory data exchange where interfaces exist
- Plagiarism and proctoring services
- Video/content providers without copying restricted content
- Digital signature/eSign and document verification services where approved
- Placement job portals or employer systems through consented APIs

### 26.2 API requirements

**FR-API-001:** Provide versioned REST APIs and documented webhooks.  
**FR-API-002:** Use OAuth2/OIDC service credentials, scoped permissions, rate limits, rotation, and revocation.  
**FR-API-003:** Make create/payment/import endpoints idempotent.  
**FR-API-004:** Provide correlation IDs, audit logs, retry-safe events, and dead-letter handling.  
**FR-API-005:** Offer bulk import/export with templates, validation, preview, error files, restart, and reconciliation.  
**FR-API-006:** Prohibit unrestricted database access by external integrators.

---

## 27. Data Model—Core Domains

The logical model must include at minimum:

- Tenant, group, institution, campus, department, unit
- User, identity, membership, role, permission, scope
- Program, regulation, curriculum, course, outcome, mapping
- Academic year, term, offering, section, timetable, room, laboratory
- Applicant, admission, student, guardian, document, cohort, status
- Registration, prerequisite, elective allocation, credit, degree audit
- Class session, attendance, correction, shortage, condonation
- Content, question, version, blueprint, assignment, response, rubric
- Examination, application, eligibility, hall ticket, room, seat, duty
- Paper assignment, moderation, secure artifact, chain of custody
- Answer script, evaluator, mark, correction, rule version, result version
- Grade, SGPA, CGPA, backlog, grievance, revaluation, certificate
- CO/PO attainment, survey, evidence, action, accreditation criterion
- Coding workspace, problem, test case, run, submission, score, similarity case
- Employer, job, drive, eligibility, stage, application, interview, offer
- Training, skill, assessment, readiness, internship, project
- Fee plan, demand, concession, scholarship, payment, settlement, refund
- Catalog, order, inventory item, fulfillment
- Employee, workload, attendance, leave, appraisal
- Library item/copy, circulation, fine; hostel/room/bed; vehicle/route/stop
- Visitor, asset, maintenance, service request, SLA, grievance
- Notification, template, consent, delivery event
- Audit event, approval, workflow instance, attachment, retention rule

Every tenant-owned record must carry a tenant identifier. Institution and campus scope must be explicit where applicable. Official derived records must store their input snapshot and rule/configuration version.

---

## 28. Non-Functional Requirements

### 28.1 Security and privacy

**NFR-SEC-001:** Encrypt data in transit using TLS and sensitive data at rest using managed encryption keys.  
**NFR-SEC-002:** Enforce tenant isolation at application and data-access layers with automated tests.  
**NFR-SEC-003:** Use least privilege, MFA, scoped tokens, secret management, and privileged-access review.  
**NFR-SEC-004:** Protect exam papers and answer scripts with separate secure storage, fine-grained access, time windows, watermarking, and immutable audit.  
**NFR-SEC-005:** Maintain tamper-evident audit events for identity, permissions, exams, results, finance, documents, exports, and support access.  
**NFR-SEC-006:** Provide configurable retention, archival, legal hold, data export, and deletion/anonymization subject to institutional/legal obligations.  
**NFR-SEC-007:** Conduct dependency scanning, SAST, DAST, penetration testing, backup restore tests, and incident exercises.  
**NFR-SEC-008:** Align privacy practices with applicable Indian law and institutional policy; obtain qualified legal review before production.

### 28.2 Availability and recovery

**NFR-AVL-001:** Target 99.9% monthly availability for core services, excluding announced maintenance.  
**NFR-AVL-002:** No single infrastructure failure shall corrupt official examination or payment records.  
**NFR-AVL-003:** Initial targets: RPO ≤ 15 minutes and RTO ≤ 4 hours for core transactional services; institutions may purchase stronger tiers.  
**NFR-AVL-004:** Perform automated backups, point-in-time recovery, cross-zone protection, and scheduled restore validation.  
**NFR-AVL-005:** Queue outbound messages and integrations so provider outages do not block core transactions.

### 28.3 Performance and scale

**NFR-PER-001:** 95th-percentile interactive API response under 2 seconds for normal operations, excluding large reports and third-party latency.  
**NFR-PER-002:** Attendance save should acknowledge within 2 seconds for a standard class.  
**NFR-PER-003:** Autosave online assessment responses within 1 second under supported load.  
**NFR-PER-004:** Scale independently for online exams, coding execution, report generation, notifications, and file processing.  
**NFR-PER-005:** Support at least 25,000 active students per tenant and horizontal scale across tenants; load targets must be validated for each deployment tier.  
**NFR-PER-006:** Large exports and batch operations shall run asynchronously with progress, restart, and downloadable results.

### 28.4 Usability and accessibility

**NFR-UX-001:** Provide responsive React web interfaces and first-class React Native Android/iOS interfaces for every product role; native applications shall not be WebView-only wrappers.  
**NFR-UX-002:** Target WCAG 2.2 AA for primary experiences.  
**NFR-UX-003:** Support keyboard navigation, accessible labels, contrast, zoom, and screen-reader-compatible structure.  
**NFR-UX-004:** Support English first and localization architecture for Telugu, Hindi, and other languages.  
**NFR-UX-005:** Preserve drafts and tolerate low/intermittent bandwidth for attendance, forms, and assessments where technically safe.

### 28.5 Maintainability and observability

**NFR-OPS-001:** Structured logs, metrics, traces, correlation IDs, business-event monitoring, and tenant-aware diagnostics.  
**NFR-OPS-002:** Alert on failed payments, delayed settlements, exam-processing errors, result anomalies, queue backlogs, integration failures, and security events.  
**NFR-OPS-003:** Use automated database migrations, feature flags, staged releases, and rollback procedures.  
**NFR-OPS-004:** No customer-specific code branches; institution differences are configuration or independently deployable extensions.  
**NFR-OPS-005:** Maintain API compatibility policy and deprecation notices.

---

## 29. Recommended Architecture

### 29.1 Architecture style

Start with a modular monolith for core transactional domains, with strict module boundaries and an event-driven integration layer. Deploy high-variance workloads—coding sandboxes, online assessment delivery, document processing, notifications, analytics, and large reports—as independent workers/services. Avoid premature microservice fragmentation while retaining an extraction path.

### 29.2 Suggested technology direction

- **Web:** React + TypeScript
- **Mobile:** React Native + TypeScript shared Android/iOS workspace with native modules where required for notifications, secure storage, biometrics, camera/document scan, QR/barcode, background sync, and authorized location; no WebView wrapper
- **Core backend:** Java 21+ with Spring Boot for transactional and workflow-heavy services
- **Database:** PostgreSQL with tenant-aware access patterns and read replicas as scale requires
- **Cache/session:** Redis-compatible managed service
- **Object storage:** S3-compatible storage with immutable/versioned buckets for governed documents
- **Search:** OpenSearch for institution-wide authorized search and log/event analytics
- **Async processing:** Managed queues/events; introduce Kafka only when throughput and replay requirements justify it
- **Analytics:** Operational read models plus warehouse/lakehouse export for advanced BI
- **Coding execution:** Kubernetes/ECS-style isolated sandbox workers with strict CPU, memory, filesystem, time, and network controls
- **Identity:** Standards-based OIDC/SAML integration with application RBAC
- **Infrastructure:** AWS-first, containerized, infrastructure-as-code, multi-AZ production deployment

### 29.3 Deployment modes

1. Multi-tenant SaaS
2. Dedicated managed tenant
3. Institution-controlled cloud deployment for contractual/regulatory needs

All modes should use the same release artifacts and configuration model. Offline/on-premises deployment is not an initial requirement unless justified by a signed customer need.

---

## 30. Data Migration and Onboarding

**FR-MIG-001:** Provide discovery templates for institution hierarchy, programs, regulations, curriculum, students, employees, fees, attendance, marks, results, backlogs, and documents.  
**FR-MIG-002:** Support CSV/XLSX and API imports with staging, mapping, validation, preview, approval, and exception files.  
**FR-MIG-003:** Preserve source identifiers and import-batch provenance.  
**FR-MIG-004:** Make imports idempotent and restartable.  
**FR-MIG-005:** Reconcile totals, counts, credits, results, receivables, and balances against signed source reports.  
**FR-MIG-006:** Require business owner signoff before production cutover.  
**FR-MIG-007:** Provide role-based training, sandbox practice, readiness checks, and hypercare dashboards.

---

## 31. MVP and Release Roadmap

### Phase 0—Foundation (6–8 weeks)

- Tenant/institution/campus hierarchy
- Identity, RBAC, MFA, audit, workflow foundation
- Program, regulation, curriculum, academic calendar
- Student and employee master data
- Import framework, document service, notifications
- DevSecOps, observability, backup, and tenant-isolation tests

### Phase 1—College Core (12–16 weeks)

- Admissions and student lifecycle
- Course offerings, registration, timetable
- Attendance, shortage alerts, condonation
- Teaching plans, classwork, content, assignments
- Fee demands, payments, receipts, reconciliation
- React Native foundation and role-appropriate mobile essentials for student, guardian, faculty, mentor, admissions, finance, leadership, and tenant administration
- Leadership/HOD/mentor dashboards

### Phase 2—Autonomous Examination Core (16–20 weeks)

- Exam configuration, applications, eligibility, fees
- Hall tickets, timetable, seating, duties, attendance
- Marks entry/import, validation, grading, SGPA/CGPA
- Result simulation, approval, publication
- Grade cards, memos, transcript foundation
- Backlogs, supplementary exams, revaluation/grievances
- Secure question-paper workflow baseline
- Mobile exam command center, duty acknowledgement, hall-ticket validation, attendance, incident, answer-script custody, evaluator, and secure approval interfaces

### Phase 3—OBE, Accreditation, and Advanced Exams (12–16 weeks)

- CO/PO/PSO mapping and attainment
- Course files, actions, evidence repositories
- Blueprinting, moderation, double evaluation
- On-screen evaluation option
- Advanced analytics and statutory reports
- NBA/NAAC/IQAC workflows

### Phase 4—Employability Suite (14–18 weeks)

- Placement CRM, eligibility, drives, stages, offers
- Training batches and assessments
- Internship and project management
- Programming lab and secure coding examinations
- Skill/readiness dashboards
- Mobile interfaces for students, placement officers, trainers, recruiters, internship/project coordinators, and mentors

### Phase 5—Campus Operations and Intelligence (ongoing)

- Library, hostel, transport, visitor, assets, service desk
- Institution commerce
- AI-assisted content, risk, policy search, and automation
- Advanced group analytics and external integrations
- Mobile interfaces for every remaining role, including library, hostel, transport/driver, visitor/security, facilities, IT, lab, inventory, service desk, accreditation, external auditors, and support operations
- Play Store and App Store signed release pipelines, staged rollout, observability, support matrix, and release governance

Release dates must be committed only after discovery of one design-partner institution's regulations, current data, integrations, and mandatory reports.

---

## 32. MVP Definition

The commercially sellable MVP should include Phases 0–2, not merely a student database. It must demonstrate:

1. A regulation and curriculum configured for one B.Tech program
2. Student import/admission and semester registration
3. Course offerings, timetable, and period attendance
4. Attendance shortage and examination eligibility
5. Fee demand, online payment, receipt, and reconciliation
6. Exam application and hall ticket
7. Exam timetable, seating, and invigilation
8. Internal and semester-end marks entry/import
9. Rule-driven grade, credit, SGPA, CGPA, and backlog calculation
10. Result approval, publication, and grade-card generation
11. Supplementary/revaluation workflow
12. Student, faculty, HOD, Controller, and management dashboards
13. Complete audit evidence for marks and result changes

---

## 33. Representative End-to-End Acceptance Scenarios

### Scenario A: Regular semester result

Given a published regulation, registered students, course offerings, attendance, internal marks, and semester-end marks, the Controller can run validation and result simulation; authorized approvers can review and approve; the system publishes a frozen result version and generates correct grade cards, SGPA, CGPA, credits, and backlog status with full provenance.

### Scenario B: Attendance shortage and condonation

When a student falls below a course threshold, the system sends configured alerts, calculates condonation eligibility under the correct regulation, accepts approval and payment when allowed, and uses the final decision in exam eligibility without rewriting the original attendance.

### Scenario C: Revaluation changes a result

The student applies and pays online; the script is assigned to an authorized evaluator; the revised mark is approved; the system recalculates only affected result records, preserves both versions, issues a revised document, and audits every action.

### Scenario D: Placement drive

The placement officer defines employer eligibility. The platform identifies qualified students using current CGPA, backlogs, program, graduation year, and placement policy; students register; each stage is recorded; offers and joining outcomes update dashboards.

### Scenario E: Coding examination

The faculty schedules a Python/Java/C++ assessment with randomized problems and hidden tests. Eligible students code in isolated workspaces. Submissions are autosaved and executed securely. Scores and suspicious-similarity evidence are produced, while final disciplinary decisions require human review.

### Scenario F: Tenant isolation

Users, APIs, workers, reports, search, files, exports, and support tools from Institution A cannot access Institution B data. Automated tests must verify isolation for each release.

---

## 34. Reporting Catalogue—Minimum Baseline

### Academic

- Program/curriculum structure and regulation comparison
- Course registration and elective allocation
- Timetable, room, faculty, and laboratory utilization
- Syllabus coverage and faculty workload
- Attendance, shortage, condonation, and detention
- Student progression, credits, backlogs, and degree audit

### Examination

- Candidate eligibility and applications
- Hall-ticket, room, seating, duty, and attendance reports
- Marks completion and evaluator progress
- Missing/invalid marks and anomaly reports
- Course/program pass percentage and grade distribution
- SGPA/CGPA, credits, backlogs, toppers, and result gazette
- Revaluation, result-change, malpractice, and turnaround reports

### OBE/accreditation

- CO, PO, PSO mapping and attainment
- Assessment-question outcome coverage
- Gap and corrective-action status
- Course file completeness
- NBA/NAAC metric evidence inventory

### Finance

- Demand, collection, concession, scholarship, and receivables
- Student ledger, aging, daily collection, and cashier summary
- Gateway/bank settlement and reconciliation
- Failed, duplicate, refunded, and disputed transactions

### Placement

- Eligible/registered/participating/selected students
- Employer, drive, package, offer, and joining analytics
- Training attendance, assessment, and skill-gap reports
- Internship and project outcomes

---

## 35. Compliance and Governance Requirements

- Institution-approved retention schedules by record category
- Regulatory/legal review for Indian privacy, electronic records, payments, and digital documents
- Audit logs for marks, results, fee adjustments, concessions, refunds, identity, permissions, and exports
- Data Processing Agreements and third-party processor inventory
- Consent and minimum-data controls for parent and employer access
- Accessibility policy and accommodations for examinations
- Conflict-of-interest and confidentiality declarations for examination actors
- Periodic access certification for high-risk roles
- Business continuity and examination-period incident plans
- Formal approval of grading algorithms and configuration versions

---

## 36. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Scope becomes a generic all-in-one ERP | Protect college-native core; phase nonessential operations |
| Each institution demands custom code | Configuration engine, regulation templates, extension APIs, no forks |
| Incorrect result calculation | Versioned rules, simulation, golden test cases, parallel verification, approvals |
| Examination data breach | Segregated storage, MFA, time-bound access, watermarking, two-person release |
| Poor historical data quality | Staging, validation, reconciliation, ownership, signed cutover |
| Payment mismatch | Idempotency, gateway webhooks, settlement imports, exception queues |
| Coding sandbox compromise | Strong isolation, no default network, resource limits, short-lived environments |
| AI produces inaccurate content | Grounding, citations, review workflow, disable controls, no automatic high-stakes decisions |
| Faculty resistance | Mobile-first workflows, minimal duplicate entry, phased rollout, champions, training |
| Reporting overload | Governed report catalog, reusable metrics, self-service within permissions |
| Mobile/network instability | Autosave, retry queues, low-bandwidth design, graceful degradation |

---

## 37. Product Differentiation

The product should be positioned around the following differentiators:

1. **Autonomous-exam governance, not only marks entry**
2. **Regulation-versioned, explainable result processing**
3. **Curriculum-to-outcome-to-placement traceability**
4. **Integrated programming lab and placement assessments**
5. **Complete backlog, supplementary, revaluation, and degree-audit lifecycle**
6. **NBA/NAAC evidence generated from operational data**
7. **Cross-campus leadership intelligence**
8. **Configurable workflows without customer-specific product forks**
9. **Secure mobile self-service across the student lifecycle**
10. **Open APIs and institution-controlled data portability**

---

## 38. Commercial Packaging Recommendation

### Core Academic Edition

Student lifecycle, curriculum, registration, timetable, attendance, teaching operations, fees, communication, and mobile self-service.

### Autonomous Examination Edition

Examination applications, eligibility, question-paper governance, logistics, evaluation, results, documents, backlogs, revaluation, and examination analytics.

### Quality and Accreditation Edition

OBE, CO/PO attainment, course files, feedback, corrective actions, and NBA/NAAC evidence.

### Employability Edition

Training, placement, internships, projects, online assessments, programming labs, and coding exams.

### Campus Operations Edition

Library, hostel, transport, visitor, inventory/assets, commerce, and service desk.

Pricing should include transparent platform, implementation, migration, integration, communication, storage, and sandbox-execution components. Avoid ambiguous “all included” pricing that creates unbounded implementation obligations.

---

## 39. Discovery Decisions Required Before Engineering Starts

1. Select one autonomous engineering college as design partner.
2. Collect its active and prior regulations, curriculum, grading rules, and document formats.
3. Map the exact examination approval chain and separation-of-duties policy.
4. Confirm whether on-screen evaluation is required in the first commercial release.
5. Confirm student/parent access and consent policy.
6. Select payment, communication, biometric, GPS, and SSO providers.
7. Decide whether the initial mobile experience is React Native or PWA plus native wrapper.
8. Define migration scope and authoritative source systems.
9. Agree on SLA, RPO/RTO, retention, hosting region, and dedicated-tenant options.
10. Define launch reports and obtain signed sample outputs.
11. Define initial languages and accessibility accommodations.
12. Establish security, privacy, and examination-governance review boards.

---

## 40. Definition of Done for Product Launch

The platform is launch-ready only when:

- All MVP acceptance scenarios pass with design-partner data.
- Regulation and result calculations match signed reference cases across regular, failed, absent, detained, malpractice, grace, improvement, backlog, and revaluation scenarios.
- Tenant-isolation and role-scope tests pass.
- Security assessment and high-severity remediation are complete.
- Payment reconciliation and recovery scenarios pass.
- Backup restoration and disaster-recovery exercises succeed.
- Examination load, result publication, and notification load tests meet targets.
- Accessibility and mobile critical journeys pass.
- Every defined role has a verified role-appropriate Android and iOS interface; documented web-first restrictions are correctly enforced.
- Audit exports demonstrate complete provenance.
- Data migration is reconciled and signed by institutional owners.
- Staff training, runbooks, support, escalation, and examination-period command procedures are operational.

---

## 41. Final Product Boundary

This product should remain a separate higher-education platform with its own brand, roadmap, data model, deployment, and commercial packaging. It may share reusable engineering components with Institora—identity patterns, notifications, payment abstractions, document generation, analytics, and infrastructure—but must not share databases or create runtime dependence between the products.

Future integration can use explicit APIs for institutions that operate both schools and colleges, including optional student progression, group leadership dashboards, identity federation, and shared content catalogs. Those integrations must preserve tenant boundaries, consent, and independent product operation.
