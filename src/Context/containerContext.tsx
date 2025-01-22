import { createContext, PropsWithChildren, useContext, useState } from 'react';

type ContainerContextType<T> = {
  state: T;
  update: (newState: T) => void;
};

const ContainerContext = createContext<ContainerContextType<any>>({
  state: null,
  update: () => {},
});

export function ContainerContextProvider<T>({ init, children }: { init: T } & PropsWithChildren) {
  const [state, update] = useState<T>(init);

  return (
    <ContainerContext.Provider value={{ state, update }}>{children}</ContainerContext.Provider>
  );
}

export default ContainerContext;

export function useContainerContext<T>() {
  const context = useContext<ContainerContextType<T>>(ContainerContext);
  if (!context) throw new Error('ContainerContext must be used within MainProvider');
  return context;
}

//
