import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    handleToggle,
  };
}
