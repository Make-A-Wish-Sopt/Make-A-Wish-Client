import { editUserAccount } from '@/api/wishes/editUserAccount';
import AlertTextBox from '@/components/common/alertTextBox';
import BasicBox from '@/components/common/box/BasicBox';
import HalfBox from '@/components/common/box/HalfBox';
import LargeBox from '@/components/common/box/LargeBox';
import Button from '@/components/common/button/button';
import InputBox from '@/components/common/input/inputBox';
import InputContainer from '@/components/common/input/inputContainer';
import BankInput from '@/components/common/modal/BankInput';
import useGetUserAccount from '@/hooks/queries/wishes/useGetUserAccount';
import theme from '@/styles/theme';
import { validation } from '@/validation/input';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

export default function BankInfo() {
  const {
    name,
    handleChangeName,
    bankName,
    handleChangeBankName,
    account,
    handleChangeAccount,
    phone,
    handleChangePhone,
    apiStatus,
  } = useGetUserAccount();

  const [isAlertState, setIsAlertState] = useState(false);

  const titleText = apiStatus
    ? '저번에 진행한 펀딩 정보를 가져왔어요.확인 후 변동 사항이 있다면 수정해주세요.'
    : '펀딩기간이 끝나기 전에 계좌를 입력해주세요. 펀딩 성공 여부와 관계없이 입금됩니다.';
  const router = useRouter();

  const { mutate } = useMutation(() => editUserAccount({ name, bankName, account }, phone), {
    onSuccess: () => {
      router.push('/wishes/share');
    },
  });

  const uploadAccount = () => {
    if (name !== '' && bankName !== '' && account !== '' && !validation.isIncludeHyphen(account)) {
      mutate();
    } else {
      alert('계좌정보를 확인 해 주세요!');
    }
  };

  useEffect(() => {
    validation.isIncludeHyphen(phone) ? setIsAlertState(true) : setIsAlertState(false);
    validation.isCorrectPhoneNumber(phone) ? setIsAlertState(false) : setIsAlertState(true);
  }, [phone]);

  return (
    <>
      <Styled.InputTitle>{titleText}</Styled.InputTitle>

      <BankInput
        name={name}
        handleChangeName={handleChangeName}
        bankName={bankName}
        handleChangeBankName={handleChangeBankName}
        account={account}
        handleChangeAccount={handleChangeAccount}
      />

      <InputContainer title="연락처 입력하기">
        <InputBox
          placeholder="연락처는 (-)없이 입력해주세요"
          handleChangeValue={handleChangePhone}
          value={phone}
        />
      </InputContainer>

      {phone && isAlertState && <AlertTextBox>올바른 연락처를 입력해주세요</AlertTextBox>}

      <Styled.ButtonWrapper>
        <BasicBox
          bgColor={
            !isAlertState && !validation.isIncludeHyphen(account) && bankName && name
              ? theme.colors.main_blue
              : theme.colors.gray1
          }
          fontColor={theme.colors.white}
          borderColor={'transparent'}
        >
          <Button handleClick={uploadAccount}>완료</Button>
        </BasicBox>
      </Styled.ButtonWrapper>
    </>
  );
}

const Styled = {
  InputTitle: styled.p`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
  `,

  ButtonWrapper: styled.div`
    position: absolute;
    bottom: 4.6rem;

    display: flex;
    justify-content: space-between;

    width: 33.5rem;
  `,
};
