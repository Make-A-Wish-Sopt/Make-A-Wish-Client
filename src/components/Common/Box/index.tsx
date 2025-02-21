import { ColorsTypes, FontsTypes } from '@/styles/styles';
import { CSSProperties, PropsWithChildren } from 'react';

export interface BoxProps {
  bgColor?: keyof ColorsTypes;
  fontColor?: keyof ColorsTypes;
  font?: keyof FontsTypes;
  styles?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
  isLoading?: boolean; // 스켈레톤 여부 추가
}

export default function Box(props: PropsWithChildren<BoxProps>) {
  const {
    bgColor = 'dark_green',
    font = 'galmuri',
    fontColor = 'white',
    styles,
    onClick,
    isLoading = false,
    children,
  } = props;

  return (
    <div
      className={`w-full h-50 rounded-xl p-10 pl-12 ${
        isLoading
          ? 'animate-pulse bg-gray-300' // 스켈레톤 스타일
          : `bg-${bgColor} font-${font} text-${fontColor}`
      }`}
      style={styles}
      onClick={onClick}
    >
      {isLoading ? null : children}
    </div>
  );
}
