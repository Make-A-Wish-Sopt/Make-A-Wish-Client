'use client';

import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import { ReceivedCakeTreeMessageDataType } from '@/constant/model/cakesTreeData';
import { useRouters } from '@/hooks/common/useRouters';
import Button from '@/components/Common/Button';
import { PropsWithChildren, useState } from 'react';
import ShareLinkModal from '@/components/Common/Modal/ShareLinkModal';
import { getCakePresentMessage } from '@/api/cakes';
import { MainProgressDataType } from '@/types/wishesType';
import {
  WishesPageContainerStateInit,
  WishesPageContainerStateType,
  WishesPageModalStateInit,
  WishesPageModalStateType,
} from '@/constant/init';
import { ModalContextProvider, useModalContext } from '@/Context/modalContext';
import ModalPortal from '@/layouts/ModalPortal';
import useHandleModalState from '@/hooks/common/useHandleToggle';
import CloseIconInModalWithVitaminCake from '@/components/Common/Modal/CloseIconInModalWithVitaminCake';
import Image from 'next/image';
import { ContainerContextProvider } from '@/Context/containerContext';
import { SaveCakeMessageModal } from './component';
import useToggle from '@/hooks/common/useToggle';
import { CakeItemName, CakeTreeFrameContent } from './content';
import { useForm } from 'react-hook-form';
import InputText from '@/components/Common/Input/inputText';
import { convertEncode } from '@/utils/common/convert';

export default function WishesPageContainer({
  progressWishesData,
  userNickname,
  FixedBottomButton,
  children,
}: {
  progressWishesData?: MainProgressDataType;
  userNickname: string;
  FixedBottomButton: JSX.Element;
} & PropsWithChildren) {
  return (
    <>
      <ContainerContextProvider<WishesPageContainerStateType> init={WishesPageContainerStateInit}>
        <section className="relative">{children}</section>
      </ContainerContextProvider>

      {/* Wishes페이지에서 사용되는 모달 */}
      <ModalContextProvider<WishesPageModalStateType> init={WishesPageModalStateInit}>
        <ModalPortal>
          <WishesLinkSnsShareModal wishId={progressWishesData?.wishId} nickName={userNickname} />
          <WishesCreateTitleInputModal />
        </ModalPortal>
        {FixedBottomButton}
      </ModalContextProvider>
    </>
  );
}

