import Button from '@/components/common/button';
import Calendar from '@/components/common/calendar/calendar';
import InputContainer from '@/components/common/input/inputContainer';
import TextareaBox from '@/components/common/input/textareaBox';
import UploadTypeToggleBtn from '@/components/common/uploadTypeToggleBtn';
import ItemLink from '@/components/wishes/wishesForm/itemLink';
import { WISHES_STATUS } from '@/constant/wishesStatus';
import useEditWishesInfo from '@/hooks/queries/mypage/useEditWishesInfo';
import { CalendarGreyIc, CalendarIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { validation } from '@/validation/input';
import AlertTextBox from '@/components/common/alertTextBox';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import UploadGift from '@/components/wishes/wishesForm/UploadGift';
import Input from '@/components/common/input/input';
import useUploadItemInfo from '@/hooks/wishes/useUploadItemInfo';
import { useForm } from 'react-hook-form';
import { BankInfoInputsType, WishesDataInputType } from '@/types/common/input/wishesInput';
import BankInput from '@/components/common/modal/BankInput';

export default function EditWishesContainer() {
  const { imageFile, preSignedImageURL, uploadImageFile } = useUploadItemInfo();
  const [isLinkLoadType, setIsLinkLoadType] = useState(true); //false : 링크 불러오기 true : 직접

  const handleLoadTypeToggle = (state: boolean) => {
    setIsLinkLoadType(state);
  };

  const methods = useForm<WishesDataInputType>({
    defaultValues: {
      linkURL: '',
      imageURL: '',
      price: 0,
      initial: '',
      title: '',
      hint: '',
      phone: '',
      mobileCode: '',
      name: '',
      bankName: '',
      account: '',
    },
  });

  const bankMethods = useForm<BankInfoInputsType>({
    defaultValues: {
      phone: '',
      mobileCode: '',
      name: '',
      bankName: '',
      account: '',
    },
  });

  return (
    <>
      <Styled.TitleWrapper>
        <Styled.Title>소원링크 정보 수정하기</Styled.Title>
      </Styled.TitleWrapper>

      <UploadTypeToggleBtn
        isLinkLoadType={isLinkLoadType}
        handleLoadTypeToggle={handleLoadTypeToggle}
      />

      {isLinkLoadType ? (
        <InputContainer title="안녕하세요?!">
          <ItemLink methods={methods} />
        </InputContainer>
      ) : (
        <>
          <UploadGift
            imageFile={imageFile}
            preSignedImageURL={preSignedImageURL}
            uploadImageFile={uploadImageFile}
            methods={methods}
          />
        </>
      )}

      <InputContainer title="선물의 초성 수정하기">
        <Input placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ" register={methods.register('initial')} />
      </InputContainer>

      <InputContainer title="소원 링크 제목 수정하기">
        <Input placeholder="ex. ㅇㅇ이의 앙큼 벌스데이" register={methods.register('hint')} />
      </InputContainer>

      {/* Caledar */}
      <InputContainer title="나의 생일주간 재설정하기">
        <Styled.CalendarWrapper>
          {/* 시작일 */}

          {/* <Calendar
            date={startDate.startDate}
            changeStartDate={startDate.changeStartDate}
            calendarIcon={wishesStatus === WISHES_STATUS.BEFORE ? CalendarIc : CalendarGreyIc}
            readOnly={wishesStatus === WISHES_STATUS.BEFORE ? false : true}
          />

          {/* 종료일 */}
          {/* <Calendar date={endDate} calendarIcon={CalendarGreyIc} readOnly={true} />  */}
        </Styled.CalendarWrapper>
      </InputContainer>

      {/* BankInfo */}
      <InputContainer title="송금 받을 계좌번호 수정하기">
        <BankInput methods={bankMethods} />
      </InputContainer>

      <InputContainer title="연락처 수정하기">
        <Input
          placeholder="연락처는 (-)없이 입력해주세요"
          register={bankMethods.register('phone')}
        />
      </InputContainer>

      <InputContainer title="선물에 대한 힌트 수정하기">
        <TextareaBox placeholder="ex. 내가 이 물건 자주 언급했는데...기억나지?ㅋㅋ" />
      </InputContainer>

      <Styled.ButtonWrapper>
        <Button
          boxType="btn--large"
          colorSystem="pastelBlue_white"
          handleClick={() => {
            isAbleModify && editWishesData();
          }}
        >
          수정 완료
        </Button>
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
