'use client';

import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import { CakeTree, SaveCakeMessageModal, WishesCreateTitleInputModalContainer } from './component';
import { ReceivedCakeTreeMessageDataType } from '@/constant/model/cakesTreeData';
import { useRouters } from '@/hooks/common/useRouters';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import InputText from '@/components/Common/Input/inputText';
import Button from '@/components/Common/Button';
import { convertEncode } from '@/utils/common/convert';
import { PropsWithChildren, useEffect, useState } from 'react';
import ShareLinkModal from '@/components/Common/Modal/ShareLinkModal';
import { getCakePresentMessage } from '@/api/cakes';
import { MainProgressDataType } from '@/types/wishesType';

import {
  initialWishesPageModalState,
  wishesAccountInputInit,
  WishesPageModalState,
} from '@/constant/init';
import { ModalContextProvider, useModalContext } from '@/Context/modalContext';
import { checkComp } from '@/utils/common/checkComponent';
import ModalPortal from '@/layouts/ModalPortal';

export default function WishesPageContainer({
  progressWishesData,
  FixedBottomButton,
  children,
}: {
  progressWishesData?: MainProgressDataType;
  FixedBottomButton: JSX.Element;
} & PropsWithChildren) {
  return (
    <>
      <section className="relative">{children}</section>

      {/* Wishes페이지에서 사용되는 모달 */}
      <ModalContextProvider<WishesPageModalState> init={initialWishesPageModalState}>
        <ModalPortal>
          <WishesLinkSnsShareModal
            wishId={progressWishesData?.wishId}
            // nickName={loginUserData.nickName}
            nickName={'하이용'}
          />
        </ModalPortal>
        {FixedBottomButton}
      </ModalContextProvider>
    </>
  );
}

export function WishesPageFixedBottomButton({ isProgressWishes }: { isProgressWishes: boolean }) {
  const { state, update } = useModalContext<WishesPageModalState>();

  function handleShareLinkModalState() {
    update({
      ...state,
      shareLinkModalState: !state.shareLinkModalState,
    });
  }

  function handleButtonClick() {
    if (isProgressWishes) {
      handleShareLinkModalState();
    } else {
      handleChangeWishTitleModalState();
    }
  }

  function handleChangeWishTitleModalState() {
    const { state, update } = useModalContext<WishesPageModalState>();

    update({
      ...state,
      wishesTitleInputModalState: !state.wishesTitleInputModalState,
    });
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

export function CakesTreeMessage({ cakeList }: { cakeList: ReceivedCakeTreeMessageDataType[] }) {
  const { state, update } = useModalContext<WishesPageModalState>();

  function handleChangeCakeMessageModalState() {
    update({
      ...state,
      cakeMessageModalState: !state.cakeMessageModalState,
    });
  }

  function handleSelectCake(cake: ReceivedCakeTreeMessageDataType) {
    // setValue('cakePresentMessageData', cake);
    handleChangeCakeMessageModalState();
  }

  return <CakeTree cakeList={cakeList} handleSelectCake={handleSelectCake} />;
}

export function ReceivedCakeMessageModal({
  nickName,
  wishId,
}: {
  nickName: string;
  wishId: string;
}) {
  const { setValue, getValues, watch } = useFormContext<WishesPageModalState>();

  const modalState = getValues('cakeMessageModalState');
  // const messageData = watch('cakePresentMessageData');

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const [receivedCakeMessageData, setReceivedCakeMessageData] =
    useState<ReceivedCakeTreeMessageDataType>(null);

  // useEffect(() => {
  //   if (messageData) {
  //     const { presentId, cakeImg } = watch('cakePresentMessageData');

  //     setIsLoading(true); // 로딩 시작

  //     if (presentId > 0) {
  //       getCakePresentMessage(wishId, presentId)
  //         .then((response) => {
  //           setReceivedCakeMessageData({
  //             ...response,
  //             cakeImg: cakeImg,
  //             isAdminMessage: false,
  //             presentId: presentId,
  //           });
  //         })
  //         .finally(() => {
  //           setTimeout(() => {
  //             setIsLoading(false); // 로딩 완료
  //           }, 800);
  //         });
  //     } else {
  //       setReceivedCakeMessageData({ ...messageData });
  //       setTimeout(() => {
  //         setIsLoading(false); // 로딩 완료
  //       }, 800);
  //     }
  //   }
  // }, [messageData]);

  function handleModalState() {
    setValue('cakeMessageModalState', !modalState);
  }

  return (
    <>
      {receivedCakeMessageData && (
        <SaveCakeMessageModal
          modalState={modalState}
          handleModalState={handleModalState}
          receivedCakeMessageData={receivedCakeMessageData}
          nickName={nickName}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

function WishesCreateTitleInputModal() {
  const { register, setValue, getValues } = useFormContext<WishesPageModalState>();

  const { handleRouter } = useRouters();

  const modalState = getValues('wishesTitleInputModalState');

  function handleModalState() {
    setValue('wishesTitleInputModalState', !modalState);
  }

  function handleClick() {
    // const wishTitle = getValues('wishTitle');
    // if (wishTitle) {
    //   const encodeWishTitle = convertEncode(wishTitle);
    //   handleRouter(`/wishes/create?step=link&wishTitle=${encodeWishTitle}`);
    // }
  }

  return (
    <WishesCreateTitleInputModalContainer isOpen={modalState} handleState={handleModalState}>
      <div className="w-full">
        <label className="font-galmuri text-[14px] text-background mb-5">제목 정하기</label>
        {/* <InputText register={register('wishTitle')} placeholder="ex) 에어팟맥스 받게 해주세요" /> */}
      </div>
      <Button
        bgColor="dark_green"
        fontColor="white"
        style={{ width: '13.8rem' }}
        onClick={handleClick}
      >
        입장하기
      </Button>
    </WishesCreateTitleInputModalContainer>
  );
}

export function WishesLinkSnsShareModal({
  wishId,
  nickName,
}: {
  wishId: string;
  nickName: string;
}) {
  checkComp();
  const { state, update } = useModalContext<WishesPageModalState>();

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
