import theme from '@/styles/theme';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import styled, { CSSProperties } from 'styled-components';
import InputLength from './inputLength';

import { ArrowDownIc } from '@/public/assets/icons';
import Image from 'next/image';
import Box from '../box/Box';
import { BoxType } from '@/types/common/boxStyleType';

interface InputBoxProps {
  placeholder?: string;
  handleChangeValue?: ChangeEventHandler<HTMLInputElement>;
  handleBlur?: FocusEventHandler<HTMLInputElement>;
  value?: string | number;
  color?: string;
  isPriceText?: boolean;
  limitLength?: number;
  dropDown?: boolean;
  readOnly?: boolean;
  boxType?: keyof BoxType;
  inputBoxStyle?: CSSProperties;
}

export default function InputBox(props: InputBoxProps) {
  const {
    placeholder,
    handleChangeValue,
    handleBlur,
    value,
    color,
    isPriceText,
    limitLength,
    dropDown,
    readOnly,
    boxType,
    inputBoxStyle,
  } = props;

  return (
    <>
      <Styled.Input
        placeholder={placeholder}
        onChange={handleChangeValue}
        value={value}
        color={color}
        onBlur={handleBlur}
        readOnly={readOnly}
      />

      {limitLength && value !== undefined && (
        <InputLength
          inputLength={
            isPriceText ? value.toString().replaceAll(',', '').length : value.toString().length
          }
          limitLength={limitLength}
        />
      )}
      {dropDown && <Image src={ArrowDownIc} alt="열기" />}
    </>
  );
}

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 5rem;

    display: flex;
    align-items: center;

    padding: 1.2rem 1rem 1.2rem 1.2rem;
    background-color: ${theme.colors.pastel_blue};
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;
  `,

  Input: styled.input<{ color: string | undefined }>`
    ${theme.fonts.body12};
    color: ${(props) => (props.color ? props.color : theme.colors.dark_blue)};
    width: 100%;
  `,

  InputLength: styled.div`
    color: ${theme.colors.gray2};
    ${theme.fonts.body12};
  `,
};
