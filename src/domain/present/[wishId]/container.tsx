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
import { presentKakaopayCodePrice, presentListObject } from '@/constant/model/present';
import { convertMoneyText } from '@/utils/common/convert';
import useSelectItem from '@/hooks/common/useSelectItem';
import { paymentListObject } from '@/constant/bankList';
import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google';
import { GA_VIEW_PRESENT } from '@/constant/ga';

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
  const selectedCakeId = avatarCakeId;
  const { handleRouter } = useRouters();
  const paymentType = forPayCode ? 'kakaopay' : 'account';

  const { selectedId, isSelected, handleSelectOne } = useSelectItem();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      sessionStorage.setItem('isReloading', 'true'); // 새로고침 여부 저장
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('isReloading')) {
      handleRouter(`/wishes/${wishId}`);
      sessionStorage.removeItem('isReloading'); // 상태 초기화
    }
  }, []);

  useEffect(() => {
    if (messageOnlyOption) {
      changeGiftMenuId(0);
    }
  }, [messageOnlyOption]);

  useEffect(() => {
    if (step === 'payment') {
      sendGAEvent('event', GA_VIEW_PRESENT[step][paymentType]); // GA4에 이벤트 전송
      sendGTMEvent('event', GA_VIEW_PRESENT[step][paymentType]); // GA4에 이벤트 전송
    } else {
      sendGAEvent('event', GA_VIEW_PRESENT[step] as string); // GA4에 이벤트 전송
      sendGTMEvent('event', GA_VIEW_PRESENT[step] as string); // GTM에 이벤트 전송
    }
  }, [step]);

  function changeGiftMenuId(id: number) {
    methods.setValue('giftMenuId', id);
  }

  function handleGivePresent() {
    if (wantsGift && !messageOnlyOption) {
      handleNextToPaymentStep();
    } else {
      givePresent();
      handleRouter(`/present/${wishId}/?presentStep=done&avatarCakeId=${selectedCakeId}`);
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

  function givePresent() {
    try {
      const data = methods.watch();
      postPublicCakes({ ...data, wishId: wishId });
    } catch (error) {}
  }

  function handleNextToPaymentStep() {
    const giftMenuId = methods.getValues('giftMenuId');

    handleRouter(
      `/present/${wishId}/?presentStep=payment&presentId=${giftMenuId}&avatarCakeId=${selectedCakeId}&paymentType=${paymentType}`,
    );
  }

  function handleNextToDoneStep() {
    handleRouter(`/present/${wishId}?presentStep=done&avatarCakeId=${selectedCakeId}`);
  }

  async function handleKakaoPayment() {
    if (forPayCode) {
      window.open(`${kakaoPayCode}${presentKakaopayCodePrice[giftMenuId]}`);
    }
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
                      <PresentList
                        selectedGiftMenuId={giftMenuId}
                        changeGiftMenuId={changeGiftMenuId}
                        messageOnlyOption={messageOnlyOption}
                      >
                        <Box
                          bgColor="dark_green"
                          fontColor="gray2"
                          styles={{ marginTop: '0.6rem' }}
                        >
                          <CheckBox changeCheckedState={changeMessageOnlyOption}>
                            <span className="font-galmuri text-[14px] ml-8">
                              {'편지만 보낼게요'}
                            </span>
                          </CheckBox>
                        </Box>
                      </PresentList>
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
                      <KakaopaySubmitButton
                        handleKakaoPayment={handleKakaoPayment}
                        handleNextToDoneStep={handleNextToDoneStep}
                        givePresent={givePresent}
                      />
                    </KakaopayPayment>
                  </>
                ) : (
                  <>
                    <Payment
                      wishMakerName={nickname}
                      presentPrice={
                        giftMenuId > 0 && presentListObject[giftMenuId].price.toString()
                      }
                      account={`${publicWishesData.transferInfo.accountInfo.account} ${publicWishesData.transferInfo.accountInfo.bank}`}
                      isSelected={isSelected}
                      handleSelectOne={handleSelectOne}
                    />
                    <BankTransferSubmitButton
                      givePresent={givePresent}
                      handleNextToDoneStep={handleNextToDoneStep}
                    />
                  </>
                )}
              </>
            ),
            done: (
              <section className="relative w-full ">
                <PresentMessageModal
                  nickName={publicWishesData.nickname}
                  modalState={presenetMessageModalState}
                  handleModalState={handlePresentMessageModalState}
                  changeModalState={changePresenetMessgaeModalState}
                  selectedCakeId={selectedCakeId}
                />

                <PresentSuccess
                  giverName={methods.getValues('name')}
                  wishesName={publicWishesData.nickname}
                />
                {!presenetMessageModalState && (
                  <PresentSuccessCakeTree
                    cakeList={[
                      defaultCakeTreeDataObject[selectedCakeId],
                      ...defaultCakeTreeDataArray,
                    ]}
                    modalState={presenetMessageModalState}
                  />
                )}

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

function BankTransferSubmitButton({
  givePresent,
  handleNextToDoneStep,
}: {
  givePresent: () => void;
  handleNextToDoneStep: () => void;
}) {
  return (
    <>
      <Button
        onClick={() => {
          givePresent();
          handleNextToDoneStep();
        }}
        style={{ marginBottom: '5.8rem' }}
      >
        송금 완료했다면, 편지확인하기
      </Button>
    </>
  );
}

function KakaopaySubmitButton({
  handleKakaoPayment,
  handleNextToDoneStep,
  givePresent,
}: {
  handleKakaoPayment: () => void;
  handleNextToDoneStep: () => void;
  givePresent: () => void;
}) {
  const firstClick = useToggle(false);

  return (
    <FixedBottomButtonWrapper>
      {firstClick.state ? (
        <Button
          onClick={() => {
            givePresent();
            handleNextToDoneStep();
          }}
        >
          송금 완료했어요!
        </Button>
      ) : (
        <Button
          onClick={() => {
            firstClick.changeState(true);
            handleKakaoPayment();
          }}
        >
          카카오로 송금하고, 편지 확인하기
        </Button>
      )}
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
    <SaveCakeMessageModal
      modalState={modalState}
      handleModalState={handleModalState}
      receivedCakeMessageData={receivedCakeMessageData}
      nickName={nickName}
      isLoading={false}
    />
  );
}
