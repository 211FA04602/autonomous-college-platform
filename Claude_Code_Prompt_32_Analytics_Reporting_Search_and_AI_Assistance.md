# Claude Code Prompt 32

## Analytics, Reporting, Search, and AI Assistance

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, OpenSearch production adapter with local/test alternative, AWS  
**Prerequisite:** Prompts 00–31 passed, were reviewed, and were committed  
**Scope:** Governed metric catalog, authorized role dashboards and drill-through, reporting/subscriptions/exports, de-identified research datasets, cross-module search, and limited grounded assistive AI with citations, human review, feature flags, privacy, cost controls, testing, and operations

---

## Prompt to Paste into Claude Code

```text
You are the principal analytics, search, data-governance, and responsible-AI engineer continuing the Engineering College and Autonomous Institution Operating Platform.

Build governed analytics and authorized search first. Only after their correctness, isolation, lineage, and operational controls pass may you add the limited assistive AI use cases in this prompt.

Before editing:

1. Read the complete `docs/product/PRD.md`, especially FR-ANL-001 through FR-ANL-010, FR-AI-001 through FR-AI-010, domain analytics/report requirements, role/persona matrix, privacy/consent/retention, NFRs, and launch-report discovery requirements.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, all IAM/RLS/audit/workflow/outbox/document/mobile/API compatibility ADRs, data classification/retention policy, threat models, Prompts 00–31 completion reports, and repository conventions.
3. Inspect the actual repository: modular-monolith boundaries, PostgreSQL schemas and forced RLS, domain events/outbox, operational read models, existing reports/dashboards/search code, OpenAPI/generated clients, web/mobile design system, background jobs, object storage, queues, observability, and tests.
4. Inventory every existing authoritative source for admissions, SIS, academics, attendance, LMS/assessments, examinations/results, OBE, programming lab, fees/finance, placement/training/projects, HR, library/hostel/transport/visitor/assets/services, communications, and platform operations. Do not infer definitions from UI labels.
5. Run Git status and all existing verification. Preserve valid work. Do not replace working domain logic, bypass services, query tenant data without context, or create an ungoverned parallel warehouse.
6. Confirm Prompts 00–31 passed, were reviewed, and were committed. If not, report exact prerequisite evidence and stop with `Completion gate: FAILED`.

Hard rules:

- PostgreSQL/domain services remain authoritative for transactions. Analytics/read models/search indexes/embeddings/AI outputs are derived and never write source truth directly.
- Apply tenant, institution, campus, role, purpose, assignment, field, record, consent, publication, and small-cell restrictions before returning analytics/search results and before content reaches any model.
- Never accept client filters as authorization, never rely on dashboard/navigation hiding, and never merge tenant data to produce group analytics.
- No arbitrary SQL, direct production-database access, unrestricted export, model-generated query execution, or user-supplied index filters.
- Confidential question papers, answer keys, hidden tests, unreleased marks/results, restricted grievances, malpractice, classified mentor/HR/disciplinary notes, secrets, credentials, and prohibited documents must never enter general analytics, search indexes, embeddings, prompts, caches, logs, or model training.
- AI is optional, labeled, assistive, grounded, cited, auditable, reversible, and human-reviewed for consequential use. It cannot autonomously alter marks, attendance, eligibility, admissions, fees, refunds, results, discipline, employment, appraisal, placements, interventions, or access.
- Do not train external models on tenant data by default. Do not fabricate model output when provider credentials are absent.
- Do not deploy AWS resources or incur cloud cost without valid credentials and explicit authorization. Do not begin Prompt 33.

## 1. Architecture and module boundaries

Implement bounded modules/interfaces for:

- metric catalog and semantic definitions
- analytical read models/materializations
- dashboard/query service
- report catalog and generation jobs
- subscriptions/delivery workflow
- governed export service
- research-dataset approval and generation
- search indexing/query abstraction
- AI gateway and use-case policies
- prompt/template registry and evaluation
- lineage, quality, audit, cost, and observability

Keep transactional modules authoritative. Consume domain events/outbox and stable read APIs. High-variance report/index/AI work may run in independent workers while preserving the modular-monolith source-of-truth boundaries.

## 2. Metric catalog

Create a governed metric catalog with stable key, name, description, business question, domain, owner/steward, audience, classification, numerator, denominator, formula/expression in an approved DSL or code reference, unit, dimensions, filters, exclusions, grain, time semantics, source fields, lineage, refresh policy, quality rules, suppression threshold, version, effective dates, status, and certification.

Metric definitions are versioned and immutable after use; corrections create a new version with reason and impact. Do not allow arbitrary SQL or code in institution configuration. Expose definitions, versions, freshness, quality, and caveats in UI and API.

## 3. Metric governance workflow

Implement draft -> review -> approved/certified -> deprecated/retired transitions with maker-checker separation, comments, evidence, effective dates, impact analysis, step-up for consequential changes, ETag/version, immutable audit, and receipt.

Only platform-provided or approved institution-scoped metrics may appear in dashboards/reports. A tenant override cannot weaken security, change another tenant, or retroactively rewrite historical reports without a versioned restatement.

## 4. Dimensional and time semantics

Standardize authorized dimensions: tenant/institution, campus, department, program, regulation, cohort/batch, semester/term, course/offering, category, gender where lawful, student/employee status, examination cycle, fee head, employer/drive, service/site, and time.

Define slowly changing reference behavior, effective dates, academic/fiscal/calendar period, event versus processing time, time zone, late-arriving data, restatement, null/unknown/not-applicable, and hierarchical rollup. Historical values must not silently shift when organizational structures change.

## 5. Analytical read models

Build purpose-specific read models/materialized projections for normal dashboards and reports. Do not run unbounded cross-domain joins against critical transaction paths.

Requirements:

- tenant/scope keys on every row and forced RLS where stored in PostgreSQL
- documented source event/API, checkpoint, schema version, watermark, idempotency, replay, correction, and deletion propagation
- deterministic rebuild from authoritative sources
- freshness/SLA and lag status
- reconciliation counts/totals/checksums against sources
- partition/index/retention plan
- no unauthorized denormalized sensitive field

Use asynchronous workers for high-cost refreshes. Prevent duplicate/out-of-order event corruption.

## 6. Data lineage and provenance

Provide field-level or metric-level lineage sufficient to trace dashboard/report value to metric version, read-model version, source module/tables/events, computation job, source watermark, quality results, and generated artifact.

Expose safe lineage to authorized administrators without leaking schemas or other tenants. Record code revision and job/run IDs. A report must be reproducible for its effective snapshot or explicitly state that live-source restatement applies.

## 7. Data quality framework

Implement rules for completeness, validity, uniqueness, referential integrity, reconciliation, freshness, range, distribution drift, and business invariants. Classify severity and block certification/publication when required.

Provide issue owner, status, first/last detected, affected metric/period/scope, safe sample references, remediation, waiver with expiry/approver, and retest. Never show a KPI as trustworthy without its quality/freshness state.

## 8. Privacy, suppression, and statistical disclosure

Apply data minimization, purpose limitation, consent/publication status, row/field authorization, small-cell suppression, complementary suppression where needed, rounding/bucketing, and de-identification before aggregation leaves the service.

Prevent differencing attacks through repeated filters, totals, facets, exports, and time comparisons. Configure thresholds only through governed policy. Protected-category analytics require documented lawful purpose and role entitlement.

## 9. Role dashboard framework

Build a reusable React web dashboard framework and mobile-appropriate React Native summaries using generated APIs:

- governed cards, charts, tables, trends, distributions, funnels, cohorts, and exception queues
- definition/version/source/as-of/quality/suppression indicators
- authorized filters and saved views
- accessible drill-through to source records
- loading/empty/error/stale/partial/disabled/revoked states
- CSV/PDF/export actions only when server advertises permission
- keyboard/screen-reader, non-color encoding, tabular alternative, responsive/mobile behavior, localization/RTL, print where appropriate

Client code formats and visualizes server-authoritative metrics; it does not recompute business formulas.

## 10. Management and group dashboards

Implement authorized Group Management/Chairman and institutional executive views for cross-campus academic delivery, admissions, attendance, examinations/results, OBE, fees, placement/outcomes, faculty/workload, quality/accreditation, and operations.

Group analytics requests query each permitted institution under explicit group authorization and aggregate derived authorized values without merging tenant databases or exposing institution records across tenants. Drill-through is limited to the selected institution and requires current membership.

## 11. Principal, dean, HOD, and coordinator dashboards

Provide role-scoped academic calendar/delivery, course coverage, attendance, assessment/exam readiness, results after permitted publication, progression/backlogs, OBE attainment, faculty allocation/workload, student risk/interventions, and compliance exception views.

Department/program roles cannot expand filters beyond assigned scope. KPI clicks open the authoritative workflow; dashboards cannot edit marks, attendance, curriculum, or source records.

## 12. Controller and examination dashboards

Provide exam-cycle applications/eligibility, question-governance status without confidential content, logistics/duties/custody readiness, attendance/incidents, script/evaluation/moderation completion, missing/invalid marks, distribution anomalies, result approval/publication, revaluation/supplementary, and turnaround metrics.

Protect evaluator identity, question content, answer keys, draft marks/results, malpractice/grievance detail, and small cohorts. Anomaly indicators route to human review and never change marks automatically.

## 13. Faculty and mentor dashboards

Faculty: assigned courses, timetable/attendance completion, teaching-plan/syllabus progress, content/assignment engagement, assessment distribution, outcome attainment, advisee/project tasks, workload, and action queues.

Mentor: assigned advisee attendance/performance/backlog/engagement/holds, explainable risk factors, interventions, appointments, follow-up, and outcomes. Exclude classified notes from aggregates/search and prevent cohort-wide sensitive export.

Risk indicators are advisory, source-linked, time-stamped, and cannot impose irreversible action.

## 14. Admissions dashboards

Provide funnel, source/campaign, counselor workload/conversion, program demand, application/document completion, selection/offer, seat-fill, onboarding, fee/payment status, aging, and SLA analytics.

Respect applicant assignment, consent, category sensitivity, minor data, and merit/publication policy. Revenue/seat counts reconcile to authoritative admissions/finance sources. No dashboard action alters merit or allocation.

## 15. Finance dashboards

Provide demand, collection, receivable/aging, dues, concession/waiver, refund, payment failure, unidentified payment, settlement/reconciliation, cashier/counter, and audit exception analytics.

Use exact currency arithmetic and source-ledger reconciliation. Provider-return events are not payments. Mask payer/bank/tax identifiers. Limit drill-through by ledger/campus/approval scope and segregate accounting/statutory exports.

## 16. HR dashboards

Provide headcount/status, recruitment funnel, onboarding/compliance, attendance/leave, workload, overload/under-allocation, qualifications, training, appraisal-task progress, document expiry, and staffing-gap analytics.

Apply strict compensation, health, identity, disciplinary, grievance, background-check, appraisal, and protected-category restrictions. Prevent individual ranking or automated employment decisions from assistive analytics.

## 17. Placement, training, internship, and project dashboards

Provide employer/drive pipeline, eligibility/registration, stage conversion, attendance, offers/acceptance/joining, package distributions, higher-study/entrepreneurship outcomes, training participation/readiness, internship progress, project milestones, rubrics, skill gaps, and outcomes.

Respect student consent, drive/employer scope, multiple-offer policy, restricted IP, and small-cohort suppression. Employer users receive only drive-scoped approved analytics, never institution-wide dashboards.

## 18. OBE, accreditation, and IQAC dashboards

Provide CO/PO/PSO attainment, direct/indirect measure coverage, target achievement, survey response quality, evidence completeness/freshness, criterion/metric readiness, observations/nonconformities, corrective actions, deadlines, and audit readiness.

Show attainment formula/version, mappings, evidence period, exclusions, validation, and publication state. Mobile/web dashboards cannot edit source marks, mapping, formulas, or framework configuration.

## 19. Operations dashboards

Provide library circulation/demand/overdue/inventory/utilization; hostel occupancy/out-pass/incident/service; transport trip/boarding/delay/deviation/safety/document expiry; visitor volume/overstay/emergency status; asset/work-order/stock/calibration/SLA; communications delivery/failure/cost/consent; and platform/integration health.

Minimize individual movement/location/visitor/resident data and apply purpose/time-window/retention restrictions. Live status must show freshness and unknown states honestly.

## 20. Dashboard configuration

Allow institutions to compose dashboards from an approved metric/visualization catalog:

- title/description, role audience, layout, permitted filters, default period, card/chart choice, thresholds from governed metric policy, and publication workflow
- preview with synthetic or authorized scoped data
- draft/review/publish/version/deprecate, ETag, audit, and rollback to prior configuration version

No arbitrary SQL, expressions, URLs, HTML/JavaScript, unrestricted joins, authorization filters, or access to uncertified metrics. Validate accessible visualization alternatives.

## 21. Report catalog

Create a governed catalog for statutory, regulatory, institutional, operational, and ad hoc-from-approved-template reports with stable key, description, owner, audience, legal/purpose basis, template/version, parameters, metric/source versions, output formats, classification, approval, retention, watermark, delivery, and schedule policy.

Seed launch-report placeholders only from PRD requirements and clearly mark design-partner samples/sign-off pending. Do not invent statutory formats or claim acceptance without signed samples.

## 22. Report generation jobs

Implement asynchronous generation for nontrivial reports:

- validate parameters and authorization at submission and download
- create immutable job ID/idempotency key
- queued/running/partial/failed/cancel-requested/cancelled/completed/expired states
- progress based on measurable stages, not fabricated percentages
- snapshot/watermark/metric/template/source versions
- resource/row/time limits and priority/fairness
- retries without duplicate artifacts
- encrypted artifact, checksum, malware check where applicable, short-lived grant, audit, and retention deletion

Never hold an HTTP request for an unbounded report or expose raw object keys/permanent signed URLs.

## 23. Scheduled reports and subscriptions

Support permitted schedules, recipients/audiences, channels, locale/time zone, parameters, conditional delivery, start/end, approval, pause/resume, and ownership transfer.

Reauthorize owner, recipients, report, filters, and fields at each run. Membership/role revocation must stop future delivery. Email/SMS/push contains safe notification and secure link rather than sensitive attachment unless policy explicitly permits encrypted attachment.

Provider acceptance is not delivery. Record outbox/provider/delivery status truthfully and prevent retry duplicates.

## 24. Governed exports

Route all exports through server policy and asynchronous jobs. Enforce purpose, role, field allowlist, row/scope limits, small-cell suppression, approval for sensitive/large exports, step-up, reason, watermark, checksum, classification, encryption, expiry, download count, receipt, and audit.

Test filter/facet/count/export consistency and prevent CSV formula injection, spreadsheet type confusion, delimiter/encoding attacks, PDF active content, and filename/header leakage. Reauthorize every download and revoke on role/consent/status change.

## 25. De-identified institutional research datasets

Implement request -> ethics/data-governance review -> approval -> generation -> controlled access -> expiry/destruction workflow for FR-ANL-010.

Require research purpose, variables, cohort/time period, lawful/consent basis, minimization, de-identification method, re-identification risk assessment, small-cell policy, linkage restriction, recipient, environment, retention, publication conditions, and audit.

Use pseudonymization/generalization/suppression as governed; never call direct identifiers removed data automatically anonymous. No production-table access or unrestricted row export. Test linkage and differencing risk.

## 26. Reporting reconciliation and sign-off

For each critical report, implement totals/counts/credits/results/receivables/balances reconciliation against authoritative signed/source reports. Record variance, tolerance, cause, resolution, reviewer, sign-off, and effective snapshot.

Launch-critical statutory reports cannot be certified without design-partner sample discovery and signed acceptance. Surface pending sign-off honestly in the catalog.

## 27. Search architecture abstraction

Create a centralized search interface with:

- OpenSearch production adapter
- deterministic PostgreSQL or in-memory/test adapter for local/CI use
- typed document/index contracts per domain
- query parser/normalizer, authorization scope builder, field projection, ranking/facets/highlights, and audit
- bulk/replay/rebuild/index-alias/version operations

Domain modules publish indexable projections/events; search never scrapes databases or stores an ungoverned full entity copy.

## 28. Search document classification and allowlists

Define per document type:

- permitted source states and publication status
- searchable/filterable/facetable/sortable/highlightable fields
- role/purpose/assignment/consent predicates
- sensitivity/classification and redaction
- index retention, deletion, and reindex triggers
- title/snippet safety

Use explicit allowlists. General search must exclude confidential question papers/answer keys/hidden tests, unreleased marks/results, restricted grievances/malpractice, mentor/HR/disciplinary notes, payment credentials, secrets, raw identity documents, and other prohibited content.

## 29. Authorization before search return

Compile server-trusted tenant/institution/campus/role/record/assignment/purpose scopes into mandatory index filters before query execution, then perform source authorization again on open.

Facets, counts, suggestions, spellcheck, autocomplete, highlights, timing, and error behavior must not leak unauthorized existence. Do not fetch broad results and filter in application memory. Never accept a client-supplied tenant or ACL as authority.

## 30. Cross-module search experience

Implement role-aware web and mobile search for authorized people/records, courses/content, published policies/documents, applications, tasks, exams/status, payments/receipts, employers/drives, projects, library catalog, services/assets, and evidence as appropriate.

Provide typed results, safe snippets, authorized filters, pagination, recent/saved searches without sensitive values, accessibility, localization, low bandwidth, empty/disabled/stale/index-lag states, and deep links that reauthorize.

Never mix a role’s separate contexts silently. Switching tenant/role/dependent/assignment purges search state.

## 31. Indexing pipeline and consistency

Implement outbox/event-driven indexing with idempotent document versioning, ordering, retry/dead-letter, backpressure, lag monitoring, poison-record quarantine, and replay.

Propagate create/update/status/publication/consent/permission/delete/retention events. Security-relevant revocation/deletion must be prioritized and source-open must still deny during lag. Record source version and indexed time.

## 32. Index lifecycle, rebuild, and migration

Use versioned index mappings/templates/analyzers, aliases, compatibility checks, shadow rebuild, validation/reconciliation, atomic alias switch, rollback, and old-index destruction after retention.

Provide tenant-safe full/partial replay, rate/resource limits, resumability, checksum/count comparisons, failure reporting, and runbooks. Never query two versions in a way that duplicates or leaks results.

## 33. Search relevance and multilingual support

Support institution-configured languages with Unicode normalization, transliteration strategy where approved, synonyms from governed dictionaries, exact identifiers, names, abbreviations, phrase/prefix/typo behavior, and language analyzers.

Build synthetic judged query sets per role/domain and measure precision-oriented top results, zero-result rate, latency, and forbidden-result rate. Security filtering always outranks relevance. Do not learn ranking from sensitive click behavior without approved privacy policy.

## 34. Search security and abuse controls

Protect against query-string injection, regex/wildcard abuse, deep pagination, expensive aggregations, fuzzing, enumeration, scraping, highlighting attacks, stored HTML/script, Unicode confusables, and denial of service.

Apply bounded query length/complexity, timeouts, pagination limits, rate limits, safe escaping, result caps, generic denial/not-found behavior, audit, and anomaly alerts. Sanitize all highlights/snippets before rendering.

## 35. AI gateway abstraction

Create one centralized gateway behind interfaces, never direct provider calls from domain/UI code. Support:

- provider/model/deployment configuration by allowed environment/region/use case
- model capability and data-processing classification
- prompt/template version and parameter schema
- structured input/output validation
- timeout, retry, circuit breaker, concurrency/rate/token/cost budgets
- request correlation, audit, source references, latency, usage, and outcome category
- provider-specific safety/moderation adapter
- deterministic test adapter
- feature flags and institution/role/module/use-case/data-category policy

No provider credential belongs in clients or source control. Production unavailable/disabled state must be explicit; never substitute fake AI output.

## 36. AI use-case policy registry

For every use case define owner, purpose, eligible roles, allowed data classes/sources, prohibited data, provider/model allowlist, geographic/retention/training constraints, prompt version, retrieval policy, output schema, citations, human-review requirement, actions prohibited, cost limits, evaluation suite, fallback, and disable switch.

Changes require governed review, audit, effective dates, and rollback. The institution can disable AI globally or by role/module/use case/data category without breaking core non-AI workflows.

## 37. Authorized retrieval and grounding

Implement retrieval through the search/document authorization layer:

1. authenticate user and explicit context/purpose;
2. authorize requested use case;
3. build source allowlist and server-trusted scope;
4. retrieve only permitted chunks/records before model access;
5. apply classification/redaction/blocking policy;
6. attach stable source/version/page/section references;
7. invoke the allowed model;
8. validate output/citations;
9. record audit and safe usage metadata;
10. require human review for consequential use.

Do not retrieve broadly then ask the model to ignore unauthorized data. Embedding/vector stores must preserve tenant, record, ACL, version, deletion, and retention metadata and must be tested for isolation.

## 38. Policy and document Q&A with citations

Implement Q&A only over authorized approved/published policies, handbooks, regulations, procedures, and documents. Answer with cited source title, version/effective date, page/section/chunk, and safe link.

If sources conflict, are expired, lack support, or retrieval confidence is insufficient, say so and route to authoritative office/document. Never invent policy. Exclude confidential drafts and restricted records. Conversation history is scoped, minimized, expiring, and not used for external training by default.

## 39. Faculty draft-content assistance

Support authorized faculty drafts for questions, rubrics, learning outcomes, lesson plans, summaries, and alternate versions from permitted content.

For question-quality checks, flag possible duplication, ambiguity, incomplete options, answer conflicts, Bloom alignment, difficulty consistency, accessibility, and bias as suggestions with evidence/source references where available.

Never access secure question papers, hidden tests, unrelated course banks, answer keys outside assignment, copyrighted content without rights, or publish directly. Faculty must review/edit/approve through existing question governance; AI output remains a draft with prompt/model/source/audit provenance.

## 40. Performance-summary drafts

Generate plain-language student/course/cohort summaries only from approved server-computed metrics and explainable factors. Cite metric names, versions, periods, freshness, and source screens.

Apply role, student/guardian consent, publication, small-cell, and sensitive-category controls. Do not diagnose, label ability, infer protected traits, rank unfairly, or create irreversible decisions. The authorized staff member reviews/edits before communication or record attachment.

## 41. Explainable risk and intervention suggestions

Where enabled, present existing explainable risk factors such as attendance, assessment trends, backlogs, engagement, and permitted holds, with time period, thresholds/model version, data quality, and limitations.

AI may draft possible interventions, practice, training, or mentoring actions for staff approval. It cannot automatically detain, block, discipline, change marks, notify guardians, create sensitive notes, or modify source records. Provide contest/correction and bias/performance monitoring.

## 42. Service-desk assistance

Assist authorized agents with ticket classification, priority/SLA-risk suggestion, routing, duplicate candidate, knowledge retrieval with citations, and response draft.

Server workflow remains authoritative. AI cannot close, reassign consequentially, promise resolution, expose another ticket, or send externally without human confirmation. Redact credentials, secrets, identity documents, health/disciplinary details, and prohibited attachments before model access.

## 43. Anomaly assistance

Use deterministic statistical/rule methods first for anomalous marks, attendance, payments, results, report totals, search/index lag, and operational distributions. AI may summarize already detected anomalies and draft investigation questions.

An anomaly is not fraud, malpractice, error, or guilt. It cannot change records, withhold results, penalize staff/students, or trigger external communication automatically. Show method/version, baseline, contributing values, false-positive caveat, and human-review workflow.

## 44. Prompt-injection and untrusted-content defense

Treat retrieved documents, user text, HTML, files, links, OCR, and model output as untrusted data, never instructions. Implement:

- system/use-case policy separation
- source authorization and classification before retrieval
- content delimiters and prompt construction APIs
- tool allowlists with no arbitrary URL/SQL/shell/code execution
- output schema validation and safe rendering
- citation verification against retrieved sources
- secret/PII exfiltration detection and blocked-data tests
- indirect injection corpus and adversarial regression

AI cannot expand its scope, disable policy, access hidden prompts/secrets, or invoke consequential commands.

## 45. AI audit, review, and provenance

Record governed metadata: tenant/context, user/role, use case, prompt/template version, provider/model/version, source references/versions, redaction policy, safe input/output hashes or classified retained content per policy, token/cost/latency, safety outcome, reviewer, edits, acceptance/rejection, resulting authorized workflow reference, and timestamps.

Do not put sensitive prompts/outputs in general logs. Provide role-limited audit and retention/deletion. A human approval must refer to the exact output version; regeneration invalidates prior approval.

## 46. AI privacy, provider, and cost controls

Enforce provider contracts/configuration for no external training by default, retention policy, region, encryption, tenant data use, subprocessor, and deletion. Block a use case when provider policy cannot satisfy data classification.

Apply per-institution/use-case/user budgets, token/input/output caps, concurrency/rate limits, caching only for safe identical nonpersonal content, timeouts, circuit breakers, usage dashboards, and alerts. Cost exhaustion produces an honest unavailable/fallback-to-non-AI state, never bypass.

## 47. AI evaluation and release gates

Build versioned synthetic/gold evaluation sets for groundedness, citation correctness, authorization, refusal, completeness, relevance, structured-output validity, harmful/bias patterns, prompt injection, leakage, latency, availability, and cost.

Define thresholds per use case and compare provider/model/prompt changes before enablement. Include human rubric review for subjective quality. Do not use real student/employee/applicant data in CI. A model upgrade is a governed release with canary/rollback/disable and cannot auto-promote from vendor claims.

## 48. APIs, UI, mobile, accessibility, and operations

Expose versioned OpenAPI and generated clients for metric definitions, dashboard queries, reports/jobs/subscriptions/exports, search, AI use cases, Q&A, drafts, reviews, usage, and admin controls.

Web provides full authorized dashboards/reports/configuration; native mobile provides role-appropriate summaries, search, report-job status/download where permitted, cited Q&A, draft review, and disable/unavailable states. Do not duplicate formulas or create WebViews.

All visualizations require accessible names, table/text alternatives, keyboard/focus, non-color encoding, contrast, screen-reader summaries, large text, responsive layouts, localization/RTL, regional dates/numbers/currency, and low-bandwidth behavior.

Instrument privacy-safe metric query latency/cache/freshness/quality, report queue/duration/failure/size, export/download/expiry, index lag/replay/query latency/zero/forbidden results, AI latency/tokens/cost/timeout/refusal/citation/review/disable, and worker health. Add alerts/runbooks for stale/wrong metrics, reconciliation variance, export exposure, index leakage/lag, deletion failure, provider outage/cost spike, prompt injection, citation failure, model regression, and emergency AI disable.

## 49. Tests and documentation

Add unit, component, contract, integration, RLS/security, accessibility, performance, and E2E tests covering:

- metric formula/version/effective date, dimension/time semantics, late data, quality, lineage, reconciliation, small-cell/differencing, and cross-role/tenant denial
- dashboard filters/facets/drill-through, source authorization, stale/partial, institution composition restrictions, and mobile summaries
- report parameter authorization, snapshot reproducibility, cancellation/retry/idempotency, subscription reauthorization, delivery truth, artifact expiry, CSV/PDF attacks, and export leakage
- research workflow, de-identification/linkage risk, approval/expiry/destruction
- search tenant/role/record filtering before query, restricted-content exclusion, facets/suggestions/timing, update/delete/revocation lag, replay/rebuild/alias rollback, relevance, multilingual, enumeration, and abuse limits
- AI global/tenant/role/module/use-case/data-category disable, no-credential unavailable state, deterministic test adapter, source authorization before model, embeddings isolation/deletion, citations, conflicts/insufficient evidence, human review, consequential-action denial, audit/provenance, cost/timeout/provider failure
- direct/indirect prompt injection, source poisoning, data exfiltration, arbitrary tool/URL/SQL/shell denial, output sanitization, and model/prompt regression

Use synthetic fixtures only. Never send real tenant/student/applicant/employee/payment/exam/grievance/HR/mentor/document data to tests or external models.

Update:

- OpenAPI/generated clients and API compatibility evidence
- metric catalog/data dictionary/dimension/time/quality/lineage documentation
- dashboard/visualization/report/subscription/export/research guides
- search architecture/index contracts/authorization/rebuild/relevance/runbooks ADRs
- AI governance, provider/data policy, use-case registry, prompt registry, model cards/evaluation reports, threat model, human-review guide, disable/incident/cost runbooks
- role-feature matrix for web/mobile analytics/search/AI
- SLOs, performance measurements, dashboards, alerts, data retention and operational ownership

## 50. Completion gate

Completion requires all of the following:

1. A versioned certified metric catalog, lineage, quality, freshness, suppression, and reconciliation framework exists and is used by dashboards/reports.
2. Required management, academic, examination, faculty/mentor, admissions, finance, HR, placement, quality, and operations dashboards return correct authorized metrics with safe drill-through.
3. Institution-defined dashboards use approved metrics/visualizations only, never arbitrary SQL or authorization overrides.
4. Scheduled/asynchronous reports, subscriptions, governed exports, watermarking, retention, download authorization, delivery truth, and audit work without leakage or fabricated progress.
5. De-identified research datasets require governed approval, risk assessment, minimization, controlled access, expiry, and destruction.
6. Search uses the abstraction with OpenSearch production and deterministic local/test adapters; authorization filters run before return, source-open reauthorizes, and counts/facets/suggestions do not leak.
7. Search update/delete/consent/revocation propagation, replay/rebuild/index versioning, restricted-content exclusion, multilingual relevance, abuse controls, and monitoring pass.
8. The AI gateway, policy registry, prompt/model versions, feature flags, provider/privacy controls, budgets, audit, deterministic test adapter, and honest unavailable state are complete.
9. Policy Q&A, faculty draft checks, performance-summary drafts, explainable intervention suggestions, service-desk assistance, and anomaly summaries are grounded, cited, role-scoped, labeled, optional, and human-reviewed where consequential.
10. No unauthorized content reaches search, embeddings, prompts, model provider, outputs, caches, logs, exports, or analytics; external training on tenant data is disabled by default.
11. AI cannot execute arbitrary tools or make irreversible academic, admission, examination, finance, disciplinary, HR, placement, communication, or access decisions.
12. Prompt-injection, source authorization, citation, leakage, disable, model regression, timeout/failure, and cost-control tests pass.
13. Forced RLS/negative isolation tests cover analytical read models and every new endpoint; group analytics never merge tenant data.
14. Web and native Android/iOS experiences are accessible, localized/RTL-ready, low-bandwidth aware, generated-client based, and do not recompute rules.
15. Performance/SLO, privacy-safe observability, alerts, runbooks, OpenAPI, metric/search/AI documentation, model/evaluation evidence, and role matrices are complete.
16. No metric, report, delivery, search, provider, citation, model, review, audit, or completion outcome is fabricated.
17. Prompt 33 AWS Infrastructure, CI/CD, Observability, Security, and DR was not implemented or marked complete.

Provide the standard completion report covering implementation summary, changed files, schemas/migrations/read models, metric catalog/quality/lineage/reconciliation, dashboards by role, reports/subscriptions/exports/research, search architecture/index/rebuild/relevance/isolation, AI gateway/use cases/provider/privacy/cost/evaluation/human review, web/mobile UX, security/RLS/threat testing, accessibility/localization/performance, exact commands/results/exit status, OpenAPI/generated clients, docs/runbooks/alerts, limitations/unavailable OpenSearch/model/provider credentials, manual verification, and suggested commit message.

End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`feat(analytics): add governed reporting search and assistive AI`

Stop. Do not begin Prompt 33, deploy AWS resources, enable an external model for real tenant data, or claim statutory/design-partner report acceptance without evidence.
```

