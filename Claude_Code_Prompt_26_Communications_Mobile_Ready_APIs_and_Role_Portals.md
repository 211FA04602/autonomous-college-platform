# Claude Code Prompt 26

## Communications, Mobile-Ready APIs, and Role Portals

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS contracts/interfaces, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–25 passed, were reviewed, and were committed  
**Scope:** Versioned multichannel communications, consent/preferences, event-driven notification orchestration, emergency broadcasts, delivery/reconciliation, coherent role portals, mobile-oriented API/BFF contracts, partial sync, device registration, accessibility, performance, and end-to-end persona journeys

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially notifications, announcements, email/SMS/messaging/push, emergency communications, consent/preferences, role portals, dashboards, guardian/external access, mobile APIs, accessibility, localization, performance, and offline behavior.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, data classification/privacy/retention policy, design-system conventions, and repository standards.
3. Inspect Prompt 01 identity/tenant/role/guardian/external-user/session contracts; Prompt 02 workflow/audit/outbox/documents; every domain event and role interface from Prompts 03–25; Prompt 25 entitlement/module-disablement contracts; existing notification adapters/templates, navigation, dashboard, generated API clients, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
4. Inspect PostgreSQL RLS, authorization/SoD, transactional outbox/inbox, jobs/schedulers, provider/webhook ports, object storage, observability, React routing/state/query/cache conventions, localization extraction, accessibility checks, API gateway/rate limits, and AWS/IaC configuration.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, duplicate domain business logic in portals/BFFs/frontend, bypass RLS with aggregation, fabricate provider delivery, send real external messages from tests, expose recipient lists or cross-recipient personalization, make mandatory communications opt-outable without policy, build a general social/chat platform, create desktop-only high-frequency workflows, scaffold or replace the Prompt 27 React Native foundation, or begin Prompt 27 security/offline/device-shell implementation.

Implement bounded `communications` and `portal-experience` capabilities with explicit contracts. Communications owns templates, preferences/consent, audience snapshots, orchestration, per-recipient messages, channel attempts, provider acknowledgements, in-app inbox, emergency campaigns, and communication analytics. Portal experience owns role navigation/composition, dashboard/work-queue/calendar/search projections, and mobile-oriented aggregation contracts only. Source domains remain authoritative for actions and records.

## 1. Cross-cutting invariants

Enforce:

- every template, preference, audience, message, attempt, device, portal projection, and receipt is tenant/institution scoped with forced PostgreSQL RLS
- source domain events contain stable references/minimal state; communications resolves authorized current data at processing time under a service policy
- audience membership is snapshotted, explainable, and permission-checked; no cross-tenant or cross-scope recipient leakage
- personalization renders independently per recipient and never reuses another recipient's data/cache
- channel eligibility follows purpose/legal basis, consent/preferences, age/status, urgency, quiet hours, accessibility, and verified destination
- required transactional/emergency messages are distinct from optional marketing/engagement communications
- templates, translations, audience rules, schedules, and emergency content are versioned and approved before production use
- message creation and every delivery attempt are idempotent; duplicate/replayed events cannot cause duplicate recipient delivery beyond documented provider uncertainty
- provider submission is not delivery; statuses reflect accepted/delivered/read/failed only from authoritative acknowledgements
- push, email, SMS, messaging, and link payloads contain the minimum necessary data and no secrets/sensitive content
- portal cards/counts/search/results use backend authorization and privacy thresholds; navigation guards are not authorization
- mobile APIs support bounded partial sync, versioning/ETags, tombstones, idempotent mutations, and truthful offline state
- consequential actions always execute in source modules and return their authoritative receipts

Write a glossary covering communication purpose, legal basis, consent, preference, template, audience snapshot, recipient, message, channel attempt, provider acknowledgement, quiet hours, emergency campaign, portal composition, work queue, projection, sync cursor, tombstone, ETag, and BFF.

## 2. Communication purpose and classification catalogue

Implement versioned purposes such as:

- security/authentication
- academic transaction
- examination/result
- attendance
- fees/finance
- placement/training
- HR/employment
- library/hostel/transport/visitor/assets/service desk
- emergency/safety
- institutional announcement
- optional engagement/marketing

Each purpose defines allowed source domains, data classification ceiling, eligible channels, consent/legal-basis requirement, opt-out behavior, quiet-hour override, approval level, retention, cost controls, escalation, and recipient relationship rules.

Do not treat all institutional communications as consent-free. Require institution legal/policy validation and preserve source/version/effective dates.

Validate conflicts, missing purpose, prohibited channel/data combinations, and excessive retention before activation.

## 3. Template lifecycle and versioning

Implement templates with:

- stable key, purpose, source event/action, channel, audience category, locale, and tenant branding
- subject/title/body, short/push/lock-screen form, fallback text, and accessibility labels
- typed placeholder schema with data classification and required/optional rules
- action/deep-link schema using stable internal routes, not arbitrary URLs
- provider template ID/version/status where preapproval is required
- owner/reviewer/approver, test fixtures, effective dates, and retention

Lifecycle: draft, validating, validation_failed, review, approved, active, suspended, retired, and superseded.

Reject unknown placeholders, raw HTML/scripts, unsafe links, credentials, object keys, signed URLs, sensitive lock-screen fields, cross-recipient arrays, unsupported locale, provider mismatch, and templates exceeding channel limits.

Approved versions are immutable. Material edits create a new version with preview/diff/impact and provider reapproval status.

## 4. Localization and accessible content

