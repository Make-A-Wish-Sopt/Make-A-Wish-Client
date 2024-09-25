'use client';

import { useStepInputContext } from '@/context/stepInputContext';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import InputForm from '@/components/UI/InputForm';
import InputTextarea from '@/components/Common/Input/inputTextarea';

import Calendar from '@/components/Common/Calendar/Calendar';
import { getDate } from '@/utils/common/getDate';
import { useEffect, useState } from 'react';
import { useUploadItemInfo } from '@/hooks/wishes/useUploadItemInfo';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import {
  wishesAccountDataValidate,
  wishesLinkDataValidate,
} from '@/validation/wishes-register-options';
import Button from '@/components/Common/Button';
import { WishesAccountCreate } from './server';
import { AccountInfoType } from '@/types/wishesType';
import InputText from '@/components/Common/Input/inputText';
import CheckBox from '@/components/UI/CheckBox';
import { usePostVerifyAccount } from '@/hooks/queries/user';
import BankModal from '@/components/Common/Modal/BankModal';
import RadioSelect from '@/components/UI/RadioSelect';
import DropDwonBox from '@/components/UI/DropDwonBox';
import useToggle from '@/hooks/common/useToggle';
import Modal from '@/components/Common/Modal';
import { colors } from '@/styles/styles';
import dynamic from 'next/dynamic';
import { WishesAccountDataType, WishesLinkDataType } from '@/types/input';
import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
import InputTextForm from '@/components/UI/InputTextForm';
import { usePostWishes } from '@/hooks/queries/wishes';
import { useRouter } from 'next/navigation';

export default function WishesCreate() {
  const { step, resetStep } = useStepInputContext();

  useEffect(() => {
    resetStep();
  }, []);

  const wishesLinkMethods = useForm<WishesLinkDataType>({
    mode: 'onChange',
    defaultValues: {
      imageUrl: '',
      title: '',
      hint: '',
      startDate: new Date(),
      endDate: getDate(new Date(), 7),
      wantsGift: false,
    },
  });

  const wishesAccountMethods = useForm<WishesAccountDataType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      account: '',
      bank: '',
      phone: '',
      noticeAgree: false,
    },
  });
  console.log(wishesLinkMethods.watch(), wishesAccountMethods.watch());

  return (
    <>
      {
        {
          1: <WishesLinkCreate methods={wishesLinkMethods} />,
          2: <WishesAccountCreate methods={wishesAccountMethods} />,
        }[step]
      }
    </>
  );
}

const DropDownContent = dynamic(() => import('./dropdownContent'));

