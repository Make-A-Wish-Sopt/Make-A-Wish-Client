'use client';

import React, { ButtonHTMLAttributes, CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { colors, ColorsTypes, FontsTypes } from '@/styles/styles';
import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  disabled?: boolean;
  bgColor?: keyof ColorsTypes;
  fontColor?: keyof ColorsTypes;
  font?: keyof FontsTypes;
  onClick?: React.MouseEventHandler<HTMLElement>;
  gaEventLable?: string;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const {
    disabled,
    bgColor = 'main_blue',
    fontColor = 'black',
    font = 'bitbit',
    onClick,
    icon,
    gaEventLable,
    children,
  } = props;

  const defaultStyle: CSSProperties = {
    backgroundColor: disabled ? colors.gray2 : bgColor ? colors[bgColor] : colors.main_blue,
    color: disabled ? colors.white : fontColor ? colors[fontColor] : colors.black,
  };

  const combinedStyle: CSSProperties = { ...defaultStyle, ...props.style };

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      if (gaEventLable) {
        sendGTMEvent('event', gaEventLable);
        sendGAEvent('event', gaEventLable);
      }
      onClick(e);
    }
  }

  return (
    <button
      className={`flex justify-center items-center ${
        icon ? 'gap-10px' : 'gap-0'
      } w-full h-50 text-[20px] font-${font} bg-${bgColor} rounded-xl`}
      disabled={disabled}
      onClick={handleClick}
      style={combinedStyle}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
