# Mobile Role/Feature Matrix

**Status:** foundation stage. Every row's "Implementation status" is honestly
"not implemented" — this document exists to track the intended shape of each
role's mobile surface, not to claim any of it is built (constitution rule 13:
no stub is ever presented as complete).

**Navigation is not authorization** (constitution rule 19; ADR-007). The
"Planned mobile surface" and "Mobile-first actions" columns describe what the
mobile *navigation shell* will show for a role once real features are built —
they are never a substitute for, or a description of, server-side
authorization. Every backend authorization rule applies identically
regardless of whether a client is the web app, Android, or iOS
(`mobile/src/navigation/RoleAwareNavigator.tsx` documents this at the code
level). "Offline policy" only ever refers to the allowlist mechanism in
`mobile/src/offline/offlineCache.ts` (ADR-008, constitution rule 20) — a data
type is cacheable on-device only if explicitly listed there, and confidential
question papers, hidden grading tests, raw payment credentials, and secrets
are permanently excluded regardless of role.

| Role | Planned mobile surface | Mobile-first actions | Web-first restrictions (if any) | Offline policy | Sensitive-data rules | Implementation status |
|---|---|---|---|---|---|---|
| Group Chairman/Management | Cross-institution dashboards, approvals | Approve high-level requests on the go | Deep multi-campus analytics likely stay web-first | No offline cache allowlisted yet | No confidential data cached; approvals always call backend authorization | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Principal/Director | Institution dashboards, approvals, escalations | Approve/escalate from mobile | Bulk configuration likely stays web-first | No offline cache allowlisted yet | Same as above | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Dean Academics | Academic oversight, curriculum approvals | Review/approve academic items | Detailed curriculum authoring likely stays web-first | No offline cache allowlisted yet | Same as above | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Controller of Examinations | Exam governance dashboard, publication approvals | Approve exam workflow steps requiring separation of duties (constitution rule 9) | Question-paper setting/moderation stays web-first (never cached/rendered as a mobile offline artifact) | No offline cache allowlisted yet; question papers are never allowlisted (constitution rule 20) | Confidential exam content never touches mobile local storage | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Examination Branch Staff | Exam logistics tasks, hall-ticket/attendance support | Field data entry (attendance, seating) | Result computation/publication stays web-first | No offline cache allowlisted yet | Same as above | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Head of Department | Department dashboards, approvals | Approve department-level requests | Departmental configuration stays web-first | No offline cache allowlisted yet | No confidential data cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Program Coordinator | Program-level scheduling/monitoring | Review schedules, flag issues | Program setup/configuration stays web-first | No offline cache allowlisted yet | No confidential data cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Faculty | Timetable, attendance marking, grading input | Mark attendance, submit marks/grades (subject to human-approval workflow, constitution rule 14) | Grade finalization/publication stays web-first | Own published timetable is the first allowlisted candidate (not yet added — allowlist currently empty of real usage) | Hidden grading test cases/answer keys never cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Mentor/Counselor | Mentee overview, session notes | Log mentoring session notes on the go | Sensitive counseling records likely stay web-first/restricted | No offline cache allowlisted yet | Sensitive student welfare data never cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Student | Own timetable, attendance, results view, fee status | View own published timetable/results, receive notifications | Fee payment entry of raw card/bank details stays web-first (and even there, never stored client-side) | `own_published_timetable` is the first allowlisted data type (ADR-008) | Raw payment credentials, hidden test content never cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Parent/Guardian | Ward's academic/attendance summary | View ward's published info, receive notifications | Same restrictions as Student for ward data | No offline cache allowlisted yet | Same sensitive-data rules as Student's data about the ward | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Admissions Team | Applicant pipeline, document verification tasks | Capture/verify applicant documents via camera capture stub | Bulk admission configuration stays web-first | No offline cache allowlisted yet | Applicant PII never cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Finance Team | Fee/collections dashboard | Field collection acknowledgement (never raw card/bank capture) | Payment gateway/reconciliation stays web-first | No offline cache allowlisted yet | Raw payment/bank credentials never cached (constitution rule 20) | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| HR Team | Staff directory, leave approvals | Approve leave/requests on the go | Payroll processing stays web-first | No offline cache allowlisted yet | Staff PII never cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Placement Officer | Drive schedule, employer coordination | Track drive schedule, notify students | Offer/contract management stays web-first | No offline cache allowlisted yet | No confidential data cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Trainer | Session schedule, attendance for training sessions | Mark training attendance | Curriculum/content authoring stays web-first | No offline cache allowlisted yet | No confidential data cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Librarian | Circulation tasks, QR/barcode-based checkouts | Scan book barcodes via QR/barcode scanner stub | Catalog administration stays web-first | No offline cache allowlisted yet | No confidential data cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Hostel/Transport/Admin Staff | Passes, occupancy, transport tracking | Scan passes, log occupancy/transport events | Facility configuration stays web-first | No offline cache allowlisted yet | Location data only via explicit permission (authorizedLocation stub); never cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Accreditation/IQAC Coordinator | Evidence collection, compliance checklists | Capture evidence documents on the go | Accreditation report authoring stays web-first | No offline cache allowlisted yet | No confidential data cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Employer/Recruiter | Candidate shortlist, drive schedule | Review shortlists, confirm drive slots | Contract/offer management stays web-first | No offline cache allowlisted yet | Candidate PII never cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| External Examiner/Evaluator | Evaluation task list | Submit evaluation scores (subject to human-approval workflow) | Question paper/hidden test access stays web-first and is never cached (constitution rule 20) | No offline cache allowlisted yet; evaluation content never allowlisted | Confidential evaluation content never cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |
| Platform Super Administrator | Tenant/institution administration | Approve urgent admin actions on the go | Full tenant configuration stays web-first | No offline cache allowlisted yet | No confidential data cached | Not implemented — navigation stub only (RoleHomeScreen placeholder) |

## Non-negotiables this table upholds

- No role is ever marked "complete" in this foundation prompt.
- No confidential question paper, hidden grading test case, raw payment
  credential, secret, or institution-flagged non-cacheable category may ever
  be added to `mobile/src/offline/offlineCache.ts`'s allowlist, for any role
  (constitution rule 20, ADR-008).
- Every entry in the "Planned mobile surface" / "Mobile-first actions"
  columns is a UX plan, not a security boundary (constitution rule 19).
