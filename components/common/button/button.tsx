import styled, { css } from 'styled-components';
import { MouseEventHandler, ReactNode } from 'react';
import theme, { ColorsTypes, FontsTypes } from '@/styles/theme';

interface ButtonProps {
  width?: number;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  fontColor?: keyof ColorsTypes;
  font?: keyof FontsTypes;
  children: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { width, handleClick, fontColor, font, children } = props;
  return (
    <Styled.Button onClick={handleClick} width={width} fontColor={fontColor} font={font}>
      {children}
    </Styled.Button>
  );
}

const Styled = {
  Button: styled.button<{ width?: number; fontColor?: keyof ColorsTypes; font?: keyof FontsTypes }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) => (props.width ? `${props.width}rem` : '100%')};
    height: 5rem;

    ${(props) =>
      props.font
        ? css`
            ${theme.fonts[props.font]};
          `
        : css`
            ${theme.fonts.button18}; //버튼 기본 폰트 : button18
          `};
    color: ${(props) =>
      props.color
        ? theme.colors[props.fontColor as keyof ColorsTypes]
        : theme.colors.white}; //버튼 기본 폰트컬러 : white

    background-color: ${theme.colors.main_blue};

    border-radius: 1rem;
  `,
};
