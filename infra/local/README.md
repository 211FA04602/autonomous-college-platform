# Local infrastructure

Local PostgreSQL is defined at the repository root: `../../docker-compose.yml` (`make db-up` / `make db-down`). It is intentionally the *only* local dependency wired up in this foundation prompt — other local dependencies (a message broker for the outbox relay, a search index for analytics, etc.) are added when the module that needs them ships, not speculatively.
