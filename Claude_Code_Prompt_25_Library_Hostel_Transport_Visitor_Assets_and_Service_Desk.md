# Claude Code Prompt 25

## Library, Hostel, Transport, Visitor, Assets, and Service Desk

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–24 passed, were reviewed, and were committed  
**Scope:** Six independently enabled campus-operations modules—library, hostel, transport, visitor management, assets/inventory, and service desk—with finance/document/workflow/device/notification integrations, security, analytics, and role-specific web/native-mobile interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially library, hostel, transport, visitor, assets/inventory, maintenance, service requests, campus safety, fees, documents, devices, privacy, accessibility, reporting, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, data-classification/retention/privacy policy, workflow conventions, and repository standards.
3. Inspect Prompt 01 identity/RBAC/guardian/external-user contracts; Prompt 02 documents/workflow/audit/outbox; Prompt 03 campuses/buildings/rooms/academic structure; Prompt 05 student lifecycle; Prompt 06 registration; Prompt 07 timetable/rooms/labs; Prompt 11 fees/payments/receipts/reconciliation; Prompt 17 document/verification; Prompt 22 external contacts; Prompt 23 incidents/mentoring; Prompt 24 employee records/attendance/integration boundaries; and existing notification/provider/device/search/reporting contracts.
4. Inspect PostgreSQL RLS, plan/feature entitlements, OpenAPI/generated clients, object storage/malware scan, QR/barcode/RFID/GPS/provider ports, background jobs/observability, accessibility/localization, AWS/IaC conventions, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, build one giant `campus-operations` module, weaken tenant RLS, duplicate identity/finance/document/workflow/notification masters, fabricate device/GPS/payment/provider acknowledgements, continuously track people without explicit policy, expose watch lists/grievances/room assignments/routes through general search, implement accounting/procurement/GPS hardware control, or begin Prompt 26 communications/portal consolidation.

Implement six bounded modules with explicit APIs/events and separate feature entitlements:

1. `library-services`
2. `hostel-residence`
3. `campus-transport`
4. `visitor-access`
5. `asset-inventory`
6. `service-desk`

Each module owns its operational records and rules, can be enabled/disabled independently per tenant/institution/campus and plan, and must not depend on another optional module being enabled. Shared integrations use stable contracts and graceful `MODULE_DISABLED`/`NOT_CONFIGURED` states.

## 1. Cross-module invariants

Enforce:

- every tenant-owned record carries tenant/institution scope and forced PostgreSQL RLS
- campus/building/room/person/member/student/employee/guardian/vendor identities are authoritative references, not copied masters
- operational policies are effective-dated, versioned, validated, reviewed, and immutable after activation
- consequential transactions are append-safe/versioned, idempotent, auditable, and return authoritative receipts
- fee/deposit/fine/refund/charge records are payable-item references to Prompt 11; modules never mark paid without finance acknowledgement
- files use Prompt 02 object/document storage, classification, malware scan, version, checksum, retention, and access controls
- device/provider events are immutable evidence with signature/source/received time; interpreted state is reproducible and correctable by superseding version
- QR/barcode/RFID values use opaque scoped identifiers and never encode sensitive personal data
- sensitive locations, room/bed assignments, routes, visitor identity, watch lists, incidents, grievances, asset security, and service-request content are excluded from general search/events/logs
- no continuous GPS/location surveillance outside approved transport/asset use, purpose, notice, retention, and access policy
- module disablement blocks new activity safely while preserving authorized read/closure/export/retention obligations
- mobile official actions require authoritative server receipts

Write a shared glossary plus module-specific terms: accession, circulation, reservation, hostel allocation, out-pass, route/stop/trip, boarding event, visitor badge, custody, stock ledger, calibration, work order, service catalogue, SLA, escalation, confidential case, and emergency roll call.

## 2. Entitlements and independent lifecycle

Implement module-entitlement resolution from tenant plan/feature configuration with:

- tenant/institution/campus/module scope
- enabled, pilot, read_only, suspended, and disabled states
- effective dates, limits/quotas, dependencies, configuration readiness, reason, approver, and audit
- backend enforcement at route/service/repository/job/event-consumer layers
- UI navigation and mobile shell driven by server entitlements, never used as authorization

Disabling a module must:

- stop new transactions/jobs/device commands/providers
- preserve in-flight transaction reconciliation or move it to governed exception state
- retain authorized history, open obligations, legal holds, exports, and audit
- prevent consumers from failing when its events cease
- return stable errors and support re-enable without data corruption

Test all 64 enable/disable combinations conceptually through pairwise/contract coverage and directly test each module alone.

## 3. Shared campus location and operating-calendar references

Reference Prompt 03 campus/building/floor/room/lab structures. Add module-specific locations only as extensions with stable source references, such as library stacks, hostel rooms/beds, parking/gates, stores, service zones, and asset positions.

Use institution timezone, operating hours, closures, holidays, emergency status, capacity, accessibility, and active/effective dates. Do not mutate academic rooms through operations APIs.

Validate hierarchy cycles, cross-campus links, capacity, duplicate codes, inactive locations, and date overlap. Restricted locations never appear in public/general maps or search.

## 4. Shared provider and device-event envelope

Define a versioned provider-neutral envelope for RFID, barcode/QR scanners, self-check kiosks, GPS/telematics, gate devices, biometric/access-control references, IoT sensors, and maintenance systems:

- provider/device ID and verified assignment
- tenant/institution/campus/module scope
- immutable provider event ID/type/schema version
- subject/resource opaque reference
- provider timestamp/timezone, received time, sequence/watermark
- signature/checksum, replay/idempotency key, quality/reliability status
- payload classification and minimal allowed fields
- processing/result acknowledgement

Verify signatures, audience, freshness, sequence/replay, device status, and scope. Quarantine unknown schemas/devices. Do not fabricate acknowledgements or interpret missing provider data as a real-world event.

Provider adapters expose `NOT_CONFIGURED`, `UNAVAILABLE`, `DEGRADED`, and `ACTIVE`. Test doubles are labeled and cannot create production-valid evidence.

## 5. Shared finance integration

Use Prompt 11 for library fines, lost/damaged charges, hostel fees/deposits/mess/damage, transport fees, visitor charges if permitted, asset recovery charges, and paid service requests.

Each payable request pins:

- module transaction and policy/rate version
- payer/account reference
- itemized amount, tax/waiver/scholarship applicability reference, currency, due date
- idempotency key and semantic hash
- finance acknowledgement/status/receipt/reference

Modules show `NOT_RAISED`, `PENDING_FINANCE`, `DUE`, `PARTIALLY_PAID`, `PAID`, `WAIVED`, `REFUNDED`, `REVERSED`, or `DISPUTED` only from Prompt 11 contracts. Operational waivers create approved charge adjustments, never direct payment edits.

Payment success may unlock an operation only after authoritative finance acknowledgement. Reconciliation handles delayed/duplicate callbacks and refund/reversal.

## 6. Library catalogue and bibliographic records

Implement library catalogue with:

