import theme from '@/styles/theme';
import styled from 'styled-components';

interface inputTextProps {
  maxLength: number;
}

export default function Input(props: inputTextProps) {
  const { maxLength } = props;
  return <Styled.Container maxLength={maxLength}></Styled.Container>;
}

const Styled = {
  Container: styled.input`
    width: 100%;
    height: 2.2rem;
    background-color: ${theme.colors.gray1};

    color: ${theme.colors.dark_blue};
    ${theme.fonts.body12};
  `,
};
