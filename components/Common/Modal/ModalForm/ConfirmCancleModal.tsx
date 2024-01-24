import styled from 'styled-components';
import Image from 'next/image';

import theme from '@/styles/theme';
import { CloseSmallIc } from '@/public/assets/icons';
import Button from '../../Button';
import { PropsWithChildren } from 'react';

interface ConfirmCancleModalPrpos {
  handleToggle: () => void;
  handleConfirmFn: () => void;
  leftText?: string;
  rightText?: string;
}

export default function ConfirmCancleModal(props: PropsWithChildren<ConfirmCancleModalPrpos>) {
  const { handleToggle, handleConfirmFn, leftText, rightText, children } = props;
  return (
    <Styled.Container>
      <Styled.IconContainer>
        <Image src={CloseSmallIc} alt="닫기" onClick={handleToggle} />
      </Styled.IconContainer>

      <Styled.ContentContainer>{children}</Styled.ContentContainer>

      <Styled.ButtonContainer>
        <Button boxType="half" colorSystem="white_mainBlue" handleClickFn={handleToggle}>
          {leftText || '취소'}
        </Button>
        <Button
          boxType="half"
          colorSystem="mainBlue_white"
          handleClickFn={() => {
            handleConfirmFn();
            handleToggle();
          }}
        >
          {rightText || '확인'}
        </Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    width: 31.6rem;

    background-color: ${theme.colors.pastel_blue};
    padding: 2rem;
    border-radius: 1.6rem;
    margin: 0 1rem 0;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  IconContainer: styled.header`
    position: absolute;
    top: 20%;
    right: 5%;
    transform: translate(-50%, -50%);
  `,

  ContentContainer: styled.div`
    margin: 1.5rem 0 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  ButtonContainer: styled.div`
    display: flex;
    align-items: center;
    & > :not(:last-child) {
      margin-right: 1rem;
    }
  `,
};
