import styled, { css } from 'styled-components';
import { MouseEventHandler, ReactNode } from 'react';
import theme, { ColorsTypes, FontsTypes } from '@/styles/theme';
import { assignColor, assignFont } from '@/utils/common/assignStyle';

interface ButtonProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  fontColor?: keyof ColorsTypes;
  font?: keyof FontsTypes;
  children: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { handleClick, fontColor, font, children } = props;
  return (
    <Styled.Button onClick={handleClick} fontColor={assignColor(fontColor)} font={assignFont(font)}>
      {children}
    </Styled.Button>
  );
}

const Styled = {
  Button: styled.button<{ fontColor: string | undefined; font: string | undefined }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    color: ${(props) =>
      props.color ? props.color : theme.colors.white}; //버튼 기본 폰트컬러 : white

    ${(props) =>
      props.font
        ? css`
            ${props.font};
          `
        : css`
            ${theme.fonts.button18}; //버튼 기본 폰트 : button18
          `}
  `,
};
