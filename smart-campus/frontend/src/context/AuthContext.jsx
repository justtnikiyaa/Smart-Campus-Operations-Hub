import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const users = {
  USER: { name: "User", email: "user@campus.edu", role: "USER" },
  ADMIN: { name: "Admin User", email: "admin@campus.edu", role: "ADMIN" }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginAs = (role) => setUser(users[role]);
  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      role: user?.role || null,
      isAuthenticated: Boolean(user),
      loginAs,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
