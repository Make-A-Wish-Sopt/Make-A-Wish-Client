import BackBtn from '@/components/common/backBtn';
import BasicBox from '@/components/common/box/BasicBox';
import HalfBox from '@/components/common/box/HalfBox';
import LargeBox from '@/components/common/box/LargeBox';
import Button from '@/components/common/button/button';
import Calendar from '@/components/common/calendar/calendar';
import InputBox from '@/components/common/input/inputBox';
import InputContainer from '@/components/common/input/inputContainer';
import TextareaBox from '@/components/common/input/textareaBox';
import InputHeader from '@/components/common/inputHeader';
import BankInput from '@/components/common/modal/BankInput';
import UploadTypeToggleBtn from '@/components/common/uploadTypeToggleBtn';
import ItemImageBox from '@/components/wishes/wishesForm/itemImageBox';
import ItemLink from '@/components/wishes/wishesForm/itemLink';
import { LIMIT_TEXT } from '@/constant/limitText';
import useEditWishInfo from '@/hooks/common/useEditWishInfo';
import useInput from '@/hooks/common/useInput';
import { useGetItemInfo } from '@/hooks/queries/wishes/useGetItemInfo';
import useUploadItemInfo from '@/hooks/wishes/useUploadItemInfo';
import { CalendarGreyIc, CalendarIc, ImageUploadIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

export default function EditWishesContainer() {
  const {
    startDate,
    changeStartDate,
    endDate,
    name,
    handleChangeName,
    bankName,
    handleChangeBankName,
    account,
    handleChangeAccount,
    phone,
    handleChangePhone,
  } = useEditWishInfo();

  const [linkURL, handleChangeLinkURL] = useInput('');
  const [isCorrectLink, setIsCorrectLink] = useState(false);
  const { imageURL, price, isSuccess } = useGetItemInfo(isCorrectLink, linkURL);
  const { imageFile, previewImage, uploadImageFile } = useUploadItemInfo();
  const [initial, handleChangeInitial] = useInput('', LIMIT_TEXT[15]);
  const [isNextStepAvailable, setIsNextStepAvailable] = useState(false);
  const [isLinkLoadType, setIsLinkLoadType] = useState(true); //false : 링크 불러오기 true : 직접 불러오기
  const [selfInputPrice, handleChangeSelfInputPrice] = useInput('', LIMIT_TEXT[15]);
  const [title, handleChangeTitle] = useInput('', LIMIT_TEXT[20]);
  const [hint, handleChangeHint] = useInput('', LIMIT_TEXT.DESCRIPTION);

  const handleLoadTypeToggle = (state: boolean) => {
    setIsLinkLoadType(state);
  };

  const changeValidation = (state: boolean) => {
    setIsCorrectLink(state);
  };

  return (
    <>
      {/* HEADER */}
      <InputHeader>
        <BackBtn />
      </InputHeader>

      <Styled.TitleWrapper>
        <Styled.Title>소원링크 정보 수정하기</Styled.Title>
      </Styled.TitleWrapper>

      <UploadTypeToggleBtn
        isLinkLoadType={isLinkLoadType}
        handleLoadTypeToggle={handleLoadTypeToggle}
      />

      {isLinkLoadType ? (
        <InputContainer title="">
          <ItemLink
            linkURL={linkURL}
            handleChangeLinkURL={handleChangeLinkURL}
            changeValidation={changeValidation}
            isSuccess={isSuccess}
            imageURL={imageURL}
            price={price}
          />
        </InputContainer>
      ) : (
        <>
          <InputContainer title="갖고 싶은 선물 이미지 등록하기">
            <Styled.Lable>
              {previewImage ? (
                <ItemImageBox imageURL={previewImage} />
              ) : (
                <LargeBox bgColor={theme.colors.pastel_blue}>
                  <Styled.UploadImageBox>
                    <Image src={ImageUploadIc} alt="업로드 아이콘" />
                  </Styled.UploadImageBox>
                </LargeBox>
              )}
              <Styled.FileInput
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={uploadImageFile}
                readOnly
              />
            </Styled.Lable>
          </InputContainer>

          <InputContainer title="선물 가격 입력하기">
            <InputBox
              placeholder="ex. 12,000,000"
              handleChangeValue={handleChangeSelfInputPrice}
              value={selfInputPrice}
              limitLength={LIMIT_TEXT[15]}
            />
          </InputContainer>
        </>
      )}

      <InputContainer title="선물의 초성 수정하기">
        <InputBox
          placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ"
          handleChangeValue={handleChangeInitial}
          value={initial}
          limitLength={LIMIT_TEXT[15]}
        />
      </InputContainer>

      <InputContainer title="소원 링크 제목 수정하기">
        <InputBox
          placeholder="ex. ㅇㅇ이의 앙큼 벌스데이"
          handleChangeValue={handleChangeTitle}
          value={title}
          limitLength={LIMIT_TEXT[20]}
        />
      </InputContainer>

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
          name={name}
          handleChangeName={handleChangeName}
          bankName={bankName}
          handleChangeBankName={handleChangeBankName}
          account={account}
          handleChangeAccount={handleChangeAccount}
        />
      </InputContainer>

      <InputContainer title="연락처 수정하기">
        <InputBox value={phone} handleChangeValue={handleChangePhone} />
      </InputContainer>

      <InputContainer title="선물에 대한 힌트 수정하기">
        <TextareaBox
          placeholder="ex. 내가 이 물건 자주 언급했는데...기억나지?ㅋㅋ"
          handleChangeValue={handleChangeHint}
          value={hint}
          limitLength={LIMIT_TEXT.DESCRIPTION}
        />
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

  UploadImageBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    cursor: pointer;
  `,

  Lable: styled.label`
    cursor: pointer;
  `,

  FileInput: styled.input`
    display: none;
  `,
};
