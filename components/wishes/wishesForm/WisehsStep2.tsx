import Button from '@/components/common/button';
import Calendar from '@/components/common/calendar/calendar';
import Input from '@/components/common/input/input';
import InputContainer from '@/components/common/input/inputContainer';
import TextareaBox from '@/components/common/input/textareaBox';
import { TODAY } from '@/constant/dateList';
import { LIMIT_TEXT } from '@/constant/limitText';
import { CalendarGreyIc, CalendarIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import { WishesDataInputType } from '@/types/common/input/wishesInput';
import { getDate } from '@/utils/common/getDate';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import styled from 'styled-components';

interface WishesStep2Props {
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
  handleNextStep: () => void;
}

export default function WishesStep2(props: WishesStep2Props) {
  const { methods, handleNextStep } = props;

  const [startDate, setStartDate] = useState(getDate(TODAY, 0));
  const [endDate, setEndDate] = useState(getDate(startDate, 7));

  useEffect(() => {
    setEndDate(getDate(startDate, 7));
  }, [startDate]);

  const changeStartDate = (value: Date) => {
    setStartDate(value);
  };

  const nextStep = () => {
    //아이템 데이터의 유효성 정보에 대한 체크 조건 추가해야됨

    handleNextStep();
  };

  return (
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
              date={startDate}
              changeStartDate={changeStartDate}
              calendarIcon={CalendarIc}
              readOnly={false}
            />

            {/* 종료일 */}

            <Calendar date={endDate} calendarIcon={CalendarGreyIc} readOnly={true} />
          </Styled.CalendarWrapper>
        </InputContainer>
      </div>

      <Styled.ButtonWrapper>
        <Button boxType="btn--large" colorSystem="mainBlue_white" handleClickFn={nextStep}>
          소원링크 생성 완료!
        </Button>
      </Styled.ButtonWrapper>
    </Styled.Container>
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
  `,

  ButtonWrapper: styled.div`
    margin-bottom: 4.6rem;
  `,
};
