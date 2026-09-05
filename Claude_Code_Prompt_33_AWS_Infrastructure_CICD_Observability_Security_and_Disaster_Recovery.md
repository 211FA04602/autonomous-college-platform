# Claude Code Prompt 33

## AWS Infrastructure, CI/CD, Observability, Security, and Disaster Recovery

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Application Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, OpenSearch where justified  
**AWS/IaC Stack:** Terraform, Route 53, ACM, CloudFront, WAF, VPC, ALB, ECS Fargate, Aurora PostgreSQL, S3, KMS, SQS/EventBridge, ECR, CloudWatch/OpenTelemetry, Secrets Manager/Parameter Store, GitHub Actions with AWS OIDC  
**Prerequisite:** Prompts 00–32 passed, were reviewed, and were committed  
**Scope:** Reviewable production-grade AWS infrastructure-as-code, secure CI/CD, observability/SLOs, security controls, cost governance, backup/restore, disaster recovery, and operational runbooks—without unauthorized cloud deployment or spend

---

## Prompt to Paste into Claude Code

```text
You are the principal AWS platform, DevSecOps, SRE, and disaster-recovery engineer continuing the Engineering College and Autonomous Institution Operating Platform.

The expected outcome is validated infrastructure-as-code, pipelines, policies, diagrams, tests, and runbooks. This prompt is not authorization to create, modify, or delete AWS resources, incur cloud cost, deploy production, publish mobile apps, change DNS, or access real tenant data.

Before editing:

1. Read the entire `docs/product/PRD.md`, especially NFR-SEC-001–008, NFR-AVL-001–005, NFR-PER-001–006, NFR-OPS-001–005, capacity/tenant targets, data classifications, retention, mobile, examinations, payments, coding sandboxes, analytics/search/AI, and launch prerequisites.
2. Read `docs/engineering/CONSTITUTION.md`, `CLAUDE.md`, every ADR/threat model/runbook/API compatibility policy, Prompts 00–32 completion reports, and current architecture/deployment documentation.
3. Inspect the actual repository: backend/web/mobile builds, Dockerfiles, workers, PostgreSQL/Flyway, Redis usage, object-storage abstractions, SQS/EventBridge/outbox, OpenSearch, external providers, authentication/OIDC, telemetry, health endpoints, feature flags, migrations, CI workflows, test suites, SBOM/provenance, and local Docker environment.
4. Inventory actual runtime components, ports, protocols, dependencies, secrets, data classes, persistence, scaling signals, startup/shutdown behavior, health checks, migration order, and recovery dependencies. Do not design from assumptions when code supplies evidence.
5. Run Git status and existing validation. Preserve valid work and user changes. Do not replace the modular-monolith architecture with premature microservices or introduce EKS unless a measured requirement and approved ADR justify it.
6. Confirm Prompts 00–32 passed, were reviewed, and were committed. If not, report exact prerequisite failure and stop with `Completion gate: FAILED`.

Authorization boundary:

- Do not run `terraform apply`, CloudFormation/CDK deployment, AWS CLI mutations, DNS/certificate changes, secret writes, database operations, image pushes, store uploads, or any command that creates cost or modifies an account unless valid credentials and explicit deployment authorization are separately provided.
- Terraform validation/format/lint/security scanning and offline plans using safe example/mock inputs are permitted. If a provider-backed plan would refresh or access AWS, do not run it without authorization.
- Never invent successful AWS plans, deployments, backups, restores, failovers, scans, load tests, or DR exercises. Mark unavailable evidence blocked.
- Never commit credentials, state, plan files containing secrets, private keys, signing assets, provider tokens, account IDs that should remain private, or tenant data.
- Do not begin Prompt 34 production readiness/pilot/launch work.

## 1. Architecture principles

Implement infrastructure consistent with:

- modular monolith for core transactions with strict module boundaries
- independently scalable workers/services for online assessments, code execution, documents, notifications, analytics/large reports, search indexing, and AI gateway where current code supports them
- managed services and multi-AZ resilience appropriate to 99.9% core-service target
- immutable/reproducible artifacts and infrastructure-as-code
- least privilege, defense in depth, no public application/data services
- tenant isolation in application/data layers; infrastructure complements but does not replace forced RLS
- separate dev, staging, and production accounts preferred; document a safe fallback when the organization initially uses fewer accounts
- cost-aware defaults with documented scaling and stronger optional tiers
- one product codebase; no customer-specific branches

## 2. Architecture decision records

Create/update ADRs for:

- ECS Fargate versus EKS decision
- Aurora PostgreSQL engine/version/topology
- Cognito versus external OIDC federation
- Redis necessity/use cases
- SQS/EventBridge topology and ordering choices
- OpenSearch deployment/tenant/index strategy
- S3 classification/bucket/key strategy
- KMS key boundaries
- public web delivery and CloudFront/WAF
- CI/CD deployment strategy
- observability stack and trace sampling
- backup/restore and regional DR tier
- dedicated-tenant and stronger-RPO/RTO extension path

Each ADR contains context, evidence, alternatives, decision, security/cost/operational consequences, reversibility, and review trigger. Do not declare optional services required without code/scale evidence.

## 3. Terraform repository structure

Create a clear Terraform layout with:

- reusable modules for network, edge, compute, database, cache, storage, messaging, search, identity integration, security, observability, backup, budgets, and CI federation
- environment compositions for dev, staging, and production
- account/region/provider/version constraints
- typed variables with validation and safe defaults
- outputs minimized and marked sensitive where necessary
- examples/test fixtures that use non-secret placeholder values
- documentation generated or maintained per module
- formatting, lint, validate, test, security-scan, and plan scripts

Avoid copying full resource graphs per environment. Do not place tenant-specific application configuration in infrastructure code when runtime configuration is appropriate.

## 4. Remote state and locking

Design bootstrap-separated remote state with S3 encryption/versioning, DynamoDB locking where the chosen Terraform/AWS pattern requires it, least-privilege access, public-access block, logging/audit, backup/recovery, and protected state prefixes/workspaces.

Separate production from nonproduction state and credentials. Restrict read because state can contain sensitive metadata. Do not create bootstrap resources or migrate state in this prompt. Provide exact authorized setup/migration/rollback procedures.

## 5. Accounts, organizational boundaries, and environments

Document preferred AWS Organizations account separation for management/log archive/security/tooling/shared services/dev/staging/production, or a minimum viable account design with strong boundaries.

Define SCP/control direction, delegated security services, IAM Identity Center/federation, break-glass governance, environment promotion, cross-account artifact access, centralized logs, and billing ownership. Never hard-code organization/account identifiers in reusable modules.

## 6. Tagging and resource inventory

Enforce tags through locals/policy checks for product, service/module, environment, owner role, managed-by, repository, cost center, data class, criticality, tenant model, backup tier, retention class, and expiration for ephemeral resources.

Do not put tenant names, student data, or secrets in tags. Produce resource inventory outputs safe for operations and cost analysis.

## 7. Region and Availability Zone strategy

Parameterize primary region and use at least two Availability Zones for core production networking/compute/data. Document service availability, latency to Indian institutions, data residency/legal review, price, disaster correlation, and external-provider dependencies.

Select no real region on legal/commercial assumptions alone; provide a recommended configurable default and decision checklist. Regional DR is an explicit tier/ADR, not implied by multi-AZ.

## 8. VPC and subnet design

Implement a multi-AZ VPC with:

- public subnets only for required managed ingress/egress components such as ALB/NAT as selected
- private application subnets for ECS tasks/workers
- isolated data subnets for Aurora/Redis/OpenSearch where applicable
- route tables, NACL posture, security groups, DNS settings, IP planning, future expansion, and flow logs
- no public IP for application/data tasks
- separate control of ingress, egress, and service-to-service flows

Avoid overly broad CIDRs/security-group references. Document NAT gateway cost/resilience tradeoffs and dev-cost alternatives that do not weaken production.

## 9. VPC endpoints and egress controls

Add justified gateway/interface endpoints for S3, ECR API/DKR, CloudWatch logs/monitoring, Secrets Manager, KMS, SQS, SNS, STS, and other used services to reduce NAT exposure/cost.

Define controlled outbound access for package/model/payment/messaging/provider endpoints, DNS logging, firewall/proxy direction if required, and default-deny progression. Do not break certificate revocation/provider connectivity silently. Document endpoint/private-DNS failure modes.

## 10. Route 53, ACM, and DNS boundaries

Model hosted-zone/domain inputs without assuming ownership. Define public/private DNS, certificate issuance/validation, wildcard versus specific-name policy, renewal monitoring, DNSSEC direction, health records, TTLs, split-horizon needs, and change approval.

Do not create records, validate certificates, transfer domains, or reference a real customer domain without authorization. Provide examples and cutover/rollback checklist.

## 11. CloudFront and web delivery

For the React web application, define private S3 origin with Origin Access Control, CloudFront TLS/security headers/compression/cache policies, SPA routing, immutable hashed assets, no-cache entry/config documents, deployment invalidation/versioning, access logs, and custom error handling.

Do not expose the frontend bucket publicly. Separate public assets from private tenant documents. Prevent caching personalized API data at the edge unless a reviewed design proves correct authorization/cache keys.

## 12. AWS WAF and edge protection

Define WAF associations/rules for managed common threats, known bad inputs, reputation/bot/rate controls, request-size boundaries, path/method policies, and logging with redaction.

Start managed rules in count mode where false-positive risk requires tuning, with evidence-based promotion and emergency rollback. Never use WAF as the primary application authorization. Protect APIs and web distribution appropriately without blocking legitimate exam/load bursts.

## 13. Application Load Balancer

Configure HTTPS listeners, modern TLS policy, HTTP redirect, target groups, health checks, deregistration delay, idle timeout, access logging, deletion protection for production, cross-zone behavior, and security groups.

Route only required API/health paths. Health endpoints must distinguish liveness/readiness without exposing dependency secrets or sensitive details. Do not make management/actuator endpoints public.

## 14. ECS Fargate cluster and services

Define ECS clusters/services/task definitions for core API and actual independent workers. Include:

- immutable ECR digest references
- CPU/memory/ephemeral storage, ARM64/x86 decision, read-only root filesystem where compatible
- non-root user, dropped capabilities, no privileged mode
- secrets injection by reference, no secret environment outputs
- CloudWatch/OTel logging, health checks, graceful shutdown, stop timeout
- private networking/security groups/service discovery where needed
- deployment circuit breaker/rollback, min/max healthy percentages, desired count, AZ spread
- execute-command disabled by default or tightly governed/audited for break-glass

Avoid one task per tenant and avoid creating services for code that does not exist.

## 15. Workload separation

Model independently scalable capacity for:

- core transactional API
- outbox/notification/integration workers
- document/report/analytics/index workers
- online assessment delivery/workers
- programming code-execution control plane and isolated sandbox compute boundary
- AI gateway workers where enabled

Document CPU/memory/network/storage profile, queue, concurrency, tenant fairness, backpressure, timeout, retry/DLQ, and failure isolation. Code sandboxes must not share the core application task security boundary and require the Prompt 21 isolation model.

## 16. Autoscaling

Configure target/step/scheduled scaling using appropriate signals such as ALB request/latency, CPU/memory, SQS visible/oldest age, active assessment sessions, sandbox queue depth, report backlog, and index lag.

Define min/max, cooldown, scale-to-zero only for safe noncritical workers, DB connection budget, provider quotas, tenant fairness, cost cap, and overload shedding. Test policies statically and through simulations; do not claim measured cloud scaling without execution.

## 17. ECR and container supply chain

Define repositories with encryption, immutable tags or digest-promotion, lifecycle policies, enhanced/basic scan configuration as chosen, cross-account CI pull/push roles, protected production artifacts, and retention of rollback candidates.

Build minimal pinned images, non-root runtime, health utilities only when needed, OCI labels, SBOM, signatures/attestations where practical, and vulnerability gates. Never rebuild the same version during promotion.

## 18. Aurora PostgreSQL

Define encrypted Aurora PostgreSQL compatible with application/Flyway version requirements:

- private DB subnet group and restrictive security group
- multi-AZ writer/reader topology appropriate to environment
- version/parameter groups, time zone/encoding/extensions, connection limits
- IAM auth/secret-managed credentials decision
- automated backups/PITR, retention, maintenance window, snapshots, export/logging where justified
- Performance Insights/Enhanced Monitoring with access/cost controls
- deletion protection and final snapshot safeguards in production
- minor/major upgrade and blue/green testing strategy

Do not enable public access or store database passwords in Terraform variables/state where avoidable.

## 19. Database connection and migration safety

Size application pools against Aurora limits across all ECS tasks/workers. Use RDS Proxy only if evidence justifies its cost/behavior.

Create controlled Flyway migration jobs with checksum validation, backward/forward compatibility, lock/timeout, backup/preflight, expand-contract sequencing, no concurrent migrators, failure halt, evidence, and operator approval for production.

Application deployment cannot run destructive/long migrations implicitly. Rollback plans account for irreversible schema/data changes and favor forward fix.

## 20. ElastiCache/Redis

Provision Redis only for implemented cache/session/coordination/rate-limit needs supported by ADR. Use private subnets, encryption in transit/at rest, authentication/ACL, multi-AZ/failover for production, maintenance, backups if state requires them, eviction policy, memory alerts, and key TTL/namespacing.

Redis cannot be source of truth for marks, payments, attendance, results, custody, or workflow. Design application behavior for cache loss/failover and prevent tenant key leakage.

## 21. S3 storage segregation

Use separate buckets or rigorously separated access points/prefix/key policies for:

- frontend deployment artifacts
- private tenant documents
- confidential examination artifacts/answer scripts
- reports/exports/research datasets
- application/audit/access logs
- backups/DR copies
- CI/release artifacts if used

Enable block public access, ownership controls, encryption, versioning where required, lifecycle/retention, access logging/CloudTrail data events by risk, malware-processing boundaries, presigned-grant limits, and deletion/legal-hold policy. Confidential exams require distinct keys/policies/time windows/watermark/audit.

## 22. KMS key strategy

Define separate customer-managed keys where data class/blast radius/rotation/access justifies them: database, general documents, confidential examinations, logs/audit, backups, queues/topics, search, and artifacts.

Use least-privilege key policies/grants, separation of administration/use, rotation, multi-Region decision for DR, deletion protection/waiting period, monitoring, and compromise runbook. Avoid one key per tenant by default unless a paid isolation tier requires it.

## 23. SQS and EventBridge

Define queues/topics/buses for actual outbox and asynchronous workloads with encryption, visibility timeout, retention, long polling, redrive/DLQ, max receive, idempotency, ordering/FIFO only when required, payload-size limits, large-payload S3 reference pattern, and tenant fairness.

EventBridge handles routed domain/integration events where appropriate; SQS owns durable worker backpressure. Do not place sensitive payloads in event metadata/logs. Provide replay/quarantine/redrive controls with approval and duplicate safety.

## 24. OpenSearch infrastructure

Provision OpenSearch only if Prompt 32 implemented the production adapter and scale justifies it. Define private VPC access, encryption, fine-grained access/IAM, node/master/storage sizing, multi-AZ, snapshots, index lifecycle/version aliases, audit logs, monitoring, and cost tier.

Application-level authorization remains mandatory before search return. Do not treat OpenSearch document-level security as the sole tenant boundary. Provide a local/test alternative and a disable path for environments that do not need it.

## 25. Identity and OIDC integration

Implement infrastructure boundary for Amazon Cognito or approved external OIDC per ADR: domains/callbacks/logout, clients, scopes, token lifetime, MFA/federation, secret handling, signing-key rotation/cache, and environment isolation.

Do not encode application RBAC solely in IdP groups; backend membership/context/RLS remains authoritative. Admin identity, workforce AWS access, application users, external employers/auditors, and service identities need separate trust boundaries.

## 26. Secrets Manager and Parameter Store

Classify configuration versus secrets. Store provider/database/OIDC/API secrets in Secrets Manager; use Parameter Store/AppConfig or environment configuration for non-secret values as justified.

Define naming, KMS, IAM resource constraints, rotation ownership, version/staging labels, cache/refresh, startup failure, emergency revocation, audit, and nonproduction separation. Terraform creates references/policies, not plaintext secret values. No secret in outputs/logs/CI artifacts/task definitions.

## 27. External communications and payment boundaries

Model SES/SNS/WhatsApp/SMS/payment/provider integration roles, secrets, network egress, callbacks, signature validation endpoints, rate limits, queues/DLQs, idempotency, provider health, and audit without assuming a provider contract.

Provider submission/return is not delivery/payment truth. Webhook processing must be authenticated, replay-protected, queued, reconciled, and observable. Sandbox/nonproduction never contacts real recipients or moves funds by default.

## 28. Logging architecture

Use structured JSON logs with timestamp, severity, service/version/environment, request/trace/span/correlation/job IDs, safe tenant pseudonym/reference where policy permits, outcome/reason code, and duration.

Apply centralized redaction at source and ingestion. Never log tokens, credentials, secrets, raw headers/cookies, PII, marks, answers, question content, bank/payment data, documents, precise location, HR/mentor/grievance/incident content, or AI prompts/outputs unless a separate classified audit store explicitly permits minimized content.

Define log groups, retention by class, encryption, access, subscription/export, sampling, cost caps, and deletion/legal hold.

## 29. OpenTelemetry tracing

Instrument W3C trace propagation across ALB/ECS, HTTP, database, queues/events, workers, providers, report/search/AI/sandbox jobs, with baggage allowlist and no sensitive attributes.

Define head/tail sampling strategy, error/slow trace retention, service/resource attributes, exporter/collector deployment, failure behavior, and cost/volume budgets. Trace propagation must not leak tenant/user data to external vendors.

## 30. Metrics and service-level indicators

Implement technical and business-process metrics for:

- availability, request rate, latency, errors, saturation
- JVM/GC/threads/connections and frontend/mobile release health
- Aurora connections/locks/replica lag/storage/failover
- Redis/OpenSearch health
- queue depth/oldest age/DLQ/retry
- payment pending/reconciliation/settlement failures
- exam submission/autosave/evaluation/result processing errors
- attendance acknowledgement latency
- notification/provider failures
- report/index/document/sandbox/AI backlog and failure
- security/access/revocation/audit pipeline health

Metrics use bounded safe labels—never tenant/user/record IDs that create cardinality/privacy risk.

## 31. SLOs and error budgets

Define measurable SLIs/SLOs including:

- core critical API monthly availability target ≥99.9%, excluding approved maintenance per PRD
- normal interactive API p95 <2 seconds
- standard attendance save acknowledgement <2 seconds
- supported-load online assessment autosave <1 second
- queue/job freshness and completion targets by class
- payment/exam/result/notification correctness and recovery indicators

Define measurement window, exclusions, data source, burn-rate alerts, error-budget policy, ownership, and release/feature decisions. Do not claim SLO attainment without production evidence.

## 32. Dashboards

Provision role-based CloudWatch/Grafana-equivalent dashboards as code for executive service health, API, database, queues/workers, exams/assessments, coding sandboxes, payments, communications, search/analytics/AI, security, costs, and DR/backup.

Dashboards link to safe runbooks and filtered logs/traces without embedding secrets or sensitive business data. Environment/region/version are always visible.

## 33. Alerting

Define actionable multi-window/burn-rate and symptom-based alerts with severity, owner/on-call route, deduplication, suppression/maintenance, escalation, runbook, safe context, acknowledgement, and closure.

Alert on failed/pending payments, delayed settlements, exam autosave/processing errors, result anomalies/pipeline failure, queue backlog/DLQ, integration/provider failure, database/storage/certificate/backup issues, security events, cross-tenant denial anomalies, and cost spikes.

Avoid noisy per-record alerts and sensitive payloads. Test alert definitions synthetically without notifying real people.

## 34. CloudTrail and AWS audit

Define organization/account trails where possible, multi-Region management events, selected high-risk data events, log-file validation, encrypted centralized immutable retention, restricted access, and alerting for trail changes.

Separate AWS control-plane audit from application tamper-evident audit while correlating safe identifiers. Document cost-sensitive data-event selection for confidential S3/KMS/secrets/support actions.

## 35. GuardDuty, Security Hub, Config, and posture management

Define enablement/aggregation direction for GuardDuty, Security Hub, AWS Config/conformance packs, Inspector/ECR scanning, IAM Access Analyzer, Macie where justified, Detective direction, and centralized finding routing.

Specify severity/SLA, ownership, suppression with justification/expiry, evidence, remediation, and exception governance. Do not claim findings are clean without authorized account scans.

## 36. IAM least privilege

Create scoped roles/policies for ECS tasks, execution, workers, migration jobs, CI plan/deploy, read-only operations, incident response, backup/restore, support, and security audit.

Use resource/condition restrictions, environment/account boundaries, session tags where safe, permission boundaries/SCP direction, MFA/step-up for humans, short-lived federation, and Access Analyzer/policy tests.

No wildcards unless unavoidable and documented with conditions. No shared users, static access keys, implicit support tenant access, or application use of administrator roles.

## 37. GitHub Actions OIDC federation

Define AWS IAM trust for GitHub OIDC restricted by organization/repository/ref/environment/workflow claims. Separate PR plan/read, nonproduction deploy, and production deploy roles.

No long-lived AWS keys. Fork PRs cannot receive secrets/deploy roles. Protected environments require human approvals for staging/production as defined. Log session identity without exposing tokens.

Do not create the provider/roles without deployment authorization; provide Terraform and bootstrap/handoff steps.

## 38. Pull-request CI

Create reproducible PR gates for:

- formatting/lint/type/unit/component/integration/API compatibility
- backend/web/mobile builds and tests appropriate to available runners
- Docker build, SBOM, SAST, dependency/license, secret, container, and IaC scans
- Flyway validation/migration tests
- Terraform fmt/validate/test/tflint/checkov/tfsec-equivalent with pinned versions
- policy-as-code, module examples, docs/diagram drift
- role/tenant/RLS security tests

Untrusted PRs receive no deployment/signing/provider secrets. Required failures cannot be bypassed silently.

## 39. Build and artifact pipeline

Build backend JAR/images, web assets, workers, and mobile artifacts from locked dependencies and immutable revision. Generate checksums, SBOMs, signatures/attestations where practical, test reports, source maps/symbols under controlled access, and provenance.

Store artifacts immutably and promote the same digest across environments. Verify production images exclude mocks, debug endpoints, test credentials, insecure TLS, and development URLs.

## 40. Deployment pipeline

Define protected workflow:

1. validate release candidate and traceability;
2. plan infrastructure with reviewed changes/cost/security impact;
3. build/verify immutable artifacts;
4. run migration compatibility/preflight;
5. deploy to staging;
6. run health/smoke/contract/RLS/critical journeys;
7. soak and review observability;
8. obtain production approval;
9. apply controlled migration;
10. rolling or blue/green deploy with health gates;
11. post-deploy verification and audit;
12. promote, halt, rollback, or forward-fix.

The code may define this pipeline; do not execute AWS deployment in this prompt.

## 41. Blue/green or rolling release safety

Choose per service based on state/traffic/cost. Include readiness, connection draining, minimum healthy capacity, backward-compatible DB/API/event/index schema, feature-flag sequencing, queue-worker version compatibility, rollback window, and automated halt thresholds.

For mobile, preserve API compatibility with supported released versions and Prompt 31 store rollout gates. Database destructive rollback is not assumed; use expand-contract and forward fix.

## 42. Cost model and budgets

Create documented monthly cost assumptions for dev/staging/production and low/base/high usage, including data transfer/NAT/endpoints, ALB/Fargate, Aurora, Redis, OpenSearch, S3, KMS, queues/events, logs/traces, security services, backups, device/build runners, and external providers.

State region, hours, storage, requests, students/tenants, concurrency, exam/coding/report peaks, retention, and pricing-date/source placeholders. Do not invent precise quotes without current authorized pricing data.

Define AWS Budgets, cost anomaly alerts, tag coverage, idle/nonproduction schedules, log retention, storage lifecycle, scaling caps, and owner/approval. Cost controls must not delete protected data or weaken resilience silently.

## 43. Backup policy

Define backup classes and schedules for Aurora PITR/snapshots, S3 versioning/object lock where justified, OpenSearch snapshots, Redis if stateful, configuration/IaC, identity/config exports where supported, KMS/key recovery dependencies, and application audit artifacts.

Target initial core transactional RPO ≤15 minutes and RTO ≤4 hours per PRD; document stronger purchasable tiers and components that cannot meet the target. Backups are encrypted, access-restricted, monitored, immutable/isolated as risk requires, retained/lifecycle-managed, and tested.

## 44. Restore procedures

Create executable but non-destructive-by-default runbooks for point-in-time Aurora restore, accidental deletion, corrupted migration, S3 object/version recovery, OpenSearch rebuild/snapshot, queue/DLQ replay, secret/key recovery, application redeploy, and full environment reconstruction.

Each includes authorization, incident scope, clean target environment, dependencies, data validation/reconciliation, forced RLS/security verification, DNS/traffic decision, communication, evidence, cleanup, and postmortem. Never test restore against production in place.

## 45. DR architecture and regional-disaster decision

Document risks and tiers:

- multi-AZ in-region resilience as baseline
- backup/restore to a secondary region
- pilot-light/warm-standby/multi-region options for stronger tiers

Analyze Aurora global/cross-region copies, S3 replication, ECR/artifact replication, Terraform/state, KMS multi-Region keys, secrets/config, identity, OpenSearch rebuild/snapshot, queues/events, DNS failover, external providers, cost, consistency, and data residency.

State limitations and recovery sequence. Do not claim multi-region capability unless all dependencies and tests support it.

## 46. DR exercises and evidence

Create scheduled exercise types: tabletop, component restore, database PITR, isolated full-stack restore, AZ impairment, queue/provider outage, credential/key compromise, and regional-disaster simulation.

Capture approved scenario, start/end, source backup, target, observed RPO/RTO, data reconciliation, service/security/RLS validation, issues, owner/actions, evidence/checksums, cleanup, and sign-off. This prompt defines procedures/tests that can run locally or safely; it does not fabricate a successful AWS exercise.

## 47. Security and incident response runbooks

Create/update runbooks for compromised credentials/session, exposed secret, suspicious IAM, cross-tenant data risk, malicious upload, exam-paper exposure, payment/webhook fraud, ransomware/data corruption, DDoS/WAF event, vulnerable image/dependency, lost signing key, unauthorized support access, audit/log pipeline failure, and data-subject/privacy incident.

Include detection, classification, containment, evidence preservation, legal/privacy escalation role, credential/key rotation, tenant communication decision, recovery, verification, audit, and lessons learned. Do not provide unsafe destructive shortcuts.

## 48. Infrastructure validation and tests

Add automated validation for:

- Terraform fmt, validate, tests, lint, security, policy, docs, and module examples
- no public data/application resources, broad security groups, unencrypted storage, plaintext secrets, mutable production artifacts, missing deletion protection, or risky IAM wildcards
- private subnet/AZ/routing/security-group reachability intent
- bucket/KMS/queue/database/log backup/retention/encryption policies
- OIDC trust claim restrictions and environment separation
- autoscaling/health/deployment/migration/rollback configurations
- dashboards/alarms/runbook links and safe metric dimensions
- backup/restore/DR configuration against RPO/RTO definitions
- Docker reproducibility/non-root/secrets/SBOM/vulnerability policy
- CI workflow syntax/permissions/pinning/untrusted-fork safety

Run safe offline/mock/example plans when possible and save sanitized evidence. If provider initialization, cloud plan, image registry, macOS, or AWS service validation is unavailable, report exact blocked checks and never claim success.

## 49. Documentation and architecture diagrams

Update:

- C4/context/container/deployment and network/data-flow/trust-boundary diagrams
- environment/account/region/AZ/service/dependency matrix
- Terraform module/state/bootstrap/use/upgrade/rollback documentation
- IAM role/policy/access/support/break-glass matrix
- data-class-to-storage/KMS/retention/backup map
- runtime sizing/autoscaling/capacity/connection budget
- CI/CD artifact/provenance/migration/release/mobile handoff
- observability catalog, SLIs/SLOs/error budgets, dashboards, alerts, ownership
- cost assumptions/budgets/anomaly response
- backup inventory, restore/DR plans, exercise calendar/evidence template
- incident, access, key/certificate/secret, provider, deployment, and operations runbooks

Diagrams and docs must match Terraform/code. Label proposed, validated-offline, deployed, and tested-in-AWS states distinctly.

## 50. Completion gate

Completion requires all of the following:

1. Terraform modules/environment compositions are reusable, typed, documented, formatted, validated, linted, security-scanned, and policy-tested with sanitized evidence.
2. The design covers Route 53/ACM boundaries, CloudFront/WAF, private multi-AZ networking, ALB, ECS Fargate services/workers, Aurora PostgreSQL, justified Redis/OpenSearch, segregated S3, KMS, queues/events, identity, secrets, ECR, and observability.
3. No application/data service is publicly exposed; ingress/egress, VPC endpoints, security groups, IAM, KMS, secrets, and tenant boundaries follow least privilege.
4. Core modular-monolith and high-variance worker separation, scaling signals, backpressure, tenant fairness, DB connection budgets, and failure isolation are documented and testable.
5. Aurora encryption, multi-AZ resilience, PITR/backups, deletion protection, migration safety, upgrades, and restore procedures meet or explicitly identify gaps against RPO ≤15 minutes/RTO ≤4 hours.
6. S3 data classes—including confidential examinations—have correct policy, encryption, grants, versioning/retention, audit, and recovery boundaries.
7. GitHub OIDC and CI/CD provide reproducible builds, immutable digest promotion, SBOM/scans/provenance, migration preflight, staging verification, protected production approval, health gates, and rollback/forward-fix without long-lived AWS keys.
8. Native Android/iOS build/signing/internal/store handoff remains consistent with Prompt 31 and never claims unavailable macOS/signing/publication evidence.
9. PII-safe logs/traces/metrics, meaningful SLIs/SLOs/error budgets, dashboards, actionable alerts, retention, and incident runbooks cover critical technical/business workflows.
10. CloudTrail/security-service/Config/Access Analyzer direction, vulnerability management, audit retention, and incident response are reviewable and least-privilege oriented.
11. Cost assumptions, budgets, anomaly alerts, tags, scaling caps, retention, and environment-size choices are documented without weakening production controls.
12. Backup inventory, restore runbooks, scheduled exercises, regional-DR decision/limitations, reconciliation, and evidence templates are complete; no exercise is fabricated.
13. Architecture diagrams, ADRs, environment/data/security/IAM matrices, CI/CD, deployment, migration, rollback, restore, DR, access, and incident documentation match the code.
14. All environment-available exact tests/scans/builds pass at the agreed severity; blocked cloud/macOS/provider checks are listed honestly with handoff steps.
15. No AWS resource, DNS, certificate, secret, database, image registry, production environment, mobile store, or billable service was mutated without explicit authorization.
16. No Terraform plan, deployment, scan, backup, restore, failover, load, SLO, cost, or cloud result is fabricated.
17. Prompt 34 Production Readiness, Full Regression, Pilot, and Launch was not implemented or marked complete.

Provide the standard completion report covering implementation summary, changed files, architecture/ADRs, Terraform modules/environments/state, network/edge/compute/data/storage/messaging/search/identity/secrets, IAM/KMS/security, CI/CD/artifacts/migrations/mobile handoff, observability/SLOs/alerts, cost model, backup/restore/DR, exact commands/results/exit status, scan findings/exceptions, diagrams/docs/runbooks, deployment authorization status, blocked/unavailable AWS/macOS/provider evidence, manual verification, and suggested commit message.

End with exactly one final line:

`Completion gate: PASSED`

or

`Completion gate: FAILED`

Suggested commit message:

`infra(aws): add secure platform cicd observability and dr`

Stop. Do not begin Prompt 34, run Terraform apply, deploy AWS resources, mutate DNS/secrets/databases, incur cloud cost, or claim production readiness/launch.
```

