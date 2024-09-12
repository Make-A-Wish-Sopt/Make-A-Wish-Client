import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputLengthProps {
  inputLength: number;
  limitLength: number;
}

export default function InputLength(props: InputLengthProps) {
  const { inputLength, limitLength } = props;

  return (
    <Styled.Container inputLength={inputLength} limitLength={limitLength}>
      {inputLength}/{limitLength}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div<{ inputLength: number; limitLength: number }>`
    color: ${(props) =>
      props.inputLength > props.limitLength ? theme.colors.warning_red : theme.colors.gray2};
    ${theme.fonts.body12};

    padding-left: 1rem;
  `,
};
