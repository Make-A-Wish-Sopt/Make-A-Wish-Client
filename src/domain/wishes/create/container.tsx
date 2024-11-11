'use client';

import { WishesCreateStepType } from '@/app/wishes/create/page';
import { wishesAccountInputInit, wishesLinkInputInit } from '@/constant/init';
import {
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
  wishesLinkDataResolver,
  WishesLinkDataResolverType,
  wishesPhoneResolver,
  WishesPhoneResolverType,
} from '@/validation/wishes.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn } from 'react-hook-form';
import { WishesCreateTitleText } from './component';
import WishesAccountInputForm from './wishesAccountInputForm';
import { PropsWithChildren, useEffect } from 'react';
import WishesLinkInputForm from './wishesLinkInputForm';
import { useRouters } from '@/hooks/common/useRouters';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import Button from '@/components/Common/Button';
import WishesInputPreview from './wishesInputPreview';
import { postWishes } from '@/api/wishes';
import { putUserAccount } from '@/api/user';
import useToggle from '@/hooks/common/useToggle';

// refactor : 힌트 입력한거 null로 들어갑니다!

export default function WishesCreatePageContainer({
  createStep,
  wishTitle,
  children,
}: {
  createStep: WishesCreateStepType;
  wishTitle?: string;
} & PropsWithChildren) {
  const wishesLinkInputMethods = useForm<WishesLinkDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesLinkInputInit,
    },
    resolver: yupResolver(wishesLinkDataResolver),
  });

  const wishesAccountInputMethods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });

  const wishesPhoneMethods = useForm<WishesPhoneResolverType>({
    defaultValues: {
      phone: '',
    },
    resolver: yupResolver(wishesPhoneResolver),
  });

  useEffect(() => {
    if (wishTitle) {
      wishesLinkInputMethods.setValue('title', wishTitle);
    }
  }, [wishTitle]);

  return (
    <>
      {
        {
          link: (
            <>
              <WishesCreateTitleText>생일잔치 링크 생성하기</WishesCreateTitleText>
              <WishesLinkInputForm methods={wishesLinkInputMethods} />
            </>
          ),
          account: (
            <>
              <WishesCreateTitleText>입금받을 계좌 입력하기</WishesCreateTitleText>
              <WishesAccountInputForm
                methods={wishesAccountInputMethods}
                wishesPhoneMethods={wishesPhoneMethods}
              />
            </>
          ),
          preview: (
            <>
              <WishesInputPreview methods={wishesLinkInputMethods} />
              <WishesPreviewSubmitButton
                linkDataMethods={wishesLinkInputMethods}
                accountDataMethods={wishesAccountInputMethods}
                phoneDataMethods={wishesPhoneMethods}
              />
            </>
          ),
          done: (
            <>
              {children}
              <SharePageFixedButtons />
            </>
          ),
        }[createStep]
      }
    </>
  );
}

function WishesPreviewSubmitButton({
  linkDataMethods,
  accountDataMethods,
  phoneDataMethods,
}: {
  linkDataMethods: UseFormReturn<WishesLinkDataResolverType, any, undefined>;
  accountDataMethods: UseFormReturn<WishesAccountDataResolverType, any, undefined>;
  phoneDataMethods: UseFormReturn<WishesPhoneResolverType, any, undefined>;
}) {
  const { watch } = linkDataMethods;
  const { wantsGift } = watch();

  const { state: accountSaveSuccess, changeState: changeAccountSaveSuccess } = useToggle();
  const { state: wishesCreateSuccess, changeState: changeWishesCreateSuccess } = useToggle();

  const { handleBack, handleRouter } = useRouters();

  useEffect(() => {
    if (accountSaveSuccess && wishesCreateSuccess) {
      handleRouter('/wishes/create?step=done');
    }
  }, [accountSaveSuccess, wishesCreateSuccess]);

  function handleNextStep() {
    if (wantsGift) {
      try {
        putUserAccount({ accountDataMethods, phoneDataMethods }).then((response) => {
          response.data.success && changeAccountSaveSuccess(true);
        });
      } catch (error) {}
    }

    try {
      //refactor : hint 변수 추가해야됨
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