---

## Review Checklist Before Prompt 34

- Terraform is modular, environment-aware, validated, scanned, documented, and free of committed secrets/state.
- Production design is private, multi-AZ, least-privilege, encrypted, observable, recoverable, and cost-governed.
- ECS Fargate supports the modular monolith and independently scalable high-variance workers without premature EKS complexity.
- Aurora, Redis/OpenSearch where justified, S3 data classes, KMS, queues/events, identity, and provider boundaries match actual application needs.
- CI uses short-lived GitHub OIDC, immutable artifacts, SBOM/provenance, migration preflight, staging tests, and protected production approval.
- Mobile signing/store controls remain governed and no public publication is claimed.
- Logs/traces/metrics exclude sensitive data and support measurable SLO/error-budget alerts.
- Initial core RPO ≤15 minutes and RTO ≤4 hours are designed, with honest gaps and stronger-tier options documented.
- Restore/DR exercises have executable procedures and evidence templates; no AWS success is fabricated.
- Costs, assumptions, tags, budgets, anomaly alerts, scaling caps, and retention are explicit.
- Architecture diagrams, ADRs, policies, tests, and runbooks match the infrastructure code.
- No cloud resource, account, DNS, certificate, secret, database, or deployment was mutated without authorization.
- No Prompt 34 production-readiness/pilot/launch work was implemented or falsely marked complete.
- The completion gate passed and changes were reviewed and committed.

Do not continue to Prompt 34 until these conditions pass.
