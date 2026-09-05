# Claude Code Prompt 11

## Fees, Payments, Receipts, and Reconciliation

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompts 00–10 passed, were reviewed, and were committed  
**Scope:** Student financial subledger, fee configuration and demands, concessions/scholarships/sponsorships, online and counter payments, numbered receipts, refunds, settlements, reconciliation, holds, reminders, accounting exports, and role-specific web/mobile interfaces

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md`, especially admissions, student lifecycle, academic fees, examination fees, condonation, hostel, transport, library, training, commerce, payments, scholarships, sponsorships, government reimbursements, receipts, refunds, reconciliation, reporting, portals, and mobile requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, relevant ADRs, module boundaries, and repository conventions.
3. Inspect Prompt 04 application/admission-fee ports, Prompt 05 student/category/guardian/hold contracts, Prompt 06 registration/offering contracts, Prompt 08 condonation-fee port, Prompt 09 coursework references, Prompt 02 workflow/audit/document/outbox services, and Prompt 01 identity/tenant/RBAC foundations.
4. Inspect OpenAPI/generated clients, data dictionary, PostgreSQL RLS, permissions/SoD, notification service, object storage, secrets/KMS configuration, background jobs, observability, and `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Run Git status and the existing verification suite. Preserve valid work, do not overwrite unrelated changes, and repair only genuine regressions.

Do not re-scaffold, edit applied Flyway migrations, use destructive Git commands, implement a general ledger/ERP, payroll, procurement, bank-accounting system, final examination eligibility, or a production payment/bank integration with invented credentials. Never store raw card numbers, CVV, UPI PINs, banking passwords, or provider secrets in application data/logs.

Implement a bounded `student-finance` domain. It owns student/customer charges, credits, allocations, payment intents and provider observations, receipts, refunds, settlement reconciliation, finance-related holds, and accounting export references. It is an auditable operational subledger, not the institution's statutory general ledger.

## 1. Financial invariants

Document and enforce:

- every monetary amount uses exact decimal arithmetic with explicit ISO 4217 currency and configured scale/rounding; never binary floating point
- one financial account cannot mix currencies unless a formally designed multi-currency extension is added
- every posted subledger transaction balances debits and credits under the documented posting model
- posted entries are immutable; corrections use reversal and replacement postings, never update/delete
- every charge/demand has an immutable source, rule/configuration version, student/customer, academic context, effective date, due date, and posting reference
- provider callbacks and settlement files are observations, not authority to mutate balances without verified/idempotent processing
- payment success, receipt issuance, refund, waiver, write-off, and hold release occur only from authoritative server state
- receipt numbers, credit-note numbers, and refund references are unique within their configured legal/institutional series and never reused
- an allocation cannot exceed the available payment/credit or eligible open demand under policy
- cross-tenant/cross-student allocation and posting are impossible at application, database-constraint, and RLS levels
- all high-risk financial actions have reason, actor, scope, approval/SoD, correlation, and audit

Define debit/credit semantics, account types, posting templates, normal balances, suspense/unapplied funds, rounding treatment, and reconciliation invariants in an ADR and executable invariant tests.

## 2. Finance configuration and effective-dated policy

Implement immutable effective-dated configuration by tenant/institution/campus/legal entity/academic year/term/program/cohort/regulation/category/quota/residency where appropriate:

- base currency and allowed collection currencies; default to single currency unless multi-currency is explicitly configured
- fee heads, subheads, revenue/accounting codes, purpose, refundable flag, optional/mandatory status, tax treatment reference, and display order
- fee plans and applicability rules
- due schedules, installments, grace periods, late-payment rules, penalty caps, and holidays/business-day adjustments
- allocation priority and partial/excess payment policy
- concessions, waivers, scholarships, sponsorships, government reimbursements, deposits, advances, refunds, and write-off policies
- receipt/credit-note/refund number series and fiscal-year behavior
- online payment convenience-fee policy and whether it is borne by institution or payer
- refund windows, cancellation deductions, approval thresholds, and destination rules
- reminder/escalation schedules and finance-hold rules
- cashier limits, accepted tender types, shift/session rules, backdate limits, and cash variance thresholds
- settlement/reconciliation tolerance and aging rules
- retention, archival, export, and close/reopen policy

Use a validated declarative rule model, not executable expressions. Detect ambiguity/overlap before activation. Activated versions are immutable. Retroactive change requires a previewed adjustment/recalculation workflow preserving old and new results.