- title, subtitle, authors/editors, edition, publisher, publication year, language
- ISBN/ISSN/DOI/standard identifiers with validation
- subject/classification, keywords, abstract/description, format/material type
- series, volume/issue, pagination/duration, cover/reference
- source/license/copyright/usage metadata
- course/program/department recommendations and syllabus references
- bibliographic merge/duplicate workflow and authority control references
- draft, review, active, restricted, retired, and superseded states

Separate bibliographic work from individual copies/accessions. Do not expose licensed digital content without entitlement/provider agreement.

Search supports permission-aware OPAC metadata, Unicode/Indian-language text, facets, typo tolerance if existing search supports it, and accessible results. Restricted acquisitions/security notes never enter OPAC.

## 7. Library accessions, copies, and locations

Model physical/digital copies with:

- accession number, barcode/RFID tag, bibliographic reference
- owning branch/campus, shelf/stack/location
- format, acquisition source/date/cost/vendor/reference
- condition, availability, circulation class, replacement value
- digital-license/provider/seat/expiry reference where applicable
- status: processing, available, issued, reserved_hold, reference_only, repair, lost, missing, damaged, withdrawn, written_off, or archived

Enforce uniqueness by tenant/library and safe tag reassignment history. Tags use opaque IDs and cannot reveal borrower/content when scanned without authorization.

Acquisition/vendor/procurement is an integration boundary. Record request/order/invoice references only; do not implement full procurement/accounting.

## 8. Library membership and circulation policy

Reference student/employee/external memberships and define effective circulation rules by member category, material/copy class, campus, and calendar:

- issue limit, loan period, renewal count/window
- reservation/hold queue and pickup expiry
- recall, reference-only, short-loan, overnight, and holiday rules
- overdue grace/fine/lost/damage/replacement policy
- blocks based on authoritative membership/library/finance state
- staff override/exception authority

Use declarative validated rules, not arbitrary scripts. Pin policy version to every loan/reservation/charge.

Do not block unrelated academic access automatically; expose library hold references to authorized institutional policy only.

## 9. Library issue, return, renew, reserve, and self-service

Implement transaction lifecycle:

- member/tag/copy resolution
- eligibility/policy check
- atomic issue/return/renew/reserve/hold-pickup/cancel
- due date calculated in institution timezone/calendar
- copy/member/queue state with concurrency locks
- receipt and notification

Prevent double issue, duplicate return, queue jumping, renewal past reservation, and two simultaneous pickups. Idempotent scan events return original receipt.

Support staffed desk, authorized self-check, and mobile reservation/renewal. Mobile camera scan may identify an item but server validates every action. Offline scans queue only when explicitly allowed and cannot claim completion until reconciled.

## 10. Library overdue, lost, damage, fines, and stock verification

Calculate overdue from pinned policy/calendar with exact units/amounts, grace/cap, closure dates, and transparent trace. Raise finance payable reference; never mark paid locally.

Lost/damaged workflow records report, condition/evidence, assessment, replacement option, charge, waiver/appeal, copy status, recovery, refund/adjustment, and approval.

Stock verification supports scoped snapshot, barcode/RFID scan, expected/seen/unseen/mis-shelved/duplicate/unknown, reconciliation, missing approval, and write-off. Preserve each scan and count version.

Write-off requires maker-checker, reason, evidence, accounting/procurement reference, and immutable history.

## 11. Library OPAC, digital access, and reports

Provide public/authenticated OPAC according to policy with availability at an aggregate/library level that does not expose borrower identity. Support search, accessible detail, reservation, renewals, loans, due dates, fines/finance status, reading history privacy, and suggestions/requests.

Digital providers use time-bound authenticated launch/reference and truthful licence status; do not proxy copyrighted content without rights.

Reports include circulation, overdue, reservation, collection utilization, acquisitions references, stock variance, lost/damage, digital-license usage, and course/department coverage with privacy-safe populations.

Reading history retention is configurable and private; never use it for disciplinary or opaque profiling.

## 12. Hostel structure, rooms, beds, and capacity

Model hostel/residence separately from Prompt 03 buildings:

- hostel, block, floor, wing, room, bed
- category/eligibility constraints and accessible accommodation attributes
- capacity, occupancy, gender/category policy where lawfully configured
- facilities/amenities, resident advisor/warden assignment reference
- room/bed status: available, reserved, occupied, blocked, maintenance, quarantined_reference, retired
- effective dates and inspection/condition reference

Do not expose resident lists or exact room/bed locations publicly. Validate hierarchy, duplicate rooms/beds, capacity, incompatible occupancy, and maintenance blocks.

## 13. Hostel policy, application, and eligibility

Implement versioned declarative policy for:

- eligible programs/cohorts/student status
- priority/waitlist criteria with lawful transparent rules
- distance/residency/special accommodation inputs only from approved declarations/evidence
- application windows, room categories, duration, renewals
- fee/deposit/mess plan references
- conduct/visitor/quiet-hours/leave/out-pass rules
- document, guardian/emergency-contact, health/accommodation routing

Eligibility returns eligible, ineligible, conditionally_eligible, pending_data, or review_required with criterion/source/version/explanation. No opaque AI ranking or protected-trait inference.

Application captures preferences, consent/acknowledgements, necessary documents, emergency contact, and receipt. Sensitive health/accommodation details route to authorized staff and are not visible to roommates/wardens unless necessary.

## 14. Hostel allocation and waitlist

Implement application review, priority score only through transparent approved criteria, waitlist, offer, acceptance/decline, allocation, and expiry.

Allocation must atomically reserve a compatible available bed, prevent overbooking, pin policy/application/room-state versions, and return receipt. Support human assignment and transparent rule-assisted proposals; no opaque roommate matching.

Roommate preferences are optional/private and cannot imply safety/compatibility guarantees. Approved accommodations override ordinary preference through restricted workflows.

Changes after acceptance preserve original offer/allocation and require reason, affected resident acknowledgement, fee impact, approval, and version.

## 15. Hostel check-in, occupancy, room changes, and check-out

Check-in requires accepted allocation, required payment/deposit acknowledgement, documents, inventory/condition checklist, keys/access reference, rules acknowledgement, emergency contact, and server receipt.

Maintain effective-dated occupancy; prevent overlapping resident/bed occupancy. Support temporary absence, room change/swap request, administrative move, maintenance relocation, renewal, vacating, suspension reference, and termination.

Room changes require compatibility/capacity, current/new condition checklist, resident responses, approvals, finance adjustments, and access changes. No silent reassignment.

Check-out records notice, room/asset inspection, key return, damage assessment, outstanding charges, deposit-refund request to finance, forwarding contact where permitted, and completion/clearance status. Do not claim refund until Prompt 11 acknowledgement.

## 16. Hostel leave, out-pass, visitor permission, and roll call

Implement resident leave/out-pass with destination category, from/to date/time/timezone, purpose category, contact, guardian acknowledgement only where policy/age/legal basis applies, academic/exam conflict warning, approval, departure/return gate events, overdue status, and receipt.

Do not expose destination/reason broadly. Gate staff see only active pass identity, permitted times, status, and emergency contact action.

