import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { BANK_LIST } from '@/constant/bankList';
import { UseFormRegisterReturn } from 'react-hook-form';

interface BankModalProps {
  handleToggle: () => void;
  register: UseFormRegisterReturn<'bankName'>;
}

export default function BankModal(props: BankModalProps) {
  const { handleToggle, register } = props;

  const handleChangeBankName = (input: string) => {
    handleToggle();
  };

  return (
    <Styled.Modal>
      <Styled.Title>은행을 선택해주세요.</Styled.Title>

      <Styled.BankContainer>
        {BANK_LIST.map((bank) => (
          <Styled.BankItem>
            <Styled.BanksWrapper>
              <Styled.BankLogo>
                <Image src={bank.logo} alt={`${bank.name} 로고`} />
              </Styled.BankLogo>

              <Styled.BankName>{bank.name} </Styled.BankName>
            </Styled.BanksWrapper>
          </Styled.BankItem>
        ))}
      </Styled.BankContainer>
    </Styled.Modal>
  );
}

const Styled = {
  Modal: styled.section`
    width: 33.1rem;
    height: 60rem;

    background-color: ${theme.colors.pastel_blue};
    padding: 2.2rem 2.2rem 0 2.2rem;
    border: 0.1rem solid ${theme.colors.main_blue};

    border-radius: 2rem;
  `,

  Title: styled.h2`
    width: 100%;
    ${theme.fonts.body16};
  `,

  BankContainer: styled.ul`
    height: 91.4%;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    margin: 2rem 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 0.8rem;
    grid-row-gap: 0.8rem;
  `,

  BankItem: styled.div`
    width: 9rem;
    height: 6.6rem;

    padding: 1rem 0 0.5rem;

    background-color: ${theme.colors.white};
    border-radius: 1rem;

    cursor: pointer;
  `,

  BanksWrapper: styled.li`
    display: flex;
    flex-direction: column;

    align-items: center;
  `,

  BankName: styled.div`
    ${theme.fonts.body12};
    text-align: center;

    margin: 0.5rem 0 0;
  `,

  BankLogo: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.6rem;
    height: 2.6rem;

    margin: 0 auto;
  `,
};