## 3. Fee heads and charge-source catalogue

Support charge origins for:

- admission/application/registration
- tuition and academic installments
- autonomous examination, supplementary, backlog, improvement, makeup, revaluation, photocopy, and certificate requests
- Prompt 08 attendance condonation
- laboratory, library, training, placement, transport, hostel, mess, events, fines/damages, deposits, and institution-defined commerce services

Each source integrates through a versioned request/confirmation/cancellation contract carrying stable source reference, payer/student, academic/service context, amount or governed fee-code input, due date, idempotency key, and authorization evidence.

The finance module validates and prices governed fee-code requests where configured. Source modules cannot directly post ledger rows or declare payment success. Do not implement the business workflow of future modules merely to generate their charges.

## 4. Fee plans and applicability

Implement:

- plan/version/name/status/effective dates
- fee-head line, amount, recurrence/installments, due dates, refundable/deposit behavior, accounting/tax references
- scope by program/branch, batch/cohort, academic year/term, regulation, admission category/quota, residency, scholarship category, campus, or other approved attribute
- explicit precedence and conflict resolution
- student-specific approved override referencing a workflow decision
- plan simulation against selected/synthetic students with exact applicability trace
- cohort/student impact preview before activation
- version comparison and future-effective activation
- immutable activation and retirement

Avoid copying mutable demographic/category data into rules. Pin the relevant source snapshot when a demand is generated.

## 5. Demand generation and lifecycle

Implement individual and bulk demand generation:

- select eligible population through authorized scoped criteria
- resolve plan/rule/source versions and show preview totals, exclusions, conflicts, and per-student lines
- draft batch, validate, submit, approve, schedule/post, partially paid, paid, overdue, cancelled, reversed, adjusted, and closed states
- maker-checker approval for bulk/high-value generation
- deterministic idempotency from source/version/student/period/fee-line
- immutable demand and line after posting
- due-date/penalty schedule and current outstanding projection
- reasoned cancellation/reversal only when allocation/refund consequences are handled
- incremental generation for late admission/category change with duplicate protection
- recalculation preview producing debit/credit adjustments rather than rewriting history
- notification after authoritative posting

Bulk jobs use durable asynchronous processing with checkpoints, progress, cancellation before posting, resumability, item-level results, and an invariant-preserving commit strategy.

## 6. Student financial subledger

Implement accounts and balanced journals sufficient for the operational student subledger:

- student/payer receivable
- fee income/control by fee head/accounting code
- cash/bank/payment-provider clearing
- unapplied/suspense funds
- scholarship/concession/sponsor/government receivable/control
- refundable deposit/liability
- refunds payable/clearing
- provider fee/tax/rounding control as configured
- write-off/waiver control

Support journal header, immutable lines, posting template/version, source reference, value/posting date, currency, exact amount, reversal relationship, and period/close state. Enforce balanced entries in the database/service transaction.

Maintain query-optimized balances as rebuildable projections, never the sole truth. Provide a deterministic replay/rebuild and compare tool. Do not allow direct manual journal entry except a narrowly governed finance-adjustment workflow with maker-checker approval, allowed accounts, reason, attachment, and limits.

## 7. Student/payer account and allocation

Implement:

- student account statement with opening, charges, credits, payments, allocations, refunds, reversals, penalties, and closing balance
- payer relationships (student, permitted guardian, sponsor, government agency, employer) using verified references and explicit authorization
- payment allocation to one or many demands by configurable priority or authorized payer choice
- partial payment, multiple payments, advance/unapplied funds, exact overpayment handling, and reallocation workflow
- allocation reversal and replacement with full lineage
- student migration/program change/withdrawal impact through adjustment contracts
- no arbitrary transfer between students; approved inter-account transfer requires explicit policy, verification, SoD, and balanced postings

Displayed balances include as-of timestamp, currency, pending-versus-posted distinction, and excluded disputed items.

## 8. Concessions, waivers, scholarships, sponsorships, and reimbursements

Implement separate governed workflows for:

- merit/need/institutional concession
- full/partial waiver
- scholarship award and renewal
- sponsor/employer commitment
- government reimbursement/scheme claim reference
- fee-head/period-specific benefit

Support application/nomination, eligibility evidence, requested amount/percentage, cap, effective period, budget/source reference, verification, reviewer chain, approval/rejection, expiry, renewal, revocation, and appeal. Sensitive evidence stays in Prompt 02 document services with purpose-based access.