Hostel visitor permissions reference the visitor module through stable contracts. Hostel staff cannot bypass visitor identity/consent/watch-list controls.

Emergency roll call shows current occupancy plus approved leave/check-out/gate-event freshness, explicitly labels uncertainty, and restricts export/retention. It is not proof of physical presence.

## 17. Hostel mess, charges, incidents, and maintenance

Support meal-plan/mess membership, opt-in/holiday pause where policy permits, attendance/count references, and itemized charge requests to Prompt 11. Do not implement food procurement/accounting.

Damage/asset charge workflow uses inspection, evidence, responsibility review, resident response, approval, and finance handoff. No automatic collective penalty.

Incidents include maintenance, safety, welfare, conduct, noise, lost property, medical/emergency reference, and confidential grievance route. Sensitive grievance/anti-ragging/harassment cases must route to strictly authorized service-desk/case workflows, not ordinary hostel notes.

Maintenance requests integrate service desk/assets without requiring those modules enabled; fall back to an external-reference status.

## 18. Transport vehicles, documents, and personnel references

Model:

- vehicle identity/registration/type/capacity/accessibility/ownership/vendor reference
- operational status and assigned depot/campus
- insurance/permit/fitness/pollution/tax/inspection documents with expiry
- driver/attendant employee/vendor references, licence/qualification/compliance status from Prompt 24 or verified external evidence
- emergency/safety equipment checklist
- odometer/fuel/maintenance references without implementing fuel accounting

Do not duplicate employee HR records or certify roadworthiness beyond evidence. Expired required documents/qualifications block assignment according to approved policy and create alerts.

Restricted vehicle/security data is not publicly searchable.

## 19. Routes, stops, schedules, and trips

Implement effective-dated routes with ordered stops, public safe names, geospatial coordinates where approved, planned times/timezone, distance, vehicle type/capacity, service days, fares/fee reference, and status.

Schedules/trips pin route version, vehicle, driver/attendant, planned times, capacity, and rider roster snapshot. Validate driver/vehicle conflicts, document validity, capacity, maintenance blocks, and timetable compatibility.

Real-time deviations never overwrite planned route. Detours/cancellations create versioned operational changes with notifications and audit.

Do not publicly expose exact vehicle depot, driver personal information, complete student roster, or historical individual travel.

## 20. Transport application, allocation, and capacity

Student/staff applies for route/stop/period with policy, fee, consent, accessibility/safety need routing, and receipt. Guardian may apply only through verified relationship and policy.

Allocation atomically reserves capacity by route/stop/period, prevents duplicate/incompatible assignments, and produces waitlist/offer/acceptance/allocation states. Use transparent priority rules, not opaque AI.

Changes/cancellation preserve history and trigger finance adjustment/refund requests. Transport module never marks payment/refund itself.

Maintain rider assignment separately from daily boarding evidence. Expired/inactive students/employees are invalidated through authoritative source events and reviewed.

## 21. GPS/telematics integration and privacy

Define provider-neutral GPS port for vehicle location, speed category, heading, timestamp, accuracy, trip/device identity, ignition/status, geofence/deviation events, and provider health.

Collect only during authorized service/trip/maintenance windows according to policy. Do not use vehicle telemetry for unrelated employee surveillance or retain precise history indefinitely.

Verify signature/replay/device/trip assignment, reject impossible/stale/out-of-order data or label it unreliable, and keep raw versus interpreted events separate.

Student/guardian views show privacy-safe current trip/ETA/last-updated/uncertainty, not driver personal details or unrestricted historical traces. ETA is an estimate, never guaranteed.

## 22. Boarding, check-in/out, RFID/QR, and rider safety

Support authorized RFID/QR/barcode/manual boarding/alighting events with opaque rider credential, trip/stop/device, direction, provider time, received time, reliability, and receipt.

Events are idempotent and cannot silently create duplicate boarding. Missing scans yield unknown/review_required, not automatic absence or safety conclusion.

Provide current onboard list derived from event sequence with uncertainty, manual correction/annotation, and audit. Driver-safe mode prohibits complex interaction while moving; attendant or designated operator handles scanning/status.

Guardian notifications follow institution policy and Prompt 26-ready events, use generic text, and never disclose a bus roster or other riders. Emergency access is restricted and audited.

## 23. Transport delays, deviations, breakdowns, and incidents

Implement events for late start, delay, missed stop, detour, breakdown, accident/emergency reference, vehicle substitution, driver/attendant substitution, cancellation, and service restoration.

Record source, severity, trip impact, estimated resolution, affected riders, coordinator action, safe communication, replacement capacity, evidence, and closure. Do not fabricate emergency-service response or provider status.

Substitution revalidates documents, qualifications, conflicts, capacity, and rider assignments. Critical communications use existing notification contracts; Prompt 26 will consolidate orchestration later.

Sensitive accident/welfare details remain in authorized cases and out of general operational notifications/analytics.

## 24. Transport maintenance and compliance

Create maintenance plans/work orders by reference to asset/service-desk contracts:

- preventive schedule by date/odometer/provider signal
- inspection checklist, defect, priority, downtime
- vendor/workshop, estimate/cost/invoice/procurement reference
- parts reference, work performed, evidence, approval, return-to-service checklist
- warranty/AMC and document expiry

Vehicle cannot be scheduled while blocked/out_of_service. Return to service requires authorized inspection evidence.

If asset/service-desk modules are disabled, transport retains minimal maintenance/compliance records through its own boundary without runtime dependency.

## 25. Visitor preregistration and invitation

Implement visitor invitations with:

- host person/unit and verified authority
- visitor name/contact minimal fields
- organization, purpose category, expected date/time/timezone/duration
- campus/gate/destination safe reference
- accompanying persons, vehicle, carried items where required
- consent/privacy/safety notice version
- approval requirements, sponsor, and access zones
- QR/pass token as opaque short-lived credential

Lifecycle: draft, submitted, pending_approval, approved, rejected, cancelled, expired, checked_in, checked_out, denied, and archived.

Hosts see only their visitors. Invitations never grant access until gate verification/check-in. Do not put identity/purpose/location in QR codes or notifications.

## 26. Visitor walk-in, identity verification, and consent

Walk-in flow captures minimum required identity/contact/purpose/host, verifies host/approval, presents privacy/safety notice, records consent/acknowledgement, and issues a receipt.

Identity document/photo/vehicle capture is configurable, purpose-bound, access-restricted, encrypted, and retained minimally. Do not scan/store government ID fields not required by policy. Mask displayed identifiers.

Support accessibility/language assistance and a non-digital fallback with later controlled entry. Never use facial recognition or biometric matching in this prompt.

Host confirmation and external providers must be truthful. A missing host response yields pending/denied according to policy, not fabricated approval.

## 27. Visitor screening, deny/watch list, and due process

Implement highly restricted watch/deny entries with source/authority, subject matching data minimized, reason category/classification, effective/expiry, review date, evidence reference, approver, status, and appeal/correction process where applicable.

