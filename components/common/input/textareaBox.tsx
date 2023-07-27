import theme from '@/styles/theme';
import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import InputLength from './inputLength';
import LargeBox from '../box/LargeBox';

interface TextareaBoxProps {
  placeholder?: string;
  handleChangeValue?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string | number;
  limitLength?: number;
  readOnly?: boolean;
}

export default function TextareaBox(props: TextareaBoxProps) {
  const { placeholder, handleChangeValue, value, limitLength, readOnly } = props;
  return (
    <LargeBox bgColor={theme.colors.pastel_blue}>
      <Styled.Textarea
        placeholder={placeholder}
        onChange={handleChangeValue}
        value={value}
        readOnly={readOnly ? true : false}
      />
      <Styled.InputLengthWrapper>
        <div></div>
        {limitLength && value !== undefined && (
          <InputLength inputLength={value?.toString().length} limitLength={limitLength} />
        )}
      </Styled.InputLengthWrapper>
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

  Textarea: styled.textarea`
    width: 100%;
    height: 10.5rem;

    ${theme.fonts.body12};
    color: ${theme.colors.dark_blue};
    background-color: ${theme.colors.pastel_blue};

    resize: none;
  `,
};
