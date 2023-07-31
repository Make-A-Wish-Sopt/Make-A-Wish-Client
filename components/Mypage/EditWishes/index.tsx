import BackBtn from '@/components/common/backBtn';
import BasicBox from '@/components/common/box/BasicBox';
import HalfBox from '@/components/common/box/HalfBox';
import Button from '@/components/common/button/button';
import Calendar from '@/components/common/calendar/calendar';
import InputBox from '@/components/common/input/inputBox';
import InputContainer from '@/components/common/input/inputContainer';
import InputHeader from '@/components/common/inputHeader';
import BankInput from '@/components/common/modal/BankInput';
import useUserInfo from '@/hooks/common/useUserInfo';
import { CalendarGreyIc, CalendarIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import styled from 'styled-components';

export default function EditWishesContainer() {
  const {
    startDate,
    changeStartDate,
    endDate,
    bankName,
    handleChangeBankName,
    account,
    handleChangeAccount,
    phone,
    handleChangePhone,
  } = useUserInfo();

  return (
    <>
      {/* HEADER */}
      <InputHeader>
        <BackBtn />
      </InputHeader>

      <Styled.TitleWrapper>
        <Styled.Title>소원링크 정보 수정하기</Styled.Title>
      </Styled.TitleWrapper>

      {/* Caleder */}
      <InputContainer title="나의 생일주간 재설정하기">
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
            borderColor={theme.colors.gray1}
          >
            <Calendar date={endDate} calendarIcon={CalendarGreyIc} readOnly={true} />
          </HalfBox>
        </Styled.CalendarWrapper>
      </InputContainer>

      {/* BankInfo */}
      <InputContainer title="송금 받을 계좌번호 수정하기">
        <BankInput
          bankName={bankName}
          handleChangeBankName={handleChangeBankName}
          account={account}
          handleChangeAccount={handleChangeAccount}
        />
      </InputContainer>

      <InputContainer title="연락처 수정하기">
        <InputBox value={phone} handleChangeValue={handleChangePhone} />
      </InputContainer>

      <BasicBox
        bgColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
        font={theme.fonts.button16}
        borderColor={'transparent'}
      >
        <Button
          handleClick={() => {
            console.log('hello');
          }}
        >
          수정완료
        </Button>
      </BasicBox>
    </>
  );
}

const Styled = {
  Title: styled.h1`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.black};

    margin-left: 1rem;
  `,

  TitleWrapper: styled.div`
    display: flex;

    height: 2.4rem;

    margin: 2.4rem 0 2rem;
  `,

  CalendarWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};