Approved benefits post explicit credits/reclassifications; they never edit the original demand. Prevent duplicate/overlapping benefits according to effective-dated policy. Track sponsor/government receivable separately from cash received and do not mark a student payment settled merely because reimbursement is expected.

## 9. Penalties, interest, waivers, disputes, and write-offs

Implement:

- deterministic late-penalty calculation from immutable rule and balance history
- one-time/recurring/fixed/percentage/capped rule variants where configured
- preview, scheduled posting, idempotency, and reversal after due-date correction
- penalty waiver workflow separate from base-fee waiver
- disputed line/demand flag, reason, evidence, reviewer, temporary collection treatment, resolution, and resulting adjustments
- write-off only through restricted maker-checker workflow with thresholds, aging reason, accounting export reference, and audit

Never silently compound penalties or apply a changed current policy to historical periods.

## 10. Online payment intents and provider abstraction

Define a provider-neutral payment contract supporting configured methods such as UPI, card, net banking, wallet, bank transfer, mandate reference, and provider-hosted QR:

- create intent/order from current authorized payable items
- server-calculated amount/currency and signed metadata; never trust client totals
- provider reference, idempotency key, expiry, allowed methods, return/deep-link URLs, and minimal payer data
- initiated, pending, requires_action, authorized, captured/succeeded, failed, expired, cancelled, reversed, disputed, chargeback, partially_refunded, and refunded observations
- redirect/app-switch/SDK token boundary that keeps sensitive payment data with PCI-compliant provider
- webhook signature/certificate verification, timestamp/replay checks, provider-IP checks only as defense-in-depth, raw-body hash, deduplication, ordering tolerance, retry/dead-letter, and manual requery
- browser/mobile return is never proof of success; only verified provider/server state can post payment
- asynchronous posting, allocation, receipt issuance, notification, and hold release through idempotent workflows

Implement a deterministic fake provider only in local/test profiles. It must be visibly labeled, use synthetic data, support success/failure/pending/duplicate/out-of-order/reversal cases, and be impossible to enable in production through profile/build/runtime safeguards and automated tests.

## 11. Counter, cash, cheque, DD, POS, and bank-transfer collections

Implement authorized cashier workflows for:

- cash
- cheque/demand draft with instrument metadata and clearing status
- external POS/card terminal reference without storing card data
- bank transfer/NEFT/RTGS/IMPS/UPI reference
- authorized QR/payment-link initiation through configured provider

Support cashier session/shift open, opening float where used, collection, provisional handling for uncleared instruments, cancellation before posting, receipt issuance only under policy, shift close, tender totals, cash count, variance, supervisor review, and deposit/bank reference.

Enforce cashier limits, no backdating beyond policy, duplicate instrument/reference detection, maker-checker for overrides/voids, and device/location/campus scope. Cash collection does not become bank-settled until reconciliation policy confirms it.

## 12. Receipts, credit notes, and statements

Implement:

- atomic numbered receipt issuance after authoritative posted collection
- institution/legal-entity/campus/fiscal-year series as configured
- payer/student, collection method, allocated demand lines, taxes/fees where applicable, amount in figures/words, timestamps, operator/provider references, and verification token
- immutable receipt; correction uses void/reversal/credit document and replacement, never renumbering
- duplicate-copy marker and download audit
- accessible PDF and native share/download with classification
- opaque signed/lookup QR verification returning minimal status and no unnecessary student/amount detail
- consolidated account statement with as-of date and integrity metadata
- optional digitally signed document provider boundary; show unsigned/unavailable honestly

Never expose sequential receipt enumeration through public verification. Generated documents must be reproducible from immutable source versions.

## 13. Refunds and reversals

Implement:

- refund eligibility and amount preview from refundable credits/payment allocations/policy
- full/partial refund, cancellation deduction, provider fee treatment, deposit release, and excess-payment return
- student/payer request or authorized staff initiation
- destination restricted to original payment source when provider/policy requires; verified bank destination change uses a separate high-risk workflow
- supporting evidence, reviewer chain, approval thresholds, SoD, and step-up authentication
- provider refund intent and asynchronous webhook/status/requery
- initiated, approved, submitted, pending, succeeded, failed, reversed, rejected, and cancelled states
- balanced postings, allocation adjustment, refund document, notification, and reconciliation link
- chargeback/dispute workflow that does not double-refund

