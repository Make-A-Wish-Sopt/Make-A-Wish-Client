import Button from '@/components/Common/Button';
import Calendar from '@/components/Common/Calendar/Calendar';
import InputContainer from '@/components/Common/Input/InputContainer';
import TextareaBox from '@/components/Common/Input/TextareaBox';

import ItemLink from '@/components/Wishes/WishesForm/ItemLink';
import theme from '@/styles/theme';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import UploadPresent from '@/components/Wishes/WishesForm/UploadPresent';
import Input from '@/components/Common/Input/Input';
import useUploadItemInfo from '@/hooks/wishes/useUploadItemInfo';
import { useForm } from 'react-hook-form';
import { WishesDataInputType } from '@/types/wishesType';
import BankInput from '@/components/Common/Modal/BankInput';
import {
  useGetMainProgressData,
  useGetWishesProgress,
  usePutProgressWishes,
} from '@/hooks/queries/wishes';
import SiteList from '@/components/Wishes/WishesForm/SiteList';
import { usePutUserAccount } from '@/hooks/queries/user';
import { LIMIT_TEXT } from '@/constant/limitText';
import { getDate } from '@/utils/common/getDate';
import { validation } from '@/validation/input';
import InputLength from '@/components/Common/Input/InputLength';

export default function EditWishesContainer() {
  const { imageFile, preSignedImageUrl, uploadImageFile } = useUploadItemInfo();
  const [isLinkLoadType, setIsLinkLoadType] = useState(false); //false : 링크 불러오기 true : 직접

  const [editState, setEditState] = useState(false);

  const methods = useForm<WishesDataInputType>({
    defaultValues: {
      linkURL: '',
      imageUrl: '',
      price: '',
      initial: '',
      title: '',
      hint: '',
      startDate: new Date(),
      endDate: getDate(new Date(), 7),
      phone: '',
      name: '',
      bank: '',
      account: '',
    },
  });

  const { wishesProgressData } = useGetWishesProgress();
  const { progressData } = useGetMainProgressData();

  const { handlePutUserAccount } = usePutUserAccount(methods);
  const { handlePutProgressWishes } = usePutProgressWishes(methods);

  useEffect(() => {
    if (wishesProgressData) {
      methods.setValue('title', wishesProgressData.title);
      methods.setValue('imageUrl', wishesProgressData.imageUrl);
      methods.setValue('hint', wishesProgressData.hint);
      methods.setValue('price', wishesProgressData.price);
      methods.setValue('initial', wishesProgressData.initial);

      methods.setValue('startDate', new Date(wishesProgressData.startDate));
      methods.setValue('endDate', new Date(wishesProgressData.endDate));

      if (wishesProgressData.accountInfo) {
        methods.setValue('account', wishesProgressData?.accountInfo.account);
        methods.setValue('name', wishesProgressData?.accountInfo.name);
        methods.setValue('bank', wishesProgressData?.accountInfo.bank);
        methods.setValue('phone', wishesProgressData.phone);
      }
    }
  }, [wishesProgressData]);

  useEffect(() => {
    if (
      methods.getValues('initial').length !== 0 &&
      methods.getValues('initial').length <= 15 &&
      methods.getValues('imageUrl') &&
      methods.getValues('price') !== '' &&
      Number(methods.getValues('price')) <= 12000000 &&
      methods.getValues('title').length <= 20 &&
      methods.getValues('hint').length !== 0 &&
      methods.getValues('hint').length <= 300 &&
      methods.getValues('name') &&
      methods.getValues('bank') &&
      methods.getValues('account') &&
      methods.getValues('phone') &&
      validation.isCorrectPhoneNumber(methods.getValues('phone'))
    ) {
      setEditState(true);
    } else {
      setEditState(false);
    }
  }, [methods.watch()]);

  const handleClickFn = () => {
    if (!editState) return;
    handlePutUserAccount();
    handlePutProgressWishes();
  };

  return (
    <>
      <Styled.TitleWrapper>
        <Styled.Title>소원링크 정보 수정하기</Styled.Title>
      </Styled.TitleWrapper>

      {/* <UploadTypeToggleBtn
        isLinkLoadType={isLinkLoadType}
        handleLoadTypeToggle={handleLoadTypeToggle}
      /> */}

      {isLinkLoadType ? (
        <InputContainer>
          <SiteList />
          <ItemLink methods={methods} />
        </InputContainer>
      ) : (
        <>
          <UploadPresent
            imageFile={imageFile}
            preSignedImageUrl={preSignedImageUrl}
            uploadImageFile={uploadImageFile}
            methods={methods}
            progressStatus={progressData?.status}
          />
        </>
      )}

      <InputContainer title="선물의 초성 수정하기">
        <Input
          boxType="inputBox--large"
          placeholder="ex. 애플워치 -> ㅇㅍㅇㅊ"
          register={methods.register('initial')}
          disabled={progressData?.status === 'WHILE'}
        >
          <InputLength inputLength={methods.watch('initial').length} limitLength={LIMIT_TEXT[15]} />
        </Input>
      </InputContainer>

      <InputContainer title="소원 링크 제목 수정하기">
        <Input
          boxType="inputBox--large"
          placeholder="ex. ㅇㅇ이의 앙큼 벌스데이"
          register={methods.register('title')}
          disabled={progressData?.status === 'WHILE'}
        >
          <InputLength inputLength={methods.watch('title').length} limitLength={LIMIT_TEXT[20]} />
        </Input>
      </InputContainer>

      <InputContainer title="나의 생일주간 재설정하기">
        <Styled.CalendarWrapper>
          {/* 시작일 */}
          <Calendar
            date={methods.watch('startDate')}
            methods={methods}
            readOnly={progressData?.status !== 'BEFORE'}
          />
          {/* 종료일 */}
          <Calendar date={methods.watch('endDate')} methods={methods} readOnly />
        </Styled.CalendarWrapper>
      </InputContainer>

      {/* BankInfo */}
      <InputContainer title="송금 받을 계좌번호 수정하기">
        <BankInput methods={methods} progressData={progressData} />
      </InputContainer>

      <InputContainer title="연락처 수정하기">
        <Input
          inputType="number"
          placeholder="연락처는 (-)없이 입력해주세요"
          register={methods.register('phone')}
        />
      </InputContainer>

      <InputContainer title="선물에 대한 힌트 수정하기">
        <TextareaBox
          placeholder="ex. 내가 이 물건 자주 언급했는데...기억나지?ㅋㅋ"
          inputLength={methods.watch('hint').length}
          limitLength={LIMIT_TEXT.DESCRIPTION}
          register={methods.register('hint')}
          disabled={progressData?.status === 'WHILE'}
        />
      </InputContainer>

      <Styled.ButtonWrapper>
        <Button
          boxType="large"
          colorSystem={editState ? 'mainBlue_white' : 'gray1_gray2'}
          handleClickFn={handleClickFn}
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
