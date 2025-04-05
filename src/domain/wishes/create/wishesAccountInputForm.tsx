'use client';

import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import {
  AccountFormValidatorType,
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
} from '@/validation/wishes.validate';
import InputForm from '@/components/UI/InputForm';
import { colors } from '@/styles/styles';
import InputText from '@/components/Elements/Input/inputText';
import Button from '@/components/Elements/Button';
import { PropsWithChildren, useEffect } from 'react';
import useBoolean, { BooleanType } from '@/hooks/useBoolean';
import DropDwonBox from '@/components/UI/DropDwonBox';
import { getUserAccount, postVerifyAccount } from '@/api/user';
import CheckBox from '@/components/UI/CheckBox';
import { wishesAccountInputInit } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckedIcon, { WarningCheckedIcon } from '@/components/Elements/Icon/CheckedIcon';
import ValidateLoadingModal from '@/components/Elements/Modal/ValidateLoadingModal';
import { AxiosError } from 'axios';
import useModals from '@/hooks/useModals';
import Image from 'next/image';

export default function WishesAccountInputForm({
  accountVerifyBtnState,
  isAccountValid,
  isLoading,
  submitBtnActiveState,
  noticeAgree,
  children,
}: {
  accountVerifyBtnState: BooleanType;
  isAccountValid: BooleanType;
  isLoading: BooleanType;
  submitBtnActiveState: BooleanType;
  noticeAgree: BooleanType;
} & PropsWithChildren) {
  const wishesAccountInputMethods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
      forPayCode: false,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });

  const { register, reset, watch, formState } = wishesAccountInputMethods;
  const { errors, isDirty } = formState;
  const { accountInfo } = watch();
  // const { name, bank, account } = accountInfo;
  const isInitialApiCall = useBoolean(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserAccount();
        if (response.transferInfo) {
          // 📌 Yup 유효성 검사 실행
          const accountValidator = wishesAccountDataResolver.pick(['accountInfo']);

          await accountValidator.validate({ accountInfo: response.transferInfo.accountInfo });
          isAccountValid.changeState(true);

          // ✅ 유효성 검사를 통과하면 reset 실행
          reset({ ...response.transferInfo });
        }
      } catch (error) {
        isAccountValid.changeState(false);
      }
    };

    fetchData();
  }, []);

  function warningIconCondition() {
    if (!accountInfo.account) return;
    if (isInitialApiCall.state) return;
    if (!isInitialApiCall.state && !errors.accountInfo && isDirty) return;

    if (!isAccountValid.state || (errors.accountInfo && errors.accountInfo.account)) {
      return <WarningCheckedIcon width={24} />;
    }
  }

  function successIconCondition() {
    if (!accountInfo.account) return;
    if (errors.accountInfo && errors.accountInfo.account) return;
    if (!isAccountValid.state) return;
    if (isDirty) return;

    return <CheckedIcon width={24} />;
  }

  return (
    <FormProvider {...wishesAccountInputMethods}>
      <InputForm title="계좌번호 입력하기">
        {!isInitialApiCall.state && !isAccountValid.state && (
          <InputText
            value={'※ 4회 이상 틀리면, 서비스 이용이 제한됩니다.'}
            boxStyles={{
              backgroundColor: '#3C0F0F',
              color: colors.warning_red,
              marginBottom: '1.2rem',
            }}
            readOnly
          />
        )}

        <div className="flex flex-col gap-12">
          <InputText placeholder="예금주명" register={register('accountInfo.name')} />
          <SelectBankInput />

          <AccountInput
            accountVerifyBtnState={accountVerifyBtnState}
            isLoading={isLoading}
            isAccountValid={isAccountValid}
            submitBtnActiveState={submitBtnActiveState}
            noticeAgree={noticeAgree.state}
            isInitialApiCall={isInitialApiCall}
          >
            <InputText
              placeholder="계좌번호를 입력해주세요"
              register={register('accountInfo.account')}
            >
              {!isLoading.state && warningIconCondition()}
              {!isLoading.state && successIconCondition()}
            </InputText>
          </AccountInput>

          <AccountFormNotice changeNoticeAgreeState={noticeAgree.changeState}>
            <p>{'※ 잘못된 계좌번호 기재로 발생되는 문제는 책임지지 않아요!ㅠㅠ'}</p>
          </AccountFormNotice>
        </div>

        {children}
      </InputForm>
    </FormProvider>
  );
}

