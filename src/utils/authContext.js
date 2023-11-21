import { createContext, useState } from "react";

export const AuthContext = createContext("");

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = useState();

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}