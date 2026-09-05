# Claude Code Prompt 01

## Tenancy, Institutions, Identity, and Role-Based Access Control

**Project:** Standalone Engineering College & Autonomous Institution Platform  
**Stack:** React + TypeScript web, React Native + TypeScript Android/iOS, Java 21 + Spring Boot 3, PostgreSQL/Aurora PostgreSQL, AWS  
**Prerequisite:** Prompt 00 completion gate has passed and its reviewed changes have been committed  
**Scope:** Secure tenant, organization, identity, membership, context, role, permission, and authorization foundation

---

## Prompt to Paste into Claude Code

```text
You are the principal engineer continuing the greenfield Engineering College and Autonomous Institution Operating Platform.

Before editing:

1. Read `docs/product/PRD.md` completely.
2. Read `docs/engineering/CONSTITUTION.md` completely.
3. Read every ADR created by Prompt 00, especially the modular-monolith, tenant-isolation, API, web, mobile, PostgreSQL/Flyway, and security decisions.
4. Read `docs/mobile/ROLE_FEATURE_MATRIX.md`.
5. Inspect Git status, current repository structure, builds, tests, generated configuration, and existing code.
6. Confirm that the working tree is clean or identify and preserve all legitimate pre-existing changes.

Do not re-scaffold the repository, replace established architecture, edit an already-applied Flyway migration, or broaden this prompt into academic/student business modules. Do not use destructive Git commands.

The goal of this prompt is to implement one production-grade vertical slice for multi-tenancy, institution hierarchy, identity integration, memberships, context selection, RBAC, scoped authorization, and access administration across:

- Spring Boot backend
- React web administration interface
- React Native Android application
- React Native iOS application

## 1. Required domain model

Implement the following concepts with clear ownership and boundaries:

### Tenant

- immutable platform identifier
- tenant code and display name
- lifecycle: provisioning, active, suspended, offboarding, archived
- default time zone, locale, data region metadata, branding reference, and plan/module entitlement reference
- created/activated/suspended/offboarded metadata
- suspension reason and authorized workflow reference
- no physical deletion through normal application APIs

### Education group and organization hierarchy

- education group or trust/society
- institution
- campus
- school/faculty where applicable
- department
- center, cell, office, or administrative unit
- hierarchy parent/child relationships with valid-type constraints
- official codes, display names, status, time zone, address/reference metadata
- separate institution/campus scope even when a tenant has only one institution
- effective dates and status history
- prevent hierarchy cycles

Do not introduce academic programs, curricula, students, employees, or courses in this prompt. Provide only organization references needed for future scopes.

### User identity

- application user identity linked to an external identity-provider subject
- never use mutable email address or phone number as the primary identity key
- profile display fields with privacy classification
- active, invited, suspended, deactivated states
- identity-provider issuer and subject uniqueness
- last authenticated metadata without storing access/refresh tokens in PostgreSQL
- user may belong to multiple tenants and institutions

### Membership

- tenant membership
- organization-scope membership
- relationship to one or more roles and permission scopes
- invitation, active, suspended, expired, revoked states
- effective start/end
- invitation issuer, acceptance, revoke reason, and audit
- prevent a user from gaining a tenant simply by submitting a tenant identifier

### Roles and permissions

- stable permission codes representing business actions, not menu names or pages
- system role templates and tenant-defined roles
- role version/status where needed to avoid silent permission changes
- permission assignment to roles
- role assignment to users/memberships
- explicit scope assignment
- allow and deny behavior must be documented; prefer a clear default-deny model
- no wildcard super-permission exposed to ordinary tenant administrators

Seed stable permission categories sufficient for later modules without pretending later business capabilities exist. Include platform/tenant/organization/access/audit/workflow/document/notification administration actions and safe placeholders or namespaces for later domain permissions only when required by the design.

### Authorization scope

Support typed scopes for:

- platform
- tenant
- institution
- campus
- department/organization unit
- future program, cohort, section, course, examination, and assigned-record scope through extensible typed references

Do not create fake foreign keys to future domain tables. Use a safe extensibility design that can later validate domain-specific scopes through owning modules.

### External, temporary, and support access

- time-bound access grant
- subject user or external identity
- tenant and exact authorized scope
- approved role/permissions
- purpose and ticket/reference
- start/end time
- granting and approving actors
- tenant approval
- revocation
- step-up/MFA requirement metadata
- complete audit

Platform support must never receive automatic access to tenant data. Support access must be explicitly requested/approved, time-bound, visibly active, revocable, and audited.

### Separation of duties

- configurable conflict rules between high-risk role/permission combinations
- validation during assignment
- formal override workflow boundary requiring reason and a second authorized approver
- do not implement examination-specific conflicts yet; establish the generic capability and demonstrate it with safe access-administration examples

## 2. Authentication architecture

Implement a standards-based OIDC integration boundary.

Requirements:

- authorization-code flow for React web
- authorization-code flow with system browser and PKCE for React Native Android/iOS
- validate issuer, audience, signature, expiry, not-before, and required claims
- map only a trusted issuer+subject pair to the application user
- do not grant tenant/role/scope based solely on untrusted token claims unless an explicit, documented mapping policy has been approved
- backend resolves current memberships and permissions from authoritative application data
- do not build custom password storage if external OIDC is the selected architecture
- production profiles must not include bypass authentication, universal tokens, hard-coded users, or unsigned JWT support
- provide a clearly isolated local-development/test identity solution or signed test-token fixture that cannot activate in production
- represent authentication assurance/MFA/step-up evidence for protected actions
- implement session/device registration boundary needed by mobile and web session management
- support server-side user/membership suspension and session revocation response

If Prompt 00 selected a concrete identity provider, continue that ADR. If not, define a provider-neutral OIDC port and a local/test adapter, and write an ADR recording the decision criteria for Amazon Cognito versus an external institutional provider.

## 3. Tenant-context security

Tenant context must be derived from the authenticated user and selected from active authorized memberships.

Implement:

- endpoint to list authorized tenant/institution/campus/role contexts
- endpoint to activate or switch context
- server validation on every switch
- short-lived signed/session-bound active-context representation or equivalent documented design
- context includes tenant, institution/campus where required, role set, scope, permission version, and session reference
- context invalidation when membership, role, access grant, tenant status, or session changes
- safe default when a user has exactly one context
- explicit selector when a user has multiple contexts
- no context persistence across logout or into another user's mobile cache
- reject a client-provided `tenant_id` or organization scope that conflicts with authenticated context
- never use request headers such as `X-Tenant-ID` as independent authority

Background jobs, domain events, audit events, and future imports must carry explicit tenant context established by a trusted server process. Document this requirement now.

## 4. PostgreSQL schema and Row-Level Security

Create new forward-only Flyway migrations. Never change Prompt 00 migrations after application.

Schema must include at minimum:

- tenant and tenant lifecycle history
- organization unit and hierarchy
- application user and identity-provider mapping
- tenant/organization memberships
- invitations
- permission definitions
- roles and role versions/status if selected
- role-permission associations
- scoped role assignments
- temporary/external/support access grants
- separation-of-duties policies and evaluated violations/overrides
- device/session registration metadata where owned by this module
- required optimistic-lock/version columns
- outbox/audit integration references without directly writing another module's internal tables

Database requirements:

- use the repository's chosen UUID v7 or ULID convention
- UTC timestamps
- explicit tenant IDs on every tenant-owned record
- institution/campus scope columns where applicable
- unique constraints scoped correctly by tenant
- foreign keys, checks, effective-date validation where practical, and useful indexes
- normalized data model; do not store permissions or memberships as uncontrolled JSON arrays
- no hard delete of security/audit-relevant assignments through normal APIs
- safe status transitions and revocation history

Enable PostgreSQL Row-Level Security on every tenant-owned table created by this prompt.

Implement and document the database-session tenant strategy. Requirements:

- application establishes tenant identity on the database transaction/connection using a safe server-controlled mechanism
- values cannot leak between pooled connections
- local and production connection roles follow least privilege
- migration/administrative roles are separate from runtime roles
- runtime role must not bypass RLS
- application repository predicates remain mandatory even with RLS
- platform operations use explicit privileged pathways with authorization and audit, not accidental RLS bypass

Write automated tests proving:

- tenant A cannot read tenant B rows
- tenant A cannot update/delete tenant B rows
- omitted tenant context does not expose all records
- pooled connection reuse does not retain the previous tenant context
- authorized scoped queries return only correct organization data
- application-level and RLS defenses both operate

## 5. Backend implementation

Implement in the established `identity-access`, `tenancy-organization`, `audit`, and composition modules without violating boundaries.

Backend requirements:

- domain entities/value objects and explicit state transitions
- application use cases/services
- ports and adapters
- tenant-aware repositories with no unrestricted find-all for tenant-owned data
- method/service authorization
- policy evaluator for permission plus scope
- validation with stable machine-readable error codes
- RFC 7807 error responses
- correlation IDs
- optimistic locking for mutable administration records
- idempotency for invitation acceptance, access revocation, and context switch where relevant
- outbox events for tenant, organization, membership, role assignment, permission change, support access, and session revocation changes
- append-only audit events without storing tokens or secrets

Do not expose JPA entities directly in API contracts. Use explicit request/response models and mapping.

## 6. Required APIs

Use the existing API version convention. Provide OpenAPI documentation and contract tests for at least:

### Current user/context

- retrieve current user identity summary
- list authorized contexts
- activate/switch context
- retrieve effective permissions and scopes for the active context
- list registered sessions/devices appropriate to the current user
- revoke one session/device
- revoke all other sessions/devices

### Tenant/platform administration

- create/provision tenant through platform-authorized API
- view tenant
- update allowed tenant metadata
- activate, suspend, and begin offboarding through controlled commands
- no unrestricted tenant search for ordinary tenant users

### Organization administration

- create/update/status-change organization units
- retrieve hierarchy/tree and scoped search
- prevent invalid parent types/cycles
- institution/campus context data needed by web/mobile selectors

### Membership and invitation

- invite user
- resend/cancel invitation with rate and status controls
- accept invitation
- list/search memberships within authorized scope
- suspend/reactivate/revoke membership
- assign/remove roles and scopes through controlled commands

### Role and permission administration

- list permission catalog
- create/version/retire tenant role
- assign/remove permissions
- assign scoped role to membership
- preview effective permissions
- validate SoD conflicts before commit

### Temporary/support access

- request grant
- tenant review/approve/reject
- activate according to time and assurance policy
- view active grant indicator
- revoke immediately
- access history

All list APIs require pagination, bounded page sizes, stable sorting, filtering, and authorization-aware counts. Prevent inference of inaccessible tenants/users through error messages or timing where practical.

## 7. React web interfaces

Implement production-quality accessible web interfaces for:

- sign-in callback/session state
- context selector for tenant/institution/campus/role
- current access summary
- tenant administration for platform-authorized users
- organization hierarchy administration
- membership directory and invitation workflow
- role builder and permission assignment
- scoped role assignment
- effective-access preview
- SoD conflict display and override request boundary
- temporary/support access request and tenant approval
- active support-access banner/indicator
- current user's session/device list and revocation
- suspended tenant, expired membership, revoked access, unauthorized, and no-membership states

Requirements:

- keyboard accessible
- semantic headings/forms/tables/dialogs
- clear destructive/revocation confirmation
- no permission granted merely because a control is displayed
- pagination and large-list usability
- responsive across desktop/tablet/mobile browser
- localization-ready labels and error messages
- no hard-coded role-to-route assumptions that later modules cannot extend

## 8. React Native Android and iOS interfaces

Implement the identity/context/access portion of the native apps for every role.

Required mobile experiences:

- system-browser OIDC/PKCE sign-in and callback
- secure token storage
- first-login context selection
- tenant/institution/campus/role switcher
- effective role and access summary
- dynamic role-based navigation shell driven by server entitlements
- session/device inventory and remote revoke
- logout and logout-all-devices
- suspended tenant, expired invitation, expired temporary access, revoked session, forced reauthentication, offline-authentication-expired, and no-membership states
- active temporary/support access indicator for authorized tenant administrators
- push/deep-link authentication and authorization guard foundation
- encrypted local cache partitioned by user and tenant
- purge tenant/user data on logout, membership loss, role loss, tenant switch where policy requires, and device revocation

Mobile administration appropriate to role:

- platform/tenant administrators can view organization hierarchy, memberships, role assignments, pending invitations, access-review alerts, and support-access requests
- permit only carefully selected low-risk actions on mobile initially: invitation resend/cancel, membership suspend request/approval according to workflow, role assignment review, support-access approve/reject/revoke, and session revocation
- require online state and step-up authentication for sensitive changes
- complex role design, permission catalog editing, bulk assignment, tenant provisioning, and hierarchy restructuring remain web-first
- provide a clear secure handoff/deep link to web where needed

Update `docs/mobile/ROLE_FEATURE_MATRIX.md` for all roles. Mark only the identity, context, session, and access-administration capabilities implemented by this prompt. Do not claim that role business interfaces are complete.

## 9. Audit requirements

Audit at minimum:

- tenant provisioning, activation, suspension, and offboarding transitions
- organization creation and hierarchy/status changes
- invitation issue, resend, acceptance, cancellation, and expiry
- membership activation, suspension, reactivation, and revocation
- role creation/version/retirement
- permission changes
- role/scope assignments and removals
- effective-access preview by privileged administrators where policy requires
- SoD conflict and override request/decision
- context switches
- login/session/device security events supplied by the identity boundary
- temporary/support access request, approval, activation, use indicator, expiry, and revocation
- session/device revocations
- authorization denials at an appropriate security-event level without excessive noisy or sensitive logging

Audit events must include actor, tenant/scope, action, resource, time, reason where required, correlation ID, channel (web/mobile/API/system), and safe before/after summaries. Never record tokens, secrets, authentication codes, or unrestricted personal data.

## 10. Security and abuse controls

Implement or document integration points for:

- rate limiting of invitation, context, session, and sensitive administration endpoints
- invitation token hashing, expiry, one-time use, cancellation, and replay protection
- CSRF strategy for web according to authentication architecture
- secure mobile redirect URI/app-link/universal-link validation
- CORS allowlist by environment
- security headers for web
- brute-force and unusual access-event telemetry through identity-provider integration
- step-up/MFA requirement for privileged actions
- prevention of role escalation by tenant administrators
- prevention of self-approval when SoD requires another actor
- no platform role assignment through tenant-admin endpoints
- protection against insecure direct object reference across all APIs
- safe error responses that do not enumerate identities or tenants

Update the threat model with tenant escape, confused deputy, forged tenant header, IDOR, role escalation, invitation theft, stale permissions, pooled-connection context leak, support abuse, mobile token theft, deep-link hijacking, and offline-cache leakage.

## 11. Testing requirements

Add comprehensive automated tests:

### Backend unit and architecture tests

- lifecycle transitions
- permission/scope evaluation
- SoD validation
- context selection/invalidation
- module boundaries

### PostgreSQL/Testcontainers tests

- schema constraints and indexes
- RLS read/write/delete isolation
- missing context behavior
- pooled connection leakage
- tenant-scoped uniqueness
- optimistic locking
- migration from clean database

### API/security tests

- valid and invalid OIDC claim mapping using safe fixtures
- cross-tenant IDOR attempts
- out-of-scope campus/department access
- client-forged tenant/context attempts
- platform versus tenant administrator boundaries
- invitation replay and expiry
- role-escalation and self-approval attempts
- suspended membership/tenant
- expired and revoked support access
- session revocation
- RFC 7807 and stable errors
- pagination limits

### Web tests

- component/accessibility tests
- role/permission administration
- context switch
- support-access approval/revoke
- unauthorized/suspended/no-membership states
- Playwright critical path for a multi-institution user and tenant administrator

### Android/iOS tests

- sign-in callback abstraction
- secure-storage adapter contracts
- context/role switch
- tenant cache partition/purge
- revoked session and forced reauthentication
- expired/offline authentication
- deep-link guard
- tenant-admin access review and support-access action
- at least one Appium/Maestro-ready critical journey on Android and iOS

Do not claim iOS execution passed unless it ran on a valid macOS simulator/device environment. Report unavailable execution evidence honestly.

## 12. Documentation

Update or create:

- OpenAPI specification
- tenant and identity data dictionary
- organization hierarchy model
- permission catalog and naming standard
- role/scope evaluation specification
- RLS design and runtime connection strategy
- OIDC/web/mobile authentication flow diagrams
- session/device management design
- support-access procedure and runbook
- tenant suspension/offboarding behavior
- threat model
- ADRs for identity provider boundary, RBAC/scope model, RLS context, and mobile authentication
- administrator guide
- mobile role-feature matrix
- local test identity setup with explicit production safeguards
- troubleshooting guide

## 13. Required verification commands

Run and report actual results for:

- full backend formatting/static checks, compile, unit, architecture, and Testcontainers integration tests
- Flyway migration from an empty PostgreSQL database
- explicit RLS/tenant-isolation suite
- web lint, typecheck, unit/component/accessibility tests, production build, and relevant Playwright tests
- mobile lint, TypeScript, unit/component tests, Android build/smoke and mobile E2E available in the environment
- iOS build/test only on valid macOS infrastructure; otherwise document exact pending command and status
- secret/dependency/security scans configured by Prompt 00
- OpenAPI generation/validation and client contract drift checks

Fix all failures within this prompt's scope. Do not hide skipped tests. Explain environmental skips.

## 14. Completion gate

This prompt passes only when:

1. A platform-authorized user can provision an isolated tenant and organization hierarchy.
2. An invited user can accept membership exactly once.
3. One user can hold multiple memberships and switch only among authorized contexts.
4. Roles and permissions are scoped and evaluated by the backend.
5. Tenant administrators cannot grant platform privileges or escape authorized scope.
6. Tenant A cannot read, change, or delete Tenant B data at both application and PostgreSQL RLS layers.
7. Missing tenant context fails closed.
8. Pooled database connections do not leak tenant context.
9. Role/membership changes invalidate or constrain stale access.
10. Temporary/support access is tenant-approved, time-bound, revocable, visible, and audited.
11. Web, Android, and iOS have real authentication/context/session experiences connected to actual APIs.
12. Mobile cache is partitioned and purged correctly.
13. All security-sensitive actions are audited without leaking secrets.
14. OpenAPI, ADRs, threat model, runbooks, and role matrix match the implementation.
15. All environment-available tests and builds pass.

At completion, provide this exact report structure:

1. Summary of what was implemented
2. Files added or changed
3. Database migrations added
4. APIs added or changed
5. Web interfaces implemented
6. Android interfaces and test status
7. iOS interfaces and test status
8. Tenant-isolation, authorization, and RLS controls
9. Audit and support-access controls
10. Tests added and exact results
11. Commands run and exit status
12. ADRs, documentation, and runbooks updated
13. Known limitations, environment gaps, or deferred items
14. Manual verification steps
15. Suggested commit message
16. Explicit statement: `Completion gate: PASSED` or `Completion gate: FAILED`

Suggested commit message:

`feat(identity): implement tenancy organization identity and scoped RBAC`

Stop after the report. Do not begin Prompt 02 or implement students, employees, curricula, examinations, finance, or other business modules.
```

---

## Review Checklist Before Prompt 02

- Tenant context is derived from authenticated membership—not a client-trusted header.
- PostgreSQL RLS and application predicates both protect tenant-owned tables.
- Connection-pool context leakage is tested.
- Tenant administrators cannot assign platform roles.
- Support access requires tenant approval and expires automatically.
- Web, Android, and iOS use real context/session APIs.
- Mobile data is partitioned by user and tenant and purged appropriately.
- Every access change is audited without logging secrets.
- No academic/student business modules were prematurely built.
- The completion gate passed and the changes were manually reviewed.

Do not continue to Prompt 02 until these conditions pass.

