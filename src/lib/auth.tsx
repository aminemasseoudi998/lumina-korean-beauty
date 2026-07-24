import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (data: User & { password: string }) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "wglow-session";
const USERS_KEY = "wglow-users";

type StoredUser = User & { password: string };

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* ignore */
  }
}

// NOTE: This is a front-end-only demo auth (no server). Credentials live in
// localStorage and are not secure — replace with a real backend before production.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persistSession = useCallback((u: User | null) => {
    setUser(u);
    try {
      if (u) window.localStorage.setItem(SESSION_KEY, JSON.stringify(u));
      else window.localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const register = useCallback<AuthContextValue["register"]>(
    (data) => {
      const users = readUsers();
      if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
        return { ok: false, error: "Un compte existe déjà avec cet e-mail." };
      }
      writeUsers([...users, data]);
      const { password: _pw, ...safe } = data;
      void _pw;
      persistSession(safe);
      return { ok: true };
    },
    [persistSession],
  );

  const login = useCallback<AuthContextValue["login"]>(
    (email, password) => {
      const users = readUsers();
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!found || found.password !== password) {
        return { ok: false, error: "E-mail ou mot de passe incorrect." };
      }
      const { password: _pw, ...safe } = found;
      void _pw;
      persistSession(safe);
      return { ok: true };
    },
    [persistSession],
  );

  const logout = useCallback(() => persistSession(null), [persistSession]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, ready, login, register, logout }),
    [user, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
