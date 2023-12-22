import styled from 'styled-components';
import Button from '../../Common/Button';
import { ColorSystemType } from '@/types/common/box/boxStyleType';

interface WishesStepBtnProps {
  wishesStep: {
    stepIndex: number;
    prevState: boolean;
    nextState: boolean;
    changePrevState: (state: boolean) => void;
    changeNextState: (state: boolean) => void;
    handleNextStep: () => void;
    handlePrevStep: () => void;
    getNextBtnColor: (state: boolean) => ColorSystemType;
    getPrevBtnColor: (state: boolean) => ColorSystemType;
  };

  handleClickFn?: () => void;
}

export default function WishesStepBtn(props: WishesStepBtnProps) {
  const { wishesStep, handleClickFn } = props;

  const handleNextClickFn = () => {
    if (handleClickFn) handleClickFn();
    wishesStep.handleNextStep();
  };

  return (
    <Styled.ButtonWrapper>
      <Button
        boxType="half"
        colorSystem={wishesStep.getPrevBtnColor(wishesStep.prevState)}
        handleClickFn={wishesStep.handlePrevStep}
      >
        이전
      </Button>
      <Button
        boxType="half"
        colorSystem={wishesStep.getNextBtnColor(wishesStep.nextState)}
        handleClickFn={handleNextClickFn}
      >
        {wishesStep.stepIndex < 4 ? '다음' : '링크 생성 완료!'}
      </Button>
    </Styled.ButtonWrapper>
  );
}

const Styled = {
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.6rem;

    margin-bottom: 4.6rem;
  `,
};
