# Claude Code Prompt 28

## Student, Parent/Guardian, Faculty, and Mentor Mobile Experiences

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React Native + TypeScript Android/iOS, shared generated OpenAPI clients/contracts/design tokens/localization, Java 21 + Spring Boot 3 APIs, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–27 passed, were reviewed, and were committed  
**Scope:** Production native Android/iOS vertical slices for Student, Parent/Guardian, Faculty, and Mentor/Counselor, including role homes, academic and operational journeys, secure offline behavior, payments and high-risk handoffs, push/deep links, camera/scanning, accessibility, tests, and traceable completion

---

## Prompt to Paste into Claude Code

```text
You are the principal mobile engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read the entire `docs/product/PRD.md`, especially Student, Parent/Guardian, Faculty, and Mentor/Counselor personas; mobile Sections 22.5–22.8 or current equivalents; every applicable domain requirement; privacy, consent, offline, accessibility, localization, low-bandwidth, and device requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, Prompt 27 mobile architecture/security/offline/device ADRs, Prompt 26 portal/mobile API/sync contracts, API compatibility policy, design system, threat model, and repository conventions.
3. Inspect the actual `mobile/` workspace and `docs/mobile/ROLE_FEATURE_MATRIX.md`; verify Android/iOS build status, navigation registry, context/role switching, generated clients, authentication/session/step-up, encrypted storage, sync/mutation queue, push/deep links, camera/document/QR/barcode/file services, logging/crash privacy, accessibility, and test harnesses.
4. Inspect the responsive web journeys and authoritative backend APIs from Prompts 03–25 for academic structure, SIS, registration/degree audit, timetable, attendance, LMS, assessments/exams/results/documents, fees, OBE, programming lab, placement/training, internships/projects, HR self-service, library/hostel/transport/visitor/assets/service desk, and communications.
5. Run Git status and all existing backend/web/mobile verification. Preserve valid work and do not re-scaffold or replace the Prompt 27 foundation. Repair contract drift before building features.

Do not create WebViews as role portals, copy backend policy/calculation logic into mobile, invent data/provider/payment success, cache prohibited records, weaken RLS, rely on navigation as authorization, use last-write-wins for official data, show false offline success, expose adult-student data to guardians without policy/consent, permit mobile assessments when controlled-device policy forbids them, implement full official local code execution, build leadership/exam-admin/admissions/finance-admin/HR-admin/IQAC mobile vertical slices reserved for Prompt 29, or publish to app stores.

Implement complete production vertical slices using real APIs and Prompt 27 foundation. Each visible action must call the authoritative domain API, handle current authorization/status/version, and display an authoritative receipt or truthful failure/pending state.

## 1. Cross-role invariants

Enforce:

- active account, tenant, institution, campus, role, and dependent context is always visible and backend-validated
- role/context switching cancels requests/sync, purges or partitions cache/queue/navigation, and cannot leak data
- every screen is entitlement-aware and handles disabled/read-only/revoked modules safely
- cached data displays source and last-confirmed time; offline state never appears current/live
- only explicitly allowlisted data/actions are available offline
- high-risk/official actions require online server validation, current ETag/version, step-up where configured, and a receipt
- push/deep links resolve opaque references through current authorization and land safely when expired/revoked
- no domain calculations, eligibility rules, marks, fees, attendance shortage, or placement logic is recomputed in mobile
- camera/document/QR/barcode/file/location services use Prompt 27 secure abstractions and just-in-time permission
- analytics/crash/logs contain no PII, answers, marks, fees, documents, location, notes, or tokens
- every role journey meets accessibility, localization, low-bandwidth, retry, error, empty, offline, stale, conflict, and support requirements

Update the role-feature matrix continuously with screen/route, real API, offline policy, device capability, test evidence, web-first restriction, and Android/iOS status.

## 2. Shared role home architecture

Use Prompt 26 portal composition for role-specific home:

- safe identity/context header and switcher
- today/upcoming calendar
- prioritized work queue/deadlines
- unread inbox/announcements
- enabled-module summary cards
- quick actions selected from an allowlist
- offline/sync/stale banner
- support/help and emergency contact entry

Cards show server-provided aggregates with source/as-of labels. Tapping reauthorizes at the source route. Do not preload unauthorized data or show placeholder cards.

User personalization can reorder optional cards but cannot hide mandatory safety, payment, examination, or action-required items.

## 3. Shared notifications, inbox, calendar, and search

Implement Prompt 26 inbox with partial sync, read/archive/acknowledge receipts, pagination, filters, safe previews, and authorized deep links.

Unify permitted calendar entries from timetable, assignments, assessments/exams, fees, placement/training, projects/internships, HR self-service, library/hostel/transport, and services. Source modules own dates; mobile cannot edit them through the calendar.

Authorized search must enforce role/context at query/suggestion/facet/count/result/open. Exclude secure questions, answer keys, private notes, HR data, grievances, confidential IP, other people, and prohibited records.

Generic push payloads resolve through inbox. Never place marks, dues, attendance shortage, offers, room/route, or private notes on lock screens.

## 4. Student profile and lifecycle

Implement student self-service:

- identity/profile/contact/address and verification status
- admission/program/cohort/current term/status summary
- guardian/relationship visibility and consent settings where policy allows
- photo/signature and document references
- correction/change requests with evidence and receipts
- student ID/approved QR display using opaque rotating or expiring token
- privacy/preferences/device/session access

Authoritative fields are read-only. Corrections create requests rather than direct edits. Sensitive identifiers are masked and excluded from screenshots/share where policy applies.

Provide offline view only for a minimal approved ID/profile summary with expiry; never cache full identity documents by default.

## 5. Student documents and certificates

Provide authorized document list/status for admission documents, bonafide/ID, grade cards, transcripts, certificates, hall tickets, receipts, internship/project records, and service-delivered documents.

Use secure grant/preview/download with classification, checksum, expiry, access receipt, and policy-controlled share. Support camera/document upload through encrypted temporary storage, metadata stripping, resumable transfer, malware/processing status, and authoritative receipt.

Never store permanent signed URLs, expose object keys, or claim verified/issued until source acknowledgement. Restricted examination/HR/grievance documents stay online-only.

## 6. Student registration, electives, and degree audit

Implement:

- eligible course/elective offerings and constraints returned by server
- current registration/cart/status/holds with safe explanation
- add/drop/withdraw requests during allowed windows
- prerequisite/corequisite/credit/capacity/clash outcomes from server
- waitlist/approval/receipt
- degree-audit requirement groups, earned/in-progress/planned credits, deficiencies, and source/as-of version

Do not reproduce curriculum or degree-audit rules locally. Registration submission is online-only unless a domain contract explicitly supports queued reservation; final success requires server receipt.

Handle concurrent seat loss, changed offerings, ETag conflicts, expired window, and partial approval without losing user choices.

## 7. Student timetable and academic calendar

Provide day/week/agenda views for classes, labs, assessments, exams, training, projects, appointments, and institutional events.

Allow encrypted offline read of the student's permitted timetable/calendar with last-sync time, change/cancel indicators, timezone, room classification, and manual refresh.

Do not infer attendance from calendar or reveal staff/student rosters. Deep links reauthorize current event/resource.

Support add-to-device-calendar only with explicit permission, sanitized content, and update/remove policy; never write sensitive locations/details by default.

## 8. Student attendance, shortage, and correction

Implement course/section/period attendance summary and session detail using server-calculated numerator/denominator, exclusions, policy/version, percentage, shortage projection, detention/condonation status, and as-of time.

Student can submit missing/incorrect attendance correction with session, reason, evidence, and receipt; track review/decision/history. Mobile never edits attendance.

Show offline cached summary only with stale label. Do not recalculate shortage locally or promise eligibility.

Condonation request/status uses Prompt 08 workflow, fees through Prompt 11, required evidence, online submission, and receipt.

## 9. Student LMS, course content, and teaching progress

Implement enrolled course list, syllabus/plan progress, announcements, modules/topics, content metadata, approved files/media links, discussions only if existing domain supports them, and completion status.

Allow policy-approved content files for encrypted offline download with checksum, size, expiry, storage quota, revocation, and share restrictions. Do not cache licensed/restricted content without entitlement.

Support bookmarks/progress/drafts through idempotent sync. Do not infer mastery from content opening or fabricate conferencing/video provider status.

Use low-bandwidth variants and explicit download-over-cellular setting.

## 10. Student assignments and submissions

Implement assignment list/detail/instructions/rubric/references, draft response, camera/document/file attachment, autosave, submit, receipt, resubmission policy, feedback, rubric marks, and returned/late status.

Offline drafts and allowlisted attachments may queue encrypted, but submission is not complete until server acknowledgement. Show unsynced items and deadline/server-time behavior clearly.

Resolve concurrent edits/updated assignment/expired deadline through version conflict—not silent overwrite. Never expose other students' work or hidden rubric details.

## 11. Student online assessment experience

Implement schedule, eligibility, accommodations summary without diagnosis, instructions, supported-device/preflight status, privacy/integrity notice, attempt availability, handoff, active status, receipt, and released results/feedback.

Before attempt, obtain server policy:

- mobile_native_allowed
- controlled_desktop_required
- institution_device_required
- external_proctoring_handoff
- unsupported_response_type

Block mobile attempt truthfully when policy/device/render/accessibility criteria fail and provide approved alternative/support. Never bypass controlled-device rules.

If Prompt 20 mobile-native attempt is enabled, reuse its server-authoritative timer/autosave/reconciliation/submission components and tests; do not create a separate assessment engine.

## 12. Student examinations and results

Implement exam application/eligibility/status, permitted fee handoff, hall ticket secure preview/QR, schedule/room safe detail, accommodations status, instructions, exam-day notifications, result/SGPA/CGPA, grade cards, withheld/corrected status, and source/as-of version.

Provide revaluation/grievance/supplementary registration/status, required documents/fees, online submission, and receipts.

Official marks/results may be cached only if Prompt 27/server policy explicitly allows encrypted short-retention read; never queue changes or calculate SGPA/CGPA locally.

Hall-ticket QR is opaque, expiring/scoped where supported, screen-capture policy justified, and no raw identity/marks encoded.

## 13. Student fees, payments, receipts, and refunds

Implement itemized dues, due dates, concessions/scholarships/waivers references, pending/failed/paid/reversed/refunded statuses, receipt list, and service purchases.

Payment flow:

1. fetch current payable/order from Prompt 11
2. show exact amount/currency/items and provider/privacy terms
3. require online/step-up where configured
4. launch approved provider/UPI/app/browser handoff via allowlisted URL/app intent
5. handle return/deep link as untrusted signal
6. query backend authoritative status
7. reconcile duplicate/delayed callbacks
8. show receipt only after finance acknowledgement

Never capture/store raw card credentials, UPI PIN, bank secrets, provider keys, or mark paid from client return. Repeated callbacks are idempotent.

Refund requests/status distinguish requested/approved/provider_processed/received_unknown and never promise arrival.

## 14. Student programming-lab companion

Implement problem/experiment list, statement, constraints, allowed languages/toolchain, public examples, workspace/snapshot/submission status, run/test job status, bounded safe output, grading feedback, lab record, viva schedule, and competency analytics.

Full native code editor is enabled only if Prompt 21/27 mobile usability, accessibility, secure autosave, test, performance, and examination policy pass. Otherwise provide a companion with view/status/limited text edit or explicit web/controlled-device handoff.

Never execute official code locally, reveal hidden tests/reference solutions, persist source outside encrypted scoped cache, or claim server submission without receipt.

## 15. Student placement and training

Implement career profile/skill evidence/resume version status, visibility, placement opt-in, explainable eligibility, approved drives/jobs/packages, exact data-sharing preview, granular consent, registration/withdrawal, stage timeline, assessments/interviews, offers, joining follow-up, and receipts.

Offer accept/decline is online-only, step-up protected, version-bound, concurrency-safe through Prompt 22, and requires receipt.

Training includes catalogue, registration/waitlist, schedule, content references, attendance correction, assessments, feedback, completion, readiness gaps, and interventions.

Do not expose recruiter notes, other candidates, opaque ranking, or guarantee placement.

## 16. Student internships and projects

Implement internship opportunities/eligibility/application/consent/selection, student-sourced request/documents/NOC, active agreement, logbook/hours, milestones, mentor feedback, change/extension, incident/support, completion, and certificate.

Project experience includes team invitation/membership, proposal, guide/mentor, meetings/actions, milestones, artifact upload/reference, risks, reviews/demo, feedback, marks-handoff status, dispute/appeal, completion, and showcase consent.

Allow encrypted offline logbook/proposal/action drafts under classification policy. Confidential sponsor/IP artifacts remain online-only unless explicitly approved.

No automatic similarity punishment or publication. Showcase requires all approvals/consents and sanitized version.

## 17. Student library experience

Implement OPAC search/detail/availability, reservation/queue/cancel, current loans/due dates/renewal, overdue/fine/payment status, digital-content authorized launch, reading-history privacy, lost/damage case, and receipts.

Camera/QR/barcode may look up items or present member credential, but issue/return/self-check succeeds only through server policy and receipt.

Do not expose current borrower, other members, restricted catalogue notes, or licensed files outside entitlement.

## 18. Student hostel experience

Implement hostel application/eligibility/preferences/waitlist, room offer/acceptance, fee/deposit status, allocation/check-in checklist, own occupancy safe detail, room-change/maintenance/mess, leave/out-pass, visitor permission, incident/support, checkout/deposit-refund status, and receipts.

Exact room detail is classified and not shown on lock screen/share. No roommate directory or sensitive health/accommodation/grievance detail.

Out-pass shows server-authoritative status and opaque gate token. Mobile location is not used to prove departure/return.

## 19. Student transport experience

Implement route/stop application, eligibility/capacity/waitlist/allocation, fee status, rider credential, scheduled trips, privacy-safe live ETA/vehicle status/last update/uncertainty, own boarding events, delays/deviations/substitutions, incident/support, and receipts.

Vehicle GPS comes from Prompt 25 provider—not student phone. Do not expose other riders, driver personal contact, full route history, depot/security data, or guaranteed ETA.

QR/RFID presentation/scan is opaque and server validated; a missed scan is `UNKNOWN`, not proof of absence.

## 20. Student visitor, assets, and service desk

Implement visitor invitation/approval only where student hosting is allowed, opaque pass status, and cancellation without watch-list details.

Implement own asset reservations/loans/custody acknowledgement/return/damage case and equipment availability permitted by policy.

Implement service catalogue, accessible dynamic forms, drafts, camera/document attachments, fees/payment handoff, submission receipt, status/comments, delivery, acknowledgement, feedback, reopen, and appeal.

Confidential grievances use a separate privacy-safe entry and case view; do not reveal case existence/content through home cards, search, analytics, or shared devices.

## 21. Student communications and settings

Implement inbox/announcements, communication purpose/channel preferences, quiet hours, locale/accessibility settings, push/device/session management, privacy notices/consents, offline storage management, downloads, support diagnostics preview, and logout/all-device revoke.

Required/emergency communications clearly explain non-optional basis. Never use engagement dark patterns.

## 22. Parent/Guardian relationship and dependent switch

Resolve dependents exclusively from Prompt 01 verified active relationship plus institution policy, student age/status, and consent.

Show relationship/access status, permitted purposes/fields/modules, effective/expiry dates, and safe correction/request-access route.

Dependent switch must purge/partition screens, cache, queries, queues, downloads, notifications, and navigation. Active dependent is always obvious.

No guardian access merely because a phone/email matches. Revocation takes effect online and cached data is purged according to policy.

## 23. Guardian academic experience

Where permitted, provide timetable/attendance/shortage, released academic progress/results/grade cards, exam schedule, assignment status summary, and institutional announcements.

Do not expose secure assessments, answers, question banks, detailed submissions, private faculty feedback, unpublished marks, OBE anonymous responses, or adult-student-restricted data.

Use server-shaped guardian DTOs rather than filtering student DTOs on device.

Show source/as-of time and avoid comparative/rank details unless explicitly released.

## 24. Guardian fees and authorized payments

Provide dependent-specific dues, itemized statements, permitted concessions/status, payment handoff, receipts, refunds, and service purchase status.

Follow the same online authoritative provider flow and duplicate callback reconciliation as student. Step-up and relationship authorization are rechecked before order creation and receipt access.

Never mix one dependent's order/receipt with another, store credentials, or infer paid from provider return.

## 25. Guardian transport, hostel, library, and safety

Where policy permits:

- transport route/stop/allocation, privacy-safe trip ETA/uncertainty, dependent boarding notifications/status, delay/incident safe updates
- hostel allocation summary, out-pass acknowledgement/request where lawful, return status, approved contacts, emergency messages
- library due/fine summary and approved payment
- service request/acknowledgement for dependent

Never expose other riders/residents, exact sensitive room/destination, visitor/watch-list/grievance, driver private contact, or continuous historical location.

Emergency acknowledgement means message read/response only, not proof of physical safety.

## 26. Guardian communications and boundaries

Implement permitted communication inbox, acknowledgements, language/channel/quiet-hour preferences, designated staff contact/request, device/session controls, and access/consent history.

Do not expose placement applications/consent/interview/offer, internship/project IP, mentor/counselor notes, discipline/grievance, HR, medical/accommodation, or student private communications without explicit lawful policy and student consent.

Guardian cannot submit student coursework, assessments, attendance corrections, registrations, offers, project reviews, or other student declarations.

## 27. Faculty home and teaching schedule

Provide today/week schedule, course/section/lab cards, substitutions/changes, attendance sessions, teaching plan/diary tasks, assignments/grading, assessments/exams, advisees/projects, HR self-service, inbox, and deadlines.

Support encrypted offline timetable/course roster metadata only when policy allows, with source/as-of and automatic purge after course/role removal.

Faculty cannot access courses/sections/students merely through cached navigation.

## 28. Faculty roster and offline attendance

Implement permitted course/section roster with minimal identity/photo accommodations necessary for class operations, session start, mark present/absent/late/approved categories, review, submit, authoritative receipt, correction request, and sync status.

Use Prompt 27 encrypted queue and Prompt 08 idempotent attendance batch contract:

- client operation/session ID
- roster/session/policy version
- per-student mark and optional safe reason code
- base ETag
- captured time diagnostic
- submit/reconcile receipt

Offline capture is allowed only for preauthorized sessions/rosters and short retention. Never mark official until server acknowledgement. Resolve roster changes, duplicate faculty, session closure, and conflicts visibly; no last-write-wins.

Protect roster photos/data from screenshots/share/backup according to policy.

## 29. Faculty teaching diary and syllabus progress

Implement plan/topic/session view, draft teaching diary, covered topics/outcomes, method/resources, notes, homework/assignment reference, evidence capture, syllabus progress, catch-up plan, submit/review/status, and receipt.

Allow encrypted offline drafts/evidence queue within size/classification limits. Do not infer teaching delivery from timetable/attendance alone or publish private notes to students.

Progress percentages and planned-vs-actual come from Prompt 09 server logic.

## 30. Faculty content and assignment management

Provide mobile-appropriate creation/editing for announcements, simple content metadata/file upload, assignment draft/instructions/dates/attachments/rubric reference, publish/return, submission queue, grading/rubric/comments, feedback release, and receipts.

Complex rich content, bulk import, question-bank/test authoring, or large document annotation may remain web-first with mobile review/status/approval. Document the restriction.

Drafts may be offline; publication, deadline changes, grading finalize, and feedback release require online version checks/receipt.

Never expose one student's submission/feedback to another.

## 31. Faculty assessments, marks, and grading

Implement assessment schedule/readiness, authorized attempt/completion summaries, subjective grading queues, rubric grading, second marking/moderation/adjudication tasks, and result-release status.

Marks entry is available only for explicitly enabled workflows that satisfy:

- minimal role-shaped roster
- pinned component/max/rules
- local validation as UX only
- online current source/version
- step-up where required
- idempotent batch/partial error handling
- preview/confirmation
- server validation and receipt

No offline official marks submission unless source domain explicitly approves a secure queued protocol; default is online-only. No direct mark correction after freeze.

Question-paper/answer-key/hidden-test authoring remains web/controlled-device unless explicitly approved.

## 32. Faculty examination duties

Provide assigned invigilation/evaluation/practical/viva/paper-setting/moderation duty summaries, instructions, schedule/location, acknowledgement, availability/conflict request, alerts, and safe source handoff.

Do not implement Prompt 29 exam-staff operational barcode/room/custody vertical slices here. Faculty sees only own assignments and permitted actions.

Sensitive question content is not cached or shown unless existing controlled policy explicitly permits it.

## 33. Faculty programming lab, projects, internships, and mentoring

Implement assigned lab/problem/activity progress, grading queue, lab record/viva evaluation, project/internship teams, proposals, logbooks, milestones, artifacts permitted by classification, meetings/actions, risks/interventions, reviews/rubrics, completion, and marks-handoff status.

Confidential sponsor IP/mentor notes/similarity cases remain classification-bound and online-only. Faculty cannot browse unrelated teams or employers.

Mobile supports meaningful review/comment/approve/return. Large multi-file code/test authoring remains web-first.

## 34. Faculty HR self-service

Implement Prompt 24 employee self-service:

- profile/appointment/service/qualification/compliance and correction/document requests
- attendance day/status/missing-punch correction
- leave ledger/request/cancel/return, permission/on-duty/remote/comp-off
- workload sources/trace/variance/dispute
- role-eligibility explanation
- goals/self-review/evidence/outcome/acknowledgement/appeal/development plan
- payroll-input status and secure payslip access

Sensitive downloads and consequential submissions require online/step-up/receipt. No colleague HR, compensation, appraisal, or student-feedback respondent data.

## 35. Faculty library, assets, services, and communications

Provide faculty library circulation/reservations, own asset custody/reservations/returns, service catalogue/requests, campus operations allowed by role, inbox/announcements, preferences, sessions/devices, offline storage, and support.

Do not combine staff operational roles automatically with faculty identity; a separately selected backend-authorized role/context is required.

## 36. Mentor/Counselor role and advisee scope

Resolve advisees from effective-dated approved assignment and current tenant/institution/program scope. Distinguish academic mentor/advisor, project mentor, placement mentor, and counselor roles with different permissions.

Show assignment purpose, allowed data categories, effective/expiry, escalation route, and role switch. No self-added advisees or general student search.

Counselor/health-sensitive roles require separately approved clinical/privacy policy; this prompt implements educational mentoring/case routing, not diagnosis or therapy records.

## 37. Mentor advisee roster and overview

Provide minimal roster with server-generated summaries:

- attendance and shortage status
- released academic progress/credits/backlogs according to permission
- action-required fee hold category without unnecessary amount/details
- assignments/engagement and project/internship milestones
- placement/training/readiness evidence
- prior/open interventions and appointments
- safe explainable risk flags

Every flag shows source/as-of/rule/reason category/limitations. No opaque AI risk score, protected-trait inference, or automatic action.

Offline roster is denied by default or short-lived/minimal under explicit policy; sensitive notes are online-only.

## 38. Mentor appointments and interactions

Implement appointment availability/request/schedule/reschedule/cancel/check-in/completion with timezone, mode/location/reference, purpose category, reminders, and receipts.

Meeting notes include agenda, factual summary, student-visible decisions, restricted mentor observations where policy permits, actions/owner/due date, next review, and classification.

Do not record audio/video/transcripts by default or fabricate meeting-provider status. Separate educational notes from confidential welfare/grievance case references.

Students can view permitted notes/actions and submit correction/response.

## 39. Mentor interventions and follow-up

Implement intervention lifecycle:

- source flag/referral and evidence version
- category and transparent rationale
- student contact/response
- agreed action plan, owner/supporter, due date
- referrals to faculty/HOD/finance support/training/placement/service desk/confidential support through minimal references
- follow-up, outcome, effectiveness, close/reopen/escalate

No automatic punishment, detention, financial block, or employment/placement decision. Mentor cannot edit source attendance, marks, fees, or eligibility.

Escalation requires authorization, minimum necessary data, student notice where appropriate, and receipt. Emergency/welfare routing states limitations and configured contacts.

## 40. Mentor communications and privacy-classified notes

Use Prompt 26 communication purposes/templates. Mentor may message only assigned advisees through approved channels/purpose and cannot export personal contact lists.

Classify notes as student_visible, mentoring_team, restricted_referral, or confidential_case_reference with distinct authorization/retention. Do not use free text to store diagnoses, allegations, passwords, unrelated third-party data, or protected-trait profiling.

No sensitive note text appears in push, home cards, unified search, analytics, crash logs, or offline cache.

## 41. Cross-role account switching

Test one account holding faculty plus guardian, student plus applicant/alumni transition, faculty plus mentor, or other valid combinations.

Switching must change backend context, navigation, entitlements, sync collections, cache partition, work queue, inbox, calendar, search, push routing, and deep-link authorization atomically.

Never merge a person's employee/student/guardian records or expose data across personas. Show active role/institution/dependent prominently.

Queued operations cannot replay under another context. Returning to the original context revalidates membership before reopening its partition.

## 42. Offline policy by role

Implement/document explicit allowlist:

- Student: permitted timetable/calendar, content metadata/files, non-sensitive inbox, assignment/logbook/project drafts, receipts, limited summaries
- Guardian: minimal permitted dependent calendar/announcements/receipts with short expiry; no broad dependent cache
- Faculty: timetable, minimal preauthorized roster, attendance queue, teaching diary/content/assignment drafts, own HR drafts, receipts
- Mentor: normally minimal/no roster; appointment/action drafts only if explicitly approved; no sensitive notes offline

Online-only by default:

- payments and provider handoffs
- official registrations/approvals/marks/results changes
- offer acceptance
- high-stakes assessment submission unless Prompt 20 explicitly permits its own protected path
- sensitive documents/payslips/appraisal/confidential cases/IP
- guardian relationship/consent changes
- mentor restricted notes/escalations

Every cache/queue item has classification, maximum age, context, source version, and purge trigger.

## 43. Backend mobile endpoints and contracts

Prefer Prompt 26/source APIs. Add only measured role-shaped endpoints/BFF compositions needed to reduce mobile round trips, with no business-rule duplication.

For every new endpoint:

- OpenAPI contract and generated client
- backend authorization and forced RLS
- role/context/dependent/assignment scope
- minimal DTO and field-level classification
- pagination/ETag/cursor/tombstone where applicable
- idempotency/server time/receipt for mutations
- no count/existence leakage
- cache-control and offline eligibility metadata
- negative tenant/role/dependent/advisee tests

BFF downstream calls propagate user context; service identities cannot broaden access. Partial downstream failure is explicit and does not fabricate zero/success.

## 44. Native UI and design quality

Use Prompt 27 accessible primitives and tokens. Implement real native navigation, lists, forms, calendars, cards, charts with table/text alternatives, bottom sheets/dialogs, document/camera/scanner screens, and platform conventions.

Meet Dynamic Type/font scaling, TalkBack/VoiceOver labels/order/announcements, keyboard/switch where applicable, minimum touch targets, contrast, reduced motion, RTL, Telugu/Hindi-ready localization, long text, safe areas, orientation policy, and low-bandwidth states.

Avoid tiny desktop tables, horizontal forms, color-only status, hidden swipe-only actions, and modal traps. Every swipe action has accessible button alternative.

## 45. Privacy, security, and threat model

Extend Prompt 27 threat model for:

- student/guardian/faculty/mentor role confusion and context leakage
- dependent-switch and adult-student consent bypass
- cached roster/notes/results/documents/source leakage
- offline attendance/draft replay and cross-session mutation
- payment deep-link spoofing and duplicate callback
- hall-ticket/student-ID/QR replay
- controlled-assessment policy bypass
- unauthorized marks/grading/feedback access
- mentor overreach, opaque risk scoring, private-note leakage, and unsafe escalation
- project/employer IP and recruiter/placement consent leakage
- transport/hostel location and guardian overexposure
- malicious files/links/QR payloads and share-sheet leakage
- logs/crashes/analytics/screenshots/clipboard/notifications

Apply server authority/RLS, strict role-shaped DTOs, scope partition/purge, Keychain/Keystore encryption, ETags/idempotency, step-up, opaque expiring QR/deep links, provider status verification, field classification, no-cache policies, screen privacy where justified, rate/anomaly controls, audit, retention, and incident response.

No AI-generated academic/mentoring/placement decision is allowed. Any assistive future AI stays outside this prompt.

## 46. Observability and support

Instrument privacy-safe low-cardinality metrics for role/home/API latency, sync freshness/queue/conflicts, push/deep-link outcomes, payment reconciliation, attendance batch outcomes, uploads, document preview, app crashes/ANRs, and accessibility/performance regressions.

Never log identities, dependent/advisee IDs in raw form, roster, attendance marks, grades, dues, offer details, notes, documents, location, source code, answers, tokens, URLs, or request/response bodies.

Provide user-visible support reference, sanitized diagnostics preview, app/API/sync version, last successful sync, queue counts by safe category, and consent before share where policy applies.

Add runbooks for role/dependent leak, lost device/revocation, offline queue conflict, attendance reconciliation, payment return mismatch, controlled-assessment block, push/deep link, document/cache exposure, mentor-note incident, and mobile API degradation.

## 47. Tests

Add unit, component, API contract, backend/RLS, native integration, accessibility, security, offline, and Android/iOS E2E tests.

Student tests must cover:

- home/module entitlements/context
- profile/document correction/upload/secure preview
- registration/elective/seat/version conflicts and degree audit
- timetable offline/stale/change
- attendance shortage/correction/condonation
- LMS content download/revoke and assignment offline draft/submit receipt
- assessment device-policy allow/block, autosave handoff, receipt, released result
- exam application/hall-ticket QR/results/revaluation/supplementary
- payment handoff/spoofed return/duplicate callback/delayed status/receipt/refund
- programming companion/no hidden leakage/no local official execution
- placement consent/registration/offer step-up acceptance
- internship/project drafts/confidential IP/showcase consent
- library/hostel/transport/visitor/assets/service journeys and privacy

Guardian tests must cover relationship/age/status/consent, several dependents, revocation/purge, permitted academics, payment isolation, transport/hostel/library, emergency acknowledgement semantics, and prohibited placement/notes/grievance/assessment access.

Faculty tests must cover schedule, preauthorized roster, offline attendance duplicate/reorder/conflict/receipt/purge, diary drafts, content/assignment/grading, online-only marks/step-up, exam duties, programming/project/internship work, HR self-service, own services, and no cross-course/employee/student leakage.

Mentor tests must cover assignment scope/expiry, roster summaries/risk explanations, appointment, classified notes, actions/interventions/referrals, student response, escalation, no source editing, no opaque AI score, and no sensitive offline/cache/search/push leakage.

Cross-role tests must cover tenant/institution/role/dependent switching, queued-operation isolation, push/deep links, session/device revocation, entitlements, module disablement, low bandwidth, process death, background/foreground, forced update, secure storage, screenshots/share policy, localization/RTL, Dynamic Type, TalkBack/VoiceOver, and privacy-safe analytics/crash.

Backend tests must deny every new endpoint across tenant, student, guardian/dependent, course/faculty, advisee/mentor, role, and revoked assignment using application authorization plus RLS.

Required end-to-end journeys on Android and iOS:

1. Student switches institution, views offline timetable, corrects attendance, submits an assignment after reconnect, pays through provider handoff, and receives authoritative receipts.
2. Student follows assessment policy, uses hall-ticket QR, views released result, registers for a placement drive with consent, and tracks project/internship milestone.
3. Guardian switches two dependents, views only permitted summaries, completes authorized payment, acknowledges transport/emergency message, and loses access cleanly after revocation.
4. Faculty captures attendance offline, reconciles conflict, updates teaching diary, grades an assignment, performs permitted step-up marks action, and completes leave/appraisal self-service.
5. Mentor views assigned explainable risks, records meeting/action, routes an intervention, receives student response, and closes it without editing source data.
6. Cross-role switch proves no cache/queue/navigation/push/search leak.
7. Revoked session/device/module routes to safe state and purges prohibited data.
8. Critical journeys pass accessibility, localization, low-bandwidth, and process-death recovery.

Run repository-standard commands plus exact mobile workspace typecheck/lint/unit/component, Android debug/release/lint/unit/instrumented/emulator and E2E, iOS pod/build/unit/simulator/E2E on macOS, OpenAPI generation/diff, backend tests/RLS, accessibility, localization, dependency/license/SBOM/secret scans, and bundle/performance budgets.

Never claim iOS success without macOS/Xcode evidence or claim a role complete without both real API journey and automated evidence. Report all commands, environments, exit codes, skips, and limitations.

## 48. Performance and reliability budgets

Measure cold/warm start, role home, switch, lists, offline database queries, sync, assignment/attendance save, payment handoff return, document upload/preview, memory, crash-free journeys, ANR/hang, battery, and network bytes.

Test representative low/mid Android device/emulator and valid iOS simulator/device. Use realistic module-enabled homes and long lists without real data.

Set p50/p95/p99 or appropriate mobile thresholds and fail the completion gate on unaddressed critical regression. Do not hide failed downstream modules as empty success.

## 49. Seed/test fixtures

Add synthetic tenant-isolated fixtures for:

- students with varied modules, enrollment, attendance, assignments, exams/results, dues, placements, projects, hostel/transport/library/services
- guardian with multiple dependents and varied consent/access/revocation
- faculty with several course/section duties, offline attendance conflicts, grading, projects, leave/workload/appraisal
- mentors with assigned/unassigned/expired advisees and explainable risk/intervention cases
- payments pending/failed/delayed/duplicate callbacks
- controlled/mobile-allowed assessments, deep links, push, offline/tombstones/conflicts, module disabled/read-only, sensitive cache canaries

Use no real people, payments, provider credentials, documents, locations, marks, messages, or external calls.

## 50. Documentation and completion gate

Update:

- `docs/mobile/ROLE_FEATURE_MATRIX.md` with implemented/tested Student, Guardian, Faculty, Mentor screens and remaining restrictions
- mobile navigation/role/context/dependent map
- per-role offline allowlist/cache/queue/retention table
- mobile API/BFF/OpenAPI and generated-client documentation
- payment/provider, assessment-policy, attendance-sync, document/QR, and deep-link flows
- guardian privacy/consent and mentor-note/intervention guides
- accessibility/localization/low-bandwidth and support guides
- Android/iOS critical-journey test evidence
- threat model, SLOs/performance results, dashboards, alerts, and incident runbooks

Completion requires all of the following:

1. Student can complete the defined high-frequency academic, assessment/exam, payment, placement/project, campus-service, and communication journeys using real APIs on Android and iOS.
2. Guardian can switch permitted dependents and complete authorized academic/payment/transport/hostel/library/communication journeys without adult-student, cross-dependent, or prohibited-data leakage.
3. Faculty can complete schedule, offline attendance, teaching diary, mobile-appropriate content/assignment/grading, authorized marks, exam-duty, project/mentoring, and HR self-service journeys.
4. Mentor/Counselor can manage assigned advisees, explainable risk/referrals, appointments, classified notes, interventions, follow-up, escalation, and closure without source-data edits or opaque AI decisions.
5. Context switching, entitlements, push/deep links, camera/document/QR, secure files, encrypted offline data, idempotent mutations, ETag conflicts, process death, and revocation work without leakage or false success.
6. Payments, official approvals/marks/results/offer acceptance and other high-risk actions are server-authoritative, online/step-up controlled, and receipted.
7. Controlled-device assessment and full-code-editor restrictions are enforced rather than bypassed.
8. Accessibility, localization/RTL, low-bandwidth, application states, privacy-safe observability, and performance budgets pass for all four roles.
9. Backend endpoints have forced RLS and negative tenant/role/student/dependent/course/advisee tests.
10. Android and iOS critical journeys have real automated evidence from valid environments; unavailable macOS/device/provider checks are reported honestly.
11. OpenAPI/generated clients, mobile/backend tests, docs, matrix, threat model, runbooks, and all environment-available scans pass.
12. No provider/payment/delivery/assessment/submission/receipt, external communication, or role completion was fabricated.
13. Prompt 29 Leadership, Examination Operations, Admissions, Finance Administration, HR Administration, and Quality mobile vertical slices were not implemented or marked complete.

Provide the standard completion report covering implementation summary, changed files, backend/OpenAPI/generated clients, Student/Guardian/Faculty/Mentor screens and journeys, Android/iOS evidence, offline/sync/conflicts, push/deep links/device services, payments/high-risk actions, security/privacy/tenancy/RLS/audit/receipts, accessibility/localization/performance, exact test/scan commands/results/exit status, role-matrix changes, docs/runbooks, limitations/unavailable macOS/provider/device evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(mobile): deliver student guardian faculty mentor journeys`

Stop. Do not begin Prompt 29 or implement/claim complete leadership, examination-operations, admissions, finance-administration, HR-administration, or IQAC/accreditation mobile experiences.
```

---

## Review Checklist Before Prompt 29

- Student, Guardian, Faculty, and Mentor vertical slices use real APIs and authoritative receipts.
- Guardian access is relationship-, age/status-, policy-, consent-, and dependent-scoped.
- Faculty offline attendance is encrypted, idempotent, conflict-aware, short-lived, and server-confirmed.
- Mentor risks are explainable; notes are classified; interventions never alter source records automatically.
- Payments and other high-risk actions never show success from client/provider return alone.
- Controlled assessments and code-editor restrictions are enforced.
- Tenant/role/dependent switching cannot leak cache, queue, navigation, push, search, or files.
- Every screen satisfies offline/error/revoked/module-disabled/accessibility/localization states.
- Android/iOS evidence is real and the role-feature matrix status is honest.
- No Prompt 29 administrative/leadership/quality mobile slice was implemented or falsely marked complete.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 29 until these conditions pass.
