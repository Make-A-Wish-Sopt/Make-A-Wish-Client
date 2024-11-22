'use client';

import { WishesCreateStepType } from '@/app/wishes/create/page';
import { wishesAccountInputInit, wishesLinkInputInit } from '@/constant/init';
import {
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
  wishesLinkDataResolver,
  WishesLinkDataResolverType,
} from '@/validation/wishes.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { WishesCreateTitleText } from './component';
import { PropsWithChildren, useEffect } from 'react';

import { useRouters } from '@/hooks/common/useRouters';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import Button from '@/components/Common/Button';
import WishesInputPreview from './wishesInputPreview';
import { postWishes } from '@/api/wishes';
import useToggle from '@/hooks/common/useToggle';
import WishesLinkInputForm from './wishesLinkInputForm';
import ShareLinkModal from '@/components/Common/Modal/ShareLinkModal';

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
    try {
      postWishes(linkDataMethods).then((response) => {
        response.data.success && changeWishesCreateSuccess(true);
      });
    } catch (error) {}
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
