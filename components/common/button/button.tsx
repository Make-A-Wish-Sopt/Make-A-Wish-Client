import styled from 'styled-components';
import { MouseEventHandler, ReactNode } from 'react';
import theme from '@/styles/theme';

interface ButtonProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { handleClick, children } = props;
  return <Styled.Button onClick={handleClick}>{children}</Styled.Button>;
}

const Styled = {
  Button: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    ${theme.fonts.button18};
  `,
};
