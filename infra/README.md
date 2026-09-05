# Infrastructure

- `local/` — notes for local development infrastructure. The actual local Postgres is defined at the repo root (`../docker-compose.yml`) so `make db-up`/`make db-down` work from one obvious place; nothing else runs locally yet.
- `aws/` — placeholder for Terraform IaC targeting AWS (ECS Fargate, Aurora PostgreSQL, S3), per ADR-006. Not implemented in this foundation prompt — no business modules exist yet to deploy. PR CI never requires live AWS credentials; when Terraform modules land here, CI runs `terraform fmt -check` and `terraform validate` only.
