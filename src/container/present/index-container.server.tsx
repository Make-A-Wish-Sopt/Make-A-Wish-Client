'use client';

import InputText from '@/components/Common/Input/inputText';
import InputTextarea from '@/components/Common/Input/inputTextarea';
import InputForm from '@/components/UI/InputForm';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import { MAX_HINT_LENGHT } from '@/constant/input';
import { useGetPublicWishes } from '@/hooks/queries/public';
import { PresentDatType } from '@/types/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import PresentList from '@/components/UI/PresentList';
import Box from '@/components/Common/Box';
import CheckBox from '@/components/UI/CheckBox';
import useToggle from '@/hooks/common/useToggle';
import { colors } from '@/styles/styles';
import Button from '@/components/Common/Button';

export default function PresentContainer() {
  const wishesId = '205';
  const router = useRouter();

  const { toggleState, handleToggle } = useToggle();

  const { publicWishesData } = useGetPublicWishes(wishesId);
  console.log(publicWishesData);
  const methods = useForm<PresentDatType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      message: '',
    },
  });

  const handleMoveToCakes = () => {
    router.push(`/cakes/${wishesId}`);
  };

  const handleMoveToHome = () => {
    router.push('/');
  };

  return (
    <div className="w-full">
      <h3 className="font-bitbit text-main_blue text-[24px] mb-12 whitespace-pre-line">
        {publicWishesData?.title}
      </h3>

      <Box
        bgColor="background"
        fontColor="gray2"
        font="galmuri"
        styles={{
          height: 'auto',
          minHeight: '5rem',
          padding: '1.2rem',
          border: `1px solid ${colors.dark_green}`,
        }}
      >
        <span className="text-[14px]">
          {publicWishesData?.hint}
          안녕하세요!
        </span>
      </Box>

      {/* 이미지값 넣어줘야해요! */}
      <UploadImageBox preSignedImageUrl={''} />

      <InputForm title="본인의 닉네임 작성하기">
        <InputText
          register={methods.register('name')}
          placeholder="당신의 이름이나 별명을 편하게 작성해주세요"
        ></InputText>
      </InputForm>

      <InputForm title="선물하고 싶은 항목 선택하기">
        <PresentList />
        <Box bgColor="dark_green" fontColor="gray2">
          <CheckBox
            checkBoxState={toggleState}
            checkBoxText="편지만 보낼게요"
            handleClickFn={handleToggle}
          />
        </Box>
      </InputForm>

      <InputForm title="친구에게 편지 남기기">
        <InputTextarea register={methods.register('message')}>
          <span className="font-galmuri text-[12px] text-gray2">{`${
            methods.watch('message').toString().length
          }/${MAX_HINT_LENGHT}`}</span>
        </InputTextarea>
      </InputForm>

      <Button bgColor="main_blue" fontColor="white" styles={{ marginBottom: '5.8rem' }}>
        친구 생일 축하해주기
      </Button>
    </div>
  );
}