Never show refunded until the authoritative provider/bank/manual settlement state and ledger posting satisfy policy. Preserve failed attempts and provider references.

## 14. Provider settlement and bank reconciliation

Implement settlement ingestion through API/file adapters:

- provider settlement ID, batch, gross, fees, taxes, adjustments, refunds, chargebacks, net amount, currency, bank value date, and transaction details
- staged upload/ingestion, malware/type/schema validation, file hash, duplicate protection, parse errors, and source retention
- automatic matching by provider/payment/reference/amount/date with deterministic rules and confidence categories
- exact match, aggregated/split match, tolerance match, duplicate, missing platform payment, missing settlement, amount mismatch, fee mismatch, refund mismatch, and chargeback exceptions
- proposal/preview before manual match, split, merge, reclassify, or suspense disposition
- maker-checker for high-risk manual reconciliation
- settlement batch close/reopen with reason and immutable history
- bank-statement/reference import boundary; do not become a full bank accounting product
- clearing-to-bank/fee/tax balanced postings and accounting-export references

Every match has evidence, rule version, actor/system, timestamp, and reversible correction. Dashboard totals must reconcile from gross to net and to posted clearing balances.

## 15. Finance holds and downstream release

Implement configurable finance holds for:

- registration
- examination application/hall ticket
- result/certificate/transcript release
- hostel/transport/library or other governed service

Support threshold, eligible fee heads, grace, dispute exclusion, scholarship/sponsor treatment, effective period, warning versus blocking, manual exception, expiry, and review. Calculate holds from posted authoritative balances and policy versions.

Publish versioned hold placed/updated/released/exception events. Automatic release occurs only after ledger posting and, where required, authoritative settlement—not a client callback. Manual exception requires scope, reason, approver, expiry, audit, and cannot erase debt.

Prompt 12 owns final examination eligibility and consumes the finance evidence/hold contract; finance never issues a hall ticket.

## 16. Reminders, collections, and promises

Implement:

- upcoming due, due today, overdue, failed-payment, bounced-instrument, and approved-payment-plan notifications
- policy-based recipient: student and explicitly authorized guardian/payer/sponsor
- progressive cadence, quiet hours, channel preference, template/localization, deduplication, cooldown, acknowledgement, and delivery status
- minimal lock-screen/SMS/email content
- finance follow-up work queue, contact outcome, non-sensitive note, next action, and promise-to-pay date/amount
- promise fulfilled/broken evaluation based on posted transactions
- complaint/dispute route and contact suppression where policy/law requires

Do not use harassment, public disclosure, peer comparison, or unauthorized contacts. Guardian/payer access must derive from an active permitted relationship, not emergency-contact data.

## 17. Period close and controlled reopening

Implement operational finance-period controls:

- readiness for unposted payments, pending webhooks, unclosed cashier shifts, unreconciled settlements, suspense balances, failed exports, and invariant violations
- authorized close by institution/legal entity/campus/period
- immutable close snapshot and balances
- block backdated postings into a closed period
- controlled reopen with reason, approval, step-up authentication, impact analysis, reclose, and audit
- late-arriving provider events posted according to configured subsequent-period policy with original transaction timestamp retained

This is a student-subledger close, not statutory general-ledger close.

## 18. Accounting export boundary

Define configurable, versioned exports to the institution's accounting/ERP system:

- chart/account-code mapping by fee head, tender, tax, scholarship, refund, clearing, and legal entity
- summarized or detailed journal batches with source transaction references
- fiscal period, cost center/department/project references where configured
- debit/credit totals, currency, posting date, and control hash
- draft, validate, approve, generated, transmitted, accepted, rejected, corrected, and superseded states
- secure file/API adapter, encryption/signature, retry/idempotency, acknowledgement, and exception queue
- no direct mutation of external GL and no claim of acceptance without authoritative acknowledgement

Use a disabled/reference adapter until configured. Do not implement the external accounting ledger.

## 19. Reports, dashboards, and governed exports

Provide authorized reporting for:

- demand, collection, concession, scholarship, sponsor/government receivable, outstanding, overdue, refund, and write-off
- fee-head/program/cohort/campus/category summaries
- student account statement and aging
- daily cashier/tender/shift/variance
- payment success/failure/pending and provider health
- settlement gross/fees/tax/net and reconciliation exceptions
- suspense/unapplied/excess balances
- finance holds and manual exceptions
- subledger trial-balance/control totals and invariant status
- accounting-export status

