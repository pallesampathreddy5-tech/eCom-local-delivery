import { createContext, useContext, useMemo, useState } from "react";
import { loginRequest, logoutRequest } from "../api/authService";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "localbasket_auth_user";
const ACCESS_TOKEN_KEY = "localbasket_access_token";

const loadStoredUser = () => {
  try {
    const value = localStorage.getItem(AUTH_STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadStoredUser);

  const login = async ({ loginId, password, role }) => {
    const response = await loginRequest({ loginId, password, role });
    const safeUser = response.data.user;
    const accessToken = response.data.accessToken;

    setUser(safeUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

    return { success: true, user: safeUser };
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      // no-op because local logout should still happen
    }

    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  };

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
