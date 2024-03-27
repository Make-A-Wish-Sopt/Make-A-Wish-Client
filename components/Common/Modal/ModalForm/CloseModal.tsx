import styled from 'styled-components';
import Image from 'next/image';

import theme from '@/styles/theme';
import { CloseSmallIc } from '@/public/assets/icons';
import Button from '../../Button';
import { PropsWithChildren } from 'react';

interface CloseModalProps {
  handleToggle: () => void;
}

export default function CloseModal(props: PropsWithChildren<CloseModalProps>) {
  const { handleToggle, children } = props;
  return (
    <Styled.Container>
      <Styled.IconContainer>
        <Image src={CloseSmallIc} alt="닫기" onClick={handleToggle} />
      </Styled.IconContainer>

      <Styled.ContentContainer>{children}</Styled.ContentContainer>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    width: 32.8rem;

    background-color: ${theme.colors.pastel_blue};
    padding: 2rem;
    border-radius: 1.6rem;

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
