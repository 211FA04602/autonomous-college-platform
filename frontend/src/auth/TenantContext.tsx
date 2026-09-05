import { createContext, useContext, useMemo, type ReactNode } from "react";

export type TenantStatus = "unresolved" | "resolving" | "resolved";

/**
 * A resolved tenant membership. Per constitution rule 2, the tenant a
 * request operates against is derived server-side from the authenticated
 * principal's verified membership — never from client state — so this
 * object is a read-only reflection of what the backend has already
 * authorized, not something the client can set to switch tenants on its
 * own authority.
 */
export interface TenantMembership {
  tenantId: string;
  tenantName: string;
  institutionId?: string;
  campusId?: string;
  roles: string[];
}

export interface TenantContextValue {
  tenant: TenantMembership | null;
  status: TenantStatus;
  /**
   * Requests the backend resolve/switch the active tenant context for a
   * user with more than one membership. This only ever requests a switch —
   * the backend authorizes and resolves it server-side (constitution
   * rules 1 & 2); it is not a client-trusted tenant identifier.
   */
  requestTenantSwitch: (tenantId: string) => void;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

/**
 * NOT YET WIRED UP.
 *
 * Placeholder provider until identity-access/tenant-resolution endpoints
 * ship. `status` is always "unresolved" and `tenant` is always `null` — no
 * tenant scope is fabricated client-side (constitution rules 1, 2, 13).
 * Any feature that needs a resolved tenant must treat `status !==
 * "resolved"` as "cannot render tenant-scoped data yet", not as an error to
 * work around.
 */
export function TenantProvider({ children }: { children: ReactNode }) {
  const value = useMemo<TenantContextValue>(
    () => ({
      tenant: null,
      status: "unresolved",
      requestTenantSwitch: () => {
        console.warn(
          "[TenantContext] requestTenantSwitch() called, but tenant resolution is not wired up yet. This is a placeholder.",
        );
      },
    }),
    [],
  );

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant(): TenantContextValue {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
