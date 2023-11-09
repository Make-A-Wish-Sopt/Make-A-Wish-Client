import theme from '@/styles/theme';
import { ChangeEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import InputLength from './inputLength';
import LargeBox from '../box/LargeBox';

interface TextareaBoxProps {
  placeholder?: string;
  handleChangeValue?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string | number;
  color?: string;
  limitLength?: number;
  borderColor?: string;
  readOnly?: boolean;
  children?: ReactNode;
}

export default function TextareaBox(props: TextareaBoxProps) {
  const { placeholder, handleChangeValue, value, color, limitLength, borderColor,readOnly, children } = props;
  return (
    <LargeBox bgColor={theme.colors.pastel_blue} borderColor={borderColor}>
      <Styled.Textarea
        placeholder={placeholder}
        onChange={handleChangeValue}
        value={value}
        color={color}
        readOnly={readOnly ? true : false}
      />
      <Styled.InputLengthWrapper>
        <div></div>
        {limitLength && value !== undefined && (
          <InputLength inputLength={value?.toString().length} limitLength={limitLength} />
        )}
      </Styled.InputLengthWrapper>
      {children}
    </LargeBox>
  );
}

const Styled = {
  Container: styled.section`
    width: 100%;
    height: 15rem;

    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};

    padding: 1.2rem;
    background-color: ${theme.colors.pastel_blue};
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;
  `,

  InputLengthWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  Textarea: styled.textarea<{ color: string | undefined }>`
    width: 100%;
    height: 10.5rem;

    ${theme.fonts.body12};
    color: ${(props) => (props.color ? props.color : theme.colors.dark_blue)};
    background-color: ${theme.colors.pastel_blue};

    resize: none;
  `,
};
