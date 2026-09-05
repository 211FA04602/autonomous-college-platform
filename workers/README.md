# Workers

Placeholder only. No worker is implemented yet — see ADR-001.

A workload is promoted from an in-monolith module to a standalone worker service here only when it demonstrably needs **independent scaling or isolation** the modular monolith can't reasonably provide, e.g.:

- A bulk/batch job (mass result recomputation, large-cohort report generation) whose resource profile would starve interactive API traffic if run in-process.
- A workload needing a different runtime/isolation boundary than the main app (e.g., untrusted document/OCR processing).
- A consumer that needs to scale independently of API request volume (e.g., high-volume notification fan-out).

Until one of those is real, this directory stays empty of implementation to avoid premature microservices (constitution rule 18, ADR-001).
