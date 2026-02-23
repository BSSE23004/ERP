import { createContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on app mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.data);
        setIsAuth(true);
        setError(null);
      } catch (err) {
        setIsAuth(false);
        setUser(null);
        // 401 is expected if not logged in, not an error
        if (err.response?.status !== 401) {
          setError(err.response?.data?.error || "Failed to check session");
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(username, password);
      setUser(response.data.user);
      setIsAuth(true);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed";
      setError(errorMessage);
      setIsAuth(false);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authAPI.logout();
    } catch (err) {
      // Don't show error for logout failures - just clear state
      // 403 is expected if session is already expired
      console.warn("Logout completed (or session already expired)");
    } finally {
      // Always clear state on logout attempt, success or fail
      setUser(null);
      setIsAuth(false);
      setError(null);
      setLoading(false);
    }
  };

  const value = {
    isAuth,
    user,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
