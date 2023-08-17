import styled from 'styled-components';
import { MouseEventHandler, ReactNode } from 'react';
import theme from '@/styles/theme';

interface ButtonProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  fontColor?: string;
  children: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { handleClick, fontColor, children } = props;
  return (
    <Styled.Button onClick={handleClick} fontColor={fontColor}>
      {children}
    </Styled.Button>
  );
}

const Styled = {
  Button: styled.button<{ fontColor: string | undefined }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    ${theme.fonts.button16};
    color: ${(props) => props.fontColor};
  `,
};