Support tenant-approved locales, Unicode/Indian-language scripts, RTL, pluralization, date/time/number/currency formats, and fallback chains.

Do not build messages using string concatenation. Use typed ICU-style localization or the established safe localization framework. Preview with long text, missing optional fields, RTL, screen reader labels, and channel truncation.

Email/in-app content must use semantic accessible markup, meaningful link text, alt text for approved images, readable contrast, and plain-text alternative. SMS/push must retain critical meaning when truncated.

Fallback to an approved base locale only when policy allows and label missing translation in authoring—not to recipients. Emergency messages require verified translations or approved language-specific fallback.

## 5. Branding and sender identity

Apply tenant/institution/campus branding using approved name/logo/color/contact references. Channel-specific sender identities include verified email domain/from/reply-to, SMS sender/template registration, approved messaging account/template, and push app/bundle environment.

Do not allow arbitrary sender addresses, domains, phone numbers, URLs, or reply-to destinations. Track verification, provider status, effective dates, and ownership.

Prevent one tenant's branding/sender/provider credentials from another tenant. Generic platform fallback must be explicit, approved, and not misrepresent the institution.

## 6. Consent, preferences, and contact destinations

Model communication preferences by person, institution, purpose, channel, locale, and effective time:

- verified destination reference
- opted_in, opted_out, required_transactional, emergency_only, unavailable, or suppressed
- source/lawful basis/consent notice/version/time/expiry
- quiet hours/timezone and channel order
- accessibility/language preference
- withdrawal/change history and receipt

Authoritative contact data remains in identity/person modules. Communications stores verified destination references or minimal encrypted delivery data according to architecture, not a competing contact master.

Consent cannot be bundled, prechecked, coerced, or inferred from silence. Withdrawal applies prospectively while retaining lawful delivery history. Required communications explain why opt-out is unavailable and allow destination/language corrections.

Guardian communications require verified active relationship, institution policy, student age/status, consent where required, and purpose-specific field access.

## 7. Suppression, bounce, complaint, and destination health

Maintain provider/destination health:

- hard/soft bounce
- invalid/unreachable
- complaint/spam report
- carrier/provider rejection
- messaging opt-out keyword/provider state
- push invalid token/uninstalled
- temporary provider failure
- manual security suppression

Use versioned suppression reason/source/time/expiry and authorized override. Do not repeatedly send to hard-bounced/complained destinations contrary to policy.

Destination health is sensitive and not exposed broadly. Notify users through another authorized channel to correct an invalid destination when appropriate.

## 8. Source event subscription and trigger catalogue

Define an allowlisted, versioned trigger catalogue mapping domain events from Prompts 03–25 to purpose/template/audience/resolution policy.

Examples include admissions status, registration, timetable changes, attendance shortage, assignments, examination schedules/hall tickets/results, fees due/payment receipts, certificates, OBE surveys, assessments, placements/offers, projects, HR/leave/payslips, library due, hostel/transport/visitor, maintenance/service, and emergencies.

Verify event type/schema/source, tenant scope, idempotency, authorization policy, and required references. Reject unknown versions fail-closed and quarantine poison events.

Do not place full domain records in events. Fetch minimum authorized fields through source-module service contracts and handle deleted/restricted/stale sources truthfully.

## 9. Audience definition and resolution

Implement approved declarative audience rules based on authorized institutional scope:

- named verified users/relationships
- applicants/students by institution/campus/program/cohort/course/section
- faculty/employees by department/role/assignment
- guardians by active dependent relationship and policy
- recruiters/external mentors/evaluators/auditors by active scoped assignment
- operational groups and emergency zones

No arbitrary SQL, scripts, free-form attribute harvesting, protected-trait inference, or unauthorized imported contact lists.

Audience preview shows estimated/exact count according to permission, criteria, exclusions, invalid/suppressed destinations, privacy warnings, and source versions. Approval pins an immutable recipient snapshot or a declared send-time resolution strategy.

Prevent count/facet probing across unauthorized groups and suppress small sensitive audiences.

## 10. Recipient snapshot and deduplication

For each campaign/transaction create immutable recipient entries with person/relationship reference, purpose, permitted channels, locale/timezone, personalization source versions, consent/preference decision, suppression reason, and stable message identity.

Deduplicate according to purpose and relationship policy without accidentally merging distinct required messages or sending multiple copies through duplicate memberships.

Document recipient precedence for multi-role/multi-institution users and guardians with several dependents. Personalization for one dependent must never appear in another dependent's message.

Changes after snapshot require cancel/rebuild/version, not in-place recipient mutation. Emergency dynamic audiences record every resolution version and source watermark.

## 11. Orchestration lifecycle

Implement communication/campaign states:

- draft
- validating
- review
- approved
- scheduled
- resolving_audience
- queued
- sending
- partially_completed
- completed
- paused
- cancelled
- expired
- failed
- superseded

Per-recipient message states distinguish ineligible/suppressed/queued/rendered/sent_to_provider/provider_accepted/delivered/read_if_supported/failed/retrying/expired/cancelled.

Use transactional outbox/inbox, durable queues/jobs, checkpoints, bounded batches, backpressure, cancellation, retries with jitter, provider rate/throughput controls, and crash recovery.

Cancellation stops unsent work but cannot retract provider-accepted messages unless a real provider supports it. State this truthfully.

## 12. Safe per-recipient rendering

Render each recipient independently from an allowlisted typed model. Escape channel context, sanitize approved HTML, validate URLs/deep links, and enforce classification/channel limits.

Never pass whole entities/maps to templates. Cache only template/version/static assets; do not cache rendered sensitive content across recipients.

