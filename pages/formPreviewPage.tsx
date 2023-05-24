import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import PresentImageBox from '@/components/common/presentImageBox';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import InputBox from '@/components/common/input/inputBox';
import InputLargeBox from '@/components/common/input/inputLargeBox';

import { useRecoilValue } from 'recoil';
import { WishesData } from '@/recoil/formPage/wishesData';
import ButtonBox from '@/components/button/buttonBox';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/modal';
import TermsModal from '@/components/modal/termsModal';
import { useState } from 'react';

export default function FormPreviewPage() {
  const wishesData = useRecoilValue(WishesData);

  const { isOpen, modalToggle } = useModal();

  const [isAgreed, setIsAgreed] = useState(false);

  const changeIsAgreed = (isChecked: boolean) => {
    setIsAgreed(isChecked);
  };

  const createLink = () => {
    return isAgreed ? postWishesData() : modalToggle();
  };

  const postWishesData = () => {
    //API
  };

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>
      <Styled.Title>소원 링크 화면 미리보기</Styled.Title>

      <Styled.InputTitle>
        {wishesData.startDate}~{wishesData.endDate}
      </Styled.InputTitle>

      <Styled.ItemBox>
        <Styled.InputTitle>{wishesData.title}</Styled.InputTitle>
        <Styled.PresentContainer>
          <PresentImageBox>
            {/* <Image
                            src=""
                            alt="선물" /> */}
          </PresentImageBox>
          <Styled.PresentPrice>가격: {wishesData.price}원</Styled.PresentPrice>
        </Styled.PresentContainer>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <InputLargeBox bgColor={theme.colors.pastel_blue}>
          <Styled.Text>{wishesData.hint1}</Styled.Text>
        </InputLargeBox>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>선물의 초성</Styled.InputTitle>
        <InputBox>
          <Styled.Text>{wishesData.hint2}</Styled.Text>
        </InputBox>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>예금주명/은행/계좌번호</Styled.InputTitle>
        <InputBox>
          <Styled.Text>
            {wishesData.name}/{wishesData.bankName}/{wishesData.account}
          </Styled.Text>
        </InputBox>
      </Styled.ItemBox>

      <Styled.ItemBox>
        <Styled.InputTitle>연락처</Styled.InputTitle>
        <InputBox>
          <Styled.Text>{wishesData.phone}</Styled.Text>
        </InputBox>
      </Styled.ItemBox>

      <Modal isOpen={isOpen} modalToggle={modalToggle}>
        <TermsModal modalToggle={modalToggle} changeIsAgreed={changeIsAgreed} />
      </Modal>

      <ButtonBox
        backgroundColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
        handleClick={createLink}
      >
        소원 링크 생성하기
      </ButtonBox>
    </>
  );
}

const Styled = {
  Title: styled.h1`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 2.4rem 0 2rem;
  `,

  ItemBox: styled.div`
    margin: 0 0 4rem;
  `,

  InputTitle: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    margin: 0 0 1rem;
  `,

  PresentContainer: styled.div`
    margin: 1rem 0 0;
  `,

  PresentPrice: styled.div`
    ${theme.fonts.button16};
    color: ${theme.colors.main_blue};
    text-align: center;
  `,

  Text: styled.div`
    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    text-align: left;
  `,
};