Use deterministic matching with configurable exact/verified attributes and human confirmation. Avoid fuzzy automatic denial that could misidentify people. Never expose list membership to ordinary hosts, reception, search, analytics, notifications, or logs.

Gate responses disclose only permitted action/instruction, not sensitive rationale. Emergency/law-enforcement entries require documented authority and legal/retention review.

Every view/match/decision is audited; expired/unverified entries cannot silently block access.

## 28. Visitor check-in, badge, access, and check-out

At check-in:

1. Resolve invitation/walk-in and verify identity/host/approval/window.
2. Apply screening through restricted service.
3. Record consent/safety acknowledgement and items/vehicle where configured.
4. Issue unique badge/pass with zones, escort policy, expiry, and opaque QR/barcode.
5. Record gate/time/operator and receipt.

Prevent badge reuse, duplicate active visits, pass cloning, cross-campus use, and checkout of the wrong visit. Badge printing contains minimum data.

Support host notification, escort handoff, destination arrival reference, extension approval, overstay alert, lost badge, emergency evacuation status, and check-out/item reconciliation.

Auto-expiry is not checkout; emergency roll call distinguishes checked_in, checked_out, expired_unknown, and location_unknown.

## 29. Visitor emergency roll call and retention

Provide gate/campus emergency roll call for currently checked-in visitors, hosts, last known zone/checkpoint if available, assistance need flag, and data freshness/uncertainty.

Access is emergency-role/incident scoped, step-up authenticated, audited, and expires. Export is encrypted/watermarked and retained only under incident policy.

Retention jobs delete/anonymize visitor identity/photos/documents according to purpose and legal hold while preserving minimal aggregate/audit evidence. Do not retain indefinite visitor movement history.

## 30. Asset and inventory catalogue

Keep distinct but linked concepts:

- item/SKU/catalogue definition
- serialized asset/equipment
- non-serialized stock/consumable
- spare part
- kit/bundle
- software/licence/reference where institution chooses

Capture category, specifications, unit of measure, manufacturer/model, safety/classification, ownership, funding/project reference, capitalization/accounting reference, procurement/vendor reference, warranty/AMC, expected life, reorder/minimum level, and status.

Do not implement general ledger, depreciation, procurement, or vendor payment. Integrate by references.

Use unique asset/tag/serial/barcode/RFID controls, duplicate/merge review, and immutable acquisition/source history.

## 31. Stores and stock ledger

Model store/location/bin, authorized custodians, item balance, lot/batch/expiry where applicable, and reservations.

Use append-only exact-quantity stock ledger for opening/import, receipt, issue, return, transfer-out/in, adjustment, consumption, damage, loss, expiry, and disposal. Never overwrite balance.

Atomic reservations and transfers prevent negative stock/oversubscription. Two-phase transfer records dispatch, in-transit, receipt, discrepancy, rejection, and cancellation.

Units/conversions are versioned and exact. Adjustments require reason/evidence/approval. Rebuild balance from ledger and compare with projection.

## 32. Asset custody, issue, return, transfer, and count

Serialized assets track current custodian, department, location, status, condition, assignment purpose, dates, and acknowledgement.

Issue/return/transfer requires eligibility, condition checklist, accessories, photos/documents where justified, due date, custodian acceptance, and receipt. Prevent overlapping custody.

Support temporary loan, permanent assignment, shared/location custody, lost/stolen report, recovery, damage assessment, and employee/student clearance reference.

Cycle/physical count uses scoped expected snapshot, camera/barcode/RFID scans, seen/missing/unexpected/location variance, reconciliation, approval, and immutable versions. Offline scans are queued with device/user/time and not final until server reconciliation.

## 33. Calibration, warranty, AMC, maintenance, downtime, and disposal

For lab/safety equipment track:

- calibration type/interval/due date/provider/certificate/result/status
- preventive/corrective maintenance schedule/work order
- warranty/AMC terms/expiry/provider/reference
- defect, downtime start/end, impact, alternate asset
- inspection/repair/parts/cost/procurement reference
- return-to-service approval

Expired/failed calibration or critical defect blocks use/booking through published status contracts. Do not fabricate calibration or vendor service.

Disposal/write-off requires condition/value reference, data sanitization for devices, environmental/safety method, approvals, evidence, accounting reference, asset status, and custody closure. No destructive device action is performed by this software without a separate approved provider.

## 34. Asset reservations and lab/equipment integration

Support authorized reservation by course/lab/project/event with date/time/timezone, quantity/asset, purpose, requester, approval, conflicts, checkout/return, and receipt.

Check timetable/location/maintenance/calibration/custody/capacity references. Do not edit Prompt 07 schedules or Prompt 23 projects.

Late return/damage/loss may create service/finance references under approved policy. Students/faculty see only available assets and their own reservations, not security-sensitive inventory/location/cost data.

## 35. Service catalogue and request types

Implement independently configurable service catalogue entries for:

- certificates/documents
- IT access/device/network/software
- facilities/electrical/civil/cleaning
- hostel, transport, library, finance, academic, HR, placement, examination
- asset issue/repair
- general inquiry/feedback
- confidential grievance, anti-ragging, harassment, welfare, disciplinary referral, and whistleblowing routes

Each version defines audience, description, form schema, required documents, fee reference, workflow, owner/group, SLA/calendar, priority, approval, delivery method, privacy/classification, retention, escalation, and availability.

Use a validated dynamic-form schema with allowlisted controls/validation, no executable scripts/HTML, field-level classification, conditional logic, localization, and accessible rendering.

## 36. Service request lifecycle

Implement:

- draft, submitted, triaged, awaiting_information, awaiting_approval, assigned, in_progress, pending_external, resolved, delivered, closed, reopened, rejected, cancelled, and archived
- requester/beneficiary relationship and scope
- category/service/version, priority/severity, channel, description, form answers, attachments
- assignment group/agent, watchers with authorization, SLA timestamps
- comments separated into requester-visible, internal, and restricted-case notes
- tasks/approvals/dependencies, finance status, related module/resource
- resolution/delivery evidence, acknowledgement, satisfaction feedback, reopen/appeal

Every transition uses optimistic version/idempotency, authorization, reason, audit, and receipt. Agents cannot silently edit requester submissions; corrections preserve versions.

## 37. SLA, assignment, escalation, and knowledge

Calculate SLA from pinned service policy/calendar with response/resolution targets, pause conditions, business hours, priority, escalation levels, and exact timestamps.

Support skill/group/round-robin/manual assignment using transparent rules; no opaque employee-performance scoring. Assignment changes preserve history and conflict/absence handling.

Escalations notify authorized roles without leaking confidential content. SLA breach does not automatically discipline staff.

Provide permission-aware knowledge articles with version/review/expiry, audience, localization, attachments, helpfulness, and search. Confidential case content never becomes a knowledge article automatically.

## 38. Confidential grievances and restricted cases

Create a separate strict route and authorization domain within service desk for grievance, anti-ragging, harassment, discrimination, welfare/safety, whistleblowing, disciplinary referral, and other sensitive cases.

Support anonymous/pseudonymous/identified modes only when institution policy and response limitations are clearly explained. Do not promise anonymity if technical/legal policy cannot support it.