Record template version, input-field names/classifications, semantic content hash, rendering result, and redacted failure code. Do not store full sensitive bodies longer than policy requires.

Preview uses synthetic fixtures unless an authorized user explicitly previews one permitted recipient under audit. Test sends are clearly labeled and restricted to verified institutional test destinations.

## 13. In-app inbox and announcements

Provide an authorized inbox with:

- notification/announcement title, safe summary, source module/reference, created/expiry time
- read/unread, archived, acknowledged, action-required, and superseded states
- permission-checked deep link
- filter by purpose/time/status/institution
- pagination/partial sync/tombstones
- read/acknowledge receipts

In-app content is not a substitute for source records; sensitive details load from the source module after authorization.

Announcements support institution/campus/role/audience, scheduled publication, expiry, attachments through Prompt 02, acknowledgement, pinned recipients, and versioned corrections. Never silently edit a read announcement; publish a correction/supersession.

## 14. Push notifications and device registration

Implement mobile-ready push contracts for APNs/FCM through a provider-neutral port:

- device installation ID and authenticated user/account binding
- platform/app/bundle/environment/version, push token encrypted, locale/timezone
- tenant/institution/role scope at registration time
- permission status, last seen, token refresh, invalidation, logout/revoke, and deletion
- multiple devices and account switching without cross-user token reuse

Require authenticated idempotent registration/refresh/revoke. Never accept a user ID/tenant from client without membership validation.

Push payloads contain generic lock-screen text, purpose, opaque message ID, and authorized deep-link route reference—no marks, fees, health, grievance, room/route, visitor, payslip, answer, offer, or document details.

Delivery/open does not prove the intended person read the content. Record provider/open signals with declared limitations.

## 15. Email provider port

Define provider-neutral email interface for verified sender, recipient, template/rendered content, text/HTML alternatives, headers, attachments by safe provider reference, tags, idempotency, and callback.

Support SPF/DKIM/DMARC readiness metadata, bounce/complaint callbacks, provider message IDs, rate limits, and regional configuration without pretending the platform configures DNS automatically.

Do not include uncontrolled large/sensitive attachments; use authenticated expiring source links when policy permits. Never log full body/recipient/address or provider credentials.

Local adapter captures sanitized metadata only and cannot send externally unless explicitly enabled in a safe non-production environment.

## 16. SMS and approved messaging-provider ports

Implement SMS and institution-approved messaging ports (such as WhatsApp Business only when configured) with:

- verified sender/account/template IDs
- provider-approved template/version/language/category status
- recipient destination, variables, consent/opt-out/legal basis
- segment/character count and estimated/actual provider cost metadata
- idempotent request, provider acknowledgement/status callback, error mapping, and retry policy

Do not bypass provider template rules, fabricate `DELIVERED`, scrape personal accounts, or automate consumer messaging clients.

Handle STOP/opt-out and provider suppression according to purpose and jurisdiction. Mandatory/emergency fallback requires explicit policy and cannot become marketing.

## 17. Channel routing and fallback

Implement versioned routing policy by purpose, urgency, recipient, destination health, preference/consent, provider availability, cost ceiling, and quiet hours.

Support single-channel, ordered fallback, parallel critical delivery, and acknowledgement-driven escalation. Prevent duplicate fallback when delayed callbacks arrive.

Every routing decision records inputs, rule version, chosen/skipped channels, reason, provider state, and cost estimate. No opaque AI channel choice.

Fallback never weakens data classification: a sensitive in-app message may produce only a generic SMS/push alert, not copy the sensitive content.

## 18. Quiet hours, schedules, deadlines, and timezones

Store schedules in UTC with institution/recipient timezone and display both where needed. Handle DST, nonexistent/ambiguous local times, holidays, quiet hours, cutoff, expiration, and provider delay.

Required deadlines consider whether delayed delivery would become misleading. Expired messages are not sent merely because a queue recovers.

Emergency/safety purposes may override quiet hours only under approved policy and actor authority. Record the override and acknowledgement expectation.

Scheduled campaigns pin content/audience/policy versions. Material changes require review and rescheduling.

## 19. Provider callbacks, reconciliation, retries, and cost

Verify callback signatures, source IP/secret strategy if supported, timestamp, audience, message/account scope, schema version, and replay/idempotency.

Map provider states without overstating certainty. Preserve raw provider response reference under retention/classification and expose safe normalized status.

Reconciliation jobs query real provider status only through configured APIs, checkpoint, rate-limit, and produce exceptions. Do not manufacture final states for providers lacking receipts.

Track estimated and accepted provider cost by tenant/purpose/channel/template/campaign using exact currency fields. Cost is operational metadata, not an accounting ledger or invoice.

## 20. Emergency broadcasts and acknowledgement

Implement restricted emergency campaigns with:

- incident/reference, severity, authorized issuer, affected campus/zone/audience
- approved concise instructions and translations
- multi-channel routing and quiet-hour override
- approval/dual-control or documented break-glass
- send-time dynamic audience snapshots with source freshness
- acknowledgement request, deadline, escalation, and safe roll-up
- correction/all-clear linked versions

Do not expose sensitive incident details, precise vulnerable-person locations, room/transport rosters, or confidential cases. Emergency recipient state reflects message delivery/acknowledgement only, not physical safety.

Break-glass actions are time-bound, audited, reviewed afterward, and tested without real external sends.

## 21. Communication analytics

Provide privacy-safe analytics for queued/provider-accepted/delivered/failed/read-if-supported/acknowledged, latency, retries, bounce/complaint, suppression, opt-out, destination health, template/provider performance, and estimated cost.

