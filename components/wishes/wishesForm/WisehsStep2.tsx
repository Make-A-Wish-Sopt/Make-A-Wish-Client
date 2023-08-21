import BasicBox from '@/components/common/box/BasicBox';
import HalfBox from '@/components/common/box/HalfBox';
import Button from '@/components/common/button/button';
import Calendar from '@/components/common/calendar/calendar';
import InputBox from '@/components/common/input/inputBox';
import InputContainer from '@/components/common/input/inputContainer';
import TextareaBox from '@/components/common/input/textareaBox';
import { TODAY } from '@/constant/dateList';
import { LIMIT_TEXT } from '@/constant/limitText';
import useInput from '@/hooks/common/useInput';
import { CalendarGreyIc, CalendarIc } from '@/public/assets/icons';
import { WishesData } from '@/recoil/formPage/wishesData';
import theme from '@/styles/theme';
import { getDate } from '@/utils/common/getDate';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

interface WishesStep2Props {
  handleNextStep: () => void;
}

export default function WishesStep2(props: WishesStep2Props) {
  const { handleNextStep } = props;
  const [title, handleChangeTitle] = useInput('', LIMIT_TEXT[20]);
  const [hint, handleChangeHint] = useInput('', LIMIT_TEXT.DESCRIPTION);
  const [isNextStepAvailable, setIsNextStepAvailable] = useState(false);

  const [startDate, setStartDate] = useState(getDate(TODAY, 0));
  const [endDate, setEndDate] = useState(getDate(startDate, 7));

  const setWishesData = useSetRecoilState(WishesData);

  useEffect(() => {
    setEndDate(getDate(startDate, 7));
  }, [startDate]);

  useEffect(() => {
    title && hint ? setIsNextStepAvailable(true) : setIsNextStepAvailable(false);
  }, [title, hint]);

  const changeStartDate = (value: Date) => {
    setStartDate(value);
  };

  const nextStep = () => {
    //아이템 데이터의 유효성 정보에 대한 체크 조건 추가해야됨
    if (isNextStepAvailable) {
      handleNextStep();
      saveData();
    }
  };

  const saveData = () => {
    setWishesData((prev) => ({
      ...prev,
      title: title,
      hint: hint,
      startDate: startDate,
      endDate: endDate,
    }));
  };

  return (
    <>
      <InputContainer title="소원 링크 제목 작성하기">
        <InputBox
          placeholder="ex. ㅇㅇ이의 앙큼 벌스데이"
          handleChangeValue={handleChangeTitle}
          value={title}
          limitLength={LIMIT_TEXT[20]}
        />
      </InputContainer>

      <InputContainer title="선물에 대한 힌트 자유롭게 적어보기">
        <TextareaBox
          placeholder="ex. 내가 이 물건 자주 언급했는데...기억나지?ㅋㅋ"
          handleChangeValue={handleChangeHint}
          value={hint}
          limitLength={LIMIT_TEXT.DESCRIPTION}
        />
      </InputContainer>

      <InputContainer title="내 생일주간 설정하기">
        <Styled.CalendarWrapper>
          {/* 시작일 */}
          <HalfBox
            bgColor={theme.colors.pastel_blue}
            fontColor={theme.colors.dark_blue}
            borderColor={theme.colors.main_blue}
          >
            <Calendar
              date={startDate}
              changeStartDate={changeStartDate}
              calendarIcon={CalendarIc}
              readOnly={false}
            />
          </HalfBox>

          {/* 종료일 */}
          <HalfBox
            bgColor={theme.colors.pastel_blue}
            fontColor={theme.colors.gray2}
            borderColor={theme.colors.main_blue}
          >
            <Calendar date={endDate} calendarIcon={CalendarGreyIc} readOnly={true} />
          </HalfBox>
        </Styled.CalendarWrapper>
      </InputContainer>

      <Styled.ButtonWrapper>
        <BasicBox
          bgColor={isNextStepAvailable ? theme.colors.main_blue : theme.colors.gray1}
          fontColor={theme.colors.white}
          font={theme.fonts.button16}
          borderColor={'transparent'}
        >
          <Button handleClick={nextStep}>소원링크 생성 완료!</Button>
        </BasicBox>
      </Styled.ButtonWrapper>
    </>
  );
}

const Styled = {
  CalendarWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  ButtonWrapper: styled.div`
    position: absolute;
    bottom: 4.6rem;
  `,
};
