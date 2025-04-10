'use client';

import { postVerifyAccount, putUserAccount } from '@/api/user';
import Button from '@/components/Elements/Button';
import InputText from '@/components/Elements/Input/inputText';
import CheckBox from '@/components/UI/CheckBox';
import InputForm from '@/components/UI/InputForm';
import { BANK_LIST } from '@/constant/bankList';
import { colors } from '@/styles/styles';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import {
  FormProvider,
  useFormContext,
  UseFormReturn,
  useFormState,
  useWatch,
} from 'react-hook-form';
import CheckedIcon, { WarningCheckedIcon } from '@/components/Elements/Icon/CheckedIcon';
import { BooleanHookType } from '@/hooks/useBoolean';
import useModals from '@/hooks/useModals';
import { toast } from 'sonner';
import { FetchStatusType, useFetch } from '@/hooks/useFetch';
import { AccountInfoType } from '@/types/wishesType';
import { isEqual } from 'lodash';
import {
  AccountFormSchemaType,
  WishesFormScehmaType,
  WishesFormSchema,
} from '@/Schema/wishes.schema';
import Box from '@/components/Elements/Box';
import { MainBlueArrowIc } from '@public/assets/icons';
import { postWishes } from '@/api/wishes';
import { LoadingCake } from '@/components/UI/Loading';

export const AccountAgreementCheckbox = memo(
  ({ onCheck }: { onCheck: (state: boolean) => void }) => {
    return (
      <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl">
        <p>※ 잘못된 계좌번호 기재로 발생되는 문제는 책임지지 않아요!ㅠㅠ</p>
        <div className="flex justify-end w-full h-20">
          <div className="flex justify-end">
            <CheckBox changeCheckedState={onCheck}>
              <span className="font-galmuri text-[14px] text-main_blue ml-8">동의함</span>
            </CheckBox>
          </div>
        </div>
      </div>
    );
  },
);

export const DepositorNameInput = memo(() => {
  const { register } = useFormContext<AccountFormSchemaType>();
  return <InputText placeholder="예금주명" register={register('accountInfo.name')} />;
});

export function AccountWarningBox() {
  return (
    <InputText
      value="※ 4회 이상 틀리면, 서비스 이용이 제한됩니다."
      boxStyles={{
        backgroundColor: '#3C0F0F',
        color: colors.warning_red,
        marginBottom: '1.2rem',
      }}
      readOnly
    />
  );
}

