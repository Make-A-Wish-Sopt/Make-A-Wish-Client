import { useState, useCallback } from 'react';

export interface BooleanHookType {
  state: boolean;
  changeState: (state: boolean) => void;
  handleState: () => void;
}

export default function useBoolean(init = false): BooleanHookType {
  const [state, setState] = useState(init);

  const handleState = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  const changeState = useCallback((newState: boolean) => {
    setState(newState);
  }, []);

  return { state, handleState, changeState };
}
