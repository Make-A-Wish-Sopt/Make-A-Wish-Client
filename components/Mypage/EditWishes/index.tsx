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
import { WISHES_STATUS } from '@/constant/wishesStatus';
import useInitEditWishesInfo from '@/hooks/mypage/useInitEditWishesInfo';
import useEditWishesInfo from '@/hooks/queries/mypage/useEditWishesInfo';
import { CalendarGreyIc, CalendarIc, ImageUploadIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import Image from 'next/image';
import styled from 'styled-components';

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
    imageUrl: itemLink.imageURL,
    price: itemLink.price,
    title: title.title,
    hint: hint.hint,
    initial: initial.initial,
  });

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
          />
        </InputContainer>
      ) : (
        <>
          <InputContainer title="갖고 싶은 선물 이미지 등록하기">
            <Styled.Lable>
              {image.previewImage ? (
                <ItemImageBox imageURL={image.previewImage} />
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
                onChange={image.uploadImageFile}
                readOnly
              />
            </Styled.Lable>
          </InputContainer>

          <InputContainer title="선물 가격 입력하기">
            <InputBox
              placeholder="ex. 12,000,000"
              handleChangeValue={selfInputPrice.handleChangeSelfInputPrice}
              value={selfInputPrice.selfInputPrice}
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
          limitLength={LIMIT_TEXT[15]}
        />
      </InputContainer>

      <InputContainer title="소원 링크 제목 수정하기">
        <InputBox
          placeholder="ex. ㅇㅇ이의 앙큼 벌스데이"
          handleChangeValue={title.handleChangeTitle}
          value={title.title}
          limitLength={LIMIT_TEXT[20]}
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
        <InputBox value={phone.phone} handleChangeValue={phone.handleChangePhone} />
      </InputContainer>

      <InputContainer title="선물에 대한 힌트 수정하기">
        <TextareaBox
          placeholder="ex. 내가 이 물건 자주 언급했는데...기억나지?ㅋㅋ"
          handleChangeValue={hint.handleChangeHint}
          value={hint.hint}
          limitLength={LIMIT_TEXT.DESCRIPTION}
        />
      </InputContainer>

      <BasicBox
        bgColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
        font={theme.fonts.button16}
        borderColor={'transparent'}
      >
        <Button handleClick={() => editWishesData()}>수정완료</Button>
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
