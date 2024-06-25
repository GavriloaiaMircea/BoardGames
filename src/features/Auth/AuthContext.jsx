import { createContext, useContext } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";

export const AuthContext = createContext(null);

const initialAuthValue = {
  accessToken: null,
  user: null,
}

export function AuthContextProvider({children}) {
  const [auth, setAuth] = useLocalStorageState('auth', initialAuthValue);

  function login(authInfo) {
    setAuth(authInfo);
  }

  function logout() {
    setAuth(initialAuthValue);
  }

  return (
    <AuthContext.Provider value={{...auth, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if(ctx === null) {
    throw new Error('The hook useAuthContext needs to be used in a component that is a child of AuthContextProvider.');
  }
  return ctx;
}