Reports state as-of time, currency, posting versus settlement basis, filters, exclusions, and source watermark. Governed exports require scoped permission, purpose, approval where configured, classification/watermark, formula-injection protection, encryption, short expiry, download audit, and async generation for large files.

## 20. Backend APIs, permissions, and events

Add versioned OpenAPI endpoints for:

- finance policy/fee-head/plan draft/validate/simulate/review/activate/version compare
- demand preview/generate/approve/post/query/reverse/adjust
- student account/balance/statement/open items/allocation/reallocation
- concession/waiver/scholarship/sponsor/government cases and decisions
- penalty calculate/preview/post/waive/dispute/write-off
- payment-intent/create/status/cancel/requery and provider webhook
- cashier session/collection/instrument/close/variance/review
- receipt/duplicate-copy/verification/statement
- refund eligibility/request/review/approve/submit/status/requery
- settlement import/match/proposal/manual decision/close/reopen
- finance hold/evidence/exception/release
- reminders/follow-up/promise-to-pay
- period readiness/close/reopen
- accounting export/map/validate/approve/transmit/status
- dashboards/reports/governed exports/operational queues/invariant rebuild-check

Use explicit DTOs, bounded pagination, allowlisted filters/sorts, RFC 7807, optimistic versions, idempotency keys, correlation IDs, server-side totals, rate limits, audit, and generated clients.

Define least-privilege permissions for configuration, plan activation, demand maker/checker, account view, benefits review/approve, cashier collect/void/close, online-payment operations, receipt view/reprint, refund maker/checker, settlement import/match/approve, hold view/exception, collections follow-up, period close/reopen, accounting export, reports/exports, audit, and platform health.

Enforce SoD for plan activation, bulk demand, adjustments, benefit awards, cashier void/variance, refund, write-off, manual reconciliation, hold exception, period reopen, and accounting export according to thresholds. Platform operations see health, counts, provider codes, and trace IDs only—not student accounts, amounts, payer details, instruments, or receipts by default.

Use transactional outbox/inbox. Events include stable references and minimal metadata, never full bank details, provider secrets, receipts, student statements, or sensitive evidence. Consumers must be idempotent and tolerate retries/out-of-order delivery.

## 21. React web interfaces

Implement accessible responsive interfaces for:

- finance setup: fee heads, plans, applicability, installments, policies, series, accounts, and mappings
- plan simulation/version comparison/review/activation
- demand population preview, validation, approval, posting, and batch progress
- student/payer account, statement, open items, allocations, adjustments, and source trace
- concession/waiver/scholarship/sponsor/government workflows
- cashier shift, collection, instrument, receipt, close, variance, and supervisor review
- online-payment operations and safe provider-status/requery view
- refund/chargeback/dispute workflow
- settlement import, automatic-match results, exception queue, manual reconciliation, and close
- holds/exceptions, reminders/follow-up, period close/reopen
- accounting mapping/export and acknowledgement exceptions
- dashboards, reports, governed export, audit, and invariant/rebuild tools

Meet WCAG 2.2 AA intent. Use exact localized currency/date formatting while storing canonical values, keyboard operation, visible focus, screen-reader labels, non-color-only states, accessible tables, confirmation of irreversible postings, and no misleading pending-as-paid display.

## 22. React Native Android/iOS interfaces for every role

Build genuine native role interfaces backed by real APIs, not WebViews or placeholder menus.

### Student

- current dues, installment calendar, fee-head breakdown, concessions/credits, pending payments, balance, and finance holds
- select eligible demands and initiate provider-hosted payment/app switch
- authoritative payment status, receipt, statement, failed/pending recovery, and support/dispute initiation
- scholarship/concession/refund application and status with secure document upload
- reminders, acknowledgements, and deep links
- encrypted cached statement/receipts with as-of/staleness; payment/refund actions require live server confirmation

### Guardian/Authorized Payer

- only linked learner accounts explicitly permitted by policy and relationship
- dues/payment initiation/status/receipts/reminders for authorized scope
- payer identity and allocation clarity when several learners are linked
- no access through emergency-contact status alone

### Sponsor/Government/Employer Representative

- narrowly scoped commitment/invoice/reference, covered learners or aggregate authorized view, submitted evidence, claim/payment status, and receipt/acknowledgement
- no unrelated student ledger or academic detail

