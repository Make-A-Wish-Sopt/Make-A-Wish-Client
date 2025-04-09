import ModalPortal from '@/layouts/ModalPortal';
import { createContext, PropsWithChildren, useContext } from 'react';

type ModalContextType<T extends string[]> = {
  // modalKeys: T;
};

const ModalContext = createContext<ModalContextType<string[]> | undefined>(undefined);

export function ModalContextProvider<T extends string[]>({ children }: PropsWithChildren) {
  return (
    <ModalContext.Provider value={{}}>
      <ModalPortal>{children}</ModalPortal>
    </ModalContext.Provider>
  );
}

export function useModalContext<T extends string[]>() {
  const context = useContext(ModalContext) as ModalContextType<T> | undefined;
  if (!context) {
    throw new Error('useModalContext must be used within a ModalContextProvider');
  }
  return context;
}

export default ModalContext;
