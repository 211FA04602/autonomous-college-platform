/**
 * Every PRD role (docs/product/PRD.md §5) the mobile navigation shell must
 * be able to represent. Adding a role here is a navigation-shell change
 * only — it does NOT grant that role any backend permission (constitution
 * rule 19; see RoleAwareNavigator.tsx and
 * docs/mobile/ROLE_FEATURE_MATRIX.md).
 */
export type Role =
  | 'group_chairman_management'
  | 'principal_director'
  | 'dean_academics'
  | 'controller_of_examinations'
  | 'examination_branch_staff'
  | 'head_of_department'
  | 'program_coordinator'
  | 'faculty'
  | 'mentor_counselor'
  | 'student'
  | 'parent_guardian'
  | 'admissions_team'
  | 'finance_team'
  | 'hr_team'
  | 'placement_officer'
  | 'trainer'
  | 'librarian'
  | 'hostel_transport_admin_staff'
  | 'accreditation_iqac_coordinator'
  | 'employer_recruiter'
  | 'external_examiner_evaluator'
  | 'platform_super_administrator';

export const ALL_ROLES: readonly Role[] = [
  'group_chairman_management',
  'principal_director',
  'dean_academics',
  'controller_of_examinations',
  'examination_branch_staff',
  'head_of_department',
  'program_coordinator',
  'faculty',
  'mentor_counselor',
  'student',
  'parent_guardian',
  'admissions_team',
  'finance_team',
  'hr_team',
  'placement_officer',
  'trainer',
  'librarian',
  'hostel_transport_admin_staff',
  'accreditation_iqac_coordinator',
  'employer_recruiter',
  'external_examiner_evaluator',
  'platform_super_administrator',
] as const;

export const ROLE_LABELS: Record<Role, string> = {
  group_chairman_management: 'Group Chairman/Management',
  principal_director: 'Principal/Director',
  dean_academics: 'Dean Academics',
  controller_of_examinations: 'Controller of Examinations',
  examination_branch_staff: 'Examination Branch Staff',
  head_of_department: 'Head of Department',
  program_coordinator: 'Program Coordinator',
  faculty: 'Faculty',
  mentor_counselor: 'Mentor/Counselor',
  student: 'Student',
  parent_guardian: 'Parent/Guardian',
  admissions_team: 'Admissions Team',
  finance_team: 'Finance Team',
  hr_team: 'HR Team',
  placement_officer: 'Placement Officer',
  trainer: 'Trainer',
  librarian: 'Librarian',
  hostel_transport_admin_staff: 'Hostel/Transport/Admin Staff',
  accreditation_iqac_coordinator: 'Accreditation/IQAC Coordinator',
  employer_recruiter: 'Employer/Recruiter',
  external_examiner_evaluator: 'External Examiner/Evaluator',
  platform_super_administrator: 'Platform Super Administrator',
};
