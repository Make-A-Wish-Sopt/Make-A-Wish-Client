import styled from 'styled-components';
import { StyledBox } from '../box';
import theme from '@/styles/theme';
import Image from 'next/image';
import { BankListType } from '@/types/bankListType';

interface PaymentItemSelectProps {
  payment: BankListType;
  handleClickFn: (payment: BankListType) => void;
  selectedPayment: BankListType | undefined;
}

export default function PaymentItemSelect(props: PaymentItemSelectProps) {
  const { payment, handleClickFn, selectedPayment } = props;

  const isSelected = (): boolean => {
    return payment === selectedPayment;
  };

  return (
    <Styled.PaymentItem as="li">
      <Styled.SelectIcon onClick={() => handleClickFn(payment)} isSelected={isSelected()}>
        {isSelected() && <Styled.SelectInnerIcon />}
      </Styled.SelectIcon>

      <Styled.BankItemWrapper>
        <Styled.BankItem>
          <Image src={payment.logo} alt="결제 수단 이미지" width={30} />
        </Styled.BankItem>
        {payment.name}
      </Styled.BankItemWrapper>
    </Styled.PaymentItem>
  );
}

const Styled = {
  PaymentItem: styled(StyledBox)`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    width: 100%;
    height: 6rem;

    background-color: ${theme.colors.pastel_blue};

    border-radius: 1rem;
    padding: 1rem;
  `,

  SelectIcon: styled.div<{ isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 1.6rem;
    height: 1.6rem;

    border-radius: 50%;
    background-color: ${theme.colors.white};
    border: 1px solid ${(props) => (props.isSelected ? theme.colors.main_blue : theme.colors.gray2)};
  `,

  SelectInnerIcon: styled.div`
    width: 0.9rem;
    height: 0.9rem;

    border-radius: 50%;
    background-color: ${theme.colors.main_blue};
  `,

  BankItem: styled.div`
    width: 3rem;
    height: 3rem;

    background-color: ${theme.colors.white};
    border-radius: 0.4rem;

    overflow: hidden;
  `,

  BankItemWrapper: styled.div`
    display: flex;
    align-items: center;

    gap: 1.2rem;

    ${theme.fonts.body14};
    color: ${theme.colors.dark_blue};
  `,
};
