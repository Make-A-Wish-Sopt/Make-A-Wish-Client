'use client';

import { getUserAccount } from '@/api/user';
import FunnelStepButton from '@/components/Modules/FunnelStepButton';
import { wishesAccountInputInit } from '@/constant/init';
import useToggle from '@/hooks/common/useToggle';
import { useKakaopayCodeStore } from '@/stores/account';
import {
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
} from '@/validation/wishes.validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropsWithChildren, useEffect } from 'react';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { validateKakaoCodeURL } from './validateKakaopayCode';
import ValidateLoadingModal from '@/components/Common/Modal/ValidateLoadingModal';

export default function KakaoPayCodeInputContainer({ children }: PropsWithChildren) {
  const methods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
      forPayCode: false,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });

  return (
    <FormProvider {...methods}>
      <KakaopayCodeInputSubmitObserver>{children}</KakaopayCodeInputSubmitObserver>
    </FormProvider>
  );
}

function KakaopayCodeInputSubmitObserver({ children }: PropsWithChildren) {
  const { reset, control, formState } = useFormContext<WishesAccountDataResolverType>();
  const {
    isLoading,
    disclamierState,
    isKakaopayCodeValid,
    changeIsLoading,
    changeIsKakaopayCodeValid,
  } = useKakaopayCodeStore();
  const { errors } = formState;

  const kakaopayCode = useWatch({
    control,
    name: 'kakaoPayCode',
  });

  const nextButtonLabel = '생성 완료!';
  const nextButtonDisalbed = useToggle();
  const kakaoPayValidator = wishesAccountDataResolver.pick(['kakaoPayCode']);

  //데이터베이스에서 가져온 정보들이 유효한지 체크 후 초기화
  useEffect(() => {
    const fetchData = async () => {
      changeIsLoading(true); // ✅ 로딩 시작

      try {
        const response = await getUserAccount();
        if (response.transferInfo) {
          await kakaoPayValidator.validate({ kakaoPayCode: response.transferInfo.kakaoPayCode });

          if (!errors.kakaoPayCode) {
            const isValidate = await validateKakaoCodeURL(response.transferInfo.kakaoPayCode);
            changeIsKakaopayCodeValid(isValidate);
          }

          reset({ ...response.transferInfo });
        }
      } catch (error) {
        console.error('초기 데이터 유효성 검사 실패:', error);
      } finally {
        setTimeout(() => {
          changeIsLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (disclamierState && kakaopayCode && !isLoading) {
      nextButtonDisalbed.changeState(true);
    } else {
      nextButtonDisalbed.changeState(false);
    }
  }, [disclamierState, kakaopayCode, isKakaopayCodeValid, isLoading]);

  async function handleClickNext() {}

  return (
    <>
      {children}
      <FunnelStepButton
        prevButtonProps={{ disabled: true }}
        nextButtonProps={{
          onNextStep: handleClickNext,
          label: nextButtonLabel,
          disabled: !nextButtonDisalbed.state,
        }}
      />
      <ValidateLoadingModal isOpen={isLoading} success={isKakaopayCodeValid} />
    </>
  );
}
