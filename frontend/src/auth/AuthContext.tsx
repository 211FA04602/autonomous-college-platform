import { createContext, useContext, useMemo, type ReactNode } from "react";

export type AuthStatus = "unauthenticated" | "authenticating" | "authenticated";

/** Shape identity-access is expected to eventually provide (see ADR-005). */
export interface AuthenticatedUser {
  id: string;
  displayName: string;
  email: string;
  roles: string[];
}

export interface AuthContextValue {
  user: AuthenticatedUser | null;
  status: AuthStatus;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * NOT YET WIRED UP.
 *
 * This provider is a placeholder until the identity-access backend module
 * and its endpoints ship (tracked for a later prompt). Per constitution
 * rules 13 and 19:
 *   - it never fabricates a logged-in user or a successful auth state;
 *   - `status` is always "unauthenticated" and `user` is always `null`;
 *   - it never bypasses an authorization check — there is nothing to
 *     bypass, because no page in this app treats being "logged in" as a
 *     security boundary yet. Real authorization always happens on the
 *     backend, identically for every client (constitution rule 19).
 *   - `login()`/`logout()` are stub handlers that log a warning instead of
 *     silently no-op'ing, so accidental premature use is loud, not silent
 *     (constitution rule 13: no fake integration presented as complete).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AuthContextValue>(
    () => ({
      user: null,
      status: "unauthenticated",
      login: () => {
        console.warn(
          "[AuthContext] login() called, but identity-access is not wired up yet. This is a placeholder — see docs/architecture/ADR-005-react-web-architecture.md.",
        );
      },
      logout: () => {
        console.warn(
          "[AuthContext] logout() called, but identity-access is not wired up yet. This is a placeholder.",
        );
      },
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
