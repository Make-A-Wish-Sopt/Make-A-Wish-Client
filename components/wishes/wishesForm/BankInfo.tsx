import { editUserAccount } from '@/api/wishes/editUserAccount';
import HalfBox from '@/components/common/box/HalfBox';
import Button from '@/components/common/button/button';
import BankInput from '@/components/common/modal/BankInput';
import useGetUserAccount from '@/hooks/queries/wishes/useGetUserAccount';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
    accountInfo,
    setAccountInfo,
    isSuccess,
  } = useGetUserAccount();

  const titleText = isSuccess
    ? '저번에 진행한 펀딩 정보를 가져왔어요.확인 후 변동 사항이 있다면 수정해주세요.'
    : '펀딩기간이 끝나기 전에 계좌를 입력해주세요. 펀딩 성공 여부와 관계없이 입금됩니다.';
  const router = useRouter();

  useEffect(() => {
    setAccountInfo((prev) => ({
      ...prev,
      name: name,
      bank: bankName,
      account: account,
    }));
  }, [name, bankName, account]);

  const { mutate } = useMutation(() => editUserAccount(accountInfo), {
    onSuccess: () => {
      router.push('/wishes/share');
    },
  });

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

      <Styled.ButtonWrapper>
        <HalfBox bgColor={theme.colors.white} fontColor={theme.colors.main_blue}>
          <Button
            handleClick={() => {
              router.push('/wishes/share');
            }}
          >
            나중에 입력할게요
          </Button>
        </HalfBox>
        <HalfBox
          bgColor={theme.colors.main_blue}
          fontColor={theme.colors.white}
          borderColor={'transparent'}
        >
          <Button handleClick={() => mutate}>완료</Button>
        </HalfBox>
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
    display: flex;
    justify-content: space-between;
  `,
};
