'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

const AuthContext = createContext<any | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