Every chart states provider semantics, population, exclusions, source/version/as-of time, and limitations. Do not compare faculty/students for punitive profiling or infer engagement from opens alone.

Use minimum-group thresholds and restrict individual delivery history to authorized support/audit. Platform operations see masked IDs and health, not content or recipient identity.

## 22. Role-portal information architecture

Create a server-driven but allowlisted portal composition model:

- tenant/institution/campus/role context
- enabled modules and feature entitlements
- navigation groups/routes
- home cards/widgets
- work queues and badges
- calendar sources
- authorized search sources
- quick actions
- announcements/inbox
- profile/help/settings

The server may choose from a compiled allowlist of frontend components/routes; never deliver executable UI/code or arbitrary URLs from configuration.

Portal configuration is versioned, previewed, approved, cached safely, and resilient to disabled/unavailable modules. Counts and cards use authorized aggregation contracts and never leak data through badges.

## 23. Student portal

Consolidate a coherent student experience for:

- profile and academic context
- timetable/calendar, attendance, coursework/LMS, assessments/exams/results/documents
- fees/payments/receipts
- OBE surveys and feedback
- programming labs, placements/training, internships/projects
- library, hostel, transport, assets/service requests
- notifications/inbox, work queue, deadlines, support, and settings

Prioritize actionable tasks, current day/week, deadlines, holds with safe explanations, and receipts. Avoid copying domain calculations into React.

High-frequency workflows must be responsive/mobile-ready with consistent loading/empty/error/offline/permission/module-disabled states.

## 24. Faculty portal

Consolidate:

- timetable/calendar/classes/attendance
- teaching plans/LMS/assignments/course files
- question/assessment/examination/evaluation work queues
- OBE/outcome/actions
- programming labs, projects/internships/mentoring
- advisees/placement/training references
- HR attendance/leave/workload/appraisal/self-service/payslips
- library/assets/service requests
- approvals, inbox, deadlines, and support

Show role/scope and prevent cross-course/department leakage. Sensitive authoring/marking/HR remains permission-shaped; dashboard counts do not grant access.

## 25. HOD, Dean, Controller, Principal, and management portals

Compose role-specific leadership views rather than one universal admin dashboard:

- HOD/program: courses, timetable, attendance, teaching/evaluation, OBE, faculty workload, students, projects/placements, queues
- Dean/academic leadership: program/department readiness, exceptions, outcomes, faculty capacity, approvals
- Controller/exam cell: examination setup/logistics/evaluation/results/grievances/online assessments
- Principal/management: institution-level authorized KPIs, risks, compliance/evidence, finance reference, operations, decisions

Every aggregate includes definition, population, source/version/as-of time, and privacy threshold. No unrestricted drill-down merely because a user is leadership.

## 26. Functional staff portals

Provide coherent workspaces for:

- admissions
- finance
- examination cell/controller
- placement/training
- internship/project coordinators
- HR/workload/appraisal
- library
- hostel
- transport
- visitor/security
- asset/store/maintenance
- service-desk/support
- IQAC/OBE/accreditation

Each workspace composes existing source-domain screens/commands, shared inbox/calendar/search, operational queues, exception counts, and reports. Preserve module boundaries and entitlements.

## 27. Parent/guardian portal

Build policy-controlled views for verified active relationships with student-age/status and consent rules:

- permitted academic attendance/timetable/result/fee/document summaries
- permitted notifications and acknowledgements
- hostel/transport/library/service summaries defined by Prompt 25
- communication preferences and relationship/access status

Never assume guardians can see adult-student data. No secure questions, answer details, private feedback, project IP, placement consent/interviews/offers, HR, grievances, visitor/watch-list, or other students.

Support several dependents without cross-dependent data mixing. Every switch is server-authorized and clearly displays active dependent/institution.

## 28. Restricted external portals

Consolidate minimal, assignment-scoped portals for:

- applicant
- external evaluator/examiner
- recruiter/employer contact/interviewer
- industry mentor/host supervisor/sponsor
- auditor/accreditation assessor
- trainer/vendor/provider contact where applicable

Accounts are verified, MFA/time-bound, purpose/tenant/institution/assignment scoped, automatically expire/revoke, and undergo access review.

External users see only approved records/fields/actions and cannot browse/search the institution. Downloads are short-lived, classified, watermarked where appropriate, and audited.

## 29. Unified work queue

Create a projection of actionable items from source domains:

- task type/source/reference
- title/safe summary
- due/overdue/priority
- role/scope/assignee
- permitted actions/deep link
- source version/status and projection watermark

Source domains own tasks and transitions. Portal projection is eventually consistent and cannot approve/close work itself.

Handle stale/tombstoned/reassigned/completed items through idempotent event consumers and periodic authorized rebuild. Clicking always reauthorizes and loads current source state.

Do not expose sensitive reason/content in queue summaries or notifications.

## 30. Unified calendar and deadline projection

Aggregate permitted academic timetable, exams, assessments, assignments, fees, placements, training, projects, HR leave/appraisal, library/hostel/transport, service requests, and institution events.

Use source references/versions, event type, start/end/timezone, all-day status, location classification, action/deep link, and change/cancellation state.

Prevent duplicate events, cross-role/tenant/dependent leakage, and sensitive location/content. Source changes supersede projection entries; portal users cannot edit authoritative domain dates from the calendar.

Support accessible agenda/list alternatives and timezone clarity.

## 31. Authorized unified search

