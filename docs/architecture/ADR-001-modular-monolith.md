# ADR-001: Modular monolith for core transactional domains

**Status:** Accepted
**Date:** 2026-09-05
**Upholds constitution rules:** 17, 18

## Context

The platform covers twelve product pillars (PRD §4.2) — academics, examinations, OBE/accreditation, student lifecycle, faculty, fees, LMS, programming labs, placements, library/hostel/transport, communication, analytics — most of which need strongly consistent transactions with each other (e.g., a result publication touches examinations, student progression, and audit in one logical operation). Splitting these into independently deployed services from day one would force distributed transactions or eventual consistency onto operations that are naturally ACID, before there is any concrete scaling or isolation need driving that cost.

## Decision

Core transactional domains ship as **one deployable modular monolith**: a Gradle multi-module Spring Boot application (`backend/app` as the composition root) with strict module boundaries enforced by ArchUnit (`docs/architecture/MODULE_BOUNDARIES.md`). A module may depend on another module's published public API package, never its internal packages or its database tables directly. Cross-module domain events go through the transactional outbox (ADR-004), not direct in-process calls that assume shared transactional state across module ownership lines.

Independently deployable **worker services** (`workers/`) are introduced only for workloads that need independent scaling or isolation — e.g., a future bulk-result-processing job, a heavy document/OCR pipeline, or a notification-fanout worker. No worker is implemented speculatively; `workers/` currently contains placeholders and a README describing the criteria for promoting a workload out of the monolith.

## Consequences

- One build, one deployable artifact, one transaction manager for the core system — simpler operations and stronger consistency guarantees while the product is establishing its domain model.
- Module boundaries must be actively enforced (ArchUnit), or the monolith degrades into an undifferentiated ball of mud. This is treated as a build-breaking check, not a style suggestion.
- Extracting a module into its own service later is a deployment change (the module boundary already exists) rather than a rewrite, *if* the boundary discipline holds.

## Addendum: Spring Boot 3.x vs 4.x

Product direction specifies Java 21 and "current stable Spring Boot 3.x." As of 2026-09, Spring Boot's 3.x line has exited open-source community support (last OSS patch 3.5.16); Spring Boot 4.x is the actively supported major version. This ADR follows the explicit product direction and pins **Spring Boot 3.5.16** as the newest available 3.x release, while recording this as a known, deliberate deviation from "actually current" — see `docs/engineering/CONSTITUTION.md` → "Known, documented deviation." Upgrading to 4.x should be revisited before production go-live and is out of scope for this foundation prompt.
