import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // children= react Node
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
