'use client';

import Box from '@/components/Common/Box';
import Button from '@/components/Common/Button';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import ShareLinkModal from '@/components/Common/Modal/ShareLinkModal';
import CheckBox from '@/components/UI/CheckBox';
import GradientShadow from '@/components/UI/GradientShadow';
import InputForm from '@/components/UI/InputForm';
import PresentList from '@/components/UI/PresentList';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import { presentDataInputInit } from '@/constant/init';
import { defaultCakeTreeDataArray } from '@/constant/model/cakesTreeData';
import { PresentSuccessCakeTree } from '@/domain/present/[wishId]/done';
import PresentGiverInfoInputForm from '@/domain/present/[wishId]/presentGiverInfoInputForm';
import useToggle from '@/hooks/common/useToggle';
import { colors } from '@/styles/styles';
import { PublicWishesDataType } from '@/types/api/response';
import { WishesLinkDataType } from '@/types/input';
import { WishStatusType } from '@/types/wishesType';
import { presentDataResolver, PresentDataResolverType } from '@/validation/present.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function TryGiveCake({
  progressWishLinkData,
  wishId,
}: {
  progressWishLinkData?: WishesLinkDataType & {
    status: WishStatusType;
  };
  wishId: string;
}) {
  const avatarCakeId = 6;
  const methods = useForm<PresentDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...presentDataInputInit,
      cakeId: Number(avatarCakeId),
    },
    resolver: yupResolver(presentDataResolver),
  });

  const { wantsGift, status } = progressWishLinkData;
  const { state: messageOnlyOption, changeState: changeMessageOnlyOption } = useToggle();
  const { giftMenuId } = methods.watch();
  const giveState = useToggle();

  const shareModalState = useToggle();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      sessionStorage.setItem('isReloading', 'true'); // 새로고침 여부 저장
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (messageOnlyOption) {
      changeGiftMenuId(0);
    }
  }, [messageOnlyOption]);

  function changeGiftMenuId(id: number) {
    methods.setValue('giftMenuId', id);
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

  return (
    <FormProvider {...methods}>
      <div className="h-full">
        {giveState.state ? (
          <>
            <div className="flex flex-col items-center w-full mt-25">
              <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-20">
                {`${methods.getValues('name')}님,\n${methods.getValues('name')}의 생일잔치에\n와주셔서 감사해요!`}
              </span>
            </div>

            <PresentSuccessCakeTree
              cakeList={[defaultCakeTreeDataArray[3], ...defaultCakeTreeDataArray]}
              modalState={false}
            />
            <GradientShadow height={19} />

            {shareModalState.state && (
              <ShareLinkModal
                wishId={wishId}
                nickName={methods.getValues('name')}
                modalState={shareModalState.state}
                handleModalState={shareModalState.handleState}
              />
            )}

            <FixedBottomButtonWrapper>
              <Button
                onClick={() => {
                  shareModalState.changeState(true);
                }}
              >
                {status === 'BEFORE' ? '생일잔치 링크 미리 저장하기' : '지금 바로 친구 초대하기'}
                {}
              </Button>
            </FixedBottomButtonWrapper>
          </>
        ) : (
          <>
            <span className="flex justify-center  w-full font-bitbit text-main_blue text-[20px]  mt-25 mb-20">
              {'생일잔치 미리 체험하기'}
            </span>

            <div className="flex flex-col w-full gap-10 mb-30">
              <UploadImageBox imageUrl={progressWishLinkData.imageUrl} />

              <Box
                bgColor="background"
                fontColor="gray1"
                font="galmuri"
                styles={{
                  height: 'auto',
                  minHeight: '5rem',
                  padding: '1.2rem',
                  border: `1px solid ${colors.dark_green}`,
                }}
              >
                <span className="text-[14px] text-gray1">{progressWishLinkData.hint}</span>
              </Box>
            </div>

            <PresentGiverInfoInputForm>
              {wantsGift && (
                <InputForm title="나에게 선물하고 싶은 항목">
                  <PresentList
                    selectedGiftMenuId={giftMenuId}
                    changeGiftMenuId={changeGiftMenuId}
                    messageOnlyOption={messageOnlyOption}
                  >
                    <Box bgColor="dark_green" fontColor="gray2" styles={{ marginTop: '0.6rem' }}>
                      <CheckBox changeCheckedState={changeMessageOnlyOption}>
                        <span className="font-galmuri text-[14px] ml-8 text-white">
                          {'편지만 보낼게요'}
                        </span>
                      </CheckBox>
                    </Box>
                  </PresentList>
                </InputForm>
              )}
            </PresentGiverInfoInputForm>

            <div className="pb-58">
              <Button
                onClick={() => {
                  giveState.changeState(true);
                }}
                disabled={!isValid()}
              >
                {'내 생일 축하해주기'}
              </Button>
            </div>
          </>
        )}
      </div>
    </FormProvider>
  );
}