Capture minimal intake, safe contact preference, immediate-risk routing, protected evidence, assigned authorized committee/officer, conflict/recusal, actions, respondent process reference, status, outcome, appeal, legal hold, and retention.

No ordinary service-desk agent, module admin, HOD, guardian, tenant admin, or platform operator can access case identity/content without explicit assignment. Search, counts, dashboards, notifications, exports, and events must not reveal case existence to unauthorized users.

The platform supports workflow and evidence; it does not replace emergency services, police, legal counsel, POSH/Title IX-like bodies, or statutory reporting. Never fabricate external notification.

## 39. Service fulfilment, certificates, and delivery

Service tasks may call bounded module APIs for document issuance, IT/facility work, finance acknowledgement, room/route/library/asset action, or external-reference handling.

Use saga/state orchestration with idempotent commands, acknowledgements, compensation/manual recovery, and no distributed transaction assumptions.

Generated documents use approved templates, source versions, checksum/signatory/verification through Prompt 17, secure delivery, and expiry. Do not fabricate signatures or official acceptance.

Request closure requires configured resolution/delivery evidence and requester acknowledgement or documented auto-close policy with reopen window.

## 40. Cross-module incidents and emergency views

Define minimal incident references linking transport, hostel, visitor, assets, facilities, library, or services without copying sensitive case content.

Emergency views are purpose/time-bound, step-up authenticated, role-specific, audited, and show source freshness/uncertainty. They may include safe vehicle/trip status, hostel occupancy estimate, checked-in visitors, critical asset/facility state, and service contacts.

Do not create a general surveillance dashboard, combine location histories for profiling, or expose confidential cases. Emergency access expires automatically and is reviewed afterward.

## 41. Analytics and reporting

Provide versioned, privacy-safe module analytics:

- library collection/circulation/reservations/overdue/stock variance/digital access
- hostel applications/waitlist/occupancy/turnover/out-pass freshness/incidents/maintenance/charges
- transport applications/allocation/capacity/on-time/deviation/boarding uncertainty/incidents/compliance/maintenance
- visitors by safe aggregate purpose/time/status/overstay without indefinite identity tracking
- assets/stock/custody/utilization/minimum stock/calibration/warranty/maintenance/downtime/disposal
- service request volume/channel/category/SLA/backlog/reopen/satisfaction; confidential cases only in separately authorized minimum aggregates

Every chart has accessible table, exact definition, population, exclusions, source/version/as-of time, and no misleading axis. Enforce minimum-group thresholds and suppress sensitive location/person/case dimensions.

Cost/fine/charge metrics reference finance status and do not claim revenue/cash without Prompt 11 acknowledgement.

Accreditation evidence uses governed Prompt 19 references, not uncontrolled exports.

## 42. Search, bulk operations, and exports

Use separate module indexes/authorization filters where search is justified. Authorization applies to query, suggestion, facet/count, row, map, artifact, and download. Never index watch lists, grievances, resident/vehicle live rosters, precise location history, security notes, or sensitive asset data into general search.

Bulk catalogue/accession/member/room/bed/allocation/route/stop/rider/vehicle/visitor/asset/stock/service imports require schema/version, dry run, validation, matching, duplicate handling, checksum, idempotency, partial-failure report, approval, and audit.

Exports require purpose, field allowlist, classification, population, approval, manifest, encryption/watermark, expiry/revocation, recipient, and disclosure receipt. Prevent CSV formula injection, archive traversal, and hidden metadata.

## 43. Notifications and communications boundary

Emit minimal domain events and use existing notification ports for due dates, holds, allocations, trips/delays, visitor approvals, maintenance, service updates, emergencies, and receipts.

Prompt 26 will consolidate templates, channel preferences, consent, audience resolution, retries, provider callbacks, cost, emergency acknowledgement, and coherent portals. Do not duplicate that orchestration here.

Messages now must use approved existing templates/providers, generic lock-screen text, deep-link reauthorization, tenant/timezone/language settings, deduplication, and provider acknowledgement.

Never include borrower history, resident room/destination, rider roster/live exact location, visitor ID/watch-list match, asset security details, grievance/case existence, payment credentials, object keys, signed URLs, or tokens.

## 44. Backend APIs, permissions, and events

Add separately versioned OpenAPI tags/modules for:

- entitlements/readiness/status
- library catalogue/accession/copy/member/policy/loan/return/renew/reservation/hold/fine/lost/damage/stock/OPAC/report
- hostel structure/policy/application/eligibility/waitlist/allocation/check-in/occupancy/change/out-pass/visitor/mess/incident/check-out/report
- transport vehicle/personnel-compliance/route/stop/schedule/trip/application/allocation/GPS/boarding/delay/deviation/incident/maintenance/report
- visitor invitation/walk-in/approval/screening/check-in/badge/extension/overstay/check-out/roll-call/retention
- asset catalogue/store/stock ledger/reservation/issue/return/transfer/custody/count/calibration/warranty/maintenance/disposal/report
- service catalogue/form/request/triage/assignment/task/approval/comment/SLA/escalation/fulfilment/delivery/reopen/knowledge/confidential-case/report
- provider device/event/webhook/import/status
- finance/document/workflow/notification integration acknowledgements
- search/export/job/progress/audit/access review

Use role-shaped DTOs, strict field/content allowlists, bounded pagination/filter/sort, RFC 7807, optimistic versions, `Idempotency-Key`, correlation IDs, server time, payload/file limits, privacy thresholds, anti-enumeration, and generated web/mobile clients.

Define granular permissions per module and action. Include member/resident/rider/host/requester self-service; librarian/circulation/cataloguer; hostel warden/manager/gate/mess; transport coordinator/driver/attendant/fleet/safety; reception/security/host/watch-list reviewer/emergency officer; storekeeper/custodian/asset manager/calibration/maintenance/disposal; service agent/manager/approver/knowledge author/confidential-case officer; finance/document/auditor/data-protection; tenant admin; and platform health.

Enforce SoD for policy activation, fine/damage/charge waiver, stock write-off, hostel allocation override/check-out damage, transport compliance/return-to-service, visitor watch-list entry/override, asset adjustment/disposal, service approval/delivery, confidential-case assignment/outcome, and exports.

Use transactional outbox/inbox. Events carry stable references/minimal state and never sensitive content, identities/contact details, live/historical coordinates, room/bed, route roster, watch-list reason, grievance existence, borrowing history, charges/payment data, asset security details, object keys, signed URLs, or tokens.

## 45. React web interfaces

Implement accessible responsive workspaces for:

- library catalogue/accessions/copies/circulation/reservations/overdue/lost-damage/stock/OPAC/member self-service/reports
- hostel structure/policies/applications/waitlist/allocation/check-in/occupancy/room changes/out-pass/visitors/mess/incidents/maintenance/check-out/reports
- transport vehicle/compliance/routes/stops/schedules/trips/rider allocation/live operations/boarding uncertainty/incidents/maintenance/reports
- visitor preregistration/walk-in/approval/screening/gate check-in/badge/overstay/check-out/emergency roll call/retention
- assets/items/stores/stock ledger/custody/transfers/count/calibration/warranty/maintenance/disposal/reservations/reports
- service catalogue/forms/requester portal/agent queue/SLA/escalation/fulfilment/knowledge/restricted cases/reports
- module entitlement/readiness, provider/device health, finance/document exceptions, audit, privacy, exports, and operations dashboards