export const SelectBankInput = memo(() => {
  const { Modal, modalState, openModal, closeModal } = useModals<['bank']>();
  const { setValue, register } = useFormContext<AccountFormSchemaType>();

  const handleChangeBank = (bankName: string) => {
    setValue('accountInfo.bank', bankName, { shouldValidate: true });
  };

  const onSelectBank = (bankName: string) => {
    handleChangeBank(bankName);
    closeModal('bank');
  };

  return (
    <Modal
      modalKey="bank"
      Trigger={
        <Box
          as="button"
          onClick={() => openModal('bank')}
          className="flex justify-between items-center text-[14px] "
        >
          <input
            {...register('accountInfo.bank')}
            placeholder="은행 선택"
            className="w-full h-full font-galmuri text-[14px] cursor-pointer"
            readOnly
          />

          <Image
            src={MainBlueArrowIc}
            alt="화살표 아이콘"
            className={`origin-center transition-transform duration-500 ease-in-out ${
              modalState.bank ? 'rotate-90' : '-rotate-90'
            }`}
          />
        </Box>
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
                    onClick={() => onSelectBank(bank.name)}
                    key={bank.name}
                  >
                    <div id="bankItem-wrppaer" className="flex flex-col w-full h-ful items-center">
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
  );
});

export function AccountNumberInput({
  isAccountValid,
  onCheckAccountValid,
}: {
  isAccountValid: boolean;
  onCheckAccountValid: (state: boolean) => void;
}) {
  const { data, status, delayFetchData, LoadingModal } = useFetch(postVerifyAccount);
  const { register, control } = useFormContext<AccountFormSchemaType>();
  const [validAccount, setValidAccount] = useState<AccountInfoType | null>(null);
  const { errors } = useFormState({ control, name: ['accountInfo'] });

  const accountInfo = useWatch({
    control,
    name: 'accountInfo',
  });

  useEffect(() => {
    if (isEqual(accountInfo, validAccount)) {
      onCheckAccountValid(true);
      return;
    }

    onCheckAccountValid(false);
  }, [accountInfo, validAccount, onCheckAccountValid]); // 🔁 값이 바뀔 때마다 실행

  useEffect(() => {
    if (!data) return;

    if (data.success) {
      onCheckAccountValid(true);
      setValidAccount({
        account: accountInfo.account,
        bank: accountInfo.bank,
        name: accountInfo.name,
      });
    } else {
      onCheckAccountValid(false);
      toast.error('※ 4회 이상 틀리면, 서비스 이용이 제한됩니다.');
    }
  }, [data]);

  const handleCheckAccount = async () => {
    delayFetchData(800, {
      account: accountInfo.account,
      bank: accountInfo.bank,
      name: accountInfo.name,
    });
  };

  const get상태아이콘 = (statusData: FetchStatusType) => {
    if (statusData === 'idle') return;

    if (statusData === 'success' && isAccountValid) {
      return <CheckedIcon width={24} />;
    }

    if (!isAccountValid || !!errors.accountInfo) {
      return <WarningCheckedIcon width={24} />;
    }
  };

  return (
    <div className="flex justify-between gap-6">
      <div className="flex-grow-3 w-full">
        <InputText placeholder="계좌번호를 입력해주세요" register={register('accountInfo.account')}>
          {get상태아이콘(status)}
        </InputText>
      </div>

      <div className="flex-grow-1">
        <div className="w-115 h-50 font-galmuri">
          <Button
            disabled={isEqual(accountInfo, validAccount) || !!errors.accountInfo}
            fontColor="white"
            font="galmuri"
            onClick={handleCheckAccount}
            style={{ fontSize: '14px' }}
          >
            계좌번호 확인
          </Button>
        </div>
      </div>
      <LoadingModal render={<LoadingCake text="검사 중" />} />
    </div>
  );
}

const 계좌등록요청 = async (accountData: AccountFormSchemaType) => {
  if (!accountData) return;

  const response = await putUserAccount({ ...accountData });

  if (!response?.data.success) {
    toast.error('계좌 등록에 실패했습니다. 다시 시도해주세요.');
    return false;
  }

  return true;
};

const 생일잔치정보등록 = async (wishFormData: WishesFormScehmaType) => {
  if (!wishFormData) return;

  try {
    await WishesFormSchema.validate(wishFormData, { abortEarly: false });
  } catch (error) {
    return false;
  }

  const response = await postWishes({ ...wishFormData });

  if (!response?.data.success) {
    toast.error('생일잔치 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
    return false;
  }

  return true;
};

export const createAccountWithWishData = async (
  accountData: AccountFormSchemaType,
  wishFormData: WishesFormScehmaType,
  onSuccess: () => void,
) => {
  if (!(await 계좌등록요청(accountData))) return;
  if (!(await 생일잔치정보등록(wishFormData))) return;

  onSuccess();
};

export const updateAccount = async (accountData: AccountFormSchemaType, onSuccess: () => void) => {
  if (!(await 계좌등록요청(accountData))) return;

  toast.success('계좌정보 수정완료!');
  setTimeout(() => {
    onSuccess();
  }, 1500);
};

export default function AccountForm({
  accountFormMethods,
  isAccountValidToggle,
  noticeAgreeToggle,
}: {
  accountFormMethods: UseFormReturn<AccountFormSchemaType>;
  isAccountValidToggle: BooleanHookType;
  noticeAgreeToggle: BooleanHookType;
}) {
  const { trigger } = accountFormMethods;

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <FormProvider {...accountFormMethods}>
      <InputForm title="계좌번호 입력하기">
        <div className="flex flex-col gap-12">
          <DepositorNameInput />
          <SelectBankInput />
          <AccountNumberInput
            isAccountValid={isAccountValidToggle.state}
            onCheckAccountValid={isAccountValidToggle.changeState}
          />
          <AccountAgreementCheckbox onCheck={noticeAgreeToggle.changeState} />
        </div>
      </InputForm>
    </FormProvider>
  );
}
