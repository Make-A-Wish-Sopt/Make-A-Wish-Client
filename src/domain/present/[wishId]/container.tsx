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
import { PublicWishesDataType } from '@/types/api/response';
import Payment from './payment';
import {
  defaultCakeTreeDataArray,
  defaultCakeTreeDataObject,
  ReceivedCakeTreeMessageDataType,
} from '@/constant/model/cakesTreeData';
import PresentSuccess, { PresentSuccessCakeTree } from './done';
import { MessageFromWisheMaker, PresentSuccessSubmitButton } from './component';
import { SaveCakeMessageModal } from '@/domain/wishes/component';
import GradientShadow from '@/components/UI/GradientShadow';
import KakaopayPayment from './kakaopayPayment';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import { presentListArray, presentListObject } from '@/constant/model/present';
import { convertMoneyText } from '@/utils/common/convert';

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

  const { transferInfo, nickname, wantsGift } = publicWishesData;

  const { accountInfo, forPayCode, kakaoPayCode } = transferInfo;
  const { state: messageOnlyOption, changeState: changeMessageOnlyOption } = useToggle();
  const {
    state: presenetMessageModalState,
    handleState: handlePresentMessageModalState,
    changeState: changePresenetMessgaeModalState,
  } = useToggle();

  const { giftMenuId } = methods.watch();

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
    if (!methods.formState.isValid) {
      return false;
    }

    if (!wantsGift) return true;

    const giftMenuId = methods.watch('giftMenuId');

    if (!messageOnlyOption && !giftMenuId) {
      return false;
    }

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

  async function handleAccountCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {}
  }

  async function handlePayment() {
    if (forPayCode) {
      const presentPrice = presentListObject[giftMenuId].price.toString();
      await handleAccountCopy(convertMoneyText(presentPrice));
      window.open(kakaoPayCode);
    } else {
    }

    GivePresent();

    handleRouter(`/present/${wishId}?presentStep=done&avatarCakeId=${selectedCakeId}`);
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
                        <CheckBox changeCheckedState={changeMessageOnlyOption}>
                          <span className="font-galmuri text-[14px] ml-8">{'편지만 보낼게요'}</span>
                        </CheckBox>
                      </Box>
                    </InputForm>
                  )}
                </PresentGiverInfoInputForm>
                <div className="pb-58">
                  <Button onClick={handleGivePresent} disabled={!isValid()}>
                    {'친구 생일 축하해주기'}
                  </Button>
                </div>
              </>
            ),
            payment: (
              <>
                {forPayCode ? (
                  <>
                    <KakaopayPayment
                      wishMakerName={nickname}
                      presentPrice={
                        giftMenuId > 0 && presentListObject[giftMenuId].price.toString()
                      }
                    >
                      <KakaopaySubmitButton handleSubmit={handlePayment} />
                    </KakaopayPayment>
                  </>
                ) : (
                  <>
                    <Payment
                      wishMakerName={nickname}
                      presentPrice={presentListArray[giftMenuId].price.toString()}
                      account={`${publicWishesData.transferInfo.accountInfo.account} ${publicWishesData.transferInfo.accountInfo.bank}`}
                    />
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
                )}
              </>
            ),
            done: (
              <section className="relative w-full">
                {
                  <PresentMessageModal
                    nickName={publicWishesData.nickname}
                    modalState={presenetMessageModalState}
                    handleModalState={handlePresentMessageModalState}
                    changeModalState={changePresenetMessgaeModalState}
                    selectedCakeId={selectedCakeId}
                  />
                }
                <PresentSuccess
                  giverName={methods.getValues('name')}
                  wishesName={publicWishesData.nickname}
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

function KakaopaySubmitButton({ handleSubmit }: { handleSubmit: () => void }) {
  return (
    <FixedBottomButtonWrapper>
      <Button onClick={handleSubmit}>카카오로 송금하고, 편지 확인하기</Button>
    </FixedBottomButtonWrapper>
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

  const receivedCakeMessageData: ReceivedCakeTreeMessageDataType = {
    name: name,
    message: message,
    giftMenuId: giftMenuId,
    cakeId: Number(selectedCakeId),
    cakeImg: defaultCakeTreeDataObject[Number(selectedCakeId)].cakeImg,
    presentId: giftMenuId,
    isAdminMessage: false,
  };

  return (
    <>
      <SaveCakeMessageModal
        modalState={modalState}
        handleModalState={handleModalState}
        receivedCakeMessageData={receivedCakeMessageData}
        nickName={nickName}
        isLoading={false}
      />
    </>
  );
}