Implement federated or indexed search only across allowlisted domain metadata with per-result source authorization, module entitlement, role/scope, classification, and privacy filters.

Authorization applies to query suggestions, spelling, facets/counts, snippets, result rows, previews, and fetch. Restricted exams, answer keys, marks, HR, payslips, grievances, watch lists, locations, project IP, student source, and confidential evidence are excluded unless a dedicated authorized index exists.

Search results carry source type/reference/version and deep link. Reauthorize on open; remove/tombstone inaccessible data promptly.

No cross-tenant shared cache or analytics. Test count/snippet/timing leakage.

## 32. Mobile-oriented API and BFF decision

Audit existing OpenAPI endpoints for mobile suitability:

- bounded payloads and pagination
- role-shaped DTOs and sparse/expand allowlists
- ETags/If-Match/If-None-Match
- incremental sync cursors and tombstones
- batch reads and idempotent mutation batches
- server time and authoritative receipts
- low-bandwidth media variants and resumable uploads
- stable error/problem codes
- explicit offline eligibility/conflict policy

Prefer improving domain APIs and generated clients. Add a BFF only where measured mobile round trips/composition justify it; document ADR, ownership, authorization, cache, failure, and versioning.

BFFs aggregate but never reimplement eligibility, marks, fees, policies, approvals, or permissions. Every downstream call propagates authenticated scope; no service account may broaden user access.

## 33. Partial sync protocol

Define versioned sync collections for allowlisted mobile data:

- collection/scope/version
- opaque cursor/watermark
- bounded items and next cursor
- create/update/tombstone operation
- entity version/ETag
- server time and retention window
- reset-required response when cursor expires

Never expose a global sequence across tenants or inferable counts. Cursors are opaque, signed/scoped/expiring where appropriate.

Offline allowlist is classification-aware. Exclude answer keys, sensitive marks/configuration, HR/appraisal/payslips, grievances, watch lists, confidential evidence/IP, live location history, secrets, and broad rosters.

Define full resync, deletion, revocation, role/tenant switch, logout, device loss, and legal-hold behavior.

## 34. Offline-safe mutation contracts

For approved high-frequency tasks expose:

- client operation ID/idempotency key
- base version/ETag
- payload schema/version
- device installation reference
- client capture time as diagnostic only
- server validation/current scope
- authoritative result/version/receipt
- conflict/retry/rejection/tombstone behavior

Never use last-write-wins for official marks, payments, approvals, attendance, submissions, offer acceptance, HR decisions, or other consequential records.

Define per-operation offline eligibility. Queueing locally is not success. Duplicate/reordered replay returns deterministic results and cannot cross tenant/role/account switches.

Prompt 27 will implement the native offline engine; this prompt must provide complete backend contracts and conformance fixtures without scaffolding/replacing that foundation.

## 35. API compatibility and deprecation

Use versioned OpenAPI, generated TypeScript clients, additive evolution, enum-unknown handling, semantic compatibility checks, and consumer contract tests.

Publish minimum supported web/mobile client versions, deprecation/sunset headers, migration guide, feature flags, and compatibility window. Do not break active assessment/exam/payment or queued offline actions during rolling releases.

Critical security changes may force upgrade/revocation through governed policy with safe user messaging and recovery.

## 36. Responsive design and shared design system

Standardize design tokens, typography, spacing, color, density, breakpoints, elevation, icons, motion, status language, forms, tables, cards, calendars, filters, dialogs, toasts, skeletons, and charts.

Components must support keyboard, screen reader, touch targets, zoom/reflow, high contrast, reduced motion, RTL, localization expansion, and non-color-only status.

Use responsive patterns: tables become accessible cards/list/detail, actions remain discoverable, filters use drawers/sheets, and critical workflows avoid horizontal scrolling.

Document which tokens/schemas/localization resources are safe to share with Prompt 27 React Native; do not couple web DOM components to mobile.

## 37. Consistent application states

Every portal surface must implement:

- initial loading/skeleton
- background refreshing with stale label
- empty/first-use
- filtered-empty
- permission denied
- module disabled/read-only
- offline/cached with as-of time
- partial/incomplete data
- recoverable and terminal error
- session expired/scope revoked
- conflict/superseded
- success with receipt

Errors use safe actionable RFC 7807 mappings without leaking existence. Retry is idempotent and preserves user input.

## 38. Performance budgets and frontend architecture

Set measurable budgets for initial route JavaScript/CSS, LCP/INP/CLS, API requests, payloads, images/fonts, memory, and low-bandwidth interactions.

Implement route-level code splitting, lazy module loading by entitlement, query deduplication, bounded caching, virtualized large lists, optimized images/fonts, and cancellation of stale requests.

Do not preload unauthorized modules or sensitive data. Cache keys include tenant/institution/role/dependent scope and purge on switch/logout/revoke.

Measure representative low-end Android/mobile-web and desktop, not only developer machines. No performance claim without evidence.

## 39. Portal personalization boundary

Allow user choices for permitted card order, compact/comfortable density, locale, theme, default institution/role, notification preference, and accessibility settings.

Do not use opaque AI to reorder critical tasks, hide obligations, or manipulate engagement. Mandatory alerts/tasks remain visible according to policy.

Persist only allowlisted preference keys and validate configuration. Reset/sync across devices without copying sensitive cached data.

## 40. Security, privacy, and threat model

Update threats for:

