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
import { WishStatusType } from '@/types/wishesType';

type WishesPageGlobalStateType = {
  wishTitle: string;
  wishesTitleInputModalState: boolean;
  cakeMessageModalState: boolean;
  cakePresentMessageData: ReceivedCakeTreeMessageDataType;
  shareLinkModalState: boolean;
};

export default function WishesPageContainer({ children }: PropsWithChildren) {
  const methods = useForm<WishesPageGlobalStateType>({
    mode: 'onChange',
    defaultValues: {
      wishTitle: '',
      wishesTitleInputModalState: false,
      cakeMessageModalState: false,
      shareLinkModalState: false,
    },
  });

  return (
    <section className="relative">
      <FormProvider {...methods}>
        {children}
        <WishesCreateTitleInputModal />
      </FormProvider>
    </section>
  );
}

export function WishesPageFixedBottomButton({
  isWishProgress,
  disabled = false,
  children,
}: {
  isWishProgress: boolean;
  disabled?: boolean;
} & PropsWithChildren) {
  const { setValue, watch } = useFormContext<WishesPageGlobalStateType>();

  function handleShareLinkModalState() {
    const modalState = watch('shareLinkModalState');

    setValue('shareLinkModalState', !modalState);
  }

  function handleButtonClick() {
    if (isWishProgress) {
      handleShareLinkModalState();
    } else {
      handleChangeWishTitleModalState();
    }
  }

  function handleChangeWishTitleModalState() {
    const modalState = watch('wishesTitleInputModalState');

    setValue('wishesTitleInputModalState', !modalState);
  }

  return (
    <>
      <FixedBottomButtonWrapper>
        <Button onClick={handleButtonClick} disabled={disabled}>
          {children}
        </Button>
      </FixedBottomButtonWrapper>
    </>
  );
}

export function CakesTreeMessage({ cakeList }: { cakeList: ReceivedCakeTreeMessageDataType[] }) {
  const { watch, setValue } = useFormContext<WishesPageGlobalStateType>();

  function handleChangeCakeMessageModalState() {
    const modalState = watch('cakeMessageModalState');

    setValue('cakeMessageModalState', !modalState);
  }

  function handleSelectCake(cake: ReceivedCakeTreeMessageDataType) {
    setValue('cakePresentMessageData', cake);
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
  const { setValue, getValues, watch } = useFormContext<WishesPageGlobalStateType>();

  const modalState = getValues('cakeMessageModalState');
  const messageData = watch('cakePresentMessageData');

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const [receivedCakeMessageData, setReceivedCakeMessageData] =
    useState<ReceivedCakeTreeMessageDataType>(null);

  useEffect(() => {
    if (messageData) {
      const { presentId, cakeImg } = watch('cakePresentMessageData');

      setIsLoading(true); // 로딩 시작

      if (presentId > 0) {
        getCakePresentMessage(wishId, presentId)
          .then((response) => {
            setReceivedCakeMessageData({
              ...response,
              cakeImg: cakeImg,
              isAdminMessage: false,
              presentId: presentId,
            });
          })
          .finally(() => {
            setTimeout(() => {
              setIsLoading(false); // 로딩 완료
            }, 800);
          });
      } else {
        setReceivedCakeMessageData({ ...messageData });
        setTimeout(() => {
          setIsLoading(false); // 로딩 완료
        }, 800);
      }
    }
  }, [messageData]);

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
  const { register, setValue, getValues } = useFormContext<WishesPageGlobalStateType>();

  const { handleRouter } = useRouters();

  const modalState = getValues('wishesTitleInputModalState');

  function handleModalState() {
    setValue('wishesTitleInputModalState', !modalState);
  }

  function handleClick() {
    const wishTitle = getValues('wishTitle');

    if (wishTitle) {
      // const encodeWishTitle = convertEncode(wishTitle);
      handleRouter(`/wishes/create?step=link&wishTitle=${wishTitle}`);
    }
  }

  return (
    <WishesCreateTitleInputModalContainer isOpen={modalState} handleState={handleModalState}>
      <div className="w-full">
        <label className="font-galmuri text-[14px] text-background mb-5">제목 정하기</label>
        <InputText register={register('wishTitle')} placeholder="ex) 에어팟맥스 받게 해주세요" />
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
  const { setValue, watch } = useFormContext<WishesPageGlobalStateType>();
  const modalState = watch('shareLinkModalState');

  function handleShareLinkModalState() {
    setValue('shareLinkModalState', !modalState);
  }
  return (
    <ShareLinkModal
      modalState={modalState}
      handleModalState={handleShareLinkModalState}
      wishId={wishId}
      nickName={nickName}
    />
  );
}
