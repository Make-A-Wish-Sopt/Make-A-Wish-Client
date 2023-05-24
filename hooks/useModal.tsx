import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const modalToggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    modalToggle,
  };
}
