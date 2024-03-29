import Calendar from '@/components/Common/Calendar/Calendar';
import Input from '@/components/Common/Input/Input';
import InputContainer from '@/components/Common/Input/InputContainer';
import TextareaBox from '@/components/Common/Input/TextareaBox';
import { LIMIT_TEXT } from '@/constant/limitText';
import { WishesDataInputType } from '@/types/wishesType';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import styled from 'styled-components';
import WishesStepTitle from '../Common/WishesStepTitle';
import WishesStepBtn from '../Common/WishesStepBtn';
import { ColorSystemType } from '@/types/common/box/boxStyleType';
import InputLength from '@/components/Common/Input/InputLength';

interface WishesStep2Props {
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
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
}

export default function WishesStep2(props: WishesStep2Props) {
  const { methods, wishesStep } = props;

  useEffect(() => {
    if (
      methods.getValues('title') &&
      methods.getValues('title').length <= 20 &&
      methods.getValues('hint').length !== 0 &&
      methods.getValues('hint').length <= 300
    ) {
      wishesStep.changeNextState(true);
    } else {
      wishesStep.changeNextState(false);
    }
  }, [methods.watch()]);

  return (
    <>
      <WishesStepTitle title="소원링크 생성하기" />
      <Styled.Container>
        <div>
          <InputContainer title="소원 링크 제목 작성하기">
            <Input
              boxType="inputBox--large"
              placeholder="ex. ㅇㅇ이의 앙큼 벌스데이"
              register={methods.register('title')}
            >
              <InputLength
                inputLength={methods.watch('title').length}
                limitLength={LIMIT_TEXT[20]}
              />
            </Input>
          </InputContainer>

          <InputContainer title="선물에 대한 힌트 자유롭게 적어보기">
            <TextareaBox
              placeholder="ex. 내가 이 물건 자주 언급했는데...기억나지?ㅋㅋ"
              inputLength={methods.watch('hint').length}
              limitLength={LIMIT_TEXT.DESCRIPTION}
              register={methods.register('hint')}
            />
          </InputContainer>

          <InputContainer title="내 생일주간 설정하기">
            <Styled.CalendarWrapper>
              {/* 시작일 */}
              <Calendar date={methods.getValues('startDate')} methods={methods} />
              {/* 종료일 */}
              <Calendar date={methods.getValues('endDate')} methods={methods} readOnly />
            </Styled.CalendarWrapper>
          </InputContainer>
        </div>

        <WishesStepBtn wishesStep={wishesStep} />
      </Styled.Container>
    </>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100svh;
  `,

  CalendarWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.6rem;

    width: 100%;
  `,

  ButtonWrapper: styled.div`
    margin-bottom: 4.6rem;
  `,
};