function WishesLinkCreate({
  methods,
}: {
  methods: UseFormReturn<WishesLinkDataType, any, undefined>;
}) {
  const { nextBtnDisabled, nextStep, changeNextBtnDisabledState } = useStepInputContext();
  const { preSignedImageUrl, uploadImageFile } = useUploadItemInfo();

  const { toggleState, handleToggle, changeOpenState } = useToggle();
  const { handlePostWishes } = usePostWishes(methods);
  const router = useRouter();

  useEffect(() => {
    if (methods.formState.isValid && preSignedImageUrl) {
      changeNextBtnDisabledState(false);
    } else {
      changeNextBtnDisabledState(true);
    }
  }, [methods.formState.isValid, preSignedImageUrl]);

  useEffect(() => {
    if (preSignedImageUrl) {
      methods.setValue('imageUrl', preSignedImageUrl);
      // methods.register('image', { ...wishesLinkDataValidate.image });
    }
  }, [preSignedImageUrl]);

  function handleNextStep() {
    if (methods.watch('wantsGift')) {
      nextStep();
    } else {
      handlePostWishes();
      router.push('/wishes/share');
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <InputForm title={`링크에 들어온 친구가 보게 될\n 재밌는 이미지를 등록해보세요!`}>
            <UploadImageBox
              preSignedImageUrl={preSignedImageUrl}
              handleUploadImageFile={uploadImageFile}
            />
          </InputForm>

          <InputTextForm<WishesLinkDataType>
            inputType="textarea"
            inputTitle="친구에게 남기고 싶은 한마디"
            registerName="hint"
            placeholder="ex.) 생일을 축하합니다~"
            maxLength={MAX_TEXTAREA_LENGTH}
          />

          <InputForm title="내 생일 주간 설정하기">
            <div className="flex justify-between gap-10">
              {/* 시작일 */}
              <Calendar date={methods.watch('startDate')} methods={methods} />
              {/* 종료일 */}
              <Calendar date={methods.watch('endDate')} methods={methods} readOnly />
            </div>
          </InputForm>

          <InputForm title="생일 선물도 받고 싶어요!">
            <ul className="flex flex-col gap-12 font-galmuri text-white">
              <li
                className="w-full bg-dark_green px-12 py-14 rounded-xl"
                onClick={() => {
                  methods.setValue('wantsGift', true);
                }}
              >
                <DropDwonBox isOpen={toggleState} handleToggle={handleToggle}>
                  <RadioSelect isSelect={methods.watch('wantsGift')} />
                  <span className="w-full">네! 생일 선물도 받아볼래요</span>
                </DropDwonBox>
                {toggleState && <DropDownContent />}
              </li>

              <li
                className="flex items-center gap-8 w-full h-50 text-[14px] bg-dark_green round-xl px-10 py-14 rounded-xl"
                onClick={() => {
                  methods.setValue('wantsGift', false);
                  changeOpenState(false);
                }}
              >
                <RadioSelect isSelect={!methods.watch('wantsGift')} />
                아니요. 편지만 받을래요!
              </li>
            </ul>
          </InputForm>

          <Button
            type="submit"
            bgColor="main_blue"
            fontColor="white"
            onClick={handleNextStep}
            disabled={nextBtnDisabled}
            styles={{ marginBottom: '5.8rem' }}
          >
            {methods.watch('wantsGift') ? '다음으로' : '소원링크 생성'}
          </Button>
        </form>
      </FormProvider>
    </>
  );
}

export function WishesAccountCreateInput({
  methods,
  accountData,
  phone,
}: {
  methods: UseFormReturn<WishesAccountDataType, any, undefined>;
  accountData?: AccountInfoType;
  phone?: string;
}) {
  const { toggleState: checkBoxState, handleToggle: handleChangeCheckBoxState } = useToggle();
  const { nextBtnDisabled, changeNextBtnDisabledState } = useStepInputContext();
  const [btnDisalbed, setBtnDisabled] = useState(true);

  const { toggleState, handleToggle } = useToggle();

  const { handleVerifyAccount, isSuccess, isReady, isAbused } = usePostVerifyAccount({
    name: methods.getValues('name'),
    bank: methods.getValues('bank'),
    account: methods.getValues('account'),
  });

  useEffect(() => {
    if (isAbused) {
      setBtnDisabled(true);
      return;
    }

    if (
      methods.watch('account') === accountData?.account &&
      methods.watch('name') === accountData?.name &&
      methods.watch('bank') === accountData?.bank
    ) {
      setBtnDisabled(true);
      return;
    }

    if (
      methods.formState.errors.account ||
      methods.formState.errors.bank ||
      methods.formState.errors.name
    ) {
      setBtnDisabled(true);
      return;
    }

    if (isSuccess) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }

    if (methods.formState.isDirty) {
      setBtnDisabled(false);
    }
  }, [methods.formState, isSuccess, isAbused]);

  const handleClick = () => {
    if (btnDisalbed) return;
    handleVerifyAccount();
  };

  useEffect(() => {
    if (accountData) {
      methods.setValue('account', accountData.account, { shouldValidate: true });
      methods.setValue('bank', accountData.bank, { shouldValidate: true });
      methods.setValue('name', accountData.name, { shouldValidate: true });
    }

    if (phone) {
      methods.setValue('phone', phone, { shouldValidate: true });
    }
  }, [accountData, phone]);

  useEffect(() => {
    if (accountData) {
      if (methods.formState.isValid && checkBoxState) {
        changeNextBtnDisabledState(false);
      } else {
        changeNextBtnDisabledState(true);
      }
    } else {
      if (methods.formState.isValid && isSuccess && !isAbused && checkBoxState) {
        changeNextBtnDisabledState(false);
      } else {
        changeNextBtnDisabledState(true);
      }
    }

    if (methods.formState.isValid && checkBoxState) {
      changeNextBtnDisabledState(false);
    } else {
      changeNextBtnDisabledState(true);
    }
  }, [methods.formState.isValid, checkBoxState]);

  return (
    <FormProvider {...methods}>
      <form>
        <InputForm title="계좌번호 입력하기">
          <div className="flex flex-col gap-12">
            <InputText
              value={'※ 4회 이상 틀리면, 서비스 이용이 제한됩니다.'}
              boxStyles={{ backgroundColor: '#3C0F0F' }}
              styles={{ color: colors.warning_red }}
              readOnly
            />
            <InputText placeholder="예금주명" register={methods.register('name')} />

            <InputText
              placeholder="은행선택"
              register={methods.register('bank')}
              onClick={handleToggle}
              readOnly
            />

            <div className="flex justify-between gap-6">
              <div className="flex-grow-3">
                <InputText
                  placeholder="계좌번호를 입력해주세요"
                  register={methods.register('account')}
                />
              </div>
              <div className="flex-grow-1">
                <div className="w-115 h-50 font-galmuri">
                  <Button
                    bgColor="main_blue"
                    fontColor="white"
                    font="galmuri"
                    onClick={handleClick}
                    disabled={btnDisalbed}
                    styles={{ fontSize: '14px' }}
                  >
                    계좌번호 확인
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </InputForm>

        <InputForm title="휴대폰번호 입력하기">
          <div className="flex flex-col gap-24">
            <InputText register={methods.register('phone')} />

            <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl ">
              {
                '※ 계좌번호, 연락처에 대한 허위기재와 오기로 인해 발생되는 문제는 책임지지 않습니다.'
              }
              <div className="flex justify-end w-full h-20">
                <CheckBox<Pick<WishesAccountDataType, 'noticeAgree'>>
                  checkBoxText={'동의함'}
                  registerName={'noticeAgree'}
                />
              </div>
            </div>
          </div>
        </InputForm>

        <Button bgColor="main_blue" fontColor="black" onClick={() => {}} disabled={nextBtnDisabled}>
          생일잔치에 친구 초대하기
        </Button>

        {toggleState && (
          <Modal isOpen={toggleState} handleToggle={handleToggle}>
            <BankModal methods={methods} handleToggle={handleToggle} />
          </Modal>
        )}
      </form>
    </FormProvider>
  );
}
