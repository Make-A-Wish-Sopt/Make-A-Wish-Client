import { createContext, PropsWithChildren, useContext } from 'react';

type GlobalStateContextType = {};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateContextProvider = ({ children }: PropsWithChildren) => {
  return <GlobalStateContext.Provider value={{}}>{children}</GlobalStateContext.Provider>;
};

export default GlobalStateContext;

export const useMainContext = () => {
  const context = useContext(GlobalStateContext);
  if (!context) throw new Error('GlobalStateContext must be used within MainProvider');
  return context;
};