### Cashier

- assigned campus/counter shift open/close, student lookup with minimized identity, demand selection, tender capture, receipt delivery, and pending instrument status
- step-up for void/correction; offline collection disabled by default because duplicate/sequence/balance risk requires live authoritative posting
- complex variance/deposit reconciliation remains web-first

### Finance Accountant/Officer

- demand/payment/refund/settlement/suspense/hold work queues
- student account trace, reconciliation proposal, exception comment, and governed action within authority
- mobile review/action companion; bulk posting/import/export and invariant rebuild remain web-first

### Finance Manager/Controller/Approver

- approval queues for plans, bulk demands, benefits, adjustments, refunds, write-offs, reconciliation, close/reopen, and exports
- amount/source/rule/ledger impact/SoD summary
- step-up approve/reject/return with reason and authoritative receipt

### Scholarship/Student Welfare Staff

- assigned applications, eligibility/evidence status, benefit amount/cap/budget, review/comments, and recommendation
- limited financial detail and no payment-provider/bank access unless separately granted

### Admissions/Academic/Examination/Hostel/Transport/Library/Training Staff

- create or inspect only their module's authorized fee request/reference and finance confirmation/hold status
- cannot post payments, alter ledgers, reconcile, refund, or view unrelated fee heads

### Auditor/Internal Audit

- read-only, time-bound, purpose-scoped journals, source trace, receipts, approvals, reconciliation, close snapshots, and audit events
- governed export with watermark/expiry; no operational mutation

### Tenant Administrator/Leadership

- configuration visibility and authorized aggregate dashboards
- no implicit cashier, refund, reconciliation, bank-detail, or student-account permission

### Platform Operations

- provider/webhook/job/event/storage health, retry/dead-letter counts, masked tenant/provider references, and trace IDs
- no student ledger, payer, instrument, receipt, settlement-file, or bank details

Mobile-wide requirements:

- secure OS keystore, app lock/step-up for sensitive operations, certificate pinning strategy where appropriate, and rooted/jailbroken-device risk handling by policy
- encrypted tenant/user-partitioned allowlisted cache; purge on logout, relationship/role/membership loss, tenant switch, remote revocation, or retention expiry
- no raw card/bank secret storage; payment UI remains provider-hosted/approved SDK boundary
- push payloads contain no full balances, bank details, receipt content, or sensitive evidence
- deep links reauthenticate, reauthorize, validate state/nonce, and fetch current server status
- explicit initiated/pending/posted/settled/failed/reversed/refunded states
- payment return, approvals, collections, refunds, reconciliation, hold release, and receipt actions succeed only after authoritative server receipt
- accessible dynamic type, localization, currency/date/time clarity, low-connectivity recovery, idempotent retry, and screen-reader-friendly payment status
- update `docs/mobile/ROLE_FEATURE_MATRIX.md` for every role, including intentional web-first and no-access cases

## 23. Database and PostgreSQL RLS

Add forward-only Flyway migrations for normalized tables such as:

- finance policy/version/rule/currency/rounding/series
- fee head/account mapping/fee plan/version/scope/line/installment
- demand batch/demand/demand line/source snapshot/penalty schedule
- subledger account/journal/journal line/posting template/reversal/period/close snapshot
- payer relationship/student account/balance projection
- payment/allocation/reallocation/unapplied fund
- benefit application/eligibility/review/award/sponsor commitment/reimbursement reference
- dispute/write-off/adjustment workflow
- payment intent/provider event/webhook receipt/requery/dead letter
- cashier/counter/session/tender collection/instrument/cash count/variance/deposit reference
- receipt/receipt line/credit document/verification token
- refund/request/provider event/refund document/chargeback
- settlement batch/item/match proposal/match/exception/close
- finance hold/evidence/exception
- reminder/delivery/follow-up/promise
- accounting mapping/export batch/item/acknowledgement
- import/export/report job and projection checkpoint

Use repository-consistent names. Every tenant-owned table carries tenant/institution/legal-entity/campus and applicable student/payer/academic scope; foreign keys cannot cross tenants or currencies; repositories require explicit predicates; enable and force RLS where constitutionally required. Add balanced-journal enforcement, uniqueness for immutable sources/receipts/provider events/idempotency, check constraints, optimistic versions, exact numeric types, indexes, retention fields, and immutable-posting protections.

