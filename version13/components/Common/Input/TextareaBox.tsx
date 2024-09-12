import theme from '@/styles/theme';
import styled from 'styled-components';
import InputLength from './InputLength';
import { EmptyBox } from '../Box';
import { UseFormRegisterReturn } from 'react-hook-form';
import { WishesDataInputType } from '@/types/wishesType';
import ImageBox from '../Box/ImageBox';
import { CakesDataInputType } from '@/types/common/input/cakesInput';

interface TextareaBoxProps {
  placeholder?: string;
  inputLength?: number;
  limitLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
  register: UseFormRegisterReturn<keyof WishesDataInputType | keyof CakesDataInputType>;
}

export default function TextareaBox(props: TextareaBoxProps) {
  const { placeholder, inputLength, limitLength, readOnly, disabled, register } = props;

  return (
    <ImageBox boxType="imageBox--textarea" colorSystem="pastelBlue_darkBlue">
      <Styled.Textarea
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        {...register}
      />
      <Styled.InputLengthWrapper>
        <EmptyBox />
        {limitLength && <InputLength inputLength={inputLength || 0} limitLength={limitLength} />}
      </Styled.InputLengthWrapper>
    </ImageBox>
  );
}

const Styled = {
  InputLengthWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  Textarea: styled.textarea<{ disabled?: boolean }>`
    width: 100%;
    height: 10.5rem;

    ${theme.fonts.body12};
    color: ${(props) => (props.disabled ? theme.colors.gray2 : theme.colors.dark_blue)};

    resize: none;
  `,
};
