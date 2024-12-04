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
import { PropsWithChildren, useEffect } from 'react';

import { useRouters } from '@/hooks/common/useRouters';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import Button from '@/components/Common/Button';
import WishesInputPreview from './wishesInputPreview';
import { postWishes } from '@/api/wishes';
import useToggle from '@/hooks/common/useToggle';
import WishesLinkInputForm from './wishesLinkInputForm';
import SelectDeposit, { WishesDepositSubmitButton } from './selectDeposit';
import WishesKakaopayInputForm from './wishesKakaopayInputForm';
import { putUserAccount } from '@/api/user';

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

  const { state: selectAccount, changeState: changeSelectAccount } = useToggle();
  const { state: noticeAgree, changeState: changeNoticeAgreeState } = useToggle();
  const { state: isKakaoPayCodeValid, changeState: changeIsKakaoPayCodeValid } = useToggle();
  const { handleRouter } = useRouters();

  function handleNextStep() {
    if (selectAccount) {
      handleRouter('/wishes/create?step=account');
    } else {
      handleRouter('/wishes/create?step=kakaopay');
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
              <SelectDeposit
                selectAccount={selectAccount}
                changeSelectAccount={changeSelectAccount}
              >
                <WishesDepositSubmitButton handleNextStep={handleNextStep} />
              </SelectDeposit>
            </>
          ),
          kakaopay: (
            <>
              {children}
              <WishesKakaopayInputForm
                changeNoticeAgreeState={changeNoticeAgreeState}
                changeIsKakaoPayCodeValid={changeIsKakaoPayCodeValid}
              >
                <WishesAccountSubmitButton
                  linkDataMethods={savedWishesLinkDataMethods}
                  disabled={!(isKakaoPayCodeValid && noticeAgree)}
                />
              </WishesKakaopayInputForm>
            </>
          ),
          account: <>{children}</>,
          preview: (
            <>
              {children}
              <WishesInputPreview methods={savedWishesLinkDataMethods} />
              <WishesPreviewSubmitButton linkDataMethods={savedWishesLinkDataMethods} />
            </>
          ),
          done: <>{children}</>,
        }[step]
      }
    </FormProvider>
  );
}

export function WishesEditAccountSubmitButton({ isValid }: { isValid: boolean }) {
  const { handleBack, handleRouter } = useRouters();
  const { watch } = useFormContext<WishesAccountDataResolverType>();

  function handleWishesCreateSubmit() {
    const accountInputs = watch();

    putUserAccount(accountInputs).then((response) => {
      response.data.success && handleRouter('/');
    });
  }
  return (
    <FixedBottomButtonWrapper>
      <div className="flex justify-between gap-10">
        <Button bgColor="gray4" fontColor="white" onClick={handleBack}>
          이전
        </Button>

        <Button
          onClick={() => {
            handleWishesCreateSubmit();
          }}
          disabled={!isValid}
        >
          수정 완료!
        </Button>
      </div>
    </FixedBottomButtonWrapper>
  );
}

export function WishesAccountSubmitButton({
  linkDataMethods,
  disabled,
}: {
  linkDataMethods: UseFormReturn<WishesLinkDataResolverType, any, undefined>;
  disabled: boolean;
}) {
  const { handleBack, handleRouter } = useRouters();
  const { watch } = useFormContext<WishesAccountDataResolverType>();

  function handleWishesCreateSubmit() {
    const accountInputs = watch();
    const wishesData = linkDataMethods.watch();

    putUserAccount(accountInputs).then((response) => {
      response.data.success &&
        postWishes(wishesData).then((response) => {
          response.data.success && handleRouter('/wishes/create?step=done');
        });
    });
  }
  return (
    <FixedBottomButtonWrapper>
      <div className="flex justify-between gap-10">
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
      </div>
    </FixedBottomButtonWrapper>
  );
}

function WishesPreviewSubmitButton({
  linkDataMethods,
}: {
  linkDataMethods: UseFormReturn<WishesLinkDataResolverType, any, undefined>;
}) {
  const { handleBack, handleRouter } = useRouters();

  const { state: wishesCreateSuccess, changeState: changeWishesCreateSuccess } = useToggle();

  useEffect(() => {
    if (wishesCreateSuccess) {
      handleRouter('/wishes/create?step=done');
    }
  }, [wishesCreateSuccess]);

  function handleNextStep() {
    const wantsGift = linkDataMethods.watch('wantsGift');

    if (wantsGift) {
      handleRouter('/wishes/create?step=select');
    } else {
      const wishesData = linkDataMethods.watch();

      try {
        postWishes(wishesData).then((response) => {
          response.data.success && changeWishesCreateSuccess(true);
        });
      } catch (error) {}
    }
  }

  return (
    <FixedBottomButtonWrapper>
      <div className="flex justify-between gap-10">
        <Button bgColor="gray4" fontColor="main_blue" onClick={handleBack}>
          수정하기
        </Button>

        <Button onClick={handleNextStep}>이대로 등록하기</Button>
      </div>
    </FixedBottomButtonWrapper>
  );
}
