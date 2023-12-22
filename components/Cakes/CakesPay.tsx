import styled from 'styled-components';
import theme from '@/styles/theme';
import { BackBtnIc } from '@/public/assets/icons';
import Image from 'next/image';
import { CakeListType } from '@/types/cakes/cakeListType';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import PaymentItemSelect from '../Common/Select/PaymentItemSelect';
import { BANK_LIST } from '@/constant/bankList';
import { BankListType } from '@/types/bankListType';
import Button from '../Common/Button';
import { useState } from 'react';
import { useGetPublicWishes } from '@/hooks/queries/public';

interface CakesPayProps {
  handlePrevStep: () => void;
  handleNextStep: () => void;
  selectedCake: CakeListType;
  wishesId: string | string[] | undefined;
}

export default function CakesPay(props: CakesPayProps) {
  const { handlePrevStep, handleNextStep, selectedCake, wishesId } = props;

  const { publicWishesData } = useGetPublicWishes(wishesId);

  const PAYMENTS: BankListType[] = [BANK_LIST[5], BANK_LIST[1]];
  const [selectedPayment, setSelected] = useState<BankListType>();

  const handlePaymentSelect = (payment: BankListType) => {
    setSelected(payment);
  };

  const handleDeepLink = (payment: BankListType | undefined) => {
    const ua = navigator.userAgent.toLowerCase();

    if (!selectedPayment) {
      alert('결제수단을 선택해주세요!');
      return;
    }

    if (window.confirm(`${payment?.name}(으)로 이동할까요?`)) {
      if (payment?.name === '토스뱅크') {
        window.open(
          ua.indexOf('android') > -1
            ? 'https://play.google.com/store/apps/details?id=viva.republica.toss'
            : 'https://apps.apple.com/app/id839333328',
        );
      }

      if (payment?.name === '카카오뱅크') {
        window.open(
          ua.indexOf('android') > -1
            ? 'https://play.google.com/store/apps/details?id=com.kakaobank.channel'
            : 'https://apps.apple.com/app/id1258016944',
        );
      }
      handleNextStep();
    }
  };

  return (
    <>
      <Styled.Header>
        <Image src={BackBtnIc} alt="뒤로가기" onClick={handlePrevStep} />
      </Styled.Header>
      <Styled.Container>
        <Styled.TitleText>주문 확인 내역</Styled.TitleText>
        <Styled.TextWrapper>{`${selectedCake.name} ${convertMoneyText(
          String(selectedCake.price),
        )}원을\n${publicWishesData?.name}님께 보내시겠습니까?`}</Styled.TextWrapper>

        <Styled.ImageWrapper>
          <Image src={selectedCake.detailImage} alt="케이크 이미지" width={285} />
        </Styled.ImageWrapper>

        <Styled.TitleText>결제수단 선택</Styled.TitleText>

        <Styled.PaymentWrapper>
          {PAYMENTS.map((payment: BankListType) => (
            <PaymentItemSelect
              payment={payment}
              handleClickFn={handlePaymentSelect}
              selectedPayment={selectedPayment}
              key={payment.name}
            />
          ))}
        </Styled.PaymentWrapper>
      </Styled.Container>

      <Styled.ButtonWrapper>
        <Button
          boxType="large"
          colorSystem="mainBlue_white"
          handleClickFn={() => handleDeepLink(selectedPayment)}
        >
          {'친구 계좌로 케이크 쏘기'}
        </Button>
      </Styled.ButtonWrapper>
    </>
  );
}

const Styled = {
  Header: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 3rem;
  `,

  Container: styled.section`
    width: 100%;
    height: 100%;

    margin: 2.4rem 0 2rem;
  `,

  TitleText: styled.h1`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.main_blue};
  `,

  TextWrapper: styled.div`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.black};

    margin-top: 0.7rem;

    white-space: pre-line;
  `,

  ImageWrapper: styled.div`
    margin: 1.5rem 0 2rem;
  `,

  PaymentWrapper: styled.ul`
    display: flex;
    flex-direction: column;

    gap: 1.4rem;

    margin-top: 2rem;
  `,

  ButtonWrapper: styled.div`
    padding-bottom: 4.6rem;
  `,
};
