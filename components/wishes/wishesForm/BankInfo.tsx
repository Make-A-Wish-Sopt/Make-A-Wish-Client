import HalfBox from '@/components/common/box/HalfBox';
import Button from '@/components/common/button/button';
import BankInput from '@/components/common/modal/BankInput';
import useUserInfo from '@/hooks/common/useUserInfo';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function BankInfo() {
  const { bankName, handleChangeBankName, account, handleChangeAccount } = useUserInfo();
  const router = useRouter();

  return (
    <>
      <Styled.InputTitle>
        펀딩기간이 끝나기 전에 계좌를 입력해주세요. 펀딩 성공 여부와 관계없이 입금됩니다.
      </Styled.InputTitle>

      <BankInput
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
          <Button
            handleClick={() => {
              console.log('hello');
            }}
          >
            완료
          </Button>
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

    /* width: 100%; */
  `,
};
