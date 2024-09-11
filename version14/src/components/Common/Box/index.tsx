import theme, { ColorsTypes } from '@/styles/theme';
import { ColorSystemType } from '@/types/common/box/boxStyleType';
import { CSSProperties, PropsWithChildren } from 'react';

interface BoxProps {
  bgColor: keyof ColorsTypes;
  fontColor: keyof ColorsTypes;
  style: CSSProperties;
}

export default function Box(props: PropsWithChildren<BoxProps>) {
  const { bgColor, fontColor, children } = props;

  return <div className={`w-full h-50 bg-${bgColor} text-${fontColor}`}>{children}</div>;
}
