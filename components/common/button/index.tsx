import { ReactNode } from 'react';
import { BtnBoxTypes, ColorSystemType } from '@/types/common/box/boxStyleType';
import BtnBox from '../box/btnBox';

interface ButtonProps {
  width?: number;
  boxType: BtnBoxTypes;
  colorSystem: ColorSystemType;
  handleClickFn: () => void | unknown;
  children: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { width, boxType, colorSystem, handleClickFn, children } = props;

  return (
    <BtnBox width={width} boxType={boxType} colorSystem={colorSystem} handleClickFn={handleClickFn}>
      {children}
    </BtnBox>
  );
}
