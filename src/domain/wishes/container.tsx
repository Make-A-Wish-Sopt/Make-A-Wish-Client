'use client';

import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import { CakeTree, WishesCreateTitleInputModalContainer } from './component';
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
import CloseTopModal from '@/components/Common/Modal/CloseTopModal';
import Image from 'next/image';
import { getCakePresentMessage } from '@/api/cakes';
import { presentListObject } from '@/constant/model/present';

type WishesPageGlobalStateType = {
  wishTitle: string;
  wishesTitleInputModalState: boolean;
  cakeMessageModalState: boolean;
  cakePresentMessageData: CakePresentMessageDataType & { isAdminMessage: boolean };
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

      <GradientShadow height={170} />
    </section>
  );
}

export function WishesPageFixedBottomButton({ isWishProgress }: { isWishProgress: boolean }) {
  const { handleRouter } = useRouters();

  const { setValue, watch } = useFormContext<WishesPageGlobalStateType>();

  function handleButtonClick() {
    if (isWishProgress) {
      handleRouter('/wishes');
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
  const { cakeId, message, name, isAdminMessage, giftMenuId } = watch('cakePresentMessageData');

  console.log(watch('cakePresentMessageData'));

  function handleModalState() {
    setValue('cakeMessageModalState', !modalState);
  }

  return (
    <CloseTopModal isOpen={modalState} handleState={handleModalState} bgColor={'background'}>
      <div className={`flex flex-col items-center w-full h-full font-galmuri`}>
        <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-40">{`${name}님이\n${nickName}님에게 남긴 편지에요\n이미지를 저장해보세요!`}</span>
        <div
          className={`flex flex-col items-center w-full h-full p-20  rounded-2xl  ${
            isAdminMessage ? 'bg-main_blue text-dark_blue ' : 'bg-dark_green text-white'
          }`}
        >
          <span
            className={`text-[16px] px-14 py-8 ${
              isAdminMessage ? 'bg-white' : 'bg-black '
            } bg-opacity-50 rounded-4xl`}
          >
            {name}
          </span>
          <Image
            src={defaultCakeTreeDataObject[cakeId].cakeImg}
            alt="보낸 케이크 아바타 이미지"
            width={160}
          />
          <span className="h-110 text-[14px] mb-13 text-center whitespace-pre-wrap ">
            {message}
          </span>

          <div
            className={`flex justify-between items-center w-full h-54 p-12 rounded-xl border  font-bitbit text-[16px] ${
              isAdminMessage ? 'border-dark_blue' : 'border-main_blue'
            }`}
          >
            <span className="font-galmuri">선물한 항목</span>
            <span>
              {isAdminMessage
                ? giftMenuId
                : giftMenuId
                ? presentListObject[giftMenuId].itemName
                : '정성 담은 편지'}
            </span>
          </div>
        </div>
      </div>
      <FixedBottomButtonWrapper>
        <Button>이미지 저장하기</Button>
      </FixedBottomButtonWrapper>
    </CloseTopModal>
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
