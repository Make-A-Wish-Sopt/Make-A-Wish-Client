import InputBox from '@/components/common/input/inputBox';
import InputContainer from '@/components/common/input/inputContainer';
import TextareaBox from '@/components/common/input/textareaBox';
import Image from 'next/image';
import styled from 'styled-components';
import theme from '@/styles/theme';
import BasicBox from '@/components/common/box/BasicBox';
import Button from '@/components/common/button/button';
import { useEffect, useState } from 'react';
import Modal from '@/components/common/modal';
import TermsModal from '@/components/common/modal/termsModal';
import useModal from '@/hooks/common/useModal';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import PresentBox from '@/components/common/box/PresentBox';
import { useCreateWishesLink } from '@/hooks/queries/wishes/useCreateWishesLink';
import { convertDateToString } from '@/utils/common/getDate';

interface PreviewProps {
  handleNextStep: () => void;
}

export default function Preview(props: PreviewProps) {
  const { handleNextStep } = props;
  const { wishesData, postWishesData, isSuccess } = useCreateWishesLink();

  const { isOpen, handleToggle } = useModal();
  const [isAgreed, setIsAgreed] = useState(false);

  const changeIsAgreed = (isChecked: boolean) => {
    setTimeout(() => {
      setIsAgreed(isChecked);
    }, 300);
  };

  const createLink = () => {
    if (isAgreed) {
      postWishesData();
      // return isSuccess && handleNextStep();
      return handleNextStep();
    } else {
      return handleToggle();
    }
  };

  useEffect(() => {
    isAgreed && handleToggle();
  }, [isAgreed]);

  return (
    <>
      <Styled.Period>
        {convertDateToString(wishesData.startDate)}~{convertDateToString(wishesData.endDate)}
      </Styled.Period>

      <InputContainer title={wishesData.title}>
        <PresentBox>
          <Styled.ImageWrapper>
            <Image
              src={wishesData.imageURL}
              fill={true}
              alt="선물이미지 미리보기"
              style={{ borderRadius: '1.6rem', objectFit: 'cover' }}
            />
          </Styled.ImageWrapper>
        </PresentBox>
        <Styled.PresentPrice>가격 : {convertMoneyText(wishesData.price)}</Styled.PresentPrice>
      </InputContainer>

      <InputContainer title="">
        <TextareaBox value={wishesData.hint} readOnly />
      </InputContainer>

      <InputContainer title="선물의 초성">
        <InputBox value={wishesData.initial} readOnly />
      </InputContainer>

      <InputContainer title="연락처">
        <InputBox value={wishesData.phone} readOnly />
      </InputContainer>

      <Modal isOpen={isOpen} handleToggle={handleToggle}>
        <TermsModal handleToggle={handleToggle} changeIsAgreed={changeIsAgreed} />
      </Modal>

      <Styled.ButtonWrapper>
        <BasicBox
          bgColor={theme.colors.main_blue}
          fontColor={theme.colors.white}
          font={theme.fonts.button16}
          borderColor={'transparent'}
        >
          <Button handleClick={createLink} fontColor={theme.colors.white}>
            링크 생성하기
          </Button>
        </BasicBox>
      </Styled.ButtonWrapper>
    </>
  );
}

const Styled = {
  Period: styled.p`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    margin: 0 0 1rem;
  `,

  ImageWrapper: styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    object-fit: fill;
  `,

  PresentPrice: styled.p`
    ${theme.fonts.button16};
    color: ${theme.colors.main_blue};
    text-align: center;
  `,

  ButtonWrapper: styled.div`
    margin-top: 1.5rem;
  `,
};
