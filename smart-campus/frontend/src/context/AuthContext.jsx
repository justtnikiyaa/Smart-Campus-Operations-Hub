import { createContext, useEffect, useMemo, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext(null);

function mapBackendUser(me) {
  if (!me) return null;

  const role = me.roles?.includes("ADMIN") ? "ADMIN" : "USER";
  return {
    id: me.id,
    email: me.email,
    fullName: me.fullName,
    pictureUrl: me.pictureUrl,
    role
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: 1,
    email: "local@smartcampus.com",
    fullName: "Local Admin",
    pictureUrl: "",
    role: "ADMIN"
  });
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const refreshCurrentUser = async () => {
    return user;
  };

  useEffect(() => {
    // Disabled authentication bootstrap for local UI testing
    // bootstrap();
  }, []);

  const loginWithGoogle = () => authService.loginWithGoogle();

  const finalizeOAuthLogin = async () => {
    const current = await refreshCurrentUser();
    setIsAuthLoading(false);
    return current;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setIsAuthLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      role: user?.role || null,
      isAuthenticated: Boolean(user),
      isAuthLoading,
      loginWithGoogle,
      finalizeOAuthLogin,
      refreshCurrentUser,
      logout
    }),
    [user, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
