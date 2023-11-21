// context.js
import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  const updateValeurDuContexte = (nouvelleValeur) => {
    setAuthState(nouvelleValeur);
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
