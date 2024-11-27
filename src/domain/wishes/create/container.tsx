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
import ShareLinkModal from '@/components/Common/Modal/ShareLinkModal';
import SelectDeposit from './selectDeposit';
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
              <SelectDeposit />
            </>
          ),
          kakaopay: (
            <>
              {children}
              <WishesKakaopayInputForm linkDataMethods={savedWishesLinkDataMethods} />
            </>
          ),
          account: <>{children}</>,
          preview: (
            <>
              <WishesInputPreview methods={savedWishesLinkDataMethods} />
              <WishesPreviewSubmitButton linkDataMethods={savedWishesLinkDataMethods} />
            </>
          ),
          done: (
            <>
              {children}
              <SharePageFixedButtons />
            </>
          ),
        }[step]
      }
    </FormProvider>
  );
}

export function WishesKakaopaySubmitButton({
  linkDataMethods,
  disabled,
}: {
  linkDataMethods: UseFormReturn<WishesLinkDataResolverType, any, undefined>;
  disabled: boolean;
}) {
  const { handleBack, handleRouter } = useRouters();
  const { state: wishesCreateSuccess, changeState: changeWishesCreateSuccess } = useToggle();
  const { watch } = useFormContext<WishesAccountDataResolverType>();

  useEffect(() => {
    if (wishesCreateSuccess) {
      const accountInputs = watch();

      putUserAccount(accountInputs).then((response) => {
        response.data.success && handleRouter('/wishes/create?step=preview');
      });
    }
  }, [wishesCreateSuccess]);

  function handleCreateWishes() {
    const wishesData = linkDataMethods.watch();
    postWishes(wishesData).then((response) => {
      response.data.success && changeWishesCreateSuccess(true);
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
            handleCreateWishes();
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
        <Button bgColor="gray4" fontColor="white" onClick={handleBack}>
          수정하기
        </Button>

        <Button onClick={handleNextStep}>이대로 등록하기</Button>
      </div>
    </FixedBottomButtonWrapper>
  );
}

function SharePageFixedButtons() {
  const { handleRouter } = useRouters();

  return (
    <>
      <FixedBottomButtonWrapper>
        <div className="flex flex-col gap-10">
          <Button>생일잔치에 친구 초대하기</Button>
          <Button
            bgColor="gray4"
            fontColor="white"
            onClick={() => {
              handleRouter('/wishes');
            }}
          >
            홈으로 이동하기
          </Button>
        </div>
      </FixedBottomButtonWrapper>
    </>
  );
}

export function ShareSnsModal({ wishId, nickName }: { wishId: string; nickName: string }) {
  const { state: modalState, handleState: handleModalState } = useToggle();

  return (
    <ShareLinkModal
      wishId={wishId}
      nickName={nickName}
      modalState={modalState}
      handleModalState={handleModalState}
    />
  );
}
