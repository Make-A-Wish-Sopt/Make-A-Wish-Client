import { useState } from 'react';

export default function useToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const changeOpenState = (state: boolean) => {
    setIsOpen(state);
  };

  return {
    isOpen,
    handleToggle,
    changeOpenState,
  };
}
