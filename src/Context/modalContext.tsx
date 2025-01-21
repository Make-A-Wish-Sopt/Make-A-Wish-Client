import { createContext, PropsWithChildren, useContext, useState } from 'react';

type ModalContextType<T> = {
  state: T;
  update: (newState: T) => void;
};

const ModalContext = createContext<ModalContextType<any>>({
  state: null,
  update: () => {},
});

export function ModalContextProvider<T>({ init, children }: { init: T } & PropsWithChildren) {
  const [state, update] = useState<T>(init);
  return <ModalContext.Provider value={{ state, update }}>{children}</ModalContext.Provider>;
}

export default ModalContext;

export function useModalContext<T>() {
  const context = useContext<ModalContextType<T>>(ModalContext);
  if (!context) throw new Error('ModalContextType must be used within MainProvider');
  return context;
}

//
