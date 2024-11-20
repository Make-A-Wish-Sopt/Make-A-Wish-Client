'use client';

import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import { CakeMessageModalUI, CakeTree, WishesCreateTitleInputModalContainer } from './component';
import {
  CakeTreeDataType,
  defaultCakeTreeDataObject,
  DummyCakeTreeDataType,
} from '@/constant/model/cakesTreeData';
import { useRouters } from '@/hooks/common/useRouters';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import InputText from '@/components/Common/Input/inputText';
import Button from '@/components/Common/Button';
import { convertEncode } from '@/utils/common/convert';
import { PropsWithChildren, useEffect, useState } from 'react';
import { CakePresentMessageDataType } from '@/types/api/response';
import useSelectItem from '@/hooks/common/useSelectItem';
import GradientShadow from '@/components/UI/GradientShadow';
import { getCakePresentMessage } from '@/api/cakes';
import ShareLinkModal from '@/components/Common/Modal/ShareLinkModal';

type WishesPageGlobalStateType = {
  wishTitle: string;
  wishesTitleInputModalState: boolean;
  cakeMessageModalState: boolean;
  cakePresentMessageData: CakePresentMessageDataType & { isAdminMessage: boolean };
  shareLinkModalState: boolean;
};

export default function WishesPageContainer({
  nickName,
  children,
}: { nickName: string } & PropsWithChildren) {
  const methods = useForm<WishesPageGlobalStateType>({
    mode: 'onChange',
    defaultValues: {
      wishTitle: '',
      wishesTitleInputModalState: false,
      cakeMessageModalState: false,
      shareLinkModalState: false,
    },
  });

  const cakePresentMessageData = methods.watch('cakePresentMessageData');

  return (
    <section className="relative">
      <FormProvider {...methods}>
        {children}
        <WishesCreateTitleInputModal />
        {cakePresentMessageData && <CakeMessageModal nickName={nickName} />}
      </FormProvider>
    </section>
  );
}

export function WishesPageFixedBottomButton({ isWishProgress }: { isWishProgress: boolean }) {
  const { handleRouter } = useRouters();

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
        <Button onClick={handleButtonClick}>
          {isWishProgress ? '생일잔치 링크 공유하기' : '생일잔치 링크 생성하기'}
        </Button>
      </FixedBottomButtonWrapper>
    </>
  );
}

export function CakesTreeMessage({
  cakeList,
  wishId,
}: {
  cakeList: CakeTreeDataType[];
  wishId?: string;
}) {
  const { watch, setValue } = useFormContext<WishesPageGlobalStateType>();

  const { selectedId: selectedPresentId, handleSelectOne } = useSelectItem();
  const [dummyCakeId, setDummyCakeId] = useState(-1);

  useEffect(() => {
    if (selectedPresentId > 0) {
      getCakePresentMessage(wishId, selectedPresentId).then((response) => {
        setValue('cakePresentMessageData', { ...response, isAdminMessage: false });
      });
    }

    if (dummyCakeId >= 0) {
      setValue('cakePresentMessageData', {
        ...defaultCakeTreeDataObject[dummyCakeId],
        name: '선물주운영자',
        cakeId: dummyCakeId,
      });
    }
    defaultCakeTreeDataObject;
  }, [selectedPresentId, dummyCakeId]);

  function handleChangeCakeMessageModalState() {
    const modalState = watch('cakeMessageModalState');

    setValue('cakeMessageModalState', !modalState);
  }

  function handleSelectCake(id: number) {
    handleSelectOne(id);
    handleChangeCakeMessageModalState();
  }

  function handleSetCakeData(cake: DummyCakeTreeDataType) {
    if (selectedPresentId === 0) {
      setDummyCakeId(cake.cakeId);
    } else {
      setDummyCakeId(-1);
    }
  }

  return (
    <>
      <CakeTree
        cakeList={cakeList}
        handleSelectOne={handleSelectCake}
        handleSetCakeData={handleSetCakeData}
      />
    </>
  );
}

function CakeMessageModal({ nickName }: { nickName: string }) {
  const { setValue, getValues, watch } = useFormContext<WishesPageGlobalStateType>();

  const modalState = getValues('cakeMessageModalState');
  const messageData = watch('cakePresentMessageData');

  function handleModalState() {
    setValue('cakeMessageModalState', !modalState);
  }

  return (
    <CakeMessageModalUI
      modalState={modalState}
      handleModalState={handleModalState}
      messageData={messageData}
      nickName={nickName}
    >
      <FixedBottomButtonWrapper>
        <Button>이미지 저장하기</Button>
      </FixedBottomButtonWrapper>
    </CakeMessageModalUI>
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
      const encodeWishTitle = convertEncode(wishTitle);
      handleRouter(`/wishes/create?step=link&wishTitle=${encodeWishTitle}`);
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
        styles={{ width: '13.8rem' }}
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
