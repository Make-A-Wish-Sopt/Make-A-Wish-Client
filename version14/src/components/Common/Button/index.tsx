'use client';

import React, { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { ColorsTypes, FontsTypes, SizesTypes } from '@/styles/styles';

export interface ButtonProps {
  icon?: ReactNode;
  disabled?: boolean;
  bgColor?: keyof ColorsTypes;
  fontColor?: keyof ColorsTypes;
  font?: keyof FontsTypes;
  onClick?: React.MouseEventHandler<HTMLElement>;
  handleRouter?: (path: string) => void;
  styles?: CSSProperties;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { disabled, bgColor, fontColor, font, styles, onClick, icon, handleRouter, children } =
    props;

  const router = useRouter();

  const handleClick = () => {
    if (handleRouter) {
      return handleRouter;
    } else {
      return onClick;
    }
  };

  return (
    <button
      className={`flex justify-center items-center ${
        icon ? 'gap-10px' : 'gap-0'
      } w-full h-50 font-${font ? font : 'bitbit'} text-[20px] bg-${
        bgColor ? bgColor : 'main_blue'
      } text-${fontColor ? fontColor : 'black'} rounded-xl`}
      disabled={disabled}
      onClick={onClick}
      style={styles}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