export function CakePresentList({
  cakeList,
  readonly = false,
  nickname,
  wishId,
}: {
  cakeList: ReceivedCakeTreeMessageDataType[];
  readonly?: boolean;
  nickname?: string; //모달상단에 표시되는 유저의 이름
  wishId?: string; //선택한 케이크의 메세지를 가져오기위한 변수
}) {
  const numberOfRows = Math.max(4, Math.floor((cakeList.length - 1) / 3) + 1);
  const isLoading = useToggle();
  const cakeMessageModalState = useToggle();

  const [cakePresentMessage, setCakePresentMessage] =
    useState<ReceivedCakeTreeMessageDataType>(null);

  async function handleSelectCake(cake: ReceivedCakeTreeMessageDataType) {
    if (readonly || !wishId) return;

    try {
      isLoading.changeState(true);
      if (cake.presentId > 0) {
        const response = await getCakePresentMessage(wishId, cake.presentId);

        setCakePresentMessage({
          ...response,
          cakeImg: cake.cakeImg,
          isAdminMessage: false,
          presentId: cake.presentId,
        });
      } else {
        setCakePresentMessage({
          ...cake,
        });
      }
      cakeMessageModalState.changeState(true);
    } catch (error) {
    } finally {
      setTimeout(() => {
        isLoading.changeState(false);
      }, 800);
    }
  }

  return (
    <>
      <CakeTreeFrameContent>
        {/* 케이크 접시 구성 */}
        {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
          <div
            className="absolute top-128 w-375 h-222 bg-cover bg-no-repeat bg-[url('/assets/images/cakeDishImg.png')]"
            key={rowIndex}
            style={{
              top: `${rowIndex * 165}px`,
              backgroundPosition: 'center 1px',
            }}
          >
            {/* 층별로 3개씩 케이크 배치 */}
            <ul className="grid grid-cols-3 justify-center gap-x-[-10px] custom-grid w-full h-full mt-70 px-65">
              {cakeList.slice(rowIndex * 3, rowIndex * 3 + 3).map((cake, index) => (
                <li
                  id="cake-item"
                  className="relative z-10 flex flex-col items-center w-100  aspect-square  transform translate-y-[-30px] justify-self-center"
                  key={`${cake.name}${cake.cakeId} ${index}`}
                  onClick={() => {
                    handleSelectCake(cake);
                  }}
                >
                  <Image src={cake.cakeImg} alt="케이크 이미지" width={100} />
                  <CakeItemName>
                    {cake.name.length > 10 ? `${cake.name.slice(0, 9)}...님` : cake.name}
                  </CakeItemName>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CakeTreeFrameContent>

      {cakePresentMessage && (
        <ModalPortal>
          <SaveCakeMessageModal
            modalState={cakeMessageModalState.state}
            handleModalState={cakeMessageModalState.handleState}
            nickName={nickname}
            isLoading={isLoading.state}
            cakePresentMessage={cakePresentMessage}
          />
        </ModalPortal>
      )}
    </>
  );
}

function WishesCreateTitleInputModal() {
  const { getModalState, handleModalState } = useHandleModalState<WishesPageModalStateType>(
    'wishesTitleInputModalState',
  );

  const { register, getValues } = useForm<{ wishesTitle: string }>({
    mode: 'onChange',
    defaultValues: {
      wishesTitle: '',
    },
  });

  const { handleRouter } = useRouters();

  function handleClick() {
    const wishTitle = getValues('wishesTitle');
    if (wishTitle) {
      const encodeWishTitle = convertEncode(wishTitle);
      handleRouter(`/wishes/create?step=link&wishTitle=${encodeWishTitle}`);
    }
  }

  return (
    <CloseIconInModalWithVitaminCake
      modalTitle="생일 잔치상 만들기"
      isOpen={getModalState()}
      handleState={handleModalState}
    >
      <div className="w-full">
        <label className="font-galmuri text-[14px] text-background mb-5">제목 정하기</label>
        <InputText register={register('wishesTitle')} placeholder="ex) 에어팟맥스 받게 해주세요" />
      </div>
      <Button
        bgColor="dark_green"
        fontColor="white"
        style={{ width: '13.8rem' }}
        onClick={handleClick}
      >
        입장하기
      </Button>
    </CloseIconInModalWithVitaminCake>
  );
}

export function WishesLinkSnsShareModal({
  wishId,
  nickName = '티끌이',
}: {
  wishId: string;
  nickName?: string;
}) {
  const { state, update } = useModalContext<WishesPageModalStateType>();

  function handleShareLinkModalState() {
    update({
      ...state,
      shareLinkModalState: !state.shareLinkModalState,
    });
  }
  return (
    <ShareLinkModal
      modalState={state.shareLinkModalState}
      handleModalState={handleShareLinkModalState}
      wishId={wishId}
      nickName={nickName}
    />
  );
}

export function WishesPageFixedBottomButton({ isProgressWishes }: { isProgressWishes: boolean }) {
  const { handleModalState: handleShareLinkModalState } =
    useHandleModalState<WishesPageModalStateType>('shareLinkModalState');
  const { handleModalState: handleWishesTitleModalState } =
    useHandleModalState<WishesPageModalStateType>('wishesTitleInputModalState');

  function handleButtonClick() {
    if (isProgressWishes) {
      handleShareLinkModalState();
    } else {
      handleWishesTitleModalState();
    }
  }

  return (
    <>
      <FixedBottomButtonWrapper>
        <Button onClick={handleButtonClick}>
          {isProgressWishes ? '생일잔치 링크 공유하기' : '생일잔치 링크 생성하기'}
        </Button>
      </FixedBottomButtonWrapper>
    </>
  );
}
