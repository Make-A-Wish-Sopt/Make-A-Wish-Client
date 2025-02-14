'use client';

import { WishesCreateStepType } from '@/app/wishes/create/page';
import { wishesLinkInputInit } from '@/constant/init';
import {
  WishesAccountDataResolverType,
  wishesLinkDataResolver,
  WishesLinkDataResolverType,
} from '@/validation/wishes.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, useFormContext, UseFormReturn } from 'react-hook-form';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useRouters } from '@/hooks/common/useRouters';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import Button from '@/components/Common/Button';
import { postWishes } from '@/api/wishes';
import useToggle from '@/hooks/common/useToggle';
import WishesLinkInputForm from './wishesLinkInputForm';
import SelectDeposit, { WishesDepositSubmitButton } from './selectDeposit';
import WishesKakaopayInputForm from './wishesKakaopayInputForm';
import { putUserAccount } from '@/api/user';
import WishesAccountInputForm from './wishesAccountInputForm';
import { convertEncode } from '@/utils/common/convert';
import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google';
import { GA_VIEW_WISHES } from '@/constant/ga';

export default function WishesCreatePageContainer({
  step,
  wishTitle,
  children,
}: { step: WishesCreateStepType; wishTitle: string } & PropsWithChildren) {
  const savedWishesLinkDataMethods = useForm<WishesLinkDataResolverType>({
    defaultValues: {
      ...wishesLinkInputInit,
    },
    resolver: yupResolver(wishesLinkDataResolver),
  });

  const selectAccount = useToggle();
  const isKakaoPayCodeValid = useToggle();
  const noticeAgree = useToggle();
  const submitBtnActiveState = useToggle();
  const accountVerifyBtnState = useToggle();
  const isLoading = useToggle();
  const isAccountValid = useToggle();

  const { handleRouter } = useRouters();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      sessionStorage.setItem('isReloading', 'true'); // 새로고침 여부 저장
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    sendGAEvent('event', GA_VIEW_WISHES[step]); // GA4에 이벤트 전송
    sendGTMEvent('event', GA_VIEW_WISHES[step]); // GTM에 이벤트 전송
  }, [step]);

  useEffect(() => {
    if (sessionStorage.getItem('isReloading')) {
      if (wishTitle) {
        handleRouter(`/wishes/create?step=link&wishTitle=${wishTitle}`);
      }
      sessionStorage.removeItem('isReloading'); // 상태 초기화
    }
  }, []);

  function handleNextStep() {
    if (selectAccount.state) {
      handleRouter(`/wishes/create?step=account&wishTitle=${wishTitle}`);
    } else {
      handleRouter(`/wishes/create?step=kakaopay&wishTitle=${wishTitle}}`);
    }
  }

  return (
    <FormProvider {...savedWishesLinkDataMethods}>
      {
        {
          link: (
            <>
              {children}
              <WishesLinkInputForm wishTitle={wishTitle} />
            </>
          ),
          select: (
            <>
              {children}
              <SelectDeposit selectAccount={selectAccount}>
                <WishesDepositSubmitButton handleNextStep={handleNextStep} />
              </SelectDeposit>
            </>
          ),
          kakaopay: (
            <>
              {children}
              <WishesKakaopayInputForm
                noticeAgree={noticeAgree}
                isKakaoPayCodeValid={isKakaoPayCodeValid}
                submitBtnActiveState={submitBtnActiveState}
                isLoading={isLoading}
              >
                <WishesAccountSubmitButton
                  linkDataMethods={savedWishesLinkDataMethods}
                  forPayCode={true}
                  disabled={!submitBtnActiveState.state}
                />
              </WishesKakaopayInputForm>
            </>
          ),
          account: (
            <>
              {children}
              <WishesAccountInputForm
                accountVerifyBtnState={accountVerifyBtnState}
                isAccountValid={isAccountValid}
                isLoading={isLoading}
                submitBtnActiveState={submitBtnActiveState}
                noticeAgree={noticeAgree}
              >
                <WishesAccountSubmitButton
                  disabled={!submitBtnActiveState.state}
                  forPayCode={false}
                  linkDataMethods={savedWishesLinkDataMethods}
                />
              </WishesAccountInputForm>
            </>
          ),
          done: <>{children}</>,
        }[step]
      }
    </FormProvider>
  );
}

export function WishesEditAccountSubmitButton({
  disabled,
  forPayCode,
}: {
  disabled: boolean;
  forPayCode: boolean;
}) {
  const { handleBack, handleRouter } = useRouters();
  const { watch } = useFormContext<WishesAccountDataResolverType>();

  function handleWishesCreateSubmit() {
    const accountInputs = watch();

    putUserAccount({
      ...accountInputs,
      forPayCode: forPayCode,
    })
      .then((response) => {
        response.data.success && alert('계좌정보 수정완료!');
      })
      .catch(() => {
        alert('계좌정보 수정실패!');
      })
      .finally(() => {
        handleRouter('/mypage');
      });
  }
  return (
    <FixedBottomButtonWrapper>
      <div className="flex justify-between gap-10 w-full">
        <Button bgColor="gray4" fontColor="white" onClick={handleBack}>
          이전
        </Button>

        <Button
          onClick={() => {
            handleWishesCreateSubmit();
          }}
          disabled={disabled}
        >
          수정 완료!
        </Button>
      </div>
    </FixedBottomButtonWrapper>
  );
}

export function WishesAccountSubmitButton({
  linkDataMethods,
  forPayCode,
  disabled,
}: {
  linkDataMethods: UseFormReturn<WishesLinkDataResolverType, any, undefined>;
  forPayCode: boolean;
  disabled: boolean;
}) {
  const { handleBack, handleRouter } = useRouters();
  const { watch } = useFormContext<WishesAccountDataResolverType>();

  function handleWishesCreateSubmit() {
    const accountInputs = watch();
    const wishesData = linkDataMethods.watch();

    putUserAccount({
      ...accountInputs,
      forPayCode: forPayCode,
    }).then((response) => {
      response.data.success &&
        postWishes(wishesData).then((response) => {
          response.data.success && handleRouter('/wishes/create?step=done');
        });
    });
  }
  return (
    <FixedBottomButtonWrapper>
      <Button bgColor="gray4" fontColor="white" onClick={handleBack}>
        이전
      </Button>

      <Button
        onClick={() => {
          handleWishesCreateSubmit();
        }}
        disabled={disabled}
      >
        생성 완료!
      </Button>
    </FixedBottomButtonWrapper>
  );
}
