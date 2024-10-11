'use client';

import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CakeDishTopRibbonImg, VitaminCakeImg } from '../../../public/assets/images';
import useToggle from '@/hooks/common/useToggle';
import CloseIconInModal from '@/components/Common/Modal/CloseIconInModal';
import { ReactNode } from 'react';
import InputText from '@/components/Common/Input/inputText';
import Button from '@/components/Common/Button';
import { useForm } from 'react-hook-form';
import { convertEncodeBase64 } from '@/utils/common/convert';

export default function WishesPageStateContainer({
  DayCountText,
  WishesMessageToCreateUser,
  ReceivedCakeTree,
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
      {/* {DayCountText}
      {WishesMessageToCreateUser}
      {ReceivedCakeTree} */}
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
      {/* <WishesCreateTitleInputModal /> */}
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
    <FixedBottomButton bgColor="main_blue" fontColor="black" onClick={handleClick}>
      {isWishesProgress ? '생일잔치 링크 공유하기' : '생일잔치 링크 생성하기'}
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

// function CakeMessageModal({
//   presentId,
//   wishId,
//   toggleState,
//   handleToggle,
// }: {
//   presentId: number;
//   wishId: string;
//   toggleState: boolean;
//   handleToggle: () => void;
// }) {
//   // const {} = useGetCakesInfo(presentId, Number(wishId));
//   return (
//     <CloseTopModal isOpen={toggleState} handleToggle={handleToggle} bgColor={'background'}>
//       <div className="flex flex-col items-center w-full h-full">
//         <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-40">{`선물주 운영자님이\n님에게 남긴 편지에요\n이미지를 저장해보세요!`}</span>
//         <div className="flex flex-col items-center w-full h-full p-20 bg-dark_green rounded-2xl text-white">
//           <span className="font-galmuri  text-[16px] px-14 py-8 bg-black bg-opacity-50 rounded-4xl">
//             테스트
//           </span>
//           {/* <Image></Image> */}
//           <span className="text-[14px]">안녕하세요 조물주보다 생일선물주</span>

//           <div className="flex justify-between items-center w-full h-54 p-12 rounded-xl border border-main_blue">
//             <span className="text-[16px]">선물한 항목</span>
//             <span className="font-bitbit">정성담은 편지</span>
//           </div>
//         </div>
//       </div>
//     </CloseTopModal>
//   );
// }