Test application, cashier, worker, reporting, migration, audit, and operations database roles independently. Technical roles never receive a general finance RLS bypass.

## 24. Security, compliance, privacy, and resilience

Threat-model:

- amount/currency/demand tampering
- fake payment returns, forged/replayed webhooks, duplicate callbacks, and provider account confusion
- concurrent double payment/refund/allocation
- receipt-number race or forgery
- cashier fraud, backdating, void abuse, cash variance, and duplicate instrument use
- refund destination takeover and chargeback double-credit
- scholarship/concession/write-off insider abuse
- settlement-file poisoning, reconciliation manipulation, and accounting-export tampering
- cross-tenant/cross-student leakage and insecure guardian relationship
- mobile cache/notification/deep-link leakage
- secrets, PAN/card/bank/UPI data entering logs or analytics

Keep PCI scope minimized through hosted pages/tokenized provider SDKs; document the actual PCI responsibility boundary without claiming certification. Apply encryption, Secrets Manager/KMS, credential rotation, signature verification, replay defense, step-up authentication, least privilege, SoD, rate limits, anomaly/velocity alerts, malware scanning, safe file parsing, field masking, purpose-based access, and immutable audit.

Define retention/legal hold, privacy/export, backup/restore, provider outage, webhook replay, ledger rebuild, invariant repair by compensating entries, settlement reprocessing, cashier disaster recovery, receipt continuity, secret rotation, RPO/RTO, SLIs/SLOs, alerting, and incident runbooks. Never invent a successful payment or discard an event because a dependency is unavailable.

## 25. Tests

Implement and run:

- exact-decimal/currency/rounding boundaries and prohibited cross-currency posting
- balanced posting templates, imbalance rejection, immutable journals, reversal/replacement, projection rebuild convergence, and concurrent posting
- fee-plan precedence, overlap rejection, simulation, immutable activation, demand preview/approval/idempotency/late admission/recalculation
- partial/multiple/excess payments, unapplied funds, allocation priority, reallocation/reversal, and cross-student denial
- concession/scholarship/sponsor/government cases, overlap/cap/budget/expiry/revocation and sponsor-receivable-not-cash behavior
- penalty calculation/history/cap/waiver/dispute/write-off/closed-period boundaries
- payment intent server totals, redirect not authoritative, signature/timestamp/replay verification, duplicate/out-of-order webhooks, retry/requery/dead-letter, concurrent payments, reversal/dispute/chargeback
- deterministic test provider profiles and proof it cannot activate in production
- cashier shift/limits/tenders/instruments/duplicate reference/void/close/count/variance/supervisor and no unsafe offline posting
- atomic receipt sequence under concurrency, duplicate copy, void/replacement, PDF/QR minimal verification, and enumeration resistance
- refund eligibility/deduction/destination/approval/provider failure/retry/reversal/chargeback double-credit prevention
- settlement import hash/schema/malware/idempotency; exact/split/aggregate/tolerance/mismatch matching; manual SoD; close/reopen; gross-to-net-to-clearing reconciliation
- holds from authoritative balances, dispute/benefit handling, manual exception expiry, and release only after configured payment/settlement condition
- reminder deduplication/privacy/guardian authorization/quiet hours and promise-to-pay evaluation
- period readiness/close/backdate denial/reopen/late provider event
- accounting export balance/control hash/idempotency/acknowledgement/rejection/correction and unavailable adapter
- import/export formula injection/path traversal/encryption/expiry/audit
- RLS negative tests across tenant, legal entity, campus, student, guardian/payer, sponsor, cashier, finance scope, source module, auditor, and technical roles
- web accessibility and Playwright journeys for student, guardian, sponsor, cashier, finance officer, approver, scholarship staff, source-module staff, auditor, admin, and operations
- Android/iOS role journeys, payment app-return/deep-link reauthorization, status refresh, encrypted cache/purge, step-up approval, low-connectivity retry, and server receipts
- outbox/inbox retries/reordering, worker crash recovery, provider/bank/storage/notification outage, backup restore, ledger rebuild, and target-volume performance

Run full backend, clean Flyway, RLS, OpenAPI/generated-client, web, Android, and environment-valid iOS suites. Include exact commands and exit statuses. Never claim provider, bank, POS, native-device, security certification, or iOS evidence that was not actually executed.

## 26. Documentation and completion gate

Update:

