'use client';

import React, { ButtonHTMLAttributes, CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { colors, ColorsTypes, FontsTypes } from '@/styles/styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  disabled?: boolean;
  bgColor?: keyof ColorsTypes;
  fontColor?: keyof ColorsTypes;
  font?: keyof FontsTypes;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const {
    disabled,
    bgColor = 'main_blue',
    fontColor = 'black',
    font = 'bitbit',
    onClick,
    icon,
    children,
  } = props;

  const defaultStyle: CSSProperties = {
    backgroundColor: disabled ? colors.gray2 : bgColor ? colors[bgColor] : colors.main_blue,
    color: disabled ? colors.white : fontColor ? colors[fontColor] : colors.black,
  };

  const combinedStyle: CSSProperties = { ...defaultStyle, ...props.style };

  return (
    <button
      className={`flex justify-center items-center ${
        icon ? 'gap-10px' : 'gap-0'
      } w-full h-50 text-[20px] font-${font} bg-${bgColor} rounded-xl`}
      disabled={disabled}
      onClick={onClick}
      style={combinedStyle}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
