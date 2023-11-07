import { useState } from 'react';

export default function useWishesStep() {
  const [stepIndex, setStepIndex] = useState(4);

  const handleNextStep = () => {
    setStepIndex((prev) => (prev += 1));
  };

  const handlePrevStep = () => {
    setStepIndex((prev) => (prev -= 1));
  };

  return { stepIndex, handleNextStep, handlePrevStep };
}
