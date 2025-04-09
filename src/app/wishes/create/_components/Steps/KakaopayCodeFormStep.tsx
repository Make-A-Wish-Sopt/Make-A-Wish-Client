'use client';

import { useFunnelContext } from '@/Context/FunnelContext';
import useBoolean from '@/hooks/useBoolean';
import { FormProvider, useForm, useFormContext, useFormState } from 'react-hook-form';
import { getUserAccount } from '@/api/user';
import Button from '@/components/Elements/Button';
import { useRouters } from '@/hooks/useRouters';
import { WishesFunnelStepType } from '@/constant/funnelStep';
import {
  KakaopayCodeInput,
  계좌번호오기입안내사항동의여부,
  송금코드가져오기안내이미지,
} from '@/app/_components/Form/wish/KakaopayCodeForm';
import {
  AccountFormSchema,
  AccountFormSchemaType,
  WishesFormScehmaType,
} from '@/Schema/wishes.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Step } from '@/components/Modules/Funnel';
import { useEffect, useMemo } from 'react';
import { createAccountWithWishData, updateAccount } from '@/app/_components/Form/wish/AccountForm';
import { accountFormInitValues } from '@/constant/init';

const KakaopayCodeFormStep = ({ isEdit }: { isEdit?: boolean }) => {
  const { setSharedData, getSharedData } = useFunnelContext<WishesFunnelStepType>();

  const defaultValues = useMemo(() => {
    const saved = getSharedData('account') as AccountFormSchemaType;
    return saved ? { ...saved, forPayCode: true } : { ...accountFormInitValues, forPayCode: true };
  }, [getSharedData]);

  const kakaopayCodeForm = useForm<AccountFormSchemaType>({
    mode: 'onChange',
    defaultValues: { ...defaultValues },
    resolver: yupResolver(AccountFormSchema),
  });

  const isKakaoPayCodeValidToggle = useBoolean();
  const noticeAgreeToggle = useBoolean();

  useEffect(() => {
    const savedAccountFormData = getSharedData('account');

    if (savedAccountFormData) return;

    const kakaoPayValidator = AccountFormSchema.pick(['kakaoPayCode']);
    const fetchData = async () => {
      try {
        const response = await getUserAccount();
        if (response.transferInfo) {
          await kakaoPayValidator.validate({ kakaoPayCode: response.transferInfo.kakaoPayCode });

          kakaopayCodeForm.reset({ ...response.transferInfo });
          setSharedData((prev) => ({
            ...prev,
            account: { ...response.transferInfo },
          }));
        }
      } catch (error) {
        console.error('초기 데이터 유효성 검사 실패:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <FormProvider {...kakaopayCodeForm}>
      <Step.FormSection className="flex flex-col gap-12 mb-24">
        <송금코드가져오기안내이미지 />
        <KakaopayCodeInput
          isKakaoPayCodeValid={isKakaoPayCodeValidToggle.state}
          changeValidState={isKakaoPayCodeValidToggle.changeState}
        />
        <계좌번호오기입안내사항동의여부 onCheck={noticeAgreeToggle.changeState} />
      </Step.FormSection>

      <Step.ButtonWrapper horizontal className="gap-10">
        <PrevButton />
        <NextButton
          isEdit={isEdit}
          isKakaoPayCodeValid={isKakaoPayCodeValidToggle.state}
          noticeAgree={noticeAgreeToggle.state}
        />
      </Step.ButtonWrapper>
    </FormProvider>
  );
};

export default KakaopayCodeFormStep;

const PrevButton = () => {
  const { PrevButton, prevStep, setSharedData, getSharedData } =
    useFunnelContext<WishesFunnelStepType>();
  const { getValues, reset } = useFormContext<AccountFormSchemaType>();

  useEffect(() => {
    const savedData = getSharedData('account') as AccountFormSchemaType;
    if (savedData) {
      reset({ ...savedData, forPayCode: true });
    }
  }, []);

  const handlePrevStep = () => {
    setSharedData((prev) => ({
      ...prev,
      account: { ...getValues(), forPayCode: true },
    }));
    prevStep();
  };

  return <PrevButton onClick={handlePrevStep} />;
};

const NextButton = ({
  isKakaoPayCodeValid,
  noticeAgree,
  isEdit,
}: {
  isKakaoPayCodeValid: boolean;
  noticeAgree: boolean;
  isEdit?: boolean;
}) => {
  const { getSharedData } = useFunnelContext<WishesFunnelStepType>();
  const { control, getValues } = useFormContext<AccountFormSchemaType>();
  const { errors } = useFormState({ control, name: ['kakaoPayCode'] });
  const { handleRouter } = useRouters();

  const handleNextStep = async () => {
    const accountData = getValues();
    if (isEdit) {
      updateAccount(accountData, () => handleRouter('/mypage'));
    } else {
      const wishFormData = getSharedData('wishes') as WishesFormScehmaType;
      createAccountWithWishData(accountData, wishFormData, () =>
        handleRouter('/wishes/create/complete'),
      );
    }
  };

  return (
    <>
      <Button
        disabled={!!errors.kakaoPayCode || !isKakaoPayCodeValid || !noticeAgree}
        onClick={handleNextStep}
      >
        {isEdit ? '수정 완료' : '소원생성!'}
      </Button>
    </>
  );
};