Meet WCAG 2.2 AA intent with keyboard operation, semantic forms/tables/queues/maps alternatives, scanner/manual alternatives, visible focus, zoom/reflow, non-color-only status, accessible calendars, localized/RTL layouts, privacy-safe masking, and clear offline/uncertain/provider/payment states.

## 46. React Native Android/iOS interfaces for every role

Implement true React Native interfaces using shared generated contracts/design tokens, not WebViews. Update `docs/mobile/ROLE_FEATURE_MATRIX.md` with supported, web-first, read-only, and denied capabilities.

### Student/Member/Resident/Rider/Requester

- library OPAC, availability, reserve/renew, loans/due/fine status and receipts
- hostel application/waitlist/allocation, check-in checklist, room-change/out-pass/visitor request, mess/maintenance/service, check-out and receipts
- transport route/stop/application/allocation, current assigned trip ETA/uncertainty, QR/RFID credential status, own boarding history, delay alerts and support
- service catalogue, dynamic forms, camera/document attachments, status/comments/delivery/reopen/feedback
- asset reservations/loans/custody acknowledgements assigned to self
- encrypted bounded offline drafts/summaries; no payment/issue/allocation/check-in/boarding/final service action succeeds without server receipt

### Guardian

- institution-policy and verified-relationship access to dependent library due summary, hostel allocation/out-pass acknowledgement where lawful, transport allocation/ETA/boarding alerts, and permitted service status
- adult-student consent/status rules enforced
- no borrowing history beyond policy, roommate/resident lists, exact room/destination, other riders, visitor/watch-list, grievance, asset, or confidential request access

### Librarian/Cataloguer/Circulation Staff

- mobile barcode/RFID/camera lookup, issue/return/renew/hold pickup, member status, condition/lost-damage, shelf/stock scans, exceptions, and receipts
- full bibliographic import/merge, policy authoring, acquisitions, write-off, and large reports remain web-first
- offline scan collection only under explicit policy with reconciliation and no false success

### Hostel Warden/Manager/Resident Advisor/Gate Staff

- occupancy/waitlist/allocation/check-in/out/room-change tasks, resident support, out-pass validation/departure/return, visitor permission reference, incident/maintenance, emergency roll call, and receipts
- gate view is minimal; health/accommodation/grievance/reason details denied unless explicitly assigned
- bulk structure/policy/fees remain web-first

### Transport Coordinator/Fleet Manager

- vehicle/document/driver/route/trip/readiness, capacity/allocation, live freshness/deviation, delay/substitution/incident, boarding uncertainty, maintenance/compliance, and communications trigger
- approve/reschedule/cancel/substitute/return-to-service with reason, SoD, step-up, and receipt
- route bulk design/provider configuration remains web-first

### Driver/Attendant

- assigned vehicle/trip/route/stops, pre-trip checklist, safe navigation handoff, rider check-in/out scanning for attendant, delay/breakdown/emergency actions, and trip completion
- driver-safe mode disables interaction while moving except a single emergency action; no roster export, other-trip access, guardian contacts, fees, or historical tracking

### Host/Reception/Security/Gate Officer

- host: invite/approve/cancel and current visitor status for own invitations
- reception: walk-in, host confirmation, consent, badge issue/return, overstay, checkout
- security/gate: verify opaque pass, permitted action/zones/window, incident and emergency roll call
- watch-list reason/content denied; restricted screening service returns minimum instruction

### Watch-list Reviewer/Emergency Officer

- assigned restricted entries/matches, evidence/source/expiry, human confirmation, decision/override/appeal, emergency scoped roll call, and audit
- no offline cache, screenshots/export by default, or general visitor browsing

### Storekeeper/Asset Manager/Custodian/Lab Technician

- item/asset scan, receipt/issue/return/transfer, custody acknowledgement, stock count/reconciliation, reservation checkout, condition, calibration/maintenance alerts, work order, and receipts
- catalogue/bulk opening/procurement/write-off/disposal policy remain web-first with mobile review/approval
- users see only assigned custody/reservations; security/value/location fields are role-limited

### Service Requester/Agent/Manager/Approver

- requester: catalogue/request/drafts/attachments/status/comments/delivery/reopen/receipt
- agent: assigned queue, SLA, requester-visible/internal comments, tasks, related-resource safe view, resolution/delivery
- manager/approver: workload/SLA/escalation/approval/exception/reassignment and analytics
- confidential cases are excluded unless specifically assigned under separate role

### Confidential Case Officer/Committee/Auditor

- secure assigned intake/evidence/actions/responses/outcome/appeal with purpose/time-bound access, step-up, no offline content cache, and audit
- no case-existence leakage to ordinary module/admin dashboards; exports require separate approval

### Finance/Document/Operations Integrator

- pending charge/payment/refund/document/provider exceptions, acknowledgement, reconciliation status, and retry/escalation according to permission
- cannot alter module source transactions or mark payment/provider success manually

### Dean/Principal/Campus Administrator/Leadership

- aggregate module readiness, capacity, SLA, safety/compliance, finance-reference, and privacy-safe operational analytics plus governed decision queues
- no individual borrowing, room/travel/location, visitor identity/watch list, grievance, or sensitive asset detail merely through leadership role

### Tenant Administrator/Platform Operations

- tenant admin: module entitlements/readiness/roles/retention/provider state and masked adoption; no automatic operational content access
- platform operations: availability/latency/errors/queues/providers/storage/index/device ingestion/deployment and masked correlations only; no identities, rosters, locations, cases, charges, or documents

For all roles: encrypted platform-backed token storage; biometric re-entry only after server authentication; generic push; deep links reauthorize; remote logout/revoke; classification-aware bounded encrypted caches with expiry/purge; camera/document/barcode/QR/NFC permissions at point of use; GPS only for approved vehicle/trip roles and never covert; localization/RTL; Dynamic Type/font scaling; screen reader; keyboard/switch support where applicable; visible focus; non-color-only states; driver-safe behavior; and authoritative receipts.

## 47. Data model and PostgreSQL RLS

Create separate schemas/packages or clearly bounded table groups, adapted to repository conventions.

Library tables include bibliographic/version/authority, copy/accession/tag/location, membership/policy, loan/renewal/return, reservation/hold queue, fine/lost/damage/waiver, stock scan/reconciliation, and digital-provider reference.

Hostel tables include hostel/block/floor/room/bed, policy/application/eligibility/waitlist, allocation/occupancy/checklist/change, leave/out-pass/gate event, visitor reference, mess plan/charge, incident/maintenance, and checkout/damage/deposit-refund reference.

