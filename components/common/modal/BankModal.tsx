import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { BANK_LIST } from '@/constant/bankList';

interface BankModalProps {
  handleToggle: () => void;
  changeBankName: (input: string) => void;
}

export default function BankModal(props: BankModalProps) {
  const { handleToggle, changeBankName } = props;

  const handleChangeBankName = (input: string) => {
    changeBankName(input);
    handleToggle();
  };

  return (
    <Styled.Modal>
      <Styled.Title>은행을 선택해주세요.</Styled.Title>
      <Styled.BankContainer>
        {BANK_LIST.map((bank) => (
          <Styled.BankLogoContainer key={bank.name} onClick={() => handleChangeBankName(bank.name)}>
            <Styled.Image>
              <Image src={bank.logo} alt={`${bank.name} 로고`} />
            </Styled.Image>
            <Styled.Name>{bank.name} </Styled.Name>
          </Styled.BankLogoContainer>
        ))}
      </Styled.BankContainer>
    </Styled.Modal>
  );
}

const Styled = {
  Modal: styled.div`
    width: 33.1rem;
    height: 60rem;
    background-color: ${theme.colors.pastel_blue};
    padding: 2.2rem 2.2rem 0 2.2rem;
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 2rem;
  `,

  Title: styled.div`
    width: 100%;
    ${theme.fonts.body16};
  `,

  BankContainer: styled.div`
    height: 93%;
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

  BankLogoContainer: styled.div`
    background-color: ${theme.colors.white};
    border-radius: 1rem;
    padding: 1rem 0 0.5rem;

    cursor: pointer;
  `,

  Name: styled.div`
    ${theme.fonts.body12};
    text-align: center;

    margin: 0.5rem 0 0;
  `,

  Image: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.6rem;
    height: 2.6rem;

    margin: 0 auto;
  `,
};
