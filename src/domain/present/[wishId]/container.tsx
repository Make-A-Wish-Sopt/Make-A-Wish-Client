'use client';

import { PresentStepType } from '@/app/present/[wishId]/page';
import { presentDataInputInit } from '@/constant/init';
import { presentDataResolver, PresentDataResolverType } from '@/validation/present.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropsWithChildren, useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import PresentGiverInfoInputForm from './presentGiverInfoInputForm';
import InputForm from '@/components/UI/InputForm';
import PresentList from '@/components/UI/PresentList';
import useToggle from '@/hooks/common/useToggle';
import Box from '@/components/Common/Box';
import CheckBox from '@/components/UI/CheckBox';
import Button from '@/components/Common/Button';
import { postPublicCakes } from '@/api/public';
import { useRouters } from '@/hooks/common/useRouters';
import { CakePresentMessageDataType, PublicWishesDataType } from '@/types/api/response';
import Payment from './payment';
import CloseIconInModalWithVitaminCake from '@/components/Common/Modal/CloseIconInModalWithVitaminCake';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import {
  defaultCakeTreeDataArray,
  defaultCakeTreeDataObject,
} from '@/constant/model/cakesTreeData';
import PresentSuccess, { PresentSuccessCakeTree } from './done';
import { MessageFromWisheMaker, PresentSuccessSubmitButton } from './component';
import { CakeMessageModalUI } from '@/domain/wishes/component';
import GradientShadow from '@/components/UI/GradientShadow';

export default function GivePresentPageContainer({
  avatarCakeId,
  step,
  publicWishesData,
  wishId,
  children,
}: {
  avatarCakeId: string;
  step: PresentStepType;
  publicWishesData: PublicWishesDataType;
  wishId: string;
} & PropsWithChildren) {
  const methods = useForm<PresentDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...presentDataInputInit,
      cakeId: Number(avatarCakeId),
    },
    resolver: yupResolver(presentDataResolver),
  });

  const { wantsGift } = publicWishesData;
  const { state: messageOnlyOption, changeState: changeMessageOnlyOption } = useToggle();
  const {
    state: presenetMessageModalState,
    handleState: handlePresentMessageModalState,
    changeState: changePresenetMessgaeModalState,
  } = useToggle();

  const [selectedCakeId, setSelectedCakeId] = useState<string | null>(null);

  useEffect(() => {
    if (avatarCakeId !== undefined) {
      setSelectedCakeId(avatarCakeId);
    }
  }, [avatarCakeId]);

  const { handleRouter } = useRouters();

  useEffect(() => {
    if (messageOnlyOption) {
      changeGiftMenuId(0);
    }
  }, [messageOnlyOption]);

  function changeGiftMenuId(id: number) {
    methods.setValue('giftMenuId', id);
  }

  function handleGivePresent() {
    if (wantsGift && !messageOnlyOption) {
      handleNextToPaymentStep();
    } else {
      GivePresent();
      handleRouter(`/present/${wishId}/?presentStep=done`);
    }
  }

  function isValid() {
    if (!methods.formState.isValid) return false;

    const giftMenuId = methods.watch('giftMenuId');

    if (!messageOnlyOption && !giftMenuId) return false;

    return true;
  }

  function GivePresent() {
    try {
      const data = methods.watch();
      postPublicCakes({ ...data, wishId: wishId });
    } catch (error) {}
  }

  function handleNextToPaymentStep() {
    const giftMenuId = methods.getValues('giftMenuId');

    handleRouter(`/present/${wishId}/?presentStep=payment&presentId=${giftMenuId}`);
  }

  return (
    <>
      {children}
      <FormProvider {...methods}>
        {
          {
            present: (
              <>
                <MessageFromWisheMaker publicWishesData={publicWishesData} />
                <PresentGiverInfoInputForm>
                  {wantsGift && (
                    <InputForm title="선물하고 싶은 항목 선택하기">
                      {!messageOnlyOption && <PresentList changeGiftMenuId={changeGiftMenuId} />}
                      <Box bgColor="dark_green" fontColor="gray2" styles={{ marginTop: '0.6rem' }}>
                        <CheckBox<PresentDataResolverType>
                          checkBoxText="편지만 보낼게요"
                          changeCheckedState={changeMessageOnlyOption}
                        />
                      </Box>
                    </InputForm>
                  )}
                </PresentGiverInfoInputForm>
                <Button
                  onClick={handleGivePresent}
                  style={{ marginBottom: '5.8rem' }}
                  disabled={!isValid()}
                >
                  {'친구 생일 축하해주기'}
                </Button>
              </>
            ),
            payment: (
              <>
                <Payment account={`${publicWishesData.accountNumber} ${publicWishesData.bank}`} />
                <Button
                  onClick={() => {
                    GivePresent();
                    handleRouter(
                      `/present/${wishId}?presentStep=done&avatarCakeId=${selectedCakeId}`,
                    );
                  }}
                  style={{ marginBottom: '5.8rem' }}
                >
                  {'송금하고, 편지 확인하기'}
                </Button>
              </>
            ),
            done: (
              <section className="relative w-full">
                {
                  <PresentMessageModal
                    nickName={publicWishesData.name}
                    modalState={presenetMessageModalState}
                    handleModalState={handlePresentMessageModalState}
                    changeModalState={changePresenetMessgaeModalState}
                    selectedCakeId={selectedCakeId}
                  />
                }
                <PresentSuccess
                  giverName={methods.getValues('name')}
                  wishesName={publicWishesData.name}
                />
                <PresentSuccessCakeTree
                  cakeList={[
                    defaultCakeTreeDataObject[selectedCakeId],
                    ...defaultCakeTreeDataArray,
                  ]}
                />

                <GradientShadow height={19} />
                <PresentSuccessSubmitButton />
              </section>
            ),
          }[step]
        }
      </FormProvider>
    </>
  );
}

