import React, { PropsWithChildren, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ButtonSizeType, ColorSystemType, StyledCommon } from '../CommonStyle';

interface ButtonProps {
  size?: ButtonSizeType;
  icon?: ReactNode;
  color: ColorSystemType;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { size, color, disabled, onClick, icon, children } = props;

  return (
    <StyledButton
      as="button"
      className={color}
      size={size}
      disabled={disabled}
      icon={icon}
      onClick={onClick}
    >
      {icon && icon}
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(StyledCommon)<{ icon?: ReactNode }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.icon !== undefined &&
    css`
      gap: 1rem;
    `}
`;
