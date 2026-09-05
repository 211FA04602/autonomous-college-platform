# ADR-006: AWS deployment direction

**Status:** Accepted
**Date:** 2026-09-05
**Upholds constitution rules:** 6, 10, 15, 16

## Context

Production direction is AWS-first, containerized, infrastructure-as-code. CI must not require live AWS credentials to validate pull requests (constitution rule 16, and a hard product requirement), so infra changes are validated statically in PR CI and applied separately, out of band, with real credentials.

## Decision

- **Compute:** the backend modular monolith ships as a container image; runs on a container orchestration service on AWS (ECS Fargate as the default target — no Kubernetes control-plane operational cost until a concrete need for it exists, consistent with ADR-001's "avoid premature complexity" direction).
- **Database:** Amazon Aurora PostgreSQL (see ADR-003), provisioned via infrastructure-as-code in `infra/aws/`.
- **Object storage:** S3 for the `documents` module's referenced binaries (constitution rule 10).
- **IaC tooling:** Terraform, under `infra/aws/`, structured per environment; PR CI runs `terraform fmt -check` and `terraform validate`/`plan` against a local/mocked backend only — no live credentials, no live apply, from CI.
- **Secrets:** AWS Secrets Manager / Parameter Store in real environments; `.env.example` files in the repo contain only placeholder values (constitution rule 16).
- **Networking baseline:** private subnets for the application and database tiers, a public-facing load balancer/API gateway layer only — detailed network topology is specified when `infra/aws/` is built out beyond this foundation's placeholder.

## Consequences

- This ADR sets direction; `infra/` in this foundation prompt contains structure, a local-only Postgres Docker Compose file, and documentation — not a deployed environment. Actual Terraform modules for ECS/Aurora/S3 are a subsequent, explicitly scoped piece of work.
- Because PR CI never touches real AWS, an infra change's correctness against actual AWS behavior is only fully verified when applied by someone with credentials in a real account — this is a deliberate, documented gap, not a silent one.
