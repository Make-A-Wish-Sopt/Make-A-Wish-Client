import BackBtn from '@/components/common/button/backBtn';
import BasicBox from '@/components/common/box/BasicBox';
import HalfBox from '@/components/common/box/HalfBox';
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
import { WISHES_STATUS } from '@/constant/wishesStatus';
import useInitEditWishesInfo from '@/hooks/mypage/useInitEditWishesInfo';
import useEditWishesInfo from '@/hooks/queries/mypage/useEditWishesInfo';
import { CalendarGreyIc, CalendarIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { validation } from '@/validation/input';
import AlertTextBox from '@/components/common/alertTextBox';
import { convertMoneyText } from '@/utils/common/convertMoneyText';

export default function EditWishesContainer() {
  const {
    itemLink,
    image,
    initial,
    title,
    startDate,
    endDate,
    bankInfo,
    phone,
    hint,
    selfInputPrice,
    isLinkLoadType,
    wishesStatus,
  } = useInitEditWishesInfo();
  const { editWishesData } = useEditWishesInfo({
    startDate: startDate.startDate,
    endDate: endDate,
    name: bankInfo.name,
    bankName: bankInfo.bankName,
    account: bankInfo.account,
    phone: phone.phone,
    imageUrl: isLinkLoadType ? itemLink.imageURL : image.preSignedImageURL,
    price: isLinkLoadType ? itemLink.price : Number(selfInputPrice.selfInputPrice),
    title: title.title,
    hint: hint.hint,
    initial: initial.initial,
  });

  const [isAlertState, setIsAlertState] = useState(false);
  const [isAbleModify, setIsAbleModify] = useState(true);

  useEffect(() => {
    checkValue() ? setIsAbleModify(true) : setIsAbleModify(false);
  }, [itemLink, image, initial, title, bankInfo, phone, selfInputPrice]);

  const checkValue = () => {
    return (
      (itemLink.imageURL.length !== 0 || image.preSignedImageURL.length !== 0) &&
      initial.initial.length !== 0 &&
      title.title.length !== 0 &&
      bankInfo.account.length !== 0 &&
      bankInfo.bankName.length !== 0 &&
      bankInfo.name.length !== 0 &&
      phone.phone.length !== 0 &&
      !isAlertState &&
      !validation.checkAccountLength(bankInfo.account) &&
      (itemLink.price !== 0 || selfInputPrice.selfInputPrice.length !== 0)
    );
  };

  useEffect(() => {
    validation.isIncludeHyphen(phone.phone) ? setIsAlertState(true) : setIsAlertState(false);
    validation.isCorrectPhoneNumber(phone.phone) ? setIsAlertState(false) : setIsAlertState(true);
  }, [phone]);

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
        isLinkLoadType={isLinkLoadType.isLinkLoadType}
        handleLoadTypeToggle={isLinkLoadType.handleLoadTypeToggle}
      />

      {isLinkLoadType.isLinkLoadType ? (
        <InputContainer title="">
          <ItemLink
            linkURL={itemLink.linkURL}
            handleChangeLinkURL={itemLink.handleChangeLinkURL}
            imageURL={itemLink.imageURL}
            changeImageURL={itemLink.changeImageURL}
            price={itemLink.price}
            changePrice={itemLink.changePrice}
            readOnly
          />
        </InputContainer>
      ) : (
        <>
          <InputContainer title="갖고 싶은 선물 이미지 등록하기">
            <Styled.Lable>
              {wishesStatus === WISHES_STATUS.BEFORE ? (
                <>
                  <ItemImageBox imageURL={image.preSignedImageURL} />
                  <Styled.FileInput
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={image.uploadImageFile}
                    readOnly
                  />
                </>
              ) : (
                <ItemImageBox imageURL={image.preSignedImageURL} />
              )}
            </Styled.Lable>
          </InputContainer>

          <InputContainer title="선물 가격 입력하기">
            <InputBox
              placeholder="ex. 12,000,000"
              handleChangeValue={(e) => {
                e.target.value = e.target.value.replaceAll(',', '');
                selfInputPrice.handleChangeSelfInputPrice(e);
              }}
              isPriceText
              color={theme.colors.gray2}
              value={
                selfInputPrice.selfInputPrice
                  ? `${convertMoneyText(selfInputPrice.selfInputPrice.toString())}`
                  : ''
              }
              readOnly={wishesStatus !== WISHES_STATUS.BEFORE}
              limitLength={LIMIT_TEXT[15]}
            />
          </InputContainer>
        </>
      )}

      <InputContainer title="선물의 초성 수정하기">
        <InputBox
          placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ"
          handleChangeValue={initial.handleChangeInitial}
          value={initial.initial}
          color={theme.colors.gray2}
          limitLength={LIMIT_TEXT[15]}
          readOnly={wishesStatus !== WISHES_STATUS.BEFORE}
        />
      </InputContainer>

      <InputContainer title="소원 링크 제목 수정하기">
        <InputBox
          placeholder="ex. ㅇㅇ이의 앙큼 벌스데이"
          handleChangeValue={title.handleChangeTitle}
          value={title.title}
          color={theme.colors.gray2}
          limitLength={LIMIT_TEXT[20]}
          readOnly={wishesStatus !== WISHES_STATUS.BEFORE}
        />
      </InputContainer>

      {/* Caledar */}
      <InputContainer title="나의 생일주간 재설정하기">
        <Styled.CalendarWrapper>
          {/* 시작일 */}
          <HalfBox
            bgColor={theme.colors.pastel_blue}
            fontColor={
              wishesStatus === WISHES_STATUS.BEFORE ? theme.colors.dark_blue : theme.colors.gray2
            }
            borderColor={theme.colors.main_blue}
          >
            <Calendar
              date={startDate.startDate}
              changeStartDate={startDate.changeStartDate}
              calendarIcon={wishesStatus === WISHES_STATUS.BEFORE ? CalendarIc : CalendarGreyIc}
              readOnly={wishesStatus === WISHES_STATUS.BEFORE ? false : true}
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

      {/* BankInfo */}
      <InputContainer title="송금 받을 계좌번호 수정하기">
        <BankInput
          name={bankInfo.name}
          handleChangeName={bankInfo.handleChangeName}
          bankName={bankInfo.bankName}
          changeBankName={bankInfo.changeBankName}
          account={bankInfo.account}
          handleChangeAccount={bankInfo.handleChangeAccount}
        />
      </InputContainer>

      <InputContainer title="연락처 수정하기">
        <InputBox
          placeholder="연락처는 (-)없이 입력해주세요"
          value={phone.phone}
          handleChangeValue={phone.handleChangePhone}
        />
        {phone.phone && isAlertState && <AlertTextBox>올바른 연락처를 입력해주세요</AlertTextBox>}
      </InputContainer>

      <InputContainer title="선물에 대한 힌트 수정하기">
        <TextareaBox
          placeholder="ex. 내가 이 물건 자주 언급했는데...기억나지?ㅋㅋ"
          handleChangeValue={hint.handleChangeHint}
          value={hint.hint}
          color={theme.colors.gray2}
          limitLength={LIMIT_TEXT.DESCRIPTION}
          readOnly={wishesStatus !== WISHES_STATUS.BEFORE}
        />
      </InputContainer>

      <Styled.ButtonWrapper>
        <BasicBox
          bgColor={isAbleModify ? theme.colors.main_blue : theme.colors.gray1}
          fontColor={theme.colors.white}
          font={theme.fonts.button18}
          borderColor={'transparent'}
        >
          <Button
            handleClick={() => {
              isAbleModify && editWishesData();
            }}
          >
            수정 완료
          </Button>
        </BasicBox>
      </Styled.ButtonWrapper>
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

  ButtonWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    margin-bottom: 4.6rem;
  `,
};
