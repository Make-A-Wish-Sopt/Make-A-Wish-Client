import InputBox from '@/components/common/input/inputBox';
import InputContainer from '@/components/common/input/inputContainer';
import TextareaBox from '@/components/common/input/textareaBox';
import Image from 'next/image';
import styled from 'styled-components';
import theme from '@/styles/theme';
import BasicBox from '@/components/common/box/BasicBox';
import Button from '@/components/common/button/button';
import { useEffect, useState } from 'react';
import Modal from '@/components/common/modal/modal';
import TermsModal from '@/components/common/modal/TermsModal';
import useModal from '@/hooks/common/useModal';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import PresentBox from '@/components/common/box/PresentBox';
import { convertDateToString } from '@/utils/common/getDate';
import { useRecoilValue } from 'recoil';
import { WishesData } from '@/recoil/formPage/wishesData';

interface PreviewProps {
  handleNextStep: () => void;
}

export default function Preview(props: PreviewProps) {
  const { handleNextStep } = props;

  const wishesData = useRecoilValue(WishesData);
  const { isOpen, handleToggle } = useModal();
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    isAgreed && handleNextStep();
  }, [isAgreed]);

  const changeIsAgreed = (isChecked: boolean) => {
    setIsAgreed(isChecked);
  };

  return (
    <Styled.Container>
      <div>
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
          <Styled.PresentPrice>
            가격 : {convertMoneyText(String(wishesData.price))}
          </Styled.PresentPrice>
        </InputContainer>

        <InputContainer title="">
          <TextareaBox value={wishesData.hint} readOnly />
        </InputContainer>

        <InputContainer title="선물의 초성">
          <InputBox value={wishesData.initial} readOnly />
        </InputContainer>

        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <TermsModal handleToggle={handleToggle} changeIsAgreed={changeIsAgreed} />
        </Modal>
      </div>

      <Styled.ButtonWrapper>
        <BasicBox
          bgColor={theme.colors.main_blue}
          fontColor={theme.colors.white}
          font={theme.fonts.button16}
          borderColor={'transparent'}
        >
          <Button handleClick={handleToggle}>링크 생성하기</Button>
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

    height: 100%;
  `,

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
    ${theme.fonts.button18};
    color: ${theme.colors.main_blue};
    text-align: center;

    margin-top: 1rem;
  `,

  ButtonWrapper: styled.div`
    padding-bottom: 4.6rem;
  `,
};