Transport tables include vehicle/document/compliance/personnel reference, route/stop/version/schedule/trip, application/allocation/capacity, GPS/provider event/interpretation, boarding event/onboard projection/correction, delay/deviation/substitution/incident, and maintenance.

Visitor tables include invitation/approval, walk-in/identity-document reference/consent, restricted watch entry/match/decision, visit/badge/access zone/checkpoint/extension/overstay/checkout, emergency access/roll-call snapshot, and retention job.

Asset tables include item/category/unit conversion, serialized asset/tag, store/bin, stock ledger/projection/reservation/transfer/count, custody/condition, calibration/warranty/AMC, maintenance/downtime, loss/damage, disposal/write-off, and provider reference.

Service-desk tables include catalogue/version/form schema, request/version/answer, assignment/task/approval/comment, SLA clock/escalation, attachment/fee/module reference, resolution/delivery/feedback, knowledge article/version, restricted-case assignment/action/outcome/appeal, and access receipt.

Shared tables include module entitlement, provider/device/event receipt, integration command/acknowledgement, export/manifest/access receipt, and operational job.

Every tenant-owned table has non-null tenant/institution scope, scope-consistent foreign keys where practical, RLS enabled and forced, least-privilege policies, and indexed predicates. Add negative tenant/person/module/role/location/host/rider/resident/custodian/case tests.

Use append-only ledgers/events, effective-date constraints, exact quantities/currencies/durations, geospatial types only where justified, immutable receipts/checksums, optimistic versions, idempotency, and classification. Partition high-volume GPS/device/boarding/access/stock/service events only with retention/RLS/maintenance strategy.

Flyway migrations are forward-only, rolling-compatible, restart-safe where applicable, and include backfill/validation. Never edit an applied migration.

## 48. Security, privacy, safety, and threat model

Update module-specific and cross-module threat models for:

- IDOR/cross-tenant/member/resident/rider/visitor/asset/request/case access
- QR/barcode/RFID cloning, replay, enumeration, and offline forgery
- provider webhook/file signature/replay/out-of-order/device compromise
- live/historical location, room/bed, boarding, visitor, and movement surveillance/leakage
- watch-list misidentification/abuse and grievance/case-existence leakage
- loan/allocation/capacity/stock/leave/pass/check-in concurrency races
- finance acknowledgement spoofing and duplicate charges/refunds
- malicious uploads/archives/CSV/formula injection/XSS/unsafe links
- asset theft, stock manipulation, calibration/maintenance/disposal forgery
- service SLA/assignment/approval/content tampering
- external/privileged insider, break-glass, export, and emergency-view abuse
- mobile cache/backup/screenshot/clipboard/deep-link/notification leakage
- small-group analytics reidentification

Apply least privilege, forced RLS, field/resource/classification authorization, opaque scoped credentials, step-up/MFA, signature/replay controls, encryption/KMS/Secrets Manager, safe uploads/previews/exports, CSP/validation/encoding, rate/volume/anomaly limits, immutable ledgers/receipts, SoD, access reviews, break-glass expiry/review, retention/erasure/legal hold, and incident response.

Document physical-safety assumptions and residual risk. Software status is not proof of physical presence, safety, payment, vehicle condition, calibration, or emergency response.

## 49. Reliability, observability, and operations

Define module SLOs for circulation, hostel allocation/check-in, trip/boarding/location freshness, visitor check-in/badge, stock/custody transactions, service submission/SLA, provider ingestion, finance acknowledgement, and reports.

Instrument low-cardinality metrics/traces for transaction latency/conflicts/idempotency, provider/device watermark/replay/quarantine, queue/job lag, payment/document integration, module-disabled requests, RLS denials, GPS freshness without coordinates, boarding uncertainty, inventory projection variance, SLA breach, and restricted access anomalies.

Never log identities, contact data, borrowed titles linked to persons, rooms/beds, routes/riders, coordinates, visitor/watch/case data, asset security/location/value, request content, payment details, tokens, object keys, or signed URLs. Use masked correlations and safe codes.

Add dashboards, alerts, synthetic fixtures, module-disable/re-enable, device/provider outage/replay, finance reconciliation, circulation recovery, hostel overbooking, transport breakdown/location loss, visitor badge/watch-list incident, stock-ledger reconciliation, calibration block, confidential-case breach, import/export, backup/restore, DR, and cost/cardinality runbooks.

## 50. Tests

Add unit, property, contract, integration, RLS, end-to-end, web/mobile, security, accessibility, chaos, and representative-load tests.

Cross-module tests must cover:

- independent enable/disable/read-only behavior and absence of optional-module runtime dependencies
- finance/document/workflow/notification/provider contracts, delayed/duplicate/rejected acknowledgements, and idempotency
- every RLS/permission/SoD boundary and canary leakage across logs/events/search/counts/analytics/notifications/exports/mobile caches
- QR/barcode/RFID uniqueness/replay/offline reconciliation
- provider signatures, schema versions, ordering, watermarks, outage/recovery, and quarantine
- concurrent reservations/allocations/capacity/ledger/custody/check-in transactions

Library tests cover catalogue/copy/tag, policy/due-date/calendar, issue/return/renew/reservation queue races, overdue/fines, payment status, lost/damage/waiver, stock scan/write-off, OPAC privacy, and digital entitlement.

Hostel tests cover hierarchy/capacity, eligibility/waitlist, concurrent bed allocation, check-in/occupancy, room change, out-pass/gate events/overdue return, visitor integration, mess/charges, damage/deposit refund reference, incidents, emergency roll-call uncertainty, and checkout.

Transport tests cover document/personnel compliance, route/stop/version/schedule conflicts, allocation capacity, GPS signature/stale/impossible/out-of-order/retention, boarding duplicate/missing/correction/onboard uncertainty, driver-safe mode, delay/deviation/substitution/breakdown, maintenance block/return-to-service, guardian privacy, and finance.

Visitor tests cover invitation/walk-in/consent/host approval, minimal identity retention, opaque badge replay/cross-campus/expiry, watch-list exact/human review/expiry/appeal/no reason leak, check-in/out/overstay, emergency access/roll-call uncertainty, and deletion/legal hold.

Asset tests cover catalogue/serial/tag, exact unit conversions, append-only stock ledger/projection rebuild, negative-stock and transfer races, custody overlap, count reconciliation, reservations, calibration expiry/use block, maintenance/downtime, lost/damage, disposal/data-sanitization evidence, and finance references.

Service-desk tests cover safe dynamic-form schemas, request transitions, comments visibility, assignment, SLA calendars/pause/escalation, fee/document fulfilment saga, delivery/reopen, knowledge permissions, anonymous/pseudonymous disclosures, confidential-case existence/content isolation, COI, appeal, and retention.

Mobile tests cover every role, encrypted bounded caches, offline queues and truthful receipts, deep-link reauthorization, generic push, camera/file/QR/barcode/NFC permissions, GPS consent/scope, driver-safe mode, accessibility, revocation, and module disablement.

Required end-to-end journeys:

