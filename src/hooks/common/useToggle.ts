'use client';

import { useState } from 'react';

export interface ToggleHookType {
  state: boolean;
  changeState: (state: boolean) => void;
  handleState: () => void;
}

export default function useToggle(init?: boolean): ToggleHookType {
  const [state, setState] = useState(init === undefined ? false : init);

  const handleState = () => {
    setState(!state);
  };

  const changeState = (state: boolean) => {
    setState(state);
  };

  return {
    state,
    handleState,
    changeState,
  };
}