- OpenAPI and generated clients
- ERD/data dictionary
- financial glossary, subledger model, debit/credit/posting templates, invariants, and worked examples
- fee-plan/applicability/demand/penalty/allocation specification
- payment/provider/webhook/refund/chargeback contracts and state diagrams
- receipt/series/verification specification
- cashier/session/instrument/cash-control procedures
- settlement-file schemas, matching rules, exception catalogue, and reconciliation controls
- hold/evidence contracts for Prompt 12 and fee-request contracts for all source modules
- accounting export contract and mapping guide
- permissions/scope/SoD and mobile role-feature matrices
- payment threat model, PCI-scope statement, privacy/retention assessment
- runbooks for provider outage, webhook replay, stuck pending payment, duplicate payment, receipt failure, cashier variance, refund failure, chargeback, settlement mismatch, suspense aging, ledger invariant breach/rebuild, close/reopen, accounting rejection, secret rotation, and disaster recovery
- user guides for students, guardians/payers, sponsors, cashiers, finance officers/managers, scholarship staff, source-module staff, auditors, tenant administrators, and operations

The completion gate passes only when:

1. Fee plans and effective-dated rules can be simulated, approved, activated, and traced without ambiguity or historical mutation.
2. Individual/bulk demands are previewed, approved, posted idempotently, and adjusted only through balanced immutable transactions.
3. The student subledger always balances, rejects currency/scope corruption, preserves reversals, and rebuilds projections deterministically.
4. Partial, multiple, excess, sponsor, scholarship, concession, penalty, dispute, and allocation scenarios remain correct and auditable.
5. Online payments trust only verified authoritative provider state, tolerate duplicate/out-of-order events, and issue receipts exactly once.
6. The local/test provider is deterministic, clearly labeled, covers failure modes, and is impossible to enable in production.
7. Cashier collections, instruments, shifts, receipts, voids, variances, and deposits enforce limits and maker-checker controls.
8. Refunds, reversals, disputes, and chargebacks preserve approvals, provider truth, balanced postings, and reconciliation.
9. Settlement imports and automatic/manual matching reconcile gross, fees, taxes, refunds, net deposits, and clearing balances with explainable exceptions.
10. Finance holds and releases use versioned authoritative evidence; Prompt 12 retains ownership of examination eligibility and hall tickets.
11. Accounting exports are balanced, versioned, acknowledged, recoverable, and do not implement or falsely represent an external general ledger.
12. Every relevant role has a meaningful React web and native Android/iOS interface, with web-first sensitive bulk work and secure mobile review/action companions.
13. Mobile caches and payment flows are encrypted/scoped, deep links reauthorize, and all official actions require server receipts.
14. Every tenant table has explicit predicates, RLS, constraints, and cross-tenant/cross-role negative tests.
15. OpenAPI/events/generated clients, migrations, observability, accessibility, documentation, ADRs, runbooks, and all environment-available tests pass.
16. No raw card/CVV/UPI PIN/banking password, fake production integration, general ledger, payroll, procurement, final exam eligibility, or hall ticket was implemented.

Provide the standard completion report covering implementation summary, changed files, migrations, APIs/events/contracts, fee rules/subledger/payments/receipts/refunds/reconciliation/holds/accounting export, web, Android, iOS, security/PCI-scope/privacy/tenancy/RLS/SoD/audit/idempotency, tests with exact commands/results/exit status, docs/ADRs/runbooks, limitations and unavailable evidence, manual verification, and suggested commit message. End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(finance): implement fees payments receipts and reconciliation`

Stop. Do not begin Prompt 12 or implement examination eligibility or hall tickets.
```

---

## Review Checklist Before Prompt 12

- Activated fee rules are immutable, effective-dated, traceable, and simulation-tested.
- Demands and all corrections use idempotent balanced postings.
- Subledger balances rebuild deterministically from immutable journals.
- Payment redirects never count as success; verified server/provider state is authoritative.
- Receipts are atomic, uniquely numbered, immutable, minimally verifiable, and auditable.
- Refunds, chargebacks, settlements, reconciliation, holds, and accounting exports preserve complete lineage and SoD.
- The test provider cannot activate in production and no sensitive payment data is stored.
- Source modules request charges through contracts and cannot mutate finance tables.
- Every relevant role has a meaningful web/mobile workflow or intentional no-access state.
- Every tenant table has RLS and negative isolation tests.
- No general ledger or Prompt 12 examination workflow was prematurely implemented.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 12 until these conditions pass.