- cross-tenant/recipient/dependent personalization leakage
- audience/count/facet probing
- template injection, stored XSS, unsafe HTML/links, and placeholder overreach
- event replay/poisoning, duplicate send, and queue amplification
- provider credential/callback spoofing, SSRF, and account takeover
- email/SMS/messaging abuse, phishing, spam, complaint, and cost denial-of-wallet
- device-token theft/reassignment and push sensitive-data exposure
- guardian/external role overreach and stale access
- portal/BFF aggregation bypassing source authorization
- search/cache/projection/count leakage
- offline sync cursor/tombstone/replay/conflict vulnerabilities
- deep-link/open redirect/session fixation
- emergency broadcast misuse and false acknowledgement/safety inference
- logs/traces/analytics containing recipient/content/contact data

Apply forced RLS, source authorization, field/purpose allowlists, template escaping/sanitization/CSP, signed events/callbacks where supported, Secrets Manager/KMS, provider-account isolation, rate/volume/cost quotas, anomaly detection, idempotency, short-lived external access, device/session revocation, deep-link allowlists, cache partitioning/purge, SoD/step-up/break-glass, immutable audit, retention/erasure/legal hold, and incident response.

Never log message bodies, rendered personal content, destinations, recipient identities, tokens, provider secrets, deep-link parameters, sensitive source fields, or signed URLs. Use masked correlations and safe codes.

## 41. Data model and PostgreSQL RLS

Add normalized tables, adapted to repository conventions, for:

- communication purpose/policy/version
- template/key/version/translation/placeholder/provider approval/branding/sender
- preference/consent/destination reference/suppression/history
- trigger subscription/version
- audience definition/snapshot/recipient/exclusion
- communication/campaign/schedule/message/render metadata
- channel routing decision/attempt/provider receipt/callback/reconciliation/cost
- inbox item/read/acknowledgement/tombstone
- emergency campaign/recipient/acknowledgement/escalation/break-glass review
- push installation/token/scope/revocation
- portal composition/version/navigation/card entitlement
- work-queue/calendar/search projection/watermark/tombstone
- sync collection/cursor metadata/device mutation receipt
- external-portal access review

Every tenant-owned table has non-null tenant/institution scope, scope-consistent foreign keys where practical, RLS enabled and forced, least-privilege policies, and indexed predicates. Add negative tenant/recipient/dependent/device/role/external-user tests.

Use immutable message/attempt/receipt IDs, content hashes, optimistic versions, idempotency constraints, exact currency, effective dates, retention state, and encrypted sensitive destination/provider references.

Partition high-volume messages/attempts/callbacks/inbox/projections only with RLS/index/retention/maintenance/backfill strategy. Flyway migrations are forward-only and rolling-compatible; never edit an applied migration.

## 42. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- purposes/policies/branding/senders
- templates/translations/preview/test/validate/review/approve/activate/suspend/compare
- preferences/consent/destinations/suppression/correction/history
- triggers/audience definitions/preview/snapshot/validate
- campaign/create/review/approve/schedule/pause/cancel/status
- in-app inbox/list/sync/read/archive/acknowledge
- emergency draft/approve/send/ack/escalate/correct/all-clear/review
- provider configuration status/attempt/callback/reconciliation/health/cost
- push device/register/refresh/scope/revoke/list/logout-all
- portal composition/navigation/home/work-queue/calendar/search/settings
- sync collections/delta/reset and idempotent mutation receipt/status
- external-portal assignment/access review/revoke
- analytics/reports/export/audit/operations

Use role-shaped DTOs, bounded pagination/filter/sort, field allowlists, RFC 7807, ETags/conditional requests, sync cursors/tombstones, `Idempotency-Key`, correlation IDs, server time, rate/volume/cost limits, privacy thresholds, anti-enumeration, and generated clients.

Define least-privilege permissions for template author/reviewer/approver, translator, branding/sender/provider admin, consent/preferences support, audience maker/checker, campaign sender/approver, emergency issuer/approver, delivery support, communication analyst/auditor, portal configuration admin, each internal role portal, guardian, applicant, evaluator, recruiter, mentor, auditor, tenant admin, and platform health.

Enforce SoD for sender/provider activation, template approval, bulk audience approval, optional campaign send, emergency broadcast/break-glass review, export, external access, and sensitive support replay.

Use outbox/inbox and minimal events. Never place message content, destinations, identities, recipient lists, preferences, consent details, device tokens, provider IDs/secrets, emergency sensitive data, portal response data, sync cursors, object keys, or signed URLs in general events.

## 43. React web role portals

Implement/normalize route groups and complete responsive journeys for:

- student
- faculty
- HOD/program/department
- Dean/academic leadership
- Controller/exam cell
- Principal/management
- admissions
- finance
- placement/training
- projects/internships
- HR/workload/appraisal
- library/hostel/transport/visitor/assets/service desk
- IQAC/OBE/accreditation
- guardian
- restricted applicants/evaluators/recruiters/mentors/auditors
- tenant administration and platform operations

Each portal has role/scope banner or switcher, home, actionable work queue, calendar, inbox, authorized search, quick actions, reports where permitted, profile/settings/help, and consistent states.

Do not create placeholder cards linking nowhere. Every visible element has a working authorized source route or is omitted behind an entitlement/feature flag.

## 44. Native Android/iOS interface contracts for every role

Ensure every role above has a documented native-mobile information architecture and API contract in `docs/mobile/ROLE_FEATURE_MATRIX.md`, including home cards, work queue, inbox, calendar, search, quick actions, notifications/deep links, sync collections, offline allowlist, high-risk online-only actions, device capabilities, accessibility, and intentional denial/web-first cases.