---

## Review Checklist Before Prompt 33

- Metrics are versioned, owned, sourced, reconciled, quality-rated, freshness-labeled, privacy-suppressed, and reproducible.
- Every dashboard/filter/drill-down preserves backend row/field/record authorization.
- Reports, schedules, subscriptions, exports, downloads, and delivery are reauthorized, audited, expiring, and truthful.
- Research datasets have approval, de-identification risk review, controlled access, and destruction.
- Search filters authorization before return and excludes all restricted content from indexes and snippets.
- Search deletion/revocation, rebuild, aliases, relevance, multilingual behavior, and abuse protection are tested.
- AI retrieval authorizes and redacts before model access; citations point to exact permitted versions.
- AI remains optional, assistive, labeled, feature-flagged, cost-controlled, and human-reviewed for consequential use.
- Prompt injection, leakage, insufficient evidence, provider failure, model change, and global/tenant/use-case disable paths pass.
- External models do not train on tenant data by default; unavailable credentials produce a real unavailable state.
- No arbitrary SQL, model tool execution, autonomous consequential decision, or silent source-record mutation exists.
- Forced RLS, tenant isolation, accessibility, localization, mobile/web, SLO, audit, and operational evidence are complete.
- No Prompt 33 infrastructure/deployment work was implemented or falsely marked complete.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 33 until these conditions pass.
