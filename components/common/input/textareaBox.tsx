import theme from '@/styles/theme';
import styled from 'styled-components';
import InputLength from './inputLength';
import { EmptyBox } from '../box';
import { UseFormRegisterReturn } from 'react-hook-form';
import { WishesDataInputType } from '@/types/common/input/wishesInput';
import ImageBox from '../box/imageBox';

interface TextareaBoxProps {
  placeholder?: string;
  inputLength: number;
  limitLength: number;
  readOnly?: boolean;
  register: UseFormRegisterReturn<keyof WishesDataInputType>;
}

export default function TextareaBox(props: TextareaBoxProps) {
  const { placeholder, inputLength, limitLength, readOnly, register } = props;

  return (
    <ImageBox boxType="imageBox--textarea" colorSystem="pastelBlue_darkBlue">
      <Styled.Textarea placeholder={placeholder} readOnly={readOnly} {...register} />
      <Styled.InputLengthWrapper>
        <EmptyBox />
        {limitLength && <InputLength inputLength={inputLength} limitLength={limitLength} />}
      </Styled.InputLengthWrapper>
    </ImageBox>
  );
}

const Styled = {
  InputLengthWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  Textarea: styled.textarea`
    width: 100%;
    height: 10.5rem;

    ${theme.fonts.body12};

    resize: none;
  `,
};