Preserve existing React Native role interfaces produced in prior prompts where present. Fix contract/client incompatibilities and missing role coverage, but do not re-scaffold or replace the mobile workspace/security/offline engine reserved for Prompt 27.

No high-frequency student/faculty task may be desktop-only without an explicit security/technical justification and a mobile alternative. Sensitive bulk authoring/configuration may remain web-first with native review/approval/status companions.

All official mobile actions use source-domain APIs and authoritative receipts. Mobile navigation, hidden buttons, or cached entitlements never substitute for backend authorization/RLS.

## 45. Observability, SLOs, and operations

Define SLOs for event-to-queue, queue-to-provider, in-app availability, provider callback processing, emergency fan-out, portal home/work queue/calendar, search, sync, and device registration.

Instrument low-cardinality metrics/traces for event validation/dedup, audience resolution, render failure, queue age, provider acceptance/delivery/failure semantics, retry/bounce/complaint/suppression, cost quotas, push invalidation, inbox sync, projection lag/rebuild, portal latency/error, BFF downstreams/cache, sync reset/conflicts, external access expiry, and RLS denials.

Add dashboards, alerts, synthetic provider-disabled/test-adapter checks, notification outage/reconciliation, duplicate-send, wrong-audience containment, template rollback, credential rotation, complaint/cost spike, push-token incident, emergency broadcast, projection rebuild, search leak, sync cursor recovery, external access revoke, backup/restore, DR, and cost/cardinality runbooks.

## 46. Tests

Add unit, property, contract, integration, RLS, end-to-end, web/mobile-contract, security, accessibility, chaos, and representative-load tests.

At minimum test:

- purpose/legal-basis/consent/preference/quiet-hours/mandatory/emergency precedence
- template lifecycle, typed placeholders, escaping/sanitization, localization/RTL/pluralization, truncation, branding/sender isolation, and version impact
- audience rules, snapshots, duplicates, multi-role/dependent personalization, exclusions, count privacy, and cross-tenant denial
- outbox/event replay, poison version, idempotency, batch checkpoints, cancellation, crash recovery, and no duplicate delivery
- per-recipient rendering cache isolation and canary data leakage
- channel routing/fallback, delayed callbacks, bounce/complaint/suppression, provider outage/rate/cost quota, and truthful status
- provider webhook signature/replay/idempotency/reconciliation
- push registration/token refresh/account switch/logout/revoke/invalid token and generic payload
- email/SMS/messaging adapters disabled by default and no real test sends
- emergency authorization/dual control/break-glass/quiet override/ack/escalation/correction/all-clear and no safety inference
- inbox pagination/sync/read/ack/tombstone/deep-link authorization
- role portal composition/entitlements/module-disabled/read-only/count authorization and source action receipts
- unified work-queue/calendar projection lag/rebuild/tombstone/reassignment and sensitive-summary exclusion
- authorized search query/suggestion/facet/count/snippet/fetch/cache/timing leakage
- BFF downstream scope propagation, partial failure, cache partition, and no business-rule duplication
- sync cursor scope/expiry/reset/tombstone/revocation and offline mutation duplicate/reorder/conflict/account switch
- guardian age/status/consent/multiple-dependent isolation
- external portal invitation/MFA/scope/expiry/revoke/download
- responsive layouts, keyboard, screen reader, zoom, contrast, RTL, loading/empty/error/offline states
- performance budgets/code splitting/no unauthorized preload/cache purge
- every web role journey and every native-mobile role contract/interface coverage entry
- cross-tenant/recipient/dependent/device/role/external RLS and IDOR
- canary leakage across logs/traces/events/notifications/templates/provider metadata/analytics/exports/client caches
- migrations, OpenAPI/generated clients, compatibility/deprecation, outbox/inbox, observability, backup/restore, and rolling release

Required end-to-end journeys:

1. Approved domain event creates one consent-aware localized message per eligible recipient, routes channels, reconciles provider status, and appears in the inbox.
2. A user changes optional preferences/quiet hours; required and emergency purposes behave according to policy with receipts.
3. Multi-dependent guardian receives correctly isolated personalized messages and cannot access another dependent after relationship revocation.
4. Provider outage triggers bounded fallback/retry without duplicate delivery or sensitive-channel downgrade.
5. Authorized emergency issuer sends multilingual broadcast with dual control, acknowledgements, escalation, correction/all-clear, and post-use review.
6. Student completes core tasks from home/work queue/calendar/inbox/search through source-domain receipts on responsive web.
7. Faculty completes high-frequency teaching/approval/self-service tasks with equivalent coherent states.
8. HOD/Controller/Principal and functional staff see accurate permission-shaped queues/KPIs without unauthorized drill-down.
9. Recruiter/evaluator/mentor/auditor restricted portal expires and loses access/downloads.
10. Mobile client fixture performs partial sync, queues an allowed idempotent mutation, reconciles conflict, receives generic push, follows authorized deep link, and purges on revoke.
11. Cross-tenant/recipient/dependent/search/count/cache/BFF leakage attempts fail.
12. Representative portals pass responsive/accessibility/performance budgets.

Run repository-standard checks plus exact relevant commands for Java compile/test/static analysis, React typecheck/lint/unit/E2E/accessibility/performance, existing Android/iOS contract/interface tests, OpenAPI generation/diff, Flyway validation, RLS/security/canary leakage, provider contract tests, dependency/container/IaC scans, and representative concurrency/load tests. Report commands, exit codes, skipped checks, environment limitations, and evidence. Never claim a check passed if it was not run successfully.

