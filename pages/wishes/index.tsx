import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { CalendarIc, CalendarGreyIc, ArrowDownIc } from '@/public/assets/icons';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import AlertTextBox from '@/components/common/alertTextBox';
import InputBox from '@/components/common/input/inputBox';
import InputLength from '@/components/common/input/inputLength';
import InputLargeBox from '@/components/common/input/inputLargeBox';
import InputBankBox from '@/components/common/input/inputBankBox';
import InputCalendar from '@/components/common/input/inputCalendar';

import BankModal from '@/components/common/modal/BankModal';
import { useState } from 'react';
import useInput from '@/hooks/common/useInput';
import { LIMIT_TEXT } from '@/constant/limitText';
import ItemLink from '@/components/wishes/itemLink';

import ButtonBox from '@/components/common/button/buttonBox';
import { useSetRecoilState } from 'recoil';
import { WishesData } from '@/recoil/formPage/wishesData';
import { WishesDataType } from '@/types/wishes/wishesDataType';
import useModal from '@/hooks/common/useModal';
import Modal from '@/components/common/modal';
import CustomDatePicker from '@/components/common/modal/DatePickerModal';
import Layout from '@/components/common/layout';
import { useRouter } from 'next/router';

function getDate(date: Date | null): string {
  if (!date) {
    date = new Date();
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function WishesPage() {
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState(0);
  const [title, handleChangeTitle] = useInput('', LIMIT_TEXT[20]);
  const [hint1, handleChangeHint1] = useInput('', LIMIT_TEXT[300]);
  const [hint2, handleChangeHint2] = useInput('', LIMIT_TEXT[15]);
  const [name, handleChangeName] = useInput('');
  const [bankName, setBankName] = useState('');
  const [account, handleChangeAccount] = useInput('');
  const [phone, handleChangePhone] = useInput('');
  const [endDate, setEndDate] = useState<string>(getDate(new Date()));
  const [showEndDate, setShowEndDate] = useState(false);

  const router = useRouter();

  const startDate = getDate(new Date());

  const { isOpen, handleToggle } = useModal();

  const setWishesData = useSetRecoilState<WishesDataType>(WishesData);

  const handleChangePrice = (input: number) => {
    setPrice(input);
  };

  const handleChangeImageURL = (input: string) => {
    setImageURL(input);
  };

  const handleChangeBankName = (input: string) => {
    setBankName(input);
  };

  const handleMovePreviewPage = () => {
    setWishesData((prevData) => ({
      ...prevData,
      imageUrl: imageURL,
      price: price,
      title: title,
      hint1: hint1,
      hint2: hint2,
      name: name,
      bankName: bankName,
      account: account,
      phone: phone,
      startDate: startDate,
      endDate: endDate,
    }));
    router.push('/wishes/preview');
  };

  const isIncludeHyphen = (input: string) => {
    return input.includes('-');
  };

  const handleOpenCalendar = () => {
    setShowEndDate(true);
  };

  return (
    <Layout>
      <InputHeader>
        <BackBtn />
      </InputHeader>
      <Styled.Title>소원 링크 생성하기</Styled.Title>
      <ItemLink
        handleChangePrice={handleChangePrice}
        handleChangeImageURL={handleChangeImageURL}
        imageURL={imageURL}
        price={price}
      />

      {/* 입력 형식(타이틀, 인풋 컴포넌트(input,textarea)) 컴포넌트로 분리 */}
      <Styled.ItemBox>
        <Styled.InputTitle>소원 링크 제목 작성하기</Styled.InputTitle>
        <InputBox>
          <Styled.InputText
            placeholder="ex. OO이의 앙큼 벌스데이"
            onChange={handleChangeTitle}
            value={title}
          />
          <InputLength inputLength={title.length} limit={LIMIT_TEXT[20]} />
        </InputBox>
      </Styled.ItemBox>

      {/* 나중에 TextArea 구성 공통컴포넌트로 분리 */}
      <Styled.ItemBox>
        <Styled.InputTitle>선물에 대한 힌트 자유롭게 적어보기</Styled.InputTitle>
        <InputLargeBox bgColor={theme.colors.pastel_blue}>
          <Styled.TextareaText
            placeholder="ex. 내가 이 물건 자주 언급했는데...기억나지?ㅋㅋ"
            onChange={handleChangeHint1}
            value={hint1}
          />
          <Styled.TextareaWrapper>
            <div></div>
            <InputLength inputLength={hint1.length} limit={LIMIT_TEXT[300]} />
          </Styled.TextareaWrapper>
        </InputLargeBox>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>선물의 초성 적어보기</Styled.InputTitle>
        <InputBox>
          <Styled.InputText
            placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ"
            onChange={handleChangeHint2}
            value={hint2}
          />
          <InputLength inputLength={hint2.length} limit={LIMIT_TEXT[15]} />
        </InputBox>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>나의 생일주간 설정하기</Styled.InputTitle>
        <Styled.CalendarContainer>
          <InputCalendar borderColor={theme.colors.gray2}>
            <Styled.InputTextDone placeholder={startDate} readOnly />
            <Image src={CalendarGreyIc} alt="캘린더" />
          </InputCalendar>
          <InputCalendar borderColor={theme.colors.main_blue}>
            {!showEndDate && (
              <Styled.InputText
                placeholder="종료일"
                readOnly
                style={{ display: showEndDate ? 'none' : 'initial' }}
              />
            )}
            {showEndDate && <CustomDatePicker endDate={endDate} setEndDate={setEndDate} />}
            <Image src={CalendarIc} alt="캘린더" onClick={handleOpenCalendar} />
          </InputCalendar>
        </Styled.CalendarContainer>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>송금 받을 계좌번호 입력하기</Styled.InputTitle>
        <InputBox>
          <Styled.InputText placeholder="예금주명" onChange={handleChangeName} value={name} />
        </InputBox>
        <br />
        <InputBankBox onClick={handleToggle}>
          <Styled.InputText placeholder="은행 선택" value={bankName} readOnly />
          <Image src={ArrowDownIc} alt="열기" />
        </InputBankBox>
        {isOpen && (
          <Modal isOpen={isOpen} handleToggle={handleToggle}>
            <BankModal handleToggle={handleToggle} changeBankName={handleChangeBankName} />
          </Modal>
        )}
        <br />
        <InputBox>
          <Styled.InputText
            placeholder="계좌번호는 (-)없이 입력해주세요"
            onChange={handleChangeAccount}
            value={account}
          />
        </InputBox>
        {isIncludeHyphen(account) && <AlertTextBox> 계좌번호는 (-)없이 입력해주세요</AlertTextBox>}
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>연락처 입력하기</Styled.InputTitle>
        <InputBox>
          <Styled.InputTextLarge
            placeholder="연락처는 (-)없이 입력해주세요"
            onChange={handleChangePhone}
            value={phone}
          />
        </InputBox>
        {isIncludeHyphen(phone) && <AlertTextBox> 연락처는 (-)없이 입력해주세요</AlertTextBox>}
      </Styled.ItemBox>

      <ButtonBox
        backgroundColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
        handleClick={handleMovePreviewPage}
      >
        소원 링크 생성하기
      </ButtonBox>
    </Layout>
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
    width: 100%;
    height: 10.5rem;

    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    background-color: ${theme.colors.pastel_blue};

    resize: none;
  `,

  TextareaWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};
