import { ColorSystemType } from '@/types/common/box/boxStyleType';
import { useEffect, useState } from 'react';

export default function useWishesStep() {
  const [stepIndex, setStepIndex] = useState(2);
  const [prevState, setPrevState] = useState(false);
  const [nextState, setNextState] = useState(false);

  useEffect(() => {
    if (stepIndex === 1) {
      setPrevState(false);
    } else {
      setPrevState(true);
    }
  }, [stepIndex]);

  const handleNextStep = () => {
    if (stepIndex < 4) {
      setStepIndex((prev) => (prev += 1));
    }
  };

  const handlePrevStep = () => {
    if (stepIndex > 1) {
      setStepIndex((prev) => (prev -= 1));
    }

    if (stepIndex === 2) {
      setPrevState(false);
    }
  };

  const changePrevState = (state: boolean) => {
    setPrevState(state);
  };

  const changeNextState = (state: boolean) => {
    setNextState(state);
  };

  const getNextBtnColor = (state: boolean): ColorSystemType => {
    return state ? 'mainBlue_white' : 'gray1_white';
  };

  const getPrevBtnColor = (state: boolean): ColorSystemType => {
    return state ? 'pastelBlue_mainBlue' : 'gray1_white';
  };

  return {
    stepIndex,
    prevState,
    nextState,
    changePrevState,
    changeNextState,
    handleNextStep,
    handlePrevStep,
    getNextBtnColor,
    getPrevBtnColor,
  };
}
