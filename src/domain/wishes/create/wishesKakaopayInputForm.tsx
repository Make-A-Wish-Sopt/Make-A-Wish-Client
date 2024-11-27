import InputText from '@/components/Common/Input/inputText';
import { AccountFormNotice } from './wishesAccountInputForm';
import useToggle from '@/hooks/common/useToggle';
import Image from 'next/image';
import { HelpIc } from '../../../../public/assets/icons';
import BorderBox from '@/components/UI/BorderBox';
import { WishesAccountSubmitButton } from './container';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import {
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
  WishesLinkDataResolverType,
} from '@/validation/wishes.validate';
import { wishesAccountInputInit } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { DefaultResponseType } from '@/types/api/response';

export default function WishesKakaopayInputForm({
  linkDataMethods,
}: {
  linkDataMethods: UseFormReturn<WishesLinkDataResolverType, any, undefined>;
}) {
  const { state: noticeAgree, changeState: changeNoticeAgreeState } = useToggle();
  const { state: isKakaoPayCodeValid, changeState: changeIsKakaoPayCodeValid } = useToggle();

  const wishesAccountInputMethods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
      forPayCode: true,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });

  const { register, watch } = wishesAccountInputMethods;

  const { kakaoPayCode } = watch();

  useEffect(() => {
    if (kakaoPayCode) {
      checkKakaopayCode(kakaoPayCode);
    }
  }, [kakaoPayCode]);

  async function checkKakaopayCode(kakaoPayCode: string) {
    const response = await fetch('/api/kakaopay-validate', {
      method: 'POST',
      body: JSON.stringify({ kakaoPayCode: kakaoPayCode }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: DefaultResponseType = await response.json();

    changeIsKakaoPayCodeValid(data.success);
  }

  return (
    <FormProvider {...wishesAccountInputMethods}>
      <div className="flex flex-col gap-12 mb-24">
        <div className="flex items-center gap-8 mb-12 ">
          <h3 className="font-bitbit text-white text-[20px] leading-tight whitespace-pre-line">
            송금코드 링크 붙여넣기
          </h3>
          <Image src={HelpIc} alt="도움말 아이콘" />
        </div>
        <InputText
          register={register('kakaoPayCode')}
          placeholder="송금링크를 붙여넣어주세요"
          keyPrevent
        />

        <BorderBox>
          <p className="text-[12px]">
            {'카카오톡 이동 -> 하단 더보기 탭 선택 -> 상단 코드스캔 선택 -> 송금코드 링크 복사'}
          </p>
        </BorderBox>
      </div>

      <AccountFormNotice changeNoticeAgreeState={changeNoticeAgreeState} />

      <WishesAccountSubmitButton
        linkDataMethods={linkDataMethods}
        disabled={!(isKakaoPayCodeValid && noticeAgree)}
      />
    </FormProvider>
  );
}
