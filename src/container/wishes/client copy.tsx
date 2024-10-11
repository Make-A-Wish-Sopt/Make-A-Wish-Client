'use client';

import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CakeDishTopRibbonImg } from '../../../public/assets/images';
import { cakeImageWithId, CakeItemType } from '@/constant/model/cakes';
import CloseTopModal from '@/components/Common/Modal/CloseTopModal';
import useToggle from '@/hooks/common/useToggle';
import useSelectItem from '@/hooks/common/useSelectItem';
import CloseIconInModal from '@/components/Common/Modal/CloseIconInModal';
import { ModalProps } from '@/components/Common/Modal';
import { ReactNode } from 'react';

export default function WishesPageStateContainer({
  DayCountText,
  WishesMessageToCreateUser,
}: {
  DayCountText: JSX.Element;
  WishesMessageToCreateUser: JSX.Element;
}) {
  return (
    <>
      {DayCountText}
      <Test></Test>
      {WishesMessageToCreateUser}
    </>
  );
}

export function Test() {
  return <></>;
}

export function CakeTree({ cakeList }: { cakeList: CakeItemType[] }) {
  const numberOfRows = Math.max(4, Math.ceil(cakeList.length / 3));
  const { toggleState, handleToggle } = useToggle();
  const { selectedId: selectedPresentId, handleSelectOne } = useSelectItem();

  return (
    <>
      <div className="relative w-375 h-screen mt-40">
        {/* 케이크 상단의 이미지 */}
        <Image
          src={CakeDishTopRibbonImg}
          alt="케이크 꾸미기 리본 이미지"
          width={96}
          height={68}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            marginTop: '2rem',
            zIndex: 5,
          }}
        />

        {/* 케이크 접시 구성 */}
        {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
          <div
            className="absolute top-128 w-375 bg-cover bg-no-repeat bg-[url('/assets/images/cakeDishImg.png')] "
            key={rowIndex}
            style={{
              top: `${rowIndex * 165}px`,
              height: '222px',
              backgroundPosition: 'center 1px',
            }}
          >
            <ul className="grid grid-cols-3 justify-center gap-x-[1px] custom-grid w-full h-full mt-70 px-50">
              {cakeList.slice(rowIndex * 3, rowIndex * 3 + 3).map((cake) => (
                <li
                  className="z-5 flex flex-col items-center aspect-square p-4 transform translate-y-[-30px] justify-self-center"
                  key={cake.name}
                  onClick={() => {
                    handleSelectOne(cake.presentId);
                    handleToggle();
                  }}
                  style={{ width: '105%' }}
                >
                  <Image src={cakeImageWithId[cake.cakeId]} alt="선물 이미지" />
                  <span className="font-galmuri text-white text-[10px] px-8 py-2 bg-black bg-opacity-50 rounded-4xl">
                    {cake.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {toggleState && selectedPresentId > 0 && (
        <CakeMessageModal
          // wishId={loginUserInfo.wishId}
          wishId={'205'}
          presentId={selectedPresentId}
          toggleState={toggleState}
          handleToggle={handleToggle}
        />
      )}
    </>
  );
}

export function WishesCreateOrShareButton({
  isWishesCreateBefore,
}: {
  isWishesCreateBefore: boolean;
}) {
  const router = useRouter();
  const { toggleState: openWishesTitleModalState, handleToggle: handleOpenWishesTitleModal } =
    useToggle();

  function handleClick() {
    if (isWishesCreateBefore) {
      handleOpenWishesTitleModal();
      // router.push('/wishes/create?step=link');
    } else {
      // 소원 공유 동작
    }
  }

  return (
    <>
      {openWishesTitleModalState && (
        <WishesTitleInputModal
          isOpen={openWishesTitleModalState}
          handleToggle={handleOpenWishesTitleModal}
        />
      )}
      <FixedBottomButton bgColor="main_blue" fontColor="black" onClick={handleClick}>
        {isWishesCreateBefore ? '생일잔치 링크 생성하기' : '생일잔치 링크 공유하기'}
      </FixedBottomButton>
    </>
  );
}

function WishesTitleInputModal({
  isOpen,
  handleToggle,
}: {
  isOpen: boolean;
  handleToggle: () => void;
}) {
  return <CloseIconInModal isOpen={isOpen} handleToggle={handleToggle}></CloseIconInModal>;
}

function CakeMessageModal({
  presentId,
  wishId,
  toggleState,
  handleToggle,
}: {
  presentId: number;
  wishId: string;
  toggleState: boolean;
  handleToggle: () => void;
}) {
  // const {} = useGetCakesInfo(presentId, Number(wishId));
  return (
    <CloseTopModal isOpen={toggleState} handleToggle={handleToggle} bgColor={'background'}>
      <div className="flex flex-col items-center w-full h-full">
        <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-40">{`선물주 운영자님이\n님에게 남긴 편지에요\n이미지를 저장해보세요!`}</span>
        <div className="flex flex-col items-center w-full h-full p-20 bg-dark_green rounded-2xl text-white">
          <span className="font-galmuri  text-[16px] px-14 py-8 bg-black bg-opacity-50 rounded-4xl">
            테스트
          </span>
          {/* <Image></Image> */}
          <span className="text-[14px]">안녕하세요 조물주보다 생일선물주</span>

          <div className="flex justify-between items-center w-full h-54 p-12 rounded-xl border border-main_blue">
            <span className="text-[16px]">선물한 항목</span>
            <span className="font-bitbit">정성담은 편지</span>
          </div>
        </div>
      </div>
    </CloseTopModal>
  );
}
