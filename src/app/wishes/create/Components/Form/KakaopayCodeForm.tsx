'use client';

import { Step } from '@/components/Modules/Funnel';
import CheckBox from '@/components/UI/CheckBox';
import { KakaoCodeGuideImg } from '@public/assets/images';
import Image from 'next/image';
import InputText from '@/components/Elements/Input/inputText';
import { useFunnelContext } from '@/Context/FunnelContext';
import { WishCreateFormMethodsType } from '../FunnelContainer';
import { DefaultResponseType } from '@/types/api/response';
import useBoolean from '@/hooks/useBoolean';
import { WishesFunnelStepType } from '../../page';
import { memo } from 'react';
import { useFormState } from 'react-hook-form';
import { putUserAccount } from '@/api/user';
import { postWishes } from '@/api/wishes';
import Button from '@/components/Elements/Button';

const KakaopayCodeForm = () => {
  const isKakaoPayCodeValidToggle = useBoolean();
  const noticeAgreeToggle = useBoolean();

  return (
    <>
      <Step.FormSection className="flex flex-col gap-12 mb-24">
        <송금코드가져오기안내이미지 />
        <KakaopayCodeInput
          isKakaoPayCodeValid={isKakaoPayCodeValidToggle.state}
          changeValidState={isKakaoPayCodeValidToggle.changeState}
        />
        <계좌번호오기입안내사항동의여부 onCheck={noticeAgreeToggle.changeState} />
        {/* <ValidateLoadingModal isOpen={isLoading.state} success={isKakaoPayCodeValid.state} />; */}
      </Step.FormSection>

      <Step.ButtonWrapper horizontal className="gap-10">
        <PrevButton />
        <NextButton
          isKakaoPayCodeValid={isKakaoPayCodeValidToggle.state}
          noticeAgree={noticeAgreeToggle.state}
        />
      </Step.ButtonWrapper>
    </>
  );
};

export default KakaopayCodeForm;

const 계좌번호오기입안내사항동의여부 = memo(
  ({ onCheck }: { onCheck: (state: boolean) => void }) => {
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
  },
);

const 송금코드가져오기안내이미지 = memo(() => {
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

const PrevButton = () => {
  const { PrevButton } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();

  return <PrevButton />;
};

const KakaopayCodeInput = ({
  isKakaoPayCodeValid,
  changeValidState,
}: {
  isKakaoPayCodeValid: boolean;
  changeValidState: (state: boolean) => void;
}) => {
  const { inputs } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const { register, getValues, formState } = inputs.accountFormInput;
  const isLoadingToggle = useBoolean();
  const createWishFormData = inputs.wishesFormInput;

  async function handleCheckKakaoPayCode() {
    const kakaoPayCode = getValues('kakaoPayCode');

    if (!formState.errors.kakaoPayCode) {
      await validateKakaoCodeURL(kakaoPayCode);
    }
  }

  async function validateKakaoCodeURL(kakaoPayCode: string) {
    isLoadingToggle.changeState(true);

    try {
      const response = await fetch('/api/kakao/paycode', {
        method: 'POST',
        body: JSON.stringify({ kakaoPayCode: kakaoPayCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = (await response.json()) as DefaultResponseType;

      setTimeout(() => {
        changeValidState(data.success);
      }, 1500);
    } catch (error) {
      changeValidState(false);
      return;
    } finally {
      setTimeout(() => {
        isLoadingToggle.changeState(false);
      }, 2000);
    }
  }
  return (
    <InputText
      register={register('kakaoPayCode')}
      placeholder="송금링크를 붙여 넣어주세요"
      onBlur={handleCheckKakaoPayCode}
      keyPrevent
    ></InputText>
  );
};

const NextButton = ({
  isKakaoPayCodeValid,
  noticeAgree,
}: {
  isKakaoPayCodeValid: boolean;
  noticeAgree: boolean;
}) => {
  const { inputs, nextStep } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const accountFormInput = inputs.accountFormInput;
  const wishesFormInput = inputs.wishesFormInput;
  const { control, getValues } = accountFormInput;
  const { errors, isDirty } = useFormState({ control, name: ['accountInfo'] });

  const handleNextStep = async () => {
    const accountInfo = getValues();
    const 계좌등록요청 = await putUserAccount({ ...accountInfo });
    const 계좌등록요청성공 = 계좌등록요청.data.success;

    if (!계좌등록요청성공) return;

    const wishFormData = wishesFormInput.getValues();
    const 생일잔치등록요청 = await postWishes({ ...wishFormData });
    const 생일잔치등록요청성공 = 생일잔치등록요청.data.success;

    if (!생일잔치등록요청성공) return;

    nextStep();
  };

  // const getDisabledState = () => {
  //   if (errors.accountInfo) return true;
  //   if (isAccountValid === false) return true;
  //   if (noticeAgree === false) return true;

  //   return false;
  // };

  return <Button onClick={handleNextStep}>{'소원생성!'}</Button>;
};
