# identity-access

**Status: not implemented.** This module is an intentionally empty, compiling skeleton
in this foundation prompt — package-info, one placeholder marker class, and this
README. Do not treat anything in this module as a working feature.

## Why it exists now

The module graph and its ArchUnit boundary tests (`app/src/test/.../ModuleBoundaryTest.java`)
need every module present to be complete and testable, even before its real domain
model ships (docs/architecture/MODULE_BOUNDARIES.md). Deferring the module entirely
would leave the dependency graph and cross-module boundary rules unverified.

## Deferred to a later prompt

Authentication (password, OTP, passkey-ready, institutional SSO), authorization/RBAC
scoped by institution/campus/department/program/batch/section/course/examination,
sessions, MFA for privileged roles, login history, guest accounts, and platform-support
access controls (PRD §7, FR-IAM-001 through FR-IAM-010).

## Rules this module will be most responsible for upholding, once built

Constitution rules 1, 2, 3, 4 (tenant isolation and scoping), 5 (versioned/contract
tested APIs), 9 (separation of duties), 19 (mobile nav is not authorization).

## Explicitly out of scope right now

No user, session, membership, role, or permission table/entity exists. Do not add one
without a dedicated prompt/ADR for the identity-access domain model.
