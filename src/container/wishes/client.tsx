'use client';

import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { VitaminCakeImg } from '../../../public/assets/images';
import useToggle from '@/hooks/common/useToggle';
import CloseIconInModal from '@/components/Common/Modal/CloseIconInModal';
import { ReactNode } from 'react';
import InputText from '@/components/Common/Input/inputText';
import Button from '@/components/Common/Button';
import { useForm } from 'react-hook-form';
import { convertEncodeBase64 } from '@/utils/common/convert';

export default function WishesPageStateContainer({
  isWishesProgress,
  children,
}: {
  DayCountText?: JSX.Element;
  WishesMessageToCreateUser?: JSX.Element;
  ReceivedCakeTree?: JSX.Element;
  isWishesProgress: boolean;
  children?: ReactNode;
}) {
  const { toggleState: wishesTitleModalState, handleToggle: handleOpenWishesTitleModal } =
    useToggle();

  return (
    <>
      {children}
      <WishesCreateOrShareButton
        isWishesProgress={isWishesProgress}
        handleOpenWishesTitleModal={handleOpenWishesTitleModal}
      />
      {wishesTitleModalState && (
        <WishesCreateTitleInputModal
          isOpen={wishesTitleModalState}
          handleToggle={handleOpenWishesTitleModal}
        />
      )}
    </>
  );
}

export function WishesCreateOrShareButton({
  isWishesProgress,
  handleOpenWishesTitleModal,
}: {
  isWishesProgress: boolean;
  handleOpenWishesTitleModal: () => void;
}) {
  function handleClick() {
    if (isWishesProgress) {
      // 소원 공유 동작
    } else {
      handleOpenWishesTitleModal();
    }
  }

  return (
    <FixedBottomButton>
      <Button onClick={handleClick}>
        {isWishesProgress ? '생일잔치 링크 공유하기' : '생일잔치 링크 생성하기'}
      </Button>
    </FixedBottomButton>
  );
}

function WishesCreateTitleInputModal({
  isOpen,
  handleToggle,
}: {
  isOpen: boolean;
  handleToggle: () => void;
}) {
  const { getValues, watch, register } = useForm({
    defaultValues: {
      wishTitle: '',
    },
  });

  const router = useRouter();

  function handleClick() {
    const wishTitle = watch('wishTitle');

    if (wishTitle) {
      const encodeWishTitle = convertEncodeBase64(wishTitle);
      router.push(`/wishes/create?step=link&wishTitle=${encodeWishTitle}`);
    }
  }

  return (
    <CloseIconInModal isOpen={isOpen} handleToggle={handleToggle}>
      <div className="flex flex-col items-center gap-20 w-full">
        <div className="flex flex-col items-center w-full">
          <Image src={VitaminCakeImg} alt="케이크 이미지" width={60} height={60} />
          <h2 className="font-bitbit text-[24px] text-background">생일 잔치상 만들기</h2>
        </div>
        <div className="w-full">
          <label className="font-galmuri text-[14px] text-background mb-5">제목 정하기</label>
          <InputText register={register('wishTitle')} placeholder="ex) 에어팟맥스 받게 해주세요" />
        </div>
        <Button
          bgColor="dark_green"
          fontColor="white"
          styles={{ width: '13.8rem' }}
          onClick={handleClick}
        >
          입장하기
        </Button>
      </div>
    </CloseIconInModal>
  );
}
