'use client';

import { useStepInputContext } from '@/context/stepInputContext';
import Text from '@/components/Common/Text';
import { useForm } from 'react-hook-form';
import { WishesDataType } from '@/types/wishes/create/wishesCreateDataType';
import InputForm from '@/components/UI/InputForm';
import InputTextarea from '@/components/Common/Input/inputTextarea';
import useUploadItemInfo from '@/hooks/wishes/useUploadItemInfo';
import { MAX_HINT_LENGHT } from '@/constant/input';
import styled from 'styled-components';
import Calendar from '@/components/Common/Calendar/Calendar';
import { getDate } from '@/utils/common/getDate';

export default function WishesCreateContainer() {
  const { step } = useStepInputContext();

  const methods = useForm<WishesDataType>({
    defaultValues: {
      image: '',
      hint: '',
      startDate: new Date(),
      endDate: getDate(new Date(), 7),
      wishesType: false,
    },
  });

  // const { imageFile, preSignedImageUrl, setPreSignedImageUrl, uploadImageFile } =
  //   useUploadItemInfo();

  return (
    <>
      <Text as="h2" color="main_blue" font="headline24_100" style={{ margin: '2.4rem 0 2rem' }}>
        생일잔치 링크 생성하기
      </Text>

      <InputForm title="링크에 들어온 친구가 보게 될 재밌는 이미지를 등록해보세요!">
        <InputTextarea register={methods.register('image')}></InputTextarea>
      </InputForm>

      <InputForm title="친구에게 남기고 싶은 한마디">
        <InputTextarea register={methods.register('hint')}>
          <Text color="gray1" font="body14">{`${
            methods.watch('hint').toString().length
          }/${MAX_HINT_LENGHT}`}</Text>
        </InputTextarea>
      </InputForm>

      <InputForm title="내 생일 주간 설정하기">
        <CalendarWrapper>
          {/* 시작일 */}
          <Calendar date={methods.watch('startDate')} methods={methods} />
          {/* 종료일 */}
          <Calendar date={methods.watch('endDate')} methods={methods} readOnly />
        </CalendarWrapper>
      </InputForm>

      <InputForm title="생일 선물도 받고 싶어요!"></InputForm>
    </>
  );
}

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;

  width: 100%;
`;
