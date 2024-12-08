import { useState } from 'react';

export default function useToggle(init?: boolean) {
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
