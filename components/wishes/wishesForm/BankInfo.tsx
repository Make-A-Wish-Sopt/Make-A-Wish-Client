import { editUserAccount } from '@/api/wishes/wishesAPI';
import AlertTextBox from '@/components/common/alertTextBox';
import BasicBox from '@/components/common/box/BasicBox';
import Button from '@/components/common/button/button';
import InputBox from '@/components/common/input/inputBox';
import InputContainer from '@/components/common/input/inputContainer';
import BankInput from '@/components/common/modal/BankInput';
import { useCreateWishesLink } from '@/hooks/queries/wishes/useCreateWishesLink';
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
    changeBankName,
    account,
    handleChangeAccount,
    phone,
    handleChangePhone,
    apiStatus,
  } = useGetUserAccount();

  const [isAlertState, setIsAlertState] = useState(false);
  const { postWishesData } = useCreateWishesLink();

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
      postWishesData();
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
    <Styled.Container>
      <div>
        <InputContainer title={titleText}>
          <BankInput
            name={name}
            handleChangeName={handleChangeName}
            bankName={bankName}
            changeBankName={changeBankName}
            account={account}
            handleChangeAccount={handleChangeAccount}
          />

          <InputContainer title="연락처 입력하기">
            <InputBox
              placeholder="연락처는 (-)없이 입력해주세요"
              handleChangeValue={handleChangePhone}
              value={phone}
            />
            {phone && isAlertState && <AlertTextBox>올바른 연락처를 입력해주세요</AlertTextBox>}
          </InputContainer>
        </InputContainer>
      </div>

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
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100svh;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    margin-bottom: 4.6rem;
  `,
};