function AccountInput({
  accountVerifyBtnState,
  isAccountValid,
  isLoading,
  submitBtnActiveState,
  noticeAgree,
  isInitialApiCall,
  children,
}: {
  accountVerifyBtnState: BooleanType;
  isAccountValid: BooleanType;
  isLoading: BooleanType;
  submitBtnActiveState: BooleanType;
  noticeAgree: boolean;
  isInitialApiCall: BooleanType;
} & PropsWithChildren) {
  const { formState, watch, reset, trigger } = useFormContext<WishesAccountDataResolverType>();
  const { isDirty, errors } = formState;
  const { accountInfo, forPayCode, kakaoPayCode } = watch();

  useEffect(() => {
    trigger('accountInfo'); // 계좌 정보가 변경될 때 유효성 검사 실행
  }, [accountInfo.account, accountInfo.bank, accountInfo.name]);

  useEffect(() => {
    accountVerifyBtnState.changeState(false);

    if (!accountInfo.account || errors.accountInfo) return;
    if (!isInitialApiCall.state && !isDirty) return;

    if (
      (!isInitialApiCall.state && !errors.accountInfo && isDirty) ||
      (accountInfo.account && !errors.accountInfo)
    ) {
      accountVerifyBtnState.changeState(true);
    }
  }, [errors.accountInfo, isInitialApiCall.state, accountInfo.account, isDirty]);

  useEffect(() => {
    if (
      !errors.accountInfo &&
      !accountVerifyBtnState.state &&
      noticeAgree &&
      isAccountValid.state
    ) {
      submitBtnActiveState.changeState(true);
    } else {
      submitBtnActiveState.changeState(false);
    }
  }, [errors.accountInfo, accountVerifyBtnState.state, noticeAgree, isAccountValid.state]);

  function handleAccountCheck() {
    isLoading.changeState(true);

    if ((accountInfo.account && accountInfo.bank, accountInfo.name)) {
      isAccountValid.changeState(false);

      postVerifyAccount({
        account: accountInfo.account,
        bank: accountInfo.bank,
        name: accountInfo.name,
      })
        .then((response) => {
          isAccountValid.changeState(response.success);
        })
        .catch((error: AxiosError) => {
          isAccountValid.changeState(false);
        })
        .finally(() => {
          setTimeout(() => {
            isLoading.changeState(false);
          }, 1500);
          isInitialApiCall.changeState(false);
          accountVerifyBtnState.changeState(false);

          reset({
            accountInfo,
            forPayCode,
            kakaoPayCode,
          });
        });
    }
  }

  return (
    <div className="flex justify-between gap-6">
      <div className="flex-grow-3 w-full">{children}</div>
      <div className="flex-grow-1">
        <div className="w-115 h-50 font-galmuri">
          <Button
            fontColor="white"
            font="galmuri"
            onClick={handleAccountCheck}
            style={{ fontSize: '14px' }}
            disabled={!accountVerifyBtnState.state}
          >
            계좌번호 확인
          </Button>
        </div>
      </div>
      {<ValidateLoadingModal isOpen={isLoading.state} success={isAccountValid.state} />}
    </div>
  );
}

const SelectBankInput = () => {
  const { register, setValue } = useFormContext<AccountFormValidatorType>();

  const { Modal, modalState, openModal, closeModal } = useModals<['bank']>();

  const handleSelectBank = (bankName: string) => {
    setValue('accountInfo.bank', bankName);
    closeModal('bank');
  };

  return (
    <>
      <Modal
        modalKey="bank"
        Trigger={
          <div onClick={() => openModal('bank')}>
            <DropDwonBox
              isOpen={modalState.bank}
              changeOpenState={() => closeModal('bank')}
              bgColor="dark_green"
            >
              <input
                {...register('accountInfo.bank')}
                placeholder="은행 선택"
                className="w-full h-full font-galmuri text-[14px] cursor-pointer"
                readOnly
              />
            </DropDwonBox>
          </div>
        }
      >
        <Modal.ModalOverlay>
          <Modal.ModalLayout className="flex justify-center items-center">
            <Modal.ContentFrame bgColor="background" className="w-335 overflow-scroll">
              <Modal.ContentHeader>
                <h2 className="font-galmuri text-[16px] text-white mb-20">은행을 선택해주세요.</h2>
              </Modal.ContentHeader>
              <Modal.ContentBody className="max-h-[608px] overflow-scroll">
                <ul
                  id="bankList"
                  className="h-91.4% overflow-scroll scrollbar-hide mt-8 grid grid-cols-3 gap-8"
                >
                  {BANK_LIST.map((bank) => (
                    <li
                      id="bankItem"
                      className="w-90 h-66 py-10 bg-dark_green rounded-xl cursor-pointer"
                      onClick={() => handleSelectBank(bank.name)}
                      key={bank.name}
                    >
                      <div
                        id="bankItem-wrppaer"
                        className="flex flex-col w-full h-ful items-center"
                      >
                        <div
                          id="bankLogo-wrppaer"
                          className="flex justify-center items-center w-26 h-26 mx-auto"
                        >
                          <Image src={bank.logo} alt={`${bank.name} 로고`} />
                        </div>
                        <span
                          id="bankName"
                          className="font-galmuri text-white text-[12px] text-center mt-6"
                        >
                          {bank.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Modal.ContentBody>
            </Modal.ContentFrame>
          </Modal.ModalLayout>
        </Modal.ModalOverlay>
      </Modal>
    </>
  );
};
export function AccountFormNotice({
  changeNoticeAgreeState,
  children,
}: {
  changeNoticeAgreeState: (state: boolean) => void;
} & PropsWithChildren) {
  return (
    <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl">
      {children}
      <div className="flex justify-end w-full h-20">
        <div className="flex justify-end">
          <CheckBox changeCheckedState={changeNoticeAgreeState}>
            <span className="font-galmuri text-[14px] text-main_blue ml-8">{'동의함'}</span>
          </CheckBox>
        </div>
      </div>
    </div>
  );
}
