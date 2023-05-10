import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputTitleProps {
  title: string;
}

export default function InputTitle(props: InputTitleProps) {
  const { title } = props;
  return <Title>{title}</Title>;
}

const Title = styled.div`
  ${theme.fonts.body16};
  color: ${theme.colors.main_blue};

  margin-bottom: 2rem;
`;