1. Library member finds/reserves/borrows/renews/returns a copy; overdue charge reconciles through Prompt 11; stock count preserves history.
2. Student applies for hostel, receives a concurrency-safe bed allocation, checks in, uses out-pass, changes room, reports maintenance, and checks out with deposit-refund reference.
3. Rider applies for transport, receives capacity-safe allocation, boards through idempotent scan, views uncertain ETA, experiences a substitution/delay, and completes trip safely.
4. Host preregisters a visitor; gate verifies minimal identity/watch service, issues opaque badge, checks out, and retention later removes identity per policy.
5. Store receives stock, issues/transfers/counts it; serialized asset changes custody, enters calibration/maintenance, and is safely returned/disposed.
6. Requester submits a paid/document service; agents meet/escalate SLA, fulfil through bounded contracts, deliver, and close/reopen with receipts.
7. Confidential grievance is invisible to ordinary agents/admins/search/counts/events and handled only by assigned authorized role.
8. Each module works alone while all other five are disabled, then disables safely with open obligations preserved.
9. Cross-tenant/person/module/role access fails at API and RLS layers.
10. Appropriate workflows work on web, Android, and iOS with accessibility checks.

Run repository-standard checks plus exact relevant commands for Java compile/test/static analysis, React typecheck/lint/unit/E2E/accessibility, Android/iOS tests, OpenAPI generation/diff, Flyway validation, RLS/security/canary leakage, provider-contract tests, dependency/container/IaC scans, and representative batch/concurrency tests. Report commands, exit codes, skipped checks, environment limitations, and evidence. Never claim a check passed if it was not run successfully.

Load tests cover catalogue/OPAC search and circulation bursts, hostel allocation/opening/check-in, trip-start GPS/boarding/notifications, visitor event check-in, inventory scanning/transfers, service intake/SLA jobs, provider replays, finance acknowledgements, and reports. Report scale, request/event/job mix, infrastructure, p50/p95/p99, throughput, conflicts/errors, DB connections/locks/partition/index behavior, queue lag, storage/cost, bottlenecks, and thresholds.

## 51. Seed/demo data

Add deterministic, synthetic, production-disabled, tenant-isolated fixtures for each module:

- library catalogue/copies/members/policies/loans/reservations/overdue/lost/stock/digital states
- hostel structures/policies/applications/waitlists/allocations/occupancy/out-pass/room changes/incidents/checkouts
- transport vehicles/compliance/personnel/routes/stops/trips/riders/GPS/boarding/delay/breakdown/maintenance
- visitor invitations/walk-ins/badges/overstay/restricted synthetic watch match/checkout/retention
- assets/items/stores/stock/custody/count/calibration/maintenance/disposal
- service catalogue/forms/requests/SLAs/fees/fulfilment/knowledge and isolated synthetic confidential case
- module entitlement combinations and provider/finance/document test doubles

Use no real people, visitors, identifiers, coordinates, vehicles, employers, credentials, watch-list subjects, grievances, payment data, copyrighted catalogue content beyond safe metadata, or live provider calls.

## 52. Documentation and completion gate

Update:

- independently tagged OpenAPI contracts and generated clients
- data dictionary, statuses, permissions, classifications, retention, device-event, finance-link, and entitlement catalogues
- six bounded-context ADRs plus cross-module integration/module-disablement ADR
- library circulation/fines/stock/OPAC guide
- hostel allocation/occupancy/out-pass/charges/emergency guide
- transport route/capacity/GPS/boarding/privacy/incident guide
- visitor identity/watch-list/badge/roll-call/retention guide
- asset stock-ledger/custody/calibration/maintenance/disposal guide
- service catalogue/forms/SLA/fulfilment/confidential-case guide
- user/operator/administrator/auditor guides for every role
- web/native-mobile role-feature matrix and accessibility guide
- threat/privacy/safety/data-flow models
- SLOs/load results/dashboards/alerts and all module/provider/finance/security/DR runbooks
- local/AWS/provider configuration without real secrets

Completion requires all of the following:

1. Each of the six modules completes its primary end-to-end journey and works when the other five are disabled.
2. Module entitlement disable/read-only/re-enable states preserve obligations/history and do not break platform consumers.
3. Library supports governed catalogue, copies, membership, circulation, reservations, fines, loss/damage, stock, OPAC, and digital references.
4. Hostel supports capacity-safe application/waitlist/allocation, check-in/occupancy/change, leave/out-pass, visitor/mess/incident/maintenance, and checkout/deposit references.
5. Transport supports compliant vehicles/personnel, routes/trips/capacity allocation, privacy-safe GPS, idempotent boarding, incidents/substitution, maintenance, and finance references.
6. Visitor management supports minimal preregistration/walk-in, human-reviewed restricted screening, opaque badges, check-in/out/overstay, emergency uncertainty, and retention.
7. Assets support exact append-only stock, custody, transfers/counts, reservations, calibration/warranty/maintenance/downtime, and approved disposal.
8. Service desk supports accessible versioned forms, requests, assignment/SLA/escalation, fees/documents/fulfilment, delivery/reopen, knowledge, and strictly isolated confidential cases.
9. Device/provider/payment states are truthful, idempotent, auditable, and never fabricated.
10. Every relevant role has meaningful React web and native Android/iOS workflows or explicit justified web-first/read-only/denied capabilities.
11. Every tenant table has forced RLS and negative tenant/person/module/role/case tests; security/privacy/safety/SoD/audit/retention controls pass.
12. Concurrency, provider outage/replay, module disablement, offline sync, accessibility, representative load, security, and canary leakage tests pass.
13. OpenAPI/generated clients, migrations, docs, ADRs, guides, dashboards, and runbooks pass every environment-available check.
14. No physical presence/safety, provider/device event, payment/refund, maintenance/calibration, emergency response, document, or external acknowledgement was fabricated.
15. Prompt 26 notification orchestration, communication preferences/providers, consolidated role portals, and mobile BFF consolidation were not implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, enablement, all six module capabilities, finance/documents/providers/device events, web, Android, iOS, security/privacy/safety/tenancy/RLS/SoD/audit/idempotency/retention, representative load and all exact test/scan commands/results/exit status, docs/ADRs/runbooks, limitations/unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(campus-ops): add six independently enabled services`

Stop. Do not begin Prompt 26 or implement consolidated communications, audience orchestration, role portals, or mobile BFFs.
```

---

## Review Checklist Before Prompt 26

- Library, hostel, transport, visitor, assets, and service desk remain six explicit bounded modules.
- Each module works alone and disables safely without corrupting obligations/history.
- Finance, documents, providers, devices, and notifications use truthful stable contracts.
- Location, room, roster, visitor, watch-list, grievance, borrowing, and asset-security data cannot leak.
- Physical presence, safety, payment, calibration, and emergency status are represented with evidence and uncertainty.
- All transaction/ledger/allocation races are deterministic and idempotent.
- Confidential service cases are invisible outside assigned need-to-know roles.
- Every relevant role has a suitable web/native-mobile workflow or intentional restriction.
- Every tenant table has forced RLS and negative isolation tests.
- No Prompt 26 consolidated communications/portal functionality was implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 26 until these conditions pass.
