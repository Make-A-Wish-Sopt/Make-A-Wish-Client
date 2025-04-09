'use client';

import CheckBox from '@/components/UI/CheckBox';
import { KakaoCodeGuideImg } from '@public/assets/images';
import Image from 'next/image';
import InputText from '@/components/Elements/Input/inputText';
import { DefaultResponseType } from '@/types/api/response';

import { memo, useEffect, useState } from 'react';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import ValidateLoadingModal from '@/components/Elements/Modal/ValidateLoadingModal';
import { FetchStatusType, useFetch } from '@/hooks/useFetch';
import CheckedIcon, { WarningCheckedIcon } from '@/components/Elements/Icon/CheckedIcon';
import ClipLoader from 'react-spinners/ClipLoader';
import { colors } from '@/styles/styles';
import { AccountFormSchemaType } from '@/Schema/wishes.schema';

export const 계좌번호오기입안내사항동의여부 = ({
  onCheck,
}: {
  onCheck: (state: boolean) => void;
}) => {
  return (
    <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl">
      <p>{'※ 잘못된 송금코드 링크 기재로 발생되는 문제는 책임지지 않아요!ㅠㅠ'}</p>
      <div className="flex justify-end w-full h-20">
        <div className="flex justify-end">
          <CheckBox changeCheckedState={onCheck}>
            <span className="font-galmuri text-[14px] text-main_blue ml-8">{'동의함'}</span>
          </CheckBox>
        </div>
      </div>
    </div>
  );
};

export const 송금코드가져오기안내이미지 = memo(() => {
  const onLinkKakaoApp = () => {
    window.location.href = 'kakaotalk://';
  };

  return (
    <button onClick={onLinkKakaoApp}>
      <Image
        src={KakaoCodeGuideImg}
        alt="카카오코드 가져오기 안내 이미지"
        style={{ cursor: 'pointer' }}
      />
    </button>
  );
});

export const KakaopayCodeInput = ({
  isKakaoPayCodeValid,
  changeValidState,
}: {
  isKakaoPayCodeValid: boolean;
  changeValidState: (state: boolean) => void;
}) => {
  const { register, getValues, control } = useFormContext<AccountFormSchemaType>();
  const kakaoPayCode = useWatch({ control, name: 'kakaoPayCode' });
  const { errors } = useFormState({ control });
  const { status, fetchData } = useFetch(validateKakaoCodeURL);
  const [validCode, setValidCode] = useState<string | null>(null);

  useEffect(() => {
    if (validCode === kakaoPayCode) {
      changeValidState(true);
      return;
    }

    changeValidState(false);
  }, [kakaoPayCode]); // 🔁 값이 바뀔 때마다 실행

  const handleCheckKakaoPayCode = async () => {
    const kakaoPayCode = getValues('kakaoPayCode');

    if (!kakaoPayCode) return;
    if (errors.kakaoPayCode) return;
    if (kakaoPayCode === validCode) return;

    const response = await fetchData(kakaoPayCode);
    if (response.success) {
      changeValidState(true);
      setValidCode(kakaoPayCode);
    } else {
      changeValidState(false);
    }
  };

  async function validateKakaoCodeURL(kakaoPayCode: string) {
    const response = await fetch('/api/kakao/paycode', {
      method: 'POST',
      body: JSON.stringify({ kakaoPayCode: kakaoPayCode }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = (await response.json()) as DefaultResponseType;

    return data;
  }

  const get상태아이콘 = (status: FetchStatusType) => {
    if (status === 'loading') {
      return <ClipLoader color={colors.main_blue} />;
    }

    if ((status !== 'idle' && !isKakaoPayCodeValid) || errors.kakaoPayCode) {
      return <WarningCheckedIcon width={24} />;
    }

    if (status === 'success' && isKakaoPayCodeValid) {
      return <CheckedIcon width={24} />;
    }
  };

  return (
    <>
      <InputText
        register={register('kakaoPayCode')}
        placeholder="송금링크를 붙여 넣어주세요"
        onBlur={handleCheckKakaoPayCode}
        keyPrevent
        autoFocus
      >
        {get상태아이콘(status)}
      </InputText>
      {errors.kakaoPayCode && (
        <p className="text-[14px] text-warning_red">{errors.kakaoPayCode.message}</p>
      )}

      {<ValidateLoadingModal isOpen={status === 'loading'} success={isKakaoPayCodeValid} />}
    </>
  );
};

//
