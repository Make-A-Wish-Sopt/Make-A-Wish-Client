import { useState } from 'react';

export default function useToggle() {
  const [toggleState, setToggleState] = useState(false);

  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  const changeToggleState = (state: boolean) => {
    setToggleState(state);
  };

  return {
    toggleState,
    handleToggle,
    changeToggleState,
  };
}
