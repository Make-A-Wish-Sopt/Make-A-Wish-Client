import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { CalendarIC } from '@/public/assets/icons';
import { ArrowDownIc } from '@/public/assets/icons';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import AlertTextBox from '@/components/common/AlertText';
import InputBox from '@/components/common/input/inputBox';
import InputLength from '@/components/common/input/inputLength';
import InputLargeBox from '@/components/common/input/inputLargeBox';
import InputBankBox from '@/components/common/input/inputBankBox';
import InputCalendar from '@/components/common/input/inputCalendar';

import BankModal from '@/components/modal/BankModal';
import { SITE_LIST } from '@/interfaces/SiteData';
import { useState } from 'react';
import useInput from '@/hooks/useInput';
import { LIMIT_TEXT } from '@/constant/limitText';
import ItemLink from '@/components/formPage/itemLink';


export default function FormPage() {
  const [showModal, setShowModal] = useState(false);


  const [title, changeTitle] = useInput('', LIMIT_TEXT[20]);
  const [hint1, changeHint1] = useInput('', LIMIT_TEXT[300]);
  const [hint2, changeHint2] = useInput('', LIMIT_TEXT[15]);
  const [name, changeName] = useInput('', LIMIT_TEXT.none);
  const [bankName, setBankName] = useState('');
  const [account, changeAccount] = useInput('', LIMIT_TEXT.none);
  const [phone, changePhone] = useInput('', LIMIT_TEXT.none);

  console.log(title, hint1, hint2, name, bankName, account, phone);

  const clickModal = () => setShowModal(!showModal);

  const changeBankName = (input: string) => {
    setBankName(input);
  };

  const isIncludeHyphen = (input: string) => {
    return input.includes('-');
  };

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>
      <Styled.Title>소원 링크 생성하기</Styled.Title>

      <ItemLink />


      <Styled.ItemBox>
        <Styled.InputTitle>소원 링크 제목 작성하기</Styled.InputTitle>
        <InputBox>

          <Styled.InputText placeholder="ex. OO이의 앙큼 벌스데이" onChange={changeTitle} />
          <InputLength inputLength={title.length} limit={LIMIT_TEXT[20]} />
        </InputBox>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>선물에 대한 힌트 자유롭게 적어보기</Styled.InputTitle>
        <InputLargeBox>

          <Styled.TextareaText
            placeholder="ex. 내가 이 물건 자주 언급했는데...기억나지?ㅋㅋ"
            onChange={changeHint1}
          />
          <InputLength inputLength={hint1.length} limit={LIMIT_TEXT[300]} />
        </InputLargeBox>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>선물의 초성 적어보기</Styled.InputTitle>
        <InputBox>
          <Styled.InputText placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ" onChange={changeHint2} />
          <InputLength inputLength={hint2.length} limit={LIMIT_TEXT[15]} />
        </InputBox>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>나의 생일주간 설정하기</Styled.InputTitle>
        <Styled.CalendarContainer>
          <InputCalendar>
            <Styled.InputTextDone placeholder="2023.04.12" readOnly />
            <Image src={CalendarIC} alt="캘린더" />
          </InputCalendar>
          <InputCalendar>
            <Styled.InputText placeholder="종료일" readOnly />
            <Image src={CalendarIC} alt="캘린더" />
          </InputCalendar>
        </Styled.CalendarContainer>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>송금 받을 계좌번호 입력하기</Styled.InputTitle>
        <InputBox>
          <Styled.InputText placeholder="예금주명" onChange={changeName} />
        </InputBox>
        <br />
        <InputBankBox onClick={clickModal}>
          <Styled.InputText placeholder="은행 선택" readOnly />
          <Image src={ArrowDownIc} alt="열기" />
        </InputBankBox>
        {showModal && <BankModal clickModal={clickModal} changeBankName={changeBankName} />}
        <br />
        <InputBox>
          <Styled.InputText
            placeholder="계좌번호는 (-)없이 입력해주세요"
            onChange={changeAccount}
          />
        </InputBox>
        {isIncludeHyphen(account) && <AlertTextBox> 계좌번호는 (-)없이 입력해주세요</AlertTextBox>}
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>연락처 입력하기</Styled.InputTitle>
        <InputBox>
          <Styled.InputTextLarge
            placeholder="연락처는 (-)없이 입력해주세요"
            onChange={changePhone}
          />
        </InputBox>
        {isIncludeHyphen(phone) && <AlertTextBox> 연락처는 (-)없이 입력해주세요</AlertTextBox>}
      </Styled.ItemBox>

      <button>소원 링크 생성하기</button>
    </>
  );
}

const Styled = {
  Title: styled.h1`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 2.4rem 0 2rem;
  `,

  ItemBox: styled.div`
    margin: 0 0 4rem;
  `,

  InputTitle: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    margin: 0 0 1rem;
  `,

  InputText: styled.input`
    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    width: 100%;
  `,

  InputTextDone: styled.input`
    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    width: 100%;
  `,

  InputTextLarge: styled.input`
    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    width: 100%;
    height: 10.5rem;
  `,

  CalendarContainer: styled.div`
    display: flex;
  `,

  AlertBox: styled.div`
    display: none;
  `,

  PresentContainer: styled.div`
    display: none;
    margin: 1rem 0 0;
  `,

  PresentPrice: styled.div`
    ${theme.fonts.button16};
    color: ${theme.colors.main_blue};
    text-align: center;
  `,

  TextareaText: styled.textarea`
    ${theme.fonts.body12};
    width: 100%;
    height: 10.5rem;
    background-color: ${theme.colors.pastel_blue};
    border: none;
    resize: none;
  `,
};
