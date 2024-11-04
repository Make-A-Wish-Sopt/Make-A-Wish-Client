'use client';

import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';
import { MainProgressDataType } from '@/types/wishesType';
import { LoginUserDataType } from '@/utils/common/cookies';
import {
  CakeMessageModal,
  CakeTreeTest,
  MessageText,
  WishesCreateTitleInputModalContainer,
} from './component';
import { cakeImageWithId, CakeItemType, defaultCakeListData } from '@/constant/model/cakes';
import { WishesMessageToCreateUser } from './service';
import { useRouters } from '@/hooks/common/useRouters';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import InputText from '@/components/Common/Input/inputText';
import Button from '@/components/Common/Button';
import { convertEncode } from '@/utils/common/convert';
import { useEffect, useState } from 'react';
import { CakePresentMessageDataType } from '@/types/api/response';
import useToggle from '@/hooks/common/useToggle';
import useSelectItem from '@/hooks/common/useSelectItem';
import { getCakePresentMessage } from '@/api/cakes';

type WishesPageFormStateType = {
  wishTitle: string;
  wishesTitleInputModalState: boolean;
  cakeMessageModalState: boolean;
};

export default function WishesPageContainer({
  progressWishesData,
  loginUserData,
}: {
  progressWishesData: MainProgressDataType;
  loginUserData: LoginUserDataType;
}) {
  const { nickName } = loginUserData;

  const methods = useForm<WishesPageFormStateType>({
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
    <FormProvider {...methods}>
      {progressWishesData ? (
        <>
          <WishesMessageToCreateUser wishId={progressWishesData.wishId} />
          <FixedBottomButton onClick={() => handleRouter('/wishes')}>
            생일잔치 링크 공유하기
          </FixedBottomButton>
        </>
      ) : (
        <>
          <MessageText>{`${nickName}님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}</MessageText>
          <CakesTreeMessage
            cakeList={defaultCakeListData}
            handleChangeCakeMessageModalState={handleChangeCakeMessageModalState}
          />
          <FixedBottomButton onClick={handleChangeWishTitleModalState}>
            생일잔치 링크 생성하기
          </FixedBottomButton>
        </>
      )}

      {methods.watch('wishesTitleInputModalState') && (
        <WishesCreateTitleInputModal handleToggle={handleChangeWishTitleModalState} />
      )}

      {/* <div className="fixed bottom-0 w-full h-170 bg-[linear-gradient(180deg,_rgba(4,6,31,0)_0%,_rgba(4,6,31,1)_100%)]" /> */}
    </FormProvider>
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
  const { watch } = useFormContext<WishesPageFormStateType>();
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

  console.log(selectedPresentId);

  return (
    <>
      <CakeTreeTest cakeList={cakeList} handleSelectOne={handleSelectCake} />
      {state && selectedPresentId > 0 && cakePresentMessageData && (
        <CakeMessageModal
          toggleState={state}
          handleToggle={handleChangeCakeMessageModalState}
          cakePresentMessageData={cakePresentMessageData}
          nickName={'asdf'}
        />
      )}
    </>
  );
}

function WishesCreateTitleInputModal({ handleToggle }: { handleToggle: () => void }) {
  const { register, watch } = useFormContext<WishesPageFormStateType>();

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
      handleToggle={handleToggle}
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
