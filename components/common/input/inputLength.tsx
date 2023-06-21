import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputLengthProps {
  inputLength: number;
  limit: number;
}

export default function InputLength(props: InputLengthProps) {
  const { inputLength, limit } = props;

  return (
    <Styled.Container>
      {inputLength}/{limit}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    color: ${theme.colors.gray2};
    ${theme.fonts.body12};
  `,
};
