import Calendar from '@/components/common/calendar/calendar';
import Input from '@/components/common/input/input';
import InputContainer from '@/components/common/input/inputContainer';
import TextareaBox from '@/components/common/input/textareaBox';
import { LIMIT_TEXT } from '@/constant/limitText';
import { CalendarGreyIc, CalendarIc } from '@/public/assets/icons';
import { WishesDataInputType } from '@/types/common/input/wishesInput';
import { getDate } from '@/utils/common/getDate';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import styled from 'styled-components';
import WishesStepTitle from '../common/wishesStepTitle';
import WishesStepBtn from '../common/wishesStepBtn';
import { ColorSystemType } from '@/types/common/box/boxStyleType';

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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(getDate(startDate, 7));

  useEffect(() => {
    setEndDate(getDate(startDate, 7));
  }, [startDate]);

  useEffect(() => {
    if (
      methods.getValues('title') &&
      methods.getValues('hint').length !== 0 &&
      methods.getValues('hint').length <= 300
    ) {
      wishesStep.changeNextState(true);
    } else {
      wishesStep.changeNextState(false);
    }
  }, [methods.watch()]);

  const changeStartDate = (value: Date) => {
    setStartDate(value);
  };

  const onSubmit = () => {};

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <WishesStepTitle title="소원링크 생성하기" />
      <Styled.Container>
        <div>
          <InputContainer title="소원 링크 제목 작성하기">
            <Input placeholder="ex. ㅇㅇ이의 앙큼 벌스데이" register={methods.register('title')} />
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
              <Calendar
                date={methods.getValues('startDate')}
                methods={methods}
                colorSystem="pastelBlue_darkBlue"
              />
              {/* 종료일 */}
              <Calendar
                date={methods.getValues('endDate')}
                colorSystem="pastelBlue_gray2"
                disable
              />
            </Styled.CalendarWrapper>
          </InputContainer>
        </div>

        <WishesStepBtn wishesStep={wishesStep} />
      </Styled.Container>
    </form>
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
