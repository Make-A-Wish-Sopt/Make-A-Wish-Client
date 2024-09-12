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
import ConfirmCancleModal from '../Common/Modal/ModalForm/ConfirmCancleModal';
import useModal from '@/hooks/common/useModal';
import { MainCakeImg } from '@/public/assets/images';
import Modal from '../Common/Modal';
import { UseMutateFunction } from 'react-query';

interface CakesPayProps {
  handlePrevStep: () => void;
  handleNextStep: () => void;
  selectedCake: CakeListType;
  wishesId: string | string[] | undefined;
  postPublicCakesData: UseMutateFunction<
    {
      cakeId: number;
      imageUrl: string;
      hint: string;
      initial: string;
      contribute: string;
      wisher: string;
    },
    unknown,
    void,
    unknown
  >;
}

export default function CakesPay(props: CakesPayProps) {
  const { handlePrevStep, selectedCake, wishesId, postPublicCakesData } = props;

  const { publicWishesData } = useGetPublicWishes(wishesId);

  const PAYMENTS: BankListType[] = [BANK_LIST[5], BANK_LIST[1]];
  const [selectedPayment, setSelected] = useState<BankListType>();

  const { isOpen, handleToggle } = useModal();

  const handlePaymentSelect = (payment: BankListType) => {
    setSelected(payment);
  };

  const handleTextCopy = async () => {
    if (!publicWishesData?.accountNumber || !publicWishesData.bank) {
      alert('계좌번호에 오류가 있습니다!');
      return;
    }
    const accountInfoText =
      `${publicWishesData.bank} ${publicWishesData.accountNumber} ${selectedCake.price}원` || '';
    const isClipboardSupported = () => navigator?.clipboard != null;

    try {
      if (isClipboardSupported()) {
        await navigator.clipboard.writeText(accountInfoText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = accountInfoText;
        document.body.appendChild(textArea);
        textArea.select();

        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      alert('계좌번호가 복사되었습니다.');
      handleDeepLink(selectedPayment);
    } catch (error) {
      alert('복사하기가 지원되지 않는 환경입니다.');
    }
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
    }
    handleToggle();
  };

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <ConfirmCancleModal
            handleToggle={handleToggle}
            handleConfirmFn={postPublicCakesData}
            leftText="송금 안했어요"
            rightText="송금했어요"
            gaTagId={`${selectedCake.name} 보내기`}
          >
            <Image src={MainCakeImg} alt={'케이크'} width={60} height={60} />
            <Styled.DeleteText>
              {
                '친구 계좌로 돈을 송금하셨나요?\n\n※ 연결된 은행으로 직접 송금하지 않았다면,\n실제로 돈이 보내진 게 아니니 안심하세요!'
              }
            </Styled.DeleteText>
          </ConfirmCancleModal>
        </Modal>
      )}
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
          handleClickFn={() => {
            handleTextCopy();
          }}
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

  DeleteText: styled.span`
    ${theme.fonts.body14};
    color: ${theme.colors.dark_blue};
    margin: 0.7rem 0 1rem;

    line-height: 140%;
    text-align: center;

    white-space: pre-line;
  `,
};
