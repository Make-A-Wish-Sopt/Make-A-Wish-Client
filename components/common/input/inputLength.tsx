import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputLengthProps {
  inputLength: number;
  limit: number;
}

export default function InputLength(props: InputLengthProps) {
  const { inputLength, limit } = props;

  return (
    <Styled.Box>
      {inputLength}/{limit}
    </Styled.Box>
  );
}

const Styled = {
  Box: styled.div`
    color: ${theme.colors.gray2};
    ${theme.fonts.body12};
  `,
};