function CheckSendMoneyModal({
  modalState,
  handleModalState,
  wishId,
  selectedCakeId,
}: {
  modalState: boolean;
  handleModalState: () => void;
  wishId: string;
  selectedCakeId: string;
}) {
  const { handleRouter } = useRouters();

  function handleNextStep() {
    handleRouter(`/present/${wishId}?presentStep=done&avatarCakeId=${selectedCakeId}`);
    handleModalState();
  }

  return (
    <CloseIconInModalWithVitaminCake
      modalTitle="친구 계좌로 돈을 송금하셨나요?"
      modalColor="main_blue"
      isOpen={modalState}
      handleState={handleModalState}
    >
      <span className="w-full font-galmuri text-[14px] text-dark_blue whitespace-pre-line text-center">
        {'은행 앱으로 직접 송금하지 않았다면\n실제로 돈이 보내진 게 아니니 안심하세요!'}
      </span>

      <div className="flex justify-between gap-10 w-full">
        <Button bgColor="white" fontColor="dark_green">
          {'송금 안했어요'}
        </Button>

        <Button bgColor="dark_green" fontColor="white" onClick={handleNextStep}>
          {'송금했어요'}
        </Button>
      </div>
    </CloseIconInModalWithVitaminCake>
  );
}

function PresentMessageModal({
  nickName,
  modalState,
  handleModalState,
  changeModalState,
  selectedCakeId,
}: {
  nickName: string;
  modalState: boolean;
  handleModalState: () => void;
  changeModalState: (state: boolean) => void;
  selectedCakeId: string;
}) {
  useEffect(() => {
    changeModalState(true);
  }, []);

  const { watch } = useFormContext<PresentDataResolverType>();
  const { name, message, giftMenuId } = watch();

  const messageData: CakePresentMessageDataType & { isAdminMessage: boolean } = {
    name: name,
    message: message,
    giftMenuId: giftMenuId,
    cakeId: Number(selectedCakeId),
    isAdminMessage: false,
  };

  return (
    <>
      <CakeMessageModalUI
        modalState={modalState}
        handleModalState={handleModalState}
        messageData={messageData}
        nickName={nickName}
      >
        <Button>이미지 저장하기</Button>
      </CakeMessageModalUI>
    </>
  );
}
