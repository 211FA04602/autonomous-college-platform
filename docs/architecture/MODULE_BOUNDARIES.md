# Backend module boundaries

Base Java package: `com.acplatform`. Group ID: `com.acplatform`.

## Modules (Gradle subprojects under `backend/`)

| Module | Package | Purpose | May depend on |
|---|---|---|---|
| `platform-core` | `com.acplatform.platformcore` | Shared primitives: Problem Details, correlation IDs, pagination, UUIDv7 generation, base entity/audit columns, outbox event contract interfaces. Minimal dependencies (no Spring Web MVC specifics beyond what's needed to expose the shared exception handler). | *(none of the other modules)* |
| `identity-access` | `com.acplatform.identityaccess` | Authentication, authorization, roles, sessions. **Not implemented in this foundation prompt** beyond an empty module skeleton. | `platform-core` |
| `tenancy-organization` | `com.acplatform.tenancyorg` | Institution/campus/tenant model. **Not implemented in this foundation prompt** beyond an empty module skeleton. | `platform-core` |
| `audit` | `com.acplatform.audit` | Audit trail primitives for high-risk actions. | `platform-core` |
| `workflow` | `com.acplatform.workflow` | Approval chains, configuration/rule versioning primitives. | `platform-core` |
| `documents` | `com.acplatform.documents` | Object-storage file references. | `platform-core` |
| `notifications` | `com.acplatform.notifications` | Outbound notification primitives (consumes outbox events). | `platform-core`, `integration-outbox` |
| `integration-outbox` | `com.acplatform.outbox` | Transactional outbox table + publication contract. | `platform-core` |
| `app` | `com.acplatform.app` | Executable composition root: wires all modules, owns `application.yml`, Flyway migration locations aggregation, the health/readiness vertical slice, and the ArchUnit boundary tests (they need every module on the test classpath). | all modules |

## Rules (enforced by ArchUnit in `backend/app/src/test/java/com/acplatform/app/architecture/ModuleBoundaryTest.java`)

1. **No module depends on another module's internal packages.** Each module exposes its cross-module surface (if any) only from an `...api` subpackage (e.g., `com.acplatform.audit.api`); everything else (`...internal`, entities, repositories) is invisible to other modules. `platform-core` is the one module every other module may depend on in full, since it is intentionally minimal shared kernel, not a domain.
2. **No cyclic module dependencies.** The dependency graph above is a DAG; ArchUnit's `SlicesRuleDefinition.slices()...should().beFreeOfCycles()` enforces it.
3. **No module reads another module's JPA entities/tables directly.** A domain module's `@Entity` classes live in its own package and are not referenced from another module — cross-module data needs go through the owning module's `...api` service interface or through domain events (ADR-004), never a foreign-module repository call or a raw SQL join across module-owned tables.
4. **`platform-core` has no dependency on any other backend module** (it is the shared kernel; the arrow only ever points into it).
5. **Repositories over tenant-owned entities expose no unscoped "find all"** (constitution rule 4) — enforced once the first tenant-owned entity ships; the rule/test is written now as a documented pending check in the same test class so it isn't forgotten.

## What this foundation prompt does NOT do

`identity-access` and `tenancy-organization` are created as empty, compiling module skeletons (build file + package-info + a placeholder marker class + a module `README.md` stating what's deferred) so the module graph and ArchUnit rules are complete and testable now. Their actual domain model, tables, and endpoints are explicitly out of scope here (per the prompt's "do not begin identity, tenancy, or business-module implementation").
