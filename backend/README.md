# backend

Java/Spring Boot modular monolith for the Standalone Engineering College & Autonomous
Institution Operating Platform — independent from Institora. See
`docs/product/PRD.md`, `docs/engineering/CONSTITUTION.md`, and
`docs/architecture/ADR-00{1,2,3,4}-*.md` at the repo root for the binding product and
architecture decisions this build follows.

## Prerequisites

- **JDK 21** (Temurin recommended). No local Gradle install is required — this repo
  ships a real Gradle wrapper pinned to **Gradle 9.7.1**; `./gradlew` downloads it on
  first use.
- Docker (only needed for `integrationTest` and `bootRun` against a real database — see
  below). Not required to compile, unit-test, or format-check.

## Modules

| Module | What it is |
|---|---|
| `platform-core` | Shared kernel: UUIDv7 `IdGenerator`, correlation-id filter/MDC, RFC 7807 Problem Details advice, pagination, outbox event contract. Depends on nothing else in this repo. |
| `identity-access` | Empty skeleton. Not implemented — see module README. |
| `tenancy-organization` | Empty skeleton. Not implemented — see module README. |
| `audit` | Real: `audit_log` table + `AuditEventRecorder`. |
| `workflow` | Empty skeleton. Not implemented — see module README. |
| `documents` | Empty skeleton. Not implemented — see module README. |
| `notifications` | Empty skeleton. Not implemented — see module README. |
| `integration-outbox` | Real: `outbox_event` table + `OutboxWriter`. No relay/consumer yet (ADR-004). |
| `app` | Composition root: `application.yml`, `GET /v1/system/health`, correlation-id filter wiring, ArchUnit module-boundary tests, Flyway migration-location aggregation. |

See `docs/architecture/MODULE_BOUNDARIES.md` for the full dependency rules and ArchUnit
enforcement.

## Ports and endpoints

- App (public API): **8080** — e.g. `GET http://localhost:8080/v1/system/health`.
- Actuator management (separate port, minimal exposure — `health`, `info` only):
  **8090** — e.g. `GET http://localhost:8090/actuator/health`.
- OpenAPI/Swagger UI (springdoc, served on the app port): `/v3/api-docs`,
  `/swagger-ui.html`. The hand-written, contract-of-record OpenAPI document lives at
  `docs/api/openapi.yaml`.

## Environment variables

See `.env.example` in this directory (copy to `.env`, which is gitignored, and adjust
if needed — never commit real credentials). Defaults already match the repo-root
`docker-compose.yml` for local dev:

| Variable | Default | Purpose |
|---|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/acplatform` | Postgres connection |
| `SPRING_DATASOURCE_USERNAME` | `acplatform` | Postgres user |
| `SPRING_DATASOURCE_PASSWORD` | `acplatform_local_only` | Postgres password (local dev only) |
| `SPRING_PROFILES_ACTIVE` | *(none)* | Set to `local` to enable permissive dev CORS (`com.acplatform.app.config.LocalDevCorsConfig`) — never enable `local`/`dev` outside a developer's own machine |

## Commands

All commands below are run from this `backend/` directory using the Gradle wrapper
(`./gradlew` on macOS/Linux/Git Bash, `gradlew.bat` on plain Windows shells).

### Verified in this environment (no Docker/Postgres available)

```
./gradlew --version                 # confirms the wrapper resolves Gradle 9.7.1
./gradlew build -x test             # compiles every module + runs spotlessCheck — PASSED
./gradlew test                      # unit tests + ArchUnit module-boundary tests — PASSED (20 tests, 19 run + 1 documented @Disabled placeholder, 0 failures)
./gradlew spotlessCheck             # Google Java Format check — PASSED
./gradlew :app:compileIntegrationTestJava   # confirms the Testcontainers-based integration test compiles — PASSED (not executed; see below)
```

### Requires Docker — NOT executed in this sandbox (no Docker available here)

```
./gradlew integrationTest           # Testcontainers: spins up real PostgreSQL 17, runs every
                                     # module's Flyway migrations against it, asserts the
                                     # audit_log/outbox_event tables exist. Not part of
                                     # build/check by design — run explicitly.
```

### Requires Docker + Postgres running — NOT executed in this sandbox

```
docker compose -f ../docker-compose.yml up -d     # from repo root, starts local Postgres 17
./gradlew :app:bootRun                            # boots the app on 8080 / management on 8090
```

Flyway migrations run automatically on application startup (Spring Boot's Flyway
autoconfiguration, using the `spring.flyway.locations` configured in
`app/src/main/resources/application.yml`) — there is no separate Flyway Gradle plugin
wired up in this build, since running migrations only ever needs to happen through the
app's own datasource.

## What could not be verified here

This sandbox has no Docker and no local PostgreSQL. That means the following were
**not** executed, only written and (where possible) compile-checked:

- `./gradlew integrationTest` (Testcontainers-backed Flyway migration test) — its
  source compiles cleanly (`compileIntegrationTestJava` succeeded) but was never run
  against a real container.
- `./gradlew :app:bootRun` against a live Postgres — never started; the datasource,
  Flyway migrations, JPA entity mappings, and the `/v1/system/health` endpoint's real
  (non-mocked) `HealthEndpoint` behavior with a live DB health indicator have not been
  exercised end-to-end.
- Actual Flyway migration application (`flywayMigrate`) against Postgres 17 — the SQL
  in `audit/src/main/resources/db/migration/audit/V1__create_audit_log.sql` and
  `integration-outbox/src/main/resources/db/migration/outbox/V1__create_outbox_event.sql`
  was only reviewed for syntactic correctness against Postgres 17, not applied.

## Deviations from the foundation prompt worth flagging

- **start.spring.io no longer serves Spring Boot 3.x** (its compatibility range is now
  `>=4.0.0`, confirmed live against the service). The Gradle wrapper was bootstrapped
  with a throwaway `dependencies=web,actuator,validation` project with no `bootVersion`
  pinned (so Initializr used its current default, 4.x) purely to obtain a genuine
  `gradlew`/`gradle-wrapper.jar` pinned to Gradle 9.7.1; none of that project's
  generated source or build files were kept. Every module's own `build.gradle.kts` and
  `gradle/libs.versions.toml` in this repo explicitly pin **Spring Boot 3.5.16**, per
  the constitution's documented deviation.
- **`GET /v1/system/health` DEGRADED-status HTTP code**: the prompt says "on
  failure/degraded, return RFC 7807 Problem Details (503 for DOWN)". Since the
  frontend's `systemHealthResponseSchema` defines `DEGRADED` as a member of the
  *success*-shape response (not the Problem Details schema), this build returns
  `DEGRADED` as HTTP 200 with the normal `SystemHealthResponse` body, and reserves
  Problem Details/503 for `DOWN` only. Documented in
  `com.acplatform.app.system.SystemHealthStatus`'s Javadoc and in `docs/api/openapi.yaml`.
- **Testcontainers version**: pinned to 1.20.6 per the prompt's explicit "~1.20.x"
  instruction, even though 1.21.x is available on Maven Central as of this writing —
  flagged in `gradle/libs.versions.toml` as "verify/bump before production."
