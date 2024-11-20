import { useState } from 'react';

export default function useToggle() {
  const [state, setState] = useState(false);

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
