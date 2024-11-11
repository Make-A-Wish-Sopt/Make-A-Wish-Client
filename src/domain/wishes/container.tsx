'use client';

import FixedBottomButton, {
  FixedBottomButtonWrapper,
} from '@/components/Common/Button/FixedBottomButton';
import { LoginUserDataType } from '@/utils/common/cookies';
import {
  CakeMessageModal,
  CakeTreeTest,
  MessageText,
  WishesCreateTitleInputModalContainer,
} from './component';
import { CakeItemType, defaultCakeListData } from '@/constant/model/cakes';
import { useRouters } from '@/hooks/common/useRouters';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import InputText from '@/components/Common/Input/inputText';
import Button from '@/components/Common/Button';
import { convertEncode } from '@/utils/common/convert';
import { PropsWithChildren, useEffect, useState } from 'react';
import { CakePresentMessageDataType } from '@/types/api/response';
import useSelectItem from '@/hooks/common/useSelectItem';
import { getCakePresentMessage } from '@/api/cakes';

type WishesPageGlobalStateType = {
  wishTitle: string;
  wishesTitleInputModalState: boolean;
  cakeMessageModalState: boolean;
};

export default function WishesPageContainer({ children }: PropsWithChildren) {
  const methods = useForm<WishesPageGlobalStateType>({
    defaultValues: {
      wishTitle: '',
      wishesTitleInputModalState: false,
      cakeMessageModalState: false,
    },
  });

  return <section className="relative">{children}</section>;
}

export function WishesPageContai({
  isWishProgress,
  loginUserData,
  children,
}: {
  isWishProgress: boolean;
  loginUserData: LoginUserDataType;
} & PropsWithChildren) {
  const { nickName } = loginUserData;

  const methods = useForm<WishesPageGlobalStateType>({
    defaultValues: {
      wishTitle: '',
      wishesTitleInputModalState: false,
      cakeMessageModalState: false,
    },
  });

  const { handleRouter } = useRouters();

  function handleChangeWishTitleModalState() {
    const state = methods.watch('wishesTitleInputModalState');
    methods.setValue('wishesTitleInputModalState', !state);
  }

  function handleChangeCakeMessageModalState() {
    const state = methods.watch('cakeMessageModalState');
    methods.setValue('cakeMessageModalState', !state);
  }

  return (
    <section className="relative">
      <FormProvider {...methods}>
        {isWishProgress ? (
          <>
            <span className="flex flex-row-reverse w-full text-[24px] font-bitbit text-center text-main_blue mt-12 mb-10">
              D-?
            </span>
            {children}
          </>
        ) : (
          <>
            <span className="flex flex-row-reverse w-full text-[24px] font-bitbit text-center text-main_blue mt-12 mb-10">
              D-?
            </span>

            <MessageText>{`${nickName}님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}</MessageText>
            <CakesTreeMessage
              cakeList={defaultCakeListData}
              handleChangeCakeMessageModalState={handleChangeCakeMessageModalState}
            />
          </>
        )}
        <FixedBottomButtonWrapper>
          <Button
            onClick={() => {
              isWishProgress ? handleRouter('/wishes') : handleChangeWishTitleModalState();
            }}
          >
            {isWishProgress ? '생일잔치 링크 공유하기' : '생일잔치 링크 생성하기'}
          </Button>
        </FixedBottomButtonWrapper>

        {methods.watch('wishesTitleInputModalState') && (
          <WishesCreateTitleInputModal handleState={handleChangeWishTitleModalState} />
        )}

        <div className="sticky bottom-0 w-full h-170 bg-[linear-gradient(180deg,_rgba(4,6,31,0)_0%,_rgba(4,6,31,1)_100%)]" />
      </FormProvider>
    </section>
  );
}

export function CakesTreeMessage({
  cakeList,
  wishId,
  handleChangeCakeMessageModalState,
}: {
  cakeList: CakeItemType[];
  wishId?: string;
  handleChangeCakeMessageModalState?: () => void;
}) {
  const { watch } = useFormContext<WishesPageGlobalStateType>();
  const state = watch('cakeMessageModalState');
  const { selectedId: selectedPresentId, handleSelectOne } = useSelectItem();
  const [cakePresentMessageData, setCakePresentMessageData] =
    useState<CakePresentMessageDataType | null>(null);

  useEffect(() => {
    if (selectedPresentId > 0) {
      getCakePresentMessage(wishId, selectedPresentId).then((response) => {
        setCakePresentMessageData(response);
      });
    }
  }, [selectedPresentId]);

  function handleSelectCake(id: number) {
    handleSelectOne(id);
    handleChangeCakeMessageModalState();
  }

  return (
    <>
      <CakeTreeTest cakeList={cakeList} handleSelectOne={handleSelectCake} />
      {state && selectedPresentId > 0 && cakePresentMessageData && (
        <CakeMessageModal
          state={state}
          handleChange={handleChangeCakeMessageModalState}
          cakePresentMessageData={cakePresentMessageData}
          nickName={'asdf'}
        />
      )}
    </>
  );
}

function WishesCreateTitleInputModal({ handleState }: { handleState: () => void }) {
  const { register, watch } = useFormContext<WishesPageGlobalStateType>();

  const { handleRouter } = useRouters();

  function handleClick() {
    const wishTitle = watch('wishTitle');

    if (wishTitle) {
      const encodeWishTitle = convertEncode(wishTitle);
      handleRouter(`/wishes/create?step=link&wishTitle=${encodeWishTitle}`);
    }
  }

  return (
    <WishesCreateTitleInputModalContainer
      isOpen={watch('wishesTitleInputModalState')}
      handleState={handleState}
    >
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