Load tests cover transactional-event bursts, bulk audiences, per-recipient rendering, provider throttling/callback storms, emergency fan-out/acknowledgement, inbox sync, portal home/work queue/calendar, search, projection rebuild, and mobile partial sync. Report tenant/recipient/device scale, mix, infrastructure, p50/p95/p99, throughput, queue/projection lag, provider limits, duplicates/errors, DB connections/locks/index/partition behavior, cost, bottlenecks, and thresholds.

## 47. Seed/demo data

Add deterministic, synthetic, production-disabled, tenant-isolated fixtures:

- purposes, templates/translations/branding/senders and provider-not-configured/test-adapter states
- preferences/consents/quiet hours/destination health/suppressions
- transactional, optional, and emergency triggers/audiences/messages/attempts/receipts
- multi-role and multi-dependent users with isolation cases
- each role portal composition, work queue, calendar, inbox, search projection, module disabled/read-only states
- push device lifecycle, sync cursors/tombstones/conflicts, external portal expiry

Use reserved synthetic domains/numbers/tokens only. No real recipients, provider credentials, external sends, incidents, or production device tokens.

## 48. Documentation and completion gate

Update:

- OpenAPI and generated clients
- communication purpose/template/placeholder/audience/channel/status data dictionaries
- communication orchestration, provider-port, portal-composition, projection, mobile-API/BFF, partial-sync, and compatibility ADRs
- consent/preference/legal-basis/quiet-hours/suppression guide
- template/localization/branding/accessibility authoring guide
- provider onboarding/callback/reconciliation/cost guide without secrets
- emergency broadcast/acknowledgement/break-glass guide
- portal information architecture and role-permission guide for every role
- design-system/responsive/state/performance documentation
- mobile API/sync/idempotency/deep-link/device-registration guide and role-feature matrix
- threat/privacy/data-flow models
- SLOs/load results/dashboards/alerts and provider/audience/template/emergency/projection/search/sync/external-access/backup/DR runbooks

Completion requires all of the following:

1. Versioned localized templates, purpose/legal-basis policies, preferences/consent, quiet hours, suppression, sender identities, and provider states are governed and tenant-isolated.
2. Domain events resolve authorized audiences and render independently per recipient without cross-recipient/tenant/dependent leakage.
3. In-app, push, email, SMS, and approved messaging ports use idempotent orchestration, truthful provider receipts, retries/fallback, callback verification, reconciliation, and cost controls.
4. Emergency broadcasts use authorized audiences, multi-language content, quiet-hour override, acknowledgement/escalation, corrections/all-clear, and post-break-glass review without claiming physical safety.
5. Student, faculty, HOD, Dean, Controller, Principal, functional staff, guardian, external, tenant-admin, and platform-operations portals provide coherent permission-shaped home/work queue/calendar/inbox/search/settings experiences.
6. Portal/BFF/projection layers contain no duplicated business rules and reauthorize every source action/drill-down.
7. Mobile-oriented APIs support pagination, ETags, partial sync/tombstones, idempotent offline-safe mutations, device registration/revocation, generic push, deep links, and authoritative receipts.
8. Every role has a complete native-mobile information architecture/API contract and existing interfaces remain compatible; high-frequency student/faculty tasks are not desktop-only without justified alternatives.
9. Responsive/accessibility/localization/application-state/performance budgets pass representative desktop/mobile-web testing.
10. Every tenant table has forced RLS and negative tenant/recipient/dependent/device/external-role tests; privacy/consent/SoD/audit/retention controls pass.
11. Provider outage/replay/callback, duplicate event, audience leak, emergency, projection/search/sync, external expiry, load, security, and canary tests pass.
12. OpenAPI/generated clients, migrations, docs, ADRs, guides, dashboards, and runbooks pass every environment-available check.
13. No provider delivery/read, consent, external send, emergency response/safety, source action, or device registration was fabricated.
14. Prompt 27 React Native workspace foundation, OIDC/PKCE, native secure storage, offline engine, device-service implementations, and release pipeline were not scaffolded/replaced in this prompt.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, purposes/templates/localization/consent/preferences/audiences/orchestration/channels/providers/emergency/inbox/analytics, all role portals, mobile-ready APIs/BFF/sync/device/deep-link contracts, responsive/accessibility/performance, security/privacy/tenancy/RLS/SoD/audit/idempotency/retention, representative load and all exact test/scan commands/results/exit status, docs/ADRs/runbooks, limitations/unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(portals): unify communications and mobile-ready experiences`

Stop. Do not begin Prompt 27 or scaffold/replace the React Native foundation, security/session layer, offline-sync engine, native device services, or mobile release pipeline.
```

---

## Review Checklist Before Prompt 27

- Communication purpose, consent/preferences, templates, audiences, channels, and provider receipts are versioned and truthful.
- Per-recipient rendering and multi-dependent personalization cannot leak across recipients or tenants.
- Emergency broadcasts support acknowledgement/escalation but never claim physical safety.
- Every internal, guardian, and restricted external role has a coherent permission-shaped portal.
- Work queue, calendar, search, dashboards, and BFFs remain projections/compositions rather than new business-rule owners.
- Mobile APIs support bounded sync, ETags, tombstones, idempotent mutations, device lifecycle, generic push, and authorized deep links.
- Every role has documented native-mobile contracts and no unjustified desktop-only high-frequency workflow.
- Responsive, accessibility, localization, application-state, and performance budgets pass.
- Every tenant table has forced RLS and negative isolation tests.
- No Prompt 27 React Native foundation/security/offline/device/release implementation was scaffolded or replaced.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 27 until these conditions pass.
