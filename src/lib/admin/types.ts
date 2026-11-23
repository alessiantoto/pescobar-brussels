/** Shared admin-side types. Server AND client safe (no server-only imports). */

export type AdminRole = 'super_admin' | 'admin' | 'staff';

export interface AdminSession {
  email: string;
  role: AdminRole;
  fullName: string | null;
}

/** Every Server Action returns this instead of throwing, so the UI can toast the message. */
export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function ok<T>(data: T): ActionResult<T>;
export function ok(): ActionResult<undefined>;
export function ok<T>(data?: T): ActionResult<T | undefined> {
  return { ok: true, data };
}

export function fail(error: string): { ok: false; error: string } {
  return { ok: false, error };
}

/** staff < admin < super_admin */
export const ROLE_RANK: Record<AdminRole, number> = {
  staff: 1,
  admin: 2,
  super_admin: 3,
};

export function roleAtLeast(role: AdminRole, min: AdminRole): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[min];
}

