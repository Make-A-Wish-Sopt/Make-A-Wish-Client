'use client';

import { FormProvider, useForm, UseFormReturn, useWatch } from 'react-hook-form';
import InputForm from '@/components/UI/InputForm';
import Calendar from '@/components/Common/Calendar/Calendar';

import { useEffect, useState } from 'react';
import { useUploadItemInfo } from '@/hooks/wishes/useUploadItemInfo';
import { UploadImageBox } from '@/components/UI/UploadImageBox';
import {
  wishesAccountDataValidate,
  wishesLinkDataValidate,
} from '@/validation/wishes-register-options';
import Button from '@/components/Common/Button';
import { AccountInfoType } from '@/types/wishesType';
import InputText from '@/components/Common/Input/inputText';
import CheckBox from '@/components/UI/CheckBox';
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
import { useRouter } from 'next/navigation';
import { postVerifyAccount } from '@/api/user';
import { postWishes } from '@/api/wishes';
import { checkComp } from '@/utils/common/checkComponent';

const DropDownContent = dynamic(() => import('./dropdownContent'));

export function WishesLinkInputForm({
  methods,
  progressWishesLinkData,
}: {
  methods: UseFormReturn<WishesLinkDataType, any, undefined>;
  progressWishesLinkData?: WishesLinkDataType;
}) {
  const { preSignedImageUrl, uploadImageFile } = useUploadItemInfo();
  const { toggleState: dropDownState, handleToggle, changeOpenState } = useToggle();
  const router = useRouter();
  const control = methods.control;
  const watchWantsGift = useWatch({
    control,
    name: 'wantsGift',
  });

  const watchImageUrl = useWatch({
    control,
    name: 'imageUrl',
  });

  useEffect(() => {
    if (progressWishesLinkData) {
      methods.reset({
        ...progressWishesLinkData,
      });
      return;
    }
  }, []);

  useEffect(() => {
    // if (methods.formState.isValid && preSignedImageUrl) {
    //   changeNextBtnDisabledState(false);
    // } else {
    //   changeNextBtnDisabledState(true);
    // }
    // changeNextBtnDisabledState(false);
  }, [methods.formState.isValid, preSignedImageUrl]);

  useEffect(() => {
    if (preSignedImageUrl) {
      methods.setValue('imageUrl', preSignedImageUrl);
    }
  }, [preSignedImageUrl]);

  function handleNextStep() {
    const wishTitle = methods.getValues('title');

    if (watchWantsGift) {
      router.push(`/wishes/create?step=account&wishTitle=${wishTitle}`);

      // nextStep();
    } else {
      createOnlyLettersWishes();
    }
  }

  function createOnlyLettersWishes() {
    try {
      postWishes(methods).then((response) => {
        if (response.data.success) {
          router.push('/wishes/share');
        }
      });
    } catch (error) {}
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <InputForm title={`링크에 들어온 친구가 보게 될\n 재밌는 이미지를 등록해보세요!`}>
            <UploadImageBox
              preSignedImageUrl={watchImageUrl}
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
              <Calendar date={methods.watch('startDate')} methods={methods} />
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
                <DropDwonBox isOpen={dropDownState} handleToggle={handleToggle}>
                  <RadioSelect isSelect={watchWantsGift} />
                  <span className="w-full">네! 생일 선물도 받아볼래요</span>
                </DropDwonBox>
                {dropDownState && <DropDownContent />}
              </li>

              <li
                className="flex items-center gap-8 w-full h-50 text-[14px] bg-dark_green round-xl px-10 py-14 rounded-xl"
                onClick={() => {
                  methods.setValue('wantsGift', false);
                  changeOpenState(false);
                }}
              >
                <RadioSelect isSelect={!watchWantsGift} />
                아니요. 편지만 받을래요!
              </li>
            </ul>
          </InputForm>

          <div className="flex justify-between gap-10">
            {watchWantsGift && (
              <Button
                type="submit"
                bgColor="main_blue"
                fontColor="white"
                onClick={handleNextStep}
                disabled={true}
                styles={{ marginBottom: '5.8rem' }}
              >
                이전
              </Button>
            )}

            <Button
              type="submit"
              bgColor="main_blue"
              fontColor="white"
              onClick={handleNextStep}
              styles={{ marginBottom: '5.8rem' }}
            >
              {watchWantsGift ? '다음으로' : '소원링크 생성'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default function WishesAccountInput({
  accountData,
  phone,
  methods,
}: {
  accountData?: AccountInfoType;
  phone?: string;
  methods: UseFormReturn<WishesAccountDataType, any, undefined>;
}) {
  const { toggleState: checkBoxState, handleToggle: handleChangeCheckBoxState } = useToggle();
  const [btnDisalbed, setBtnDisabled] = useState(true);

  const { toggleState: modalState, handleToggle } = useToggle();

  const router = useRouter();

  const control = methods.control;

  const watchAccount = useWatch({
    control,
    name: 'account',
  });
  const watchName = useWatch({
    control,
    name: 'name',
  });
  const watchBank = useWatch({
    control,
    name: 'bank',
  });

  useEffect(() => {
    // if (isAbused) {
    //   setBtnDisabled(true);
    //   return;
    // }

    if (
      watchAccount === accountData?.account &&
      watchName === accountData?.name &&
      watchBank === accountData?.bank
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

    // if (isSuccess) {
    //   setBtnDisabled(true);
    // } else {
    //   setBtnDisabled(false);
    // }

    if (methods.formState.isDirty) {
      setBtnDisabled(false);
    }
  }, [methods.formState]);

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
        // changeNextBtnDisabledState(false);
      } else {
        // changeNextBtnDisabledState(true);
      }
    } else {
      // if (methods.formState.isValid && isSuccess && !isAbused && checkBoxState) {
      if (methods.formState.isValid && checkBoxState) {
        // changeNextBtnDisabledState(false);
      } else {
        // changeNextBtnDisabledState(true);
      }
    }

    if (methods.formState.isValid && checkBoxState) {
      // changeNextBtnDisabledState(false);
    } else {
      // changeNextBtnDisabledState(true);
    }
  }, [methods.formState.isValid, checkBoxState]);

  const handleClick = () => {
    if (btnDisalbed) return;

    const accountInfo: AccountInfoType = {
      account: watchAccount,
      bank: watchBank,
      name: watchName,
    };
    postVerifyAccount(accountInfo);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
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

        <div className="flex justify-between gap-10">
          <Button
            bgColor="main_blue"
            fontColor="white"
            onClick={() => {
              router.back();
            }}
          >
            이전
          </Button>

          <Button
            type="submit"
            bgColor="main_blue"
            fontColor="white"
            onClick={() => {}}
            // disabled={nextBtnDisabled}
          >
            다음
          </Button>
        </div>

        {modalState && (
          <Modal isOpen={modalState} handleToggle={handleToggle}>
            <BankModal methods={methods} handleToggle={handleToggle} />
          </Modal>
        )}
      </form>
    </FormProvider>
  );
}
