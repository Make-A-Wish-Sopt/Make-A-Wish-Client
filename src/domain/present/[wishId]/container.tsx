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
import CloseIconInModal from '@/components/Common/Modal/CloseIconInModal';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import CloseTopModal from '@/components/Common/Modal/CloseTopModal';
import Image from 'next/image';
import { presentListArray } from '@/constant/model/present';
import { convertMoneyText } from '@/utils/common/convert';
import {
  defaultCakeTreeDataArray,
  defaultCakeTreeDataObject,
} from '@/constant/model/cakesTreeData';
import PresentSuccess, { PresentSuccessCakeTree } from './done';
import { MessageFromWisheMaker, PresentSuccessSubmitButton } from './component';

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
    state: checkSendMoneyModalState,
    changeState: changeSendMoneyModalState,
    handleState: handleCheckSendMoneyModalState,
  } = useToggle();
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
      changeGiftMenutId(0);
    }
  }, [messageOnlyOption]);

  function changeGiftMenutId(id: number) {
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
                      {!messageOnlyOption && <PresentList changeGiftMenutId={changeGiftMenutId} />}
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
                  styles={{ marginBottom: '5.8rem' }}
                  disabled={!methods.formState.isValid}
                >
                  {'친구 생일 축하해주기'}
                </Button>
              </>
            ),
            payment: (
              <>
                <Payment
                  account={`${publicWishesData.accountNumber} ${publicWishesData.bank}`}
                  handleCheckSendMoneyModalState={handleCheckSendMoneyModalState}
                />
                <Button
                  onClick={() => {
                    changeSendMoneyModalState(true);
                  }}
                  styles={{ marginBottom: '5.8rem' }}
                >
                  {'선물하러 가기'}
                </Button>

                {checkSendMoneyModalState && (
                  <CheckSendMoneyModal
                    modalState={checkSendMoneyModalState}
                    handleModalState={handleCheckSendMoneyModalState}
                    selectedCakeId={selectedCakeId}
                    wishId={wishId}
                  />
                )}
              </>
            ),
            done: (
              <section className="w-full">
                {
                  // <PresentMessageModal
                  //   nickName={publicWishesData.name}
                  //   modalState={presenetMessageModalState}
                  //   handleModalState={handlePresentMessageModalState}
                  //   changeModalState={changePresenetMessgaeModalState}
                  //   selectedCakeId={selectedCakeId}
                  // />
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
    <CloseIconInModal
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
    </CloseIconInModal>
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

  return (
    <CloseTopModal bgColor="background" isOpen={modalState} handleState={handleModalState}>
      <div className="flex flex-col items-center w-full h-full">
        <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-40">{`${name}님이\n${nickName}님에게 남긴 편지에요\n이미지를 저장해보세요!`}</span>
        <div className="flex flex-col items-center w-full h-full p-20 bg-dark_green rounded-2xl text-white">
          <span className="font-galmuri  text-[16px] px-14 py-8 bg-black bg-opacity-50 rounded-4xl">
            {name}
          </span>
          <Image
            src={defaultCakeTreeDataObject[selectedCakeId].cakeImg}
            alt="보낸 케이크 아바타 이미지"
            width={160}
          />
          <span className="font-galmuri text-[14px] mb-13">{message}</span>

          <div className="flex justify-between items-center w-full h-54 p-12 rounded-xl border border-main_blue font-bitbit text-[16px] text-white">
            <span className="font-galmuri">선물한 항목</span>
            <span>
              {giftMenuId === 0 ? (
                '정성담은 편지'
              ) : (
                <>
                  <div className="flex gap-4 items-center font-bitbit text-[16px] text-white">
                    <Image
                      src={presentListArray[giftMenuId - 1].image}
                      alt="선물한 선물 이미지"
                      height={43}
                    />
                    {`${presentListArray[giftMenuId - 1].itemName} ${convertMoneyText(
                      presentListArray[giftMenuId - 1].price.toString(),
                    )}원`}
                  </div>
                </>
              )}
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
